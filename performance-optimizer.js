// Performance Optimizer for Cosmic Effects
class PerformanceOptimizer {
    constructor() {
        this.isLowPerformance = false;
        this.isMobile = false;
        this.init();
    }

    init() {
        this.detectDeviceCapabilities();
        this.optimizeForDevice();
        this.setupPerformanceMonitoring();
    }

    detectDeviceCapabilities() {
        // Check if device is mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Check for low performance indicators
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const memory = navigator.deviceMemory || 4;
        const connection = navigator.connection;
        
        // Determine if device has low performance
        this.isLowPerformance = (
            hardwareConcurrency < 4 ||
            memory < 4 ||
            (connection && connection.effectiveType === 'slow-2g') ||
            this.isMobile
        );

        console.log('Device Performance:', {
            cores: hardwareConcurrency,
            memory: memory + 'GB',
            connection: connection ? connection.effectiveType : 'unknown',
            isMobile: this.isMobile,
            isLowPerformance: this.isLowPerformance
        });
    }

    optimizeForDevice() {
        if (this.isLowPerformance) {
            this.applyLowPerformanceMode();
        } else {
            this.applyHighPerformanceMode();
        }
    }

    applyLowPerformanceMode() {
        // Reduce animation complexity
        const style = document.createElement('style');
        style.textContent = `
            /* Low performance optimizations */
            .morphing-shape {
                display: none !important;
            }
            
            .dna-helix {
                display: none !important;
            }
            
            .quantum-ring {
                display: none !important;
            }
            
            .cosmic-particle {
                display: none !important;
            }
            
            /* Reduce animation complexity */
            .project:hover {
                transform: translateY(-5px) !important;
            }
            
            .nav-link::before {
                display: none !important;
            }
            
            /* Disable complex effects */
            .glitch-text {
                animation: none !important;
            }
            
            .pulse-glow {
                animation: none !important;
            }
            
            /* Reduce particle count in Three.js */
            #space-background {
                opacity: 0.3 !important;
            }
        `;
        document.head.appendChild(style);

        // Reduce Three.js complexity
        if (window.spaceBackground) {
            window.spaceBackground.reduceComplexity();
        }
    }

    applyHighPerformanceMode() {
        // Enable all effects for high-performance devices
        const style = document.createElement('style');
        style.textContent = `
            /* High performance enhancements */
            .project {
                transform-style: preserve-3d;
                perspective: 1000px;
            }
            
            .nav-link {
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            /* Enable all animations */
            .glitch-text {
                animation: glitch 5s infinite;
            }
            
            .pulse-glow {
                animation: pulseGlow 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    }

    setupPerformanceMonitoring() {
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        const monitorPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // If FPS drops below 30, reduce effects
                if (fps < 30 && !this.isLowPerformance) {
                    this.applyLowPerformanceMode();
                    this.isLowPerformance = true;
                    console.log('Performance degraded, reducing effects');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(monitorPerformance);
        };
        
        requestAnimationFrame(monitorPerformance);
    }

    // Method to dynamically adjust effects based on user preference
    setPerformanceMode(mode) {
        if (mode === 'low') {
            this.applyLowPerformanceMode();
        } else if (mode === 'high') {
            this.applyHighPerformanceMode();
        }
    }
}

// Initialize performance optimizer
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
});

// Add performance controls to the page
function addPerformanceControls() {
    const controls = document.createElement('div');
    controls.className = 'performance-controls';
    controls.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(10, 10, 18, 0.9);
        border: 1px solid var(--quantum-blue);
        border-radius: 10px;
        padding: 15px;
        z-index: 1000;
        backdrop-filter: blur(10px);
        display: none;
    `;
    
    controls.innerHTML = `
        <h4 style="color: var(--quantum-blue); margin-bottom: 10px; font-size: 14px;">Performance</h4>
        <button onclick="window.performanceOptimizer.setPerformanceMode('low')" 
                style="background: var(--neutron-star); color: white; border: 1px solid var(--quantum-blue); 
                       padding: 5px 10px; margin: 2px; border-radius: 5px; cursor: pointer; font-size: 12px;">
            Low
        </button>
        <button onclick="window.performanceOptimizer.setPerformanceMode('high')" 
                style="background: var(--neutron-star); color: white; border: 1px solid var(--quantum-blue); 
                       padding: 5px 10px; margin: 2px; border-radius: 5px; cursor: pointer; font-size: 12px;">
            High
        </button>
    `;
    
    document.body.appendChild(controls);
    
    // Show controls on Ctrl+Shift+P
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
            controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// Initialize controls
document.addEventListener('DOMContentLoaded', addPerformanceControls); 