/**
 * POST /api/webhooks/razorpay
 * Handles Razorpay payment.captured events
 * Verifies HMAC signature then queues a migration job
 *
 * Razorpay Dashboard → Webhooks → Add:
 *   URL: https://your-api.vercel.app/api/webhooks/razorpay
 *   Secret: RAZORPAY_WEBHOOK_SECRET env var
 *   Events: payment.captured
 */
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
});

export const dynamic = "force-dynamic";

/** Verify Razorpay webhook HMAC */
function verifyRazorpayWebhook(body: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(signature, "hex")
  );
}

/** Send WhatsApp notification via Twilio */
async function notifyWhatsApp(to: string, message: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token || !to) return;
  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: "whatsapp:+14155238886",
        To: `whatsapp:${to}`,
        Body: message,
      }),
    }
  );
}

export async function POST(request: Request): Promise<Response> {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("x-razorpay-signature") ?? "";

  // Verify signature
  if (!verifyRazorpayWebhook(body, signature)) {
    console.warn("[razorpay-webhook] Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only handle payment.captured
  if (event.event !== "payment.captured") {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const payment = event.payload?.payment?.entity;
  if (!payment) {
    return NextResponse.json({ error: "No payment entity" }, { status: 400 });
  }

  const {
    id: paymentId,
    amount,           // in paise
    currency,
    notes = {},
  } = payment;

  const {
    wp_url,
    client_name = "Client",
    email = "",
    whatsapp = "",
    plan = "starter",
    language = "en",
  } = notes;

  if (!wp_url) {
    console.error("[razorpay-webhook] Missing wp_url in payment notes", paymentId);
    return NextResponse.json({ error: "Missing wp_url in notes" }, { status: 400 });
  }

  // Idempotency: skip duplicate webhooks
  const existing = await pool
    .query(`SELECT job_id FROM migration_jobs WHERE data->>'paymentId' = $1`, [paymentId])
    .catch(() => ({ rows: [] }));

  if (existing.rows.length > 0) {
    console.warn("[razorpay-webhook] Duplicate webhook, skipping", paymentId);
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const jobId = `mwl_${uuidv4().replace(/-/g, "").slice(0, 16)}`;
  const amountINR = (amount / 100).toFixed(2);

  // Queue the migration job
  await pool.query(
    `INSERT INTO migration_jobs (job_id, status, current_step, payload, data, created_at, updated_at)
     VALUES ($1, 'queued', 'queued', $2, $3, NOW(), NOW())`,
    [
      jobId,
      JSON.stringify({ jobId, wpUrl: wp_url, clientName: client_name, email, whatsapp, planId: plan, language }),
      JSON.stringify({
        paymentId,
        amountINR,
        currency,
        message: `Payment ₹${amountINR} received — migration queued`,
      }),
    ]
  );

  console.log(`[razorpay-webhook] ✅ Job ${jobId} queued for ${wp_url}`);

  // Notify Akash
  const ownerWhatsApp = process.env.OWNER_WHATSAPP;
  if (ownerWhatsApp) {
    await notifyWhatsApp(
      ownerWhatsApp,
      `💰 *New Payment — My Web Lane*\n` +
      `Client: ${client_name}\n` +
      `Amount: ₹${amountINR} ${currency}\n` +
      `Site: ${wp_url}\n` +
      `Plan: ${plan}\n` +
      `Job: ${jobId}\n\n` +
      `✅ Migration queued and starting now.`
    );
  }

  // Notify client
  if (whatsapp) {
    await notifyWhatsApp(
      whatsapp,
      `🎉 Payment confirmed! SYNTHIA is starting your migration now.\n\n` +
      `Site: ${wp_url}\n` +
      `We'll send you the live URL when it's ready (usually 25 minutes).\n\n` +
      `Reply STOP to opt out of updates.`
    );
  }

  return NextResponse.json({ ok: true, jobId });
}
