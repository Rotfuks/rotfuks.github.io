// Giant Swarm Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Interactive Platform Modules
    const moduleCards = document.querySelectorAll('.module-card');
    const moduleDetails = document.querySelectorAll('.module-detail');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            
            // Remove active class from all cards and details
            moduleCards.forEach(c => c.classList.remove('active'));
            moduleDetails.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked card and corresponding detail
            this.classList.add('active');
            const targetDetail = document.getElementById(moduleId + '-detail');
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            this.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('mobile-active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Close all mobile dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('mobile-open');
                });
            }
        });
    }
    
    // Mobile dropdown handling
    dropdowns.forEach(dropdown => {
        const navLink = dropdown.querySelector('.nav-link');
        
        navLink.addEventListener('click', function(e) {
            // Only prevent default on mobile when menu is active
            if (window.innerWidth <= 768 && navMenu.classList.contains('mobile-active')) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('mobile-open');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('mobile-open');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrolled = false;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10 && !scrolled) {
            header.classList.add('scrolled');
            scrolled = true;
        } else if (scrollTop <= 10 && scrolled) {
            header.classList.remove('scrolled');
            scrolled = false;
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.stage-card, .diff-card, .pathway-card, .module-card'
    );
    animateElements.forEach(el => observer.observe(el));
    
    // Form handling (for future forms)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual form handling)
                setTimeout(() => {
                    submitBtn.textContent = 'Sent!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1000);
            }
        });
    });
    
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        // Add loading state for form submissions
        if (button.closest('form')) {
            button.addEventListener('click', function() {
                this.classList.add('loading');
            });
        }
        
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Pricing table responsive behavior
    const pricingTable = document.querySelector('.pricing-table');
    if (pricingTable) {
        function handleTableResize() {
            if (window.innerWidth < 768) {
                pricingTable.classList.add('mobile-scroll');
            } else {
                pricingTable.classList.remove('mobile-scroll');
            }
        }
        
        handleTableResize();
        window.addEventListener('resize', handleTableResize);
    }
    
    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        }
        
        // Arrow key navigation for module cards
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const focusedCard = document.activeElement;
            if (focusedCard.classList.contains('module-card')) {
                e.preventDefault();
                const cards = Array.from(moduleCards);
                const currentIndex = cards.indexOf(focusedCard);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % cards.length;
                } else {
                    nextIndex = (currentIndex - 1 + cards.length) % cards.length;
                }
                
                cards[nextIndex].focus();
            }
        }
    });
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
    
    // Add focus trap for mobile menu
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
    
    if (navMenu) {
        trapFocus(navMenu);
    }
    
    // Analytics tracking (placeholder for actual implementation)
    function trackEvent(eventName, properties = {}) {
        // Replace with actual analytics implementation
        console.log('Track event:', eventName, properties);
        
        // Example: Google Analytics 4
        // gtag('event', eventName, properties);
        
        // Example: HubSpot tracking
        // _hsq.push(['trackEvent', { eventName, properties }]);
    }
    
    // Track CTA clicks
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';
            
            trackEvent('cta_click', {
                button_text: buttonText,
                section: section,
                url: this.href || window.location.href
            });
        });
    });
    
    // Track module interactions
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleType = this.getAttribute('data-module');
            
            trackEvent('module_interaction', {
                module_type: moduleType,
                interaction_type: 'click'
            });
        });
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    const trackingIntervals = [25, 50, 75, 100];
    
    function trackScrollDepth() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);
        
        if (scrollPercentage > maxScrollDepth) {
            maxScrollDepth = scrollPercentage;
            
            trackingIntervals.forEach(interval => {
                if (scrollPercentage >= interval && maxScrollDepth < interval + 5) {
                    trackEvent('scroll_depth', {
                        percentage: interval,
                        page: window.location.pathname
                    });
                }
            });
        }
    }
    
    window.addEventListener('scroll', trackScrollDepth);
});

// Additional CSS for interactive elements
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .header.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 38, 69, 0.1);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    @media (max-width: 768px) {
        .nav-menu.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 38, 69, 0.1);
            padding: 1.5rem;
            gap: 1rem;
            border-top: 1px solid #e2e8f0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .pricing-table.mobile-scroll {
            border-radius: 12px;
            box-shadow: inset 0 0 0 1px rgba(0, 38, 69, 0.1);
        }
        
        .pricing-table.mobile-scroll::after {
            content: 'Scroll horizontally to see all options →';
            display: block;
            text-align: center;
            padding: 1rem;
            font-size: 0.9rem;
            color: #4a5568;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }
    }
    
    /* High contrast mode improvements */
    @media (prefers-contrast: high) {
        .module-card.active,
        .module-card:hover {
            border-color: #000;
            box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);
        }
        
        .btn:focus {
            outline: 3px solid #000;
            outline-offset: 2px;
        }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        html {
            scroll-behavior: auto;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);