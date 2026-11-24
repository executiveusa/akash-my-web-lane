# Akash Suite — SEO + Google Ads topic adaptation plan

**Date:** 2026-11-24  
**Mode:** Reference research / draft only — no production publishing, ad spend, or automatic outreach  
**Canonical content home:** `executiveusa/akash-my-web-lane/docs/blog-seeds/`  
**Companion raw catalog:** `graphed-source-topic-inventory-2026-11-24.csv`

## Inventory and evidence

- Source: [Graphed blog](https://www.graphed.com/blog); [flooring SEO example](https://www.graphed.com/blog/seo-for-flooring-companies).
- Found **2104 unique blog-like URL candidates** via the site sitemap/map. These **are not validated live articles**; entries not present on the current paginated index remain `sitemap_url_unverified`.
- Independently extracted **103 distinct article links** from the nine visible paginated blog pages. Those links were observed on the index but **not individually fetched/quality-checked**.
- Classification by slug, **not by reading every article**: Tableau 443; Analytics / attribution 219; Power BI 581; Meta / social ads 178; Other / AI / business 91; Google Ads 569; SEO / organic 23.
- Editorial queues from rules, subject to human review: PARK 1114; USE 715; EXPERIMENT 159; SELL 73; REVIEW_POLICY 43.
- The source catalog is for **research provenance only**; do not copy third-party article text, imagery, examples, statistics, or unsupported claims.

## Product ownership — reuse the suite

| Existing product | One job | Measurable output |
| --- | --- | --- |
| Akash Engine (`executiveusa/akash-master-files`) | One front door for proposals, audit review, content/ads approvals, campaign evidence | Approved weekly proposal and decision log |
| MyWebLane (`executiveusa/akash-my-web-lane`) | SEO-preserving web repair/migration, service + local landing pages, original editorial drafts | Published pages that actually receive qualified visits and requests |
| SpeedToLead (`executiveusa/speedtolead`) | Capture source/page/campaign, qualify contacts, follow up, book and attribute | Qualified appointments, closed-won revenue, cost per qualified opportunity |

Do not create another marketing control plane, database, or marketing agent stack until gaps in these three are verified. Use the existing review and approval model.

## Revenue offer

**First pilot:** Las Vegas independent auto dealerships, *subject to confirming a willing pilot and actual offer*.  
**Sale-first delivery:** paid site-and-funnel audit → bounded SEO/landing-page rescue → optional migration/launch → recurring measurement and maintenance. Do not assume any conversion lift before measurement.

Track **qualified lead → booked appointment/test drive → sale**, including opt-outs and invalid leads. Revenue claim must link to real client CRM records with permission. SEO/Ads work is a service to win and retain these accounts, not a reason to publish 2,000 pages.

## Seven principles extracted from the flooring SEO reference — adapted, not copied

1. Measure qualified booked outcomes and revenue, not just search position or traffic.
2. Create **unique pages for real services or inventory categories**, not templated city-name swaps.
3. Maintain accurate Google Business Profiles and truthful service-area information; avoid unverifiable review-influence claims.
4. Request genuine customer feedback without scripting favorable phrasing or offering prohibited incentives.
5. Link forms, calls, source URLs, and ad identifiers to the existing lead pipeline with privacy and consent controls.
6. Test technical foundations: indexing, canonical/redirect integrity, mobile interaction, structured data eligibility, and Core Web Vitals.
7. Build defensible authority from real projects and useful expertise, not link schemes, fabricated testimonials, or scaled thin posts.

## Initial original content queue — 12 decision-oriented briefs

| Priority | Original Akash article / page angle | Audience | Conversion and proof needed |
| --- | --- | --- | --- |
| P0 | **SEO for Independent Auto Dealers: From Vehicle Searches to Test Drives** | Dealer principal / GM | Site audit request; verify inventory crawlability and actual lead routes |
| P0 | **Google Ads for Used Car Dealerships: Separate Finance, Trade-In and Inventory Intent** | Dealer marketing manager | Paid audit; verify feed eligibility, search terms and lead outcomes |
| P0 | **How to Tell Whether Your WordPress Site Is Losing Inquiries** | US/India SMB owner | Measured audit; PageSpeed + real form/call test, no simulated uplift |
| P0 | **Agency Landing Pages That Turn Clicks Into Sales Consultations** | Service business | Funnel audit; source/page attribution + valid appointment signal |
| P0 | **Google Ads Landing Pages: Why Your Homepage Often Costs More** | SMB owner | Landing-page rescue; measured A/B baseline, no promised CPC discount |
| P1 | **Local SEO for Roofing Contractors: Prove the Job, Not the Ranking** | Roofing companies | Local SEO audit; real project photos and conversion records |
| P1 | **Flooring Marketing: Match Hardwood, Tile and LVP Searches to Real Services** | Flooring contractors | Quote-flow audit; real completed work photos and service availability |
| P1 | **Restaurant Search Visibility: Menus, Mobile Calls and Reservation Paths** | Independent restaurants | Website audit; menu freshness and verified conversion paths |
| P1 | **GA4 + Search Console + CRM: Which Pages Actually Produce Customers?** | Operators | Tracking setup; consent, definitions and real event QA |
| P1 | **How to Keep SEO Assets When Rebuilding a WordPress Website** | Agencies / businesses | Migration consultation; URL, redirect and metadata parity checklist |
| P2 | **Nonprofit Google Ad Grants: Eligibility, Tracking and Meaningful Outcomes** | Eligible nonprofits | Grant readiness audit; verify actual program policies and eligibility |
| P2 | **AI-Assisted SEO Content Without Fabricated Case Studies** | Agency owners | Editorial review service; citation checks, unique expert contribution |

Default market: **US English** for the dealer pilot; evaluate **India English/Hindi** only for offerings and keywords that make sense there. Do not auto-translate 2,000 articles.

## Paid-search pilot spec (review-only)

- Separate high-intent groups for **inventory searches**, **trade-ins**, and **financing inquiries**; keep any financing or credit language compliant with applicable policies.
- One relevant landing page per real customer intent with clear contact/test-drive action.
- Start from verified service geography, inventory availability, privacy/disclosure text, realistic budget, and credentialed Google Ads access.
- Capture `utm_source`, `utm_medium`, `utm_campaign`, landing page, and consented lead identifiers. Reconcile CRM outcomes with GA4/Ads; avoid double counting.
- Use the actual search-terms report for negatives. **Exact match can match close variants**; do not repeat source oversimplifications. [Google Ads help](https://support.google.com/google-ads/answer/7478529).
- **No ad creation, publishing, spend changes, customer messaging or broad automation without an explicit approval gate.**

## Existing blockers and proof rules

- `packages/cms/index.ts` currently has stubbed `blog.getPosts() -> []` and `getPost() -> null`. The blog UI can exist while rendering no posts. **Fix/verify a real content source in an isolated PR before publishing.**
- `docs/blog-seeds/` already contains six older posts. Some older drafts present unsupported specific migration, speed, lead and sales numbers. **Audit and either source, label hypothetical, or remove those claims** before publishing any of them.
- No evidence of current keyword volume, live rankings, active Google Ads account, CMS content sync, conversions, or client consent has been established in this research round.
- Google explicitly prioritizes helpful, people-first work and warns against scaled content abuse: [content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [spam policy](https://developers.google.com/search/docs/essentials/spam-policies).

## Smallest safe slice + independent review

1. Human confirms real target offer and one willing pilot.
2. Independently review source URL inventory, discard low relevance and high-risk policy verticals, and audit six existing seeded posts.
3. Review the accompanying **original dealer article draft** for factual accuracy, owner positioning, legal language, and quality.
4. Separate PR: repair CMS adapter, verify article preview, sitemap/canonical and routing, run lint/build, conduct mobile checks and proof screenshots.
5. Publish **one** approved original article + matching inquiry path; test end-to-end receipt and attribution. Observe for 30 days before expanding topics.
6. Rollback: revert the content commit or unpublish the CMS entry; leave existing production routes untouched.

## Decision

**USE** the 2,000+ source topics as a research bank, **SELL** a measured dealer/SMB SEO funnel service, **MERGE** editorial and paid-media planning into existing suite workflows, **PARK** BI tutorials and policy-sensitive verticals, **ARCHIVE** copied/unsupported source language. Keep this PR draft-only.
