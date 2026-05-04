import "server-only";
import crypto from "crypto";

interface RazorpayClient {
  orders: {
    create: (opts: Record<string, unknown>) => Promise<Record<string, unknown>>;
  };
}

let _client: RazorpayClient | null = null;

async function getRazorpayClient(): Promise<RazorpayClient | null> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  if (_client) return _client;

  const Razorpay = (await import("razorpay")).default;
  _client = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return _client;
}

export interface RazorpayOrderOptions {
  amountPaise: number;
  receipt: string;
  notes: {
    wp_url: string;
    plan: string;
    client_name: string;
    whatsapp?: string;
    language?: string;
  };
}

export async function createRazorpayOrder(options: RazorpayOrderOptions) {
  const client = await getRazorpayClient();
  if (!client) throw new Error("Razorpay not configured");

  return client.orders.create({
    amount: options.amountPaise,
    currency: "INR",
    receipt: options.receipt,
    notes: options.notes,
  });
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET ?? "";
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
