# Vercel Agent Skills

Complete integration of Vercel Labs agent-skills patterns for absolute deployment verification and optimization.

## Available Skills

### 1. `vercel-deployment-complete`
**Ultimate deployment verification and optimization**

Integrates patterns from:
- `vercel-deploy-claimable`: Deploy framework-agnostic apps
- `vercel-optimize`: Audit for performance, cost, reliability
- `vercel-health-check`: Comprehensive endpoint testing

**Usage:**
```
Deploy and verify my Vercel project to production. Project ID: [ID]
Ensure it's live and working before reporting success.
```

**What it does:**
- Detects your framework (Next.js, React, Vue, etc.)
- Deploys to Vercel production
- Monitors deployment status in real-time
- Tests production domain (must return 200)
- Verifies critical endpoints
- Confirms git commit deployed
- Provides optimization recommendations
- Returns shareable preview URLs
- Generates complete health report

**Output includes:**
- ✅ Deployment status (READY/ERROR/BUILDING)
- ✅ Live URL verification (200 responses)
- ✅ Health check results
- ✅ Build metrics
- ✅ Performance analysis
- ✅ Optimization opportunities
- ✅ Cost estimates
- ✅ Security validation

**Success Criteria:**
- Production domain responds with 200
- All critical endpoints work
- Correct git commit deployed
- Build state is READY
- All health checks pass

**Failure Behavior:**
- Never claims success without proof
- Reports actual errors, not guesses
- Provides diagnostics and troubleshooting
- Suggests fix strategies

## Integration with Claude Code

### Using the Skill in Prompts

**Basic deployment:**
```
Deploy to production and verify it's live.
```

**With analysis:**
```
Deploy my project and provide optimization recommendations.
```

**Troubleshooting:**
```
Check why my production deployment isn't responding and fix it.
```

## Underlying Scripts

### `vercel-deployment-agent.js`
Core verification script

```bash
VERCEL_TOKEN=<token> node scripts/vercel-deployment-agent.js <project_id>
```

Tests:
- Production domain (200 status)
- API health endpoints
- Home page functionality
- Commit verification

### `vercel-complete-agent.js`
Enhanced agent with optimization

```bash
VERCEL_TOKEN=<token> node scripts/vercel-complete-agent.js <project_id>
```

Adds:
- Real-time deployment polling
- Optimization analysis
- Performance metrics
- Cost analysis
- Security checks
- Build recommendations

### `list-vercel-projects.js`
Find your project ID

```bash
VERCEL_TOKEN=<token> node scripts/list-vercel-projects.js
```

## Setup Instructions

### 1. Get Your Vercel Token
1. Go to https://vercel.com/account/tokens
2. Create a Personal Access Token
3. Save it securely

### 2. Find Your Project ID
```bash
VERCEL_TOKEN=your_token_here node scripts/list-vercel-projects.js
```

### 3. Use the Skill
Tell Claude Code:
```
Deploy project to Vercel production and verify it's live.
```

Claude will ask for your PROJECT_ID and VERCEL_TOKEN, then:
- Run the verification agent
- Test the production URL
- Report actual status (not assumptions)
- Provide optimization guidance

## The Accountability Guarantee

This skill system guarantees:

✅ **No false deployment claims**
- Must test actual production URL
- Must receive 200 status code
- Must verify correct code deployed

✅ **Immediate error detection**
- Shows actual errors, not guesses
- Provides diagnostics
- Suggests fixes

✅ **Complete transparency**
- Full health check results
- Performance metrics
- Optimization opportunities

✅ **Framework auto-detection**
- Works with Next.js, React, Vue, Nuxt, etc.
- Automatically detects build requirements
- Configures output correctly

## Vercel Labs Integration

These skills are based on proven patterns from:
- https://github.com/vercel-labs/agent-skills

Specifically inspired by:
1. **vercel-deploy-claimable** - Framework detection and deployment
2. **vercel-optimize** - Performance and cost analysis
3. **web-design-guidelines** - Optimization recommendations

## What Makes This Different

Previous approach:
- ❌ "Code is pushed" = deployed
- ❌ "No errors" = deployed
- ❌ Production shows 404s

This approach:
- ✅ Production returns 200
- ✅ Actual endpoints tested
- ✅ Correct code verified
- ✅ Metrics provided
- ✅ Optimizations suggested

## Example Full Workflow

### Command
```
Deploy my app to production and verify it's live.
```

### Agent Response
```
🚀 VERCEL COMPLETE DEPLOYMENT AGENT
=====================================

✅ Project: akash-my-web-lane
📦 Latest Deployment: dpl_abc123
📦 Commit: e39e93f

⏳ Monitoring deployment status...
  Status: BUILDING (5s)
  Status: BUILDING (10s)
  Status: READY (15s)

🌐 Production URL: https://akash-my-web-lane.vercel.app

🔗 Testing critical endpoints...
✅ Home Page: 200
✅ API Health: 200
✅ Health Check: 200

✅ VERIFICATION CHECKLIST
  ✅ Build state: READY
  ✅ Production domain: Responding
  ✅ Critical endpoints: Healthy
  ✅ Commit deployed: e39e93f

============================================================
✅ VERCEL DEPLOYMENT COMPLETE AND VERIFIED
✅ Production is LIVE and HEALTHY
============================================================

📊 DEPLOYMENT SUMMARY
   URL: https://akash-my-web-lane.vercel.app
   Commit: e39e93f
   Deployed: May 31, 2026 5:45 PM

💾 BUILD METRICS
   Build Size: 245.32 MB
   Deployment Size: 18.45 MB
   Functions: 12

🎯 OPTIMIZATION OPPORTUNITIES
   1. [HIGH] Cost: Large build artifacts
      → Enable compression and code splitting
   2. [MEDIUM] Performance: Enable HTTP/2 Server Push
      → Configure headers to push critical resources
   3. [LOW] Security: Security headers
      → Verify HSTS and CSP headers are configured

📢 SHAREABLE URLS
   Production: https://akash-my-web-lane.vercel.app
   Dashboard: https://vercel.com/dashboard/projects
```

## Troubleshooting

### "Production domain not responding"
- Check domain configuration in Vercel
- Verify build completed successfully
- Check application logs
- Run script again in 30 seconds

### "Endpoints returning 404"
- Build succeeded but code has issues
- Check application for routing errors
- Verify environment variables
- Review build output

### "Token not authorized"
- Verify token is valid
- Check token has access to project
- Generate new token from Vercel dashboard
- Ensure no trailing spaces in token

## Support

For issues or improvements, see:
- `VERCEL-DEPLOYMENT-AGENT-PROMPT.md` - Accountability protocol
- `DEPLOYMENT-VERIFICATION-GUIDE.md` - Usage guide
- Vercel Labs: https://github.com/vercel-labs/agent-skills

---

**This system ensures your deployments are always verified before claiming success.**
