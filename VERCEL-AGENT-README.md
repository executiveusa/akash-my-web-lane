# Vercel Deployment Verification Agent

**Absolute deployment verification for Vercel.**

Guarantees your code is actually live in production. Tests domains, verifies endpoints, confirms deployments. No false claims.

- ✅ **Production domain tested** (must return 200, not 404)
- ✅ **Critical endpoints verified** (/api/health, /health, home)
- ✅ **Git commit confirmed deployed** (matches latest main)
- ✅ **Complete error handling** with recovery suggestions
- ✅ **Optimization analysis** and recommendations
- ✅ **Repo-agnostic** - drop into any project

## Quick Start

### 1. Get Vercel Token

```bash
# Go to https://vercel.com/account/tokens
# Create a new Personal Access Token
export VERCEL_TOKEN=vcp_your_token_here
```

### 2. Find Project ID

```bash
# List your projects
VERCEL_TOKEN=your_token_here node vercel-deployment-agent.js list
# Look for: "Project Name (ID: prj_xxx)"
```

### 3. Verify Deployment

```bash
VERCEL_TOKEN=your_token_here node vercel-deployment-agent.js prj_xxx
```

### 4. Success Output

```
✅ DEPLOYMENT VERIFIED

Deployment:
  ID: dpl_abc123
  State: READY
  URL: https://myapp.vercel.app
  Build Time: 2m 34s

Verification:
  ✅ Domain responds: 200
  ✅ Endpoints healthy
  ✅ Correct commit deployed
  ✅ All checks passed

Endpoints:
  ✅ https://myapp.vercel.app (200) - 234ms
  ✅ https://myapp.vercel.app/api/health (200) - 145ms
  ✅ https://myapp.vercel.app/health (200) - 123ms
```

## Usage

### JavaScript/Node.js

```javascript
const VercelDeploymentAgent = require('./vercel-deployment-agent');

const agent = new VercelDeploymentAgent(
  'prj_your_project_id',
  'vcp_your_vercel_token'
);

const result = await agent.verify();

if (result.success) {
  console.log('✅ Production is live!');
  console.log('URL:', result.deployment.url);
} else {
  console.error('❌ Verification failed');
  console.error('Error:', result.error.message);
  console.error('Recovery:', result.error.suggestion);
}
```

### TypeScript

```typescript
import VercelDeploymentAgent from './vercel-deployment-agent';

const agent = new VercelDeploymentAgent(projectId, token);
const result = await agent.verify();

if (result.success) {
  console.log(result.deployment.url);
}
```

### CLI

```bash
# Basic verification
VERCEL_TOKEN=your_token node vercel-deployment-agent.js your_project_id

# With custom options (as JSON)
node vercel-deployment-agent.js your_project_id \
  --timeout 1800000 \
  --retryInterval 5000 \
  --endpoints "/" "/api/health" "/status"

# Exit codes
# 0 = success
# 1 = verification failed
```

### GitHub Actions

```yaml
name: Verify Deployment

on:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Verify Vercel Deployment
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          node vercel-deployment-agent.js $PROJECT_ID
          
      - name: Report Status
        if: success()
        run: echo "✅ Deployment verified and live"
        
      - name: Report Failure
        if: failure()
        run: echo "❌ Deployment verification failed"
```

### Vercel Integration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "postBuild": "VERCEL_TOKEN=$VERCEL_TOKEN node vercel-deployment-agent.js $VERCEL_PROJECT_ID"
}
```

## API Reference

### Constructor

```typescript
new VercelDeploymentAgent(projectId, vercelToken, options?)

Options:
  timeout?: number              // Max wait time (default: 1800000ms = 30min)
  retryInterval?: number        // Poll interval (default: 5000ms)
  testEndpoints?: string[]      // Endpoints to test (default: ["/", "/api/health", "/health"])
  failFast?: boolean            // Stop on first failure (default: true)
```

### Methods

#### verify(): Promise<VercelDeploymentResult>

Runs complete verification flow. Returns result with full details.

```typescript
const result = await agent.verify();

