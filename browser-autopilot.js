// Browser Autopilot System - Automatic App Showcase
(function() {
    'use strict';

    class BrowserAutopilot {
        constructor() {
            this.isActive = false;
            this.currentIndex = 0;
            this.projects = [];
            this.originalProjects = [];
            this.intervalId = null;
            this.speed = 5000;
            this.isPaused = false;
            this.controlPanel = null;
            this.progressBar = null;
            this.progressInterval = null;
            this.progressValue = 0;
            this.hoveredProject = null;
            this.previewMode = 'none';
            this.iframeContainer = null;
            this.shuffleMode = false;
            this.favorites = [];
            this.viewedApps = [];
            this.sessionStats = { started: 0, completed: 0, totalTime: 0 };
            this.filterCategory = 'all';
            this.scrollMode = 'center';
            this.pageTourActive = false;
            this.tourScrollInterval = null;
            this.tourSpeed = 50;
            this.tourPhase = 'scroll'; // 'scroll' or 'apps'
            this.tourDirection = 'down'; // 'down' or 'up'
            this.fullscreenMode = false;
            this.voiceEnabled = false;
            this.voiceControl = null;
            
            // Drag properties
            this.isDragging = false;
            this.dragStartX = 0;
            this.dragStartY = 0;
            this.panelStartX = 0;
            this.panelStartY = 0;
            
            this.init();
        }

        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            this.createControlPanel();
            this.createIframeContainer();
            this.collectProjects();
            this.attachEventListeners();
            this.enableDragging();
            this.initVoiceControl();
            this.loadSettings();
        }

        initVoiceControl() {
            // Initialize voice control if available
            if (typeof VoiceControl !== 'undefined') {
                this.voiceControl = new VoiceControl(this);
            }
        }

        collectProjects() {
            const projectElements = document.querySelectorAll('.project');
            this.originalProjects = Array.from(projectElements).map((el, index) => {
                const title = el.querySelector('h3')?.textContent.trim() || `Project ${index + 1}`;
                const description = el.querySelector('p')?.textContent.trim() || '';
                const button = el.querySelector('.btn');
                const url = button?.getAttribute('href') || '#';
                const iconUrl = el.dataset.iconUrl || './cosmoslogo.jpg';
                
                const category = el.dataset.category || 'other';
                return {
                    element: el,
                    title,
                    description,
                    url,
                    iconUrl,
                    index,
                    category,
                    viewCount: 0,
                    isFavorite: false
                };
            });
            this.projects = [...this.originalProjects];
            this.loadFavorites();
        }

        createControlPanel() {
            const panel = document.createElement('div');
            panel.className = 'autopilot-control-panel';
            panel.innerHTML = `
                <div class="autopilot-header">
                    <div class="autopilot-title">
                        <i class="fas fa-plane"></i>
                        <span>Autopilot</span>
                    </div>
                    <button class="autopilot-minimize" title="Minimize">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="autopilot-body">
                    <div class="autopilot-status">
                        <span class="status-indicator"></span>
                        <span class="status-text">Ready</span>
                    </div>
                    
                    <div class="autopilot-progress">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="progress-info">
                            <span class="current-app">No app selected</span>
                            <span class="app-counter">0/${this.projects.length}</span>
                        </div>
                    </div>

                    <div class="autopilot-controls">
                        <button class="autopilot-btn start-btn" title="Launch">
                            <i class="fas fa-play"></i>
                            <span>Launch</span>
                        </button>
                        <button class="autopilot-btn pause-btn" title="Pause" disabled>
                            <i class="fas fa-pause"></i>
                        </button>
                        <button class="autopilot-btn stop-btn" title="Stop" disabled>
                            <i class="fas fa-stop"></i>
                        </button>
                        <button class="autopilot-btn prev-btn" title="Previous">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="autopilot-btn next-btn" title="Next">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>

                    <div class="autopilot-settings">
                        <!-- Speed Control -->
                        <div class="setting-group">
                            <label>
                                <i class="fas fa-gauge"></i>
                                Speed: <span class="speed-value">5s</span>
                            </label>
                            <input type="range" class="speed-slider" min="1000" max="20000" step="1000" value="5000">
                        </div>

                        <!-- Settings Section - Collapsible -->
                        <div class="section-toggle" data-section="settings-section">
                            <span><i class="fas fa-cog"></i> Settings</span>
                            <i class="fas fa-chevron-down toggle-icon"></i>
                        </div>
                        <div class="section-content" id="settings-section">
                            <div class="setting-group">
                                <select class="preview-mode-select">
                                    <option value="none">No Preview</option>
                                    <option value="popup">Popup Preview</option>
                                    <option value="iframe">Live Preview</option>
                                </select>
                            </div>
                            <div class="setting-group checkbox-group">
                                <label>
                                    <input type="checkbox" class="loop-checkbox" checked>
                                    <i class="fas fa-infinity"></i> Loop
                                </label>
                            </div>
                            <div class="setting-group checkbox-group">
                                <label>
                                    <input type="checkbox" class="auto-open-checkbox">
                                    <i class="fas fa-external-link"></i> Auto-open
                                </label>
                            </div>
                            <div class="setting-group checkbox-group">
                                <label>
                                    <input type="checkbox" class="shuffle-checkbox">
                                    <i class="fas fa-shuffle"></i> Shuffle
                                </label>
                            </div>
                            <div class="setting-group">
                                <select class="scroll-mode-select">
                                    <option value="center">Center View</option>
                                    <option value="top">Scroll to Top</option>
                                    <option value="smooth">Smooth Follow</option>
                                    <option value="none">No Jump</option>
                                </select>
                            </div>
                        </div>

                        <!-- Tour Section - Collapsible -->
                        <div class="section-toggle" data-section="tour-section">
                            <span><i class="fas fa-route"></i> Page Tour</span>
                            <i class="fas fa-chevron-down toggle-icon"></i>
                        </div>
                        <div class="section-content" id="tour-section">
                            <div class="tour-controls">
                                <button class="tour-btn start-tour" title="Start Tour">
                                    <i class="fas fa-play"></i>
                                    <span>Tour</span>
                                </button>
                                <button class="tour-btn stop-tour" title="Stop" disabled>
                                    <i class="fas fa-stop"></i>
                                    <span>End</span>
                                </button>
                            </div>
                            <div class="tour-speed-control">
                                <label>
                                    <i class="fas fa-wind"></i>
                                    Speed: <span class="tour-speed-value">Normal</span>
                                </label>
                                <input type="range" class="tour-speed-slider" min="10" max="100" step="10" value="50">
                            </div>
                        </div>

                        <!-- Filter Section - Collapsible -->
                        <div class="section-toggle" data-section="filter-section">
                            <span><i class="fas fa-filter"></i> Filter</span>
                            <i class="fas fa-chevron-down toggle-icon"></i>
                        </div>
                        <div class="section-content" id="filter-section">
                            <select class="category-filter">
                                <option value="all">All Apps</option>
                                <option value="favorites">⭐ Favorites</option>
                                <option value="unviewed">🆕 Not Viewed</option>
                                <option value="game">🎮 Games</option>
                                <option value="tool">🔧 Tools</option>
                                <option value="creative">🎨 Creative</option>
                            </select>
                        </div>

                        <!-- Voice Control Section -->
                        <div class="section-toggle" data-section="voice-section">
                            <span><i class="fas fa-microphone"></i> Voice Control</span>
                            <i class="fas fa-chevron-down toggle-icon"></i>
                        </div>
                        <div class="section-content" id="voice-section">
                            <div class="voice-controls">
                                <button class="voice-btn start-voice" title="Activate voice commands">
                                    <i class="fas fa-microphone"></i>
                                    <span>Start</span>
                                </button>
                                <button class="voice-btn stop-voice" title="Deactivate voice commands" disabled>
                                    <i class="fas fa-stop"></i>
                                    <span>Stop</span>
                                </button>
                                <button class="voice-btn help-voice" title="View all voice commands">
                                    <i class="fas fa-question-circle"></i>
                                    <span>Commands</span>
                                </button>
                            </div>
                            <div class="voice-indicator voice-idle">
                                <i class="fas fa-microphone-slash"></i>
                                <span class="voice-status">Ready to listen</span>
                            </div>
                            <div class="setting-group checkbox-group">
                                <label>
                                    <input type="checkbox" class="continuous-voice-checkbox">
                                    <i class="fas fa-infinity"></i>
                                    <span>Continuous Mode</span>
                                </label>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="setting-group" style="display: flex; gap: 6px; margin-top: 6px;">
                            <button class="autopilot-btn stats-btn">
                                <i class="fas fa-chart-bar"></i>
                                <span>Stats</span>
                            </button>
                            <button class="autopilot-btn favorites-btn">
                                <i class="fas fa-heart"></i>
                                <span>Favs</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(panel);
            this.controlPanel = panel;
            this.progressBar = panel.querySelector('.progress-fill');

            // Add drag functionality
            this.makeDraggable(panel);
        }

        createIframeContainer() {
            const container = document.createElement('div');
            container.className = 'autopilot-iframe-container';
            container.innerHTML = `
                <div class="iframe-header">
                    <div class="iframe-title">
                        <i class="fas fa-window-maximize"></i>
                        <span class="iframe-app-name">Live Preview</span>
                    </div>
                    <div class="iframe-controls">
                        <button class="iframe-btn refresh-btn" title="Refresh">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                        <button class="iframe-btn open-new-btn" title="Open in New Tab">
                            <i class="fas fa-external-link-alt"></i>
                        </button>
                        <button class="iframe-btn close-btn" title="Close Preview">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="iframe-body">
                    <iframe src="about:blank" frameborder="0"></iframe>
                    <div class="iframe-loader">
                        <div class="loader-spinner"></div>
                        <p>Loading preview...</p>
                    </div>
                </div>
            `;
            document.body.appendChild(container);
            this.iframeContainer = container;
        }

        makeDraggable(element) {
            const header = element.querySelector('.autopilot-header');
            let isDragging = false;
            let currentX;
            let currentY;
            let initialX;
            let initialY;

            header.addEventListener('mousedown', (e) => {
                if (e.target.closest('.autopilot-minimize')) return;
                isDragging = true;
                initialX = e.clientX - element.offsetLeft;
                initialY = e.clientY - element.offsetTop;
                header.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                element.style.left = currentX + 'px';
                element.style.top = currentY + 'px';
                element.style.right = 'auto';
                element.style.bottom = 'auto';
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
                header.style.cursor = 'grab';
            });
        }

        attachEventListeners() {
            const startBtn = this.controlPanel.querySelector('.start-btn');
            const pauseBtn = this.controlPanel.querySelector('.pause-btn');
            const stopBtn = this.controlPanel.querySelector('.stop-btn');
            const prevBtn = this.controlPanel.querySelector('.prev-btn');
            const nextBtn = this.controlPanel.querySelector('.next-btn');
            const speedSlider = this.controlPanel.querySelector('.speed-slider');
            const minimizeBtn = this.controlPanel.querySelector('.autopilot-minimize');
            const previewModeSelect = this.controlPanel.querySelector('.preview-mode-select');
            const loopCheckbox = this.controlPanel.querySelector('.loop-checkbox');
            const autoOpenCheckbox = this.controlPanel.querySelector('.auto-open-checkbox');
            const shuffleCheckbox = this.controlPanel.querySelector('.shuffle-checkbox');
            const scrollModeSelect = this.controlPanel.querySelector('.scroll-mode-select');
            const startTourBtn = this.controlPanel.querySelector('.start-tour');
            const stopTourBtn = this.controlPanel.querySelector('.stop-tour');
            const tourSpeedSlider = this.controlPanel.querySelector('.tour-speed-slider');
            const categoryFilter = this.controlPanel.querySelector('.category-filter');
            const statsBtn = this.controlPanel.querySelector('.stats-btn');
            const favoritesBtn = this.controlPanel.querySelector('.favorites-btn');
            const startVoiceBtn = this.controlPanel.querySelector('.start-voice');
            const stopVoiceBtn = this.controlPanel.querySelector('.stop-voice');
            const helpVoiceBtn = this.controlPanel.querySelector('.help-voice');
            const continuousVoiceCheckbox = this.controlPanel.querySelector('.continuous-voice-checkbox');

            startBtn.addEventListener('click', () => this.start());
            pauseBtn.addEventListener('click', () => this.togglePause());
            stopBtn.addEventListener('click', () => this.stop());
            prevBtn.addEventListener('click', () => this.previous());
            nextBtn.addEventListener('click', () => this.next());
            speedSlider.addEventListener('input', (e) => this.updateSpeed(e.target.value));
            minimizeBtn.addEventListener('click', () => this.toggleMinimize());
            
            // Allow clicking the entire panel to restore when minimized
            this.controlPanel.addEventListener('click', (e) => {
                if (this.controlPanel.classList.contains('minimized')) {
                    // Don't trigger if clicking the minimize button itself
                    if (!e.target.closest('.autopilot-minimize')) {
                        this.toggleMinimize();
                    }
                }
            });

            // Collapsible sections
            const sectionToggles = this.controlPanel.querySelectorAll('.section-toggle');
            sectionToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const sectionId = toggle.dataset.section;
                    const section = document.getElementById(sectionId);
                    toggle.classList.toggle('active');
                    section.classList.toggle('show');
                });
            });
            previewModeSelect.addEventListener('change', (e) => this.changePreviewMode(e.target.value));
            loopCheckbox.addEventListener('change', () => this.saveSettings());
            autoOpenCheckbox.addEventListener('change', () => this.saveSettings());
            shuffleCheckbox.addEventListener('change', (e) => this.toggleShuffle(e.target.checked));
            scrollModeSelect.addEventListener('change', (e) => {
                this.scrollMode = e.target.value;
                this.saveSettings();
            });
            
            startTourBtn.addEventListener('click', () => this.startPageTour());
            stopTourBtn.addEventListener('click', () => this.stopPageTour());
            tourSpeedSlider.addEventListener('input', (e) => {
                this.tourSpeed = parseInt(e.target.value);
                const speeds = {10: 'Very Slow', 30: 'Slow', 50: 'Normal', 70: 'Fast', 90: 'Very Fast'};
                const speedLabel = speeds[this.tourSpeed] || 'Normal';
                this.controlPanel.querySelector('.tour-speed-value').textContent = speedLabel;
                if (this.pageTourActive) {
                    this.stopPageTour();
                    this.startPageTour();
                }
            });
            categoryFilter.addEventListener('change', (e) => this.filterByCategory(e.target.value));
            statsBtn.addEventListener('click', () => this.showStats());
            favoritesBtn.addEventListener('click', () => this.showFavorites());

            // Voice control listeners
            if (startVoiceBtn) {
                startVoiceBtn.addEventListener('click', () => {
                    if (this.voiceControl) {
                        this.voiceControl.startListening();
                        startVoiceBtn.disabled = true;
                        stopVoiceBtn.disabled = false;
                        this.updateVoiceStatus('Listening...', 'listening');
                    } else {
                        this.showNotification('Voice control not available', 'warning');
                    }
                });
            }

            if (stopVoiceBtn) {
                stopVoiceBtn.addEventListener('click', () => {
                    if (this.voiceControl) {
                        this.voiceControl.stopListening();
                        startVoiceBtn.disabled = false;
                        stopVoiceBtn.disabled = true;
                        this.updateVoiceStatus('Voice control inactive', 'idle');
                    }
                });
            }

            if (helpVoiceBtn) {
                helpVoiceBtn.addEventListener('click', () => {
                    if (this.voiceControl) {
                        this.voiceControl.showHelp();
                    }
                });
            }

            if (continuousVoiceCheckbox) {
                continuousVoiceCheckbox.addEventListener('change', (e) => {
                    if (this.voiceControl) {
                        this.voiceControl.toggleContinuousMode(e.target.checked);
                    }
                });
            }

            // Iframe controls
            const refreshBtn = this.iframeContainer.querySelector('.refresh-btn');
            const openNewBtn = this.iframeContainer.querySelector('.open-new-btn');
            const closeBtn = this.iframeContainer.querySelector('.close-btn');

            refreshBtn.addEventListener('click', () => this.refreshIframe());
            openNewBtn.addEventListener('click', () => this.openInNewTab());
            closeBtn.addEventListener('click', () => this.closeIframe());

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey) {
                    switch(e.key.toLowerCase()) {
                        case 'a':
                            e.preventDefault();
                            this.isActive ? this.stop() : this.start();
                            break;
                        case 'p':
                            e.preventDefault();
                            if (this.isActive) this.togglePause();
                            break;
                        case 'arrowleft':
                            e.preventDefault();
                            this.previous();
                            break;
                        case 'arrowright':
                            e.preventDefault();
                            this.next();
                            break;
                        case 'f':
                            e.preventDefault();
                            this.toggleFavorite();
                            break;
                        case 's':
                            e.preventDefault();
                            this.toggleShuffle(!this.shuffleMode);
                            break;
                        case 't':
                            e.preventDefault();
                            if (this.pageTourActive) {
                                this.stopPageTour();
                            } else {
                                this.startPageTour();
                            }
                            break;
                    }
                }
            });
        }

        start() {
            if (this.projects.length === 0) {
                this.showNotification('No apps found to browse', 'warning');
                return;
            }

            this.isActive = true;
            this.isPaused = false;
            this.sessionStats.started++;
            this.updateStatus('Running', 'active');
            this.updateButtons();
            this.showCurrentProject();
            this.startAutoAdvance();
            this.showNotification('🚀 Autopilot started', 'success');
        }

        stop() {
            this.isActive = false;
            this.isPaused = false;
            this.currentIndex = 0;
            this.progressValue = 0;
            this.updateProgressBar(0);
            this.stopAutoAdvance();
            this.stopPageTour();
            this.tourPhase = 'scroll';
            this.tourDirection = 'down';
            this.updateStatus('Stopped', 'inactive');
            this.updateButtons();
            this.closeIframe();
            localStorage.setItem('autopilotViewed', JSON.stringify(this.viewedApps));
            this.showNotification('Autopilot stopped', 'info');
        }

        togglePause() {
            this.isPaused = !this.isPaused;
            const pauseBtn = this.controlPanel.querySelector('.pause-btn');
            
            if (this.isPaused) {
                this.stopAutoAdvance();
                this.updateStatus('Paused', 'paused');
                pauseBtn.innerHTML = '<i class="fas fa-play"></i><span>Resume</span>';
                this.showNotification('Autopilot paused', 'info');
            } else {
                this.startAutoAdvance();
                this.updateStatus('Running', 'active');
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
                this.showNotification('Autopilot resumed', 'success');
            }
        }

        previous() {
            if (this.projects.length === 0) return;
            this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
            this.progressValue = 0;
            this.showCurrentProject();
        }

        next() {
            if (this.projects.length === 0) return;
            this.currentIndex = (this.currentIndex + 1) % this.projects.length;
            this.progressValue = 0;
            this.showCurrentProject();
        }

        showCurrentProject() {
            const project = this.projects[this.currentIndex];
            if (!project) return;

            // Update UI
            this.updateProgressBar(0);
            this.controlPanel.querySelector('.current-app').textContent = project.title;
            this.controlPanel.querySelector('.app-counter').textContent = 
                `${this.currentIndex + 1} / ${this.projects.length}`;

            // Highlight current project
            this.highlightProject(project.element);

            // Show preview based on mode
            if (this.previewMode === 'popup') {
                this.showPopupPreview(project);
            } else if (this.previewMode === 'iframe') {
                this.showIframePreview(project);
            }

            // Auto-open in iframe if enabled (instead of new tab)
            const autoOpen = this.controlPanel.querySelector('.auto-open-checkbox').checked;
            if (autoOpen && this.isActive && !this.isPaused) {
                // Use iframe preview instead of opening new tab
                if (this.previewMode !== 'iframe') {
                    setTimeout(() => {
                        this.showIframePreview(project);
                    }, 500);
                }
            }

            // Smart scrolling based on mode
            if (this.scrollMode !== 'none') {
                const scrollOptions = {
                    behavior: this.scrollMode === 'smooth' ? 'smooth' : 'auto',
                    block: this.scrollMode === 'top' ? 'start' : 'center',
                    inline: 'nearest'
                };
                
                if (this.scrollMode === 'smooth') {
                    // Extra smooth scrolling with custom animation
                    const elementTop = project.element.getBoundingClientRect().top;
                    const offset = window.pageYOffset;
                    const targetPosition = elementTop + offset - (window.innerHeight / 2) + (project.element.offsetHeight / 2);
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    project.element.scrollIntoView(scrollOptions);
                }
            }

            project.viewCount++;
            if (!this.viewedApps.includes(project.index)) {
                this.viewedApps.push(project.index);
            }

            this.updateProjectInfo(project);
        }

        startPageTour() {
            if (this.pageTourActive) return;
            
            try {
                // Clean up any existing tour
                this.stopPageTour();
                
                this.pageTourActive = true;
                this.tourPhase = 'scroll';
                this.tourDirection = 'down';
                
                const startTourBtn = this.controlPanel.querySelector('.start-tour');
                const stopTourBtn = this.controlPanel.querySelector('.stop-tour');
                
                if (startTourBtn) startTourBtn.disabled = true;
                if (stopTourBtn) stopTourBtn.disabled = false;
                
                // Scroll to top first
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                this.showNotification('🗺️ Full Site Tour - Scrolling through entire website...', 'success');
                
                // Wait for smooth scroll to complete
                setTimeout(() => {
                    if (this.pageTourActive) {
                        this.performPageTour();
                    }
                }, 1000);
            } catch (error) {
                console.error('Error starting tour:', error);
                this.stopPageTour();
                this.showNotification('Tour failed to start', 'warning');
            }
        }

        performPageTour() {
            if (!this.pageTourActive) return;
            
            // Clear any existing interval
            if (this.tourScrollInterval) {
                clearInterval(this.tourScrollInterval);
                this.tourScrollInterval = null;
            }
            
            const scrollStep = Math.max(1, this.tourSpeed / 10);
            let lastScrollTime = Date.now();
            
            this.tourScrollInterval = setInterval(() => {
                try {
                    if (!this.pageTourActive) {
                        clearInterval(this.tourScrollInterval);
                        this.tourScrollInterval = null;
                        return;
                    }
                    
                    // Throttle to prevent lag
                    const now = Date.now();
                    if (now - lastScrollTime < 16) return;
                    lastScrollTime = now;
                    
                    if (this.tourPhase === 'scroll') {
                        // Get current scroll position and page dimensions
                        const currentScroll = window.scrollY || window.pageYOffset;
                        const docHeight = document.documentElement.scrollHeight;
                        const windowHeight = window.innerHeight;
                        const maxScroll = Math.max(0, docHeight - windowHeight);
                        
                        // Full page scrolling phase
                        if (this.tourDirection === 'down') {
                            const newScroll = Math.min(currentScroll + scrollStep, maxScroll);
                            
                            if (newScroll >= maxScroll - 10) {
                                // Reached bottom, scroll back up
                                window.scrollTo({ top: maxScroll, behavior: 'auto' });
                                this.tourDirection = 'up';
                                this.showNotification('⬆️ Scrolling back up...', 'info');
                            } else {
                                window.scrollTo({ top: newScroll, behavior: 'auto' });
                            }
                        } else {
                            const newScroll = Math.max(currentScroll - scrollStep, 0);
                            
                            if (newScroll <= 10) {
                                // Reached top, switch to apps phase
                                window.scrollTo({ top: 0, behavior: 'auto' });
                                clearInterval(this.tourScrollInterval);
                                this.tourScrollInterval = null;
                                this.showNotification('🎮 Now showcasing apps...', 'success');
                                
                                setTimeout(() => {
                                    if (this.pageTourActive && this.tourPhase === 'scroll') {
                                        this.tourPhase = 'apps';
                                        this.startAppShowcase();
                                    }
                                }, 1500);
                                return;
                            } else {
                                window.scrollTo({ top: newScroll, behavior: 'auto' });
                            }
                        }
                        
                        // Safely highlight visible apps
                        if (typeof this.highlightVisibleApps === 'function') {
                            this.highlightVisibleApps();
                        }
                    }
                } catch (error) {
                    console.error('Error in tour scroll:', error);
                    this.stopPageTour();
                }
            }, 16);
        }

        startAppShowcase() {
            if (!this.pageTourActive || !this.projects || this.projects.length === 0) return;
            
            try {
                // Scroll to first app
                if (this.projects[0] && this.projects[0].element) {
                    this.projects[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Start autopilot with iframe preview after scroll
                setTimeout(() => {
                    if (!this.pageTourActive) return;
                    
                    try {
                        // Start autopilot with iframe preview
                        this.previewMode = 'iframe';
                        const previewSelect = this.controlPanel.querySelector('.preview-mode-select');
                        if (previewSelect) previewSelect.value = 'iframe';
                        
                        this.currentIndex = 0;
                        this.isActive = true;
                        this.isPaused = false;
                        
                        this.updateStatus('Showcasing Apps', 'active');
                        this.updateButtons();
                        
                        // Show first app with preview
                        this.showCurrentProject();
                        this.startAutoAdvance();
                        
                        this.showNotification('🎬 App showcase started!', 'success');
                    } catch (error) {
                        console.error('Error starting app showcase:', error);
                        this.stopPageTour();
                    }
                }, 800);
            } catch (error) {
                console.error('Error in startAppShowcase:', error);
                this.stopPageTour();
            }
        }

        highlightVisibleApps() {
            try {
                if (!this.projects || this.projects.length === 0) return;
                
                const viewportTop = window.scrollY || window.pageYOffset;
                const viewportBottom = viewportTop + window.innerHeight;
                const viewportCenter = viewportTop + (window.innerHeight / 2);
                
                this.projects.forEach(project => {
                    if (!project || !project.element) return;
                    
                    try {
                        const rect = project.element.getBoundingClientRect();
                        const elementTop = rect.top + viewportTop;
                        const elementBottom = elementTop + rect.height;
                        
                        if (elementTop <= viewportCenter && elementBottom >= viewportCenter) {
                            if (!project.element.classList.contains('autopilot-tour-highlight')) {
                                document.querySelectorAll('.autopilot-tour-highlight').forEach(el => {
                                    el.classList.remove('autopilot-tour-highlight');
                                });
                                
                                project.element.classList.add('autopilot-tour-highlight');
                                if (typeof this.updateProjectInfo === 'function') {
                                    this.updateProjectInfo(project);
                                }
                            }
                        }
                    } catch (error) {
                        // Skip this project if there's an error
                    }
                });
            } catch (error) {
                console.error('Error highlighting apps:', error);
            }
        }

        stopPageTour() {
            try {
                this.pageTourActive = false;
                this.tourPhase = 'scroll';
                this.tourDirection = 'down';
                
                // Clear interval safely
                if (this.tourScrollInterval) {
                    clearInterval(this.tourScrollInterval);
                    this.tourScrollInterval = null;
                }
                
                // Stop autopilot if it was started by tour
                if (this.isActive && typeof this.stopAutoAdvance === 'function') {
                    this.isActive = false;
                    this.stopAutoAdvance();
                }
                
                // Update buttons safely
                if (this.controlPanel) {
                    const startTourBtn = this.controlPanel.querySelector('.start-tour');
                    const stopTourBtn = this.controlPanel.querySelector('.stop-tour');
                    
                    if (startTourBtn) startTourBtn.disabled = false;
                    if (stopTourBtn) stopTourBtn.disabled = true;
                }
                
                // Remove highlights
                document.querySelectorAll('.autopilot-tour-highlight').forEach(el => {
                    try {
                        el.classList.remove('autopilot-tour-highlight');
                    } catch (e) {
                        // Skip if element is no longer valid
                    }
                });
                
                if (typeof this.showNotification === 'function') {
                    this.showNotification('Page Tour Stopped', 'info');
                }
            } catch (error) {
                console.error('Error stopping tour:', error);
                // Force cleanup
                this.pageTourActive = false;
                if (this.tourScrollInterval) {
                    clearInterval(this.tourScrollInterval);
                    this.tourScrollInterval = null;
                }
            }
        }

        highlightProject(element) {
            document.querySelectorAll('.project.autopilot-active').forEach(el => {
                el.classList.remove('autopilot-active');
            });

            element.classList.add('autopilot-active');
        }

        updateProjectInfo(project) {
            const existingInfo = project.element.querySelector('.autopilot-project-info');
            if (existingInfo) existingInfo.remove();

            const info = document.createElement('div');
            info.className = 'autopilot-project-info';
            info.innerHTML = `
                <button class="favorite-toggle ${project.isFavorite ? 'active' : ''}" title="Toggle Favorite">
                    <i class="fas fa-star"></i>
                </button>
                <span class="view-count" title="Times viewed">👁️ ${project.viewCount}</span>
            `;
            project.element.appendChild(info);

            info.querySelector('.favorite-toggle').addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(project.index);
            });
        }

        toggleFavorite(index = this.currentIndex) {
            const project = this.projects.find(p => p.index === index);
            if (!project) return;

            project.isFavorite = !project.isFavorite;
            
            if (project.isFavorite) {
                if (!this.favorites.includes(project.index)) {
                    this.favorites.push(project.index);
                }
                this.showNotification(`⭐ Added "${project.title}" to favorites`, 'success');
            } else {
                this.favorites = this.favorites.filter(i => i !== project.index);
                this.showNotification(`Removed "${project.title}" from favorites`, 'info');
            }

            this.saveFavorites();
            this.updateProjectInfo(project);
        }

        toggleShuffle(enabled) {
            this.shuffleMode = enabled;
            
            if (enabled) {
                this.projects = this.shuffleArray([...this.originalProjects]);
                this.showNotification('🔀 Shuffle mode enabled', 'success');
            } else {
                this.projects = [...this.originalProjects];
                this.showNotification('Shuffle mode disabled', 'info');
            }
            
            this.currentIndex = 0;
            this.saveSettings();
        }

        shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        filterByCategory(category) {
            this.filterCategory = category;
            
            if (category === 'all') {
                this.projects = [...this.originalProjects];
            } else if (category === 'favorites') {
                this.projects = this.originalProjects.filter(p => p.isFavorite);
            } else if (category === 'unviewed') {
                this.projects = this.originalProjects.filter(p => !this.viewedApps.includes(p.index));
            } else {
                this.projects = this.originalProjects.filter(p => p.category === category);
            }

            if (this.shuffleMode) {
                this.projects = this.shuffleArray(this.projects);
            }

            this.currentIndex = 0;
            this.controlPanel.querySelector('.app-counter').textContent = `0 / ${this.projects.length}`;
            
            if (this.projects.length === 0) {
                this.showNotification('No apps match this filter', 'warning');
                if (this.isActive) this.stop();
            } else {
                this.showNotification(`Filtered to ${this.projects.length} apps`, 'info');
            }
        }

        showStats() {
            const totalApps = this.originalProjects.length;
            const viewedCount = this.viewedApps.length;
            const favoriteCount = this.favorites.length;
            const completionRate = totalApps > 0 ? Math.round((viewedCount / totalApps) * 100) : 0;

            const modal = document.createElement('div');
            modal.className = 'autopilot-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2><i class="fas fa-chart-bar"></i> Autopilot Statistics</h2>
                        <button class="modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="stat-grid">
                            <div class="stat-card">
                                <div class="stat-icon">📱</div>
                                <div class="stat-value">${totalApps}</div>
                                <div class="stat-label">Total Apps</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">👁️</div>
                                <div class="stat-value">${viewedCount}</div>
                                <div class="stat-label">Apps Viewed</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">⭐</div>
                                <div class="stat-value">${favoriteCount}</div>
                                <div class="stat-label">Favorites</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">📊</div>
                                <div class="stat-value">${completionRate}%</div>
                                <div class="stat-label">Completion</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">🚀</div>
                                <div class="stat-value">${this.sessionStats.started}</div>
                                <div class="stat-label">Sessions Started</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">✅</div>
                                <div class="stat-value">${this.sessionStats.completed}</div>
                                <div class="stat-label">Sessions Completed</div>
                            </div>
                        </div>
                        <div class="stat-actions">
                            <button class="autopilot-btn" onclick="localStorage.removeItem('autopilotViewed'); location.reload();">
                                <i class="fas fa-redo"></i> Reset Progress
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('active'), 10);

            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        }

        showFavorites() {
            const favoriteProjects = this.originalProjects.filter(p => p.isFavorite);

            const modal = document.createElement('div');
            modal.className = 'autopilot-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2><i class="fas fa-star"></i> Favorite Apps</h2>
                        <button class="modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        ${favoriteProjects.length === 0 ? 
                            '<p class="empty-state">No favorites yet. Click the star icon on any app to add it!</p>' :
                            `<div class="favorites-list">
                                ${favoriteProjects.map(p => `
                                    <div class="favorite-item">
                                        <div class="favorite-info">
                                            <h4>${p.title}</h4>
                                            <p>${p.description.substring(0, 80)}...</p>
                                        </div>
                                        <div class="favorite-actions">
                                            <button class="icon-btn" onclick="window.open('${p.url}', '_blank')" title="Open">
                                                <i class="fas fa-external-link-alt"></i>
                                            </button>
                                            <button class="icon-btn remove-fav" data-index="${p.index}" title="Remove">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>`
                        }
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('active'), 10);

            modal.querySelectorAll('.remove-fav').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    this.toggleFavorite(index);
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.remove();
                        this.showFavorites();
                    }, 300);
                });
            });

            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        }

        showPopupPreview(project) {
            // Trigger the existing popup system
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            
            // Small delay to ensure smooth transition
            setTimeout(() => {
                project.element.dispatchEvent(event);
            }, 300);
        }

        showIframePreview(project) {
            const iframe = this.iframeContainer.querySelector('iframe');
            const loader = this.iframeContainer.querySelector('.iframe-loader');
            const appName = this.iframeContainer.querySelector('.iframe-app-name');

            this.iframeContainer.classList.add('active');
            loader.classList.add('active');
            appName.textContent = project.title;

            // Load the URL
            iframe.src = project.url;

            // Hide loader after timeout
            setTimeout(() => {
                loader.classList.remove('active');
            }, 2000);
        }

        closeIframe() {
            const iframe = this.iframeContainer.querySelector('iframe');
            this.iframeContainer.classList.remove('active');
            iframe.src = 'about:blank';
        }

        refreshIframe() {
            const iframe = this.iframeContainer.querySelector('iframe');
            const loader = this.iframeContainer.querySelector('.iframe-loader');
            loader.classList.add('active');
            iframe.src = iframe.src;
            setTimeout(() => loader.classList.remove('active'), 2000);
        }

        openInNewTab() {
            const project = this.projects[this.currentIndex];
            if (project) {
                window.open(project.url, '_blank');
            }
        }

        startAutoAdvance() {
            this.stopAutoAdvance();
            
            // Progress animation
            this.progressInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.progressValue += 100;
                    const percentage = (this.progressValue / this.speed) * 100;
                    this.updateProgressBar(Math.min(percentage, 100));
                }
            }, 100);

            // Auto advance
            this.intervalId = setInterval(() => {
                if (!this.isPaused) {
                    const loopEnabled = this.controlPanel.querySelector('.loop-checkbox').checked;
                    
                    if (this.currentIndex >= this.projects.length - 1 && !loopEnabled) {
                        this.sessionStats.completed++;
                        this.stop();
                        this.showNotification('✅ Autopilot completed!', 'success');
                    } else {
                        this.next();
                    }
                }
            }, this.speed);
        }

        stopAutoAdvance() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }
        }

        updateProgressBar(percentage) {
            if (this.progressBar) {
                this.progressBar.style.width = percentage + '%';
            }
        }

        updateSpeed(value) {
            this.speed = parseInt(value);
            const speedValue = this.controlPanel.querySelector('.speed-value');
            speedValue.textContent = (this.speed / 1000) + 's';
            
            if (this.isActive && !this.isPaused) {
                this.startAutoAdvance();
            }
            
            this.saveSettings();
        }

        changePreviewMode(mode) {
            this.previewMode = mode;
            this.closeIframe();
            
            // Close any open popups
            const popup = document.querySelector('.preview-popup.active');
            if (popup) {
                popup.classList.remove('active');
            }
            
            this.saveSettings();
            const modeNames = {
                'none': 'No Preview',
                'popup': 'Popup Preview',
                'iframe': 'Live Preview'
            };
            this.showNotification(`Preview: ${modeNames[mode] || mode}`, 'info');
        }

        updateStatus(text, state) {
            const statusText = this.controlPanel.querySelector('.status-text');
            const statusIndicator = this.controlPanel.querySelector('.status-indicator');
            
            statusText.textContent = text;
            statusIndicator.className = 'status-indicator ' + state;
        }

        updateButtons() {
            const startBtn = this.controlPanel.querySelector('.start-btn');
            const pauseBtn = this.controlPanel.querySelector('.pause-btn');
            const stopBtn = this.controlPanel.querySelector('.stop-btn');

            startBtn.disabled = this.isActive;
            pauseBtn.disabled = !this.isActive;
            stopBtn.disabled = !this.isActive;
        }

        toggleMinimize() {
            this.controlPanel.classList.toggle('minimized');
            const icon = this.controlPanel.querySelector('.autopilot-minimize i');
            
            if (this.controlPanel.classList.contains('minimized')) {
                icon.className = 'fas fa-plus';
            } else {
                icon.className = 'fas fa-minus';
            }
        }

        updateVoiceStatus(message, state) {
            const voiceStatus = this.controlPanel.querySelector('.voice-status');
            const voiceIndicatorContainer = this.controlPanel.querySelector('.voice-indicator');
            const voiceIndicatorIcon = this.controlPanel.querySelector('.voice-indicator i');
            
            if (voiceStatus) {
                voiceStatus.textContent = message;
            }
            
            // Update container classes
            if (voiceIndicatorContainer) {
                voiceIndicatorContainer.className = 'voice-indicator';
                voiceIndicatorContainer.classList.add(`voice-${state}`);
            }
            
            // Update icon
            if (voiceIndicatorIcon) {
                switch (state) {
                    case 'listening':
                        voiceIndicatorIcon.className = 'fas fa-microphone';
                        break;
                    case 'idle':
                        voiceIndicatorIcon.className = 'fas fa-microphone-slash';
                        break;
                    case 'error':
                        voiceIndicatorIcon.className = 'fas fa-exclamation-triangle';
                        break;
                }
            }
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `autopilot-notification ${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        saveSettings() {
            const settings = {
                speed: this.speed,
                previewMode: this.previewMode,
                loop: this.controlPanel.querySelector('.loop-checkbox').checked,
                autoOpen: this.controlPanel.querySelector('.auto-open-checkbox').checked,
                shuffle: this.shuffleMode,
                scrollMode: this.scrollMode,
                filterCategory: this.filterCategory
            };
            localStorage.setItem('autopilotSettings', JSON.stringify(settings));
            localStorage.setItem('autopilotStats', JSON.stringify(this.sessionStats));
        }

        saveFavorites() {
            localStorage.setItem('autopilotFavorites', JSON.stringify(this.favorites));
            this.originalProjects.forEach(p => {
                p.isFavorite = this.favorites.includes(p.index);
            });
        }

        loadFavorites() {
            const saved = localStorage.getItem('autopilotFavorites');
            if (saved) {
                try {
                    this.favorites = JSON.parse(saved);
                    this.originalProjects.forEach(p => {
                        p.isFavorite = this.favorites.includes(p.index);
                    });
                } catch (e) {
                    console.error('Failed to load favorites:', e);
                }
            }

            const viewedSaved = localStorage.getItem('autopilotViewed');
            if (viewedSaved) {
                try {
                    this.viewedApps = JSON.parse(viewedSaved);
                } catch (e) {
                    console.error('Failed to load viewed apps:', e);
                }
            }

            const statsSaved = localStorage.getItem('autopilotStats');
            if (statsSaved) {
                try {
                    this.sessionStats = JSON.parse(statsSaved);
                } catch (e) {
                    console.error('Failed to load stats:', e);
                }
            }
        }

        enableDragging() {
            const header = this.controlPanel.querySelector('.autopilot-header');
            
            const onMouseDown = (e) => {
                // Don't drag if clicking on buttons or interactive elements
                if (e.target.closest('button, input, select, .autopilot-minimize')) {
                    return;
                }
                
                this.isDragging = true;
                this.dragStartX = e.clientX;
                this.dragStartY = e.clientY;
                
                const rect = this.controlPanel.getBoundingClientRect();
                this.panelStartX = rect.left;
                this.panelStartY = rect.top;
                
                // Disable transitions during drag for smooth movement
                this.controlPanel.style.transition = 'none';
                header.style.cursor = 'grabbing';
                
                e.preventDefault();
            };
            
            const onMouseMove = (e) => {
                if (!this.isDragging) return;
                
                const deltaX = e.clientX - this.dragStartX;
                const deltaY = e.clientY - this.dragStartY;
                
                const newX = this.panelStartX + deltaX;
                const newY = this.panelStartY + deltaY;
                
                // Keep panel within viewport bounds
                const maxX = window.innerWidth - this.controlPanel.offsetWidth;
                const maxY = window.innerHeight - this.controlPanel.offsetHeight;
                
                const boundedX = Math.max(0, Math.min(newX, maxX));
                const boundedY = Math.max(0, Math.min(newY, maxY));
                
                this.controlPanel.style.left = boundedX + 'px';
                this.controlPanel.style.top = boundedY + 'px';
                this.controlPanel.style.right = 'auto';
                this.controlPanel.style.bottom = 'auto';
                
                e.preventDefault();
            };
            
            const onMouseUp = () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    this.controlPanel.style.transition = '';
                    header.style.cursor = 'grab';
                    
                    // Save position
                    this.savePosition();
                }
            };
            
            // Mouse events
            header.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            
            // Touch events for mobile
            header.addEventListener('touchstart', (e) => {
                if (e.target.closest('button, input, select, .autopilot-minimize')) {
                    return;
                }
                
                const touch = e.touches[0];
                this.isDragging = true;
                this.dragStartX = touch.clientX;
                this.dragStartY = touch.clientY;
                
                const rect = this.controlPanel.getBoundingClientRect();
                this.panelStartX = rect.left;
                this.panelStartY = rect.top;
                
                this.controlPanel.style.transition = 'none';
                e.preventDefault();
            }, { passive: false });
            
            document.addEventListener('touchmove', (e) => {
                if (!this.isDragging) return;
                
                const touch = e.touches[0];
                const deltaX = touch.clientX - this.dragStartX;
                const deltaY = touch.clientY - this.dragStartY;
                
                const newX = this.panelStartX + deltaX;
                const newY = this.panelStartY + deltaY;
                
                const maxX = window.innerWidth - this.controlPanel.offsetWidth;
                const maxY = window.innerHeight - this.controlPanel.offsetHeight;
                
                const boundedX = Math.max(0, Math.min(newX, maxX));
                const boundedY = Math.max(0, Math.min(newY, maxY));
                
                this.controlPanel.style.left = boundedX + 'px';
                this.controlPanel.style.top = boundedY + 'px';
                this.controlPanel.style.right = 'auto';
                this.controlPanel.style.bottom = 'auto';
                
                e.preventDefault();
            }, { passive: false });
            
            document.addEventListener('touchend', () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    this.controlPanel.style.transition = '';
                    this.savePosition();
                }
            });
            
            header.style.cursor = 'grab';
        }

        savePosition() {
            const rect = this.controlPanel.getBoundingClientRect();
            localStorage.setItem('autopilotPosition', JSON.stringify({
                left: rect.left,
                top: rect.top
            }));
        }

        loadSettings() {
            const saved = localStorage.getItem('autopilotSettings');
            if (saved) {
                try {
                    const settings = JSON.parse(saved);
                    this.speed = settings.speed || 5000;
                    this.previewMode = settings.previewMode || 'none';
                    
                    this.controlPanel.querySelector('.speed-slider').value = this.speed;
                    this.controlPanel.querySelector('.speed-value').textContent = (this.speed / 1000) + 's';
                    this.controlPanel.querySelector('.preview-mode-select').value = this.previewMode;
                    this.controlPanel.querySelector('.loop-checkbox').checked = settings.loop !== false;
                    this.controlPanel.querySelector('.auto-open-checkbox').checked = settings.autoOpen || false;
                    this.controlPanel.querySelector('.shuffle-checkbox').checked = settings.shuffle || false;
                    this.scrollMode = settings.scrollMode || 'center';
                    this.controlPanel.querySelector('.scroll-mode-select').value = this.scrollMode;
                    if (settings.shuffle) this.toggleShuffle(true);
                    if (settings.filterCategory) {
                        this.controlPanel.querySelector('.category-filter').value = settings.filterCategory;
                        this.filterByCategory(settings.filterCategory);
                    }
                } catch (e) {
                    console.error('Failed to load autopilot settings:', e);
                }
            }
            
            // Load saved position
            const savedPosition = localStorage.getItem('autopilotPosition');
            if (savedPosition) {
                try {
                    const pos = JSON.parse(savedPosition);
                    this.controlPanel.style.left = pos.left + 'px';
                    this.controlPanel.style.top = pos.top + 'px';
                    this.controlPanel.style.right = 'auto';
                    this.controlPanel.style.bottom = 'auto';
                } catch (e) {
                    console.error('Failed to load position:', e);
                }
            }
        }
    }

    // Initialize autopilot when page loads
    window.browserAutopilot = new BrowserAutopilot();

})();
