// Holiday Loop System - Automatic Holiday Theme Detection
// Detects current holiday and applies appropriate theme automatically

class HolidayLoop {
    constructor() {
        this.holidays = [
            {
                name: 'boxing-day',
                start: { month: 12, day: 26 },
                end: { month: 12, day: 26 },
                displayName: 'Boxing Day',
                greeting: 'Happy Boxing Day! 🎁',
                emoji: '🎁',
                description: 'A day for giving, sharing, and spending time with loved ones!',
                colors: { primary: '#ff6b35', secondary: '#00bcd4', accent: '#ffd700' }
            },
            {
                name: 'new-year',
                start: { month: 12, day: 31 },
                end: { month: 1, day: 7 },
                displayName: 'New Year',
                greeting: 'Happy New Year! 🎆',
                emoji: '🎆',
                description: 'Welcome the new year with hope, joy, and endless possibilities!',
                colors: { primary: '#ffd700', secondary: '#00d4ff', accent: '#ff69b4' }
            },
            {
                name: 'valentines',
                start: { month: 2, day: 10 },
                end: { month: 2, day: 15 },
                displayName: 'Valentine\'s Day',
                greeting: 'Happy Valentine\'s Day! 💕',
                emoji: '💕',
                description: 'Celebrate love, friendship, and all the special connections in your life!',
                colors: { primary: '#ff1744', secondary: '#ff69b4', accent: '#ff4081' }
            },
            {
                name: 'st-patricks',
                start: { month: 3, day: 14 },
                end: { month: 3, day: 18 },
                displayName: 'St. Patrick\'s Day',
                greeting: 'Happy St. Patrick\'s Day! 🍀',
                emoji: '🍀',
                description: 'May the luck of the Irish be with you today and always!',
                colors: { primary: '#00ff00', secondary: '#32cd32', accent: '#228b22' }
            },
            {
                name: 'easter',
                start: { month: 3, day: 20 },
                end: { month: 4, day: 25 },
                displayName: 'Easter',
                greeting: 'Happy Easter! 🐰',
                emoji: '🐰',
                description: 'Celebrate renewal, hope, and the joy of spring!',
                colors: { primary: '#ff69b4', secondary: '#87ceeb', accent: '#98fb98' }
            },
            {
                name: 'independence',
                start: { month: 7, day: 1 },
                end: { month: 7, day: 7 },
                displayName: 'Independence Day',
                greeting: 'Happy Independence Day! 🎆',
                emoji: '🎆',
                description: 'Celebrating freedom, unity, and the spirit of independence!',
                colors: { primary: '#ff0000', secondary: '#0000ff', accent: '#ffffff' }
            },
            {
                name: 'halloween',
                start: { month: 10, day: 25 },
                end: { month: 11, day: 1 },
                displayName: 'Halloween',
                greeting: 'Happy Halloween! 🎃',
                emoji: '🎃',
                description: 'Get ready for spooky fun, treats, and magical moments!',
                colors: { primary: '#ff6600', secondary: '#9933ff', accent: '#000000' }
            },
            {
                name: 'thanksgiving',
                start: { month: 11, day: 20 },
                end: { month: 11, day: 28 },
                displayName: 'Thanksgiving',
                greeting: 'Happy Thanksgiving! 🦃',
                emoji: '🦃',
                description: 'A time to gather, give thanks, and celebrate abundance!',
                colors: { primary: '#ff8c00', secondary: '#8b4513', accent: '#ffd700' }
            },
            {
                name: 'christmas',
                start: { month: 12, day: 15 },
                end: { month: 12, day: 25 },
                displayName: 'Christmas',
                greeting: 'Merry Christmas! 🎄',
                emoji: '🎄',
                description: 'Wishing you joy, peace, and magical moments this holiday season!',
                colors: { primary: '#ff0000', secondary: '#00ff00', accent: '#ffd700' }
            }
        ];
        
        this.bannerElement = null;
        this.popupElement = null;
        this.currentHoliday = null;
        this.init();
    }
    
    init() {
        this.createBannerElement();
        this.createPopupElement();
        this.detectAndApplyHoliday();
        // Check every hour for real-time accuracy
        setInterval(() => this.detectAndApplyHoliday(), 60 * 60 * 1000);
        // Also check at midnight every day
        this.scheduleNextMidnightCheck();
    }
    
    createBannerElement() {
        // Create holiday banner element
        this.bannerElement = document.createElement('div');
        this.bannerElement.className = 'holiday-banner';
        this.bannerElement.style.display = 'none';
        document.body.appendChild(this.bannerElement);
        
        // Make banner clickable
        this.bannerElement.style.cursor = 'pointer';
        this.bannerElement.style.pointerEvents = 'auto';
        this.bannerElement.addEventListener('click', () => this.showPopup());
    }
    
    createPopupElement() {
        // Create holiday popup element
        this.popupElement = document.createElement('div');
        this.popupElement.className = 'holiday-popup';
        this.popupElement.style.display = 'none';
        document.body.appendChild(this.popupElement);
    }
    
