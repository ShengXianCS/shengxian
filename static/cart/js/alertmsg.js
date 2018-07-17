/**
 * 通用提示层
 * param msg 提示内容信息
 * param params 包含标题title、确定按钮confirm、取消cancel的对象
 * funcConfirm 确定按钮事件
 * funcCancel 取消按钮事件
 */
 
var BASEVAR = {
	webIndex : "",
	staticPrefix : ""
}
try{
	BASE;	//若BASE变量未定义
	BASEVAR.webIndex = BASE.webIndex;
 	BASEVAR.staticPrefix = BASE.staticPrefix;
}catch(e){
 	BASEVAR.webIndex = "green2012";
 	BASEVAR.staticPrefix = "http://static.womai.com";
}
var webIndex = webIndex || BASEVAR.webIndex;			//页面风格目录
var staticPrefix = staticPrefix || BASEVAR.staticPrefix;//静态资源域名
var loadCss = false;									//是否已动态加载过alertmsg.css样式表
var zindex_msg = 10000;									//alertMsg层次参数
function alertMsg(msg,params,funcConfirm,funcCancel,funcClose){//params eg = {"title":"提示","confirm":"确定","cancel":"取消"}
	if(!loadCss){
		loadCss = true;
		var filename = staticPrefix + "/zhongliang/templets/" + webIndex + "/style/alertmsg.css";
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	if(msg == "undefined") return;
	showShade();	//弹出遮罩层
	params = params || {};
	var confirm = params.confirm, cancel = params.cancel,title = params.title;
	if(!title)title = "提示";
	if(!confirm)confirm = "确定";
	var cont = [];
	cont.push('<dl id="alertmsg' + zindex_msg + '" class="alertmsg">');
	cont.push('<dt class="alertmsg_t"><span>' + title + '</span><s id="alertmsg_close' + zindex_msg + '" data-zindex="' + zindex_msg + '"></s></dt>');
	cont.push('<dd class="alertmsg_c">');
	cont.push('<div class="alertmsg_c_info"><span id="alertmsg_c_info' + zindex_msg + '">' + msg + '</span></div>');
	cont.push('<div class="alertmsg_c_btn">');
	if(confirm){
		cont.push('<span id="aconfirm' + zindex_msg + '" data-zindex="' + zindex_msg + '" class="aconfirm"><b>' + confirm + '</b></span>&nbsp&nbsp');
	}
	if(cancel){
		cont.push('&nbsp&nbsp<span id="acancle' + zindex_msg + '" data-zindex="' + zindex_msg + '" class="acancle"><b>' + cancel + '</b></span>');
	}
	cont.push('</div></dd></dl>');
	$("body").append(cont.join(""));
	$("#alertmsg" + zindex_msg).css("z-index",zindex_msg);
	//根据提示内容信息宽度调整居中显示
	$("#alertmsg_c_info" + zindex_msg).parent().width(360)
	$("#alertmsg_c_info" + zindex_msg).css({"font-size":"16px","font-family":"Microsoft YaHei"});
	var w = $("#alertmsg_c_info" + zindex_msg).width();
	if(w < 360){
		$("#alertmsg_c_info" + zindex_msg).parent().width(w + 5);
	}
	//给按钮增加事件
	if(typeof(funcConfirm) == "function" && funcConfirm.constructor == Function){
		$("#aconfirm" + zindex_msg).click(function(){
			closeAlertMsg($(this).attr("data-zindex"));
			funcConfirm();
		});
	}else{
		$("#aconfirm" + zindex_msg).click(function(){
			closeAlertMsg($(this).attr("data-zindex"));
		});
	}
	if(typeof(funcCancel) == "function" && funcCancel.constructor == Function){
		$("#acancle" + zindex_msg).click(function(){
			closeAlertMsg($(this).attr("data-zindex"));
			funcCancel();
		});
	}else{
		$("#acancle" + zindex_msg).click(function(){
			closeAlertMsg($(this).attr("data-zindex"));
		});
	}
	if(typeof(funcClose) == "function" && funcClose.constructor == Function){
		$("#alertmsg_close" + zindex_msg).click(function(){
			closeAlertMsg($(this).attr("data-zindex"));
			funcClose();
		});
	}else{
		$("#alertmsg_close" + zindex_msg).click(function(){
			closeAlertMsg($(this).attr("data-zindex"));
		});
	}
	zindex_msg--;
}

/* 
 * 设置背景遮罩层
 */
function showShade(){
	if(jQuery("#layoutBg").length > 0){return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");e.id="layoutBg";e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:1000;";
	document.body.appendChild(e);
}

/* 
 * 关闭背景遮罩层
 */
function closeShade(){
	if($("#layoutBg").length > 0){$("#layoutBg").remove()}
}

/*
 * 重置背景遮罩层
 */
function resizeShade(){
	if($("#layoutBg").length > 0){
		$("#layoutBg").css("height", $(document).height());
		$("#layoutBg").css("width", $(document).width());
	}
}

/*
 * 关闭弹出层
 */
function closeAlertMsg(zindex){
	if(zindex != "undefined"){
		$("#alertmsg" + zindex).remove();
		if($(".alertmsg").length > 0){
			//若alertmsg层存在则不需要关闭遮罩层
			return;
		}else{
			zindex_msg = 10000;
		}
	}
	closeShade();
}