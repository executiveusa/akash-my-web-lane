# MyWebLane — agent router

MyWebLane is Akash Engine's evidence-first website diagnostic. This file routes work; it does not contain product payload.

## Start here
1. Read `CONTEXT.md`.
2. Read exactly one ICM stage contract for the task in front of you.
3. Load only the relevant source and test files named by that stage/current diff.

## Route by task
| Situation | Read next |
|---|---|
| Understand a request, bug, route, or claim | `ICM/01_understand/CONTEXT.md` |
| Implement a bounded brownfield change | `ICM/02_change/CONTEXT.md` |
| Build, typecheck, smoke, or audit | `ICM/03_verify/CONTEXT.md` |
| Merge, deploy, smoke production, roll back | `ICM/04_release/CONTEXT.md` |
| Judge UX/copy/design/release quality | `ICM/_shared/STANDARDS.md` |

## Product locations
- `apps/web/` — public Next.js product.
- `packages/` — shared monorepo packages; load only when the public app actually uses one.
- `.github/workflows/` — CI and route-smoke gates.
- `scripts/quality/` — deterministic release checks.
- `ICM/` — agent contracts, not application architecture.

## Hard rules
- Measure before recommending rebuild or migration.
- Lighthouse/PageSpeed evidence does not prove a CMS decision by itself.
- No fake scores, future performance, migration success, proof, or success states.
- Public homepage/contact must not require stale template SaaS/CMS/auth services unless the visible feature genuinely needs them.
- Prefer subtraction/current primitives over another dependency.
- Mobile, keyboard, error, and reduced-motion behavior are release requirements.
- Merge only verified phases; production requires exact-tested-SHA and public smoke/runtime proof.

<!-- trail:start -->
## Trail - repo context graph

This repo is indexed in `.trail/cache/` (local, gitignored): a map of every file,
function and caller, kept in sync with the code. Ask the graph BEFORE grepping or
opening source files:

- `trail map` - orientation: dir clusters, hubs, hotspots (no LLM, no key, $0)
- `trail ask "<question>" --source` - ranked nodes with code spans inlined
- `trail grep "<literal>"` - exhaustive occurrences grouped by enclosing symbol
- `trail skeleton <file>` / `trail callers <symbol>` - API surface / blast radius

Open source files only at the exact file:line a node gives you. After big code
changes, refresh with `trail build` (deterministic, no API key). Session learnings
live in `.trail/learnings/`: read them first, and add one when a session took real
digging. Install: `npm i -g @trailhq/trail-code`.
<!-- trail:end -->
