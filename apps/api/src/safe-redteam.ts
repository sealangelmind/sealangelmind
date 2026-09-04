export type ApprovedScope={organizationId:string;targets:string[];approved:boolean;expiresAt:string};
export function canRunAssessment(scope:ApprovedScope,target:string){return scope.approved&&Date.parse(scope.expiresAt)>Date.now()&&scope.targets.includes(target);}
export function simulateCapability(name:string,input:unknown){return {mode:'simulation',capability:name,input,executed:false,reason:'Non-operational safety boundary'};}
export const safeCapabilities=['scope-validation','asset-discovery-recording','finding-triage','evidence-analysis','detection-gap-analysis','scenario-simulation'] as const;
