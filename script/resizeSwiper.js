window.addEventListener('DOMContentLoaded', () => {

    const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {
      let swiper;
  
      breakpoint = window.matchMedia(breakpoint);
  
      const enableSwiper = function(className, settings) {
        swiper = new Swiper(className, settings);
      }
  
      const checker = function() {
        if (breakpoint.matches) {
          return enableSwiper(swiperClass, swiperSettings);
        } else {
          if (swiper !== undefined) swiper.destroy(true, true);
          return;
        }
      };
  
      breakpoint.addEventListener('change', checker);
      checker();
    }
  
    resizableSwiper(
      '(max-width: 965px)',
      '.slider-1',
      {
        slidesPerView: "auto",
        spaceBetween: 16,
      },
    );
    resizableSwiper(
        '(max-width: 965px)',
        '.slider-2',
        {
          slidesPerView: "auto",
          spaceBetween: 16,
        },
      );
      resizableSwiper(
        '(max-width: 965px)',
        '.slider-3',
        {
          slidesPerView: "auto",
          spaceBetween: 16,
        },
      );
      resizableSwiper(
        '(max-width: 965px)',
        '.slider-4',
        {
          slidesPerView: "auto",
          spaceBetween: 16,
        },
      );
  });