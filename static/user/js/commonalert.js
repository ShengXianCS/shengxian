/**
 * 通用提示层
 * param msg 提示内容信息
 * param params 包含标题title、确定按钮confirm、取消cancel、关闭close的对象(close不传默认显示关闭按钮，只有传false时不显示关闭按钮)
 * funcConfirm 确定按钮事件
 * funcCancel 取消按钮事件
 * funcClose 关闭按钮事件
 */

//实例1
/*$(function(){
    comAlert("评价成功");
  });*/
//实例2
/*$(function(){
	comAlert("每日鲜商品与生鲜预售商品不能在同一购物车下单，请选择需要保留的商品。",
			 {"confirm":"保留每日鲜","cancel":"保留生鲜预售","close":"false"},
		     function ok(){alert("OK");},
             function cancel(){alert("cancel");},function close(){alert("close");}
            )
});*/

var BASEVAR = {
	webIndex : "",
	staticPrefix : ""
}
try{
	BASE;	//若BASE变量未定义
	BASEVAR.webIndex = BASE.webIndex;
 	BASEVAR.staticPrefix = BASE.staticPrefix;
}catch(e){
 	BASEVAR.webIndex = "commonalert";
 	BASEVAR.staticPrefix = "http://static.womai.com";
}
var webIndex = webIndex || BASEVAR.webIndex;			//页面风格目录
var staticPrefix = staticPrefix || BASEVAR.staticPrefix;//静态资源域名
var loadCss = false;									//是否已动态加载过commonalert.css样式表
var comAlertZindex_msg = 999999;									//comAlert层次参数
function comAlert(msg,params,funcConfirm,funcCancel,funcClose){//params eg = {"title":"提示","confirm":"确定","cancel":"取消","close":"false"}
	if(msg == "undefined") return;
	showComAlertShade();	//弹出遮罩层
	params = params || {};
	var confirm = params.confirm, cancel = params.cancel,close = params.close, title = params.title;
	if(!title)title = "提示";
	if(!confirm)confirm = "确定";
	var cont = [];
	cont.push('<div class="alert-popup" id="j-alert-popup' + comAlertZindex_msg + '">');
	//关闭按钮未传值默认为显示，传false不显示关闭
	if(close != 'false'){
		cont.push('<i id="j-alert-close' + comAlertZindex_msg + '" data-zindex="' + comAlertZindex_msg + '">×</i>');
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
	//根据提示内容信息宽度调整居中显示
	//获取浏览器可见区域的宽和高
	var w_doc = $(document).width();
	//获取弹窗的宽度
	var w_popup = $('.alert-popup').width();
	var left_w = (w_doc-w_popup)/2;
	$('.alert-popup').css("left",left_w);
	//给按钮增加事件
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
 * 设置背景遮罩层
 */
function showComAlertShade(){
	if($("#alertLayoutBg").length > 0){$("#alertLayoutBg").show();return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");e.id="alertLayoutBg";e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:1000;";
	document.body.appendChild(e);
}

/* 
 * 关闭背景遮罩层
 */
function closeComAlertShade(){
	if($("#alertLayoutBg").length > 0){$("#alertLayoutBg").remove()}
}

/*
 * 重置背景遮罩层
 */
function resizeComAlertShade(){
	if($("#alertLayoutBg").length > 0){
		$("#alertLayoutBg").css("height", $(document).height());
		$("#alertLayoutBg").css("width", $(document).width());
	}
}

/*
 * 关闭弹出层
 */
function closeComAlert(zindex){
	if(zindex != "undefined"){
		$("#j-alert-popup" + zindex).remove();
		if($(".alert-popup").length > 0){
			//若alertmsg层存在则不需要关闭遮罩层
			return;
		}else{
			comAlertZindex_msg = 999999;
		}
	}
	closeComAlertShade();
}