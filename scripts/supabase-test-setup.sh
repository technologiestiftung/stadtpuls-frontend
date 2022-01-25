#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
git config advice.detachedHead false
git clone \
  --depth 1  \
  --filter=blob:none  \
  --sparse \
  --branch v4.0.0 \
  https://github.com/technologiestiftung/stadtpuls-supabase.git supabase \
  && cd supabase \
  && git sparse-checkout set supabase-docker-compose

cat >> ./supabase-docker-compose/docker-compose.override.yml << EOF

services:
  api:
    image: technologiestiftung/stadtpuls-api:v3.0.0
    ports:
      - "4000:4000"
  redis:
    image: redis:6.2.6-alpine
    ports:
      - "6379:6379"
EOF

