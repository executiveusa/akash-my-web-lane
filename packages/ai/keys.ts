import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      SYNTHIA_GATEWAY_URL: z.string().url().optional(),
      GATEWAY_API_KEY: z.string().optional(),
      LANE_API_URL: z.string().url().optional(),
      LANE_API_KEY: z.string().optional(),
      OPENAI_API_KEY: z.string().startsWith("sk-").optional(),
    },
    runtimeEnv: {
      SYNTHIA_GATEWAY_URL: process.env.SYNTHIA_GATEWAY_URL,
      GATEWAY_API_KEY: process.env.GATEWAY_API_KEY,
      LANE_API_URL: process.env.LANE_API_URL,
      LANE_API_KEY: process.env.LANE_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  });
