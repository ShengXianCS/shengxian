$(function(){
	//蒙牛焕轻弹层显示
	$('#j-mengniu').click(function(){
		var param = {"messagelogin": "yes"};
		$.post(frontPath+"/publicpraise/findUser.do", param, function(result){
			if(result=='noLogin'){
				comAlert("登录已超时,请重新登录",{"confirm":"确定","cancel":"取消"},
					function(){
						var uri = "/Member/menumyorderlist.do?&tag=2";
						var url = frontPath+"/Member/index.jsp?mid=" + mid + "&url=" + encodeURIComponent(uri) + "&t=" +Math.random();
						window.open(url);  
				    }
				);
			}else{
				var w_doc = $(window).width();
				var h_doc = $(window).height();
			    var w_popup = $(".mengniu-popup").width();
				var left_w = (w_doc-w_popup)/2;
				var w_popup = $(".mengniu-popup").width();
				$(".mengniu-popup").css("left",left_w);
				$('.mask').width(w_doc);
				$('.mask').height(h_doc);
				$('.mask,.mengniu-popup').show();
				$(".custom-editor").show();
				$('.preview').hide();
				$("#edita").removeClass("cur");
				$("#savea").removeClass("curs");
			}
		});
	})
	//关闭蒙牛焕轻弹层
	$('#j-close').click(function(){
		$('.mask,.mengniu-popup').hide();
	})
	
	//寄语
	$('#j-write').focus(function(){
		var value = $(this).val();
		if(value=='亲自书写心意'){
			$(this).val("");
		}
		$(this).addClass('hover');
		$('.sign').find('li').removeClass('hover');
	})
	
	$('#j-write').blur(function(){
		$(this).removeClass('hover');
	})
	
	//选择寄语
	$('.sign').find('li').click(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
	})
	
	//预览
	$('#scale').click(function(){
		var ordermessageimagepath = $("#ordermessageimagepath").val();
		if(ordermessageimagepath == null || ordermessageimagepath == ''){
			comAlert("请先上传图片");
			return;
		}
		var ordermessageword = $("#ordermessageword").val();
		ordermessageword = ordermessageword.replace(/<.*?>/ig,"");
		if(ordermessageword == null || ordermessageword == ''){
			comAlert("请填写或选择贺卡留言");
			return;
		}
		
		$('.preview').show().siblings('.custom-editor').hide();
		$('.history').hide();
		//预览的头像旋转
		var value = 348;
		$('.pic img').rotate(value);
		$('.wishes img').rotate(value);
		$("#edita").addClass("cur");
		$("#savea").addClass("curs");
		return false;
	})
	
	//预览返回修改
	$('.back').click(function(){
		$('.custom-editor').show().siblings('.preview').hide();
		$('.history').show();
		$("#edita").removeClass("cur");
		$("#savea").removeClass("curs");
	})
	
	//图像编辑
	/*$('.edit').click(function(){
		var w_doc = $(window).width();
		var h_doc = $(window).height();
		var w_popup = $(".pic-edit").width();
		var left_w = (w_doc-w_popup)/2;
		$(".pic-edit").css("left",left_w);
		$('.mask-edit').width(w_doc);
		$('.mask-edit').height(h_doc);
		$('.mask-edit,.pic-edit').show();
		createImageSelection();
		return false;
	})*/
	
	//关闭图像编辑
	$('#j-edit-close').click(function(){
		//关闭头像裁切插件
		closeImageSelection();
		$('.mask-edit,.pic-edit').hide();
	})
	
	// 使用过的自定义定制 的声明
	var num = 3;
	var len = $('.pic-list').find('li').length;
	if(len <= num) {
		$('.left-btn').hide();
		$('.right-btn').hide();
	}
	//使用过的自定义定制 上一页
	$('.left-btn').live('click',function(){
		var $ul = $('.pic-list').find('ul');
		var $liWidth = $ul.find('li').outerWidth();
		var $ulWidth = len*$liWidth;
		var scorllwidth = $liWidth * num;
		if(len > 0 && num > 0 && len < 2*num){
			while(len < 2*num){
				len = $('.pic-list').find('li').length;
				$ul.append($ul.html());
			}
			$ul.css('width',$ulWidth);
		}
		for( var m = 0; m < num; m++ ) {	
			$ul.find('li').eq(-1).prependTo($ul); 			
		};
		$ul.css("margin-left", -scorllwidth);
		$ul.stop().animate( { "margin-left": -0 }, 500);
	});
	//使用过的自定义定制 下一页
	$('.right-btn').click(function(){
		var $ul = $('.pic-list').find('ul');
		var $liWidth = $ul.find('li').outerWidth();
		//
		var $ulWidth = len*$liWidth;
		var scorllwidth = $liWidth*num;
		if(len > 0 && num > 0 && len < 2*num){
			$ul.append($ul.html());
			$ul.css('width',$ulWidth);
		}
		$ul.stop().animate({"margin-left": - scorllwidth },500,
				function() {
					for( var m = 0; m < num; m++ ) {
						$ul.find('li').eq(0).appendTo($ul); 
					};
					$ul.css("margin-left", 0); 
				}
		);	

	});
	
})



function choicewords(num){
	$("#ordermessageword").val("@"+num);
	$("#ordermessagewordnum").val(num);
	var wordpath = $("#choicewords"+num).attr("data-src");
	var content = "<img src='"+wordpath+"'/>"
	$("#yulangword").html(content);
	$("#j-write").val("")
}

