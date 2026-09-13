"use client";

import { useEffect, useState } from "react";

interface MigrationJob {
  job_id: string;
  status: "queued" | "running" | "completed" | "failed" | "needs_rebuild" | "awaiting_review";
  current_step: string;
  data: {
    niche?: string;
    currentScore?: number;
    udecFinal?: number;
    deployUrl?: string;
    message?: string;
    lighthouseEstimate?: number;
  };
  created_at: string;
  updated_at: string;
}

interface AuditLead {
  id: number;
  wp_url: string;
  email?: string;
  client_name?: string;
  report?: {
    niche: string;
    currentScore: number;
    painPoints: string[];
  };
  created_at: string;
}

interface DashboardStats {
  totalJobs: number;
  completedJobs: number;
  pendingJobs: number;
  failedJobs: number;
  awaitingReview: number;
  avgUdecScore: number;
  totalLeads: number;
}

const STATUS_COLORS: Record<string, string> = {
  queued: "#6b7280",
  running: "#c9a84c",
  completed: "#4ade80",
  failed: "#e85555",
  needs_rebuild: "#f97316",
  awaiting_review: "#a78bfa",
};

const STATUS_LABELS: Record<string, string> = {
  queued: "⏳ Queued",
  running: "🔄 Running",
  completed: "✅ Live",
  failed: "❌ Failed",
  needs_rebuild: "🔨 Needs Rebuild",
  awaiting_review: "👁️ Review Needed",
};

const STEP_PROGRESS: Record<string, number> = {
  analyze: 10,
  analyze_complete: 25,
  design: 35,
  design_complete: 50,
  build: 60,
  build_complete: 75,
  judge: 80,
  judge_complete: 90,
  deploy: 92,
  deployed: 100,
  error: 0,
};

