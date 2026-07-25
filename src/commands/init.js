import { existsSync, mkdirSync, copyFileSync, readdirSync, lstatSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const EAG_ROOT = join(__dirname, '../../');

function copyRecursiveSync(src, dest) {
  if (!existsSync(src)) return;
  const stats = lstatSync(src);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }
    readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(join(src, childItemName), join(dest, childItemName));
    });
  } else {
    if (!existsSync(dest)) {
      copyFileSync(src, dest);
    }
  }
}

export async function initCommand(targetDir) {
  logger.header(`Scaffolding EAG into ${targetDir === '.' ? 'current directory' : targetDir}`);

  const spinner = ora('Copying templates...').start();
  
  try {
    const fullTargetDir = resolve(targetDir);
    const geminiDir = join(fullTargetDir, '.gemini');

    mkdirSync(join(geminiDir, 'agents'), { recursive: true });
    mkdirSync(join(geminiDir, 'skills'), { recursive: true });
    mkdirSync(join(geminiDir, 'rules'), { recursive: true });
    mkdirSync(join(geminiDir, 'workflows'), { recursive: true });

    copyRecursiveSync(join(EAG_ROOT, 'agents'), join(geminiDir, 'agents'));
    copyRecursiveSync(join(EAG_ROOT, 'skills'), join(geminiDir, 'skills'));
    copyRecursiveSync(join(EAG_ROOT, 'rules'), join(geminiDir, 'rules'));
    copyRecursiveSync(join(EAG_ROOT, 'workflows'), join(geminiDir, 'workflows'));
    
    if (existsSync(join(EAG_ROOT, 'SOUL.md')) && !existsSync(join(fullTargetDir, 'SOUL.md'))) {
      copyFileSync(join(EAG_ROOT, 'SOUL.md'), join(fullTargetDir, 'SOUL.md'));
    }
    if (existsSync(join(EAG_ROOT, 'RULES.md')) && !existsSync(join(fullTargetDir, 'RULES.md'))) {
      copyFileSync(join(EAG_ROOT, 'RULES.md'), join(fullTargetDir, 'RULES.md'));
    }

    spinner.succeed('EAG successfully scaffolded!');
    logger.success(`Agents and skills copied to ${geminiDir}`);
  } catch (err) {
    spinner.fail('Scaffolding failed');
    logger.error(err.message);
    process.exit(1);
  }
}
