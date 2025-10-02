// AI Chatbot System
class ChatbotSystem {
    constructor() {
        this.apps = this.initializeApps();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTabs();
        this.setupDirectTabHandlers();
    }

    setupEventListeners() {
        const sendBtn = document.getElementById('chatbot-send-btn');
        const input = document.getElementById('chatbot-input');

        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.voice-tab');
        const tabContents = document.querySelectorAll('.voice-tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetTab = tab.dataset.tab;
                console.log('Switching to tab:', targetTab); // Debug log
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show/hide content
                tabContents.forEach(content => {
                    if (content.id === `${targetTab}-tab`) {
                        content.style.display = 'flex';
                        console.log('Showing content:', content.id); // Debug log
                    } else {
                        content.style.display = 'none';
                    }
                });
            });
        });
    }

    setupDirectTabHandlers() {
        // Direct handler for AI Chat tab
        const chatbotTab = document.querySelector('[data-tab="chatbot"]');
        if (chatbotTab) {
            chatbotTab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('AI Chat tab clicked directly');
                this.switchToTab('chatbot');
            });
        }

        // Direct handler for Commands tab
        const commandsTab = document.querySelector('[data-tab="commands"]');
        if (commandsTab) {
            commandsTab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Commands tab clicked directly');
                this.switchToTab('commands');
            });
        }
    }

    initializeApps() {
        return {
            'pic2puzz': {
                name: 'Pic2Puzz',
                description: 'Transform your images into interactive puzzles',
                url: 'https://pic2puzz.space',
                keywords: ['pic2puzz', 'puzzle', 'image', 'game']
            },
            'glow radio': {
                name: 'Glow Radio',
                description: 'Stream your favorite radio stations',
                url: 'https://onetwo346.github.io/glow-radio-',
                keywords: ['glow radio', 'radio', 'music', 'stream']
            },
            'akan wisdom': {
                name: 'AKAN Wisdom Generator',
                description: 'Discover ancient wisdom from Akan culture',
                url: 'https://onetwo346.github.io/wise-saying',
                keywords: ['akan', 'wisdom', 'quotes', 'culture']
            },
            'random quote': {
                name: 'Random Quote Generator',
                description: 'Find inspiration with random quotes',
                url: 'https://onetwo346.github.io/random-quote-generator-RQG',
                keywords: ['random quote', 'quotes', 'inspiration']
            },
            'fetch or catch': {
                name: 'Fetch or Catch',
                description: 'Fun arcade game with falling treats',
                url: 'https://onetwo346.github.io/fetch-or-catch/',
                keywords: ['fetch or catch', 'game', 'arcade', 'catch']
            },
            'baby checker': {
                name: 'Baby Checker',
                description: 'Track pregnancy signs and baby development',
                url: 'https://onetwo346.github.io/BABYYCHECKER/',
                keywords: ['baby checker', 'pregnancy', 'baby', 'tracker']
            }
        };
    }

    async sendMessage(inputText = null) {
        const input = document.getElementById('chatbot-input');
        const message = inputText || input.value.trim();
        
        if (!message) return;

        // Clear input
        input.value = '';

        // Add user message
        this.addMessage(message, 'user');

        // Process message and get response
        const response = await this.processMessage(message);
        
        // Add bot response
        setTimeout(() => {
            this.addMessage(response, 'bot');
        }, 500);
    }

    async processMessage(message) {
        const lowerMessage = message.toLowerCase();

        // Check for greetings to Cosmoscoderr
        if (lowerMessage.includes('cosmoscoderr') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return this.handleGreeting(lowerMessage);
        }

        // Check for app opening commands
        if (lowerMessage.includes('open') || lowerMessage.includes('launch') || lowerMessage.includes('start')) {
            return this.handleAppCommand(lowerMessage);
        }

        // Check for help commands
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return this.getHelpResponse();
        }

        // Check for app listing
        if (lowerMessage.includes('apps') || lowerMessage.includes('applications') || lowerMessage.includes('projects')) {
            return this.listApps();
        }

        // Check for navigation commands
        if (lowerMessage.includes('go to') || lowerMessage.includes('navigate')) {
            return this.handleNavigationCommand(lowerMessage);
        }

        // Check for general questions
        if (lowerMessage.includes('what is') || lowerMessage.includes('tell me about')) {
            return this.handleQuestion(lowerMessage);
        }

        // Default response
        return this.getDefaultResponse();
    }

    handleGreeting(message) {
        const greetings = [
            "Yo, what's good! I'm Cosmoscoderr, your AI assistant. What can I do for you today?",
            "Hey there! I'm Cosmoscoderr, ready to help you with navigation and opening apps!",
            "What's up! Cosmoscoderr here! What you need help with?",
            "Yo! I'm Cosmoscoderr, your AI assistant. Try saying 'open pic2puzz' or 'help' to get started!"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    handleAppCommand(message) {
        for (const [key, app] of Object.entries(this.apps)) {
            if (message.includes(key) || app.keywords.some(keyword => message.includes(keyword))) {
                // Open the app
                window.open(app.url, '_blank');
                return `Opening ${app.name} for you! ${app.description}`;
            }
        }

        // If no specific app found, try to find similar
        const suggestions = this.findSimilarApps(message);
        if (suggestions.length > 0) {
            return `I couldn't find that exact app, but here are some similar ones: ${suggestions.join(', ')}. Try saying "open [app name]"`;
        }

        return "I couldn't find that app. Try saying 'list apps' to see available applications.";
    }

    findSimilarApps(message) {
        const suggestions = [];
        for (const [key, app] of Object.entries(this.apps)) {
            if (app.keywords.some(keyword => 
                keyword.includes(message.split(' ').pop()) || 
                message.split(' ').some(word => keyword.includes(word))
            )) {
                suggestions.push(app.name);
            }
        }
        return suggestions.slice(0, 3);
    }

    getHelpResponse() {
        return `Hi! I'm Cosmoscoderr, your AI assistant. I can help you with:
• Opening apps: "Open pic2puzz", "Launch glow radio"
• Navigation: "Go to home", "Scroll down"
• Information: "What apps are available?", "Tell me about pic2puzz"
• General commands: "Help", "What can you do?"

Try saying "open pic2puzz" to get started!`;
    }

    listApps() {
        const appList = Object.values(this.apps).map(app => 
            `• ${app.name}: ${app.description}`
        ).join('\n');
        
        return `Here are the available apps:\n\n${appList}\n\nSay "open [app name]" to launch any of these!`;
    }

    handleNavigationCommand(message) {
        if (message.includes('home')) {
            this.scrollToSection('hero');
            return "Taking you to the home section!";
        }
        if (message.includes('about')) {
            this.scrollToSection('about');
            return "Scrolling to the about section!";
        }
        if (message.includes('projects')) {
            this.scrollToSection('projects');
            return "Showing you the projects section!";
        }
        if (message.includes('contact')) {
            this.scrollToSection('contact');
            return "Going to the contact section!";
        }
        return "I can help you navigate to: home, about, projects, or contact. Try saying 'go to home'!";
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleQuestion(message) {
        // Check if asking about specific apps
        for (const [key, app] of Object.entries(this.apps)) {
            if (message.includes(key) || app.keywords.some(keyword => message.includes(keyword))) {
                return `${app.name} is ${app.description}. You can open it by saying "open ${key}"!`;
            }
        }

        if (message.includes('voice control') || message.includes('voice commands')) {
            return "Voice control lets you navigate and interact with the website using your voice. You can open apps, scroll pages, and ask questions!";
        }

        return "I'm here to help you navigate the website and open apps. Try asking about specific applications or say 'help' for more options!";
    }

    getDefaultResponse() {
        const responses = [
            "Yo! I'm Cosmoscoderr, your AI assistant. I'm here to help! Try saying 'open pic2puzz' or 'list apps' to get started.",
            "You can ask me to open apps, navigate the site, or ask questions. What you want to do? I'm Cosmoscoderr, your AI assistant.",
            "What's up! I'm Cosmoscoderr, and I can help you with navigation and opening applications. Try saying 'help' for more options!",
            "Yo! Feel free to ask me to open any app or navigate to different sections of the site! I'm Cosmoscoderr, your AI assistant."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        content.appendChild(messageText);
        content.appendChild(messageTime);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }


    // Manual tab switching method
    switchToTab(tabName) {
        const tabs = document.querySelectorAll('.voice-tab');
        const tabContents = document.querySelectorAll('.voice-tab-content');

        // Update active tab
        tabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Show/hide content
        tabContents.forEach(content => {
            if (content.id === `${tabName}-tab`) {
                content.style.display = 'flex';
                
            } else {
                content.style.display = 'none';
            }
        });
    }

}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbotSystem = new ChatbotSystem();
});

// Global function for debugging tab switching
window.switchToChatbot = function() {
    if (window.chatbotSystem) {
        window.chatbotSystem.switchToTab('chatbot');
    } else {
        console.log('Chatbot system not initialized');
    }
};

window.switchToCommands = function() {
    if (window.chatbotSystem) {
        window.chatbotSystem.switchToTab('commands');
    } else {
        console.log('Chatbot system not initialized');
    }
};
