export * from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { keys } from "./keys";

const env = keys();

const baseURL = env.SYNTHIA_GATEWAY_URL
  ? `${env.SYNTHIA_GATEWAY_URL}/v1`
  : "https://api.openai.com/v1";

const apiKey = env.GATEWAY_API_KEY ?? env.OPENAI_API_KEY ?? "";

const gateway = createOpenAI({ baseURL, apiKey });

import type { EmbeddingModel, LanguageModel } from "ai";

export const models: Record<string, LanguageModel> = {
  chat: gateway("smart"),
  fast: gateway("fast"),
  research: gateway("research"),
};

export const embeddings: EmbeddingModel<string> = gateway.embedding("text-embedding-3-small");
