create policy myweblane_audit_leads_no_direct_access on myweblane.audit_leads
for all to anon, authenticated using (false) with check (false);

create policy myweblane_migration_jobs_no_direct_access on myweblane.migration_jobs
for all to anon, authenticated using (false) with check (false);

create policy myweblane_agent_log_no_direct_access on myweblane.agent_log
for all to anon, authenticated using (false) with check (false);

create policy myweblane_subscriptions_no_direct_access on myweblane.subscriptions
for all to anon, authenticated using (false) with check (false);

create policy myweblane_rate_limits_no_direct_access on myweblane_private.intake_rate_limits
for all to anon, authenticated using (false) with check (false);
