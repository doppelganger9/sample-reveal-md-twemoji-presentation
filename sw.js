/**
 * Basic Service Worker implementation.
 * Caches all static resources found
 */
// When the SW is installed, it will populate the Browser's cache with some files.
// To check this, use the Developer Console / Application / cache.
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/_assets/android-chrome-192x192.png',
        '/_assets/android-chrome-512x512.png',
        '/_assets/apple-touch-icon.png',
        '/_assets/favicon-16x16.png',
        '/_assets/favicon-32x32.png',
        '/_assets/header-banner.png',
        '/_assets/header-logo.png',
        '/_assets/local.css',
        '/_assets/maskable_icon.png',
        '/_assets/site.webmanifest',
        '/android-chrome-192x192.png',
        '/android-chrome-512x512.png',
        '/apple-touch-icon.png',
        '/css/highlight/zenburn.css',
        '/dist/reset.css',
        '/dist/reveal.css',
        '/dist/reveal.esm.js',
        '/dist/reveal.esm.js.map',
        '/dist/reveal.js',
        '/dist/reveal.js.map',
        '/dist/theme/beige.css',
        '/dist/theme/black.css',
        '/dist/theme/blood.css',
        '/dist/theme/fonts/league-gothic/LICENSE',
        '/dist/theme/fonts/league-gothic/league-gothic.css',
        '/dist/theme/fonts/league-gothic/league-gothic.eot',
        '/dist/theme/fonts/league-gothic/league-gothic.ttf',
        '/dist/theme/fonts/league-gothic/league-gothic.woff',
        '/dist/theme/fonts/source-sans-pro/LICENSE',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.eot',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.ttf',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.woff',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.eot',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.ttf',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.woff',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.eot',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.ttf',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.woff',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.eot',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.ttf',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.woff',
        '/dist/theme/fonts/source-sans-pro/source-sans-pro.css',
        '/dist/theme/league.css',
        '/dist/theme/moon.css',
        '/dist/theme/night.css',
        '/dist/theme/serif.css',
        '/dist/theme/simple.css',
        '/dist/theme/sky.css',
        '/dist/theme/solarized.css',
        '/dist/theme/white.css',
        '/favicon-16x16.png',
        '/favicon-32x32.png',
        '/favicon.ico',
        '/header-banner.png',
        '/header-logo.png',
        '/index.html',
        '/maskable_icon.png',
        '/plugin/highlight/highlight.esm.js',
        '/plugin/highlight/highlight.js',
        '/plugin/highlight/monokai.css',
        '/plugin/highlight/plugin.js',
        '/plugin/highlight/zenburn.css',
        '/plugin/markdown/markdown.esm.js',
        '/plugin/markdown/markdown.js',
        '/plugin/markdown/plugin.js',
        '/plugin/math/katex.js',
        '/plugin/math/math.esm.js',
        '/plugin/math/math.js',
        '/plugin/math/mathjax2.js',
        '/plugin/math/mathjax3.js',
        '/plugin/math/plugin.js',
        '/plugin/notes/notes.esm.js',
        '/plugin/notes/notes.js',
        '/plugin/notes/plugin.js',
        '/plugin/notes/speaker-view.html',
        '/plugin/search/plugin.js',
        '/plugin/search/search.esm.js',
        '/plugin/search/search.js',
        '/plugin/zoom/plugin.js',
        '/plugin/zoom/zoom.esm.js',
        '/plugin/zoom/zoom.js',
        '/presentation.html',
        '/robots.txt'
      ]);
    })
  );
});

// SW intercepts "fetch" events, and as a Proxy can intercept a network request.
// thus we can use the cache to return cached stuff instead of making the request.
this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .catch(function() {
        // if CACHE MISSES, then let the request pass.
        return fetch(event.request).
          then(function(response) {
            // And cache this new response
            return caches.open('v1').then(function(cache) {
              cache.put(event.request, response.clone());
              return response;
            });
          }).catch(function() {
            // if fetch is in error, we can here provide a default resource file.
            // TODO
          });
      })
  );
});
