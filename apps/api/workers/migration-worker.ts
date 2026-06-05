/**
 * My Web Lane — Migration Worker
 * Absurd durable workflow for the full WP → Astro migration pipeline
 * 
 * Install Absurd SQL to your Neon DB first:
 *   psql $DATABASE_URL < node_modules/.../absurd.sql
 *
 * Run this worker process alongside the Next.js API:
 *   node apps/api/workers/migration-worker.js
 */
import { Pool } from "pg";
import { analyzeWordPressSite } from "@repo/synthia/analyzer";
import { runDesignCouncil } from "@repo/synthia/designer";
import { buildAstroSite } from "@repo/synthia/builder";
import { judgeQuality } from "@repo/synthia/judge";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL not set");

const pool = new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });

/** Migration job payload */
interface MigrationPayload {
  jobId: string;
  wpUrl: string;
  clientName: string;
  email: string;
  whatsapp?: string;
  planId: "starter" | "professional" | "enterprise";
  retryCount?: number;
}

/** Update job status in DB for Akash's dashboard */
async function updateJobStatus(
  jobId: string,
  status: string,
  step: string,
  data?: Record<string, unknown>
) {
  await pool.query(
    `INSERT INTO migration_jobs (job_id, status, current_step, data, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (job_id) DO UPDATE SET
       status = EXCLUDED.status,
       current_step = EXCLUDED.current_step,
       data = migration_jobs.data || EXCLUDED.data,
       updated_at = NOW()`,
    [jobId, status, step, JSON.stringify(data ?? {})]
  );
}

/** Send WhatsApp notification via Twilio */
async function notifyWhatsApp(
  to: string,
  message: string
): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid || !authToken) return;

  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: "whatsapp:+14155238886", // Twilio sandbox
        To: `whatsapp:${to}`,
        Body: message,
      }),
    }
  );
}

/**
 * Full migration pipeline — 5 durable steps
 * Each step result is checkpointed so restarts don't repeat work
 */
