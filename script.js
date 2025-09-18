// Password Protection Configuration
const SITE_PASSWORD = 'wyMkVgb'; // Change this to your desired password
const SESSION_KEY = 'portfolio_authenticated';

// Function to scroll to hero section
function scrollToHero() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Password Protection Functions
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem(SESSION_KEY) === 'true';
    return isAuthenticated;
}

function showPasswordOverlay() {
    const overlay = document.getElementById('password-overlay');
    const body = document.body;
    
    if (overlay) {
        overlay.classList.remove('hidden');
        body.classList.add('password-protected');
        
        // Focus on password input
        const passwordInput = document.getElementById('password-input');
        if (passwordInput) {
            setTimeout(() => passwordInput.focus(), 100);
        }
    }
}

function hidePasswordOverlay() {
    const overlay = document.getElementById('password-overlay');
    const body = document.body;
    
    if (overlay) {
        overlay.classList.add('hidden');
        body.classList.remove('password-protected');
        
        // Remove overlay from DOM after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            // Start animations after password overlay is completely hidden
            startSiteAnimations();
        }, 300);
    }
}

function authenticateUser(password) {
    if (password === SITE_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        hidePasswordOverlay();
        return true;
    }
    return false;
}

function showPasswordError(message) {
    const errorElement = document.getElementById('password-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
        
        // Clear error after 3 seconds
        setTimeout(() => {
            errorElement.style.opacity = '0';
        }, 3000);
    }
}

function clearPasswordError() {
    const errorElement = document.getElementById('password-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
    }
}

function startSiteAnimations() {
    // Brand name transition effect
    const navBrand = document.querySelector('.nav-brand');
    const brandText = document.querySelector('.brand-text');
    
    if (navBrand && brandText) {
        navBrand.addEventListener('mouseenter', function() {
            const text = 'Paul Kim';
            brandText.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    brandText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                }
            };
            
            typeWriter();
        });
        
        navBrand.addEventListener('mouseleave', function() {
            brandText.textContent = 'P';
        });
    }

    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Get sections for fade-in animation
    const sections = document.querySelectorAll('section[id]');
    
    // Add subtle fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for fade-in effect
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Portfolio grid interactions
    const interactivePortfolioItems = document.querySelectorAll('.portfolio-item.interactive');
    
    interactivePortfolioItems.forEach(item => {
        // Add click handler for portfolio items
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            
            // You can customize this behavior based on your needs
            // For now, we'll just show an alert, but you can replace this with:
            // - Opening a modal with project details
            // - Navigating to a project page
            // - Showing a lightbox with project images
            console.log(`Clicked on project: ${projectId}`);
            
            // Example: Show a simple alert (replace with your preferred interaction)
            // alert(`Viewing project: ${projectId}`);
        });
        
        // Add subtle animation on hover (complementing CSS hover effects)
        item.addEventListener('mouseenter', function() {
            // CSS handles the main hover effect, we can add additional effects here if needed
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Add typing effect for hero description and reveal portfolio grid
    const heroDescription = document.querySelector('.hero-description h2');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (heroDescription) {
        const text = heroDescription.innerHTML;
        heroDescription.innerHTML = '';
        
        // Show the hero text container just before starting animation
        heroDescription.classList.add('animation-ready');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroDescription.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 40); // Slightly faster for smoother feel
            } else {
                // Hero text animation complete, now reveal portfolio grid
                revealPortfolioGrid();
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    function revealPortfolioGrid() {
        console.log('Revealing portfolio grid with', portfolioItems.length, 'items');
        
        // First, reveal the portfolio section itself with a gentle slide up
        const portfolioSection = document.querySelector('.portfolio');
        if (portfolioSection) {
            portfolioSection.classList.add('revealed');
            console.log('Portfolio section revealed');
        }
        
        // Animate the hero section with immediate timing
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('portfolio-revealed');
                console.log('Hero section animated');
            }, 500); // Much shorter delay for immediate response
        }
        
        // Add ultra-elegant staggered reveal animation to portfolio items
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('revealed');
                console.log('Revealed item', index);
            }, index * 200 + 800); // Reduced delay for faster portfolio reveal
        });
    }
}

function setupPasswordProtection() {
    // Check if user is already authenticated
    if (checkAuthentication()) {
        hidePasswordOverlay();
        return;
    }
    
    // Show password overlay
    showPasswordOverlay();
    
    // Setup form submission
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    
    if (passwordForm && passwordInput) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const enteredPassword = passwordInput.value.trim();
            clearPasswordError();
            
            if (!enteredPassword) {
                showPasswordError('Please enter a password');
                return;
            }
            
            if (authenticateUser(enteredPassword)) {
                // Authentication successful - overlay will be hidden by authenticateUser
                console.log('Authentication successful');
            } else {
                showPasswordError('Incorrect password. Please try again.');
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
        
        // Handle Enter key press
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                passwordForm.dispatchEvent(new Event('submit'));
            }
        });
        
        // Clear error when user starts typing
        passwordInput.addEventListener('input', function() {
            clearPasswordError();
        });
    }
}

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    // Initialize password protection first
    setupPasswordProtection();
});

// Add CSS for work item hover states
const style = document.createElement('style');
style.textContent = `
    .work-item:hover {
        background-color: rgba(0, 0, 0, 0.02);
        border-radius: 8px;
        padding: 2rem;
        margin: 0 -2rem;
    }
    
    @media (max-width: 768px) {
        .work-item:hover {
            margin: 0 -1rem;
            padding: 1.5rem 1rem;
        }
    }
`;
document.head.appendChild(style);
