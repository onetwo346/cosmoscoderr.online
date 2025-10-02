// PROMO HUB - Rotating Games System
class PromoHub {
    constructor() {
        // App images mapping from app-preview.js and available image files
        this.appImages = {
            'PIC2PUZZ': './pic.jpg',
            'GLOW RADIO': './glowlogo.jpg',
            'AKAN WISDOM GENERATOR': './akanlogo.jpg',
            'RANDOM QUOTE': './random.jpg',
            'FETCH OR CATCH': './fc.jpg',
            'BABY CHECKER': './babychecker.jpg',
            'VACATION IDEAS': './vac.jpg',
            'JOKES OF THE DAY': './jod.jpg',
            'SKIN ANALYST': './skin.jpg'
        };

        this.games = [
            {
                name: "PIC2PUZZ",
                description: "Transform your photos into fun, interactive puzzles with customizable difficulty levels. Create stunning visual challenges from your favorite memories.",
                url: "https://pic2puzz.space",
                category: "GAME",
                rating: 5.0,
                image: this.appImages['PIC2PUZZ']
            },
            {
                name: "GLOW RADIO",
                description: "Stream your favorite radio stations with this sleek, cosmic-themed radio player. Access thousands of stations worldwide with a beautiful interface.",
                url: "https://onetwo346.github.io/glow-radio-",
                category: "APP",
                rating: 4.8,
                image: this.appImages['GLOW RADIO']
            },
            {
                name: "AKAN WISDOM GENERATOR",
                description: "Discover ancient wisdom from the Akan culture of West Africa. Get proverbs, sayings, and philosophical insights from this rich cultural tradition.",
                url: "https://onetwo346.github.io/wise-saying",
                category: "APP",
                rating: 4.9,
                image: this.appImages['AKAN WISDOM GENERATOR']
            },
            {
                name: "RANDOM QUOTE",
                description: "Find inspiration with this random quote generator featuring thousands of quotes from philosophers, authors, scientists, and notable figures.",
                url: "https://onetwo346.github.io/random-quote-generator-RQG",
                category: "APP",
                rating: 4.7,
                image: this.appImages['RANDOM QUOTE']
            },
            {
                name: "FETCH OR CATCH",
                description: "Test your reflexes in this fast-paced treat-catching game. How many treats can you catch before time runs out?",
                url: "https://onetwo346.github.io/fetch-or-catch/",
                category: "GAME",
                rating: 4.6,
                image: this.appImages['FETCH OR CATCH']
            },
            {
                name: "BABY CHECKER",
                description: "A helpful tool for new and expecting parents to track pregnancy signs and baby development milestones with personalized insights.",
                url: "https://onetwo346.github.io/BABYYCHECKER/",
                category: "APP",
                rating: 4.8,
                image: this.appImages['BABY CHECKER']
            },
            {
                name: "VACATION IDEAS",
                description: "Your personal travel inspiration companion! Shake your device or click to discover amazing vacation destinations tailored to your interests.",
                url: "#",
                category: "APP",
                rating: 4.5,
                image: this.appImages['VACATION IDEAS']
            },
            {
                name: "JOKES OF THE DAY",
                description: "Never-ending stream of laughter! Experience an infinite collection of handpicked jokes that auto-play every 5 seconds.",
                url: "#",
                category: "APP",
                rating: 4.6,
                image: this.appImages['JOKES OF THE DAY']
            },
            {
                name: "SKIN ANALYST",
                description: "Advanced AI-powered dermatological analysis tool. Get comprehensive insights about your skin health and personalized recommendations.",
                url: "#",
                category: "APP",
                rating: 4.7,
                image: this.appImages['SKIN ANALYST']
            }
        ];
        
        this.currentIndex = 0;
        this.rotationInterval = null;
        this.rotationTime = 10 * 1000; // 10 seconds in milliseconds
        this.appsPerDisplay = 2; // Show 2 apps at a time
        
        this.init();
    }
    
    init() {
        this.createPromoHub();
        this.startRotation();
        this.addRotationIndicator();
    }
    
    createPromoHub() {
        const container = document.getElementById('featured-apps');
        if (!container) return;
        
        const grid = container.querySelector('.featured-apps-grid');
        if (!grid) return;
        
        // Clear existing cards first
        grid.innerHTML = '';
        
        // Add two random games
        this.displayRandomGames(grid);
    }
    
    displayRandomGames(container) {
        // Clear ALL existing cards first
        container.innerHTML = '';
        
        // Get the next 2 games in the cycle
        const selectedGames = this.getNextGames();
        
        selectedGames.forEach(game => {
            const card = this.createGameCard(game);
            container.appendChild(card);
        });
        
        // Add entrance animation
        this.animateCards(container);
    }
    
