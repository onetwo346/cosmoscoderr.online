// Interactive App Preview System
// Removed THREE.js 3D icon logic

class AppPreview {
    constructor() {
        this.initDetailPopup();
    }

    // Modern Detail Popup functionality
    initDetailPopup() {
        // Project details data
        const projectDetails = {
            'Pic2Puzz': {
                title: 'Pic2Puzz',
                description: 'Transform your images into interactive puzzles with Pic2Puzz. This application allows you to upload any image and convert it into a customizable puzzle with varying difficulty levels.',
                features: [
                    'Image upload and processing',
                    'Multiple difficulty levels',
                    'Drag and drop puzzle pieces',
                    'Timer and move counter',
                    'Save and resume puzzles'
                ],
                technologies: ['JavaScript', 'HTML Canvas', 'CSS Grid', 'File API'],
                image: './pic.jpg',
                url: 'https://pic2puzz.space'
            },
            'Glow Radio': {
                title: 'Glow Radio',
                description: 'Stream your favorite radio stations with this sleek, cosmic-themed radio player. Glow Radio offers access to thousands of stations worldwide with a beautiful, minimalist interface.',
                features: [
                    'Access to global radio stations',
                    'Station search and favorites',
                    'Sleep timer functionality',
                    'Background playback',
                    'Visualizer effects'
                ],
                technologies: ['JavaScript', 'Web Audio API', 'IndexedDB', 'Radio Browser API'],
                image: './glowlogo.jpg',
                url: 'https://onetwo346.github.io/glow-radio-'
            },
            'AKAN WISDOM GENERATOR': {
                title: 'AKAN WISDOM GENERATOR',
                description: 'Discover ancient wisdom from the Akan culture of West Africa. This generator provides proverbs, sayings, and philosophical insights from this rich cultural tradition.',
                features: [
                    'Daily wisdom updates',
                    'Categories of wisdom',
                    'Share to social media',
                    'Save favorites',
                    'Cultural context explanations'
                ],
                technologies: ['JavaScript', 'LocalStorage API', 'Share API'],
                image: './akanlogo.jpg',
                url: 'https://onetwo346.github.io/wise-saying'
            },
            'RANDOM QUOTE': {
                title: 'RANDOM QUOTE',
                description: 'Find inspiration with this random quote generator featuring thousands of quotes from philosophers, authors, scientists, and other notable figures throughout history.',
                features: [
                    'Filter by category or author',
                    'Copy quote to clipboard',
                    'Share to social media',
                    'Daily featured quotes',
                    'Dark/light theme toggle'
                ],
                technologies: ['JavaScript', 'REST API', 'LocalStorage'],
                image: './random.jpg',
                url: 'https://onetwo346.github.io/random-quote-generator-RQG'
            },
            'Fetch or Catch': {
                title: 'Fetch or Catch',
                description: 'A fun and addictive game where you catch falling treats in your basket. Test your reflexes and timing in this colorful, fast-paced arcade game.',
                features: [
                    'Increasing difficulty levels',
                    'Power-ups and special items',
                    'High score tracking',
                    'Multiple character skins',
                    'Special challenge modes'
                ],
                technologies: ['JavaScript', 'HTML Canvas', 'RequestAnimationFrame API'],
                image: './fc.jpg',
                url: 'https://onetwo346.github.io/fetch-or-catch/'
            },
            'Baby Checker': {
                title: 'Baby Checker',
                description: 'A helpful tool for new and expecting parents to track pregnancy signs and baby development milestones. Get personalized insights and recommendations based on your inputs.',
                features: [
                    'Pregnancy symptom tracker',
                    'Baby development timeline',
                    'Customized recommendations',
                    'Reminder notifications',
                    'Medical information resources'
                ],
                technologies: ['JavaScript', 'LocalStorage', 'Notification API'],
                image: './babychecker.jpg',
                url: 'https://onetwo346.github.io/BABYYCHECKER/'
            }
            // Add more project details as needed
        };

        // Create popup container
        const popupContainer = document.createElement('div');
        popupContainer.className = 'detail-popup';
        document.body.appendChild(popupContainer);

        // Add click event to all project cards
        document.querySelectorAll('.project').forEach(project => {
            // Make the entire card clickable
            project.style.cursor = 'pointer';
            
            // Add click event to the entire project card except the button
            const projectContent = project.querySelector('.project-content');
            const iconContainer = project.querySelector('.icon-3d-container');
            const actionButton = project.querySelector('.btn');
            
            // Make sure we don't interfere with the button click
            if (actionButton) {
                actionButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
            
            // Add click handlers to different parts of the card
            [projectContent, iconContainer].forEach(element => {
                if (element) {
                    element.addEventListener('click', (e) => {
                        // Don't trigger if clicking on the action button
                        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
                            return;
                        }
                        
                        // Get project title
                        const title = project.querySelector('h3').textContent.trim();
                        const details = projectDetails[title] || {
                            title: title,
                            description: 'Explore this cosmic application and discover its features.',
                            features: ['Interactive user interface', 'Cosmic design elements', 'Responsive layout'],
                            technologies: ['HTML', 'CSS', 'JavaScript'],
                            image: project.dataset.iconUrl || './cosmoslogo.jpg',
                            url: project.querySelector('.btn').getAttribute('href') || '#'
                        };
                        
                        // Create popup content
                        this.showDetailPopup(details, popupContainer);
                    });
                }
            });
        });

        // Close popup when clicking outside content
        popupContainer.addEventListener('click', (e) => {
            if (e.target === popupContainer) {
                this.closeDetailPopup(popupContainer);
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
                this.closeDetailPopup(popupContainer);
            }
        });
    }

