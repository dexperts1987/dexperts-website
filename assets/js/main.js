// DEXPERTS Static Website - Main JavaScript

// Scroll to next section function
function scrollToNextSection() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('#mobile-menu-btn');
    const mobileMenu = document.querySelector('#mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Animated Counters for Stats Section
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    const speed = 40; // Lower is faster

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                let count = 0;
                const increment = Math.ceil(target / speed);

                const run = () => {
                    if (count < target) {
                        count += increment;
                        count = Math.min(count, target);
                        counter.textContent = count + suffix;
                        setTimeout(run, 20);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                run();
            };
            updateCount();
        });
    };

    // Animate when section is in viewport
    let statsAnimated = false;
    function onScroll() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) {
          return;
        }
        const rect = statsSection.getBoundingClientRect();
        if (!statsAnimated && rect.top < window.innerHeight - 100) {
            animateCounters();
            statsAnimated = true;
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
});

// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.querySelector('#search-projects');

    // Filter by category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Fade in animation on scroll
function fadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-fade-in');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
document.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Exclude contact form as it has its own handler
    const forms = document.querySelectorAll('form:not(#contact-form)');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // Show success message (this would normally submit to a server)
                const successMessage = form.querySelector('.success-message');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    form.reset();
                    
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                }
            }
        });
    });
});

// Initialize tooltips (if using any)
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            // Create and show tooltip
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip absolute bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg z-50';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
        });
        
        trigger.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});
