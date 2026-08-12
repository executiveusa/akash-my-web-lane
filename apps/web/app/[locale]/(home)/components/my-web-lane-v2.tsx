"use client";

import { FormEvent, useState } from "react";

type AuditReport = {
  wpUrl: string;
  niche: string;
  performance: {
    score: number;
    source: "pagespeed" | "heuristic";
    note: string;
  };
  plugins: string[];
  pageCount: number;
  painPoints: string[];
  opportunities: string[];
  competitorInsights: string;
  analyzedAt: string;
};

type ApiResponse = {
  success?: boolean;
  report?: AuditReport;
  error?: string;
  message?: string;
};

export function MyWebLaneV2() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);

  async function runAudit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setReport(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      setError("Audit API is not configured. Set NEXT_PUBLIC_API_URL for this deployment.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wpUrl: url }),
      });

      const data = (await response.json()) as ApiResponse;
      if (!response.ok || !data.report) {
        throw new Error(data.message || data.error || "Audit failed");
      }

      setReport(data.report);
    } catch (auditError) {
      setError(auditError instanceof Error ? auditError.message : "Audit failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f1] text-[#171717]">
      <nav className="flex h-16 items-center justify-between border-b border-black/10 px-5 md:px-10">
        <div className="font-semibold tracking-tight">
          Akash Engine <span className="text-black/35">/</span> MyWebLane
        </div>
        <a
          href="https://wa.me/17025273771?text=Hi%20Akash%2C%20I%27d%20like%20a%20MyWebLane%20site%20audit"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium hover:border-black/30"
        >
          Talk to Akash
        </a>
      </nav>

      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col justify-center px-5 py-16 md:px-8">
        <div className="mb-8 max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
            Web lane
          </div>
          <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-6xl">
            Keep WordPress where it fits. Get out when it doesn&apos;t.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-black/60 md:text-lg">
            Give MyWebLane a site. It checks the current stack, performance evidence, plugin drag, and conversion issues, then tells you whether the least-risk move is to keep it, clean it up, or prepare a modern migration.
          </p>
        </div>

        <form onSubmit={runAudit} className="rounded-3xl border border-black/10 bg-white p-3 shadow-[0_18px_60px_rgba(0,0,0,.06)]">
          <label htmlFor="site-url" className="sr-only">
            Website URL
          </label>
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              id="site-url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://your-wordpress-site.com"
              required
              className="min-h-14 flex-1 rounded-2xl border border-transparent bg-[#f4f4f0] px-4 outline-none transition focus:border-black/20 focus:bg-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="min-h-14 rounded-2xl bg-black px-6 font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Auditing…" : "Audit this site"}
            </button>
          </div>
        </form>

        <p className="mt-3 text-xs leading-5 text-black/45">
          Performance scores are identified as measured PageSpeed/Lighthouse data or as a labeled heuristic fallback. No guaranteed score or migration time is shown before real work exists to support it.
        </p>

        {error ? (
          <section className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
            <div className="font-semibold">Audit could not run</div>
            <p className="mt-1">{error}</p>
          </section>
        ) : null}

        {report ? (
          <section className="mt-8 grid gap-4">
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Audit result</div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">{report.wpUrl}</h2>
                  <p className="mt-1 text-sm text-black/50">Detected niche: {report.niche}</p>
                </div>
                <div className="rounded-2xl bg-[#f4f4f0] px-5 py-4 md:text-right">
                  <div className="text-3xl font-semibold">{report.performance.score}</div>
                  <div className="text-xs font-medium uppercase tracking-[0.13em] text-black/45">
                    {report.performance.source === "pagespeed" ? "Measured performance" : "Estimated performance"}
                  </div>
                </div>
              </div>
              <p className="mt-5 rounded-2xl bg-[#f7f7f4] p-4 text-sm leading-6 text-black/55">
                {report.performance.note}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ResultList title="What is costing position" items={report.painPoints} />
              <ResultList title="What could improve" items={report.opportunities} />
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Detected stack evidence</div>
              <p className="mt-3 text-sm leading-6 text-black/60">
                {report.plugins.length ? report.plugins.join(" · ") : "No known WordPress plugin fingerprints were detected in the crawl."}
              </p>
              <p className="mt-3 text-sm text-black/45">Pages observed: {report.pageCount}</p>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl bg-black p-6 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Next human decision</div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                  Review the evidence, then decide whether to keep WordPress, clean it up, or scope a migration. The audit does not start a rebuild on its own.
                </p>
              </div>
              <a
                href="https://wa.me/17025273771?text=Hi%20Akash%2C%20I%20ran%20the%20MyWebLane%20audit%20and%20want%20to%20review%20the%20result"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
              >
                Review with Akash
              </a>
            </div>
          </section>
        ) : (
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            <MiniCard title="1. Measure" body="Use real performance evidence when available." />
            <MiniCard title="2. Diagnose" body="Separate CMS/plugin drag from actual business problems." />
            <MiniCard title="3. Decide" body="Keep, clean up, or migrate only when evidence supports it." />
          </div>
        )}
      </section>
    </main>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-black/60">
        {items.length ? items.map((item) => <li key={item}>• {item}</li>) : <li>• No evidence returned.</li>}
      </ul>
    </div>
  );
}

function MiniCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-6 text-black/50">{body}</p>
    </div>
  );
}
