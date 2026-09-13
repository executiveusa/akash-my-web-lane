/**
 * POST /api/dashboard/rebuild/[jobId]
 * Sends a low-scoring job back to the design step for a full rebuild
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
    const existing = await pool.query(
      `SELECT payload, data FROM migration_jobs WHERE job_id = $1`,
      [jobId]
    );
    if (!existing.rows.length) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const retryCount = (existing.rows[0].data?.retryCount ?? 0) + 1;

    await pool.query(
      `UPDATE migration_jobs
       SET status = 'queued',
           current_step = 'design',
           data = data || jsonb_build_object('retryCount', $2, 'message', 'Rebuild requested by Akash'),
           updated_at = NOW()
       WHERE job_id = $1`,
      [jobId, retryCount]
    );

    return NextResponse.json({ ok: true, jobId, action: "rebuild", retryCount });
  } catch (err: any) {
    console.error("[/api/dashboard/rebuild]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
