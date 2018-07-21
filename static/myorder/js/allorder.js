$(function () {
    //删除订单
    $(".offorder").click(function () {
        id = $(this).attr("id");
        topay = $("#topay").text();
        console.log(topay);
        deltype = 0;
        if(topay){
            $('#delMsg').text('确定要取消此商品吗?');
            deltype = 0;

        }else {
            $('#delMsg').text('确定要删除此订单吗?');
            deltype = 1;
        }
        $('#deleteModal').modal({backdrop:'static',show:true});  //显示模态框
        //确认删除
        $('#ok').click(function () {
            $.getJSON('/order/delorder/'+id+'/'+deltype,function (data) {
                if(data.status == 'ok0'){
                    $('#delMsg').text(data.msg);
                    $('.modal-footer').css('display','none');
                    setTimeout(function () {
                        $('#deleteModal').modal('hide');
                        $('#orderstate').text('已取消');
                        window.open('/order/myhome',target='_parent')
                    },1000)
                }else if(data.status == 'ok1'){
                    $('#delMsg').text(data.msg);
                    $('.modal-footer').css('display','none');
                    setTimeout(function () {
                        $('#deleteModal').modal('hide');
                        window.open('/order/myhome',target='_parent')
                    },1000)
                }
            })
        })
    });
});