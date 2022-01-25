#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

git clone \
  --depth 1  \
  --filter=blob:none  \
  --sparse \
  --branch v4.0.0 \
  https://github.com/technologiestiftung/stadtpuls-supabase.git supabase \
  && cd supabase \
  && git sparse-checkout set supabase-docker-compose