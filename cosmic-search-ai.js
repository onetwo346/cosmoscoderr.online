// ===========================================
// COSMIC SEARCH AI SYSTEM
// ===========================================

class CosmicSearch {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchIcon = document.querySelector('.search-icon');
        this.searchAI = document.querySelector('.search-ai');
        this.searchResults = document.querySelector('.search-results');
        this.projects = Array.from(document.querySelectorAll('.project')).map(project => ({
            title: project.querySelector('h3').textContent,
            description: project.querySelector('p').textContent,
            category: project.dataset.category,
            icon: project.dataset.iconUrl,
            link: project.querySelector('a').href
        }));
        
        this.init();
    }

    init() {
        // Initialize search events
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.searchInput.addEventListener('focus', () => this.showResults());
        this.searchIcon.addEventListener('click', () => this.handleSearch());
        this.searchAI.addEventListener('click', () => this.toggleAISearch());

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.cosmic-search')) {
                this.hideResults();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !this.searchInput.matches(':focus')) {
                e.preventDefault();
                this.searchInput.focus();
            }
            if (e.key === 'Escape') {
                this.hideResults();
            }
        });
    }

    handleSearch() {
        const query = this.searchInput.value.toLowerCase();
        if (!query) {
            this.hideResults();
            return;
        }

        const results = this.projects.filter(project => 
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.category.toLowerCase().includes(query)
        );

        this.displayResults(results);
    }

    displayResults(results) {
        if (!results.length) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-satellite-dish"></i>
                    <p>No signals detected in this sector...</p>
                </div>
            `;
        } else {
            this.searchResults.innerHTML = results.map((result, index) => `
                <div class="search-result-item" data-index="${index}">
                    <img src="${result.icon}" alt="${result.title}" class="result-icon">
                    <div class="result-content">
                        <div class="result-title">${result.title}</div>
                        <div class="result-description">${result.description}</div>
                    </div>
                </div>
            `).join('');
            
            // Add click handlers to each result
            const resultItems = this.searchResults.querySelectorAll('.search-result-item');
            resultItems.forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const result = results[index];
                    if (typeof window.openAppInModal === 'function') {
                        window.openAppInModal(result.link, result.title);
                        this.hideResults();
                        this.searchInput.value = '';
                    } else {
                        console.error('openAppInModal function not found');
                        window.open(result.link, '_blank');
                    }
                });
            });
        }

        this.showResults();
    }

    showResults() {
        this.searchResults.classList.add('active');
        // Add particle effects
        this.addParticleEffects();
    }

    hideResults() {
        this.searchResults.classList.remove('active');
    }

    addParticleEffects() {
        const particles = document.createElement('div');
        particles.className = 'search-particles';
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--delay', `${i * 0.1}s`);
            particles.appendChild(particle);
        }

        this.searchResults.appendChild(particles);
    }

    toggleAISearch() {
        // Add cool AI animation
        this.searchAI.classList.add('ai-processing');
        
        // Simulate AI thinking with a cool effect
        this.searchInput.placeholder = "🤖 Processing quantum algorithms...";
        
        setTimeout(() => {
            // Reset
            this.searchAI.classList.remove('ai-processing');
            this.searchInput.placeholder = "Search the cosmos...";
            
            // Show AI-enhanced results
            const aiResults = this.getAIEnhancedResults();
            this.displayResults(aiResults);
        }, 1500);
    }

    getAIEnhancedResults() {
        // In a real implementation, this would call your AI service
        // For now, we'll just return some filtered results
        return this.projects.filter(project => 
            project.category === 'tool' || 
            project.title.toLowerCase().includes('cosmic')
        );
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CosmicSearch();
}); 