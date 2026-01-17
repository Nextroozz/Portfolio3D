/* =====================================================
   PORTFOLIO - JAVASCRIPT INTERACTIONS
   Animations GSAP, Three.js, et interactivité
   ===================================================== */

// ===== CONFIGURATION =====
const CONFIG = {
    typingSpeed: 100,
    typingPhrases: [
        "Développeur Web Full-Stack",
        "Passionné de code créatif",
        "Diplômé 42 Paris",
        "Amateur de défis techniques",
        "Créateur d'expériences web"
    ],
    loaderDuration: 3000
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initProjectFilters();
    initProjectsCarousel();
    initSkillBars();
    initSkillsCarousel();
    initCounters();
    initParallax();
    init3DElements();
    initFormValidation();
    initSmoothScroll();
});

// ===== LOADER =====
function initLoader() {
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.loader-progress');
    const percent = document.querySelector('.loader-percent');
    
    let currentProgress = 0;
    const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress > 100) currentProgress = 100;
        
        progress.style.width = `${currentProgress}%`;
        percent.textContent = `${Math.floor(currentProgress)}%`;
        
        if (currentProgress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                initHeroAnimations();
            }, 500);
        }
    }, 50);
}

// ===== CURSEUR PERSONNALISÉ =====
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    // Cursor dot follows mouse instantly
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Faster animation for outline (increased from 0.15 to 0.25)
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.25;
        outlineY += (mouseY - outlineY) * 0.25;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Effet hover sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-planet, .nav-link, .filter-btn, input, textarea, [role="button"]');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '0.5';
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.nav-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'visible';
    });
    
    // Close menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        });
    });
}

// ===== EFFET DE FRAPPE =====
function initTypingEffect() {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = CONFIG.typingPhrases[phraseIndex];
        
        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = CONFIG.typingSpeed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause avant d'effacer
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % CONFIG.typingPhrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ===== ANIMATIONS HERO =====
function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation des lettres du titre
    const words = document.querySelectorAll('.hero-title .word');
    gsap.fromTo(words, 
        {
            y: 100,
            opacity: 0,
            rotation: 10
        },
        {
            y: 0,
            opacity: 0.9,
            rotation: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            onComplete: () => {
                // Add wave animation after entrance is done
                words.forEach(word => word.classList.add('wave-active'));
            }
        }
    );
    
    // Animation du contenu hero
    gsap.from('.hero-tag', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.7
    });
    
    gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.9
    });
    
    // Animation des éléments flottants
    gsap.to('.floating-cube', {
        y: "random(-30, 30)",
        rotation: "random(-45, 45)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            each: 0.5,
            from: "random"
        }
    });
    
    gsap.to('.floating-sphere', {
        scale: "random(0.8, 1.2)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// ===== ANIMATIONS AU SCROLL =====
function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Configuration du scroll contrôlé
    const sections = document.querySelectorAll('section');
    
    // Animation d'entrée pour chaque section
    sections.forEach((section, index) => {
        // Header de section
        const header = section.querySelector('.section-header');
        if (header) {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                    scrub: 0.5
                },
                y: 80,
                opacity: 0,
                duration: 1
            });
        }
        
        // Contenu de section avec parallax
        const content = section.querySelector('.about-container, .projects-grid, .skills-container, .timeline, .contact-container');
        if (content) {
            gsap.from(content, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                    scrub: 0.8
                },
                y: 100,
                opacity: 0,
                duration: 1.2
            });
        }
    });
    
    // Animation des textes "about"
    const aboutTexts = document.querySelectorAll('.about-text p');
    aboutTexts.forEach((text, index) => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.2
        });
        text.classList.add('visible');
    });
    
    // Animation des cartes projet avec stagger (seulement sur desktop)
    const projectCards = document.querySelectorAll('.project-card');
    if (window.innerWidth > 768) {
        gsap.from(projectCards, {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            rotation: 3,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)"
        });
    }
    
    // Animation de la timeline - chaque item prend tout l'écran
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length) {
        // Observer pour détecter l'item actif
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active from all
                    timelineItems.forEach(item => item.classList.remove('active'));
                    // Add active to current
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
        
        // Activer le premier par défaut
        if (timelineItems[0]) {
            timelineItems[0].classList.add('active');
        }
    }
    
    // Animation des skill categories avec scrub
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: index % 2 === 0 ? -80 : 80,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });
    
    // Parallax sur le background text DEVELOPER
    gsap.to('.hero-bg-text', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: 1
        },
        y: -300,
        scale: 0.8,
        opacity: 0
    });
    
    // Parallax sur le background text CONTACT
    gsap.to('.contact-bg', {
        scrollTrigger: {
            trigger: '.contact',
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: -150,
        scale: 1.1
    });
    
    // Animation du hero content lors du scroll
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: 1
        },
        y: -100,
        opacity: 0
    });
    
    // Animation des éléments 3D flottants avec parallax
    gsap.to('.floating-cube', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: 1
        },
        y: -200,
        rotation: 180,
        opacity: 0
    });
    
    gsap.to('.floating-sphere', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: 0.8
        },
        y: -150,
        scale: 0.5,
        opacity: 0
    });
    
    gsap.to('.floating-torus', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: 1.2
        },
        y: -250,
        rotation: 360,
        opacity: 0
    });
    
    // Indicateur de progression du scroll
    gsap.to('.scroll-indicator', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "20% top",
            scrub: true
        },
        opacity: 0,
        y: 30
    });
}

