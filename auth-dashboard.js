// Authentication and Dashboard System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.updateUI();
        this.setupEventListeners();
        this.generateDefaultAvatar();
    }

    setupEventListeners() {
        // Password strength checker
        const signupPassword = document.getElementById('signupPassword');
        if (signupPassword) {
            signupPassword.addEventListener('input', (e) => {
                this.checkPasswordStrength(e.target.value);
            });
        }

        // Character counters
        const postContent = document.getElementById('postContent');
        const quickPostContent = document.getElementById('quickPostContent');
        
        if (postContent) {
            postContent.addEventListener('input', (e) => {
                this.updateCharCount('charCount', e.target.value.length, 1000);
            });
        }

        if (quickPostContent) {
            quickPostContent.addEventListener('input', (e) => {
                this.updateCharCount('quickCharCount', e.target.value.length, 500);
            });
        }

        // Form validation
        this.setupFormValidation();
    }

    checkPasswordStrength(password) {
        const strengthBar = document.getElementById('passwordStrength');
        if (!strengthBar) return;

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        strengthBar.className = 'password-strength';
        if (strength <= 1) strengthBar.classList.add('weak');
        else if (strength <= 2) strengthBar.classList.add('fair');
        else if (strength <= 3) strengthBar.classList.add('good');
        else strengthBar.classList.add('strong');
    }

    updateCharCount(elementId, current, max) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `${current}/${max}`;
            element.style.color = current > max * 0.9 ? '#ff6b6b' : '#888';
        }
    }

    setupFormValidation() {
        // Real-time validation for signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            const inputs = signupForm.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                message = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'password':
                if (field.id === 'signupPassword') {
                    isValid = value.length >= 8;
                    message = isValid ? '' : 'Password must be at least 8 characters';
                } else if (field.id === 'confirmPassword') {
                    const password = document.getElementById('signupPassword').value;
                    isValid = value === password;
                    message = isValid ? '' : 'Passwords do not match';
                }
                break;
            case 'text':
                if (field.id === 'signupUsername') {
                    isValid = value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
                    message = isValid ? '' : 'Username must be at least 3 characters and contain only letters, numbers, and underscores';
                }
                break;
        }

        // Update field appearance
        field.style.borderColor = isValid ? 'rgba(0, 247, 255, 0.3)' : '#ff6b6b';
        
        // Show/hide error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!isValid && message) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = '#ff6b6b';
                errorElement.style.fontSize = '0.8rem';
                errorElement.style.marginTop = '0.25rem';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
        } else if (errorElement) {
            errorElement.remove();
        }

        return isValid;
    }

    generateDefaultAvatar() {
        // Generate a default avatar for users
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 100, 100);
        gradient.addColorStop(0, '#00f7ff');
        gradient.addColorStop(1, '#ff6b6b');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 100, 100);
        
        // Add user icon
        ctx.fillStyle = '#000';
        ctx.font = '40px FontAwesome';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👤', 50, 50);
        
        return canvas.toDataURL();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Authentication Methods
    async signIn() {
        const email = document.getElementById('signinEmail').value.trim();
        const password = document.getElementById('signinPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        // Basic email validation
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        try {
            // Simulate API call with loading state
            this.showNotification('Signing in...', 'info');
            await this.simulateAPICall();
            
            // Create user object
            const user = {
                id: Date.now(),
                email: email,
                username: email.split('@')[0],
                displayName: email.split('@')[0],
                avatar: this.generateDefaultAvatar(),
                level: 1,
                points: 0,
                joinDate: new Date().toISOString(),
                stats: {
                    posts: 0,
                    comments: 0,
                    likes: 0,
                    followers: 0
                },
                settings: {
                    emailNotifications: true,
                    publicProfile: true,
                    showOnlineStatus: true,
                    allowDMs: true
                }
            };

            this.currentUser = user;
            this.isAuthenticated = true;
            
            if (rememberMe) {
                localStorage.setItem('cosmicUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('cosmicUser', JSON.stringify(user));
            }

            this.showNotification('Welcome back!', 'success');
            this.closeAuthModal();
            this.updateUI();
            this.loadUserDashboard();
            
        } catch (error) {
            console.error('Sign in error:', error);
            this.showNotification('Invalid credentials', 'error');
        }
    }

    async signUp() {
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        // Basic validation
        if (!username || !email || !password || !confirmPassword) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        if (username.length < 3) {
            this.showNotification('Username must be at least 3 characters long', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 8) {
            this.showNotification('Password must be at least 8 characters long', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        if (!agreeTerms) {
            this.showNotification('Please agree to the terms and conditions', 'error');
            return;
        }

        // Check if username contains only valid characters
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            this.showNotification('Username can only contain letters, numbers, and underscores', 'error');
            return;
        }

        try {
            // Simulate API call with loading state
            this.showNotification('Creating your account...', 'info');
            await this.simulateAPICall();
            
            // Create user object
            const user = {
                id: Date.now(),
                email: email,
                username: username,
                displayName: username,
                avatar: this.generateDefaultAvatar(),
                level: 1,
                points: 0,
                joinDate: new Date().toISOString(),
                stats: {
                    posts: 0,
                    comments: 0,
                    likes: 0,
                    followers: 0
                },
                settings: {
                    emailNotifications: true,
                    publicProfile: true,
                    showOnlineStatus: true,
                    allowDMs: true
                }
            };

            this.currentUser = user;
            this.isAuthenticated = true;
            
            localStorage.setItem('cosmicUser', JSON.stringify(user));
            
            this.showNotification('Account created successfully! Welcome to the cosmic community!', 'success');
            this.closeAuthModal();
            this.updateUI();
            this.loadUserDashboard();
            
        } catch (error) {
            console.error('Sign up error:', error);
            this.showNotification('Failed to create account. Please try again.', 'error');
        }
    }

    signOut() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('cosmicUser');
        sessionStorage.removeItem('cosmicUser');
        
        this.updateUI();
        this.closeDashboard();
        this.showNotification('Signed out successfully', 'info');
    }

    loadUserFromStorage() {
        const storedUser = localStorage.getItem('cosmicUser') || sessionStorage.getItem('cosmicUser');
        if (storedUser) {
            try {
                this.currentUser = JSON.parse(storedUser);
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        }
    }

    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userNavStatus = document.getElementById('userNavStatus');
        const userStatusBar = document.getElementById('userStatusBar');

        if (this.isAuthenticated && this.currentUser) {
            // Show user status, hide auth buttons
            if (authButtons) authButtons.style.display = 'none';
            if (userNavStatus) {
                userNavStatus.style.display = 'flex';
                const navDisplayName = document.getElementById('navDisplayName');
                const navAvatarImg = document.getElementById('navAvatarImg');
                if (navDisplayName) navDisplayName.textContent = this.currentUser.displayName;
                if (navAvatarImg) navAvatarImg.src = this.currentUser.avatar;
            }
            if (userStatusBar) {
                userStatusBar.style.display = 'block';
                const statusDisplayName = document.getElementById('statusDisplayName');
                const statusLevel = document.getElementById('statusLevel');
                const statusAvatarImg = document.getElementById('statusAvatarImg');
                if (statusDisplayName) statusDisplayName.textContent = this.currentUser.displayName;
                if (statusLevel) statusLevel.textContent = `Level ${this.currentUser.level}`;
                if (statusAvatarImg) statusAvatarImg.src = this.currentUser.avatar;
            }
        } else {
            // Show auth buttons, hide user status
            if (authButtons) authButtons.style.display = 'flex';
            if (userNavStatus) userNavStatus.style.display = 'none';
            if (userStatusBar) userStatusBar.style.display = 'none';
        }
    }

    // Modal Management
    openAuthModal(tab = 'signin') {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.switchAuthTab(tab);
        }
    }

    closeAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            this.clearAuthForms();
        }
    }

    switchAuthTab(tab) {
        const signinTab = document.querySelector('.auth-tab[onclick*="signin"]');
        const signupTab = document.querySelector('.auth-tab[onclick*="signup"]');
        const signinForm = document.getElementById('signinForm');
        const signupForm = document.getElementById('signupForm');

        if (tab === 'signin') {
            signinTab.classList.add('active');
            signupTab.classList.remove('active');
            signinForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            signupTab.classList.add('active');
            signinTab.classList.remove('active');
            signupForm.style.display = 'block';
            signinForm.style.display = 'none';
        }
    }

    clearAuthForms() {
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
                input.style.borderColor = 'rgba(0, 247, 255, 0.3)';
            });
        });
        
        // Clear error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }

    // Dashboard Management
    openDashboard() {
        const modal = document.getElementById('dashboardModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.loadUserDashboard();
        }
    }

    closeDashboard() {
        const modal = document.getElementById('dashboardModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    switchDashboardTab(tab) {
        const tabs = document.querySelectorAll('.dashboard-tab');
        const contents = document.querySelectorAll('.dashboard-tab-content');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        const activeTab = document.querySelector(`[onclick*="${tab}"]`);
        const activeContent = document.getElementById(`${tab}Tab`);

        if (activeTab) activeTab.classList.add('active');
        if (activeContent) activeContent.classList.add('active');

        // Load tab-specific content
        switch (tab) {
            case 'overview':
                this.loadOverviewTab();
                break;
            case 'profile':
                this.loadProfileTab();
                break;
            case 'activity':
                this.loadActivityTab();
                break;
            case 'achievements':
                this.loadAchievementsTab();
                break;
            case 'settings':
                this.loadSettingsTab();
                break;
        }
    }

    loadUserDashboard() {
        if (!this.currentUser) return;

        // Update user info in dashboard
        document.getElementById('userDisplayName').textContent = this.currentUser.displayName;
        document.getElementById('userEmail').textContent = this.currentUser.email;
        document.getElementById('userLevel').textContent = `Level ${this.currentUser.level}`;
        document.getElementById('userPoints').textContent = `${this.currentUser.points} XP`;
        document.getElementById('userAvatarImg').src = this.currentUser.avatar;

        // Load overview tab by default
        this.loadOverviewTab();
    }

    loadOverviewTab() {
        if (!this.currentUser) return;

        // Update stats
        document.getElementById('totalPosts').textContent = this.currentUser.stats.posts;
        document.getElementById('totalComments').textContent = this.currentUser.stats.comments;
        document.getElementById('totalLikes').textContent = this.currentUser.stats.likes;
        document.getElementById('totalFollowers').textContent = this.currentUser.stats.followers;

        // Load recent activity
        this.loadRecentActivity();
    }

    loadProfileTab() {
        if (!this.currentUser) return;

        // Populate profile form
        document.getElementById('editDisplayName').value = this.currentUser.displayName;
        document.getElementById('editBio').value = this.currentUser.bio || '';
        document.getElementById('editLocation').value = this.currentUser.location || '';
        document.getElementById('editWebsite').value = this.currentUser.website || '';
    }

    loadActivityTab() {
        // Load user activity timeline
        const timeline = document.getElementById('activityTimeline');
        if (timeline) {
            timeline.innerHTML = this.generateActivityTimeline();
        }
    }

    loadAchievementsTab() {
        // Load user achievements
        const grid = document.getElementById('achievementsGrid');
        if (grid) {
            grid.innerHTML = this.generateAchievementsGrid();
        }
    }

    loadSettingsTab() {
        // Load user settings
        if (this.currentUser.settings) {
            document.getElementById('emailNotifications').checked = this.currentUser.settings.emailNotifications !== false;
            document.getElementById('publicProfile').checked = this.currentUser.settings.publicProfile !== false;
            document.getElementById('showOnlineStatus').checked = this.currentUser.settings.showOnlineStatus !== false;
            document.getElementById('allowDMs').checked = this.currentUser.settings.allowDMs !== false;
        }
    }

    loadRecentActivity() {
        const activityList = document.getElementById('recentActivityList');
        if (!activityList) return;

        const activities = [
            { icon: 'fas fa-user-plus', title: 'Joined Cosmic Community', time: 'Just now', description: 'Welcome to the cosmic community!' },
            { icon: 'fas fa-star', title: 'First Achievement Unlocked', time: '2 minutes ago', description: 'You earned your first achievement!' },
            { icon: 'fas fa-rocket', title: 'Profile Created', time: '5 minutes ago', description: 'Your cosmic profile is ready to explore!' }
        ];

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    generateActivityTimeline() {
        const activities = [
            { type: 'post', title: 'Created first post', time: '1 hour ago', description: 'Shared your thoughts with the community' },
            { type: 'comment', title: 'Commented on a post', time: '2 hours ago', description: 'Engaged in community discussion' },
            { type: 'like', title: 'Liked a post', time: '3 hours ago', description: 'Showed appreciation for community content' }
        ];

        return activities.map(activity => `
            <div class="timeline-item">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    generateAchievementsGrid() {
        const achievements = [
            { id: 'first_post', title: 'First Post', description: 'Share your first post with the community', icon: 'fas fa-paper-plane', unlocked: true },
            { id: 'social_butterfly', title: 'Social Butterfly', description: 'Make 10 posts', icon: 'fas fa-comments', unlocked: false, progress: 0 },
            { id: 'community_helper', title: 'Community Helper', description: 'Help 5 other users', icon: 'fas fa-hands-helping', unlocked: false, progress: 0 },
            { id: 'cosmic_explorer', title: 'Cosmic Explorer', description: 'Explore all sections of the platform', icon: 'fas fa-rocket', unlocked: true },
            { id: 'early_adopter', title: 'Early Adopter', description: 'Join during the beta phase', icon: 'fas fa-star', unlocked: true },
            { id: 'content_creator', title: 'Content Creator', description: 'Create 50 posts', icon: 'fas fa-pen-fancy', unlocked: false, progress: 0 }
        ];

        return achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : ''}">
                <div class="achievement-icon">
                    <i class="${achievement.icon}"></i>
                </div>
                <h3 class="achievement-title">${achievement.title}</h3>
                <p class="achievement-description">${achievement.description}</p>
                ${!achievement.unlocked ? `
                    <div class="achievement-progress">
                        <div class="achievement-progress-bar" style="width: ${achievement.progress}%"></div>
                    </div>
                    <p class="achievement-progress-text">${achievement.progress}% Complete</p>
                ` : '<p class="achievement-unlocked">✓ Unlocked</p>'}
            </div>
        `).join('');
    }

    // Profile Management
    saveProfile() {
        if (!this.currentUser) return;

        const displayName = document.getElementById('editDisplayName').value;
        const bio = document.getElementById('editBio').value;
        const location = document.getElementById('editLocation').value;
        const website = document.getElementById('editWebsite').value;

        this.currentUser.displayName = displayName;
        this.currentUser.bio = bio;
        this.currentUser.location = location;
        this.currentUser.website = website;

        // Save to storage
        localStorage.setItem('cosmicUser', JSON.stringify(this.currentUser));
        
        // Update UI
        this.updateUI();
        this.showNotification('Profile updated successfully!', 'success');
    }

    // Utility Methods
    async simulateAPICall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(45deg, #00ff88, #00f7ff)' : 
                        type === 'error' ? 'linear-gradient(45deg, #ff6b6b, #ff5252)' : 
                        'linear-gradient(45deg, #00f7ff, #ff6b6b)'};
            color: #000;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10002;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Authentication Check Methods
    checkAuthAndOpenSocialFeed() {
        if (this.isAuthenticated) {
            openSocialFeed();
        } else {
            this.showNotification('Please sign in to access the live feed', 'info');
            this.openAuthModal();
        }
    }

    checkAuthAndShowQuickPost() {
        if (this.isAuthenticated) {
            showQuickPost();
        } else {
            this.showNotification('Please sign in to create posts', 'info');
            this.openAuthModal();
        }
    }

    checkAuthAndStartLiveStream() {
        if (this.isAuthenticated) {
            startLiveStream();
        } else {
            this.showNotification('Please sign in to go live', 'info');
            this.openAuthModal();
        }
    }
}

// Initialize authentication system
let authSystem;

// Simple initialization that always works
function initializeAuth() {
    if (!authSystem) {
        console.log('Initializing authentication system...');
        authSystem = new AuthSystem();
        console.log('Authentication system initialized successfully!');
    }
}

// Initialize immediately
initializeAuth();

// Also initialize when DOM is ready (backup)
document.addEventListener('DOMContentLoaded', initializeAuth);

// Initialize after a short delay (backup)
setTimeout(initializeAuth, 100);

// Global functions for HTML onclick handlers
function openAuthModal(tab = 'signin') {
    console.log('🔥 openAuthModal called with tab:', tab);
    
    // Ensure auth system is initialized
    if (!authSystem) {
        console.log('⚠️ Auth system not ready, initializing...');
        initializeAuth();
    }
    
    if (authSystem) {
        console.log('✅ Auth system ready, opening modal...');
        try {
            authSystem.openAuthModal(tab);
            console.log('✅ Modal opened successfully!');
        } catch (error) {
            console.error('❌ Error opening auth modal:', error);
            alert('Error opening authentication modal: ' + error.message);
        }
    } else {
        console.error('❌ Auth system still not ready after initialization');
        alert('Authentication system failed to initialize. Please refresh the page.');
    }
}

function closeAuthModal() {
    if (authSystem) {
        authSystem.closeAuthModal();
    }
}

function switchAuthTab(tab) {
    if (authSystem) {
        authSystem.switchAuthTab(tab);
    }
}

function signIn() {
    console.log('🔥 signIn function called');
    
    // Ensure auth system is initialized
    if (!authSystem) {
        console.log('⚠️ Auth system not ready, initializing...');
        initializeAuth();
    }
    
    if (authSystem) {
        console.log('✅ Auth system ready, signing in...');
        try {
            authSystem.signIn();
            console.log('✅ Sign in process started!');
        } catch (error) {
            console.error('❌ Error in signIn:', error);
            alert('Error signing in: ' + error.message);
        }
    } else {
        console.error('❌ Auth system still not ready');
        alert('Authentication system failed to initialize. Please refresh the page.');
    }
}

function signUp() {
    console.log('🔥 signUp function called');
    
    // Ensure auth system is initialized
    if (!authSystem) {
        console.log('⚠️ Auth system not ready, initializing...');
        initializeAuth();
    }
    
    if (authSystem) {
        console.log('✅ Auth system ready, signing up...');
        try {
            authSystem.signUp();
            console.log('✅ Sign up process started!');
        } catch (error) {
            console.error('❌ Error in signUp:', error);
            alert('Error signing up: ' + error.message);
        }
    } else {
        console.error('❌ Auth system still not ready');
        alert('Authentication system failed to initialize. Please refresh the page.');
    }
}

function signOut() {
    if (authSystem) {
        authSystem.signOut();
    }
}

function openDashboard() {
    if (authSystem) {
        authSystem.openDashboard();
    }
}

function closeDashboard() {
    if (authSystem) {
        authSystem.closeDashboard();
    }
}

function switchDashboardTab(tab) {
    if (authSystem) {
        authSystem.switchDashboardTab(tab);
    }
}

function saveProfile() {
    if (authSystem) {
        authSystem.saveProfile();
    }
}

function checkAuthAndOpenSocialFeed() {
    authSystem.checkAuthAndOpenSocialFeed();
}

function checkAuthAndShowQuickPost() {
    authSystem.checkAuthAndShowQuickPost();
}

function checkAuthAndStartLiveStream() {
    authSystem.checkAuthAndStartLiveStream();
}

function showForgotPassword() {
    authSystem.showNotification('Password reset feature coming soon!', 'info');
}

function showTerms() {
    authSystem.showNotification('Terms of Service coming soon!', 'info');
}

function showPrivacy() {
    authSystem.showNotification('Privacy Policy coming soon!', 'info');
}

function signInWithGoogle() {
    authSystem.showNotification('Google Sign-In coming soon!', 'info');
}

function signInWithGithub() {
    authSystem.showNotification('GitHub Sign-In coming soon!', 'info');
}

function signUpWithGoogle() {
    authSystem.showNotification('Google Sign-Up coming soon!', 'info');
}

function signUpWithGithub() {
    authSystem.showNotification('GitHub Sign-Up coming soon!', 'info');
}

function filterActivity(type) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    authSystem.showNotification(`Filtering by ${type}...`, 'info');
}

