// script.js

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

// Gallery images data
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Wedding photography',
        category: 'wedding'
    },
    {
        src: 'https://images.unsplash.com/photo-1521334884684-d80222895322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w-800&q=80',
        alt: 'Portrait photography',
        category: 'portrait'
    },
    {
        src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Event photography',
        category: 'event'
    },
    {
        src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Wedding couple',
        category: 'wedding'
    },
    {
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Portrait session',
        category: 'portrait'
    },
    {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Corporate event',
        category: 'event'
    },
    {
        src: 'https://images.unsplash.com/photo-1492684223066-dd23140edf6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Commercial product photography',
        category: 'commercial'
    },
    {
        src: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Family portrait',
        category: 'portrait'
    },
    {
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        alt: 'Commercial photography',
        category: 'commercial'
    }
];

let currentImageIndex = 0;

// Hero Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentSlide = 0;
let slideInterval;

// Initialize the website
function init() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Initialize gallery
    initGallery();
    
    // Initialize hero slider
    initSlider();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize scroll effects
    initScrollEffects();
}

// Initialize gallery
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'gallery-img';
        img.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-search-plus';
        
        overlay.appendChild(icon);
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        galleryGrid.appendChild(galleryItem);
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => openLightbox(index));
    });
}

// Initialize hero slider
function initSlider() {
    // Start automatic slideshow
    startSlider();
    
    // Add event listeners to slider controls
    prevBtn.addEventListener('click', () => {
        pauseSlider();
        prevSlide();
        startSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        pauseSlider();
        nextSlide();
        startSlider();
    });
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pauseSlider();
            goToSlide(index);
            startSlider();
        });
    });
}

// Start automatic slider
function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Pause automatic slider
function pauseSlider() {
    clearInterval(slideInterval);
}

// Go to next slide
function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

// Go to previous slide
function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

// Go to specific slide
function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update lightbox image
function updateLightboxImage() {
    const image = galleryImages[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = image.alt;
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Go to next image in lightbox
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

// Go to previous image in lightbox
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

// Set up event listeners
function setupEventListeners() {
    // Menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Create mailto link (for demo purposes)
            const subject = `Photography Inquiry from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:hello@bigishot.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // In a real implementation, you would send this to a backend
            // For this demo, we'll show an alert and open mail client
            alert(`Thank you for your message, ${name}! I will get back to you soon.`);
            
            // Reset form
            contactForm.reset();
            
            // Open mail client (commented out for better demo experience)
            // window.location.href = mailtoLink;
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
    
    // Pause slider on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', pauseSlider);
    heroSlider.addEventListener('mouseleave', startSlider);
}

// Initialize scroll effects
function initScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);