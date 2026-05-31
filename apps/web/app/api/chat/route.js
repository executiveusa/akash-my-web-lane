"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const openai_1 = require("openai");
const server_1 = require("next/server");
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
async function POST(request) {
    try {
        const { messages } = await request.json();
        if (!messages) {
            return server_1.NextResponse.json({ error: 'Missing messages' }, { status: 400 });
        }
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
        });
        return server_1.NextResponse.json(completion);
    }
    catch (error) {
        console.error('Chat API error:', error);
        return server_1.NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