function toggleNotifications() {
    authSystem.showNotification('Notifications panel coming soon!', 'info');
}

function showDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        authSystem.signOut();
        authSystem.showNotification('Account deletion feature coming soon!', 'info');
    }
}

// Multiplayer Gaming Functions
function checkAuthAndJoinGame(gameId) {
    if (authSystem.isAuthenticated) {
        joinGame(gameId);
    } else {
        authSystem.showNotification('Please sign in to join multiplayer games', 'info');
        authSystem.openAuthModal();
    }
}

function joinGame(gameId) {
    const gameNames = {
        'space-racer': 'Space Racer',
        'cosmic-puzzle': 'Cosmic Puzzle',
        'galaxy-battle': 'Galaxy Battle'
    };
    
    authSystem.showNotification(`Joining ${gameNames[gameId]}...`, 'info');
    
    // Simulate game loading
    setTimeout(() => {
        authSystem.showNotification(`Welcome to ${gameNames[gameId]}! Game starting...`, 'success');
        
        // Update player count
        const playerCountElement = document.getElementById(`${gameId.replace('-', '')}Players`);
        if (playerCountElement) {
            const currentCount = parseInt(playerCountElement.textContent);
            playerCountElement.textContent = currentCount + 1;
        }
    }, 1500);
}

