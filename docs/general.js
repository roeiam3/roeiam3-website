// general.js - shared scripts for all pages

document.addEventListener('DOMContentLoaded', function () {
  // Example: Simple dark mode toggle (add a button with id="darkModeToggle" to use)
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
    });
  }

  // Example: Keyboard accessibility for links
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('focus', () => link.classList.add('focus'));
    link.addEventListener('blur', () => link.classList.remove('focus'));
  });
});
