$(document).ready(function () {

    // slider
    if ($('.js-slider').length) {
        $('.js-slider').slick({
            lazyLoad: 'ondemand',
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,

        });
    }
});