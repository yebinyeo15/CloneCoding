const preventHashLink = () => {
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href="#"]');

        if (!link) return;

        event.preventDefault();
    });
};

const setSvgPathLength = () => {
    const paths = document.querySelectorAll('.svgAni path');

    paths.forEach((path) => {
        const totalLength = path.getTotalLength();

        path.style.strokeDasharray = totalLength;
    });
};

const menuOpen = () => {
    const openButton = document.querySelector('.menuOpen button.open');
    const menuWrap = document.querySelector('.menuOpen .menuWrap');
    const closeButtons = document.querySelectorAll('.menuOpen .menuWrap .close');

    if (!openButton || !menuWrap) return;

    openButton.addEventListener('click', () => {
        menuWrap.classList.add('on');
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            menuWrap.classList.remove('on');
        });
    });
};

const scrollAnimation = () => {
    const animateElements = document.querySelectorAll('.animate');

    const setAnimationStyle = (element) => {
        const { duration, delay, iteration } = element.dataset;

        if (duration) element.style.animationDuration = duration;
        if (delay) element.style.animationDelay = delay;
        if (iteration) element.style.animationIterationCount = iteration;
    };

    const checkPosition = () => {
        const windowHeight = window.innerHeight;

        animateElements.forEach((element) => {
            const animationName = element.dataset.animate;
            const offset = Number(element.dataset.offset) || 0;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + offset;
            const elementBottom = rect.bottom - offset;
            const isVisible = elementBottom >= 0 && elementTop <= windowHeight;

            if (!animationName) return;

            setAnimationStyle(element);

            if (isVisible) {
                element.style.visibility = 'visible';
                element.classList.add(animationName, 'animated');
            } else {
                element.style.visibility = 'hidden';
                element.classList.remove(animationName, 'animated');
            }
        });
    };

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);
    checkPosition();
};

const bgColor = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 1400 && scrollTop <= 2700) {
        document.body.classList.add('on');
    } else {
        document.body.classList.remove('on');
    }
};

const changeBgColor = () => {
    window.addEventListener('scroll', bgColor);
    window.addEventListener('resize', bgColor);
    bgColor();
};

(() => {
    preventHashLink();
    setSvgPathLength();
    menuOpen();
    scrollAnimation();
    changeBgColor();
})();
