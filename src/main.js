// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");



// Initialize Swiper
const swiper = new Swiper('.hero-slider', {
  effect: 'fade',
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('show');
}


// Contact form submission
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const statusDiv = document.getElementById('formStatus');
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Update button state
  submitButton.disabled = true;
  submitButton.textContent = translations[currentLanguage]['contact.form.sending'];
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: form.name.value,
        from_email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
        to_email: 'info@japaneseconsultancy.com',
      }
    );

    // Show success message
    statusDiv.textContent = translations[currentLanguage]['contact.form.success'];
    statusDiv.className = 'form-status success';
    form.reset();
  } catch (error) {
    // Show error message
    statusDiv.textContent = translations[currentLanguage]['contact.form.error'];
    statusDiv.className = 'form-status error';
  } finally {
    // Reset button state
    submitButton.disabled = false;
    submitButton.textContent = translations[currentLanguage]['contact.form.send'];
    
    // Hide status message after 5 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }
}

// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize content with default language
document.addEventListener('DOMContentLoaded', () => {
  updateContent();
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});