function checkAuthAndCreateGame() {
    if (authSystem.isAuthenticated) {
        createGame();
    } else {
        authSystem.showNotification('Please sign in to create games', 'info');
        authSystem.openAuthModal();
    }
}

function createGame() {
    authSystem.showNotification('Game creation feature coming soon!', 'info');
}

// Live Streaming Functions
function checkAuthAndWatchStream(streamId) {
    if (authSystem.isAuthenticated) {
        watchStream(streamId);
    } else {
        authSystem.showNotification('Please sign in to watch streams', 'info');
        authSystem.openAuthModal();
    }
}

function watchStream(streamId) {
    const streamNames = {
        'dev-stream': 'DevMaster Live Coding',
        'gaming-stream': 'CosmicGamer Plays',
        'art-stream': 'Digital Artist Creates'
    };
    
    authSystem.showNotification(`Opening ${streamNames[streamId]}...`, 'info');
    
    // Simulate stream loading
    setTimeout(() => {
        authSystem.showNotification(`Now watching ${streamNames[streamId]}!`, 'success');
        
        // Update viewer count
        const viewerCountElement = document.getElementById(`${streamId.replace('-', '')}Viewers`);
        if (viewerCountElement) {
            const currentCount = parseInt(viewerCountElement.textContent);
            viewerCountElement.textContent = currentCount + 1;
        }
    }, 1000);
}

