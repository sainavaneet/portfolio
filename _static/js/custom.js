// Modern News Timeline JavaScript

// Force DARK theme always (graphify-style redesign)
(function() {
    try {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        document.documentElement.classList.add('graphify');
        document.body && document.body.classList.add('graphify');
        localStorage.setItem('theme', 'dark');
        localStorage.setItem('sphinx-theme', 'dark');
    } catch (e) {
        console.log('Could not set dark theme');
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

    // Detect Safari browser
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // Create objects to track mouse position and custom cursor position
    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };

    // Initialize variables to track scaling and rotation
    let currentScale = 0;
    let currentAngle = 0;

    // Get browser zoom level (Safari-specific handling)
    function getZoomLevel() {
        if (isSafari) {
            // Safari zoom detection
            const rect = document.body.getBoundingClientRect();
            return window.outerWidth / window.innerWidth;
        }
        return window.devicePixelRatio || 1;
    }

    // Update mouse position on the 'mousemove' event
    window.addEventListener('mousemove', (e) => {
        // Use clientX/clientY for better Safari compatibility, especially with zoom
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
    const speed = 0.17;

    // Start animation
    const tick = () => {
        // MOVE
        // Calculate circle movement based on mouse position and smoothing
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;

        // For Safari, use simpler transform that works better with zoom
        let translateTransform;
        if (isSafari) {
            // Safari: Use translate with explicit pixel values, accounting for zoom
            const circleSize = parseFloat(getComputedStyle(circleElement).getPropertyValue('--circle-size')) || 35;
            const halfSize = circleSize / 2;
            translateTransform = `translate3d(${circle.x - halfSize}px, ${circle.y - halfSize}px, 0)`;
        } else {
            // Other browsers: Use centered transform
            translateTransform = `translate3d(${circle.x}px, ${circle.y}px, 0) translate(-50%, -50%)`;
        }

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

        // Apply all transformations to the circle element
        // For Safari: translate -> rotate -> scale
        // For others: translate -> rotate -> scale (with translate centering)
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
        
        // Always use light theme colors
        const strokeColor = 'rgba(0, 0, 0, 0.8)';
        
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
    
    // Initialize custom cursor (circle) - disabled
    // initializeCustomCursor();
    
    // Initialize trail cursor (canvas-based) - disabled
    // initializeTrailCursor();
    
    // Hide any existing custom cursor elements
    const circleElement = document.querySelector('.circle');
    if (circleElement) {
        circleElement.style.display = 'none';
    }
    
    // Force light theme after DOM is ready
    setTimeout(function() {
        try {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            document.documentElement.classList.add('graphify');
            document.body && document.body.classList.add('graphify');
            localStorage.setItem('theme', 'dark');
            localStorage.setItem('sphinx-theme', 'dark');
        } catch (e) {
            console.log('Could not set dark theme');
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
    
    // Initialize experience page
    initializeExperiencePage();
    
    // Initialize projects page
    initializeProjectsPage();

    // --- Home page v2 (premium animated) ---
    initScrollProgress();
    initScrollReveal();
    initStatCounters();
    initGraphifyCursor();
    // Synchronous, light: navbar highlight, back/forward arrows, detail decor.
    initNavbarActive();
    initExternalLinkArrows();
    initDetailPageDecor();
    initScrollToTop();
    initChangelogLinks();
    initProjectFilter();
    initImagePerformance();

    // Deferred to next idle frame so initial paint isn't blocked.
    const idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 200); };
    idle(function () {
        decodeHeroName();
        initAvatarParallax();
        runTerminalLoop();
        initLiveGithubStars();
    });
    // Disabled for graphify aesthetic — cards stay flat with border-color hover only.
    // initMagneticCards();
    // initCardSpotlight();

    // Continuously enforce dark theme (graphify redesign)
    setInterval(function() {
        try {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme !== 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                localStorage.setItem('sphinx-theme', 'dark');
            }
        } catch (e) {
            // Silently handle errors
        }
    }, 800);

    // Watch for theme attribute changes — re-pin to dark
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' &&
                (mutation.attributeName === 'data-theme' || mutation.attributeName === 'data-bs-theme')) {
                const theme = document.documentElement.getAttribute('data-theme');
                if (theme !== 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.setAttribute('data-bs-theme', 'dark');
                }
            }
        });
    });

    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'data-bs-theme', 'class']
    });
    
    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
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
                // Try to extract repo name from hostname for project pages
                // Format: username.github.io/repo-name or repo-name.github.io
                const hostnameParts = window.location.hostname.split('.');
                if (hostnameParts.length === 3 && hostnameParts[1] === 'github' && hostnameParts[2] === 'io') {
                    // Project page: repo-name.github.io - root is at /
                    rootPath = '/';
                } else if (hostnameParts.length === 4 && hostnameParts[2] === 'github' && hostnameParts[3] === 'io') {
                    // User/org page: username.github.io
                    // Check if we're at root or in a subdirectory
                    if (fullPath === '/' || fullPath === '/index.html') {
                        // At root of user page
                        rootPath = '/';
                    } else {
                        // In a subdirectory - try to use root as fallback
                        // This handles cases where repo detection failed but we're on a user page
                        rootPath = '/';
                        console.warn('Could not detect repository name from path, defaulting to root. If navigation is broken, the site may be served from a subdirectory.');
                    }
                } else {
                    // If we're at root or can't detect, use root as safe fallback
                    // This works for both user pages and project pages at root
                    rootPath = '/';
                    console.warn('Could not detect repository name, defaulting to root path. If navigation is broken, check the repository structure.');
                }
            }
        }
    } else {
        // Local development - use relative paths
        rootPath = depth > 0 ? '../'.repeat(depth) : './';
    }
    
    console.log('Current path:', locationPath, 'Path parts:', pathParts, 'Depth:', depth, 'Root path:', rootPath, 'Is GitHub Pages:', isGitHubPages);
    
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
                <li><a href="${rootPath}source/Blog/index.html">Blog</a></li>
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
    
    // Ensure light theme is always enforced
    try {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        document.documentElement.classList.remove('theme-dark', 'dark');
        document.body.classList.remove('dark', 'theme-dark');
        localStorage.setItem('theme', 'light');
        localStorage.setItem('sphinx-theme', 'light');
    } catch (e) {
        console.log('Could not enforce light theme');
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

// ============================================
// Projects Page JavaScript
// ============================================

function initializeProjectsPage() {
    console.log('Initializing projects page...');
    
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) {
        // Projects page not loaded, skip initialization
        return;
    }
    
    // Minimal style - no animations needed
    // Cards are visible by default
}

