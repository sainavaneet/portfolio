// Modern News Timeline JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing modern news timeline...');
    
    // Initialize collapsible year sections
    initializeCollapsibleYears();
    
    // Add interactive features for news cards
    addInteractiveFeatures();
});

function initializeCollapsibleYears() {
    console.log('Initializing collapsible year sections...');
    
    const yearHeaders = document.querySelectorAll('.year-header');
    console.log('Found year headers:', yearHeaders.length);
    
    yearHeaders.forEach((header, index) => {
        console.log('Setting up year header:', index);
        
        // Add click event for year header
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleYearSection(this);
        });
        
        // Add keyboard navigation
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleYearSection(this);
            }
        });
        
        // Set initial state (expanded by default)
        const newsGrid = header.nextElementSibling;
        if (newsGrid && newsGrid.classList.contains('news-grid')) {
            newsGrid.classList.add('expanded');
            header.classList.remove('collapsed');
            header.setAttribute('aria-expanded', 'true');
        }
    });
}

function toggleYearSection(header) {
    console.log('Toggling year section...');
    
    const yearSection = header.closest('.year-section');
    if (yearSection) {
        const newsGrid = yearSection.querySelector('.news-grid');
        if (newsGrid) {
            const isCollapsed = newsGrid.classList.contains('collapsed');
            console.log('Current state - collapsed:', isCollapsed);
            
            if (isCollapsed) {
                // Expand the section
                console.log('Expanding section...');
                newsGrid.classList.remove('collapsed');
                newsGrid.classList.add('expanded');
                header.classList.remove('collapsed');
                header.setAttribute('aria-expanded', 'true');
                
                // Animate the cards in
                const cards = newsGrid.querySelectorAll('.news-card');
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                });
            } else {
                // Collapse the section
                console.log('Collapsing section...');
                newsGrid.classList.remove('expanded');
                newsGrid.classList.add('collapsed');
                header.classList.add('collapsed');
                header.setAttribute('aria-expanded', 'false');
            }
        }
    }
}

function addInteractiveFeatures() {
    console.log('Adding interactive features for news cards...');
    const newsCards = document.querySelectorAll('.news-card');
    console.log('Found news cards:', newsCards.length);
    
    newsCards.forEach((card, index) => {
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
    }
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
