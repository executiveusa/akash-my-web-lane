# Niche Playbooks — SYNTHIA Design Intelligence

## How Niches Are Used

SYNTHIA detects the site's niche during Step 1 (Analyze) and loads the corresponding 
playbook for Steps 2 (Design) and 3 (Build). Each playbook defines:
- Primary and secondary colors (HSL values)
- Typography pair
- Hero headline formula
- CTA text + placement
- Trust signals required
- Layout pattern

---

## Healthcare & Clinics

**Psychology:** Cleanliness, safety, trust, professional authority
**Color System:** Cool blues + medical white + soft teal accents
```
Primary:   hsl(204, 70%, 45%)  -- Medical blue
Secondary: hsl(170, 50%, 42%)  -- Calming teal
Background: hsl(210, 20%, 97%) -- Near-white
Accent:    hsl(36, 90%, 55%)   -- Warm CTA orange
```
**Typography:** Nunito Sans (headings) + Source Sans 3 (body)
**Hero Formula:** "[Symptom/Problem] → [Solution] → [Credibility proof]"
**Example:** "Chronic back pain? Our physios get you moving in 3 sessions — 2,400+ patients helped."
**CTAs:** "Book Appointment", "Call Now", "Find a Doctor"
**Trust Signals:** License numbers, years in practice, patient count, insurance logos
**Layout:** Clean grid, doctor/staff photos, before-after testimonials

---

## Legal / Law Firms

**Psychology:** Authority, competence, outcomes, trust
**Color System:** Deep navy + gold + charcoal
```
Primary:   hsl(222, 47%, 25%)  -- Deep navy
Secondary: hsl(43, 75%, 50%)   -- Gold
Background: hsl(0, 0%, 98%)    -- Clean white
Accent:    hsl(222, 47%, 35%)  -- Navy lighter
```
**Typography:** Playfair Display (headings) + Inter (body)
**Hero Formula:** "[Case type] client? [Outcome stat]. [CTA]"
**Example:** "Facing a DUI charge? Our attorneys have a 94% dismissal record. Free consultation today."
**CTAs:** "Free Consultation", "Call (xxx) xxx-xxxx", "Tell Us Your Case"
**Trust Signals:** Bar association memberships, case outcome stats, awards, years practicing
**Layout:** Authority-first, large attorney photo, case result statistics prominent

---

## Restaurants & Cafes

**Psychology:** Appetite stimulation, warmth, local community feel
**Color System:** Warm amber + deep brown + cream
```
Primary:   hsl(28, 85%, 50%)   -- Warm amber/saffron
Secondary: hsl(15, 60%, 30%)   -- Deep brown
Background: hsl(30, 30%, 96%) -- Warm cream
Accent:    hsl(120, 40%, 40%)  -- Fresh green (for veg/fresh)
```
**Typography:** Lora (headings) + Nunito (body) 
**Hero Formula:** "[Cuisine/USP] in [Location] — [Social proof]"
**Example:** "Authentic Punjabi dhaba taste in Bangalore — 4.9★ on Zomato, 8 years serving you."
**CTAs:** "Reserve a Table", "Order Online", "View Menu"
**Trust Signals:** Google/Zomato ratings, years open, food safety certs, press coverage
**Layout:** Full-bleed food photography, menu highlights, location map prominent

---

## Contractors & Home Services

**Psychology:** Reliability, local trust, fair pricing, quality work
**Color System:** Rugged charcoal + bold orange/yellow + white
```
Primary:   hsl(24, 90%, 52%)   -- Construction orange
Secondary: hsl(220, 15%, 20%)  -- Dark charcoal
Background: hsl(0, 0%, 98%)   -- Clean white
Accent:    hsl(140, 50%, 40%)  -- Safety green (licensed/insured)
```
**Typography:** Barlow Condensed (headings) + Barlow (body)
**Hero Formula:** "[Service] in [City] — [License/Trust] — [CTA]"
**Example:** "Licensed electricians in Mumbai — same-day service, upfront pricing, 5-star rated."
**CTAs:** "Get Free Quote", "Call Now", "Book Service"
**Trust Signals:** License number, insurance badge, Google reviews count, before/after photos
**Layout:** Service area map, photo gallery of work, badges prominent above fold

---

## E-Commerce / Retail

**Psychology:** Urgency, value, discovery, social proof
**Color System:** Brand-specific (detect from existing site) with high-contrast CTAs
```
Primary:   [match brand]
Accent:    hsl(12, 90%, 55%)   -- Urgency orange for sale/CTA
Success:   hsl(142, 60%, 40%)  -- "In stock" / positive green
```
**Typography:** Inter (all) — clean and fast-feeling
**Hero Formula:** "[Category] — [USP] — [Social proof]"
**CTAs:** "Shop Now", "View Collection", "Get 10% Off"
**Trust Signals:** Reviews count, secure checkout badge, return policy, free shipping threshold
**Layout:** Product grid above fold, trust badges in sticky header, exit-intent offer

---

## Education & Coaching

**Psychology:** Transformation, credibility, outcomes
**Color System:** Deep purple + energetic yellow + white
```
Primary:   hsl(258, 60%, 45%)  -- Academic purple
Secondary: hsl(45, 95%, 55%)   -- Energy yellow
Background: hsl(258, 15%, 97%) -- Soft purple-white
```
**Typography:** Outfit (headings) + DM Sans (body)
**Hero Formula:** "From [Current state] to [Desired outcome] — [Proof]"
**Example:** "From zero to IELTS 7.5 in 8 weeks — 1,200+ students placed."
**CTAs:** "Start Free Trial", "Book Demo Class", "View Curriculum"
**Trust Signals:** Pass rates, student testimonials with photos, instructor credentials, course count
**Layout:** Transformation story, curriculum breakdown, instructor credibility section

---

## Niche Detection Logic

```typescript
// packages/synthia/src/analyzer.ts
function detectNiche(html: string, url: string, meta: string): string {
  const text = (html + url + meta).toLowerCase();
  if (/law|attorney|legal|lawyer|firm|counsel/.test(text)) return "Legal";
  if (/clinic|doctor|health|medical|hospital|physio|dental/.test(text)) return "Healthcare";
  if (/restaurant|cafe|food|eat|dine|menu|kitchen/.test(text)) return "Restaurant";
  if (/contractor|electric|plumb|build|construct|hvac|roofing/.test(text)) return "Contractor";
  if (/shop|store|product|cart|ecommerce|buy/.test(text)) return "E-Commerce";
  if (/school|course|learn|coaching|tutor|train|certif/.test(text)) return "Education";
  return "General Business";
}
```
