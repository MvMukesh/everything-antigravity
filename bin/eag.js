#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

import { Command } from 'commander';

// Commands
import { doctorCommand } from '../src/commands/doctor.js';
import { initCommand } from '../src/commands/init.js';
import { installCommand } from '../src/commands/install.js';
import { verifyCommand } from '../src/commands/verify.js';
import { releaseCommand } from '../src/commands/release.js';
import { dashboardCommand } from '../src/commands/dashboard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

const program = new Command();

program
  .name('eag')
  .description('Everything Antigravity (EAG) - Natively engineered agent harness')
  .version(packageJson.version);

program
  .command('doctor')
  .description('Run system diagnostics and verify EAG health')
  .action(doctorCommand);

program
  .command('init')
  .description('Scaffold EAG agents and skills into the current working directory')
  .argument('[target-dir]', 'Directory to scaffold into', '.')
  .action(initCommand);

program
  .command('install')
  .description('Install EAG globally into ~/.gemini/config/plugins/everything-antigravity')
  .option('-f, --force', 'Force overwrite of existing files')
  .action((options) => installCommand(options));

program
  .command('verify')
  .description('Run polyglot pre-flight checks (linting, testing, type-checking)')
  .action(verifyCommand);

program
  .command('release')
  .description('Automate version bumping, changelog, and git tagging')
  .argument('<version>', 'The new version (e.g., 2.2.0)')
  .action(releaseCommand);

program
  .command('dashboard')
  .description('Launch Interactive Agent Web Dashboard')
  .option('-p, --port <number>', 'Port to run the server on', 3333)
  .option('--no-open', 'Do not open browser automatically')
  .action((options) => dashboardCommand(options));

program.parse(process.argv);