function checkAuthAndStartStream() {
    if (authSystem.isAuthenticated) {
        startStream();
    } else {
        authSystem.showNotification('Please sign in to start streaming', 'info');
        authSystem.openAuthModal();
    }
}

function startStream() {
    authSystem.showNotification('Streaming setup feature coming soon!', 'info');
}


// Live Stats Updates
function updateLiveStats() {
    // Simulate live stats updates
    const stats = [
        { id: 'spaceRacerPlayers', min: 8, max: 20 },
        { id: 'cosmicPuzzlePlayers', min: 5, max: 15 },
        { id: 'galaxyBattlePlayers', min: 15, max: 35 },
        { id: 'devStreamViewers', min: 120, max: 200 },
        { id: 'gamingStreamViewers', min: 70, max: 120 },
        { id: 'artStreamViewers', min: 30, max: 60 }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            const currentValue = parseInt(element.textContent);
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newValue = Math.max(stat.min, Math.min(stat.max, currentValue + change));
            element.textContent = newValue;
        }
    });
}

// Initialize live stats updates
setInterval(updateLiveStats, 5000); // Update every 5 seconds

// Test function to verify authentication system
function testAuthSystem() {
    console.log('Testing authentication system...');
    console.log('Auth system initialized:', !!authSystem);
    console.log('Current user:', authSystem ? authSystem.currentUser : 'N/A');
    console.log('Is authenticated:', authSystem ? authSystem.isAuthenticated : 'N/A');
    
    // Test opening auth modal
    if (authSystem) {
        console.log('Testing auth modal...');
        authSystem.openAuthModal('signin');
        setTimeout(() => {
            authSystem.closeAuthModal();
            console.log('Auth modal test completed');
        }, 2000);
    }
}

