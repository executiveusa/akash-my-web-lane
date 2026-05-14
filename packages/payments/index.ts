import "server-only";
import Stripe from "stripe";
import { keys } from "./keys";

const config = keys();

export const stripe = config.STRIPE_SECRET_KEY
  ? new Stripe(config.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
    })
  : null;

export * from "./src/razorpay";
export type { Stripe } from "stripe";
