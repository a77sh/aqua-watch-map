const { execSync } = require('child_process');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

console.log('Running npm install to generate package-lock.json...');
try {
  execSync('npm install --package-lock-only', {
    cwd: projectDir,
    stdio: 'inherit',
    timeout: 120000,
  });
  console.log('package-lock.json generated successfully!');
} catch (err) {
  console.error('npm install failed:', err.message);
  process.exit(1);
}
