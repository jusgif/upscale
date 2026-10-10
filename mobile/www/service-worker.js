const SHELL_CACHE="upscayl-shell-v2";
const RUNTIME_CACHE="upscayl-runtime-v1";
const MODEL_CACHE="upscayl-local-model-v1";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",event=>event.waitUntil((async()=>{const c=await caches.open(SHELL_CACHE);await c.addAll(SHELL);await self.skipWaiting()})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith("upscayl-")&&![SHELL_CACHE,RUNTIME_CACHE,MODEL_CACHE].includes(key))await caches.delete(key);await self.clients.claim()})()));
self.addEventListener("fetch",event=>{
 const req=event.request;if(req.method!=="GET")return;
 const url=new URL(req.url);
 if(url.hostname==="huggingface.co"||url.hostname==="cdn-lfs.huggingface.co"||url.hostname==="cas-bridge.xethub.hf.co")return;
 if(url.origin===self.location.origin){
   event.respondWith((async()=>{const cache=await caches.open(SHELL_CACHE);const hit=await cache.match(req);if(hit)return hit;try{const res=await fetch(req);if(res.ok)cache.put(req,res.clone());return res}catch(e){return (await cache.match("./index.html"))||Response.error()}})());
 }else if(url.hostname==="cdn.jsdelivr.net"){
   event.respondWith((async()=>{const cache=await caches.open(RUNTIME_CACHE);const hit=await cache.match(req);if(hit)return hit;const res=await fetch(req);if(res.ok&&res.type!=="opaque")await cache.put(req,res.clone());return res})());
 }
});
