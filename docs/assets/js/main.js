// main.js: handles dark mode toggle and accessibility/animation only. No homepage-specific logic. Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function getPreferredTheme() {
  return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

darkModeToggle && darkModeToggle.addEventListener('click', toggleTheme);

// main.js: handles dark mode toggle and accessibility/animation only. No homepage-specific logic. Set initial theme
setTheme(getPreferredTheme());

// main.js: handles dark mode toggle and accessibility/animation only. No homepage-specific logic. Animate elements on scroll
function animateOnScroll() {
  const animated = document.querySelectorAll('.card, .activity-block, .about, .hero-avatar');
  animated.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.style.animationPlayState = 'running';
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// main.js: handles dark mode toggle and accessibility/animation only. No homepage-specific logic. Accessibility: Keyboard navigation for nav
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('focus', () => link.classList.add('active'));
  link.addEventListener('blur', () => link.classList.remove('active'));
});

