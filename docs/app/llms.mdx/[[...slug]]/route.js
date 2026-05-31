"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidate = void 0;
exports.GET = GET;
exports.generateStaticParams = generateStaticParams;
const navigation_1 = require("next/navigation");
const get_llm_text_1 = require("@/lib/get-llm-text");
const source_1 = require("@/lib/source");
exports.revalidate = false;
async function GET(_req, { params }) {
    const { slug } = await params;
    const page = source_1.source.getPage(slug);
    if (!page)
        (0, navigation_1.notFound)();
    return new Response(await (0, get_llm_text_1.getLLMText)(page), {
        headers: {
            "Content-Type": "text/markdown",
        },
    });
}
function generateStaticParams() {
    return source_1.source.generateParams();
}
