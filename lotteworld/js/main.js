const li1 = document.querySelector('.main .con2 ul li:first-child');
const li2 = document.querySelector('.main .con2 ul li:last-child');
const str1 = document.querySelector('.main .con2 ul li:first-child strong');
const str2 = document.querySelector('.main .con2 ul li:last-child strong');

const con2 = document.querySelector('.main .con2');

if (li1 && li2 && str1 && str2 && con2) {
    li1.addEventListener('mouseenter', function () {
        con2.style.backgroundImage = `url('./images/mainCon1_bg.jpg')`;
        // alert('test1');
        str1.textContent = `?꾨? 誘몄닠愿`;
    });
    li2.addEventListener('mouseenter', function () {
        con2.style.backgroundImage = `url('./images/mainCon2_bg.jpg')`;
        // alert('test2');
        str2.textContent = `濡?뜲 誘몄닠愿`;
    });
}

const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        reverseDirection: true,
    },
    navigation: {
        prevEl: '.hero-prev',
        nextEl: '.hero-next',
    },
    pagination: {
        el: '.hero-control .swiper-pagination',
        clickable: true,
    },
});

const heroPause = document.querySelector('.hero-pause');
let isHeroPaused = false;

if (heroPause) {
    heroPause.addEventListener('click', function () {
        isHeroPaused = !isHeroPaused;
        heroPause.classList.toggle('on', isHeroPaused);
        heroPause.textContent = isHeroPaused ? '재생' : '정지';

        if (isHeroPaused) {
            heroSwiper.autoplay.stop();
        } else {
            heroSwiper.autoplay.start();
        }
    });
}
