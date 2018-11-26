var cartCommutation = {};

function inition1() {
    var hash = window.location.hash.substring(1);
    $.post(
        "admin/core.php",
        {
            "action": "loadSingleCommutation",
            "id": hash
        },
        HashCommutationOut
    )
}
function HashCommutationOut(data) {
    data = JSON.parse(data);
    var out='';
    out +='<div class="container">'
    out +='<div class="product-content">'
    out +='<div class="product-gallery">'
    out +='<div class="product-gallery-main">'
    out +='<div class="product-gallery__controls product-gallery__controls-prev">'
    out +='<svg class="icon icon-up-arrow ">'
    out +='<use xlink:href="/static/img/svg/symbol/sprite.svg#up-arrow"></use>'
    out +='</svg>'
    out +='</div>'
    out +='<div class="product-gallery__controls product-gallery__controls-next">'
    out +='<svg class="icon icon-up-arrow ">'
    out +='<use xlink:href="/static/img/svg/symbol/sprite.svg#up-arrow"></use>'
    out +='</svg>'
    out +='</div>'
    out +='<div class="js-product-gallery">'
    out +=`<div class="product-gallery__item"><img src="/static/img/content/products/product1/${data.mainPhoto1}"><a class="product-gallery__popup" href="/static/img/content/products/product1/${data.popupPhoto1}">`
    out +='<svg class="icon icon-search ">'
    out +='<use xlink:href="/static/img/svg/symbol/sprite.svg#search"></use>'
    out +='</svg></a></div>'
    out +=`<div class="product-gallery__item"><img src="/static/img/content/products/product1/${data.mainPhoto2}"><a class="product-gallery__popup" href="/static/img/content/products/product1/${data.popupPhoto2}">`
    out +='<svg class="icon icon-search ">'
    out +='<use xlink:href="/static/img/svg/symbol/sprite.svg#search"></use>'
    out +='</svg></a></div>'
    out +='</div>'
    out +='</div>'
    out +='</div>'
    out +='<div class="product-info">'
    out +=`<h2 class="g-section-title g-section-title__product">${data.name}</h2>`
    out +='<div class="product-fast-info">'
    out +='<div class="product-specification">'
    out +=`<div class="product-line-info"><span class="product-line-info__key">Артикул: </span><span class="product-line-info__val">${data.articul}</span></div>`
    out +=`<div class="product-line-info"><span class="product-line-info__key">Торговая Марка: </span><span class="product-line-info__val">${data.tradeMark}</span></div>`
    out +=`<div class="product-line-info"><span class="product-line-info__key">Серия: </span><span class="product-line-info__val">${data.seria3}</span></div>`
    out +='<ul class="product-specification-list">'
    out +='<li class="product-specification-list__item">'
    out +='<svg class="icon icon-temperature ">'
    out +='<use xlink:href="static/img/svg/symbol/sprite.svg#temperature"></use>'
    out +='</svg>'
    out +='</li>'
    out +='<li class="product-specification-list__item">'
    out +='<svg class="icon icon-quality ">'
    out +='<use xlink:href="static/img/svg/symbol/sprite.svg#quality"></use>'
    out +='</svg>'
    out +='</li>'
    out +='<li class="product-specification-list__item">'
    out +='<svg class="icon icon-medal ">'
    out +='<use xlink:href="static/img/svg/symbol/sprite.svg#medal"></use>'
    out +='</svg>'
    out +='</li>'
    out +='<li class="product-specification-list__item">'
    out +='<svg class="icon icon-efficiency ">'
    out +='<use xlink:href="static/img/svg/symbol/sprite.svg#efficiency"></use>'
    out +='</svg>'
    out +='</li>'
    out +='<li class="product-specification-list__item">'
    out +='<svg class="icon icon-trophy ">'
    out +='<use xlink:href="static/img/svg/symbol/sprite.svg#trophy"></use>'
    out +='</svg>'
    out +='</li>'
    out +='<li class="product-specification-list__item">'
    out +='<svg class="icon icon-water ">'
    out +='<use xlink:href="static/img/svg/symbol/sprite.svg#water"></use>'
    out +='</svg>'
    out +='</li>'
    out +='</ul>'
    out +='</div>'
    out +='<div class="product-callback">'
    out +='<svg class="icon icon-telephone ">'
    out +='<use xlink:href="static/img/svg/symbol/sprite.svg#telephone"></use>'
    out +='</svg><a class="product-callback__phone" href="tel:+375259076972">375 25 907-69-72</a><a class="product-callback__link popup-with-form" href="#form-callback">Обратный звонок</a><span class="product-callback__text">Позвоните и наши консультанты помогут сделать выбор</span>'
    out +='</div>'
    out +='</div>'
    out +=`<div class="product-price-info"><span class="page-product-price">${data.cost} руб.</span>`
    out +=`<div class="product-avaliabel"><span>${data.nalichie}</span></div>`
    out +='<div class="product-feedback">'
    out +='<svg class="icon icon-telephone ">'
    out +='<use xlink:href="../static/img/svg/symbol/sprite.svg#telephone"></use>'
    out +='</svg><a class="popup-with-form" href="#form-callback">Обратная связь</a>'
    out +='</div>'
    out +='</div>'
    out +=`<div class="product-buttons"><a class="g-btn product-prev__btn-cart" data-id="${data.id}">Добавить в корзину</a><a class="g-btn" href="javascript:void(0);">Купить в 1 клик</a></div>`
    out +='<div class="product-actions">'
    out +='<div class="product-action product-action__favorite">'
    out +='<svg class="icon icon-private-eye">'
    out +='<use xlink:href="/static/img/svg/symbol/sprite.svg#private-eye"></use>'
    out +='</svg><a href="javascript:void(0);">Просмотров:<span>233</span></a>'
    out +='</div>'
    out +='</div>'
    out +='<div class="product-line">'
    out +='<div class="product-guarantee">'
    out +='<div class="product-title-icon">'
    out +='<svg class="icon icon-guarantee ">'
    out +='<use xlink:href="svg/symbol/sprite.svg#guarantee"></use>'
    out +='</svg><span>Гарантия</span>'
    out +='</div><span class="product-guarantee__text">На этот товар в нашем магазине предоставляется гарантия сроком на 1(один) год.</span>'
    out +='</div>'
    out +='</div>'
    out +='</div>'
    out +='</div>'
    out +='</div>'
    out +='</section>'
    out +='<section class="product-tab">'
    out +='<div class="container">'
    out +='<div class="tabs">'
    out +='<ul class="tabs-list">'
    out +='<li class="tabs-list__item active" show-tab="tab-characters"><span class="tabs-list__text">Характеристики</span></li>'
    out +='<li class="tabs-list__item" show-tab="tab-about"><span class="tabs-list__text">О бренде</span></li>'
    out +='</ul>'
    out +='<div class="tabs-content">'
    out +='<div class="tab-content__item tab-characters active">'
    out +='<table class="product-characters">'
    out +='<tr>'
    out +=`<td class="product-characters__key"><span>${data.character1Key}</span></td>`
    out +=`<td class="product-characters__val"><span>${data.character1Info}</span></td>`
    out +='</tr>'
    out +='<tr>'
    out +=`<td class="product-characters__key"><span>${data.character2Key}</span></td>`
    out +=`<td class="product-characters__val"><span>${data.character2Info}</span></td>`
    out +='</tr>'
    out +='<tr>'
    out +=`<td class="product-characters__key"><span>${data.character3Key}</span></td>`
    out +=`<td class="product-characters__val"><span>${data.character3Info}</span></td>`
    out +='</tr>'
    out +='<tr>'
    out +=`<td class="product-characters__key"><span>${data.character4Key}</span></td>`
    out +=`<td class="product-characters__val"><span>${data.character4Info}</span></td>`
    out +='</tr>'
    out +='</table>'
    out +='</div>'
    out +='<div class="tab-content__item tab-about">'
    out +='<div class="product-about">'
    out +=`<div class="product-about__top"><img class="product-about__img" src="static/img/content/pic-menu/${data.brendPhoto}">`
    out +=`<p class="product-about__text">${data.aboutBrend}</p>`
    out +='</div>'
    out +='<div class="product-about__block">'
    out +=`<h3 class="g-block-title">${data.brendTitle1}</h3>`
    out +=`<p class="product-about__text">${data.brendText1}</p>`
    out +=`<p class="product-about__text">${data.brendText2}</p>`
    out +='</div>'
    out +='<div class="product-about__block">'
    out +=`<h3 class="g-block-title">${data.brendTitle2}</h3>`
    out +=`<p class="product-about__text">${data.brendText3}</p>`
    out +=`<p class="product-about__text">${data.brendText4}</p>`
    out +='</div>'
    out +='</div>'
    out +='</div>'
    out +='</div>'
    out +='</div>'
    out +='</div>'
    out +='</section>'
    $('.product').html(out);
    $('.product-prev__btn-cart').on('click', addToCartCommutation);
}

function addToCartCommutation() {
    var  id = $(this).attr('data-id');
    if (cartCommutation[id] == undefined) {
        cartCommutation[id] = 1;
    }
    else {
        cartCommutation[id]++;
    }
    showMiniCart();
    saveCommutationCart();
}
function showMiniCart() {
    var out='';
    for (var key in cartCommutation) {
        out += key+'---'+cartCommutation[key]
    }
    $('.mini-cart').html(out);

}
function saveCommutationCart() {
    localStorage.setItem('cartCommutation', JSON.stringify(cartCommutation));
}
function loadCartCommutation() {
    if(localStorage.getItem('cartCommutation')){
        cartCommutation = JSON.parse(localStorage.getItem('cartCommutation'));
        showMiniCart();
    }
}

$(document).ready(function () {
    inition1();
    loadCartCommutation();
});