$(function(){
	var dourl = frontPath + "/plugin/uploadify/jsp/imageUp.jsp";
	$("#uploadify,#uploadifytwo").uploadify({
        "swf": "/plugin/uploadify/uploadify.swf",
        "uploader": dourl,
        "method": "get",
        "auto": true,
        "fileTypeDesc": "请选择gif jpg jpeg png 文件",
        "fileTypeExts": "*.gif;*.jpg;*.jpeg;*.png",
        "fileSizeLimit": 3072,
        "sizeLimit": 3072*1024,
        "height": 35,
        "width": 200,
        "queueID": 'fileQueueDiv',
        "onInit": function (){$("#uploadify-queue").hide();$("#uploadifytwo-queue").hide();},
        "overrideEvents": ['onSelectError', 'onDialogClose'],  
        "onSelectError": function (file, errorCode, errorMsg) {  
            switch (errorCode) {  
                case -110:  
                	comAlert("文件大小不能超过3兆哦");
                    break;  
                case -120:  
                	comAlert("文件大小异常！");  
                  break;  
                case -130:  
                	comAlert("文件类型不正确！");  
                   break;  
            }  
            return false;  
	     },
        "onUploadSuccess": function(file, data, response) {
        	$("#avatar1").attr("src", data);
        	//验证宽高
        	$("#avatar1").each(function(i){ 
        		var img = $(this); 
        		$("<img/>").attr("src", $(img).attr("src")).load(function(){ 
	        		 if (this.width < 142) {
	                 	comAlert("文件宽不能少于142");
	                     return;
	                 }
	                 if (this.height < 228) {
	                 	comAlert("文件高不能少于228");
	                     return;
	                 }
        		});
        	});
            var w_doc = $(window).width();
    		var h_doc = $(window).height();
    		var w_popup = $(".pic-edit").width();
    		var left_w = (w_doc-w_popup)/2;
    		$(".pic-edit").css("left",left_w);
    		$('.mask-edit').width(w_doc);
    		$('.mask-edit').height(h_doc);
    		$('.mask-edit,.pic-edit').show();
    		$("#avatar").attr("src", data);
            $("#avatar1").attr("src", data);
    		 $("#rotation").val(0);
    		setTimeout(createImageSelection,50);
    		
        }
    });
	
});

//切割留言图片
function addmessageImg(){
	$('#rotation').val(value);  //旋转度数 value
	var id_top = $("#id_top").val();
	var id_left = $("#id_left").val();
	var id_right = $("#id_right").val();
	var id_bottom = $("#id_bottom").val();
	var rotation = $("#rotation").val();
	var imagepath = $("#avatar").attr("src");
	var params = new Object();
	params["top"] = id_top;
	params["left"] = id_left;
	params["right"] = id_right;
	params["bottom"] = id_bottom;
	params["rotation"] = rotation;
	params["imagepath"] = imagepath;
	$.post(frontPath+"/checkout/mengniuImageqg.do", params, function(result){
		 //重新渲染
		 $("#yulangImage").attr("src", staticPath + result);
		 $("#preview").attr("src", staticPath + result);
		 $("#ordermessageimagepath").val(result);
		 $(".pic-title").hide();
		 $(".pic-file").show();
         ims.cancelSelection();
         $('.mask-edit,.pic-edit').hide();
	});
	$('#rotation').val(0);  //旋转度数 value
	value = 0;
}

//提交留言贺卡
function addordermessage(){
	var ordermessageimagepath = $("#ordermessageimagepath").val();
	var ordermessageword = $("#ordermessageword").val();
	var orderId = $("#theorderId").val();
	if($("#theorderparentId").val()>0){
		orderId = $("#theorderparentId").val();  //在线支付的页面添加
	}
	var params = new Object();
	params["picPath"] = ordermessageimagepath;
	params["msg"] = ordermessageword;
	params["orderID"] = orderId;
	params["fromType"] = 0;
	params["type"] = 2;
	$.post(frontPath+"/buildOrderImage.do", params, function(data){
		var advisor = eval("("+data+")");
		var msg = advisor.msg;
		$('.mask,.mengniu-popup').hide();
		var result = advisor.result;
		var imgurl = advisor.imgurl;
		imgurl = imgurl.substring(imgurl.indexOf("/upload"));
		if(result==10){
			comAlert("登录已超时,请重新登录",{"confirm":"确定","cancel":"取消"},
				function(){
				var uri = "/Member/menumyorderlist.do?&tag=2";
				var url = frontPath+"/Member/index.jsp?mid=" + mid + "&url=" + encodeURIComponent(uri) + "&t=" +Math.random();
				window.open(url);  
			    }
			);
		}else{
			comAlert(msg);
		}
		if(result==0){
			//会员中心处理
			$("#ordermessagespan_"+orderId).html("");
			var showhtml = "<p><a href='#' class='p1' onclick='showordermessage("+imgurl+");'>查看定制贺卡</a></p>";
			$("#ordermessagespan_"+orderId).html(showhtml);
			//前台处理
			$("#j-mengniu").addClass("btn-hq-already");
			$("span[id^='j-mengniu']").unbind("click"); //移除click事件
		}
	});
}
function messagewritedown(){
	var value = $("#j-write").val();
	value = value.replace(/<.*?>/ig,"");
	var max = 24;
	if (value.length > max) {
		value = value.substring(0,max);
 	   $("#j-write").val(value);
    }else {
  	   $("#wordsize").html(value.length+"/"+max);
    }
    $("#ordermessageword").val(value);
    $("#yulangword").html("<span class='yulangword'>"+value+"</span>");
    //预览的头像旋转
	var value = 348;
	$('.yulangword').rotate(value);
}