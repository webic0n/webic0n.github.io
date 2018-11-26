var cart = {};

function loadCartIndex() {
    if(localStorage.getItem('cart') || localStorage.getItem('cartGuitar') || localStorage.getItem('cartPiano') || localStorage.getItem('cartDrums') || localStorage.getItem('cartSound')
        || localStorage.getItem('cartCommutation') || localStorage.getItem('cartMicrophone') || localStorage.getItem('cartHeadphones')){
        cart = JSON.parse(localStorage.getItem('cart'));
        cartGuitar = JSON.parse(localStorage.getItem('cartGuitar'));
        cartPiano = JSON.parse(localStorage.getItem('cartPiano'));
        cartDrums = JSON.parse(localStorage.getItem('cartDrums'));
        cartSound = JSON.parse(localStorage.getItem('cartSound'));
        cartCommutation = JSON.parse(localStorage.getItem('cartCommutation'));
        cartMicrophone = JSON.parse(localStorage.getItem('cartMicrophone'));
        cartHeadphones = JSON.parse(localStorage.getItem('cartHeadphones'));
        showCartIndex();
        showCartGuitar();
        showCartPiano();
        showCartDrums();
        showCartSound();
        showCartCommutation();
        showCartMicrophone();
        showCartHeadphones();
    }
    else {
        $('.g-section-title-cart').html('Корзина Пуста');
    }
}

function showCartIndex(){
    if(!isEmpty(cart) && !isEmpty(cartGuitar) && !isEmpty(cartPiano) && !isEmpty(cartDrums) && !isEmpty(cartSound) && !isEmpty(cartCommutation)
        && !isEmpty(cartMicrophone) && !isEmpty(cartHeadphones)){
        $('.g-section-title-cart').html('Корзина Пуста');
    }
    else {

    }
    $.getJSON("/../data/new-product-index.json",function (data){
        var goodsIndex = data;
        var  out = '';
        for(var id in cart){
            out +='<div class="catalog-view__list">'
            out +=`<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${goodsIndex[id].mainPhoto1}"></div>`
            out +='<div class="catalog-view__item50">'
            out +='<div class="catalog-view__item-line">'
            out +=`<h2 class="g-section-title g-catalog-title">${goodsIndex[id].name}</h2>`
            out +='</div>'
            out +='<div class="catalog-view__item-line">'
            out +='<h2 class="g-section-title g-catalog-title">Количество</h2>'
            out +=`<div class="count-in-cart count-minus" data-id="${id}">-</div><span>${cart[id]}</span>`
            out +=`<div class="count-in-cart count-plus" data-id="${id}">+</div>`
            out +=`<div class="cart-item-cost">${cart[id]*goodsIndex[id].cost} руб.</div>`
            out +='</div>'
            out +=`<div class="catalog-view__item-line"><a class="g-btn delete-from-cart" data-id="${id}">Удалить из корзины</a></div>`
            out +='</div>'
            out +='</div>'
        }
        $('.main-cart').html(out);
        $('.delete-from-cart').on('click', delIndexGoods);
        $('.count-plus').on('click', plusIndexGoods);
        $('.count-minus').on('click', minusIndexGoods);
    });
};

function delIndexGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    saveIndexCart();
    showCartIndex();
};

function plusIndexGoods() {
    var id = $(this).attr('data-id');
    cart[id]++;
    saveIndexCart();
    showCartIndex();
};

function minusIndexGoods() {
    var id = $(this).attr('data-id');
    if(cart[id]==1){
        delete cart[id];
    }
    else{
        cart[id]--;
    }
    saveIndexCart();
    showCartIndex();
};

function saveIndexCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
};

