// WebRTC P2P Chat System
class P2PChatSystem {
    constructor() {
        this.peerConnection = null;
        this.dataChannel = null;
        this.localPeerId = null;
        this.remotePeerId = null;
        this.isConnected = false;
        this.messages = [];
        this.username = 'Anonymous';
    }

    async initialize() {
        try {
            // Generate unique peer ID
            this.localPeerId = this.generatePeerId();
            
            // Initialize WebRTC
            const configuration = {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' }
                ]
            };

            this.peerConnection = new RTCPeerConnection(configuration);
            
            // Setup data channel for messaging
            this.dataChannel = this.peerConnection.createDataChannel('messages', {
                ordered: true
            });

            this.setupDataChannel();
            this.setupPeerConnection();
            
            this.updateConnectionStatus('Ready to connect', false);
            return true;
        } catch (error) {
            console.error('Failed to initialize P2P Chat:', error);
            this.updateConnectionStatus('Failed to initialize', false);
            return false;
        }
    }

    generatePeerId() {
        return Math.random().toString(36).substr(2, 9);
    }

    setupDataChannel() {
        this.dataChannel.onopen = () => {
            console.log('Data channel opened');
            this.isConnected = true;
            this.updateConnectionStatus('Connected', true);
        };

        this.dataChannel.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.displayMessage(message);
        };

        this.dataChannel.onclose = () => {
            console.log('Data channel closed');
            this.isConnected = false;
            this.updateConnectionStatus('Disconnected', false);
        };
    }

    setupPeerConnection() {
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                // In a real implementation, you'd send this to the other peer
                console.log('ICE candidate:', event.candidate);
            }
        };

        this.peerConnection.ondatachannel = (event) => {
            const channel = event.channel;
            channel.onmessage = (event) => {
                const message = JSON.parse(event.data);
                this.displayMessage(message);
            };
        };
    }

    async createOffer() {
        try {
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error('Error creating offer:', error);
            throw error;
        }
    }

    async createAnswer(offer) {
        try {
            await this.peerConnection.setRemoteDescription(offer);
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            return answer;
        } catch (error) {
            console.error('Error creating answer:', error);
            throw error;
        }
    }

    sendMessage(text) {
        if (!this.isConnected || !this.dataChannel) {
            console.log('Not connected to peer');
            return;
        }

        const message = {
            id: Date.now(),
            text: text,
            username: this.username,
            timestamp: new Date().toISOString(),
            type: 'message'
        };

        this.dataChannel.send(JSON.stringify(message));
        this.displayMessage(message);
    }

    displayMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = this.createMessageElement(message);
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-item';
        
        const time = new Date(message.timestamp).toLocaleTimeString();
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${message.username}</span>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${this.escapeHtml(message.text)}</div>
            </div>
        `;

        return messageDiv;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateConnectionStatus(status, connected) {
        const statusElement = document.getElementById('connectionStatus');
        const dot = statusElement.querySelector('.status-dot');
        const text = statusElement.querySelector('span');
        
        text.textContent = status;
        dot.className = connected ? 'status-dot connected' : 'status-dot';
    }

    setUsername(username) {
        this.username = username || 'Anonymous';
    }
}

// Live Comments System
class LiveCommentsSystem {
    constructor() {
        this.comments = [];
        this.isLive = false;
        this.commentId = 0;
    }

    initialize() {
        this.isLive = true;
        this.startLiveIndicator();
        this.loadSampleComments();
    }

    startLiveIndicator() {
        const indicator = document.querySelector('.pulse-dot');
        if (indicator) {
            indicator.style.animation = 'pulse 1s infinite';
        }
    }

    loadSampleComments() {
        const sampleComments = [
            {
                id: ++this.commentId,
                author: 'DevMaster',
                text: 'This P2P chat system is incredible! The real-time messaging is so smooth.',
                timestamp: new Date(Date.now() - 300000),
                likes: 12
            },
            {
                id: ++this.commentId,
                author: 'CodeNinja',
                text: 'The WebRTC implementation looks solid. Great work on the encryption!',
                timestamp: new Date(Date.now() - 180000),
                likes: 8
            },
            {
                id: ++this.commentId,
                author: 'TechGuru',
                text: 'Love the futuristic UI design. The animations are on point!',
                timestamp: new Date(Date.now() - 120000),
                likes: 15
            }
        ];

        sampleComments.forEach(comment => {
            this.addComment(comment);
        });
    }

    addComment(commentData) {
        const comment = {
            id: commentData.id || ++this.commentId,
            author: commentData.author || 'Anonymous',
            text: commentData.text,
            timestamp: commentData.timestamp || new Date(),
            likes: commentData.likes || 0
        };

        this.comments.push(comment);
        this.displayComment(comment);
    }

    displayComment(comment) {
        const commentsList = document.getElementById('commentsList');
        const commentElement = this.createCommentElement(comment);
        commentsList.appendChild(commentElement);
        commentsList.scrollTop = commentsList.scrollHeight;
    }

    createCommentElement(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        
        const timeAgo = this.getTimeAgo(comment.timestamp);
        
        commentDiv.innerHTML = `
            <div class="comment-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${this.escapeHtml(comment.author)}</span>
                    <span class="comment-time">${timeAgo}</span>
                </div>
                <div class="comment-text">${this.escapeHtml(comment.text)}</div>
                <div class="comment-actions">
                    <button class="reply-btn" onclick="replyToComment(${comment.id})">
                        <i class="fas fa-reply"></i> Reply
                    </button>
                    <button class="like-btn" onclick="likeComment(${comment.id})">
                        <i class="fas fa-heart"></i> ${comment.likes}
                    </button>
                </div>
            </div>
        `;

        return commentDiv;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    postComment(text) {
        if (!text.trim()) return;

        const comment = {
            author: 'You',
            text: text.trim(),
            timestamp: new Date(),
            likes: 0
        };

        this.addComment(comment);
    }
}

// Futuristic Community Hub Interactive Effects
class CommunityHubEffects {
    constructor() {
        this.p2pChat = new P2PChatSystem();
        this.liveComments = new LiveCommentsSystem();
        this.init();
    }

    init() {
        this.animateStats();
        this.setupFeatureCards();
        this.setupCommunityCard();
        this.setupScrollReveal();
        this.setupParticleEffects();
        this.initializeChatSystem();
    }

    async initializeChatSystem() {
        await this.p2pChat.initialize();
        this.liveComments.initialize();
    }

    // Animate statistics counters
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element, target) => {
            const duration = 2000;
            const start = performance.now();
            const startValue = 0;
            
            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = startValue + (target - startValue) * this.easeOutCubic(progress);
                
                if (target >= 1000) {
                    element.textContent = (currentValue / 1000).toFixed(1) + 'K';
                } else {
                    element.textContent = Math.floor(currentValue).toString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Setup feature card interactions
    setupFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.filter = 'hue-rotate(10deg) saturate(1.2)';
                this.triggerGlitchEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                card.style.filter = 'none';
            });

            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerGlitchEffect(card);
                this.showFeatureModal(card.dataset.feature);
            });
        });
    }

    // Setup community card interactions
    setupCommunityCard() {
        const communityCard = document.querySelector('.community-card');
        if (!communityCard) return;

        communityCard.addEventListener('mousemove', (e) => {
            const rect = communityCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            communityCard.style.background = `
                linear-gradient(135deg, 
                    rgba(10, 10, 30, 0.95), 
                    rgba(20, 20, 50, 0.9),
                    rgba(5, 5, 15, 0.98)),
                radial-gradient(circle at ${x}px ${y}px, 
                    rgba(0, 247, 255, 0.1) 0%, 
                    transparent 50%)
            `;
        });

        communityCard.addEventListener('mouseleave', () => {
            communityCard.style.background = `
                linear-gradient(135deg, 
                    rgba(10, 10, 30, 0.95), 
                    rgba(20, 20, 50, 0.9),
                    rgba(5, 5, 15, 0.98))
            `;
        });
    }

    // Setup scroll reveal animation
    setupScrollReveal() {
        const communitySection = document.querySelector('.futuristic-community-section');
        if (!communitySection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.triggerParticleBurst(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(communitySection);
    }

    // Setup particle effects
    setupParticleEffects() {
        const particleContainer = document.querySelector('.community-particles');
        if (!particleContainer) return;

        // Create additional particles dynamically
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particleContainer.appendChild(particle);
        }
    }

    // Trigger glitch effect
    triggerGlitchEffect(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'glitch 0.3s ease-in-out';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 300);
    }

    // Show feature modal
    showFeatureModal(feature) {
        const modals = {
            discord: {
                title: 'Join Discord Server',
                content: 'Connect with our community on Discord for real-time discussions, voice chats, and project collaboration.',
                action: 'https://discord.gg/your-server'
            },
            github: {
                title: 'GitHub Community',
                content: 'Explore our open source projects, contribute to the codebase, and collaborate with developers worldwide.',
                action: 'https://github.com/your-username'
            },
            forum: {
                title: 'Community Forum',
                content: 'Join technical discussions, ask questions, and share knowledge with our growing community.',
                action: 'https://forum.your-site.com'
            },
            events: {
                title: 'Live Events',
                content: 'Attend webinars, coding sessions, and virtual meetups to learn and network with fellow developers.',
                action: 'https://events.your-site.com'
            }
        };

        const modal = modals[feature];
        if (modal) {
            this.showModal(modal.title, modal.content, modal.action);
        }
    }

    // Show modal
    showModal(title, content, action) {
        const modal = document.createElement('div');
        modal.className = 'community-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${content}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-action" onclick="window.open('${action}', '_blank')">
                            <i class="fas fa-external-link-alt"></i>
                            Visit Now
                        </button>
                        <button class="modal-cancel">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .community-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .modal-content {
                background: linear-gradient(135deg, 
                    rgba(10, 10, 30, 0.95), 
                    rgba(20, 20, 50, 0.9));
                border-radius: 15px;
                padding: 2rem;
                max-width: 500px;
                width: 100%;
                border: 1px solid rgba(0, 247, 255, 0.3);
                box-shadow: 0 20px 60px rgba(0, 247, 255, 0.2);
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .modal-header h3 {
                color: #00f7ff;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: #ffffff;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-body p {
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .modal-footer {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            .modal-action, .modal-cancel {
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .modal-action {
                background: linear-gradient(135deg, #00f7ff, #ff00f7);
                color: white;
            }
            
            .modal-cancel {
                background: transparent;
                color: #ffffff;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .modal-action:hover, .modal-cancel:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 247, 255, 0.3);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Close modal functionality
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-cancel').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });

        // Add fadeOut animation
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    }

    // Trigger particle burst
    triggerParticleBurst(element) {
        const particles = element.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            setTimeout(() => {
                particle.style.animation = 'particleBurst 1s ease-out';
            }, index * 100);
        });
    }

    // Easing function
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// Community Hub Functions
function joinDiscord() {
    window.open('https://discord.gg/your-server', '_blank', 'noopener,noreferrer');
}

function joinGitHub() {
    window.open('https://github.com/your-username', '_blank', 'noopener,noreferrer');
}

function joinForum() {
    window.open('https://forum.your-site.com', '_blank', 'noopener,noreferrer');
}

function joinEvents() {
    window.open('https://events.your-site.com', '_blank', 'noopener,noreferrer');
}

function showJoinModal() {
    const modal = document.createElement('div');
    modal.className = 'community-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Join Our Community</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Choose how you'd like to get started with our community:</p>
                    <div class="join-options">
                        <button class="join-option" onclick="joinDiscord()">
                            <i class="fab fa-discord"></i>
                            Discord Server
                        </button>
                        <button class="join-option" onclick="joinGitHub()">
                            <i class="fab fa-github"></i>
                            GitHub
                        </button>
                        <button class="join-option" onclick="joinForum()">
                            <i class="fas fa-comments"></i>
                            Forum
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add styles for join modal
    const style = document.createElement('style');
    style.textContent = `
        .join-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .join-option {
            background: linear-gradient(135deg, 
                rgba(0, 247, 255, 0.1), 
                rgba(255, 0, 247, 0.1));
            border: 1px solid rgba(0, 247, 255, 0.3);
            border-radius: 10px;
            padding: 1rem;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        
        .join-option:hover {
            background: linear-gradient(135deg, 
                rgba(0, 247, 255, 0.2), 
                rgba(255, 0, 247, 0.2));
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 247, 255, 0.3);
        }
        
        .join-option i {
            font-size: 1.5rem;
            color: #00f7ff;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
}

