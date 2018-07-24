$(function () {
    $('.addCart').click(function () {
        var spanid = $(this).attr('id');
        console.log(spanid);
        var proid = spanid.split('_')[2];
        cntimg = $('#cntimg').text();
        headcnt = $('#headcnt').text();
        $.getJSON('/order/addpro/' + proid, function (data) {
            console.log(data.status);
            if (data.status == 'ok') {
                $('#cntimg').text(parseInt(cntimg) + 1);
                $('#headcnt').text(parseInt(headcnt) + 1);
            }else{
                window.open('/user/login',target='_self')
            }
        })
    });

    // $('#cartpng').click(function () {
    //     window.open('/order/mycart',target='_blank')
    // })
});