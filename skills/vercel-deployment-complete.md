# Vercel Deployment Complete Agent Skill

## Skill Name
`vercel-deployment-complete`

## Description
Ultimate Vercel deployment verification and optimization agent that provides absolute certainty about deployment status, health, and readiness for production.

## Capabilities

This skill integrates patterns from Vercel Labs agent-skills:
- **vercel-deploy-claimable**: Auto-detect framework, deploy, return shareable URLs
- **vercel-optimize**: Audit deployed project for cost, performance, reliability
- **vercel-health-check**: Comprehensive endpoint and health verification

## Usage

```
Deploy and verify my project to production. Project ID: <PROJECT_ID>
Ensure it's live and working. Only tell me it's deployed when verification passes.
```

## The Skill Protocol

### Phase 1: Pre-Deployment Verification
- ✅ Verify git state (all changes committed)
- ✅ Confirm latest code on main branch
- ✅ Check Vercel project configuration

### Phase 2: Deployment
- ✅ Trigger Vercel build via API
- ✅ Monitor build status in real-time
- ✅ Auto-detect framework and build settings
- ✅ Wait for READY state (don't claim until READY)

### Phase 3: Live Verification
- ✅ Test production domain responds with 200
- ✅ Test critical endpoints:
  - `/api/health`
  - `/health`
  - `/`
- ✅ Verify correct git commit deployed
- ✅ Check response headers and content

### Phase 4: Optimization Analysis
- ✅ Audit for performance opportunities
- ✅ Check cost implications
- ✅ Review reliability metrics
- ✅ Identify build optimization opportunities

### Phase 5: Reporting
- ✅ Provide shareable preview URL
- ✅ Return claim URL (if applicable)
- ✅ Full health check report
- ✅ Performance metrics
- ✅ Optimization recommendations

## Required Inputs

User must provide:
- **PROJECT_ID**: Vercel project ID (e.g., `prj_xyz123`)
- **VERCEL_TOKEN**: Personal Access Token (from Vercel dashboard)
- **Confirmation**: "Deploy and verify" command

## Outputs

### Success Output
```
✅ VERCEL DEPLOYMENT COMPLETE AND VERIFIED

📊 Deployment Status
   URL: https://my-app.vercel.app
   Domain: my-app.vercel.app
   Commit: abc1234
   Build Time: 2m 34s
   Status: READY and LIVE

🔗 Verified Endpoints
   ✅ https://my-app.vercel.app (200)
   ✅ https://my-app.vercel.app/api/health (200)
   ✅ https://api.my-app.vercel.app/health (200)

📈 Performance Metrics
   - Page Load: 1.2s
   - Largest Contentful Paint: 0.8s
   - Time to Interactive: 1.5s

🎯 Optimization Opportunities
   1. Enable compression on static assets (save ~15% bandwidth)
   2. Consider adding HTTP/2 Server Push for critical resources
   3. Cache-Control headers could be optimized for home page

💾 Storage & Cost
   - Build artifacts: 145MB
   - Estimated monthly cost: $25 (within free tier)

🔐 Security Check
   ✅ No hardcoded secrets detected
   ✅ HTTPS enforced
   ✅ Security headers present

📢 Share Your Deployment
   Preview URL: https://vercel.com/share/my-app-preview
   Claim URL: https://vercel.com/claim/my-app-abc123
```

### Failure Output
```
❌ DEPLOYMENT VERIFICATION FAILED

🔴 Status: Production domain not responding
   URL: https://my-app.vercel.app
   Response: 404 Not Found
   Expected: 200 OK

🔍 Diagnostics
   - Build State: READY
   - Latest Commit: abc1234 ✅
   - Deployment ID: dpl_xyz789
   - Build Logs: https://vercel.com/logs/dpl_xyz789

🔧 Troubleshooting
   1. Verify domain is correctly configured
   2. Check build output for errors
   3. Ensure environment variables are set
   4. Review application logs
```

## Critical Rules

1. **Never Claim Success Without Proof**
   - Must test actual production URL
   - Must receive 200 status code
   - Must verify correct code deployed

2. **Detect Build States**
   - QUEUED: Waiting in queue
   - BUILDING: Building in progress
   - READY: Successfully deployed
   - ERROR: Build failed
   - CANCELED: Build canceled

3. **Auto-Retry Logic**
   - If building: Wait and retry after 5 seconds
   - If queued: Wait and retry after 10 seconds
   - Maximum retries: 180 (30 minutes)

4. **Endpoint Testing**
   - Test every 5 seconds when building
   - Timeout: 10 seconds per request
   - Retry failed endpoints 3 times

5. **Verification Checklist**
   - [ ] Build state is READY
   - [ ] Production domain responds with 200
   - [ ] /api/health endpoint responds
   - [ ] / (home) responds with 200
   - [ ] Correct git commit deployed
   - [ ] No 404 errors on main endpoints

## Integration Points

Uses the deployment verification agent from:
- `scripts/vercel-deployment-agent.js`
- `VERCEL-DEPLOYMENT-AGENT-PROMPT.md`

Extends with:
- Performance metrics (from vercel-optimize pattern)
- Optimization recommendations
- Cost analysis
- Security validation
- Shareable URLs (from vercel-deploy-claimable pattern)

## Accountability Guarantee

This skill guarantees:
- ✅ Absolute proof of deployment
- ✅ Actual testing of production
- ✅ No false success claims
- ✅ Clear error reporting
- ✅ Optimization guidance
- ✅ Complete transparency

**If you don't see the success checklist with all items checked, the deployment is not verified as complete.**

## Command Examples

### Basic Deployment + Verification
```
Deploy project prj_SdqgoifyqI4mIK4UPEIqQdscv7Ij to production and verify it's live.
```

### With Optimization Analysis
```
Deploy and verify my Vercel project (prj_xyz123), then provide optimization recommendations.
```

### Troubleshooting
```
Check the deployment status of project prj_abc456 and debug why it's not responding.
```

## Success Criteria

The skill achieves its goal only when:
1. ✅ Production URL returns 200 (not 404)
2. ✅ All critical endpoints respond
3. ✅ Correct git commit is deployed
4. ✅ Build state is READY
5. ✅ Verification script confirms success
6. ✅ Health checks pass
7. ✅ User receives shareable URL
8. ✅ Optimization report is provided

---

**This skill is designed to make false deployment claims impossible.**