function sendEmail(){
    var ename = $('#cart-name').val();
    var email = $('#cart-email').val();
    var ephone = $('#cart-phone').val();
    if(ename!='' && email!='' && ephone!=''){
        if(isEmpty(cart) || isEmpty(cartGuitar) || isEmpty(cartPiano) || isEmpty(cartDrums) || isEmpty(cartSound)
            || isEmpty(cartCommutation) || isEmpty(cartMicrophone) || isEmpty(cartHeadphones)){
            $.post(
                "/core/cart-mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart,
                    "cartGuitar" : cartGuitar,
                    "cartPiano" : cartPiano,
                    "cartDrums" : cartDrums,
                    "cartSound" : cartSound,
                    "cartCommutation" : cartCommutation,
                    "cartMicrophone" : cartMicrophone,
                    "cartHeadphones" : cartHeadphones,
                },
                function (data) {
                    if (data==1) {
                        alert("Заказ отправлен")
                        location="/index.php";
                        document.location.href="/index.php";
                        location.replace("/index.php");
                        window.location.reload("/index.php");
                        document.location.replace("/index.php");
                    }
                    else {
                        alert("Повторите заказ")
                    }
                }
            );
        }
        else{
            alert("Корзина пуста");
        }
    }
    else {
        alert("Заполните все поля");
    }
}

//вывод в корзине гитар//
var cartGuitar = {};

function showCartGuitar(){
    if(!isEmpty(cart) && !isEmpty(cartGuitar) && !isEmpty(cartPiano) && !isEmpty(cartDrums) && !isEmpty(cartSound) && !isEmpty(cartCommutation)
        && !isEmpty(cartMicrophone) && !isEmpty(cartHeadphones)){
        $('.g-section-title-cart').html('Корзина Пуста');
    }
    else {

    }
    $.getJSON("/../data/guitars.json",function (data){
        var goodsGuitar = data;
        var  out = '';
        for(var id in cartGuitar){
            out +='<div class="catalog-view__list">'
            out +=`<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${goodsGuitar[id].mainPhoto1}"></div>`
            out +='<div class="catalog-view__item50">'
            out +='<div class="catalog-view__item-line">'
            out +=`<h2 class="g-section-title g-catalog-title">${goodsGuitar[id].name}</h2>`
            out +='</div>'
            out +='<div class="catalog-view__item-line">'
            out +='<h2 class="g-section-title g-catalog-title">Количество</h2>'
            out +=`<div class="count-in-cart count-minus1" data-id="${id}">-</div><span>${cartGuitar[id]}</span>`
            out +=`<div class="count-in-cart count-plus1" data-id="${id}">+</div>`
            out +=`<div class="cart-item-cost">${cartGuitar[id]*goodsGuitar[id].cost} руб.</div>`
            out +='</div>'
            out +=`<div class="catalog-view__item-line"><a class="g-btn delete-from-cart1" data-id="${id}">Удалить из корзины</a></div>`
            out +='</div>'
            out +='</div>'
        }
        $('.main-cart1').html(out);
        $('.delete-from-cart1').on('click', delGuitarGoods);
        $('.count-plus1').on('click', plusGuitarGoods);
        $('.count-minus1').on('click', minusGuitarGoods);
    });
};

function delGuitarGoods() {
    var id = $(this).attr('data-id');
    delete cartGuitar[id];
    saveGuitarCart();
    showCartGuitar();
};

function plusGuitarGoods() {
    var id = $(this).attr('data-id');
    cartGuitar[id]++;
    saveGuitarCart();
    showCartGuitar();
};

function minusGuitarGoods() {
    var id = $(this).attr('data-id');
    if(cartGuitar[id]==1){
        delete cartGuitar[id];
    }
    else{
        cartGuitar[id]--;
    }
    saveGuitarCart();
    showCartGuitar();
};

function saveGuitarCart() {
    localStorage.setItem('cartGuitar', JSON.stringify(cartGuitar));
}

//вывод в корзине клавишных//
var cartPiano = {};

