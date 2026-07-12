module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // ── Type ──────────────────────────────────────────
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'refactor', 'chore', 'test', 'ci', 'perf', 'revert'],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // ── Scope ─────────────────────────────────────────
    'scope-case': [2, 'always', 'lower-case'],

    // ── Subject ───────────────────────────────────────
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],

    // ── Body ──────────────────────────────────────────
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],

    // ── Footer ────────────────────────────────────────
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
};
