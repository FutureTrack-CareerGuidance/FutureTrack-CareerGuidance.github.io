// Wait for DOM content to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Job Field toggle functionality
    const jobFieldBtns = document.querySelectorAll('.job-field-btn');
    
    jobFieldBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active class on the clicked button
            this.classList.toggle('active');
            
            // Find and toggle the visibility of related majors
            const parent = this.parentElement;
            const majors = parent.querySelector('.majors');
            
            if (this.classList.contains('active')) {
                majors.style.display = 'flex';
            } else {
                majors.style.display = 'none';
            }
            
            // Close other open job fields
            jobFieldBtns.forEach(otherBtn => {
                if (otherBtn !== this && otherBtn.classList.contains('active')) {
                    otherBtn.classList.remove('active');
                    const otherParent = otherBtn.parentElement;
                    const otherMajors = otherParent.querySelector('.majors');
                    otherMajors.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }  
        });
    });

});

// Function to lead to the screen of each of 40 major's content 
document.addEventListener('DOMContentLoaded', function() {
    // Define a mapping of majors to their corresponding HTML pages
    const majorToPageMap = {
        // Technology field
        'technology': {
            'software-development': 'content/technology/software.html',
            'data-science': 'content/technology/data science.html',
            'cloud-computing': 'content/technology/cloud computing.html',
            'cybersecurity': 'content/technology/cybersecurity.html',
            'embedded-systems': 'content/technology/embedded systems.html'
        },

        // Engineering field
        'engineering': {
            'mechanical': 'content/engineering/mechanical-engineering.html',
            'electrical': 'content/engineering/electrical-engineering.html',
            'computer': 'content/engineering/computer-engineering.html',
            'civil': 'content/engineering/civil-engineering.html',
            'chemical': 'content/engineering/chemical-engineering.html'
        },

        // Economics & Management field
        'economics': {
            'economics': 'content/economic/economics.html',
            'business-admin': 'content/economic/business-admin.html',
            'finance': 'content/economic/finance.html',
            'management': 'content/economic/management.html',
            'international-business': 'content/economic/international-business.html'
        },

        // Healthcare & Wellness field
        'healthcare': {
            'medicine': 'content/healthcare-wellness/medicine.html',
            'nursing': 'content/healthcare-wellness/nursing.html',
            'pharmacy': 'content/healthcare-wellness/pharmacy.html',
            'public-health': 'content/healthcare-wellness/public-health.html',
            'physical-therapy': 'content/healthcare-wellness/physical-therapy.html'
        },

        // Creative & Communication field
        'creative': {
            'graphic-design': 'content/creative/graphic-design.html',
            'journalism-media': 'content/creative/journalism-media.html',
            'advertising-marketing': 'content/creative/advertising-marketing.html',
            'film': 'content/creative/film.html',
            'public-relations': 'content/creative/public-relations.html'
        },

        // Education & Humanities field
        'education': {
            'early-childhood': 'content/education/early-childhood-education.html',
            'higher-education': 'content/education/higher-education.html',
            'linguistics': 'content/education/linguistics.html',
            'philosophy': 'content/education/philosophy.html',
            'history': 'content/education/history.html'
        },

        // Service Industry field
        'service': {
            'hospitality': 'content/service/hospitality.html',
            'culinary': 'content/service/culinary-arts.html',
            'retail': 'content/service/retail-management.html',
            'event': 'content/service/event-planning.html',
            'customer-support': 'content/service/customer-support.html'
        },

        // Environment & Agriculture field
        'environment': {
            'environmental-science': 'content/environment/environmental-science.html',
            'agronomy': 'content/environment/agronomy.html',
            'animal-science': 'content/environment/animal-science.html',
            'forestry': 'content/environment/forestry.html',
            'renewable-energy': 'content/environment/renewable-energy.html'
        }
    };

    // Get all major buttons
    const majorButtons = document.querySelectorAll('.major-btn');
    
    // Add click event listener to each button
    majorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const field = this.getAttribute('data-field');
            const major = this.getAttribute('data-major');
            
            // Check if the field and major exist in our mapping
            if (majorToPageMap[field] && majorToPageMap[field][major]) {
                window.location.href = majorToPageMap[field][major];
            } else {
                console.log(`No page defined for ${field} - ${major}`);
                // Optional: You could redirect to a generic page or show a message
            }
        });
    });
});

// Newsletter subscription functionality
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const subscriptionMessage = document.getElementById('subscription-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();
            
            // Simple email validation
            if (email && isValidEmail(email)) {
                // In a real application, you would send this to your server
                // For now, we'll just simulate success
                subscriptionMessage.textContent = "Thank you for subscribing!";
                subscriptionMessage.style.color = "#4CAF50"; // Green color for success
                emailInput.value = '';
                
                // Save to localStorage as a demo
                saveSubscription(email);
            } else {
                subscriptionMessage.textContent = "Please enter a valid email address.";
                subscriptionMessage.style.color = "#F44336"; // Red color for error
            }
            
            // Display the message
            subscriptionMessage.style.display = "block";
            
            // Hide the message after 5 seconds
            setTimeout(function() {
                subscriptionMessage.style.display = "none";
            }, 5000);
        });
    }
    
    // Simple email validation function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Save subscription to localStorage (demo only)
    function saveSubscription(email) {
        // Get existing subscriptions or initialize an empty array
        const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
        
        // Add the new email if it doesn't already exist
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        }
    }
});

// Add this to your existing index.js file

document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Set up initial state
    function initSlider() {
        updateSlider();
        setupAutoplay();
    }
    
    // Update slider position and active dot
    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Navigate to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    // Navigate to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Set up automatic slideshow
    let autoplayInterval;
    function setupAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Reset autoplay timer when manually changing slides
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        setupAutoplay();
    }
    
    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            resetAutoplay();
        });
    });
    
    // Pause autoplay when hovering over slider
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    sliderWrapper.addEventListener('mouseleave', () => {
        setupAutoplay();
    });
    
    // Initialize the slider
    initSlider();
});
