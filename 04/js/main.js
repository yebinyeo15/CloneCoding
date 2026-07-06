document.addEventListener('DOMContentLoaded', () => {
    const restartHeroMotion = (swiper) => {
        swiper.slides.forEach((slide) => {
            slide.classList.remove('motion-on');
        });

        requestAnimationFrame(() => {
            swiper.slides[swiper.activeIndex].classList.add('motion-on');
        });
    };

    const smoothScrollTo = (targetY, duration) => {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + distance * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const heroSwiper = new Swiper('.hero-slider', {
        loop: true,
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.hero-controls .btn-next',
            prevEl: '.hero-controls .btn-prev',
        },
        on: {
            init: (swiper) => {
                restartHeroMotion(swiper);
            },
            slideChangeTransitionStart: (swiper) => {
                restartHeroMotion(swiper);
            },
        },
    });

    const topButton = document.querySelector('.btn-top');
    const sideMenu = document.querySelector('.side-menu');
    const sideMenuItems = document.querySelectorAll('.side-menu li');
    const sideMenuLinks = document.querySelectorAll('.side-menu a');
    const menuSections = Array.from(sideMenuLinks)
        .map((link) => document.querySelector(link.getAttribute('href')));
    const themeSectionIds = ['business', 'technology', 'public'];

    const setActiveMenu = (activeItem) => {
        if (!activeItem) {
            return;
        }

        sideMenuItems.forEach((item) => {
            item.classList.remove('on');
        });

        activeItem.classList.add('on');
    };

    const setSideMenuTheme = (section) => {
        if (!sideMenu || !section) {
            return;
        }

        if (themeSectionIds.includes(section.id)) {
            sideMenu.classList.add('section-theme');
        } else {
            sideMenu.classList.remove('section-theme');
        }
    };

    const updateActiveMenuOnScroll = () => {
        const currentY = window.scrollY + window.innerHeight / 2;

        menuSections.forEach((section, index) => {
            if (!section) {
                return;
            }

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (currentY >= sectionTop && currentY < sectionBottom) {
                setActiveMenu(sideMenuItems[index]);
                setSideMenuTheme(section);
            }
        });
    };

    sideMenuLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));

            if (!target) {
                return;
            }

            setActiveMenu(link.parentElement);
            setSideMenuTheme(target);
            smoothScrollTo(target.offsetTop, 600);
        });
    });

    window.addEventListener('scroll', updateActiveMenuOnScroll);
    updateActiveMenuOnScroll();

    if (topButton) {
        topButton.addEventListener('click', (event) => {
            event.preventDefault();
            setActiveMenu(sideMenuItems[0]);
            setSideMenuTheme(menuSections[0]);
            smoothScrollTo(0, 300);
        });
    }

    void heroSwiper;
});
