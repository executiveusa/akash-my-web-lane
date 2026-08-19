# MyWebLane — Sovereign Deployment Contract

Status: BLOCK until container/process packaging is verified on the target VPS.

## Current runtime
- Next.js app: `apps/web`
- Build: `pnpm --filter web build`
- Start: `pnpm --filter web start`
- Portable persistence boundary: Supabase/Postgres-compatible runtime and tracked migrations
- Existing Vercel configuration is preview evidence, not the sovereignty boundary

## Target host contract
A compliant host only needs:
1. Node.js runtime or OCI container support
2. environment variables supplied at deploy time
3. outbound HTTPS access for configured providers
4. persistent database endpoint supplied by configuration
5. reverse proxy/TLS outside the application or at the host layer

## Required before PASS
- root production Dockerfile or equivalent reproducible process manifest
- explicit working directory and install/build/start commands
- environment-variable NAME inventory with required/optional classification
- `/api/health` or equivalent health endpoint verified on the packaged runtime
- backup procedure for application data/configuration
- restore test or documented recovery proof
- rollback to previous image/commit
- no Vercel-only runtime dependency in the customer-critical path

## Release proof
A receipt must record:
- git commit
- image/build identifier
- host target
- health-check result
- critical smoke-test result
- database migration state
- rollback identifier
- reviewer

## Failure rule
A successful Vercel preview is not proof that MyWebLane is VPS-ready.
