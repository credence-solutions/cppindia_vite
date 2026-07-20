#!/usr/bin/env bash
# Build the frontend and package dist/ into a versioned release zip.
# Usage: release/release.sh <major.minor.hotfix>

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MANIFEST_FILE="$SCRIPT_DIR/manifest.txt"
OUTPUT_DIR="$SCRIPT_DIR/output"

usage() {
  echo "Usage: $0 <major.minor.hotfix>" >&2
  echo "Example: $0 1.2.0" >&2
}

if [[ $# -ne 1 ]]; then
  usage
  exit 1
fi

VERSION="$1"
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: version '$VERSION' is not in major.minor.hotfix format." >&2
  usage
  exit 1
fi

cd "$PROJECT_ROOT/frontend"

echo "Building frontend..."
npm run build

if [[ ! -f "$MANIFEST_FILE" ]]; then
  echo "Error: manifest file not found: $MANIFEST_FILE" >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
ZIP_NAME="release_${VERSION}.zip"
ZIP_PATH="$OUTPUT_DIR/$ZIP_NAME"
rm -f "$ZIP_PATH"

STAGE_DIR="$(mktemp -d)"
trap 'rm -rf "$STAGE_DIR"' EXIT

echo "Staging release contents..."
while IFS= read -r line; do
  # Strip comments and surrounding whitespace, skip blanks.
  entry="${line%%#*}"
  entry="$(echo -n "$entry" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
  [[ -z "$entry" ]] && continue

  src="$PROJECT_ROOT/$entry"
  if [[ ! -e "$src" ]]; then
    echo "Warning: '$entry' does not exist and will be skipped." >&2
    continue
  fi

  dest="$STAGE_DIR/$entry"
  mkdir -p "$(dirname "$dest")"
  cp -R "$src" "$dest"
done < "$MANIFEST_FILE"

GIT_COMMIT="$(git rev-parse HEAD 2>/dev/null || echo UNKNOWN)"
{
  echo "Version: $VERSION"
  echo "Git Commit: $GIT_COMMIT"
  echo "Generated on: $(date '+%Y-%m-%d %H:%M:%S')"
} > "$STAGE_DIR/release_info.txt"

echo "Creating zip..."
(cd "$STAGE_DIR" && zip -r -q "$ZIP_PATH" .)

echo "Release package created: $ZIP_PATH"
