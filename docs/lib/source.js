"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.source = void 0;
exports.getPageImage = getPageImage;
const source_1 = require("fumadocs-core/source");
const _source_1 = require("@/.source");
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
exports.source = (0, source_1.loader)({
    // it assigns a URL to your pages
    baseUrl: "/",
    source: _source_1.docs.toFumadocsSource(),
});
function getPageImage(page) {
    const segments = [...page.slugs, "image.png"];
    return {
        segments,
        url: `/og/${segments.join("/")}`,
    };
}
