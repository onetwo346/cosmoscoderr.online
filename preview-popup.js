// Product Preview Popup System

// GLOBAL MODAL SYSTEM - Define openAppInModal immediately so it's available for the click interceptor
(function() {
    // Create modal container as soon as possible
    let appModalContainer = null;
    
    function ensureModalContainer() {
        if (!appModalContainer) {
            appModalContainer = document.createElement('div');
            appModalContainer.className = 'in-app-modal';
            if (document.body) {
                document.body.appendChild(appModalContainer);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.appendChild(appModalContainer);
                });
            }
        }
        return appModalContainer;
    }
    
    function closeAppModal() {
        const container = ensureModalContainer();
        container.classList.remove('active');
        setTimeout(() => {
            container.innerHTML = '';
        }, 300);
    }
    
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            const container = ensureModalContainer();
            if (container.classList.contains('active')) {
                closeAppModal();
            }
        }
    }
    
    // Define openAppInModal globally
    window.openAppInModal = function(url, title) {
        const container = ensureModalContainer();
        container.innerHTML = `
            <div class="in-app-modal-content">
                <div class="in-app-modal-header">
                    <div class="in-app-modal-title">
                        <span class="app-icon">📱</span>
                        <h2>${title}</h2>
                    </div>
                    <div class="in-app-modal-controls">
                        <button class="modal-control-btn refresh-app" title="Refresh">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                            </svg>
                        </button>
                        <button class="modal-control-btn open-external" title="Open in New Tab">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </button>
                        <button class="modal-control-btn close-app-modal" title="Close">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="in-app-modal-body">
                    <iframe src="${url}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
            </div>
        `;
        
        // Show modal with animation
        requestAnimationFrame(() => {
            container.classList.add('active');
        });
        
        // Add event listeners
        const closeBtn = container.querySelector('.close-app-modal');
        const refreshBtn = container.querySelector('.refresh-app');
        const openExternalBtn = container.querySelector('.open-external');
        const iframe = container.querySelector('iframe');
        
        closeBtn.addEventListener('click', closeAppModal);
        refreshBtn.addEventListener('click', () => {
            const modalBody = container.querySelector('.in-app-modal-body');
            modalBody.classList.remove('loaded');
            iframe.src = iframe.src;
        });
        openExternalBtn.addEventListener('click', () => {
            window.open(url, '_blank');
        });
        
        iframe.addEventListener('load', () => {
            const modalBody = container.querySelector('.in-app-modal-body');
            modalBody.classList.add('loaded');
        });
        
        document.addEventListener('keydown', handleEscapeKey);
        
        container.addEventListener('click', (e) => {
            if (e.target === container) {
                closeAppModal();
            }
        });
        
        const modalContent = container.querySelector('.in-app-modal-content');
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    };
    
    window.closeAppModal = closeAppModal;
})();

// GLOBAL CLICK INTERCEPTOR - runs immediately, before DOMContentLoaded
// This captures all clicks on .btn inside .project and prevents navigation
(function() {
    document.addEventListener('click', function(e) {
        // Check if clicked element is a .btn or inside a .btn
        const btn = e.target.closest('.btn');
        if (!btn) return;
        
        // Check if this btn is inside a .project
        const project = btn.closest('.project');
        if (!project) return;
        
        // Stop the click from doing anything - MUST happen before any other code
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Get the URL and title
        const title = project.querySelector('h3, .app-title')?.textContent?.trim() || 'App';
        const url = btn.getAttribute('data-app-url') || btn.getAttribute('href');
        
        if (!url || url === '#' || url === 'javascript:void(0)') return;
        
        // Check if mobile
        const isMobile = /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isIPad = /iPad/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        
        if (isMobile && !isIPad) {
            window.open(url, '_blank');
        } else {
            window.openAppInModal(url, title);
        }
    }, true); // CAPTURE PHASE
})();

