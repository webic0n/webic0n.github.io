var cartHeadphones = {};
function HeadphonesOut() {
    $.getJSON("/../data/headphones.json",function (data) {
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
            out += `<p class="catalog-text_item25">СЕРИЯ:<span>${data[key].seria3}</span></p>`
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
        $('.catalog__btn-cart').on('click', addToCartHeadphones);
    });
}

function addToCartHeadphones() {
    var  id = $(this).attr('data-id');
    if (cartHeadphones[id] == undefined) {
        cartHeadphones[id] = 1;
    }
    else {
        cartHeadphones[id]++;
    }
    showMiniCart();
    saveHeadphonesCart();
}
function showMiniCart() {
    var out='';
    for (var key in cartHeadphones) {
        out += key+'---'+cartHeadphones[key]
    }
    $('.mini-cart').html(out);

}
function saveHeadphonesCart() {
    localStorage.setItem('cartHeadphones', JSON.stringify(cartHeadphones));
}
function loadCartHeadphones() {
    if(localStorage.getItem('cartHeadphones')){
        cartHeadphones = JSON.parse(localStorage.getItem('cartHeadphones'));
        showMiniCart();
    }
}


$(document).ready(function () {
    HeadphonesOut();
    loadCartHeadphones();
});