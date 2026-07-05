// ==========================================================================
// Google Forms Integration Configuration
// To link this form to a production Google Form, set enabled to true
// and update formActionUrl and entryMappings with your Google Form values.
// ==========================================================================
const GOOGLE_FORM_CONFIG = {
    enabled: false,
    formActionUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
    entryMappings: {
        "name": "entry.111111111",      // Full Name
        "email": "entry.222222222",     // Email Address
        "date": "entry.333333333",      // Event Date
        "location": "entry.444444444",  // Venue / Location
        "message": "entry.555555555"    // Vision Details
    }
};


document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGalleryFilter();
    initLightbox();
    initQuoteCalculator();
    initBookingForm();
});

/**
 * Mobile drawer toggles and dynamic header scroll shadow adjustments
 */
function initNavigation() {
    const header = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Header scroll shadow class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle menu click handler
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle body scroll locking when mobile menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking navigation links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Filterable Gallery tabs logic
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from other buttons and set on active
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    // Re-trigger visual fade-in transition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Image zoom overlay modal lightbox
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || !lightboxImg || !closeBtn) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const heading = item.querySelector('h4');
            const spanText = item.querySelector('span');

            if (img) {
                lightbox.style.display = 'block';
                lightbox.setAttribute('aria-hidden', 'false');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                
                if (heading && spanText) {
                    lightboxCaption.textContent = `${heading.textContent} — ${spanText.textContent}`;
                } else {
                    lightboxCaption.textContent = img.alt;
                }
            }
        });
    });

    const closeHandler = () => {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
    };

    closeBtn.addEventListener('click', closeHandler);
    
    // Close modal on escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeHandler();
        }
    });

    // Close modal on click outside content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeHandler();
        }
    });
}

/**
 * Real-time dynamic price quotes estimator
 */
function initQuoteCalculator() {
    const eventTypeSelect = document.getElementById('event-type');
    const hoursRange = document.getElementById('hours-range');
    const hoursDisplay = document.getElementById('hours-display');
    
    const addonDrone = document.getElementById('addon-drone');
    const addonAlbum = document.getElementById('addon-album');
    const addonTeaser = document.getElementById('addon-teaser');
    
    // Summary display labels
    const totalQuoteText = document.getElementById('total-quote');
    const summaryBaseText = document.getElementById('summary-base');
    const summaryHoursText = document.getElementById('summary-hours');
    const summaryAddonsText = document.getElementById('summary-addons');

    if (!eventTypeSelect || !hoursRange) return;

    function calculateTotal() {
        // 1. Resolve Package Base Rate
        let baseRate = 55000;
        const selectedPackage = eventTypeSelect.value;
        if (selectedPackage === 'photography') {
            baseRate = 25000;
        } else if (selectedPackage === 'videography') {
            baseRate = 35000;
        }
        
        // 2. Resolve hourly scaling
        const hours = parseInt(hoursRange.value);
        hoursDisplay.textContent = hours;
        
        const standardHours = 8;
        let hoursCharge = 0;
        
        if (hours > standardHours) {
            // Extra hours cost ₹4,000 per hour
            hoursCharge = (hours - standardHours) * 4000;
        } else if (hours < standardHours) {
            // Reduced hours decrease cost by ₹2,000 per hour
            hoursCharge = (hours - standardHours) * 2000;
        }

        // 3. Resolve addons rates
        let addonsTotal = 0;
        if (addonDrone && addonDrone.checked) addonsTotal += 10000;
        if (addonAlbum && addonAlbum.checked) addonsTotal += 12000;
        if (addonTeaser && addonTeaser.checked) addonsTotal += 8000;

        const totalQuote = baseRate + hoursCharge + addonsTotal;

        // 4. Draw pricing values
        totalQuoteText.textContent = `₹${totalQuote.toLocaleString('en-IN')}`;
        summaryBaseText.textContent = `₹${baseRate.toLocaleString('en-IN')}`;
        summaryHoursText.textContent = hoursCharge >= 0 
            ? `+₹${hoursCharge.toLocaleString('en-IN')}` 
            : `-₹${Math.abs(hoursCharge).toLocaleString('en-IN')}`;
        summaryAddonsText.textContent = `+₹${addonsTotal.toLocaleString('en-IN')}`;
    }

    // Attach real-time input event listeners
    eventTypeSelect.addEventListener('change', calculateTotal);
    hoursRange.addEventListener('input', calculateTotal);
    
    if (addonDrone) addonDrone.addEventListener('change', calculateTotal);
    if (addonAlbum) addonAlbum.addEventListener('change', calculateTotal);
    if (addonTeaser) addonTeaser.addEventListener('change', calculateTotal);

    // Initial calculation run
    calculateTotal();
}

/**
 * Booking inquiry form submission
 */
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Request...';

        if (GOOGLE_FORM_CONFIG.enabled) {
            const formData = new FormData();
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.name, document.getElementById('client-name').value.trim());
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.email, document.getElementById('client-email').value.trim());
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.date, document.getElementById('event-date').value);
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.location, document.getElementById('event-location').value.trim());
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.message, document.getElementById('form-message').value.trim());

            fetch(GOOGLE_FORM_CONFIG.formActionUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
            .then(() => {
                alert('Thank you! Your quote calculation has been captured. We will get back to you shortly.');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            })
            .catch(err => {
                console.error('Submission error:', err);
                alert('We encountered an error sending your request. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        } else {
            setTimeout(() => {
                alert('Thank you! Your quote calculation has been captured. We will get back to you shortly.');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1200);
        }
    });
}
