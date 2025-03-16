window.addEventListener('DOMContentLoaded', () => {
    console.log('Loaded Scripts')

    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 'auto',
            },
            769: {
                slidesPerView: 'auto',
            },
            1025: {
                slidesPerView: 3,
            },
            1346: {
                slidesPerView: 4,
            }
        }
    });
})

document.addEventListener('DOMContentLoaded', function () {
    const burgerButton = document.getElementById('burger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
        burgerButton.classList.toggle('open');
    };

    burgerButton?.addEventListener('click', toggleMenu);
})

document.addEventListener("DOMContentLoaded", function () {
    const wrapperForm = document.getElementById("wrapperForm");
    const form = document.getElementById("contactForm");
    const thankYouMessage = document.getElementById("thankYouMessage");
    const resetButton = document.getElementById("resetFormButton");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        axios.post("http://localhost:3000/send-form", formData)
            .then(response => {
                console.log("Success:", response.data);
                form.reset();
                wrapperForm.classList.add("hidden");
                thankYouMessage.classList.remove("hidden");
            })
            .catch(error => {
                console.error("Ошибка:", error);
            });
    });
    resetButton.addEventListener("click", function () {
        thankYouMessage.classList.add("hidden");
        wrapperForm.classList.remove("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const wrapperForm = document.getElementById("wrapperForm");
    const form = document.getElementById("contactForm");
    const thankYouMessage = document.getElementById("thankYouMessage");
    const resetButton = document.getElementById("resetFormButton");
    const form_img = document.getElementById("form-img");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Отключаем стандартную отправку формы

        const formData = new FormData(form);

        axios.post("http://localhost:3000/send-form", formData)
            .then(response => {
                console.log("Success:", response.data);
                form.reset();
                wrapperForm.classList.add("hidden");
                form_img.classList.add("lg:hidden");
                thankYouMessage.classList.remove("hidden"); // Показываем блок благодарности
            })
            .catch(error => {
                console.error("Ошибка:", error.response?.data || error.message);
            });
    });

    // Кнопка "Заполнить ещё раз"
    resetButton.addEventListener("click", function () {
        thankYouMessage.classList.add("hidden");
        wrapperForm.classList.remove("hidden");
        form_img.classList.remove("lg:hidden");
    });
});
