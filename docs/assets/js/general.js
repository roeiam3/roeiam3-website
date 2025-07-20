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

  // Contact form handling with AJAX
  const contactForm = document.querySelector('.contact-form');
  const thankYouMessage = document.getElementById('thank-you');
  
  if (contactForm && thankYouMessage) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
      
      const submitBtn = contactForm.querySelector('.contact-btn');
      const formData = new FormData(contactForm);
      
      // Update button state
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }
      
      // Submit form via AJAX
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Success - show thank you message
          showThankYouMessage();
        } else {
          // Handle errors
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
        
        // Reset button on error
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }
      });
    });
  }
  
  function showThankYouMessage() {
    const contactForm = document.querySelector('.contact-form');
    const thankYouMessage = document.getElementById('thank-you');
    const submitBtn = contactForm.querySelector('.contact-btn');
    
    if (contactForm && thankYouMessage) {
      // Hide form and show thank you message
      contactForm.style.display = 'none';
      thankYouMessage.style.display = 'block';
      
      // Scroll to the thank you message
      thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Reset form and show it again after 4 seconds
      setTimeout(() => {
        contactForm.style.display = 'flex';
        thankYouMessage.style.display = 'none';
        
        // Reset form fields
        contactForm.reset();
        
        // Reset submit button
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }
      }, 4000);
    }
  }
});
