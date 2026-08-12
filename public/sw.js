const CACHE_NAME = 'maya-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Vite akan melakukan hashing pada file JS dan CSS saat build produksi,
  // jadi untuk PWA tingkat lanjut biasanya menggunakan vite-plugin-pwa.
  // Tapi untuk kerangka dasar ini, cache index sudah cukup untuk offline fallback.
];

// Instalasi Service Worker & Caching Aset Dasar
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 [Service Worker] Membuka cache dan menyimpan aset...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intersep Fetch Request (Network First, fallback to Cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      console.log('📶 [Service Worker] Jaringan terputus, mengambil dari cache.');
      return caches.match(event.request);
    })
  );
});

// Aktivasi & Pembersihan Cache Lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🧹 [Service Worker] Menghapus cache versi lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});