if (result.success) {
  // Access deployment info
  result.deployment.url
  result.deployment.state
  result.deployment.id
  result.deployment.buildTime
  
  // Access verification status
  result.verification.allChecksPassed
  result.verification.domainResponds
  result.verification.endpointsHealthy
  result.verification.commitDeployed
  
  // Access tested endpoints
  result.endpoints.forEach(ep => {
    console.log(ep.url, ep.status, ep.responseTime);
  });
  
  // Access optimization recommendations
  result.analysis.recommendations.forEach(rec => {
    console.log(rec.priority, rec.suggestion);
  });
} else {
  // Error details with recovery suggestions
  console.error(result.error.code);
  console.error(result.error.message);
  console.error(result.error.suggestion);
  console.error(result.error.recoveryUrl);
}
```

## Error Handling

Comprehensive error handling with recovery suggestions:

### Common Errors

| Error Code | Cause | Recovery |
|-----------|-------|----------|
| INVALID_TOKEN | Token expired/invalid | Generate new at https://vercel.com/account/tokens |
| PROJECT_NOT_FOUND | Wrong project ID | Check ID at https://vercel.com/dashboard |
| NO_DEPLOYMENTS | No deployments exist | Push code or trigger deployment |
| DEPLOYMENT_BUILD_FAILED | Build failed | Check logs at Vercel dashboard |
| DEPLOYMENT_TIMEOUT | Build took > 30min | Check deployment status |
| ENDPOINT_FAILED | Domain returning 404 | Check application code |
| CONNECTION_REFUSED | Cannot reach Vercel API | Check internet/firewall |
| DNS_FAILURE | Cannot resolve domain | Check DNS or wait |
| REQUEST_TIMEOUT | Request took too long | Retry in a moment |

Each error includes:
- **code**: Machine-readable error code
- **message**: Human-readable description
- **suggestion**: How to fix it
- **recoveryUrl**: Link to help

## Features

### ✅ Deployment Verification

- Validates Vercel token (401 check)
- Fetches project and deployment info
- Polls deployment until READY state
- Auto-retries if still building
- 30-minute timeout (configurable)

### ✅ Production Domain Testing

- Tests production URL (must return 200)
- Detects 404 errors
- Measures response time
- Handles timeouts gracefully
- Tests multiple endpoints

### ✅ Code Deployment Verification

- Confirms correct git commit deployed
- Checks deployment state
- Validates build success
- Provides build metrics

### ✅ Endpoint Testing

Default tested endpoints:
- `/` (home page)
- `/api/health` (API health)
- `/health` (generic health check)

Custom endpoints:
```javascript
new VercelDeploymentAgent(id, token, {
  testEndpoints: [
    '/',
    '/api/health',
    '/api/status',
    '/custom-endpoint'
  ]
})
```

### ✅ Optimization Analysis

Identifies opportunities to reduce costs and improve performance:
- Large deployment size
- Missing HTTP/2 Server Push
- Caching header opportunities
- Framework-specific optimizations

### ✅ Error Recovery

Provides exact recovery steps for every error:
- Links to Vercel dashboard
- Token generation instructions
- Troubleshooting guides
- Status page links

## Vercel Labs Integration

This skill integrates patterns from Vercel Labs:

**Repository**: https://github.com/vercel-labs/agent-skills

**Official Skills**:
- `vercel-deploy-claimable` - Deploy and return shareable URLs
- `vercel-optimize` - Performance and cost analysis
- `web-design-guidelines` - UI compliance checking
- And more...

This agent combines verification patterns from all of them into a single, comprehensive solution.

## Vercel API Reference

Uses official Vercel API v13:

- **Authentication**: https://vercel.com/docs/api#authentication
- **Deployments**: https://vercel.com/docs/api/deployments
- **Projects**: https://vercel.com/docs/api/projects
- **Users**: https://vercel.com/docs/api/users

Full docs: https://vercel.com/docs/api

## Configuration

### Environment Variables

```bash
# Required
VERCEL_TOKEN=vcp_your_token_here

# Optional
VERCEL_PROJECT_ID=prj_your_project_id
VERCEL_TIMEOUT=1800000
VERCEL_RETRY_INTERVAL=5000
```

### Programmatic Options

```javascript
new VercelDeploymentAgent(projectId, token, {
  timeout: 1800000,           // 30 minutes
  retryInterval: 5000,        // 5 seconds
  testEndpoints: [            // Custom endpoints
    '/',
    '/api/health',
    '/api/custom'
  ],
  failFast: true              // Stop on first failure
})
```

## Testing

### Test Locally

```bash
# Set token
export VERCEL_TOKEN=your_token_here

# Run verification
node vercel-deployment-agent.js prj_your_project_id

# Check exit code
echo $?
# 0 = success, 1 = failure
```

### Test in CI/CD

```yaml
# GitHub Actions example
- name: Test Deployment Verification
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  run: |
    node vercel-deployment-agent.js $PROJECT_ID
```

### Debug Mode

```javascript
const agent = new VercelDeploymentAgent(id, token, {
  timeout: 60000,           // Short timeout for testing
  retryInterval: 1000       // Quick retries
});

const result = await agent.verify();
console.log(JSON.stringify(result, null, 2));
```

## Performance

Typical verification times:
- **Token validation**: 100-200ms
- **Project fetch**: 150-300ms
- **Deployment polling**: 1-5 seconds (if READY)
- **Endpoint testing**: 200-500ms per endpoint
- **Total**: 1-10 seconds (varies based on deployment state)

If deployment is building:
- Polls every 5 seconds (configurable)
- Up to 30 minutes (configurable timeout)

## Security

✅ **Secure token handling**:
- Never logs token
- Token only sent to official Vercel API
- Uses HTTPS for all requests

✅ **No data storage**:
- Results are in-memory only
- Nothing is persisted
- No telemetry

✅ **Safe defaults**:
- Validates token before use
- Verifies project access
- Checks deployment state

## Compatibility

- **Node.js**: 18.0.0+
- **Runtimes**: All (Node, Bun, Deno)
- **Platforms**: Linux, macOS, Windows
- **Package Managers**: npm, pnpm, yarn, bun

## Troubleshooting

### "Invalid token"
```bash
# 1. Check token at https://vercel.com/account/tokens
# 2. Generate new token if expired
# 3. Verify environment variable is set
echo $VERCEL_TOKEN
```

### "Project not found"
```bash
# 1. Find correct project ID
VERCEL_TOKEN=token node vercel-deployment-agent.js list

# 2. Verify token has access to project
# 3. Check project ID format (prj_xxx)
```

### "Deployment timeout"
```bash
# Build is taking too long
# 1. Check Vercel dashboard for stuck builds
# 2. Increase timeout if needed:
new VercelDeploymentAgent(id, token, {
  timeout: 3600000  // 1 hour
})
```

### "Endpoints failing"
```bash
# Production domain not responding
# 1. Check application logs at https://vercel.com/dashboard
# 2. Verify domain is correctly configured
# 3. Check for runtime errors in deployment
```

## Support

- **Docs**: https://vercel.com/docs
- **API Reference**: https://vercel.com/docs/api
- **Status**: https://status.vercel.com
- **GitHub Issues**: https://github.com/vercel-labs/agent-skills/issues

## License

MIT - Use anywhere, anytime, for any purpose.

---

**Built on Vercel Labs agent-skills patterns**

https://github.com/vercel-labs/agent-skills

**Never make false deployment claims again.**
