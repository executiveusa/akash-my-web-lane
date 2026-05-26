import "server-only";
import { getSecret } from "@repo/secrets";
import { QualityGate, CircuitBreaker } from "@repo/migrations";

export interface MigrationRequest {
  wpUrl: string;
  clientName: string;
  clientSlug: string;
  clientDomain?: string;
  language: "en" | "hi" | "es";
  plan: string;
  paymentId?: string;
}

export interface MigrationResult {
  jobId: string;
  status: "queued" | "running" | "completed" | "failed" | "quality_review_required";
  previewUrl?: string;
  liveUrl?: string;
  adminUrl?: string;
  lighthouseScore?: number;
  udecScore?: number;
  errorMessage?: string;
}

export async function startMigration(
  request: MigrationRequest
): Promise<{ jobId: string }> {
  const circuitBreaker = new CircuitBreaker();
  const { allowed, reason } = await circuitBreaker.checkCanStartMigration({
    clientSlug: request.clientSlug,
    plan: request.plan,
  });

  if (!allowed) {
    throw new Error(`Circuit Breaker blocked migration: ${reason}`);
  }

  const laneApiUrl = await getSecret("LANE_API_URL");
  const laneApiKey = await getSecret("LANE_API_KEY");

  if (!laneApiUrl) throw new Error("LANE_API_URL not configured");

  const res = await fetch(`${laneApiUrl}/api/jobs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${laneApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: { type: "live", url: request.wpUrl },
      plan: request.plan,
      client_name: request.clientName,
      client_slug: request.clientSlug,
      client_domain: request.clientDomain,
      language: request.language,
      payment_id: request.paymentId,
    }),
  });

  if (!res.ok) throw new Error(`Migration start failed: ${await res.text()}`);
  const data = await res.json();
  return { jobId: data.id };
}

export async function getJobStatus(jobId: string): Promise<MigrationResult> {
  const laneApiUrl = await getSecret("LANE_API_URL");
  const laneApiKey = await getSecret("LANE_API_KEY");

  const res = await fetch(`${laneApiUrl}/api/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${laneApiKey}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Job ${jobId} not found`);
  const d = await res.json();

  // Enforce quality gate
  const gate = new QualityGate();
  const gateResult = await gate.enforceGate(
    d.id,
    d.udec_score,
    d.lighthouse_score
  );

  return {
    jobId: d.id,
    status: gateResult.allowed ? d.status : "quality_review_required",
    previewUrl: d.preview_url,
    liveUrl: gateResult.allowed ? d.live_url : undefined,
    adminUrl: d.admin_url,
    lighthouseScore: d.lighthouse_score,
    udecScore: d.udec_score,
    errorMessage: gateResult.allowed ? d.error_message : gateResult.reason,
  };
}

export async function setCustomDomain(
  projectName: string,
  domain: string
): Promise<void> {
  const cfToken = await getSecret("CLOUDFLARE_API_TOKEN");
  const cfAccount = await getSecret("CLOUDFLARE_ACCOUNT_ID");

  if (!cfToken || !cfAccount) return;
  await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccount}/pages/projects/${projectName}/domains`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
    }
  );
}

export async function listClientSites(): Promise<
  { name: string; url: string; created: string }[]
> {
  const cfToken = await getSecret("CLOUDFLARE_API_TOKEN");
  const cfAccount = await getSecret("CLOUDFLARE_ACCOUNT_ID");

  if (!cfToken || !cfAccount) return [];
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccount}/pages/projects?per_page=100`,
    {
      headers: { Authorization: `Bearer ${cfToken}` },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.result ?? []).map((p: Record<string, unknown>) => ({
    name: p.name as string,
    url: `https://${p.name}.pages.dev`,
    created: p.created_on as string,
  }));
}
