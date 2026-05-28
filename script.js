// ==========================================================================
// ATTENTE DU CHARGEMENT COMPLET DU DOM
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialisation de toutes les fonctionnalités
    initParticles();
    initTypewriter();
    initMobileMenu();
    initScrollAnimations();
    initSkillBars();
    initCounter();
    initProjectFilters();
    initContactForm();
    initScrollToTop();
    initSmoothScroll();
    initHeaderScroll();
    initDownloadCV();
});

// ==========================================================================
// 1. GÉNÉRATION DE PARTICULES ANIMÉES EN ARRIÈRE-PLAN
// ==========================================================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50; // Nombre de particules
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        
        // Taille aléatoire entre 2px et 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Durée d'animation aléatoire
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Délai aléatoire pour que les particules ne partent pas toutes en même temps
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        // Opacité variable
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Couleurs variées (violet, corail, turquoise)
        const colors = ['#6C63FF', '#FF6B6B', '#4ECDC4'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// ==========================================================================
// 2. EFFET MACHINE À ÉCRIRE (TYPEWRITER)
// ==========================================================================
function initTypewriter() {
    const texts = [
        'Développeur Full-Stack',
        'Administrateur Système',
        'Passionné de Base de Données',
        'Étudiant en Génie Informatique'
    ];
    
    const typewriterElement = document.getElementById('typewriter');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Suppression des caractères
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Plus rapide en suppression
        } else {
            // Ajout des caractères
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Vitesse normale
        }
        
        // Quand le mot est complètement écrit
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause avant de supprimer
            isDeleting = true;
        }
        // Quand le mot est complètement supprimé
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Passage au texte suivant
            typingSpeed = 500; // Petite pause avant le nouveau mot
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Démarrer l'animation après un petit délai
    setTimeout(type, 1000);
}

// ==========================================================================
// 3. MENU MOBILE HAMBURGER
// ==========================================================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle du menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ==========================================================================
// 4. ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
// ==========================================================================
function initScrollAnimations() {
    // Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1, // Déclenche quand 10% de l'élément est visible
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Ajouter la classe d'animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Éléments à animer
    const animatedElements = document.querySelectorAll(
        '.project-card, .stat-card, .skill-category, .timeline-item, .contact-card'
    );
    
    animatedElements.forEach(el => {
        // Style initial (caché)
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==========================================================================
// 5. ANIMATION DES BARRES DE COMPÉTENCES
// ==========================================================================
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    // Observer pour animer les barres quand elles deviennent visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                // Animation de la largeur
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 200);
                observer.unobserve(progressBar); // Arrêter d'observer une fois animé
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// ==========================================================================
// 6. ANIMATION DES COMPTEURS DE STATISTIQUES
// ==========================================================================
function initCounter() {
    const counters = document.querySelectorAll('.counter');
    const speed = 50; // Vitesse de l'animation (plus petit = plus rapide)
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.parentElement.getAttribute('data-count'));
                let count = 0;
                
                // Fonction récursive pour incrémenter le compteur
                const updateCounter = () => {
                    const increment = target / speed;
                    
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+'; // Ajouter le symbole +
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==========================================================================
// 7. FILTRAGE DES PROJETS
// ==========================================================================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour du bouton actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filtrer les projets avec animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    card.classList.remove('hidden');
                    // Animation d'apparition
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                }
            });
        });
    });
    
    // Bouton "Voir plus de projets" (simulation)
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Animation de chargement
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            
            setTimeout(() => {
                loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Tous les projets sont affichés';
                loadMoreBtn.style.background = '#4ECDC4';
                
                setTimeout(() => {
                    loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Voir plus de projets';
                    loadMoreBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }
}

// ==========================================================================
// 8. GESTION DU FORMULAIRE DE CONTACT
// ==========================================================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêcher l'envoi par défaut
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !email || !subject || !message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simulation d'envoi (à remplacer par votre logique d'envoi)
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message envoyé avec succès ! Merci ' + name, 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Fonction de validation d'email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Fonction d'affichage de notification
function showNotification(message, type) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles de la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.5s ease, slideOut 0.5s ease 2.5s forwards;
        background: ${type === 'success' ? '#4ECDC4' : '#FF6B6B'};
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Ajouter les animations pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==========================================================================
// 9. BOUTON RETOUR EN HAUT
// ==========================================================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Afficher/masquer le bouton selon la position de scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Remonter en haut avec animation fluide
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================================================
// 10. DÉFILEMENT FLUIDE POUR LES LIENS ANCRÉS
// ==========================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcul de la position avec offset pour le header fixe
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// 11. EFFET SUR LE HEADER AU SCROLL
// ==========================================================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// 12. TÉLÉCHARGEMENT DU CV (SIMULATION)
// ==========================================================================
function initDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animation de téléchargement
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
            
            setTimeout(() => {
                showNotification('CV téléchargé avec succès !', 'success');
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Télécharger CV';
                
                // Pour un vrai téléchargement, décommentez la ligne suivante :
                // window.open('chemin/vers/votre-cv.pdf', '_blank');
            }, 2000);
        });
    }
}

// ==========================================================================
// DÉTECTION DE LA SOURIS POUR EFFET PARALLAX SUR LA HERO IMAGE
// ==========================================================================
document.addEventListener('mousemove', (e) => {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && window.innerWidth > 1024) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
        
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// ==========================================================================
// GESTION DES ERREURS GLOBALES
// ==========================================================================
window.addEventListener('error', (e) => {
    console.error('Erreur détectée :', e.message);
    // Vous pouvez ajouter ici un système de logging ou d'envoi d'erreurs
});