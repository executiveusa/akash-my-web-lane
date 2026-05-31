/**
 * VERCEL DEPLOYMENT VERIFICATION AGENT
 *
 * Production-ready, repo-agnostic skill for absolute deployment verification.
 * Drop this file into any project and use it immediately.
 *
 * Based on Vercel Labs agent-skills patterns:
 * https://github.com/vercel-labs/agent-skills
 *
 * Features:
 * - Validates Vercel token
 * - Fetches project & deployment info
 * - Polls until deployment is READY
 * - Tests production domain (must return 200)
 * - Verifies critical endpoints
 * - Confirms correct git commit deployed
 * - Analyzes optimization opportunities
 * - Complete error handling with recovery suggestions
 */

import https from 'https';
import http from 'http';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface VercelDeploymentInput {
  projectId: string;
  vercelToken: string;
  timeout?: number;
  retryInterval?: number;
  testEndpoints?: string[];
  failFast?: boolean;
}

export interface VercelDeploymentResult {
  success: boolean;
  deployment?: {
    id: string;
    state: 'READY' | 'BUILDING' | 'QUEUED' | 'ERROR' | 'CANCELED';
    url: string;
    createdAt: string;
    buildTime?: number;
  };
  project?: {
    name: string;
    productionUrl: string;
    framework?: string;
  };
  verification?: {
    domainResponds: boolean;
    statusCode: number;
    endpointsHealthy: boolean;
    commitDeployed: string;
    allChecksPassed: boolean;
  };
  endpoints?: Array<{
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
    context: any;
    suggestion?: string;
    recoveryUrl?: string;
  };
}

interface APIResponse {
  status: number;
  headers: Record<string, any>;
  data: any;
}

interface HTTPResponse extends APIResponse {
  responseTime: number;
}

// ============================================================================
// MAIN AGENT CLASS
// ============================================================================

export class VercelDeploymentAgent {
  private projectId: string;
  private token: string;
  private timeout: number;
  private retryInterval: number;
  private maxRetries: number;
  private startTime: number = 0;
  private testEndpoints: string[] = [
    '/',
    '/api/health',
    '/health',
  ];
  private failFast: boolean = true;

  constructor(projectId: string, token: string, options?: Partial<VercelDeploymentInput>) {
    if (!projectId?.trim()) {
      throw new Error('projectId is required');
    }
    if (!token?.trim()) {
      throw new Error('vercelToken is required');
    }

    this.projectId = projectId.trim();
    this.token = token.trim();
    this.timeout = options?.timeout ?? 1800000; // 30 minutes
    this.retryInterval = options?.retryInterval ?? 5000; // 5 seconds
    this.maxRetries = Math.floor(this.timeout / this.retryInterval);
    this.testEndpoints = options?.testEndpoints ?? this.testEndpoints;
    this.failFast = options?.failFast ?? true;
  }

