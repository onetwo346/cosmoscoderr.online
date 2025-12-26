const CACHE_NAME = 'cosmic-app-store-v2';
const OFFLINE_URL = '/offline.html';

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('🔧 Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/offline.html',
                // CSS Files
                '/app-preview.css',
                '/cosmic-elements.css',
                '/cosmic-tags.css',
                '/hero-redesign.css',
                '/enhanced-effects.css',
                '/cosmic-video-gallery.css',
                '/vibrant-theme-enhancements.css',
                '/blog-smooth-interactions.css',
                '/voice-control.css',
                '/browser-autopilot.css',
                '/in-app-modal.css',
                '/featured-apps.css',
                '/futuristic-sections.css',
                '/neon-cyberpunk-theme.css',
                '/holiday-themes.css',
                '/christmas-theme.css',
                '/admin-announcements.css',
                '/cosmic-challenges.css',
                '/cosmic-search-ai.css',
                '/auth-dashboard.css',
                '/new-ui-styles.css',
                '/fluid-typography.css',
                '/performance-optimizer.css',
                // JavaScript Files
                '/vibrant-interactions.js',
                '/cosmic-animations.js',
                '/advanced-animations.js',
                '/threejs-space-background.js',
                '/cosmic-challenges.js',
                '/cosmic-search-ai.js',
                '/cosmic-video-gallery.js',
                '/performance-optimizer.js',
                '/nav-scroll.js',
                '/cursor.js',
                '/preview-popup.js',
                '/popup-cleanup.js',
                '/force-link-fix.js',
                '/direct-link-fix.js',
                '/link-fixer.js',
                '/cursor-fix.js',
                '/browser-autopilot.js',
                '/voice-control.js',
                '/holiday-blog.js',
                '/promo-hub.js',
                '/app-preview.js',
                '/futuristic-effects.js',
                '/new-ui-script.js',
                '/neon-cyberpunk-theme.js',
                '/holiday-loop.js',
                '/christmas-theme.js',
                '/admin-announcements.js',
                '/chatbot-system.js',
                '/community-hub-effects.js',
                '/auth-dashboard.js',
                '/offline-mode.js',
                // Images
                '/cosmoslogo.jpg',
                '/cosmologo.jpg',
                '/akanlogo.jpg',
                '/glowlogo.jpg',
                '/pic.jpg',
                '/random.jpg',
                '/fc.jpg',
                '/babychecker.jpg',
                '/vac.jpg',
                '/jod.jpg',
                '/skin.jpg'
            ]).catch(error => {
                console.warn('⚠️ Some resources failed to cache:', error);
                // Continue anyway - partial cache is better than no cache
            });
        }).then(() => {
            console.log('✅ Service Worker installed and resources cached');
            return self.skipWaiting();
        })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached version if available
            if (response) {
                console.log('📦 Serving from cache:', event.request.url);
                return response;
            }
            
            // Otherwise fetch from network
            return fetch(event.request).then(response => {
                // Don't cache if not a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                
                // Clone the response
                const responseToCache = response.clone();
                
                // Cache the response for future use
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                
                return response;
            }).catch(() => {
                // If both cache and network fail, show offline page for navigation requests
                if (event.request.destination === 'document') {
                    console.log('🌌 Showing offline page for:', event.request.url);
                    return caches.match(OFFLINE_URL);
                }
                
                // For other requests, return a basic offline response
                return new Response('Offline content not available', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/plain'
                    })
                });
            });
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Background sync triggered');
        event.waitUntil(
            // Add your background sync logic here
            syncOfflineData()
        );
    }
});

// Push notifications (if needed in the future)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Explore Apps',
                    icon: '/icon-192.png'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/icon-192.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper function for background sync
async function syncOfflineData() {
    try {
        // Add your offline data sync logic here
        console.log('🔄 Syncing offline data...');
        
        // Example: Sync favorite apps, search history, etc.
        // This would typically involve sending data to your server
        
        return Promise.resolve();
    } catch (error) {
        console.error('❌ Background sync failed:', error);
        return Promise.reject(error);
    }
}

// Handle messages from the main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME).then(cache => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});

console.log('🌌 Cosmic App Store Service Worker loaded');
