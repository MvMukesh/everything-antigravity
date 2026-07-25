import { existsSync } from 'fs';
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
    execSync(`command -v ${cmd}`, { stdio: 'ignore' });
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
      logger.info('No local JS/TS linter configured or warnings present.');
    }
  } else if (commandExists('ruff') && (existsSync('pyproject.toml') || existsSync('ruff.toml'))) {
    if (runCheck('ruff check .')) {
      logger.success('Ruff check passed.');
      passed++;
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
    }
  } else {
    logger.info('No recognizable typecheckers found.');
  }

  logger.blank();
  logger.step('Running Polyglot Test Suite...');
  if (existsSync('package.json') && runCheck("grep -q '\"test\"' package.json")) {
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
  if (failed === 0) {
    console.log(pc.green(`🎉 ALL CHECKS PASSED! (${passed} successful). Ready for commit/merge.`));
    process.exit(0);
  } else {
    console.log(pc.red(`🚨 VERIFICATION FAILED (${failed} checks failed). Fix issues before proceeding.`));
    process.exit(1);
  }
}
