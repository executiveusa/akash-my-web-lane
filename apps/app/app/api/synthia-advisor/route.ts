import { NextResponse } from "next/server";
import { env } from "@/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${env.SYNTHIA_GATEWAY_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GATEWAY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "smart",
        messages: [
          { role: "system", content: body.systemPrompt },
          ...(body.messages ?? []),
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ content: "SYNTHIA gateway returned an error." }, { status: 200 });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? "No content returned.";
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ content: "Unable to reach SYNTHIA right now." }, { status: 200 });
  }
}
