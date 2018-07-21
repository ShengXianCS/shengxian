/**
 * 通用提示层(宽为700px版本)
 * param msg 提示内容信息
 * param params 包含标题title、确定按钮confirm、取消cancel、关闭close的对象(close不传默认显示关闭按钮，只有传false时不显示关闭按钮)
 * funcConfirm 确定按钮事件
 * funcCancel 取消按钮事件
 * funcClose 关闭按钮事件
 * funcIsConfirm  判定函数，判定确定按钮事件是否执行
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
var comBigAlertZindex_msg = 999999;									//comAlert层次参数
function comBigAlert(msg,params,funcConfirm,funcCancel,funcClose,funcIsConfirm){//params eg = {"title":"提示","confirm":"确定","cancel":"取消","close":"false"}
	if(msg == "undefined") return;
	showComBigAlertShade();	//弹出遮罩层
	params = params || {};
	var confirm = params.confirm, cancel = params.cancel,close = params.close, title = params.title;
	if(!title)title = "提示";
	if(!confirm)confirm = "确定";
	var cont = [];
	cont.push('<div class="big-alert-popup" id="j-big-alert-popup' + comBigAlertZindex_msg + '">');
	cont.push('<div class="big-alert-top png"></div>');
    cont.push('<div class="big-alert-content">');
    cont.push('<h3>' + title);
    //关闭按钮未传值默认为显示，传false不显示关闭
    if(close != 'false'){
    	cont.push('<span id="j-big-alert-close' + comBigAlertZindex_msg + '" data-zindex="' + comBigAlertZindex_msg + '">×</span>');
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
	//根据提示内容信息宽度调整居中显示
	//获取浏览器可见区域的宽和高
	var w_doc = $(document).width();
	//获取弹窗的宽度
	var w_popup = $('.big-alert-popup').width();
	var left_w = (w_doc-w_popup)/2;
	$('.big-alert-popup').css("left",left_w);
	//给按钮增加事件
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
 * 设置背景遮罩层
 */
function showComBigAlertShade(){
	if($("#bigAlertLayoutBg").length > 0){$("#bigAlertLayoutBg").show();return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");e.id="bigAlertLayoutBg";e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:99999;";
	document.body.appendChild(e);
}

/* 
 * 关闭背景遮罩层
 */
function closeComBigAlertShade(){
	if($("#bigAlertLayoutBg").length > 0){$("#bigAlertLayoutBg").remove()}
}

/*
 * 重置背景遮罩层
 */
function resizeComBigAlertShade(){
	if($("#bigAlertLayoutBg").length > 0){
		$("#bigAlertLayoutBg").css("height", $(document).height());
		$("#bigAlertLayoutBg").css("width", $(document).width());
	}
}

/*
 * 关闭弹出层
 */
function closeComBigAlert(zindex){
	if(zindex != "undefined"){
		$("#j-big-alert-popup" + zindex).remove();
		if($(".big-alert-popup").length > 0){
			//若alertmsg层存在则不需要关闭遮罩层
			return;
		}else{
			comBigAlertZindex_msg = 999999;
		}
	}
	closeComBigAlertShade();
}