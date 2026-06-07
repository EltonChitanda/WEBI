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

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menuOverlay.classList.toggle('open');
    nav.classList.toggle('menu-open');
    document.body.style.overflow = menuOverlay.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        menuOverlay.classList.remove('open');
        nav.classList.remove('menu-open');
        document.body.style.overflow = '';
    });
});

// ── CUSTOM CURSOR ──
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