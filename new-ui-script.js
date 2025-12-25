// ============================================
// MODERN UI JAVASCRIPT - COSMOS CODERR
// ============================================

(function() {
    'use strict';

    // ============================================
    // THEME TOGGLE
    // ============================================
    const themeToggle = document.querySelector('.theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Add ripple effect
        createRipple(themeToggle);
    });

    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // FILTER FUNCTIONALITY
    // ============================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const appCards = document.querySelectorAll('.app-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter cards with animation
            appCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.4s ease-out';
                    }, index * 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // VIEW TOGGLE (GRID/LIST)
    // ============================================
    const viewBtns = document.querySelectorAll('.view-btn');
    const appsGrid = document.getElementById('appsGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle view
            if (view === 'list') {
                appsGrid.style.gridTemplateColumns = '1fr';
                appCards.forEach(card => {
                    card.style.display = 'flex';
                    card.querySelector('.app-image').style.width = '200px';
                    card.querySelector('.app-image').style.height = '150px';
                });
            } else {
                appsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
                appCards.forEach(card => {
                    card.style.display = 'block';
                    card.querySelector('.app-image').style.width = '100%';
                    card.querySelector('.app-image').style.height = '200px';
                });
            }
        });
    });

    // ============================================
    // DOWNLOAD BUTTON ANIMATION
    // ============================================
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Change button state
            const originalText = btn.innerHTML;
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 10"/></svg> Downloading...';
            btn.style.pointerEvents = 'none';
            
            // Simulate download
            setTimeout(() => {
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Downloaded!';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.pointerEvents = 'auto';
                }, 2000);
            }, 1500);
            
            // Create success particles
            createParticles(btn);
        });
    });

    // ============================================
    // QUICK VIEW FUNCTIONALITY
    // ============================================
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.app-card');
            const title = card.querySelector('.app-title').textContent;
            const description = card.querySelector('.app-description').textContent;
            
            // Create modal
            showModal(title, description);
        });
    });

    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', () => {
        // Create search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            z-index: 2000;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 100px;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const searchBox = document.createElement('div');
        searchBox.style.cssText = `
            width: 90%;
            max-width: 600px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-xl);
            padding: var(--spacing-lg);
            box-shadow: var(--shadow-xl);
        `;
        
        searchBox.innerHTML = `
            <input type="text" placeholder="Search apps..." style="
                width: 100%;
                padding: var(--spacing-md);
                font-size: 1.125rem;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                background: var(--bg-secondary);
                color: var(--text-primary);
                outline: none;
            ">
            <div id="searchResults" style="margin-top: var(--spacing-md);"></div>
        `;
        
        searchOverlay.appendChild(searchBox);
        document.body.appendChild(searchOverlay);
        
        // Focus input
        const input = searchBox.querySelector('input');
        input.focus();
        
        // Search functionality
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const results = document.getElementById('searchResults');
            
            if (query.length > 0) {
                const matches = Array.from(appCards).filter(card => {
                    const title = card.querySelector('.app-title').textContent.toLowerCase();
                    const description = card.querySelector('.app-description').textContent.toLowerCase();
                    return title.includes(query) || description.includes(query);
                });
                
                if (matches.length > 0) {
                    results.innerHTML = matches.map(card => {
                        const title = card.querySelector('.app-title').textContent;
                        const category = card.querySelector('.app-category').textContent;
                        return `
                            <div style="
                                padding: var(--spacing-md);
                                border-radius: var(--radius-md);
                                background: var(--bg-secondary);
                                margin-bottom: var(--spacing-sm);
                                cursor: pointer;
                                transition: all 0.2s;
                            " onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background='var(--bg-secondary)'">
                                <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
                                <div style="font-size: 0.875rem; color: var(--text-tertiary);">${category}</div>
                            </div>
                        `;
                    }).join('');
                } else {
                    results.innerHTML = '<p style="color: var(--text-tertiary); text-align: center; padding: var(--spacing-lg);">No results found</p>';
                }
            } else {
                results.innerHTML = '';
            }
        });
        
        // Close on overlay click
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                document.body.removeChild(searchOverlay);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(searchOverlay)) {
                    document.body.removeChild(searchOverlay);
                }
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        
        // Toggle menu animation
        const spans = menuBtn.querySelectorAll('span');
        if (menuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            
            // Show mobile menu
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.position = 'fixed';
            navLinksContainer.style.top = '72px';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.right = '0';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.background = 'var(--bg-primary)';
            navLinksContainer.style.padding = 'var(--spacing-lg)';
            navLinksContainer.style.borderBottom = '1px solid var(--border-color)';
            navLinksContainer.style.boxShadow = 'var(--shadow-lg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Hide mobile menu
            navLinksContainer.style.display = 'none';
        }
    });

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Create ripple effect
    function createRipple(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Create particles effect
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const colors = ['#00f5ff', '#a855f7', '#ec4899', '#fbbf24'];
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 12;
            const velocity = 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                pointer-events: none;
                z-index: 10000;
                animation: particle 0.8s ease-out forwards;
                --tx: ${tx}px;
                --ty: ${ty}px;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }
    
    // Show modal
    function showModal(title, description) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-xl);
            animation: fadeIn 0.3s ease-out;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-xl);
            padding: var(--spacing-2xl);
            max-width: 600px;
            width: 100%;
            box-shadow: var(--shadow-xl);
            animation: slideUp 0.4s ease-out;
        `;
        
        modalContent.innerHTML = `
            <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 2rem; margin-bottom: var(--spacing-lg);">${title}</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--spacing-xl);">${description}</p>
            <div style="display: flex; gap: var(--spacing-md);">
                <button class="modal-download" style="
                    flex: 1;
                    padding: var(--spacing-md);
                    background: var(--accent-gradient);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                ">Download Now</button>
                <button class="modal-close" style="
                    padding: var(--spacing-md) var(--spacing-lg);
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                ">Close</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Download handler
        modal.querySelector('.modal-download').addEventListener('click', () => {
            createParticles(modal.querySelector('.modal-download'));
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 1000);
        });
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
        
        @keyframes particle {
            to {
                transform: translate(var(--tx), var(--ty));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe app cards
    appCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroOrbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        heroOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ============================================
    // SCROLL TO TOP ON LOGO CLICK
    // ============================================
    const navBrand = document.querySelector('.nav-brand');
    
    navBrand.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('🚀 Cosmos Coderr UI Loaded Successfully!');
})();
