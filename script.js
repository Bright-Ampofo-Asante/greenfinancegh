// script.js

function toggleMenu() {
  const navList = document.querySelector('#mainNav ul');
  navList.classList.toggle('show');
}

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
  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
  }

  // Read More / Read Less Functionality
  document.querySelectorAll('.read-more-btn').forEach(function(button) {
    button.addEventListener('click', function () {
      const paragraph = button.closest('div').previousElementSibling;
      paragraph.classList.toggle('expanded');
      button.textContent = paragraph.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
  });

  // Smooth Scroll with Offset (Banner on top)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        const section = document.getElementById(targetId);
        if (section) {
          const offset = 100; // Adjust to match banner height
          const topPosition = section.offsetTop - offset;
          window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
