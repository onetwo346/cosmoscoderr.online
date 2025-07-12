// ===========================================
// COSMIC CHALLENGES SYSTEM - SIMPLIFIED
// ===========================================

class CosmicChallengesSimplified {
    constructor() {
        this.apps = [
            // Games
            { name: 'Pic2Puzz', category: 'game', icon: '🧩', url: 'https://pic2puzz.space/', description: 'Transform your photos into fun puzzles' },
            { name: 'XOWARS', category: 'game', icon: '⚔️', url: 'https://xowars.space/', description: 'Strategic battle game with cosmic warfare' },
            { name: 'Word Grid Quest', category: 'game', icon: '🔤', url: 'https://wordgridquest.xyz/', description: 'Word puzzle adventure through space' },
            { name: 'Fetch or Catch', category: 'game', icon: '🐕', url: 'https://onetwo346.github.io/fetch-or-catch/', description: 'Pet simulation game with cosmic pets' },
            { name: 'Time Escape', category: 'game', icon: '🚀', url: 'https://onetwo346.github.io/space-shooting', description: 'Space shooting adventure' },
            { name: 'Cosmic Horizon', category: 'game', icon: '🌌', url: 'https://cosmichorizon.space', description: 'Explore the infinite cosmic frontier' },
            
            // Tools
            { name: 'Earthquake Analyst', category: 'tool', icon: '🌍', url: 'https://earthquakeanalyst.space/', description: 'Analyze seismic data and earth movements' },
            { name: 'SwitchBox', category: 'tool', icon: '🔧', url: 'https://onetwo346.github.io/switchbox/', description: 'Network management and switching tool' },
            { name: 'Dip Image Generator', category: 'tool', icon: '🎨', url: 'https://dipimagegenerator.lat', description: 'Create stunning custom images' },
            { name: 'Beeek', category: 'tool', icon: '📝', url: 'https://beeek.online', description: 'Advanced note-taking and organization' },
            { name: 'Fecel Analyst', category: 'tool', icon: '🔬', url: 'https://onetwo346.github.io/Fecal-analyst/', description: 'Medical analysis and diagnostics' },
            { name: 'Urine Analyst', category: 'tool', icon: '🧪', url: 'https://onetwo346.github.io/Urine-analysts-/', description: 'Medical testing and analysis' },
            
            // Web Apps
            { name: 'Quick Wrap', category: 'webapp', icon: '📦', url: 'https://quickwrap.space', description: 'Package management made simple' },
            { name: 'Make This Recipe', category: 'webapp', icon: '🍳', url: 'https://onetwo346.github.io/Make-this-recipe-', description: 'AI-powered recipe generator' },
            { name: 'Horonum', category: 'webapp', icon: '🔮', url: 'https://onetwo346.github.io/horonum', description: 'Numerology and cosmic predictions' },
            { name: 'Glow Radio', category: 'webapp', icon: '📻', url: 'https://onetwo346.github.io/glow-radio-', description: 'Cosmic radio stations and music' }
        ];
        
        this.missions = [
            'Try this app and explore its features',
            'Discover what makes this app special',
            'Test the main functionality',
            'Spend a few minutes exploring',
            'See how this app can help you',
            'Experience the app\'s unique features',
            'Try different options within the app'
        ];
        
        this.stats = {
            appsTried: 0,
            currentStreak: 0,
            totalBadges: 0,
            lastActivity: null
        };
        
        this.badges = [
            { id: 'first-contact', name: 'First Contact', icon: '🚀', description: 'Launch your first app', unlocked: false },
            { id: 'space-explorer', name: 'Space Explorer', icon: '🌌', description: 'Try 5 different apps', unlocked: false },
            { id: 'cosmic-gamer', name: 'Cosmic Gamer', icon: '🎮', description: 'Play 10 games', unlocked: false },
            { id: 'productivity-master', name: 'Productivity Master', icon: '⚡', description: 'Use 5 tools', unlocked: false },
            { id: 'consistent-explorer', name: 'Consistent Explorer', icon: '🔥', description: '3-day streak', unlocked: false },
            { id: 'stellar-legend', name: 'Stellar Legend', icon: '⭐', description: '30-day streak', unlocked: false }
        ];
        
        this.loadStats();
        this.init();
    }
    
