import { database as db } from "@repo/database";
import { log } from "@repo/observability/log";

export interface CircuitBreakerConfig {
  dailyBudgetUsd: number; // $50
  jobBudgetUsd: number; // $10
  maxConcurrentJobs: number; // 5
}

export class CircuitBreaker {
  private config: CircuitBreakerConfig;
  
  constructor(config: Partial<CircuitBreakerConfig> = {}) {
    this.config = {
      dailyBudgetUsd: config.dailyBudgetUsd || 50,
      jobBudgetUsd: config.jobBudgetUsd || 10,
      maxConcurrentJobs: config.maxConcurrentJobs || 5,
    };
  }
  
  async checkCanStartMigration(request: {
    clientSlug: string;
    plan: string;
  }): Promise<{ allowed: boolean; reason?: string }> {
    // Check 1: Daily budget
    const todaySpend = await this.getTodaySpend();
    if (todaySpend > this.config.dailyBudgetUsd) {
      return {
        allowed: false,
        reason: `Daily API budget exhausted ($${this.config.dailyBudgetUsd} spent: $${todaySpend.toFixed(2)})`,
      };
    }
    
    // Check 2: Job cost estimate
    const estimatedCost = await this.estimateCost(request.plan);
    if (estimatedCost > this.config.jobBudgetUsd) {
      return {
        allowed: false,
        reason: `Estimated cost ($${estimatedCost.toFixed(2)}) exceeds job budget ($${this.config.jobBudgetUsd}). Requires approval.`,
      };
    }
    
    // Check 3: Concurrent jobs
    const concurrent = await db.job.count({
      where: {
        status: { in: ["queued", "running"] },
      },
    });
    if (concurrent >= this.config.maxConcurrentJobs) {
      return {
        allowed: false,
        reason: `Maximum concurrent jobs reached (${this.config.maxConcurrentJobs}). Wait for current jobs to complete.`,
      };
    }
    
    return { allowed: true };
  }
  
  private async getTodaySpend(): Promise<number> {
    const today = new Date().toISOString().split("T")[0];
    const result = await db.spend.aggregate({
      where: {
        date: today,
      },
      _sum: {
        costUsd: true,
      },
    });
    return result._sum.costUsd || 0;
  }
  
  private async estimateCost(plan: string): Promise<number> {
    // Plan-based cost estimation
    const costs: Record<string, number> = {
      free: 0.5,
      starter: 1.5,
      pro: 3.0,
      agency: 5.0,
    };
    return costs[plan] || 2.0;
  }
}
