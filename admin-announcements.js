/* ========================================
   ADMIN ANNOUNCEMENT POPUP SYSTEM
   Separate file for easy admin management
   ======================================== */

// ADMIN CONFIGURATION - Edit this section to change the announcement
const ADMIN_CONFIG = {
    // Enable or disable the announcement
    enabled: true,
    
    // Announcement message (supports HTML)
    message: "🎮 <strong>Exciting News!</strong> Download games on your laptops will be available soon. Stay tuned!",
    
    // Popup styling
    type: "info", // Options: "info", "success", "warning", "announcement"
    
    // Display settings
    displayDuration: 8000, // How long to show (in milliseconds) - 8 seconds
    showOnce: false, // If true, shows only once per session
    
    // Position
    position: "top", // Options: "top", "center", "bottom"
    
    // Animation
    animation: "slideDown", // Options: "slideDown", "fadeIn", "bounce", "pulse"
    
    // Close button
    showCloseButton: true,
    autoClose: true, // Auto-close after displayDuration
    
    // Icon
    icon: "🚀" // Emoji or leave empty for none
};

// ===== DO NOT EDIT BELOW THIS LINE (unless you know what you're doing) =====

class AnnouncementPopup {
    constructor(config) {
        this.config = config;
        this.popup = null;
        this.sessionKey = 'cosmoscoderr_announcement_shown';
    }
    
    init() {
        // Check if announcement is enabled
        if (!this.config.enabled) return;
        
        // Check if should show only once
        if (this.config.showOnce && this.hasBeenShown()) return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.show());
        } else {
            // Delay slightly to not interfere with page load
            setTimeout(() => this.show(), 1000);
        }
    }
    
    hasBeenShown() {
        return sessionStorage.getItem(this.sessionKey) === 'true';
    }
    
    markAsShown() {
        sessionStorage.setItem(this.sessionKey, 'true');
    }
    
    show() {
        // Create popup element
        this.createPopup();
        
        // Add to DOM
        document.body.appendChild(this.popup);
        
        // Trigger animation
        setTimeout(() => {
            this.popup.classList.add('active');
        }, 100);
        
        // Auto-close if enabled
        if (this.config.autoClose) {
            setTimeout(() => {
                this.close();
            }, this.config.displayDuration);
        }
        
        // Mark as shown if showOnce is enabled
        if (this.config.showOnce) {
            this.markAsShown();
        }
    }
    
    createPopup() {
        // Create container
        this.popup = document.createElement('div');
        this.popup.className = `admin-announcement-popup ${this.config.position} ${this.config.animation} ${this.config.type}`;
        
        // Create content wrapper
        const content = document.createElement('div');
        content.className = 'announcement-content';
        
        // Add icon if provided
        if (this.config.icon) {
            const icon = document.createElement('span');
            icon.className = 'announcement-icon';
            icon.textContent = this.config.icon;
            content.appendChild(icon);
        }
        
        // Add message
        const message = document.createElement('div');
        message.className = 'announcement-message';
        message.innerHTML = this.config.message;
        content.appendChild(message);
        
        // Add close button if enabled
        if (this.config.showCloseButton) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'announcement-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close announcement');
            closeBtn.onclick = () => this.close();
            content.appendChild(closeBtn);
        }
        
        this.popup.appendChild(content);
    }
    
    close() {
        if (!this.popup) return;
        
        // Remove active class for exit animation
        this.popup.classList.remove('active');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (this.popup && this.popup.parentNode) {
                this.popup.parentNode.removeChild(this.popup);
            }
        }, 400);
    }
}

// Initialize announcement system
const announcementSystem = new AnnouncementPopup(ADMIN_CONFIG);
announcementSystem.init();

// Expose globally for manual control if needed
window.CosmosAnnouncementSystem = {
    show: () => announcementSystem.show(),
    close: () => announcementSystem.close(),
    updateConfig: (newConfig) => {
        Object.assign(ADMIN_CONFIG, newConfig);
        announcementSystem.config = ADMIN_CONFIG;
    }
};
