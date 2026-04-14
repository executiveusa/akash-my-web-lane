import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
      STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_").optional(),
      RAZORPAY_KEY_ID: z.string().min(1),
      RAZORPAY_KEY_SECRET: z.string().min(1),
    },
    runtimeEnv: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
      RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    },
  });
