# MyWebLane — U.S. Agency + Search Growth Completion PRD

**Date:** 2026-11-24  
**Repository:** `executiveusa/akash-my-web-lane`  
**Mode:** Brownfield product completion; reuse the existing Next.js/Turborepo foundation, do not rebuild from scratch.  
**Purpose:** Make MyWebLane the U.S.-facing agency that brings qualified website, local SEO, Google Ads landing-page and WordPress modernization demand to Akash. SpeedToLead operates recovered lead/revenue value; Akash's personal site supplies credibility.  
**Commercial result:** One US business requests a real diagnostic, receives a measured keep/fix/migrate recommendation, and accepts a paid website/funnel rescue proposal (target, not claimed outcome).  
**First market:** U.S. English and a real accessible local niche; use an existing Las Vegas independent-auto-dealer audit as a research pilot where there is actual sales access, not as proof of a dealership contract. Seattle high-ticket trades are the cross-sell lane from SpeedToLead.  
**No new standalone marketing platform.**

## Existing baseline and blockers

- Existing repo contains Next.js monorepo with `apps/web`, SEO helpers, analytics, legal templates, localized routes, a real PageSpeed-focused `/api/audit`, and a Blog index + post route.
- Existing `docs/AKASH_SUITE_INTEGRATION.md` defines the keep/clean/migrate recommendation and human scope approval.
- Existing `docs/blog-seeds/` contains six legacy original drafts requiring truth review.
- Existing draft [PR #76](https://github.com/executiveusa/akash-my-web-lane/pull/76) contains 2,104 **URL candidates** from Graphed, categorized as *research only*, a 12-topic Akash brief, and one original auto-dealer article. 103 links were seen on the visible index. **Do not conflate the URL inventory with live approved articles.**
- `packages/cms/index.ts` currently returns `[]` / `null` from blog queries; the public blog can be visually present but empty.
- `apps/web/app/[locale]/pricing/page.tsx` redirects to `/{locale}`; a visible pricing CTA must not falsely imply a functioning priced checkout.
- `apps/web/app/[locale]/contact/page.tsx` exists, but live delivery/notification is not verified.
- Vercel preview deployments from 2026-11-24 currently show **ERROR**. In deploy `dpl_HJVifA12nTpy9EvTUqSRCsZzZ5o2`, build logs show **Next.js 15.5.25 vs 15.5.24 duplicate-version type mismatch** in `app/.well-known/vercel/flags/route`. Fix dependency resolution against the lockfile and verify a clean build; do not mask types. Exact reason for duplicated versions requires dependency-tree inspection.
- SSO is enabled on connected Vercel preview deployments. Public visibility and canonical production domain are **unverified**.
- API audit input checks block localhost/private literals; separately verify DNS resolution, redirect hops, SSRF, rate limits, key quotas and safe measurement fallback before expanding public traffic.
- No verified GSC index coverage, ranked queries, GA4 conversion data, or Google Ads connection has been established.

## Positioning and offer ladder

**Headline:** A better website is useful only if customers can find it, trust it and contact you.

1. **Website Evidence Audit / Vibe Audit**: clear speed, mobile, SEO, accessibility, form and funnel measurements, and a keep/fix/migrate decision. Pricing requires owner decision.
2. **Website Rescue Sprint**: one bounded repair of design, performance, navigation, SEO or lead capture with a documented before/after baseline.
3. **Sovereign Launch / Migration**: only after owner approval; protect URL equity, content, domains and data, release exact audited SHA.
4. **Managed Search / Growth Operations**: original editorial, local SEO upkeep, Google Ads landing pages, Search Console reporting, and leads handed to SpeedToLead for qualified follow-through.

Marketing principle: **sell the diagnostic and measured business result, not Astro/Next.js or an AI feature list.** Do not promise ranking improvements or fabricated average conversion lifts.

## Information architecture — done when truly usable

| Route / section | User job | Launch evidence |
| --- | --- | --- |
| `/` or `/en` Home | One clear service, market, before/after approach, one audit CTA | Mobile first-click test; CTA lands in real flow |
| `/services/website-audit` | Explain what gets checked and delivered | Actual source and limitations shown |
| `/services/website-rescue` | Explain bounded repair and delivery | Scope, change window, rollback |
| `/services/wordpress-migration` | Keep/clean/migrate choice and SEO preservation | 301 mapping, metadata, crawl tests |
| `/services/local-seo` | Real business listings, location/entity signals | No generated doorway pages |
| `/services/google-ads-landing-pages` | Improve landing page and capture qualified requests | Actual conversion test + ad policy checklist |
| `/work` and `/work/[slug]` | Show real work with permissions | Evidence receipts; unknown stays unknown |
| `/insights` and `/insights/[slug]` | Helpful original authority articles | Valid CMS/MDX, verified metadata, HTML, sitemap |
| `/about` | Identify Akash and U.S. service responsibility | Owner-approved biography, no invented team |
| `/contact` | Reach a human and request audit | Server-side receipt + ack/error + notification |
| Privacy / terms / accessibility | Explain legitimate data and site responsibilities | Real links and reviewed content |

These are **requirements**, not claims that each route exists today. Current `/blog` routes may be reused with stable canonical URLs rather than force renaming. Launch only the smallest useful pages in wave one.

## Editorial structure — use source *topics*, not copied source content

**Primary content owner:** MyWebLane covers technical SEO, website experience, organic discovery, landing pages and Google Ads handoff. SpeedToLead covers missed calls, conversion follow-up and recovered revenue. Akash's personal site does **not** mirror these articles.

| Cluster | Buyer intent | 3 useful original angles | CTA |
| --- | --- | --- | --- |
| Website evidence and optimization | "why is my website losing leads" | Site audit checklist; realistic Core Web Vitals; how to test contact routes | Request audit |
| Local SEO by niche | "SEO for flooring/roofing/dealers" | Flooring work categories; contractor trust and service areas; dealership inventory search | Local audit |
| Google Ads and landing pages | "google ads for [service]" | Landing-page fit; negative-keyword reviews; search-to-booking measurement | Landing-page review |
| Migration with SEO preserved | "WordPress migration without lost rankings" | Canonical/redirect matrix; keep versus rebuild; mobile UX and form parity | Migration diagnosis |
| Analytics and attribution | "GA4 leads vs sales" | GA4/Search Console vs CRM; UTM labeling; qualify vs submit | Conversion tracking audit |
| AI agents and workflow | "automated followup SEO leads" | Human review handoff; consent-aware ops; evidence vs inference | SpeedToLead referral |

**First 8 article briefs in order:**
1. How to tell whether your website actually loses inquiries (pillar).
2. Google Ads landing pages for local contractors: measure qualified estimates, not clicks.
3. WordPress site rescue versus migration: a proof-based decision.
4. Local SEO for flooring contractors: project proof, services, maps and quotes.
5. How to keep URLs, titles and search visibility through a website rebuild.
6. Roofing contractor SEO: where real jobs and genuine reviews matter.
7. GA4 + Search Console + CRM: count qualified requests and closed jobs.
8. SEO for independent auto dealers: vehicle pages, trade-ins and test drives (existing PR #76 draft).

Source URL catalogue → relevance filter → actual search/keyword intent research → independent brief → original writing → original examples/screenshot → fact check → legal/claims review → human approval → preview → indexing QA → publish → 30/60-day measurement. **Do not generate thousands of location or niche duplicates**, copy third-party text, claim copied examples as client wins, or cross-post nearly identical articles between brands. Google policies: https://developers.google.com/search/docs/fundamentals/creating-helpful-content and https://developers.google.com/search/docs/essentials/spam-policies

## Content implementation requirements

- Reuse existing blog route and `@repo/cms`; compare Basehub integration vs repo-native MDX to select the smallest maintainable route. Do not bolt on Strapi/another CMS merely for this PRD.
- Editorial schema: `slug, title, summary, audience, intent, author, reviewedAt, publishedAt, sources, canonical, language, category, originalMedia, proofRef, cta, status`.
- Only `status=published` appears in public list, sitemap and Article structured data. Drafts should not be indexable.
- Posts show authorship/editorial date, unique title/meta, substantive visible article body, contextual internal links, valid image alt, responsive tables and relevant CTA.
- Auto-generated descriptions or schema must not contradict content. Confirm with URL Inspection/Search Console after publication.
- Zero fabricated reviewer quotes, rankings, audited scores, conversion results or client logos.

## Functional user flows

### Visitor → measured audit → human decision
1. Visitor supplies permitted `https://` website URL.
2. Audit request validates/sanitizes target; denies internal/private addresses across redirects and DNS changes, uses bounded timeouts, quotas and output limits.
3. Page shows **measured** PageSpeed/Lighthouse score or clear `measurement unavailable`; no synthetic fallback score.
4. Visitor chooses to request professional evaluation, opts into contact, enters minimal details, and receives a durable request/reference id.
5. Server stores evidence + approved lead routing to SpeedToLead/Polesitter; *never* automatically qualifies from one score.
6. Human decides keep/repair/migrate; sends proposal via approved sales workflow.
7. Owner authorizes scope, rollback, domain and production change.

### SEO article → qualified contact
Search Console impression → organic landing page → specific CTA → verified contact form → qualified lead in the same intake system → human follow-up → paid decision. Lead source/landing page and UTM are captured with privacy and no PII in GA4.

## Release stages

**P0 Build and trust (before content publish)**
- Reproduce and resolve mixed Next.js versions in lockfile/build; run `pnpm install --frozen-lockfile`, `pnpm --filter web typecheck`, `pnpm --filter web build` and applicable repo checks.
- Verify existing `/en` home, audit route and contact receipt. Confirm project/team access, domain, canonical, robots and SSL.
- Independent design/mobile review: 320px to desktop, functional navigation, coherent voice and visible owner identity.
- Remove or correct unsupported stats in six blog seed posts and unproven service copy.

**P1 First revenue**
- Ship one strong primary agency page, working measured audit CTA, and honest contact/notification path.
- Test with one real U.S. prospect and record request → response → proposal outcome.
- Pilot one site repair with reversible branch, before/after screenshot evidence and written owner approval.

**P2 Editorial**
- Fix blog adapter; publish **three** approved useful originals, then expand to eight as useful.
- Verify HTML rendering/crawl, metadata, canonical, sitemap, RSS if desired, internal links, Search Console ownership and GA4 measurement.
- Set editorial review workflow; do not enable automatic publication.

**P3 Ads and recurring**
- Only after landing pages and lead routing are sound: connect a verified Google Ads account in read-only mode to measure conversion baseline; propose bounded ad campaigns subject to explicit budget approval.
- Export outcome-qualified conversion data only with correct consent/legal basis; maintain human review before account mutations.
- Weekly SEO and lead quality reports, clear retainer boundary with SpeedToLead.

## Acceptance / judge

- Zero failing critical user journeys on real preview and production, with exact SHA and rollback candidate.
- Five representative audit URLs: good/bad target, PageSpeed timeout, form-error, success-with-id; no internal network access.
- Submission stored once with consent and source; human notification delivered; failure doesn't fake success.
- 3 original approved articles indexed or eligible for indexing after publish; validate with live HTML + Search Console rather than simply claiming "SEO ready".
- Site responsive and keyboard accessible; no hidden dead CTA; user can identify services and next action within 10 seconds.
- No unverified measurements, testimonials, pricing promises, offices, or generated case studies.
- Independent code + SEO + mobile reviewers sign off; owner approves DNS/domain, paid Ads spend and production promotion.
- Rollback: retain the existing READY production deployment, revert the branch/feature and unpublish any bad article without removing lead records.

## 30-day commercial scoreboard (targets only)

- 3 verified, indexed-worthy original posts (no search-ranking promise).
- 1 production-confirmed working audit-to-contact flow.
- 5 actual buyer discussions and 1 paid diagnostic/rescue scope.
- Every request attributed to a source and disposition; zero silently dropped requests.
- First site client has before/after evidence and permission to discuss it.

## Project scope classification

- **SELL:** SpeedToLead's revenue recovery + MyWebLane audit/rescue path.
- **USE:** existing Next.js/SEO/analytics, Polesitter, Basehub if practical, current Vercel and portable VPS contracts.
- **MERGE:** editorial backlog into existing MyWebLane PR #76, not a second campaign management platform.
- **PARK:** 2,000 automated posts, massive cross-market translations, speculative agent features, adding another CMS.
- **EXPERIMENT:** one bounded real U.S. client pilot with explicit commercial evidence.

**Next action:** fix the evidenced dual-Next build blocker, verify the audit-to-contact path, and release one sales-useful page with a working CTA. Do not merge PR #76 as a production publishing change before its docs and article meet these gates.
