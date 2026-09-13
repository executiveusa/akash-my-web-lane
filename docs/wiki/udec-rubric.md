# UDEC Rubric — SYNTHIA Quality Scoring

## What is UDEC?

UDEC (Universal Design Excellence Criteria) is the internal scoring framework SYNTHIA uses 
to gate deployments. Every generated site is scored 0–10 across 8 dimensions.

**Deployment thresholds:**
- `>= 8.5` → Auto-deploy ✅
- `7.5 – 8.49` → Deploy with Akash review ⚠️
- `< 7.5` → Block and rebuild 🔨

## The 8 Dimensions

### 1. Performance (Weight: 20%)
Measures: Lighthouse Performance score, LCP, CLS, FID, TTFB
- **10/10:** LCP < 1.2s, CLS < 0.01, Lighthouse 98+
- **8/10:** LCP < 2.0s, Lighthouse 90-97
- **6/10:** LCP < 2.5s, Lighthouse 80-89
- **< 5:** Lighthouse < 80

### 2. Typography (Weight: 15%)
Measures: Font pairing quality, size hierarchy, line-height, letter-spacing
- **10/10:** Premium Google Font pair, perfect scale ratio, tight headlines
- **8/10:** Good font, consistent hierarchy
- **6/10:** System font with basic hierarchy
- **< 5:** No hierarchy, browser default fonts

### 3. Color System (Weight: 15%)
Measures: Palette cohesion, contrast ratios, brand alignment
- **10/10:** Custom HSL palette, WCAG AAA, brand-matched
- **8/10:** Curated palette, WCAG AA
- **6/10:** Generic colors, WCAG AA
- **< 5:** Low contrast, inaccessible

### 4. Niche Authenticity (Weight: 15%)
Measures: How well the design matches industry expectations
- **10/10:** Unmistakably feels like the industry (e.g., legal = authority, clinic = clean trust)
- **8/10:** Clearly niche-appropriate
- **6/10:** Generic but professional
- **< 5:** Wrong visual language for the niche

### 5. CTAs & Conversion (Weight: 15%)
Measures: CTA placement, copy strength, funnel logic
- **10/10:** Hero CTA above fold, clear value prop, urgency without manipulation
- **8/10:** Strong CTA, good placement
- **6/10:** CTA present but weak copy
- **< 5:** No clear CTA or buried below fold

### 6. Content Quality (Weight: 10%)
Measures: Heading clarity, body copy density, trust signals
- **10/10:** Every section has a clear purpose, trust signals present
- **8/10:** Good structure, minor copy issues
- **6/10:** Content present but unpolished
- **< 5:** Lorem ipsum or placeholder content

### 7. Mobile Responsiveness (Weight: 5%)
Measures: 360px, 414px, 768px breakpoints
- **10/10:** Perfect across all breakpoints
- **8/10:** Works well on mobile
- **6/10:** Functional but not optimized
- **< 5:** Broken layout on mobile

### 8. Animation & Delight (Weight: 5%)
Measures: Micro-animations, hover effects, page transitions
- **10/10:** Purposeful animations that aid comprehension
- **8/10:** Tasteful hover effects
- **6/10:** Basic or none
- **< 5:** Distracting or excessive

## Scoring Formula

```
UDEC Overall = (
  Performance     × 0.20 +
  Typography      × 0.15 +
  ColorSystem     × 0.15 +
  NicheAuth       × 0.15 +
  CTAConversion   × 0.15 +
  ContentQuality  × 0.10 +
  MobileResp      × 0.05 +
  AnimDelight     × 0.05
)
```

## Common Failure Patterns

| Pattern | Dimension Hit | Fix |
|---|---|---|
| System font used | Typography | Swap to Outfit + DM Sans pair |
| Generic blue buttons | Color System | HSL-based brand color |
| CTA below the fold | CTAs | Move hero button above 600px mark |
| Generic "Welcome" headline | Content | Niche-specific pain point headline |
| No phone number visible | CTAs | Add sticky mobile CTA bar |
| Animated GIF background | Animation | Replace with CSS gradient animation |
