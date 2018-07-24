//最开始进入页面加载的每个商品的小计
function everyM() {
    var pros  = $('.selectp');
    for(var i=0;i<pros.length;i++){
        var pro = pros[i];
        var id = $(pro).attr("name");
        var cnt = $("#sumpro_"+id).attr("title");
        var price = $("#price_"+id).text().trim();
        console.log(cnt)
        console.log((parseInt(cnt)*parseFloat(price)).toFixed(2))
        $("#sumpro_"+id).text((parseInt(cnt)*parseFloat(price)).toFixed(2));  //两位小数
    }

}

//检查所有商品是否被选择
function checkall() {
    var pros  = $('.selectp');
    for(var i=0;i<pros.length;i++){
        var pro = pros[i];
        var selFlag = $(pros[i]).attr("checked");
        if(selFlag == undefined){
            $(".allchose").removeAttr("checked");  //只要有未选择的，全选按钮就未选择
            return
        }
    }
    document.getElementsByClassName("allchose")[0].checked = true;  //将选择框设置为选择状态
}

$(function () {
    everyM();

    //对每种商品进行选择
    $(".selectp").click(function () {
        var selFlag = $(this).attr("checked");
        var id = $(this).attr("name");
        if(selFlag == undefined){
            $(this).attr("checked", "checked");  //未选择，点击后要加钱
        }else {
            $(this).removeAttr("checked");  //已选择，点击后要减钱
        }
        checkall();

        //更新后台购物车，0表示选择单个购物车，1表示全选，2表示取消全选
        $.getJSON('/order/select/0/'+id,function (data) {
            if(data.status == 'ok'){
                var sump = $("#sumpro_"+id).text().trim();  //拿到小计
                var allM = $("#j-totaltopay1").text().trim();  //拿到总计
                if (data.selected) {
                    $("#sumpro_"+id).text(data.allMoney);
                     // toFixed作用，保留小数位
                    $("#j-totaltopay1").text((parseFloat(allM)+parseFloat(data.allMoney)).toFixed(2));
                } else {
                    $("#sumpro_"+id).text(data.allMoney);
                    $("#j-totaltopay1").text((parseFloat(allM)-parseFloat(data.allMoney)).toFixed(2));
                }
            }
        });

    });

    checkall();

    //全选或取消全选
    $(".allchose").click(function () {
        option = 1;
        var allFlag = $(this).attr("checked");
        var carts = document.getElementsByClassName("selectp");
        if(allFlag == undefined){
            $(this).attr("checked", "checked");
            for(var i=0;i<carts.length;i++){
                carts[i].checked = true;  //全选
            }
            option = 1;
        }else {
            $(this).removeAttr("checked");  //取消全选
            // var carts = document.getElementsByClassName("selectp");
            for(var i=0;i<carts.length;i++){
                carts[i].checked = false;
            }
            option = 2;
        }
        $.getJSON('/order/select/'+option+'/0',function (data) {
            $("#j-totaltopay1").text(data.allMoney)  //总计金额
        })
    });

    //商品数量的减
    $('.subp').click(function () {
        id = $(this).attr("id");
        cnt = $("#num_"+id).val();  //商品数量
        if(parseInt(cnt) > 1){
            $("#num_"+id).val(parseInt(cnt)-1)
        }
        //修改后台数据
        $.getJSON('/order/subpro/'+id,function (data) {
            var sump = $("#sumpro_"+id).text().trim();  //拿到小计
            var allM = $("#j-totaltopay1").text().trim();  //拿到总计
            if(data.status == 'ok'){
                $("#sumpro_"+id).text((parseFloat(sump)-parseFloat(data.price)).toFixed(2));
                $("#j-totaltopay1").text((parseFloat(allM)-parseFloat(data.price)).toFixed(2));
            }
        })
    });

    //商品数量的加
    $(".addp").click(function () {
        id = $(this).attr("id");
        cnt = $("#num_"+id).val();  //商品数量
        $.getJSON('/order/addpro/'+id,function (data) {
            var sump = $("#sumpro_"+id).text().trim();  //拿到小计
            var allM = $("#j-totaltopay1").text().trim();  //拿到总计
            if(data.status == 'ok'){
                $("#num_"+id).val(parseInt(cnt)+1);  //添加数量
                $("#sumpro_"+id).text((parseFloat(sump)+parseFloat(data.price)).toFixed(2));
                $("#j-totaltopay1").text((parseFloat(allM)+parseFloat(data.price)).toFixed(2));
            }
        })
    });


    //删除商品
    $(".deletepro").click(function () {
        id = $(this).attr("id");
        if(id == 0){
            $('#delMsg').text('确定要删除所有商品吗?');
        }else {
            $('#delMsg').text('确定要删除此商品吗?');
        }
        $('#deleteModal').modal({backdrop:'static',show:true});  //显示模态框
        //确认删除
        $('#ok').click(function () {
            $.getJSON('/order/delcart/'+id,function (data) {
                if(data.status == 'ok'){
                    $('#delMsg').text(data.msg);
                    $('.modal-footer').css('display','none');
                    setTimeout(function () {
                        $('#deleteModal').modal('hide');
                        window.open('/order/mycart',target='_self')
                    },1000)
                }
            })
        })
    });


    //下订单
    $('#toOrder').click(function () {
        //先判断有没有选择商品
        if($('.selectp').attr('checked') == undefined){
            $('#selectModal').modal({backdrop:'static',show:true});
        }else {
            //先判断有没有收货地址
            var addrs = $('.address');
            for(var i=0;i<addrs.length;i++){
                var addr = addrs[i];
                if($(addr).text() == ''){
                    $('#delMsg').text('请先添加收货地址');
                    $('#deleteModal').modal({backdrop:'static',show:true});
                    $('#ok').text('添加地址');
                    $('#ok').click(function () {
                        window.open('/order/myhome/1',target='_self')
                    });
                    return
                }
            }

            //下单
            window.open('/order/toorder/0',target='_self')
        }
    });

});