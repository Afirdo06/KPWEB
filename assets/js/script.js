/* ================================
   SCRIPT.JS – Interactivity LSP
   ================================ */

/* 1. FAQ Accordion */
document.querySelectorAll(".accordion-title").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");

    const content = item.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

/* 2. Fade-in animation triggers */
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach((el) => observer.observe(el));

/* 3. Show / Hide Password (Login Page) */
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

if (togglePassword && passwordField) {
  togglePassword.addEventListener("click", () => {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    togglePassword.innerText = type === "password" ? "👁️" : "🙈";
  });
}

/* 4. Mobile Navigation (Hamburger Menu untuk Android) */
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  // Toggle menu saat hamburger diklik
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('show');
      
      // Prevent body scroll saat menu terbuka
      if (mobileNav.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu saat link diklik
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('show');
        document.body.style.overflow = '';
      });
    });

    // Close menu saat klik di luar menu
    document.addEventListener('click', function(e) {
      if (mobileNav.classList.contains('show') && 
          !mobileNav.contains(e.target) && 
          !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('show');
        document.body.style.overflow = '';
      }
    });

    // Close menu saat resize ke desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }
});

/* 5. Smooth Scroll untuk anchor links (Android friendly) */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

/* 6. Prevent zoom on input focus (Android) */
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    // Pastikan font-size minimal 16px untuk prevent zoom
    const computedStyle = window.getComputedStyle(input);
    const fontSize = parseFloat(computedStyle.fontSize);
    if (fontSize < 16) {
      input.style.fontSize = '16px';
    }
  });
});

/* 7. Touch feedback untuk buttons (Android) */
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('button, .btn-primary, a[class*="btn"]');
  
  buttons.forEach(button => {
    button.addEventListener('touchstart', function() {
      this.style.opacity = '0.8';
    });
    
    button.addEventListener('touchend', function() {
      this.style.opacity = '1';
    });
    
    button.addEventListener('touchcancel', function() {
      this.style.opacity = '1';
    });
  });
});

/* 8. Detect Android device */
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

// Add Android class to body if on Android
if (isAndroid()) {
  document.body.classList.add('android-device');
}

/* 9. Handle orientation change (Android) */
window.addEventListener('orientationchange', function() {
  // Close mobile menu on orientation change
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.classList.remove('active');
    mobileNav.classList.remove('show');
    document.body.style.overflow = '';
  }
});

/* 10. Lazy loading images untuk performa Android */
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});
