import { keys as analytics } from "@repo/analytics/keys";
import { keys as auth } from "@repo/auth/keys";
import { keys as collaboration } from "@repo/collaboration/keys";
import { keys as database } from "@repo/database/keys";
import { keys as email } from "@repo/email/keys";
import { keys as flags } from "@repo/feature-flags/keys";
import { keys as core } from "@repo/next-config/keys";
import { keys as notifications } from "@repo/notifications/keys";
import { keys as observability } from "@repo/observability/keys";
import { keys as security } from "@repo/security/keys";
import { keys as webhooks } from "@repo/webhooks/keys";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  extends: [
    auth(),
    analytics(),
    collaboration(),
    core(),
    database(),
    email(),
    flags(),
    notifications(),
    observability(),
    security(),
    webhooks(),
  ],
  server: {
    SYNTHIA_GATEWAY_URL: z.string().url().optional(),
    GATEWAY_API_KEY: z.string().optional(),
    LANE_API_URL: z.string().url().optional(),
    LANE_API_KEY: z.string().optional(),
    RAZORPAY_KEY_ID: z.string().optional(),
    RAZORPAY_KEY_SECRET: z.string().optional(),
    OWNER_WHATSAPP: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    SYNTHIA_GATEWAY_URL: process.env.SYNTHIA_GATEWAY_URL,
    GATEWAY_API_KEY: process.env.GATEWAY_API_KEY,
    LANE_API_URL: process.env.LANE_API_URL,
    LANE_API_KEY: process.env.LANE_API_KEY,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    OWNER_WHATSAPP: process.env.OWNER_WHATSAPP,
  },
});
