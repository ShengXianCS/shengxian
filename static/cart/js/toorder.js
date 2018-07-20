$(function () {
    $('#payBtn > button').click(function () {
        $('#payMsg').text("正在使用"+$(this).text()+'支付...');
        $('#myModal').modal({backdrop:'static',show:true});
        //拿到订单号
        ordernum = $(this).parent().attr("order_id");
        //支付类型：0余额，1支付宝，2微信
        payType = $(this).attr("id");
        setTimeout(function () {
            $.getJSON('/order/pay/'+ordernum+'/'+payType,function (data) {
                //支付
                if(data.status == 'ok'){
                    $('#payMsg').text(data.msg);
                    setTimeout(function () {
                        $('#myModal').modal('hide');
                        window.open('/order/allorder/0',target='_self')  //去往所有订单页面
                    },1000)
                }else if(data.status == 'fail'){  //支付失败
                    $('#payMsg').text(data.msg);
                    setTimeout(function () {
                        $('#myModal').modal('hide');
                        window.open('/order/toorder/'+ordernum,target='_self')  //继续支付
                    },1000)
                }
            })
        },1500)
    })
});