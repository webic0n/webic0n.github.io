$(document).ready(function(){
    $('#my-menu').mmenu({
        extensions: ['theme-dark'],
        navbar: {
            title: 'МЕНЮ'
        },
        offCanvas:{
            position: 'left'
        }

    });

    var api = $('#my-menu').data('mmenu');
    api.bind('open:finish', function () {
        $('.hamburger').addClass('is-active');
    }).bind('close:finish', function () {
        $('.hamburger').removeClass('is-active');
    });

    $('.carousel-team').owlCarousel({
        loop: true,
        responsiveClass: true,
        smartSpeed: 1500,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1200: {
                items: 4
            }
        }
    });

    //Скрипт Формы обратной связи

    $("form.form-call-back").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
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

    //Плавный Скролл Якорных сылок на главной странице

    $(".header-nav__item-yak").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

});
/////////////////////////////////////////Прелоудер и Кнопка "На верх"

$(window).scroll(function () {
    if ($(this).scrollTop() > $(this).height()){
        $('.top').addClass('active');
    } else {
        $('.top').removeClass('active');
    }
});

$('.top').click(function () {
    $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
});

$(window).on('load', function () {
    $('.preloader').delay(1000).fadeOut('slow')
});

/////////////////////////////////////////Скрипт для работы с API для страницы "Билборды"
//Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;
//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init () {
    var myMapTemp = new ymaps.Map("map-yandex", {
        center: [52.432331, 30.999306], // координаты центра на карте
        zoom: 11, // коэффициент приближения карты
        controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
    });

    myMapTemp.geoObjects
        .add(new ymaps.Placemark([52.400733, 31.022568], {
            iconCaption: 'Билборд 1'
        }, {
            preset: 'islands#icon',
            iconColor: '#00CED1'
        }))
        .add(new ymaps.Placemark([52.365997, 31.029346], {
            iconCaption: 'Билборд 2'
        }, {
            preset: 'islands#icon',
            iconColor: '#000080'
        }))
        .add(new ymaps.Placemark([52.452769, 30.963221], {
            iconCaption: 'Билборд 3'
        }, {
            preset: 'islands#icon',
            iconColor: '#FFFF00'
        }))
        .add(new ymaps.Placemark([52.425808, 30.925510], {
            iconCaption: 'Билборд 4'
        }, {
            preset: 'islands#icon',
            iconColor: '#FF4500'
        }))
        .add(new ymaps.Placemark([52.467710, 31.024064], {
            iconCaption: 'Билборд 5'
        }, {
            preset: 'islands#icon',
            iconColor: '#008000'
        }))
        .add(new ymaps.Placemark([52.395781, 30.903384], {
            iconCaption: 'Билборд 6'
        }, {
            preset: 'islands#icon',
            iconColor: '#FFB6C1'
        }))
        .add(new ymaps.Placemark([52.404474, 30.941077], {
            iconCaption: 'Билборд 7'
        }, {
            preset: 'islands#icon',
            iconColor: '#808080'
        }))
        .add(new ymaps.Placemark([52.476609, 31.020289], {
            iconCaption: 'Билборд 8'
        }, {
            preset: 'islands#icon',
            iconColor: '#9400D3'
        }))
        .add(new ymaps.Placemark([52.415565, 31.001988], {
            iconCaption: 'Билборд 9'
        }, {
            preset: 'islands#icon',
            iconColor: '#8B4513'
        }))
        .add(new ymaps.Placemark([52.437625, 31.000766], {
            iconCaption: 'Билборд 10'
        }, {
            preset: 'islands#icon',
            iconColor: '#7CFC00'
        }));



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

