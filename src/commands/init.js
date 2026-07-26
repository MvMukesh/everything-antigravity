import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';
import { copyRecursiveSync } from '../utils/copy.js';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const EAG_ROOT = join(__dirname, '../../');

export async function initCommand(targetDir) {
  logger.header(`Scaffolding EAG into ${targetDir === '.' ? 'current directory' : targetDir}`);

  const spinner = ora('Copying templates...').start();
  
  try {
    const ABS_TARGET = resolve(targetDir);

    if (ABS_TARGET === resolve(EAG_ROOT)) {
      spinner.fail('Scaffolding aborted');
      logger.error('Cannot run "eag init" inside the EAG source repository itself.');
      logger.error('This would overwrite the source files with the scaffolded output.');
      process.exit(1);
    }

    logger.step(`Target Directory: ${ABS_TARGET}`);
    const geminiDir = join(ABS_TARGET, '.gemini');

    mkdirSync(join(geminiDir, 'agents'), { recursive: true });
    mkdirSync(join(geminiDir, 'skills'), { recursive: true });
    mkdirSync(join(geminiDir, 'rules'), { recursive: true });
    mkdirSync(join(geminiDir, 'workflows'), { recursive: true });

    copyRecursiveSync(join(EAG_ROOT, 'agents'), join(geminiDir, 'agents'));
    copyRecursiveSync(join(EAG_ROOT, 'skills'), join(geminiDir, 'skills'));
    copyRecursiveSync(join(EAG_ROOT, 'rules'), join(geminiDir, 'rules'));
    copyRecursiveSync(join(EAG_ROOT, 'workflows'), join(geminiDir, 'workflows'));
    
    if (existsSync(join(EAG_ROOT, 'SOUL.md')) && !existsSync(join(ABS_TARGET, 'SOUL.md'))) {
      copyFileSync(join(EAG_ROOT, 'SOUL.md'), join(ABS_TARGET, 'SOUL.md'));
    }
    if (existsSync(join(EAG_ROOT, 'RULES.md')) && !existsSync(join(ABS_TARGET, 'RULES.md'))) {
      copyFileSync(join(EAG_ROOT, 'RULES.md'), join(ABS_TARGET, 'RULES.md'));
    }

    spinner.succeed('EAG successfully scaffolded!');
    logger.success(`Agents and skills copied to ${geminiDir}`);
  } catch (err) {
    spinner.fail('Scaffolding failed');
    logger.error(err.message);
    process.exit(1);
  }
}
