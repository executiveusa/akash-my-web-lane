"use client";

import { FormEvent, useState } from "react";

type AuditItem = {
  id: string;
  title: string;
  value: string | null;
  score: number | null;
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
  metrics: AuditItem[];
  opportunities: AuditItem[];
  cms: {
    detected: string | null;
    note: string;
  };
  nextDecision: string;
};

type ApiResponse = {
  success?: boolean;
  report?: AuditReport;
  error?: string;
  message?: string;
};

const process = [
  ["01", "Measure first", "Run a real mobile Lighthouse check before anyone recommends a redesign or migration."],
  ["02", "Separate symptoms from causes", "Performance evidence can show where to investigate. It cannot honestly tell us which CMS decision to make by itself."],
  ["03", "Make the smallest defensible move", "Keep WordPress, clean it up, or plan a migration only after the evidence supports that decision."],
];

export function MyWebLaneV2() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);

  async function runAudit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setReport(null);
    setLoading(true);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
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
    <main className="min-h-screen bg-[#f3f1ea] text-[#181817] dark:bg-[#111] dark:text-white">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9f2d23] dark:text-[#e86a5c]">Website diagnosis before website sales</p>
            <h1 className="mt-5 max-w-4xl text-[clamp(3rem,8vw,6.6rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
              Before you rebuild the site, find out what is actually wrong.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-black/60 dark:text-white/60 md:text-lg">
            MyWebLane gives Akash and the client a shared evidence base before anyone sells a migration. Start with the mobile experience. Keep what works. Investigate what does not.
          </p>
        </div>

        <form onSubmit={runAudit} className="mt-12 border-y border-black/15 py-4 dark:border-white/15 md:mt-16">
          <label htmlFor="site-url" className="mb-2 block text-sm font-medium">
            Website to measure
          </label>
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              id="site-url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://your-site.com"
              required
              inputMode="url"
              className="min-h-14 w-full border border-black/15 bg-white px-4 text-base outline-none transition focus:border-black dark:border-white/20 dark:bg-black dark:focus:border-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="min-h-14 bg-black px-7 font-semibold text-white transition active:scale-[0.99] hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {loading ? "Measuring mobile…" : "Run the mobile check"}
            </button>
          </div>
          <p className="mt-3 text-xs leading-5 text-black/45 dark:text-white/45">
            Real PageSpeed Insights / Lighthouse evidence. No invented future score. No automatic migration recommendation.
          </p>
        </form>

        {error ? (
          <section className="mt-7 border-l-4 border-[#9f2d23] bg-white p-5 text-sm text-[#7d241c] dark:bg-black dark:text-[#ff9a90]">
            <div className="font-semibold">The measurement did not complete.</div>
            <p className="mt-1">{error}</p>
            <p className="mt-2 text-black/50 dark:text-white/50">Nothing has been inferred from a failed check. Try again later or review the site with Akash manually.</p>
          </section>
        ) : null}

        {report ? <AuditResults report={report} /> : null}
      </section>

      {!report ? (
        <>
          <section id="how-it-works" className="border-t border-black/10 bg-[#e7e3d8] dark:border-white/10 dark:bg-[#181818]">
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
              <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">The rule</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Do not migrate on vibes.</h2>
                </div>
                <div className="divide-y divide-black/12 border-y border-black/12 dark:divide-white/12 dark:border-white/12">
                  {process.map(([number, title, body]) => (
                    <div key={number} className="grid gap-3 py-6 sm:grid-cols-[64px_180px_1fr] sm:items-start">
                      <div className="font-mono text-xs text-black/35 dark:text-white/35">{number}</div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm leading-6 text-black/55 dark:text-white/55">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="evidence" className="bg-[#f3f1ea] dark:bg-[#111]">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">What the first pass can prove</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">A useful audit starts with limits.</h2>
              </div>
              <div className="space-y-7 text-sm leading-7 text-black/60 dark:text-white/60 md:text-base">
                <p><strong className="text-black dark:text-white">We can measure:</strong> mobile performance, accessibility signals, best-practice signals, SEO signals, and the Lighthouse diagnostics attached to that run.</p>
                <p><strong className="text-black dark:text-white">We do not pretend that proves:</strong> the CMS is bad, a redesign will convert better, a migration is safe, or a specific technology should replace WordPress.</p>
                <p><strong className="text-black dark:text-white">The next step is human:</strong> inspect the stack, content, plugins, business constraints, and maintenance reality before choosing keep, clean up, or migrate.</p>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}

function AuditResults({ report }: { report: AuditReport }) {
  return (
    <section className="mt-10 border-t border-black/15 pt-8 dark:border-white/15">
      <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">Measured audit</p>
          <h2 className="mt-2 break-all text-2xl font-semibold tracking-tight">{report.url}</h2>
          <p className="mt-2 text-sm text-black/50 dark:text-white/50">
            {report.evidenceSource} · {report.strategy} · {new Date(report.measuredAt).toLocaleString()}
          </p>
        </div>
        <Score label="Mobile performance" score={report.scores.performance} large />
      </div>

      <div className="mt-8 grid border-y border-black/12 sm:grid-cols-3 dark:border-white/12">
        <Score label="Accessibility" score={report.scores.accessibility} />
        <Score label="Best practices" score={report.scores.bestPractices} />
        <Score label="SEO" score={report.scores.seo} />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <AuditList title="Core mobile metrics" items={report.metrics} empty="No Lighthouse metric evidence returned." />
        <AuditList title="First things to inspect" items={report.opportunities} empty="No scored Lighthouse opportunities returned." />
      </div>

      <div className="mt-10 grid gap-5 border-t border-black/12 pt-7 dark:border-white/12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40 dark:text-white/40">Next decision</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/65 dark:text-white/65">{report.nextDecision}</p>
          <p className="mt-3 text-xs leading-5 text-black/40 dark:text-white/40">{report.cms.note}</p>
        </div>
        <a
          href="https://wa.me/17025273771?text=Hi%20Akash%2C%20I%20ran%20the%20MyWebLane%20audit%20and%20want%20to%20review%20the%20result"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center bg-black px-6 text-sm font-semibold text-white dark:bg-white dark:text-black"
        >
          Review the evidence
        </a>
      </div>
    </section>
  );
}

function Score({ label, score, large = false }: { label: string; score: number | null; large?: boolean }) {
  return (
    <div className={large ? "border-l border-black/12 pl-6 dark:border-white/12" : "border-b border-black/12 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0 dark:border-white/12"}>
      <div className={large ? "text-5xl font-semibold tracking-[-0.05em]" : "text-3xl font-semibold tracking-[-0.04em]"}>{score ?? "—"}</div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.13em] text-black/45 dark:text-white/45">{label}</div>
    </div>
  );
}

function AuditList({ title, items, empty }: { title: string; items: AuditItem[]; empty: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 divide-y divide-black/10 border-y border-black/10 text-sm leading-6 dark:divide-white/10 dark:border-white/10">
        {items.length ? (
          items.map((item) => (
            <li key={item.id} className="py-4">
              <div className="font-medium">{item.title}</div>
              <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-black/45 dark:text-white/45">
                {item.value ? <span>{item.value}</span> : null}
                {item.score !== null ? <span>Audit score {item.score}</span> : null}
              </div>
            </li>
          ))
        ) : (
          <li className="py-4 text-black/50 dark:text-white/50">{empty}</li>
        )}
      </ul>
    </div>
  );
}
