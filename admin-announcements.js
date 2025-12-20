/* ========================================
   ADMIN ANNOUNCEMENT - FOOTER MARQUEE
   Elegant scrolling banner at the bottom
   ======================================== */

// ADMIN CONFIGURATION - Edit this section to change the announcement
const ADMIN_CONFIG = {
    // Enable or disable the announcement
    enabled: true,
    
    // Announcement message (supports HTML)
    message: "<strong>Exciting News!</strong> Download games on your laptops will be available soon. Stay tuned!",
    
    // Display settings
    showOnce: false, // If true, shows only once per session
    
    // Close button
    showCloseButton: true,
    
    // Icon
    icon: "🚀", // Emoji or leave empty for none
    
    // Scroll speed (seconds for one complete scroll)
    scrollSpeed: 45,
    
    // Auto close after X seconds (0 = never auto close)
    autoCloseAfter: 30
};

// ===== DO NOT EDIT BELOW THIS LINE (unless you know what you're doing) =====

class FooterMarquee {
    constructor(config) {
        this.config = config;
        this.marquee = null;
        this.sessionKey = 'cosmoscoderr_announcement_closed';
    }
    
    init() {
        // Check if announcement is enabled
        if (!this.config.enabled) return;
        
        // Check if user closed it this session
        if (this.config.showOnce && this.hasBeenClosed()) return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.show());
        } else {
            setTimeout(() => this.show(), 500);
        }
    }
    
    hasBeenClosed() {
        return sessionStorage.getItem(this.sessionKey) === 'true';
    }
    
    markAsClosed() {
        sessionStorage.setItem(this.sessionKey, 'true');
    }
    
    show() {
        this.createMarquee();
        document.body.appendChild(this.marquee);
        
        // Trigger entrance animation
        setTimeout(() => {
            this.marquee.classList.add('entering');
        }, 100);
        
        // Auto close after specified time
        if (this.config.autoCloseAfter > 0) {
            setTimeout(() => {
                this.close();
            }, this.config.autoCloseAfter * 1000);
        }
    }
    
    createMarquee() {
        // Create container
        this.marquee = document.createElement('div');
        this.marquee.className = 'announcement-footer-marquee';
        this.marquee.id = 'announcement-footer-marquee';
        
        // Create scrolling track
        const track = document.createElement('div');
        track.className = 'marquee-track';
        
        // Create content items for seamless infinite scroll
        const createContentItem = () => {
            const content = document.createElement('div');
            content.className = 'marquee-content';
            
            // Add icon
            if (this.config.icon) {
                const icon = document.createElement('span');
                icon.className = 'marquee-icon';
                icon.textContent = this.config.icon;
                content.appendChild(icon);
            }
            
            // Add message
            const message = document.createElement('span');
            message.className = 'marquee-message';
            message.innerHTML = this.config.message;
            content.appendChild(message);
            
            return content;
        };
        
        // Add multiple copies for seamless loop
        for (let i = 0; i < 4; i++) {
            track.appendChild(createContentItem());
            
            // Add separator
            const separator = document.createElement('span');
            separator.className = 'marquee-separator';
            track.appendChild(separator);
        }
        
        this.marquee.appendChild(track);
        
        // Add close button
        if (this.config.showCloseButton) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'marquee-close';
            closeBtn.innerHTML = '×';
            closeBtn.setAttribute('aria-label', 'Close announcement');
            closeBtn.setAttribute('type', 'button');
            
            // Use addEventListener for better reliability
            const self = this;
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.close();
            }, true);
            
            this.marquee.appendChild(closeBtn);
        }
    }
    
    close() {
        if (!this.marquee) return;
        
        this.marquee.classList.remove('entering');
        this.marquee.classList.add('exiting');
        
        // Mark as closed
        this.markAsClosed();
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (this.marquee && this.marquee.parentNode) {
                this.marquee.parentNode.removeChild(this.marquee);
            }
        }, 500);
    }
}

// Initialize announcement system
const announcementSystem = new FooterMarquee(ADMIN_CONFIG);
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
