const cacheName = 'cache2'; // Change value to force update

self.addEventListener('install', (event) => {
  // Kick out the old service worker
  self.skipWaiting();

  event.waitUntil(
      caches.open(cacheName).then((cache) => {
        return cache.addAll([
          './',
          './index.html', // Main HTML file
          './manifest.json', // Manifest file
          './pwa_register.js',
          './frontend/static/css/index.css', // Main CSS file
          './frontend/static/css/third_party/simplemde.css',
          './frontend/static/js/js_pwa/index.js', // Main JS file
          './frontend/static/js/third_party/adapter.js',
          './frontend/static/js/third_party/simplemde.js',
          './frontend/static/js/js_pwa/text_handlers/cleanUp.js',
          './frontend/static/js/js_pwa/text_handlers/upload.js',
          './frontend/static/js/js_pwa/text_handlers/save.js',
          './frontend/static/js/js_pwa/event_listeners' +
          '/bindAllEventListeners.js',
          './frontend/static/images/apple-touch-icon-144x144.png',
        ]);
      }),
  );
});

self.addEventListener('activate', (event) => {
  // Delete any non-current cache
  event.waitUntil(
      caches.keys().then((keys) => {
        Promise.all(
            keys.map((key) => {
              if (![cacheName].includes(key)) {
                return caches.delete(key);
              }
            }),
        );
      }),
  );
});

/**
 * Offline-first, cache-first strategy
 * Kick off two asynchronous requests, one to the cache and one to the network
 * If there's a cached version available, use it,
 * but fetch an update for next time.
 * Gets data on screen as quickly as possible,
 * then updates once the network has returned the latest data.
 */
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) {
    // skip request
    return;
  }
  event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }),
  );
});
