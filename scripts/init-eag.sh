#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-.}"

echo "🚀 Scaffolding Everything Antigravity (EAG) in ${TARGET_DIR}..."

mkdir -p "${TARGET_DIR}/.gemini/agents"
mkdir -p "${TARGET_DIR}/.gemini/skills"
mkdir -p "${TARGET_DIR}/.gemini/rules"
mkdir -p "${TARGET_DIR}/.gemini/workflows"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EAG_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cp -r "${EAG_ROOT}/agents/"*.md "${TARGET_DIR}/.gemini/agents/" 2>/dev/null || true
cp -r "${EAG_ROOT}/skills/"* "${TARGET_DIR}/.gemini/skills/" 2>/dev/null || true
cp -r "${EAG_ROOT}/rules/"*.md "${TARGET_DIR}/.gemini/rules/" 2>/dev/null || true
cp -r "${EAG_ROOT}/workflows/"*.md "${TARGET_DIR}/.gemini/workflows/" 2>/dev/null || true
cp "${EAG_ROOT}/SOUL.md" "${TARGET_DIR}/SOUL.md" 2>/dev/null || true
cp "${EAG_ROOT}/RULES.md" "${TARGET_DIR}/RULES.md" 2>/dev/null || true

echo "✨ EAG successfully scaffolded into ${TARGET_DIR}!"
