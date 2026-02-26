// Galaxy Background Animation
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
});

// Star class
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.brightness = Math.random();
        this.brightnessSpeed = (Math.random() - 0.5) * 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkle effect
        this.brightness += this.brightnessSpeed;
        if (this.brightness <= 0 || this.brightness >= 1) {
            this.brightnessSpeed *= -1;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Nebula particles
class NebulaParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 150 + 50;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.color = this.randomColor();
        this.opacity = Math.random() * 0.3;
    }

    randomColor() {
        const colors = [
            '102, 126, 234',  // Purple-blue
            '118, 75, 162',   // Deep purple
            '240, 147, 251',  // Pink
            '79, 172, 254'    // Light blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }
}

// Shooting stars
class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height / 2;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 10 + 5;
        this.angle = Math.PI / 4;
        this.opacity = 1;
        this.active = Math.random() > 0.98; // Rare occurrence
    }

    update() {
        if (this.active) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.opacity -= 0.01;

            if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
                this.reset();
            }
        } else if (Math.random() > 0.99) {
            this.reset();
            this.active = true;
        }
    }

    draw() {
        if (this.active) {
            const gradient = ctx.createLinearGradient(
                this.x, this.y,
                this.x - Math.cos(this.angle) * this.length,
                this.y - Math.sin(this.angle) * this.length
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x - Math.cos(this.angle) * this.length,
                this.y - Math.sin(this.angle) * this.length
            );
            ctx.stroke();
        }
    }
}

// Initialize arrays
let stars = [];
let nebulas = [];
let shootingStars = [];

function initStars() {
    stars = [];
    nebulas = [];
    shootingStars = [];

    // Create stars
    for (let i = 0; i < 400; i++) {
        stars.push(new Star());
    }

    // Create nebula particles
    for (let i = 0; i < 15; i++) {
        nebulas.push(new NebulaParticle());
    }

    // Create shooting stars
    for (let i = 0; i < 5; i++) {
        shootingStars.push(new ShootingStar());
    }
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(9, 10, 15, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw and update nebulas
    nebulas.forEach(nebula => {
        nebula.update();
        nebula.draw();
    });

    // Draw and update stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Draw and update shooting stars
    shootingStars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

// Initialize and start
initStars();
animate();

// Update copyright year automatically
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission - Send to WhatsApp
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Format message for WhatsApp
    const whatsappMessage = `*New Portfolio Contact*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A%0A*Message:*%0A${encodeURIComponent(message)}`;
    
    // WhatsApp number (without + or spaces)
    const phoneNumber = '94759721372';
    
    // Open WhatsApp with pre-filled message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Reset form after sending
    form.reset();
});

// Parallax effect on scroll
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    stars.forEach((star, index) => {
        const speed = (index % 3 + 1) * 0.05;
        star.y += speed;
        if (star.y > canvas.height) star.y = 0;
    });
});

// Projects Carousel
const initProjectsCarousel = () => {
    const leftArrow = document.getElementById('projectsArrowLeft');
    const rightArrow = document.getElementById('projectsArrowRight');
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = document.querySelectorAll('.project-card-link');
    const carouselContainer = document.querySelector('.projects-carousel-container');
    
    if (!projectsGrid || !leftArrow || !rightArrow || projectCards.length === 0) return;
    
    let currentIndex = 0;
    let cardsPerView = 3;
    let autoSlideInterval = null;
    
    // Calculate cards per view based on screen width
    const updateCardsPerView = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            cardsPerView = 1;
        } else if (screenWidth < 1200) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        updateCarousel();
    };
    
    // Update carousel position and button states
    const updateCarousel = () => {
        const cardWidth = projectCards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const translateX = -(currentIndex * (cardWidth + gap));
        projectsGrid.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        leftArrow.disabled = currentIndex === 0;
        rightArrow.disabled = currentIndex >= projectCards.length - cardsPerView;
    };
    
    // Auto advance to next slide
    const autoAdvance = () => {
        if (currentIndex < projectCards.length - cardsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
    };
    
    // Start auto-slide
    const startAutoSlide = () => {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(autoAdvance, 3000); // 3 seconds
    };
    
    // Stop auto-slide
    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    };
    
    // Navigate left
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide after manual interaction
        }
    });
    
    // Navigate right
    rightArrow.addEventListener('click', () => {
        if (currentIndex < projectCards.length - cardsPerView) {
            currentIndex++;
            updateCarousel();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide after manual interaction
        }
    });
    
    // Pause auto-slide on hover
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Pause auto-slide when hovering over individual project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', stopAutoSlide);
        card.addEventListener('mouseleave', startAutoSlide);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCardsPerView();
    });
    
    // Initial setup
    updateCardsPerView();
    startAutoSlide(); // Start automatic sliding
};

// Initialize carousel when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsCarousel);
} else {
    initProjectsCarousel();
}