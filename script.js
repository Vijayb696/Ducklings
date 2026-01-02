/* ================================
   Ducklings Preschool - JavaScript
   Interactivity & Animations
================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initScrollEffects();
    initFormHandler();
    initAnimations();
});

/* ================================
   Navigation
================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ================================
   Smooth Scrolling
================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================================
   Scroll Effects & Animations
================================ */
function initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Animate stats counter
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.program-card, .why-card, .testimonial-card, .gallery-item, .about-image, .about-content, .contact-info, .contact-form-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ================================
   Counter Animation
================================ */
function animateCounter(element) {
    const target = element.innerText;
    const numericValue = parseInt(target.replace(/\D/g, ''));
    const suffix = target.replace(/[0-9]/g, '');
    const duration = 2000;
    const step = numericValue / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= numericValue) {
            element.innerText = numericValue + suffix;
            clearInterval(timer);
        } else {
            element.innerText = Math.floor(current) + suffix;
        }
    }, 16);
}

/* ================================
   Form Handler
================================ */
function initFormHandler() {
    const form = document.getElementById('enrollForm');
    const modal = document.getElementById('successModal');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validate form
            if (!validateForm(data)) {
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success modal
                modal.classList.add('show');

                // Reset form
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Log form data (in production, this would be sent to a server)
                console.log('Form submitted:', data);
            }, 1500);
        });
    }
}

function validateForm(data) {
    const phoneRegex = /^[+]?[\d\s-]{10,}$/;

    if (!data.parentName || data.parentName.trim().length < 2) {
        showError('Please enter a valid parent name');
        return false;
    }

    if (!data.childName || data.childName.trim().length < 2) {
        showError('Please enter a valid child name');
        return false;
    }

    if (!data.childAge) {
        showError('Please select your child\'s age');
        return false;
    }

    if (!phoneRegex.test(data.phone)) {
        showError('Please enter a valid phone number');
        return false;
    }

    return true;
}

function showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-error';
    toast.innerHTML = `
        <span>⚠️</span>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: #EF4444;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        box-shadow: 0 10px 40px rgba(239, 68, 68, 0.3);
        z-index: 3000;
        animation: slideUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// Make closeModal available globally
window.closeModal = closeModal;

/* ================================
   Additional Animations
================================ */
function initAnimations() {
    // Add keyframes for toast
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
        }

        /* Parallax effect for floating shapes */
        .floating-shape {
            will-change: transform;
        }

        /* Button hover ripple effect */
        .btn {
            position: relative;
            overflow: hidden;
        }

        .btn::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            transform: scale(0);
            transition: transform 0.5s ease;
        }

        .btn:active::after {
            transform: scale(2);
        }

        /* Card hover lift effect */
        .program-card, .why-card, .testimonial-card {
            will-change: transform;
        }

        /* Smooth image zoom on gallery */
        .gallery-item img {
            will-change: transform;
        }

        /* Logo pulse animation */
        .logo-img {
            animation: logoPulse 3s ease-in-out infinite;
        }

        @keyframes logoPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        /* Stagger animation for program cards */
        .program-card:nth-child(1) { transition-delay: 0s; }
        .program-card:nth-child(2) { transition-delay: 0.1s; }
        .program-card:nth-child(3) { transition-delay: 0.2s; }
        .program-card:nth-child(4) { transition-delay: 0.3s; }

        /* Stagger for why cards */
        .why-card:nth-child(1) { transition-delay: 0s; }
        .why-card:nth-child(2) { transition-delay: 0.1s; }
        .why-card:nth-child(3) { transition-delay: 0.2s; }
        .why-card:nth-child(4) { transition-delay: 0.3s; }
        .why-card:nth-child(5) { transition-delay: 0.4s; }
        .why-card:nth-child(6) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);

    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.floating-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const xMove = (x - 0.5) * speed;
            const yMove = (y - 0.5) * speed;
            shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });

    // Add typing animation to hero title (optional - uncomment if desired)
    // typeWriter();
}

/* ================================
   Optional: Typing Animation
================================ */
function typeWriter() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const text = title.innerHTML;
    title.innerHTML = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            title.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }

    setTimeout(type, 500);
}

/* ================================
   Utility Functions
================================ */

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

console.log('🐤 Ducklings Preschool website loaded successfully!');
