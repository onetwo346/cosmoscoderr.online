/* PREMIUM THEME TOGGLE - Interactive JavaScript */

class PremiumThemeToggle {
    constructor() {
        this.toggleButtons = [];
        this.init();
    }

    init() {
        this.createToggleStructure();
        this.setupEventListeners();
        this.updateTooltips();
    }

    createToggleStructure() {
        const toggleIds = ['themeToggle', 'themeToggleMobile'];
        
        toggleIds.forEach(id => {
            const toggle = document.getElementById(id);
            if (!toggle) return;

            toggle.innerHTML = '';
            
            const slider = document.createElement('div');
            slider.className = 'theme-toggle-slider';
            
            const moonIcon = document.createElement('i');
            moonIcon.className = 'fas fa-moon theme-toggle-icon moon';
            
            const sunIcon = document.createElement('i');
            sunIcon.className = 'fas fa-sun theme-toggle-icon sun';
            
            slider.appendChild(moonIcon);
            slider.appendChild(sunIcon);
            
            const bgIcons = document.createElement('div');
            bgIcons.className = 'theme-toggle-bg-icons';
            bgIcons.innerHTML = `
                <i class="fas fa-moon theme-toggle-bg-icon moon-bg"></i>
                <i class="fas fa-sun theme-toggle-bg-icon sun-bg"></i>
            `;
            
            const stars = document.createElement('div');
            stars.className = 'theme-toggle-stars';
            for (let i = 0; i < 4; i++) {
                const star = document.createElement('div');
                star.className = 'theme-toggle-star';
                stars.appendChild(star);
            }
            
            const clouds = document.createElement('div');
            clouds.className = 'theme-toggle-clouds';
            for (let i = 0; i < 2; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'theme-toggle-cloud';
                clouds.appendChild(cloud);
            }
            
            toggle.appendChild(stars);
            toggle.appendChild(clouds);
            toggle.appendChild(bgIcons);
            toggle.appendChild(slider);
            
            this.toggleButtons.push(toggle);
        });
    }

    setupEventListeners() {
        this.toggleButtons.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                this.handleToggleClick(e, toggle);
            });
        });

        document.addEventListener('themeChanged', () => {
            this.updateTooltips();
        });
    }

    handleToggleClick(event, toggle) {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'night';
        const newTheme = currentTheme === 'night' ? 'day' : 'night';
        
        this.createParticleBurst(event.clientX, event.clientY, newTheme);
        
        this.addPulseEffect(toggle);
        
        setTimeout(() => {
            this.updateTooltips();
        }, 100);
    }

    createParticleBurst(x, y, theme) {
        const colors = theme === 'day' 
            ? ['#f093fb', '#f5576c', '#ffd89b', '#ff6b35']
            : ['#667eea', '#764ba2', '#00ffff', '#8a2be2'];
        
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'theme-toggle-particle';
            
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 600);
        }
    }

    addPulseEffect(toggle) {
        toggle.classList.add('pulsing');
        setTimeout(() => {
            toggle.classList.remove('pulsing');
        }, 600);
    }

    updateTooltips() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'night';
        const tooltipText = currentTheme === 'night' ? 'Switch to Day Mode' : 'Switch to Night Mode';
        
        this.toggleButtons.forEach(toggle => {
            toggle.setAttribute('data-tooltip', tooltipText);
            toggle.setAttribute('aria-label', tooltipText);
        });
    }

    createRippleEffect(event, toggle) {
        const ripple = document.createElement('span');
        const rect = toggle.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-effect 0.6s ease-out;
        `;
        
        toggle.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple-effect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new PremiumThemeToggle();
    }, 100);
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        new PremiumThemeToggle();
    }, 100);
}
