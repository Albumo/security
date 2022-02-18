$(document).ready(function () {

    var $burger = $('.js-header-burger');
    var $nav = $('.js-header-toggle nav');
    $burger.on('click', function () {
        $(this).toggleClass('open');
        $('.header').toggleClass('open');
        $nav.toggleClass('open');
        $('body').toggleClass('fixed-position');
    });

    $('.header__menu-item a').click(function () {
        $('a.active').removeClass('active');
        $(this).addClass('active');
    });

    $('.js-to-item').on('click', function () {
        scrollToItem($(this));
        $('.js-header-burger').removeClass('open');
        $('.header').removeClass('open');
        $('.js-header-toggle nav').removeClass('open');
        $('.header__burger-letter').removeClass('open');
        $('.header__nav').removeClass('open');
        $('body').removeClass('fixed-position');
    });

    $(window).scroll(function () {
        const height = $(window).scrollTop();

        if (height > 1) {
            $('.js-header').addClass('is-scroll');
        } else {
            $('.js-header').removeClass('is-scroll');
        }

        var $sections = $('section');
        $sections.each(function (i, el) {
            var top = $(el).offset().top - 100;
            var bottom = top + $(el).height();
            var scroll = $(window).scrollTop();
            var id = $(el).attr('id');
            if (scroll > top && scroll < bottom) {
                $('a.active').removeClass('active');
                $('a[href="#' + id + '"]').addClass('active');
            }
        });
    });


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