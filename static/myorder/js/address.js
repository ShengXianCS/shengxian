//编辑信息和添加信息的函数
function uploadmsg(path) {
    name = $('#recipient-name').val();  //拿到表单中要提交的信息
    phone = $('#recipient-phone').val();
    address = $('#recipient-address').val();
    zipcode = $('#recipient-zipcode').val();
    if(name != '' && phone != '' && address != ''&& zipcode != '') {
        var xhr = new XMLHttpRequest();
        xhr.open('post', path, true);
        xhr.onload = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                data = JSON.parse(xhr.responseText);
                console.log(data);
                if (data.status == 'ok') {
                    // 弹出模态框，但不能点击内容以外关闭
                    $('#saveModal').modal({backdrop: 'static', show: true});
                    setTimeout(function () {
                        $('#saveModal').modal('hide');
                        $('#myModal').modal('hide');
                        window.open('/order/myhome/1', target = '_parent')
                    }, 2000)
                }
            }
        };
        var formdata = new FormData;
        formdata.append('name', name);
        formdata.append('phone', phone);
        formdata.append('address', address);
        formdata.append('zipcode', zipcode);
        xhr.send(formdata);
    }else {
        $('#recipient-name').attr('placeholder','信息不能为空');  //添加属性值
        $('#recipient-phone').attr('placeholder','信息不能为空');
        $('#recipient-address').attr('placeholder','信息不能为空');
        $('#recipient-zipcode').attr('placeholder','信息不能为空');
    }
}

$(function () {
    $('.addnew_add').click(function () {
        $('#myModal').modal({backdrop:'static', show:true});
        $('#recipient-name').val('');
        $('#recipient-phone').val('');
        $('#recipient-address').val('');
        $('#recipient-zipcode').val('');
        $('#exampleModalLabel').text('添加新地址');
        $('#save').click(function () {
            uploadmsg('/order/addr/1/0');
        })
    });

    $('.edit').click(function () {
        //编辑的时候讲原信息显示在表单中
        id = $(this).attr('id');
        name = document.getElementById('name'+id).title;
        phone = document.getElementById('phone'+id).innerText;
        zipcode = document.getElementById('phone'+id).title;
        address = document.getElementById('addr'+id).innerText;
        $('#recipient-name').val(name);
        $('#recipient-phone').val(phone);
        $('#recipient-address').val(address);
        $('#recipient-zipcode').val(zipcode);
        $('#exampleModalLabel').text('修改收货信息');
        $('#myModal').modal({backdrop:'static', show:true});
        $('#save').click(function () {
            uploadmsg("/order/addr/2/"+id);
            console.log("/order/addr/2/"+id)
        })
    });

    $('.delete').click(function () {
        id = $(this).attr('id');
        name = document.getElementById('name'+id).title;
        console.log(name);
        $('#close').css('display','inline-block');
        $('#close').next().css('display','inline-block');
        $('#payMsg').text('您确定要删除 '+name+' 的收货地址信息吗?');
        $('#saveModal').modal({backdrop:'static', show:true});
        $('#delete').click(function () {
            $('#close').css('display','none');
            $('#close').next().css('display','none');
            $('#payMsg').text('正在删除...请稍后');
            setTimeout(function () {
                $.getJSON('/order/addr/3/'+id,function (data) {
                    if(data.status == 'ok'){
                        $('#payMsg').text(data.msg);
                        setTimeout(function () {
                            $('#saveModal').modal('hide');
                            window.open('/order/myhome/1', target = '_parent')
                        },1000)
                    }
                })
            },2000)
        })
    });

    $('.set_default').click(function () {
        id = $(this).attr('id');
        console.log(id);
        $.getJSON('/order/addr/4/'+id,function (data) {
            if(data.status == 'ok'){
                console.log(data);
                window.open('/order/myhome/1', target = '_parent')

            }
        });
    });

});