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

    // Enable horizontal scroll with mouse wheel
    const videoScroll = document.querySelector('.video-scroll');
    if (videoScroll) {
        videoScroll.addEventListener('wheel', function(e) {
            if (videoScroll.scrollWidth > videoScroll.clientWidth) {
                e.preventDefault();
                const scrollSpeed = 3; // Adjust this value as needed
                videoScroll.scrollLeft += e.deltaY * scrollSpeed;
            }
        }, { passive: false });
    }
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

// Enable click-and-drag horizontal scrolling
(function() {
    const videoScroll = document.querySelector('.video-scroll');
    if (!videoScroll) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    videoScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        videoScroll.classList.add('dragging');
        startX = e.pageX - videoScroll.offsetLeft;
        scrollLeft = videoScroll.scrollLeft;
    });

    videoScroll.addEventListener('mouseleave', () => {
        isDown = false;
        videoScroll.classList.remove('dragging');
    });

    videoScroll.addEventListener('mouseup', () => {
        isDown = false;
        videoScroll.classList.remove('dragging');
    });

    videoScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - videoScroll.offsetLeft;
        const walk = (x - startX) * 2; // Adjust multiplier for speed
        videoScroll.scrollLeft = scrollLeft - walk;
    });

    // Prevent text/image selection while dragging
    videoScroll.addEventListener('dragstart', (e) => e.preventDefault());
})();


