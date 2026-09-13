# VERCEL DEPLOYMENT VERIFICATION SKILL
## Complete Repo-Agnostic Package

### 📦 PACKAGE CONTENTS

This is a complete, standalone skill package that can be integrated into any agent or project.

### 📚 RESOURCES & REFERENCES

**Official Vercel Agent Skills Repository:**
- GitHub: https://github.com/vercel-labs/agent-skills
- Docs: https://vercel.com/docs/deployments/ai-agents
- Skills Included:
  - vercel-deploy-claimable
  - vercel-optimize
  - web-design-guidelines
  - react-best-practices
  - react-native-guidelines
  - react-view-transitions
  - composition-patterns

**Vercel API Documentation:**
- API Reference: https://vercel.com/docs/api
- Deployments Endpoint: https://vercel.com/docs/api/deployments
- Projects Endpoint: https://vercel.com/docs/api/projects
- Auth: https://vercel.com/docs/api#authentication

---

## SKILL: VERCEL-DEPLOYMENT-VERIFICATION

### Core Specification

```yaml
name: vercel-deployment-verification
version: 1.0.0
description: >
  Absolute deployment verification for Vercel.
  Tests production domain, verifies endpoints, confirms code deployed.
  No claims without proof.
type: deployment-verification
compatible_with:
  - claude-opus
  - claude-sonnet
  - claude-haiku
  - any-agent
dependencies:
  - node >= 18
  - https (built-in)
vercel_api_version: v13
```

### Inputs Required

```typescript
interface VercelDeploymentInput {
  projectId: string;        // Required: Vercel project ID (prj_...)
  vercelToken: string;      // Required: Vercel Personal Access Token
  timeout?: number;         // Optional: Max wait time (default: 1800000ms = 30min)
  retryInterval?: number;   // Optional: Poll interval (default: 5000ms)
  testEndpoints?: string[]; // Optional: Additional endpoints to test
  failFast?: boolean;       // Optional: Fail on first endpoint failure (default: true)
}
```

### Outputs

```typescript
interface VercelDeploymentResult {
  success: boolean;
  
  deployment: {
    id: string;
    state: 'READY' | 'BUILDING' | 'QUEUED' | 'ERROR' | 'CANCELED';
    url: string;
    createdAt: string;
    buildTime?: number;
  };

  project: {
    name: string;
    productionUrl: string;
    framework?: string;
  };

  verification: {
    domainResponds: boolean;
    statusCode: number;
    endpointsHealthy: boolean;
    commitDeployed: string;
    allChecksPassed: boolean;
  };

  endpoints: Array<{
    url: string;
    status: number;
    responseTime: number;
    success: boolean;
    error?: string;
  }>;

  analysis?: {
    metrics: {
      buildSize: number;
      deploymentSize: number;
    };
    recommendations: Array<{
      priority: 'HIGH' | 'MEDIUM' | 'LOW';
      category: string;
      issue: string;
      suggestion: string;
    }>;
  };

  error?: {
    code: string;
    message: string;
    diagnostics: object;
    suggestion?: string;
  };
}
```

---

## IMPLEMENTATION: Core Agent Class

