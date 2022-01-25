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

cat >> ./supabase-docker-compose/docker-compose.override.yml << 'EOF'

services:
  rest:
    image: postgrest/postgrest:v9.0.0
  api:
    depends_on:
      db:
        condition: service_healthy
      redis_db:
        condition: service_started
      rest:
        condition: service_started
    container_name: stadtpuls-api
    image: technologiestiftung/stadtpuls-api:v3.0.0
    ports:
      - "4000:4000"
    environment:
      SUPABASE_URL: http://kong:8000
      REDIS_URL: redis://redis_db:6379
      STAGE: test
      SUPABASE_SERVICE_ROLE_KEY: $SUPABASE_SERVICE_ROLE_KEY
      SUPABASE_ANON_KEY: $SUPABASE_ANON_KEY
      SUPABASE_MAX_ROWS: 3000
      PORT: 4000
      ISSUER: stadtpuls.com
      JWT_SECRET: $JWT_SECRET
      DATABASE_URL: "postgres://postgres:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/postgres?sslmode=disable"
      LOG_LEVEL: info
  redis_db:
    container_name: stadtpuls-redis
    image: redis:6.2.6-alpine
    ports:
      - "6379:6379"

EOF

cp ./supabase-docker-compose/.env.example ./supabase-docker-compose/.env

cat >> ./supabase-docker-compose/.env <<'EOF'
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYyNzIwNzUzMiwiZXhwIjoxNjkwMjc5NTMyLCJhdWQiOiIiLCJzdWIiOiIiLCJyb2xlIjoic2VydmljZV9yb2xlIn0.hfdXFZV5PdvUdo2xK0vStb1i97GJukSkRqfwd4YIh2M
SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYyNzIwODU0MCwiZXhwIjoxOTc0MzYzNzQwLCJhdWQiOiIiLCJzdWIiOiIiLCJyb2xlIjoiYW5vbiJ9.sUHErUOiKZ3nHQIxy-7jND6B80Uzf9G4NtMLmL6HXPQ

EOF