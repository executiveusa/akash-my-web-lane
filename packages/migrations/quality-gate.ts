import { database as db } from "@repo/database";
import { log } from "@repo/observability/log";

export interface QualityGateResult {
  allowed: boolean;
  action: "deploy" | "review" | "auto_improve";
  reason: string;
  requiresApproval?: boolean;
}

export class QualityGate {
  static readonly MINIMUM_UDEC = 8.5;
  static readonly REVIEW_THRESHOLD = 7.0;
  
  async enforceGate(
    jobId: string,
    udecScore: number | null | undefined,
    lighthouseScore?: number
  ): Promise<QualityGateResult> {
    if (!udecScore) {
      log.warn("Quality gate check skipped: missing UDEC score", { jobId });
      return {
        allowed: false,
        action: "review",
        reason: "Quality analysis in progress. Score not yet available.",
      };
    }

    log.info("Quality gate check", { jobId, udecScore, lighthouseScore });

    // Pass: meets floor
    if (udecScore >= QualityGate.MINIMUM_UDEC) {
      log.info("Quality gate passed", { jobId, udecScore });
      return {
        allowed: true,
        action: "deploy",
        reason: `Quality score ${udecScore.toFixed(1)}/10 meets requirements`,
      };
    }

    // Fail: below review threshold
    if (udecScore < QualityGate.REVIEW_THRESHOLD) {
      log.warn("Quality gate FAILED — critical review required", {
        jobId,
        udecScore,
      });

      // Create manual review task
      await db.operationTask.create({
        data: {
          type: "QUALITY_REVIEW_REQUIRED_CRITICAL",
          relatedId: jobId,
          priority: "critical",
          status: "pending",
          orgId: "system", // Should be updated with actual orgId if available
          metadata: {
            udecScore,
            lighthouseScore,
            reason: "Score below minimum threshold",
          } as any,
        },
      });
      
      return {
        allowed: false,
        action: "review",
        reason: `Quality score ${udecScore.toFixed(1)}/10 is critical. Manual review required before deployment.`,
        requiresApproval: true,
      };
    }
    
    // Warn: below floor but acceptable for review
    log.warn("Quality gate BLOCKED — requires review", { jobId, udecScore });
    
    // Create review task for quality improvement
    await db.operationTask.create({
      data: {
        type: "QUALITY_REVIEW_REQUIRED",
        relatedId: jobId,
        priority: "high",
        status: "pending",
        orgId: "system", // Should be updated with actual orgId if available
        metadata: {
          udecScore,
          lighthouseScore,
          reason: "Score below 8.5 floor. Recommend improvements before deployment.",
        } as any,
      },
    });
    
    return {
      allowed: false,
      action: "review",
      reason: `Quality score ${udecScore.toFixed(1)}/10. Below floor (8.5). Manual review + improvements recommended.`,
      requiresApproval: false,
    };
  }
}
