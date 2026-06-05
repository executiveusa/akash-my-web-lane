/**
 * SYNTHIA Designer Agent
 * Step 2 of the migration pipeline — Karpathy Council Protocol:
 * 1. Generate 3 parallel design variations
 * 2. Score each with UDEC
 * 3. Synthesize the best into a final design spec
 * 4. Output: DesignSpec used by Builder Agent
 */
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { SYNTHIA_MODELS, DESIGN_LAWS } from "./index";
import type { AnalysisReport } from "./analyzer";

export interface DesignSpec {
  /** Final synthesized design system */
  palette: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  typography: {
    heading: string; // Google Font name
    body: string; // Google Font name
    mono?: string; // optional mono font
  };
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  sections: DesignSection[];
  motionProfile: "minimal" | "moderate" | "cinematic";
  designRationale: string;
  udecProjection: number; // projected UDEC score 0-10
}

export interface DesignSection {
  type:
    | "hero"
    | "features"
    | "stats"
    | "testimonials"
    | "process"
    | "cta"
    | "footer";
  headline: string;
  content: string;
  layout: "full-width" | "grid" | "centered" | "split";
}

const DesignVariationSchema = z.object({
  palette: z.object({
    primary: z.string(),
    accent: z.string(),
    background: z.string(),
    surface: z.string(),
    text: z.string(),
    muted: z.string(),
  }),
  typography: z.object({
    heading: z.string(),
    body: z.string(),
    mono: z.string().optional(),
  }),
  heroHeadline: z.string(),
  heroSubheadline: z.string(),
  heroCtaText: z.string(),
  sections: z
    .array(
      z.object({
        type: z.enum([
          "hero",
          "features",
          "stats",
          "testimonials",
          "process",
          "cta",
          "footer",
        ]),
        headline: z.string(),
        content: z.string(),
        layout: z.enum(["full-width", "grid", "centered", "split"]),
      })
    )
    .max(7),
  motionProfile: z.enum(["minimal", "moderate", "cinematic"]),
  designRationale: z.string(),
  udecProjection: z.number().min(0).max(10),
});

const NICHE_DESIGN_RULES: Record<string, string> = {
  healthcare: `
- Colors: Trust-inducing blues + whites. Accent: calming green. Never: red as primary (emergency connotations).
- Typography: Clean sans-serif (Outfit, DM Sans). Never decorative.
- Sections: Hero (pain/solution), Services list, Doctor credentials, Patient testimonials, Appointment CTA
- Copy: Empathetic. "You deserve care that listens." Not "We are the best clinic."
- Stats: Years of practice, patients helped, procedures performed
  `,
  legal: `
- Colors: Deep navy or charcoal + gold accent. White space is authority.
- Typography: Serif headings (Playfair Display), clean body
- Sections: Hero (case type + outcome promise), Practice areas, Attorney profiles, Case results, Free consultation CTA
- Copy: Confident. "You've been wronged. We fix it." Not corporate jargon.
- Never: Stock images of courtrooms. Use genuine team photos or clean abstracts.
  `,
  ecommerce: `
- Colors: Brand-aligned. High contrast for products. 
- Typography: Clean, highly legible. Never decorative for product names.
- Sections: Hero (bestseller + value prop), Product grid, Social proof, Trust badges, CTA
- Performance: CRITICAL — every 100ms matters. Lazy-load products. WebP images.
- Copy: Benefit-first. "Delivered in 2 hours" not "Fast shipping available"
  `,
  contractor: `
- Colors: Professional dark (navy, slate, charcoal) + warm accent (orange, amber)
- Typography: Bold, strong. Oswald or Montserrat headings.
- Sections: Hero (service + location), Portfolio/gallery, Process (3 steps), Testimonials, Free quote CTA
- Copy: Direct. "Your roof fixed in 24 hours or we work nights." 
- Local SEO: City name in headline. Service area map.
  `,
  restaurant: `
- Colors: Appetite-inducing. Warm reds, ambers, creams. Dark moody for fine dining.
- Typography: Elegant (Cormorant) for fine dining, playful (Pacifico) for casual
- Sections: Hero (best dish photo + reservation), Menu preview, Story/ambiance, Reviews, Booking CTA
- Performance: CRITICAL — customers check on 3G while walking. Must load in < 1s.
- Never: Blurry food photos. Hire photographer or use Unsplash chef-quality shots.
  `,
  education: `
- Colors: Energetic but professional. Teal + orange combo works. Avoid red (stress).
- Typography: Friendly but authoritative. Nunito + DM Serif Display
- Sections: Hero (outcome promise), Course/program showcase, Instructor credibility, Student success stories, Enroll CTA
- Copy: Future-focused. "In 6 months, you'll be job-ready." 
- Trust: Accreditations, employer partners, graduate outcomes
  `,
};

