import fs from 'fs';
import { execSync } from 'child_process';

const envPath = 'C:\\Users\\execu\\akash-my-web-lane\\apps\\app\\.env.local';

if (!fs.existsSync(envPath)) {
  console.error(`File not found: ${envPath}`);
  process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf-8');
const lines = content.split('\n');

for (let line of lines) {
  line = line.trim();
  if (!line || line.startsWith('#')) continue;

  const match = line.match(/^\s*([^#=\s]+)\s*=\s*"?(.*?)"?\s*$/);
  if (match) {
    const key = match[1];
    const val = match[2];
    if (val && val !== '""' && val !== "''") {
      console.log(`Adding ${key}...`);
      try {
// Add the variable to each environment with a branch name (e.g., main)
        execSync(`vercel env add ${key} production main --yes`, { input: val, encoding: 'utf-8' });
        execSync(`vercel env add ${key} preview main --yes`, { input: val, encoding: 'utf-8' });
        execSync(`vercel env add ${key} development main --yes`, { input: val, encoding: 'utf-8' });
      } catch (err) {
        console.error(`Failed to add ${key}:`, err.message);
      }
    }
  }
}

console.log('All environment variables pushed successfully!');
