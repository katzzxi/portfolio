document.addEventListener('DOMContentLoaded', () => {
    // Функционал скрытия/показа шапки при прокрутке
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollY = currentScrollY;
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.service-category, .specialist-card, .testimonial-card, .news-card, .gallery-item, .contact-info, .directions-content, .direction-item, .contact-item, .booking-form, .appointment-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animation = 'floatIn 1s ease-out forwards';
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(item => {
        if (item) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(item);
        }
    });

    // Функционал для страницы услуг
    const serviceToggles = document.querySelectorAll('.service-toggle');
    if (serviceToggles.length > 0) {
        serviceToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const details = toggle.nextElementSibling;
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

                // Закрываем все секции
                document.querySelectorAll('.service-toggle').forEach(t => {
                    t.setAttribute('aria-expanded', 'false');
                    t.querySelector('.toggle-icon').textContent = '+';
                    t.nextElementSibling.style.maxHeight = '0';
                    t.nextElementSibling.style.opacity = '0';
                });

                // Открываем или закрываем текущую секцию
                if (!isExpanded) {
                    toggle.setAttribute('aria-expanded', 'true');
                    toggle.querySelector('.toggle-icon').textContent = '−';
                    details.style.maxHeight = details.scrollHeight + 'px';
                    details.style.opacity = '1';
                }
            });
        });
    }

    // Функционал для страницы новостей
    const categoryBtns = document.querySelectorAll('.category-btn');
    const newsCards = document.querySelectorAll('.news-card');
    if (categoryBtns.length > 0 && newsCards.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;
                newsCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'flex';
                        card.style.animation = 'floatIn 0.5s ease-out forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Функционал для страницы записи
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        const dateInput = document.getElementById('date');
        const timeSelect = document.getElementById('time');
        const appointmentsList = document.getElementById('appointments-list');
        const noAppointments = document.getElementById('no-appointments');

        function generateTimeSlots() {
            timeSelect.innerHTML = '<option value="" disabled selected>Выберите время</option>';
            const startHour = 10;
            const endHour = 20;
            for (let hour = startHour; hour <= endHour; hour++) {
                const time = `${hour}:00`;
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            }
        }

        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        dateInput.addEventListener('change', generateTimeSlots);

        function loadAppointments() {
            const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            appointmentsList.innerHTML = '';
            if (appointments.length === 0) {
                noAppointments.style.display = 'block';
            } else {
                noAppointments.style.display = 'none';
                appointments.forEach((appt, index) => {
                    const li = document.createElement('li');
                    li.className = 'appointment-item';
                    li.innerHTML = `
                        ${appt.service} | ${appt.name} | ${appt.phone} | ${appt.date} | ${appt.time}
                        <button class="delete-btn" data-index="${index}">Удалить</button>
                    `;
                    appointmentsList.appendChild(li);
                    observer.observe(li);
                });
            }
        }

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const appointment = {
                service: bookingForm.service.value,
                name: bookingForm.name.value,
                phone: bookingForm.phone.value,
                date: bookingForm.date.value,
                time: bookingForm.time.value
            };
            const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            appointments.push(appointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            bookingForm.reset();
            timeSelect.innerHTML = '<option value="" disabled selected>Выберите время</option>';
            loadAppointments();
        });

        if (appointmentsList) {
            appointmentsList.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-btn')) {
                    const index = e.target.dataset.index;
                    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
                    appointments.splice(index, 1);
                    localStorage.setItem('appointments', JSON.stringify(appointments));
                    loadAppointments();
                }
            });
            loadAppointments();
        }
    }
}); 