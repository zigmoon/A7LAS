// Updated SW after asset reorganization (css/ & js/ folders)
const CORE_CACHE = 'a7las-core-v11';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/a7las-inline.css',
  '/js/script.js',
  '/js/pwa-script.js'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CORE_CACHE).then(c => c.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CORE_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(r => r || fetch(evt.request))
  );
});