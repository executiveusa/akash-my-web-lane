# 01_understand — locate the real diagnostic problem

One job: define the user decision, measured evidence, affected route/data path, and proof required before editing.

## Inputs
- Working: current user request, bug, or claim.
- Reference: `CONTEXT.md`, `ICM/_shared/STANDARDS.md`.
- Source: the smallest relevant files under `apps/web/` plus directly used `packages/` and existing checks.

## Process
1. State the user's decision/outcome in one sentence.
2. Trace visible action → frontend → API/provider → response → visible result.
3. Separate measured fact, inference, and unknown.
4. Classify findings VERIFIED, PARTIAL, BROKEN, DUPLICATE, DEAD, UNSAFE, or UNKNOWN.
5. Define the smallest reversible patch and exact verification evidence.

## Outputs
- A bounded phase objective and affected-path/evidence map in the PR or issue.

## Human check
A person can tell what evidence the product has, what it does not prove, and what user decision will become easier before code is changed.