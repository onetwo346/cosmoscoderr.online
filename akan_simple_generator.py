#!/usr/bin/env python3
"""
Simple Akan Wise Saying Executable Generator
Creates executable files without encoding issues
"""

import os
import zipfile
from pathlib import Path

def create_akan_executables():
    """Create executable files for Akan Wise Saying"""
    print("🚀 Creating Akan Wise Saying executables...")
    
    # Setup directories
    downloads_dir = Path("downloads")
    downloads_dir.mkdir(exist_ok=True)
    
    for platform in ["windows", "mac", "linux"]:
        (downloads_dir / platform).mkdir(exist_ok=True)
    
    # App details
    app_name = "Akan Wise Saying"
    app_id = "akan-wise-saying"
    web_url = "https://onetwo346.github.io/wise-saying"
    
    # Create Windows executable
    create_windows_exe(app_name, app_id, web_url, downloads_dir)
    
    # Create macOS app
    create_macos_app(app_name, app_id, web_url, downloads_dir)
    
    # Create Linux AppImage
    create_linux_appimage(app_name, app_id, web_url, downloads_dir)
    
    print("✅ All executables created successfully!")

def create_windows_exe(app_name, app_id, web_url, downloads_dir):
    """Create Windows executable"""
    exe_file = downloads_dir / "windows" / f"{app_id}-windows.exe"
    
    # Create batch launcher content
    batch_content = f'''@echo off
title {app_name} - True Wisdom
color 0b

echo.
echo    ╔══════════════════════════════════════════════════════════╗
echo    ║                    AKAN WISE SAYING                     ║
echo    ║                     True Wisdom                          ║
echo    ╚══════════════════════════════════════════════════════════╝
echo.
echo    Opening Akan Wise Saying in your browser...
echo.
echo    URL: {web_url}
echo.

start "" "{web_url}"

echo    ✅ App opened successfully!
echo.
echo    If the browser doesn't open automatically, please visit:
echo    {web_url}
echo.
pause
'''
    
    # Create HTML wrapper content
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{app_name} - True Wisdom</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #0a0a12;
            color: #00f7ff;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }}
        .header {{
            background: linear-gradient(135deg, rgba(30, 30, 61, 0.9), rgba(10, 10, 18, 0.9));
            padding: 1rem;
            text-align: center;
            border-bottom: 1px solid rgba(0, 247, 255, 0.2);
        }}
        .header h1 {{
            margin: 0;
            font-size: 1.5rem;
            background: linear-gradient(90deg, #00f7ff, #ff00f7);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        .app-frame {{
            flex: 1;
            width: 100%;
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
            z-index: 1000;
        }}
        .loading.hidden {{
            display: none;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🌟 {app_name} - True Wisdom</h1>
    </div>
    
    <div class="loading" id="loading">
        <div>Loading Akan Wisdom...</div>
        <div style="font-size: 12px; margin-top: 10px;">Opening {web_url}</div>
    </div>
    
    <iframe src="{web_url}" class="app-frame" id="appFrame" onload="hideLoading()"></iframe>
    
    <script>
        function hideLoading() {{
            document.getElementById('loading').classList.add('hidden');
        }}
        
        setTimeout(() => {{
            document.getElementById('loading').classList.add('hidden');
        }}, 3000);
    </script>
</body>
</html>'''
    
    # Create README content
    readme_content = f"""{app_name} - True Wisdom

This is a desktop launcher for {app_name}.

To run this app:
1. Extract this file to a folder
2. Double-click launcher.bat to open the app
3. Or open app.html in your browser

The app will open in your default web browser.

Original URL: {web_url}

Features:
- 🌟 Beautiful cosmic-themed interface
- 💡 Ancient Akan wisdom and proverbs
- ❤️ Save your favorite quotes
- 📤 Share wisdom with others
- 🎨 Responsive design for all devices

Created by Cosmos Coderr - Cosmic App Store
"""
    
    # Create the executable (zip with .exe extension)
    with zipfile.ZipFile(exe_file, "w") as zipf:
        zipf.writestr("launcher.bat", batch_content)
        zipf.writestr("app.html", html_content)
        zipf.writestr("README.txt", readme_content)
        zipf.writestr("icon.txt", f"{app_name}\nTrue Wisdom from the Akan People\n\n🌟 Discover ancient wisdom\n💡 Learn from Akan proverbs\n❤️ Save your favorites\n📤 Share with others\n\nCreated by Cosmos Coderr")
    
    print(f"✅ Created Windows executable: {exe_file}")

def create_macos_app(app_name, app_id, web_url, downloads_dir):
    """Create macOS app bundle"""
    dmg_file = downloads_dir / "mac" / f"{app_id}-mac.dmg"
    
    # Create shell launcher content
    shell_content = f'''#!/bin/bash

# {app_name} - Desktop Launcher
# Opens the Akan Wise Saying web app in the default browser

echo "🌟 {app_name} - True Wisdom"
echo "=================================================="
echo "Opening {app_name} in your browser..."
echo "URL: {web_url}"
echo "=================================================="

# Try different commands to open the browser
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "{web_url}"
elif command -v sensible-browser >/dev/null 2>&1; then
    sensible-browser "{web_url}"
elif command -v x-www-browser >/dev/null 2>&1; then
    x-www-browser "{web_url}"
elif command -v firefox >/dev/null 2>&1; then
    firefox "{web_url}"
elif command -v chromium-browser >/dev/null 2>&1; then
    chromium-browser "{web_url}"
elif command -v google-chrome >/dev/null 2>&1; then
    google-chrome "{web_url}"
else
    echo "❌ No suitable browser found."
    echo "Please manually visit: {web_url}"
    read -p "Press Enter to exit..."
    exit 1
fi

echo "✅ App opened successfully!"
echo ""
read -p "Press Enter to close this launcher..."
'''
    
    # Create HTML wrapper (same as Windows)
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{app_name} - True Wisdom</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #0a0a12;
            color: #00f7ff;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }}
        .header {{
            background: linear-gradient(135deg, rgba(30, 30, 61, 0.9), rgba(10, 10, 18, 0.9));
            padding: 1rem;
            text-align: center;
            border-bottom: 1px solid rgba(0, 247, 255, 0.2);
        }}
        .header h1 {{
            margin: 0;
            font-size: 1.5rem;
            background: linear-gradient(90deg, #00f7ff, #ff00f7);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        .app-frame {{
            flex: 1;
            width: 100%;
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
            z-index: 1000;
        }}
        .loading.hidden {{
            display: none;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🌟 {app_name} - True Wisdom</h1>
    </div>
    
    <div class="loading" id="loading">
        <div>Loading Akan Wisdom...</div>
        <div style="font-size: 12px; margin-top: 10px;">Opening {web_url}</div>
    </div>
    
    <iframe src="{web_url}" class="app-frame" id="appFrame" onload="hideLoading()"></iframe>
    
    <script>
        function hideLoading() {{
            document.getElementById('loading').classList.add('hidden');
        }}
        
        setTimeout(() => {{
            document.getElementById('loading').classList.add('hidden');
        }}, 3000);
    </script>
</body>
</html>'''
    
    # Create README content
    readme_content = f"""{app_name} - True Wisdom

This is a desktop launcher for {app_name}.

To run this app:
1. Extract this file to a folder
2. Run: chmod +x launcher.sh && ./launcher.sh
3. Or open app.html in your browser

The app will open in your default web browser.

Original URL: {web_url}

Features:
- 🌟 Beautiful cosmic-themed interface
- 💡 Ancient Akan wisdom and proverbs
- ❤️ Save your favorite quotes
- 📤 Share wisdom with others
- 🎨 Responsive design for all devices

Created by Cosmos Coderr - Cosmic App Store
"""
    
    # Create the DMG file (zip with .dmg extension)
    with zipfile.ZipFile(dmg_file, "w") as zipf:
        zipf.writestr("launcher.sh", shell_content)
        zipf.writestr("app.html", html_content)
        zipf.writestr("README.txt", readme_content)
    
    print(f"✅ Created macOS app: {dmg_file}")

def create_linux_appimage(app_name, app_id, web_url, downloads_dir):
    """Create Linux AppImage"""
    appimage_file = downloads_dir / "linux" / f"{app_id}-linux.AppImage"
    
    # Use same content as macOS (shell launcher)
    shell_content = f'''#!/bin/bash

# {app_name} - Desktop Launcher
# Opens the Akan Wise Saying web app in the default browser

echo "🌟 {app_name} - True Wisdom"
echo "=================================================="
echo "Opening {app_name} in your browser..."
echo "URL: {web_url}"
echo "=================================================="

# Try different commands to open the browser
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "{web_url}"
elif command -v sensible-browser >/dev/null 2>&1; then
    sensible-browser "{web_url}"
elif command -v x-www-browser >/dev/null 2>&1; then
    x-www-browser "{web_url}"
elif command -v firefox >/dev/null 2>&1; then
    firefox "{web_url}"
elif command -v chromium-browser >/dev/null 2>&1; then
    chromium-browser "{web_url}"
elif command -v google-chrome >/dev/null 2>&1; then
    google-chrome "{web_url}"
else
    echo "❌ No suitable browser found."
    echo "Please manually visit: {web_url}"
    read -p "Press Enter to exit..."
    exit 1
fi

echo "✅ App opened successfully!"
echo ""
read -p "Press Enter to close this launcher..."
'''
    
    # Use same HTML content
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{app_name} - True Wisdom</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #0a0a12;
            color: #00f7ff;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }}
        .header {{
            background: linear-gradient(135deg, rgba(30, 30, 61, 0.9), rgba(10, 10, 18, 0.9));
            padding: 1rem;
            text-align: center;
            border-bottom: 1px solid rgba(0, 247, 255, 0.2);
        }}
        .header h1 {{
            margin: 0;
            font-size: 1.5rem;
            background: linear-gradient(90deg, #00f7ff, #ff00f7);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        .app-frame {{
            flex: 1;
            width: 100%;
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
            z-index: 1000;
        }}
        .loading.hidden {{
            display: none;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🌟 {app_name} - True Wisdom</h1>
    </div>
    
    <div class="loading" id="loading">
        <div>Loading Akan Wisdom...</div>
        <div style="font-size: 12px; margin-top: 10px;">Opening {web_url}</div>
    </div>
    
    <iframe src="{web_url}" class="app-frame" id="appFrame" onload="hideLoading()"></iframe>
    
    <script>
        function hideLoading() {{
            document.getElementById('loading').classList.add('hidden');
        }}
        
        setTimeout(() => {{
            document.getElementById('loading').classList.add('hidden');
        }}, 3000);
    </script>
</body>
</html>'''
    
    # Create README content
    readme_content = f"""{app_name} - True Wisdom

This is a desktop launcher for {app_name}.

To run this app:
1. Extract this file to a folder
2. Run: chmod +x launcher.sh && ./launcher.sh
3. Or open app.html in your browser

The app will open in your default web browser.

Original URL: {web_url}

Features:
- 🌟 Beautiful cosmic-themed interface
- 💡 Ancient Akan wisdom and proverbs
- ❤️ Save your favorite quotes
- 📤 Share wisdom with others
- 🎨 Responsive design for all devices

Created by Cosmos Coderr - Cosmic App Store
"""
    
    # Create the AppImage file (zip with .AppImage extension)
    with zipfile.ZipFile(appimage_file, "w") as zipf:
        zipf.writestr("launcher.sh", shell_content)
        zipf.writestr("app.html", html_content)
        zipf.writestr("README.txt", readme_content)
    
    print(f"✅ Created Linux AppImage: {appimage_file}")

if __name__ == "__main__":
    create_akan_executables()
    print("\n🎉 Akan Wise Saying executables created successfully!")
    print("📁 Check the downloads/ directory for the files")
    print("🌐 Web version: https://onetwo346.github.io/wise-saying") 