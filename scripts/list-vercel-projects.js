#!/usr/bin/env node
import https from 'https';

function request(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data),
          });
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  if (!process.env.VERCEL_TOKEN) {
    console.error('VERCEL_TOKEN required');
    process.exit(1);
  }

  try {
    const response = await request('GET', '/v9/projects');
    console.log('Available projects:');
    if (response.data.projects) {
      response.data.projects.forEach(p => {
        console.log(`  - ${p.name} (ID: ${p.id})`);
      });
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
