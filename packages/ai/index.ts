export * from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { keys } from "./keys";

const env = keys();

const baseURL = env.SYNTHIA_GATEWAY_URL
  ? `${env.SYNTHIA_GATEWAY_URL}/v1`
  : "https://api.openai.com/v1";

const apiKey = env.GATEWAY_API_KEY ?? env.OPENAI_API_KEY ?? "";

const gateway = createOpenAI({ baseURL, apiKey, compatibility: "compatible" });

export const models = {
  chat: gateway("smart"),
  fast: gateway("fast"),
  research: gateway("research"),
  embeddings: gateway("text-embedding-3-small"),
};
