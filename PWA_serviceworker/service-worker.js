const CACHE_NAME = 'meu-pwa-cache-v1';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'manifest.json',
  'app.js',
  'imagens/icon-192.png',
  'imagens/icon-512.png'
];

// Evento: Instalando o service worker e cacheando os arquivos
self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Cacheando arquivos');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting(); // Força o service worker a ativar imediatamente após a instalação
});

// Evento: Ativação do service worker - limpa caches antigos
self.addEventListener('activate', event => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim(); // Assumir controle imediato das páginas abertas
});

// Evento: Intercepta requisições e responde com cache ou fetch da rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache se existir
        }
        return fetch(event.request); // Senão, busca na rede
      })
  );
});
