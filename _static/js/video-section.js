// Enhanced Video Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing enhanced video section...');
    
    // Initialize video section
    initializeVideoSection();
    
    // Initialize video gallery
    initializeVideoGallery();
    
    // Initialize video modal
    initializeVideoModal();
    
    // Initialize drag scrolling
    initializeDragScroll();
});

function initializeVideoSection() {
    console.log('Setting up video section...');
    
    // Add navigation arrows to video scroll
    addVideoNavigationArrows();
    
    // Add gallery controls
    addVideoGalleryControls();
    
    // Initialize main video player
    initializeMainVideo();
}

function initializeMainVideo() {
    const mainVideo = document.querySelector('.video-main-container video');
    const playButton = document.querySelector('.video-play-button');
    
    if (mainVideo && playButton) {
        // Add click event to play button
        playButton.addEventListener('click', function() {
            if (mainVideo.paused) {
                mainVideo.play();
                playButton.style.display = 'none';
            } else {
                mainVideo.pause();
                playButton.style.display = 'flex';
            }
        });
        
        // Show play button when video ends
        mainVideo.addEventListener('ended', function() {
            playButton.style.display = 'flex';
        });
        
        // Hide play button when video is playing
        mainVideo.addEventListener('play', function() {
            playButton.style.display = 'none';
        });
        
        // Show play button when video is paused
        mainVideo.addEventListener('pause', function() {
            playButton.style.display = 'flex';
        });
    }
}

function addVideoNavigationArrows() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    // Create navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.className = 'video-nav-arrow prev';
    prevArrow.innerHTML = '‹';
    prevArrow.setAttribute('aria-label', 'Previous videos');
    
    const nextArrow = document.createElement('button');
    nextArrow.className = 'video-nav-arrow next';
    nextArrow.innerHTML = '›';
    nextArrow.setAttribute('aria-label', 'Next videos');
    
    // Add arrows to container
    videoContainer.appendChild(prevArrow);
    videoContainer.appendChild(nextArrow);
    
    // Add click events
    prevArrow.addEventListener('click', function() {
        scrollVideos('prev');
    });
    
    nextArrow.addEventListener('click', function() {
        scrollVideos('next');
    });
    
    // Update arrow states
    updateNavigationArrows();
    
    // Update arrows on scroll
    const videoScroll = videoContainer.querySelector('.video-scroll');
    if (videoScroll) {
        videoScroll.addEventListener('scroll', updateNavigationArrows);
    }
}

function scrollVideos(direction) {
    const videoScroll = document.querySelector('.video-scroll');
    if (!videoScroll) return;
    
    const scrollAmount = 400; // Adjust based on video item width + gap
    const currentScroll = videoScroll.scrollLeft;
    
    if (direction === 'prev') {
        videoScroll.scrollTo({
            left: currentScroll - scrollAmount,
            behavior: 'smooth'
        });
    } else {
        videoScroll.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: 'smooth'
        });
    }
}

function updateNavigationArrows() {
    const videoScroll = document.querySelector('.video-scroll');
    const prevArrow = document.querySelector('.video-nav-arrow.prev');
    const nextArrow = document.querySelector('.video-nav-arrow.next');
    
    if (!videoScroll || !prevArrow || !nextArrow) return;
    
    const scrollLeft = videoScroll.scrollLeft;
    const scrollWidth = videoScroll.scrollWidth;
    const clientWidth = videoScroll.clientWidth;
    
    // Update prev arrow
    if (scrollLeft <= 0) {
        prevArrow.disabled = true;
        prevArrow.style.opacity = '0.5';
    } else {
        prevArrow.disabled = false;
        prevArrow.style.opacity = '1';
    }
    
    // Update next arrow
    if (scrollLeft >= scrollWidth - clientWidth - 1) {
        nextArrow.disabled = true;
        nextArrow.style.opacity = '0.5';
    } else {
        nextArrow.disabled = false;
        nextArrow.style.opacity = '1';
    }
}

function addVideoGalleryControls() {
    const galleryHeader = document.querySelector('.video-gallery-header');
    if (!galleryHeader) return;
    
    const controls = document.createElement('div');
    controls.className = 'video-gallery-controls';
    
    // Add play all button
    const playAllBtn = document.createElement('button');
    playAllBtn.className = 'video-gallery-btn';
    playAllBtn.innerHTML = '▶ Play All';
    playAllBtn.addEventListener('click', playAllVideos);
    
    // Add pause all button
    const pauseAllBtn = document.createElement('button');
    pauseAllBtn.className = 'video-gallery-btn';
    pauseAllBtn.innerHTML = '⏸ Pause All';
    pauseAllBtn.addEventListener('click', pauseAllVideos);
    
    controls.appendChild(playAllBtn);
    controls.appendChild(pauseAllBtn);
    galleryHeader.appendChild(controls);
}

