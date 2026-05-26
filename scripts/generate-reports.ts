import { database as db } from "@repo/database";
import fs from "fs/promises";
import path from "path";

export async function generateDailyReports(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  const nextDay = new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const reportDir = path.join(process.cwd(), "ops", "reports", today);

  await fs.mkdir(reportDir, { recursive: true });

  // Generate per-job report
  const jobs = await db.job.findMany({
    where: {
      createdAt: {
        gte: new Date(`${today}T00:00:00Z`),
        lt: new Date(`${nextDay}T00:00:00Z`),
      },
    },
  });
  
  for (const job of jobs) {
    const report = {
      jobId: job.id,
      clientSlug: job.clientId,
      status: job.status,
      duration_seconds: Math.round(
        (job.updatedAt.getTime() - job.createdAt.getTime()) / 1000
      ),
      cost_usd: job.actualCostUsd || 0,
      lighthouse_before: null,
      lighthouse_after: job.lighthouseScore,
      udec_before: null,
      udec_after: job.udecScore,
      fixes_applied: [],
      errors: job.errorMessage ? [job.errorMessage] : [],
      timestamp: job.createdAt.toISOString(),
    };
    
    await fs.writeFile(
      path.join(reportDir, `job-${job.id}.json`),
      JSON.stringify(report, null, 2)
    );
  }
  
  // Generate summary
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter((j) => j.status === "completed").length;
  const failedJobs = jobs.filter((j) => j.status === "failed").length;
  const totalSpend = jobs.reduce((sum, j) => sum + (j.actualCostUsd || 0), 0);
  
  const summary = {
    date: today,
    total_jobs: totalJobs,
    completed_jobs: completedJobs,
    failed_jobs: failedJobs,
    success_rate: totalJobs > 0 ? ((completedJobs / totalJobs) * 100).toFixed(1) + "%" : "N/A",
    total_cost_usd: totalSpend.toFixed(2),
    avg_cost_per_job: totalJobs > 0 ? (totalSpend / totalJobs).toFixed(2) : "0",
    generated_at: new Date().toISOString(),
  };
  
  await fs.writeFile(
    path.join(reportDir, "summary.json"),
    JSON.stringify(summary, null, 2)
  );
  
  console.log(`✓ Reports generated: ${reportDir}`);
  console.log(JSON.stringify(summary, null, 2));
}

// Ensure the script can be run directly
if (require.main === module) {
  generateDailyReports().catch(console.error);
}
