---
name: continuous-learning
description: Automatically captures developer preferences, tool patterns, and project conventions to synthesize persistent project rules.
---

# Continuous Learning & Instinct Distillation Skill Pack

## Overview
Captures project-specific conventions, package manager choices, test preferences, and architectural idioms into `.gemini/rules/local-instincts.md` so that future sessions inherit instant domain memory.

## Pattern Capture Triggers
1. **Package Manager Choice**: Detect `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`, or `package-lock.json` and persist preferred runner (`pnpm`, `bun`, `yarn`, `npm`).
2. **Test Runner Choice**: Detect Vitest, Jest, PyTest, or Go test preferences and record custom execution flags.
3. **Architectural Conventions**: Record directory layout choices (e.g. `src/features/` vs `src/components/`).

## Local Instinct Persistence Location
- Save distilled rules to `.gemini/rules/local-instincts.md`.
