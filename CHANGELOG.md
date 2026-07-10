# Changelog

All notable changes to **Everything Antigravity (EAG)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

> Changes in progress on the `dev` branch, staged for the next release.

---

## [2.0.0] — 2026-07-25

### Added
- **Professional release engineering**: `CHANGELOG.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `.gitignore`, `.editorconfig`, `package.json`
- **GitHub Actions CI pipeline** (`.github/workflows/ci.yml`) — automated health checks on every push and PR
- **Dependabot** (`.github/dependabot.yml`) — weekly automated dependency & GitHub Actions updates
- **Conventional Commits** enforcement via `commitlint.config.js` and `COMMIT_CONVENTION.md`
- **Release automation script** (`scripts/release.sh`) — semver bump, CHANGELOG update, annotated Git tag, push
- **Domain rule engines** (`rules/`) for TypeScript, Python, Go, and Rust
- **Multi-agent orchestration workflows** (`workflows/`) for MVP creation and security auditing
- **`devops-architect` and `python-reviewer` subagents**
- **`continuous-learning` and `contract-verification` skill packs**

### Changed
- `README.md` upgraded to include badges (version, license, CI status), architecture diagram, and full subagent table
- `scripts/verify-all.sh` extended with Shell linting (`shellcheck`) and Markdown linting (`markdownlint`)
- `scripts/eag-doctor.sh` improved with color-coded pass/fail output and exit codes

### Fixed
- `init-eag.sh` now correctly resolves relative and absolute target paths
- `eag-doctor.sh` output now visible in CI logs

---

## [1.0.0] — 2026-07-25

### Added
- **Core harness** — `plugin.json`, `SOUL.md`, `RULES.md`
- **Subagent fleet** — `codebase-architect`, `security-auditor`, `ui-ux-designer`, `qa-tester`, `refactoring-specialist`, `build-error-resolver`, `database-architect`
- **Skill packs** — `modern-web-architecture`, `tdd-workflow`, `security-vulnerability-scan`, `database-schema-designer`, `performance-profiler`, `zero-symptom-debugging`
- **Automation scripts** — `install.sh`, `install.ps1`, `init-eag.sh`, `init-eag.ps1`, `verify-all.sh`, `eag-doctor.sh`
- **Cross-platform support** — Bash (Linux/macOS) and PowerShell (Windows) installers
- **`VERSION` file** tracking current semantic version

---

[Unreleased]: https://github.com/MvMukesh/everything-antigravity/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/MvMukesh/everything-antigravity/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/MvMukesh/everything-antigravity/releases/tag/v1.0.0
