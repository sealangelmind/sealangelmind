import { z } from 'zod';

export const pageSize = z.coerce.number().int().min(1).max(100).default(25);
export const cursorSchema = z.string().uuid().optional();
export const listQuery = z.object({ organizationId: z.string().uuid(), limit: pageSize, cursor: cursorSchema, q: z.string().trim().max(200).optional() });

export type Stored<T extends object> = T & { id: string; organizationId: string; createdAt: string; updatedAt: string };

export class TenantStore<T extends object> {
  private rows = new Map<string, Stored<T>>();
  create(organizationId: string, value: T): Stored<T> { const now=new Date().toISOString(); const row={...value,id:crypto.randomUUID(),organizationId,createdAt:now,updatedAt:now}; this.rows.set(row.id,row); return row; }
  list(organizationId: string, q?: string, limit=25, cursor?: string) { let rows=[...this.rows.values()].filter(x=>x.organizationId===organizationId); if(q){const n=q.toLowerCase(); rows=rows.filter(x=>JSON.stringify(x).toLowerCase().includes(n));} if(cursor){const i=rows.findIndex(x=>x.id===cursor); if(i>=0) rows=rows.slice(i+1);} const data=rows.slice(0,limit); return {data,nextCursor:data.length===limit?data.at(-1)?.id:null}; }
  get(organizationId:string,id:string){const row=this.rows.get(id);return row?.organizationId===organizationId?row:null;}
  update(organizationId:string,id:string,patch:Partial<T>){const row=this.get(organizationId,id);if(!row)return null;const next={...row,...patch,id,organizationId,updatedAt:new Date().toISOString()};this.rows.set(id,next);return next;}
  remove(organizationId:string,id:string){const row=this.get(organizationId,id);if(!row)return false;this.rows.delete(id);return true;}
}

export const auditEvents = new TenantStore<{actorId:string;action:string;resource:string;metadata?:unknown}>();
export function audit(organizationId:string,actorId:string,action:string,resource:string,metadata?:unknown){return auditEvents.create(organizationId,{actorId,action,resource,metadata});}
