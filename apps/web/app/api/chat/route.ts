import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "AI chat is not configured for this deployment",
        next: "Configure OPENAI_API_KEY before enabling this optional route.",
      },
      { status: 503 }
    );
  }

  try {
    const { messages } = await request.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing messages" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    return NextResponse.json(completion);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Chat request failed" }, { status: 500 });
  }
}
