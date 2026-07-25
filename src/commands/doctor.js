import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import os from 'os';
import { logger } from '../utils/logger.js';
import pc from 'picocolors';

export async function doctorCommand() {
  logger.header('Everything Antigravity (EAG) System Diagnostics');

  let checksPassed = 0;
  let checksFailed = 0;

  const checkStatus = (name, passed) => {
    if (passed) {
      logger.success(name + pc.dim(' [OK]'));
      checksPassed++;
    } else {
      logger.error(name + pc.dim(' [MISSING/FAILED]'));
      checksFailed++;
    }
  };

  // Determine context: local vs global
  const localDir = process.cwd();
  const globalDir = join(os.homedir(), '.gemini/config/plugins/everything-antigravity');

  // If running inside the EAG repo itself (e.g. CI), test the local files.
  const isLocalEAGRepo = existsSync(join(localDir, 'plugin.json')) && existsSync(join(localDir, 'agents'));
  const pluginDir = isLocalEAGRepo ? localDir : globalDir;

  if (isLocalEAGRepo) {
    logger.info(`Running in LOCAL mode (testing current repository): ${pluginDir}`);
  } else {
    logger.info(`Running in GLOBAL mode: ${pluginDir}`);
  }
  logger.blank();

  // Check 1: Plugin installation directory
  const hasManifest = existsSync(join(pluginDir, 'plugin.json'));
  checkStatus('Plugin Manifest (plugin.json)', hasManifest);

  // Check 2: Subagents present (10+ subagents)
  let subagentCount = 0;
  try {
    subagentCount = readdirSync(join(pluginDir, 'agents')).filter(f => f.endsWith('.md')).length;
  } catch (e) {}
  checkStatus(`Subagent Fleet (found ${subagentCount}, expected 10+)`, subagentCount >= 10);

  // Check 3: Skills present (8+ skill packs)
  let skillCount = 0;
  try {
    skillCount = readdirSync(join(pluginDir, 'skills'), { withFileTypes: true })
      .filter(dirent => dirent.isDirectory()).length;
  } catch (e) {}
  checkStatus(`Skill Packs (found ${skillCount}, expected 8+)`, skillCount >= 8);

  // Check 4: Governance rules
  const hasRules = existsSync(join(pluginDir, 'RULES.md')) && existsSync(join(pluginDir, 'SOUL.md'));
  checkStatus('Governance Rules (RULES.md & SOUL.md)', hasRules);

  // Check 5: Workflows present
  let workflowCount = 0;
  try {
    workflowCount = readdirSync(join(pluginDir, 'workflows')).filter(f => f.endsWith('.md')).length;
  } catch (e) {}
  checkStatus(`Multi-Agent Workflows (found ${workflowCount}, expected 2+)`, workflowCount >= 2);

  // Check 6: Language domain rules
  let ruleCount = 0;
  try {
    ruleCount = readdirSync(join(pluginDir, 'rules')).filter(f => f.endsWith('.md')).length;
  } catch (e) {}
  checkStatus(`Domain Rule Engines (found ${ruleCount}, expected 4+)`, ruleCount >= 4);

  logger.blank();
  if (checksFailed === 0) {
    console.log(pc.green(`🎉 DIAGNOSTICS PASSED (${checksPassed} checks passed). EAG is 100% healthy, verified, and operational!`));
    process.exit(0);
  } else {
    console.log(pc.red(`⚠️ DIAGNOSTICS WARNING (${checksFailed} checks failed). Run 'eag install' to repair global installation.`));
    process.exit(1);
  }
}
