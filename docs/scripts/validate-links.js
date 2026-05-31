"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const server_1 = require("fumadocs-core/server");
const source_1 = require("fumadocs-core/source");
const next_validate_link_1 = require("next-validate-link");
async function checkLinks() {
    // we read them all at once to avoid repeated file read
    const docsFiles = await (0, next_validate_link_1.readFiles)("./content/docs/**/*.{md,mdx}");
    const scanned = await (0, next_validate_link_1.scanURLs)({
        populate: {
            "[[...slug]]": docsFiles.map((file) => {
                const info = (0, source_1.parseFilePath)(node_path_1.default.relative("./content/docs", file.path));
                return {
                    value: (0, source_1.getSlugs)(info),
                    hashes: (0, server_1.getTableOfContents)(file.content).map((item) => item.url.slice(1)),
                };
            }),
        },
    });
    (0, next_validate_link_1.printErrors)(await (0, next_validate_link_1.validateFiles)(docsFiles, {
        scanned,
    }), true);
}
void checkLinks();
