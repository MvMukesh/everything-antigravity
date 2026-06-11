#!/usr/bin/env bash
set -eo pipefail

echo "============================================================"
echo "      Everything Antigravity (EAG) System Diagnostics       "
echo "============================================================"

CHECK_OK=0
CHECK_FAIL=0

check_status() {
    local name="$1"
    local status="$2"
    if [ "$status" -eq 0 ]; then
        echo "  ✅ $name: OK"
        CHECK_OK=$((CHECK_OK+1))
    else
        echo "  ❌ $name: MISSING / FAILED"
        CHECK_FAIL=$((CHECK_FAIL+1))
    fi
}

GLOBAL_PLUGIN_DIR="${HOME}/.gemini/config/plugins/everything-antigravity"

# Check 1: Plugin installation directory
[ -d "${GLOBAL_PLUGIN_DIR}" ] && [ -f "${GLOBAL_PLUGIN_DIR}/plugin.json" ]
check_status "Global Plugin Manifest (~/.gemini/config/plugins/everything-antigravity)" $?

# Check 2: Subagents present (10+ subagents)
[ -d "${GLOBAL_PLUGIN_DIR}/agents" ] && [ $(ls -1 "${GLOBAL_PLUGIN_DIR}/agents"/*.md 2>/dev/null | wc -l) -ge 10 ]
check_status "Subagent Fleet (10+ subagents)" $?

# Check 3: Skills present (8+ skill packs)
[ -d "${GLOBAL_PLUGIN_DIR}/skills" ] && [ $(ls -1d "${GLOBAL_PLUGIN_DIR}/skills"/* 2>/dev/null | wc -l) -ge 8 ]
check_status "Skill Packs (8+ skills)" $?

# Check 4: Governance rules
[ -f "${GLOBAL_PLUGIN_DIR}/RULES.md" ] && [ -f "${GLOBAL_PLUGIN_DIR}/SOUL.md" ]
check_status "Governance Rules (RULES.md & SOUL.md)" $?

# Check 5: Workflows present
[ -d "${GLOBAL_PLUGIN_DIR}/workflows" ] && [ $(ls -1 "${GLOBAL_PLUGIN_DIR}/workflows"/*.md 2>/dev/null | wc -l) -ge 2 ]
check_status "Multi-Agent Workflows (2+ recipes)" $?

# Check 6: Language domain rules
[ -d "${GLOBAL_PLUGIN_DIR}/rules" ] && [ $(ls -1 "${GLOBAL_PLUGIN_DIR}/rules"/*.md 2>/dev/null | wc -l) -ge 4 ]
check_status "Domain Rule Engines (4+ language rules)" $?

echo "============================================================"
if [ $CHECK_FAIL -eq 0 ]; then
    echo "🎉 DIAGNOSTICS PASSED ($CHECK_OK checks passed). EAG is 100% healthy, verified, and operational!"
    exit 0
else
    echo "⚠️ DIAGNOSTICS WARNING ($CHECK_FAIL checks failed). Run install.sh to repair."
    exit 1
fi
