import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { logger } from '../utils/logger.js';
import pc from 'picocolors';

export async function releaseCommand(newVersion) {
  logger.header(`Releasing Everything Antigravity (EAG) v${newVersion}`);

  // 1. Validate version format
  if (!/^v?\d+\.\d+\.\d+$/.test(newVersion)) {
    logger.error('Invalid version format. Use semver like "2.2.0"');
    process.exit(1);
  }
  const cleanVersion = newVersion.replace(/^v/, '');
  const tagVersion = `v${cleanVersion}`;

  // 2. Pre-flight checks
  logger.step('Running pre-flight verification...');
  try {
    execSync('node ./bin/eag.js verify', { stdio: 'inherit' });
  } catch (e) {
    logger.error('Verification failed. Cannot proceed with release.');
    process.exit(1);
  }

  // 3. Update files
  logger.step(`Bumping version to ${cleanVersion}...`);
  if (existsSync('VERSION')) {
    writeFileSync('VERSION', cleanVersion);
  }
  if (existsSync('package.json')) {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    pkg.version = cleanVersion;
    writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  }

  // 4. Git commit and tag
  logger.step('Committing and tagging...');
  try {
    execSync('git add VERSION package.json', { stdio: 'ignore' });
    execSync(`git commit -m "chore(release): cut version ${tagVersion}"`, { stdio: 'ignore' });
    execSync(`git tag -a "${tagVersion}" -m "Version ${tagVersion}"`, { stdio: 'ignore' });
  } catch (e) {
    logger.error('Git operations failed. Are you in a git repository?');
    process.exit(1);
  }

  logger.blank();
  logger.success(`Release ${tagVersion} cut successfully!`);
  console.log(pc.cyan('Next steps:'));
  console.log(`  1. git push origin main`);
  console.log(`  2. git push origin ${tagVersion}`);
}