// ===== FILTRES PROJETS =====
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Sur mobile, désactiver les filtres pour le carrousel
    if (window.innerWidth <= 768) {
        filterBtns.forEach(btn => {
            btn.style.display = 'none';
        });
        // S'assurer que tous les projets sont visibles
        projectCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
        });
        return;
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                const categories = card.dataset.category;
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.4,
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// ===== PROJECTS CAROUSEL (MOBILE) =====
let projectsCarouselCurrentIndex = 0;

function initProjectsCarousel() {
    const isMobile = window.innerWidth <= 768;
    const grid = document.querySelector('.projects-grid');
    
    if (!isMobile) {
        // Reset sur desktop
        if (grid) {
            grid.style.transform = '';
            grid.style.display = '';
        }
        return;
    }
    
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.projects-prev');
    const nextBtn = document.querySelector('.projects-next');
    const dotsContainer = document.querySelector('.projects-dots');
    
    if (!grid || !cards.length || !prevBtn || !nextBtn || !dotsContainer) {
        console.log('Carousel elements not found');
        return;
    }
    
    // Réinitialiser toutes les cartes comme visibles pour le carousel
    cards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    const totalSlides = cards.length;
    
    if (totalSlides === 0) return;
    
    // S'assurer de commencer au premier slide
    projectsCarouselCurrentIndex = 0;
    
    // Créer les dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('project-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Projet ${i + 1}`);
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.project-dot');
    
    // Ajouter les event listeners aux dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    function updateCarousel() {
        // Déplacer la grille
        const offset = -projectsCarouselCurrentIndex * 100;
        grid.style.transform = `translateX(${offset}%)`;
        
        // Mettre à jour les dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === projectsCarouselCurrentIndex);
        });
        
        // Mettre à jour l'état des boutons
        prevBtn.style.opacity = projectsCarouselCurrentIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = projectsCarouselCurrentIndex === totalSlides - 1 ? '0.3' : '1';
    }
    
    function goToSlide(index) {
        projectsCarouselCurrentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    }
    
    function nextSlide() {
        if (projectsCarouselCurrentIndex < totalSlides - 1) {
            projectsCarouselCurrentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (projectsCarouselCurrentIndex > 0) {
            projectsCarouselCurrentIndex--;
            updateCarousel();
        }
    }
    
    // Supprimer les anciens event listeners en clonant les boutons
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    
    // Ajouter les nouveaux event listeners
    newPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
    });
    
    newNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
    });
    
    // Swipe support pour mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    grid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    grid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });
    
    // Position initiale
    grid.style.transform = 'translateX(0%)';
    updateCarousel();
}

// Initialiser au resize avec debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        projectsCarouselCurrentIndex = 0;
        initProjectsCarousel();
    }, 250);
});

// Appeler après le chargement complet
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        projectsCarouselCurrentIndex = 0;
        initProjectsCarousel();
    }, 500);
});

