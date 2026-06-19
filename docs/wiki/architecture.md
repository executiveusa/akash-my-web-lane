# System Architecture — My Web Lane

## Monorepo Map

```
akash-my-web-lane-REAL/
├── apps/
│   ├── api/              ← Next.js API — all serverless endpoints
│   ├── web/              ← Public website (if separate from myweblane.html)
│   ├── pi-dashboard/     ← Akash's private monitoring dashboard
│   └── docs/             ← Public-facing docs site
├── packages/
│   ├── synthia/          ← SYNTHIA agent bridge (analyzer/designer/builder/judge)
│   ├── migrations/       ← Quality gate, retry engine, circuit breaker
│   ├── payments/         ← Razorpay + Stripe wrappers
│   ├── notifications/    ← WhatsApp (Twilio) + email
│   ├── database/         ← Prisma ORM wrapper
│   ├── observability/    ← Sentry + structured logging
│   └── rate-limit/       ← Upstash Redis rate limiting
├── sql/
│   └── schema.sql        ← Neon DB schema (run once)
├── docs/wiki/            ← LLM knowledge base
└── myweblane.html        ← Single-file landing page (no build needed)
```

## Data Flow

```
                 LANDING PAGE
                 myweblane.html
                     │
              "Run Free Audit" CTA
                     │
                     ▼
         POST /api/intake ──► Firecrawl crawl
                     │        + Lighthouse audit
                     │
               DB: audit_leads
                     │
              (User pays via Razorpay)
                     │
                     ▼
     POST /api/webhooks/razorpay
                     │
         Verify HMAC signature
                     │
               DB: migration_jobs  ← status: 'queued'
                     │
                     ▼
          ┌── Migration Worker (polling) ──┐
          │   apps/api/workers/            │
          │   migration-worker.ts          │
          └───────────────────────────────┘
                     │
         ┌───────────▼───────────┐
         │   STEP 1: Analyze     │ packages/synthia/src/analyzer.ts
         │   Firecrawl + LH      │
         └───────────────────────┘
                     │
         ┌───────────▼───────────┐
         │   STEP 2: Design      │ packages/synthia/src/designer.ts
         │   12-agent Council    │ 3 variations → scoring → synthesis
         └───────────────────────┘
                     │
         ┌───────────▼───────────┐
         │   STEP 3: Build       │ packages/synthia/src/builder.ts
         │   Astro site gen      │ + Cloudflare Direct Upload
         └───────────────────────┘
                     │
         ┌───────────▼───────────┐
         │   STEP 4: Judge       │ packages/synthia/src/judge.ts
         │   UDEC scoring        │ Threshold: 7.5 auto, 8.5 premium
         └───────────────────────┘
                     │
              PASS? ─┼─ FAIL?
              │            │
              ▼            ▼
         Deploy      awaiting_review
         Cloudflare  (Akash approves in
         Pages       Pi Dashboard)
              │
              ▼
    POST /api/dashboard/approve/[jobId]  ← Akash clicks
              │
              ▼
         status: 'queued' @ step 'deploy'
              │
              ▼
         Live URL delivered via WhatsApp
```

## Key Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `RAZORPAY_KEY_ID` | Razorpay API key |
| `RAZORPAY_KEY_SECRET` | Razorpay API secret |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook HMAC secret |
| `TWILIO_ACCOUNT_SID` | WhatsApp notifications |
| `TWILIO_AUTH_TOKEN` | WhatsApp notifications |
| `OWNER_WHATSAPP` | Akash's WhatsApp number |
| `OPENROUTER_API_KEY` | LLM gateway (SYNTHIA) |
| `FIRECRAWL_API_KEY` | Web crawler for WP sites |
| `CLOUDFLARE_ACCOUNT_ID` | CF Pages deployment target |
| `CLOUDFLARE_API_TOKEN` | CF deployment auth |

## Tech Stack Decisions

| Choice | Reasoning |
|---|---|
| **Next.js** (API + Dashboard) | Full-stack, serverless, Vercel native |
| **Astro** (output) | 0KB JS by default, perfect Lighthouse scores |
| **Cloudflare Pages** (deployment target) | Edge-native, fastest TTFB globally |
| **Neon** (Postgres) | Serverless Postgres, perfect for Vercel |
| **OpenRouter** (LLM) | Model aliasing — swap models without code changes |
| **Firecrawl** (crawler) | Best-in-class WP content extraction |
| **Razorpay** (India payments) | INR native, UPI support, lowest fees |
| **Twilio WhatsApp** (notifications) | WhatsApp is the primary communication channel in India |
