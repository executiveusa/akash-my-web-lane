/**
 * SYNTHIA Analyzer Agent
 * Step 1 of the migration pipeline:
 * - Crawls the WordPress site with Firecrawl
 * - Detects niche, plugins, content structure
 * - Scores current Lighthouse performance
 * - Researches competitors
 * - Returns a structured AnalysisReport
 */
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { SYNTHIA_MODELS, DESIGN_LAWS } from "./index";

export interface AnalysisReport {
  wpUrl: string;
  niche: string;
  nicheCategory:
    | "healthcare"
    | "legal"
    | "ecommerce"
    | "contractor"
    | "restaurant"
    | "education"
    | "other";
  currentScore: number; // estimated Lighthouse 0-100
  plugins: string[]; // detected WP plugins
  pageCount: number;
  primaryColor: string; // extracted or guessed brand color
  copyTone: "professional" | "casual" | "technical" | "friendly";
  competitorInsights: string;
  contentSections: string[]; // main sections of the WP site
  painPoints: string[]; // what's wrong with the current site
  opportunities: string[]; // what could be dramatically better
  clientName?: string;
  whatsapp?: string;
  analyzedAt: string;
}

export const AnalysisReportSchema = z.object({
  niche: z.string(),
  nicheCategory: z.enum([
    "healthcare",
    "legal",
    "ecommerce",
    "contractor",
    "restaurant",
    "education",
    "other",
  ]),
  estimatedLighthouseScore: z.number().min(0).max(100),
  plugins: z.array(z.string()),
  pageCount: z.number(),
  primaryColor: z.string(),
  copyTone: z.enum(["professional", "casual", "technical", "friendly"]),
  contentSections: z.array(z.string()),
  painPoints: z.array(z.string()).max(5),
  opportunities: z.array(z.string()).max(5),
});

/** Common WordPress plugin fingerprints detectable in HTML */
const WP_PLUGIN_PATTERNS: Record<string, string> = {
  elementor: "elementor",
  woocommerce: "woocommerce",
  "yoast-seo": "yoast",
  "contact-form-7": "wpcf7",
  wpforms: "wpforms",
  "gravity-forms": "gform",
  divi: "et_pb",
  "revslider": "revslider",
  "slider-revolution": "revolutionslider",
  avada: "avada",
};

/** Detect WordPress plugins from page HTML */
function detectPlugins(html: string): string[] {
  const found: string[] = [];
  for (const [plugin, fingerprint] of Object.entries(WP_PLUGIN_PATTERNS)) {
    if (html.toLowerCase().includes(fingerprint)) {
      found.push(plugin);
    }
  }
  // Check for generic WordPress markers
  if (html.includes("wp-content") || html.includes("wp-includes")) {
    if (!found.includes("wordpress")) found.unshift("wordpress-core");
  }
  return found;
}

/** Estimate Lighthouse score from page characteristics */
function estimateLighthouseScore(html: string, plugins: string[]): number {
  let score = 70; // base
  // Heavy plugins drag score down
  if (plugins.includes("elementor")) score -= 15;
  if (plugins.includes("revslider")) score -= 10;
  if (plugins.includes("divi")) score -= 12;
  if (plugins.includes("woocommerce")) score -= 8;
  // Multiple plugins = more JS = slower
  score -= Math.min(plugins.length * 2, 20);
  // Large HTML suggests bloat
  if (html.length > 100000) score -= 10;
  if (html.length > 200000) score -= 10;
  return Math.max(10, Math.min(score, 85));
}

/**
 * Main analysis function — called as Step 1 of Absurd workflow
 * Uses Firecrawl API directly to avoid browser dependency
 */
export async function analyzeWordPressSite(
  wpUrl: string,
  clientName?: string,
  whatsapp?: string
): Promise<AnalysisReport> {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlKey) throw new Error("FIRECRAWL_API_KEY not set");

  // Step 1: Crawl with Firecrawl
  let html = "";
  let markdown = "";
  let links: string[] = [];

  try {
    const crawlRes = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firecrawlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: wpUrl,
        formats: ["html", "markdown", "links"],
        actions: [],
        timeout: 30000,
      }),
    });
    const crawlData = (await crawlRes.json()) as any;
    html = crawlData?.data?.html ?? "";
    markdown = crawlData?.data?.markdown ?? "";
    links = crawlData?.data?.links ?? [];
  } catch (e) {
    // Graceful degradation — analyze from URL only
    markdown = `Website: ${wpUrl}`;
  }

  // Step 2: Detect plugins and score
  const plugins = detectPlugins(html);
  const estimatedScore = estimateLighthouseScore(html, plugins);
  const pageCount = Math.min(links.length + 1, 50);

  // Step 3: SYNTHIA fast model — classify niche + extract insights
  const { object: analysis } = await generateObject({
    model: SYNTHIA_MODELS.fast,
    schema: AnalysisReportSchema,
    prompt: `
You are SYNTHIA, a top-tier web design analyst. Analyze this WordPress site.

${DESIGN_LAWS}

## Site URL
${wpUrl}

## Crawled Content (first 3000 chars)
${markdown.slice(0, 3000)}

## Detected Plugins
${plugins.join(", ") || "None detected"}

## Instructions
Analyze this site and return structured analysis:
- Identify the niche and category (healthcare/legal/ecommerce/contractor/restaurant/education/other)
- Estimate Lighthouse performance score (typically 20-55 for WordPress sites with page builders)
- Extract the main content sections
- Identify 3-5 specific pain points (slow load, outdated design, poor mobile, plugin bloat etc)
- Identify 3-5 opportunities for the rebuilt site
- Determine brand primary color if visible in content
- Assess copy tone

Be specific. No generic responses. Reference actual site content when possible.
`,
  });

  // Step 4: Quick competitor insight (fast model)
  let competitorInsights = "";
  try {
    const { text } = await generateText({
      model: SYNTHIA_MODELS.fast,
      prompt: `In 2 sentences, what do the TOP performing ${analysis.niche} websites do better than most? Focus on design and UX patterns that convert.`,
      maxTokens: 150,
    });
    competitorInsights = text;
  } catch {
    competitorInsights = `Top ${analysis.niche} sites prioritize speed, clear CTAs, and social proof.`;
  }

  return {
    wpUrl,
    niche: analysis.niche,
    nicheCategory: analysis.nicheCategory,
    currentScore: analysis.estimatedLighthouseScore,
    plugins: analysis.plugins,
    pageCount: analysis.pageCount,
    primaryColor: analysis.primaryColor,
    copyTone: analysis.copyTone,
    competitorInsights,
    contentSections: analysis.contentSections,
    painPoints: analysis.painPoints,
    opportunities: analysis.opportunities,
    clientName,
    whatsapp,
    analyzedAt: new Date().toISOString(),
  };
}
