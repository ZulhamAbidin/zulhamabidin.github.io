

        

            const  btn = document.querySelector("button.mobile-menu-hamburger");
            const  menu = document.querySelector(".hamburger-menu");

            btn.addEventListener("click", () => {
                menu.classList.toggle("hidden");
            });

    const swiper = new Swiper(".swiper", {
      // Optional parameters
      speed: 400,
      spaceBetween: 100,

      autoplay: {
        delay: 1000,
      },

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });