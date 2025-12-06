// Modern News Timeline JavaScript

// Load and apply saved theme preference immediately (before DOMContentLoaded)
(function() {
    try {
        const savedTheme = localStorage.getItem('theme') || localStorage.getItem('sphinx-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.documentElement.setAttribute('data-bs-theme', savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('theme-dark', 'dark');
                document.body.classList.add('dark');
            } else {
                document.documentElement.classList.remove('theme-dark', 'dark');
                document.body.classList.remove('dark');
            }
        }
    } catch (e) {
        console.log('Could not load theme preference');
    }
})();

// Custom Cursor
function initializeCustomCursor() {
    // Create circle element if it doesn't exist
    let circleElement = document.querySelector('.circle');
    if (!circleElement) {
        circleElement = document.createElement('div');
        circleElement.className = 'circle';
        document.body.appendChild(circleElement);
    }

    // Create objects to track mouse position and custom cursor position
    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };

    // Initialize variables to track scaling and rotation
    let currentScale = 0;
    let currentAngle = 0;

    // Update mouse position on the 'mousemove' event
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
    const speed = 0.17;

    // Start animation
    const tick = () => {
        // MOVE
        // Calculate circle movement based on mouse position and smoothing
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;

        // Create a transformation string for cursor translation
        const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

        // SQUEEZE
        // 1. Calculate the change in mouse position (deltaMouse)
        const deltaMouseX = mouse.x - previousMouse.x;
        const deltaMouseY = mouse.y - previousMouse.y;

        // Update previous mouse position for the next frame
        previousMouse.x = mouse.x;
        previousMouse.y = mouse.y;

        // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
        const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150);

        // 3. Convert mouse velocity to a value in the range [0, 0.5]
        const scaleValue = (mouseVelocity / 150) * 0.5;

        // 4. Smoothly update the current scale
        currentScale += (scaleValue - currentScale) * speed;

        // 5. Create a transformation string for scaling
        const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

        // ROTATE
        // 1. Calculate the angle using the atan2 function
        const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

        // 2. Check for a threshold to reduce shakiness at low mouse velocity
        if (mouseVelocity > 20) {
            currentAngle = angle;
        }

        // 3. Create a transformation string for rotation
        const rotateTransform = `rotate(${currentAngle}deg)`;

        // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
        circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

        // Request the next frame to continue the animation
        window.requestAnimationFrame(tick);
    };

    // Start the animation loop
    tick();
}

