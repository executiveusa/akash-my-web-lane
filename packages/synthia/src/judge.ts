/**
 * SYNTHIA Judge Agent
 * Step 4: Quality gate — UDEC scoring
 * If score ≥ 8.5 → auto-deploy
 * If score < 8.5 → flag for Akash's dashboard review
 */
import { generateObject } from "ai";
import { z } from "zod";
import { SYNTHIA_MODELS, DESIGN_LAWS } from "./index";
import type { UDECScore } from "./index";
import type { DesignSpec } from "./designer";
import type { BuildResult } from "./builder";

export interface JudgeVerdict {
  udec: UDECScore;
  verdict: "PASS" | "NEEDS_REVIEW" | "FAIL";
  blockers: string[];
  recommendations: string[];
  judgedAt: string;
}

const UDECScoreSchema = z.object({
  typography: z.number().min(0).max(10),
  layout: z.number().min(0).max(10),
  color: z.number().min(0).max(10),
  motion: z.number().min(0).max(10),
  accessibility: z.number().min(0).max(10),
  copy: z.number().min(0).max(10),
  performance: z.number().min(0).max(10),
  mobile: z.number().min(0).max(10),
  blockers: z.array(z.string()),
  recommendations: z.array(z.string()).max(5),
  justification: z.string(),
});

/** UDEC axis weights (must sum to 1.0) */
const UDEC_WEIGHTS = {
  typography: 0.12,
  layout: 0.15,
  color: 0.10,
  motion: 0.12, // BLOCKER axis
  accessibility: 0.15, // BLOCKER axis
  copy: 0.15,
  performance: 0.11,
  mobile: 0.10,
} as const;

function calculateUDEC(scores: Omit<UDECScore, "overall" | "passes">): UDECScore {
  const overall = Object.entries(UDEC_WEIGHTS).reduce(
    (sum, [axis, weight]) =>
      sum + (scores[axis as keyof typeof UDEC_WEIGHTS] ?? 0) * weight,
    0
  );

  // BLOCKER axes: motion < 7.0 or accessibility < 7.0 = automatic fail
  const passes =
    overall >= 8.5 &&
    scores.motion >= 7.0 &&
    scores.accessibility >= 7.0;

  return { ...scores, overall: Math.round(overall * 10) / 10, passes };
}

/**
 * Run the Judge Agent — UDEC quality scoring on generated site
 */
export async function judgeQuality(
  design: DesignSpec,
  build: BuildResult,
  niche: string
): Promise<JudgeVerdict> {
  const htmlContent = build.files["index.html"] ?? "";

  const { object: judgeResult } = await generateObject({
    model: SYNTHIA_MODELS.smart,
    schema: UDECScoreSchema,
    prompt: `
You are SYNTHIA's Judge Agent — the final quality gate before deployment.
You enforce the UDEC 8.5 quality floor. Nothing ships below this. Ever.

${DESIGN_LAWS}

## WHAT TO JUDGE
A generated website for a ${niche} business.

## DESIGN INTENT
- Hero: "${design.heroHeadline}"
- Subheadline: "${design.heroSubheadline}"
- CTA: "${design.heroCtaText}"
- Color Palette: ${JSON.stringify(design.palette)}
- Typography: ${JSON.stringify(design.typography)}
- Design Rationale: ${design.designRationale}
- Motion Profile: ${design.motionProfile}

## GENERATED HTML (first 4000 chars)
${htmlContent.slice(0, 4000)}

## SCORING AXES (0-10 each)
- **typography** (0.12 weight): Font choices, scale, rhythm, readability
- **layout** (0.15 weight): Grid, spacing, visual hierarchy, whitespace
- **color** (0.10 weight): Palette cohesion, contrast ratios, niche appropriateness
- **motion** (0.12 weight, BLOCKER <7.0): Animation quality, purposefulness, performance safety
- **accessibility** (0.15 weight, BLOCKER <7.0): Semantic HTML, ARIA, keyboard nav, color contrast
- **copy** (0.15 weight): Headline quality, CTA clarity, benefit-first language, no slop
- **performance** (0.11 weight): Estimated Lighthouse proxy (static HTML = high base)
- **mobile** (0.10 weight): 375px usability, touch targets, no overflow

## CRITICAL RULES
1. Score motion < 7.0 ONLY if animations are clearly broken, missing, or decorative noise
2. Score accessibility < 7.0 ONLY if there are clear semantic/ARIA failures
3. Be harsh on copy — generic, AI-sounding copy should score 5-6 max
4. Be fair on performance — static HTML sites should score 8+ by default
5. List specific blockers (things that MUST be fixed before deploy)
6. List specific recommendations (improvements for next iteration)

Be a strict but fair judge. We need this to pass autonomously.
`,
  });

  const udecScores = {
    typography: judgeResult.typography,
    layout: judgeResult.layout,
    color: judgeResult.color,
    motion: judgeResult.motion,
    accessibility: judgeResult.accessibility,
    copy: judgeResult.copy,
    performance: judgeResult.performance,
    mobile: judgeResult.mobile,
  };

  const udec = calculateUDEC(udecScores);

  let verdict: JudgeVerdict["verdict"];
  if (udec.passes) {
    verdict = "PASS";
  } else if (udec.overall >= 7.5) {
    verdict = "NEEDS_REVIEW"; // Akash reviews and can approve
  } else {
    verdict = "FAIL"; // Rebuild required
  }

  return {
    udec,
    verdict,
    blockers: judgeResult.blockers,
    recommendations: judgeResult.recommendations,
    judgedAt: new Date().toISOString(),
  };
}
