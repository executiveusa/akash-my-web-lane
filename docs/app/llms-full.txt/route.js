"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidate = void 0;
exports.GET = GET;
const get_llm_text_1 = require("@/lib/get-llm-text");
const source_1 = require("@/lib/source");
// cached forever
exports.revalidate = false;
async function GET() {
    const scan = source_1.source.getPages().map(get_llm_text_1.getLLMText);
    const scanned = await Promise.all(scan);
    return new Response(scanned.join("\n\n"));
}
