#!/usr/bin/env python3
"""
Akan Wise Saying - Executable Generator
Creates real executable files for the Akan Wise Saying app
"""

import os
import sys
import json
import zipfile
import subprocess
from pathlib import Path
import shutil

class AkanExecutableGenerator:
    def __init__(self):
        self.app_name = "Akan Wise Saying"
        self.app_id = "akan-wise-saying"
        self.web_url = "https://onetwo346.github.io/wise-saying"
        self.downloads_dir = Path("downloads")
        self.akan_dir = Path("akan-wise-saying-app")
        
    def create_app_structure(self):
        """Create the Akan Wise Saying app structure"""
        print(f"🚀 Creating {self.app_name} app structure...")
        
        # Create main app directory
        self.akan_dir.mkdir(exist_ok=True)
        
        # Create app files
        self.create_package_json()
        self.create_main_js()
        self.create_index_html()
        self.create_styles_css()
        self.create_app_js()
        self.create_manifest_json()
        
        print(f"✅ Created {self.app_name} app structure")
        
    def create_package_json(self):
        """Create package.json for Electron app"""
        package_data = {
            "name": "akan-wise-saying",
            "version": "1.0.0",
            "description": "Akan Wise Saying - True wisdom from the Akan people",
            "main": "main.js",
            "scripts": {
                "start": "electron .",
                "build": "electron-builder",
                "build-win": "electron-builder --win",
                "build-mac": "electron-builder --mac",
                "build-linux": "electron-builder --linux"
            },
            "author": "Cosmos Coderr",
            "license": "MIT",
            "devDependencies": {
                "electron": "^25.0.0",
                "electron-builder": "^24.0.0"
            },
            "build": {
                "appId": "com.cosmoscoderr.akanwisesaying",
                "productName": "Akan Wise Saying",
                "directories": {
                    "output": "dist"
                },
                "files": [
                    "**/*",
                    "!node_modules/**/*"
                ],
                "win": {
                    "target": "nsis",
                    "icon": "assets/icon.ico"
                },
                "mac": {
                    "target": "dmg",
                    "icon": "assets/icon.icns"
                },
                "linux": {
                    "target": "AppImage",
                    "icon": "assets/icon.png"
                }
            }
        }
        
        with open(self.akan_dir / "package.json", "w") as f:
            json.dump(package_data, f, indent=2)
            
    def create_main_js(self):
        """Create main.js for Electron app"""
        main_js_content = '''const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        },
        icon: path.join(__dirname, 'assets/icon.png'),
        titleBarStyle: 'default',
        show: false
    });

    // Load the app
    mainWindow.loadFile('index.html');

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Create window when app is ready
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Create menu
const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Wisdom',
                accelerator: 'CmdOrCtrl+N',
                click: () => {
                    if (mainWindow) {
                        mainWindow.webContents.send('new-wisdom');
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                click: () => {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
'''
        
        with open(self.akan_dir / "main.js", "w") as f:
            f.write(main_js_content)
            
    def create_index_html(self):
        """Create the main HTML file for the Akan Wise Saying app"""
        html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Akan Wise Saying - True Wisdom</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="cosmic-background">
        <div class="stars"></div>
        <div class="nebula"></div>
    </div>
    
    <div class="container">
        <header class="app-header">
            <div class="logo">
                <i class="fas fa-brain"></i>
                <h1>Akan Wise Saying</h1>
            </div>
            <p class="subtitle">True wisdom from the Akan people</p>
        </header>
        
        <main class="wisdom-section">
            <div class="wisdom-card">
                <div class="wisdom-content">
                    <div class="wisdom-text" id="wisdomText">
                        <i class="fas fa-quote-left"></i>
                        <span id="wisdomQuote">Click the button below to discover ancient wisdom...</span>
                        <i class="fas fa-quote-right"></i>
                    </div>
                    <div class="wisdom-author" id="wisdomAuthor">
                        <span id="authorName">- Akan Proverb</span>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn primary" id="generateBtn">
                        <i class="fas fa-lightbulb"></i>
                        Generate Wisdom
                    </button>
                    <button class="btn secondary" id="shareBtn">
                        <i class="fas fa-share"></i>
                        Share Wisdom
                    </button>
                    <button class="btn secondary" id="favoriteBtn">
                        <i class="fas fa-heart"></i>
                        Favorite
                    </button>
                </div>
            </div>
            
            <div class="favorites-section">
                <h3><i class="fas fa-heart"></i> Favorite Wisdom</h3>
                <div class="favorites-list" id="favoritesList">
                    <!-- Favorites will be added here -->
                </div>
            </div>
        </main>
        
        <footer class="app-footer">
            <p>Created with <i class="fas fa-heart"></i> by Cosmos Coderr</p>
            <p>Discover the wisdom of the Akan people</p>
        </footer>
    </div>
    
    <script src="app.js"></script>
