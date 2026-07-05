// ==========================================================================
// Google Forms Integration Configuration
// To link this form to a production Google Form, set enabled to true
// and update formActionUrl and entryMappings with your Google Form values.
// ==========================================================================
const GOOGLE_FORM_CONFIG = {
    enabled: false,
    formActionUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
    entryMappings: {
        "name": "entry.111111111",      // Student Full Name
        "phone": "entry.222222222",     // Phone Number
        "email": "entry.333333333",     // Email Address
        "course": "entry.444444444",    // Program Choice
        "batch": "entry.555555555",     // Batch Format
        "message": "entry.666666666"    // Background / Career Goals
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
    // 3. Tuition Fee & EMI Calculator Logic
    // -------------------------------------------------------------
    const courseSelect = document.getElementById('calc-course');
    const scholarshipSlider = document.getElementById('calc-scholarship');
    const scholarshipVal = document.getElementById('scholarship-val');
    const downpaymentSlider = document.getElementById('calc-downpayment');
    const downpaymentVal = document.getElementById('downpayment-val');
    const tenureSelect = document.getElementById('calc-tenure');

    // Result labels
    const resBaseFee = document.getElementById('res-base-fee');
    const resDiscount = document.getElementById('res-discount');
    const resNetFee = document.getElementById('res-net-fee');
    const resDownpayment = document.getElementById('res-downpayment');
    const resBalance = document.getElementById('res-balance');
    const resEmi = document.getElementById('res-emi');

    const updateCalculator = () => {
        if (!courseSelect || !scholarshipSlider || !downpaymentSlider) return;

        const baseFee = parseInt(courseSelect.value);
        const discountPct = parseInt(scholarshipSlider.value);
        
        // Calculate net fee after discount
        const discountAmt = baseFee * (discountPct / 100);
        const netFee = baseFee - discountAmt;
        
        // Downpayment limits: min 10%, max 50%
        const minDP = Math.round(netFee * 0.1);
        const maxDP = Math.round(netFee * 0.5);

        // Update downpayment slider properties
        downpaymentSlider.min = minDP;
        downpaymentSlider.max = maxDP;
        downpaymentSlider.step = 1000;

        // Keep current downpayment value within new min/max boundaries
        let currentDP = parseInt(downpaymentSlider.value);
        if (currentDP < minDP) {
            currentDP = minDP;
        } else if (currentDP > maxDP) {
            currentDP = maxDP;
        }
        downpaymentSlider.value = currentDP;

        // Calculate loan balance & EMI
        const remainingBalance = netFee - currentDP;
        const tenureMonths = parseInt(tenureSelect.value);
        const monthlyEmi = remainingBalance / tenureMonths;

        // Update value indicator texts
        scholarshipVal.textContent = `${discountPct}%`;
        downpaymentVal.textContent = `₹${currentDP.toLocaleString('en-IN')}`;

        // Update calculation result table
        resBaseFee.textContent = `₹${baseFee.toLocaleString('en-IN')}`;
        resDiscount.textContent = discountAmt > 0 ? `- ₹${discountAmt.toLocaleString('en-IN')}` : `₹0`;
        resNetFee.textContent = `₹${netFee.toLocaleString('en-IN')}`;
        resDownpayment.textContent = `₹${currentDP.toLocaleString('en-IN')}`;
        resBalance.textContent = `₹${remainingBalance.toLocaleString('en-IN')}`;
        resEmi.textContent = `₹${Math.round(monthlyEmi).toLocaleString('en-IN')} / month`;
    };

    // Attach event listeners for inputs
    if (courseSelect) courseSelect.addEventListener('change', updateCalculator);
    if (scholarshipSlider) scholarshipSlider.addEventListener('input', updateCalculator);
    if (downpaymentSlider) downpaymentSlider.addEventListener('input', updateCalculator);
    if (tenureSelect) tenureSelect.addEventListener('change', updateCalculator);

    // Initial calculations trigger
    updateCalculator();

    // -------------------------------------------------------------
    // 4. FAQ Accordion
    // -------------------------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle selected FAQ state
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
    // 5. Scroll Reveal Animations (Intersection Observer)
    // -------------------------------------------------------------
    const animationTargets = document.querySelectorAll(
        '.course-card, .mentor-card, .testimonial-card, .stat-item, .stack-box, .why-point-item, .contact-form-card, .calc-card, .section-header'
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
    // 6. Lead Inquiry Form Submission Simulation
    // -------------------------------------------------------------
    const inquiryForm = document.getElementById('inquiry-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success-msg');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Loading state UI updates
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Registering Student...';

            if (GOOGLE_FORM_CONFIG.enabled) {
                const formData = new FormData();
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.name, document.getElementById('name').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.phone, document.getElementById('phone').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.email, document.getElementById('email').value.trim());
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.course, document.getElementById('course-select').value);
                formData.append(GOOGLE_FORM_CONFIG.entryMappings.batch, document.getElementById('batch-select').value);
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
                    alert('We encountered an error sending your registration. Please try again.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
            } else {
                // Simulation Mode
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

    // Calculator CTA binder: clicking CTA auto-fills course choice in contact form and scrolls
    const calcApplyCta = document.getElementById('calc-apply-cta');
    const contactCourseSelect = document.getElementById('course-select');

    if (calcApplyCta && contactCourseSelect) {
        calcApplyCta.addEventListener('click', (e) => {
            const selectedCourseVal = courseSelect.value;
            
            // Map calculator option index/name to contact form dropdown values
            if (selectedCourseVal === "80000") {
                contactCourseSelect.value = "sde-masterclass";
            } else if (selectedCourseVal === "60000") {
                contactCourseSelect.value = "gate-prep";
            } else if (selectedCourseVal === "50000") {
                contactCourseSelect.value = "fullstack-bootcamp";
            }
        });
    }
});