function showCartPiano(){
    if(!isEmpty(cart) && !isEmpty(cartGuitar) && !isEmpty(cartPiano) && !isEmpty(cartDrums) && !isEmpty(cartSound) && !isEmpty(cartCommutation)
        && !isEmpty(cartMicrophone) && !isEmpty(cartHeadphones)){
        $('.g-section-title-cart').html('Корзина Пуста');
    }
    else {

    }
    $.getJSON("/../data/piano.json",function (data){
        var goodsPianos = data;
        var  out = '';
        for(var id in cartPiano){
            out +='<div class="catalog-view__list">'
            out +=`<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${goodsPianos[id].mainPhoto1}"></div>`
            out +='<div class="catalog-view__item50">'
            out +='<div class="catalog-view__item-line">'
            out +=`<h2 class="g-section-title g-catalog-title">${goodsPianos[id].name}</h2>`
            out +='</div>'
            out +='<div class="catalog-view__item-line">'
            out +='<h2 class="g-section-title g-catalog-title">Количество</h2>'
            out +=`<div class="count-in-cart count-minus2" data-id="${id}">-</div><span>${cartPiano[id]}</span>`
            out +=`<div class="count-in-cart count-plus2" data-id="${id}">+</div>`
            out +=`<div class="cart-item-cost">${cartPiano[id]*goodsPianos[id].cost} руб.</div>`
            out +='</div>'
            out +=`<div class="catalog-view__item-line"><a class="g-btn delete-from-cart2" data-id="${id}">Удалить из корзины</a></div>`
            out +='</div>'
            out +='</div>'
        }
        $('.main-cart2').html(out);
        $('.delete-from-cart2').on('click', delPianoGoods);
        $('.count-plus2').on('click', plusPianoGoods);
        $('.count-minus2').on('click', minusPianoGoods);
    });
};

function delPianoGoods() {
    var id = $(this).attr('data-id');
    delete cartPiano[id];
    savePianoCart();
    showCartPiano();
};

function plusPianoGoods() {
    var id = $(this).attr('data-id');
    cartPiano[id]++;
    savePianoCart();
    showCartPiano();
};

function minusPianoGoods() {
    var id = $(this).attr('data-id');
    if(cartPiano[id]==1){
        delete cartPiano[id];
    }
    else{
        cartPiano[id]--;
    }
    savePianoCart();
    showCartPiano();
};

function savePianoCart() {
    localStorage.setItem('cartPiano', JSON.stringify(cartPiano));
}

//вывод в корзине ударных//
var cartDrums = {};

function showCartDrums(){
    if(!isEmpty(cart) && !isEmpty(cartGuitar) && !isEmpty(cartPiano) && !isEmpty(cartDrums) && !isEmpty(cartSound) && !isEmpty(cartCommutation)
        && !isEmpty(cartMicrophone) && !isEmpty(cartHeadphones)){
        $('.g-section-title-cart').html('Корзина Пуста');
    }
    else {

    }
    $.getJSON("/../data/drums.json",function (data){
        var goodsDrums = data;
        var  out = '';
        for(var id in cartDrums){
            out +='<div class="catalog-view__list">'
            out +=`<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${goodsDrums[id].mainPhoto1}"></div>`
            out +='<div class="catalog-view__item50">'
            out +='<div class="catalog-view__item-line">'
            out +=`<h2 class="g-section-title g-catalog-title">${goodsDrums[id].name}</h2>`
            out +='</div>'
            out +='<div class="catalog-view__item-line">'
            out +='<h2 class="g-section-title g-catalog-title">Количество</h2>'
            out +=`<div class="count-in-cart count-minus3" data-id="${id}">-</div><span>${cartDrums[id]}</span>`
            out +=`<div class="count-in-cart count-plus3" data-id="${id}">+</div>`
            out +=`<div class="cart-item-cost">${cartDrums[id]*goodsDrums[id].cost} руб.</div>`
            out +='</div>'
            out +=`<div class="catalog-view__item-line"><a class="g-btn delete-from-cart3" data-id="${id}">Удалить из корзины</a></div>`
            out +='</div>'
            out +='</div>'
        }
        $('.main-cart3').html(out);
        $('.delete-from-cart3').on('click', delDrumsGoods);
        $('.count-plus3').on('click', plusDrumsGoods);
        $('.count-minus3').on('click', minusDrumsGoods);
    });
};

