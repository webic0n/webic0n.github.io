var cartPiano = {};
function PianosOut() {
    $.getJSON("/../data/piano.json",function (data) {
        var out='';
        for (var key in data){
            out += '<div class="catalog-view__list">'
            out += `<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${data[key].mainPhoto1}"></div>`
            out += '<div class="catalog-view__item50">'
            out += '<div class="catalog-view__item-line">'
            out += `<h2 class="g-section-title g-catalog-title">${data[key].name}</h2>`
            out += '</div>'
            out += '<div class="catalog-view__item-line">'
            out += '<div class="catalog-view__item25">'
            out += `<p class="catalog-text_item25">Артикул:<span>${data[key].articul}</span></p>`
            out += `<p class="catalog-text_item25">ТОРГОВАЯ МАРКА:<span>${data[key].tradeMark}</span></p>`
            out += `<p class="catalog-text_item25">СЕРИЯ:<span>${data[key].seria}</span></p>`
            out += '<div class="catalog-action">'
            out += `<p class="catalog-text_item25">Цена:<span>${data[key].cost} руб.</span></p>`
            out += `<p class="catalog-text_item25">${data[key].nalichie}</p>`
            out += '</div>'
            out += '</div>'
            out += '<div class="catalog-view__item25">'
            out += `<p class="catalog-description__text">${data[key].shortdescr}</p><a class="catalog-item25__link" href="product.html">Подробнее...</a>`
            out += '</div>'
            out += '</div>'
            out += `<div class="catalog-view__item-line"><a class="g-btn g-btn__bottom catalog__btn-cart" data-id="${key}">Добавить в корзину</a></div>`
            out += '</div>'
            out += '</div>'
        }
        $('.catalog-view-goods').html(out);
        $('.catalog__btn-cart').on('click', addToCartPiano);
    });
}

function addToCartPiano() {
    var  id = $(this).attr('data-id');
    if (cartPiano[id] == undefined) {
        cartPiano[id] = 1;
    }
    else {
        cartPiano[id]++;
    }
    showMiniCart();
    savePianoCart();
}
function showMiniCart() {
    var out='';
    for (var key in cartPiano) {
        out += key+'---'+cartPiano[key]
    }
    $('.mini-cart').html(out);

}
function savePianoCart() {
    localStorage.setItem('cartPiano', JSON.stringify(cartPiano));
}
function loadCartPiano() {
    if(localStorage.getItem('cartPiano')){
        cartPiano = JSON.parse(localStorage.getItem('cartPiano'));
        showMiniCart();
    }
}


$(document).ready(function () {
    PianosOut();
    loadCartPiano();
});