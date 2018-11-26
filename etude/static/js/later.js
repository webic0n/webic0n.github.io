var cart = {};

function NewLaterIndexOut() {
    $.getJSON("/../data/new-product-index.json",function (data) {
        var out = '';
        var laterIndex = {};
        if(localStorage.getItem('laterIndex')){
            laterIndex = JSON.parse(localStorage.getItem('laterIndex'));
            for (var key in laterIndex) {
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
                out += `<a class="catalog-item25__link" href="product.html#${key}">Подробнее...</a>`
                out += '</div>'
                out += '</div>'
                out += `<div class="catalog-view__item-line"><a class="g-btn g-btn__bottom catalog__btn-cart" data-id="${key}">Добавить в корзину</a></div>`
                out += '</div>'
                out += '</div>'
            }
            $('.main-cart').html(out);
            $('.catalog__btn-cart').on('click', addToCartIndex);
        }
        else {
            $('.g-section-title-latter').html('Добавьте товары');
        }

    });
}

function addToCartIndex() {
    var  id = $(this).attr('data-id');
    if (cart[id] == undefined) {
        cart[id] = 1;
    }
    else {
        cart[id]++;
    }
    showMiniCart();
    saveIndexCart();
}
function showMiniCart() {
    var out='';
    for (var key in cart) {
        out += key+'---'+cart[key]
    }
    $('.mini-cart').html(out);

}
function saveIndexCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function loadCartIndex() {
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    NewLaterIndexOut();
    loadCartIndex();
});