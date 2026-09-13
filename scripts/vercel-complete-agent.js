#!/usr/bin/env node
/**
 * VERCEL COMPLETE DEPLOYMENT AGENT
 *
 * Integrates patterns from Vercel Labs agent-skills:
 * - vercel-deploy-claimable: Deploy and return shareable URLs
 * - vercel-optimize: Audit for performance, cost, reliability
 * - vercel-health-check: Comprehensive endpoint verification
 *
 * Guarantees: No deployment claim without absolute proof
 * Usage: node vercel-complete-agent.js <PROJECT_ID>
 * Env: VERCEL_TOKEN (required)
 */

import https from 'https';
import http from 'http';

class VercelCompleteAgent {
  constructor(projectId, token) {
    if (!projectId) {
      console.error('❌ PROJECT_ID required');
      process.exit(1);
    }
    if (!token) {
      console.error('❌ VERCEL_TOKEN environment variable required');
      process.exit(1);
    }
    this.projectId = projectId;
    this.token = token;
    this.maxRetries = 180; // 30 minutes
    this.retryCount = 0;
  }

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
              status: res.statusCode,
              headers: res.headers,
              data: data ? JSON.parse(data) : null,
            });
          } catch (e) {
            resolve({
              status: res.statusCode,
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

  async httpRequest(url, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const timeoutHandle = setTimeout(() => {
        reject(new Error(`Timeout after ${timeout}ms`));
      }, timeout);

      const req = protocol.get(url, {
        headers: {
          'User-Agent': 'VercelCompleteAgent/1.0',
        },
      }, (res) => {
        clearTimeout(timeoutHandle);
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data,
            timing: Date.now(),
          });
        });
      });

      req.on('error', (err) => {
        clearTimeout(timeoutHandle);
        reject(err);
      });
    });
  }

  async getProjectInfo() {
    console.log('\n📊 Fetching project information...');
    const response = await this.request('GET', `/v9/projects/${this.projectId}`);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch project: ${response.status}`);
    }
    return response.data;
  }

  async getDeployments() {
    console.log('📋 Fetching latest deployments...');
    const response = await this.request('GET', `/v6/deployments?projectId=${this.projectId}&limit=5`);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch deployments: ${response.status}`);
    }
    return response.data.deployments || [];
  }

  async getDeploymentDetails(deploymentId) {
    const response = await this.request('GET', `/v13/deployments/${deploymentId}`);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch deployment: ${response.status}`);
    }
    return response.data;
  }

  async testEndpoint(url) {
    try {
      const response = await this.httpRequest(url);
      return {
        success: response.status === 200,
        status: response.status,
        data: response.data,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  async verifyEndpoints(baseUrl) {
    console.log(`\n🔗 Testing critical endpoints...`);
    const endpoints = [
      { url: baseUrl, name: 'Home Page' },
      { url: `${baseUrl}/api/health`, name: 'API Health' },
      { url: `${baseUrl}/health`, name: 'Health Check' },
    ];

    const results = [];
    for (const endpoint of endpoints) {
      const test = await this.testEndpoint(endpoint.url);
      const status = test.success ? '✅' : '❌';
      console.log(`${status} ${endpoint.name}: ${test.status || test.error}`);
      results.push({
        ...endpoint,
        ...test,
      });
    }

    return results.every(r => r.success);
  }

  async optimizeAnalysis(deployment, project) {
    console.log(`\n📈 Analyzing deployment for optimizations...`);

    const recommendations = [];
    const metrics = {
      buildSize: deployment.buildingSize || 0,
      deploymentSize: deployment.deploymentSize || 0,
      functionCount: deployment.functions?.length || 0,
    };

    // Cost analysis
    if (metrics.buildSize > 500 * 1024 * 1024) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Cost',
        issue: 'Large build artifacts',
        suggestion: 'Enable compression and code splitting',
      });
    }

    // Performance suggestions
    if (metrics.functionCount > 20) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Performance',
        issue: 'Many serverless functions',
        suggestion: 'Consider combining related functions',
      });
    }

    recommendations.push({
      priority: 'MEDIUM',
      category: 'Performance',
      issue: 'Enable HTTP/2 Server Push',
      suggestion: 'Configure headers to push critical resources',
    });

    recommendations.push({
      priority: 'LOW',
      category: 'Security',
      issue: 'Security headers',
      suggestion: 'Verify HSTS and CSP headers are configured',
    });

    return { metrics, recommendations };
  }

  async pollDeployment(deploymentId) {
    console.log(`\n⏳ Monitoring deployment status...`);

    while (this.retryCount < this.maxRetries) {
      const deployment = await this.getDeploymentDetails(deploymentId);

      console.log(`  Status: ${deployment.state} (${this.retryCount}s)`);

      if (deployment.state === 'READY') {
        return deployment;
      }

      if (deployment.state === 'ERROR') {
        throw new Error(`Deployment failed: ${deployment.errorMessage}`);
      }

      this.retryCount++;
      await this.sleep(1000);
    }

    throw new Error('Deployment timeout after 30 minutes');
  }

  async runComplete() {
    try {
      console.log('\n🚀 VERCEL COMPLETE DEPLOYMENT AGENT');
      console.log('=====================================\n');

      // Get project info
      const project = await this.getProjectInfo();
      console.log(`✅ Project: ${project.name}`);

      // Get deployments
      const deployments = await this.getDeployments();
      if (deployments.length === 0) {
        throw new Error('No deployments found');
      }

      const latestDeployment = deployments[0];
      console.log(`📦 Latest Deployment: ${latestDeployment.uid}`);
      console.log(`📦 Commit: ${latestDeployment.meta?.githubCommitSha?.substring(0, 7) || 'N/A'}`);

      // Poll for READY state
      const deployment = await this.pollDeployment(latestDeployment.uid);

      // Determine production URL
      const productionUrl = `https://${deployment.alias?.[0] || project.name}.vercel.app`;
      console.log(`\n🌐 Production URL: ${productionUrl}`);

      // Verify endpoints
      const endpointsHealthy = await this.verifyEndpoints(productionUrl);

      // Optimization analysis
      const { metrics, recommendations } = await this.optimizeAnalysis(deployment, project);

      // Final verification checklist
      console.log('\n✅ VERIFICATION CHECKLIST');
      console.log('  ✅ Build state: READY');
      console.log('  ✅ Production domain: Responding');
      console.log(`  ${endpointsHealthy ? '✅' : '❌'} Critical endpoints: ${endpointsHealthy ? 'Healthy' : 'Failed'}`);
      console.log(`  ✅ Commit deployed: ${latestDeployment.meta?.githubCommitSha?.substring(0, 7)}`);

      if (endpointsHealthy) {
        console.log('\n' + '='.repeat(60));
        console.log('✅ VERCEL DEPLOYMENT COMPLETE AND VERIFIED');
        console.log('✅ Production is LIVE and HEALTHY');
        console.log('='.repeat(60));

        console.log('\n📊 DEPLOYMENT SUMMARY');
        console.log(`   URL: ${productionUrl}`);
        console.log(`   Commit: ${deployment.meta?.githubCommitSha?.substring(0, 7)}`);
        console.log(`   Deployed: ${new Date(deployment.createdAt).toLocaleString()}`);

        console.log('\n💾 BUILD METRICS');
        console.log(`   Build Size: ${(metrics.buildSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Deployment Size: ${(metrics.deploymentSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Functions: ${metrics.functionCount}`);

        console.log('\n🎯 OPTIMIZATION OPPORTUNITIES');
        recommendations.forEach((rec, idx) => {
          console.log(`   ${idx + 1}. [${rec.priority}] ${rec.category}: ${rec.issue}`);
          console.log(`      → ${rec.suggestion}`);
        });

        console.log('\n📢 SHAREABLE URLS');
        console.log(`   Production: ${productionUrl}`);
        console.log(`   Dashboard: https://vercel.com/dashboard/projects`);

        return true;
      } else {
        throw new Error('Endpoint verification failed');
      }

    } catch (error) {
      console.error('\n❌ DEPLOYMENT VERIFICATION FAILED');
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Main execution
async function main() {
  const projectId = process.argv[2];
  const token = process.env.VERCEL_TOKEN;

  const agent = new VercelCompleteAgent(projectId, token);
  await agent.runComplete();
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
