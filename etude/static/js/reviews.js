$(function () {
    change_value('#nickname', 'Ваше имя');
    change_value('#comment', 'Ваш отзыв');
    $('.commentbutton').click(function () {
        var nickname = $('#nickname').val();
        var comment = $('#comment').val();
            if (nickname != 'Ваше имя' && comment !='Ваш отзыв') {
                $.ajax({
                    type: "POST",
                    url: "../../core/comments.php",
                    dataType: "json",
                    data: {nickname: nickname, comment:comment},
                    success: function (data) {
                        $('div.reviews-list').prepend(
                            "<h3>&clubs;" + data.nickname + "</h3>" +
                            "<p>" + data.comment + "</p>"
                        );
                    }
                })
            }
    });
});