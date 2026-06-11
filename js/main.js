// ── TOUCH DEVICE CHECK ──
const isTouchDevice = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ── NAV SCROLL REVEAL ──
const nav = document.getElementById('mainNav');
let isInDarkSection = false;

// ── BURGER MENU ──
const burger = document.getElementById('burger');
const menuOverlay = document.getElementById('menuOverlay');
const navLogo = document.querySelector('.nav-logo');
const navQuote = document.querySelector('.nav-quote');
let closeTimeout = null;

burger.addEventListener('click', () => {
    const isOpen = menuOverlay.classList.contains('open');

    if (isOpen) {
        if (closeTimeout) clearTimeout(closeTimeout);

        burger.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';

        navLogo.style.color = '#1A1816';
        navQuote.style.color = '#1A1816';

        closeTimeout = setTimeout(() => {
            nav.classList.remove('menu-open');
            navLogo.style.color = '';
            navQuote.style.color = '';
            closeTimeout = null;
        }, 1200);

    } else {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }

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
        if (closeTimeout) clearTimeout(closeTimeout);

        burger.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';

        navLogo.style.color = '#1A1816';
        navQuote.style.color = '#1A1816';

        closeTimeout = setTimeout(() => {
            nav.classList.remove('menu-open');
            navLogo.style.color = '';
            navQuote.style.color = '';
            closeTimeout = null;
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

    const cursorDarkSections = document.querySelectorAll('.menu-right, .menu-left, .nav-burger, .services');

    cursorDarkSections.forEach(section => {
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

// ── NAV DARK ON DARK SECTIONS ──
const serviceSection = document.getElementById('services');
const workSection = document.getElementById('work');

window.addEventListener('scroll', () => {
    if (nav.classList.contains('menu-open')) return;

    const serviceStart = serviceSection.offsetTop - nav.offsetHeight;
    const serviceEnd = serviceSection.offsetTop + serviceSection.offsetHeight - nav.offsetHeight;

    if (window.scrollY >= serviceStart && window.scrollY < serviceEnd) {
        isInDarkSection = true;
        nav.classList.add('dark');
        nav.classList.remove('scrolled');
    } else {
        isInDarkSection = false;
        nav.classList.remove('dark');

        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

const validators = {
    fullname: val => val.trim().length >= 2,
    email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    phone: val => /^[\+]?[\d\s\-\(\)]{8,}$/.test(val.trim()),
    message: val => val.trim().length >= 10
};

function validateField(id) {
    const input = document.getElementById(id);
    if (!input) return true;
    const wrap = document.getElementById('wrap-' + id);
    const err = document.getElementById('err-' + id);
    if (!wrap) return true;
    const val = input.value;
    const isOptional = !input.required;
    if (isOptional && (val === '' || val === null)) {
        input.classList.remove('error', 'valid');
        wrap.classList.remove('has-check');
        if (err) err.classList.remove('show');
        return true;
    }
    const valid = validators[id] ? validators[id](val) : val.trim() !== '';
    if (valid) {
        input.classList.remove('error');
        input.classList.add('valid');
        wrap.classList.add('has-check');
        if (err) err.classList.remove('show');
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
        wrap.classList.remove('has-check');
        if (err) err.classList.add('show');
    }
    return valid;
}

['fullname', 'business', 'email', 'phone', 'message'].forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', () => validateField(id));
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateField(id);
    });
});

const fields = ['fullname', 'business', 'email', 'phone', 'message'];
fields.forEach((id, i) => {
    const input = document.getElementById(id);
    if (!input || input.tagName === 'TEXTAREA') return;
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const next = document.getElementById(fields[i + 1]);
            if (next) next.focus();
        }
    });
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    const required = ['fullname', 'email', 'phone', 'message'];
    let allValid = true;
    required.forEach(id => { if (!validateField(id)) allValid = false; });
    if (!allValid) return;
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    try {
        const formData = new FormData(form);
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            document.getElementById('formSection').style.display = 'none';
            document.getElementById('formSuccess').classList.add('show');
        } else {
            throw new Error('Failed');
        }
    } catch (err) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Send Message →';
        alert('Something went wrong. Please try again.');
    }
});

// ── SCROLL TO CONTACT ──
const navQuoteBtn = document.getElementById('navQuote');
const contactSection = document.getElementById('contact');

navQuoteBtn.addEventListener('click', () => {
    contactSection.scrollIntoView({ behavior: 'smooth' });
});