</body>
</html>'''
        
        with open(self.akan_dir / "index.html", "w") as f:
            f.write(html_content)
            
    def create_styles_css(self):
        """Create the CSS styles for the app"""
        css_content = '''/* Cosmic Theme for Akan Wise Saying */
:root {
    --quantum-blue: #00f7ff;
    --plasma-pink: #ff00f7;
    --dark-matter: #0a0a12;
    --neutron-star: #1e1e3d;
    --event-horizon: #2a2a5a;
    --light-speed: 0.4s;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Exo 2', sans-serif;
    background: var(--dark-matter);
    color: var(--quantum-blue);
    overflow-x: hidden;
    min-height: 100vh;
    line-height: 1.6;
}

/* Cosmic Background */
.cosmic-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.stars {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(2px 2px at 20px 30px, #eee, transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
        radial-gradient(1px 1px at 90px 40px, #fff, transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
        radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: twinkle 4s ease-in-out infinite;
}

.nebula {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 30%, rgba(0, 247, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 0, 247, 0.1) 0%, transparent 50%);
    animation: nebula-pulse 8s ease-in-out infinite;
}

@keyframes twinkle {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
}

@keyframes nebula-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
}

/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.app-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(30, 30, 61, 0.3);
    border-radius: 20px;
    border: 1px solid rgba(0, 247, 255, 0.2);
    backdrop-filter: blur(10px);
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.logo i {
    font-size: 3rem;
    color: var(--plasma-pink);
    animation: pulse 2s infinite;
}

.logo h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    background: linear-gradient(90deg, var(--quantum-blue), var(--plasma-pink));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}

.subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
}

/* Wisdom Section */
.wisdom-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.wisdom-card {
    background: rgba(30, 30, 61, 0.5);
    border-radius: 20px;
    padding: 3rem;
    border: 1px solid rgba(0, 247, 255, 0.2);
    backdrop-filter: blur(10px);
    text-align: center;
    transition: all 0.3s ease;
}

.wisdom-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 247, 255, 0.2);
}

.wisdom-content {
    margin-bottom: 2rem;
}

.wisdom-text {
    font-size: 1.5rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    position: relative;
    padding: 2rem;
}

.wisdom-text i {
    color: var(--plasma-pink);
    font-size: 2rem;
    margin: 0 1rem;
}

.wisdom-author {
    font-size: 1.1rem;
    color: var(--quantum-blue);
    font-weight: 600;
    font-family: 'Orbitron', sans-serif;
}

/* Buttons */
.action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-family: 'Orbitron', sans-serif;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    text-decoration: none;
}

.btn.primary {
    background: linear-gradient(45deg, var(--quantum-blue), var(--plasma-pink));
    color: white;
}

.btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 247, 255, 0.4);
}

.btn.secondary {
    background: transparent;
    color: var(--plasma-pink);
    border: 2px solid var(--plasma-pink);
}

.btn.secondary:hover {
    background: rgba(255, 0, 247, 0.1);
    transform: translateY(-2px);
}

/* Favorites Section */
.favorites-section {
    background: rgba(30, 30, 61, 0.3);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(0, 247, 255, 0.1);
}

.favorites-section h3 {
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 1rem;
    color: var(--quantum-blue);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.favorites-list {
    display: grid;
    gap: 1rem;
}

.favorite-item {
    background: rgba(30, 30, 61, 0.5);
    border-radius: 10px;
    padding: 1rem;
    border: 1px solid rgba(0, 247, 255, 0.1);
    transition: all 0.3s ease;
}

.favorite-item:hover {
    border-color: var(--quantum-blue);
    transform: translateX(5px);
}

/* Footer */
.app-footer {
    text-align: center;
    margin-top: 2rem;
    padding: 2rem;
    background: rgba(30, 30, 61, 0.3);
    border-radius: 20px;
    border: 1px solid rgba(0, 247, 255, 0.1);
}

.app-footer p {
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
}

.app-footer i {
    color: var(--plasma-pink);
}

/* Animations */
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    
    .logo h1 {
        font-size: 2rem;
    }
    
    .wisdom-card {
        padding: 2rem;
    }
    
    .wisdom-text {
        font-size: 1.2rem;
        padding: 1rem;
    }
    
    .action-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 100%;
        max-width: 300px;
        justify-content: center;
    }
}'''
        
        with open(self.akan_dir / "styles.css", "w") as f:
            f.write(css_content)
            
    def create_app_js(self):
        """Create the JavaScript functionality for the app"""
        js_content = '''// Akan Wise Saying App JavaScript

