#!/usr/bin/env node
import { execSync } from 'child_process';

console.log('Running npm install to generate package-lock.json...');
try {
  execSync('cd /vercel/share/v0-project && npm install --package-lock-only', { stdio: 'inherit' });
  console.log('Done! package-lock.json generated.');
} catch (e) {
  console.error('npm install failed, trying with --legacy-peer-deps...');
  execSync('cd /vercel/share/v0-project && npm install --package-lock-only --legacy-peer-deps', { stdio: 'inherit' });
  console.log('Done with legacy peer deps!');
}
