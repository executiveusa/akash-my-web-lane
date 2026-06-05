/**
 * SYNTHIA Gateway Bridge
 * Routes to OpenRouter for model aliasing (smart/fast/research)
 * Design laws sourced from synthia-superdesign/studio/doctrine/DESIGN_LAWS.md
 */
import { createOpenAI } from "@ai-sdk/openai";

const baseURL = process.env.SYNTHIA_GATEWAY_URL
  ? `${process.env.SYNTHIA_GATEWAY_URL}/v1`
  : "https://openrouter.ai/api/v1";

const apiKey =
  process.env.GATEWAY_API_KEY ??
  process.env.OPEN_ROUTER_API ??
  process.env.OPENAI_API_KEY ??
  "";

export const gateway = createOpenAI({
  baseURL,
  apiKey,
  headers: {
    "HTTP-Referer": "https://myweblane.com",
    "X-Title": "My Web Lane SYNTHIA Pipeline",
  },
});

/** SYNTHIA model aliases — maps to OpenRouter model IDs */
export const SYNTHIA_MODELS = {
  /** Fast analysis — Claude Haiku / GPT-4o-mini */
  fast: gateway("anthropic/claude-haiku-20240307"),
  /** Main reasoning — GPT-4o / Claude Sonnet */
  smart: gateway("openai/gpt-4o"),
  /** Deep research — o1 / Claude Opus */
  research: gateway("openai/o1-mini"),
} as const;

/** SYNTHIA Design Laws (from DESIGN_LAWS.md) — embedded for prompt injection */
export const DESIGN_LAWS = `
# SYNTHIA Design Laws (Non-Negotiable)

## Law 0 — Feature First, Not Layout First
Design the feature. Then find where it lives. Start with what the user needs to accomplish.

## Law 1 — Hierarchy Is Foundation
Every screen must have exactly 3 levels of visual hierarchy:
1. Primary: The one thing you see first (display type, ≥3.5rem)
2. Secondary: Supporting context (body, subheadings)
3. Tertiary: De-emphasized metadata (timestamps, labels, captions)

## Law 2 — Spacing Is Meaning
Elements that belong together are close. Elements that are separate have breathing room.
Minimum section padding: py-24 (6rem). Never use arbitrary values.

## Law 3 — Visual Weight Creates Flow
Direct the eye through intentional contrast: Size, Color, Weight, Space, Position (F/Z-pattern)

## Law 5 — Borders Are the Last Resort
Create separation through: Spacing > Background color difference > Box shadow > Border (last resort)

## Law 6 — Labels Describe Actions, Not Fields
Buttons say what they do: "Run Audit", "Start Migration" — not "Submit" or "Click Here"

## Law 7 — One Action Per Viewport
Each scroll-stop has exactly one clear next action. Multiple choices = no choice.

## Law 8 — Mobile Is Not a Smaller Desktop
At 375px: Touch targets ≥44px, No parallax, No horizontal overflow, Thumb-reachable forms

## Law 9 — Motion Communicates Meaning
Animation is information. Entrance = arrived. Exit = left. Transition = state changed.
Motion without meaning is decoration. Decoration without purpose is noise.

## Law 10 — Performance Is a Design Decision
Animate only transform and opacity. Use IntersectionObserver. Images: WebP/AVIF.
`;

/** UDEC quality axes — scoring rubric */
export interface UDECScore {
  typography: number; // T — font choice, scale, rhythm
  layout: number; // L — grid, spacing, visual hierarchy
  color: number; // C — palette, contrast, accessibility
  motion: number; // MOT — animation quality (BLOCKER if <7.0)
  accessibility: number; // ACC — a11y compliance (BLOCKER if <7.0)
  copy: number; // CP — headline quality, CTA clarity
  performance: number; // P — estimated Lighthouse proxy
  mobile: number; // M — responsive design
  overall: number; // weighted average
  passes: boolean; // true if overall ≥ 8.5 and no BLOCKER axes fail
}

export * from "./analyzer";
export * from "./designer";
export * from "./builder";
export * from "./judge";
