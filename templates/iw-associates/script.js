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
        "service": "entry.444444444",   // Required Service
        "message": "entry.555555555"    // Inquiry Details
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
    handleScroll(); // Run once in case page starts scrolled

    // -------------------------------------------------------------
    // 3. FAQ Accordion
    // -------------------------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Collapse all other open FAQ items first
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle active state
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
    // 3.5. SME Financial & Tax Planner Tabs and Calculators
    // -------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.planner-tab-btn');
    const tabContents = document.querySelectorAll('.planner-tab-content');

    // Tab toggling logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // GST Calculator elements
    const gstAmountInput = document.getElementById('gst-amount');
    const gstRateRadios = document.getElementsByName('gst-rate');
    const gstTypeRadios = document.getElementsByName('gst-type');
    
    // GST Output Labels
    const resGstNet = document.getElementById('res-gst-net');
    const resGstCgst = document.getElementById('res-gst-cgst');
    const resGstSgst = document.getElementById('res-gst-sgst');
    const resGstTotal = document.getElementById('res-gst-total');

    const calculateGst = () => {
        if (!gstAmountInput) return;
        const amount = parseFloat(gstAmountInput.value) || 0;
        
        let selectedRate = 18;
        for (const radio of gstRateRadios) {
            if (radio.checked) {
                selectedRate = parseFloat(radio.value);
                break;
            }
        }

        let isInclusive = false;
        for (const radio of gstTypeRadios) {
            if (radio.checked && radio.value === 'inclusive') {
                isInclusive = true;
                break;
            }
        }

        let netAmount = amount;
        let gstAmount = 0;
        let totalAmount = amount;

        if (isInclusive) {
            netAmount = amount / (1 + selectedRate / 100);
            gstAmount = amount - netAmount;
            totalAmount = amount;
        } else {
            netAmount = amount;
            gstAmount = amount * (selectedRate / 100);
            totalAmount = amount + gstAmount;
        }

        const cgst = gstAmount / 2;
        const sgst = gstAmount / 2;

        resGstNet.textContent = `₹${Math.round(netAmount).toLocaleString('en-IN')}`;
        resGstCgst.textContent = `₹${Math.round(cgst).toLocaleString('en-IN')}`;
        resGstSgst.textContent = `₹${Math.round(sgst).toLocaleString('en-IN')}`;
        resGstTotal.textContent = `₹${Math.round(totalAmount).toLocaleString('en-IN')}`;
    };

    // Bind GST events
    if (gstAmountInput) {
        gstAmountInput.addEventListener('input', calculateGst);
        gstRateRadios.forEach(r => r.addEventListener('change', calculateGst));
        gstTypeRadios.forEach(t => t.addEventListener('change', calculateGst));
        calculateGst(); // Initial trigger
    }

    // Corporate Tax Estimator elements
    const taxProfitInput = document.getElementById('tax-profit');
    const taxRegimeSelect = document.getElementById('tax-regime');

    // Corporate Tax Output Labels
    const resTaxBase = document.getElementById('res-tax-base');
    const resTaxSurcharge = document.getElementById('res-tax-surcharge');
    const resTaxCess = document.getElementById('res-tax-cess');
    const resTaxTotal = document.getElementById('res-tax-total');
    const resTaxEffective = document.getElementById('res-tax-effective');

    const calculateCorporateTax = () => {
        if (!taxProfitInput || !taxRegimeSelect) return;
        const profit = parseFloat(taxProfitInput.value) || 0;
        const regime = taxRegimeSelect.value;

        let baseRate = 22;
        let surchargePct = 10; // New regimes Sec 115BAA & Sec 115BAB have fixed 10% surcharge

        if (regime === '25') {
            baseRate = 25;
            // Progressive surcharge for domestic companies under old regime
            if (profit > 100000000) { // > 10 Crores
                surchargePct = 12;
            } else if (profit > 10000000) { // > 1 Crore
                surchargePct = 7;
            } else {
                surchargePct = 0;
            }
        } else if (regime === '15') {
            baseRate = 15;
        }

        const baseTax = profit * (baseRate / 100);
        const surchargeAmt = baseTax * (surchargePct / 100);
        const cessAmt = (baseTax + surchargeAmt) * 0.04; // 4% health & education cess
        const totalTax = baseTax + surchargeAmt + cessAmt;
        const effectiveRate = profit > 0 ? (totalTax / profit) * 100 : 0;

        resTaxBase.textContent = `₹${Math.round(baseTax).toLocaleString('en-IN')}`;
        resTaxSurcharge.textContent = `₹${Math.round(surchargeAmt).toLocaleString('en-IN')}`;
        resTaxCess.textContent = `₹${Math.round(cessAmt).toLocaleString('en-IN')}`;
        resTaxTotal.textContent = `₹${Math.round(totalTax).toLocaleString('en-IN')}`;
        resTaxEffective.textContent = `${effectiveRate.toFixed(2)}%`;
    };

    // Bind Corporate Tax events
    if (taxProfitInput) {
        taxProfitInput.addEventListener('input', calculateCorporateTax);
        taxRegimeSelect.addEventListener('change', calculateCorporateTax);
        calculateCorporateTax(); // Initial trigger
    }

    // -------------------------------------------------------------
    // 4. Scroll Reveal Animations (Intersection Observer)
    // -------------------------------------------------------------
    // Dynamically apply reveal class to specific components for visual entry animations
    const animationTargets = document.querySelectorAll(
        '.service-card, .industry-card, .testimonial-card, .stat-item, .why-stat-box, .why-stat-box-gold, .why-point-item, .about-vision-mission > div, .about-image-card, .contact-form-card, .section-header, .planner-wrapper, .calculator-card'
    );

    animationTargets.forEach(target => {
        target.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger once
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
    // 5. Contact Form Simulation
    // -------------------------------------------------------------
    const inquiryForm = document.getElementById('inquiry-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success-msg');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable submit button and show loading state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Inquiry...';

            if (GOOGLE_FORM_CONFIG.enabled) {
                const formData = new FormData();
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.name, document.getElementById('name').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.phone, document.getElementById('phone').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.email, document.getElementById('email').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.service, document.getElementById('service-type').value);
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
                    alert('We encountered an error sending your inquiry. Please try again.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
            } else {
                // Simulate server network latency
                setTimeout(() => {
                    // Show success message
                    successMsg.style.display = 'block';
                    inquiryForm.reset();

                    // Restore button after delay
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                        // Fade out success message slowly
                        setTimeout(() => {
                            successMsg.style.display = 'none';
                        }, 5000);
                    }, 1000);
                }, 1500);
            }
        });
    }
});
