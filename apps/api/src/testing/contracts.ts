import { describe,it,expect } from 'vitest';
import { inspectCustomScript } from '../script-policy';
import { validateDag } from '../chain';
describe('platform contracts',()=>{it('rejects unsafe custom script patterns',()=>expect(inspectCustomScript('import socket','python').allowed).toBe(false));it('rejects cyclic chains',()=>expect(validateDag({id:'550e8400-e29b-41d4-a716-446655440000',organizationId:'550e8400-e29b-41d4-a716-446655440001',name:'x',nodes:[{id:'a',type:'action',next:['b'],config:{}},{id:'b',type:'action',next:['a'],config:{}}]}).valid).toBe(false));});
