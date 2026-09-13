import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const MigrateSchema = z.object({
  wpUrl: z.string().url(),
  clientName: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  planId: z.enum(["starter", "professional", "enterprise"]).default("starter"),
  razorpayOrderId: z.string().optional(), // set after payment verification
});

/**
 * POST /api/migrate
 * Queues a full migration job via Absurd durable workflow
 * Called after successful Razorpay payment OR for internal testing
 */
export async function POST(req: NextRequest) {
  // Verify internal token or Razorpay signature
  const authHeader = req.headers.get("authorization");
  const isInternal = authHeader === `Bearer ${process.env.PI_AGENT_TOKEN}`;
  const isRazorpay = req.headers.get("x-razorpay-signature") !== null;

  if (!isInternal && !isRazorpay) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = MigrateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const jobData = parsed.data;

  // Queue migration job via Pi Agent JSON-RPC
  try {
    const piAgentUrl = process.env.PI_AGENT_URL ?? "http://localhost:4000";
    const rpcRes = await fetch(piAgentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PI_AGENT_TOKEN}`,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "migrate",
        params: {
          wpUrl: jobData.wpUrl,
          clientName: jobData.clientName,
          email: jobData.email,
          whatsapp: jobData.whatsapp,
          planId: jobData.planId,
        },
      }),
    });

    const rpcData = (await rpcRes.json()) as any;

    if (rpcData.error) {
      throw new Error(rpcData.error.message);
    }

    return NextResponse.json({
      success: true,
      jobId: rpcData.result?.jobId,
      message: "Migration queued. You'll receive updates via email and WhatsApp.",
      statusUrl: `/api/status/${rpcData.result?.jobId}`,
    });
  } catch (error: any) {
    console.error("Migration queue failed:", error);
    return NextResponse.json(
      { error: "Failed to queue migration", message: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/migrate?jobId=xxx
 * Check migration status
 */
export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("jobId");
  if (!jobId) {
    return NextResponse.json({ error: "jobId required" }, { status: 400 });
  }

  const piAgentUrl = process.env.PI_AGENT_URL ?? "http://localhost:4000";
  const rpcRes = await fetch(piAgentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PI_AGENT_TOKEN}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "status",
      params: { jobId },
    }),
  });

  const rpcData = (await rpcRes.json()) as any;
  return NextResponse.json(rpcData.result ?? { error: rpcData.error });
}