    init() {
        this.updateDailyChallenge();
        this.updateStatsDisplay();
        this.updateBadgesDisplay();
        this.attachEventListeners();
    }
    
    updateDailyChallenge() {
        // Get today's app and mission based on day of year
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        
        // Select app and mission based on day
        const appIndex = dayOfYear % this.apps.length;
        const missionIndex = dayOfYear % this.missions.length;
        
        const dailyApp = this.apps[appIndex];
        const dailyMission = this.missions[missionIndex];
        
        // Update the challenge card content
        const appIcon = document.querySelector('.app-icon');
        const appName = document.querySelector('.app-name');
        const appDescription = document.querySelector('.app-description');
        const missionText = document.querySelector('.mission-text');
        const launchBtn = document.querySelector('.launch-btn');
        
        if (appIcon) appIcon.textContent = dailyApp.icon;
        if (appName) appName.textContent = dailyApp.name;
        if (appDescription) appDescription.textContent = dailyApp.description;
        if (missionText) missionText.textContent = `🎯 ${dailyMission}`;
        if (launchBtn) launchBtn.href = dailyApp.url;
        
        // Update daily badge with category
        const dailyBadge = document.querySelector('.daily-badge');
        const categoryEmoji = dailyApp.category === 'game' ? '🎮' : dailyApp.category === 'tool' ? '⚡' : '🌐';
        const categoryName = dailyApp.category === 'game' ? 'Game' : dailyApp.category === 'tool' ? 'Tool' : 'Web App';
        if (dailyBadge) dailyBadge.textContent = `${categoryEmoji} ${categoryName} of the Day`;
        
        // Store current daily app for tracking
        this.currentDailyApp = dailyApp;
        
        // Add a subtle hint about tomorrow's app in console for power users
        const tomorrowIndex = (dayOfYear + 1) % this.apps.length;
        const tomorrowApp = this.apps[tomorrowIndex];
        console.log(`🌟 Tomorrow's featured app: ${tomorrowApp.name} ${tomorrowApp.icon}`);
    }
    
