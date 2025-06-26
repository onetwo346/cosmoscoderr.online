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
            // If the link is empty or just a hash, update it
            if (link.getAttribute('href') === '#' || link.getAttribute('href') === '') {
                if (appUrlMap[title]) {
                    link.setAttribute('href', appUrlMap[title]);
                    link.setAttribute('target', '_blank');
                    console.log(`Fixed link for: ${title}`);
                }
            }
            
            // Ensure all links open in a new tab
            link.setAttribute('target', '_blank');
            
            // Add event listener to handle clicks
            link.addEventListener('click', function(e) {
                // If the link is still empty, prevent the default action
                if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                    e.preventDefault();
                    console.log(`No valid URL for: ${title}`);
                    alert(`Sorry, ${title} is currently unavailable.`);
                }
            });
        }
    });
    
    // Fix featured app links in the cosmic-animations.js generated content
    document.querySelectorAll('.featured-app-btn').forEach(btn => {
        const appTitle = btn.closest('.featured-app').querySelector('h3').textContent.trim();
        if (appUrlMap[appTitle]) {
            btn.setAttribute('href', appUrlMap[appTitle]);
            btn.setAttribute('target', '_blank');
        }
    });
    
    console.log('Link fixer has completed checking all app links');
});