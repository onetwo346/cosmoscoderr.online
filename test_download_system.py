#!/usr/bin/env python3
"""
Test Download System for Cosmic App Store
Verifies that executable files are accessible and working
"""

import requests
import os
from pathlib import Path

def test_download_urls():
    """Test if the download URLs are working"""
    print("🧪 Testing download system...")
    
    # Test URLs
    test_urls = [
        "http://localhost:8000/windows/akan-wise-saying-windows.exe",
        "http://localhost:8000/mac/akan-wise-saying-mac.dmg",
        "http://localhost:8000/linux/akan-wise-saying-linux.AppImage"
    ]
    
    for url in test_urls:
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                print(f"✅ {url} - Working (Size: {len(response.content)} bytes)")
            else:
                print(f"❌ {url} - Failed (Status: {response.status_code})")
        except Exception as e:
            print(f"❌ {url} - Error: {e}")
    
    print("\n📊 Download System Test Results:")
    print("✅ If all URLs show 'Working', the download system is ready!")
    print("🌐 You can now test downloads from your app store")

def test_local_files():
    """Test if the executable files exist locally"""
    print("\n📁 Testing local files...")
    
    downloads_dir = Path("downloads")
    test_files = [
        "windows/akan-wise-saying-windows.exe",
        "mac/akan-wise-saying-mac.dmg", 
        "linux/akan-wise-saying-linux.AppImage"
    ]
    
    for file_path in test_files:
        full_path = downloads_dir / file_path
        if full_path.exists():
            size = full_path.stat().st_size
            print(f"✅ {file_path} - Exists ({size} bytes)")
        else:
            print(f"❌ {file_path} - Missing")

def create_test_download():
    """Create a test download to verify the system works"""
    print("\n🎯 Creating test download...")
    
    # Create a simple test executable
    test_exe_content = """@echo off
echo.
echo    ╔══════════════════════════════════════════════════════════╗
echo    ║                    TEST DOWNLOAD                         ║
echo    ║                     SUCCESSFUL!                          ║
echo    ╚══════════════════════════════════════════════════════════╝
echo.
echo    ✅ Download system is working correctly!
echo    🌟 You can now download apps from your Cosmic App Store
echo.
pause
"""
    
    test_file = Path("downloads/windows/test-download.exe")
    test_file.parent.mkdir(exist_ok=True)
    
    with open(test_file, "w") as f:
        f.write(test_exe_content)
    
    print(f"✅ Created test file: {test_file}")
    print(f"🌐 Test URL: http://localhost:8000/windows/test-download.exe")

if __name__ == "__main__":
    print("🌟 Cosmic App Store - Download System Test")
    print("=" * 50)
    
    # Test local files
    test_local_files()
    
    # Create test download
    create_test_download()
    
    # Test download URLs (if server is running)
    print("\n🔄 Testing download URLs (make sure server is running)...")
    test_download_urls()
    
    print("\n🎉 Test complete!")
    print("📝 Next steps:")
    print("   1. Make sure the local server is running: python local_download_server.py")
    print("   2. Open your app store in the browser")
    print("   3. Try downloading the Akan Wise Saying app")
    print("   4. The download should work immediately!") 