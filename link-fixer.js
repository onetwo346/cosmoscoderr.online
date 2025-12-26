// Link Fixer for Cosmic Web App Store
document.addEventListener('DOMContentLoaded', function() {
    // Map of app names to their correct URLs
    const appUrlMap = {
        // Games
        'Pic2Puzz': 'https://pic2puzz.space/',
        'XOWARS': 'https://xowars.space/',
        'Word Grid Quest': 'https://wordgridquest.xyz/',
        'Fetch or Catch': 'https://onetwo346.github.io/fetch-or-catch/',
        'Time Escape': 'https://onetwo346.github.io/space-shooting',
        'Cosmic Horizon': 'https://cosmichorizon.space',
        
        // Tools
        'Earthquake Analyst': 'https://earthquakeanalyst.space/',
        'SwitchBox': 'https://onetwo346.github.io/switchbox/',
        'Dip Image Generator': 'https://dipimagegenerator.lat',
        'Beeek': 'https://beeek.online',
        
        // Web Apps
        'Quick Wrap': 'https://quickwrap.space',
        'Make This Recipe': 'https://onetwo346.github.io/Make-this-recipe-',
        'Horonum': 'https://onetwo346.github.io/horonum',
        'Glow Radio': 'https://onetwo346.github.io/glow-radio-'
    };
    
    // Fix all project links
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        const title = project.querySelector('h3').textContent.trim();
        const link = project.querySelector('a.btn');
        
        if (link) {
            // If the link is empty or just a hash, update it with the correct URL
            // Don't set target="_blank" - let preview-popup.js handle modal vs new tab
            if (link.getAttribute('href') === '#' || link.getAttribute('href') === '') {
                if (appUrlMap[title]) {
                    link.setAttribute('href', appUrlMap[title]);
                    console.log(`Fixed link for: ${title}`);
                }
            }
            
            // Note: Don't set target="_blank" here - let preview-popup.js handle
            // opening apps in the in-app modal for desktop/iPad users
        }
    });
    
    // Fix featured app links in the cosmic-animations.js generated content
    // Only fix empty/hash hrefs, don't force target="_blank" - let modal system handle it
    document.querySelectorAll('.featured-app-btn').forEach(btn => {
        const featuredApp = btn.closest('.featured-app');
        if (featuredApp) {
            const appTitle = featuredApp.querySelector('h3')?.textContent.trim();
            if (appTitle && appUrlMap[appTitle]) {
                const currentHref = btn.getAttribute('href');
                if (!currentHref || currentHref === '#') {
                    btn.setAttribute('href', appUrlMap[appTitle]);
                }
            }
        }
    });
    
    console.log('Link fixer has completed checking all app links');
});