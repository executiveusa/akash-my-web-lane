import { auth } from "@repo/auth/server";
import { models } from "@repo/ai";
import { generateText } from "ai";
import { parseError } from "@repo/observability/error";
import { log } from "@repo/observability/log";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  systemPrompt: z.string().max(5000, "System prompt cannot exceed 5000 characters"),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().max(2000, "Message content cannot exceed 2000 characters"),
    })
  ).max(50, "Cannot exceed 50 messages per request"),
});

export const POST = async (request: Request): Promise<Response> => {
  try {
    // 1. Authenticate
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // 2. Parse request
    const body = await request.json();
    const parseResult = RequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request format", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { systemPrompt, messages } = parseResult.data;
    
    // 3. Call AI
    const { text, usage } = await generateText({
      model: models.chat,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });
    
    // 4. Log interaction
    log.info("SYNTHIA Advisor interaction", {
      userId,
      messageCount: messages.length,
      usage,
    });
    
    // 5. Return response
    return NextResponse.json({
      content: text,
      usage,
    });
  } catch (error) {
    const message = parseError(error);
    log.error("SYNTHIA Advisor error", { error: message, userId });

    return NextResponse.json(
      {
        content: "SYNTHIA encountered an error. Please try again.",
      },
      { status: 500 }
    );
  }
};
