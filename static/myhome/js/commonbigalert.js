/**
 * ͨ����ʾ��(��Ϊ700px�汾)
 * param msg ��ʾ������Ϣ
 * param params ��������title��ȷ����ťconfirm��ȡ��cancel���ر�close�Ķ���(close����Ĭ����ʾ�رհ�ť��ֻ�д�falseʱ����ʾ�رհ�ť)
 * funcConfirm ȷ����ť�¼�
 * funcCancel ȡ����ť�¼�
 * funcClose �رհ�ť�¼�
 * funcIsConfirm  �ж��������ж�ȷ����ť�¼��Ƿ�ִ��
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
var comBigAlertZindex_msg = 999999;									//comAlert��β���
function comBigAlert(msg,params,funcConfirm,funcCancel,funcClose,funcIsConfirm){//params eg = {"title":"��ʾ","confirm":"ȷ��","cancel":"ȡ��","close":"false"}
	if(msg == "undefined") return;
	showComBigAlertShade();	//�������ֲ�
	params = params || {};
	var confirm = params.confirm, cancel = params.cancel,close = params.close, title = params.title;
	if(!title)title = "��ʾ";
	if(!confirm)confirm = "ȷ��";
	var cont = [];
	cont.push('<div class="big-alert-popup" id="j-big-alert-popup' + comBigAlertZindex_msg + '">');
	cont.push('<div class="big-alert-top png"></div>');
    cont.push('<div class="big-alert-content">');
    cont.push('<h3>' + title);
    //�رհ�ťδ��ֵĬ��Ϊ��ʾ����false����ʾ�ر�
    if(close != 'false'){
    	cont.push('<span id="j-big-alert-close' + comBigAlertZindex_msg + '" data-zindex="' + comBigAlertZindex_msg + '">��</span>');
    }
    cont.push('</h3>');
    cont.push('<div class="big-alert-msg">' + msg + '</div>');
    cont.push('</div><div class="clear"></div>');
       

	cont.push('<div class="big-btn-bottom"><div class="btn">');
    if(cancel){
    	cont.push('<div class="big-alert-pop-btn1 big-alert-pop-btn"><a href="javascript:;" class="big-alert-confirm" id="j-big-alert-confirm' + comBigAlertZindex_msg + '" data-zindex="' + comBigAlertZindex_msg + '">' + confirm + '</a>');
    	cont.push('<a href="javascript:;" class="big-alert-cancel" id="j-big-alert-cancel' + comBigAlertZindex_msg + '" data-zindex="' + comBigAlertZindex_msg + '">' + cancel + '</a></div>')
    	cont.push('</div><div class="big-bottom1"></div></div>');
    }else{
    	cont.push('<div class="big-alert-pop-btn2 big-alert-pop-btn"><a href="javascript:;" class="big-alert-confirm" id="j-big-alert-confirm' + comBigAlertZindex_msg + '" data-zindex="' + comBigAlertZindex_msg + '">' + confirm + '</a>');
    	cont.push('</div>');
    	cont.push('</div><div class="big-bottom2"></div></div>');
    }
	$("body").append(cont.join(""));
	$(".big-alert-popup").css("z-index",comBigAlertZindex_msg);
	//������ʾ������Ϣ��ȵ���������ʾ
	//��ȡ������ɼ�����Ŀ�͸�
	var w_doc = $(document).width();
	//��ȡ�����Ŀ��
	var w_popup = $('.big-alert-popup').width();
	var left_w = (w_doc-w_popup)/2;
	$('.big-alert-popup').css("left",left_w);
	//����ť�����¼�
	if(typeof(funcConfirm) === "function"){
		$("#j-big-alert-confirm" + comBigAlertZindex_msg).click(function(){
			if(typeof(funcIsConfirm) === "function"){
				if(funcIsConfirm()){
					funcConfirm();
					closeComBigAlert($(this).attr("data-zindex"));
				}
			}else{
				closeComBigAlert($(this).attr("data-zindex"));
				funcConfirm();
			}
		});
	}else{
		$("#j-big-alert-confirm" + comBigAlertZindex_msg).click(function(){
			closeComBigAlert($(this).attr("data-zindex"));
		});
	}
	if(typeof(funcCancel) === "function"){
		$("#j-big-alert-cancel" + comBigAlertZindex_msg).click(function(){
			funcCancel();
			closeComBigAlert($(this).attr("data-zindex"));
		});
	}else{
		$("#j-big-alert-cancel" + comBigAlertZindex_msg).click(function(){
			closeComBigAlert($(this).attr("data-zindex"));
		});
	}
	if(typeof(funcClose) === "function"){
		$("#j-big-alert-close" + comBigAlertZindex_msg).click(function(){
			funcClose();
			closeComBigAlert($(this).attr("data-zindex"));
		});
	}else{
		$("#j-big-alert-close" + comBigAlertZindex_msg).click(function(){
			closeComBigAlert($(this).attr("data-zindex"));
		});
	}
	comBigAlertZindex_msg--;
}

/* 
 * ���ñ������ֲ�
 */
function showComBigAlertShade(){
	if($("#bigAlertLayoutBg").length > 0){$("#bigAlertLayoutBg").show();return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");e.id="bigAlertLayoutBg";e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:99999;";
	document.body.appendChild(e);
}

/* 
 * �رձ������ֲ�
 */
function closeComBigAlertShade(){
	if($("#bigAlertLayoutBg").length > 0){$("#bigAlertLayoutBg").remove()}
}

/*
 * ���ñ������ֲ�
 */
function resizeComBigAlertShade(){
	if($("#bigAlertLayoutBg").length > 0){
		$("#bigAlertLayoutBg").css("height", $(document).height());
		$("#bigAlertLayoutBg").css("width", $(document).width());
	}
}

/*
 * �رյ�����
 */
function closeComBigAlert(zindex){
	if(zindex != "undefined"){
		$("#j-big-alert-popup" + zindex).remove();
		if($(".big-alert-popup").length > 0){
			//��alertmsg���������Ҫ�ر����ֲ�
			return;
		}else{
			comBigAlertZindex_msg = 999999;
		}
	}
	closeComBigAlertShade();
}