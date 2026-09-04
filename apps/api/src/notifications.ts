import { TenantStore } from './platform';import { emitEvent } from './realtime';
export type Notification={userId:string;title:string;body:string;read:boolean;kind:string};
export const notifications=new TenantStore<Notification>();
export function notify(organizationId:string,value:Notification){const row=notifications.create(organizationId,value);emitEvent({organizationId,topic:'notification',type:'created',payload:row});return row;}
export function markRead(organizationId:string,id:string){return notifications.update(organizationId,id,{read:true});}
