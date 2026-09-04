# Angelmind V4.0 launch checklist

This checklist follows the V4 blueprint infrastructure split: Cloudflare edge, Supabase primary database/auth/realtime, Railway compute/queue, Firebase optional notifications/ops. fileciteturn5file2L154-L181

## GitHub / source
- [x] `main` is the source-of-truth branch.
- [x] Monorepo structure: `apps/web`, `apps/api`, `packages/shared`, `prisma`, `supabase`, `firebase`.
- [x] CI workflow for typecheck/build.
- [x] Manual production workflow.
- [x] No secrets committed.

## Supabase
- [ ] Create production project.
- [ ] Set `DATABASE_URL` and Supabase Auth providers.
- [ ] Apply Prisma schema/migrations.
- [ ] Review tenant-specific RLS policies before enabling client-side data access.
- [ ] Enable Realtime for findings/executions/notifications as required by the blueprint. fileciteturn5file6L188-L192

## Railway
- [ ] Create API service from `railway.json` / `apps/api/Dockerfile`.
- [ ] Add Redis/Upstash for BullMQ.
- [ ] Configure `DATABASE_URL`, `REDIS_URL`, storage and AI secrets.
- [ ] Verify `/health`.
- [ ] Add worker/Python services when those workloads are connected.

## Cloudflare
- [ ] Create Pages project and deploy `apps/web/out`.
- [ ] Configure custom domain.
- [ ] Add R2 bucket for evidence/PDF storage.
- [ ] Add Turnstile to auth-facing forms.
- [ ] Add Workers only for edge functions actually required.

## Firebase (optional)
- [ ] Create Firebase project.
- [ ] Deploy `firebase/functions`.
- [ ] Configure FCM only after application events are wired.
- [ ] Keep Firestore deny-by-default until explicit rules are required.

## Go-live gate
Do not label the platform production-ready until authentication, tenant isolation, RLS, secrets, backups, smoke tests, and critical-path monitoring pass. The blueprint explicitly calls for security testing, load testing, accessibility testing, disaster-recovery testing, smoke tests and backup scheduling before go-live. fileciteturn5file1L99-L115
