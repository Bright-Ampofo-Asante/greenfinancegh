// script.js

function toggleMenu() {
  const navList = document.querySelector('#mainNav ul');
  const toggleBtn = document.querySelector('.menu-toggle');

  navList.classList.toggle('show');

  // Toggle icon between ☰ and ✖
  const isOpen = navList.classList.contains('show');
  toggleBtn.textContent = isOpen ? '✖' : '☰';

  // Close menu when a link is clicked
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('show');
      toggleBtn.textContent = '☰';
    });
  });

  // Close menu on outside click
  function handleOutsideClick(e) {
    const isClickInside = navList.contains(e.target) || toggleBtn.contains(e.target);
    if (!isClickInside) {
      navList.classList.remove('show');
      toggleBtn.textContent = '☰';
      document.removeEventListener('click', handleOutsideClick);
    }
  }

  if (isOpen) {
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 10);
  }
}

// Image slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-frame .slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${index * 100}%)`;
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

window.addEventListener('load', () => {
  // Show first slide and start auto-rotation
  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
  }

  // Read More / Read Less toggle
  document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
      const paragraph = button.closest('div').previousElementSibling;
      paragraph.classList.toggle('expanded');
      button.textContent = paragraph.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
  });

  // Smooth scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        const section = document.getElementById(targetId);
        if (section) {
          const offset = 100;
          const topPosition = section.offsetTop - offset;
          window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Close menu if resized to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      const navList = document.querySelector('#mainNav ul');
      const toggleBtn = document.querySelector('.menu-toggle');
      navList.classList.remove('show');
      toggleBtn.textContent = '☰';
    }
  });
});
