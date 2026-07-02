---
name: contract-verification
description: Ensures API function signature and database schema changes update all call sites across the codebase simultaneously.
---

# Contract Verification Skill Pack

## Overview
Prevents silent runtime breakages when function signatures, data interfaces, or database models are modified.

## Verification Protocol
1. **Symbol Usage Sweep**: Whenever a function signature, interface prop, or data schema is modified, execute `grep_search` across the entire codebase to locate all invocation sites.
2. **Synchronous Call-Site Updates**: Update all invocation sites in the same turn before completing the change.
3. **Type-Check Gate**: Run `tsc --noEmit` or equivalent compiler check to verify zero broken type references.
