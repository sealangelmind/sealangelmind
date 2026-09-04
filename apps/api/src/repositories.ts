export type RecordBase = { id: string; organizationId: string; createdAt: string; updatedAt: string };

export class InMemoryRepository<T extends RecordBase> {
  private readonly rows = new Map<string, T>();
  list(organizationId: string) { return [...this.rows.values()].filter(row => row.organizationId === organizationId); }
  get(organizationId: string, id: string) { const row = this.rows.get(id); return row?.organizationId === organizationId ? row : undefined; }
  create(row: T) { this.rows.set(row.id, row); return row; }
  update(organizationId: string, id: string, patch: Partial<T>) {
    const row = this.get(organizationId, id); if (!row) return undefined;
    const next = { ...row, ...patch, id: row.id, organizationId: row.organizationId, updatedAt: new Date().toISOString() } as T;
    this.rows.set(id, next); return next;
  }
}

export type AuditEvent = RecordBase & { actorId: string; action: string; resource: string; metadata?: unknown };
export const auditRepository = new InMemoryRepository<AuditEvent>();
