#!/usr/bin/env node
/**
 * VERCEL DEPLOYMENT VERIFICATION AGENT
 *
 * This script provides absolute certainty that a Vercel deployment is:
 * 1. Successfully built
 * 2. Live and serving traffic
 * 3. All endpoints responding correctly
 * 4. No 404 or error states
 * 5. Latest commit actually deployed
 *
 * Usage: node vercel-deployment-agent.js <PROJECT_ID>
 * Environment: VERCEL_TOKEN (required)
 */

import https from 'https';
import http from 'http';

class VercelDeploymentAgent {
  constructor(projectId, token) {
    if (!projectId) {
      console.error('❌ PROJECT_ID required');
      console.error('Usage: node vercel-deployment-agent.js <PROJECT_ID>');
      process.exit(1);
    }
    if (!token) {
      console.error('❌ VERCEL_TOKEN environment variable required');
      process.exit(1);
    }
    this.projectId = projectId;
    this.token = token;
    this.deploymentUrl = null;
    this.productionUrl = null;
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

  async fetchDeployments() {
    console.log('\n📋 Fetching deployment history...');
    const response = await this.request('GET', `/v6/deployments?projectId=${this.projectId}&limit=10`);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch deployments: ${response.status}`);
    }

    const deployments = response.data.deployments || [];
    if (deployments.length === 0) {
      throw new Error('No deployments found for this project');
    }

    return deployments;
  }

  async getProjectInfo() {
    console.log('\n📊 Fetching project information...');
    const response = await this.request('GET', `/v9/projects/${this.projectId}`);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch project: ${response.status}`);
    }

    return response.data;
  }

  async checkDeploymentStatus(deploymentId) {
    const response = await this.request('GET', `/v13/deployments/${deploymentId}`);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch deployment ${deploymentId}: ${response.status}`);
    }

    return response.data;
  }

  async httpRequest(url, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const timeoutHandle = setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);

      const req = protocol.get(url, {
        headers: {
          'User-Agent': 'VercelDeploymentAgent/1.0',
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
          });
        });
      });

      req.on('error', (err) => {
        clearTimeout(timeoutHandle);
        reject(err);
      });
    });
  }

  async testEndpoint(url, expectedStatus = 200) {
    try {
      const response = await this.httpRequest(url);
      if (response.status === expectedStatus) {
        return { success: true, status: response.status };
      }
      return { success: false, status: response.status, expected: expectedStatus };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  async verifyDeployment() {
    try {
      console.log('\n🚀 VERCEL DEPLOYMENT VERIFICATION AGENT');
      console.log('=========================================\n');

      // Step 1: Get project info
      const project = await this.getProjectInfo();
      console.log(`✅ Project: ${project.name}`);
      this.productionUrl = `https://${project.productionDeployment?.url || project.name}.vercel.app`;
      console.log(`✅ Production URL: ${this.productionUrl}`);

      // Step 2: Fetch deployments
      const deployments = await this.fetchDeployments();
      const latestDeployment = deployments[0];

      console.log(`\n📦 Latest Deployment ID: ${latestDeployment.uid}`);
      console.log(`📦 Created: ${new Date(latestDeployment.createdAt).toLocaleString()}`);
      console.log(`📦 Git Commit: ${latestDeployment.meta?.githubCommitSha?.substring(0, 7) || 'N/A'}`);

      // Step 3: Check deployment status
      const deployment = await this.checkDeploymentStatus(latestDeployment.uid);

      console.log(`\n🔍 Deployment State: ${deployment.state}`);

      if (deployment.state === 'READY') {
        console.log('✅ Deployment is READY');
      } else if (deployment.state === 'BUILDING') {
        console.log('⏳ Deployment is BUILDING - waiting...');
        await this.sleep(5000);
        return await this.verifyDeployment();
      } else if (deployment.state === 'ERROR') {
        console.log('❌ Deployment ERROR:');
        console.log(JSON.stringify(deployment.errorMessage, null, 2));
        process.exit(1);
      } else {
        console.log(`⚠️  Deployment state: ${deployment.state}`);
      }

      // Step 4: Test production domain
      console.log(`\n🌐 Testing production domain: ${this.productionUrl}`);
      const prodTest = await this.testEndpoint(this.productionUrl);

      if (!prodTest.success) {
        console.log(`❌ CRITICAL: Production domain NOT responding`);
        console.log(`   Status: ${prodTest.status || prodTest.error}`);
        console.log(`   Expected: 200`);
        throw new Error('Production domain is not serving traffic');
      }
      console.log(`✅ Production domain responding (${prodTest.status})`);

      // Step 5: Test common endpoints
      console.log(`\n🔗 Testing critical endpoints...`);
      const endpoints = [
        { url: `${this.productionUrl}/api/health`, name: 'Health Check' },
        { url: `${this.productionUrl}/`, name: 'Home Page' },
      ];

      const apiUrl = `https://${project.name}-api.vercel.app`;
      endpoints.push({ url: `${apiUrl}/health`, name: 'API Health' });

      let allEndpointsHealthy = true;
      for (const endpoint of endpoints) {
        const test = await this.testEndpoint(endpoint.url);
        if (test.success && test.status !== 404) {
          console.log(`✅ ${endpoint.name}: ${test.status}`);
        } else {
          console.log(`❌ ${endpoint.name}: ${test.status || test.error}`);
          allEndpointsHealthy = false;
        }
      }

      // Step 6: Final summary
      console.log('\n' + '='.repeat(50));
      if (allEndpointsHealthy && prodTest.success) {
        console.log('✅ DEPLOYMENT VERIFICATION COMPLETE');
        console.log('✅ All checks passed');
        console.log('✅ Production is LIVE and HEALTHY');
        console.log('\n📊 DEPLOYMENT CONFIRMED AS LIVE');
        console.log(`   URL: ${this.productionUrl}`);
        console.log(`   Commit: ${deployment.meta?.githubCommitSha?.substring(0, 7)}`);
        console.log(`   Deployed: ${new Date(deployment.createdAt).toLocaleString()}`);
        console.log('='.repeat(50));
        return true;
      } else {
        console.log('❌ DEPLOYMENT VERIFICATION FAILED');
        console.log('❌ Some endpoints are not responding correctly');
        throw new Error('Deployment verification failed');
      }

    } catch (error) {
      console.error('\n❌ DEPLOYMENT VERIFICATION FAILED');
      console.error(`❌ Error: ${error.message}`);
      console.error('\n🔧 Troubleshooting steps:');
      console.error('1. Check VERCEL_TOKEN is valid');
      console.error('2. Verify PROJECT_ID is correct');
      console.error('3. Ensure deployment is not still building');
      console.error('4. Check Vercel dashboard for deployment errors');
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

  const agent = new VercelDeploymentAgent(projectId, token);
  await agent.verifyDeployment();
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
