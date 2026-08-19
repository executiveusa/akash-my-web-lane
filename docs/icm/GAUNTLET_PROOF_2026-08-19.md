# MyWebLane Gauntlet Proof — 2026-08-19

## Scope

Brownfield verification of the sovereign packaged runtime and the real `/api/audit` path.

No production deployment, DNS, database schema, credential, or destructive migration was changed.

## Sovereign runtime proof

The packaged Docker runtime has independently passed:

- clean container build;
- application start;
- `/api/health` response;
- private/local target rejection on `/api/audit` with HTTP 422.

## Real external audit attempt

The packaged runtime was then asked to audit `https://example.com` through the real Google PageSpeed Insights path.

The route executed correctly but Google returned HTTP 429 because the anonymous/shared PageSpeed consumer had exhausted its daily query quota. The runtime surfaced the failure as `PageSpeed could not measure this site right now` instead of inventing a report.

Observed upstream condition:

- provider: Google PageSpeed Insights
- failure class: quota / rate limit
- provider response: HTTP 429
- dedicated `PAGESPEED_API_KEY` available to the CI run: no

## Architecture decision

Third-party daily quota is not allowed to define whether the application container is healthy.

The sovereign CI therefore separates:

1. deterministic application/container/security gates, which must pass on every run; and
2. the real external PageSpeed proof gate, which runs only when a dedicated `PAGESPEED_API_KEY` is configured.

When the key is absent, CI records the external proof as BLOCKED rather than falsely reporting an application failure or a successful external audit.

## Interpretation

VERIFIED:
- the packaged MyWebLane service starts outside Vercel;
- the health endpoint works;
- private/local targets are rejected before PageSpeed is called;
- provider failure is visible to the caller;
- the application does not manufacture audit evidence when PageSpeed fails.

BLOCKED:
- successful real external PageSpeed audit from the sovereign CI environment;
- real persistence-path receipt after a successful audit;
- backup/restore proof;
- target-VPS runtime and rollback receipt;
- independent review.

## Next prerequisite

Configure a dedicated Google PageSpeed API key/quota for the deployment environment, then rerun the external proof gate. This is an infrastructure credential/quota prerequisite, not a reason to rewrite the MyWebLane product.
