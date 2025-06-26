// Force Link Fix - This script directly targets and fixes specific links
document.addEventListener('DOMContentLoaded', function() {
    // Wait a short time to ensure DOM is fully loaded and other scripts have run
    setTimeout(function() {
        console.log('Force Link Fix running...');
        
        // Get all project links
        const projectLinks = document.querySelectorAll('.project a.btn');
        
        // Loop through all links and fix specific ones
        projectLinks.forEach(link => {
            const projectTitle = link.closest('.project-content').querySelector('h3').textContent.trim();
            
            // Fix XOWARS link
            if (projectTitle === 'XOWARS') {
                console.log('Fixing XOWARS link');
                link.href = 'https://xowars.space/';
                link.target = '_blank';
                
                // Add click event to ensure it works
                link.onclick = function(e) {
                    window.open('https://xowars.space/', '_blank');
                };
            }
            
            // Fix Word Grid Quest link
            if (projectTitle === 'Word Grid Quest') {
                console.log('Fixing Word Grid Quest link');
                link.href = 'https://wordgridquest.xyz/';
                link.target = '_blank';
                
                // Add click event to ensure it works
                link.onclick = function(e) {
                    window.open('https://wordgridquest.xyz/', '_blank');
                };
            }
        });
        
        // Add a global click handler for these specific links as a fallback
        document.body.addEventListener('click', function(e) {
            // Check if the clicked element or its parent is a button in a project with specific titles
            let target = e.target;
            let projectContent = null;
            
            // Traverse up to 5 levels to find project-content
            for (let i = 0; i < 5; i++) {
                if (!target) break;
                
                if (target.classList && target.classList.contains('project-content')) {
                    projectContent = target;
                    break;
                }
                
                target = target.parentElement;
            }
            
            if (projectContent) {
                const title = projectContent.querySelector('h3').textContent.trim();
                
                if (title === 'XOWARS') {
                    console.log('XOWARS clicked via global handler');
                    window.open('https://xowars.space/', '_blank');
                }
                
                if (title === 'Word Grid Quest') {
                    console.log('Word Grid Quest clicked via global handler');
                    window.open('https://wordgridquest.xyz/', '_blank');
                }
            }
        });
        
        console.log('Force Link Fix complete');
    }, 500); // Wait 500ms to ensure DOM is ready
});