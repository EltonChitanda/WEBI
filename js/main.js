// ── TOUCH DEVICE CHECK ──
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// ── NAV SCROLL REVEAL ──
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ── BURGER MENU ──
const burger = document.getElementById('burger');
const menuOverlay = document.getElementById('menuOverlay');
const navLogo = document.querySelector('.nav-logo');
const navQuote = document.querySelector('.nav-quote');

burger.addEventListener('click', () => {
    const isOpen = menuOverlay.classList.contains('open');

    if (isOpen) {
        // snap text to black immediately
        navLogo.style.color = '#1A1816';
        navQuote.style.color = '#1A1816';

        burger.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';

        // remove menu-open after panels finish sliding
        setTimeout(() => {
            nav.classList.remove('menu-open');
            navLogo.style.color = '';
            navQuote.style.color = '';
        }, 1200);

    } else {
        navLogo.style.color = '';
        navQuote.style.color = '';
        burger.classList.add('open');
        menuOverlay.classList.add('open');
        nav.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }
});

document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
        navLogo.style.color = '#1A1816';
        navQuote.style.color = '#1A1816';

        burger.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';

        setTimeout(() => {
            nav.classList.remove('menu-open');
            navLogo.style.color = '';
            navQuote.style.color = '';
        }, 1200);
    });
});

// ── CUSTOM CURSOR (desktop only) ──
if (!isTouchDevice) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // ── CURSOR COLOR ON DARK BACKGROUNDS ──
    const darkSections = document.querySelectorAll('.menu-right, .menu-left, .nav-burger');

    darkSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            dot.style.background = '#F5EFE8';
            ring.style.borderColor = '#F5EFE8';
            ring.style.background = 'rgba(245, 239, 232, 0.08)';
        });

        section.addEventListener('mouseleave', () => {
            dot.style.background = '';
            ring.style.borderColor = '';
            ring.style.background = '';
        });
    });
}