    showDetailPopup(details, container) {
        console.log('Showing popup for:', details.title); // Debug
        
        // Create popup content
        container.innerHTML = `
            <div class="detail-popup-content">
                <div class="detail-popup-header">
                    <h2 class="detail-popup-title">${details.title}</h2>
                    <button class="detail-popup-close">&times;</button>
                </div>
                <div class="detail-popup-body">
                    <div class="detail-popup-image" style="background-image: url('${details.image}')"></div>
                    <div class="detail-popup-info">
                        <div class="detail-popup-description">${details.description}</div>
                        <div class="detail-popup-features">
                            <h4>Key Features</h4>
                            <ul class="feature-list">
                                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="detail-popup-tech">
                            <h4>Technologies</h4>
                            <div class="tech-tags">
                                ${details.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-popup-footer">
                    <button class="detail-btn detail-btn-secondary close-detail">Close</button>
                    <a href="${details.url}" target="_blank" class="detail-btn detail-btn-primary">Launch App</a>
                </div>
            </div>
        `;

        // Force a reflow before adding the active class
        container.offsetHeight;
        
        // Add active class immediately
        container.classList.add('active');

        // Add close button event listener
        container.querySelector('.detail-popup-close').addEventListener('click', () => {
            this.closeDetailPopup(container);
        });

        // Add close button in footer event listener
        container.querySelector('.close-detail').addEventListener('click', () => {
            this.closeDetailPopup(container);
        });

        // Add cosmic cursor effect inside popup
        const popupContent = container.querySelector('.detail-popup-content');
        popupContent.addEventListener('mousemove', (e) => {
            const rect = popupContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create subtle gradient follow effect
            popupContent.style.background = `
                linear-gradient(135deg, 
                    rgba(30, 30, 61, 0.9), 
                    rgba(10, 10, 18, 0.95)),
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(0, 247, 255, 0.15),
                    transparent 25%
                )
            `;
        });
    }

    closeDetailPopup(container) {
        container.classList.remove('active');
        // Add a small delay to allow the closing animation to complete
        setTimeout(() => {
            // Clear the popup content to prevent it from appearing elsewhere
            container.innerHTML = '';
        }, 300);
    }
}

// Initialize
const appPreview = new AppPreview();