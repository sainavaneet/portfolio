// Modern News Timeline JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing modern news timeline...');
    
    // Initialize news timeline
    initializeNewsTimeline();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add interactive features
    addInteractiveFeatures();
    
    // Add search functionality
    setTimeout(addSearchFunctionality, 500);
});

function initializeNewsTimeline() {
    console.log('Initializing modern news timeline...');
    
    // Transform existing news items to cards
    transformNewsToCards();
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all news cards
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
        console.log('Observing news card:', index);
        observer.observe(card);
    });
}

function transformNewsToCards() {
    console.log('Transforming news items to cards...');
    
    // Find the news container
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }
    
    // Add section title if it doesn't exist
    if (!newsContainer.querySelector('.news-section-title')) {
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'news-section-title';
        sectionTitle.textContent = '📰 Latest News & Updates';
        newsContainer.insertBefore(sectionTitle, newsContainer.firstChild);
    }
    
    // Process each year section
    const yearSections = document.querySelectorAll('.year-section');
    yearSections.forEach((yearSection, yearIndex) => {
        const yearHeader = yearSection.querySelector('.year-header');
        const yearTitle = yearHeader ? yearHeader.querySelector('.year-title') : null;
        const yearContent = yearSection.querySelector('.year-content');
        
        if (yearTitle && yearContent) {
            const year = yearTitle.textContent;
            console.log('Processing year section:', year);
            
            // Create new year header
            const newYearHeader = document.createElement('div');
            newYearHeader.className = 'year-header';
            newYearHeader.innerHTML = `
                <h3 class="year-title">${year}</h3>
                <span class="year-badge">${year}</span>
            `;
            
            // Create news grid
            const newsGrid = document.createElement('div');
            newsGrid.className = 'news-grid';
            
            // Transform news items to cards
            const newsItems = yearContent.querySelectorAll('.news-item');
            newsItems.forEach((item, index) => {
                const newsCard = createNewsCard(item, yearIndex, index);
                newsGrid.appendChild(newsCard);
            });
            
            // Replace old content with new structure
            yearSection.innerHTML = '';
            yearSection.appendChild(newYearHeader);
            yearSection.appendChild(newsGrid);
        }
    });
}

function createNewsCard(newsItem, yearIndex, itemIndex) {
    const dateElement = newsItem.querySelector('.news-date');
    const contentElement = newsItem.querySelector('.news-content');
    const bulletElement = newsItem.querySelector('.news-bullet');
    
    if (!dateElement || !contentElement) {
        console.error('Missing required elements in news item');
        return document.createElement('div'); // Return empty div as fallback
    }
    
    // Extract date and content
    const dateText = dateElement.textContent.replace(':', '').trim();
    const contentText = contentElement.textContent.trim();
    
    // Determine news type and icon
    const newsType = determineNewsType(contentText);
    const icon = getNewsIcon(newsType);
    
    // Create card
    const card = document.createElement('div');
    card.className = `news-card ${newsType}`;
    card.setAttribute('data-year', yearIndex);
    card.setAttribute('data-index', itemIndex);
    
    card.innerHTML = `
        <div class="news-header">
            <div class="news-date">${dateText}</div>
            <div class="news-icon">${icon}</div>
        </div>
        <div class="news-content">${contentText}</div>
    `;
    
    return card;
}

function determineNewsType(content) {
    const text = content.toLowerCase();
    
    if (text.includes('won') || text.includes('hackathon') || text.includes('🏆')) {
        return 'achievement';
    } else if (text.includes('research') || text.includes('developing') || text.includes('🧠')) {
        return 'research';
    } else if (text.includes('neurips') || text.includes('submitted') || text.includes('📊')) {
        return 'publication';
    } else if (text.includes('journal') || text.includes('📚')) {
        return 'journal';
    } else if (text.includes('conference') || text.includes('nodycon') || text.includes('🎯')) {
        return 'conference';
    } else if (text.includes('company') || text.includes('automated') || text.includes('🔬')) {
        return 'industry';
    } else if (text.includes('harvesting') || text.includes('agriculture') || text.includes('🌾')) {
        return 'agriculture';
    } else if (text.includes('published') || text.includes('📖')) {
        return 'published';
    }
    
    return 'research'; // Default type
}