export function PiDashboard() {
  const [jobs, setJobs] = useState<MigrationJob[]>([]);
  const [leads, setLeads] = useState<AuditLead[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"jobs" | "leads" | "review">("jobs");

  async function fetchData() {
    try {
      const [jobsRes, leadsRes] = await Promise.all([
        fetch("/api/dashboard/jobs"),
        fetch("/api/dashboard/leads"),
      ]);
      const jobsData = await jobsRes.json();
      const leadsData = await leadsRes.json();
      
      setJobs(jobsData.jobs ?? []);
      setLeads(leadsData.leads ?? []);
      setStats(jobsData.stats ?? null);
    } catch (e) {
      console.error("Dashboard fetch failed:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15_000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const reviewJobs = jobs.filter((j) => j.status === "awaiting_review");

  return (
    <div style={{
      fontFamily: "'Outfit', 'DM Sans', sans-serif",
      background: "#07090f",
      color: "#f2ece0",
      minHeight: "100vh",
      padding: "0",
    }}>
      {/* Header */}
      <header style={{
        background: "rgba(13,17,23,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20, fontWeight: 700 }}>
            My <span style={{ color: "#c9a84c" }}>Web Lane</span>
          </span>
          <span style={{
            fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#6b7280", paddingLeft: 12, borderLeft: "1px solid rgba(255,255,255,0.1)",
          }}>Pi Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", animation: "blink 2s infinite" }} />
          <span style={{ fontSize: 12, color: "#4ade80" }}>SYNTHIA Online</span>
        </div>
      </header>

      {/* Stats Row */}
      {stats && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 1,
          background: "rgba(255,255,255,0.05)",
          margin: "24px 32px",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          {[
            { label: "Total Jobs", value: stats.totalJobs, color: "#c9a84c" },
            { label: "Live Sites", value: stats.completedJobs, color: "#4ade80" },
            { label: "Running", value: stats.pendingJobs, color: "#c9a84c" },
            { label: "Need Review", value: stats.awaitingReview, color: "#a78bfa" },
            { label: "Avg UDEC", value: `${stats.avgUdecScore.toFixed(1)}/10`, color: "#c9a84c" },
            { label: "Total Leads", value: stats.totalLeads, color: "#60a5fa" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "#0d1117",
              padding: "20px 24px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: stat.color, fontFamily: "'JetBrains Mono', monospace" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div style={{ padding: "0 32px", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 4, background: "#0d1117", padding: 4, borderRadius: 10, width: "fit-content" }}>
          {(["jobs", "leads", "review"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                background: activeTab === tab ? "#c9a84c" : "transparent",
                color: activeTab === tab ? "#07090f" : "#6b7280",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab === "review" ? `⚠️ Review (${reviewJobs.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 32px 32px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
            Loading SYNTHIA data...
          </div>
        ) : activeTab === "jobs" ? (
          <JobsTable jobs={jobs} onRefresh={fetchData} />
        ) : activeTab === "leads" ? (
          <LeadsTable leads={leads} />
        ) : (
          <ReviewQueue jobs={reviewJobs} onApprove={fetchData} />
        )}
      </div>
    </div>
  );
}

function JobsTable({ jobs, onRefresh }: { jobs: MigrationJob[]; onRefresh: () => void }) {
  if (!jobs.length) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
        <div>No migrations yet. Share the landing page to get your first client!</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {jobs.map((job) => {
        const progress = STEP_PROGRESS[job.current_step] ?? 0;
        return (
          <div key={job.job_id} style={{
            background: "#0d1117",
            border: `1px solid ${STATUS_COLORS[job.status]}22`,
            borderLeft: `3px solid ${STATUS_COLORS[job.status]}`,
            borderRadius: 12,
            padding: "20px 24px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                  {job.data.niche ?? "Analyzing..."} Site
                </div>
                <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}>
                  {job.job_id.slice(0, 16)}...
                </div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "4px 10px",
                borderRadius: 6, background: `${STATUS_COLORS[job.status]}22`,
                color: STATUS_COLORS[job.status],
              }}>
                {STATUS_LABELS[job.status]}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ background: "#131820", borderRadius: 4, height: 6, marginBottom: 8 }}>
              <div style={{
                height: "100%", borderRadius: 4,
                background: STATUS_COLORS[job.status],
                width: `${progress}%`,
                transition: "width 1s ease",
              }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280" }}>
              <span>{job.data.message ?? job.current_step}</span>
              <span>{progress}%</span>
            </div>

            {job.data.deployUrl && (
              <a href={job.data.deployUrl} target="_blank" rel="noreferrer"
                style={{ display: "inline-block", marginTop: 12, fontSize: 12, color: "#4ade80", textDecoration: "none" }}>
                🌐 View live site →
              </a>
            )}

            {job.data.udecFinal && (
              <div style={{ marginTop: 8, fontSize: 12, color: "#c9a84c" }}>
                UDEC: {job.data.udecFinal}/10 · Lighthouse: {job.data.lighthouseEstimate}/100
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LeadsTable({ leads }: { leads: AuditLead[] }) {
  if (!leads.length) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
        <div>No audit leads yet. Every "Run Free Audit" click shows up here.</div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
      {leads.map((lead) => (
        <div key={lead.id} style={{
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          padding: "20px 24px",
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#c9a84c" }}>
            {lead.client_name ?? "Anonymous"}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8, wordBreak: "break-all" }}>
            {lead.wp_url}
          </div>
          {lead.report && (
            <>
              <div style={{ fontSize: 12, color: "#f2ece0" }}>
                Niche: <strong>{lead.report.niche}</strong>
              </div>
              <div style={{ fontSize: 12, color: "#e85555" }}>
                Score: {lead.report.currentScore}/100
              </div>
            </>
          )}
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 8 }}>
            {new Date(lead.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewQueue({ jobs, onApprove }: { jobs: MigrationJob[]; onApprove: () => void }) {
  if (!jobs.length) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div>No sites waiting for review. SYNTHIA's doing its job!</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {jobs.map((job) => (
        <div key={job.job_id} style={{
          background: "#0d1117",
          border: "1px solid #a78bfa44",
          borderLeft: "3px solid #a78bfa",
          borderRadius: 12,
          padding: "24px",
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
            {job.data.niche ?? "Site"} — Needs Your Review
          </div>
          <div style={{ fontSize: 13, color: "#a78bfa", marginBottom: 16 }}>
            UDEC Score: {job.data.udecFinal}/10 (below 8.5 threshold)
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={async () => {
                await fetch(`/api/dashboard/approve/${job.job_id}`, { method: "POST" });
                onApprove();
              }}
              style={{
                padding: "8px 20px",
                background: "#4ade80",
                color: "#07090f",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              ✅ Approve & Deploy
            </button>
            <button
              onClick={async () => {
                await fetch(`/api/dashboard/rebuild/${job.job_id}`, { method: "POST" });
                onApprove();
              }}
              style={{
                padding: "8px 20px",
                background: "transparent",
                color: "#e85555",
                border: "1px solid #e8555544",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              🔨 Rebuild
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
