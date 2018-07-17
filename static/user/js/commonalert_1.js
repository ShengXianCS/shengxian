/**
 * ͨ����ʾ��
 * param msg ��ʾ������Ϣ
 * param params ��������title��ȷ����ťconfirm��ȡ��cancel���ر�close�Ķ���(close����Ĭ����ʾ�رհ�ť��ֻ�д�falseʱ����ʾ�رհ�ť)
 * funcConfirm ȷ����ť�¼�
 * funcCancel ȡ����ť�¼�
 * funcClose �رհ�ť�¼�
 */

//ʵ��1
/*$(function(){
    comAlert("���۳ɹ�");
  });*/
//ʵ��2
/*$(function(){
	comAlert("ÿ������Ʒ������Ԥ����Ʒ������ͬһ���ﳵ�µ�����ѡ����Ҫ��������Ʒ��",
			 {"confirm":"����ÿ����","cancel":"��������Ԥ��","close":"false"},
		     function ok(){alert("OK");},
             function cancel(){alert("cancel");},function close(){alert("close");}
            )
});*/

var BASEVAR = {
	webIndex : "",
	staticPrefix : ""
}
try{
	BASE;	//��BASE����δ����
	BASEVAR.webIndex = BASE.webIndex;
 	BASEVAR.staticPrefix = BASE.staticPrefix;
}catch(e){
 	BASEVAR.webIndex = "commonalert";
 	BASEVAR.staticPrefix = "http://static.womai.com";
}
var webIndex = webIndex || BASEVAR.webIndex;			//ҳ����Ŀ¼
var staticPrefix = staticPrefix || BASEVAR.staticPrefix;//��̬��Դ����
var loadCss = false;									//�Ƿ��Ѷ�̬���ع�commonalert.css��ʽ��
var comAlertZindex_msg = 999999;									//comAlert��β���
function comAlert(msg,params,funcConfirm,funcCancel,funcClose){//params eg = {"title":"��ʾ","confirm":"ȷ��","cancel":"ȡ��","close":"false"}
	if(msg == "undefined") return;
	showComAlertShade();	//�������ֲ�
	params = params || {};
	var confirm = params.confirm, cancel = params.cancel,close = params.close, title = params.title;
	if(!title)title = "��ʾ";
	if(!confirm)confirm = "ȷ��";
	var cont = [];
	cont.push('<div class="alert-popup" id="j-alert-popup' + comAlertZindex_msg + '">');
	//�رհ�ťδ��ֵĬ��Ϊ��ʾ����false����ʾ�ر�
	if(close != 'false'){
		cont.push('<i id="j-alert-close' + comAlertZindex_msg + '" data-zindex="' + comAlertZindex_msg + '">��</i>');
	}
    cont.push('<div class="alert-top png"></div>');
    cont.push('<div class="alert-content">');
    cont.push('<h3>' + title + '</h3>');
    cont.push('<div class="alert-popup-con">');
    cont.push('<p>' + msg + '</p>');
    cont.push('</div>');
    if(cancel){
    	cont.push('<div class="alert-pop-btn1 alert-pop-btn"><a href="javascript:;" class="alert-confirm" id="j-alert-confirm' + comAlertZindex_msg + '" data-zindex="' + comAlertZindex_msg + '">' + confirm + '</a>');
    	cont.push('<a href="javascript:;" class="alert-cancel" id="j-alert-cancel' + comAlertZindex_msg + '" data-zindex="' + comAlertZindex_msg + '">' + cancel + '</a></div>')
    	cont.push('</div>');
    	cont.push('<div class="alert-bottom png"></div> ');   
    }else{
    	cont.push('<div class="alert-pop-btn2 alert-pop-btn"><a href="javascript:;" class="alert-confirm" id="j-alert-confirm' + comAlertZindex_msg + '" data-zindex="' + comAlertZindex_msg + '">' + confirm + '</a>');
    	cont.push('</div></div>');
    	cont.push('<div class="alert-bottom2 png"></div>');    
    }
	$("body").append(cont.join(""));
	$(".alert-popup").css("z-index",comAlertZindex_msg);
	//������ʾ������Ϣ��ȵ���������ʾ
	//��ȡ������ɼ�����Ŀ�͸�
	var w_doc = $(document).width();
	//��ȡ�����Ŀ��
	var w_popup = $('.alert-popup').width();
	var left_w = (w_doc-w_popup)/2;
	$('.alert-popup').css("left",left_w);
	//����ť�����¼�
	if(typeof(funcConfirm) === "function"){
		$("#j-alert-confirm" + comAlertZindex_msg).click(function(){
			closeComAlert($(this).attr("data-zindex"));
			funcConfirm();
		});
	}else{
		$("#j-alert-confirm" + comAlertZindex_msg).click(function(){
			closeComAlert($(this).attr("data-zindex"));
		});
	}
	if(typeof(funcCancel) === "function"){
		$("#j-alert-cancel" + comAlertZindex_msg).click(function(){
			closeComAlert($(this).attr("data-zindex"));
			funcCancel();
		});
	}else{
		$("#j-alert-cancel" + comAlertZindex_msg).click(function(){
			closeComAlert($(this).attr("data-zindex"));
		});
	}
	if(typeof(funcClose) === "function"){
		$("#j-alert-close" + comAlertZindex_msg).click(function(){
			closeComAlert($(this).attr("data-zindex"));
			funcClose();
		});
	}else{
		$("#j-alert-close" + comAlertZindex_msg).click(function(){
			closeComAlert($(this).attr("data-zindex"));
		});
	}
	comAlertZindex_msg--;
}

/* 
 * ���ñ������ֲ�
 */
function showComAlertShade(){
	if($("#alertLayoutBg").length > 0){$("#alertLayoutBg").show();return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");e.id="alertLayoutBg";e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:1000;";
	document.body.appendChild(e);
}

/* 
 * �رձ������ֲ�
 */
function closeComAlertShade(){
	if($("#alertLayoutBg").length > 0){$("#alertLayoutBg").remove()}
}

/*
 * ���ñ������ֲ�
 */
function resizeComAlertShade(){
	if($("#alertLayoutBg").length > 0){
		$("#alertLayoutBg").css("height", $(document).height());
		$("#alertLayoutBg").css("width", $(document).width());
	}
}

/*
 * �رյ�����
 */
function closeComAlert(zindex){
	if(zindex != "undefined"){
		$("#j-alert-popup" + zindex).remove();
		if($(".alert-popup").length > 0){
			//��alertmsg���������Ҫ�ر����ֲ�
			return;
		}else{
			comAlertZindex_msg = 999999;
		}
	}
	closeComAlertShade();
}