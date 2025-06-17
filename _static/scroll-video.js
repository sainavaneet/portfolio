
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        
        // Play video on hover
        item.addEventListener('mouseenter', () => {
            video.play();
        });
        
        // Pause video when mouse leaves
        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
});

// Add touch swipe support
let touchStartX = 0;
let touchEndX = 0;
const videoScroll = document.querySelector('.video-scroll');

videoScroll.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

videoScroll.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        videoScroll.scrollBy({
            left: 420,
            behavior: 'smooth'
        });
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        videoScroll.scrollBy({
            left: -420,
            behavior: 'smooth'
        });
    }
}
