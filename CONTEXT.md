# MyWebLane — repository context

MyWebLane is an evidence-first mobile website diagnostic. Its job is to establish what is actually wrong before anyone recommends cleanup, redesign, or migration.

## Product lock
- **Mode:** brownfield.
- **Primary user:** a business owner/operator evaluating a website problem and the Akash person helping them interpret it.
- **Primary action:** run or understand the mobile diagnostic and decide the smallest defensible next move.
- **Evidence:** real PageSpeed/Lighthouse output and explicit failure states; no invented replacement score.
- **Protected behavior:** public homepage/contact, diagnostic API behavior, mobile/keyboard accessibility, and existing evidence integrity.
- **Production project:** existing Vercel `akash-my-web-lane`; never create a duplicate to solve deployment wiring.

## Where things live
- `apps/web/` — public Next.js application, routes, and API.
- `packages/` — shared packages inherited from the monorepo; they are not automatically product requirements.
- `.github/workflows/` — typecheck/build/start/route-smoke verification.
- `scripts/quality/` — deterministic anti-slop/release checks.
- `ICM/` — agent routing contracts.

## Execution order
1. `ICM/01_understand/CONTEXT.md`
2. `ICM/02_change/CONTEXT.md`
3. `ICM/03_verify/CONTEXT.md`
4. `ICM/04_release/CONTEXT.md`

## Canonical standards
`ICM/_shared/STANDARDS.md` is the one repo-local home for Collins/Krug/Heart-and-Soul/Gauntlet constraints.

## State
Git, source, outputs, and automated checks are state. A route compiling is not proof it starts; a server starting is not proof a route works; a deployment is not proof production serves the tested SHA.