// Make test function available globally for debugging
window.testAuthSystem = testAuthSystem;

// Authenticated Comment System Functions
function checkAuthAndCreatePost() {
    if (authSystem.isAuthenticated) {
        createPost();
    } else {
        authSystem.showNotification('Please sign in to create posts', 'info');
        authSystem.openAuthModal();
    }
}

function checkAuthAndCreateQuickPost() {
    if (authSystem.isAuthenticated) {
        createQuickPost();
    } else {
        authSystem.showNotification('Please sign in to create posts', 'info');
        authSystem.openAuthModal();
    }
}

function createPost() {
    const username = document.getElementById('usernameInput').value.trim();
    const content = document.getElementById('postContent').value.trim();
    
    if (!content) {
        authSystem.showNotification('Please enter some content for your post', 'error');
        return;
    }
    
    // Use authenticated user's info
    const displayName = authSystem.currentUser.displayName;
    const userAvatar = authSystem.currentUser.avatar;
    
    // Create post object
    const post = {
        id: Date.now(),
        author: displayName,
        avatar: userAvatar,
        content: content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isLiked: false
    };
    
    // Add post to feed
    addPostToFeed(post);
    
    // Clear form
    document.getElementById('postContent').value = '';
    document.getElementById('charCount').textContent = '0/1000';
    
    // Update user stats
    authSystem.currentUser.stats.posts++;
    localStorage.setItem('cosmicUser', JSON.stringify(authSystem.currentUser));
    
    authSystem.showNotification('Post created successfully!', 'success');
}

