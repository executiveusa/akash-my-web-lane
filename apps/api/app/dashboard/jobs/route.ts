/**
 * GET /api/dashboard/jobs
 * Returns all migration jobs + aggregate stats for Pi Dashboard
 */
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [jobsResult, statsResult] = await Promise.all([
      pool.query(`
        SELECT job_id, status, current_step, payload, data, created_at, updated_at
        FROM migration_jobs
        ORDER BY updated_at DESC
        LIMIT 100
      `),
      pool.query(`
        SELECT
          COUNT(*)::int                                          AS "totalJobs",
          COUNT(*) FILTER (WHERE status = 'completed')::int      AS "completedJobs",
          COUNT(*) FILTER (WHERE status IN ('queued','running'))::int AS "pendingJobs",
          COUNT(*) FILTER (WHERE status = 'failed')::int         AS "failedJobs",
          COUNT(*) FILTER (WHERE status = 'awaiting_review')::int AS "awaitingReview",
          COALESCE(
            AVG((data->>'udecFinal')::numeric) FILTER (WHERE data->>'udecFinal' IS NOT NULL),
            0
          )::numeric(4,1)                                        AS "avgUdecScore"
        FROM migration_jobs
      `),
    ]);

    const leadsCount = await pool.query(`SELECT COUNT(*)::int AS "totalLeads" FROM audit_leads`);

    const stats = {
      ...statsResult.rows[0],
      totalLeads: leadsCount.rows[0]?.totalLeads ?? 0,
    };

    return NextResponse.json({ jobs: jobsResult.rows, stats });
  } catch (err: any) {
    // Return empty data gracefully if DB not yet initialized
    console.error("[/api/dashboard/jobs]", err.message);
    return NextResponse.json({
      jobs: [],
      stats: {
        totalJobs: 0,
        completedJobs: 0,
        pendingJobs: 0,
        failedJobs: 0,
        awaitingReview: 0,
        avgUdecScore: 0,
        totalLeads: 0,
      },
    });
  }
}
