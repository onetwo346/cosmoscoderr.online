/* CHRISTMAS THEME - ELEGANT & MINIMAL JavaScript */

(function() {
    'use strict';
    
    let christmasEnabled = true;
    
    // Add Christmas mode class to body
    document.body.classList.add('christmas-mode');
    
    // Create Elegant Top Accent Bar
    function createAccentBar() {
        const accent = document.createElement('div');
        accent.className = 'christmas-accent';
        accent.id = 'christmas-accent';
        document.body.prepend(accent);
    }
    
    // Create Elegant Badge with Countdown
    function createChristmasBadge() {
        const badge = document.createElement('div');
        badge.className = 'christmas-badge';
        badge.id = 'christmas-badge';
        
        badge.innerHTML = `
            <span class="badge-icon">🎄</span>
            <span class="badge-text">Christmas</span>
            <div class="countdown" id="christmas-countdown"></div>
        `;
        
        document.body.appendChild(badge);
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Christmas Countdown Timer
    function updateCountdown() {
        const countdownEl = document.getElementById('christmas-countdown');
        if (!countdownEl) return;
        
        const now = new Date();
        const christmas = new Date(now.getFullYear(), 11, 25);
        
        if (now > christmas) {
            christmas.setFullYear(christmas.getFullYear() + 1);
        }
        
        const diff = christmas - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days === 0 && hours === 0 && minutes === 0) {
            countdownEl.innerHTML = `<span>🎉 Merry Christmas!</span>`;
        } else {
            countdownEl.innerHTML = `
                <span>${days}d</span>
                <span>${hours}h</span>
                <span>${minutes}m</span>
            `;
        }
    }
    
    // Create Gentle Snowflakes (fewer, more subtle)
    function createSnowflakes() {
        const snowflakeContainer = document.createElement('div');
        snowflakeContainer.className = 'snowflakes-container';
        snowflakeContainer.id = 'snowflakes-container';
        
        // Only 10 subtle snowflakes
        for (let i = 0; i < 10; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = '❄';
            snowflakeContainer.appendChild(snowflake);
        }
        
        document.body.appendChild(snowflakeContainer);
    }
    
    // Create Toggle Button
    function createToggleButton() {
        const toggle = document.createElement('button');
        toggle.className = 'christmas-toggle';
        toggle.id = 'christmas-toggle';
        toggle.innerHTML = '🎄';
        toggle.title = 'Toggle Christmas Theme';
        toggle.addEventListener('click', toggleChristmas);
        document.body.appendChild(toggle);
    }
    
    // Toggle Christmas Theme
    function toggleChristmas() {
        christmasEnabled = !christmasEnabled;
        const elements = [
            'christmas-accent',
            'christmas-badge',
            'snowflakes-container'
        ];
        
        elements.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.display = christmasEnabled ? '' : 'none';
            }
        });
        
        const toggle = document.getElementById('christmas-toggle');
        if (toggle) {
            toggle.innerHTML = christmasEnabled ? '🎄' : '❄️';
        }
        
        if (christmasEnabled) {
            document.body.classList.add('christmas-mode');
        } else {
            document.body.classList.remove('christmas-mode');
        }
    }
    
    // Initialize Christmas Theme
    function initChristmas() {
        createAccentBar();
        createChristmasBadge();
        createSnowflakes();
        createToggleButton();
        
        console.log('🎄 Elegant Christmas theme activated! Happy Holidays! 🎄');
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChristmas);
    } else {
        initChristmas();
    }
})();
