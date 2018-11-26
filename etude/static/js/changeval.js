function  change_value(input, text) {
    $(input).attr('value', text).focus(function () {
        if ($(this).val() == text){
            $(this).attr('value', '');
        }
    }).blur(function () {
        if ($(this).val() == ''){
            $(this).attr('value', text);
        }
    })

}