function createQuickPost() {
    const content = document.getElementById('quickPostContent').value.trim();
    
    if (!content) {
        authSystem.showNotification('Please enter some content for your post', 'error');
        return;
    }
    
    // Use authenticated user's info
    const displayName = authSystem.currentUser.displayName;
    const userAvatar = authSystem.currentUser.avatar;
    
    // Create post object
    const post = {
        id: Date.now(),
        author: displayName,
        avatar: userAvatar,
        content: content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isLiked: false
    };
    
    // Add post to feed
    addPostToFeed(post);
    
    // Clear form and close modal
    document.getElementById('quickPostContent').value = '';
    document.getElementById('quickCharCount').textContent = '0/500';
    closeQuickPost();
    
    // Update user stats
    authSystem.currentUser.stats.posts++;
    localStorage.setItem('cosmicUser', JSON.stringify(authSystem.currentUser));
    
    authSystem.showNotification('Quick post created successfully!', 'success');
}

function addPostToFeed(post) {
    const feedPosts = document.getElementById('feedPosts');
    if (!feedPosts) return;
    
    const postElement = document.createElement('div');
    postElement.className = 'feed-post';
    postElement.innerHTML = `
        <div class="post-header">
            <div class="post-author-info">
                <div class="post-author-avatar">
                    <img src="${post.avatar}" alt="${post.author}">
                </div>
                <div class="post-author-details">
                    <span class="post-author-name">${post.author}</span>
                    <span class="post-timestamp">${formatTimestamp(post.timestamp)}</span>
                </div>
            </div>
            <div class="post-actions">
                <button class="post-action-btn" onclick="togglePostLike(${post.id})" title="Like">
                    <i class="fas fa-heart ${post.isLiked ? 'liked' : ''}"></i>
                    <span class="like-count">${post.likes}</span>
                </button>
                <button class="post-action-btn" onclick="togglePostComment(${post.id})" title="Comment">
                    <i class="fas fa-comment"></i>
                    <span class="comment-count">${post.comments}</span>
                </button>
                <button class="post-action-btn" onclick="sharePost(${post.id})" title="Share">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
        <div class="post-content">
            <p>${escapeHtml(post.content)}</p>
        </div>
        <div class="post-comments" id="comments-${post.id}" style="display: none;">
            <div class="comment-input">
                <div class="comment-author-avatar">
                    <img src="${authSystem.currentUser.avatar}" alt="${authSystem.currentUser.displayName}">
                </div>
                <input type="text" placeholder="Write a comment..." maxlength="500" onkeypress="handleCommentKeypress(event, ${post.id})">
            </div>
            <div class="comments-list" id="comments-list-${post.id}">
                <!-- Comments will be loaded here -->
            </div>
        </div>
    `;
    
    // Insert at the top of the feed
    feedPosts.insertBefore(postElement, feedPosts.firstChild);
    
    // Add animation
    postElement.style.opacity = '0';
    postElement.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        postElement.style.transition = 'all 0.3s ease';
        postElement.style.opacity = '1';
        postElement.style.transform = 'translateY(0)';
    }, 100);
}

