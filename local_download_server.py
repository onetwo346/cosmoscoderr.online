#!/usr/bin/env python3
"""
Local Download Server for Cosmic App Store
Serves executable files directly from the downloads directory
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path
import threading
import time

class DownloadServer:
    def __init__(self, port=8000):
        self.port = port
        self.downloads_dir = Path("downloads")
        self.server = None
        
    def start_server(self):
        """Start the local download server"""
        print(f"🚀 Starting local download server on port {self.port}...")
        
        # Change to downloads directory
        os.chdir(self.downloads_dir)
        
        # Create HTTP server
        handler = http.server.SimpleHTTPRequestHandler
        
        try:
            with socketserver.TCPServer(("", self.port), handler) as httpd:
                self.server = httpd
                print(f"✅ Server started successfully!")
                print(f"📁 Serving files from: {self.downloads_dir.absolute()}")
                print(f"🌐 Server URL: http://localhost:{self.port}")
                print(f"📥 Download URLs:")
                print(f"   Windows: http://localhost:{self.port}/windows/akan-wise-saying-windows.exe")
                print(f"   macOS: http://localhost:{self.port}/mac/akan-wise-saying-mac.dmg")
                print(f"   Linux: http://localhost:{self.port}/linux/akan-wise-saying-linux.AppImage")
                print(f"\n🔄 Server is running... Press Ctrl+C to stop")
                
                # Open browser to show available files
                webbrowser.open(f"http://localhost:{self.port}")
                
                # Start server
                httpd.serve_forever()
                
        except KeyboardInterrupt:
            print(f"\n🛑 Server stopped by user")
        except Exception as e:
            print(f"❌ Error starting server: {e}")
            
    def stop_server(self):
        """Stop the server"""
        if self.server:
            self.server.shutdown()
            print("🛑 Server stopped")

def update_app_store_urls():
    """Update the app store to use local server URLs"""
    print("🔧 Updating app store to use local server URLs...")
    
    # Read the current index.html
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace the download URLs with local server URLs
    local_urls = {
        'https://cosmoscoderr.online/downloads/akan-wise-saying-windows.exe': 'http://localhost:8000/windows/akan-wise-saying-windows.exe',
        'https://cosmoscoderr.online/downloads/akan-wise-saying-mac.dmg': 'http://localhost:8000/mac/akan-wise-saying-mac.dmg',
        'https://cosmoscoderr.online/downloads/akan-wise-saying-linux.AppImage': 'http://localhost:8000/linux/akan-wise-saying-linux.AppImage'
    }
    
    for old_url, new_url in local_urls.items():
        content = content.replace(old_url, new_url)
    
    # Write back to file
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    
    print("✅ App store updated to use local server URLs!")

def create_download_page():
    """Create a simple download page for testing"""
    download_page = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cosmic App Store - Downloads</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #0a0a12;
            color: #00f7ff;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            color: #ff00f7;
        }
        .download-section {
            background: rgba(30, 30, 61, 0.5);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid rgba(0, 247, 255, 0.2);
        }
        .download-btn {
            background: linear-gradient(45deg, #00f7ff, #ff00f7);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            margin: 10px;
            transition: all 0.3s ease;
        }
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 247, 255, 0.4);
        }
        .file-info {
            background: rgba(0, 0, 0, 0.3);
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌟 Cosmic App Store - Downloads</h1>
        
        <div class="download-section">
            <h2>🚀 Akan Wise Saying - True Wisdom</h2>
            <p>Download the Akan Wise Saying app for your platform:</p>
            
            <div class="file-info">
                <strong>Windows:</strong> akan-wise-saying-windows.exe (4.2KB)
                <br><a href="/windows/akan-wise-saying-windows.exe" class="download-btn">Download for Windows</a>
            </div>
            
            <div class="file-info">
                <strong>macOS:</strong> akan-wise-saying-mac.dmg
                <br><a href="/mac/akan-wise-saying-mac.dmg" class="download-btn">Download for macOS</a>
            </div>
            
            <div class="file-info">
                <strong>Linux:</strong> akan-wise-saying-linux.AppImage
                <br><a href="/linux/akan-wise-saying-linux.AppImage" class="download-btn">Download for Linux</a>
            </div>
        </div>
        
        <div class="download-section">
            <h2>📁 All Available Downloads</h2>
            <p>Browse all available files:</p>
            <a href="/windows/" class="download-btn">Windows Downloads</a>
            <a href="/mac/" class="download-btn">macOS Downloads</a>
            <a href="/linux/" class="download-btn">Linux Downloads</a>
        </div>
        
        <div class="download-section">
            <h2>ℹ️ Instructions</h2>
            <ol>
                <li>Click the download button for your platform</li>
                <li>Extract the downloaded file to a folder</li>
                <li>Double-click the launcher file to run the app</li>
                <li>Enjoy the wisdom of the Akan people!</li>
            </ol>
        </div>
    </div>
</body>
</html>"""
    
    with open("downloads/index.html", "w", encoding="utf-8") as f:
        f.write(download_page)
    
    print("✅ Created download page at downloads/index.html")

if __name__ == "__main__":
    print("🌟 Cosmic App Store - Local Download Server")
    print("=" * 50)
    
    # Create download page
    create_download_page()
    
    # Update app store URLs
    update_app_store_urls()
    
    # Start server
    server = DownloadServer(port=8000)
    server.start_server() 