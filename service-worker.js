const CACHE_NAME = "sugbo-ride-cache-v1";

const ASSETS_TO_CACHE = [
  "/",
  "/login.html",
  "/index.html",
  "/dashboard.html",
  "/account.html",
  "/fire.html",
  "/signup.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "https://cdn.tailwindcss.com" 
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch Handler
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => caches.match("/login.html"))
      );
    })
  );
});
