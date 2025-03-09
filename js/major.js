// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Navigation active state
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find the form in your existing HTML structure
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    // Add a unique ID to the form for easier reference
    if (newsletterForm) {
        newsletterForm.id = 'newsletter-form';
        
        // Find the email input and add an ID
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.id = 'newsletter-email';
        }
        
        // Create a subscription message element if it doesn't exist
        let subscriptionMessage = document.getElementById('subscription-message');
        if (!subscriptionMessage) {
            subscriptionMessage = document.createElement('p');
            subscriptionMessage.id = 'subscription-message';
            subscriptionMessage.className = 'subscription-message';
            newsletterForm.appendChild(subscriptionMessage);
        }
        
        // Add event listener for form submission
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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