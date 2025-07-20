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

  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  const thankYouMessage = document.getElementById('thank-you');
  
  if (contactForm && thankYouMessage) {
    // Check if we're returning from a successful form submission
    if (window.location.hash === '#thank-you') {
      showThankYouMessage();
    }
    
    contactForm.addEventListener('submit', function(e) {
      // Let the form submit normally to Formspree
      // The thank you message will be shown when the page redirects back
      const submitBtn = contactForm.querySelector('.contact-btn');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }
    });
  }
  
  function showThankYouMessage() {
    const contactForm = document.querySelector('.contact-form');
    const thankYouMessage = document.getElementById('thank-you');
    
    if (contactForm && thankYouMessage) {
      contactForm.style.display = 'none';
      thankYouMessage.style.display = 'block';
      
      // Scroll to the thank you message
      thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Reset form and show it again after 5 seconds
      setTimeout(() => {
        contactForm.style.display = 'flex';
        thankYouMessage.style.display = 'none';
        contactForm.reset();
        
        // Reset submit button
        const submitBtn = contactForm.querySelector('.contact-btn');
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }
        
        // Remove hash from URL
        if (window.location.hash === '#thank-you') {
          history.replaceState(null, null, window.location.pathname);
        }
      }, 5000);
    }
  }
});
