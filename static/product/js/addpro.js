$(function () {
    $('.addCart').click(function () {
        var spanid = $(this).attr('id');
        console.log(spanid);
        var proid = spanid.split('_')[2];
        cntimg = $('#cntimg').text();
        headcnt = $('#headcnt').text();
        $.getJSON('/order/addpro/' + proid, function (data) {
            if (data.status == 'ok') {
                $('#cntimg').text(parseInt(cntimg) + 1);
                $('#headcnt').text(parseInt(headcnt) + 1);
            }
        })
    });

    // $('#cartpng').click(function () {
    //     window.open('/order/mycart',target='_blank')
    // })
});