// Trail Cursor (Canvas-based)
function initializeTrailCursor() {
    // Create canvas element if it doesn't exist
    let canvas = document.querySelector('canvas.cursor-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'cursor-canvas';
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    
    // For intro motion
    let mouseMoved = false;
    
    const pointer = {
        x: 0.5 * window.innerWidth,
        y: 0.5 * window.innerHeight,
    };
    
    const params = {
        pointsNumber: 15,
        widthFactor: 0.15,
        mouseThreshold: 0.6,
        spring: 0.4,
        friction: 0.5
    };
    
    const trail = new Array(params.pointsNumber);
    for (let i = 0; i < params.pointsNumber; i++) {
        trail[i] = {
            x: pointer.x,
            y: pointer.y,
            dx: 0,
            dy: 0,
        };
    }
    
    window.addEventListener("click", e => {
        updateMousePosition(e.clientX, e.clientY);
    });
    
    window.addEventListener("mousemove", e => {
        mouseMoved = true;
        updateMousePosition(e.clientX, e.clientY);
    });
    
    window.addEventListener("touchmove", e => {
        mouseMoved = true;
        updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    });
    
    window.addEventListener("scroll", () => {
        // Update pointer position on scroll to prevent disappearing
        if (mouseMoved) {
            const rect = canvas.getBoundingClientRect();
            pointer.x = rect.left + (rect.width / 2);
            pointer.y = rect.top + (rect.height / 2);
        }
    });
    
    function updateMousePosition(eX, eY) {
        pointer.x = eX;
        pointer.y = eY;
    }
    
    setupCanvas();
    update(0);
    window.addEventListener("resize", setupCanvas);
    
    function update(t) {
        // For intro motion - make it smaller and less dramatic
        if (!mouseMoved) {
            pointer.x = (0.5 + 0.1 * Math.cos(0.002 * t) * (Math.sin(0.005 * t))) * window.innerWidth;
            pointer.y = (0.5 + 0.1 * (Math.cos(0.005 * t)) + 0.05 * Math.cos(0.01 * t)) * window.innerHeight;
        }
        
        // Get current theme color - make it more visible on both backgrounds
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || 
                      document.documentElement.classList.contains('dark') ||
                      document.documentElement.classList.contains('theme-dark');
        const strokeColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        trail.forEach((p, pIdx) => {
            const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
            const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
            
            p.dx += (prev.x - p.x) * spring;
            p.dy += (prev.y - p.y) * spring;
            p.dx *= params.friction;
            p.dy *= params.friction;
            p.x += p.dx;
            p.y += p.dy;
        });
        
        ctx.strokeStyle = strokeColor;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        
        for (let i = 1; i < trail.length - 1; i++) {
            const xc = 0.5 * (trail[i].x + trail[i + 1].x);
            const yc = 0.5 * (trail[i].y + trail[i + 1].y);
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
            // Reduce line width with maximum limit - prevent it from getting too thick
            const calculatedWidth = params.widthFactor * (params.pointsNumber - i) * 0.5;
            ctx.lineWidth = Math.min(Math.max(1, calculatedWidth), 3); // Max 3px width
            ctx.stroke();
        }
        
        ctx.lineWidth = 1;
        ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
        ctx.stroke();
        
        window.requestAnimationFrame(update);
    }
    
    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing modern news timeline...');
    
    // Initialize custom cursor (circle)
    initializeCustomCursor();
    
    // Initialize trail cursor (canvas-based) - disabled
    // initializeTrailCursor();
    
    // Apply saved theme after DOM is ready (in case theme JS loads after)
    setTimeout(function() {
        try {
            const savedTheme = localStorage.getItem('theme') || localStorage.getItem('sphinx-theme');
            if (savedTheme) {
                // Try to find and click the theme's built-in toggle if needed
                const themeToggle = document.querySelector('.theme-switch-button, [data-bs-theme], button[aria-label*="theme" i]');
                if (themeToggle) {
                    const currentTheme = getCurrentTheme();
                    if (currentTheme !== savedTheme) {
                        themeToggle.click();
                    }
                }
            }
        } catch (e) {
            console.log('Could not sync with theme toggle');
        }
    }, 100);
    
    // Initialize top navigation bar
    initializeTopNavbar();
    
    // Initialize collapsible year sections
    initializeCollapsibleYears();
    
    // Add interactive features for news cards
    addInteractiveFeatures();
    
    // Initialize video carousel
    initializeVideoCarousel();
});