function showCommunityInfo() {
    const modal = document.createElement('div');
    modal.className = 'community-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>About Our Community</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Our cosmic community is a vibrant ecosystem of developers, creators, and innovators who are passionate about technology and pushing the boundaries of what's possible.</p>
                    <h4>What we offer:</h4>
                    <ul>
                        <li>Real-time collaboration and networking</li>
                        <li>Open source project contributions</li>
                        <li>Technical discussions and knowledge sharing</li>
                        <li>Live events and virtual meetups</li>
                        <li>Mentorship and learning opportunities</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Add styles for info modal
    const style = document.createElement('style');
    style.textContent = `
        .modal-body h4 {
            color: #00f7ff;
            margin: 1.5rem 0 1rem 0;
        }
        
        .modal-body ul {
            color: rgba(255, 255, 255, 0.8);
            padding-left: 1.5rem;
        }
        
        .modal-body li {
            margin-bottom: 0.5rem;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
}

// Global functions for chat and comments
let communityHub = null;

// Chat Functions
function openLiveChat() {
    const chatContainer = document.getElementById('liveChatContainer');
    chatContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on message input
    setTimeout(() => {
        document.getElementById('messageInput').focus();
    }, 100);
}

function closeLiveChat() {
    const chatContainer = document.getElementById('liveChatContainer');
    chatContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const usernameInput = document.getElementById('usernameInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Set username if provided
    if (usernameInput.value.trim()) {
        communityHub.p2pChat.setUsername(usernameInput.value.trim());
    }
    
    // Send message
    communityHub.p2pChat.sendMessage(message);
    
    // Clear input
    messageInput.value = '';
}

// Comments Functions
function openLiveComments() {
    const commentsContainer = document.getElementById('liveCommentsContainer');
    commentsContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on comment input
    setTimeout(() => {
        document.getElementById('commentInput').focus();
    }, 100);
}

function closeLiveComments() {
    const commentsContainer = document.getElementById('liveCommentsContainer');
    commentsContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function postComment() {
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim();
    
    if (!comment) return;
    
    communityHub.liveComments.postComment(comment);
    commentInput.value = '';
}

function replyToComment(commentId) {
    const commentInput = document.getElementById('commentInput');
    commentInput.focus();
    commentInput.placeholder = `Replying to comment #${commentId}...`;
}

