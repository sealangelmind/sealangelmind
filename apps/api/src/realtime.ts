type Listener<T>=(event:T)=>void;
export class RealtimeBus<T>{private listeners=new Set<Listener<T>>();subscribe(listener:Listener<T>){this.listeners.add(listener);return()=>this.listeners.delete(listener)}publish(event:T){for(const listener of this.listeners)listener(event)}}
export type PlatformEvent={organizationId:string;topic:'finding'|'execution'|'notification'|'report';type:string;payload:unknown;at:string};
export const platformEvents=new RealtimeBus<PlatformEvent>();
export function emitEvent(event:Omit<PlatformEvent,'at'>){platformEvents.publish({...event,at:new Date().toISOString()})}
