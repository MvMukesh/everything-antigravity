# Commit Convention — Everything Antigravity

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.

## Format

```
<type>(<optional scope>): <short description>

[optional body — explain WHY, not WHAT]

[optional footer: Closes #<issue>, BREAKING CHANGE: <description>]
```

## Types

| Type       | Use for |
|------------|---------|
| `feat`     | New subagent, skill pack, rule, or workflow |
| `fix`      | Bug fix in a script, agent, or skill |
| `docs`     | README, CHANGELOG, or any markdown documentation |
| `refactor` | Restructuring without changing behaviour |
| `chore`    | Build tooling, release cuts, dependency updates |
| `test`     | Adding or fixing verification steps |
| `ci`       | Changes to GitHub Actions workflows |
| `perf`     | Performance improvements |
| `revert`   | Reverting a previous commit |

## Scopes (optional but encouraged)

| Scope      | When to use |
|------------|-------------|
| `agents`   | Changes to `agents/` |
| `skills`   | Changes to `skills/` |
| `rules`    | Changes to `rules/` |
| `workflows`| Changes to `workflows/` |
| `scripts`  | Changes to `scripts/` |
| `ci`       | Changes to `.github/workflows/` |
| `deps`     | Dependency updates |
| `release`  | Release commits |
| `docs`     | Documentation |
| `core`     | `SOUL.md`, `RULES.md`, `plugin.json` |

## Examples

```bash
# New subagent
git commit -m "feat(agents): add ml-researcher subagent for paper summarisation"

# Bug fix in a script
git commit -m "fix(scripts): resolve relative path issue in init-eag.sh"

# Documentation update
git commit -m "docs(readme): add Windows quickstart instructions"

# Release cut (done by release.sh automatically)
git commit -m "chore(release): cut version v2.1.0"

# CI improvement
git commit -m "ci: add security scan job using gitleaks"

# Breaking change
git commit -m "feat(agents)!: rename ui-ux-designer to design-engineer

BREAKING CHANGE: The agent filename changed from ui-ux-designer.md to design-engineer.md.
Update any references in your .gemini/agents/ symlinks."
```

## Validation

Commit messages are linted automatically in CI via `commitlint`.  
To validate locally before pushing:

```bash
npx --yes @commitlint/cli --edit
```
