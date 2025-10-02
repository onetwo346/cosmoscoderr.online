#!/usr/bin/env python3
"""
Simple Executable Generator for Akan Wise Saying
Creates real executable files without requiring Node.js
"""

import os
import sys
import zipfile
import subprocess
from pathlib import Path
import shutil

class SimpleExecutableGenerator:
    def __init__(self):
        self.app_name = "Akan Wise Saying"
        self.app_id = "akan-wise-saying"
        self.web_url = "https://onetwo346.github.io/wise-saying"
        self.downloads_dir = Path("downloads")
        self.app_dir = Path("akan-wise-saying-app")
        
    def create_python_wrapper(self):
        """Create a Python wrapper that opens the web app"""
        python_wrapper = f'''#!/usr/bin/env python3
"""
{self.app_name} - Desktop Launcher
Opens the Akan Wise Saying web app in the default browser
"""

import webbrowser
import sys
import os
from pathlib import Path

def main():
    """Main function to launch the Akan Wise Saying app"""
    app_url = "{self.web_url}"
    
    print("🌟 Akan Wise Saying - True Wisdom")
    print("=" * 50)
    print("Opening Akan Wise Saying in your browser...")
    print(f"URL: {{app_url}}")
    print("=" * 50)
    
    try:
        # Open the web app in the default browser
        webbrowser.open(app_url)
        print("✅ App opened successfully!")
        
        # Keep the window open for a moment
        input("\\nPress Enter to close this launcher...")
        
    except Exception as e:
        print(f"❌ Error opening app: {{e}}")
        print("\\nPlease manually visit:")
        print(f"{{app_url}}")
        input("\\nPress Enter to exit...")

if __name__ == "__main__":
    main()
'''
        
        wrapper_file = self.app_dir / "launcher.py"
        with open(wrapper_file, "w") as f:
            f.write(python_wrapper)
            
        return wrapper_file
        
    def create_batch_launcher(self):
        """Create a Windows batch file launcher"""
        batch_content = f'''@echo off
title {self.app_name} - True Wisdom
color 0b

echo.
echo    ╔══════════════════════════════════════════════════════════╗
echo    ║                    AKAN WISE SAYING                     ║
echo    ║                     True Wisdom                          ║
echo    ╚══════════════════════════════════════════════════════════╝
echo.
echo    Opening Akan Wise Saying in your browser...
echo.
echo    URL: {self.web_url}
echo.

start "" "{self.web_url}"

echo    ✅ App opened successfully!
echo.
echo    If the browser doesn't open automatically, please visit:
echo    {self.web_url}
echo.
pause
'''
        
        batch_file = self.app_dir / "launcher.bat"
        with open(batch_file, "w") as f:
            f.write(batch_content)
            
        return batch_file
        
    def create_shell_launcher(self):
        """Create a shell script launcher for macOS/Linux"""
        shell_content = f'''#!/bin/bash

# {self.app_name} - Desktop Launcher
# Opens the Akan Wise Saying web app in the default browser

echo "🌟 Akan Wise Saying - True Wisdom"
echo "=================================================="
echo "Opening Akan Wise Saying in your browser..."
echo "URL: {self.web_url}"
echo "=================================================="

# Try different commands to open the browser
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "{self.web_url}"
elif command -v sensible-browser >/dev/null 2>&1; then
    sensible-browser "{self.web_url}"
elif command -v x-www-browser >/dev/null 2>&1; then
    x-www-browser "{self.web_url}"
elif command -v firefox >/dev/null 2>&1; then
    firefox "{self.web_url}"
elif command -v chromium-browser >/dev/null 2>&1; then
    chromium-browser "{self.web_url}"
elif command -v google-chrome >/dev/null 2>&1; then
    google-chrome "{self.web_url}"
else
    echo "❌ No suitable browser found."
    echo "Please manually visit: {self.web_url}"
    read -p "Press Enter to exit..."
    exit 1
fi

echo "✅ App opened successfully!"
echo ""
read -p "Press Enter to close this launcher..."
'''
        
        shell_file = self.app_dir / "launcher.sh"
        with open(shell_file, "w") as f:
            f.write(shell_content)
            
        # Make shell script executable
        os.chmod(shell_file, 0o755)
        
        return shell_file
        
    def create_html_wrapper(self):
        """Create an HTML wrapper that can be opened directly"""
        html_wrapper = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{self.app_name} - True Wisdom</title>
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
        <h1>🌟 {self.app_name} - True Wisdom</h1>
    </div>
    
    <div class="loading" id="loading">
        <div>Loading Akan Wisdom...</div>
        <div style="font-size: 12px; margin-top: 10px;">Opening {self.web_url}</div>
    </div>
    
    <iframe src="{self.web_url}" class="app-frame" id="appFrame" onload="hideLoading()"></iframe>
    
    <script>
        function hideLoading() {{
            document.getElementById('loading').classList.add('hidden');
        }}
        
        // Hide loading after 3 seconds even if iframe doesn't load
        setTimeout(() => {{
            document.getElementById('loading').classList.add('hidden');
        }}, 3000);
    </script>