/////////////////////////////////////////Скрипт для работы с API для страницы "Ситилайты"
//Переменная для включения/отключения индикатора загрузки
var spinner2 = $('.ymap-container-2').children('.loader-2');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load2 = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp2, myPlacemarkTemp;
//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init1 () {
    var myMapTemp2 = new ymaps.Map("map-yandex-2", {
        center: [52.428529, 31.005677], // координаты центра на карте
        zoom: 13, // коэффициент приближения карты
        controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
    });

    myMapTemp2.geoObjects
        .add(new ymaps.Placemark([52.425436, 31.002487], {
            iconCaption: 'Ситилайт 1'
        }, {
            preset: 'islands#icon',
            iconColor: '#00CED1'
        }))
        .add(new ymaps.Placemark([52.426803, 31.012807], {
            iconCaption: 'Ситилайт 2'
        }, {
            preset: 'islands#icon',
            iconColor: '#000080'
        }))
        .add(new ymaps.Placemark([52.425320, 31.013339], {
            iconCaption: 'Ситилайт 3'
        }, {
            preset: 'islands#icon',
            iconColor: '#FFFF00'
        }))
        .add(new ymaps.Placemark([52.424131, 31.013750], {
            iconCaption: 'Ситилайт 4'
        }, {
            preset: 'islands#icon',
            iconColor: '#FF4500'
        }))
        .add(new ymaps.Placemark([52.433815, 31.002569], {
            iconCaption: 'Ситилайт 5'
        }, {
            preset: 'islands#icon',
            iconColor: '#008000'
        }))
        .add(new ymaps.Placemark([52.431693, 30.995131], {
            iconCaption: 'Ситилайт 6'
        }, {
            preset: 'islands#icon',
            iconColor: '#FFB6C1'
        }))
        .add(new ymaps.Placemark([52.426203, 31.006595], {
            iconCaption: 'Ситилайт 7'
        }, {
            preset: 'islands#icon',
            iconColor: '#808080'
        }))
        .add(new ymaps.Placemark([52.418173, 31.002245], {
            iconCaption: 'Ситилайт 8'
        }, {
            preset: 'islands#icon',
            iconColor: '#9400D3'
        }))
        .add(new ymaps.Placemark([52.436055, 31.007517], {
            iconCaption: 'Ситилайт 9'
        }, {
            preset: 'islands#icon',
            iconColor: '#8B4513'
        }))
        .add(new ymaps.Placemark([52.424569, 31.008108], {
            iconCaption: 'Ситилайт 10'
        }, {
            preset: 'islands#icon',
            iconColor: '#7CFC00'
        }));



    // помещаем флажок на карту
    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp2.layers.get(0).get(0);

    // Решение по callback-у для определния полной загрузки карты
    waitForTilesLoad1(layer).then(function() {
        // Скрываем индикатор загрузки после полной загрузки карты
        spinner2.removeClass('is-active');
    });
}
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad1(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer1(layer), readyAll = true;
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
function getTileContainer1(layer) {
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
function loadScript1(url, callback){
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
// Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container-2"
var ymap1 = function() {
    $('.ymap-container-2').mouseenter(function(){
            if (!check_if_load2) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load2 = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner2.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript1("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
                    ymaps.load(init1);
                });
            }
        }
    );
}
$(function() {
    //Запускаем основную функцию
    ymap1();
});

/////////////////////////////////////////Скрипт для работы с API для страницы "Световые короба"
//Переменная для включения/отключения индикатора загрузки
var spinner3 = $('.ymap-container-3').children('.loader-3');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load3 = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp3, myPlacemarkTemp3;
//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init2 () {
    var myMapTemp3 = new ymaps.Map("map-yandex-3", {
        center: [52.428529, 31.005677], // координаты центра на карте
        zoom: 13, // коэффициент приближения карты
        controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
    });

    myMapTemp3.geoObjects
        .add(new ymaps.Placemark([52.439635, 31.004208], {
            iconCaption: 'Световой Короб 1'
        }, {
            preset: 'islands#icon',
            iconColor: '#00CED1'
        }))
        .add(new ymaps.Placemark([52.417775, 31.002109], {
            iconCaption: 'Световой Короб 2'
        }, {
            preset: 'islands#icon',
            iconColor: '#000080'
        }));

    // помещаем флажок на карту
    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp3.layers.get(0).get(0);

    // Решение по callback-у для определния полной загрузки карты
    waitForTilesLoad2(layer).then(function() {
        // Скрываем индикатор загрузки после полной загрузки карты
        spinner3.removeClass('is-active');
    });
}
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad2(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer2(layer), readyAll = true;
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
function getTileContainer2(layer) {
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
function loadScript2(url, callback){
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
// Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container-2"
var ymap2 = function() {
    $('.ymap-container-3').mouseenter(function(){
            if (!check_if_load3) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load3 = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner3.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript2("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
                    ymaps.load(init2);
                });
            }
        }
    );
}
$(function() {
    //Запускаем основную функцию
    ymap2();
});




