/* ==========================================================================
   URBAN REFLECTION - PREMIUM JAVASCRIPT INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initPortfolioFilter();
    initBeforeAfterSlider();
    initBudgetEstimator();
    initFaqAccordion();
    initContactForm();
});

/* 1. Header Scroll Effect */
function initHeaderScroll() {
    const navbar = document.getElementById('navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on startup
}

/* 2. Mobile Navigation Toggle */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!toggleBtn || !navigation) return;
    
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBtn.classList.toggle('active');
        navigation.classList.toggle('active');
    });
    
    // Close nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('active');
            navigation.classList.remove('active');
        });
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (navigation.classList.contains('active') && !navigation.contains(e.target) && e.target !== toggleBtn) {
            toggleBtn.classList.remove('active');
            navigation.classList.remove('active');
        }
    });
}

/* 3. Portfolio Showcase Filtering */
function initPortfolioFilter() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    if (tabButtons.length === 0 || portfolioCards.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset card styling for transitions
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        // Trigger fade in animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
    
    // Setup initial styles for cards to transition nicely
    portfolioCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateY(0)';
    });
}

/* 4. Before/After Split Drag Slider */
function initBeforeAfterSlider() {
    const container = document.getElementById('slider-container');
    const overlay = document.getElementById('slider-overlay');
    const handle = document.getElementById('slider-handle');
    
    if (!container || !overlay || !handle) return;
    
    const topImage = overlay.querySelector('.slider-image-top');
    
    function updateOverlayWidths() {
        const containerWidth = container.offsetWidth;
        if (topImage) {
            topImage.style.width = containerWidth + 'px';
        }
    }
    
    // Maintain overlay image proportions on window resize
    window.addEventListener('resize', updateOverlayWidths);
    updateOverlayWidths(); // Call initially
    
    let active = false;
    
    function slideMove(clientX) {
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        
        // Boundaries
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        
        overlay.style.width = percentage + '%';
        handle.style.left = percentage + '%';
    }
    
    // Mouse Events
    handle.addEventListener('mousedown', () => {
        active = true;
    });
    
    window.addEventListener('mouseup', () => {
        active = false;
    });
    
    window.addEventListener('mousemove', (e) => {
        if (!active) return;
        slideMove(e.clientX);
    });
    
    // Touch Events for Mobile
    handle.addEventListener('touchstart', () => {
        active = true;
    });
    
    window.addEventListener('touchend', () => {
        active = false;
    });
    
    window.addEventListener('touchmove', (e) => {
        if (!active) return;
        slideMove(e.touches[0].clientX);
    });
    
    // Allow clicking anywhere on slider to reposition
    container.addEventListener('click', (e) => {
        if (e.target === handle || handle.contains(e.target)) return;
        slideMove(e.clientX);
    });
}

