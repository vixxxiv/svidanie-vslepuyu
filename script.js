// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== КАРУСЕЛЬ =====
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const carouselContainer = document.querySelector('.carousel-container');
    let currentIndex = 0;
    const totalSlides = slides.length; // 6 слайдов

    function updateCarousel() {
        if (!slidesContainer) return;
        
        // Плавное перемещение слайдов
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновляем индикаторы
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Функция для следующего слайда
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    // Функция для предыдущего слайда
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Инициализация карусели
    if (slidesContainer && slides.length > 0) {
        
        // Клик по индикаторам
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем всплытие события
                currentIndex = index;
                updateCarousel();
            });
        });

        // ===== НАВИГАЦИЯ ПО КЛИКУ НА ЛЕВУЮ И ПРАВУЮ ПОЛОВИНЫ =====
        if (carouselContainer) {
            carouselContainer.addEventListener('click', (e) => {
                // Получаем ширину контейнера
                const containerWidth = carouselContainer.offsetWidth;
                
                // Получаем координаты клика относительно контейнера
                const clickX = e.clientX - carouselContainer.getBoundingClientRect().left;
                
                // Определяем, в какую половину кликнули
                if (clickX < containerWidth / 2) {
                    // Клик в левую половину - предыдущий слайд
                    prevSlide();
                } else {
                    // Клик в правую половину - следующий слайд
                    nextSlide();
                }
            });
        }

        // Свайп для мобильных устройств
        let touchStartX = 0;
        let touchEndX = 0;

        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchStartX - touchEndX;

            if (Math.abs(swipeDistance) < swipeThreshold) return;

            if (swipeDistance > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            }
        }
        
        // Инициализируем карусель
        updateCarousel();
    }

    // ===== ТЕКУЩИЙ ГОД В ФУТЕРЕ =====
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});