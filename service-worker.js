self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("sugboride-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/signup.html",
                "/dashboard.html",
                "/js/firebase.js",
                "/login.js",
                "/signup.js",
                "/dashboard.js"
            ]);
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