function formatTimestamp(timestamp) {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diff = now - postTime;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function togglePostLike(postId) {
    if (!authSystem.isAuthenticated) {
        authSystem.showNotification('Please sign in to like posts', 'info');
        authSystem.openAuthModal();
        return;
    }
    
    const postElement = document.querySelector(`[onclick*="togglePostLike(${postId})"]`).closest('.feed-post');
    const likeBtn = postElement.querySelector('.post-action-btn[onclick*="togglePostLike"]');
    const likeIcon = likeBtn.querySelector('i');
    const likeCount = likeBtn.querySelector('.like-count');
    
    if (likeIcon.classList.contains('liked')) {
        likeIcon.classList.remove('liked');
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        authSystem.showNotification('Post unliked', 'info');
    } else {
        likeIcon.classList.add('liked');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        authSystem.showNotification('Post liked!', 'success');
    }
}

function togglePostComment(postId) {
    if (!authSystem.isAuthenticated) {
        authSystem.showNotification('Please sign in to comment on posts', 'info');
        authSystem.openAuthModal();
        return;
    }
    
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
        commentsSection.style.animation = 'slideDown 0.3s ease';
    } else {
        commentsSection.style.display = 'none';
    }
}

function handleCommentKeypress(event, postId) {
    if (event.key === 'Enter') {
        addComment(postId, event.target.value);
        event.target.value = '';
    }
}