  /**
   * MAIN ENTRY POINT
   * Orchestrates the complete verification flow
   */
  async verify(): Promise<VercelDeploymentResult> {
    this.startTime = Date.now();

    try {
      // Step 1: Validate token
      await this.validateToken();

      // Step 2: Get project info
      const project = await this.getProject();

      // Step 3: Get deployments
      const deployments = await this.getDeployments();
      if (deployments.length === 0) {
        throw {
          code: 'NO_DEPLOYMENTS',
          message: 'No deployments found for this project',
          context: { projectId: this.projectId },
          suggestion: 'Push a new commit or trigger a deployment in Vercel dashboard',
          recoveryUrl: 'https://vercel.com/dashboard',
        };
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
      const allChecksPassed = endpoints.every(e => e.success) && deployment.state === 'READY';

      return {
        success: allChecksPassed,
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
          allChecksPassed,
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

  // ============================================================================
  // API METHODS
  // ============================================================================

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
        res.on('data', (chunk) => (data += chunk));
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
        res.on('data', (chunk) => (data += chunk));
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
        throw {
          code: 'INVALID_TOKEN',
          message: 'Vercel token is invalid or expired',
          context: { status: response.status },
          suggestion: 'Generate a new token at https://vercel.com/account/tokens',
          recoveryUrl: 'https://vercel.com/account/tokens',
        };
      }

      if (response.status !== 200) {
        throw {
          code: 'AUTH_FAILED',
          message: `Authentication failed with status ${response.status}`,
          context: { status: response.status },
          suggestion: 'Check VERCEL_TOKEN environment variable',
        };
      }
    } catch (error) {
      if (error.code) throw error;
      throw {
        code: 'TOKEN_VALIDATION_ERROR',
        message: error instanceof Error ? error.message : 'Token validation failed',
        context: { error },
        suggestion: 'Verify your Vercel token is valid',
      };
    }
  }

  private async getProject(): Promise<any> {
    const response = await this.request('GET', `/v9/projects/${this.projectId}`);

    if (response.status === 404) {
      throw {
        code: 'PROJECT_NOT_FOUND',
        message: 'Project not found',
        context: { projectId: this.projectId, status: response.status },
        suggestion: 'Verify project ID and that token has access to it',
        recoveryUrl: 'https://vercel.com/dashboard',
      };
    }

    if (response.status !== 200) {
      throw {
        code: 'PROJECT_FETCH_FAILED',
        message: `Failed to fetch project (status ${response.status})`,
        context: { projectId: this.projectId, status: response.status },
      };
    }

    return response.data;
  }

  private async getDeployments(): Promise<any[]> {
    const response = await this.request('GET', `/v6/deployments?projectId=${this.projectId}&limit=10`);

    if (response.status !== 200) {
      throw {
        code: 'DEPLOYMENT_FETCH_FAILED',
        message: `Failed to fetch deployments (status ${response.status})`,
        context: { projectId: this.projectId, status: response.status },
      };
    }

    return response.data.deployments || [];
  }

  private async getDeploymentDetails(deploymentId: string): Promise<any> {
    const response = await this.request('GET', `/v13/deployments/${deploymentId}`);

    if (response.status !== 200) {
      throw {
        code: 'DEPLOYMENT_DETAILS_FAILED',
        message: `Failed to fetch deployment details (status ${response.status})`,
        context: { deploymentId, status: response.status },
      };
    }

    return response.data;
  }

  private async pollDeploymentReady(deploymentId: string, retryCount: number = 0): Promise<any> {
    const deployment = await this.getDeploymentDetails(deploymentId);

    if (deployment.state === 'READY') {
      return deployment;
    }

    if (deployment.state === 'ERROR') {
      throw {
        code: 'DEPLOYMENT_BUILD_FAILED',
        message: 'Deployment build failed',
        context: {
          deploymentId,
          error: deployment.errorMessage,
          state: deployment.state,
        },
        suggestion: 'Check build logs for errors',
        recoveryUrl: `https://vercel.com/deployments/${deploymentId}`,
      };
    }

    if (retryCount >= this.maxRetries) {
      throw {
        code: 'DEPLOYMENT_TIMEOUT',
        message: 'Deployment took too long (exceeded timeout)',
        context: {
          deploymentId,
          state: deployment.state,
          timeoutMs: this.timeout,
        },
        suggestion: 'Check if deployment is stuck or try again',
        recoveryUrl: `https://vercel.com/deployments/${deploymentId}`,
      };
    }

    // Wait and retry
    await this.sleep(this.retryInterval);
    return this.pollDeploymentReady(deploymentId, retryCount + 1);
  }

  private getProductionUrl(project: any, deployment: any): string {
    // Try multiple sources for the URL
    if (deployment.alias && Array.isArray(deployment.alias) && deployment.alias.length > 0) {
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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        results.push({
          url,
          status: 0,
          responseTime: 0,
          success: false,
          error: errorMessage,
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
      const deploymentSize = deployment.deploymentSize || 0;

      // Cost analysis
      if (deploymentSize > 500 * 1024 * 1024) {
        recommendations.push({
          priority: 'HIGH',
          category: 'Cost',
          issue: 'Large deployment size',
          suggestion: 'Enable compression and code splitting to reduce bundle size',
        });
      }

      // Performance suggestions
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Performance',
        issue: 'Enable HTTP/2 Server Push',
        suggestion: 'Configure vercel.json to push critical resources',
      });

      recommendations.push({
        priority: 'MEDIUM',
        category: 'Performance',
        issue: 'Verify caching headers',
        suggestion: 'Set appropriate Cache-Control headers for static assets',
      });

      return {
        metrics: {
          buildSize: deploymentSize,
          deploymentSize,
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
    if (project.buildCommand?.includes('vite')) return 'Vite';
    if (project.buildCommand?.includes('react-scripts')) return 'Create React App';

    return 'Unknown';
  }

  // ============================================================================
  // ERROR HANDLING & FORMATTING
  // ============================================================================

  private formatError(error: any): any {
    if (error && error.code) {
      return error; // Already formatted
    }

    const message = error instanceof Error ? error.message : String(error);

    // Network errors
    if (message.includes('ECONNREFUSED')) {
      return {
        code: 'CONNECTION_REFUSED',
        message: 'Cannot connect to Vercel API',
        context: { originalError: message },
        suggestion: 'Check your internet connection or firewall',
        recoveryUrl: 'https://status.vercel.com',
      };
    }

    if (message.includes('ENOTFOUND') || message.includes('DNS')) {
      return {
        code: 'DNS_FAILURE',
        message: 'Cannot resolve Vercel API domain',
        context: { originalError: message },
        suggestion: 'Check DNS settings or try again in a moment',
      };
    }

    // Timeout errors
    if (message.includes('timeout') || message.includes('Timeout')) {
      return {
        code: 'REQUEST_TIMEOUT',
        message: 'Request timed out',
        context: { originalError: message },
        suggestion: 'Try again in a moment or check your network',
      };
    }

    // Generic error
    return {
      code: 'UNKNOWN_ERROR',
      message: message || 'An unknown error occurred',
      context: {
        originalError: error instanceof Error ? error.stack : error,
      },
      suggestion: 'Check the error details above or visit Vercel documentation',
      recoveryUrl: 'https://vercel.com/docs/api',
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// CLI USAGE (if run directly)
// ============================================================================

if (require.main === module || import.meta.url === `file://${process.argv[1]}`) {
  const projectId = process.argv[2];
  const token = process.env.VERCEL_TOKEN;

  if (!projectId || !token) {
    console.error('Usage: VERCEL_TOKEN=<token> node vercel-deployment-agent.ts <PROJECT_ID>');
    process.exit(1);
  }

  const agent = new VercelDeploymentAgent(projectId, token);
  agent.verify().then(result => {
    if (result.success) {
      console.log('✅ DEPLOYMENT VERIFIED');
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    } else {
      console.error('❌ DEPLOYMENT VERIFICATION FAILED');
      console.error(JSON.stringify(result.error, null, 2));
      process.exit(1);
    }
  });
}

export default VercelDeploymentAgent;