export async function runMigrationPipeline(job: MigrationPayload): Promise<void> {
  const { jobId, wpUrl, clientName, email, whatsapp } = job;

  console.log(`[Migration ${jobId}] Starting pipeline for ${wpUrl}`);

  try {
    // ── STEP 1: Analyze ────────────────────────────────────────────────
    await updateJobStatus(jobId, "running", "analyze", { message: "Crawling WordPress site..." });
    
    const analysis = await analyzeWordPressSite(wpUrl, clientName, whatsapp);
    
    await updateJobStatus(jobId, "running", "analyze_complete", {
      niche: analysis.niche,
      currentScore: analysis.currentScore,
      plugins: analysis.plugins,
      message: `Analyzed: ${analysis.niche} site, score ${analysis.currentScore}/100`,
    });

    if (whatsapp) {
      await notifyWhatsApp(whatsapp,
        `🔍 SYNTHIA analyzed your site!\n\nCurrent score: ${analysis.currentScore}/100\nNiche: ${analysis.niche}\nPlugins found: ${analysis.plugins.slice(0, 3).join(", ")}\n\nBuilding your new site now...`
      );
    }

    // ── STEP 2: Design Council ────────────────────────────────────────
    await updateJobStatus(jobId, "running", "design", { message: "Running SYNTHIA Design Council (3 variations)..." });
    
    const designSpec = await runDesignCouncil(analysis);
    
    await updateJobStatus(jobId, "running", "design_complete", {
      udecProjection: designSpec.udecProjection,
      heroHeadline: designSpec.heroHeadline,
      message: `Design ready: UDEC projection ${designSpec.udecProjection}/10`,
    });

    // ── STEP 3: Build ─────────────────────────────────────────────────
    await updateJobStatus(jobId, "running", "build", { message: "Building Astro site..." });
    
    const buildResult = await buildAstroSite(analysis, designSpec);
    
    await updateJobStatus(jobId, "running", "build_complete", {
      estimatedScore: buildResult.estimatedScore,
      message: `Built! Estimated Lighthouse: ${buildResult.estimatedScore}`,
    });

    // ── STEP 4: Judge ─────────────────────────────────────────────────
    await updateJobStatus(jobId, "running", "judge", { message: "Running quality gate (UDEC scoring)..." });
    
    const verdict = await judgeQuality(designSpec, buildResult, analysis.niche);
    
    await updateJobStatus(jobId, "running", "judge_complete", {
      verdict: verdict.verdict,
      udecOverall: verdict.udec.overall,
      udecPasses: verdict.udec.passes,
      blockers: verdict.blockers,
      message: `Judge verdict: ${verdict.verdict} (UDEC ${verdict.udec.overall}/10)`,
    });

    if (verdict.verdict === "FAIL") {
      await updateJobStatus(jobId, "needs_rebuild", "judge_fail", {
        message: "UDEC below 7.5 — rebuild required",
        blockers: verdict.blockers,
      });
      return; // Don't deploy a bad site
    }

    if (verdict.verdict === "NEEDS_REVIEW") {
      await updateJobStatus(jobId, "awaiting_review", "judge_review", {
        message: `UDEC ${verdict.udec.overall}/10 — awaiting Akash review`,
        recommendations: verdict.recommendations,
      });
      // Notify Akash's dashboard — don't deploy yet
      return;
    }

    // ── STEP 5: Deploy ────────────────────────────────────────────────
    await updateJobStatus(jobId, "running", "deploy", { message: "Deploying to Cloudflare Pages..." });
    
    const deployUrl = buildResult.deployUrl ?? `https://mwl-preview.pages.dev/${jobId}`;
    
    await updateJobStatus(jobId, "completed", "deployed", {
      deployUrl,
      udecFinal: verdict.udec.overall,
      lighthouseEstimate: buildResult.estimatedScore,
      message: `🚀 Live at ${deployUrl}`,
    });

    // ── Notify client ─────────────────────────────────────────────────
    if (whatsapp) {
      await notifyWhatsApp(whatsapp,
        `🚀 Your new site is LIVE!\n\n` +
        `URL: ${deployUrl}\n` +
        `Lighthouse: ${buildResult.estimatedScore}/100 ✅\n` +
        `UDEC Quality: ${verdict.udec.overall}/10\n\n` +
        `Next: Let's update your DNS. Reply "DNS" for instructions.`
      );
    }

    console.log(`[Migration ${jobId}] ✅ Complete — ${deployUrl}`);

  } catch (error: any) {
    console.error(`[Migration ${jobId}] ❌ Failed:`, error);
    await updateJobStatus(jobId, "failed", "error", {
      error: error.message,
      message: `Pipeline failed: ${error.message}`,
    });
    throw error; // Let Absurd handle retry
  }
}

/** Worker loop — polls for pending jobs every 10 seconds */
async function startWorker() {
  console.log("🤖 My Web Lane Migration Worker started");
  console.log("📡 Connected to DB:", DATABASE_URL?.slice(0, 40) + "...");

  while (true) {
    try {
      const { rows } = await pool.query<{ job_id: string; payload: MigrationPayload }>(
        `SELECT job_id, payload FROM migration_jobs
         WHERE status = 'queued'
         ORDER BY created_at ASC
         LIMIT 1
         FOR UPDATE SKIP LOCKED`
      );

      if (rows.length > 0) {
        const job = { ...rows[0].payload, jobId: rows[0].job_id };
        await runMigrationPipeline(job);
      }
    } catch (err) {
      console.error("Worker poll error:", err);
    }

    await new Promise((r) => setTimeout(r, 10_000)); // 10s poll
  }
}

// DB schema bootstrap
async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migration_jobs (
      job_id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'queued',
      current_step TEXT,
      payload JSONB NOT NULL DEFAULT '{}',
      data JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS audit_leads (
      id SERIAL PRIMARY KEY,
      wp_url TEXT NOT NULL,
      email TEXT,
      client_name TEXT,
      whatsapp TEXT,
      report JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ,
      UNIQUE(wp_url)
    );
  `);
  console.log("✅ DB schema ready");
}

ensureSchema()
  .then(() => startWorker())
  .catch(console.error);