function likeComment(commentId) {
    // Find and update the comment
    const comment = communityHub.liveComments.comments.find(c => c.id === commentId);
    if (comment) {
        comment.likes++;
        // Refresh the comment display
        const commentsList = document.getElementById('commentsList');
        const commentElement = commentsList.querySelector(`[data-comment-id="${commentId}"]`);
        if (commentElement) {
            const likeBtn = commentElement.querySelector('.like-btn');
            likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${comment.likes}`;
        }
    }
}

// Other feature functions (removed - features no longer available)

// Event listeners
document.addEventListener('keydown', function(e) {
    // Enter key to send message
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.id === 'messageInput') {
            sendMessage();
        } else if (activeElement && activeElement.id === 'commentInput') {
            postComment();
        }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        closeLiveChat();
        closeLiveComments();
    }
});

// Live Features System
class LiveFeaturesSystem {
    constructor() {
        this.onlineUsers = [];
        this.notifications = [];
        this.liveStats = {
            onlineUsers: 247,
            postsToday: 89,
            replies: 456
        };
        this.isLiveStreaming = false;
        this.notificationSound = null;
    }

    initialize() {
        this.setupNotificationSound();
        this.startLiveUpdates();
        this.setupLivePresence();
        this.animateStats();
    }

    setupNotificationSound() {
        // Create notification sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.notificationSound = audioContext;
    }

    playNotificationSound() {
        if (!this.notificationSound) return;
        
        const oscillator = this.notificationSound.createOscillator();
        const gainNode = this.notificationSound.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.notificationSound.destination);
        
        oscillator.frequency.setValueAtTime(800, this.notificationSound.currentTime);
        oscillator.frequency.setValueAtTime(1000, this.notificationSound.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, this.notificationSound.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.notificationSound.currentTime + 0.2);
        
        oscillator.start(this.notificationSound.currentTime);
        oscillator.stop(this.notificationSound.currentTime + 0.2);
    }

    startLiveUpdates() {
        // Simulate live updates every 3-5 seconds
        setInterval(() => {
            this.updateLiveStats();
            this.addRandomNotification();
            this.updateOnlineUsers();
        }, Math.random() * 2000 + 3000);
    }

    updateLiveStats() {
        // Randomly update stats
        const variations = {
            onlineUsers: Math.floor(Math.random() * 10) - 5,
            postsToday: Math.floor(Math.random() * 3),
            replies: Math.floor(Math.random() * 8)
        };

        this.liveStats.onlineUsers = Math.max(200, this.liveStats.onlineUsers + variations.onlineUsers);
        this.liveStats.postsToday += variations.postsToday;
        this.liveStats.replies += variations.replies;

        // Update UI
        this.updateStatsDisplay();
    }

    updateStatsDisplay() {
        const onlineElement = document.querySelector('[data-count="247"]');
        const postsElement = document.querySelector('[data-count="89"]');
        const repliesElement = document.querySelector('[data-count="456"]');

        if (onlineElement) {
            this.animateNumber(onlineElement, this.liveStats.onlineUsers);
        }
        if (postsElement) {
            this.animateNumber(postsElement, this.liveStats.postsToday);
        }
        if (repliesElement) {
            this.animateNumber(repliesElement, this.liveStats.replies);
        }

        // Update live stats in feed header
        const liveStats = document.querySelector('.live-stats');
        if (liveStats) {
            liveStats.innerHTML = `
                <span class="live-stat">${this.liveStats.onlineUsers} Online</span>
                <span class="live-stat">${this.liveStats.postsToday} Posts Today</span>
                <span class="live-stat">${this.liveStats.replies} Replies</span>
            `;
        }
    }

    animateNumber(element, targetNumber) {
        const startNumber = parseInt(element.textContent) || 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * progress);
            
            element.textContent = currentNumber;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    addRandomNotification() {
        const notifications = [
            "New post from DevMaster!",
            "CodeNinja liked your comment",
            "TechGuru started a live stream",
            "New reply to your post",
            "Live coding session starting now!",
            "Community challenge posted",
            "New member joined: WebWizard"
        ];

        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        this.showNotification(randomNotification);
    }

    showNotification(message) {
        this.playNotificationSound();
        
        // Update notification badge
        const badge = document.getElementById('notificationBadge') || document.getElementById('feedNotifications');
        if (badge) {
            const currentCount = parseInt(badge.textContent) || 0;
            badge.textContent = currentCount + 1;
            badge.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => badge.style.animation = '', 500);
        }

        // Create toast notification
        this.createToastNotification(message);
    }

    createToastNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'live-toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-bell"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(0, 247, 255, 0.9), rgba(255, 0, 247, 0.9));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            border: 1px solid rgba(0, 247, 255, 0.3);
            box-shadow: 0 10px 30px rgba(0, 247, 255, 0.3);
            z-index: 10001;
            animation: slideInRight 0.5s ease-out;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(toast);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    setupLivePresence() {
        // Simulate online users
        const userNames = ['DevMaster', 'CodeNinja', 'TechGuru', 'WebWizard', 'DataDude', 'CloudKing', 'AIGenius', 'BlockChainBoss'];
        
        setInterval(() => {
            const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
            this.updateOnlineUsers(randomUser);
        }, 5000);
    }

    updateOnlineUsers(newUser = null) {
        const liveUsersList = document.getElementById('liveUsersList');
        if (!liveUsersList) return;

        if (newUser && !this.onlineUsers.includes(newUser)) {
            this.onlineUsers.unshift(newUser);
            if (this.onlineUsers.length > 4) {
                this.onlineUsers.pop();
            }
        }

        // Update user avatars
        const avatars = liveUsersList.querySelectorAll('.user-avatar');
        avatars.forEach((avatar, index) => {
            if (this.onlineUsers[index]) {
                avatar.textContent = this.onlineUsers[index].charAt(0);
                avatar.title = this.onlineUsers[index];
            }
        });
    }

    animateStats() {
        // Animate the initial stats
        setTimeout(() => {
            this.updateStatsDisplay();
        }, 1000);
    }
}

// Global functions for live features
function startLiveStream() {
    if (liveFeatures.isLiveStreaming) {
        alert('Already streaming live!');
        return;
    }
    
    liveFeatures.isLiveStreaming = true;
    liveFeatures.showNotification('Live stream started!');
    
    // Simulate live stream UI
    const streamButton = event.target.closest('button');
    if (streamButton) {
        streamButton.innerHTML = '<i class="fas fa-stop"></i>';
        streamButton.onclick = stopLiveStream;
    }
}

function stopLiveStream() {
    liveFeatures.isLiveStreaming = false;
    liveFeatures.showNotification('Live stream ended');
    
    const streamButton = event.target.closest('button');
    if (streamButton) {
        streamButton.innerHTML = '<i class="fas fa-video"></i>';
        streamButton.onclick = startLiveStream;
    }
}

function openLiveGames() {
    liveFeatures.showNotification('Live games feature coming soon!');
}

function refreshFeed() {
    liveFeatures.showNotification('Feed refreshed with latest posts!');
    // Add refresh animation
    const refreshBtn = event.target.closest('button');
    if (refreshBtn) {
        refreshBtn.style.animation = 'spin 1s linear';
        setTimeout(() => refreshBtn.style.animation = '', 1000);
    }
}

function showNotifications() {
    const notifications = [
        "New post from DevMaster!",
        "CodeNinja liked your comment",
        "TechGuru started a live stream",
        "New reply to your post"
    ];
    
    const notificationList = notifications.map(notif => `<div class="notification-item">${notif}</div>`).join('');
    
    alert(`Notifications:\n\n${notifications.join('\n')}`);
}

// Initialize the community hub effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    communityHub = new CommunityHubEffects();
    socialFeed = new SocialFeedSystem();
    socialFeed.initialize();
    liveFeatures = new LiveFeaturesSystem();
    liveFeatures.initialize();
});

// Add particle burst animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleBurst {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        50% {
            transform: scale(1) translateY(-20px);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-40px);
            opacity: 0;
        }
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(style);
