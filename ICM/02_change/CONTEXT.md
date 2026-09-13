# 02_change — make one defensible brownfield change

One job: improve the defined diagnostic/user outcome without restoring template complexity or inventing evidence.

## Inputs
- Working: objective and acceptance evidence from `ICM/01_understand/CONTEXT.md` execution.
- Reference: `CONTEXT.md`, `ICM/_shared/STANDARDS.md`.
- Source: exact affected `apps/web/` and directly required shared package paths.

## Process
1. Reuse current primitives before adding a dependency.
2. Remove stale/duplicate/template behavior before layering new UI.
3. Keep measured facts separate from recommendations and unknowns.
4. Preserve mobile, keyboard, focus, error, and reduced-motion behavior.
5. Keep the patch bounded and independently reversible.

## Outputs
- Source changes on a phase branch.
- Updated deterministic checks for changed behavior.

## Human check
A person can identify one coherent user-facing reason for every material diff and no unsupported claim was introduced.