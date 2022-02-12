/**
 * Basic Service Worker implementation.
 * Caches all static resources found
 * from https://googlechrome.github.io/samples/service-worker/basic/
 */
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
          'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/android-chrome-192x192.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/android-chrome-512x512.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/apple-touch-icon.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/favicon-16x16.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/favicon-32x32.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/header-banner.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/header-logo.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/local.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/maskable_icon.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/_assets/site.webmanifest',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/android-chrome-192x192.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/android-chrome-512x512.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/apple-touch-icon.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/css/highlight/zenburn.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/reset.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/reveal.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/reveal.esm.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/reveal.esm.js.map',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/reveal.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/reveal.js.map',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/beige.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/black.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/blood.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/league-gothic/LICENSE',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/league-gothic/league-gothic.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/league-gothic/league-gothic.eot',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/league-gothic/league-gothic.ttf',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/league-gothic/league-gothic.woff',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/LICENSE',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.eot',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.ttf',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.woff',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.eot',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.ttf',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.woff',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.eot',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.ttf',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.woff',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.eot',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.ttf',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.woff',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/fonts/source-sans-pro/source-sans-pro.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/league.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/moon.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/night.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/serif.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/simple.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/sky.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/solarized.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/dist/theme/white.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/favicon-16x16.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/favicon-32x32.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/favicon.ico',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/header-banner.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/header-logo.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/index.html',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/maskable_icon.png',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/highlight/highlight.esm.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/highlight/highlight.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/highlight/monokai.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/highlight/plugin.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/highlight/zenburn.css',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/markdown/markdown.esm.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/markdown/markdown.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/markdown/plugin.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/math/katex.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/math/math.esm.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/math/math.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/math/mathjax2.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/math/mathjax3.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/math/plugin.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/notes/notes.esm.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/notes/notes.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/notes/plugin.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/notes/speaker-view.html',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/search/plugin.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/search/search.esm.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/search/search.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/zoom/plugin.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/zoom/zoom.esm.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/plugin/zoom/zoom.js',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/presentation.html',
        'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation/robots.txt'
];

// The install handler takes care of precaching the resources we always need.
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())    
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
