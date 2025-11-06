// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Program cards animation on scroll
const programCards = document.querySelectorAll('.program-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

programCards.forEach(card => {
    observer.observe(card);
});

// Observer para animaciones al hacer scroll
const animatedElements = document.querySelectorAll('.fade-down, .fade-up, .scale-reveal, .flip-in');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Aplicar observer a todos los elementos animados
animatedElements.forEach(element => {
    scrollObserver.observe(element);
});

// Efecto parallax para el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Efecto de escritura para el tagline (alternativa)
function startTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        // Remover la animación CSS y aplicar una con JavaScript para mejor control
        typewriterElement.style.animation = 'none';
        typewriterElement.style.width = '0';
        
        setTimeout(() => {
            typewriterElement.style.animation = 'typewriter 2s steps(40) 1s both';
        }, 100);
    }
}

// Iniciar efectos cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    startTypewriter();
    
    // Agregar efecto de hover 3D a las tarjetas de programa
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 25;
            const angleX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});


// ===== FUNCIONALIDAD FAQ AGREGADA =====

// Funcionalidad para preguntas frecuentes
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar el item actual
            item.classList.toggle('active');
            
            // Agregar animación de escala al abrir
            if (item.classList.contains('active')) {
                item.style.animation = 'scaleReveal 0.3s ease';
            }
        });
    });
    
    // Abrir primera pregunta por defecto
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

// Efecto de escritura mejorado para FAQ
function animateFAQOnScroll() {
    const faqSection = document.querySelector('.faq-section');
    const faqItems = document.querySelectorAll('.faq-item');
    
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                faqItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = `scaleReveal 0.6s ease ${index * 0.1}s both`;
                    }, index * 100);
                });
                faqObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    if (faqSection) {
        faqObserver.observe(faqSection);
    }
}

// Llamar las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    animateFAQOnScroll();
    
    // También agregar FAQ a la navegación
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const faqLink = document.createElement('a');
        faqLink.href = '#faq';
        faqLink.textContent = 'FAQ';
        navLinks.appendChild(faqLink);
    }
});


// ===== MENÚ HAMBURGUESA PARA MÓVIL =====

function initMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.createElement('div');
    
    // Crear overlay
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);
    
    // Función para abrir/cerrar menú
    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event listeners
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', toggleMenu);
        
        // Cerrar menú al hacer click en overlay
        mobileOverlay.addEventListener('click', toggleMenu);
        
        // Cerrar menú al hacer click en un enlace
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', toggleMenu);
        });
        
        // Cerrar menú al redimensionar la ventana (si se vuelve a desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Llamar las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    animateFAQOnScroll();
    initMobileMenu(); // <-- Agregar esta línea
    
    // También agregar FAQ a la navegación (si no está ya)
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && !navLinks.querySelector('a[href="#faq"]')) {
        const faqLink = document.createElement('a');
        faqLink.href = '#faq';
        faqLink.textContent = 'FAQ';
        navLinks.appendChild(faqLink);
    }
});