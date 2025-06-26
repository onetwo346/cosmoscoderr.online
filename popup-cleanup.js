/**
 * Popup Cleanup System
 * This script ensures all popups are properly cleaned up and don't appear in the footer
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to completely remove all popups that might be causing issues
    function cleanupAllPopups() {
        // Remove any stray preview popups
        const previewPopups = document.querySelectorAll('.preview-popup, .detail-popup');
        previewPopups.forEach(popup => {
            popup.innerHTML = '';
            popup.style.display = 'none';
        });
        
        // Remove any stray popup content that might have been appended to the body
        const strayContent = document.querySelectorAll('.preview-content, .detail-popup-content');
        strayContent.forEach(content => {
            if (content.parentNode) {
                content.parentNode.removeChild(content);
            }
        });
        
        // Clean up any elements with text containing "Explore this cosmic application"
        document.querySelectorAll('*').forEach(element => {
            if (element.textContent && 
                element.textContent.includes('Explore this cosmic application') &&
                !element.closest('.preview-popup') && 
                !element.closest('.detail-popup')) {
                element.textContent = '';
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }
        });
    }
    
    // Clean up on scroll events to catch any popups that appear when scrolling
    window.addEventListener('scroll', function() {
        cleanupAllPopups();
    });
    
    // Clean up when clicking anywhere on the page
    document.addEventListener('click', function() {
        setTimeout(cleanupAllPopups, 100);
    });
    
    // Initial cleanup
    cleanupAllPopups();
    
    // Periodic cleanup every second to catch any that might appear
    setInterval(cleanupAllPopups, 1000);
});