    scheduleNextMidnightCheck() {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const msUntilMidnight = tomorrow - now;
        
        setTimeout(() => {
            this.detectAndApplyHoliday();
            this.scheduleNextMidnightCheck();
        }, msUntilMidnight);
    }
    
    detectAndApplyHoliday() {
        // Get current date with accurate timezone
        const today = new Date();
        const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
        const currentDay = today.getDate();
        const currentYear = today.getFullYear();
        
        console.log(`🕐 Holiday Loop Check: ${currentMonth}/${currentDay}/${currentYear} at ${today.toLocaleTimeString()}`);
        
        // Find active holiday
        const activeHoliday = this.holidays.find(holiday => {
            return this.isDateInRange(currentMonth, currentDay, holiday.start, holiday.end);
        });
        
        // Remove all holiday classes first
        document.body.classList.remove(...this.holidays.map(h => `holiday-${h.name}`));
        
        // Apply active holiday theme and show banner
        if (activeHoliday) {
            this.currentHoliday = activeHoliday;
            document.body.classList.add(`holiday-${activeHoliday.name}`);
            this.showBanner(activeHoliday);
            console.log(`🎉 Holiday Loop: ${activeHoliday.displayName} theme activated!`);
        } else {
            this.currentHoliday = null;
            this.hideBanner();
            console.log('✨ Holiday Loop: No active holiday - using default theme');
        }
    }
    
    showBanner(holiday) {
        if (!this.bannerElement) return;
        
        this.bannerElement.innerHTML = `
            <div class="holiday-banner-content">
                <span class="holiday-emoji">${holiday.emoji}</span>
                <span class="holiday-greeting">${holiday.greeting}</span>
                <span class="holiday-emoji">${holiday.emoji}</span>
            </div>
        `;
        
        this.bannerElement.style.display = 'flex';
        this.bannerElement.classList.add('active');
        
        // Add animation class
        setTimeout(() => {
            this.bannerElement.classList.add('show');
        }, 100);
    }
    
    hideBanner() {
        if (!this.bannerElement) return;
        
        this.bannerElement.classList.remove('show');
        setTimeout(() => {
            this.bannerElement.style.display = 'none';
            this.bannerElement.classList.remove('active');
        }, 500);
    }
    
    showPopup() {
        if (!this.currentHoliday || !this.popupElement) return;
        
        const holiday = this.currentHoliday;
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        this.popupElement.innerHTML = `
            <div class="holiday-popup-overlay"></div>
            <div class="holiday-popup-content" data-holiday="${holiday.name}">
                <button class="holiday-popup-close">×</button>
                <div class="holiday-popup-header">
                    <div class="holiday-popup-emoji">${holiday.emoji}</div>
                    <h2 class="holiday-popup-title">${holiday.displayName}</h2>
                    <div class="holiday-popup-date">${dateStr}</div>
                </div>
                <div class="holiday-popup-body">
                    <p class="holiday-popup-description">${holiday.description}</p>
                    <div class="holiday-popup-decorations">
                        <span class="holiday-decoration">${holiday.emoji}</span>
                        <span class="holiday-decoration">${holiday.emoji}</span>
                        <span class="holiday-decoration">${holiday.emoji}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Apply holiday colors to popup
        const popupContent = this.popupElement.querySelector('.holiday-popup-content');
        popupContent.style.setProperty('--holiday-primary', holiday.colors.primary);
        popupContent.style.setProperty('--holiday-secondary', holiday.colors.secondary);
        popupContent.style.setProperty('--holiday-accent', holiday.colors.accent);
        
        this.popupElement.style.display = 'flex';
        
        // Add animation
        setTimeout(() => {
            this.popupElement.classList.add('active');
        }, 10);
        
        // Add close handlers
        const closeBtn = this.popupElement.querySelector('.holiday-popup-close');
        const overlay = this.popupElement.querySelector('.holiday-popup-overlay');
        
        closeBtn.addEventListener('click', () => this.hidePopup());
        overlay.addEventListener('click', () => this.hidePopup());
        
        // Close on escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.hidePopup();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    hidePopup() {
        if (!this.popupElement) return;
        
        this.popupElement.classList.remove('active');
        setTimeout(() => {
            this.popupElement.style.display = 'none';
            this.popupElement.innerHTML = '';
        }, 400);
    }
    
    isDateInRange(month, day, start, end) {
        // Handle year-crossing holidays (like New Year)
        if (start.month > end.month) {
            return (month === start.month && day >= start.day) || 
                   (month === end.month && day <= end.day) ||
                   (month > start.month || month < end.month);
        }
        
        // Handle same month holidays
        if (start.month === end.month) {
            return month === start.month && day >= start.day && day <= end.day;
        }
        
        // Handle multi-month holidays
        return (month === start.month && day >= start.day) ||
               (month === end.month && day <= end.day) ||
               (month > start.month && month < end.month);
    }
    
    // Manual override for testing
    setHoliday(holidayName) {
        document.body.classList.remove(...this.holidays.map(h => `holiday-${h.name}`));
        if (holidayName) {
            document.body.classList.add(`holiday-${holidayName}`);
        }
    }
}

// Initialize Holiday Loop
document.addEventListener('DOMContentLoaded', () => {
    window.holidayLoop = new HolidayLoop();
});
