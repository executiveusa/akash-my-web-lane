# MyWebLane — Akash Suite Integration Contract

Status: Wave 1
Suite: Akash Engine + MyWebLane + Polesitter

## Job

MyWebLane is the **web lane** of the suite.

It does not exist to sell "Astro" as a technology feature. It exists to answer:

> Is this site costing the business position, leads, or maintenance time — and what is the least risky way to fix it?

## Inputs

- website URL
- organization/client id
- current CMS/stack when known
- business offer/context from Akash Engine
- opportunity id from Polesitter when the website audit began from a lead

## Outputs

- detected stack/CMS
- measured performance evidence where available
- content/SEO preservation requirements
- plugin/dependency inventory
- conversion observations
- migration suitability
- migration risk
- recommended next action

## No-fake-proof rule

Remove or label all estimates.

Do not present synthetic values as measured Lighthouse scores.
Do not claim migration time, satisfaction rate, site count, or before/after performance unless backed by recorded production evidence.

Existing claims such as "25 minutes," "847 sites," and fixed before/after scores are not authoritative for Wave 1.

## Real measurement

Use a real PageSpeed/Lighthouse source for performance measurement when available.

If a measurement fails, display `measurement unavailable` rather than inventing a number.

Heuristic analysis may be used internally as a triage signal only when explicitly labeled `estimated`.

## Polesitter handoff

When Polesitter finds a prospect whose site appears relevant:

```text
Polesitter opportunity
→ myweblane.audit.requested
→ measured site audit
→ myweblane.audit.completed
→ Polesitter evidence updated
→ human decision
```

MyWebLane never converts a business into a sales-ready opportunity by itself. The audit is evidence that feeds the Opportunity Policy.

## Akash Engine handoff

Akash Engine presents the human-facing service:

- explain the problem in plain English/Hindi
- show the evidence
- explain keep/fix/migrate decision
- scope human work
- obtain approval
- coordinate delivery

## First pilot

Las Vegas independent auto dealers.

Dealer-specific audit questions:
- inventory browsing friction
- mobile performance
- contact / call / message path
- financing inquiry path
- trade-in inquiry path
- map/location clarity
- structured data/SEO basics
- plugin/page-builder drag
- stale inventory or broken forms

## Human gate

No migration starts from an automated audit alone.

Required state:

`audit_complete -> human_review -> approved_for_scope -> migration_work`

## UX rule

Default customer interaction is a single outcome input:

> Audit this site and tell me whether it should stay on WordPress, be cleaned up, or move.

Advanced analyzer/provider details stay under the hood.
