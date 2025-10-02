#!/usr/bin/env python3
"""
Cosmic App Store - Executable Generator
Creates basic executable files for all apps in the store
"""

import os
import sys
import subprocess
import zipfile
from pathlib import Path

# App configurations with their web URLs
APPS = {
    'pic2puzz': 'https://pic2puzz.space',
    'glow-radio': 'https://onetwo346.github.io/glow-radio-',
    'slang-translator': 'https://onetwo346.github.io/Slang-decoder-/',
    'bunny-hop': 'https://onetwo346.github.io/bunny-hop/',
    'akan-wise-saying': 'https://onetwo346.github.io/wise-saying',
    'random-quote-generator': 'https://onetwo346.github.io/random-quote-generator-RQG',
    'fecal-analyst': 'https://onetwo346.github.io/Fecal-analyst/',
    'urine-analyst': 'https://onetwo346.github.io/Urine-analysts-/',
    'math-explorer': 'https://onetwo346.github.io/math-guru/',
    'fetch-or-catch': 'https://onetwo346.github.io/fetch-or-catch/',
    'baby-checker': 'https://onetwo346.github.io/BABYYCHECKER/',
    'cosmic-bible': 'https://onetwo346.github.io/cb/',
    'baby-name-picker': 'https://onetwo346.github.io/baby-name-picker/',
    'earthquake-analyst': 'https://earthquakeanalyst.space/',
    'switchbox': 'https://onetwo346.github.io/switchbox/',
    'xowars': 'https://xowars.space/',
    'quickwrap': 'https://quickwrap.space',
    'word-grid-quest': 'https://wordgridquest.xyz/',
    'invoice-generator-pro': 'https://onetwo346.github.io/invoice-generator',
    'star-script-editor': 'https://onetwo346.github.io/script/',
    'dip-image-generator': 'https://dipimagegenerator.lat',
    'make-this-recipe': 'https://onetwo346.github.io/Make-this-recipe-',
    'horonum': 'https://onetwo346.github.io/horonum',
    'time-escape': 'https://onetwo346.github.io/space-shooting',
    'beeek': 'https://beeek.online',
    'resume-cover-letter': 'https://onetwo346.github.io/Resume-cover-letter-',
    'gift-idea-genius': 'https://onetwo346.github.io/Gift-idea-genius-',
    'cosmic-horizon': 'https://cosmichorizon.space',
    'vacation-ideas': 'https://onetwo346.github.io/vacation-ideas-/',
    'jokes-of-the-day': 'https://onetwo346.github.io/jokes-of-the-day/',
    'skin-analyst': 'https://onetwo346.github.io/skin-analyst/'
}

def create_directories():
    """Create downloads directory structure"""
    downloads_dir = Path('downloads')
    downloads_dir.mkdir(exist_ok=True)
    
    # Create platform subdirectories
    for platform in ['windows', 'mac', 'linux']:
        platform_dir = downloads_dir / platform
        platform_dir.mkdir(exist_ok=True)
    
    return downloads_dir

def create_html_wrapper(app_name, app_url):
    """Create HTML wrapper for web apps"""
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{app_name} - Cosmic App Store</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #0a0a12;
            color: #00f7ff;
            overflow: hidden;
        }}
        .app-frame {{
            width: 100vw;
            height: 100vh;
            border: none;
            background: white;
        }}
        .loading {{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 18px;
            color: #00f7ff;
        }}
    </style>
</head>
<body>
    <div class="loading" id="loading">Loading {app_name}...</div>
    <iframe src="{app_url}" class="app-frame" id="appFrame" onload="hideLoading()"></iframe>
    
    <script>
        function hideLoading() {{
            document.getElementById('loading').style.display = 'none';
        }}
    </script>
</body>
</html>'''
    return html_content

def create_windows_executable(app_name, app_url, downloads_dir):
    """Create Windows executable using HTML wrapper"""
    html_content = create_html_wrapper(app_name, app_url)
    
    # Create a simple batch file that opens the HTML in default browser
    batch_content = f'''@echo off
title {app_name} - Cosmic App Store
echo Starting {app_name}...
start "" "{app_url}"
pause'''
    
    # Save files
    html_file = downloads_dir / 'windows' / f'{app_name}-windows.html'
    batch_file = downloads_dir / 'windows' / f'{app_name}-windows.bat'
    exe_file = downloads_dir / 'windows' / f'{app_name}-windows.exe'
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    with open(batch_file, 'w', encoding='utf-8') as f:
        f.write(batch_content)
    
    # Create a simple executable-like file (zip with .exe extension)
    with zipfile.ZipFile(exe_file, 'w') as zipf:
        zipf.writestr('app.html', html_content)
        zipf.writestr('launcher.bat', batch_content)
        zipf.writestr('README.txt', f'''{app_name} - Cosmic App Store

This is a web app wrapper for {app_name}.
To run this app:
1. Extract this file
2. Run launcher.bat or open app.html in your browser
3. The app will open in your default web browser

Original URL: {app_url}

