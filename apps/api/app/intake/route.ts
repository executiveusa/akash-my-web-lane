import { NextRequest, NextResponse } from "next/server";
import { analyzeWordPressSite } from "@repo/synthia/analyzer";
import { z } from "zod";

const IntakeSchema = z.object({
  wpUrl: z.string().url("Must be a valid URL"),
  email: z.string().email().optional(),
  clientName: z.string().optional(),
  whatsapp: z.string().optional(),
});

/**
 * POST /api/intake
 * Accepts a WordPress URL, runs SYNTHIA analysis, returns an audit report.
 *
 * Important: this endpoint does not invent a projected Lighthouse score or a
 * guaranteed migration time. Measured performance belongs to a real
 * PageSpeed/Lighthouse run; heuristic findings must be labeled as estimates.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = IntakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { wpUrl, email, clientName, whatsapp } = parsed.data;

  try {
    const report = await analyzeWordPressSite(wpUrl, clientName, whatsapp);

    try {
      await storeAuditLead({ wpUrl, email, clientName, whatsapp, report });
    } catch (dbError) {
      console.error("DB store failed (non-fatal):", dbError);
    }

    return NextResponse.json({
      success: true,
      report: {
        wpUrl: report.wpUrl,
        niche: report.niche,
        performanceEstimate: {
          score: report.currentScore,
          source: "heuristic",
          label: "Estimated from site characteristics; not a measured Lighthouse result",
        },
        plugins: report.plugins,
        pageCount: report.pageCount,
        painPoints: report.painPoints,
        opportunities: report.opportunities,
        competitorInsights: report.competitorInsights,
        migrationEstimate: null,
        projectedPerformance: null,
        analyzedAt: report.analyzedAt,
      },
    });
  } catch (error: any) {
    console.error("Intake analysis failed:", error);
    return NextResponse.json(
      {
        error: "Analysis failed",
        message: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

/** Store lead in DB for dashboard visibility */
async function storeAuditLead(data: {
  wpUrl: string;
  email?: string;
  clientName?: string;
  whatsapp?: string;
  report: any;
}) {
  const { neon } = await import("@neondatabase/serverless");
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) return;

  const sql = neon(DATABASE_URL);
  await sql`
    INSERT INTO audit_leads (wp_url, email, client_name, whatsapp, report, created_at)
    VALUES (${data.wpUrl}, ${data.email ?? null}, ${data.clientName ?? null},
            ${data.whatsapp ?? null}, ${JSON.stringify(data.report)}, NOW())
    ON CONFLICT (wp_url) DO UPDATE SET
      report = EXCLUDED.report,
      updated_at = NOW()
  `;
}
