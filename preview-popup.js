// Product Preview Popup System
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
        'Resume/Cover Letter': {
            title: 'Resume/Cover Letter',
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
            image: defaultImage,
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
        }
    };

    // Create popup container
    const popupContainer = document.createElement('div');
    popupContainer.className = 'preview-popup';
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
        // Get the main action button to prevent conflicts
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

        // Add click event to the project card
        project.addEventListener('click', function(e) {
            // On mobile: if clicking the button, do not show popup
            if (isMobileDevice() && (e.target === actionButton || (actionButton && actionButton.contains(e.target)))) {
                // Let the button handle navigation
                return;
            }
            // On desktop: don't trigger if clicking on the main action button
            if (!isMobileDevice() && (e.target === actionButton || (actionButton && actionButton.contains(e.target)))) {
                return;
            }
            // Get project title
            const title = project.querySelector('h3').textContent.trim();
            // Get the button text for the action button
            const buttonText = project.querySelector('.btn').textContent.trim();
            // Get details from database or create fallback
            let details = productDetails[title] || {
                title: title,
                description: 'Explore this cosmic application and discover its features.',
                features: ['Interactive user interface', 'Cosmic design elements', 'Responsive layout'],
                technologies: ['HTML', 'CSS', 'JavaScript'],
                url: project.querySelector('.btn').getAttribute('href') || '#'
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
                    <a href="${details.url}" target="_blank" class="preview-btn preview-btn-primary">${details.buttonLabel || 'Launch App'}</a>
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