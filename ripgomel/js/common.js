$(document).ready(function () {
    $('.popup-with-form').magnificPopup({
        preloader: false,
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',

        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '';
                }
            }
        }
    });
    $('.carousel-tovari').owlCarousel({
        loop: true,
        nav: true,
        smartSpeed: 1200,
        navText: ['Предыдущая','Показать ещё'],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            500:{
                items:2
            },
            800:{
                items:3
            },
            1100:{
                items:4
            }
        }
    });
    $('.carousel-tovari-last__row').owlCarousel({
        smartSpeed: 1200,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            800:{
                items:2
            },
            1100:{
                items:3
            }
        }
    });

    $(".header-nav__yak").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

$(window).on('load', function () {
    $('.preloader').delay(500).fadeOut('slow')
});
