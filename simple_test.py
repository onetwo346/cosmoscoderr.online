#!/usr/bin/env python3
"""
Simple Test for Download System
"""

from pathlib import Path

def test_files():
    """Test if the executable files exist"""
    print("🌟 Testing Akan Wise Saying Downloads")
    print("=" * 40)
    
    downloads_dir = Path("downloads")
    test_files = [
        "windows/akan-wise-saying-windows.exe",
        "mac/akan-wise-saying-mac.dmg", 
        "linux/akan-wise-saying-linux.AppImage"
    ]
    
    all_exist = True
    for file_path in test_files:
        full_path = downloads_dir / file_path
        if full_path.exists():
            size = full_path.stat().st_size
            print(f"✅ {file_path} - Exists ({size} bytes)")
        else:
            print(f"❌ {file_path} - Missing")
            all_exist = False
    
    if all_exist:
        print("\n🎉 All files exist! Download system is ready!")
        print("\n📥 Download URLs:")
        print("   Windows: http://localhost:8000/windows/akan-wise-saying-windows.exe")
        print("   macOS: http://localhost:8000/mac/akan-wise-saying-mac.dmg")
        print("   Linux: http://localhost:8000/linux/akan-wise-saying-linux.AppImage")
        print("\n🚀 To test downloads:")
        print("   1. Run: python local_download_server.py")
        print("   2. Open your app store in browser")
        print("   3. Click download on Akan Wise Saying app")
        print("   4. The download should work immediately!")
    else:
        print("\n❌ Some files are missing. Please run the generator first.")

if __name__ == "__main__":
    test_files() 