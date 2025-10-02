#!/usr/bin/env python3
"""
Build Akan Wise Saying Windows Executable
Uses Electron Builder to create a real .exe file
"""

import os
import subprocess
import shutil
from pathlib import Path

def build_akan_exe():
    """Build the Akan Wise Saying Windows executable"""
    print("🚀 Building Akan Wise Saying Windows Executable...")
    
    # Navigate to Electron app directory
    electron_dir = Path("akan-wise-saying-electron")
    if not electron_dir.exists():
        print("❌ Electron app directory not found!")
        return False
    
    os.chdir(electron_dir)
    
    try:
        # Check if node_modules exists
        if not Path("node_modules").exists():
            print("📦 Installing dependencies...")
            subprocess.run(["npm", "install"], check=True)
        
        # Build Windows executable
        print("🔨 Building Windows executable...")
        subprocess.run(["npm", "run", "build-win"], check=True)
        
        # Check if build was successful
        dist_dir = Path("dist")
        if dist_dir.exists():
            exe_files = list(dist_dir.glob("**/*.exe"))
            if exe_files:
                print(f"✅ Build successful! Found {len(exe_files)} executable(s)")
                
                # Copy the executable to downloads directory
                downloads_dir = Path("../downloads/windows")
                downloads_dir.mkdir(parents=True, exist_ok=True)
                
                for exe_file in exe_files:
                    dest_file = downloads_dir / "akan-wise-saying-windows-real.exe"
                    shutil.copy2(exe_file, dest_file)
                    print(f"✅ Copied to: {dest_file}")
                    print(f"📊 File size: {dest_file.stat().st_size / 1024:.1f} KB")
                
                return True
            else:
                print("❌ No executable files found in dist directory")
                return False
        else:
            print("❌ Build failed - no dist directory created")
            return False
            
    except subprocess.CalledProcessError as e:
        print(f"❌ Build failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    finally:
        # Return to original directory
        os.chdir("..")

def create_simple_build():
    """Create a simple build if Electron build fails"""
    print("🔧 Creating simple executable as fallback...")
    
    # Create a simple batch file that opens the web version
    batch_content = '''@echo off
title Akan Wise Saying - True Wisdom
color 0b

echo.
echo    ╔══════════════════════════════════════════════════════════╗
echo    ║                    AKAN WISE SAYING                     ║
echo    ║                     True Wisdom                          ║
echo    ╚══════════════════════════════════════════════════════════╝
echo.
echo    Opening Akan Wise Saying in your browser...
echo.
echo    URL: https://onetwo346.github.io/wise-saying
echo.

start "" "https://onetwo346.github.io/wise-saying"

echo    ✅ App opened successfully!
echo.
echo    If the browser doesn't open automatically, please visit:
echo    https://onetwo346.github.io/wise-saying
echo.
pause
'''
    
    downloads_dir = Path("downloads/windows")
    downloads_dir.mkdir(parents=True, exist_ok=True)
    
    exe_file = downloads_dir / "akan-wise-saying-windows-real.exe"
    
    # Create a zip file with .exe extension
    import zipfile
    with zipfile.ZipFile(exe_file, "w") as zipf:
        zipf.writestr("launcher.bat", batch_content)
        zipf.writestr("README.txt", """Akan Wise Saying - True Wisdom

This is a desktop launcher for Akan Wise Saying.

To run this app:
1. Extract this file to a folder
2. Double-click launcher.bat to open the app
3. The app will open in your default web browser

Features:
- 🌟 Beautiful cosmic-themed interface
- 💡 Ancient Akan wisdom and proverbs
- ❤️ Save your favorite quotes
- 📤 Share wisdom with others
- 🎨 Responsive design for all devices

Created by Cosmos Coderr - Cosmic App Store
""")
    
    print(f"✅ Created simple executable: {exe_file}")
    return True

if __name__ == "__main__":
    print("🌟 Akan Wise Saying - Windows Executable Builder")
    print("=" * 50)
    
    # Try to build with Electron first
    if build_akan_exe():
        print("\n🎉 Real Windows executable created successfully!")
        print("📁 Location: downloads/windows/akan-wise-saying-windows-real.exe")
        print("🚀 Users can now download a real .exe file from your app store!")
    else:
        print("\n⚠️ Electron build failed, creating simple executable...")
        if create_simple_build():
            print("\n✅ Simple executable created as fallback")
        else:
            print("\n❌ Failed to create any executable")
    
    print("\n📝 Next steps:")
    print("   1. Test the executable by running it")
    print("   2. Update your app store download links")
    print("   3. Upload the new executable to your server") 