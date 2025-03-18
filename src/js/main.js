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
    const wrapperForm = document.getElementById("wrapperForm");
    const form = document.getElementById("contactForm");
    const thankYouMessage = document.getElementById("thankYouMessage");
    const resetButton = document.getElementById("resetFormButton");
    const form_img = document.getElementById("form-img");

    function showError(input, message) {
        let errorText;

        if (input.type === "checkbox") {
            errorText = input.closest("label").nextElementSibling; // <small> после label
        } else {
            errorText = input.nextElementSibling; // <small> после input
        }

        errorText.textContent = message;
        errorText.classList.remove("hidden");
    }

    function clearError(input) {
        let errorText;

        if (input.type === "checkbox") {
            errorText = input.closest("label").nextElementSibling;
        } else {
            errorText = input.nextElementSibling;
        }

        errorText.classList.add("hidden");
    }

    function validateForm() {
        let isValid = true;

        const firstName = document.getElementById("nameID");
        const lastName = document.getElementById("last-nameID");
        const phone = document.getElementById("phoneID");
        const email = document.getElementById("mailID");
        const consent = form.querySelector("input[name='consent']");

        if (firstName.value.trim() === "") {
            showError(firstName, "First name is required");
            isValid = false;
        } else {
            clearError(firstName);
        }

        if (lastName.value.trim() === "") {
            showError(lastName, "Last name is required");
            isValid = false;
        } else {
            clearError(lastName);
        }

        const phonePattern = /^\d{10,}$/;
        if (!phonePattern.test(phone.value.trim())) {
            showError(phone, "Enter a valid phone number (10+ digits)");
            isValid = false;
        } else {
            clearError(phone);
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Enter a valid email");
            isValid = false;
        } else {
            clearError(email);
        }

        if (!consent.checked) {
            showError(consent, "You must accept the terms");
            isValid = false;
        } else {
            clearError(consent);
        }

        return isValid;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData(form);

        axios.post("http://localhost:3000/send-form", formData)
            .then(response => {
                console.log("Success:", response.data);
                form.reset();
                wrapperForm.classList.add("hidden");
                form_img.classList.add("lg:hidden");
                thankYouMessage.classList.remove("hidden");
            })
            .catch(error => {
                console.error("Ошибка:", error.response?.data || error.message);
            });
    });

    resetButton.addEventListener("click", function () {
        thankYouMessage.classList.add("hidden");
        wrapperForm.classList.remove("hidden");
        form_img.classList.remove("lg:hidden");
    });
});
