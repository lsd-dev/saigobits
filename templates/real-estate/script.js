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
        "phone": "entry.222222222",     // Phone Number
        "email": "entry.333333333",     // Email Address
        "purpose": "entry.444444444",   // Inquiry Purpose
        "property": "entry.555555555",  // Selected Property
        "message": "entry.666666666"    // Acquisition Preferences
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Mobile Navigation Menu
    // -------------------------------------------------------------
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggleBtn && navMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            mobileToggleBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggleBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // -------------------------------------------------------------
    // 2. Header Scroll Effect
    // -------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // -------------------------------------------------------------
    // 3. Property Category Filtering
    // -------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            propertyCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    // Trigger fade-in effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 4. Mortgage & Home Loan Calculator
    // -------------------------------------------------------------
    const priceSlider = document.getElementById('calc-price');
    const priceVal = document.getElementById('price-val');
    const downpaymentSlider = document.getElementById('calc-downpayment');
    const downpaymentVal = document.getElementById('downpayment-val');
    const tenureSlider = document.getElementById('calc-tenure');
    const tenureVal = document.getElementById('tenure-val');
    const rateInput = document.getElementById('calc-rate');

    // Outputs
    const resPropPrice = document.getElementById('res-prop-price');
    const resDownpayment = document.getElementById('res-downpayment');
    const resPrincipal = document.getElementById('res-principal');
    const resEmi = document.getElementById('res-emi');

    // Format numbers to Indian system abbreviations (Lakh/Crore)
    const formatLakhCrore = (value) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)} Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)} L`;
        }
        return `₹${value.toLocaleString('en-IN')}`;
    };

    const updateMortgageCalculator = () => {
        if (!priceSlider || !downpaymentSlider || !tenureSlider || !rateInput) return;

        const price = parseInt(priceSlider.value);
        const tenureYears = parseInt(tenureSlider.value);
        const annualRate = parseFloat(rateInput.value) || 0;

        // Down payment boundaries: min 10% (RERA standard), max 80%
        const minDP = Math.round(price * 0.1);
        const maxDP = Math.round(price * 0.8);

        downpaymentSlider.min = minDP;
        downpaymentSlider.max = maxDP;
        downpaymentSlider.step = 100000; // 1 Lakh step

        let currentDP = parseInt(downpaymentSlider.value);
        if (currentDP < minDP) {
            currentDP = minDP;
        } else if (currentDP > maxDP) {
            currentDP = maxDP;
        }
        downpaymentSlider.value = currentDP;

        const dpPct = Math.round((currentDP / price) * 100);
        const principal = price - currentDP;

        // Amortization EMI Math
        // Formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
        const monthlyRate = annualRate / (12 * 100);
        const totalMonths = tenureYears * 12;
        let emi = 0;

        if (monthlyRate === 0) {
            emi = principal / totalMonths;
        } else {
            emi = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }

        // Update Labels
        priceVal.textContent = formatLakhCrore(price);
        downpaymentVal.textContent = `${formatLakhCrore(currentDP)} (${dpPct}%)`;
        tenureVal.textContent = `${tenureYears} Years`;

        // Update Output Fields
        resPropPrice.textContent = `₹${price.toLocaleString('en-IN')}`;
        resDownpayment.textContent = `₹${currentDP.toLocaleString('en-IN')}`;
        resPrincipal.textContent = `₹${principal.toLocaleString('en-IN')}`;
        resEmi.textContent = `₹${Math.round(emi).toLocaleString('en-IN')} / month`;
    };

    if (priceSlider) priceSlider.addEventListener('input', updateMortgageCalculator);
    if (downpaymentSlider) downpaymentSlider.addEventListener('input', updateMortgageCalculator);
    if (tenureSlider) tenureSlider.addEventListener('input', updateMortgageCalculator);
    if (rateInput) rateInput.addEventListener('input', updateMortgageCalculator);

    // Initial Trigger
    updateMortgageCalculator();

    // -------------------------------------------------------------
    // 5. FAQ Accordion
    // -------------------------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    otherAnswer.style.maxHeight = null;
                }
            });

            if (isExpanded) {
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            } else {
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // -------------------------------------------------------------
    // 6. Scroll Reveal Animations (Intersection Observer)
    // -------------------------------------------------------------
    const animationTargets = document.querySelectorAll(
        '.property-card, .agent-card, .testimonial-card, .stat-item, .stack-box, .why-point-item, .contact-form-card, .calc-card, .vr-display-card, .section-header'
    );

    animationTargets.forEach(target => {
        target.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animationTargets.forEach(target => {
        revealObserver.observe(target);
    });

    // -------------------------------------------------------------
    // 7. Contact Form Submission Simulation
    // -------------------------------------------------------------
    const inquiryForm = document.getElementById('inquiry-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success-msg');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            submitBtn.disabled = true;
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting Request...';

            if (GOOGLE_FORM_CONFIG.enabled) {
                const formData = new FormData();
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.name, document.getElementById('name').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.phone, document.getElementById('phone').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.email, document.getElementById('email').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.purpose, document.getElementById('interest-select').value);
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.property, document.getElementById('property-select').value);
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.message, document.getElementById('message').value.trim());

                fetch(GOOGLE_FORM_CONFIG.formActionUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                })
                .then(() => {
                    successMsg.style.display = 'block';
                    inquiryForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                })
                .catch(err => {
                    console.error('Submission error:', err);
                    alert('We encountered an error sending your request. Please try again.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
            } else {
                setTimeout(() => {
                    successMsg.style.display = 'block';
                    inquiryForm.reset();

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                        setTimeout(() => {
                            successMsg.style.display = 'none';
                        }, 5000);
                    }, 1000);
                }, 1500);
            }
        });
    }

    // -------------------------------------------------------------
    // 8. Calculator CTA Linkage
    // -------------------------------------------------------------
    const calcApplyCta = document.getElementById('calc-apply-cta');
    const contactPurposeSelect = document.getElementById('interest-select');
    const contactPropertySelect = document.getElementById('property-select');

    if (calcApplyCta && contactPurposeSelect && contactPropertySelect) {
        calcApplyCta.addEventListener('click', () => {
            const calculatedPrice = parseInt(priceSlider.value);
            
            // Auto-select physical site visit
            contactPurposeSelect.value = 'site-visit';
            
            // Map calculated price range to corresponding property
            if (calculatedPrice >= 15000000) { // 1.5Cr+
                contactPropertySelect.value = 'imperial-villa';
            } else if (calculatedPrice >= 10000000) { // 1.0Cr+
                contactPropertySelect.value = 'crown-penthouse';
            } else if (calculatedPrice >= 7000000) { // 70L+
                contactPropertySelect.value = 'pines-villa';
            } else if (calculatedPrice >= 4000000) { // 40L+
                contactPropertySelect.value = 'regency-duplex';
            } else {
                contactPropertySelect.value = 'none';
            }
        });
    }
});
