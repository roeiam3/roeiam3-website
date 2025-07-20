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
    console.log('Contact form found, setting up AJAX submission');
    
    contactForm.addEventListener('submit', function(e) {
      console.log('Form submit event triggered');
      e.preventDefault(); // Prevent default form submission
      e.stopPropagation(); // Stop event bubbling
      
      const submitBtn = contactForm.querySelector('.contact-btn');
      const formData = new FormData(contactForm);
      
      console.log('Preventing default submission and starting AJAX');
      
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
        console.log('Response received:', response.status);
        if (response.ok) {
          // Success - show thank you message
          console.log('Form submitted successfully');
          showThankYouMessage();
        } else {
          // Handle errors
          throw new Error('Form submission failed with status: ' + response.status);
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
      
      return false; // Extra prevention of default behavior
    }, true); // Use capture phase
  } else {
    console.log('Contact form or thank you message not found');
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
