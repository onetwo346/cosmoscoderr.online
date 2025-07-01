// Next-Level Cosmic Video Player
class CosmicVideoPlayer {
    constructor() {
        // Use the existing inline video player
        this.video = document.getElementById('cosmic-gallery-video');
        if (!this.video) return;
        this.container = this.video.closest('.cosmic-video-section');
        this.isPlaying = false;
        this.isMuted = false;
        this.currentVolume = 1;
        this.isFullscreen = false;
        this.playbackSpeed = 1;
        // Setup only the needed event listeners and enhancements for the inline player
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Play/Pause toggle on video click
        this.video.addEventListener('click', () => {
            if (this.video.paused) {
                this.video.play();
            } else {
                this.video.pause();
            }
        });
        // Optional: Add more enhancements here if needed
    }
}

// Initialize the cosmic video player enhancements for the inline player only
window.addEventListener('DOMContentLoaded', () => {
    new CosmicVideoPlayer();
}); 