function initializeTopNavbar() {
    console.log('Initializing top navigation bar...');
    
    // Calculate relative path to root
    // Get the directory depth from current path
    const locationPath = window.location.pathname;
    // Remove leading/trailing slashes and split, filter out empty and index.html
    const pathParts = locationPath.split('/').filter(p => p && p !== 'index.html');
    // Count directories - this is how many levels up we need to go
    const depth = pathParts.length;
    
    // For GitHub Pages, use absolute paths from root
    // Detect if we're on GitHub Pages (github.io domain)
    const isGitHubPages = window.location.hostname.includes('github.io');
    let rootPath;
    
    if (isGitHubPages) {
        // Use absolute paths from the root of the GitHub Pages site
        // Check the full pathname to detect repo name
        const fullPath = window.location.pathname;
        
        // First, check if path starts with /portfolio/
        if (fullPath.startsWith('/portfolio/')) {
            rootPath = '/portfolio/';
        } else {
            // Try to extract repo name from path
            const repoMatch = fullPath.match(/^\/([^\/]+)\//);
            if (repoMatch && repoMatch[1] !== 'source' && repoMatch[1] !== 'index.html' && 
                !repoMatch[1].endsWith('.html')) {
                // Repo name is in the path (e.g., /portfolio/source/...)
                rootPath = `/${repoMatch[1]}/`;
            } else if (pathParts.length > 0 && pathParts[0] !== 'source' && 
                       !['index.html', 'index', ''].includes(pathParts[0]) &&
                       !pathParts[0].endsWith('.html')) {
                // Check pathParts as fallback
                rootPath = `/${pathParts[0]}/`;
            } else {
                // Default to 'portfolio' for project sites
                // If we're at root or can't detect, assume it's a project site
                rootPath = '/portfolio/';
            }
        }
    } else {
        // Local development - use relative paths
        rootPath = depth > 0 ? '../'.repeat(depth) : './';
    }
    
    console.log('Current path:', locationPath, 'Path parts:', pathParts, 'Depth:', depth, 'Root path:', rootPath, 'Is GitHub Pages:', isGitHubPages);
    
    // Check current theme
    const getCurrentTheme = () => {
        if (document.documentElement.hasAttribute('data-theme')) {
            return document.documentElement.getAttribute('data-theme');
        }
        // Check for other theme classes
        if (document.documentElement.classList.contains('theme-dark') || 
            document.documentElement.classList.contains('dark')) {
            return 'dark';
        }
        return 'light';
    };
    
    const isDarkMode = getCurrentTheme() === 'dark';
    const themeIcon = isDarkMode ? '☀️' : '🌙';
    
    // Create navbar HTML structure
    const navbar = document.createElement('nav');
    navbar.className = 'top-navbar';
    navbar.innerHTML = `
        <div class="navbar-container">
            <a href="${rootPath}index.html" class="navbar-brand">Navaneet</a>
            <button class="navbar-toggle" aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="navbar-menu">
                <li><a href="${rootPath}index.html">Home</a></li>
                <li><a href="${rootPath}source/Resume/index.html">Resume</a></li>
                <li><a href="${rootPath}source/projects/index.html">Projects</a></li>
                <li><a href="${rootPath}source/experience/index.html">Experience</a></li>
                <li><a href="${rootPath}source/publications/index.html">Publications</a></li>
                <li><a href="${rootPath}source/Blog/Bluetooth/index.html">Blog</a></li>
                <li><a href="${rootPath}source/Contact/index.html">Contact</a></li>
            </ul>
            <div class="navbar-right-icons">
                <a href="https://github.com/sainavaneet" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub" title="GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/sainavaneet76/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn" title="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>
                <button class="dark-mode-toggle" aria-label="Toggle dark mode" title="Toggle dark/light mode">
                    ${themeIcon}
                </button>
            </div>
        </div>
    `;
    
    // Insert navbar after the header
    const header = document.querySelector('.bd-header');
    if (header) {
        header.parentNode.insertBefore(navbar, header.nextSibling);
    } else {
        const main = document.querySelector('.bd-main') || document.querySelector('main');
        if (main) {
            main.parentNode.insertBefore(navbar, main);
        } else {
            document.body.insertBefore(navbar, document.body.firstChild);
        }
    }
    
    // Highlight active menu item based on current page
    const currentPagePath = window.location.pathname.toLowerCase();
    const menuLinks = navbar.querySelectorAll('.navbar-menu a');
    
    // Helper to get the actual resolved path from a relative href
    function getResolvedPath(href) {
        try {
            const url = new URL(href, window.location.href);
            return url.pathname.toLowerCase();
        } catch (e) {
            // Fallback: resolve relative path manually
            const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
            const resolved = new URL(href, window.location.origin + basePath).pathname.toLowerCase();
            return resolved;
        }
    }
    
    // Normalize path for comparison (remove index.html, trailing slashes)
    function normalizeForComparison(path) {
        return path
            .replace(/\/index\.html$/, '')
            .replace(/\/index$/, '')
            .replace(/\/$/, '')
            .replace(/^\/+/, '/');
    }
    
    const normalizedCurrentPath = normalizeForComparison(currentPagePath);
    
    // Determine which section we're in
    let activeSection = null;
    
    if (normalizedCurrentPath === '' || normalizedCurrentPath === '/' || normalizedCurrentPath.endsWith('/index')) {
        activeSection = 'home';
    } else if (normalizedCurrentPath.includes('/source/resume/') || normalizedCurrentPath.includes('/resume')) {
        activeSection = 'resume';
    } else if (normalizedCurrentPath.includes('/source/projects/') || normalizedCurrentPath.includes('/projects')) {
        activeSection = 'projects';
    } else if (normalizedCurrentPath.includes('/source/experience/') || normalizedCurrentPath.includes('/experience')) {
        activeSection = 'experience';
    } else if (normalizedCurrentPath.includes('/source/publications/') || normalizedCurrentPath.includes('/publications')) {
        activeSection = 'publications';
    } else if (normalizedCurrentPath.includes('/source/blog/') || normalizedCurrentPath.includes('/blog') || normalizedCurrentPath.includes('/bluetooth')) {
        activeSection = 'blog';
    } else if (normalizedCurrentPath.includes('/source/contact/') || normalizedCurrentPath.includes('/contact')) {
        activeSection = 'contact';
    }
    
    // Now check each link and mark only the matching one as active
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const resolvedLinkPath = getResolvedPath(linkHref);
        const normalizedLinkPath = normalizeForComparison(resolvedLinkPath);
        
        let isActive = false;
        
        if (activeSection === 'home') {
            // Only home link should be active
            isActive = (normalizedLinkPath === '' || normalizedLinkPath === '/' || normalizedLinkPath.endsWith('/index') || 
                       linkHref.includes('index.html') && !linkHref.includes('source/'));
        } else if (activeSection === 'resume') {
            isActive = normalizedLinkPath.includes('/resume') || linkHref.includes('resume');
        } else if (activeSection === 'projects') {
            isActive = normalizedLinkPath.includes('/projects') || linkHref.includes('projects');
        } else if (activeSection === 'experience') {
            isActive = normalizedLinkPath.includes('/experience') || linkHref.includes('experience');
        } else if (activeSection === 'publications') {
            isActive = normalizedLinkPath.includes('/publications') || linkHref.includes('publications');
        } else if (activeSection === 'blog') {
            isActive = normalizedLinkPath.includes('/blog') || normalizedLinkPath.includes('/bluetooth') || 
                      linkHref.includes('blog') || linkHref.includes('bluetooth');
        } else if (activeSection === 'contact') {
            isActive = normalizedLinkPath.includes('/contact') || linkHref.includes('contact');
        }
        
        // Only add active class if this is the matching link
        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Mobile menu toggle functionality
    const menuToggle = navbar.querySelector('.navbar-toggle');
    const menu = navbar.querySelector('.navbar-menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 968) {
                    menuToggle.classList.remove('active');
                    menu.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 968 && 
                !navbar.contains(event.target) && 
                menu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });
        
        // Close menu on window resize if it becomes desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 968) {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }
    
    // Dark mode toggle functionality
    const darkModeToggle = navbar.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        // Function to toggle theme
        function toggleTheme() {
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Try multiple methods to trigger theme change
            let themeChanged = false;
            
            // Method 1: Try to find and trigger sphinx-book-theme's built-in theme toggle
            const themeToggleButton = document.querySelector('.theme-switch-button, button[aria-label*="theme" i], .bd-header button[type="button"]');
            if (themeToggleButton && !themeChanged) {
                try {
                    themeToggleButton.click();
                    themeChanged = true;
                } catch (e) {
                    console.log('Could not click theme toggle button');
                }
            }
            
            // Method 2: Try to trigger via data attribute change
            if (!themeChanged) {
                // Set multiple theme attributes
                document.documentElement.setAttribute('data-theme', newTheme);
                document.documentElement.setAttribute('data-bs-theme', newTheme);
                
                // Apply classes to both html and body
                if (newTheme === 'dark') {
                    document.documentElement.classList.add('theme-dark', 'dark');
                    document.body.classList.add('dark', 'theme-dark');
                } else {
                    document.documentElement.classList.remove('theme-dark', 'dark');
                    document.body.classList.remove('dark', 'theme-dark');
                }
                
                // Trigger a custom event for theme change
                window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
                themeChanged = true;
            }
            
            // Update icon after a short delay to ensure theme has changed
            setTimeout(function() {
                const actualTheme = getCurrentTheme();
                darkModeToggle.textContent = actualTheme === 'dark' ? '☀️' : '🌙';
            }, 100);
            
            // Save preference to localStorage
            try {
                localStorage.setItem('theme', newTheme);
                localStorage.setItem('sphinx-theme', newTheme);
            } catch (e) {
                console.log('Could not save theme preference');
            }
        }
        
        darkModeToggle.addEventListener('click', toggleTheme);
        
        // Ensure toggle button icon matches current theme (already loaded above)
        const currentTheme = getCurrentTheme();
        darkModeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
}

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
        
        // Always expand all sections by default
        const newsGrid = header.nextElementSibling;
        if (newsGrid && newsGrid.classList.contains('news-grid')) {
            newsGrid.classList.add('expanded');
            newsGrid.classList.remove('collapsed');
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
        // Add click event for navigation
        card.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToNewsLink(this);
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToNewsLink(this);
            }
        });
        
        // Add tabindex for accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'News item - click to visit related link');
        
        // Add visual feedback for clickable cards
        if (card.hasAttribute('data-link')) {
            card.style.cursor = 'pointer';
            card.title = 'Click to visit related link';
        }
    });
}

