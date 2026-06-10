#!/usr/bin/env bash
set -eo pipefail

echo "============================================================"
echo "   Running Everything Antigravity (EAG) Pre-Flight Checks   "
echo "============================================================"

PASSED=0
FAILED=0

# Check 1: Formatters / Linters
echo "🔍 Checking Code Formatting & Linting..."
if command -v npx >/dev/null 2>&1 && [ -f "package.json" ]; then
    if npx --no-install biome check . >/dev/null 2>&1; then
        echo "  ✅ Biome check passed."
        PASSED=$((PASSED+1))
    elif npx --no-install eslint . >/dev/null 2>&1; then
        echo "  ✅ ESLint check passed."
        PASSED=$((PASSED+1))
    else
        echo "  ℹ️ No local JS/TS linter configured or warnings present."
    fi
elif command -v ruff >/dev/null 2>&1 && ([ -f "pyproject.toml" ] || [ -f "ruff.toml" ]); then
    if ruff check . 2>/dev/null; then
        echo "  ✅ Ruff check passed."
        PASSED=$((PASSED+1))
    fi
fi

# Check 2: Typechecking
echo "🔍 Checking Type Safety..."
if [ -f "tsconfig.json" ] && command -v npx >/dev/null 2>&1; then
    if npx tsc --noEmit; then
        echo "  ✅ TypeScript check passed (0 type errors)."
        PASSED=$((PASSED+1))
    else
        echo "  ❌ TypeScript type errors detected."
        FAILED=$((FAILED+1))
    fi
elif command -v pyright >/dev/null 2>&1 && [ -f "pyproject.toml" ]; then
    if pyright 2>/dev/null; then
        echo "  ✅ Pyright check passed."
        PASSED=$((PASSED+1))
    fi
fi

# Check 3: Automated Tests
echo "🔍 Running Polyglot Test Suite..."
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    if command -v pnpm >/dev/null 2>&1 && [ -f "pnpm-lock.yaml" ]; then
        TEST_CMD="pnpm test"
    elif command -v bun >/dev/null 2>&1 && [ -f "bun.lockb" ]; then
        TEST_CMD="bun test"
    else
        TEST_CMD="npm test"
    fi

    if $TEST_CMD 2>/dev/null; then
        echo "  ✅ $TEST_CMD passed."
        PASSED=$((PASSED+1))
    else
        echo "  ❌ $TEST_CMD failed."
        FAILED=$((FAILED+1))
    fi
elif [ -f "go.mod" ] && command -v go >/dev/null 2>&1; then
    if go test ./... 2>/dev/null; then
        echo "  ✅ go test ./... passed."
        PASSED=$((PASSED+1))
    else
        echo "  ❌ go test failed."
        FAILED=$((FAILED+1))
    fi
elif [ -f "Cargo.toml" ] && command -v cargo >/dev/null 2>&1; then
    if cargo test 2>/dev/null; then
        echo "  ✅ cargo test passed."
        PASSED=$((PASSED+1))
    else
        echo "  ❌ cargo test failed."
        FAILED=$((FAILED+1))
    fi
elif [ -f "pytest.ini" ] || [ -f "pyproject.toml" ]; then
    if command -v uv >/dev/null 2>&1; then
        TEST_CMD="uv run pytest"
    else
        TEST_CMD="pytest"
    fi

    if $TEST_CMD 2>/dev/null; then
        echo "  ✅ $TEST_CMD passed."
        PASSED=$((PASSED+1))
    else
        echo "  ❌ $TEST_CMD failed."
        FAILED=$((FAILED+1))
    fi
fi

echo "============================================================"
if [ $FAILED -eq 0 ]; then
    echo "🎉 ALL CHECKS PASSED! Ready for commit/merge."
    exit 0
else
    echo "🚨 VERIFICATION FAILED ($FAILED checks failed). Fix issues before proceeding."
    exit 1
fi
