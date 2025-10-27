const CACHE_NAME = "tailwind-pwa-v1";
const OFFLINE_URL = "offline.html";

const ASSETS = [
    "./",
    "index.html",
    "offline.html",
    "manifest.json",
    "assets/Logo.png"
];

// Install event
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Fetch event
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((cached) => {
            return cached || fetch(e.request).catch(() => caches.match(OFFLINE_URL));
        })
    );
});

// Activate event
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
        )
    );
});