// ===== BARRES DE COMPÉTENCES =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                bar.style.width = `${width}%`;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== SKILLS CAROUSEL =====
function initSkillsCarousel() {
    const carousel = document.querySelector('.skills-carousel');
    if (!carousel) return;
    
    const container = document.querySelector('.carousel-container');
    const categories = container.querySelectorAll('.skill-category');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!categories.length || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const totalSlides = categories.length;
    
    function updateCarousel(newIndex) {
        // Remove active from all
        categories.forEach(cat => cat.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Update current index
        currentIndex = newIndex;
        
        // Add active to current
        categories[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        
        // Animate skill bars in the active category
        const activeBars = categories[currentIndex].querySelectorAll('.bar-fill');
        activeBars.forEach(bar => {
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = `${bar.dataset.width}%`;
            }, 100);
        });
    }
    
    function goToNext() {
        const newIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(newIndex);
    }
    
    function goToPrev() {
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel(newIndex);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const skillsSection = document.querySelector('#skills');
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        }
    });
    
    // Make sure first slide is active
    updateCarousel(0);
}

// ===== COMPTEURS ANIMÉS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// ===== EFFET PARALLAX =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax pour les cubes flottants
        const cubes = document.querySelectorAll('.floating-cube');
        cubes.forEach((cube, index) => {
            const speed = 0.1 + (index * 0.05);
            cube.style.transform = `translateY(${scrolled * speed}px) rotate(45deg)`;
        });
        
        // Parallax pour la sphère
        const sphere = document.querySelector('.floating-sphere');
        if (sphere) {
            sphere.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });
}

