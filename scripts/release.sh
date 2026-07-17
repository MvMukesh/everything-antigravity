#!/usr/bin/env bash
# =============================================================================
# scripts/release.sh — Automated Release Script for Everything Antigravity
# Usage: bash ./scripts/release.sh <new-version>
# Example: bash ./scripts/release.sh 2.1.0
# =============================================================================
set -eo pipefail

# ── Colors ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

log_info()    { echo -e "${CYAN}[INFO]${RESET}  $*"; }
log_ok()      { echo -e "${GREEN}[OK]${RESET}    $*"; }
log_warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
log_error()   { echo -e "${RED}[ERROR]${RESET} $*"; exit 1; }
log_section() { echo -e "\n${BOLD}${BLUE}══ $* ══${RESET}\n"; }

# ── Validate input ──────────────────────────────────────────────────────────
NEW_VERSION="${1:-}"
if [ -z "${NEW_VERSION}" ]; then
  log_error "Version argument required. Usage: bash ./scripts/release.sh <version>"
fi

# Strip leading 'v' if provided
NEW_VERSION="${NEW_VERSION#v}"
TAG="v${NEW_VERSION}"

log_section "EAG Release: ${TAG}"

# ── Safety checks ───────────────────────────────────────────────────────────
log_info "Checking git working tree is clean..."
if ! git diff --quiet || ! git diff --cached --quiet; then
  log_error "Working tree has uncommitted changes. Please commit or stash first."
fi

log_info "Checking current branch..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "${CURRENT_BRANCH}" != "main" && "${CURRENT_BRANCH}" != "dev" && "${CURRENT_BRANCH}" != release/* ]]; then
  log_warn "You are on branch '${CURRENT_BRANCH}'. Releases typically come from 'main' or 'release/*'."
  read -rp "Continue anyway? [y/N] " confirm
  [[ "${confirm}" =~ ^[Yy]$ ]] || log_error "Release aborted."
fi

log_info "Checking tag '${TAG}' does not already exist..."
if git tag -l | grep -q "^${TAG}$"; then
  log_error "Tag '${TAG}' already exists."
fi

# ── Step 1: Update VERSION file ─────────────────────────────────────────────
log_section "Step 1: Update VERSION"
CURRENT_VERSION=$(cat VERSION)
log_info "Current version: ${CURRENT_VERSION} → New version: ${NEW_VERSION}"
echo "${NEW_VERSION}" > VERSION
log_ok "VERSION updated to ${NEW_VERSION}"

# ── Step 2: Update package.json version ────────────────────────────────────
log_section "Step 2: Update package.json"
if command -v node &>/dev/null; then
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    pkg.version = '${NEW_VERSION}';
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  log_ok "package.json version updated to ${NEW_VERSION}"
else
  sed -i "s/\"version\": \".*\"/\"version\": \"${NEW_VERSION}\"/" package.json
  log_ok "package.json version updated (via sed)"
fi

# ── Step 3: Prompt for CHANGELOG confirmation ───────────────────────────────
log_section "Step 3: CHANGELOG.md"
log_warn "Please ensure CHANGELOG.md has a '## [${NEW_VERSION}]' section under [Unreleased]."
log_info "Opening CHANGELOG.md for review (press q to close)..."
if command -v less &>/dev/null; then
  less CHANGELOG.md || true
fi
read -rp "CHANGELOG.md is ready? [y/N] " changelog_ok
[[ "${changelog_ok}" =~ ^[Yy]$ ]] || log_error "Release aborted. Update CHANGELOG.md and re-run."

# ── Step 4: Verify everything passes ───────────────────────────────────────
log_section "Step 4: Run Verification Suite"
bash ./scripts/eag-doctor.sh
log_ok "EAG Doctor: passed"

# ── Step 5: Commit version bump ─────────────────────────────────────────────
log_section "Step 5: Commit Version Bump"
git add VERSION package.json CHANGELOG.md
git commit -m "chore(release): cut version ${TAG}"
log_ok "Committed version bump"

# ── Step 6: Create annotated tag ────────────────────────────────────────────
log_section "Step 6: Create Git Tag"
git tag -a "${TAG}" -m "Release ${TAG}

Everything Antigravity ${TAG}
See CHANGELOG.md for full release notes."
log_ok "Created annotated tag: ${TAG}"

# ── Step 7: Push ────────────────────────────────────────────────────────────
log_section "Step 7: Push to Remote"
if git remote | grep -q origin; then
  read -rp "Push branch + tag to origin? [y/N] " push_ok
  if [[ "${push_ok}" =~ ^[Yy]$ ]]; then
    git push origin "${CURRENT_BRANCH}"
    git push origin "${TAG}"
    log_ok "Pushed ${CURRENT_BRANCH} and ${TAG} to origin"
  else
    log_warn "Skipped push. Run manually:"
    echo "  git push origin ${CURRENT_BRANCH} && git push origin ${TAG}"
  fi
else
  log_warn "No 'origin' remote configured. Tag created locally only."
fi

# ── Done ────────────────────────────────────────────────────────────────────
log_section "Release Complete 🎉"
echo -e "${GREEN}${BOLD}Everything Antigravity ${TAG} is ready.${RESET}"
echo ""
echo "  Tag   : ${TAG}"
echo "  Branch: ${CURRENT_BRANCH}"
echo ""
echo "  Next steps:"
echo "    1. Create a GitHub Release from the tag at:"
echo "       https://github.com/MvMukesh/everything-antigravity/releases/new?tag=${TAG}"
echo "    2. Update [Unreleased] section in CHANGELOG.md for future work"
