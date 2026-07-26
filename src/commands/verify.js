import { existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { logger } from '../utils/logger.js';
import pc from 'picocolors';

function runCheck(cmd) {
  try {
    execSync(cmd, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function commandExists(cmd) {
  try {
    const checkCmd = process.platform === 'win32' ? `where ${cmd}` : `command -v ${cmd}`;
    execSync(checkCmd, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

export async function verifyCommand() {
  logger.header('Running Everything Antigravity (EAG) Pre-Flight Checks');

  let passed = 0;
  let failed = 0;

  logger.step('Checking Code Formatting & Linting...');
  if (commandExists('npx') && existsSync('package.json')) {
    if (runCheck('npx --no-install biome check .')) {
      logger.success('Biome check passed.');
      passed++;
    } else if (runCheck('npx --no-install eslint .')) {
      logger.success('ESLint check passed.');
      passed++;
    } else {
      // Check if either tool is actually installed locally
      const hasBiome = runCheck('npx --no-install biome --version');
      const hasEslint = runCheck('npx --no-install eslint --version');
      if (hasBiome || hasEslint) {
        logger.error('JS/TS linting failed.');
        failed++;
      } else {
        logger.info('No local JS/TS linter configured.');
      }
    }
  } else if (commandExists('ruff') && (existsSync('pyproject.toml') || existsSync('ruff.toml'))) {
    if (runCheck('ruff check .')) {
      logger.success('Ruff check passed.');
      passed++;
    } else {
      logger.error('Ruff check failed.');
      failed++;
    }
  } else {
    logger.info('No recognizable linters found.');
  }

  logger.blank();
  logger.step('Checking Type Safety...');
  if (existsSync('tsconfig.json') && commandExists('npx')) {
    if (runCheck('npx tsc --noEmit')) {
      logger.success('TypeScript check passed (0 type errors).');
      passed++;
    } else {
      logger.error('TypeScript type errors detected.');
      failed++;
    }
  } else if (commandExists('pyright') && existsSync('pyproject.toml')) {
    if (runCheck('pyright')) {
      logger.success('Pyright check passed.');
      passed++;
    } else {
      logger.error('Pyright check failed.');
      failed++;
    }
  } else {
    logger.info('No recognizable typecheckers found.');
  }

  logger.blank();
  logger.step('Running Polyglot Test Suite...');
  
  let hasNpmTest = false;
  if (existsSync('package.json')) {
    try {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
      hasNpmTest = !!pkg.scripts?.test;
    } catch(e) {}
  }

  if (hasNpmTest) {
    let testCmd = 'npm test';
    if (commandExists('pnpm') && existsSync('pnpm-lock.yaml')) testCmd = 'pnpm test';
    else if (commandExists('bun') && existsSync('bun.lockb')) testCmd = 'bun test';
    
    if (runCheck(testCmd)) {
      logger.success(`${testCmd} passed.`);
      passed++;
    } else {
      logger.error(`${testCmd} failed.`);
      failed++;
    }
  } else if (existsSync('go.mod') && commandExists('go')) {
    if (runCheck('go test ./...')) {
      logger.success('go test passed.');
      passed++;
    } else {
      logger.error('go test failed.');
      failed++;
    }
  } else if (existsSync('Cargo.toml') && commandExists('cargo')) {
    if (runCheck('cargo test')) {
      logger.success('cargo test passed.');
      passed++;
    } else {
      logger.error('cargo test failed.');
      failed++;
    }
  } else {
    logger.info('No recognizable test suite found.');
  }

  logger.blank();
  if (passed === 0 && failed === 0) {
    console.log(pc.yellow(`⚠️ VERIFICATION SKIPPED. No checks were executed (0 passed, 0 failed).`));
    console.log(pc.yellow(`This is treated as a failure to prevent unverified code from merging.`));
    process.exit(1);
  } else if (failed === 0) {
    console.log(pc.green(`🎉 ALL CHECKS PASSED! (${passed} successful). Ready for commit/merge.`));
    process.exit(0);
  } else {
    console.log(pc.red(`🚨 VERIFICATION FAILED (${failed} checks failed). Fix issues before proceeding.`));
    process.exit(1);
  }
}
