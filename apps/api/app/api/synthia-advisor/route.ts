import { auth } from "@repo/auth/server";
import { models } from "@repo/ai";
import { generateText } from "ai";
import { parseError } from "@repo/observability/error";
import { log } from "@repo/observability/log";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  systemPrompt: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
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
    const { systemPrompt, messages } = RequestSchema.parse(body);
    
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
    log.error("SYNTHIA Advisor error", { error: message });
    
    return NextResponse.json(
      {
        error: message,
        content: "SYNTHIA encountered an error. Please try again.",
      },
      { status: 500 }
    );
  }
};
