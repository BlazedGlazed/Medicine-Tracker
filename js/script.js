// Main script for MediTrack landing page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .step');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const featureCards = document.querySelectorAll('.feature-card');
    const steps = document.querySelectorAll('.step');
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    setTimeout(animateOnScroll, 100);
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-login, .btn-signup, .cta-button, .secondary-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const overlay = this.querySelector('.btn-overlay');
            if (overlay) {
                overlay.style.left = '0';
            }
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        button.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.btn-overlay');
            if (overlay) {
                overlay.style.left = '-100%';
            }
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Feature card interactions
    const featureCardsAll = document.querySelectorAll('.feature-card');
    
    featureCardsAll.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Floating device animation enhancement
    const floatingDevice = document.querySelector('.floating-device');
    if (floatingDevice) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            floatingDevice.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }
    
    // Add click effect to pills
    const floatingPills = document.querySelectorAll('.floating-pill');
    
    floatingPills.forEach(pill => {
        pill.addEventListener('click', function() {
            this.style.transform = 'scale(0.8)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal anchor links
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Page load animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Page Transition System
function initPageTransitions() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href$=".html"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle links to our own pages
            const href = this.getAttribute('href');
            
            if (href && !href.startsWith('#') && 
                (href.includes('login.html') || href.includes('signup.html'))) {
                e.preventDefault();
                
                // Add page exit animation
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.4s ease';
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
    
    // Add fade-in effect on page load
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Call this function in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    initPageTransitions(); // Add this line
    
    // ... rest of your code ...
});

// Add this to your existing DOMContentLoaded function
function initNavigationLinks() {
    // Handle login/signup navigation
    const navLogin = document.getElementById('nav-login');
    const navSignup = document.getElementById('nav-signup');
    const heroGetStarted = document.getElementById('hero-getstarted');
    
    if (navLogin) {
        navLogin.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('login.html?mode=login');
        });
    }
    
    if (navSignup) {
        navSignup.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('login.html?mode=signup');
        });
    }
    
    if (heroGetStarted) {
        heroGetStarted.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('login.html?mode=signup');
        });
    }
}

function navigateToPage(url) {
    // Add page transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

// Call this in your existing DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    initNavigationLinks(); // Add this line
    
    // ... rest of your code ...
});