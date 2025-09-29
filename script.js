// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initModernEffects();
    initCardAnimations();
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

    // Set mobile menu position dynamically
    function setMobileMenuPosition() {
        if (navMenu && navbar) {
            const navbarRect = navbar.getBoundingClientRect();
            const navbarBottom = navbarRect.bottom;
            navMenu.style.top = navbarBottom + 'px';
        }
    }
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            setMobileMenuPosition(); // Set correct position before showing
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Update position on scroll and resize
    window.addEventListener('scroll', setMobileMenuPosition);
    window.addEventListener('resize', setMobileMenuPosition);
    
    // Set initial position
    setMobileMenuPosition();

    // Close mobile menu when clicking on nav links
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbar && hamburger && navMenu && !navbar.contains(e.target)) {
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

// Form validation removed - no contact form anymore

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
    
    // Enhanced parallax effect for hero background
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const speed = scrolled * 0.3;
            heroBackground.style.transform = `translateY(${speed}px) scale(${1 + scrolled * 0.0001})`;
        }
    }, 16));
    
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

// Modern Interactive Effects
function initModernEffects() {
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
    
    // Cursor trail effect - REMOVED
    
    // Floating elements animation
    animateFloatingElements();
}

// Card hover animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.service-card, .feature-card, .work-item, .contact-item, .faq-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
    });
}

// Cursor trail effect - REMOVED

// Floating elements animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.service-icon, .feature-icon, .contact-icon');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.5;
        const duration = 3 + Math.random() * 2;
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Add floating animation keyframes to CSS
const floatingStyles = document.createElement('style');
floatingStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(1deg); }
        50% { transform: translateY(-5px) rotate(0deg); }
        75% { transform: translateY(-15px) rotate(-1deg); }
    }
    
    .cursor-trail {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body:hover .cursor-trail {
        opacity: 1;
    }
    
    @media (max-width: 768px) {
        .cursor-trail {
            display: none;
        }
    }
`;
document.head.appendChild(floatingStyles);

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