// ===== VOXEL CAT FOLLOW MOUSE =====
function initPixelCat() {
    const container = document.getElementById('cat3DContainer');
    const canvas = document.getElementById('catCanvas');
    if (!container || !canvas) return;
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(50, 300 / 350, 0.1, 1000);
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(300, 350);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pinkLight = new THREE.PointLight(0xFF69B4, 0.5, 10);
    pinkLight.position.set(-3, 2, 3);
    scene.add(pinkLight);
    
    let catModel = null;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    // Load GLTF model
    const loader = new THREE.GLTFLoader();
    loader.load(
        'cat/scene.gltf',
        function(gltf) {
            catModel = gltf.scene;
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(catModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.5 / maxDim;
            catModel.scale.setScalar(scale);
            
            catModel.position.x = -center.x * scale;
            catModel.position.y = -center.y * scale;
            catModel.position.z = -center.z * scale;
            
            scene.add(catModel);
        },
        function(xhr) {
            // Loading progress
        },
        function(error) {
            console.error('Error loading cat model:', error);
        }
    );
    
    // Mouse tracking - only when in skills section
    const skillsSection = document.getElementById('skills');
    let isInSkillsSection = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!isInSkillsSection) return;
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Smooth rotation following mouse
        targetRotationY = deltaX * 0.003;
        targetRotationX = deltaY * 0.002;
    });
    
    // Check if skills section is visible
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isInSkillsSection = entry.isIntersecting;
                if (!isInSkillsSection) {
                    // Reset rotation when leaving section
                    targetRotationX = 0;
                    targetRotationY = 0;
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (catModel) {
            // Smooth interpolation
            currentRotationX += (targetRotationX - currentRotationX) * 0.08;
            currentRotationY += (targetRotationY - currentRotationY) * 0.08;
            
            // Apply rotation
            catModel.rotation.x = currentRotationX;
            catModel.rotation.y = currentRotationY;
            
            // Subtle floating animation
            catModel.position.y += Math.sin(Date.now() * 0.002) * 0.001;
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// ===== ÉLÉMENTS 3D AVEC THREE.JS =====
function init3DElements() {
    // Init pixel cat
    initPixelCat();
    
    // Vérifie si Three.js est chargé
    if (typeof THREE === 'undefined') return;
    
    // Crée une scène Three.js dans le terminal
    const container = document.querySelector('.terminal-window');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(250, 250);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Crée un groupe de géométries
    const group = new THREE.Group();
    scene.add(group);
    
    // Ajoute des formes géométriques
    const geometry1 = new THREE.IcosahedronGeometry(1.5, 0);
    const material1 = new THREE.MeshBasicMaterial({
        color: 0xFF69B4,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const icosahedron = new THREE.Mesh(geometry1, material1);
    group.add(icosahedron);
    
    // Ajoute un torus
    const geometry2 = new THREE.TorusGeometry(2, 0.1, 16, 100);
    const material2 = new THREE.MeshBasicMaterial({
        color: 0xFFB6C1,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const torus = new THREE.Mesh(geometry2, material2);
    torus.rotation.x = Math.PI / 2;
    group.add(torus);
    
    // Ajoute un deuxième torus
    const torus2 = new THREE.Mesh(geometry2, material2.clone());
    torus2.material.color.setHex(0xFF69B4);
    torus2.rotation.y = Math.PI / 2;
    group.add(torus2);
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        group.rotation.x += 0.005;
        group.rotation.y += 0.01;
        
        icosahedron.rotation.x += 0.01;
        icosahedron.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Interactivité avec la souris
    let mouseX = 0, mouseY = 0;
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        gsap.to(group.rotation, {
            x: mouseY * 0.5,
            y: mouseX * 0.5,
            duration: 0.5
        });
    });
    
    container.addEventListener('mouseleave', () => {
        gsap.to(group.rotation, {
            x: 0,
            y: 0,
            duration: 0.5
        });
    });
}

// ===== VALIDATION DU FORMULAIRE =====
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    // ⚠️ CONFIGURATION EMAILJS - À REMPLACER PAR VOS PROPRES CLÉS ⚠️
    // 1. Créez un compte sur https://www.emailjs.com/
    // 2. Allez dans Email Services et connectez votre Gmail
    // 3. Créez un template dans Email Templates
    // 4. Remplacez les valeurs ci-dessous avec vos propres clés
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: '7Yy0Mive2BbnWkc_k',      // Trouvé dans Account > General
        SERVICE_ID: 'service_6zm2hk9',      // ID de votre service email
        TEMPLATE_ID: 'template_oqix7cs'     // ID de votre template
    };
    
    // Initialisation EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const message = form.querySelector('#message').value;
        
        // Animation de soumission
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.querySelector('.btn-text').textContent = 'ENVOI EN COURS...';
        submitBtn.disabled = true;
        
        // Préparation des paramètres pour EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Max' // Votre nom
        };
        
        // Envoi réel du mail via EmailJS
        emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        )
        .then(() => {
            // Succès
            submitBtn.querySelector('.btn-text').textContent = 'MESSAGE ENVOYÉ ✓';
            submitBtn.style.background = 'var(--secondary)';
            
            // Reset après 3 secondes
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        })
        .catch((error) => {
            // Erreur
            console.error('Erreur d\'envoi:', error);
            submitBtn.querySelector('.btn-text').textContent = 'ERREUR - RÉESSAYER';
            submitBtn.style.background = '#ff4444';
            
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    });
    
    // Effet de focus sur les inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EFFET DE PARTICULES =====
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        document.body.prepend(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.createParticles();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const colors = [
            { r: 255, g: 182, b: 193 },  // Light pink
            { r: 255, g: 105, b: 180 },  // Hot pink
            { r: 255, g: 20, b: 147 },   // Deep pink
            { r: 219, g: 112, b: 147 },  // Pale violet red
        ];
        
        for (let i = 0; i < this.particleCount; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 140, 66, ${0.15 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    // Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
    
    // Ajoute un message console sympa
    console.log('%c🎮 KONAMI CODE ACTIVÉ! Tu es un vrai gamer! 🎮', 
        'background: linear-gradient(90deg, #FFB6C1, #FF69B4, #FF1493); color: #000; padding: 10px 20px; font-size: 16px; font-weight: bold;');
}

// ===== INIT PARTICLES =====
// Décommentez pour activer les particules en arrière-plan
// new ParticleBackground();

// ===== INIT EASTER EGGS =====
initEasterEggs();

// ===== CONSOLE MESSAGE =====
console.log(`
%c╔══════════════════════════════════════════════════════╗
║                                                      ║
║   👋 Hey! Tu regardes dans la console?               ║
║   Tu dois être un(e) dev curieux(se)!                ║
║                                                      ║
║   📧 Contacte-moi: mseverin@student.42.fr            ║
║   🐙 GitHub: https://github.com/Nextroozz            ║
║                                                      ║
║   🎓 Diplômé 42 Paris - Ready to code! 🚀            ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
`, 'color: #FF69B4; font-family: monospace; text-shadow: 0 0 10px #FF1493;');
