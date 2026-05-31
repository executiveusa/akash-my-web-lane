#!/usr/bin/env node
/**
 * VERCEL DEPLOYMENT VERIFICATION AGENT
 *
 * Production-ready, repo-agnostic skill for absolute deployment verification.
 * Drop this file into any project and use it immediately.
 *
 * Based on Vercel Labs agent-skills patterns:
 * https://github.com/vercel-labs/agent-skills
 *
 * Usage:
 *   VERCEL_TOKEN=<token> node vercel-deployment-agent.js <PROJECT_ID>
 */

const https = require('https');
const http = require('http');

class VercelDeploymentAgent {
  constructor(projectId, token, options = {}) {
    if (!projectId?.trim() || !token?.trim()) {
      throw new Error('projectId and vercelToken are required');
    }

    this.projectId = projectId.trim();
    this.token = token.trim();
    this.timeout = options.timeout ?? 1800000; // 30 minutes
    this.retryInterval = options.retryInterval ?? 5000; // 5 seconds
    this.maxRetries = Math.floor(this.timeout / this.retryInterval);
    this.testEndpoints = options.testEndpoints ?? ['/', '/api/health', '/health'];
    this.failFast = options.failFast ?? true;
    this.startTime = 0;
  }

  /**
   * Main entry point
   */
  async verify() {
    this.startTime = Date.now();

    try {
      // Validate token
      await this.validateToken();

      // Get project info
      const project = await this.getProject();

      // Get deployments
      const deployments = await this.getDeployments();
      if (deployments.length === 0) {
        throw {
          code: 'NO_DEPLOYMENTS',
          message: 'No deployments found',
          suggestion: 'Push code or trigger deployment in Vercel dashboard',
          recoveryUrl: 'https://vercel.com/dashboard',
        };
      }

      const latestDeployment = deployments[0];

      // Poll until READY
      const deployment = await this.pollDeploymentReady(latestDeployment.uid);

      // Get production URL
      const productionUrl = this.getProductionUrl(project, deployment);

      // Test endpoints
      const endpoints = await this.testAllEndpoints(productionUrl);

      // Get commit info
      const commitDeployed = latestDeployment.meta?.githubCommitSha || 'unknown';

      // Optional optimization analysis
      const analysis = await this.analyzeOptimization(deployment, project);

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

  /**
   * HTTP request to Vercel API
   */
  async request(method, path, body = null) {
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

  /**
   * HTTP request to domain
   */
  async httpRequest(url, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const startTime = Date.now();
      const timeoutHandle = setTimeout(() => {
        reject(new Error(`Timeout after ${timeout}ms`));
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

  /**
   * Validate token
   */
  async validateToken() {
    try {
      const response = await this.request('GET', '/v2/user');

      if (response.status === 401) {
        throw {
          code: 'INVALID_TOKEN',
          message: 'Token is invalid or expired',
          suggestion: 'Generate new token at https://vercel.com/account/tokens',
          recoveryUrl: 'https://vercel.com/account/tokens',
        };
      }

      if (response.status !== 200) {
        throw {
          code: 'AUTH_FAILED',
          message: `Authentication failed (${response.status})`,
          suggestion: 'Check VERCEL_TOKEN environment variable',
        };
      }
    } catch (error) {
      if (error.code) throw error;
      throw {
        code: 'TOKEN_VALIDATION_ERROR',
        message: error.message || 'Token validation failed',
        suggestion: 'Verify Vercel token is valid',
      };
    }
  }

  /**
   * Get project
   */
  async getProject() {
    const response = await this.request('GET', `/v9/projects/${this.projectId}`);

    if (response.status === 404) {
      throw {
        code: 'PROJECT_NOT_FOUND',
        message: 'Project not found',
        suggestion: 'Verify project ID at https://vercel.com/dashboard',
        recoveryUrl: 'https://vercel.com/dashboard',
      };
    }

    if (response.status !== 200) {
      throw {
        code: 'PROJECT_FETCH_FAILED',
        message: `Failed to fetch project (${response.status})`,
      };
    }

    return response.data;
  }

  /**
   * Get deployments
   */
  async getDeployments() {
    const response = await this.request('GET', `/v6/deployments?projectId=${this.projectId}&limit=10`);

    if (response.status !== 200) {
      throw {
        code: 'DEPLOYMENT_FETCH_FAILED',
        message: `Failed to fetch deployments (${response.status})`,
      };
    }

    return response.data.deployments || [];
  }

  /**
   * Get deployment details
   */
  async getDeploymentDetails(deploymentId) {
    const response = await this.request('GET', `/v13/deployments/${deploymentId}`);

    if (response.status !== 200) {
      throw {
        code: 'DEPLOYMENT_DETAILS_FAILED',
        message: `Failed to fetch deployment (${response.status})`,
      };
    }

    return response.data;
  }

  /**
   * Poll until deployment is READY
   */
  async pollDeploymentReady(deploymentId, retryCount = 0) {
    const deployment = await this.getDeploymentDetails(deploymentId);

    if (deployment.state === 'READY') {
      return deployment;
    }

    if (deployment.state === 'ERROR') {
      throw {
        code: 'DEPLOYMENT_BUILD_FAILED',
        message: 'Deployment build failed',
        suggestion: 'Check build logs at https://vercel.com/dashboard',
        recoveryUrl: `https://vercel.com/deployments/${deploymentId}`,
      };
    }

    if (retryCount >= this.maxRetries) {
      throw {
        code: 'DEPLOYMENT_TIMEOUT',
        message: 'Deployment timeout (exceeded 30 minutes)',
        suggestion: 'Check if deployment is stuck',
        recoveryUrl: `https://vercel.com/deployments/${deploymentId}`,
      };
    }

    await this.sleep(this.retryInterval);
    return this.pollDeploymentReady(deploymentId, retryCount + 1);
  }

  /**
   * Get production URL
   */
  getProductionUrl(project, deployment) {
    if (deployment.alias?.length > 0) {
      return `https://${deployment.alias[0]}`;
    }

    if (project.productionDeployment?.url) {
      return `https://${project.productionDeployment.url}`;
    }

    return `https://${project.name}.vercel.app`;
  }

  /**
   * Test all endpoints
   */
  async testAllEndpoints(baseUrl) {
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

        if (!success && this.failFast) break;
      } catch (error) {
        results.push({
          url,
          status: 0,
          responseTime: 0,
          success: false,
          error: error.message,
        });

        if (this.failFast) break;
      }
    }

    return results;
  }

  /**
   * Analyze optimization opportunities
   */
  async analyzeOptimization(deployment, project) {
    try {
      const recommendations = [];
      const deploymentSize = deployment.deploymentSize || 0;

      if (deploymentSize > 500 * 1024 * 1024) {
        recommendations.push({
          priority: 'HIGH',
          category: 'Cost',
          issue: 'Large deployment size',
          suggestion: 'Enable compression and code splitting',
        });
      }

      recommendations.push({
        priority: 'MEDIUM',
        category: 'Performance',
        issue: 'Enable HTTP/2 Server Push',
        suggestion: 'Configure vercel.json for critical resources',
      });

      return {
        metrics: { buildSize: deploymentSize, deploymentSize },
        recommendations,
      };
    } catch {
      return null;
    }
  }

  /**
   * Detect framework
   */
  detectFramework(project) {
    if (project.framework) return project.framework;

    if (project.buildCommand?.includes('next')) return 'Next.js';
    if (project.buildCommand?.includes('nuxt')) return 'Nuxt';
    if (project.buildCommand?.includes('gatsby')) return 'Gatsby';
    if (project.buildCommand?.includes('vite')) return 'Vite';

    return 'Unknown';
  }

  /**
   * Format errors
   */
  formatError(error) {
    if (error?.code) return error;

    const message = error?.message || String(error);

    if (message.includes('ECONNREFUSED')) {
      return {
        code: 'CONNECTION_REFUSED',
        message: 'Cannot connect to Vercel API',
        suggestion: 'Check internet connection or firewall',
        recoveryUrl: 'https://status.vercel.com',
      };
    }

    if (message.includes('ENOTFOUND') || message.includes('DNS')) {
      return {
        code: 'DNS_FAILURE',
        message: 'Cannot resolve Vercel API',
        suggestion: 'Check DNS or try again',
      };
    }

    if (message.includes('timeout') || message.includes('Timeout')) {
      return {
        code: 'REQUEST_TIMEOUT',
        message: 'Request timed out',
        suggestion: 'Try again in a moment',
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: message || 'Unknown error',
      suggestion: 'Check error details above',
      recoveryUrl: 'https://vercel.com/docs/api',
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI usage
if (require.main === module) {
  const projectId = process.argv[2];
  const token = process.env.VERCEL_TOKEN;

  if (!projectId || !token) {
    console.error('Usage: VERCEL_TOKEN=<token> node vercel-deployment-agent.js <PROJECT_ID>');
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

module.exports = VercelDeploymentAgent;
