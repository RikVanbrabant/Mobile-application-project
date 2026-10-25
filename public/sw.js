self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

///todo: Add fetch event listener to cache requests and serve cached responses.

