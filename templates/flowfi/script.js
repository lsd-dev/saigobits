document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 1. Sticky Header & Scroll Effects
    // ----------------------------------------------------------------
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load

    // ----------------------------------------------------------------
    // 2. Mobile Menu Drawer
    // ----------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        const isOpen = navMenu.classList.contains('open');
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };
    
    mobileToggle.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ----------------------------------------------------------------
    // 3. Active Nav Link Highlighter on Scroll
    // ----------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);

    // ----------------------------------------------------------------
    // 4. FAQ Accordion Logic
    // ----------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const headerBtn = item.querySelector('.faq-header');
        const panel = item.querySelector('.faq-panel');
        
        headerBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-panel').style.maxHeight = null;
                    otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current
            if (isActive) {
                item.classList.remove('active');
                panel.style.maxHeight = null;
                headerBtn.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + 'px';
                headerBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ----------------------------------------------------------------
    // 5. EMI Calculator Logic
    // ----------------------------------------------------------------
    const amountSlider = document.getElementById('amount-slider');
    const interestSlider = document.getElementById('interest-slider');
    const tenureSlider = document.getElementById('tenure-slider');
    
    const amountVal = document.getElementById('amount-val');
    const interestVal = document.getElementById('interest-val');
    const tenureVal = document.getElementById('tenure-val');
    
    const emiResultVal = document.getElementById('emi-result-val');
    const principalResultVal = document.getElementById('principal-result-val');
    const interestResultVal = document.getElementById('interest-result-val');
    const totalResultVal = document.getElementById('total-result-val');
    
    const visPrincipal = document.getElementById('vis-principal');
    const visInterest = document.getElementById('vis-interest');

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const updateEMI = () => {
        const principal = parseFloat(amountSlider.value);
        const annualRate = parseFloat(interestSlider.value);
        const years = parseFloat(tenureSlider.value);
        
        if (principal >= 10000000) {
            amountVal.textContent = (principal / 10000000).toFixed(2) + ' Cr';
        } else if (principal >= 100000) {
            amountVal.textContent = (principal / 100000).toFixed(1) + ' Lakh';
        } else {
            amountVal.textContent = formatCurrency(principal);
        }
        
        interestVal.textContent = annualRate.toFixed(1) + '%';
        tenureVal.textContent = years + (years === 1 ? ' Year' : ' Years');
        
        const monthlyRate = annualRate / 12 / 100;
        const totalMonths = years * 12;
        
        let emi = 0;
        if (monthlyRate === 0) {
            emi = principal / totalMonths;
        } else {
            emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                  (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }
        
        const totalPayment = emi * totalMonths;
        const totalInterest = totalPayment - principal;
        
        emiResultVal.textContent = formatCurrency(Math.round(emi));
        principalResultVal.textContent = formatCurrency(principal);
        interestResultVal.textContent = formatCurrency(Math.round(totalInterest));
        totalResultVal.textContent = formatCurrency(Math.round(totalPayment));
        
        const interestPercentage = (totalInterest / totalPayment) * 100;
        const principalPercentage = 100 - interestPercentage;
        
        visPrincipal.style.width = principalPercentage + '%';
        visInterest.style.width = interestPercentage + '%';
    };

    if (amountSlider) {
        amountSlider.addEventListener('input', updateEMI);
        interestSlider.addEventListener('input', updateEMI);
        tenureSlider.addEventListener('input', updateEMI);
        updateEMI();
    }

    // ----------------------------------------------------------------
    // 6. Interactive "Learn More" Pre-selection Linkage
    // ----------------------------------------------------------------
    const serviceButtons = document.querySelectorAll('.service-btn');
    const serviceDropdown = document.getElementById('client-service');
    const nameInput = document.getElementById('client-name');
    const queryInput = document.getElementById('client-query');
    
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceKey = btn.getAttribute('data-service');
            const serviceName = btn.closest('.service-card').querySelector('h3').textContent;
            
            // Set service dropdown selection
            if (serviceDropdown) {
                serviceDropdown.value = serviceKey;
            }
            
            // Populate descriptive text template
            if (queryInput) {
                queryInput.value = `I would like to check my eligibility parameters for a ${serviceName} and seek advisory guidance.`;
            }
            
            // Scroll smoothly to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Autofocus Name field
            if (nameInput) {
                setTimeout(() => {
                    nameInput.focus();
                }, 800);
            }
        });
    });

    // ----------------------------------------------------------------
    // 7. Contact Form Validation & Toast Notification
    // ----------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    
    const showToast = (message) => {
        const toastText = toast.querySelector('.toast-text');
        toastText.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    const validateField = (inputEl, validationFn) => {
        const group = inputEl.closest('.form-group');
        const isValid = validationFn(inputEl.value.trim());
        
        if (isValid) {
            group.classList.remove('has-error');
        } else {
            group.classList.add('has-error');
        }
        return isValid;
    };

    if (contactForm) {
        const phoneInput = document.getElementById('client-phone');
        const emailInput = document.getElementById('client-email');
        
        const isNotEmpty = (val) => val.length >= 3;
        const isValidPhone = (val) => /^[6-9]\d{9}$/.test(val);
        const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isQueryValid = (val) => val.length >= 10;
        
        nameInput.addEventListener('blur', () => validateField(nameInput, isNotEmpty));
        phoneInput.addEventListener('blur', () => validateField(phoneInput, isValidPhone));
        emailInput.addEventListener('blur', () => validateField(emailInput, isValidEmail));
        queryInput.addEventListener('blur', () => validateField(queryInput, isQueryValid));
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isNameOk = validateField(nameInput, isNotEmpty);
            const isPhoneOk = validateField(phoneInput, isValidPhone);
            const isEmailOk = validateField(emailInput, isValidEmail);
            const isQueryOk = validateField(queryInput, isQueryValid);
            
            if (isNameOk && isPhoneOk && isEmailOk && isQueryOk) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting Inquiry...';
                
                setTimeout(() => {
                    showToast('Inquiry Submitted! Our financial advisor will contact you shortly.');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('has-error');
                    });
                }, 1200);
            } else {
                showToast('Please correct validation highlights in the form.');
            }
        });
    }

    // ----------------------------------------------------------------
    // 8. Intersection Observer Animations (Lazy Scroll Reveal)
    // ----------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.service-card, .why-card, .testimonial-card, .step-card, .cibil-gauge-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealOnScroll.observe(el);
    });

    // ----------------------------------------------------------------
    // 9. Floating WhatsApp Integration
    // ----------------------------------------------------------------
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const phoneNumber = '919000000000'; // Configurable WhatsApp
            const message = encodeURIComponent('Hi Flowfi, I would like to check my loan eligibility parameters.');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }
});
