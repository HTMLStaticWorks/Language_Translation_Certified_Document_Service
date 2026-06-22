document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
    }
    
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // RTL Toggle
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    
    // Check local storage
    const savedDir = localStorage.getItem('dir');
    if (savedDir === 'rtl') {
        htmlElement.setAttribute('dir', 'rtl');
    }
    
    if(rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }

    // Mobile Menu Toggle and Action Relocation
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarActions = document.querySelector('.navbar-actions');
    const themeToggleRef = document.getElementById('theme-toggle');
    const rtlToggleRef = document.getElementById('rtl-toggle');
    
    if(mobileMenuToggleBtn && navbarMenu) {
        mobileMenuToggleBtn.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }

    const handleMobileToggles = () => {
        if (window.innerWidth <= 1024) {
            if (navbarActions && !document.querySelector('.mobile-toggles') && navbarMenu) {
                const mobileToggles = document.createElement('li');
                mobileToggles.className = 'mobile-toggles';
                mobileToggles.style.display = 'flex';
                mobileToggles.style.flexDirection = 'column';
                mobileToggles.style.gap = '1rem';
                mobileToggles.style.marginTop = '0.5rem';
                mobileToggles.style.paddingTop = '1rem';
                mobileToggles.style.borderTop = '1px solid var(--border-color)';
                
                const toggleRow = document.createElement('div');
                toggleRow.className = 'mobile-toggle-row';
                toggleRow.style.display = 'flex';
                toggleRow.style.gap = '1rem';
                toggleRow.style.justifyContent = 'flex-start';
                
                if (themeToggleRef) toggleRow.appendChild(themeToggleRef);
                if (rtlToggleRef) toggleRow.appendChild(rtlToggleRef);
                
                mobileToggles.appendChild(toggleRow);
                
                const ctas = navbarActions.querySelectorAll('.btn');
                ctas.forEach(cta => {
                    cta.style.display = 'flex';
                    cta.style.width = '100%';
                    cta.style.justifyContent = 'center';
                    mobileToggles.appendChild(cta);
                });
                
                navbarMenu.appendChild(mobileToggles);
            }
        } else {
            if (document.querySelector('.mobile-toggles')) {
                const mobileToggles = document.querySelector('.mobile-toggles');
                if (navbarActions) {
                    if (themeToggleRef) navbarActions.insertBefore(themeToggleRef, navbarActions.firstChild);
                    if (rtlToggleRef) navbarActions.insertBefore(rtlToggleRef, navbarActions.children[1]);
                    
                    const ctas = mobileToggles.querySelectorAll('.btn');
                    ctas.forEach(cta => {
                        cta.style.display = '';
                        cta.style.width = '';
                        cta.style.justifyContent = '';
                        navbarActions.appendChild(cta);
                    });
                }
                mobileToggles.remove();
            }
        }
    };

    if(themeToggleRef && rtlToggleRef && navbarMenu) {
        handleMobileToggles();
        window.addEventListener('resize', handleMobileToggles);
    }

    // Scroll Event for Navbar Glass Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Premium Staggered Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100); // Stagger effect
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Language Modal Logic
    const languageItems = document.querySelectorAll('.language-item');
    const modalOverlay = document.getElementById('language-modal');
    
    if (languageItems.length > 0 && modalOverlay) {
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalLangTitle = document.getElementById('modal-lang-title');
        const modalLangName = document.getElementById('modal-lang-name');

        languageItems.forEach(item => {
            item.addEventListener('click', () => {
                const lang = item.textContent.trim();
                modalLangTitle.textContent = lang;
                modalLangName.textContent = lang;
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Route Modal Logic
    const routeCards = document.querySelectorAll('.route-card');
    const routeModalOverlay = document.getElementById('route-modal');

    if (routeCards.length > 0 && routeModalOverlay) {
        const routeModalCloseBtn = document.getElementById('route-modal-close-btn');
        const modalRouteTitle = document.getElementById('modal-route-title');
        const modalRouteName = document.getElementById('modal-route-name');

        routeCards.forEach(card => {
            card.addEventListener('click', () => {
                const route = card.textContent.trim();
                modalRouteTitle.textContent = route;
                modalRouteName.textContent = route;
                routeModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeRouteModal = () => {
            routeModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (routeModalCloseBtn) {
            routeModalCloseBtn.addEventListener('click', closeRouteModal);
        }
        
        routeModalOverlay.addEventListener('click', (e) => {
            if (e.target === routeModalOverlay) {
                closeRouteModal();
            }
        });
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    if (counters.length > 0) {
        const counterObserverOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
                    const duration = 2000; // 2 seconds
                    
                    let current = 0;
                    let startTime = null;

                    const updateCounter = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        
                        // easeOutQuart
                        const easeProgress = 1 - Math.pow(1 - Math.min(progress / duration, 1), 4);
                        
                        current = easeProgress * target;

                        if (progress < duration) {
                            counter.innerText = current.toFixed(decimals) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toFixed(decimals) + suffix;
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, counterObserverOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Back to Top Button
    if (!document.querySelector('.auth-container') && !document.querySelector('.auth-form-wrapper')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
