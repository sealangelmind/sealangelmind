import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { z } from 'zod';
import { DENIED_CAPABILITIES, SAFE_TOOL_CATALOG } from '@angelmind/shared';

const app = Fastify({ logger: true });
await app.register(helmet);
await app.register(cors, { origin: true });

const envelope = (data: unknown) => ({ ok: true, data });
const guarded = (capability: string) => ({ ok: false, error: 'CAPABILITY_GUARDED', capability, message: 'This capability is intentionally non-operational in the base platform. Use an approved laboratory adapter.' });

app.get('/health', async () => envelope({ status: 'healthy', version: '4.0.0' }));
app.get('/api/v1/health', async () => envelope({ status: 'healthy', version: '4.0.0' }));

app.get('/api/v1/tools', async () => envelope(SAFE_TOOL_CATALOG));
app.get('/api/v1/tools/:id', async (req, reply) => {
  const id = (req.params as { id: string }).id;
  const tool = SAFE_TOOL_CATALOG.find(t => t[0] === id);
  if (!tool) return reply.code(404).send({ ok: false, error: 'NOT_FOUND' });
  return envelope(tool);
});

app.post('/api/v1/utf/runners/:id/execute', async (req, reply) => {
  const body = z.object({ target: z.string().min(1), approvalToken: z.string().optional() }).safeParse(req.body);
  if (!body.success) return reply.code(400).send({ ok: false, error: 'INVALID_INPUT' });
  return reply.code(202).send(envelope({ status: 'queued', runnerId: (req.params as { id: string }).id, policy: 'scope-and-approval-gated' }));
});

app.post('/api/v1/ai/analyze', async (req) => envelope({ status: 'queued', request: req.body ?? null }));
app.get('/api/v1/ai/providers', async () => envelope([{ id: 'managed', status: 'not_configured' }]));
app.get('/api/v1/knowledge', async () => envelope({ nodes: [], edges: [], message: 'Knowledge graph ready for evidence/finding relations.' }));
app.get('/api/v1/findings', async () => envelope([]));
app.get('/api/v1/evidence', async () => envelope([]));
app.get('/api/v1/reports', async () => envelope([]));
app.get('/api/v1/research', async () => envelope([]));
app.get('/api/v1/assets', async () => envelope([]));
app.get('/api/v1/notifications', async () => envelope([]));
app.get('/api/v1/audit', async () => envelope([]));

for (const route of [
  '/api/v1/redteam/implants', '/api/v1/redteam/implants/:id/beacon', '/api/v1/redteam/implants/:id/command',
  '/api/v1/redteam/phishing/campaigns', '/api/v1/redteam/phishing/campaigns/:id/send',
  '/api/v1/redteam/operations/:id/exfil', '/api/v1/redteam/operations/:id/persistence',
]) app.all(route, async (_req, reply) => reply.code(403).send(guarded('offensive-operation')));

for (const capability of DENIED_CAPABILITIES) app.post(`/api/v1/guard/${capability}`, async (_req, reply) => reply.code(403).send(guarded(capability)));

// Route-compatible fallback keeps the API surface aligned with the V4 blueprint while
// concrete persistence/auth handlers are added behind the same governance boundary.
app.all('/api/v1/*', async (req, reply) => reply.code(501).send({ ok: false, error: 'ROUTE_SCAFFOLD', method: req.method, path: req.url, message: 'Endpoint is declared by the V4 route surface but not yet backed by persistence.' }));

await app.listen({ port: Number(process.env.PORT ?? 8080), host: '0.0.0.0' });
