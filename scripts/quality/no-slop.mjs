import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = "apps/web/app";
const banned = [
  /cutting[- ]edge/gi,
  /seamless(?:ly)?/gi,
  /revolutioni[sz]e/gi,
  /unlock your (?:business|brand|potential)/gi,
  /ai[- ]powered solutions?/gi,
  /innovative solutions?/gi,
  /transform your business/gi,
  /next[- ]generation solutions?/gi,
];
const extensions = new Set([".ts", ".tsx", ".md", ".mdx"]);
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!extensions.has(path.extname(entry.name)) || entry.name.endsWith(".d.ts")) continue;

    const source = await readFile(full, "utf8");
    for (const pattern of banned) {
      const matches = source.match(pattern);
      if (matches?.length) failures.push(`${full}: ${matches.join(", ")}`);
    }
  }
}

await walk(root);

if (failures.length) {
  console.error("Anti-slop guard failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log("Anti-slop guard passed.");
