#!/usr/bin/env bash
set -euo pipefail

echo "============================================================"
echo "   Installing Everything Antigravity (EAG) Plugin Suite     "
echo "============================================================"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EAG_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

DEST_DIR="${HOME}/.gemini/config/plugins/everything-antigravity"

echo "📍 Source directory: ${EAG_ROOT}"
echo "📍 Target directory: ${DEST_DIR}"

mkdir -p "${DEST_DIR}"

echo "📦 Copying plugin manifest, agents, skills, rules, and workflows..."
cp -rf "${EAG_ROOT}/plugin.json" "${DEST_DIR}/" 2>/dev/null || true
cp -rf "${EAG_ROOT}/SOUL.md" "${DEST_DIR}/" 2>/dev/null || true
cp -rf "${EAG_ROOT}/RULES.md" "${DEST_DIR}/" 2>/dev/null || true
cp -rf "${EAG_ROOT}/agents" "${DEST_DIR}/"
cp -rf "${EAG_ROOT}/skills" "${DEST_DIR}/"
cp -rf "${EAG_ROOT}/rules" "${DEST_DIR}/" 2>/dev/null || true
cp -rf "${EAG_ROOT}/workflows" "${DEST_DIR}/" 2>/dev/null || true
cp -rf "${EAG_ROOT}/scripts" "${DEST_DIR}/" 2>/dev/null || true

chmod +x "${DEST_DIR}/scripts/"*.sh 2>/dev/null || true

echo "✅ Everything Antigravity (EAG) installed successfully!"
echo "🚀 Available agents: codebase-architect, security-auditor, ui-ux-designer, qa-tester, refactoring-specialist, build-error-resolver, database-architect, python-reviewer, typescript-reviewer, devops-architect."
echo "🚀 Available skill packs: modern-web-architecture, tdd-workflow, security-vulnerability-scan, database-schema-designer, performance-profiler, zero-symptom-debugging, continuous-learning, contract-verification."
