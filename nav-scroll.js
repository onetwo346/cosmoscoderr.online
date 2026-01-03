// Smooth scroll navigation with hide/show on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.querySelector('.cosmic-nav');
    let holidayBanner = null;
    let lastScrollTop = 0;
    let scrollTimeout;
    let ticking = false;
    
    // Wait for holiday banner to be created (it's added dynamically)
    const checkForBanner = () => {
        holidayBanner = document.querySelector('.holiday-banner');
        if (!holidayBanner) {
            setTimeout(checkForBanner, 300);
        }
    };
    checkForBanner();
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default hash behavior
            
            const targetId = link.getAttribute('href');
            
            // If it's the home link, scroll to top
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // For other sections, scroll to their position
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            
            // Update active state
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active nav link on scroll and hide/show nav + banner
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Hide/show navigation and holiday banner based on scroll direction
                if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
                    // Scrolling down - hide nav and banner
                    if (nav) nav.classList.add('nav-hidden');
                    if (holidayBanner) holidayBanner.classList.add('banner-hidden');
                } else if (currentScrollTop < lastScrollTop) {
                    // Scrolling up - show nav and banner
                    if (nav) nav.classList.remove('nav-hidden');
                    if (holidayBanner) holidayBanner.classList.remove('banner-hidden');
                }
                
                lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
                ticking = false;
                
                // Update active nav link
                let current = '';
                const sections = document.querySelectorAll('section[id]');
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (currentScrollTop >= sectionTop - 60) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                    if (currentScrollTop < 100 && link.getAttribute('href') === '#home') {
                        link.classList.add('active');
                    }
                });
            });
            ticking = true;
        }
    });
});