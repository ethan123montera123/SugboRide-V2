self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("sugboride-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/dashboard.html",
                "/manifest.json",
                "/assets/Logo.png"
            ]);
        })
    );
    console.log("Service Worker Installed ✅");
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