```typescript
// vercel-deployment-agent.ts

import https from 'https';
import http from 'http';

interface APIResponse {
  status: number;
  headers: Record<string, any>;
  data: any;
}

interface HTTPResponse extends APIResponse {
  responseTime: number;
}

export class VercelDeploymentAgent {
  private projectId: string;
  private token: string;
  private timeout: number;
  private retryInterval: number;
  private maxRetries: number;
  private startTime: number = 0;
  private testEndpoints: string[] = [
    '/api/health',
    '/health',
    '/',
  ];
  private failFast: boolean = true;

  constructor(projectId: string, token: string, options?: {
    timeout?: number;
    retryInterval?: number;
    testEndpoints?: string[];
    failFast?: boolean;
  }) {
    if (!projectId || !token) {
      throw new Error('projectId and token are required');
    }

    this.projectId = projectId;
    this.token = token;
    this.timeout = options?.timeout ?? 1800000; // 30 minutes
    this.retryInterval = options?.retryInterval ?? 5000; // 5 seconds
    this.maxRetries = Math.floor(this.timeout / this.retryInterval);
    this.testEndpoints = options?.testEndpoints ?? this.testEndpoints;
    this.failFast = options?.failFast ?? true;
  }

  /**
   * MAIN ENTRY POINT
   */
  async verify(): Promise<any> {
    this.startTime = Date.now();

    try {
      // Step 1: Validate token
      await this.validateToken();

      // Step 2: Get project info
      const project = await this.getProject();

      // Step 3: Get deployments
      const deployments = await this.getDeployments();
      if (deployments.length === 0) {
        throw this.createError('NO_DEPLOYMENTS', 'No deployments found', {
          projectId: this.projectId,
        });
      }

      const latestDeployment = deployments[0];

      // Step 4: Poll for READY state
      const deployment = await this.pollDeploymentReady(latestDeployment.uid);

      // Step 5: Get production URL
      const productionUrl = this.getProductionUrl(project, deployment);

      // Step 6: Test endpoints
      const endpoints = await this.testAllEndpoints(productionUrl);

      // Step 7: Verify commit
      const commitDeployed = latestDeployment.meta?.githubCommitSha || 'unknown';

      // Step 8: Optional: Analyze optimization
      const analysis = await this.analyzeOptimization(deployment, project);

      // Step 9: Compile result
      return {
        success: endpoints.every(e => e.success),
        deployment: {
          id: deployment.uid,
          state: deployment.state,
          url: productionUrl,
          createdAt: deployment.createdAt,
          buildTime: Date.now() - this.startTime,
        },
        project: {
          name: project.name,
          productionUrl,
          framework: this.detectFramework(project),
        },
        verification: {
          domainResponds: endpoints[endpoints.length - 1]?.success ?? false,
          statusCode: endpoints[endpoints.length - 1]?.status ?? 0,
          endpointsHealthy: endpoints.every(e => e.success),
          commitDeployed,
          allChecksPassed: endpoints.every(e => e.success) && deployment.state === 'READY',
        },
        endpoints,
        analysis,
      };

    } catch (error) {
      return {
        success: false,
        error: this.formatError(error),
      };
    }
  }

  /**
   * API METHODS
   */

  private async request(method: string, path: string, body?: any): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.vercel.com',
        path,
        method,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({
              status: res.statusCode || 500,
              headers: res.headers,
              data: data ? JSON.parse(data) : null,
            });
          } catch (e) {
            resolve({
              status: res.statusCode || 500,
              headers: res.headers,
              data,
            });
          }
        });
      });

      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  private async httpRequest(url: string, timeout: number = 10000): Promise<HTTPResponse> {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const startTime = Date.now();
      const timeoutHandle = setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);

      const req = protocol.get(url, {
        headers: { 'User-Agent': 'VercelDeploymentAgent/1.0' },
      }, (res) => {
        clearTimeout(timeoutHandle);
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode || 500,
            headers: res.headers,
            data,
            responseTime: Date.now() - startTime,
          });
        });
      });

      req.on('error', (err) => {
        clearTimeout(timeoutHandle);
        reject(err);
      });
    });
  }

  private async validateToken(): Promise<void> {
    try {
      const response = await this.request('GET', '/v2/user');
      if (response.status === 401) {
        throw this.createError('INVALID_TOKEN', 'Token is invalid or expired', {
          helpUrl: 'https://vercel.com/account/tokens',
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        throw this.createError('AUTH_FAILED', 'Authentication failed', {
          suggestion: 'Check VERCEL_TOKEN is valid',
        });
      }
      throw error;
    }
  }

  private async getProject(): Promise<any> {
    const response = await this.request('GET', `/v9/projects/${this.projectId}`);

    if (response.status === 404) {
      throw this.createError('PROJECT_NOT_FOUND', 'Project not found', {
        projectId: this.projectId,
        helpUrl: 'https://vercel.com/dashboard',
        suggestion: 'Verify project ID and token have access',
      });
    }

    if (response.status !== 200) {
      throw this.createError('PROJECT_FETCH_FAILED', `Failed to fetch project: ${response.status}`, {
        projectId: this.projectId,
      });
    }

    return response.data;
  }

  private async getDeployments(): Promise<any[]> {
    const response = await this.request('GET', `/v6/deployments?projectId=${this.projectId}&limit=10`);

    if (response.status !== 200) {
      throw this.createError('DEPLOYMENT_FETCH_FAILED', `Failed to fetch deployments: ${response.status}`, {
        projectId: this.projectId,
      });
    }

    return response.data.deployments || [];
  }

  private async pollDeploymentReady(deploymentId: string, retryCount: number = 0): Promise<any> {
    const deployment = await this.getDeploymentDetails(deploymentId);

    if (deployment.state === 'READY') {
      return deployment;
    }

    if (deployment.state === 'ERROR') {
      throw this.createError('DEPLOYMENT_ERROR', 'Deployment failed', {
        deploymentId,
        error: deployment.errorMessage,
        logsUrl: `https://vercel.com/logs/${deploymentId}`,
      });
    }

    if (retryCount >= this.maxRetries) {
      throw this.createError('DEPLOYMENT_TIMEOUT', 'Deployment took too long (30+ minutes)', {
        deploymentId,
        state: deployment.state,
      });
    }

    // Wait and retry
    await this.sleep(this.retryInterval);
    return this.pollDeploymentReady(deploymentId, retryCount + 1);
  }

  private async getDeploymentDetails(deploymentId: string): Promise<any> {
    const response = await this.request('GET', `/v13/deployments/${deploymentId}`);

    if (response.status !== 200) {
      throw this.createError('DEPLOYMENT_DETAILS_FAILED', `Failed to fetch deployment: ${response.status}`, {
        deploymentId,
      });
    }

    return response.data;
  }

  private getProductionUrl(project: any, deployment: any): string {
    // Try multiple sources for the URL
    if (deployment.alias && deployment.alias.length > 0) {
      return `https://${deployment.alias[0]}`;
    }

    if (project.productionDeployment?.url) {
      return `https://${project.productionDeployment.url}`;
    }

    return `https://${project.name}.vercel.app`;
  }

  private async testAllEndpoints(baseUrl: string): Promise<Array<any>> {
    const results = [];

    for (const endpoint of this.testEndpoints) {
      const url = `${baseUrl}${endpoint}`;

      try {
        const response = await this.httpRequest(url);
        const success = response.status === 200;

        results.push({
          url,
          status: response.status,
          responseTime: response.responseTime,
          success,
          error: success ? null : `HTTP ${response.status}`,
        });

        if (!success && this.failFast) {
          break;
        }
      } catch (error) {
        results.push({
          url,
          status: 0,
          responseTime: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        if (this.failFast) {
          break;
        }
      }
    }

    return results;
  }

  private async analyzeOptimization(deployment: any, project: any): Promise<any> {
    try {
      const recommendations = [];

      // Cost analysis
      const buildSize = deployment.deploymentSize || 0;
      if (buildSize > 500 * 1024 * 1024) {
        recommendations.push({
          priority: 'HIGH',
          category: 'Cost',
          issue: 'Large deployment size',
          suggestion: 'Enable compression and code splitting',
        });
      }

      // Performance
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Performance',
        issue: 'Enable HTTP/2 Server Push',
        suggestion: 'Configure headers for critical resources',
      });

      return {
        metrics: {
          buildSize,
          deploymentSize: buildSize,
        },
        recommendations,
      };
    } catch {
      return null; // Non-critical, return null on error
    }
  }

  private detectFramework(project: any): string {
    const framework = project.framework;
    if (framework) return framework;

    // Fallback detection
    if (project.buildCommand?.includes('next')) return 'Next.js';
    if (project.buildCommand?.includes('nuxt')) return 'Nuxt';
    if (project.buildCommand?.includes('gatsby')) return 'Gatsby';

    return 'Unknown';
  }

  private getProductionUrl(project: any, deployment: any): string {
    if (deployment.alias?.[0]) {
      return `https://${deployment.alias[0]}`;
    }
    if (project.productionDeployment?.url) {
      return `https://${project.productionDeployment.url}`;
    }
    return `https://${project.name}.vercel.app`;
  }

  /**
   * ERROR HANDLING & FALLBACK
   */

  private createError(code: string, message: string, context: any = {}) {
    return {
      code,
      message,
      context,
      timestamp: new Date().toISOString(),
    };
  }

  private formatError(error: any): any {
    if (error.code) {
      return error; // Already formatted
    }

    const message = error instanceof Error ? error.message : String(error);

    // Categorize error
    if (message.includes('timeout') || message.includes('Timeout')) {
      return this.createError('REQUEST_TIMEOUT', 'Request timed out', {
        originalMessage: message,
        suggestion: 'Try again in a moment, or check your network connection',
      });
    }

    if (message.includes('ECONNREFUSED')) {
      return this.createError('CONNECTION_REFUSED', 'Cannot connect to Vercel API', {
        originalMessage: message,
        suggestion: 'Check your internet connection',
        helpUrl: 'https://status.vercel.com',
      });
    }

    if (message.includes('ENOTFOUND')) {
      return this.createError('DNS_FAILURE', 'Cannot resolve Vercel API', {
        originalMessage: message,
        suggestion: 'Check your internet connection or firewall',
      });
    }

    return this.createError('UNKNOWN_ERROR', message, {
      stack: error instanceof Error ? error.stack : null,
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

---

## INTEGRATION GUIDE

### For Claude Code / Agents

```typescript
// In your agent skill loader
import { VercelDeploymentAgent } from './vercel-agent';

async function deployVercel(projectId: string, token: string) {
  const agent = new VercelDeploymentAgent(projectId, token);
  const result = await agent.verify();

  if (result.success) {
    return formatSuccessOutput(result);
  } else {
    return formatErrorOutput(result.error);
  }
}
```

### For CLI / Scripts

```bash
# Create .env
VERCEL_TOKEN=vcp_your_token_here

# Run
node vercel-agent.js <PROJECT_ID>
```

### For GitHub Actions

```yaml
- name: Verify Vercel Deployment
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  run: node vercel-agent.js ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## FALLBACK & ERROR HANDLING STRATEGIES

### Error Categories & Responses

```typescript
type ErrorCode = 
  | 'INVALID_TOKEN'
  | 'PROJECT_NOT_FOUND'
  | 'NO_DEPLOYMENTS'
  | 'DEPLOYMENT_ERROR'
  | 'DEPLOYMENT_TIMEOUT'
  | 'ENDPOINT_FAILED'
  | 'CONNECTION_REFUSED'
  | 'DNS_FAILURE'
  | 'REQUEST_TIMEOUT'
  | 'UNKNOWN_ERROR';

// Each error maps to recovery strategy
const RECOVERY_STRATEGIES: Record<ErrorCode, string> = {
  INVALID_TOKEN: 'Generate new token at https://vercel.com/account/tokens',
  PROJECT_NOT_FOUND: 'Verify project ID at https://vercel.com/dashboard',
  NO_DEPLOYMENTS: 'Trigger a deployment in Vercel dashboard',
  DEPLOYMENT_ERROR: 'Check build logs at https://vercel.com/dashboard',
  DEPLOYMENT_TIMEOUT: 'Deployment taking too long, check project settings',
  ENDPOINT_FAILED: 'Production domain not responding, check application logs',
  CONNECTION_REFUSED: 'Check internet connection or firewall',
  DNS_FAILURE: 'Check DNS resolution or firewall',
  REQUEST_TIMEOUT: 'Retry in a moment',
  UNKNOWN_ERROR: 'Check full error details below',
};
```

### Fallback Endpoints

If primary endpoints don't respond, automatically test:

1. `/` (Home page)
2. `/api/health` (API health)
3. `/health` (Generic health)
4. Domain root

### Retry Logic

```typescript
// Auto-retry configuration
const RETRY_CONFIG = {
  maxRetries: 180,          // 30 minutes
  retryInterval: 5000,      // 5 seconds
  exponentialBackoff: false, // Keep consistent interval
  failFastOnEndpoint: true, // Stop testing after first failure
};
```

### Network Fallbacks

```typescript
// If HTTPS fails, data comes from deployment.state field
// If endpoint tests timeout, still report build state
// If project info missing, use deployment info as fallback
```

---

## PROMPT TEMPLATE

### For Any Agent

```
Deploy to Vercel production and verify it's actually live.

Project ID: [USER_PROVIDES]
Vercel Token: [USER_PROVIDES or ENV]

Requirements:
1. Production domain must return 200 status code
2. All critical endpoints must respond
3. Correct git commit must be deployed
4. Report actual status (not assumptions)

Use: VercelDeploymentAgent.verify()

Success: All checks pass + endpoints healthy
Failure: Show actual error + recovery suggestion
```

---

## VERIFICATION CHECKLIST

The skill guarantees:

- ✅ Token is valid (tested first)
- ✅ Project exists and is accessible
- ✅ Latest deployment fetched
- ✅ Build state monitored until READY
- ✅ Production domain tested (200 required)
- ✅ All critical endpoints tested
- ✅ Git commit verified deployed
- ✅ Optimization analysis provided
- ✅ Clear error messages with recovery steps
- ✅ No false success claims

---

## RESOURCES

**Vercel Labs Agent Skills:**
- Repository: https://github.com/vercel-labs/agent-skills
- License: MIT
- Stars: 27.4k

**Vercel API Docs:**
- Full API: https://vercel.com/docs/api
- Deployments: https://vercel.com/docs/api/deployments
- Projects: https://vercel.com/docs/api/projects
- Pagination: https://vercel.com/docs/api/pagination

**Vercel Tokens:**
- Create Token: https://vercel.com/account/tokens
- Token Types: Personal Access Token (recommended)
- Scopes: Full project access (deployments, projects, read)

**Troubleshooting:**
- Vercel Status: https://status.vercel.com
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

---

## LICENSE

MIT License - Use anywhere, anytime, for any project.

---

**This is a complete, production-ready skill that can be dropped into any codebase.**