function playAllVideos() {
    const videos = document.querySelectorAll('.video-item video');
    videos.forEach(video => {
        video.play().catch(e => console.log('Could not play video:', e));
    });
}

function pauseAllVideos() {
    const videos = document.querySelectorAll('.video-item video');
    videos.forEach(video => {
        video.pause();
    });
}

function initializeVideoGallery() {
    console.log('Setting up video gallery...');
    
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach((item, index) => {
        const video = item.querySelector('video');
        const overlay = item.querySelector('.video-item-overlay');
        const playButton = item.querySelector('.video-item-play');
        
        if (video) {
            // Add click event to video item
            item.addEventListener('click', function(e) {
                e.preventDefault();
                openVideoModal(video.src, video.alt || `Video ${index + 1}`);
            });
            
            // Add keyboard navigation
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openVideoModal(video.src, video.alt || `Video ${index + 1}`);
                }
            });
            
            // Add play button functionality
            if (playButton) {
                playButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (video.paused) {
                        video.play();
                        playButton.style.display = 'none';
                    } else {
                        video.pause();
                        playButton.style.display = 'flex';
                    }
                });
            }
            
            // Handle video events
            video.addEventListener('play', function() {
                if (playButton) playButton.style.display = 'none';
                item.classList.add('active');
            });
            
            video.addEventListener('pause', function() {
                if (playButton) playButton.style.display = 'flex';
                item.classList.remove('active');
            });
            
            video.addEventListener('ended', function() {
                if (playButton) playButton.style.display = 'flex';
                item.classList.remove('active');
            });
        }
    });
}

function initializeVideoModal() {
    console.log('Setting up video modal...');
    
    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <video controls>
                <source src="" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <button class="video-modal-close" aria-label="Close video">×</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.video-modal-close');
    const modalVideo = modal.querySelector('video');
    
    closeBtn.addEventListener('click', closeVideoModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Store modal reference globally
    window.videoModal = modal;
    window.modalVideo = modalVideo;
}

function openVideoModal(videoSrc, videoTitle) {
    console.log('Opening video modal:', videoSrc);
    
    const modal = window.videoModal;
    const modalVideo = window.modalVideo;
    
    if (modal && modalVideo) {
        // Set video source
        modalVideo.src = videoSrc;
        modalVideo.load();
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Play video when modal opens
        modalVideo.play().catch(e => console.log('Could not autoplay video:', e));
    }
}

function closeVideoModal() {
    console.log('Closing video modal...');
    
    const modal = window.videoModal;
    const modalVideo = window.modalVideo;
    
    if (modal && modalVideo) {
        // Pause video
        modalVideo.pause();
        
        // Hide modal
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear video source after animation
        setTimeout(() => {
            modalVideo.src = '';
        }, 300);
    }
}

function initializeDragScroll() {
    console.log('Setting up drag scroll...');
    
    const videoScroll = document.querySelector('.video-scroll');
    if (!videoScroll) return;
    
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    
    videoScroll.addEventListener('mousedown', function(e) {
        isDragging = true;
        videoScroll.classList.add('dragging');
        startX = e.pageX - videoScroll.offsetLeft;
        scrollLeft = videoScroll.scrollLeft;
    });
    
    videoScroll.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - videoScroll.offsetLeft;
        const walk = (x - startX) * 2;
        videoScroll.scrollLeft = scrollLeft - walk;
    });
    
    videoScroll.addEventListener('mouseup', function() {
        isDragging = false;
        videoScroll.classList.remove('dragging');
    });
    
    videoScroll.addEventListener('mouseleave', function() {
        isDragging = false;
        videoScroll.classList.remove('dragging');
    });
    
    // Touch events for mobile
    videoScroll.addEventListener('touchstart', function(e) {
        isDragging = true;
        videoScroll.classList.add('dragging');
        startX = e.touches[0].pageX - videoScroll.offsetLeft;
        scrollLeft = videoScroll.scrollLeft;
    });
    
    videoScroll.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - videoScroll.offsetLeft;
        const walk = (x - startX) * 2;
        videoScroll.scrollLeft = scrollLeft - walk;
    });
    
    videoScroll.addEventListener('touchend', function() {
        isDragging = false;
        videoScroll.classList.remove('dragging');
    });
}

// Utility function to create video item overlay
function createVideoItemOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'video-item-overlay';
    
    const playButton = document.createElement('button');
    playButton.className = 'video-item-play';
    playButton.setAttribute('aria-label', 'Play video');
    
    overlay.appendChild(playButton);
    return overlay;
}

// Auto-add overlays to video items that don't have them
function addMissingOverlays() {
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        if (!item.querySelector('.video-item-overlay')) {
            const overlay = createVideoItemOverlay();
            item.appendChild(overlay);
        }
    });
}

// Initialize missing overlays after a short delay
setTimeout(addMissingOverlays, 100); 