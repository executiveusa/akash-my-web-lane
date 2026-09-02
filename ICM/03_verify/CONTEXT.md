# 03_verify — prove the diagnostic path and failure truth

One job: produce deterministic evidence that the changed slice builds, starts, serves, and behaves truthfully.

## Inputs
- Working: phase branch and checks from `ICM/02_change/CONTEXT.md` execution.
- Reference: `ICM/_shared/STANDARDS.md`.
- Automation: `.github/workflows/`, `scripts/quality/`, web typecheck/build/start/route smoke.

## Process
1. Run the ICM walk test and anti-slop guard.
2. Run public web typecheck and production build.
3. Start the built application and smoke the affected public routes.
4. For UI changes, verify mobile widths, overflow, touch, keyboard/focus, and reduced motion.
5. For diagnostic changes, verify provider success plus quota/timeout/provider failure without invented results.
6. Treat P0/P1 as blockers.

## Outputs
- Green checks tied to the exact branch SHA, or explicit blocking failures.

## Human check
A person can inspect the checks and distinguish build success, server startup, route success, and diagnostic-provider truth independently.