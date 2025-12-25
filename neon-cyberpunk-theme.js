// NEON CYBERPUNK THEME CONTROLLER

(function() {
    'use strict';

    // Check if theme is already enabled
    const isCyberpunkEnabled = localStorage.getItem('cyberpunkTheme') === 'enabled';

    // Initialize theme on page load
    function initCyberpunkTheme() {
        if (isCyberpunkEnabled) {
            enableCyberpunkMode();
        }
        createThemeElements();
        createToggleButton();
    }

    // Create all theme elements
    function createThemeElements() {
        // Create grid background
        const grid = document.createElement('div');
        grid.className = 'cyberpunk-grid';
        document.body.appendChild(grid);

        // Create neon border
        const border = document.createElement('div');
        border.className = 'neon-border';
        document.body.appendChild(border);

        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'neon-particles-container';
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'neon-particle';
            particlesContainer.appendChild(particle);
        }
        document.body.appendChild(particlesContainer);

        // Create scanlines
        const scanlines = document.createElement('div');
        scanlines.className = 'cyberpunk-scanlines';
        document.body.appendChild(scanlines);

        // Create corner accents
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        corners.forEach(position => {
            const corner = document.createElement('div');
            corner.className = `cyberpunk-corner ${position}`;
            document.body.appendChild(corner);
        });

        // Create badge
        const badge = document.createElement('div');
        badge.className = 'cyberpunk-badge';
        badge.innerHTML = `
            <span class="badge-icon">⚡</span>
            <span class="badge-text">Cyberpunk Mode</span>
        `;
        document.body.appendChild(badge);

        // Hide elements if theme is not enabled
        if (!isCyberpunkEnabled) {
            hideThemeElements();
        }
    }

    // Create toggle button
    function createToggleButton() {
        const toggle = document.createElement('div');
        toggle.className = 'cyberpunk-toggle';
        toggle.innerHTML = '🌐';
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('aria-label', 'Toggle Cyberpunk Theme');
        toggle.setAttribute('tabindex', '0');
        
        toggle.addEventListener('click', toggleCyberpunkMode);
        toggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCyberpunkMode();
            }
        });
        
        document.body.appendChild(toggle);
    }

    // Toggle theme on/off
    function toggleCyberpunkMode() {
        const isEnabled = document.body.classList.contains('cyberpunk-mode');
        
        if (isEnabled) {
            disableCyberpunkMode();
        } else {
            enableCyberpunkMode();
        }
    }

    // Enable cyberpunk mode
    function enableCyberpunkMode() {
        document.body.classList.add('cyberpunk-mode');
        localStorage.setItem('cyberpunkTheme', 'enabled');
        showThemeElements();
        
        // Add glitch effect to random elements periodically
        startGlitchEffects();
        
        // Show notification
        showNotification('Cyberpunk Mode Activated', '#00ffff');
    }

    // Disable cyberpunk mode
    function disableCyberpunkMode() {
        document.body.classList.remove('cyberpunk-mode');
        localStorage.setItem('cyberpunkTheme', 'disabled');
        hideThemeElements();
        
        // Stop glitch effects
        stopGlitchEffects();
        
        // Show notification
        showNotification('Cyberpunk Mode Deactivated', '#ff00ff');
    }

    // Show theme elements
    function showThemeElements() {
        const elements = [
            '.cyberpunk-grid',
            '.neon-border',
            '.neon-particles-container',
            '.cyberpunk-scanlines',
            '.cyberpunk-corner',
            '.cyberpunk-badge'
        ];
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = '';
            }
        });
    }

    // Hide theme elements
    function hideThemeElements() {
        const elements = [
            '.cyberpunk-grid',
            '.neon-border',
            '.neon-particles-container',
            '.cyberpunk-scanlines',
            '.cyberpunk-corner',
            '.cyberpunk-badge'
        ];
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    // Glitch effects
    let glitchInterval;
    
    function startGlitchEffects() {
        glitchInterval = setInterval(() => {
            // Random glitch on text elements
            const textElements = document.querySelectorAll('h1, h2, h3, .project-title');
            if (textElements.length > 0) {
                const randomElement = textElements[Math.floor(Math.random() * textElements.length)];
                applyGlitchEffect(randomElement);
            }
        }, 5000);
    }

    function stopGlitchEffects() {
        if (glitchInterval) {
            clearInterval(glitchInterval);
        }
    }

    function applyGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        
        // Quick glitch animation
        let glitchCount = 0;
        const glitchAnimation = setInterval(() => {
            if (glitchCount < 3) {
                // Replace random characters
                const glitchedText = originalText.split('').map(char => {
                    return Math.random() > 0.9 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
                }).join('');
                element.textContent = glitchedText;
                glitchCount++;
            } else {
                element.textContent = originalText;
                clearInterval(glitchAnimation);
            }
        }, 50);
    }

    // Show notification
    function showNotification(message, color) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid ${color};
            padding: 20px 40px;
            border-radius: 0;
            color: ${color};
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            z-index: 10004;
            box-shadow: 0 0 30px ${color}, inset 0 0 30px rgba(0, 255, 255, 0.1);
            clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
            animation: notificationPulse 0.5s ease-in-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'notificationFadeOut 0.5s ease-in-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }

    // Add notification animations to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notificationPulse {
            0% { 
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.05);
            }
            100% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes notificationFadeOut {
            0% { 
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% { 
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);

    // Add keyboard shortcut (Ctrl + Shift + C)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            toggleCyberpunkMode();
        }
    });

    // Add mouse trail effect when theme is active
    let mouseTrail = [];
    document.addEventListener('mousemove', (e) => {
        if (!document.body.classList.contains('cyberpunk-mode')) return;
        
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9996;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            box-shadow: 0 0 10px #00ffff;
            animation: trailFade 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        mouseTrail.push(trail);
        if (mouseTrail.length > 10) {
            const oldTrail = mouseTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        setTimeout(() => {
            if (trail && trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    });

    // Add trail fade animation
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes trailFade {
            0% { 
                opacity: 1;
                transform: scale(1);
            }
            100% { 
                opacity: 0;
                transform: scale(0.3);
            }
        }
    `;
    document.head.appendChild(trailStyle);

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCyberpunkTheme);
    } else {
        initCyberpunkTheme();
    }

    // Expose toggle function globally for manual control
    window.toggleCyberpunkTheme = toggleCyberpunkMode;

})();