// ============================================
// Experience Page JavaScript
// ============================================

function initializeExperiencePage() {
    console.log('Initializing experience page...');
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const certCards = document.querySelectorAll('.cert-card');
    
    if (filterButtons.length === 0) {
        // Experience page not loaded, skip initialization
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter timeline items
            timelineItems.forEach(item => {
                const itemType = item.getAttribute('data-type');
                if (filter === 'all' || filter === 'experience' || filter === 'education') {
                    if (filter === 'all') {
                        item.classList.remove('hidden');
                    } else if (filter === 'experience' && itemType === 'experience') {
                        item.classList.remove('hidden');
                    } else if (filter === 'education' && itemType === 'education') {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Filter certification cards
            certCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (filter === 'all' || filter === 'certification') {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                    } else if (filter === 'certification' && cardType === 'certification') {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all timeline items and cert cards
    timelineItems.forEach(item => observer.observe(item));
    certCards.forEach(card => observer.observe(card));
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================================
// HOME PAGE V2 — premium animated helpers
// ============================================================

function _prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Top scroll-progress bar — updates --scroll CSS variable.
function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress__bar');
    if (!bar) return;
    if (_prefersReducedMotion()) { bar.style.transform = 'scaleX(1)'; return; }

    let ticking = false;
    function update() {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        bar.style.setProperty('--scroll', pct.toFixed(4));
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    update();
}

// Generic IntersectionObserver-driven reveal for any element with [data-reveal].
function initScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (_prefersReducedMotion() || !('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('reveal--in'));
        return;
    }

    const cardLikeStagger = new WeakMap();
    // Compute per-element delay if not specified (cascade based on order within parent).
    targets.forEach(el => {
        if (el.dataset.revealDelay) return;
        const parent = el.parentElement;
        if (!parent) return;
        const siblings = Array.from(parent.querySelectorAll(':scope > [data-reveal]'));
        const idx = siblings.indexOf(el);
        if (idx >= 0 && siblings.length > 1) {
            cardLikeStagger.set(el, idx * 60);
        }
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = parseInt(el.dataset.revealDelay || cardLikeStagger.get(el) || 0, 10);
            if (delay > 0) {
                el.style.transitionDelay = delay + 'ms';
            }
            // Defer a tick to ensure transition starts after delay assignment.
            requestAnimationFrame(() => el.classList.add('reveal--in'));
            io.unobserve(el);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(el => io.observe(el));
}

// Stat counters: animate [data-count] number from 0 to target the first time it scrolls in.
function initStatCounters() {
    const nums = document.querySelectorAll('.stat-num[data-count]');
    if (!nums.length) return;

    if (_prefersReducedMotion() || !('IntersectionObserver' in window)) {
        nums.forEach(n => { n.textContent = n.dataset.count; });
        return;
    }

    function animateTo(el, target) {
        const duration = 900;
        const start = performance.now();
        function tick(t) {
            const p = Math.min(1, (t - start) / duration);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased).toString();
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target.toString();
        }
        requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            if (isNaN(target)) return;
            animateTo(el, target);
            io.unobserve(el);
        });
    }, { threshold: 0.5 });

    nums.forEach(n => io.observe(n));
}

// Click-ripple animation only (native cursor stays).
function initGraphifyCursor() {
    if (_prefersReducedMotion()) return;
    if ('ontouchstart' in window) return;

    window.addEventListener('pointerdown', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        // Suppress the ripple inside the terminal so it stays "dead".
        if (e.target && e.target.closest && e.target.closest('.terminal-window')) return;

        // Outer expanding ring
        const r = document.createElement('div');
        r.className = 'gp-cursor-ripple';
        r.style.left = e.clientX + 'px';
        r.style.top  = e.clientY + 'px';
        document.body.appendChild(r);
        setTimeout(function () { r.remove(); }, 700);

        // Inner amber flash
        const f = document.createElement('div');
        f.className = 'gp-cursor-flash';
        f.style.left = e.clientX + 'px';
        f.style.top  = e.clientY + 'px';
        document.body.appendChild(f);
        setTimeout(function () { f.remove(); }, 500);
    }, { passive: true });
}

// Cursor-following spotlight glow on news cards (uses CSS vars).
function initCardSpotlight() {
    if (_prefersReducedMotion()) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 100;
            const my = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', mx.toFixed(1) + '%');
            card.style.setProperty('--my', my.toFixed(1) + '%');
        });
    });
}

