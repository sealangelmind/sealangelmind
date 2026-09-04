export type SearchItem={id:string;organizationId:string;title:string;kind:string;updatedAt:string;tags?:string[]};
export function searchItems(items:SearchItem[],organizationId:string,q:string,kind?:string){const needle=q.trim().toLowerCase();return items.filter(x=>x.organizationId===organizationId&&(!kind||x.kind===kind)&&(!needle||`${x.title} ${(x.tags||[]).join(' ')}`.toLowerCase().includes(needle))).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}
export function savedView<T>(name:string,filter:(row:T)=>boolean){return {id:crypto.randomUUID(),name,filter};}
