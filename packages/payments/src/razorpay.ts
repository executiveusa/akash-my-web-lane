/**
 * Razorpay payment integration for Indian market
 * Runs alongside Stripe (US/Mexico)
 */
import "server-only";
import Razorpay from "razorpay";
import { keys } from "../keys";

const config = keys();

const razorpay = config.RAZORPAY_KEY_ID && config.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: config.RAZORPAY_KEY_ID,
      key_secret: config.RAZORPAY_KEY_SECRET,
    })
  : null;

export interface RazorpayOrderParams {
  amount: number;
  currency: "INR";
  receipt: string;
  notes: {
    wp_url: string;
    plan: string;
    client_name: string;
    whatsapp: string;
    language: string;
  };
}

export async function createOrder(params: RazorpayOrderParams) {
  if (!razorpay) {
    throw new Error("Razorpay not configured");
  }
  return razorpay.orders.create({
    amount: params.amount,
    currency: params.currency,
    receipt: params.receipt,
    notes: params.notes,
  });
}

export async function verifyPayment(orderId: string, paymentId: string, signature: string): Promise<boolean> {
  const config = keys();
  if (!config.RAZORPAY_KEY_SECRET) {
    return false;
  }
  const crypto = await import("node:crypto");
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}
