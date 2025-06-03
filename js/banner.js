document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.dynamic-banner');
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000; // Cambiar slide cada 5 segundos
    let slideTimer;
    let isHovered = false;

    function showSlide(index) {
        // Asegurar que el índice esté dentro del rango
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // Remover clase active de todos los slides y dots
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.zIndex = 1;
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Configurar el nuevo slide activo
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.zIndex = 2;
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideTimer() {
        if (slideTimer) clearInterval(slideTimer);
        slideTimer = setInterval(() => {
            if (!isHovered) nextSlide();
        }, slideInterval);
    }

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startSlideTimer(); // Reiniciar el temporizador después de un clic
        });
    });

    // Event listeners para navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            startSlideTimer();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            startSlideTimer();
        }
    });

    // Event listeners para pausar en hover
    banner.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    banner.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    // Agregar navegación táctil
    let touchStartX = 0;
    let touchEndX = 0;

    banner.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    banner.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Mínima distancia para considerar un swipe
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevSlide(); // Swipe derecha
            } else {
                nextSlide(); // Swipe izquierda
            }
            startSlideTimer();
        }
    }

    // Iniciar el carrusel
    showSlide(0);
    startSlideTimer();
}); 