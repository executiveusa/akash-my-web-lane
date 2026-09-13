-- MyWebLane portable runtime for temporary Botanic Creations hosting.
-- Export schema `myweblane` independently when moving to self-hosted Postgres.

create schema if not exists myweblane;
create schema if not exists myweblane_private;

create table if not exists myweblane.audit_leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid null,
  wp_url text not null,
  email text null,
  client_name text null,
  whatsapp text null,
  report jsonb not null default '{}'::jsonb,
  evidence_source text null,
  measured_at timestamptz null,
  source text not null default 'myweblane_web',
  status text not null default 'new' check (status in ('new','reviewed','qualified','converted','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_myweblane_audit_leads_created_at on myweblane.audit_leads(created_at desc);
create index if not exists idx_myweblane_audit_leads_url on myweblane.audit_leads(wp_url);

create table if not exists myweblane.migration_jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid null,
  audit_lead_id uuid null references myweblane.audit_leads(id) on delete set null,
  site_url text not null,
  status text not null default 'queued' check (status in ('queued','running','needs_human','awaiting_review','approved_deploy','completed','failed','cancelled')),
  current_step text null,
  payload jsonb not null default '{}'::jsonb,
  result jsonb not null default '{}'::jsonb,
  created_by uuid null references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_myweblane_jobs_status on myweblane.migration_jobs(status);
create index if not exists idx_myweblane_jobs_updated on myweblane.migration_jobs(updated_at desc);

create table if not exists myweblane.agent_log (
  id uuid primary key default gen_random_uuid(),
  migration_job_id uuid null references myweblane.migration_jobs(id) on delete cascade,
  agent text not null,
  level text not null default 'info' check (level in ('info','warn','error')),
  message text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_myweblane_agent_log_job on myweblane.agent_log(migration_job_id);

create table if not exists myweblane.subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid null,
  audit_lead_id uuid null references myweblane.audit_leads(id) on delete set null,
  customer_email text null,
  plan text not null default 'managed',
  status text not null default 'active' check (status in ('active','paused','cancelled','past_due')),
  provider text null,
  external_subscription_id text null,
  amount_cents integer null check (amount_cents is null or amount_cents >= 0),
  currency text not null default 'USD',
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table myweblane.audit_leads enable row level security;
alter table myweblane.migration_jobs enable row level security;
alter table myweblane.agent_log enable row level security;
alter table myweblane.subscriptions enable row level security;

revoke all on schema myweblane from anon, authenticated;
revoke all on all tables in schema myweblane from anon, authenticated;

create or replace function public.myweblane_ingest_audit(
  p_wp_url text,
  p_email text default null,
  p_client_name text default null,
  p_whatsapp text default null,
  p_report jsonb default '{}'::jsonb,
  p_evidence_source text default null,
  p_measured_at timestamptz default null
) returns uuid
language plpgsql
security definer
set search_path = public, myweblane
as $$
declare
  v_id uuid;
begin
  if p_wp_url is null or length(trim(p_wp_url)) < 8 then
    raise exception 'invalid website url';
  end if;

  insert into myweblane.audit_leads(
    wp_url,email,client_name,whatsapp,report,evidence_source,measured_at
  ) values (
    trim(p_wp_url),nullif(trim(p_email),''),nullif(trim(p_client_name),''),nullif(trim(p_whatsapp),''),coalesce(p_report,'{}'::jsonb),p_evidence_source,p_measured_at
  ) returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.myweblane_ingest_audit(text,text,text,text,jsonb,text,timestamptz) from public, anon, authenticated;
grant execute on function public.myweblane_ingest_audit(text,text,text,text,jsonb,text,timestamptz) to service_role;

comment on schema myweblane is 'Portable MyWebLane runtime. Export this schema independently when moving off Botanic Creations.';
comment on schema myweblane_private is 'Reserved for MyWebLane secrets/private worker state; keep empty until needed.';
