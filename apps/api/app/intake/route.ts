import { NextRequest, NextResponse } from "next/server";
import { analyzeWordPressSite } from "@repo/synthia/analyzer";
import { z } from "zod";

const BOTANIC_SUPABASE_URL = "https://cyxdevcjycmffhmwxojh.supabase.co";

const IntakeSchema = z.object({
  wpUrl: z.string().url("Must be a valid URL"),
  email: z.string().email().optional(),
  clientName: z.string().optional(),
  whatsapp: z.string().optional(),
});

/**
 * POST /api/intake
 * Accepts a WordPress URL, runs SYNTHIA analysis, and stores the evidence through
 * the same portable MyWebLane Supabase boundary used by the public web app.
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
    const persistence = await storeAuditLead({ wpUrl, email, clientName, whatsapp, report });

    return NextResponse.json({
      success: true,
      persistence,
      report: {
        wpUrl: report.wpUrl,
        niche: report.niche,
        performance: {
          score: report.currentScore,
          source: report.scoreSource,
          note: report.scoreNote,
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

async function storeAuditLead(data: {
  wpUrl: string;
  email?: string;
  clientName?: string;
  whatsapp?: string;
  report: any;
}) {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    BOTANIC_SUPABASE_URL;

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/functions/v1/myweblane-audit-intake`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      wp_url: data.wpUrl,
      email: data.email ?? null,
      client_name: data.clientName ?? null,
      whatsapp: data.whatsapp ?? null,
      report: data.report,
      evidence_source: data.report?.scoreSource ?? "SYNTHIA",
      measured_at: data.report?.analyzedAt ?? new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`MyWebLane audit persistence failed (${response.status}): ${detail.slice(0, 250)}`);
  }

  const result = (await response.json()) as { success?: boolean; audit_id?: string };
  return { persisted: result.success === true, auditId: result.audit_id ?? null };
}
