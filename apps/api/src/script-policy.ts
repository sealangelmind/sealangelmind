export type ScriptDecision={allowed:boolean;reasons:string[]};
const blocked=[/base64\s*\.b64decode/i,/os\.system\s*\(/i,/subprocess\.(?:Popen|call|run)\s*\(/i,/while\s+true/i,/socket\s*\./i,/crypto.?miner/i];
export function inspectCustomScript(source:string,language:string):ScriptDecision{const reasons:string[]=[];if(!['python','bash','go'].includes(language))reasons.push('LANGUAGE_NOT_ALLOWED');if(Buffer.byteLength(source)>10*1024*1024)reasons.push('SIZE_LIMIT');if(!source.trim())reasons.push('EMPTY_SOURCE');for(const rule of blocked)if(rule.test(source))reasons.push(`BLOCKED_PATTERN:${rule.source}`);return {allowed:reasons.length===0,reasons};}
export const scriptQuota={cpuCores:0.5,memoryMb:512,diskMb:1024,timeoutSeconds:300,maxPerHour:10,network:'approved-targets-only'} as const;