document.addEventListener('DOMContentLoaded', function() {
    // Use a single fallback image for all products
    const defaultImage = './cosmoslogo.jpg';
    
    // Product details database
    const productDetails = {
        'SwitchBox': {
            title: 'SwitchBox',
            description: 'Convert files quickly and easily with SwitchBox. Supports multiple formats and provides a seamless experience.',
            features: [
                'Fast file conversion',
                'Supports various formats',
                'Simple drag-and-drop UI'
            ],
            technologies: ['JavaScript', 'File API'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/switchbox',
            buttonLabel: 'Convert Files'
        },
        'Baby Name Picker': {
            title: 'Baby Name Picker',
            description: 'Welcome to Baby Name Picker!Stuck on choosing the perfect name?.',
            features: [
                '🎲 Random Name Generator',
                '👦👧 Gender Selection',
                '📚 Name Meaning & Origin'
            ],
            technologies: ['JavaScript', 'File API'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/baby-name-picker/',
            buttonLabel: 'Pick Names'
        },
        'Slang Translator': {
            title: 'Slang Translator',
            description: 'Decode and understand modern slang terms with this comprehensive slang translator. Perfect for staying up-to-date with contemporary language.',
            features: [
                'Extensive slang dictionary',
                'Real-time translation',
                'Context-aware definitions',
                'Popular slang updates',
                'Easy-to-use interface'
            ],
            technologies: ['JavaScript', 'REST API', 'LocalStorage'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/Slang-decoder-/',
            buttonLabel: 'Launch Translator'
        },
        'Star Script Editor': {
            title: 'Star Script Editor',
            description: 'A professional code editor with cosmic design. Write, edit, and manage your scripts with syntax highlighting and advanced features.',
            features: [
                'Syntax highlighting for multiple languages',
                'Auto-completion and suggestions',
                'File management system',
                'Dark/light theme options',
                'Real-time error detection',
                'Code formatting tools'
            ],
            technologies: ['JavaScript', 'Monaco Editor', 'Web APIs'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/script/',
            buttonLabel: 'Edit Files'
        },
        'Bunny Hop': {
            title: 'Bunny Hop',
            description: '🐰 Hop Hop Bunny Guide your bunny through fun jumps, dodge tree stumps, and grab carrots in this fast and cute adventure!.',
            features: [
                '🥕 Carrot Collecting Fun',
                '🌳 Obstacle Hopping',
                '🎮 Easy Controls '
            ],
            technologies: ['Web Game'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/bunny-hop/',
            buttonLabel: 'Play Game'
        },
        
        'Math Explorer': {
            title: 'Math Explorer',
            description: 'Math Explorer is a space-themed adventure where players solve math problems across 20 creative levels, each representing a different realm of mathematical mastery.',
            features: [
                '20 progressive levels covering addition, subtraction, multiplication, division, and more',
                  'Unique themes: Jungle, Desert, Ocean, Arctic, Space, and beyond',
                  'Covers advanced topics like fractions, equations, geometry, and sequences',
                  'Interactive "Begin Mission" button for immersive play',
                  'Visually engaging with a cosmic journey vibe',
                'Fun way to test and sharpen math skills for all ages',
                'Perfect for students, teachers, or casual learners'
            ],
            technologies: ['Web Game'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/math-guru/',
            buttonLabel: 'Start Game'
        },
        
        
        
        
        
        
        
        'XOWARS': {
            title: 'XOWARS',
            description: 'Engage in strategic battles in XOWARS. Outsmart your opponent and claim victory in this cosmic-themed game.',
            features: [
                'Turn-based strategy',
                'Multiplayer and AI modes',
                'Cosmic visuals'
            ],
            technologies: ['JavaScript', 'Canvas'],
            image: defaultImage,
            url: 'https://xowars.space',
            buttonLabel: 'Play Game'
        },
        'Quick Wrap': {
            title: 'Quick Wrap',
            description: 'Securely chat with friends and colleagues using Quick Wrap. End-to-end encryption for all your conversations.',
            features: [
                'End-to-end encryption',
                'Real-time messaging',
                'Group chats'
            ],
            technologies: ['JavaScript', 'WebSocket'],
            image: defaultImage,
            url: 'https://quickwrap.space',
            buttonLabel: 'Send Message'
        },
        'Word Grid Quest': {
            title: 'Word Grid Quest',
            description: 'Embark on a word adventure. Solve challenging word grids and expand your vocabulary in a fun way.',
            features: [
                'Challenging word puzzles',
                'Timer and hints',
                'Leaderboard'
            ],
            technologies: ['JavaScript', 'HTML', 'CSS'],
            image: defaultImage,
            url: 'https://wordgridquest.xyz',
            buttonLabel: 'Play Game'
        },
        'Invoice Generator Pro': {
            title: 'Invoice Generator Pro',
            description: 'Create professional invoices in seconds. Customize, download, and send invoices with ease.',
            features: [
                'Customizable templates',
                'PDF download',
                'Client management'
            ],
            technologies: ['JavaScript', 'PDF API'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/invoice-generator',
            buttonLabel: 'Create Invoice'
        },
        'Dip Image Generator': {
            title: 'Dip Image Generator',
            description: 'Generate stunning art and images with AI. Enter your prompt and watch Dip create magic.',
            features: [
                'AI-powered image generation',
                'Multiple styles',
                'Download and share'
            ],
            technologies: ['JavaScript', 'AI API'],
            image: defaultImage,
            url: 'https://dipimagegenerator.lat',
            buttonLabel: 'Generate Images'
        },
        'Make This Recipe': {
            title: 'Make This Recipe',
            description: 'Find delicious recipes tailored to your taste. Search, save, and share your favorite dishes.',
            features: [
                'Recipe search',
                'Personalized recommendations',
                'Save favorites'
            ],
            technologies: ['JavaScript', 'REST API'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/Make-this-recipe-',
            buttonLabel: 'Find Recipes'
        },
        'Horonum': {
            title: 'Horonum',
            description: 'Discover personalized astrology insights with Horonum. Get daily, weekly, and monthly forecasts.',
            features: [
                'Personalized astrology',
                'Daily/weekly/monthly forecasts',
                'Birth chart analysis'
            ],
            technologies: ['JavaScript', 'Astrology API'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/horonum',
            buttonLabel: 'Get Insights'
        },
        'Time Escape': {
            title: 'Time Escape',
            description: 'Embark on a space adventure. Solve puzzles and escape through time in this cosmic game.',
            features: [
                'Puzzle adventure',
                'Time-based challenges',
                'Immersive storyline'
            ],
            technologies: ['JavaScript', 'HTML', 'CSS'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/space-shooting',
            buttonLabel: 'Play Game'
        },
        'Beeek': {
            title: 'Beeek',
            description: 'Transform your voice into magic. Convert speech to text and text to speech with Beeek.',
            features: [
                'Speech-to-text',
                'Text-to-speech',
                'Multiple languages'
            ],
            technologies: ['JavaScript', 'Web Speech API'],
            image: defaultImage,
            url: 'https://beeek.online',
            buttonLabel: 'Convert Text'
        },
        'Resume Builder': {
            title: 'Resume Builder',
            description: 'Build your career with professional resumes and cover letters. Easy templates and expert tips included.',
            features: [
                'Professional templates',
                'Guided creation',
                'Export to PDF'
            ],
            technologies: ['JavaScript', 'PDF API'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/Resume-cover-letter-',
            buttonLabel: 'Create Resume'
        },
        'Gift Idea Genius': {
            title: 'Gift Idea Genius',
            description: 'Find the perfect gift for any occasion. Get AI-powered suggestions tailored to your recipient.',
            features: [
                'Personalized gift ideas',
                'Occasion and recipient filters',
                'Save favorites'
            ],
            technologies: ['JavaScript', 'AI API'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/Gift-idea-genius-',
            buttonLabel: 'Find Gifts'
        },
        'Cosmic Horizon': {
            title: 'Cosmic Horizon',
            description: 'Explore the universe with Cosmic Horizon. Discover new worlds, stars, and cosmic phenomena.',
            features: [
                'Interactive space exploration',
                'Real-time cosmic data',
                'Educational content'
            ],
            technologies: ['JavaScript', 'Three.js'],
            image: defaultImage,
            url: 'https://cosmichorizon.space',
            buttonLabel: 'Explore'
        },
        'Pic2Puzz': {
            title: 'Pic2Puzz',
            description: 'Transform your images gifs and vids  into interactive puzzles with Pic2Puzz. This application allows you to upload any image and convert it into a customizable puzzle with varying difficulty levels.',
            features: [
                'Image upload and processing',
                'Multiple difficulty levels',
                'Drag and drop puzzle pieces',
                'Timer and move counter',
                'Save and resume puzzles'
            ],
            technologies: ['JavaScript', 'HTML Canvas', 'CSS Grid', 'File API'],
            image: defaultImage,
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
            image: defaultImage,
            url: 'https://onetwo346.github.io/glow-radio-'
        },
        'Random Quote': {
            title: 'Random Quote',
            description: 'Find inspiration with this random quote generator featuring thousands of quotes from philosophers, authors, scientists, and other notable figures throughout history.',
            features: [
                'Filter by category or author',
                'Copy quote to clipboard',
                'Share to social media',
                'Daily featured quotes',
                'Dark/light theme toggle'
            ],
            technologies: ['JavaScript', 'REST API', 'LocalStorage'],
            image: defaultImage,
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
            image: defaultImage,
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
            image: defaultImage,
            url: 'https://onetwo346.github.io/BABYYCHECKER/'
        },
        'Cosmic Bible': {
            title: 'Cosmic Bible',
            description: 'Experience scripture in a new, immersive way with this cosmic-themed Bible application. Features beautiful design, easy navigation, and powerful search capabilities.',
            features: [
                'Multiple translations',
                'Verse highlighting and bookmarking',
                'Study notes and commentaries',
                'Audio playback',
                'Night mode for comfortable reading'
            ],
            technologies: ['JavaScript', 'IndexedDB', 'Web Speech API'],
            image: defaultImage,
            url: 'https://onetwo346.github.io/cb/'
        },
        'Earthquake Analyst': {
            title: 'Earthquake Analyst',
            description: 'Monitor and analyze seismic activity around the world with this powerful earthquake tracking tool. Get real-time updates and detailed information about recent seismic events.',
            features: [
                'Real-time earthquake data',
                'Interactive global map',
                'Magnitude and depth filtering',
                'Historical data analysis',
                'Notification system for major events'
            ],
            technologies: ['JavaScript', 'Leaflet.js', 'USGS API', 'Chart.js'],
            image: defaultImage,
            url: 'https://earthquakeanalyst.space'
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
            buttonLabel: 'Plan Adventure',
            url: 'https://onetwo346.github.io/vacation-ideas-/'
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
            buttonLabel: 'Get Laughing',
            url: 'https://onetwo346.github.io/jokes-of-the-day/'
        },

        'Skin Analyst': {
            title: 'Skin Analyst',
            description: 'Advanced dermatological analysis tool. Get comprehensive insights about your skin health, including acne analysis, hydration levels, anti-aging indicators, and pigmentation assessment.',
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
            buttonLabel: 'Check Skin',
            url: 'https://onetwo346.github.io/skin-analyst/'
        },
        'Space Calculator': {
            title: 'Space Calculator',
            description: 'Your cosmic computing companion! A comprehensive calculator featuring basic arithmetic, scientific functions, universal unit converter, and orbital mechanics calculations - all with a beautiful space-themed interface.',
            features: [
                '🔢 Basic Calculator - Essential arithmetic operations',
                '🧮 Scientific Mode - Advanced functions, constants, and memory operations',
                '🌍 Unit Converter - Convert between 9 scientific categories of units',
                '🛰️ Orbital Mechanics - Calculate orbital velocities and periods',
                '⚡ Real-time calculations with scientific precision',
                '🌌 Space-themed interface with responsive design'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Mathematical APIs', 'Unit Conversion Engine'],
            image: 'IMG_0335.jpeg',
            buttonLabel: 'Calculate',
            url: 'https://onetwo346.github.io/SPACE-CALCU/'
        },
    };

    // Create popup container
    const popupContainer = document.createElement('div');
    popupContainer.className = 'preview-popup';
    document.body.appendChild(popupContainer);

    // Improved helper function to detect mobile devices (excluding iPad)
    function isMobileDevice() {
        const ua = navigator.userAgent;
        // Exclude iPad from mobile detection
        const isIPad = /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isIPad) return false; // Treat iPad as desktop
        
        // Touch support (covers most modern mobile devices)
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        // User agent check (covers older devices and some edge cases)
        const isMobileUA = /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        // Screen size fallback (optional, for very small screens)
        const isSmallScreen = window.innerWidth <= 800 && window.innerHeight <= 900;
        // Combine checks for best accuracy
        return (hasTouch && isMobileUA) || isMobileUA || (hasTouch && isSmallScreen);
    }

    // Modal functions are now defined globally at the top of this file
    // No duplicate code needed here

    // Store URLs in data-app-url for buttons that have href
    // The global click interceptor at the top of this file handles the actual click behavior
    document.querySelectorAll('.project .btn').forEach(btn => {
        const href = btn.getAttribute('href');
        if (href && href !== '#' && href !== 'javascript:void(0)') {
            btn.setAttribute('data-app-url', href);
        }
    });
    
    // Handle card clicks (not button) for preview popup
    document.addEventListener('click', function(e) {
        // Skip if clicking a button
        if (e.target.closest('.btn')) return;
        
        const project = e.target.closest('.project');
        if (!project) return;
        
        const title = project.querySelector('h3, .app-title').textContent.trim();
        const actionButton = project.querySelector('.btn');
        const buttonText = actionButton ? actionButton.textContent.trim() : 'Launch App';
        
        let details = productDetails[title] || {
            title: title,
            description: project.querySelector('p, .app-description')?.textContent.trim() || 'Explore this cosmic application and discover its features.',
            features: ['Interactive user interface', 'Cosmic design elements', 'Responsive layout'],
            technologies: ['HTML', 'CSS', 'JavaScript'],
            url: actionButton ? (actionButton.getAttribute('data-app-url') || actionButton.getAttribute('href') || '#') : '#'
        };
        
        // Always use the data-icon-url from the project element if available
        if (project.dataset.iconUrl) {
            details.image = project.dataset.iconUrl;
        }
        
        // Use the button text from the project if no custom buttonLabel is defined
        if (!details.buttonLabel) {
            details.buttonLabel = buttonText;
        }
        
        // Show popup
        showPreviewPopup(details);
    });

    // Function to show preview popup
    function showPreviewPopup(details) {
        // Ensure image path is properly formatted
        let imagePath = details.image || defaultImage;
        
        // If the image path doesn't start with http or ./, add ./ to make it relative to root
        if (!imagePath.startsWith('http') && !imagePath.startsWith('./')) {
            imagePath = './' + imagePath;
        }
        
        // Create popup content
        popupContainer.innerHTML = `
            <div class="preview-content">
                <div class="preview-header">
                    <h2 class="preview-title">${details.title}</h2>
                    <button class="preview-close">&times;</button>
                </div>
                <div class="preview-body">
                    <div class="preview-image" style="background-image: url('${imagePath}')"></div>
                    <div class="preview-details">
                        <div class="preview-description">${details.description}</div>
                        <div class="preview-features">
                            <h3>Key Features</h3>
                            <ul class="features-list">
                                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="preview-footer">
                    <button class="preview-btn preview-btn-secondary close-preview">Close</button>
                    <button class="preview-btn preview-btn-primary launch-app-btn" data-url="${details.url}" data-title="${details.title}">${details.buttonLabel || 'Launch App'}</button>
                </div>
            </div>
        `;
        
        // Force a reflow before adding the active class for smoother animation
        popupContainer.offsetHeight;
        
        // Add active class immediately
        popupContainer.classList.add('active');
        
        // Add close button event listeners
        popupContainer.querySelector('.preview-close').addEventListener('click', closePreviewPopup);
        popupContainer.querySelector('.close-preview').addEventListener('click', closePreviewPopup);
        
        // Add launch app button listener
        const launchBtn = popupContainer.querySelector('.launch-app-btn');
        launchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            const title = this.getAttribute('data-title');
            
            if (isMobileDevice()) {
                // On mobile phones, open in new tab
                window.open(url, '_blank');
            } else {
                // On desktop and iPad, open in iframe modal
                closePreviewPopup(); // Close the preview popup first
                setTimeout(() => {
                    openAppInModal(url, title);
                }, 300);
            }
        });
        
        // Close when clicking outside the content
        popupContainer.addEventListener('click', function(e) {
            if (e.target === popupContainer) {
                closePreviewPopup();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
                closePreviewPopup();
            }
        });
    }
    
    // Function to close preview popup
    function closePreviewPopup() {
        popupContainer.classList.remove('active');
        // Add a small delay to allow the closing animation to complete
        setTimeout(() => {
            // Clear the popup content to prevent it from appearing elsewhere
            popupContainer.innerHTML = '';
        }, 300);
    }
});