document.addEventListener('DOMContentLoaded', () => {
    // === Sticky Glassmorphic Header ===
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case page starts scrolled

    // === Mobile Hamburger Navigation ===
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        // Toggle aria-expanded for accessibility
        const isOpen = navLinksContainer.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // === Active Link Tracking on Scroll ===
    const sections = document.querySelectorAll('section, hero');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the middle of the viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });

    // === Portfolio Filtering ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Reset item scale and opacity with transition
                item.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // Match transiton duration
                }
            });
        });
    });

    // === Lightbox Gallery ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxCat = lightbox.querySelector('.lightbox-category');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let currentImages = []; // Stores currently visible (filtered) images
    let currentIndex = 0;

    // Open Lightbox
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Rebuild current visible image list based on current active filter
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            currentImages = Array.from(portfolioItems).filter(imgItem => {
                if (activeFilter === 'all') return true;
                return imgItem.getAttribute('data-category') === activeFilter;
            });

            // Find index of clicked item in the visible set
            currentIndex = currentImages.indexOf(item);
            
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    });

    const updateLightbox = () => {
        if (currentImages.length === 0) return;
        const currentItem = currentImages[currentIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('.portfolio-title').textContent;
        const category = currentItem.querySelector('.portfolio-cat').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
        lightboxTitle.textContent = title;
        lightboxCat.textContent = category;
    };

    const nextImage = () => {
        if (currentImages.length <= 1) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightbox();
    };

    const prevImage = () => {
        if (currentImages.length <= 1) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightbox();
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    };

    // Event listeners for lightbox navigation
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on clicking overlay background
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    });

    // === Testimonials Slider ===
    const slides = document.querySelectorAll('.testimonial-slide');
    const track = document.querySelector('.testimonial-track');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Create dots dynamically
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlideInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const goToSlide = (index) => {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            let next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        };

        const resetSlideInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000); // Change testimonials every 6 seconds
        };

        resetSlideInterval();

        // Responsive handling for slider sizing on resize
        window.addEventListener('resize', () => {
            goToSlide(currentSlide);
        });
    }

    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items for a clean accordion look
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // === Contact Form Handling ===
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showStatus('Please fill in all fields before sending.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showStatus('Please provide a valid email address.', 'error');
                return;
            }

            // Simulate sending progress (luxury feels responsive with a slight delay)
            showStatus('Sending your inquiry...', 'info');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                // Success State
                showStatus('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1800);
        });
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const showStatus = (text, type) => {
        formStatus.textContent = text;
        formStatus.className = 'form-status'; // Reset classes
        
        if (type === 'success') {
            formStatus.classList.add('success');
            formStatus.style.color = '#4cd964';
        } else if (type === 'error') {
            formStatus.classList.add('error');
            formStatus.style.color = '#ff3b30';
        } else {
            formStatus.style.color = 'var(--gold)';
        }
        formStatus.style.display = 'block';
    };
});
