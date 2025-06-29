// Advanced Cosmic Animations
class AdvancedAnimations {
    constructor() {
        this.morphingShapes = [];
        this.dnaHelixes = [];
        this.quantumTunnels = [];
        this.particleSystems = [];
        this.init();
    }

    init() {
        this.createMorphingShapes();
        this.createDNAHelixes();
        this.createQuantumTunnels();
        this.createParticleSystems();
        this.setupEventListeners();
    }

    createMorphingShapes() {
        const container = document.createElement('div');
        container.className = 'morphing-shapes-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        // Create multiple morphing shapes
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'morphing-shape';
            shape.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                background: linear-gradient(45deg, var(--quantum-blue), var(--plasma-pink));
                border-radius: 50%;
                opacity: 0.1;
                filter: blur(2px);
                animation: morphShape 8s ease-in-out infinite;
                animation-delay: ${i * 1.5}s;
            `;
            
            // Random position
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            
            container.appendChild(shape);
            this.morphingShapes.push(shape);
        }

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes morphShape {
                0%, 100% {
                    border-radius: 50%;
                    transform: scale(1) rotate(0deg);
                    background: linear-gradient(45deg, var(--quantum-blue), var(--plasma-pink));
                }
                25% {
                    border-radius: 0%;
                    transform: scale(1.2) rotate(90deg);
                    background: linear-gradient(90deg, var(--plasma-pink), #8A2BE2);
                }
                50% {
                    border-radius: 50% 0% 50% 0%;
                    transform: scale(0.8) rotate(180deg);
                    background: linear-gradient(135deg, #8A2BE2, var(--quantum-blue));
                }
                75% {
                    border-radius: 0% 50% 0% 50%;
                    transform: scale(1.1) rotate(270deg);
                    background: linear-gradient(180deg, var(--quantum-blue), var(--plasma-pink));
                }
            }
        `;
        document.head.appendChild(style);
    }

    createDNAHelixes() {
        const container = document.createElement('div');
        container.className = 'dna-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        // Create DNA helix strands
        for (let i = 0; i < 2; i++) {
            const helix = document.createElement('div');
            helix.className = 'dna-helix';
            helix.style.cssText = `
                position: absolute;
                width: 2px;
                height: 100%;
                background: ${i === 0 ? 'var(--quantum-blue)' : 'var(--plasma-pink)'};
                left: ${i === 0 ? '20%' : '80%'};
                top: 0;
                opacity: 0.3;
                animation: dnaRotate 10s linear infinite;
                animation-delay: ${i * 5}s;
            `;
            
            // Create helix nodes
            for (let j = 0; j < 20; j++) {
                const node = document.createElement('div');
                node.className = 'dna-node';
                node.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: ${i === 0 ? 'var(--quantum-blue)' : 'var(--plasma-pink)'};
                    border-radius: 50%;
                    left: -3px;
                    top: ${j * 5}%;
                    box-shadow: 0 0 10px currentColor;
                    animation: dnaNodePulse 2s ease-in-out infinite;
                    animation-delay: ${j * 0.1}s;
                `;
                helix.appendChild(node);
            }
            
            container.appendChild(helix);
            this.dnaHelixes.push(helix);
        }

        // Add DNA animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dnaRotate {
                0% {
                    transform: rotateY(0deg) translateX(0px);
                }
                50% {
                    transform: rotateY(180deg) translateX(50px);
                }
                100% {
                    transform: rotateY(360deg) translateX(0px);
                }
            }
            
            @keyframes dnaNodePulse {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.5);
                }
            }
        `;
        document.head.appendChild(style);
    }

    createQuantumTunnels() {
        const container = document.createElement('div');
        container.className = 'quantum-tunnel-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        // Create quantum tunnel rings
        for (let i = 0; i < 10; i++) {
            const ring = document.createElement('div');
            ring.className = 'quantum-ring';
            ring.style.cssText = `
                position: absolute;
                width: ${200 + i * 50}px;
                height: ${200 + i * 50}px;
                border: 2px solid var(--quantum-blue);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: ${0.1 - i * 0.01};
                animation: quantumTunnel 4s linear infinite;
                animation-delay: ${i * 0.2}s;
            `;
            
            container.appendChild(ring);
            this.quantumTunnels.push(ring);
        }

        // Add quantum tunnel animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes quantumTunnel {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 0;
                }
                50% {
                    opacity: 0.3;
                }
                100% {
                    transform: translate(-50%, -50%) scale(2) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createParticleSystems() {
        const container = document.createElement('div');
        container.className = 'particle-system-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 4;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        // Create multiple particle systems
        for (let i = 0; i < 3; i++) {
            const system = document.createElement('div');
            system.className = 'particle-system';
            system.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
            `;
            
            // Create particles for this system
            for (let j = 0; j < 50; j++) {
                const particle = document.createElement('div');
                particle.className = 'cosmic-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: ${i === 0 ? 'var(--quantum-blue)' : i === 1 ? 'var(--plasma-pink)' : '#8A2BE2'};
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    opacity: 0.6;
                    animation: particleFloat 6s ease-in-out infinite;
                    animation-delay: ${j * 0.1}s;
                `;
                system.appendChild(particle);
            }
            
            container.appendChild(system);
            this.particleSystems.push(system);
        }

        // Add particle animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.6;
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-10px) translateX(-15px);
                    opacity: 0.8;
                }
                75% {
                    transform: translateY(-30px) translateX(5px);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Add scroll-triggered animations
        window.addEventListener('scroll', () => {
            this.triggerScrollAnimations();
        });

        // Add click-triggered quantum effects
        document.addEventListener('click', (e) => {
            this.createQuantumExplosion(e.clientX, e.clientY);
        });

        // Add hover effects for interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .project, .quick-play-card')) {
                this.createHoverEffect(e.target);
            }
        });
    }

    triggerScrollAnimations() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Parallax effect for morphing shapes
        this.morphingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });

        // DNA helix rotation based on scroll
        this.dnaHelixes.forEach((helix, index) => {
            const rotation = (scrollY * 0.1) + (index * 180);
            helix.style.transform = `rotateY(${rotation}deg)`;
        });
    }

    createQuantumExplosion(x, y) {
        const explosion = document.createElement('div');
        explosion.className = 'quantum-explosion';
        explosion.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, var(--quantum-blue), var(--plasma-pink), transparent);
            pointer-events: none;
            z-index: 1000;
            animation: quantumExplosion 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(explosion);
        
        setTimeout(() => {
            explosion.remove();
        }, 600);
    }

    createHoverEffect(element) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'hover-ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 247, 255, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add explosion and ripple animations
const explosionStyles = document.createElement('style');
explosionStyles.textContent = `
    @keyframes quantumExplosion {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionStyles);

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
}); 