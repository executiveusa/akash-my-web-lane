"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("@repo/auth/server");
const ai_1 = require("@repo/ai");
const ai_2 = require("ai");
const error_1 = require("@repo/observability/error");
const log_1 = require("@repo/observability/log");
const server_2 = require("next/server");
const zod_1 = require("zod");
const RequestSchema = zod_1.z.object({
    systemPrompt: zod_1.z.string().max(5000, "System prompt cannot exceed 5000 characters"),
    messages: zod_1.z.array(zod_1.z.object({
        role: zod_1.z.enum(["user", "assistant"]),
        content: zod_1.z.string().max(2000, "Message content cannot exceed 2000 characters"),
    })).max(50, "Cannot exceed 50 messages per request"),
});
const POST = async (request) => {
    try {
        // 1. Authenticate
        const { userId } = await (0, server_1.auth)();
        if (!userId) {
            return server_2.NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // 2. Parse request
        const body = await request.json();
        const parseResult = RequestSchema.safeParse(body);
        if (!parseResult.success) {
            return server_2.NextResponse.json({ error: "Invalid request format", details: parseResult.error.flatten() }, { status: 400 });
        }
        const { systemPrompt, messages } = parseResult.data;
        // 3. Call AI
        const { text, usage } = await (0, ai_2.generateText)({
            model: ai_1.models.chat,
            system: systemPrompt,
            messages: messages.map((m) => ({
                role: m.role,
                content: m.content,
            })),
        });
        // 4. Log interaction
        log_1.log.info("SYNTHIA Advisor interaction", {
            userId,
            messageCount: messages.length,
            usage,
        });
        // 5. Return response
        return server_2.NextResponse.json({
            content: text,
            usage,
        });
    }
    catch (error) {
        const message = (0, error_1.parseError)(error);
        log_1.log.error("SYNTHIA Advisor error", { error: message, userId });
        return server_2.NextResponse.json({
            content: "SYNTHIA encountered an error. Please try again.",
        }, { status: 500 });
    }
};
exports.POST = POST;
