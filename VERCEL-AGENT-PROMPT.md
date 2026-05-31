# VERCEL AGENT PROMPT - COPY & PASTE ANYWHERE

Use this prompt with ANY agent or assistant to deploy and verify Vercel deployments with absolute certainty.

---

## 🎯 THE PROMPT (Copy everything below this line)

```
I need you to deploy to Vercel production and verify the deployment is actually live.

You MUST use the Vercel Deployment Verification Agent. Here's how:

VERCEL PROJECT DETAILS:
- Project ID: [USER_PROVIDES_PROJECT_ID]
- Vercel Token: [USER_PROVIDES_VERCEL_TOKEN or use ENV var VERCEL_TOKEN]

YOUR TASK:
1. Use the VercelDeploymentAgent class from scripts/vercel-deployment-agent.js
2. Initialize it with the project ID and token provided above
3. Call agent.verify() to run complete verification
4. Report ONLY after all checks pass

VERIFICATION REQUIREMENTS (MANDATORY):
✅ Production domain must return HTTP 200 (not 404)
✅ All critical endpoints must respond (/api/health, /health, home page)
✅ Deployment state must be READY (not BUILDING, QUEUED, or ERROR)
✅ Correct git commit must be deployed
✅ Build must have completed successfully
✅ No timeouts or connection failures

WHAT COUNTS AS "DEPLOYED":
❌ NOT: Code was pushed
❌ NOT: Build started
❌ NOT: No error messages
❌ NOT: PR was merged

✅ YES: Production domain responds 200
✅ YES: Endpoints return 200
✅ YES: Correct code is live
✅ YES: All tests pass
✅ YES: I verified it myself

REPORTING:
- If ALL checks pass: Report success with the URL and commit hash
- If ANY check fails: Report actual error, recovery suggestion, and recovery URL
- Never claim success without proof
- Show the verification output so I can see the proof

USE THIS VERIFICATION AGENT:
Class: VercelDeploymentAgent
Location: scripts/vercel-deployment-agent.js (or .ts for TypeScript)
Method: async verify()

Example code:
```javascript
const VercelDeploymentAgent = require('./scripts/vercel-deployment-agent');

const agent = new VercelDeploymentAgent(projectId, vercelToken);
const result = await agent.verify();

if (result.success) {
  // Report success with full details:
  // - Deployment URL
  // - Deployed commit
  // - Build time
  // - Endpoint verification results
  // - Optimization recommendations
  
  return {
    status: 'VERIFIED',
    url: result.deployment.url,
    commit: result.verification.commitDeployed,
    allChecksPassed: result.verification.allChecksPassed,
    endpoints: result.endpoints,
    buildTime: result.deployment.buildTime
  };
} else {
  // Report error with recovery:
  // - Error code
  // - Error message
  // - What went wrong
  // - How to fix it
  // - Recovery URL
  
  return {
    status: 'FAILED',
    errorCode: result.error.code,
    errorMessage: result.error.message,
    suggestion: result.error.suggestion,
    recoveryUrl: result.error.recoveryUrl
  };
}
```

ERROR HANDLING:
If verification fails, show the user:
1. The actual error code (INVALID_TOKEN, PROJECT_NOT_FOUND, etc.)
2. The error message (what went wrong)
3. The suggestion (how to fix it)
4. The recovery URL (where to go for help)

NEVER:
- Skip verification
- Claim success without running the agent
- Report assumptions instead of facts
- Hide error details from the user
- Continue if domain returns 404

ALWAYS:
- Run agent.verify()
- Wait for all checks to complete
- Show endpoint test results
- Report actual HTTP status codes
- Provide recovery steps if failed
- Share the production URL when successful

RESOURCES:
- Vercel API: https://vercel.com/docs/api
- Token generation: https://vercel.com/account/tokens
- Project dashboard: https://vercel.com/dashboard
- Status page: https://status.vercel.com
```

End of prompt to copy.

---

## 📖 HOW TO USE THIS PROMPT

### Method 1: Direct Instruction
Copy the prompt above and paste it into your agent/chat interface.

### Method 2: In Your Documentation
Include this prompt in your README or setup docs:

```markdown
## Deployment Verification

To verify a Vercel deployment:

[Paste the prompt from VERCEL-AGENT-PROMPT.md]

Then tell your agent:
"Deploy to production and verify it's live. Project ID: prj_xxx"
```

### Method 3: In Your Workflow
Add to your CI/CD or automation:

```bash
# 1. Save the prompt to a file
cat > DEPLOYMENT_VERIFICATION.md << 'EOF'
[PASTE PROMPT HERE]
EOF

# 2. Use with your agent/CLI
agent run "Deploy to Vercel. $(cat DEPLOYMENT_VERIFICATION.md)"
```

### Method 4: In Your Agent Code
Reference the prompt in your system instructions:

```javascript
const DEPLOYMENT_PROMPT = `
[PASTE PROMPT HERE]
`;

const result = await agent.run(`
${DEPLOYMENT_PROMPT}

Project ID: ${projectId}
Token: ${vercelToken}
`);
```

---

## 🔧 CUSTOMIZATION

### For Different Projects
```
Project ID: prj_your_project_id
Vercel Token: vcp_your_token_here
Additional endpoints to test: /api/custom, /status
```

### For Different Timeout Values
```
Add to prompt:
"- Timeout: 60000ms (short for testing)"
```

