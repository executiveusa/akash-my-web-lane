/**
 * SYNTHIA Analyzer Agent
 * Step 1 of the migration pipeline:
 * - Crawls the WordPress site with Firecrawl
 * - Detects niche, plugins, content structure
 * - Measures mobile performance with PageSpeed Insights when available
 * - Falls back to an explicitly labeled heuristic when measurement is unavailable
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
  currentScore: number;
  scoreSource: "pagespeed" | "heuristic";
  scoreNote: string;
  plugins: string[];
  pageCount: number;
  primaryColor: string;
  copyTone: "professional" | "casual" | "technical" | "friendly";
  competitorInsights: string;
  contentSections: string[];
  painPoints: string[];
  opportunities: string[];
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
  plugins: z.array(z.string()),
  pageCount: z.number(),
  primaryColor: z.string(),
  copyTone: z.enum(["professional", "casual", "technical", "friendly"]),
  contentSections: z.array(z.string()),
  painPoints: z.array(z.string()).max(5),
  opportunities: z.array(z.string()).max(5),
});

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

function detectPlugins(html: string): string[] {
  const found: string[] = [];
  for (const [plugin, fingerprint] of Object.entries(WP_PLUGIN_PATTERNS)) {
    if (html.toLowerCase().includes(fingerprint)) found.push(plugin);
  }
  if (html.includes("wp-content") || html.includes("wp-includes")) {
    if (!found.includes("wordpress-core")) found.unshift("wordpress-core");
  }
  return found;
}

/** Internal triage only. Never present this as a measured Lighthouse result. */
function estimatePerformanceHeuristic(html: string, plugins: string[]): number {
  let score = 70;
  if (plugins.includes("elementor")) score -= 15;
  if (plugins.includes("revslider")) score -= 10;
  if (plugins.includes("divi")) score -= 12;
  if (plugins.includes("woocommerce")) score -= 8;
  score -= Math.min(plugins.length * 2, 20);
  if (html.length > 100000) score -= 10;
  if (html.length > 200000) score -= 10;
  return Math.max(10, Math.min(score, 85));
}

type PageSpeedMeasurement = {
  score: number;
  fetchedAt?: string;
};

/**
 * Measure performance using Google's PageSpeed Insights / Lighthouse API.
 * PAGESPEED_API_KEY is optional for low-volume use and recommended for quota.
 */
async function measurePageSpeed(wpUrl: string): Promise<PageSpeedMeasurement | null> {
  try {
    const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    endpoint.searchParams.set("url", wpUrl);
    endpoint.searchParams.set("category", "performance");
    endpoint.searchParams.set("strategy", "mobile");

    const apiKey = process.env.PAGESPEED_API_KEY;
    if (apiKey) endpoint.searchParams.set("key", apiKey);

    const response = await fetch(endpoint.toString());
    if (!response.ok) return null;

    const data = (await response.json()) as any;
    const rawScore = data?.lighthouseResult?.categories?.performance?.score;
    if (typeof rawScore !== "number") return null;

    return {
      score: Math.round(rawScore * 100),
      fetchedAt: data?.lighthouseResult?.fetchTime ?? data?.analysisUTCTimestamp,
    };
  } catch {
    return null;
  }
}

export async function analyzeWordPressSite(
  wpUrl: string,
  clientName?: string,
  whatsapp?: string
): Promise<AnalysisReport> {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlKey) throw new Error("FIRECRAWL_API_KEY not set");

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
  } catch {
    markdown = `Website: ${wpUrl}`;
  }

  const plugins = detectPlugins(html);
  const pageCount = Math.min(links.length + 1, 50);

  const measuredPerformance = await measurePageSpeed(wpUrl);
  const heuristicScore = estimatePerformanceHeuristic(html, plugins);
  const currentScore = measuredPerformance?.score ?? heuristicScore;
  const scoreSource: AnalysisReport["scoreSource"] = measuredPerformance ? "pagespeed" : "heuristic";
  const scoreNote = measuredPerformance
    ? `Measured with PageSpeed Insights mobile Lighthouse${measuredPerformance.fetchedAt ? ` at ${measuredPerformance.fetchedAt}` : ""}`
    : "Estimated from detected site characteristics because a PageSpeed measurement was unavailable";

  const { object: analysis } = await generateObject({
    model: SYNTHIA_MODELS.fast,
    schema: AnalysisReportSchema,
    prompt: `
You are SYNTHIA, a web design analyst. Analyze this site using only the supplied evidence.

${DESIGN_LAWS}

## Site URL
${wpUrl}

## Crawled Content (first 3000 chars)
${markdown.slice(0, 3000)}

## Detected Plugins
${plugins.join(", ") || "None detected"}

## Instructions
Return structured analysis:
- Identify the niche and category
- Extract the main content sections
- Identify 3-5 specific pain points supported by the supplied site evidence
- Identify 3-5 opportunities for improvement
- Determine brand primary color if visible
- Assess copy tone

Do not invent performance numbers, customer results, traffic, conversion rates, or business facts not present in the evidence.
`,
  });

  let competitorInsights = "";
  try {
    const { text } = await generateText({
      model: SYNTHIA_MODELS.fast,
      prompt: `In 2 sentences, describe common high-performing design and UX patterns for ${analysis.niche} websites. State these as general patterns, not facts about ${wpUrl}.`,
      maxTokens: 150,
    });
    competitorInsights = text;
  } catch {
    competitorInsights = `Common ${analysis.niche} website patterns include clear calls to action, strong mobile usability, and fast page delivery.`;
  }

  return {
    wpUrl,
    niche: analysis.niche,
    nicheCategory: analysis.nicheCategory,
    currentScore,
    scoreSource,
    scoreNote,
    plugins: plugins.length ? plugins : analysis.plugins,
    pageCount: links.length ? pageCount : analysis.pageCount,
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
