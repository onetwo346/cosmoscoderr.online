// Interactive App Preview System
// Removed THREE.js 3D icon logic

class AppPreview {
    constructor() {
        this.initDetailPopup();
    }

    // Modern Detail Popup functionality
    initDetailPopup() {
        // Project details data
        const productDetails = {
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
            },
            'Vacation Ideas': {
                title: 'Vacation Ideas',
                description: 'Your personal travel inspiration companion! Shake your device or click to discover amazing vacation destinations tailored to your interests. Features adventure, relaxation, cultural experiences, and nature getaways.',
                features: [
                    'Shake-to-Generate Travel Ideas',
                    'Multiple Travel Categories (Adventure, Relax, Culture, Nature)',
                    'Save Favorite Destinations',
                    'Trip Counter & Statistics',
                    'Share Travel Plans with Friends'
                ],
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Device Motion API', 'LocalStorage'],
                image: 'vacation.jpg',
                buttonLabel: 'Plan Adventure'
            },

            'Jokes of the Day': {
                title: 'Jokes of the Day',
                description: 'Never-ending stream of laughter! Experience an infinite collection of handpicked jokes that auto-play every 5 seconds. Pause, favorite, and share the ones that make you laugh out loud.',
                features: [
                    'Auto-playing Joke Stream',
                    'Keyboard Controls (P for Pause)',
                    'Favorite Joke Collection',
                    'One-Click Sharing',
                    'Multiple Joke Categories',
                    'No Repeats Guaranteed'
                ],
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Web Animations API', 'Share API'],
                image: 'jokes.jpg',
                buttonLabel: 'Get Laughing'
            },

            'Skin Analyst': {
                title: 'Skin Analyst',
                description: 'Advanced AI-powered dermatological analysis tool. Get comprehensive insights about your skin health, including acne analysis, hydration levels, anti-aging indicators, and pigmentation assessment.',
                features: [
                    'Real-time AI Analysis',
                    'Comprehensive Skin Health Score',
                    'Multiple Analysis Modes',
                    'Detailed Reports & History',
                    'Personalized Recommendations',
                    'Export Analysis Results'
                ],
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'AI Analysis Engine', 'Camera API'],
                image: 'skin.jpg',
                buttonLabel: 'Check Skin'
            }
            // Add more project details as needed
        };

        // Create popup container
        const popupContainer = document.createElement('div');
        popupContainer.className = 'detail-popup';
        document.body.appendChild(popupContainer);

        // Improved helper function to detect mobile devices
        function isMobileDevice() {
            // Touch support (covers most modern mobile devices)
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            // User agent check (covers older devices and some edge cases)
            const ua = navigator.userAgent;
            const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
            // Screen size fallback (optional, for very small screens)
            const isSmallScreen = window.innerWidth <= 800 && window.innerHeight <= 900;
            // Combine checks for best accuracy
            return (hasTouch && isMobileUA) || isMobileUA || (hasTouch && isSmallScreen);
        }

        // Add click event to all project cards
        document.querySelectorAll('.project').forEach(project => {
            // Make the entire card clickable
            project.style.cursor = 'pointer';
            
            // Add click event to the entire project card except the button
            const projectContent = project.querySelector('.project-content');
            const iconContainer = project.querySelector('.icon-3d-container');
            const actionButton = project.querySelector('.btn');
            
            // On mobile: make the button a direct link (no popup)
            if (actionButton) {
                actionButton.addEventListener('click', function(e) {
                    if (isMobileDevice()) {
                        // Let the link work normally (open in new tab or same tab)
                        // No popup
                        // Do nothing here, allow default
                    } else {
                        // On desktop, stop propagation so card click doesn't trigger
                        e.stopPropagation();
                    }
                });
            }
            
            // Add click handlers to different parts of the card
            [projectContent, iconContainer].forEach(element => {
                if (element) {
                    element.addEventListener('click', (e) => {
                        // On mobile: if clicking the button, do not show popup
                        if (isMobileDevice() && (e.target.classList.contains('btn') || e.target.closest('.btn'))) {
                            // Let the button handle navigation
                            return;
                        }
                        // On desktop: don't trigger if clicking on the main action button
                        if (!isMobileDevice() && (e.target.classList.contains('btn') || e.target.closest('.btn'))) {
                            return;
                        }
                        // Get project title
                        const title = project.querySelector('h3').textContent.trim();
                        const details = productDetails[title] || {
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
                    <button class="detail-btn detail-btn-primary launch-app-btn" data-url="${details.url}" data-title="${details.title}">Launch App</button>
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

        // Add launch app button event listener - use modal on desktop, new tab on mobile
        const launchBtn = container.querySelector('.launch-app-btn');
        if (launchBtn) {
            launchBtn.addEventListener('click', () => {
                const url = launchBtn.getAttribute('data-url');
                const title = launchBtn.getAttribute('data-title');
                
                // Check if mobile device
                const isMobile = /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const isIPad = /iPad/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                
                if (isMobile && !isIPad) {
                    // Mobile: open in new tab
                    window.open(url, '_blank');
                } else {
                    // Desktop/iPad: use in-app modal
                    this.closeDetailPopup(container);
                    setTimeout(() => {
                        if (typeof window.openAppInModal === 'function') {
                            window.openAppInModal(url, title);
                        } else {
                            window.open(url, '_blank');
                        }
                    }, 300);
                }
            });
        }

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