    getNextGames() {
        const games = [];
        
        // Get the next 2 games starting from currentIndex
        for (let i = 0; i < this.appsPerDisplay; i++) {
            const index = (this.currentIndex + i) % this.games.length;
            games.push(this.games[index]);
        }
        
        // Move to next position for next cycle
        this.currentIndex = (this.currentIndex + this.appsPerDisplay) % this.games.length;
        
        return games;
    }
    
    createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'featured-app-card';
        card.setAttribute('data-app', game.name.toLowerCase().replace(/\s+/g, '-'));
        
        card.innerHTML = `
            <div class="card-gradient-bg"></div>
            <div class="app-image-container">
                <img src="${game.image}" alt="${game.name}" class="app-image" />
            </div>
            <div class="card-content">
                <h3 class="app-title">${game.name}</h3>
                <div class="app-rating">
                    <div class="stars">${'★'.repeat(Math.floor(game.rating))}</div>
                    <span class="rating-text">${game.rating}</span>
                </div>
                <p class="app-description">${game.description}</p>
                <div class="app-category">${game.category}</div>
                <button class="app-button" onclick="window.open('${game.url}', '_blank')">
                    VIEW APP
                </button>
            </div>
        `;
        
        return card;
    }
    
    animateCards(container) {
        const cards = container.querySelectorAll('.featured-app-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    startRotation() {
        // Rotate every 10 seconds (for testing)
        this.rotationInterval = setInterval(() => {
            this.rotateGames();
        }, this.rotationTime);
        
        // Also rotate on page visibility change (when user comes back)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.rotateGames();
            }
        });
    }
    
    rotateGames() {
        const container = document.querySelector('.featured-apps-grid');
        if (!container) return;
        
        // Add exit animation
        const cards = container.querySelectorAll('.featured-app-card');
        cards.forEach((card, index) => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-50px)';
        });
        
        // Wait for exit animation, then show new games
        setTimeout(() => {
            // Clear container completely
            container.innerHTML = '';
            // Add new games
            this.displayRandomGames(container);
            this.updateRotationIndicator();
        }, 500);
    }
    
    addRotationIndicator() {
        const header = document.querySelector('.featured-apps-header');
        if (!header) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'rotation-indicator';
        indicator.innerHTML = `
            <div class="rotation-dot"></div>
            <span class="rotation-text">Apps rotate every 10 seconds</span>
            <div class="cycle-progress">
                <span class="cycle-text">Cycle: <span class="cycle-position">1</span>/<span class="cycle-total">${Math.ceil(this.games.length / this.appsPerDisplay)}</span></span>
            </div>
        `;
        
        header.appendChild(indicator);
    }
    
    updateRotationIndicator() {
        const indicator = document.querySelector('.rotation-indicator');
        if (!indicator) return;
        
        // Update cycle position
        const cyclePosition = Math.floor(this.currentIndex / this.appsPerDisplay) + 1;
        const cycleTotal = Math.ceil(this.games.length / this.appsPerDisplay);
        const positionElement = indicator.querySelector('.cycle-position');
        const totalElement = indicator.querySelector('.cycle-total');
        
        if (positionElement) {
            positionElement.textContent = cyclePosition;
        }
        if (totalElement) {
            totalElement.textContent = cycleTotal;
        }
        
        // Flash the indicator
        indicator.style.animation = 'none';
        setTimeout(() => {
            indicator.style.animation = 'indicatorFlash 1s ease-in-out';
        }, 10);
    }
    
    // Manual rotation (for testing)
    manualRotate() {
        this.rotateGames();
    }
    
    // Get time until next rotation
    getTimeUntilNextRotation() {
        const now = Date.now();
        const nextRotation = now + this.rotationTime;
        return nextRotation - now;
    }
}

