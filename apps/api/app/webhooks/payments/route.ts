import { analytics } from "@repo/analytics/server";
import { clerkClient } from "@repo/auth/server";
import { database as db } from "@repo/database";
import { startMigration } from "@repo/cms";
import { sendWhatsApp } from "@repo/notifications";
import { RetryEngine } from "@repo/migrations";
import { parseError } from "@repo/observability/error";
import { log } from "@repo/observability/log";
import type { Stripe } from "@repo/payments";
import { stripe } from "@repo/payments";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/env";

const getUserFromCustomerId = async (customerId: string) => {
  const clerk = await clerkClient();
  const users = await clerk.users.getUserList();

  const user = users.data.find(
    (currentUser) => currentUser.privateMetadata.stripeCustomerId === customerId
  );

  return user;
};

const handlePaymentIntentSucceeded = async (data: Stripe.PaymentIntent) => {
  if (!data.customer) return;

  const customerId = typeof data.customer === "string" ? data.customer : data.customer.id;
  const user = await getUserFromCustomerId(customerId);
  if (!user) {
    log.warn("Payment received but no matching user found", { paymentIntentId: data.id });
    return;
  }

  // Extract client info from payment metadata
  const { client_slug, client_name, wp_url, language, plan } = data.metadata || {};
  if (!client_slug || !wp_url) {
    log.error("Payment received but missing metadata for migration", { paymentId: data.id, metadata: data.metadata });
    await db.operationTask.create({
      data: {
        orgId: user.id,
        type: "PAYMENT_INCOMPLETE_METADATA",
        relatedId: data.id,
        priority: "high",
        metadata: { paymentId: data.id, metadata: data.metadata } as any,
      },
    });
    return;
  }

  try {
    const retryEngine = new RetryEngine();
    const { success, result, error } = await retryEngine.executeWithRetry(
      () =>
        startMigration({
          wpUrl: wp_url as string,
          clientName: client_name as string,
          clientSlug: client_slug as string,
          language: (language || "en") as "en" | "hi" | "es",
          plan: (plan || "free") as string,
          paymentId: data.id,
        }),
      {
        jobId: client_slug as string,
        orgId: user.id,
      }
    );

    if (!success) {
      log.error("All retries failed for starting migration", { paymentId: data.id, error });
      if (env.OWNER_WHATSAPP) {
        await sendWhatsApp(
          env.OWNER_WHATSAPP,
          `⚠️ *Payment Received but Migration Failed*\nClient: ${client_name}\nError: ${error}\nAction: Manual review required.`
        );
      }
      return;
    }

    const jobId = result!.jobId;

    // Check for idempotency: prevent duplicate migrations from retried webhooks
    const existingJob = await db.job.findFirst({
      where: {
        paymentId: data.id,
        paymentProvider: "stripe",
      },
    });

    if (existingJob) {
      log.warn("Duplicate payment webhook detected, skipping job creation", {
        paymentId: data.id,
        existingJobId: existingJob.id,
      });
      return;
    }

    // Store in database
    await db.job.create({
      data: {
        id: jobId,
        orgId: user.id,
        clientId: client_slug as string,
        paymentId: data.id,
        amountPaid: data.amount_received || 0,
        currency: data.currency.toUpperCase(),
        status: "queued",
        stage: "queued",
        progress: 0,
        language: (language || "en") as string,
        paymentProvider: "stripe",
      },
    });

    // Notify Akash via WhatsApp
    if (env.OWNER_WHATSAPP) {
      await sendWhatsApp(
        env.OWNER_WHATSAPP,
        `💰 *Payment Received*\nClient: ${client_name}\nAmount: $${((data.amount_received || 0) / 100).toFixed(2)}\nStatus: ✅ Migration started\nJob ID: ${jobId}`
      );
    }

    log.info("Migration started successfully from payment", { jobId, paymentId: data.id });
  } catch (error) {
    log.error("Unexpected error starting migration from payment", { error: parseError(error), paymentId: data.id });
  }
};

const handleCheckoutSessionCompleted = async (
  data: Stripe.Checkout.Session
) => {
  if (!data.customer) {
    return;
  }

  const customerId =
    typeof data.customer === "string" ? data.customer : data.customer.id;
  const user = await getUserFromCustomerId(customerId);

  if (!user || !analytics) {
    return;
  }

  analytics.capture({
    event: "User Subscribed",
    distinctId: user.id,
  });
};

const handleSubscriptionScheduleCanceled = async (
  data: Stripe.SubscriptionSchedule
) => {
  if (!data.customer) {
    return;
  }

  const customerId =
    typeof data.customer === "string" ? data.customer : data.customer.id;
  const user = await getUserFromCustomerId(customerId);

  if (!user || !analytics) {
    return;
  }

  analytics.capture({
    event: "User Unsubscribed",
    distinctId: user.id,
  });
};

export const POST = async (request: Request): Promise<Response> => {
  if (!env.STRIPE_WEBHOOK_SECRET || !stripe) {
    return NextResponse.json({ message: "Not configured", ok: false });
  }

  try {
    const body = await request.text();
    const headerPayload = await headers();
    const signature = headerPayload.get("stripe-signature");

    if (!signature) {
      throw new Error("missing stripe-signature header");
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "payment_intent.succeeded": {
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      }
      case "checkout.session.completed": {
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      }
      case "subscription_schedule.canceled": {
        await handleSubscriptionScheduleCanceled(event.data.object as Stripe.SubscriptionSchedule);
        break;
      }
      default: {
        log.warn(`Unhandled event type ${event.type}`);
      }
    }

    await analytics?.shutdown();

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    const message = parseError(error);

    log.error(message);

    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
};
