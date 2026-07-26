import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { logger } from '../utils/logger.js';
import { copyRecursiveSync } from '../utils/copy.js';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const EAG_ROOT = join(__dirname, '../../');

export async function installCommand(options = {}) {
  const { force } = options;
  logger.header('Installing Everything Antigravity (EAG) Plugin Suite');

  const DEST_DIR = join(os.homedir(), '.gemini/config/plugins/everything-antigravity');
  logger.info(`Source: ${EAG_ROOT}`);
  logger.info(`Target: ${DEST_DIR}`);
  if (force) logger.warn('Force mode enabled. Overwriting existing files.');
  logger.blank();

  const spinner = ora('Copying plugin manifest, agents, skills, rules, and workflows...').start();
  
  try {
    mkdirSync(DEST_DIR, { recursive: true });

    if (existsSync(join(EAG_ROOT, 'plugin.json')) && (force || !existsSync(join(DEST_DIR, 'plugin.json')))) {
      copyFileSync(join(EAG_ROOT, 'plugin.json'), join(DEST_DIR, 'plugin.json'));
    }
    if (existsSync(join(EAG_ROOT, 'SOUL.md')) && (force || !existsSync(join(DEST_DIR, 'SOUL.md')))) {
      copyFileSync(join(EAG_ROOT, 'SOUL.md'), join(DEST_DIR, 'SOUL.md'));
    }
    if (existsSync(join(EAG_ROOT, 'RULES.md')) && (force || !existsSync(join(DEST_DIR, 'RULES.md')))) {
      copyFileSync(join(EAG_ROOT, 'RULES.md'), join(DEST_DIR, 'RULES.md'));
    }

    copyRecursiveSync(join(EAG_ROOT, 'agents'), join(DEST_DIR, 'agents'), force);
    copyRecursiveSync(join(EAG_ROOT, 'skills'), join(DEST_DIR, 'skills'), force);
    copyRecursiveSync(join(EAG_ROOT, 'rules'), join(DEST_DIR, 'rules'), force);
    copyRecursiveSync(join(EAG_ROOT, 'workflows'), join(DEST_DIR, 'workflows'), force);
    
    spinner.succeed('EAG installed successfully!');
    logger.blank();
    logger.success('Available agents: codebase-architect, security-auditor, ui-ux-designer, qa-tester, refactoring-specialist, build-error-resolver, database-architect, python-reviewer, typescript-reviewer, devops-architect.');
    logger.success('Available skill packs: modern-web-architecture, tdd-workflow, security-vulnerability-scan, database-schema-designer, performance-profiler, zero-symptom-debugging, continuous-learning, contract-verification.');
  } catch (err) {
    spinner.fail('Installation failed');
    logger.error(err.message);
    process.exit(1);
  }
}