// Add CSS for rotation indicator and app images
const style = document.createElement('style');
style.textContent = `
    .rotation-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
        opacity: 0.7;
    }
    
    .rotation-dot {
        width: 8px;
        height: 8px;
        background: linear-gradient(45deg, #00f7ff, #ff00f7);
        border-radius: 50%;
        animation: rotationPulse 2s ease-in-out infinite;
    }
    
    .rotation-text {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.8rem;
        font-weight: 300;
        letter-spacing: 0.5px;
    }
    
    .cycle-progress {
        margin-top: 0.5rem;
    }
    
    .cycle-text {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.7rem;
        font-weight: 300;
    }
    
    .cycle-position {
        color: #00f7ff;
        font-weight: 500;
    }
    
    .cycle-total {
        color: #ff00f7;
        font-weight: 500;
    }
    
    /* App Image Styles */
    .app-image-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        border-radius: 12px;
        z-index: 1;
    }
    
    .app-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.3s ease;
    }
    
    .featured-app-card:hover .app-image {
        transform: scale(1.05);
    }
    
    /* Make card content overlay on top of image */
    .featured-app-card .card-content {
        position: relative;
        z-index: 2;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 20px;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.4) 30%,
            rgba(0, 0, 0, 0.6) 60%,
            rgba(0, 0, 0, 0.95) 100%
        );
        border-radius: 12px;
    }
    
    /* Add additional dark overlay for better text readability */
    .featured-app-card .card-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.8) 100%
        );
        border-radius: 12px;
        z-index: -1;
    }
    
    /* Ensure card height remains consistent */
    .featured-app-card {
        min-height: 320px;
        position: relative;
        overflow: hidden;
    }
    
    /* Make text more visible over image - NIGHT THEME BLACK TITLES */
    .app-title {
        text-shadow: 
            0 0 8px rgba(255, 255, 255, 1),
            0 0 16px rgba(255, 255, 255, 0.8),
            0 4px 8px rgba(0, 0, 0, 0.9),
            0 2px 4px rgba(255, 255, 255, 0.8);
        margin-bottom: 8px;
        font-weight: 900;
        color: #000000;
        background: #000000;
        -webkit-background-clip: unset;
        -webkit-text-fill-color: #000000;
        background-clip: unset;
        padding: 8px 16px;
        border-radius: 12px;
        display: inline-block;
        border: 3px solid rgba(0, 0, 0, 0.8);
        box-shadow: 
            0 0 20px rgba(255, 255, 255, 0.8),
            inset 0 0 20px rgba(255, 255, 255, 0.4);
        font-size: 1.8rem;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    
    .app-description {
        text-shadow: 
            0 0 6px rgba(0, 0, 0, 1),
            0 0 12px rgba(0, 0, 0, 0.8),
            0 2px 6px rgba(0, 0, 0, 0.9),
            0 1px 3px rgba(0, 0, 0, 0.8);
        margin-bottom: 12px;
        color: #ffffff;
        line-height: 1.4;
        background: rgba(0, 0, 0, 0.7);
        padding: 10px 14px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .app-rating {
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
        background: rgba(0, 0, 0, 0.6);
        padding: 6px 10px;
        border-radius: 8px;
        display: inline-block;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .app-rating .stars {
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    }
    
    .app-rating .rating-text {
        color: #ffffff;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    }
    
    .app-category {
        margin-bottom: 12px;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    }
    
    .app-button {
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
        font-weight: 700;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    }
    
    /* Day mode styles - PURE BLACK TITLES */
    [data-theme="day"] .app-title {
        color: #000000 !important;
        background: #000000 !important;
        -webkit-background-clip: unset !important;
        -webkit-text-fill-color: #000000 !important;
        background-clip: unset !important;
        text-shadow: 
            0 0 4px rgba(255, 255, 255, 1),
            0 0 8px rgba(255, 255, 255, 0.8),
            0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 12px rgba(255, 255, 255, 0.6);
        border: 3px solid rgba(0, 0, 0, 0.8);
        box-shadow: 
            0 0 20px rgba(255, 255, 255, 0.8),
            inset 0 0 20px rgba(255, 255, 255, 0.4);
        font-weight: 900;
        font-size: 1.8rem;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    
    [data-theme="day"] .app-description {
        color: #000000;
        background: rgba(255, 255, 255, 0.95);
        text-shadow: 
            0 0 3px rgba(255, 255, 255, 1),
            0 0 6px rgba(255, 255, 255, 0.8),
            0 1px 3px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="day"] .app-rating {
        background: rgba(255, 255, 255, 0.9);
        color: #000000;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    
    [data-theme="day"] .app-rating .stars {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    [data-theme="day"] .app-rating .rating-text {
        color: #000000;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    [data-theme="day"] .app-category {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    [data-theme="day"] .app-button {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    @keyframes rotationPulse {
        0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
        }
        50% { 
            opacity: 1;
            transform: scale(1.2);
        }
    }
    
    @keyframes indicatorFlash {
        0% { opacity: 0.7; }
        50% { opacity: 1; transform: scale(1.05); }
        100% { opacity: 0.7; }
    }
    
    [data-theme="day"] .rotation-text {
        color: rgba(26, 26, 46, 0.6);
    }
    
    [data-theme="day"] .rotation-dot {
        background: linear-gradient(45deg, #ff6b35, #ff1744);
    }
`;

document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.promoHub = new PromoHub();
});

// Export for external use
window.PromoHub = PromoHub;