/* 5. Interior Space Budget Estimator */
function initBudgetEstimator() {
    const spaceButtons = document.querySelectorAll('.space-btn');
    const finishRadios = document.querySelectorAll('input[name="finish_quality"]');
    const carpetSlider = document.getElementById('carpet-slider');
    const areaValDisplay = document.getElementById('area-val');
    const priceRangeDisplay = document.getElementById('price-range');
    const specsList = document.getElementById('specs-list');
    const calcCtaBtn = document.getElementById('calc-cta-btn');
    
    if (!carpetSlider || !priceRangeDisplay || spaceButtons.length === 0) return;
    
    let activeSpaceBase = 350; // default 1bhk
    let activeSpaceName = '1 BHK Apartment';
    let activeSpaceVal = '1bhk';
    let activeMultiplier = 1.0; // default premium
    let activeFinishName = 'Premium';
    
    // Specification templates based on finish
    const specsTemplate = {
        premium: [
            "Custom waterproof plywood carcass with branded laminates",
            "Hettich/Hafele soft-close hinge hardware and drawers",
            "Branded acrylic shutters for modular setups",
            "Asian Paints Royale Luxury Emulsion wall paints",
            "Premium gypsum board false ceiling with Philips LED downlighters"
        ],
        luxury: [
            "High-grade MDF & Century Plywood with natural veneers / PU coatings",
            "Premium Blum/Hafele drawer runners and tandem boxes",
            "Customized profile lighting and architectural ceiling integrations",
            "False ceiling with gypsum cornices and ambient gold cove lights",
            "High-performance quartz or solid surface kitchen counter tops"
        ],
        ultraluxury: [
            "Elite Italian marble floor designs & custom stone wall claddings",
            "Smart home lighting automation systems (Lutron/Schneider) integrated",
            "Bespoke Italian-designed modular units and custom brass work details",
            "Premium polyurethane (PU) high-gloss paint wall coatings",
            "Bespoke tinted-glass walk-in wardrobe shelves with built-in sensors"
        ]
    };
    
    function formatCurrency(num) {
        return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    }
    
    function calculateCost() {
        const carpetArea = parseInt(carpetSlider.value);
        areaValDisplay.textContent = carpetArea;
        
        // Basic calculation
        const baseCost = carpetArea * activeSpaceBase * activeMultiplier;
        
        // Add minor margin of 30% for high-fidelity range estimates
        const minCost = baseCost;
        const maxCost = baseCost * 1.3;
        
        priceRangeDisplay.textContent = `${formatCurrency(minCost)} - ${formatCurrency(maxCost)}`;
    }
    
    // Space type click handlers
    spaceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            spaceButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeSpaceBase = parseFloat(btn.getAttribute('data-base'));
            activeSpaceName = btn.querySelector('.space-name').textContent;
            activeSpaceVal = btn.getAttribute('data-value');
            
            calculateCost();
        });
    });
    
    // Finish quality change handlers
    finishRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const label = radio.closest('.finish-option');
            document.querySelectorAll('.finish-option').forEach(l => l.classList.remove('active'));
            label.classList.add('active');
            
            const finishVal = radio.value;
            
            if (finishVal === 'premium') {
                activeMultiplier = 1.0;
                activeFinishName = 'Premium';
            } else if (finishVal === 'luxury') {
                activeMultiplier = 1.5;
                activeFinishName = 'Luxury';
            } else if (finishVal === 'ultraluxury') {
                activeMultiplier = 2.2;
                activeFinishName = 'Ultra-Luxury';
            }
            
            // Update specs list
            specsList.innerHTML = '';
            specsTemplate[finishVal].forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                specsList.appendChild(li);
            });
            
            calculateCost();
        });
    });
    
    // Slider input change handler
    carpetSlider.addEventListener('input', calculateCost);
    
    // CTA Button action: Link estimates to Contact Consultation Form
    calcCtaBtn.addEventListener('click', () => {
        const spaceSelect = document.getElementById('form_space_type');
        const budgetSelect = document.getElementById('form_budget');
        const messageTextarea = document.getElementById('client_message');
        const contactSection = document.getElementById('contact');
        
        if (spaceSelect) spaceSelect.value = activeSpaceVal;
        
        // Auto select approximate budget bracket in form
        if (budgetSelect) {
            const carpetArea = parseInt(carpetSlider.value);
            const approxValue = carpetArea * activeSpaceBase * activeMultiplier;
            
            if (approxValue < 500000) {
                budgetSelect.value = 'below5l';
            } else if (approxValue >= 500000 && approxValue < 1000000) {
                budgetSelect.value = '5to10l';
            } else if (approxValue >= 1000000 && approxValue < 2000000) {
                budgetSelect.value = '10to20l';
            } else {
                budgetSelect.value = 'above20l';
            }
        }
        
        if (messageTextarea) {
            const carpetArea = carpetSlider.value;
            const priceVal = priceRangeDisplay.textContent;
            messageTextarea.value = `Hello Manmeet, I just calculated my project budget on the Probox Cost Estimator. For my ${activeSpaceName} of ${carpetArea} Sq. Ft. with a ${activeFinishName} finish level, the estimate is ${priceVal}. Please contact me to schedule an on-site design consultation.`;
        }
        
        // Scroll to form smoothly
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Initial cost run
    calculateCost();
}

/* 6. FAQ Accordion Panels */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle active if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* 7. Consultation Form & Success Toast Toast notifications */
function initContactForm() {
    const form = document.getElementById('consultation-form');
    const toast = document.getElementById('form-toast');
    
    if (!form || !toast) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
        
        // Simulate network API submission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Show Success Notification
            toast.classList.add('show');
            form.reset();
            
            // Hide notification after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }, 1200);
    });
}
