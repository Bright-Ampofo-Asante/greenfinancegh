// script.js

function toggleMenu() {
  const navList = document.querySelector('#mainNav ul');
  navList.classList.toggle('show');
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slider-frame .slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${index * 100}%)`;
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

window.addEventListener('load', () => {
  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
  }

  document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
      const paragraph = button.closest('div').previousElementSibling;
      paragraph.classList.toggle('expanded');
      button.textContent = paragraph.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
  });

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

  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  }
});