function delDrumsGoods() {
    var id = $(this).attr('data-id');
    delete cartDrums[id];
    saveDrumsCart();
    showCartDrums();
};

function plusDrumsGoods() {
    var id = $(this).attr('data-id');
    cartDrums[id]++;
    saveDrumsCart();
    showCartDrums();
};

function minusDrumsGoods() {
    var id = $(this).attr('data-id');
    if(cartDrums[id]==1){
        delete cartDrums[id];
    }
    else{
        cartDrums[id]--;
    }
    saveDrumsCart();
    showCartDrums();
};

function saveDrumsCart() {
    localStorage.setItem('cartDrums', JSON.stringify(cartDrums));
}

//вывод в корзине Звукгового оборудования//
var cartSound = {};

function showCartSound(){
    if(!isEmpty(cart) && !isEmpty(cartGuitar) && !isEmpty(cartPiano) && !isEmpty(cartDrums) && !isEmpty(cartSound) && !isEmpty(cartCommutation)
        && !isEmpty(cartMicrophone) && !isEmpty(cartHeadphones)){
        $('.g-section-title-cart').html('Корзина Пуста');
    }
    else {

    }
    $.getJSON("/../data/soundequip.json",function (data){
        var goodsSound = data;
        var  out = '';
        for(var id in cartSound){
            out +='<div class="catalog-view__list">'
            out +=`<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${goodsSound[id].mainPhoto1}"></div>`
            out +='<div class="catalog-view__item50">'
            out +='<div class="catalog-view__item-line">'
            out +=`<h2 class="g-section-title g-catalog-title">${goodsSound[id].name}</h2>`
            out +='</div>'
            out +='<div class="catalog-view__item-line">'
            out +='<h2 class="g-section-title g-catalog-title">Количество</h2>'
            out +=`<div class="count-in-cart count-minus4" data-id="${id}">-</div><span>${cartSound[id]}</span>`
            out +=`<div class="count-in-cart count-plus4" data-id="${id}">+</div>`
            out +=`<div class="cart-item-cost">${cartSound[id]*goodsSound[id].cost} руб.</div>`
            out +='</div>'
            out +=`<div class="catalog-view__item-line"><a class="g-btn delete-from-cart4" data-id="${id}">Удалить из корзины</a></div>`
            out +='</div>'
            out +='</div>'
        }
        $('.main-cart4').html(out);
        $('.delete-from-cart4').on('click', delSoundGoods);
        $('.count-plus4').on('click', plusSoundGoods);
        $('.count-minus4').on('click', minusSoundGoods);
    });
};

function delSoundGoods() {
    var id = $(this).attr('data-id');
    delete cartSound[id];
    saveSoundCart();
    showCartSound();
};

function plusSoundGoods() {
    var id = $(this).attr('data-id');
    cartSound[id]++;
    saveSoundCart();
    showCartSound();
};

function minusSoundGoods() {
    var id = $(this).attr('data-id');
    if(cartSound[id]==1){
        delete cartSound[id];
    }
    else{
        cartSound[id]--;
    }
    saveSoundCart();
    showCartSound();
};

function saveSoundCart() {
    localStorage.setItem('cartSound', JSON.stringify(cartSound));
}

//вывод в корзине Коммутации//
var cartCommutation = {};

