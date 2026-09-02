import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "AGENTS.md",
  "CONTEXT.md",
  "ICM/_shared/STANDARDS.md",
  "ICM/01_understand/CONTEXT.md",
  "ICM/02_change/CONTEXT.md",
  "ICM/03_verify/CONTEXT.md",
  "ICM/04_release/CONTEXT.md",
];
const stageFiles = required.filter((p) => /^ICM\/\d+_/.test(p));
const contractHeadings = ["## Inputs", "## Process", "## Outputs", "## Human check"];
const failures = [];

for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) failures.push(`missing required path: ${rel}`);
}

if (fs.existsSync(path.join(root, "AGENTS.md"))) {
  const agents = fs.readFileSync(path.join(root, "AGENTS.md"), "utf8");
  const lines = agents.split(/\r?\n/).length;
  if (lines > 60) failures.push(`AGENTS.md is ${lines} lines; router must stay at or below 60`);
  if (!agents.includes("CONTEXT.md")) failures.push("AGENTS.md does not route through CONTEXT.md");
  for (const stage of stageFiles) if (!agents.includes(stage)) failures.push(`AGENTS.md does not route to ${stage}`);
}

for (const rel of stageFiles) {
  if (!fs.existsSync(path.join(root, rel))) continue;
  const text = fs.readFileSync(path.join(root, rel), "utf8");
  for (const heading of contractHeadings) if (!text.includes(heading)) failures.push(`${rel} missing ${heading}`);
  const approxTokens = Math.ceil(text.length / 4);
  if (approxTokens > 8000) failures.push(`${rel} exceeds the 8k-token step budget (~${approxTokens})`);
}

for (const sourcePath of ["apps/web/package.json", ".github/workflows", "scripts/quality"]) {
  if (!fs.existsSync(path.join(root, sourcePath))) failures.push(`contract points at missing product path: ${sourcePath}`);
}

if (failures.length) {
  console.error("ICM walk test FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("ICM walk test PASSED");
console.log("- root router is compact and routes into bounded task context");
console.log("- every stage declares inputs, process, outputs, and a human check");
console.log("- stage contracts remain below the per-step context ceiling");
console.log("- canonical MyWebLane product and verification paths exist");