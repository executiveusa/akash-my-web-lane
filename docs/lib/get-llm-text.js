"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLLMText = getLLMText;
async function getLLMText(page) {
    const processed = await page.data.getText("processed");
    return `# ${page.data.title} (${page.url})

${processed}`;
}
