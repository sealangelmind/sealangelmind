import { z } from 'zod';

export const roleSchema = z.enum(['OWNER','ADMIN','ANALYST','VIEWER']);
export type Role = z.infer<typeof roleSchema>;

export const mutationSchema = z.object({
  organizationId: z.string().uuid(),
  actorId: z.string().uuid(),
  action: z.string().min(3).max(120),
  reason: z.string().min(3).max(1000).optional(),
  approvalToken: z.string().min(8).optional(),
});

export function requiresApproval(action: string) {
  return /execute|send|delete|export|deploy/i.test(action);
}

export function authorize(role: Role, action: string) {
  if (role === 'OWNER' || role === 'ADMIN') return true;
  if (role === 'ANALYST') return !/delete|deploy|role/i.test(action);
  return !/create|update|delete|execute|send|deploy/i.test(action);
}

export function governanceDecision(input: z.infer<typeof mutationSchema>, role: Role) {
  if (!authorize(role, input.action)) return { allowed: false, reason: 'ROLE_DENIED' } as const;
  if (requiresApproval(input.action) && !input.approvalToken) return { allowed: false, reason: 'APPROVAL_REQUIRED' } as const;
  return { allowed: true } as const;
}
