# Angelmind V4.0

Unified Security Operations Platform blueprint implementation for `sealangelmind/sealangelmind`.

## Scope
This repository tracks the V4.0 architecture from the master blueprint: 14 domains, 24 sidebar areas, a unified knowledge graph, Fastify API, Next.js web app, Supabase PostgreSQL, Redis/BullMQ, Cloudflare delivery/storage, and optional Firebase notifications.

The implementation intentionally keeps dangerous offensive capabilities non-operational: C2 implants, credential-harvesting phishing, persistence/evasion, exploit execution, lateral movement and exfiltration are represented as policy-governed interfaces/stubs only. Safe assessment, evidence, reporting, governance, approvals and audit workflows are first-class.

## Monorepo

- `apps/web` — Next.js App Router frontend.
- `apps/api` — Fastify API service.
- `packages/shared` — shared types/domain metadata.
- `prisma/schema.prisma` — primary data model for Supabase PostgreSQL.
- `infra/` — Railway, Cloudflare, Supabase and Firebase deployment templates.
- `.github/workflows/` — CI and deployment workflows.

## Local development

```bash
corepack enable
pnpm install
pnpm dev
```

API health: `GET /health` and `GET /api/v1/health`.

## Launch architecture

Cloudflare Pages/Workers/R2/KV at the edge, Supabase PostgreSQL/Auth/Realtime as the primary data plane, Railway for Fastify/Python/worker compute and Redis/BullMQ, and Firebase FCM/Firestore as optional notification/ops services, matching the blueprint's infrastructure split. The blueprint targets a free/low-cost MVP and phases additional databases only when required.

## Readiness

GitHub source-of-truth is `main`. Infrastructure templates are safe to apply after secrets/project identifiers are supplied. No secrets are committed.
