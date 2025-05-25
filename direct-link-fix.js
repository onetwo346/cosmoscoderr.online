// Direct Link Fix for XOWARS and Word Grid Quest
document.addEventListener('DOMContentLoaded', function() {
    // Immediately fix the specific links we need to update
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        const title = project.querySelector('h3').textContent.trim();
        const link = project.querySelector('a.btn');
        
        // Direct fixes for specific apps
        if (title === 'XOWARS' && link) {
            link.setAttribute('href', 'https://xowars.space/');
            link.setAttribute('target', '_blank');
            console.log('Fixed XOWARS link directly');
        }
        
        if (title === 'Word Grid Quest' && link) {
            link.setAttribute('href', 'https://wordgridquest.xyz/');
            link.setAttribute('target', '_blank');
            console.log('Fixed Word Grid Quest link directly');
        }
    });
});
