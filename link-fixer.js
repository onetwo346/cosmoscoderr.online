// Link Fixer for Cosmic Web App Store
// This script only fixes empty/missing URLs - preview-popup.js handles the modal
document.addEventListener('DOMContentLoaded', function() {
    // Map of app names to their correct URLs (for apps with missing hrefs)
    const appUrlMap = {
        'Pic2Puzz': 'https://pic2puzz.space/',
        'XOWARS': 'https://xowars.space/',
        'Word Grid Quest': 'https://wordgridquest.xyz/',
        'Fetch or Catch': 'https://onetwo346.github.io/fetch-or-catch/',
        'Time Escape': 'https://onetwo346.github.io/space-shooting',
        'Cosmic Horizon': 'https://cosmichorizon.space',
        'Earthquake Analyst': 'https://earthquakeanalyst.space/',
        'SwitchBox': 'https://onetwo346.github.io/switchbox/',
        'Dip Image Generator': 'https://dipimagegenerator.lat',
        'Beeek': 'https://beeek.online',
        'Quick Wrap': 'https://quickwrap.space',
        'Make This Recipe': 'https://onetwo346.github.io/Make-this-recipe-',
        'Horonum': 'https://onetwo346.github.io/horonum',
        'Glow Radio': 'https://onetwo346.github.io/glow-radio-'
    };
    
    // Only fix links that have empty or # hrefs
    document.querySelectorAll('.project').forEach(project => {
        const title = project.querySelector('h3')?.textContent.trim();
        const link = project.querySelector('a.btn');
        
        if (link && title) {
            const href = link.getAttribute('href');
            // Only set data-app-url if href is empty/hash and we have a URL in the map
            if ((!href || href === '#' || href === '') && appUrlMap[title]) {
                link.setAttribute('data-app-url', appUrlMap[title]);
            }
        }
    });
});