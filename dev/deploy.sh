#!/bin/sh
# Construit puis dépose le site sur github.com/yous-em/officina (sa progression n'est jamais touchée).
set -e
cd "$(dirname "$0")" && node build.js && node test/core.test.js | tail -1
R=${OFFICINA_REPO:-/home/claude/officina-repo}
[ -d "$R/.git" ] || git clone --depth 1 https://github.com/yous-em/officina "$R"
git -C "$R" pull -q --ff-only origin main || true
find "$R" -mindepth 1 -maxdepth 1 ! -name .git ! -name .nojekyll -exec rm -rf {} +
cp -r site/. "$R/"
cd "$R" && git add -A && git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "${1:-Mise à jour}

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01VKBHGSoEyCBpQZ3n98Ce4X" && git -c push.negotiate=true push -q origin HEAD:main && echo "Déposé sur GitHub"
