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
 * Accepts a WordPress URL, runs SYNTHIA analysis, returns audit report
 * This powers the "Run Free Audit" CTA on the landing page
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

    // Store in DB for Akash's dashboard (fire-and-forget)
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
        currentScore: report.currentScore,
        plugins: report.plugins,
        pageCount: report.pageCount,
        painPoints: report.painPoints,
        opportunities: report.opportunities,
        competitorInsights: report.competitorInsights,
        projectedScore: 96, // our guarantee
        estimatedTime: "25 minutes",
        analyzedAt: report.analyzedAt,
      },
    });
  } catch (error: any) {
    console.error("Intake analysis failed:", error);
    return NextResponse.json(
      {
        error: "Analysis failed",
        message:
          process.env.NODE_ENV === "development" ? error.message : undefined,
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
