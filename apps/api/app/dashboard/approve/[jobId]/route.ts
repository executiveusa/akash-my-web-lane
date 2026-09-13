/**
 * POST /api/dashboard/approve/[jobId]
 * Manually approve a site that scored below 8.5 UDEC — force-deploys it
 */
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
});

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;
  if (!jobId) {
    return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
  }

  try {
    await pool.query(
      `UPDATE migration_jobs
       SET status = 'approved_deploy',
           current_step = 'manual_approve',
           data = data || '{"manuallyApproved": true}'::jsonb,
           updated_at = NOW()
       WHERE job_id = $1`,
      [jobId]
    );

    // Re-queue for the deploy step only
    await pool.query(
      `UPDATE migration_jobs
       SET status = 'queued',
           current_step = 'deploy',
           updated_at = NOW()
       WHERE job_id = $1`,
      [jobId]
    );

    return NextResponse.json({ ok: true, jobId, action: "approved" });
  } catch (err: any) {
    console.error("[/api/dashboard/approve]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
