const CACHE_NAME = "PilihPintar App";
const urlsToCache = [
  "/",
  "/css/bootstrap.css",
  "/css/font-awesome.min.css",
  "/css/responsive.css",
  "/css/style.css",
  "/css/style.css.map",
  "/css/style.scss",
  "/fonts/fontawesome-webfont.ttf",
  "/fonts/fontawesome-webfont.woff",
  "/fonts/fontawesome-webfont.woff2",
  "/fonts/octin_sports_rg.ttf",
  "/images/background.webp",
  "/images/shopee.webp",
  "/images/tiktok.webp",
  "/images/icon-192x192.png",
  "/images/icon-512x512.png",
  "/images/tokopedia.webp",
  "/images/lazada.webp",
  "/js/bootstrap.js",
  "/js/custom.js",
  "/js/jquery-3.4.1.min.js",
  "/js/script.js",
];

// Install event: PWA
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Failed to cache:", error);
      })
  );
});

// Activate event: hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch((error) => {
        console.error("Failed to activate:", error);
      })
  );
});

// Fetch event: static assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