/**
 * Run the SYNTHIA Design Council (Karpathy Protocol)
 * Generates 3 variations, scores them, synthesizes the best
 */
export async function runDesignCouncil(
  analysis: AnalysisReport
): Promise<DesignSpec> {
  const nicheRules =
    NICHE_DESIGN_RULES[analysis.nicheCategory] ??
    "Apply universal design best practices. Focus on clarity, speed, and conversion.";

  const basePrompt = `
You are SYNTHIA's Design Council. You are designing a complete website redesign.

## DESIGN LAWS (NON-NEGOTIABLE)
${DESIGN_LAWS}

## NICHE-SPECIFIC RULES FOR ${analysis.niche.toUpperCase()}
${nicheRules}

## SITE ANALYSIS
- URL: ${analysis.wpUrl}
- Current Lighthouse Score: ${analysis.currentScore}/100 (we must achieve 95+)
- Current Pain Points: ${analysis.painPoints.join(", ")}
- Opportunities: ${analysis.opportunities.join(", ")}
- Brand Color Detected: ${analysis.primaryColor}
- Copy Tone: ${analysis.copyTone}
- Content Sections: ${analysis.contentSections.join(", ")}
- Competitor Insight: ${analysis.competitorInsights}

## YOUR TASK
Design a premium redesign. Think Awwwards SOTD caliber.
The website must:
1. Load in < 0.5s (Astro + Cloudflare edge = no JS by default)
2. Score 95+ on Lighthouse
3. Convert visitors to leads/customers
4. Feel premium and trustworthy for the niche
5. UDEC score projection ≥ 8.5

Focus on the hero headline — it must communicate:
- Who this is for
- What transformation they get  
- Why trust this company

No generic copy. No "We are the best". Real specific value propositions.
`;

  // Generate 3 parallel variations
  const [v1, v2, v3] = await Promise.all([
    generateObject({
      model: SYNTHIA_MODELS.smart,
      schema: DesignVariationSchema,
      prompt: `${basePrompt}\n\n## VARIATION 1: BOLD/DARK\nDark background, high contrast, premium feel. Use the client's industry colors but push them to their most sophisticated expression.`,
    }),
    generateObject({
      model: SYNTHIA_MODELS.smart,
      schema: DesignVariationSchema,
      prompt: `${basePrompt}\n\n## VARIATION 2: CLEAN/LIGHT\nLight and airy. White space as luxury. Minimal but impactful. Trust-maximizing.`,
    }),
    generateObject({
      model: SYNTHIA_MODELS.smart,
      schema: DesignVariationSchema,
      prompt: `${basePrompt}\n\n## VARIATION 3: VIBRANT/CONVERSION-FOCUSED\nBold typography, strong CTAs, optimized for conversion. Urgency and social proof front and center.`,
    }),
  ]);

  // Score each variation
  const variations = [v1.object, v2.object, v3.object];
  const best = variations.reduce((a, b) =>
    a.udecProjection > b.udecProjection ? a : b
  );

  // Synthesize: take the best variation and enhance it
  const { object: final } = await generateObject({
    model: SYNTHIA_MODELS.smart,
    schema: DesignVariationSchema,
    prompt: `
${basePrompt}

## SYNTHESIS TASK
You've reviewed 3 design variations. Here's the best one (UDEC: ${best.udecProjection}/10):

${JSON.stringify(best, null, 2)}

Now synthesize the FINAL design spec. Take what's best from the winning variation.
Improve any weak points. Ensure:
1. Hero headline is punchy, specific, and speaks directly to the client's customer
2. All sections have clear purpose (Law 7: One Action Per Viewport)
3. Color palette is cohesive and niche-appropriate
4. Typography pairing is excellent
5. Motion profile matches the niche (conservative for legal, expressive for restaurants)
6. UDEC projection should be 8.8+ for this to pass quality gate

The human (Akash) only reviews if we fall below 8.5. Make this pass automatically.
`,
  });

  return {
    palette: final.palette,
    typography: final.typography,
    heroHeadline: final.heroHeadline,
    heroSubheadline: final.heroSubheadline,
    heroCtaText: final.heroCtaText,
    sections: final.sections,
    motionProfile: final.motionProfile,
    designRationale: final.designRationale,
    udecProjection: final.udecProjection,
  };
}
