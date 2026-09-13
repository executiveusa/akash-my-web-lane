-- ============================================================
-- My Web Lane — Neon DB Schema
-- Run once: psql $DATABASE_URL < sql/schema.sql
-- ============================================================

-- ── Migration Jobs ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS migration_jobs (
  job_id        TEXT         PRIMARY KEY,
  status        TEXT         NOT NULL DEFAULT 'queued',
  current_step  TEXT,
  payload       JSONB        NOT NULL DEFAULT '{}',
  data          JSONB        NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Status: queued | running | completed | failed | needs_rebuild | awaiting_review | approved_deploy
CREATE INDEX IF NOT EXISTS idx_migration_jobs_status     ON migration_jobs (status);
CREATE INDEX IF NOT EXISTS idx_migration_jobs_updated_at ON migration_jobs (updated_at DESC);

-- ── Audit Leads (free audit CTA captures) ───────────────────
CREATE TABLE IF NOT EXISTS audit_leads (
  id          SERIAL       PRIMARY KEY,
  wp_url      TEXT         NOT NULL,
  email       TEXT,
  client_name TEXT,
  whatsapp    TEXT,
  report      JSONB,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ,
  UNIQUE (wp_url)
);

CREATE INDEX IF NOT EXISTS idx_audit_leads_created_at ON audit_leads (created_at DESC);

-- ── Pi Agent Subscriptions (recurring revenue) ──────────────
CREATE TABLE IF NOT EXISTS pi_subscriptions (
  id             SERIAL       PRIMARY KEY,
  client_name    TEXT         NOT NULL,
  wp_url         TEXT         NOT NULL,
  email          TEXT,
  whatsapp       TEXT,
  plan           TEXT         NOT NULL DEFAULT 'essential',  -- essential | growth | enterprise
  status         TEXT         NOT NULL DEFAULT 'active',     -- active | paused | cancelled
  razorpay_sub_id TEXT,
  amount_paise   INTEGER      NOT NULL,
  currency       TEXT         NOT NULL DEFAULT 'INR',
  billing_cycle  TEXT         NOT NULL DEFAULT 'monthly',
  next_billing   TIMESTAMPTZ,
  started_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pi_subs_status ON pi_subscriptions (status);

-- ── Agent Activity Log ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS agent_log (
  id         BIGSERIAL    PRIMARY KEY,
  job_id     TEXT         REFERENCES migration_jobs(job_id) ON DELETE CASCADE,
  agent      TEXT         NOT NULL,  -- analyzer | designer | builder | judge | worker
  level      TEXT         NOT NULL DEFAULT 'info',  -- info | warn | error
  message    TEXT         NOT NULL,
  data       JSONB        DEFAULT '{}',
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agent_log_job_id    ON agent_log (job_id);
CREATE INDEX IF NOT EXISTS idx_agent_log_created_at ON agent_log (created_at DESC);

-- ── Helper: auto-update updated_at ──────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_migration_jobs_updated_at
  BEFORE UPDATE ON migration_jobs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER trg_pi_subs_updated_at
  BEFORE UPDATE ON pi_subscriptions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
