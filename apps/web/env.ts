import { keys as core } from "@repo/next-config/keys";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  extends: [core()],
  server: {},
  client: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().optional(),
    NEXT_PUBLIC_MARKET: z.enum(["in", "us", "mx"]).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_MARKET: process.env.NEXT_PUBLIC_MARKET,
  },
});