Created by Cosmos Coderr - Cosmic App Store
''')
    
    print(f"✅ Created Windows executable for {app_name}")

def create_mac_app(app_name, app_url, downloads_dir):
    """Create macOS app bundle"""
    # Create a simple HTML file that can be opened in browser
    html_content = create_html_wrapper(app_name, app_url)
    
    # Create a shell script launcher
    shell_content = f'''#!/bin/bash
# {app_name} - Cosmic App Store Launcher
echo "Starting {app_name}..."
open "{app_url}"
'''
    
    # Save files
    html_file = downloads_dir / 'mac' / f'{app_name}-mac.html'
    shell_file = downloads_dir / 'mac' / f'{app_name}-mac.sh'
    dmg_file = downloads_dir / 'mac' / f'{app_name}-mac.dmg'
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    with open(shell_file, 'w', encoding='utf-8') as f:
        f.write(shell_content)
    
    # Make shell script executable
    os.chmod(shell_file, 0o755)
    
    # Create a simple DMG-like file (zip with .dmg extension)
    with zipfile.ZipFile(dmg_file, 'w') as zipf:
        zipf.writestr('app.html', html_content)
        zipf.writestr('launcher.sh', shell_content)
        zipf.writestr('README.txt', f'''{app_name} - Cosmic App Store

This is a web app wrapper for {app_name}.
To run this app:
1. Extract this file
2. Run: chmod +x launcher.sh && ./launcher.sh
3. Or open app.html in your browser
4. The app will open in your default web browser

Original URL: {app_url}

Created by Cosmos Coderr - Cosmic App Store
''')
    
    print(f"✅ Created macOS app for {app_name}")

def create_linux_appimage(app_name, app_url, downloads_dir):
    """Create Linux AppImage"""
    # Create a simple HTML file
    html_content = create_html_wrapper(app_name, app_url)
    
    # Create a shell script launcher
    shell_content = f'''#!/bin/bash
# {app_name} - Cosmic App Store Launcher
echo "Starting {app_name}..."
xdg-open "{app_url}" 2>/dev/null || sensible-browser "{app_url}" 2>/dev/null || x-www-browser "{app_url}" 2>/dev/null || firefox "{app_url}" 2>/dev/null || chromium-browser "{app_url}" 2>/dev/null || google-chrome "{app_url}" 2>/dev/null || echo "Please open {app_url} in your browser"
'''
    
    # Save files
    html_file = downloads_dir / 'linux' / f'{app_name}-linux.html'
    shell_file = downloads_dir / 'linux' / f'{app_name}-linux.sh'
    appimage_file = downloads_dir / 'linux' / f'{app_name}-linux.AppImage'
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    with open(shell_file, 'w', encoding='utf-8') as f:
        f.write(shell_content)
    
    # Make shell script executable
    os.chmod(shell_file, 0o755)
    
    # Create a simple AppImage-like file (zip with .AppImage extension)
    with zipfile.ZipFile(appimage_file, 'w') as zipf:
        zipf.writestr('app.html', html_content)
        zipf.writestr('launcher.sh', shell_content)
        zipf.writestr('README.txt', f'''{app_name} - Cosmic App Store

This is a web app wrapper for {app_name}.
To run this app:
1. Extract this file
2. Run: chmod +x launcher.sh && ./launcher.sh
3. Or open app.html in your browser
4. The app will open in your default web browser

Original URL: {app_url}

Created by Cosmos Coderr - Cosmic App Store
''')
    
    print(f"✅ Created Linux AppImage for {app_name}")

def create_all_executables():
    """Create executables for all apps"""
    print("🚀 Creating executables for Cosmic App Store...")
    
    downloads_dir = create_directories()
    
    for app_id, app_url in APPS.items():
        app_name = app_id.replace('-', ' ').title()
        
        try:
            create_windows_executable(app_id, app_url, downloads_dir)
            create_mac_app(app_id, app_url, downloads_dir)
            create_linux_appimage(app_id, app_url, downloads_dir)
        except Exception as e:
            print(f"❌ Error creating executables for {app_name}: {e}")
    
    print(f"\n🎉 All executables created in {downloads_dir}/")
    print("📁 Directory structure:")
    print("   downloads/")
    print("   ├── windows/ (Windows .exe files)")
    print("   ├── mac/ (macOS .dmg files)")
    print("   └── linux/ (Linux .AppImage files)")
    
    # Create a simple web server script
    server_script = downloads_dir / 'start_server.py'
    with open(server_script, 'w') as f:
        f.write('''#!/usr/bin/env python3
"""
Simple HTTP server for Cosmic App Store downloads
Run this to serve the downloads over HTTP
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 8080
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🌐 Download server running at http://localhost:{PORT}")
        print(f"📁 Serving files from: {DIRECTORY}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\\n👋 Server stopped")
''')
    
    print(f"\n🌐 To serve downloads over HTTP, run:")
    print(f"   python {server_script}")
    print(f"   Then access: http://localhost:8080")

if __name__ == "__main__":
    create_all_executables() 