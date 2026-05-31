"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("@repo/analytics/server");
const server_2 = require("@repo/auth/server");
const database_1 = require("@repo/database");
const cms_1 = require("@repo/cms");
const notifications_1 = require("@repo/notifications");
const migrations_1 = require("@repo/migrations");
const error_1 = require("@repo/observability/error");
const log_1 = require("@repo/observability/log");
const payments_1 = require("@repo/payments");
const headers_1 = require("next/headers");
const server_3 = require("next/server");
const env_1 = require("@/env");
const getUserFromCustomerId = async (customerId) => {
    const clerk = await (0, server_2.clerkClient)();
    const users = await clerk.users.getUserList();
    const user = users.data.find((currentUser) => currentUser.privateMetadata.stripeCustomerId === customerId);
    return user;
};
const handlePaymentIntentSucceeded = async (data) => {
    if (!data.customer)
        return;
    const customerId = typeof data.customer === "string" ? data.customer : data.customer.id;
    const user = await getUserFromCustomerId(customerId);
    if (!user) {
        log_1.log.warn("Payment received but no matching user found", { paymentIntentId: data.id });
        return;
    }
    // Extract client info from payment metadata
    const { client_slug, client_name, wp_url, language, plan } = data.metadata || {};
    if (!client_slug || !wp_url) {
        log_1.log.error("Payment received but missing metadata for migration", { paymentId: data.id, metadata: data.metadata });
        await database_1.database.operationTask.create({
            data: {
                orgId: user.id,
                type: "PAYMENT_INCOMPLETE_METADATA",
                relatedId: data.id,
                priority: "high",
                metadata: { paymentId: data.id, metadata: data.metadata },
            },
        });
        return;
    }
    try {
        const retryEngine = new migrations_1.RetryEngine();
        const { success, result, error } = await retryEngine.executeWithRetry(() => (0, cms_1.startMigration)({
            wpUrl: wp_url,
            clientName: client_name,
            clientSlug: client_slug,
            language: (language || "en"),
            plan: (plan || "free"),
            paymentId: data.id,
        }), {
            jobId: client_slug,
            orgId: user.id,
        });
        if (!success) {
            log_1.log.error("All retries failed for starting migration", { paymentId: data.id, error });
            if (env_1.env.OWNER_WHATSAPP) {
                await (0, notifications_1.sendWhatsApp)(env_1.env.OWNER_WHATSAPP, `⚠️ *Payment Received but Migration Failed*\nClient: ${client_name}\nError: ${error}\nAction: Manual review required.`);
            }
            return;
        }
        const jobId = result.jobId;
        // Check for idempotency: prevent duplicate migrations from retried webhooks
        const existingJob = await database_1.database.job.findFirst({
            where: {
                paymentId: data.id,
                paymentProvider: "stripe",
            },
        });
        if (existingJob) {
            log_1.log.warn("Duplicate payment webhook detected, skipping job creation", {
                paymentId: data.id,
                existingJobId: existingJob.id,
            });
            return;
        }
        // Store in database
        await database_1.database.job.create({
            data: {
                id: jobId,
                orgId: user.id,
                clientId: client_slug,
                paymentId: data.id,
                amountPaid: data.amount_received || 0,
                currency: data.currency.toUpperCase(),
                status: "queued",
                stage: "queued",
                progress: 0,
                language: (language || "en"),
                paymentProvider: "stripe",
            },
        });
        // Notify Akash via WhatsApp
        if (env_1.env.OWNER_WHATSAPP) {
            await (0, notifications_1.sendWhatsApp)(env_1.env.OWNER_WHATSAPP, `💰 *Payment Received*\nClient: ${client_name}\nAmount: $${((data.amount_received || 0) / 100).toFixed(2)}\nStatus: ✅ Migration started\nJob ID: ${jobId}`);
        }
        log_1.log.info("Migration started successfully from payment", { jobId, paymentId: data.id });
    }
    catch (error) {
        log_1.log.error("Unexpected error starting migration from payment", { error: (0, error_1.parseError)(error), paymentId: data.id });
    }
};
const handleCheckoutSessionCompleted = async (data) => {
    if (!data.customer) {
        return;
    }
    const customerId = typeof data.customer === "string" ? data.customer : data.customer.id;
    const user = await getUserFromCustomerId(customerId);
    if (!user || !server_1.analytics) {
        return;
    }
    server_1.analytics.capture({
        event: "User Subscribed",
        distinctId: user.id,
    });
};
const handleSubscriptionScheduleCanceled = async (data) => {
    if (!data.customer) {
        return;
    }
    const customerId = typeof data.customer === "string" ? data.customer : data.customer.id;
    const user = await getUserFromCustomerId(customerId);
    if (!user || !server_1.analytics) {
        return;
    }
    server_1.analytics.capture({
        event: "User Unsubscribed",
        distinctId: user.id,
    });
};
const POST = async (request) => {
    if (!env_1.env.STRIPE_WEBHOOK_SECRET || !payments_1.stripe) {
        return server_3.NextResponse.json({ message: "Not configured", ok: false });
    }
    try {
        const body = await request.text();
        const headerPayload = await (0, headers_1.headers)();
        const signature = headerPayload.get("stripe-signature");
        if (!signature) {
            throw new Error("missing stripe-signature header");
        }
        const event = payments_1.stripe.webhooks.constructEvent(body, signature, env_1.env.STRIPE_WEBHOOK_SECRET);
        switch (event.type) {
            case "payment_intent.succeeded": {
                await handlePaymentIntentSucceeded(event.data.object);
                break;
            }
            case "checkout.session.completed": {
                await handleCheckoutSessionCompleted(event.data.object);
                break;
            }
            case "subscription_schedule.canceled": {
                await handleSubscriptionScheduleCanceled(event.data.object);
                break;
            }
            default: {
                log_1.log.warn(`Unhandled event type ${event.type}`);
            }
        }
        await server_1.analytics?.shutdown();
        return server_3.NextResponse.json({ result: event, ok: true });
    }
    catch (error) {
        const message = (0, error_1.parseError)(error);
        log_1.log.error(message);
        return server_3.NextResponse.json({
            message: "something went wrong",
            ok: false,
        }, { status: 500 });
    }
};
exports.POST = POST;
