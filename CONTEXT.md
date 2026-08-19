# MyWebLane — ICM Router

## Mission
MyWebLane is the website lane of the Akash suite. It finds whether a business website is losing trust, inquiries, or owner time; recommends the least risky fix; and produces evidence that can feed SpeedToLead/Polesitter.

## Customer promise
Do not sell frameworks, AI, agents, hosting, or migration technology.

Lead with the business problem:
> Is your website quietly losing customers, and what is the smallest fix worth paying for?

## Load order
1. Read this file.
2. Read `docs/AKASH_SUITE_INTEGRATION.md`.
3. For audit/migration work, inspect the actual runtime path before changing it.
4. Load only the relevant market pack or customer evidence.
5. Read deployment/rollback contract before host-specific changes.

## Product boundary
MyWebLane owns:
- website audit
- keep / clean / migrate recommendation
- conversion-path observations
- migration planning and execution after approval
- site deployment, health, backup, monitoring, and re-audit

MyWebLane does not own:
- broad lead qualification
- outbound sales automation
- CRM lifecycle orchestration
- business-wide revenue-capture decisions

Those belong to SpeedToLead/Polesitter.

## Calling standard
Public copy must speak in customer pain and outcomes.

Prefer:
- slow site
- confusing mobile experience
- forms/calls/messages that are hard to find
- old WordPress setup that costs time to maintain
- visitors who leave without contacting the business

Avoid leading with:
- Next.js / Astro / React
- Supabase
- Lighthouse internals
- LLM/model names
- agents / MCP / orchestration

## Evidence standard
Facts are `VERIFIED`, `CLIENT_STATED`, `INFERRED`, or `UNKNOWN`.
No before/after claim, speed claim, migration-time claim, site-count claim, conversion claim, or revenue claim may be public without a receipt.

## Human gates
Human approval is required for:
- public price/claim changes
- paid commitments
- credential or ownership changes
- DNS/domain cutover
- destructive migration
- production launch

Agents should handle research, audit, build preparation, testing, documentation, monitoring preparation, and approval-ready handoffs.

## Walk test
An unfamiliar capable agent passes when it can answer from repository files alone:
1. What customer problem does MyWebLane solve?
2. Where does MyWebLane stop and SpeedToLead begin?
3. Which files define the current audit/migration contract?
4. What evidence is required before claiming success?
5. How is this deployed and rolled back without depending on Vercel?

If chat history is required, the repo fails.
