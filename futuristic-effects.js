/* FUTURISTIC EFFECTS - Dynamic Section Enhancements */

class FuturisticEffects {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceWelcomeSection();
        this.enhanceLatestUpdates();
        this.setupScrollAnimations();
        this.setupParticleEffects();
        this.setupThemeTransitions();
    }

    enhanceWelcomeSection() {
        const welcomeCard = document.querySelector('.cosmic-about-card');
        if (!welcomeCard) return;

        // Add dynamic data attribute for text effects
        const title = welcomeCard.querySelector('h2');
        if (title) {
            title.setAttribute('data-text', title.textContent);
        }

        // Add theme-specific floating particles
        const theme = document.documentElement.getAttribute('data-theme') || 'night';
        if (theme === 'day') {
            this.createDayThemeParticles(welcomeCard, 20);
        } else {
            this.createFloatingParticles(welcomeCard, 15);
        }
        
        // Add interactive hover effects
        welcomeCard.addEventListener('mouseenter', () => {
            this.triggerWelcomeAnimation();
        });

        // Add typing effect for subtitle
        this.createTypingEffect(welcomeCard.querySelector('p'));
    }

    enhanceLatestUpdates() {
        const latestSection = document.querySelector('.cosmic-latest-section');
        if (!latestSection) return;

        // Add theme-specific sparkle particles around title
        const title = latestSection.querySelector('.cosmic-latest-title');
        if (title) {
            const theme = document.documentElement.getAttribute('data-theme') || 'night';
            if (theme === 'day') {
                this.createDaySparkleEffect(title);
            } else {
                this.createSparkleEffect(title);
            }
        }

        // Enhance update cards
        const cards = latestSection.querySelectorAll('.blog-post');
        cards.forEach((card, index) => {
            this.enhanceUpdateCard(card, index);
        });

        // Add section entrance animation
        this.animateSectionEntrance(latestSection);
    }

    createFloatingParticles(container, count) {
        const particles = [];
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${this.getRandomParticleColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                opacity: 0.7;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            `;
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            container.appendChild(particle);
            particles.push(particle);
        }

        // Add CSS animation
        if (!document.querySelector('#particle-animations')) {
            const style = document.createElement('style');
            style.id = 'particle-animations';
            style.textContent = `
                @keyframes particleFloat {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.7;
                    }
                    90% {
                        opacity: 0.7;
                    }
                    100% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createSparkleEffect(element) {
        const sparkles = [];
        
        setInterval(() => {
            if (sparkles.length > 20) {
                const oldSparkle = sparkles.shift();
                if (oldSparkle && oldSparkle.parentNode) {
                    oldSparkle.parentNode.removeChild(oldSparkle);
                }
            }

            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-effect';
            sparkle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${this.getRandomSparkleColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: sparklePop 1s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 10px currentColor;
            `;
            
            element.appendChild(sparkle);
            sparkles.push(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, 200);

        // Add sparkle animation CSS
        if (!document.querySelector('#sparkle-animations')) {
            const style = document.createElement('style');
            style.id = 'sparkle-animations';
            style.textContent = `
                @keyframes sparklePop {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.5) rotate(180deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    enhanceUpdateCard(card, index) {
        // Add staggered entrance animation
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('scroll-reveal');

        // Add hover effects
        card.addEventListener('mouseenter', () => {
            this.triggerCardHover(card);
        });

        // Add click effects
        card.addEventListener('click', () => {
            this.triggerCardClick(card);
        });

        // Add progress bar for read more links
        const readMoreLinks = card.querySelectorAll('a[href*="read"]');
        readMoreLinks.forEach(link => {
            this.enhanceReadMoreLink(link);
        });
    }

    triggerWelcomeAnimation() {
        const welcomeCard = document.querySelector('.cosmic-about-card');
        if (!welcomeCard) return;

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1;
            animation: rippleExpand 0.6s ease-out;
        `;
        
        welcomeCard.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);

        // Add ripple animation
        if (!document.querySelector('#ripple-animations')) {
            const style = document.createElement('style');
            style.id = 'ripple-animations';
            style.textContent = `
                @keyframes rippleExpand {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    triggerCardHover(card) {
        // Create floating particles on hover
        const particles = [];
        const rect = card.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: ${this.getRandomParticleColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: hoverParticle 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }

        // Add hover particle animation
        if (!document.querySelector('#hover-animations')) {
            const style = document.createElement('style');
            style.id = 'hover-animations';
            style.textContent = `
                @keyframes hoverParticle {
                    0% {
                        transform: translate(0, 0) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    triggerCardClick(card) {
        // Create click explosion effect
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (i / 12) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${this.getRandomParticleColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
                animation: clickExplosion 0.8s ease-out forwards;
                --dx: ${Math.cos(angle) * distance}px;
                --dy: ${Math.sin(angle) * distance}px;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }

        // Add click explosion animation
        if (!document.querySelector('#click-animations')) {
            const style = document.createElement('style');
            style.id = 'click-animations';
            style.textContent = `
                @keyframes clickExplosion {
                    0% {
                        transform: translate(0, 0) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--dx), var(--dy)) scale(1);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    enhanceReadMoreLink(link) {
        // Add progress bar on hover
        link.addEventListener('mouseenter', () => {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                background: linear-gradient(90deg, var(--primary), var(--accent));
                border-radius: 1px;
                width: 0;
                transition: width 0.3s ease;
                z-index: 1;
            `;
            
            link.style.position = 'relative';
            link.appendChild(progressBar);
            
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 100);
        });

        link.addEventListener('mouseleave', () => {
            const progressBar = link.querySelector('div');
            if (progressBar) {
                progressBar.style.width = '0';
                setTimeout(() => {
                    if (progressBar.parentNode) {
                        progressBar.parentNode.removeChild(progressBar);
                    }
                }, 300);
            }
        });
    }

    createTypingEffect(element) {
        if (!element) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text[i];
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    }

    animateSectionEntrance(section) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    
                    // Animate cards with stagger
                    const cards = entry.target.querySelectorAll('.blog-post');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('card-visible');
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    }

    setupScrollAnimations() {
        // Add scroll-triggered animations
        const elements = document.querySelectorAll('.scroll-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
    }

    setupParticleEffects() {
        // Add ambient particles to the background
        this.createAmbientParticles();
    }

    createAmbientParticles() {
        const container = document.body;
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'ambient-particle';
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${this.getRandomParticleColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 0;
                opacity: 0.6;
                animation: ambientFloat ${Math.random() * 20 + 20}s linear infinite;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
            `;
            
            container.appendChild(particle);
        }

        // Add ambient particle animation
        if (!document.querySelector('#ambient-animations')) {
            const style = document.createElement('style');
            style.id = 'ambient-animations';
            style.textContent = `
                @keyframes ambientFloat {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.6;
                    }
                    90% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupThemeTransitions() {
        // Enhanced theme transition effects
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.triggerThemeTransition();
            });
        }
    }

    triggerThemeTransition() {
        // Create theme transition overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, var(--primary), var(--accent));
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            animation: themeTransition 0.8s ease-in-out;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 800);

        // Add theme transition animation
        if (!document.querySelector('#theme-transition-animations')) {
            const style = document.createElement('style');
            style.id = 'theme-transition-animations';
            style.textContent = `
                @keyframes themeTransition {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.2);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    getRandomParticleColor() {
        const theme = document.documentElement.getAttribute('data-theme') || 'night';
        const colors = theme === 'day' 
            ? ['#ff6b35', '#f7931e', '#ff1744', '#00bcd4', '#4caf50', '#9c27b0']
            : ['#00ffff', '#ff0080', '#8a2be2', '#0080ff', '#00ff80', '#ff1493'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    getRandomSparkleColor() {
        const theme = document.documentElement.getAttribute('data-theme') || 'night';
        const colors = theme === 'day' 
            ? ['#ffeb3b', '#ff6b35', '#ff1744', '#00bcd4', '#4caf50', '#9c27b0', '#e91e63', '#ff9800']
            : ['#00ffff', '#ff0080', '#8a2be2', '#ffeb3b', '#ff5722', '#00ff80', '#ff1493', '#9c27b0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Enhanced day theme particle effects
    createDayThemeParticles(container, count) {
        const particles = [];
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'day-floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 3}px;
                height: ${Math.random() * 6 + 3}px;
                background: ${this.getRandomParticleColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                opacity: 0.8;
                animation: dayParticleFloat ${Math.random() * 8 + 6}s linear infinite;
                box-shadow: 0 0 10px currentColor;
            `;
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            container.appendChild(particle);
            particles.push(particle);
        }

        // Add day particle animation
        if (!document.querySelector('#day-particle-animations')) {
            const style = document.createElement('style');
            style.id = 'day-particle-animations';
            style.textContent = `
                @keyframes dayParticleFloat {
                    0% {
                        transform: translate(0, 0) rotate(0deg) scale(0.5);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                        transform: scale(1);
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) rotate(360deg) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Enhanced day theme sparkle effects
    createDaySparkleEffect(element) {
        const sparkles = [];
        
        setInterval(() => {
            if (sparkles.length > 25) {
                const oldSparkle = sparkles.shift();
                if (oldSparkle && oldSparkle.parentNode) {
                    oldSparkle.parentNode.removeChild(oldSparkle);
                }
            }

            const sparkle = document.createElement('div');
            sparkle.className = 'day-sparkle-effect';
            sparkle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${this.getRandomSparkleColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: daySparklePop 1.2s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 15px currentColor;
            `;
            
            element.appendChild(sparkle);
            sparkles.push(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1200);
        }, 150);

        // Add day sparkle animation CSS
        if (!document.querySelector('#day-sparkle-animations')) {
            const style = document.createElement('style');
            style.id = 'day-sparkle-animations';
            style.textContent = `
                @keyframes daySparklePop {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    30% {
                        transform: scale(1.8) rotate(120deg);
                        opacity: 0.9;
                    }
                    60% {
                        transform: scale(1.2) rotate(240deg);
                        opacity: 0.7;
                    }
                    100% {
                        transform: scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        new FuturisticEffects();
    }
});

// Add scroll reveal styles
const scrollRevealStyles = document.createElement('style');
scrollRevealStyles.textContent = `
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .section-visible {
        animation: sectionSlideIn 0.8s ease-out;
    }
    
    .card-visible {
        animation: cardSlideIn 0.6s ease-out;
    }
    
    @keyframes sectionSlideIn {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes cardSlideIn {
        0% {
            opacity: 0;
            transform: translateX(-30px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(scrollRevealStyles);
