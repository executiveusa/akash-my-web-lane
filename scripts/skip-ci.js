#!/usr/bin/env node
/**
 * Script to determine if a Vercel build should be skipped based on changed files
 * Exits with code 0 (skip) if only non-critical files changed, 1 (build) otherwise
 */

if (process.env.VERCEL_ENV === "preview") {
  exit(0); // Always build preview deployments
}

// Skip if only documentation, config, or CI files changed
const skipPatterns = [
  /^docs\//,
  /^\.github\//,
  /\.md$/,
  /^\.env/,
  /^\.gitignore$/,
  /^\.turbo/,
  /^\.vscode/,
  /^CHANGELOG/,
  /^LICENSE/,
  /^README/,
];

const changedFiles = (process.env.VERCEL_GIT_COMMIT_MESSAGE || "").split("\n");
const hasRelevantChanges = changedFiles.some((file) =>
  !skipPatterns.some((pattern) => pattern.test(file))
);

process.exit(hasRelevantChanges ? 1 : 0);
