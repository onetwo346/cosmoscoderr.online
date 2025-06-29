// Fix for cosmic cursor to work with preview popup
document.addEventListener('DOMContentLoaded', function() {
    // Get the cursor elements
    const cursor = document.getElementById('cursor');
    
    // Add event listener to ensure cursor works with popup
    document.addEventListener('mousemove', function(e) {
        // Make sure cursor is always on top
        if (cursor) {
            // Ensure cursor is visible when popup is active
            cursor.style.zIndex = "10000";
            
            // Ensure cursor trails work with popup
            document.querySelectorAll('.cursor-trail').forEach(trail => {
                trail.style.zIndex = "9995";
            });
        }
    });
    
    // Fix cursor interaction with popup elements
    document.querySelectorAll('.preview-btn, .preview-close').forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (cursor) {
                cursor.style.transform = "scale(1.5)";
                cursor.style.mixBlendMode = "difference";
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (cursor) {
                cursor.style.transform = "translate(-50%, -50%)";
                cursor.style.mixBlendMode = "screen";
            }
        });
    });
});