import { database as db } from "@repo/database";
import { log } from "@repo/observability/log";
import { parseError } from "@repo/observability/error";

export interface RetryContext {
  jobId: string;
  orgId: string;
}

export class RetryEngine {
  static readonly MAX_ATTEMPTS = 3;
  static readonly BACKOFF_MS = [2000, 4000, 8000]; // Exponential backoff
  static readonly TIMEOUT_MS = 30000; // Per attempt timeout
  
  async executeWithRetry<T>(
    fn: () => Promise<T>,
    context: RetryContext
  ): Promise<{ success: boolean; result?: T; error?: string }> {
    let lastError: unknown;
    
    for (
      let attempt = 1;
      attempt <= RetryEngine.MAX_ATTEMPTS;
      attempt++
    ) {
      try {
        log.info(`[Attempt ${attempt}/${RetryEngine.MAX_ATTEMPTS}] Starting`, context);
        
        // Execute with timeout
        const result = await Promise.race([
          fn(),
          this.timeout(RetryEngine.TIMEOUT_MS),
        ]);
        
        log.info(`[Attempt ${attempt}] SUCCESS`, context);
        return { success: true, result };
      } catch (error) {
        lastError = error;
        
        log.warn(`[Attempt ${attempt}] FAILED`, {
          ...context,
          error: parseError(error),
        });
        
        // Is this the last attempt?
        if (attempt === RetryEngine.MAX_ATTEMPTS) {
          log.error(
            `[Attempt ${attempt}] MAX RETRIES EXHAUSTED — escalating to manual review`,
            {
              ...context,
              error: parseError(error),
            }
          );
          
          // Create manual review task
          await this.escalateToManualReview(context, error);
          return {
            success: false,
            error: parseError(error),
          };
        }
        
        // Wait before next attempt (exponential backoff)
        const waitMs = RetryEngine.BACKOFF_MS[attempt - 1];
        log.info(`[Attempt ${attempt}] Waiting ${waitMs}ms before retry`, context);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
    
    return {
      success: false,
      error: parseError(lastError),
    };
  }
  
  private async escalateToManualReview(
    context: RetryContext,
    error: unknown
  ) {
    try {
      await db.operationTask.create({
        data: {
          type: "MIGRATION_FAILED_MANUAL_REVIEW",
          relatedId: context.jobId,
          priority: "critical",
          status: "pending",
          orgId: context.orgId,
          metadata: {
            error: parseError(error),
            attempts: RetryEngine.MAX_ATTEMPTS,
            context: { ...context },
          } as any,
        },
      });
    } catch (taskError) {
      log.error("Failed to create escalation task", { error: taskError });
    }
  }
  
  private timeout(ms: number): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    );
  }
}
