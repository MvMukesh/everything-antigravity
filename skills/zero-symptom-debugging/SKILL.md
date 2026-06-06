---
name: zero-symptom-debugging
description: Root-cause debugging protocol that prohibits masking errors, swallowing exceptions, or modifying config files to bypass failures.
---

# Zero-Symptom Debugging Skill Pack

## Overview
Diagnostic framework designed to eliminate "symptom patching" and ensure every bug fix resolves the underlying root cause.

## Golden Debugging Rules

```
❌ WRONG: Wrap failing code in try/catch and return null or empty array.
✅ RIGHT: Trace why the upstream provider returned null, fix data flow contract.

❌ WRONG: Comment out failing unit test or delete broken assertion.
✅ RIGHT: Inspect implementation code, fix contract violation.

❌ WRONG: Edit tsconfig.json or eslintrc to turn strict mode off.
✅ RIGHT: Fix type definitions and satisfy strict compiler rules.
```

## Step-by-Step Diagnostic Workflow

1. **Log Extraction First**: Fetch un-truncated terminal outputs, build logs, or browser console stack traces using `view_file` or `run_command`.
2. **Trace Upstream Data Providers**: Locate where invalid state originated (e.g. unhandled null response from API, schema mismatch, unparsed JSON).
3. **Reproduce with Unit Test**: Write a minimal reproducing test case.
4. **Apply Root Cause Fix**: Modify the underlying data provider or transformation logic.
5. **Verify Stack Cleanliness**: Re-run full test suite to confirm error elimination.
