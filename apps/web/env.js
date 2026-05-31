"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const keys_1 = require("@repo/next-config/keys");
const env_nextjs_1 = require("@t3-oss/env-nextjs");
const zod_1 = require("zod");
exports.env = (0, env_nextjs_1.createEnv)({
    extends: [(0, keys_1.keys)()],
    server: {
        FLAGS_SECRET: zod_1.z.string().optional(),
        ARCJET_KEY: zod_1.z.string().optional(),
    },
    client: {
        NEXT_PUBLIC_RAZORPAY_KEY_ID: zod_1.z.string().optional(),
        NEXT_PUBLIC_MARKET: zod_1.z.enum(["in", "us", "mx"]).optional(),
    },
    runtimeEnv: {
        FLAGS_SECRET: process.env.FLAGS_SECRET,
        ARCJET_KEY: process.env.ARCJET_KEY,
        NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        NEXT_PUBLIC_MARKET: process.env.NEXT_PUBLIC_MARKET,
    },
});
