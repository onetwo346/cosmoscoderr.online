document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    let cursorVisible = true;
    let cursorTimeout;

    // Hide cursor when inactive
    const hideCursor = () => {
        if (cursorVisible) {
            cursor.style.opacity = '0';
            cursorVisible = false;
        }
    };

    // Show cursor on movement
    const showCursor = () => {
        if (!cursorVisible) {
            cursor.style.opacity = '1';
            cursorVisible = true;
        }
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(hideCursor, 3000); // Hide after 3s of inactivity
    };

    // Update cursor position
    const updateCursor = (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        showCursor();
    };

    // Add hover effect on interactive elements
    const addHoverToElements = () => {
        const interactiveElements = document.querySelectorAll('a, button, .project, .preview-btn, .nav-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5) translate(-33%, -33%)';
                cursor.style.mixBlendMode = 'plus-lighter';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1) translate(-50%, -50%)';
                cursor.style.mixBlendMode = 'screen';
            });
        });
    };

    // Initialize
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    addHoverToElements();

    // Update hover effects when content changes (for dynamic elements)
    const observer = new MutationObserver(addHoverToElements);
    observer.observe(document.body, { childList: true, subtree: true });
});