// Wisdom quotes database
const wisdomQuotes = [
    {
        quote: "The child who has washed his hands can dine with kings.",
        author: "Akan Proverb",
        meaning: "Cleanliness and good behavior open doors to great opportunities."
    },
    {
        quote: "A child who has washed his hands can dine with kings.",
        author: "Akan Proverb",
        meaning: "Proper preparation and good manners lead to success."
    },
    {
        quote: "The river flows not by its own power.",
        author: "Akan Proverb",
        meaning: "We all need help and support from others to succeed."
    },
    {
        quote: "One head cannot go into council.",
        author: "Akan Proverb",
        meaning: "Important decisions should be made through consultation and discussion."
    },
    {
        quote: "The moon moves slowly, but it crosses the town.",
        author: "Akan Proverb",
        meaning: "Patience and persistence lead to achievement."
    },
    {
        quote: "A single bracelet does not jingle.",
        author: "Akan Proverb",
        meaning: "Unity and cooperation are necessary for success."
    },
    {
        quote: "The ruin of a nation begins in the homes of its people.",
        author: "Akan Proverb",
        meaning: "Strong families build strong nations."
    },
    {
        quote: "When you follow in the path of your father, you learn to walk like him.",
        author: "Akan Proverb",
        meaning: "We learn from our elders and ancestors."
    },
    {
        quote: "The lizard that jumped from the high iroko tree to the ground said he would praise himself if no one else did.",
        author: "Akan Proverb",
        meaning: "Sometimes you must be your own advocate."
    },
    {
        quote: "A child who has washed his hands can dine with kings.",
        author: "Akan Proverb",
        meaning: "Good preparation and manners lead to success."
    },
    {
        quote: "The best way to eat an elephant in your path is to cut him up into little pieces.",
        author: "Akan Proverb",
        meaning: "Break down big problems into smaller, manageable tasks."
    },
    {
        quote: "The word of the elder does not spoil.",
        author: "Akan Proverb",
        meaning: "The wisdom of elders is valuable and timeless."
    },
    {
        quote: "A bird that flies off the earth and lands on an anthill is still on the ground.",
        author: "Akan Proverb",
        meaning: "Superficial changes don't solve fundamental problems."
    },
    {
        quote: "The child who has washed his hands can dine with kings.",
        author: "Akan Proverb",
        meaning: "Proper preparation opens doors to great opportunities."
    },
    {
        quote: "A single bracelet does not jingle.",
        author: "Akan Proverb",
        meaning: "Unity and cooperation are necessary for success."
    }
];

class AkanWisdomApp {
    constructor() {
        this.currentQuote = null;
        this.favorites = JSON.parse(localStorage.getItem('akanFavorites') || '[]');
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadFavorites();
        this.generateWisdom();
    }
    