// Subtle 3D tilt on news cards (cursor-tracked, max ±4°, only on wide viewports).
function initMagneticCards() {
    if (_prefersReducedMotion()) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
        let rafId = null;
        card.style.transformStyle = 'preserve-3d';
        card.style.willChange = 'transform';

        function onMove(e) {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;  // 0..1
            const y = (e.clientY - rect.top) / rect.height;
            const rotY = (x - 0.5) * 8;   // ±4°
            const rotX = (0.5 - y) * 8;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                card.style.transform =
                    `perspective(700px) translateY(-3px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
            });
        }
        function reset() {
            if (rafId) cancelAnimationFrame(rafId);
            card.style.transform = '';
        }
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', reset);
        card.addEventListener('pointercancel', reset);
    });
}

// Graphify-style "decode" hero text — scrambled Unicode glyphs resolve into real text.
function decodeHeroName() {
    if (_prefersReducedMotion()) return;
    const words = document.querySelectorAll('.hero-name .hero-word');
    if (!words.length) return;

    const CHARS = 'ΨΩΣ∇λπ∀∃ΔΦΘΞΛΣ01▓░▄▀█◆◇▲▼';
    const totalMs = 1100;
    const fps = 50; // ms between frames (~20 fps)
    const frames = Math.round(totalMs / fps);

    function rand(text) {
        return text.split('').map(c => (c === ' ' || c === '\n') ? c : CHARS[(Math.random() * CHARS.length) | 0]).join('');
    }

    words.forEach((el, wi) => {
        const realText = el.textContent;
        // Mark the real text on the parent for accessibility (the h1 already has aria-label).
        el.dataset.real = realText;
        // Scramble immediately so the first paint shows random glyphs, not the actual name.
        el.textContent = rand(realText);

        const startDelay = 260 + wi * 230;
        setTimeout(() => {
            let f = 0;
            const iv = setInterval(() => {
                const p = f / frames;
                el.textContent = realText.split('').map((c, i) => {
                    if (c === ' ' || c === '\n') return c;
                    // Reveal characters left-to-right based on progress.
                    if (i / realText.length < p * 1.4) return c;
                    return CHARS[(Math.random() * CHARS.length) | 0];
                }).join('');
                f++;
                if (f >= frames) {
                    el.textContent = realText;
                    clearInterval(iv);
                }
            }, fps);
        }, startDelay);
    });
}

// Auto-append ↗ arrow on external links in the article body.
function initExternalLinkArrows() {
    const article = document.querySelector('.bd-article');
    if (!article) return;
    const links = article.querySelectorAll('a[href^="http"]');
    links.forEach(a => {
        try {
            // Skip if already styled (badges, buttons, status pills, internal-only routes, or already has arrow).
            if (a.matches('.live-badge, .btn-ghost, .resume-cta, .proj-pill, .resume-open, .nav-link, .pst-navbar-icon')) return;
            if (a.dataset.noArrow === 'true') return;
            if (a.querySelector('img, svg')) return;
            const text = (a.textContent || '').trim();
            if (text.endsWith('↗') || text.endsWith('→')) return;
            // Same-origin links don't need the arrow either
            const url = new URL(a.href, window.location.href);
            if (url.host === window.location.host) return;
            // Set target so external links open in a new tab
            if (!a.target) a.target = '_blank';
            if (!a.rel) a.rel = 'noopener';
            a.classList.add('has-ext-arrow');
        } catch (e) { /* ignore malformed URLs */ }
    });
}

// Live GitHub stars — fetch user repos and sum stargazers; inject into [data-gh-stars].
function initLiveGithubStars() {
    const targets = document.querySelectorAll('[data-gh-stars]');
    if (!targets.length) return;
    const cacheKey = 'gh_stars_v3';
    const ttl = 60 * 60 * 1000; // 1h

    function apply(stars, repos) {
        targets.forEach(el => {
            const what = el.dataset.ghStars;
            if (what === 'repos') el.textContent = repos;
            else el.textContent = stars >= 1000 ? (stars / 1000).toFixed(1) + 'k' : stars;
        });
    }

    try {
        const cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
        if (cached && Date.now() - cached.ts < ttl) {
            apply(cached.stars, cached.repos);
            return;
        }
    } catch (e) { /* ok */ }

    fetch('https://api.github.com/users/sainavaneet/repos?per_page=100&sort=updated')
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(repos => {
            const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
            const count = repos.length;
            try { sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), stars, repos: count })); } catch (e) {}
            apply(stars, count);
        })
        .catch(() => {
            // Silent fail; targets keep their fallback text.
        });
}

// Highlight the currently-active top-nav link.
function initNavbarActive() {
    const path = window.location.pathname.replace(/\/$/, '').toLowerCase();
    const links = document.querySelectorAll('.top-navbar .navbar-menu a[href]');
    if (!links.length) return;
    let best = null, bestLen = -1;
    links.forEach(a => {
        try {
            const href = a.getAttribute('href') || '';
            if (!href || href === '#') return;
            const url = new URL(a.href, window.location.href);
            const linkPath = url.pathname.replace(/\/$/, '').toLowerCase();
            if (linkPath && (path === linkPath || (linkPath !== '' && path.startsWith(linkPath)))) {
                if (linkPath.length > bestLen) { bestLen = linkPath.length; best = a; }
            }
        } catch (e) {}
    });
    // Special-case root → "Home"
    if (!best && (path === '' || path === '/index.html' || path.endsWith('/index.html'))) {
        links.forEach(a => {
            const txt = (a.textContent || '').trim().toLowerCase();
            if (txt === 'home') best = a;
        });
    }
    if (best) best.classList.add('is-current');
}

// Image perf — add loading=lazy + decoding=async to every <img> that doesn't have them.
// Above-the-fold hero img (profile3.png / favicon) gets fetchpriority=high.
function initImagePerformance() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach((img, idx) => {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
        // First image (typically the hero avatar on the home page) is critical
        if (idx === 0 && img.closest('.avatar-svg-frame, .hero-avatar')) {
            img.setAttribute('loading', 'eager');
            img.setAttribute('fetchpriority', 'high');
        }
    });
}

// Detail page decor — adds breadcrumb + section-tag to inner project / blog / publication pages.
function initDetailPageDecor() {
    const path = window.location.pathname || '';
    if (!/\/source\/(projects|Blog|publications)\//.test(path)) return;
    // Skip the index pages themselves
    const segments = path.split('/').filter(Boolean);
    const last = segments[segments.length - 1] || '';
    const parent = segments[segments.length - 2] || '';
    if ((last === 'index.html' || last === '') &&
        (parent === 'projects' || parent === 'Blog' || parent === 'publications')) {
        return; // we're on the index page, not a detail page
    }

    let area = 'detail';
    let backHref = '../index.html';
    let backLabel = '↩ all';
    if (path.indexOf('/source/projects/') !== -1) {
        area = 'projects';
        backHref = '../index.html';
        backLabel = '↩ all projects';
    } else if (path.indexOf('/source/Blog/') !== -1) {
        area = 'blog';
        backHref = '../index.html';
        backLabel = '↩ all posts';
    } else if (path.indexOf('/source/publications/') !== -1) {
        area = 'publications';
        backHref = '../index.html';
        backLabel = '↩ all publications';
    }

    document.body.classList.add('is-detail-page', 'is-' + area + '-detail');

    const article = document.querySelector('.bd-article');
    if (!article) return;
    if (article.querySelector('.detail-toolbar')) return;

    // Build a small toolbar with breadcrumb + section tag
    const bar = document.createElement('div');
    bar.className = 'detail-toolbar';
    const tagLabel =
        area === 'projects'     ? '// PROJECT_DETAIL' :
        area === 'blog'         ? '// BLOG_POST'      :
        area === 'publications' ? '// PUBLICATION'    : '// DETAIL';
    bar.innerHTML =
        '<a class="detail-back" href="' + backHref + '">' + backLabel + '</a>' +
        '<span class="detail-section-tag">' + tagLabel + '</span>';

    // Insert right at the top of the article body
    article.insertBefore(bar, article.firstChild);
}

// Hero avatar parallax — subtle 3D tilt tracking the cursor.
function initAvatarParallax() {
    if (_prefersReducedMotion()) return;
    if (!window.matchMedia('(min-width: 900px)').matches) return;
    const frame = document.querySelector('.avatar-svg-frame');
    if (!frame) return;

    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    let rafId = null;
    const MAX = 8; // degrees

    function tick() {
        curX += (targetX - curX) * 0.12;
        curY += (targetY - curY) * 0.12;
        frame.style.transform = 'perspective(800px) rotateX(' + curY.toFixed(2) + 'deg) rotateY(' + curX.toFixed(2) + 'deg)';
        rafId = requestAnimationFrame(tick);
    }
    tick();

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;   // -1..1
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        targetX = x * MAX;
        targetY = -y * MAX;
    }, { passive: true });

    window.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
}


// Boot sequence — once-per-session terminal-style intro overlay.
function initBootSequence() {
    if (_prefersReducedMotion()) return;
    try { if (sessionStorage.getItem('boot_shown_v3')) return; } catch (e) { /* ok */ }
    if (document.querySelector('.boot-screen')) return;

    const lines = [
        { txt: '$ ./navaneet --boot', cls: 'b-cmd' },
        { txt: '[INFO] loading portfolio modules…', cls: 'b-muted' },
        { txt: '[ OK ] research   ·  17 projects · 8 papers', cls: 'b-ok' },
        { txt: '[ OK ] timeline   ·  2019 → 2026', cls: 'b-ok' },
        { txt: '[ OK ] systems    ·  online', cls: 'b-ok' },
        { txt: '[READY]', cls: 'b-prompt' },
    ];

    const overlay = document.createElement('div');
    overlay.className = 'boot-screen';
    overlay.innerHTML = `
        <div class="boot-stack">
          <div class="boot-brand">navaneet.portfolio <span>v3.0</span></div>
          <div class="boot-lines"></div>
        </div>
        <div class="boot-hint">click or press any key to skip</div>
    `;
    document.body.appendChild(overlay);
    try { sessionStorage.setItem('boot_shown_v3', '1'); } catch (e) { /* ok */ }

    const stack = overlay.querySelector('.boot-lines');
    let i = 0, skipped = false;

    function step() {
        if (skipped) return;
        if (i >= lines.length) { setTimeout(finish, 360); return; }
        const ln = document.createElement('div');
        ln.className = 'boot-line ' + lines[i].cls;
        ln.textContent = lines[i].txt;
        stack.appendChild(ln);
        i++;
        setTimeout(step, 160);
    }

    function finish() {
        if (overlay.classList.contains('is-leaving')) return;
        overlay.classList.add('is-leaving');
        setTimeout(() => overlay.remove(), 450);
    }

    overlay.addEventListener('click', () => { skipped = true; finish(); });
    const keyHandler = () => { skipped = true; finish(); document.removeEventListener('keydown', keyHandler); };
    document.addEventListener('keydown', keyHandler);

    setTimeout(step, 80);
    setTimeout(finish, 2400); // hard cap
}

// Scroll-to-top floating button.
function initScrollToTop() {
    if (document.querySelector('.scroll-to-top')) return;
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<span aria-hidden="true">↑</span>';
    document.body.appendChild(btn);

    let ticking = false;
    function update() {
        if (window.scrollY > 400) btn.classList.add('is-visible');
        else btn.classList.remove('is-visible');
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Project filter — pill buttons toggle visibility of [data-proj-category] rows.
function initProjectFilter() {
    const pills = document.querySelectorAll('.proj-pill');
    const rows  = document.querySelectorAll('[data-proj-category]');
    if (!pills.length || !rows.length) return;

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            const filter = pill.dataset.filter;
            pills.forEach(p => p.classList.remove('is-active'));
            pill.classList.add('is-active');
            rows.forEach(row => {
                if (filter === 'all' || row.dataset.projCategory === filter) {
                    row.classList.remove('is-hidden');
                } else {
                    row.classList.add('is-hidden');
                }
            });
        });
    });
}

// Make changelog entries clickable based on data-link attribute.
function initChangelogLinks() {
    const entries = document.querySelectorAll('.changelog-entry[data-link]');
    entries.forEach(el => {
        const url = (el.dataset.link || '').trim();
        if (!url) return;
        el.classList.add('is-linked');
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'link');

        function go() {
            if (/^https?:\/\//.test(url)) {
                window.open(url, '_blank', 'noopener');
            } else {
                window.location.href = url;
            }
        }
        el.addEventListener('click', (e) => {
            if (e.target.closest && e.target.closest('a')) return; // let inner links handle themselves
            go();
        });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                go();
            }
        });
    });
}

// ============================================================
// Terminal loop — continuously typing demo (graphify-style)
// ============================================================
function runTerminalLoop() {
    const body = document.querySelector('.terminal-body code[data-terminal-output]');
    if (!body) return;
    const win = document.querySelector('.terminal-window');
    if (!win) return;

    const SCENES = [
        {
            cmd: './list_research --active',
            output: [
                { kind: 'ok',    text: '5 projects loaded · 4 publications' },
                { kind: 'blank' },
                { kind: 'row', name: 'MAMBA-VLA',  desc: 'state-space VLA transformer',          tag: 'ACTIVE' },
                { kind: 'row', name: 'DIFF-DAIL',  desc: 'diffusion-enhanced imitation',         tag: 'UNDER REVIEW' },
                { kind: 'row', name: 'QROOT',      desc: 'diffusion transformer + RL',           tag: 'UNDER REVIEW' },
                { kind: 'row', name: 'DLDMP',      desc: 'discrete latent diffusion planning',   tag: 'PUBLISHED' },
                { kind: 'row', name: 'LMPC-ILC',   desc: 'learning MPC + ILC',                   tag: 'PUBLISHED' },
            ],
        },
        {
            cmd: './show_publications --recent',
            output: [
                { kind: 'ok',    text: '4 recent publications' },
                { kind: 'blank' },
                { kind: 'row', name: 'CCNC 2026',    desc: 'MambaVLA: state-space VLA' },
                { kind: 'row', name: 'IROS 2025',    desc: 'LegMamba poster · quadruped locomotion' },
                { kind: 'row', name: 'NODYCON 2025', desc: 'DLDMP: discrete latent diffusion' },
                { kind: 'row', name: 'KNU-EERC \'24',desc: 'leader–follower tracking via MPC' },
            ],
        },
        {
            cmd: './stats --summary',
            output: [
                { kind: 'kv', key: 'degree',   value: "M.S. EE @ Kyungpook Nat'l Univ." },
                { kind: 'kv', key: 'papers',   value: '4 published · 3 under review' },
                { kind: 'kv', key: 'awards',   value: 'LeRobot 2025 hackathon winner' },
                { kind: 'kv', key: 'projects', value: '15+ across robotics & ML' },
            ],
        },
        {
            cmd: './show_skills --top',
            output: [
                { kind: 'kv', key: 'core',     value: 'PyTorch · JAX · CUDA · Python · C++' },
                { kind: 'kv', key: 'robotics', value: 'ROS 2 · MuJoCo · Isaac Sim · MotoMini · Franka · Go2' },
                { kind: 'kv', key: 'models',   value: 'Mamba SSM · Diffusion · Transformers · MPC' },
            ],
        },
        {
            cmd: 'whoami',
            output: [
                { kind: 'muted', text: 'Sai Navaneet' },
                { kind: 'muted', text: 'Robotics + ML researcher.' },
                { kind: 'muted', text: 'Builds VLA, imitation learning, and quadruped RL.' },
            ],
        },
    ];

    const TYPE_MS = 45, LINE_MS = 80, AFTER_CMD_MS = 350, HOLD_MS = 2600, FADE_MS = 220, BETWEEN_MS = 280;

    function renderScene1Static() {
        body.innerHTML = '';
        const s = SCENES[0];
        appendCmdLine(s.cmd, /*withCursor*/ false);
        s.output.forEach(o => appendOutput(o));
        appendPromptLine(/*withCursor*/ true);
    }
    if (_prefersReducedMotion()) {
        renderScene1Static();
        return;
    }

    let paused = false, skip = false;
    win.addEventListener('mouseenter', () => { paused = true; });
    win.addEventListener('mouseleave', () => { paused = false; });
    // Click inside the terminal is intentionally a no-op (no skip, no ripple).
    win.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
    });

    function sleep(ms) {
        return new Promise(r => {
            const t0 = performance.now();
            function tick() {
                if (skip) return r();
                if (paused) return requestAnimationFrame(tick);
                if (performance.now() - t0 >= ms) return r();
                requestAnimationFrame(tick);
            }
            tick();
        });
    }

    function appendCmdLine(cmdText, withCursor) {
        const line = document.createElement('span');
        line.className = 't-line';
        line.innerHTML = '<span class="t-prompt">$</span> <span class="t-cmd"></span>';
        if (withCursor) line.innerHTML += '<span class="t-cursor">_</span>';
        body.appendChild(line);
        return line.querySelector('.t-cmd');
    }
    function appendPromptLine(withCursor) {
        const line = document.createElement('span');
        line.className = 't-line';
        line.innerHTML = '<span class="t-prompt">$</span>' + (withCursor ? ' <span class="t-cursor">_</span>' : '');
        body.appendChild(line);
    }
    function appendOutput(o) {
        const line = document.createElement('span');
        line.className = 't-line';
        if (o.kind === 'ok') {
            line.innerHTML = '<span class="t-ok">[OK]</span>   <span class="t-muted">' + escapeHTML(o.text) + '</span>';
        } else if (o.kind === 'muted') {
            line.innerHTML = '<span class="t-muted">' + escapeHTML(o.text) + '</span>';
        } else if (o.kind === 'blank') {
            line.innerHTML = ' ';
        } else if (o.kind === 'kv') {
            line.innerHTML =
                '<span class="t-name">' + escapeHTML(o.key.padEnd(10, ' ')) + '</span>' +
                '<span class="t-desc">' + escapeHTML(o.value) + '</span>';
        } else if (o.kind === 'row') {
            const namePad = (o.name || '').padEnd(12, ' ');
            const tagClass =
                o.tag === 'ACTIVE'        ? 't-tag--active' :
                o.tag === 'UNDER REVIEW'  ? 't-tag--review' :
                o.tag === 'PUBLISHED'     ? 't-tag--published' : '';
            line.innerHTML =
                '<span class="t-arrow">→</span> ' +
                '<span class="t-name">' + escapeHTML(namePad) + '</span>' +
                '<span class="t-desc">' + escapeHTML(o.desc || '') + '</span>' +
                (o.tag ? ' <span class="t-tag ' + tagClass + '">[' + escapeHTML(o.tag) + ']</span>' : '');
        }
        body.appendChild(line);
        return line;
    }
    function escapeHTML(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
    }

    async function playScene(scene) {
        // Clear + start with prompt + blinking cursor for typing
        body.classList.remove('is-clearing');
        body.innerHTML = '';
        const cmdSpan = appendCmdLine('', true);
        const cursor = body.querySelector('.t-cursor');

        // Type the command char by char
        for (let i = 0; i < scene.cmd.length; i++) {
            if (skip) break;
            cmdSpan.textContent += scene.cmd[i];
            await sleep(TYPE_MS);
        }
        if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
        await sleep(AFTER_CMD_MS);

        // Emit output lines one by one
        for (let i = 0; i < scene.output.length; i++) {
            if (skip) break;
            appendOutput(scene.output[i]);
            await sleep(LINE_MS);
        }

        // Final prompt with blinking cursor
        if (!skip) appendPromptLine(true);

        // Hold
        await sleep(HOLD_MS);

        // Fade out, then clear
        body.classList.add('is-clearing');
        await sleep(FADE_MS);
        body.innerHTML = '';
        body.classList.remove('is-clearing');
    }

    (async function loop() {
        let i = 0;
        // small delay so the page settles first
        await sleep(450);
        while (true) {
            skip = false;
            await playScene(SCENES[i]);
            await sleep(BETWEEN_MS);
            i = (i + 1) % SCENES.length;
        }
    })();
}

