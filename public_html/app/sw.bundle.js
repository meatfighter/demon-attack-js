(()=>{"use strict";const e="demon-attack-2024-11-21";self.addEventListener("activate",(t=>{t.waitUntil(caches.keys().then((t=>Promise.all(t.filter((t=>t!==e)).map((e=>caches.delete(e)))))).then((()=>self.clients.claim())))})),self.addEventListener("fetch",(t=>{t.request.url.startsWith("http")&&t.respondWith(caches.open(e).then((e=>e.match(t.request).then((s=>{if(s)return s;const n=new URL(t.request.url).hostname!==self.location.hostname?{mode:"cors",credentials:"omit"}:{};return async function(e,t={}){for(let s=4;s>=0;--s)try{const s=await fetch(e,t);if(!s.ok)continue;const n=s.headers.get("Content-Length"),a=n?parseInt(n,10):0,r=a>0&&e.url.includes("resources.zip"),c=s.body;if(null===c)continue;const o=c.getReader(),h=[];let l=0;for(;;){const{done:e,value:t}=await o.read();if(e)break;h.push(t),l+=t.length,r&&self.clients.matchAll().then((e=>{e.forEach((e=>{e.postMessage(l/a)}))}))}const i=new Uint8Array(l);let u=0;return h.forEach((e=>{i.set(e,u),u+=e.length})),new Response(i,{status:200,statusText:"OK",headers:s.headers})}catch(e){if(0===s)throw e}throw new Error("Failed to fetch.")}(t.request,n).then((s=>(e.put(t.request,s.clone()).then((e=>{})),s)))})))).catch((()=>new Response("Service Unavailable",{status:503}))))}))})();