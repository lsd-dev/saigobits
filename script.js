/**
 * SaigoBits.com - Portfolio Website Interactions
 * Standard ES6 JavaScript, framework-free.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Scan for custom site-* elements on the current page
    const customTags = Array.from(document.querySelectorAll('*'))
        .map(el => el.tagName.toLowerCase())
        .filter(tag => tag.startsWith('site-'));

    // Wait for all custom elements on the page to be defined
    const promises = customTags.map(tag => customElements.whenDefined(tag));

    Promise.all(promises).then(() => {
        initHeaderScroll();
        initMobileNav();
        initCardGlowEffect();
        initSmoothScrolling();
        handleInquiryPreFill();
    });
});

/**
 * Adds a background shadow and translucent effect to the header on scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Run on init in case page is refreshed while scrolled
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

/**
 * Manages mobile drawer menu toggle states and ARIA tags
 */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!toggleBtn || !navMenu) return;

    const toggleMenu = () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        toggleBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when mobile navigation is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    toggleBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !toggleBtn.contains(e.target)) {
            toggleMenu();
        }
    });
}

/**
 * Premium spotlight card gradient hover micro-interaction.
 * Sets mouse-x and mouse-y custom CSS variables.
 */
function initCardGlowEffect() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/**
 * JavaScript fallback smooth scroll with header offset height
 */
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 64; // offset navigation height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Checks for query parameters (specifically 'inquiry') to auto-populate
 * the contact form and scroll down to the contact section.
 */
function handleInquiryPreFill() {
    const urlParams = new URLSearchParams(window.location.search);
    const inquiry = urlParams.get('inquiry');
    
    if (inquiry) {
        // Wait for site-contact to load and render the textarea
        const textarea = document.getElementById('contact-message');
        if (textarea) {
            textarea.value = decodeURIComponent(inquiry);
            
            // Clean up the URL query parameter so refreshing doesn't keep scrolling/filling
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
            window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
            
            // Scroll to the contact section after a brief delay to ensure layout has settled
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const offsetTop = contactSection.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        } else {
            // Fallback: If elements are still rendering, check again in a moment
            setTimeout(handleInquiryPreFill, 100);
        }
    }
}
