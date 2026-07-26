import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync, execSync } from 'child_process';
import { logger } from '../utils/logger.js';
import pc from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function isNewer(v1, v2) {
  const p1 = v1.split('.').map(Number);
  const p2 = v2.split('.').map(Number);
  
  if (p1.some(isNaN) || p2.some(isNaN) || p1.length !== 3 || p2.length !== 3) {
    return false;
  }

  for (let i = 0; i < 3; i++) {
    if (p1[i] > p2[i]) return true;
    if (p1[i] < p2[i]) return false;
  }
  return false;
}

export async function releaseCommand(newVersion) {
  logger.header(`Releasing Everything Antigravity (EAG) v${newVersion}`);

  // 1. Validate version format (Strict SemVer without leading zeros)
  if (!/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(newVersion)) {
    logger.error('Invalid version format. Use strict semver like "2.2.0" (no leading zeros)');
    process.exit(1);
  }
  const cleanVersion = newVersion.replace(/^v/, '');
  const tagVersion = `v${cleanVersion}`;

  // 1.1 Read current version and prevent downgrade
  let currentVersion = '0.0.0';
  if (existsSync('package.json')) {
    try {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
      currentVersion = pkg.version || '0.0.0';
    } catch (e) {}
  }
  if (!isNewer(cleanVersion, currentVersion)) {
    logger.error(`Cannot release version ${cleanVersion} because it is not greater than the current version ${currentVersion}.`);
    process.exit(1);
  }

  // 1.2 Check if tag already exists using git tag -l
  try {
    const existingTag = execFileSync('git', ['tag', '-l', tagVersion], { encoding: 'utf8' }).trim();
    if (existingTag === tagVersion) {
      logger.error(`Git tag ${tagVersion} already exists! Aborting before making any changes.`);
      process.exit(1);
    }
  } catch (e) {
    logger.error('Failed to check existing git tags.');
    process.exit(1);
  }

  // 2. Pre-flight checks
  logger.step('Running pre-flight verification...');
  try {
    const eagBin = join(__dirname, '../../bin/eag.js');
    execSync(`node "${eagBin}" verify`, { stdio: 'inherit' });
  } catch (e) {
    logger.error('Verification failed. Cannot proceed with release.');
    process.exit(1);
  }

  // 1.3 Check for working tree clean AFTER verify
  try {
    const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
    if (status !== '') {
       logger.error('Git working tree is not clean. Commit or clean your changes before releasing.');
       process.exit(1);
    }
  } catch(e) {
     logger.error('Failed to run git status. Are you in a git repository?');
     process.exit(1);
  }

  // 3. Update files
  logger.step(`Bumping version to ${cleanVersion}...`);
  const filesToCommit = [];

  if (existsSync('VERSION')) {
    writeFileSync('VERSION', cleanVersion + '\n');
    filesToCommit.push('VERSION');
  }
  if (existsSync('package.json')) {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    pkg.version = cleanVersion;
    writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    filesToCommit.push('package.json');
  }
  if (existsSync('plugin.json')) {
    const plugin = JSON.parse(readFileSync('plugin.json', 'utf8'));
    plugin.version = cleanVersion;
    writeFileSync('plugin.json', JSON.stringify(plugin, null, 2) + '\n');
    filesToCommit.push('plugin.json');
  }

  // 4. Git commit and tag using execFileSync to avoid shell injection
  logger.step('Committing and tagging...');
  
  try {
    execFileSync('git', ['add', ...filesToCommit], { stdio: 'ignore' });
  } catch (e) {
    logger.error('Failed to git add version files.');
    process.exit(1);
  }

  try {
    execFileSync('git', ['commit', '-m', `chore(release): cut version ${tagVersion}`], { stdio: 'ignore' });
  } catch (e) {
    logger.error('Failed to commit version bump.');
    process.exit(1);
  }

  try {
    execFileSync('git', ['tag', '-a', tagVersion, '-m', `Version ${tagVersion}`], { stdio: 'ignore' });
  } catch (e) {
    logger.error(`Failed to create git tag ${tagVersion}. Your repo may now be in a partially released state.`);
    process.exit(1);
  }

  logger.blank();
  logger.success(`Release ${tagVersion} cut successfully!`);
  console.log(pc.cyan('Next steps:'));
  console.log(`  1. git push origin main`);
  console.log(`  2. git push origin ${tagVersion}`);
}
