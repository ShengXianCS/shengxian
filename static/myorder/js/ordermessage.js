$(function(){
	//��ţ���ᵯ����ʾ
	$('#j-mengniu').click(function(){
		var param = {"messagelogin": "yes"};
		$.post(frontPath+"/publicpraise/findUser.do", param, function(result){
			if(result=='noLogin'){
				comAlert("��¼�ѳ�ʱ,�����µ�¼",{"confirm":"ȷ��","cancel":"ȡ��"},
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
	//�ر���ţ���ᵯ��
	$('#j-close').click(function(){
		$('.mask,.mengniu-popup').hide();
	})
	
	//����
	$('#j-write').focus(function(){
		var value = $(this).val();
		if(value=='������д����'){
			$(this).val("");
		}
		$(this).addClass('hover');
		$('.sign').find('li').removeClass('hover');
	})
	
	$('#j-write').blur(function(){
		$(this).removeClass('hover');
	})
	
	//ѡ�����
	$('.sign').find('li').click(function(){
		$(this).addClass('hover').siblings().removeClass('hover');
	})
	
	//Ԥ��
	$('#scale').click(function(){
		var ordermessageimagepath = $("#ordermessageimagepath").val();
		if(ordermessageimagepath == null || ordermessageimagepath == ''){
			comAlert("�����ϴ�ͼƬ");
			return;
		}
		var ordermessageword = $("#ordermessageword").val();
		ordermessageword = ordermessageword.replace(/<.*?>/ig,"");
		if(ordermessageword == null || ordermessageword == ''){
			comAlert("����д��ѡ��ؿ�����");
			return;
		}
		
		$('.preview').show().siblings('.custom-editor').hide();
		$('.history').hide();
		//Ԥ����ͷ����ת
		var value = 348;
		$('.pic img').rotate(value);
		$('.wishes img').rotate(value);
		$("#edita").addClass("cur");
		$("#savea").addClass("curs");
		return false;
	})
	
	//Ԥ�������޸�
	$('.back').click(function(){
		$('.custom-editor').show().siblings('.preview').hide();
		$('.history').show();
		$("#edita").removeClass("cur");
		$("#savea").removeClass("curs");
	})
	
	//ͼ��༭
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
	
	//�ر�ͼ��༭
	$('#j-edit-close').click(function(){
		//�ر�ͷ����в��
		closeImageSelection();
		$('.mask-edit,.pic-edit').hide();
	})
	
	// ʹ�ù����Զ��嶨�� ������
	var num = 3;
	var len = $('.pic-list').find('li').length;
	if(len <= num) {
		$('.left-btn').hide();
		$('.right-btn').hide();
	}
	//ʹ�ù����Զ��嶨�� ��һҳ
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
	//ʹ�ù����Զ��嶨�� ��һҳ
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
        "fileTypeDesc": "��ѡ��gif jpg jpeg png �ļ�",
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
                	comAlert("�ļ���С���ܳ���3��Ŷ");
                    break;  
                case -120:  
                	comAlert("�ļ���С�쳣��");  
                  break;  
                case -130:  
                	comAlert("�ļ����Ͳ���ȷ��");  
                   break;  
            }  
            return false;  
	     },
        "onUploadSuccess": function(file, data, response) {
        	$("#avatar1").attr("src", data);
        	//��֤���
        	$("#avatar1").each(function(i){ 
        		var img = $(this); 
        		$("<img/>").attr("src", $(img).attr("src")).load(function(){ 
	        		 if (this.width < 142) {
	                 	comAlert("�ļ���������142");
	                     return;
	                 }
	                 if (this.height < 228) {
	                 	comAlert("�ļ��߲�������228");
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

//�и�����ͼƬ
function addmessageImg(){
	$('#rotation').val(value);  //��ת���� value
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
		 //������Ⱦ
		 $("#yulangImage").attr("src", staticPath + result);
		 $("#preview").attr("src", staticPath + result);
		 $("#ordermessageimagepath").val(result);
		 $(".pic-title").hide();
		 $(".pic-file").show();
         ims.cancelSelection();
         $('.mask-edit,.pic-edit').hide();
	});
	$('#rotation').val(0);  //��ת���� value
	value = 0;
}

//�ύ���Ժؿ�
function addordermessage(){
	var ordermessageimagepath = $("#ordermessageimagepath").val();
	var ordermessageword = $("#ordermessageword").val();
	var orderId = $("#theorderId").val();
	if($("#theorderparentId").val()>0){
		orderId = $("#theorderparentId").val();  //����֧����ҳ�����
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
			comAlert("��¼�ѳ�ʱ,�����µ�¼",{"confirm":"ȷ��","cancel":"ȡ��"},
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
			//��Ա���Ĵ���
			$("#ordermessagespan_"+orderId).html("");
			var showhtml = "<p><a href='#' class='p1' onclick='showordermessage("+imgurl+");'>�鿴���ƺؿ�</a></p>";
			$("#ordermessagespan_"+orderId).html(showhtml);
			//ǰ̨����
			$("#j-mengniu").addClass("btn-hq-already");
			$("span[id^='j-mengniu']").unbind("click"); //�Ƴ�click�¼�
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
    //Ԥ����ͷ����ת
	var value = 348;
	$('.yulangword').rotate(value);
}