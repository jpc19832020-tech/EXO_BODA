// Enhanced Wedding Invitation Application with Modern Animations
class WeddingInvitation {
    constructor() {
        this.config = null;
        this.countdownInterval = null;
        this.isLoaded = false;
        this.scrollElements = [];
        this.init();
    }

    async init() {
        try {
            await this.loadConfig();
            this.setupSEO();
            this.renderHero();
            this.renderStory();
            this.renderSchedule();
            this.renderCeremony();
            this.renderReception();
            this.renderDressCode();
            this.renderMaps();
            this.renderRSVP();
            this.renderGifts();
            this.renderGallery();
            this.renderGuestbook();
            this.setupCountdown();
            this.setupScrollAnimations();
            this.setupParallaxEffect();
            this.setupInteractiveElements();
            this.hideLoading();
            this.isLoaded = true;
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError();
        }
    }

    async loadConfig() {
        try {
            const response = await fetch('./config.json');
            if (!response.ok) {
                throw new Error('Failed to load config');
            }
            this.config = await response.json();
        } catch (error) {
            console.error('Error loading config:', error);
            throw error;
        }
    }

    setupSEO() {
        if (!this.config.seo) return;

        document.title = this.config.seo.title;
        document.getElementById('page-title').textContent = this.config.seo.title;
        document.getElementById('page-description').content = this.config.seo.description;
        document.getElementById('og-title').content = this.config.seo.title;
        document.getElementById('og-description').content = this.config.seo.description;
        document.getElementById('og-image').content = this.config.seo.image;
    }

    renderHero() {
        const hero = document.getElementById('hero');
        const heroImage = document.getElementById('hero-image');
        const heroNames = document.getElementById('hero-names');
        const heroDate = document.getElementById('hero-date');
        const heroHashtag = document.getElementById('hero-hashtag');
        const countdown = document.getElementById('countdown');

        // Set hero content with staggered animation
        this.animateText(heroNames, this.config.couple.names, 100);
        this.animateText(heroDate, this.config.wedding.dateFormatted, 200);
        
        if (this.config.hero.image) {
            heroImage.src = this.config.hero.image;
            heroImage.alt = `${this.config.couple.names} - Boda`;
        }

        // Show hashtag with delay
        if (this.config.wedding.hashtag) {
            setTimeout(() => {
                heroHashtag.textContent = this.config.wedding.hashtag;
                heroHashtag.classList.remove('hidden');
                heroHashtag.style.animation = 'fadeInUp 1s ease';
            }, 1500);
        }

        // Show countdown if enabled
        if (this.config.hero.showCountdown) {
            setTimeout(() => {
                countdown.classList.remove('hidden');
                this.animateCountdownItems();
            }, 2000);
        }

        hero.classList.remove('hidden');
    }

    animateText(element, text, delay = 0) {
        setTimeout(() => {
            element.style.opacity = '0';
            element.textContent = text;
            element.style.animation = 'fadeInUp 1s ease forwards';
        }, delay);
    }

