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

    const swiper2 = new Swiper(".mySwiper2", {
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
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

    const swiper4 = new Swiper(".mySwiper4", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
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
                slidesPerView: 3,
            }
        }
    });

    const swiper5 = new Swiper(".mySwiper5", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    })

    const swiper6 = new Swiper(".mySwiper6", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            769: {
                slidesPerView: 1,
            },
            1025: {
                slidesPerView: 2,
            },
            1346: {
                slidesPerView: 2,
            }
        }
    });
})

window.addEventListener('DOMContentLoaded', () => {
    let swiper3;

    function initSwiper() {
        if (window.innerWidth < 1024) {
            if (!swiper3) {
                swiper3 = new Swiper(".mySwiper3", {
                    loop: false,
                    spaceBetween: 20,
                    slidesPerView: 'auto',
                    pagination: {
                        el: ".swiper-pagination",
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                });
            }
        } else {
            if (swiper3) {
                swiper3.destroy(true, true);
                swiper3 = null;
            }
        }
    }

    initSwiper();
    window.addEventListener("resize", initSwiper);
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
    const wrapperForm = document.getElementById("wrapperFormSmall");
    const form = wrapperForm.querySelector("form");
    const thankYouMessage = document.getElementById("thankYouMessageSmall");
    const resetButton = document.getElementById("resetFormButton_small");

    // Функция для отображения ошибки
    function showError(input, message) {
        const errorText = input.closest(".form-group").querySelector("small");
        errorText.textContent = message;
        errorText.classList.remove("hidden");
    }

    // Функция для очистки ошибки
    function clearError(input) {
        const errorText = input.closest(".form-group").querySelector("small");
        errorText.classList.add("hidden");
    }

    // Функция для валидации формы
    function validateForm() {
        let isValid = true;

        const fullName = document.getElementById("nameID_small");
        const email = document.getElementById("mailID_small");
        const consent = form.querySelector("input[name='consent']");

        // Проверка поля "Full name"
        if (fullName.value.trim() === "") {
            showError(fullName, "Full name is required");
            isValid = false;
        } else {
            clearError(fullName);
        }

        // Проверка email
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Enter a valid email");
            isValid = false;
        } else {
            clearError(email);
        }

        // Проверка согласия
        if (!consent.checked) {
            showError(consent, "You must accept the terms");
            isValid = false;
        } else {
            clearError(consent);
        }

        return isValid;
    }

    // Обработчик отправки формы
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData(form);

        axios.post("http://localhost:3000/send-form", formData)
            .then(response => {
                console.log("Success:", response.data);
                form.reset();
                wrapperForm.classList.add("hidden");
                thankYouMessage.classList.remove("hidden");
            })
            .catch(error => {
                console.error("Error:", error.response?.data || error.message);
            });
    });

    // Обработчик кнопки "Return to the Form"
    resetButton.addEventListener("click", function () {
        thankYouMessage.classList.add("hidden");
        wrapperForm.classList.remove("hidden");
    });
});
