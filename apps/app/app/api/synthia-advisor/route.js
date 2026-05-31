"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const env_1 = require("@/env");
async function POST(request) {
    try {
        const body = await request.json();
        const response = await fetch(`${env_1.env.SYNTHIA_GATEWAY_URL}/v1/chat/completions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${env_1.env.GATEWAY_API_KEY}`,
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
            return server_1.NextResponse.json({ content: "SYNTHIA gateway returned an error." }, { status: 200 });
        }
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content ?? "No content returned.";
        return server_1.NextResponse.json({ content });
    }
    catch {
        return server_1.NextResponse.json({ content: "Unable to reach SYNTHIA right now." }, { status: 200 });
    }
}
