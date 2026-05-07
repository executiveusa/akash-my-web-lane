import "server-only";

const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN ?? "";
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID ?? "";
const LANE_API = process.env.LANE_API_URL ?? "";
const LANE_KEY = process.env.LANE_API_KEY ?? "";

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
  status: "queued" | "running" | "completed" | "failed";
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
  if (!LANE_API) throw new Error("LANE_API_URL not configured");

  const res = await fetch(`${LANE_API}/api/jobs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LANE_KEY}`,
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
  const res = await fetch(`${LANE_API}/api/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${LANE_KEY}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Job ${jobId} not found`);
  const d = await res.json();
  return {
    jobId: d.id,
    status: d.status,
    previewUrl: d.preview_url,
    liveUrl: d.live_url,
    adminUrl: d.admin_url,
    lighthouseScore: d.lighthouse_score,
    udecScore: d.udec_score,
    errorMessage: d.error_message,
  };
}

export async function setCustomDomain(
  projectName: string,
  domain: string
): Promise<void> {
  if (!CF_TOKEN || !CF_ACCOUNT) return;
  await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/pages/projects/${projectName}/domains`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
    }
  );
}

export async function listClientSites(): Promise<
  { name: string; url: string; created: string }[]
> {
  if (!CF_TOKEN || !CF_ACCOUNT) return [];
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/pages/projects?per_page=100`,
    {
      headers: { Authorization: `Bearer ${CF_TOKEN}` },
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
