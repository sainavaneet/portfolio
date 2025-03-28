// assets/js/custom.js
document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.querySelector('a[href="#contact"]');
    const contactForm = document.getElementById('contact-form');
  
    if (contactLink && contactForm) {
      contactLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        if (contactForm.style.display === 'none' || contactForm.style.display === '') {
          contactForm.style.display = 'block';
        } else {
          contactForm.style.display = 'none';
        }
      });
    }
  });