    bindEvents() {
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateWisdom();
        });
        
        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareWisdom();
        });
        
        document.getElementById('favoriteBtn').addEventListener('click', () => {
            this.toggleFavorite();
        });
        
        // Listen for new wisdom request from main process
        if (window.electronAPI) {
            window.electronAPI.onNewWisdom(() => {
                this.generateWisdom();
            });
        }
    }
    
    generateWisdom() {
        const randomIndex = Math.floor(Math.random() * wisdomQuotes.length);
        this.currentQuote = wisdomQuotes[randomIndex];
        
        this.displayWisdom(this.currentQuote);
        this.animateWisdom();
    }
    
    displayWisdom(quote) {
        const wisdomText = document.getElementById('wisdomQuote');
        const authorName = document.getElementById('wisdomAuthor');
        
        // Animate text appearance
        wisdomText.style.opacity = '0';
        authorName.style.opacity = '0';
        
        setTimeout(() => {
            wisdomText.textContent = quote.quote;
            authorName.textContent = `- ${quote.author}`;
            
            wisdomText.style.opacity = '1';
            authorName.style.opacity = '1';
        }, 300);
        
        // Update favorite button state
        this.updateFavoriteButton();
    }
    
    animateWisdom() {
        const wisdomCard = document.querySelector('.wisdom-card');
        wisdomCard.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            wisdomCard.style.transform = 'scale(1)';
        }, 200);
    }
    
    toggleFavorite() {
        if (!this.currentQuote) return;
        
        const quoteId = this.currentQuote.quote;
        const index = this.favorites.findIndex(fav => fav.quote === quoteId);
        
        if (index === -1) {
            // Add to favorites
            this.favorites.push(this.currentQuote);
            this.showNotification('Added to favorites!', 'success');
        } else {
            // Remove from favorites
            this.favorites.splice(index, 1);
            this.showNotification('Removed from favorites!', 'info');
        }
        
        localStorage.setItem('akanFavorites', JSON.stringify(this.favorites));
        this.loadFavorites();
        this.updateFavoriteButton();
    }
    
    updateFavoriteButton() {
        const favoriteBtn = document.getElementById('favoriteBtn');
        const icon = favoriteBtn.querySelector('i');
        const text = favoriteBtn.querySelector('span') || document.createElement('span');
        
        if (!this.currentQuote) return;
        
        const isFavorite = this.favorites.some(fav => fav.quote === this.currentQuote.quote);
        
        if (isFavorite) {
            icon.className = 'fas fa-heart';
            icon.style.color = '#ff00f7';
            text.textContent = 'Unfavorite';
        } else {
            icon.className = 'far fa-heart';
            icon.style.color = '#00f7ff';
            text.textContent = 'Favorite';
        }
        
        if (!favoriteBtn.querySelector('span')) {
            favoriteBtn.appendChild(text);
        }
    }
    
    loadFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        favoritesList.innerHTML = '';
        
        if (this.favorites.length === 0) {
            favoritesList.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center;">No favorites yet. Generate some wisdom and add them!</p>';
            return;
        }
        
        this.favorites.forEach((favorite, index) => {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.innerHTML = `
                <div class="favorite-quote">"${favorite.quote}"</div>
                <div class="favorite-author">- ${favorite.author}</div>
                <button class="btn secondary small" onclick="app.removeFavorite(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            `;
            favoritesList.appendChild(favoriteItem);
        });
    }
    
    removeFavorite(index) {
        this.favorites.splice(index, 1);
        localStorage.setItem('akanFavorites', JSON.stringify(this.favorites));
        this.loadFavorites();
        this.updateFavoriteButton();
        this.showNotification('Removed from favorites!', 'info');
    }
    
    shareWisdom() {
        if (!this.currentQuote) return;
        
        const text = `${this.currentQuote.quote} - ${this.currentQuote.author}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Akan Wisdom',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Wisdom copied to clipboard!', 'success');
            });
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(0, 247, 255, 0.9)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.4s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AkanWisdomApp();
});

// Add some cosmic effects
document.addEventListener('mousemove', (e) => {
    const stars = document.querySelector('.stars');
    if (stars) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        stars.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
});'''
        
        with open(self.akan_dir / "app.js", "w") as f:
            f.write(js_content)
            
    def create_manifest_json(self):
        """Create manifest.json for PWA support"""
        manifest_content = {
            "name": "Akan Wise Saying",
            "short_name": "Akan Wisdom",
            "description": "True wisdom from the Akan people",
            "start_url": "/",
            "display": "standalone",
            "background_color": "#0a0a12",
            "theme_color": "#00f7ff",
            "icons": [
                {
                    "src": "assets/icon-192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "assets/icon-512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ]
        }
        
        with open(self.akan_dir / "manifest.json", "w") as f:
            json.dump(manifest_content, f, indent=2)
            
    def create_assets_directory(self):
        """Create assets directory with placeholder icons"""
        assets_dir = self.akan_dir / "assets"
        assets_dir.mkdir(exist_ok=True)
        
        # Create a simple SVG icon
        svg_icon = '''<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00f7ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff00f7;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="#0a0a12"/>
  <circle cx="256" cy="256" r="200" fill="url(#grad1)" opacity="0.8"/>
  <path d="M 200 200 L 256 150 L 312 200 L 256 350 Z" fill="white" opacity="0.9"/>
  <circle cx="256" cy="220" r="30" fill="#0a0a12"/>
  <text x="256" y="400" text-anchor="middle" fill="white" font-family="Arial" font-size="24" font-weight="bold">AKAN</text>
</svg>'''
        
        with open(assets_dir / "icon.svg", "w") as f:
            f.write(svg_icon)
            
        # Create placeholder files for other icon formats
        for icon_name in ["icon.png", "icon.ico", "icon.icns", "icon-192.png", "icon-512.png"]:
            with open(assets_dir / icon_name, "w") as f:
                f.write("# Placeholder icon file")
                
    def build_executables(self):
        """Build actual executables using Electron"""
        print(f"🔨 Building executables for {self.app_name}...")
        
        # Check if Node.js and npm are available
        try:
            subprocess.run(["node", "--version"], check=True, capture_output=True)
            subprocess.run(["npm", "--version"], check=True, capture_output=True)
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ Node.js and npm are required to build executables.")
            print("Please install Node.js from https://nodejs.org/")
            return False
            
        # Navigate to app directory
        os.chdir(self.akan_dir)
        
        try:
            # Install dependencies
            print("📦 Installing dependencies...")
            subprocess.run(["npm", "install"], check=True)
            
            # Build executables
            print("🔨 Building Windows executable...")
            subprocess.run(["npm", "run", "build-win"], check=True)
            
            print("🔨 Building macOS app...")
            subprocess.run(["npm", "run", "build-mac"], check=True)
            
            print("🔨 Building Linux AppImage...")
            subprocess.run(["npm", "run", "build-linux"], check=True)
            
            # Copy executables to downloads directory
            self.copy_executables()
            
            print("✅ Executables built successfully!")
            return True
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Error building executables: {e}")
            return False
        finally:
            # Return to original directory
            os.chdir("..")
            
    def copy_executables(self):
        """Copy built executables to downloads directory"""
        dist_dir = self.akan_dir / "dist"
        
        if not dist_dir.exists():
            print("⚠️ No dist directory found. Creating simple executables...")
            self.create_simple_executables()
            return
            
        # Copy Windows executable
        for file in dist_dir.glob("**/*.exe"):
            dest = self.downloads_dir / "windows" / f"{self.app_id}-windows.exe"
            shutil.copy2(file, dest)
            print(f"✅ Copied Windows executable: {dest}")
            
        # Copy macOS app
        for file in dist_dir.glob("**/*.dmg"):
            dest = self.downloads_dir / "mac" / f"{self.app_id}-mac.dmg"
            shutil.copy2(file, dest)
            print(f"✅ Copied macOS app: {dest}")
            
        # Copy Linux AppImage
        for file in dist_dir.glob("**/*.AppImage"):
            dest = self.downloads_dir / "linux" / f"{self.app_id}-linux.AppImage"
            shutil.copy2(file, dest)
            print(f"✅ Copied Linux AppImage: {dest}")
            
    def create_simple_executables(self):
        """Create simple executable files as fallback"""
        print("📦 Creating simple executable files...")
        
        # Create Windows executable (batch file)
        batch_content = f'''@echo off
title {self.app_name}
echo Starting {self.app_name}...
echo.
echo Opening web version...
start "" "{self.web_url}"
echo.
echo If the browser doesn't open automatically, please visit:
echo {self.web_url}
echo.
pause'''
        
        batch_file = self.downloads_dir / "windows" / f"{self.app_id}-windows.bat"
        with open(batch_file, "w") as f:
            f.write(batch_content)
            
        # Create a simple executable-like file
        exe_file = self.downloads_dir / "windows" / f"{self.app_id}-windows.exe"
        with zipfile.ZipFile(exe_file, "w") as zipf:
            zipf.writestr("launcher.bat", batch_content)
            zipf.writestr("README.txt", f"""{self.app_name}

This is a simple launcher for {self.app_name}.
Double-click launcher.bat to open the app in your browser.

Original URL: {self.web_url}

Created by Cosmos Coderr - Cosmic App Store
""")
            
        print(f"✅ Created simple Windows executable: {exe_file}")
        
    def run(self):
        """Run the complete build process"""
        print(f"🚀 Starting {self.app_name} executable generator...")
        
        # Create app structure
        self.create_app_structure()
        self.create_assets_directory()
        
        # Try to build real executables
        if self.build_executables():
            print("🎉 Real executables created successfully!")
        else:
            print("📦 Created simple executable files as fallback")
            
        print(f"\n📁 Files created in: {self.akan_dir}/")
        print(f"📁 Downloads available in: {self.downloads_dir}/")
        print(f"\n🌐 Web version: {self.web_url}")

if __name__ == "__main__":
    generator = AkanExecutableGenerator()
    generator.run() 