    attachEventListeners() {
        // Track app launches
        const launchBtn = document.querySelector('.launch-btn');
        if (launchBtn) {
            launchBtn.addEventListener('click', () => {
                this.trackAppLaunch();
            });
        }
        
        // Track other app links
        const appLinks = document.querySelectorAll('a[href*="http"]');
        appLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackAppLaunch();
            });
        });
    }
    
    trackAppLaunch() {
        this.stats.appsTried++;
        this.updateStreak();
        this.checkBadges();
        this.saveStats();
        this.updateStatsDisplay();
        this.updateBadgesDisplay();
        
        // Show notification with app name
        const appName = this.currentDailyApp ? this.currentDailyApp.name : 'App';
        this.showNotification(`${appName} launched! 🚀`, 'Keep exploring the cosmic universe!');
    }
    
    updateStreak() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (this.stats.lastActivity === today) {
            // Already counted today
            return;
        } else if (this.stats.lastActivity === yesterday) {
            // Continue streak
            this.stats.currentStreak++;
        } else if (this.stats.lastActivity !== null) {
            // Reset streak
            this.stats.currentStreak = 1;
        } else {
            // First time
            this.stats.currentStreak = 1;
        }
        
        this.stats.lastActivity = today;
    }
    
    checkBadges() {
        const { appsTried, currentStreak } = this.stats;
        
        // Initialize category counters if not exist
        if (!this.stats.gamesPlayed) this.stats.gamesPlayed = 0;
        if (!this.stats.toolsUsed) this.stats.toolsUsed = 0;
        if (!this.stats.webAppsExplored) this.stats.webAppsExplored = 0;
        
        // Track current app category
        if (this.currentDailyApp) {
            const category = this.currentDailyApp.category;
            if (category === 'game') this.stats.gamesPlayed++;
            else if (category === 'tool') this.stats.toolsUsed++;
            else if (category === 'webapp') this.stats.webAppsExplored++;
        }
        
        // Check badge conditions
        if (appsTried >= 1 && !this.badges[0].unlocked) {
            this.unlockBadge(0, 'First Contact');
        }
        if (appsTried >= 5 && !this.badges[1].unlocked) {
            this.unlockBadge(1, 'Space Explorer');
        }
        if (this.stats.gamesPlayed >= 5 && !this.badges[2].unlocked) {
            this.unlockBadge(2, 'Cosmic Gamer');
        }
        if (this.stats.toolsUsed >= 3 && !this.badges[3].unlocked) {
            this.unlockBadge(3, 'Productivity Master');
        }
        if (currentStreak >= 3 && !this.badges[4].unlocked) {
            this.unlockBadge(4, 'Consistent Explorer');
        }
        if (currentStreak >= 30 && !this.badges[5].unlocked) {
            this.unlockBadge(5, 'Stellar Legend');
        }
    }
    
    unlockBadge(index, name) {
        this.badges[index].unlocked = true;
        this.stats.totalBadges = this.badges.filter(b => b.unlocked).length;
        this.saveStats(); // Save badge state immediately
        this.showNotification(`Badge Unlocked! 🏅`, `You earned the ${name} badge!`);
    }
    
    updateStatsDisplay() {
        const statsElements = document.querySelectorAll('.stat-number');
        if (statsElements.length >= 3) {
            statsElements[0].textContent = this.stats.appsTried;
            statsElements[1].textContent = this.stats.currentStreak;
            statsElements[2].textContent = this.stats.totalBadges;
        }
    }
    
    updateBadgesDisplay() {
        const badgeElements = document.querySelectorAll('.mini-badge');
        badgeElements.forEach((badge, index) => {
            if (this.badges[index] && this.badges[index].unlocked) {
                badge.classList.remove('locked');
                badge.classList.add('unlocked');
            } else {
                badge.classList.add('locked');
                badge.classList.remove('unlocked');
            }
        });
    }
    
    showNotification(title, message) {
        // Create simple notification
        const notification = document.createElement('div');
        notification.className = 'cosmic-notification';
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    saveStats() {
        localStorage.setItem('cosmic-challenges-stats', JSON.stringify(this.stats));
        
        // Save badge states
        const badgeStates = {};
        this.badges.forEach(badge => {
            badgeStates[badge.id] = badge.unlocked;
        });
        localStorage.setItem('cosmic-challenges-badges', JSON.stringify(badgeStates));
    }
    
    loadStats() {
        const saved = localStorage.getItem('cosmic-challenges-stats');
        if (saved) {
            this.stats = { ...this.stats, ...JSON.parse(saved) };
        }
        
        // Load badge states
        const savedBadges = localStorage.getItem('cosmic-challenges-badges');
        if (savedBadges) {
            const badgeStates = JSON.parse(savedBadges);
            this.badges.forEach((badge, index) => {
                if (badgeStates[badge.id]) {
                    badge.unlocked = badgeStates[badge.id];
                }
            });
        }
        
        this.stats.totalBadges = this.badges.filter(b => b.unlocked).length;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CosmicChallengesSimplified();
});

// Add simple notification CSS
const notificationCSS = `
    .cosmic-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        backdrop-filter: blur(15px);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .cosmic-notification.show {
        transform: translateX(0);
    }
    
    .notification-title {
        font-weight: 600;
        margin-bottom: 0.3rem;
        font-size: 0.9rem;
    }
    
    .notification-message {
        font-size: 0.8rem;
        opacity: 0.9;
    }
    
    @media (max-width: 768px) {
        .cosmic-notification {
            right: 10px;
            left: 10px;
            transform: translateY(-100%);
        }
        
        .cosmic-notification.show {
            transform: translateY(0);
        }
    }
`;

// Add notification styles to page
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style); 