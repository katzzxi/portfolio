const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
let index = 1;

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".carousel-wrapper");
    const cards = document.querySelectorAll(".card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let index = 0;
    const totalCards = cards.length;
    const visibleCards = 3;
    const cardWidth = 390; // 370px + 20px (отступ)

    function updateCarousel() {
        wrapper.style.transform = `translateX(${-index * cardWidth}px)`;

        // Сбрасываем эффект поднятия
        cards.forEach(card => card.classList.remove("active"));

        // Поднимаем центральную карточку
        const centerIndex = (index + 1) % totalCards;
        cards[centerIndex].classList.add("active");
    }

    prevBtn.addEventListener("click", function () {
        index = (index - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    nextBtn.addEventListener("click", function () {
        index = (index + 1) % totalCards;
        updateCarousel();
    });

    updateCarousel();
});





