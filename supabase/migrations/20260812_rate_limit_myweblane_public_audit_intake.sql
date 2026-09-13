create table if not exists myweblane_private.intake_rate_limits (
  ip_hash text primary key,
  window_start timestamptz not null,
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

alter table myweblane_private.intake_rate_limits enable row level security;
revoke all on schema myweblane_private from anon, authenticated;
revoke all on all tables in schema myweblane_private from anon, authenticated;

create or replace function public.myweblane_claim_intake_slot(
  p_ip text,
  p_limit integer default 20
) returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public, extensions, myweblane_private
as $$
declare
  v_hash text;
  v_window timestamptz := date_trunc('hour', now());
  v_count integer;
begin
  if p_limit < 1 or p_limit > 500 then
    raise exception 'invalid rate limit';
  end if;

  v_hash := encode(extensions.digest(coalesce(nullif(trim(p_ip),''),'unknown'), 'sha256'), 'hex');

  insert into myweblane_private.intake_rate_limits(ip_hash, window_start, request_count, updated_at)
  values(v_hash, v_window, 1, now())
  on conflict (ip_hash) do update set
    request_count = case
      when myweblane_private.intake_rate_limits.window_start = v_window
        then myweblane_private.intake_rate_limits.request_count + 1
      else 1
    end,
    window_start = v_window,
    updated_at = now()
  returning request_count into v_count;

  return v_count <= p_limit;
end;
$$;

revoke all on function public.myweblane_claim_intake_slot(text,integer) from public, anon, authenticated;
grant execute on function public.myweblane_claim_intake_slot(text,integer) to service_role;
