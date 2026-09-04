export const SIDEBAR = [
  'dashboard','mission-control','coverage','research','ai-center','knowledge','search','collaboration','saved-views','tags-notes','assets','tools','reports','workspaces','organizations','governance','findings','audit','operations','assurance','incidents','security','notifications','settings',
] as const;

export const ROUTE_AREAS = [
  '/', '/product','/features','/how-it-works','/bug-bounty','/for-researchers','/trust-center','/docs','/blog','/api-playground','/security','/pricing','/changelog','/roadmap','/status','/contact','/academy',
  '/legal/privacy','/legal/terms','/legal/cookies','/legal/acceptable-use','/legal/responsible-disclosure','/legal/data-processing',
  '/login','/register','/forgot-password','/reset-password','/verify-email','/mfa','/mfa-setup','/devices',
  '/dashboard','/mission-control','/coverage','/research','/assets','/tools','/ai-center','/agents','/playbooks','/evidence','/findings','/reports','/knowledge','/collaboration','/saved-views','/tags-notes','/workspaces','/organizations','/governance','/audit','/operations','/assurance','/incidents','/notifications','/security','/settings','/redteam','/purpleteam','/bugbounty','/privacy',
] as const;

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ToolManifest {
  id: string; name: string; version: string; category: string; tier: number;
  risk_level: RiskLevel; approval_required: boolean; description: string;
  execution: 'disabled' | 'safe-readonly' | 'sandboxed';
}

export const SAFE_TOOL_CATALOG: ToolManifest[] = [
  ['10-nuclei-templates','Nuclei Vulnerability Scanner','3.2.2','SCAN',2,'low',false,'Template-based assessment adapter; execution requires approved scope.','safe-readonly'],
  ['11-subfinder','Subfinder','2.x','RECON',1,'low',false,'Passive subdomain discovery adapter.','safe-readonly'],
  ['12-httpx','HTTPX','1.x','RECON',1,'low',false,'HTTP service probing adapter with rate limits.','safe-readonly'],
  ['13-naabu','Naabu','2.x','RECON',1,'medium',true,'Port discovery adapter; requires explicit approved targets.','sandboxed'],
  ['14-gitleaks','Gitleaks','8.x','RECON',1,'low',false,'Repository secret scanning.','safe-readonly'],
  ['15-trivy','Trivy','0.x','SCAN',1,'low',false,'Container/dependency vulnerability scanner.','safe-readonly'],
  ['16-katana','Katana','1.x','RECON',1,'medium',true,'Crawler adapter with scope enforcement.','sandboxed'],
  ['17-ffuf','FFUF','2.x','FUZZ',2,'high',true,'Fuzzing adapter disabled by default; approval and scope required.','sandboxed'],
  ['18-cloudfox','CloudFox','1.x','RECON',2,'medium',true,'Cloud posture enumeration adapter.','sandboxed'],
  ['19-amass','Amass','4.x','RECON',1,'low',false,'Asset enumeration adapter.','safe-readonly'],
  ['20-dalfox','Dalfox','2.x','EXPLOIT',3,'high',true,'Active validation adapter; non-destructive checks only.','disabled'],
  ['21-sqlmap','SQLMap','1.x','EXPLOIT',4,'critical',true,'Active exploitation is intentionally disabled in this implementation.','disabled'],
  ['22-ssrfmap','SSRFMap','1.x','EXPLOIT',4,'critical',true,'Exploit execution is intentionally disabled.','disabled'],
  ['23-jwt-tool','JWT Tool','2.x','EXPLOIT',3,'high',true,'Token attack automation is intentionally disabled.','disabled'],
  ['24-interactsh','Interactsh','1.x','SCAN',2,'high',true,'Out-of-band callback infrastructure requires explicit lab-only policy.','disabled'],
  ['25-custom-script','Custom Script','1.0','CUSTOM',4,'critical',true,'Uploads require static analysis and are non-networking by policy.','disabled'],
];

export const DENIED_CAPABILITIES = new Set([
  'implant-generation','credential-harvest','persistence','evasion-bypass','lateral-movement','exfiltration','exploit-execution','domain-fronting',
]);
