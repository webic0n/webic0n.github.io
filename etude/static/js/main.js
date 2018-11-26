$(document).ready(function () {
    setTimeout(function() {
    // Слайдер главной страницы
    $('.js-index-slider').slick({
        prevArrow: '.index-slider__controls-prev',
        nextArrow: '.index-slider__controls-next',
        dots: true,
        vertical: true,
        customPaging: function () {
            return '<a class="index-slider__dots"></a>';
        },
    });

    // слайдер блока рекомендованный товары
    $('.js-recomended-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        appendDots: '.recomended-slider__nav',
        prevArrow: '.recomended-slider__controls-prev',
        nextArrow: '.recomended-slider__controls-next',
        dots: true,
        customPaging: function () {
            return '<a class="recomended-slider__dot"></a>';
        },
        responsive: [{

            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }

        }, {

            breakpoint: 864,
            settings: {
                slidesToShow: 2,
                dots: true
            }

        }, {

            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                dots: true

            }

        }]
    });

    // Позиционирование управления слайдером
    function indexSliderElemPos(elem, pos) {
        var windowWidth = $(window).width(),
            containerWidth = $('.container').width(),
            leftPos = (windowWidth-containerWidth)/2;
        $('.index-slider ' + elem).css(pos,leftPos);
    };

    // Позиционирование точек слайдера
    indexSliderElemPos('.slick-dots','left');
    // Позиционирование стрелок слайдера
    indexSliderElemPos('.index-slider__controls','right');

    //Функция позиционирование точек и стрелок слайдера при изменении ширины экрана
    $(window).resize(function () {
        indexSliderElemPos('.slick-dots','left');
        indexSliderElemPos('.index-slider__controls','right');
    });

    // слайдер страницы продукта
    $('.js-product-gallery').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        //asNavFor: ".js-product-gallery-nav",
        prevArrow: '.product-gallery__controls-prev',
        nextArrow: '.product-gallery__controls-next',
    });

    $('.product-gallery__item').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile mfp-with-zoom',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        },
        zoom: {
            enabled: true,

            duration: 300,
            easing: 'ease-in-out',
            opener: function(openerElement) {
                return openerElement.is('a') ? openerElement : openerElement.find('a');
            }
        }
    });

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

    //фукнция обратной связи
    $("form#form-callback").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "/../core/mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
            setTimeout(function() {
                $(th).find('.success').removeClass('active').fadeOut();
                th.trigger("reset");
            }, 1500);
        });
        return false;
    });

    //функци отправки коментариев


    $('.tabs-list__item').click(function () {
        var tabName = $(this).attr('show-tab');
        $(this).addClass('active').siblings().removeClass('active');
        $('.tabs-content .' + tabName).addClass('active').siblings().removeClass('active');
    });
    }, 300);
});



// Скрипт запуска видео с ютьюба
$('.video-start').click(function () {
    var videoID = $(this).parent().parent().data('video-id'),
        videoPlayer = $(this).parent().parent().attr('id');
    player = new YT.Player(videoPlayer, {
        videoId: videoID
    });
});



$(document).on('click', '.catalog__link', function () {
    $(this).parent().toggleClass('active');
    var catalogTextContent = $(this).siblings();
    if(catalogTextContent.is(':visible')){
        catalogTextContent.slideUp();
    }
    else {
        catalogTextContent.slideDown();
    }
});

//Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;
//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init () {
    var myMapTemp = new ymaps.Map("map-yandex", {
        center: [52.427263, 31.002585], // координаты центра на карте
        zoom: 16, // коэффициент приближения карты
        controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
    });

    myMapTemp.geoObjects
        .add(new ymaps.Placemark([52.427263, 31.002585], {
            iconCaption: 'Etude'
        }, {
            preset: 'islands#icon',
            iconColor: '#008000'
        }))

    // помещаем флажок на карту
    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);

    // Решение по callback-у для определния полной загрузки карты
    waitForTilesLoad(layer).then(function() {
        // Скрываем индикатор загрузки после полной загрузки карты
        spinner.removeClass('is-active');
    });
}
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false;
            }
        });
        if (readyAll) {
            resolve();
        } else {
            tc.events.once("ready", function() {
                resolve();
            });
        }
    });
}
function getTileContainer(layer) {
    for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
            ) {
                return layer[k];
            }
        }
    }
    return null;
}
// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
    var script = document.createElement("script");
    if (script.readyState){  // IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // Другие браузеры
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
// Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"
var ymap = function() {
    $('.ymap-container').mouseenter(function(){
            if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
                    ymaps.load(init);
                });
            }
        }
    );
}
$(function() {
    //Запускаем основную функцию
    ymap();
});

$(window).on('load', function () {
    $('#preloader').delay(500).fadeOut('slow')
});



