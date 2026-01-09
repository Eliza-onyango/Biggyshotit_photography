// script.js - Enhanced Version

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const currentYearSpan = document.getElementById('currentYear');
const themeToggle = document.querySelector('.theme-toggle');
const loadingScreen = document.querySelector('.loading-screen');
const progressBar = document.querySelector('.progress-bar');
const backToTop = document.querySelector('.back-to-top');
const filterButtons = document.querySelectorAll('.filter-btn');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialPrev = document.querySelector('.prev-btn');
const testimonialNext = document.querySelector('.next-btn');
const testimonialDots = document.querySelectorAll('.slider-dots .dot');

// Gallery images data
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Wedding photography',
        category: 'wedding',
        title: 'Elegant Wedding Portraits'
    },
    {
        src: 'https://images.unsplash.com/photo-1521334884684-d80222895322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w-800&q=80',
        alt: 'Portrait photography',
        category: 'portrait',
        title: 'Professional Headshots'
    },
    {
        src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Event photography',
        category: 'event',
        title: 'Corporate Event Coverage'
    },
    {
        src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Wedding couple',
        category: 'wedding',
        title: 'Romantic Wedding Moments'
    },
    {
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Portrait session',
        category: 'portrait',
        title: 'Lifestyle Portrait Session'
    },
    {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Corporate event',
        category: 'event',
        title: 'Business Conference'
    },
    {
        src: 'https://images.unsplash.com/photo-1492684223066-dd23140edf6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Commercial product photography',
        category: 'commercial',
        title: 'Product Photography'
    },
    {
        src: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Family portrait',
        category: 'portrait',
        title: 'Family Portrait Session'
    },
    {
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Commercial photography',
        category: 'commercial',
        title: 'Brand Commercial Shoot'
    }
];

// Global variables
let currentImageIndex = 0;
let currentTestimonialIndex = 0;
let currentHeroSlide = 0;
let testimonialInterval;
let heroSliderInterval;
let filteredImages = [...galleryImages];

// Initialize the website
function init() {
    // Simulate loading progress
    simulateLoading();
    
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Initialize hero slider
    initHeroSlider();
    
    // Initialize gallery
    initGallery();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize scroll effects and animations
    initScrollEffects();
    
    // Initialize AOS (Animate On Scroll) functionality
    initAOS();
    
    // Initialize counter animations
    initCounters();
}

// Simulate loading progress
function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('loaded');
                // Start animations after loading
                setTimeout(() => {
                    document.body.classList.add('loaded');
                }, 500);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
}

// Initialize hero slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero .slide');
    
    function nextSlide() {
        slides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % slides.length;
        slides[currentHeroSlide].classList.add('active');
    }
    
    // Auto-slide every 5 seconds
    heroSliderInterval = setInterval(nextSlide, 5000);
}

// Initialize gallery
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';
    
    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        galleryItem.dataset.category = image.category;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'gallery-img';
        img.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        const category = document.createElement('div');
        category.className = 'gallery-category';
        category.textContent = image.category.charAt(0).toUpperCase() + image.category.slice(1);
        
        const title = document.createElement('div');
        title.className = 'gallery-title';
        title.textContent = image.title;
        
        overlay.appendChild(category);
        overlay.appendChild(title);
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        galleryGrid.appendChild(galleryItem);
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => openLightbox(index));
    });
}

// Filter gallery
function filterGallery(category) {
    if (category === 'all') {
        filteredImages = [...galleryImages];
    } else {
        filteredImages = galleryImages.filter(image => image.category === category);
    }
    
    initGallery();
    
    // Add animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('aos-animate');
    });
}

// Initialize testimonial slider
function initTestimonialSlider() {
    updateTestimonialSlider();
    startTestimonialAutoSlide();
}

// Update testimonial slider position
function updateTestimonialSlider() {
    testimonialTrack.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
    
    // Update dots
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialIndex);
    });
}

// Go to specific testimonial slide
function goToTestimonial(index) {
    currentTestimonialIndex = index;
    updateTestimonialSlider();
}

// Next testimonial slide
function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
    updateTestimonialSlider();
}

// Previous testimonial slide
function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateTestimonialSlider();
}

// Start automatic testimonial slider
function startTestimonialAutoSlide() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Stop automatic testimonial slider
function stopTestimonialAutoSlide() {
    clearInterval(testimonialInterval);
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update counter
    const currentIndexEl = document.querySelector('.current-index');
    const totalImagesEl = document.querySelector('.total-images');
    
    if (currentIndexEl && totalImagesEl) {
        currentIndexEl.textContent = currentImageIndex + 1;
        totalImagesEl.textContent = filteredImages.length;
    }
}

// Update lightbox image
function updateLightboxImage() {
    const image = filteredImages[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = image.title;
    
    // Update counter
    const currentIndexEl = document.querySelector('.current-index');
    if (currentIndexEl) {
        currentIndexEl.textContent = currentImageIndex + 1;
    }
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Go to next image in lightbox
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

// Go to previous image in lightbox
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

// Toggle theme (dark/light mode)
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // If it's a stat number, start counting
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
}

// Animate counter numbers
function initCounters() {
    // This will be triggered by the Intersection Observer
}

function animateCounter(element) {
    if (element.getAttribute('data-animated') === 'true') return;
    
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.setAttribute('data-animated', 'true');
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Set up event listeners
function setupEventListeners() {
    // Menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Default to light theme
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h4>Thank You, ${name}!</h4>
                <p>Your message has been sent successfully. I'll get back to you within 24 hours.</p>
            `;
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // In a real implementation, you would send this to a backend
            // For this demo, we'll just show the success message
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(() => {
                contactForm.innerHTML = `
                    <h3>Send Me a Message</h3>
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Your Full Name" required>
                        <label for="name">Your Name</label>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Your Email Address" required>
                        <label for="email">Your Email</label>
                    </div>
                    <div class="form-group">
                        <select id="service" name="service">
                            <option value="" disabled selected>Select a Service</option>
                            <option value="wedding">Wedding Photography</option>
                            <option value="portrait">Portrait Photography</option>
                            <option value="event">Event Coverage</option>
                            <option value="commercial">Commercial Photography</option>
                            <option value="other">Other Inquiry</option>
                        </select>
                        <label for="service">Service Interested In</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="4" placeholder="Tell me about your project..." required></textarea>
                        <label for="message">Your Message</label>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <span>Send Message</span>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                `;
                
                // Re-attach event listener to the new form
                document.getElementById('contactForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    setupEventListeners();
                });
            }, 5000);
        });
    }
    
    // Lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
    
    // Back to top button
    window.addEventListener('scroll', toggleBackToTop);
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Portfolio filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter gallery
            const filter = button.getAttribute('data-filter');
            filterGallery(filter);
        });
    });
    
    // Testimonial slider controls
    testimonialPrev.addEventListener('click', () => {
        stopTestimonialAutoSlide();
        prevTestimonial();
        startTestimonialAutoSlide();
    });
    
    testimonialNext.addEventListener('click', () => {
        stopTestimonialAutoSlide();
        nextTestimonial();
        startTestimonialAutoSlide();
    });
    
    // Testimonial dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopTestimonialAutoSlide();
            goToTestimonial(index);
            startTestimonialAutoSlide();
        });
    });
    
    // Pause auto-slide on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.addEventListener('mouseenter', stopTestimonialAutoSlide);
    testimonialSlider.addEventListener('mouseleave', startTestimonialAutoSlide);
    
    // Form input animations
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Toggle back to top button visibility
function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Initialize scroll effects
function initScrollEffects() {
    // Initial check for back to top button
    toggleBackToTop();
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleBackToTop);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);