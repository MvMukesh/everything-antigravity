# Everything Antigravity (EAG) — Master Operating Rules

These non-negotiable rules govern all agentic coding operations executed within the **Everything Antigravity (EAG)** system.

---

## 1. Safety & Security Guardrails

1. **Zero Secret Leaks**: NEVER hardcode API keys, access tokens, passwords, or private credentials in code or commits. Always validate environment variables at startup.
2. **Input Validation & Sanitization**: Validate all external inputs at system boundaries using schemas (Zod, Pydantic, JSON Schema). Fail fast with descriptive error messages.
3. **Prevent Injection Attacks**: Use parameterized SQL queries, sanitized HTML/DOM rendering, and safe command execution flags.
4. **Config Protection**: NEVER edit or weaken linter, compiler, or test configurations (`tsconfig.json`, `eslint.config.js`, `.eslintrc`, `pytest.ini`) to bypass errors. Fix the underlying code.

---

## 2. Code Quality & Architectural Standards

1. **Immutability Principle**: Always create new objects/arrays instead of mutating state in place. Return copies with modifications.
2. **File & Function Scoping**:
   - Functions should be small and single-purpose (<50 lines).
   - Files should be modular and cohesion-focused (200-400 lines typical, 800 max).
3. **No Dead Code**: Remove unused imports, dead functions, commented-out code, and temporary debug statements before completing turns.
4. **Preserve API Contracts**: If a function signature or type definition changes, update all call sites across the codebase simultaneously.

---

## 3. Testing & Verification Requirements

1. **Mandatory Test Coverage**: Aim for 80%+ coverage on critical paths.
2. **Test-Driven Workflow (TDD)**:
   - **RED**: Write failing tests specifying expected behavior.
   - **GREEN**: Implement minimal code to pass the tests.
   - **IMPROVE**: Refactor for clean architecture while keeping tests green.
3. **Zero False Positives**: Never delete or comment out failing assertions to green-light a build.

---

## 4. Subagent Orchestration Guidelines

1. **Subagent Models**:
   - Use `pro` for complex system architecture, multi-file refactoring, and root-cause debugging.
   - Use `flash` for targeted research, security scanning, documentation lookup, and test execution.
   - Use `flash_lite` for quick file checks or symbol lookups.
2. **Parallel Subagents**: Launch independent subagents concurrently for multi-file research or multi-component reviews.
3. **Workspace Isolation**: Use `branch` workspace mode when subagents experiment with large structural changes, or `share` for concurrent read-heavy tasks.

---

## 5. Artifact & Documentation Lifecycle

1. **Implementation Plans**: Write `implementation_plan.md` for major architectural changes, multi-step refactors, or new feature additions. Request user approval before execution.
2. **Task Tracking**: Maintain `task.md` with checkable items (`[ ]`, `[/]`, `[x]`) during execution.
3. **Walkthroughs**: Document completed work in `walkthrough.md` with code snippets, test results, and visual evidence.
