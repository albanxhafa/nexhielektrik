// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Hide loading screen
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hide');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initFormValidation();
    // Testimonial carousel removed
    initScrollAnimations();
});

// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');
    const messageInput = document.getElementById('message');

    // Albanian error messages
    const errorMessages = {
        name: {
            required: 'Emri dhe mbiemri janë të detyrueshëm',
            minLength: 'Emri duhet të ketë të paktën 2 karaktere'
        },
        phone: {
            required: 'Numri i telefonit është i detyrueshëm',
            invalid: 'Numri i telefonit nuk është i vlefshëm'
        },
        email: {
            invalid: 'Adresa e email-it nuk është e vlefshme'
        },
        service: {
            required: 'Ju lutem zgjidhni llojin e shërbimit'
        }
    };

    // Validation functions
    function validateName(value) {
        if (!value.trim()) {
            return errorMessages.name.required;
        }
        if (value.trim().length < 2) {
            return errorMessages.name.minLength;
        }
        return '';
    }

    function validatePhone(value) {
        if (!value.trim()) {
            return errorMessages.phone.required;
        }
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value.trim())) {
            return errorMessages.phone.invalid;
        }
        return '';
    }

    function validateEmail(value) {
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            return errorMessages.email.invalid;
        }
        return '';
    }

    function validateService(value) {
        if (!value) {
            return errorMessages.service.required;
        }
        return '';
    }

    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
        
        const input = document.getElementById(inputId);
        if (input) {
            if (message) {
                input.style.borderColor = '#f44336';
            } else {
                input.style.borderColor = '#F8F9FA';
            }
        }
    }

    // Real-time validation
    nameInput.addEventListener('blur', () => {
        const error = validateName(nameInput.value);
        showError('name', error);
    });

    phoneInput.addEventListener('blur', () => {
        const error = validatePhone(phoneInput.value);
        showError('phone', error);
    });

    emailInput.addEventListener('blur', () => {
        const error = validateEmail(emailInput.value);
        showError('email', error);
    });

    serviceSelect.addEventListener('change', () => {
        const error = validateService(serviceSelect.value);
        showError('service', error);
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const nameError = validateName(nameInput.value);
        const phoneError = validatePhone(phoneInput.value);
        const emailError = validateEmail(emailInput.value);
        const serviceError = validateService(serviceSelect.value);

        showError('name', nameError);
        showError('phone', phoneError);
        showError('email', emailError);
        showError('service', serviceError);

        // If no errors, submit form
        if (!nameError && !phoneError && !emailError && !serviceError) {
            submitForm();
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error-message[style*="block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    function submitForm() {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Duke dërguar...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear any error messages
            const errorElements = form.querySelectorAll('.error-message');
            errorElements.forEach(el => {
                el.style.display = 'none';
            });
            
            // Reset input borders
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '#F8F9FA';
            });
        }, 2000);
    }

    function showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background-color: #4CAF50;
                color: white;
                padding: 1rem 2rem;
                border-radius: 5px;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            ">
                <i class="fas fa-check-circle"></i>
                Mesazhi juaj u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
            </div>
        `;
        
        form.insertBefore(successDiv, form.firstChild);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Testimonial Carousel - Removed as per user request

// Scroll Animations
function initScrollAnimations() {
    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.7
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Performance optimization
window.addEventListener('load', () => {
    // Remove loading class from body
    document.body.classList.remove('loading');
    
    // Initialize performance-heavy features after load
    setTimeout(() => {
        // Any heavy animations or features can be initialized here
    }, 100);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(registrationError => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Touch gesture support - Testimonial carousel removed

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, eventData);
    
    // Example for Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track important user interactions
document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target) {
        const trackingData = {
            element: target.tagName.toLowerCase(),
            text: target.textContent.trim(),
            href: target.href || '',
            class: target.className
        };
        
        trackEvent('click', trackingData);
    }
});

// Track form submissions
document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.id === 'contactForm') {
        trackEvent('form_submit', {
            form_id: form.id,
            service_type: form.service.value
        });
    }
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', debounce(() => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestone scroll depths
        if (scrollDepth >= 25 && scrollDepth < 50 && maxScrollDepth >= 25) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollDepth >= 50 && scrollDepth < 75 && maxScrollDepth >= 50) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollDepth >= 75 && scrollDepth < 90 && maxScrollDepth >= 75) {
            trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollDepth >= 90 && maxScrollDepth >= 90) {
            trackEvent('scroll_depth', { depth: '90%' });
        }
    }
}, 250));

// Console welcome message
console.log(`
🔌 Nexhi Elektrik Website
💡 Light Your Life
⚡ Shërbime Elektrike & Kamera Sigurie
📞 Kontakt: +355 68 532 0437
📱 Instagram: @nexhi_elektrik
🌐 Built with modern web technologies
`);
