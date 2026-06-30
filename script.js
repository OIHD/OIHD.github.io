/**
 * Göktuğ Yamak Portfolio - Main JavaScript
 */

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initNavigation();
    initMobileMenu();
    initTypingEffect();
    initScrollReveal();
    initActiveNavOnScroll();
    initSkillBarsAnimation();
    initContactForm();
});

/* ----- Language Toggle ----- */
function initLanguage() {
    const toggle = document.getElementById('langToggle');
    const label = document.getElementById('langLabel');
    
    // Check saved language
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLang = savedLang;
        applyLanguage(currentLang);
    }
    updateLangButton();
    
    toggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        applyLanguage(currentLang);
        updateLangButton();
        localStorage.setItem('lang', currentLang);
        
        // Restart typing with new language roles
        initTypingEffect();
    });
    
    function updateLangButton() {
        label.textContent = currentLang === 'en' ? 'TR' : 'EN';
        document.documentElement.lang = currentLang;
    }
}

function applyLanguage(lang) {
    // Text content (data-en, data-tr)
    document.querySelectorAll('[data-en][data-tr]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text !== null) {
            el.innerHTML = text;
        }
    });
    
    // Placeholders (data-en-placeholder, data-tr-placeholder)
    document.querySelectorAll('[data-en-placeholder][data-tr-placeholder]').forEach(el => {
        const placeholder = el.getAttribute(`data-${lang}-placeholder`);
        if (placeholder !== null) {
            el.placeholder = placeholder;
        }
    });
}

/* ----- Theme Toggle ----- */
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('.theme-icon');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.textContent = '☀️';
    }
    
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            icon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            icon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
}

/* ----- Navigation Scroll Effect ----- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ----- Mobile Menu ----- */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const links = menu.querySelectorAll('.mobile-link');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    function openMenu() {
        btn.classList.add('active');
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        btn.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    btn.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    overlay.addEventListener('click', closeMenu);
    
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });
}

/* ----- Typing Effect ----- */
window._typingId = 0;

function initTypingEffect() {
    const textElement = document.querySelector('.hero-typing-text');
    const rolesEn = [
        'Industrial Designer',
        'Embedded Systems Developer',
        'Linux Systems Specialist',
        'IoT Prototyping Engineer',
        'NOC Engineer'
    ];
    const rolesTr = [
        'Endüstriyel Tasarımcı',
        'Gömülü Sistem Geliştirici',
        'Linux Sistem Uzmanı',
        'IoT Prototip Mühendisi',
        'NOC Mühendisi'
    ];
    const roles = currentLang === 'tr' ? rolesTr : rolesEn;
    
    // Cancel any running typing loop
    window._typingId++;
    const myId = window._typingId;
    if (window._typingTimer) clearTimeout(window._typingTimer);
    
    // Clear the text element
    textElement.textContent = '';
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    function type() {
        // Stop if a newer typing instance has started
        if (window._typingId !== myId) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }
        
        // When word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before next word
        }
        
        window._typingTimer = setTimeout(type, typingSpeed);
    }
    
    // Start typing after a short delay
    window._typingTimer = setTimeout(type, 800);
}

/* ----- Scroll Reveal Animation ----- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-title, .about-content, .timeline-item, .project-card, ' +
        '.skill-category, .cert-card, .education-card, .contact-card'
    );
    
    // Add reveal class
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/* ----- Active Navigation on Scroll ----- */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ----- Skill Bars Animation ----- */
function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Store original width in a data attribute and trigger animation
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                
                // Force reflow
                bar.offsetHeight;
                
                // Animate to target
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

/* ----- Contact Form ----- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formStatus = document.getElementById('formStatus');
    const charCount = document.getElementById('charCount');
    const messageTextarea = document.getElementById('message');
    const honeypot = document.getElementById('website');
    
    // Char counter for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            const len = messageTextarea.value.length;
            charCount.textContent = len;
            if (len > 4500) {
                charCount.classList.add('warning');
            } else {
                charCount.classList.remove('warning');
            }
        });
    }
    
    // Real-time validation on blur
    const fields = form.querySelectorAll('input:not([tabindex="-1"]), textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            // Clear error state while typing
            if (field.parentElement.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    function validateField(field) {
        const group = field.closest('.form-group');
        
        // Skip honeypot
        if (field.tabIndex === -1) return true;
        
        // Required check
        if (field.required && !field.value.trim()) {
            group.classList.add('error');
            group.classList.remove('valid');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                group.classList.add('error');
                group.classList.remove('valid');
                return false;
            }
        }
        
        // Minlength check
        if (field.minLength && field.value.trim().length > 0 && field.value.trim().length < field.minLength) {
            group.classList.add('error');
            group.classList.remove('valid');
            return false;
        }
        
        group.classList.remove('error');
        group.classList.add('valid');
        return true;
    }
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check honeypot - if filled, silently reject (it's a bot)
        if (honeypot && honeypot.value.trim() !== '') {
            // Show fake success to bot
            showStatus('success', 'Message sent successfully!');
            return;
        }
        
        // Validate all fields
        let isValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showStatus('error', 'Please fix the errors above before sending.');
            return;
        }
        
        // Check form action is configured
        const formAction = form.getAttribute('action');
        if (formAction.includes('YOUR_FORM_ID')) {
            showStatus('error', '⚠️ Contact form not yet configured. Please update the Formspree ID in index.html.<br>Get your free form ID at <a href="https://formspree.io" target="_blank" style="color:var(--accent-light)">formspree.io</a>');
            return;
        }
        
        // Show loading
        setLoading(true);
        formStatus.hidden = true;
        
        try {
            // Rate limiting - check last submission time (30s cooldown)
            const lastSubmit = localStorage.getItem('lastFormSubmit');
            if (lastSubmit && Date.now() - parseInt(lastSubmit) < 30000) {
                throw new Error('Please wait 30 seconds before sending another message.');
            }
            
            const formData = new FormData(form);
            
            // Don't send honeypot field value
            formData.delete('website');
            
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showStatus('success', '✅ Message sent successfully! I\'ll get back to you soon.');
                form.reset();
                if (charCount) charCount.textContent = '0';
                // Clear validation states
                form.querySelectorAll('.form-group').forEach(g => {
                    g.classList.remove('error', 'valid');
                });
                // Store submission timestamp
                localStorage.setItem('lastFormSubmit', Date.now().toString());
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            showStatus('error', `❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    });
    
    function setLoading(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.hidden = true;
            btnLoading.hidden = false;
        } else {
            submitBtn.disabled = false;
            btnText.hidden = false;
            btnLoading.hidden = true;
        }
    }
    
    function showStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.innerHTML = message;
        formStatus.hidden = false;
        
        // Scroll status into view
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 8s
        if (type === 'success') {
            setTimeout(() => {
                formStatus.hidden = true;
            }, 8000);
        }
    }
}
