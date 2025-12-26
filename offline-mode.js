/* OFFLINE MODE - Service Worker & Caching System */

class OfflineMode {
    constructor() {
        this.cacheName = 'cosmic-app-store-v3';
        this.offlinePages = [
            '/',
            '/index.html',
            '/offline.html'
        ];
        this.staticAssets = [
            '/app-preview.css',
            '/cosmic-elements.css',
            '/cosmic-tags.css',
            '/hero-redesign.css',
            '/enhanced-effects.css',
            '/cosmic-video-gallery.css',
            '/vibrant-theme-enhancements.css',
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
            '/cursor-fix.js'
        ];
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.createOfflinePage();
        this.setupOfflineDetection();
        this.cacheCriticalResources();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('✅ Service Worker registered:', registration);
                
                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateNotification();
                        }
                    });
                });
            } catch (error) {
                console.log('❌ Service Worker registration failed:', error);
            }
        }
    }

    createOfflinePage() {
        const offlineHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - Cosmic Web App Store</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Exo 2', sans-serif;
            background: linear-gradient(135deg, #0c0c1e 0%, #1a0033 25%, #0f0f2a 50%, #1e0040 75%, #0a0a1f 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .offline-container {
            max-width: 600px;
            padding: 2rem;
            z-index: 10;
            position: relative;
        }
        
        .cosmic-logo {
            width: 120px;
            height: 120px;
            background: linear-gradient(45deg, #00ffff, #ff0080);
            border-radius: 50%;
            margin: 0 auto 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            animation: pulse 2s ease-in-out infinite;
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.5);
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #00ffff, #ff0080);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .offline-message {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .retry-btn {
            background: linear-gradient(45deg, #00ffff, #ff0080);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0.5rem;
        }
        
        .retry-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
        }
        
        .offline-features {
            margin-top: 3rem;
            text-align: left;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            border-left: 4px solid #00ffff;
        }
        
        .feature-icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            color: #00ffff;
        }
        
        .background-stars {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            animation: twinkle 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        
        .connection-status {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: bold;
            z-index: 1000;
        }
        
        .offline-status {
            background: rgba(255, 0, 0, 0.2);
            border: 1px solid #ff0000;
            color: #ff0000;
        }
        
        .online-status {
            background: rgba(0, 255, 0, 0.2);
            border: 1px solid #00ff00;
            color: #00ff00;
        }
    </style>
</head>
<body>
    <div class="background-stars" id="stars"></div>
    
    <div class="connection-status offline-status" id="connectionStatus">
        🔴 OFFLINE
    </div>
    
    <div class="offline-container">
        <div class="cosmic-logo">🌌</div>
        <h1>You're Offline</h1>
        <p class="offline-message">
            Don't worry! You can still explore the Cosmic Web App Store. 
            Some features are available offline.
        </p>
        
        <button class="retry-btn" onclick="window.location.reload()">
            🔄 Try Again
        </button>
        <button class="retry-btn" onclick="window.history.back()">
            ← Go Back
        </button>
        
        <div class="offline-features">
            <h3 style="margin-bottom: 1rem; color: #00ffff;">Available Offline:</h3>
            <div class="feature-item">
                <span class="feature-icon">📱</span>
                <span>Browse cached app listings</span>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🔍</span>
                <span>Search through saved content</span>
            </div>
            <div class="feature-item">
                <span class="feature-icon">⭐</span>
                <span>View app details and descriptions</span>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🎨</span>
                <span>Enjoy the cosmic theme and animations</span>
            </div>
        </div>
    </div>
    
    <script>
        // Create animated stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const numStars = 100;
            
            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                starsContainer.appendChild(star);
            }
        }
        
        // Check connection status
        function updateConnectionStatus() {
            const status = document.getElementById('connectionStatus');
            if (navigator.onLine) {
                status.textContent = '🟢 ONLINE';
                status.className = 'connection-status online-status';
            } else {
                status.textContent = '🔴 OFFLINE';
                status.className = 'connection-status offline-status';
            }
        }
        
        // Listen for connection changes
        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        
        // Initialize
        createStars();
        updateConnectionStatus();
        
        // Auto-retry when connection is restored
        window.addEventListener('online', () => {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        });
    </script>
</body>
</html>`;
        
        // Store offline page in cache
        if ('caches' in window) {
            caches.open(this.cacheName).then(cache => {
                cache.put('/offline.html', new Response(offlineHTML, {
                    headers: { 'Content-Type': 'text/html' }
                }));
            });
        }
    }

    setupOfflineDetection() {
        // Show connection status
        this.createConnectionIndicator();
        
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.showConnectionMessage('Connection restored! 🌟', 'success');
            this.syncOfflineData();
        });
        
        window.addEventListener('offline', () => {
            this.showConnectionMessage('You\'re now offline. Some features may be limited.', 'warning');
        });
    }

    createConnectionIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'connectionIndicator';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(-20px);
        `;
        document.body.appendChild(indicator);
    }

    showConnectionMessage(message, type) {
        const indicator = document.getElementById('connectionIndicator');
        if (!indicator) return;
        
        const colors = {
            success: { bg: 'rgba(0, 255, 0, 0.2)', border: '#00ff00', color: '#00ff00' },
            warning: { bg: 'rgba(255, 165, 0, 0.2)', border: '#ffa500', color: '#ffa500' },
            error: { bg: 'rgba(255, 0, 0, 0.2)', border: '#ff0000', color: '#ff0000' }
        };
        
        const style = colors[type] || colors.warning;
        indicator.style.background = style.bg;
        indicator.style.border = `1px solid ${style.border}`;
        indicator.style.color = style.color;
        indicator.textContent = message;
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            indicator.style.opacity = '0';
            indicator.style.transform = 'translateY(-20px)';
        }, 3000);
    }

    async cacheCriticalResources() {
        if (!('caches' in window)) return;
        
        try {
            const cache = await caches.open(this.cacheName);
            
            // Cache static assets
            await cache.addAll(this.staticAssets);
            
            // Cache offline pages
            await cache.addAll(this.offlinePages);
            
            console.log('✅ Critical resources cached for offline use');
        } catch (error) {
            console.log('❌ Failed to cache resources:', error);
        }
    }

    async syncOfflineData() {
        // Sync any offline actions when connection is restored
        console.log('🔄 Syncing offline data...');
        // Add your sync logic here
    }

    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #00ffff, #ff0080);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            cursor: pointer;
            font-weight: bold;
        `;
        notification.textContent = '🔄 Update Available! Click to refresh.';
        notification.onclick = () => window.location.reload();
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 10000);
    }
}

// Service Worker
const serviceWorkerCode = `
const CACHE_NAME = 'cosmic-app-store-v3';
const OFFLINE_URL = '/offline.html';

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/offline.html',
                '/app-preview.css',
                '/cosmic-elements.css',
                '/vibrant-theme-enhancements.css',
                '/vibrant-interactions.js'
            ]);
        })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached version or fetch from network
            return response || fetch(event.request).catch(() => {
                // If both fail, show offline page for navigation requests
                if (event.request.destination === 'document') {
                    return caches.match(OFFLINE_URL);
                }
            });
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
`;

// Create service worker file
function createServiceWorker() {
    const blob = new Blob([serviceWorkerCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    // Create a link to download the service worker
    const link = document.createElement('a');
    link.href = swUrl;
    link.download = 'sw.js';
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    document.body.removeChild(link);
    
    console.log('📁 Service Worker file created: sw.js');
}

// Initialize offline mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OfflineMode();
    
    // Create service worker file (for development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        createServiceWorker();
    }
});

// Export for use in other scripts
window.OfflineMode = OfflineMode;
