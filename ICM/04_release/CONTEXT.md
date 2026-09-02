# 04_release — merge and deploy only proven code

One job: move an exact verified SHA through merge, production deployment, public smoke, and rollback proof without changing product truth.

## Inputs
- Verified branch SHA and green checks from `ICM/03_verify/CONTEXT.md`.
- Existing Vercel project and production aliases; do not create a replacement project to bypass configuration problems.
- `ICM/_shared/STANDARDS.md` for final release criteria.

## Process
1. Confirm the branch head SHA is the SHA that passed build, startup, route, mobile/accessibility, and truth checks.
2. Merge only that verified phase.
3. Deploy the resulting exact `main` SHA to the existing MyWebLane project.
4. Verify deployment metadata reports that exact Git SHA.
5. Smoke `/`, `/en`, `/en/pricing`, `/en/contact`, `/en/open-source`, and affected API routes.
6. Inspect current runtime errors rather than relying on historical build success.
7. Record the previous READY deployment as rollback.
8. If exact-SHA proof or public smoke fails, stop and classify release as BLOCKED.

## Outputs
- Merge SHA.
- Production deployment ID/URL and matching Git SHA.
- Public route/API smoke evidence.
- Runtime-error check.
- Previous READY rollback deployment.

## Human check
A person can independently answer: what exact source is live, which user paths were tested, what remains intentionally unconfigured, and which deployment restores the previous known-good state.