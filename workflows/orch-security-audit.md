# Workflow Recipe: Security Audit (`orch-security-audit`)

This orchestrated workflow runs a comprehensive security scan across a repository, isolates vulnerabilities, generates drop-in patches, and verifies zero regression.

## Execution Sequence

1. **Scan Phase**:
   - Run `security-auditor` (`model: flash`) to scan for hardcoded secrets, injection vectors, XSS, CSRF, and vulnerable dependencies.
2. **Analysis & Remediation**:
   - For each vulnerability found, generate concrete code fixes using strict parameterization and input sanitization.
3. **Verification**:
   - Re-run security scan and unit tests to ensure zero security flaws remain.
