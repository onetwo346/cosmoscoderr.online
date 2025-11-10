# Quick Admin Reference Card

## 🎯 Change Announcement Message (2 Minutes)

### Step 1: Open File
Open `admin-announcements.js`

### Step 2: Find This Section (Line 11)
```javascript
message: "🎮 <strong>Exciting News!</strong> Download games on your laptops will be available soon. Stay tuned!",
```

### Step 3: Change Your Message
```javascript
message: "YOUR NEW MESSAGE HERE",
```

### Step 4: Save & Refresh
Save the file, then refresh your website!

---

## 📝 Common Message Templates

### New Feature
```javascript
message: "🚀 <strong>New!</strong> Check out our latest feature!",
```

### Sale/Promotion
```javascript
message: "⭐ <strong>50% OFF</strong> This weekend only!",
```

### Maintenance Notice
```javascript
message: "⚠️ <strong>Scheduled Maintenance</strong> Tonight 12-2AM",
```

### Celebration
```javascript
message: "🎉 <strong>Thank You!</strong> We hit 10,000 downloads!",
```

### Update
```javascript
message: "💡 <strong>Coming Soon:</strong> Download games on laptops!",
```

---

## ⚙️ Quick Settings

### Turn On/Off
```javascript
enabled: true,   // Shows announcement
enabled: false,  // Hides announcement
```

### Change Color Theme
```javascript
type: "info",         // Blue/Cyan (default)
type: "success",      // Green (good news)
type: "warning",      // Orange (important)
type: "announcement", // Pink (special)
```

### Change Position
```javascript
position: "top",    // Top of screen ← Current
position: "center", // Middle of screen
position: "bottom", // Bottom of screen
```

### How Long to Show
```javascript
displayDuration: 8000,  // 8 seconds (current)
displayDuration: 5000,  // 5 seconds
displayDuration: 10000, // 10 seconds
```

### Show Once or Always
```javascript
showOnce: false, // Shows every time (current)
showOnce: true,  // Shows once per session
```

---

## 🎨 Formatting Your Message

### Bold Text
```javascript
message: "<strong>This text is bold</strong>",
```

### Emojis (Copy & Paste)
🚀 🎉 ⭐ 💡 ⚠️ 🎮 📢 ✨ 🔥 💪 🎯 📱 💻 🌟 ⏰ 🎁

### Combine Both
```javascript
message: "🚀 <strong>Bold text</strong> with emoji!",
```

---

## 📱 Current Active Settings

```javascript
enabled: true                    // ✅ Announcement is ON
message: "Download games..."     // Current message
type: "info"                     // Blue theme
displayDuration: 8000            // Shows for 8 seconds
showOnce: false                  // Shows every visit
position: "top"                  // At top of screen
animation: "slideDown"           // Slides from top
showCloseButton: true            // Has X button
autoClose: true                  // Closes automatically
icon: "🚀"                       // Rocket emoji
```

---

## 🆘 Quick Troubleshooting

**Not showing?**
- Check `enabled: true`
- Clear browser cache (Ctrl+Shift+Del)

**Text too long on mobile?**
- Make message shorter
- Use fewer words

**Wrong color?**
- Change `type:` to "info", "success", "warning", or "announcement"

---

## 📞 Need More Help?

See full guide: `ADMIN_ANNOUNCEMENT_GUIDE.md`

---

**File Location:** `admin-announcements.js`
**Edit Time:** ~2 minutes
**Coding Required:** None!
