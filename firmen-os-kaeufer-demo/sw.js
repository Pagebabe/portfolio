const CACHE='firmen-os-kaeufer-submission-v1';
const APP_SHELL=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon.svg'];

self.addEventListener('install',(event)=>{
  event.waitUntil(caches.open(CACHE).then((cache)=>cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate',(event)=>{
  event.waitUntil(caches.keys().then((keys)=>Promise.all(keys.filter((key)=>key!==CACHE).map((key)=>caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch',(event)=>{
  const request=event.request;
  const url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  if(!url.pathname.includes('/firmen-os-kaeufer-demo/'))return;
  event.respondWith(
    fetch(request).then((response)=>{
      const copy=response.clone();
      const control=(response.headers.get('cache-control')||'').toLowerCase();
      if(response.ok&&!control.includes('no-store')&&!control.includes('private')){
        caches.open(CACHE).then((cache)=>cache.put(request,copy));
      }
      return response;
    }).catch(()=>caches.match(request).then((cached)=>cached||caches.match('./index.html')))
  );
});
