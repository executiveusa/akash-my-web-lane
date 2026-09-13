/**
 * GET /api/dashboard/leads
 * Returns all audit leads captured via the free audit CTA
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
    const result = await pool.query(`
      SELECT id, wp_url, email, client_name, whatsapp, report, created_at, updated_at
      FROM audit_leads
      ORDER BY created_at DESC
      LIMIT 200
    `);
    return NextResponse.json({ leads: result.rows });
  } catch (err: any) {
    console.error("[/api/dashboard/leads]", err.message);
    return NextResponse.json({ leads: [] });
  }
}
