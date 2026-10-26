#!/bin/sh
# Builds the published files from the sources in tools/ (the sources are also used for the Claude preview).
set -e
cd "$(dirname "$0")/.."
python3 tools/build.py tools/site-src.html public/index.html
python3 tools/build.py tools/hq-src.html public/hq/index.html
sed -i 's/<html lang="nl">/<html lang="nl">/' public/hq/index.html
echo "built public/index.html and public/hq/index.html"
