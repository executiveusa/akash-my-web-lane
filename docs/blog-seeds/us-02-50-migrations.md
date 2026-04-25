---
title: "I Migrated 50 WordPress Sites in 2 Months. Here's What I Learned."
slug: 50-wordpress-migrations-two-months
category: case-study
market: us
language: en
description: "Real lessons from migrating 50 client sites off WordPress using Akash Engine. What surprised us, what failed, what the clients actually said, and the exact revenue math."
date: 2026-04-25
---

# I Migrated 50 WordPress Sites in 2 Months. Here's What I Learned.

## The Decision

In January 2026, I had 22 active maintenance clients. All WordPress. All on retainers between $150-$250/month.

I was billing about $4,200/month in recurring revenue, working 35-40 hours/month maintaining their sites.

Then I found Akash Engine. And I made a decision: I was going to migrate every single client off WordPress in the next 60 days.

Here's what happened.

---

## The Setup

**My agency:** 1 person (me) + 1 part-time contractor
**WordPress sites to migrate:** 22 existing clients + 28 new prospects
**Target:** 50 migrations in 60 days
**Tool:** Akash Engine
**Goal:** Replace $4,200/month WordPress maintenance with AI services retainers

---

## Migrations 1-10: Learning the Tool

The first migration took me 45 minutes total: 25 for the Akash Engine process, 20 for reviewing the output and sending the client preview.

By migration #5, I was under 30 minutes start-to-finish.

By migration #10, I had a system:
1. Queue migration in Akash Engine (takes 25 minutes unattended)
2. Review Lighthouse report
3. Check 5 random pages for content accuracy
4. Record 90-second Loom video of the site preview
5. Send email: "Here's your new site — want to review together?"

**What surprised me:** The Lighthouse scores were consistently 92-97. I had expected some variation, some failures. There weren't many. The architecture just works.

**What almost tripped me up:** Client #7 had a WordPress site with a custom booking plugin that wasn't standard. The AI migration correctly extracted all the content pages but flagged the booking plugin as out of scope. I handled this by integrating their existing booking system via iframe into the new site while their booking provider built a native API integration. Client didn't notice the difference.

---

## Migrations 11-20: The Client Reactions

**The client conversation I was most nervous about:** Tom Reeves, an attorney in Denver who'd been with me since 2019. Seven years. $175/month. I was sure he'd push back on changing anything.

His response to the preview: "The load time is 0.6 seconds? My old site took 8 seconds. Can you show me the Lighthouse report? I want to show my business coach."

He upgraded to the $699/month AI services retainer without me asking.

**The most common reaction:** "Wow, it looks almost exactly the same, but everything is faster." This happened on about 70% of migrations. Clients expected a complete redesign. The fact that their content was preserved exactly — same pages, same images, same text — made approval easier.

**The pushback I got:** Two clients asked about "what happens if Cloudflare goes down." I answered honestly: Cloudflare has better uptime than any hosting provider they were previously on. I offered to put it in writing: if uptime dropped below 99.9% in any month, I'd refund that month's retainer. Neither ever triggered that clause.

---

## Migrations 21-35: Building the Repeatable System

By migration #21, I had a full system:

**Pre-migration checklist (10 minutes):**
- Document custom plugins that won't migrate
- Screenshot current Lighthouse score for before/after
- Check Google Search Console for any active issues
- Note any redirects we need to preserve

**Migration (25 minutes unattended):**
- Enter URL in Akash Engine
- Go do something else
- Come back to a complete preview

**Post-migration review (15 minutes):**
- Verify content on 10 random pages
- Test forms
- Check all internal links
- Verify existing redirects work
- Confirm meta titles/descriptions are preserved

**Client presentation (10 minutes):**
- Before/after Lighthouse screenshots
- Mobile load time comparison
- "Your Core Web Vitals now pass Google's standards" slide
- Preview link

**Total: 60 minutes per migration**

At my billing rate of $499/migration and 60 minutes of real work: **$499/hour effective rate.**

---

## Migrations 36-50: New Clients From Referrals

By week 6, I had migrated 35 of my existing clients. The other 13 new prospect migrations came from something I hadn't planned for: referrals.

My existing clients were talking. Attorney tells dental client. Dental client tells restaurant owner. Restaurant owner calls me.

Three of my migrated clients proactively offered to be case studies. I built a one-pager with their before/after data. That one-pager closed 6 more deals.

---

## The Revenue Math (Final Numbers)

**Before (22 clients, WordPress maintenance):**
- Monthly recurring: $4,200
- Monthly hours: 38
- Effective hourly rate: $110/hour

**After 60 days (50 sites migrated):**
- Migration project revenue: 50 × $499 = $24,950 (one-time)
- New monthly recurring: 50 clients × avg $549/month AI retainers = $27,450/month
- Monthly hours: 18 (no plugin maintenance, just AI strategy and content)
- Effective hourly rate: $1,525/hour

**The compound effect:** At $27,450/month recurring, I can now afford to hire a full-time operations person and still net more than I was before. The business went from solo plugin janitor to small agency with leverage.

---

## What Actually Failed

Honesty matters. Here's what didn't work:

**4 clients said no to the migration.** Three are running WooCommerce stores — Akash Engine explicitly doesn't handle ecommerce, and that's fine. One client had a fully custom PHP application embedded in WordPress that would require a rebuild, not a migration. Those 4 stayed on WordPress maintenance.

**1 migration had an SEO issue.** A law firm client had 200 pages of location-specific landing pages that were all dynamically generated from WordPress. The migration captured them all as static pages, which was correct, but their internal linking structure was slightly different. Google re-crawled over about 3 weeks and everything resolved, but there was a short period of flux. I was transparent with the client, provided daily updates, and they appreciated the communication.

**The Scout agent needed refinement.** I set up the Scout agent to find new leads. It found lots of slow WordPress sites. But the automated outreach needed personalization — the first batch of cold outreach had a low response rate. Once I added specific data points ("Your site scored 32 on Lighthouse, here's what that means for your dental practice") the response rate tripled.

---

## The Honest Summary

The migration play works. The math is real. The client reactions are better than I expected.

But here's what I'd tell someone starting today:

1. **Start with your easiest clients, not your most valuable.** Build confidence before pitching your anchor clients.

2. **Show them the Lighthouse report before migration.** The "your site scores 38/100" conversation is what creates urgency.

3. **Price the AI retainer before the migration is done.** Close the upgrade at the same time you close the migration project.

4. **Document everything.** Before/after screenshots, testimonials, response times. Your second wave of clients will come from referrals, and they'll want proof.

5. **Don't over-promise on timeline.** I told clients "expect 1-2 weeks for full migration and QA." Most finished in 3 days. Managing expectations down is always better than up.

**→ [Try Akash Engine on your first client site — free migration](/signup)**