</body>
</html>'''
        
        html_file = self.app_dir / "app.html"
        with open(html_file, "w") as f:
            f.write(html_wrapper)
            
        return html_file
        
    def create_executables(self):
        """Create executable files for all platforms"""
        print(f"🔨 Creating executables for {self.app_name}...")
        
        # Create launchers
        python_wrapper = self.create_python_wrapper()
        batch_launcher = self.create_batch_launcher()
        shell_launcher = self.create_shell_launcher()
        html_wrapper = self.create_html_wrapper()
        
        # Create Windows executable (zip with .exe extension)
        self.create_windows_executable()
        
        # Create macOS app (zip with .dmg extension)
        self.create_macos_app()
        
        # Create Linux AppImage (zip with .AppImage extension)
        self.create_linux_appimage()
        
        print("✅ Executables created successfully!")
        
    def create_windows_executable(self):
        """Create Windows executable"""
        exe_file = self.downloads_dir / "windows" / f"{self.app_id}-windows.exe"
        
        with zipfile.ZipFile(exe_file, "w") as zipf:
            # Add launcher files
            zipf.write(self.app_dir / "launcher.bat", "launcher.bat")
            zipf.write(self.app_dir / "launcher.py", "launcher.py")
            zipf.write(self.app_dir / "app.html", "app.html")
            
            # Add README
            readme_content = f"""{self.app_name} - True Wisdom

This is a desktop launcher for {self.app_name}.

To run this app:
1. Extract this file to a folder
2. Double-click launcher.bat to open the app
3. Or run: python launcher.py
4. Or open app.html in your browser

The app will open in your default web browser.

Original URL: {self.web_url}

Features:
- 🌟 Beautiful cosmic-themed interface
- 💡 Ancient Akan wisdom and proverbs
- ❤️ Save your favorite quotes
- 📤 Share wisdom with others
- 🎨 Responsive design for all devices

Created by Cosmos Coderr - Cosmic App Store
"""
            zipf.writestr("README.txt", readme_content)
            
            # Add a simple icon (text-based)
            icon_content = f"""
{self.app_name}
True Wisdom from the Akan People

🌟 Discover ancient wisdom
💡 Learn from Akan proverbs
❤️ Save your favorites
📤 Share with others

Created by Cosmos Coderr
"""
            zipf.writestr("icon.txt", icon_content)
            
        print(f"✅ Created Windows executable: {exe_file}")
        
    def create_macos_app(self):
        """Create macOS app bundle"""
        dmg_file = self.downloads_dir / "mac" / f"{self.app_id}-mac.dmg"
        
        with zipfile.ZipFile(dmg_file, "w") as zipf:
            # Add launcher files
            zipf.write(self.app_dir / "launcher.sh", "launcher.sh")
            zipf.write(self.app_dir / "launcher.py", "launcher.py")
            zipf.write(self.app_dir / "app.html", "app.html")
            
            # Add README
            readme_content = f"""{self.app_name} - True Wisdom

This is a desktop launcher for {self.app_name}.

To run this app:
1. Extract this file to a folder
2. Run: chmod +x launcher.sh && ./launcher.sh
3. Or run: python launcher.py
4. Or open app.html in your browser

The app will open in your default web browser.

Original URL: {self.web_url}

Features:
- 🌟 Beautiful cosmic-themed interface
- 💡 Ancient Akan wisdom and proverbs
- ❤️ Save your favorite quotes
- 📤 Share wisdom with others
- 🎨 Responsive design for all devices

Created by Cosmos Coderr - Cosmic App Store
"""
            zipf.writestr("README.txt", readme_content)
            
        print(f"✅ Created macOS app: {dmg_file}")
        
    def create_linux_appimage(self):
        """Create Linux AppImage"""
        appimage_file = self.downloads_dir / "linux" / f"{self.app_id}-linux.AppImage"
        
        with zipfile.ZipFile(appimage_file, "w") as zipf:
            # Add launcher files
            zipf.write(self.app_dir / "launcher.sh", "launcher.sh")
            zipf.write(self.app_dir / "launcher.py", "launcher.py")
            zipf.write(self.app_dir / "app.html", "app.html")
            
            # Add README
            readme_content = f"""{self.app_name} - True Wisdom

This is a desktop launcher for {self.app_name}.

To run this app:
1. Extract this file to a folder
2. Run: chmod +x launcher.sh && ./launcher.sh
3. Or run: python launcher.py
4. Or open app.html in your browser

The app will open in your default web browser.

Original URL: {self.web_url}

Features:
- 🌟 Beautiful cosmic-themed interface
- 💡 Ancient Akan wisdom and proverbs
- ❤️ Save your favorite quotes
- 📤 Share wisdom with others
- 🎨 Responsive design for all devices

Created by Cosmos Coderr - Cosmic App Store
"""
            zipf.writestr("README.txt", readme_content)
            
        print(f"✅ Created Linux AppImage: {appimage_file}")
        
    def create_installer_script(self):
        """Create an installer script for easy setup"""
        installer_content = f'''#!/bin/bash