function addComment(postId, content) {
    if (!content.trim()) return;
    
    const comment = {
        id: Date.now(),
        author: authSystem.currentUser.displayName,
        avatar: authSystem.currentUser.avatar,
        content: content.trim(),
        timestamp: new Date().toISOString()
    };
    
    const commentsList = document.getElementById(`comments-list-${postId}`);
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.innerHTML = `
        <div class="comment-author-avatar">
            <img src="${comment.avatar}" alt="${comment.author}">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-timestamp">${formatTimestamp(comment.timestamp)}</span>
            </div>
            <p>${escapeHtml(comment.content)}</p>
        </div>
    `;
    
    commentsList.appendChild(commentElement);
    
    // Update comment count
    const postElement = document.querySelector(`[onclick*="togglePostLike(${postId})"]`).closest('.feed-post');
    const commentCount = postElement.querySelector('.comment-count');
    commentCount.textContent = parseInt(commentCount.textContent) + 1;
    
    // Update user stats
    authSystem.currentUser.stats.comments++;
    localStorage.setItem('cosmicUser', JSON.stringify(authSystem.currentUser));
    
    authSystem.showNotification('Comment added!', 'success');
}

function sharePost(postId) {
    if (!authSystem.isAuthenticated) {
        authSystem.showNotification('Please sign in to share posts', 'info');
        authSystem.openAuthModal();
        return;
    }
    
    authSystem.showNotification('Post shared successfully!', 'success');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
