// Sidebar Toggle
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
  sidebar.style.width = '250px';
  sidebar.classList.add('active');
  hamburger.style.display = 'none';
  closeBtn.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  sidebar.style.width = '0';
  sidebar.classList.remove('active');
  hamburger.style.display = 'block';
  closeBtn.style.display = 'none';
});

// Theme Toggle
const themeItem = document.querySelector('.theme-item');
themeItem.addEventListener('click', (e) => {
  e.preventDefault();
  themeItem.classList.toggle('active');
});

const themeOptions = document.querySelectorAll('.theme-option');
themeOptions.forEach(option => {
  option.addEventListener('click', (e) => {
    e.preventDefault();
    const theme = option.getAttribute('data-theme');
    document.body.setAttribute('data-theme', theme);
    themeItem.classList.remove('active');
    sidebar.style.width = '0';
    sidebar.classList.remove('active');
    hamburger.style.display = 'block';
    closeBtn.style.display = 'none';
  });
});

// Gallery Animation
const galleryCards = document.querySelectorAll('.gallery-card');

function checkVisibility() {
  galleryCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isVisible = rect.top >= 0 && rect.top < windowHeight * 0.75;
    card.classList.toggle('visible', isVisible);
  });

  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isVisible = rect.top >= 0 && rect.top < windowHeight;
    if (isVisible && !item.classList.contains('counted')) {
      countUp(item);
      item.classList.add('counted');
    }
  });
}

function countUp(item) {
  const number = item.querySelector('.number');
  let target = 0;
  if (item.querySelector('.fixed-label').textContent === 'ЛЕТ') target = 10;
  else if (item.querySelector('.fixed-label').textContent === '+') target = 300;
  else if (item.querySelector('.fixed-label').textContent === '') target = 20;
  let count = 0;
  const duration = 2000;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    count = Math.floor(progress * target);
    number.textContent = count;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      number.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);




// форма
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form && submitBtn) {
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        comment: formData.get('comment')
      };
      console.log('Form submitted:', data);
      form.reset(); // Очищает форму после отправки
    } else {
      form.reportValidity(); // Показывает ошибки валидации
    }
  });
}





function checkFooterVisibility() {
  const footerLogo = document.querySelector('.footer_logo img');
  const footerContactItems = document.querySelectorAll('.footer_contacts .contact_item');

  if (footerLogo) {
    const rect = footerLogo.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isVisible = rect.top >= 0 && rect.top < windowHeight * 0.75;
    footerLogo.classList.toggle('visible', isVisible);
  }

  footerContactItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isVisible = rect.top >= 0 && rect.top < windowHeight * 0.75;
    item.classList.toggle('visible', isVisible);
  });
}

window.addEventListener('scroll', checkFooterVisibility);
window.addEventListener('load', checkFooterVisibility);





function parallaxEffect() {
  const parallaxText = document.querySelector('.parallax-text');
  if (parallaxText) {
    const scrollPosition = window.scrollY;
    const parallaxSection = document.querySelector('.parallax-section');
    const sectionTop = parallaxSection.getBoundingClientRect().top + window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Проверяем, видна ли секция
    if (scrollPosition >= sectionTop - windowHeight && scrollPosition <= sectionTop + parallaxSection.offsetHeight) {
      const offset = (scrollPosition - sectionTop) * 0.2; // Скорость смещения текста
      parallaxText.style.transform = `translateY(${offset}px)`;
    }
  }
}

window.addEventListener('scroll', parallaxEffect);
window.addEventListener('load', parallaxEffect);











document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const sliderCards = document.querySelectorAll('.slider-card');
  const prevButton = document.querySelector('.slider-prev');
  const nextButton = document.querySelector('.slider-next');
  const sliderContainer = document.querySelector('.slider-container');
  let currentIndex = 0;
  let cardWidth = 0;
  let isTransitioning = false;

  // Клонируем карточки для зацикленного эффекта
  const firstCards = Array.from(sliderWrapper.children).slice(0, 3);
  const lastCards = Array.from(sliderWrapper.children).slice(-3);
  
  // Добавляем клоны в начало и конец
  lastCards.forEach(card => {
    const clone = card.cloneNode(true);
    sliderWrapper.insertBefore(clone, sliderWrapper.firstChild);
  });
  
  firstCards.forEach(card => {
    const clone = card.cloneNode(true);
    sliderWrapper.appendChild(clone);
  });

  function updateCardWidth() {
    if (window.innerWidth > 1240) {
      cardWidth = 320; // 300px + 20px gap
    } else if (window.innerWidth > 768) {
      cardWidth = 270; // 250px + 20px gap
    } else {
      cardWidth = 220; // 200px + 20px gap
    }
    
    // Устанавливаем начальную позицию
    currentIndex = 3; // Начинаем с первой оригинальной карточки
    sliderWrapper.style.transition = 'none';
    updateSlider();
  }

  function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    sliderWrapper.style.transition = 'transform 0.5s ease';
    updateSlider();

    // Проверяем, нужно ли перепрыгнуть в начало
    if (currentIndex >= sliderCards.length + 3) {
      setTimeout(() => {
        sliderWrapper.style.transition = 'none';
        currentIndex = 3;
        updateSlider();
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    sliderWrapper.style.transition = 'transform 0.5s ease';
    updateSlider();

    // Проверяем, нужно ли перепрыгнуть в конец
    if (currentIndex < 3) {
      setTimeout(() => {
        sliderWrapper.style.transition = 'none';
        currentIndex = sliderCards.length + 2;
        updateSlider();
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  nextButton?.addEventListener('click', nextSlide);
  prevButton?.addEventListener('click', prevSlide);

  // Автоматическая прокрутка
  let autoSlide = setInterval(nextSlide, 5000);
  sliderContainer?.addEventListener('mouseenter', () => clearInterval(autoSlide));
  sliderContainer?.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 5000));

  // Инициализация и обновление при изменении размера окна
  updateCardWidth();
  window.addEventListener('resize', () => {
    updateCardWidth();
  });
});






















document.addEventListener('DOMContentLoaded', () => {
  // Загружаем сохранённую тему из localStorage
  const savedTheme = localStorage.getItem('theme') || 'light'; // По умолчанию светлая
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Обработчик для переключения тем
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault(); // Предотвращаем переход по href="#"
      const selectedTheme = option.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('theme', selectedTheme); // Сохраняем в localStorage
    });
  });
});