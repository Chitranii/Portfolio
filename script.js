// ================= PARTICLES =================

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, 150);
});

const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1
}));

let animId;
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = document.body.classList.contains('light');
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isLight
            ? `rgba(124,58,237,${p.alpha})`
            : `rgba(170,107,228,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    animId = requestAnimationFrame(drawParticles);
}

drawParticles();

document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else drawParticles();
});


// ================= CUSTOM CURSOR =================

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 80);
});

document.querySelectorAll('a, button, .skill, .card').forEach(el => {
    el.addEventListener('mouseenter', () => follower.style.transform = 'translate(-50%, -50%) scale(1.6)');
    el.addEventListener('mouseleave', () => follower.style.transform = 'translate(-50%, -50%) scale(1)');
});


// ================= CARD GLOW SPOTLIGHT =================

document.querySelectorAll('.card').forEach(card => {
    const spot = document.createElement('div');
    spot.classList.add('glow-spot');
    card.appendChild(spot);

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        spot.style.left = (e.clientX - rect.left) + 'px';
        spot.style.top  = (e.clientY - rect.top)  + 'px';
    });
});


// ================= MAGNETIC BUTTONS =================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translateY(-3px) translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) translate(0,0)';
    });
});


// ================= 3D TILT EFFECT =================

document.querySelectorAll('.card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -8;
        const rotateY = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
});


// ================= STAT COUNTER ANIMATION =================

const statCards = document.querySelectorAll('.stat-card h2');

const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const endVal = parseInt(target.innerText);
            const suffix = endVal < 100 ? '+' : '';
            let current = 0;
            const step = Math.ceil(endVal / 40);
            const timer = setInterval(() => {
                current += step;
                if (current >= endVal) {
                    target.innerText = endVal + suffix;
                    clearInterval(timer);
                } else {
                    target.innerText = current + suffix;
                }
            }, 40);
            countObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => countObserver.observe(card));


// ================= TYPED JS =================

var typed = new Typed('#element', {
    strings: [
        'Frontend Developer',
        'Full Stack Intern',
        'Tech Enthusiast'
    ],
    typeSpeed: 60,
    backSpeed: 35,
    loop: true
});


// ================= AOS =================

AOS.init({
    duration: 1000,
    once: true
});


// ================= MOBILE NAVBAR =================

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// ================= CLOSE MENU ON LINK CLICK =================

document.querySelectorAll('.nav-links a').forEach(link => {

    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });

});


// ================= ACTIVE NAVBAR =================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }

    });

    navItems.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }

    });

});


// ================= SCROLL TO TOP BUTTON =================

const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {

    if (window.scrollY > 300) {
        topBtn.classList.add('visible');
    } else {
        topBtn.classList.remove('visible');
    }

});

topBtn.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});


// ================= SCROLL PROGRESS BAR =================

const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";

});


// ================= THEME TOGGLE =================

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeToggle.innerHTML = isLight ? '🌙' : '☀️';
});


// ================= FADE IN ON LOAD =================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, i) => {
        skill.classList.add('skill-hidden');
        setTimeout(() => skill.classList.add('skill-visible'), 300 + i * 70);
    });
});