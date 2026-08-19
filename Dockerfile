# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS runtime

ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NODE_ENV=production \
    PORT=3001 \
    HOSTNAME=0.0.0.0

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable \
    && corepack prepare pnpm@10.18.1 --activate

WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile

ARG NEXT_PUBLIC_APP_URL=http://localhost:3000
ARG NEXT_PUBLIC_WEB_URL=http://localhost:3001
ARG NEXT_PUBLIC_MARKET

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL \
    NEXT_PUBLIC_MARKET=$NEXT_PUBLIC_MARKET

RUN pnpm --filter web build

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3001/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["pnpm", "--filter", "web", "start"]
