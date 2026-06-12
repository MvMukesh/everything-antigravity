# Everything Antigravity (EAG) 🚀

<div align="center">

[![Version](https://img.shields.io/badge/version-2.0.0-6C63FF?style=for-the-badge)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-22C55E?style=for-the-badge)](LICENSE)
[![CI Status](https://img.shields.io/github/actions/workflow/status/MvMukesh/everything-antigravity/ci.yml?branch=main&label=CI&style=for-the-badge)](https://github.com/MvMukesh/everything-antigravity/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-F59E0B?style=for-the-badge)](CONTRIBUTING.md)
[![Conventional Commits](https://img.shields.io/badge/commits-conventional-4A90E2?style=for-the-badge)](https://www.conventionalcommits.org)

> **The ultimate agent harness, performance optimization system, and subagent fleet —  
> natively engineered for Google Antigravity.**

</div>

---

## What Is EAG?

**Everything Antigravity (EAG)** is an open-source plugin suite that supercharges your Antigravity AI assistant with:

- 🤖 **10 specialized subagents** that run concurrently on isolated model profiles
- 📚 **8 native skill packs** covering architecture, security, testing, and more
- 🏷️ **4 language rule engines** enforcing TypeScript, Python, Go, and Rust best practices
- 🔁 **Multi-agent workflow recipes** for MVP creation, security audits, and code review
- 🛠️ **Shell automation scripts** for installation, scaffolding, health checks, and releases

---

## Architecture

```
everything-antigravity/
│
├── plugin.json                          # Antigravity plugin manifest
├── SOUL.md                              # Agent persona, values & mindset
├── RULES.md                             # Non-negotiable safety & coding guardrails
├── VERSION                              # Current semantic version
├── CHANGELOG.md                         # Release history (Keep a Changelog)
├── CONTRIBUTING.md                      # Contributor guidelines
├── CODE_OF_CONDUCT.md                   # Community standards
│
├── agents/                              # Specialized Subagent Fleet
│   ├── codebase-architect.md            # System design & architecture blueprints
│   ├── security-auditor.md              # Secret scanning & OWASP vulnerability audit
│   ├── ui-ux-designer.md                # High-aesthetics UI, animations & accessibility
│   ├── qa-tester.md                     # TDD execution & 80%+ coverage enforcement
│   ├── refactoring-specialist.md        # Technical debt removal & immutability
│   ├── build-error-resolver.md          # Stack trace debugging & root-cause fixes
│   ├── database-architect.md            # Schema design, migrations & SQL tuning
│   ├── devops-architect.md              # CI/CD pipelines, Docker, infra-as-code
│   ├── python-reviewer.md               # PEP-8, type hints, async best practices
│   └── typescript-reviewer.md           # Strict TypeScript, ESLint, immutability
│
├── skills/                              # Native Skill Packs
│   ├── modern-web-architecture/         # Next.js 15, Vite, Vanilla CSS design tokens
│   ├── tdd-workflow/                    # Red-Green-Refactor TDD enforcement
│   ├── security-vulnerability-scan/     # Defense-in-depth security audit
│   ├── database-schema-designer/        # Normalized schemas & index optimization
│   ├── performance-profiler/            # CWV, LCP/INP debugging & memory leak scan
│   ├── zero-symptom-debugging/          # Root-cause log inspection protocols
│   ├── continuous-learning/             # Preference capture & project rule synthesis
│   └── contract-verification/           # API signature & schema change propagation
│
├── rules/                               # Language Rule Engines
│   ├── typescript.md                    # Strict TS, ESLint, no implicit any
│   ├── python.md                        # PEP-8, type hints, async patterns
│   ├── go.md                            # Idiomatic Go, error wrapping, goroutines
│   └── rust.md                          # Ownership, lifetimes, clippy compliance
│
├── workflows/                           # Multi-Agent Orchestration Recipes
│   ├── build-mvp.md                     # Full-stack MVP from spec to deployed code
│   └── security-audit.md               # End-to-end OWASP security review pipeline
│
└── scripts/                             # Automation & Verification Tooling
    ├── install.sh                       # Global plugin installer (Linux/macOS)
    ├── install.ps1                      # Global plugin installer (Windows)
    ├── init-eag.sh                      # Project-local scaffolder
    ├── init-eag.ps1                     # Project-local scaffolder (Windows)
    ├── verify-all.sh                    # Pre-commit linting, typecheck & test runner
    ├── eag-doctor.sh                    # Health diagnostics for your EAG install
    └── release.sh                       # Automated semver release cutter
```

---

## Quickstart

### Option 1 — Global Installation *(Recommended)*

Installs EAG into your Antigravity plugin directory so it's active across all your projects:

```bash
git clone https://github.com/MvMukesh/everything-antigravity.git
cd everything-antigravity
bash ./scripts/install.sh
```

### Option 2 — Project-Local Scaffolding

Copies agents, skills, and rules directly into your project's `.gemini/` folder:

```bash
bash ./scripts/init-eag.sh ./my-project
```

### Option 3 — Pre-commit Verification

Run the full verification suite before committing:

```bash
bash ./scripts/verify-all.sh
```

### Option 4 — Health Check

Check that your EAG installation is complete and healthy:

```bash
bash ./scripts/eag-doctor.sh
```

---

## Subagent Fleet

| Subagent | Model | Role |
|---|---|---|
| `codebase-architect` | `pro` | System design, dependency mapping, implementation plans |
| `security-auditor` | `flash` | Secret scanning, OWASP Top 10, input sanitization |
| `ui-ux-designer` | `pro` | Glassmorphism UI, CSS tokens, micro-animations, accessibility |
| `qa-tester` | `flash` | TDD workflow, 80%+ coverage enforcement, E2E tests |
| `refactoring-specialist` | `pro` | Technical debt removal, immutability, type safety |
| `build-error-resolver` | `pro` | Stack trace analysis, root-cause debugging |
| `database-architect` | `pro` | Schema design, safe migrations, query optimization |
| `devops-architect` | `flash` | CI/CD pipelines, Docker, infrastructure-as-code |
| `python-reviewer` | `flash` | PEP-8, type hints, async best practices |
| `typescript-reviewer` | `flash` | Strict TS, ESLint, no implicit any |

---

## Core Rules

1. **Verification-First** — Never complete a task without running build or test verification.
2. **Zero-Symptom Fixing** — Never swallow exceptions or comment out failing assertions.
3. **No Snippet Tunnel Vision** — Always inspect complete symbol definitions before editing data structures.
4. **Config Protection** — Never weaken linter or compiler configs to bypass errors; fix the code.
5. **Secret Safety** — Never hardcode credentials; never log secrets; always use environment variables.

---

## Versioning

EAG follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`):

- **MAJOR** — breaking changes to agent interfaces or skill APIs
- **MINOR** — new subagents, skill packs, or workflow recipes added
- **PATCH** — bug fixes, documentation updates, script improvements

All releases are tagged as `vX.Y.Z` and documented in [CHANGELOG.md](CHANGELOG.md).

To cut a new release:

```bash
bash ./scripts/release.sh 2.1.0
```

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:

- How to add a new subagent, skill, or workflow
- Commit message conventions (Conventional Commits)
- Branch strategy and PR process
- Release workflow

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
Built with ❤️ by [MvMukesh](https://github.com/MvMukesh)
</div>