function showCartCommutation(){
    if(!isEmpty(cart) && !isEmpty(cartGuitar) && !isEmpty(cartPiano) && !isEmpty(cartDrums) && !isEmpty(cartSound) && !isEmpty(cartCommutation)
        && !isEmpty(cartMicrophone) && !isEmpty(cartHeadphones)){
        $('.g-section-title-cart').html('Корзина Пуста');
    }
    else {

    }
    $.getJSON("/../data/commutation.json",function (data){
        var goodsCommutation = data;
        var  out = '';
        for(var id in cartCommutation){
            out +='<div class="catalog-view__list">'
            out +=`<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${goodsCommutation[id].mainPhoto1}"></div>`
            out +='<div class="catalog-view__item50">'
            out +='<div class="catalog-view__item-line">'
            out +=`<h2 class="g-section-title g-catalog-title">${goodsCommutation[id].name}</h2>`
            out +='</div>'
            out +='<div class="catalog-view__item-line">'
            out +='<h2 class="g-section-title g-catalog-title">Количество</h2>'
            out +=`<div class="count-in-cart count-minus5" data-id="${id}">-</div><span>${cartCommutation[id]}</span>`
            out +=`<div class="count-in-cart count-plus5" data-id="${id}">+</div>`
            out +=`<div class="cart-item-cost">${cartCommutation[id]*goodsCommutation[id].cost} руб.</div>`
            out +='</div>'
            out +=`<div class="catalog-view__item-line"><a class="g-btn delete-from-cart5" data-id="${id}">Удалить из корзины</a></div>`
            out +='</div>'
            out +='</div>'
        }
        $('.main-cart5').html(out);
        $('.delete-from-cart5').on('click', delCommutationGoods);
        $('.count-plus5').on('click', plusCommutationGoods);
        $('.count-minus5').on('click', minusCommutationGoods);
    });
};

function delCommutationGoods() {
    var id = $(this).attr('data-id');
    delete cartCommutation[id];
    saveCommutationCart();
    showCartCommutation();
};

function plusCommutationGoods() {
    var id = $(this).attr('data-id');
    cartCommutation[id]++;
    saveCommutationCart();
    showCartCommutation();
};

function minusCommutationGoods() {
    var id = $(this).attr('data-id');
    if(cartCommutation[id]==1){
        delete cartCommutation[id];
    }
    else{
        cartCommutation[id]--;
    }
    saveCommutationCart();
    showCartCommutation();
};

function saveCommutationCart() {
    localStorage.setItem('cartCommutation', JSON.stringify(cartCommutation));
}

//вывод в корзине Микрофонов//
var cartMicrophone = {};

function showCartMicrophone(){
    if(!isEmpty(cart) && !isEmpty(cartGuitar) && !isEmpty(cartPiano) && !isEmpty(cartDrums) && !isEmpty(cartSound) && !isEmpty(cartCommutation)
        && !isEmpty(cartMicrophone) && !isEmpty(cartHeadphones)){
        $('.g-section-title-cart').html('Корзина Пуста');
    }
    else {

    }
    $.getJSON("/../data/microphone.json",function (data){
        var goodsMicrophone = data;
        var  out = '';
        for(var id in cartMicrophone){
            out +='<div class="catalog-view__list">'
            out +=`<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${goodsMicrophone[id].mainPhoto1}"></div>`
            out +='<div class="catalog-view__item50">'
            out +='<div class="catalog-view__item-line">'
            out +=`<h2 class="g-section-title g-catalog-title">${goodsMicrophone[id].name}</h2>`
            out +='</div>'
            out +='<div class="catalog-view__item-line">'
            out +='<h2 class="g-section-title g-catalog-title">Количество</h2>'
            out +=`<div class="count-in-cart count-minus6" data-id="${id}">-</div><span>${cartMicrophone[id]}</span>`
            out +=`<div class="count-in-cart count-plus6" data-id="${id}">+</div>`
            out +=`<div class="cart-item-cost">${cartMicrophone[id]*goodsMicrophone[id].cost} руб.</div>`
            out +='</div>'
            out +=`<div class="catalog-view__item-line"><a class="g-btn delete-from-cart6" data-id="${id}">Удалить из корзины</a></div>`
            out +='</div>'
            out +='</div>'
        }
        $('.main-cart6').html(out);
        $('.delete-from-cart6').on('click', delMicrophoneGoods);
        $('.count-plus6').on('click', plusMicrophoneGoods);
        $('.count-minus6').on('click', minusMicrophoneGoods);
    });
};

