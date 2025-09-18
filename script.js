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

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Brand name transition effect
    const navBrand = document.querySelector('.nav-brand');
    const brandText = document.querySelector('.brand-text');
    
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
            }, index * 300 + 2000); // Much longer delay for ultra-smooth coordination
        });
    }
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