    animateCountdownItems() {
        const items = document.querySelectorAll('.countdown-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.transition = 'all 0.8s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    renderStory() {
        if (!this.config.story.enabled) return;

        const storySection = document.getElementById('story');
        const storyContent = document.getElementById('story-content');

        // Create typewriter effect for story
        const text = this.config.story.content;
        storyContent.innerHTML = '';
        
        this.typewriterEffect(storyContent, text, 50);

        storySection.classList.remove('hidden');
    }

    typewriterEffect(element, text, speed = 50) {
        let i = 0;
        element.style.opacity = '1';
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        setTimeout(type, 500);
    }

    renderSchedule() {
        const scheduleItems = document.getElementById('schedule-items');
        
        if (!this.config.schedule || this.config.schedule.length === 0) return;

        scheduleItems.innerHTML = this.config.schedule.map((item, index) => `
            <div class="schedule-item" style="animation-delay: ${index * 0.2}s">
                <div class="schedule-time">${item.time}</div>
                <div class="schedule-content">
                    <div class="schedule-title">${item.title}</div>
                    <div class="schedule-description">${item.description}</div>
                </div>
            </div>
        `).join('');

        // Add hover effects
        this.addScheduleInteractions();
    }

    addScheduleInteractions() {
        const items = document.querySelectorAll('.schedule-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    renderCeremony() {
        if (!this.config.ceremony.enabled) return;

        const ceremonySection = document.getElementById('ceremony');
        const ceremonyContent = document.getElementById('ceremony-content');

        ceremonyContent.innerHTML = `
            <div class="venue-name">${this.config.ceremony.name}</div>
            <div class="venue-address">${this.config.ceremony.address}</div>
            <div class="venue-datetime">${this.config.ceremony.datetime}</div>
            ${this.config.ceremony.mapLink ? 
                `<a href="${this.config.ceremony.mapLink}" target="_blank" class="venue-link">Ver en mapa</a>` : 
                ''
            }
        `;

        ceremonySection.classList.remove('hidden');
        this.addVenueInteractions(ceremonyContent);
    }

    renderReception() {
        if (!this.config.reception.enabled) return;

        const receptionSection = document.getElementById('reception');
        const receptionContent = document.getElementById('reception-content');

        receptionContent.innerHTML = `
            <div class="venue-name">${this.config.reception.name}</div>
            <div class="venue-address">${this.config.reception.address}</div>
            <div class="venue-datetime">${this.config.reception.datetime}</div>
            ${this.config.reception.mapLink ? 
                `<a href="${this.config.reception.mapLink}" target="_blank" class="venue-link">Ver en mapa</a>` : 
                ''
            }
        `;

        receptionSection.classList.remove('hidden');
        this.addVenueInteractions(receptionContent);
    }

    addVenueInteractions(element) {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
        });
    }

    renderDressCode() {
        if (!this.config.dresscode.enabled) return;

        const dresscodeSection = document.getElementById('dresscode');
        const dresscodeContent = document.getElementById('dresscode-content');

        dresscodeContent.innerHTML = `
            <div class="dresscode-title">${this.config.dresscode.title}</div>
            <div class="dresscode-description">${this.config.dresscode.description}</div>
            ${this.config.dresscode.colors ? 
                `<div class="dresscode-colors">Colores sugeridos: ${this.config.dresscode.colors}</div>` : 
                ''
            }
            ${this.config.dresscode.restrictions ? 
                `<div class="dresscode-restrictions">${this.config.dresscode.restrictions}</div>` : 
                ''
            }
        `;

        dresscodeSection.classList.remove('hidden');
    }

    renderMaps() {
        if (!this.config.maps.enabled) return;

        const mapsSection = document.getElementById('maps');
        const mapsContainer = document.getElementById('maps-container');
        let mapsHTML = '';

        if (this.config.ceremony.enabled && this.config.ceremony.mapLink) {
            mapsHTML += `
                <div class="map-card">
                    <div class="map-title">Ceremonia</div>
                    <div class="map-iframe">
                        <iframe 
                            src="https://maps.google.com/maps?q=${encodeURIComponent(this.config.ceremony.address)}&output=embed"
                            width="100%" 
                            height="250" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            `;
        }

        if (this.config.reception.enabled && this.config.reception.mapLink) {
            mapsHTML += `
                <div class="map-card">
                    <div class="map-title">Recepción</div>
                    <div class="map-iframe">
                        <iframe 
                            src="https://maps.google.com/maps?q=${encodeURIComponent(this.config.reception.address)}&output=embed"
                            width="100%" 
                            height="250" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            `;
        }

        if (mapsHTML) {
            mapsContainer.innerHTML = mapsHTML;
            mapsSection.classList.remove('hidden');
        }
    }

    renderRSVP() {
        if (!this.config.rsvp.enabled) return;

        const rsvpForm = document.getElementById('rsvp-form-element');
        const guestsSelect = document.getElementById('rsvp-guests');

        // Populate guest options
        for (let i = 1; i <= this.config.rsvp.maxGuestsPerPerson; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i === 1 ? '1 persona' : `${i} personas`;
            guestsSelect.appendChild(option);
        }

        // Add policy if exists
        if (this.config.rsvp.policy) {
            const policyDiv = document.createElement('div');
            policyDiv.className = 'rsvp-policy';
            policyDiv.innerHTML = `<small><em>${this.config.rsvp.policy}</em></small>`;
            rsvpForm.insertBefore(policyDiv, rsvpForm.firstChild);
        }

        // Setup form submission with enhanced feedback
        rsvpForm.addEventListener('submit', (e) => this.handleRSVPSubmit(e));
        
        // Add input animations
        this.addFormInteractions(rsvpForm);
    }

    addFormInteractions(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
            });
        });
    }

    async handleRSVPSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('rsvp-name').value,
            email: document.getElementById('rsvp-email').value,
            guests: document.getElementById('rsvp-guests').value,
            message: document.getElementById('rsvp-message').value,
            timestamp: new Date().toISOString()
        };

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Enhanced loading state
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)';

        try {
            const response = await fetch(this.config.rsvp.googleSheetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                document.getElementById('rsvp-success').classList.remove('hidden');
                e.target.reset();
                this.celebrateSuccess();
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('RSVP submission error:', error);
            document.getElementById('rsvp-error').classList.remove('hidden');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }
    }

    celebrateSuccess() {
        // Create celebration animation
        const celebration = document.createElement('div');
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 10000;
            animation: celebrate 1s ease;
        `;
        celebration.textContent = '🎉';
        document.body.appendChild(celebration);
        
        setTimeout(() => celebration.remove(), 1000);
    }

    renderGifts() {
        if (!this.config.gifts.enabled) return;

        const giftsSection = document.getElementById('gifts');
        const giftsContent = document.getElementById('gifts-content');

        let buttonsHTML = '';
        
        if (this.config.gifts.registryLink) {
            buttonsHTML += `<a href="${this.config.gifts.registryLink}" target="_blank" class="gift-btn">Lista de Regalos</a>`;
        }
        
        if (this.config.gifts.cashLink) {
            buttonsHTML += `<a href="${this.config.gifts.cashLink}" target="_blank" class="gift-btn">Regalo en Efectivo</a>`;
        }

        giftsContent.innerHTML = `
            <div class="gifts-message">${this.config.gifts.message}</div>
            ${buttonsHTML ? `<div class="gifts-buttons">${buttonsHTML}</div>` : ''}
        `;

        giftsSection.classList.remove('hidden');
    }

    renderGallery() {
        if (!this.config.gallery.enabled) return;

        const gallerySection = document.getElementById('gallery');
        const galleryContent = document.getElementById('gallery-content');

        if (this.config.gallery.images && this.config.gallery.images.length > 0) {
            galleryContent.innerHTML = this.config.gallery.images.map((image, index) => `
                <div class="gallery-item" style="animation-delay: ${index * 0.1}s">
                    <img src="${image}" alt="Galería de boda" loading="lazy">
                </div>
            `).join('');

            gallerySection.classList.remove('hidden');
            this.setupGalleryInteractions();
        }
    }

    setupGalleryInteractions() {
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                this.openLightbox(item.querySelector('img'));
            });
        });
    }

    openLightbox(img) {
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const imgClone = img.cloneNode();
        imgClone.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            animation: zoomIn 0.3s ease;
        `;
        
        lightbox.appendChild(imgClone);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        });
    }

    renderGuestbook() {
        if (!this.config.guestbook.enabled) return;

        const guestbookSection = document.getElementById('guestbook');
        const guestbookContent = document.getElementById('guestbook-content');

        guestbookContent.innerHTML = `
            <div class="guestbook-message">${this.config.guestbook.message}</div>
            <form id="guestbook-form" class="guestbook-form">
                <div class="form-group">
                    <input type="text" id="guest-name" placeholder="Tu nombre" required>
                </div>
                <div class="form-group">
                    <textarea id="guest-message" placeholder="Tu mensaje para los novios" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
            </form>
            <div id="guestbook-success" class="rsvp-success hidden">
                <p>¡Gracias por tu mensaje!</p>
            </div>
        `;

        // Setup guestbook form
        document.getElementById('guestbook-form').addEventListener('submit', (e) => this.handleGuestbookSubmit(e));

        guestbookSection.classList.remove('hidden');
        this.addFormInteractions(document.getElementById('guestbook-form'));
    }

    async handleGuestbookSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('guest-name').value,
            message: document.getElementById('guest-message').value,
            timestamp: new Date().toISOString()
        };

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(this.config.guestbook.googleSheetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                document.getElementById('guestbook-success').classList.remove('hidden');
                e.target.reset();
                this.celebrateSuccess();
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Guestbook submission error:', error);
            alert('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    setupCountdown() {
        if (!this.config.hero.showCountdown) return;

        const weddingDate = new Date(this.config.wedding.date);
        
        const updateCountdown = () => {
            const now = new Date();
            const difference = weddingDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                this.animateNumber('countdown-days', days);
                this.animateNumber('countdown-hours', hours);
                this.animateNumber('countdown-minutes', minutes);
                this.animateNumber('countdown-seconds', seconds);
            } else {
                clearInterval(this.countdownInterval);
                document.getElementById('countdown').innerHTML = '<p style="color: white; font-size: 1.5rem;">¡El día ha llegado! 🎉</p>';
            }
        };

        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1000);
    }

    animateNumber(elementId, newValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent);
        
        if (currentValue !== newValue) {
            element.style.transform = 'scale(1.2)';
            element.textContent = newValue;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s ease';
            observer.observe(section);
        });
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-background img');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupInteractiveElements() {
        // Add floating elements
        this.createFloatingElements();
        
        // Add smooth scroll behavior
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

        // Add hover sound effects (optional)
        this.addHoverEffects();
    }

    createFloatingElements() {
        const hero = document.querySelector('.hero');
        for (let i = 0; i < 4; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            hero.appendChild(element);
        }
    }

    addHoverEffects() {
        const interactiveElements = document.querySelectorAll('.btn, .venue-link, .gift-btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s ease';
            });
        });
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 800);
    }

    showError() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(244, 67, 54, 0.9);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            z-index: 10000;
        `;
        errorDiv.innerHTML = '<h2>Error al cargar el sitio</h2><p>Por favor, recarga la página.</p>';
        document.body.appendChild(errorDiv);
    }
}

// Add custom animations to the page
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from { transform: scale(0.8); }
        to { transform: scale(1); }
    }
    
    @keyframes celebrate {
        0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); }
        50% { transform: translate(-50%, -50%) scale(1.2) rotate(180deg); }
        100% { transform: translate(-50%, -50%) scale(1) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new WeddingInvitation();
});