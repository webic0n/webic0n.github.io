$(document).ready(function() {


	$('.owl-carousel').owlCarousel({
		loop:false,
		margin:50,
		dots:false,
		autoHeight:true,
		nav:false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})
	
	var owl = $('.owl-carousel');
	owl.owlCarousel();
	$('.right').click(function() {
		owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('.left').click(function() {
		// With optional speed parameter
		// Parameters has to be in square bracket '[]'
		owl.trigger('prev.owl.carousel', [300]);
	})

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
	$('#my-menu').mmenu({
		extensions: ['effect-menu-slide' , 'pagedim-black' ],
		slidingSubmenus: false 
	});
	
	 var api = $('#my-menu').data('mmenu');
    api.bind('open:after', function () {
        $('.hamburger').addClass('is-active');
    }).bind('close:before', function () {
        $('.hamburger').removeClass('is-active');
    });

	$(document).on('click', '.about-stroi__link', function () {
		$(this).parent().toggleClass('active');
		var catalogTextContent = $(this).siblings();
		if(catalogTextContent.is(':visible')){
			catalogTextContent.slideUp();
		}
		else {
			catalogTextContent.slideDown();
		}
	});

	$(window).on('load', function () {
		$('#preloader').delay(1000).fadeOut('slow'),
		$('#top-line__fade')
  		.delay(1000)
  		.queue(function (next) { 
    	$(this).css('display', 'flex'); 
    	next(); 
  	});
	});

	$('.bottom-content, .title-slide, .slide-store, .slide-description, .usluga_1, .text-advantages, .who, .advantages-stage, .text-client, .our__clients-item, .text-footer, .invaited, .main-office, .branch, .compane-title__main, .company__text-3, .text-company, .text-year, .footer__text-3, .text-footer, .text-build, .build-description, .title__service-build, .text, .build-img, .text__top, .text-repairs, .repairs-description, .our__repairs-item, .title__service-repairs, .service__repairs-item, .glass-description, .our__glass-item, .glass-img, .title__service-glass, .text__service-glass, .title__service-glass-3, .text-doors, .doors-description, .title__service-doors, .store-title, .title__service-glass-3, .our__doors-item, .doors-img, .text-atc, .atc-description, .atc__advantages-title, .title__service-atc, .text__service-atc, .bold-text, .atc-img').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated fadeInUp',
		offset: 100
	});


});