### For Monitoring/Alerts
```
Add to prompt:
"- Alert on failure: Send to Slack/email
- Continue on success: Trigger deployment notification
- Log all results: Save to deployment audit log"
```

---

## ✅ VERIFICATION CHECKLIST

When you use this prompt, verify the agent checks:

- [ ] Token is valid (401 check)
- [ ] Project exists and is accessible
- [ ] Latest deployment fetched
- [ ] Build state monitored
- [ ] Deployment reached READY state
- [ ] Production domain responds with 200
- [ ] `/api/health` endpoint responds
- [ ] `/health` endpoint responds
- [ ] Home page `/` responds
- [ ] Git commit verified deployed
- [ ] Optimization analysis provided

If ALL checks pass: ✅ Success
If ANY check fails: ❌ Show error + recovery

---

## 📋 EXAMPLE CONVERSATIONS

### Example 1: Basic Deployment
```
User: "Deploy my app to production and verify it's live.
Project ID: prj_abc123"

Agent: [Runs VercelDeploymentAgent.verify()]

Agent: "✅ DEPLOYMENT VERIFIED
URL: https://myapp.vercel.app
Commit: abc1234
All endpoints responding
Build time: 2m 34s"
```

### Example 2: With Failures
```
User: "Deploy and verify.
Project ID: prj_xyz789"

Agent: [Runs VercelDeploymentAgent.verify()]

Agent: "❌ VERIFICATION FAILED
Error: Production domain returning 404
Status: Build completed, but app not responding
Recovery: Check application logs at https://vercel.com/dashboard
Suggestion: Verify domain configuration and app startup"
```

### Example 3: Monitoring
```
User: "Check if my production deployment is still live.
Project ID: prj_monitor123"

Agent: [Runs VercelDeploymentAgent.verify()]

Agent: "✅ DEPLOYMENT HEALTHY
URL: https://app.vercel.app
Status: READY
Last verified: 2:34 PM
All endpoints responding"
```

---

## 🚀 INTEGRATION EXAMPLES

### GitHub Actions Workflow
```yaml
name: Deploy and Verify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Deploy to Vercel
        # Your deployment step
        run: npm run deploy
      
      - name: Verify Deployment
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          # Copy vercel-deployment-agent.js to your repo
          VERCEL_TOKEN=$VERCEL_TOKEN node scripts/vercel-deployment-agent.js $PROJECT_ID
```

### Node.js Script
```javascript
// deploy-and-verify.js
const VercelDeploymentAgent = require('./scripts/vercel-deployment-agent');

async function deployAndVerify() {
  const projectId = process.argv[2];
  const token = process.env.VERCEL_TOKEN;
  
  if (!projectId || !token) {
    console.error('Usage: PROJECT_ID=xxx VERCEL_TOKEN=yyy node deploy-and-verify.js');
    process.exit(1);
  }
  
  const agent = new VercelDeploymentAgent(projectId, token);
  const result = await agent.verify();
  
  if (result.success) {
    console.log('✅ DEPLOYMENT VERIFIED');
    console.log(`URL: ${result.deployment.url}`);
    process.exit(0);
  } else {
    console.error('❌ VERIFICATION FAILED');
    console.error(`Error: ${result.error.message}`);
    console.error(`Recovery: ${result.error.suggestion}`);
    process.exit(1);
  }
}

deployAndVerify();
```

### Bash Script
```bash
#!/bin/bash
# verify-deployment.sh

PROJECT_ID=$1
VERCEL_TOKEN=$2

if [ -z "$PROJECT_ID" ] || [ -z "$VERCEL_TOKEN" ]; then
  echo "Usage: ./verify-deployment.sh <PROJECT_ID> <VERCEL_TOKEN>"
  exit 1
fi

VERCEL_TOKEN=$VERCEL_TOKEN node scripts/vercel-deployment-agent.js $PROJECT_ID
exit $?
```

---

## 🎯 KEY RULES

1. **Always verify before claiming success**
   - Don't skip the agent.verify() call
   - Don't assume success based on "no errors"

2. **Test the actual production domain**
   - Must get HTTP 200
   - Must not be 404
   - Must not timeout

3. **Show verification proof**
   - Share the production URL
   - Share endpoint test results
   - Share the git commit hash

4. **Report actual errors**
   - Don't hide failures
   - Don't assume what went wrong
   - Show recovery steps

5. **Never claim without proof**
   - Error code is in result.error.code
   - Success is in result.success
   - Details are in result.verification

---

## 📞 HELP & RESOURCES

**Vercel Official**:
- API Docs: https://vercel.com/docs/api
- Tokens: https://vercel.com/account/tokens
- Dashboard: https://vercel.com/dashboard
- Status: https://status.vercel.com

**This Agent**:
- GitHub: https://github.com/vercel-labs/agent-skills
- Implementation: scripts/vercel-deployment-agent.js
- Docs: VERCEL-AGENT-README.md

---

## 📝 SUMMARY

This prompt ensures:
- ✅ No false deployment claims
- ✅ Actual production testing
- ✅ Proof of deployment
- ✅ Clear error reporting
- ✅ Recovery suggestions
- ✅ Complete transparency

**Copy the prompt above and use it anywhere.**
**Never again will you claim a deployment is live without proof.**

---

Last updated: May 31, 2026
Based on: Vercel Labs agent-skills
License: MIT