function getNewsIcon(type) {
    const icons = {
        achievement: '🏆',
        research: '🧠',
        publication: '📊',
        journal: '📚',
        conference: '🎯',
        industry: '🔬',
        agriculture: '🌾',
        published: '📖'
    };
    
    return icons[type] || '📰';
}

function addScrollAnimations() {
    console.log('Adding scroll animations...');
    
    // Add parallax effect to news container
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const newsContainer = document.querySelector('.news-container');
        
        if (newsContainer) {
            const rate = scrolled * -0.3;
            newsContainer.style.transform = `translateY(${rate}px)`;
        }
    });
}

function addInteractiveFeatures() {
    console.log('Adding interactive features...');
    const newsCards = document.querySelectorAll('.news-card');
    console.log('Adding features to news cards:', newsCards.length);
    
    newsCards.forEach((card, index) => {
        console.log('Setting up news card:', index);
        
        // Add click event for more details
        card.addEventListener('click', function(e) {
            showNewsDetails(this, index);
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showNewsDetails(this, index);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            addHoverEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            removeHoverEffect(this);
        });
        
        // Add tabindex for accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'News item');
    });
}

function showNewsDetails(card, index) {
    console.log('Showing details for card:', index);
    
    const dateElement = card.querySelector('.news-date');
    const contentElement = card.querySelector('.news-content');
    
    if (dateElement && contentElement) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'news-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 style="margin: 0; color: #1f2937; font-size: 1.5rem;">${dateElement.textContent}</h3>
                <button onclick="this.closest('.news-modal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280;">×</button>
            </div>
            <p style="margin: 0; line-height: 1.6; color: #374151; font-size: 1.1rem;">${contentElement.textContent}</p>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeModal);
            }
        });
        
        // Auto-close after 8 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 8000);
    }
}

function addHoverEffect(card) {
    // Add a subtle glow effect
    card.style.boxShadow = '0 16px 50px rgba(0,0,0,0.2)';
    card.style.transform = 'translateY(-12px) scale(1.02)';
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
        border-radius: 16px;
        animation: ripple 0.8s ease-out;
        pointer-events: none;
    `;
    
    card.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 800);
}

function removeHoverEffect(card) {
    card.style.boxShadow = '';
    card.style.transform = '';
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.9); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
    }
    
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
    
    .news-modal {
        cursor: pointer;
    }
    
    .modal-content {
        cursor: default;
    }
    
    .modal-content button:hover {
        color: #1f2937 !important;
    }
`;
document.head.appendChild(style);

// Add search/filter functionality
function addSearchFunctionality() {
    console.log('Adding search functionality...');
    
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        text-align: center;
        margin: 2rem 0;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search news...';
    searchInput.className = 'news-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 25px;
        font-size: 16px;
        transition: all 0.3s ease;
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    `;
    
    const newsContainer = document.querySelector('.news-container');
    if (newsContainer) {
        searchContainer.appendChild(searchInput);
        newsContainer.parentNode.insertBefore(searchContainer, newsContainer);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const newsCards = document.querySelectorAll('.news-card');
            
            newsCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0.3';
                    card.style.transform = 'scale(0.95)';
                }
            });
            
            // Highlight search term
            if (searchTerm.length > 0) {
                highlightSearchTerm(searchTerm);
            } else {
                removeHighlight();
            }
        });
        
        // Add focus effects
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#e5e7eb';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
    }
}

function highlightSearchTerm(term) {
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        const content = card.querySelector('.news-content');
        if (content) {
            const text = content.textContent;
            const highlightedText = text.replace(
                new RegExp(term, 'gi'),
                match => `<mark style="background: #fef3c7; padding: 2px 4px; border-radius: 4px;">${match}</mark>`
            );
            content.innerHTML = highlightedText;
        }
    });
}

function removeHighlight() {
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        const content = card.querySelector('.news-content');
        if (content) {
            const marks = content.querySelectorAll('mark');
            marks.forEach(mark => {
                mark.outerHTML = mark.textContent;
            });
        }
    });
}
