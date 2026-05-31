"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const keys_1 = require("@repo/analytics/keys");
const keys_2 = require("@repo/auth/keys");
const keys_3 = require("@repo/collaboration/keys");
const keys_4 = require("@repo/database/keys");
const keys_5 = require("@repo/email/keys");
const keys_6 = require("@repo/feature-flags/keys");
const keys_7 = require("@repo/next-config/keys");
const keys_8 = require("@repo/notifications/keys");
const keys_9 = require("@repo/observability/keys");
const keys_10 = require("@repo/security/keys");
const keys_11 = require("@repo/webhooks/keys");
const env_nextjs_1 = require("@t3-oss/env-nextjs");
const zod_1 = require("zod");
exports.env = (0, env_nextjs_1.createEnv)({
    extends: [
        (0, keys_2.keys)(),
        (0, keys_1.keys)(),
        (0, keys_3.keys)(),
        (0, keys_7.keys)(),
        (0, keys_4.keys)(),
        (0, keys_5.keys)(),
        (0, keys_6.keys)(),
        (0, keys_8.keys)(),
        (0, keys_9.keys)(),
        (0, keys_10.keys)(),
        (0, keys_11.keys)(),
    ],
    server: {
        SYNTHIA_GATEWAY_URL: zod_1.z.string().url().optional(),
        GATEWAY_API_KEY: zod_1.z.string().optional(),
        LANE_API_URL: zod_1.z.string().url().optional(),
        LANE_API_KEY: zod_1.z.string().optional(),
        RAZORPAY_KEY_ID: zod_1.z.string().optional(),
        RAZORPAY_KEY_SECRET: zod_1.z.string().optional(),
        OWNER_WHATSAPP: zod_1.z.string().optional(),
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
