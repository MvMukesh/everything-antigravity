# Contributing to Everything Antigravity (EAG) 🚀

Thank you for your interest in contributing to **Everything Antigravity (EAG)**!  
We welcome new subagents, domain skill packs, language rule engines, workflow recipes, and documentation improvements.

**Maintainer:** MvMukesh — mukeshmanral777@gmail.com

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Commit Message Convention](#commit-message-convention)
5. [Branch Strategy](#branch-strategy)
6. [Pull Request Process](#pull-request-process)
7. [Release Process](#release-process)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).  
By participating, you agree to uphold these standards.

---

## Getting Started

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/everything-antigravity.git
cd everything-antigravity

# 2. Run the health check
bash ./scripts/eag-doctor.sh

# 3. Create a feature branch from dev
git checkout -b feature/your-feature-name origin/dev
```

---

## How to Contribute

### Adding a New Subagent
1. Create `agents/<agent-name>.md` following the template in an existing agent file.
2. Add an entry to the subagent table in `README.md`.
3. Add an entry to the `[2.x.x]` section in `CHANGELOG.md` under `### Added`.

### Adding a New Skill Pack
1. Create `skills/<skill-name>/SKILL.md` following the YAML frontmatter convention.
2. Update the skills section of `README.md`.

### Adding a Language Rule
1. Create `rules/<language>.md` with clear, enforceable directives.
2. Reference it in `README.md`.

### Fixing a Bug
1. Open an issue first (use the Bug Report template).
2. Branch from `dev`, prefix branch name with `fix/`.
3. Write a test or verification step that reproduces the issue.

---

## Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).  
All commits **must** follow this format:

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

**Types:**

| Type       | When to use |
|------------|-------------|
| `feat`     | A new feature or capability |
| `fix`      | A bug fix |
| `docs`     | Documentation-only changes |
| `refactor` | Code restructure without behaviour change |
| `chore`    | Build process, tooling, dependency updates |
| `test`     | Adding or fixing tests |
| `ci`       | CI/CD pipeline changes |

**Examples:**

```bash
git commit -m "feat(agents): add ml-researcher subagent for paper analysis"
git commit -m "fix(scripts): resolve relative path issue in init-eag.sh"
git commit -m "docs(readme): update quickstart with Windows instructions"
git commit -m "chore(release): cut version v2.1.0"
```

---

## Branch Strategy

```
main         ← Stable production releases only (protected, tagged)
  └── dev    ← Integration branch for all feature work
        └── feature/*   ← New capabilities
        └── fix/*        ← Bug fixes
        └── docs/*       ← Documentation
        └── release/*    ← Release candidates (merged to main when ready)
```

- **Never commit directly to `main`.**  
- All work goes through `dev` via Pull Requests.  
- Release branches (`release/vX.Y.Z`) are cut from `dev` when preparing a new version.

---

## Pull Request Process

1. Ensure `bash ./scripts/verify-all.sh` passes locally before opening a PR.
2. Target the **`dev`** branch (not `main`) for feature PRs.
3. Fill in the PR template completely.
4. Request review from at least one maintainer.
5. Once approved, a maintainer will squash-merge into `dev`.

---

## Release Process

Releases are cut by maintainers using the automated script:

```bash
bash ./scripts/release.sh <new-version>
# Example:
bash ./scripts/release.sh 2.1.0
```

This script will:
1. Update `VERSION` and `package.json`
2. Prompt to update `CHANGELOG.md`
3. Create an annotated Git tag (`v2.1.0`)
4. Push the tag to `origin`

---

Thank you for helping make EAG better! 🎉
