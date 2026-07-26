import pc from 'picocolors';

export const logger = {
  info: (msg) => console.log(pc.blue('ℹ️  ') + msg),
  success: (msg) => console.log(pc.green('✅ ') + msg),
  warn: (msg) => console.error(pc.yellow('⚠️  ') + msg),
  error: (msg) => console.error(pc.red('❌ ') + msg),
  step: (msg) => console.log(pc.cyan('➤  ') + msg),
  header: (msg) => {
    console.log(pc.dim('============================================================'));
    console.log(pc.bold(pc.magenta(`   ${msg}`)));
    console.log(pc.dim('============================================================'));
  },
  blank: () => console.log(),
};
