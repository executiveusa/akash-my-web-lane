import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const AuditRequestSchema = z.object({
  url: z.string().url(),
});

type LighthouseAudit = {
  id: string;
  title: string;
  description?: string;
  score?: number | null;
  displayValue?: string;
};

type AuditReport = {
  url: string;
  measuredAt: string;
  evidenceSource: string;
  strategy: string;
  scores: {
    performance: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    seo: number | null;
  };
  metrics: Array<{ id: string; title: string; value: string | null; score: number | null }>;
  opportunities: Array<{ id: string; title: string; value: string | null; score: number | null }>;
  cms: { detected: string | null; note: string };
  nextDecision: string;
};

function scoreToPercent(score: unknown): number | null {
  return typeof score === "number" ? Math.round(score * 100) : null;
}

function asAudit(value: unknown): LighthouseAudit | null {
  if (!value || typeof value !== "object") return null;
  const audit = value as Record<string, unknown>;
  if (typeof audit.id !== "string" || typeof audit.title !== "string") return null;
  return {
    id: audit.id,
    title: audit.title,
    description: typeof audit.description === "string" ? audit.description : undefined,
    score: typeof audit.score === "number" ? audit.score : null,
    displayValue: typeof audit.displayValue === "string" ? audit.displayValue : undefined,
  };
}

function safeTarget(input: string): URL {
  const target = new URL(input);
  if (target.protocol !== "https:" && target.protocol !== "http:") {
    throw new Error("Only http and https websites can be audited");
  }

  const host = target.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host.endsWith(".local")
  ) {
    throw new Error("Local/private targets are not allowed");
  }

  return target;
}

async function persistAudit(report: AuditReport): Promise<{ persisted: boolean; auditId: string | null }> {
  // Vercel's Supabase integration commonly injects SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL.
  // There is intentionally no database password or service-role secret in this app.
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    console.warn("MyWebLane audit persistence skipped: Supabase URL is not configured");
    return { persisted: false, auditId: null };
  }

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/functions/v1/myweblane-audit-intake`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wp_url: report.url,
        report,
        evidence_source: report.evidenceSource,
        measured_at: report.measuredAt,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("MyWebLane audit persistence failed", response.status, detail.slice(0, 500));
      return { persisted: false, auditId: null };
    }

    const body = (await response.json()) as { audit_id?: string };
    return { persisted: true, auditId: body.audit_id ?? null };
  } catch (error) {
    console.error("MyWebLane audit persistence error", error instanceof Error ? error.message : error);
    return { persisted: false, auditId: null };
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = AuditRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Provide a valid website URL", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  let target: URL;
  try {
    target = safeTarget(parsed.data.url);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid target" },
      { status: 422 }
    );
  }

  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", target.toString());
  endpoint.searchParams.set("strategy", "mobile");
  for (const category of ["performance", "accessibility", "best-practices", "seo"]) {
    endpoint.searchParams.append("category", category);
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  if (apiKey) endpoint.searchParams.set("key", apiKey);

  try {
    const response = await fetch(endpoint.toString(), {
      signal: AbortSignal.timeout(45_000),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PageSpeed audit failed", response.status, errorText.slice(0, 500));
      return NextResponse.json(
        { error: "PageSpeed could not measure this site right now" },
        { status: 502 }
      );
    }

    const data = (await response.json()) as any;
    const lighthouse = data?.lighthouseResult;
    if (!lighthouse) {
      return NextResponse.json(
        { error: "PageSpeed returned no Lighthouse result" },
        { status: 502 }
      );
    }

    const categories = lighthouse.categories ?? {};
    const audits = lighthouse.audits ?? {};
    const metricIds = [
      "first-contentful-paint",
      "largest-contentful-paint",
      "total-blocking-time",
      "cumulative-layout-shift",
      "speed-index",
    ];

    const metrics = metricIds
      .map((id) => asAudit(audits[id]))
      .filter((audit): audit is LighthouseAudit => Boolean(audit))
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        value: audit.displayValue ?? null,
        score: scoreToPercent(audit.score),
      }));

    const opportunities = Object.values(audits)
      .map(asAudit)
      .filter((audit): audit is LighthouseAudit => Boolean(audit))
      .filter((audit) => typeof audit.score === "number" && audit.score < 0.9)
      .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
      .slice(0, 6)
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        value: audit.displayValue ?? null,
        score: scoreToPercent(audit.score),
      }));

    const report: AuditReport = {
      url: lighthouse.finalDisplayedUrl ?? target.toString(),
      measuredAt: lighthouse.fetchTime ?? new Date().toISOString(),
      evidenceSource: "Google PageSpeed Insights / Lighthouse",
      strategy: "mobile",
      scores: {
        performance: scoreToPercent(categories.performance?.score),
        accessibility: scoreToPercent(categories.accessibility?.score),
        bestPractices: scoreToPercent(categories["best-practices"]?.score),
        seo: scoreToPercent(categories.seo?.score),
      },
      metrics,
      opportunities,
      cms: {
        detected: null,
        note: "CMS detection is intentionally not guessed from Lighthouse data. Deeper stack analysis runs only when requested.",
      },
      nextDecision: "Review the measured evidence before deciding to keep, clean up, or migrate the site.",
    };

    const persistence = await persistAudit(report);

    return NextResponse.json({
      success: true,
      report,
      persistence,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit request failed";
    console.error("MyWebLane audit error", message);
    return NextResponse.json({ error: "Audit request failed" }, { status: 500 });
  }
}