function navigateToNewsLink(card) {
    console.log('Navigating to news link...');
    
    const link = card.getAttribute('data-link');
    if (link) {
        console.log('Opening link:', link);
        // Open link in new tab
        window.open(link, '_blank', 'noopener,noreferrer');
        
        // Add visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    } else {
        console.log('No link found for this card');
        // Fallback to modal if no link is provided
        showNewsDetails(card, 0);
    }
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
    
    .news-card[data-link] {
        transition: transform 0.15s ease;
    }
    
    .news-card[data-link]:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

// Video Carousel Functions
function initializeVideoCarousel() {
    console.log('Initializing video carousel...');
    
    // Set initial state
    window.currentVideo = 0;
    window.videoPairs = document.querySelectorAll('.video-carousel .video-pair');
    
    console.log('Found video pairs:', window.videoPairs.length);
    
    // Set up initial active video pair
    if (window.videoPairs.length > 0) {
        window.videoPairs.forEach((pair, index) => {
            pair.classList.remove('active');
            if (index === 0) {
                pair.classList.add('active');
            }
        });
    }
}

function changeVideo(direction) {
    console.log('Changing video, direction:', direction);
    
    if (!window.videoPairs || window.videoPairs.length === 0) {
        console.log('No video pairs found');
        return;
    }
    
    // Remove active class from current video pair
    window.videoPairs[window.currentVideo].classList.remove('active');
    
    // Calculate new video index
    window.currentVideo += direction;
    
    // Handle wrapping
    if (window.currentVideo >= window.videoPairs.length) {
        window.currentVideo = 0;
    } else if (window.currentVideo < 0) {
        window.currentVideo = window.videoPairs.length - 1;
    }
    
    // Add active class to new video pair
    window.videoPairs[window.currentVideo].classList.add('active');
    
    // Update autoplay for the new active pair
    updateVideoAutoplay();
    
    console.log('Current video pair index:', window.currentVideo);
}

function updateVideoAutoplay() {
    // Get all video pairs
    const videoPairs = document.querySelectorAll('.video-pair');
    
    videoPairs.forEach((pair, index) => {
        const iframes = pair.querySelectorAll('iframe');
        
        iframes.forEach(iframe => {
            const currentSrc = iframe.src;
            
            if (pair.classList.contains('active')) {
                // For active pair, enable autoplay
                iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1');
            } else {
                // For inactive pairs, disable autoplay
                iframe.src = currentSrc.replace('autoplay=1', 'autoplay=0');
            }
        });
    });
}
