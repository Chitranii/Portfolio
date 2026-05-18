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

        if (pageYOffset >= sectionTop - 200) {
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
    topBtn.style.display = 'block';
    } 
    
    else {
        topBtn.style.display = 'none';
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

let darkMode = true;

themeToggle.addEventListener('click', () => {

    if (darkMode) {

        document.documentElement.style.setProperty('--bg', '#f5f5f5');
        document.documentElement.style.setProperty('--card', '#ffffff');
        document.documentElement.style.setProperty('--text', '#111111');
        document.documentElement.style.setProperty('--subtext', '#444444');

        document.body.style.background =
            'linear-gradient(to right, #eaeaea, #dcdcdc, #f5f5f5)';

        themeToggle.innerHTML = '☀️';

        darkMode = false;

    } 
    
    else {

        document.documentElement.style.setProperty('--bg', '#0f0c29');
        document.documentElement.style.setProperty('--card', '#1a1a2e');
        document.documentElement.style.setProperty('--text', '#ffffff');
        document.documentElement.style.setProperty('--subtext', '#cfcfcf');

        document.body.style.background =
            'linear-gradient(to right, #0f0c29, #302b63, #24243e)';

        themeToggle.innerHTML = '🌙';

        darkMode = true;
    }

});


// ================= FADE IN ON LOAD =================

window.addEventListener('load', () => {

    document.body.style.opacity = '1';

});