function delMicrophoneGoods() {
    var id = $(this).attr('data-id');
    delete cartMicrophone[id];
    saveMicrophoneCart();
    showCartMicrophone();
};

function plusMicrophoneGoods() {
    var id = $(this).attr('data-id');
    cartMicrophone[id]++;
    saveMicrophoneCart();
    showCartMicrophone();
};

function minusMicrophoneGoods() {
    var id = $(this).attr('data-id');
    if(cartMicrophone[id]==1){
        delete cartMicrophone[id];
    }
    else{
        cartMicrophone[id]--;
    }
    saveMicrophoneCart();
    showCartMicrophone();
};

function saveMicrophoneCart() {
    localStorage.setItem('cartMicrophone', JSON.stringify(cartMicrophone));
}

//вывод в корзине Наушников//
var cartHeadphones = {};

function showCartHeadphones(){
    if(!isEmpty(cart) && !isEmpty(cartGuitar) && !isEmpty(cartPiano) && !isEmpty(cartDrums) && !isEmpty(cartSound) && !isEmpty(cartCommutation)
        && !isEmpty(cartMicrophone) && !isEmpty(cartHeadphones)){
        $('.g-section-title-cart').html('Корзина Пуста');
    }
    else {

    }
    $.getJSON("/../data/headphones.json",function (data){
        var goodsHeadphones = data;
        var  out = '';
        for(var id in cartHeadphones){
            out +='<div class="catalog-view__list">'
            out +=`<div class="catalog-view__item"><img class="catalog-view__img" src="/static/img/content/products/product1/${goodsHeadphones[id].mainPhoto1}"></div>`
            out +='<div class="catalog-view__item50">'
            out +='<div class="catalog-view__item-line">'
            out +=`<h2 class="g-section-title g-catalog-title">${goodsHeadphones[id].name}</h2>`
            out +='</div>'
            out +='<div class="catalog-view__item-line">'
            out +='<h2 class="g-section-title g-catalog-title">Количество</h2>'
            out +=`<div class="count-in-cart count-minus7" data-id="${id}">-</div><span>${cartHeadphones[id]}</span>`
            out +=`<div class="count-in-cart count-plus7" data-id="${id}">+</div>`
            out +=`<div class="cart-item-cost">${cartHeadphones[id]*goodsHeadphones[id].cost} руб.</div>`
            out +='</div>'
            out +=`<div class="catalog-view__item-line"><a class="g-btn delete-from-cart7" data-id="${id}">Удалить из корзины</a></div>`
            out +='</div>'
            out +='</div>'
        }
        $('.main-cart7').html(out);
        $('.delete-from-cart7').on('click', delHeadphonesGoods);
        $('.count-plus7').on('click', plusHeadphonesGoods);
        $('.count-minus7').on('click', minusHeadphonesGoods);
    });
};

function delHeadphonesGoods() {
    var id = $(this).attr('data-id');
    delete cartHeadphones[id];
    saveHeadphonesCart();
    showCartHeadphones();
};

function plusHeadphonesGoods() {
    var id = $(this).attr('data-id');
    cartHeadphones[id]++;
    saveHeadphonesCart();
    showCartHeadphones();
};

function minusHeadphonesGoods() {
    var id = $(this).attr('data-id');
    if(cartHeadphones[id]==1){
        delete cartHeadphones[id];
    }
    else{
        cartHeadphones[id]--;
    }
    saveHeadphonesCart();
    showCartHeadphones();
};

function saveHeadphonesCart() {
    localStorage.setItem('cartHeadphones', JSON.stringify(cartHeadphones));
}

$(document).ready(function () {
    loadCartIndex();
    $('.send-email').on('click', sendEmail);
});





