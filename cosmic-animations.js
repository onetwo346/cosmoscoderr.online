// Cosmic Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 50);
            } else {
                counter.innerText = value;
            }
        };
        
        animate();
    });

    // Enhance planets with parallax effect
    document.addEventListener('mousemove', (e) => {
        const planets = document.querySelectorAll('.planet');
        const asteroids = document.querySelectorAll('.floating-asteroid');
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        planets.forEach((planet, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            planet.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        asteroids.forEach((asteroid, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            asteroid.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
        });
    });

    // Add a Quick Play section before projects
    const container = document.querySelector('.container');
    const projectsSection = document.getElementById('projects');
    
    if (container && projectsSection) {
        const quickPlaySection = document.createElement('section');
        quickPlaySection.id = 'quick-play';
        quickPlaySection.innerHTML = `
            <div class="quick-play-header">
                <h2>Quick Play</h2>
                <div class="quick-play-subtitle-container">
                    <div class="quick-play-subtitle-line"></div>
                    <p class="quick-play-subtitle">INSTANT ACCESS</p>
                    <div class="quick-play-subtitle-line"></div>
                </div>
            </div>
            <div class="quick-play-carousel">
                <div class="quick-play-card">
                    <div class="quick-play-glow"></div>
                    <h3 class="quick-play-title">Pic2Puzz</h3>
                    <p class="quick-play-description">Transform your photos into fun, interactive puzzles with customizable difficulty levels.</p>
                    <div class="quick-play-rating">★★★★★</div>
                    <span class="quick-play-category">Game</span>
                    <a href="https://pic2puzz.space" class="quick-play-btn" target="_blank">View App</a>
                </div>
                
                <div class="quick-play-card">
                    <div class="quick-play-glow"></div>
                    <h3 class="quick-play-title">XOWARS</h3>
                    <p class="quick-play-description">Strategic battle game with a cosmic twist on the classic tic-tac-toe.</p>
                    <div class="quick-play-rating">★★★★★</div>
                    <span class="quick-play-category">Game</span>
                    <a href="https://xowars.space/" class="quick-play-btn" target="_blank">View App</a>
                </div>
            </div>
        `;
        
        container.insertBefore(quickPlaySection, projectsSection);
        
        // Add styles for Quick Play section
        const style = document.createElement('style');
        style.textContent = `
            #quick-play {
                padding: 4rem 0;
                position: relative;
                overflow: hidden;
            }
            
            .quick-play-header {
                text-align: center;
                margin-bottom: 3rem;
            }
            
            .quick-play-subtitle-container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 1rem;
                gap: 1rem;
            }
            
            .quick-play-subtitle-line {
                height: 2px;
                width: 50px;
                background: linear-gradient(90deg, transparent, var(--quantum-blue), transparent);
            }
            
            .quick-play-subtitle {
                color: var(--quantum-blue);
                font-size: 0.9rem;
                letter-spacing: 3px;
                font-weight: 600;
                text-transform: uppercase;
                font-family: 'Orbitron', sans-serif;
                background: linear-gradient(45deg, var(--quantum-blue), var(--plasma-pink));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                padding: 0 0.5rem;
            }
            
            .quick-play-carousel {
                display: flex;
                gap: 4rem;
                justify-content: center;
                flex-wrap: wrap;
                padding: 1rem;
                max-width: 900px;
                margin: 0 auto;
            }
            
            .quick-play-card {
                position: relative;
                width: 300px;
                height: 400px;
                background: rgba(10, 10, 30, 0.7);
                border-radius: 20px;
                padding: 2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                overflow: hidden;
            }
            
            .quick-play-glow {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at 50% 0%, var(--quantum-blue), transparent 70%);
                opacity: 0.1;
                transition: opacity 0.3s ease;
                z-index: 0;
            }
            
            .quick-play-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0, 247, 255, 0.3);
            }
            
            .quick-play-card:hover .quick-play-glow {
                opacity: 0.2;
            }
            
            .quick-play-title {
                font-size: 1.8rem;
                margin-bottom: 1rem;
                color: var(--quantum-blue);
                font-weight: 700;
                position: relative;
                z-index: 1;
                background: linear-gradient(45deg, var(--quantum-blue), var(--plasma-pink));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .quick-play-description {
                color: white;
                margin-bottom: 2rem;
                font-size: 1rem;
                line-height: 1.6;
                position: relative;
                z-index: 1;
                flex-grow: 1;
            }
            
            .quick-play-rating {
                color: gold;
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
                position: relative;
                z-index: 1;
            }
            
            .quick-play-category {
                color: white;
                background: linear-gradient(45deg, var(--quantum-blue), var(--plasma-pink));
                padding: 0.3rem 1rem;
                border-radius: 50px;
                font-size: 0.9rem;
                margin-bottom: 1.5rem;
                position: relative;
                z-index: 1;
                font-weight: 600;
            }
            
            .quick-play-btn {
                display: inline-block;
                padding: 0.8rem 2rem;
                background: rgba(0, 247, 255, 0.2);
                color: var(--quantum-blue);
                text-decoration: none;
                font-weight: 700;
                border-radius: 50px;
                border: 2px solid var(--quantum-blue);
                transition: all 0.3s ease;
                position: relative;
                z-index: 1;
                overflow: hidden;
            }
            
            .quick-play-btn:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 0%;
                height: 100%;
                background: linear-gradient(45deg, var(--quantum-blue), var(--plasma-pink));
                transition: width 0.3s ease;
                z-index: -1;
            }
            
            .quick-play-btn:hover {
                color: black;
                border-color: transparent;
                box-shadow: 0 5px 15px rgba(0, 247, 255, 0.5);
            }
            
            .quick-play-btn:hover:before {
                width: 100%;
            }
            
            @media (max-width: 768px) {
                .quick-play-carousel {
                    flex-direction: column;
                    align-items: center;
                }
                
                .quick-play-card {
                    width: 100%;
                    max-width: 350px;
                    height: auto;
                    min-height: 380px;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Add hover effects to quick play cards
        setTimeout(() => {
            const quickPlayCards = document.querySelectorAll('.quick-play-card');
            quickPlayCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        }, 1000);
    }
});