/**
 * FORGE Service Worker
 * Стратегия: Cache First для статики, Network First для остального
 */

const VERSION = 'forge-v1.0.0';
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

// Файлы которые кэшируем сразу при установке
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/manifest.json',
  '/assets/icons/favicon.svg',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

// Установка — кэшируем основные файлы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Активация — удаляем старые кэши
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => !key.startsWith(VERSION))
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Стратегия запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Игнорируем не-GET запросы
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // YouTube embed и Google Fonts — Network only (нужны свежие)
  if (url.hostname.includes('youtube') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic')) {
    return;
  }

  // Для своих ресурсов — Cache First, потом Network
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Обновляем кэш в фоне
          fetch(request).then((response) => {
            if (response && response.status === 200) {
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, response.clone());
              });
            }
          }).catch(() => {});
          return cached;
        }

        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        }).catch(() => {
          // Офлайн фоллбэк для навигации
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
    );
  }
});

// Обработка сообщений (для будущих обновлений)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
