import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const id = () => crypto.randomUUID();
const stores = {
  findings: new Map<string, any>(), evidence: new Map<string, any>(), reports: new Map<string, any>(), assets: new Map<string, any>(), research: new Map<string, any>()
};
const org = z.string().uuid();
const createSchema = z.object({ organizationId: org, title: z.string().min(1).max(240), description: z.string().max(10000).default(''), severity: z.string().optional(), metadata: z.record(z.unknown()).optional() });

export async function registerCoreRoutes(app: FastifyInstance) {
  for (const resource of Object.keys(stores) as Array<keyof typeof stores>) {
    app.get(`/api/v1/${resource}`, async (req, reply) => {
      const q = req.query as { organizationId?: string }; const parsed = org.safeParse(q.organizationId);
      if (!parsed.success) return reply.code(400).send({ ok:false,error:'INVALID_ORGANIZATION' });
      return { ok:true,data:[...stores[resource].values()].filter((x:any)=>x.organizationId===parsed.data) };
    });
    app.post(`/api/v1/${resource}`, async (req, reply) => {
      const parsed = createSchema.safeParse(req.body); if (!parsed.success) return reply.code(400).send({ ok:false,error:'INVALID_INPUT',issues:parsed.error.issues });
      const now = new Date().toISOString(); const row = { id:id(), ...parsed.data, resource, createdAt:now, updatedAt:now };
      stores[resource].set(row.id,row); return reply.code(201).send({ ok:true,data:row });
    });
    app.get(`/api/v1/${resource}/:id`, async (req, reply) => {
      const q=req.query as { organizationId?: string }; const parsed=org.safeParse(q.organizationId); const row=stores[resource].get((req.params as {id:string}).id);
      if (!parsed.success) return reply.code(400).send({ok:false,error:'INVALID_ORGANIZATION'}); if (!row || row.organizationId!==parsed.data) return reply.code(404).send({ok:false,error:'NOT_FOUND'}); return {ok:true,data:row};
    });
  }
}
