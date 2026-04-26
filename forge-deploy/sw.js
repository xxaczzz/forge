/**
 * FORGE Service Worker
 *
 * Стратегии кэширования:
 * - HTML (navigation): Network First (всегда свежий, кэш как fallback при оффлайне)
 * - JS / CSS: Network First (важно получить актуальную версию)
 * - Images / fonts: Stale-While-Revalidate (быстро отдаём кэш + обновляем в фоне)
 *
 * Версия билда обновляется при каждом деплое — старый кэш автоматически удаляется.
 */

// Версия билда — меняется при каждом релизе
const BUILD_VERSION = '2026-04-26-1830';
const CACHE_NAME = `forge-${BUILD_VERSION}`;

// Файлы для предкэша при установке
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

// Установка нового SW — кэшируем основные файлы и сразу активируемся
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()) // не ждём — активируемся немедленно
  );
});

// Активация — удаляем ВСЕ старые кэши (от других версий)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      ),
      self.clients.claim()
    ])
  );
});

// Хелпер: Network First с fallback на кэш
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const fallback = await caches.match('/index.html');
      if (fallback) return fallback;
    }
    throw err;
  }
}

// Хелпер: Stale-While-Revalidate (отдаём кэш, обновляем в фоне)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);

  return cached || fetchPromise;
}

// Маршрутизация запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // YouTube / Google Fonts — Network only (не кэшируем)
  if (url.hostname.includes('youtube') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic') ||
      url.hostname.includes('img.youtube.com')) {
    return;
  }

  // Свой домен — применяем стратегии
  if (url.origin === self.location.origin) {
    // HTML / JS / CSS / JSON / навигация → Network First
    if (request.mode === 'navigate' ||
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.json') ||
        url.pathname === '/') {
      event.respondWith(networkFirst(request));
      return;
    }

    // Изображения / иконки / шрифты → Stale-While-Revalidate
    if (url.pathname.match(/\.(png|jpg|jpeg|svg|webp|woff2?|ttf)$/i) ||
        url.pathname.startsWith('/assets/')) {
      event.respondWith(staleWhileRevalidate(request));
      return;
    }

    // Всё остальное — Network First
    event.respondWith(networkFirst(request));
  }
});

// Слушаем команды от страницы
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: BUILD_VERSION });
  }
});

console.log(`[FORGE SW] Loaded version: ${BUILD_VERSION}`);