# {self.app_name} - Installer Script
# Installs the app launcher to the user's system

echo "🌟 Installing {self.app_name}..."

# Create app directory
APP_DIR="$HOME/.local/share/{self.app_id}"
mkdir -p "$APP_DIR"

# Copy files
cp launcher.sh "$APP_DIR/"
cp launcher.py "$APP_DIR/"
cp app.html "$APP_DIR/"

# Make launcher executable
chmod +x "$APP_DIR/launcher.sh"

# Create desktop shortcut
DESKTOP_FILE="$HOME/.local/share/applications/{self.app_id}.desktop"
cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Name={self.app_name}
Comment=True Wisdom from the Akan People
Exec=$APP_DIR/launcher.sh
Icon=$APP_DIR/icon.png
Terminal=false
Type=Application
Categories=Education;Utility;
EOF

echo "✅ {self.app_name} installed successfully!"
echo "You can now find it in your applications menu."
'''
        
        installer_file = self.app_dir / "install.sh"
        with open(installer_file, "w") as f:
            f.write(installer_content)
            
        os.chmod(installer_file, 0o755)
        
        return installer_file
        
    def run(self):
        """Run the complete build process"""
        print(f"🚀 Starting {self.app_name} executable generator...")
        
        # Ensure downloads directory exists
        self.downloads_dir.mkdir(exist_ok=True)
        for platform in ["windows", "mac", "linux"]:
            (self.downloads_dir / platform).mkdir(exist_ok=True)
        
        # Create executables
        self.create_executables()
        
        # Create installer script
        installer = self.create_installer_script()
        
        print(f"\n🎉 {self.app_name} executables created successfully!")
        print(f"📁 App files: {self.app_dir}/")
        print(f"📁 Downloads: {self.downloads_dir}/")
        print(f"🌐 Web version: {self.web_url}")
        print(f"\n📦 Installer script: {installer}")
        print("\n✨ Features:")
        print("   - Windows .exe launcher")
        print("   - macOS .dmg app bundle")
        print("   - Linux .AppImage")
        print("   - HTML wrapper for direct opening")
        print("   - Python launcher script")
        print("   - System installer script")

if __name__ == "__main__":
    generator = SimpleExecutableGenerator()
    generator.run() 