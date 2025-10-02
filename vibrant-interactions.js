/* VIBRANT INTERACTIONS - Enhanced UX with Particle Effects */

class VibrantInteractions {
    constructor() {
        this.particles = [];
        this.colors = {
            night: ['#00ffff', '#ff0080', '#8a2be2', '#0080ff'],
            day: ['#ff6b35', '#f7931e', '#ff1744', '#00bcd4']
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticleCanvas();
        this.startAnimationLoop();
    }

    setupEventListeners() {
        // Add particle effects to buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
                this.createClickParticles(e.clientX, e.clientY);
            }
        });

        // Add hover effects to project cards
        document.querySelectorAll('.project').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createHoverParticles(e.currentTarget);
            });
        });

        // Theme toggle special effects
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                this.createThemeChangeEffect(e.clientX, e.clientY);
            });
        }

        // Navigation link effects
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.createNavHoverEffect(e.currentTarget);
            });
        });
    }

    createParticleCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'vibrant-particles';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'night';
    }

    createClickParticles(x, y) {
        const theme = this.getCurrentTheme();
        const colors = this.colors[theme];
        
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                decay: 0.02,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                type: 'click'
            });
        }
    }

    createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        const theme = this.getCurrentTheme();
        const colors = this.colors[theme];
        
        for (let i = 0; i < 6; i++) {
            this.particles.push({
                x: rect.left + Math.random() * rect.width,
                y: rect.top + Math.random() * rect.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                decay: 0.015,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                type: 'hover'
            });
        }
    }

    createThemeChangeEffect(x, y) {
        const newTheme = this.getCurrentTheme();
        const colors = this.colors[newTheme];
        
        // Create a burst of particles
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const speed = 5 + Math.random() * 3;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.01,
                size: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                type: 'theme-change'
            });
        }

        // Add screen flash effect
        this.createScreenFlash();
    }

    createScreenFlash() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100vw';
        flash.style.height = '100vh';
        flash.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '10000';
        flash.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 300);
        }, 50);
    }

    createNavHoverEffect(element) {
        const rect = element.getBoundingClientRect();
        const theme = this.getCurrentTheme();
        const colors = this.colors[theme];
        
        for (let i = 0; i < 4; i++) {
            this.particles.push({
                x: rect.left + rect.width / 2,
                y: rect.bottom,
                vx: (Math.random() - 0.5) * 1,
                vy: -Math.random() * 2 - 1,
                life: 1,
                decay: 0.02,
                size: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                type: 'nav'
            });
        }
    }

    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            // Add gravity to some particle types
            if (particle.type === 'click' || particle.type === 'theme-change') {
                particle.vy += 0.1;
            }
            
            return particle.life > 0;
        });
    }

    renderParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateParticles();
            this.renderParticles();
            requestAnimationFrame(animate);
        };
        animate();
    }

    // Enhanced theme transition
    enhanceThemeTransition() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            // Add smooth transition class
            document.body.classList.add('theme-transitioning');
            
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 500);
        });
    }
}

// Enhanced cursor effects
class VibrantCursor {
    constructor() {
        this.cursor = null;
        this.trail = [];
        this.init();
    }

    init() {
        this.createCursor();
        this.setupMouseTracking();
        this.startTrailAnimation();
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'vibrant-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(this.cursor);
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            const theme = document.documentElement.getAttribute('data-theme') || 'night';
            const color = theme === 'day' ? '#ff6b35' : '#00ffff';
            
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
            this.cursor.style.background = color;
            this.cursor.style.boxShadow = `0 0 20px ${color}`;
            
            // Add to trail
            this.trail.push({
                x: e.clientX,
                y: e.clientY,
                life: 1
            });
            
            if (this.trail.length > 10) {
                this.trail.shift();
            }
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });

        // Scale cursor on click
        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = 'scale(1.5)';
        });

        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = 'scale(1)';
        });
    }

    startTrailAnimation() {
        const animate = () => {
            this.trail = this.trail.map(point => ({
                ...point,
                life: point.life - 0.05
            })).filter(point => point.life > 0);
            
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        new VibrantInteractions();
        new VibrantCursor();
    }
});

// Add smooth theme transition styles
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    .theme-transitioning {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .theme-transitioning * {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .vibrant-cursor {
        opacity: 1;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .vibrant-cursor {
            display: none !important;
        }
    }
`;
document.head.appendChild(transitionStyles);
