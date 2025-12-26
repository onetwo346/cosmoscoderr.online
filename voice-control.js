// Voice Control System for Autopilot
class VoiceControl {
    constructor(autopilot) {
        this.autopilot = autopilot;
        this.recognition = null;
        this.isListening = false;
        this.isContinuousMode = false;
        this.commands = this.initializeCommands();
        this.lastCommand = '';
        this.confidenceThreshold = 0.7;
        
        this.init();
    }

    init() {
        // Check for browser support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Speech recognition not supported in this browser');
            this.showNotification('Voice control not supported in this browser', 'warning');
            return;
        }

        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        // Configure recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 3;

        // Set up event listeners
        this.setupRecognitionListeners();
    }

    initializeCommands() {
        return {
            // Navigation commands
            navigation: {
                'scroll up': () => this.scrollPage('up'),
                'scroll down': () => this.scrollPage('down'),
                'scroll to top': () => this.scrollToTop(),
                'scroll to bottom': () => this.scrollToBottom(),
                'go to home': () => this.navigateToSection('home'),
                'go to about': () => this.navigateToSection('about'),
                'go to blog': () => this.navigateToSection('blog'),
                'go to projects': () => this.navigateToSection('projects'),
                'go to apps': () => this.navigateToSection('projects'),
                'go to community': () => this.navigateToSection('community'),
                'go back': () => this.goBack(),
            },
            
            // Autopilot control commands
            autopilot: {
                'start autopilot': () => this.autopilot.start(),
                'stop autopilot': () => this.autopilot.stop(),
                'pause autopilot': () => this.autopilot.togglePause(),
                'resume autopilot': () => this.autopilot.togglePause(),
                'next app': () => this.autopilot.next(),
                'previous app': () => this.autopilot.previous(),
                'start tour': () => this.autopilot.startPageTour(),
                'stop tour': () => this.autopilot.stopPageTour(),
                'speed up': () => this.adjustSpeed('faster'),
                'slow down': () => this.adjustSpeed('slower'),
                'minimize autopilot': () => this.autopilot.toggleMinimize(),
                'maximize autopilot': () => this.autopilot.toggleMinimize(),
            },
            
            // App control commands
            apps: {
                'open app': (transcript) => this.openAppByVoice(transcript),
                'close app': () => this.closeCurrentApp(),
                'search for': (transcript) => this.searchApps(transcript),
                'show apps': () => this.navigateToSection('projects'),
                'open search': () => this.focusSearch(),
            },
            
            // General commands
            general: {
                'help': () => this.showHelp(),
                'what can you do': () => this.showHelp(),
                'stop listening': () => this.stopListening(),
                'start listening': () => this.startListening(),
                'enable continuous mode': () => this.toggleContinuousMode(true),
                'disable continuous mode': () => this.toggleContinuousMode(false),
            }
        };
    }

    setupRecognitionListeners() {
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateVoiceIndicator('listening');
            this.showNotification('🎤 Listening...', 'info');
        };

        this.recognition.onresult = (event) => {
            const results = event.results[event.results.length - 1];
            const transcript = results[0].transcript.toLowerCase().trim();
            const confidence = results[0].confidence;

            console.log(`Voice command: "${transcript}" (confidence: ${confidence})`);

            if (confidence >= this.confidenceThreshold) {
                this.processCommand(transcript);
            } else {
                this.showNotification('Command not clear, please try again', 'warning');
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.updateVoiceIndicator('error');
            
            if (event.error === 'no-speech') {
                this.showNotification('No speech detected', 'warning');
            } else if (event.error === 'not-allowed') {
                this.showNotification('Microphone access denied', 'error');
            } else {
                this.showNotification(`Voice error: ${event.error}`, 'error');
            }

            if (this.isContinuousMode) {
                setTimeout(() => this.startListening(), 1000);
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateVoiceIndicator('idle');
            
            if (this.isContinuousMode) {
                setTimeout(() => this.startListening(), 500);
            }
        };
    }

    processCommand(transcript) {
        let commandFound = false;

        // Check all command categories
        for (const category in this.commands) {
            for (const [command, action] of Object.entries(this.commands[category])) {
                if (transcript.includes(command)) {
                    this.lastCommand = command;
                    this.showNotification(`✓ ${command}`, 'success');
                    action(transcript);
                    commandFound = true;
                    break;
                }
            }
            if (commandFound) break;
        }

        if (!commandFound) {
            // Try fuzzy matching for app names
            if (transcript.includes('open')) {
                this.openAppByVoice(transcript);
            } else {
                this.showNotification('Command not recognized. Say "help" for available commands.', 'warning');
            }
        }
    }

    // Navigation methods
    scrollPage(direction) {
        const scrollAmount = 300;
        const currentScroll = window.scrollY;
        const newScroll = direction === 'up' 
            ? currentScroll - scrollAmount 
            : currentScroll + scrollAmount;
        
        window.scrollTo({ top: newScroll, behavior: 'smooth' });
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    scrollToBottom() {
        const docHeight = document.documentElement.scrollHeight;
        window.scrollTo({ top: docHeight, behavior: 'smooth' });
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            this.showNotification(`Section "${sectionId}" not found`, 'warning');
        }
    }

    goBack() {
        window.history.back();
    }

    // App control methods
    openAppByVoice(transcript) {
        // Extract app name from transcript
        const appName = transcript.replace(/open|app|application/gi, '').trim();
        
        if (!appName) {
            this.showNotification('Please specify an app name', 'warning');
            return;
        }

        // Search for matching app
        const projects = this.autopilot.projects;
        const matchedApp = projects.find(p => 
            p.title.toLowerCase().includes(appName) ||
            appName.includes(p.title.toLowerCase())
        );

        if (matchedApp) {
            this.showNotification(`Opening ${matchedApp.title}`, 'success');
            if (typeof window.openAppInModal === 'function') {
                window.openAppInModal(matchedApp.url, matchedApp.title);
            } else {
                window.open(matchedApp.url, '_blank');
            }
        } else {
            this.showNotification(`App "${appName}" not found`, 'warning');
        }
    }

    closeCurrentApp() {
        const modal = document.querySelector('.in-app-modal.active');
        if (modal) {
            const closeBtn = modal.querySelector('.close-app-modal');
            if (closeBtn) {
                closeBtn.click();
                this.showNotification('App closed', 'success');
            }
        } else {
            this.showNotification('No app is currently open', 'warning');
        }
    }

    searchApps(transcript) {
        const searchTerm = transcript.replace(/search for|search/gi, '').trim();
        const searchInput = document.querySelector('.search-input');
        
        if (searchInput && searchTerm) {
            searchInput.value = searchTerm;
            searchInput.focus();
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            this.showNotification(`Searching for "${searchTerm}"`, 'success');
        }
    }

    focusSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
            this.showNotification('Search activated', 'success');
        }
    }

    // Autopilot control methods
    adjustSpeed(direction) {
        const currentSpeed = this.autopilot.speed;
        const newSpeed = direction === 'faster' 
            ? Math.max(1000, currentSpeed - 1000)
            : Math.min(10000, currentSpeed + 1000);
        
        this.autopilot.updateSpeed(newSpeed);
        this.showNotification(`Speed: ${newSpeed / 1000}s`, 'success');
    }

    // Voice control methods
    startListening() {
        if (!this.recognition) {
            this.showNotification('Voice control not available', 'error');
            return;
        }

        try {
            this.recognition.start();
        } catch (error) {
            if (error.name === 'InvalidStateError') {
                // Already listening
                return;
            }
            console.error('Error starting recognition:', error);
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isContinuousMode = false;
            this.showNotification('Voice control stopped', 'info');
        }
    }

    toggleContinuousMode(enable) {
        this.isContinuousMode = enable;
        if (enable) {
            this.showNotification('Continuous listening enabled', 'success');
            this.startListening();
        } else {
            this.showNotification('Continuous listening disabled', 'info');
            this.stopListening();
        }
    }

    // UI methods
    updateVoiceIndicator(state) {
        const indicator = document.querySelector('.voice-indicator');
        if (!indicator) return;

        indicator.className = 'voice-indicator';
        indicator.classList.add(`voice-${state}`);

        const icon = indicator.querySelector('i');
        if (icon) {
            switch (state) {
                case 'listening':
                    icon.className = 'fas fa-microphone';
                    break;
                case 'idle':
                    icon.className = 'fas fa-microphone-slash';
                    break;
                case 'error':
                    icon.className = 'fas fa-exclamation-triangle';
                    break;
            }
        }
    }

    showNotification(message, type = 'info') {
        if (typeof this.autopilot.showNotification === 'function') {
            this.autopilot.showNotification(message, type);
        }
    }

    showHelp() {
        const helpText = `
            <div style="text-align: left; max-height: 60vh; overflow-y: auto;">
                <h3 style="color: var(--primary); margin-bottom: 1rem;">🎤 Voice Commands</h3>
                
                <h4 style="color: var(--accent); margin-top: 1rem;">Navigation:</h4>
                <ul style="color: var(--text); line-height: 1.8;">
                    <li>"Scroll up/down"</li>
                    <li>"Scroll to top/bottom"</li>
                    <li>"Go to home/about/blog/projects/community"</li>
                    <li>"Go back"</li>
                </ul>
                
                <h4 style="color: var(--accent); margin-top: 1rem;">Autopilot Control:</h4>
                <ul style="color: var(--text); line-height: 1.8;">
                    <li>"Start/Stop autopilot"</li>
                    <li>"Pause/Resume autopilot"</li>
                    <li>"Next/Previous app"</li>
                    <li>"Start/Stop tour"</li>
                    <li>"Speed up/Slow down"</li>
                    <li>"Minimize/Maximize autopilot"</li>
                </ul>
                
                <h4 style="color: var(--accent); margin-top: 1rem;">App Control:</h4>
                <ul style="color: var(--text); line-height: 1.8;">
                    <li>"Open [app name]"</li>
                    <li>"Close app"</li>
                    <li>"Search for [term]"</li>
                    <li>"Open search"</li>
                </ul>
                
                <h4 style="color: var(--accent); margin-top: 1rem;">Voice Control:</h4>
                <ul style="color: var(--text); line-height: 1.8;">
                    <li>"Help" - Show this help</li>
                    <li>"Stop listening"</li>
                    <li>"Enable/Disable continuous mode"</li>
                </ul>
            </div>
        `;

        // Create help modal
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10002; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);';
        
        const content = document.createElement('div');
        content.style.cssText = 'background: rgba(10, 10, 30, 0.95); padding: 2rem; border-radius: 1rem; max-width: 600px; border: 2px solid var(--primary); box-shadow: 0 0 50px rgba(0, 240, 255, 0.5);';
        content.innerHTML = helpText + '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: var(--primary); color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem;">Close</button>';
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }
}

// Export for use
window.VoiceControl = VoiceControl;
