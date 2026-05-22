const CACHE_NAME = "win12-cache-v1";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/desktop.html",
  "/style.css",
  "/script.js",
  "/favicon.ico"
];

// Install
self.addEventListener("install", event => {
  console.log("[SW] Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );

  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  console.log("[SW] Activating...");

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {

      // Return cached file if exists
      if (cached) {
        return cached;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then(response => {

          // Clone response
          const responseClone = response.clone();

          // Save dynamic files
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => {

          // Offline fallback
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});
