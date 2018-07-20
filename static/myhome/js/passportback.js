/**
 * https登录注册回调通用类
 * @param data
 */
//挑食登录回调
function callbackChooseFoodEvt(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		//成功后调用不同的事件
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(parent.chooseFood);
	}
}
//我买酒挑食登录回调
function callbackWineChooseFoodEvt(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		//成功后调用不同的事件
		parent.hasUser = true;
		parent.chooseFood();
	}
}
//评论登陆注册回调（无特殊处理，公用一个）
function callbackRemark(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//调用刷新头部，传入刷新评论方法
		getCrossDomainTopLoginInfo(updateRemarkView);
	}
}

//评论部分登陆刷新局部地区
function updateRemarkView(){
	var userinfo = $.cookie("userinfo");	//获取cookie 解决乱码问题by xg readCookie("userinfo")
	var nickName = "";
	if(userinfo != null && userinfo.indexOf("|") != -1){
		var userinfoArray = userinfo.split("|");
		nickName = userinfoArray[0];			//获取用户名
	}
	parentcodeRefresh('vCode');						//刷新验证码
	
	//渲染评论登陆信息
	$("#remarkNickName",parent.document).html(nickName);	//显示用户名
	$("#remarkUserName",parent.document).css("display","block");
	$("#notUser",parent.document).hide();
	$("#userName",parent.document).val(nickName);
	$("#ValidateCodeId",parent.document).val("");			//重置验证码
	closePopup("tb_layer");										//关闭弹出层
}
//刷新父页面的验证码
function parentcodeRefresh(id) {
	$("#" + id,parent.document).attr("src",  frontPath + "/ValidateCode?dumy=" + Math.random());
	getTempCode(id);
}
function getTempCode(id){
	$.post(frontPath + "/ValidateCode?isLogin=1&dumy="+new Date().getTime(),function(data){
		$("#" + id).val(data);
	});
}
//到货通知登陆注册回调（无特殊处理，公用一个）
function callbackArrivalNotice(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//调用刷新头部，传入刷新评论方法
		getCrossDomainTopLoginInfo(arrivalAgain);
	}
}
//降价通知登陆注册回调（无特殊处理，公用一个）
function callbackPriceNotice(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//调用刷新头部，传入刷新评论方法
		getCrossDomainTopLoginInfo(priceAgain);
	}
}

var datahtml;
//到货通知登陆成功后重新请求
function arrivalAgain(){
	var link = frontPath + "/green2012/notice/addnotice.do?mid=" + mid;
	$.getScript(link,function(data){
		if(datahtml && datahtml.addNotice){
			$("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.addNotice).css("display","block");
			datahtml = null;
		}else if(datahtml && datahtml.otherLogin){
			$("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.otherLogin).css("display","block");
			datahtml = null;
		}
	});
}
//降价通知登陆成功后重新请求
function priceAgain(){
	var buyPrice = $("#buyPrice",parent.document).html();
	var downPrice = buyPrice.substring(1,buyPrice.length);
	var link = frontPath + "/green2012/notice/addprice.do?mid=" + mid + "&price=" + downPrice;
	$.getScript(link,function(data){
		if(datahtml && datahtml.addPrice){
			$("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.addPrice).css("display","block");
			datahtml = null;
		}else if(datahtml && datahtml.otherLogin){
			$("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.otherLogin).css("display","block");
			datahtml = null;
		}
	});
}

//购物车登录注册无需打开指定窗口，可公用一个回调函数
function callbackCart(data){
	if(!valiCallbackData(data)){
		return;
	}
	closePopup('tb_layer');
	if(data.msg==0){
		//成功后不同的渲染部分
		var url = data.url.replace(/&amp;/g, "&");
		setTimeout(function() {window.parent.window.location=url;}, 100);
	}
}
//20141101收藏改版
//收藏登陆回调
function createCollectLayerFavor(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//成功后调用不同的事件
		getCrossDomainTopLoginInfo(collectPopupFavor);
	}
}
//购物车全部收藏登陆回调
function createCollectLayerAllFavor(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		if(parent.hasUser){
			parent.hasUser = true;
		}
		//成功后调用不同的事件
		getCrossDomainTopLoginInfo(collectPopupAllFavor);
	}
}
//收藏注册回调
function callbackRegisterCommonPopu(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){//成功;
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(collectPopup);//打开收藏
	}
}
//购物车全部收藏注册回调
function callbackRegisterAllCommonPopu(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){//成功;
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(collectAllPopup);//打开收藏
	}
}
//我买酒收藏登陆回调
function createWineCollectLayerFavor(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//成功后调用不同的事件
		parent.loginResultRavor();
	}
}
//我买酒评论登陆回调
function createWineRemarkLayer(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//成功后调用不同的事件
		parent.loginResult();
	}
}
//调用父类的收藏方法
function collectPopup(){
	var link = frontPath + "/green2012/Favourite/AddFavLayer.do?mid=" + mid;
	$.getScript(link,function(data){
		$("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}
//购物车全部收藏--调用父类的收藏方法
function collectAllPopup(){
	var link = frontPath + "/green2012/Favourite/Add_cartAllFavLayer.do?mid=" + mid + "&currTab=" + currTab;
	$.getScript(link,function(data){
		$("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}
//var AddFavourite;
//20101101收藏改版回调
var intervalId = -1;
function collectPopupFavor(){
	//获取父页面的商品ID
	var pid=null;
	 if(parent.currPid){
		pid = parent.currPid;
	}else{
		comAlert("404");
		return;
	}
	var link = frontPath + "/green2012/Favourite/AddFavLayer_new.do?mid=" + mid+ "&pid=" + pid;
	$.getScript(link,function(data,textStatus){
		if(AddFavourite && AddFavourite.iscolse){
			parent.colseAddFavourite(3);
		}
		$("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}

function collectPopupAllFavor(){
	//获取父页面的商品ID
	var currTab=null;
	 if(parent.currTab){
		currTab = parent.currTab;
	}else{
		comAlert("404");
		return;
	}
	var link = frontPath + "/green2012/Favourite/Add_cartAllFavLayer.do?mid=" + mid + "&currTab=" + currTab;
	$.getScript(link,function(data,textStatus){
		if(AddFavourite && AddFavourite.iscolse){
			parent.colseAddFavourite(3);
		}
		$("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}

function valiCallbackData(data){
	if(!data || !data.msg || data.msg == ""){
		comAlert("网络繁忙，请您稍后重试~");
		return false;
	}
	return true;
}

//获取登录信息，刷新头部
function getCrossDomainTopLoginInfo(callbackFunc){
	var params_L = new Object();
	params_L["random_L"] = Math.random();
	params_L["mid"] = mid;
	var apiUrl =  frontPath + "/" + webIndex + "/finclude/includetoplogin.do?" + $.param(params_L) + "&callback=" + "?";
	
	$.get(apiUrl,function(data){
		if(data){
			var datas = data.split("==|||||==");
			$("#top_login_span",parent.document).html(datas[0]);
			$("#QQcaibeiLogin",parent.document).html(datas[1]);
			callbackFunc();
		}
	});
}
//关闭登陆注册弹出层
function closePopup(id){
	var curObj = $(".btn .topay",window.parent.document);
	if(curObj.attr("data-first") == "n"){
		curObj.removeAttr("style").removeAttr("title");
		curObj.attr("data-first","y");
	}
	curObj = $(".check_fullamount,.check_prepay",window.parent.document);
	if(curObj.attr("data-first") == "n"){
		curObj.removeAttr("style").removeAttr("title");
		curObj.attr("data-first","y");
	}
	$("#" + id,parent.document).css("display","none");
	$("#layoutBg",parent.document).remove();
}
//登陆后，回调指定的回调函数  张朝富  2015-03-23
function readyForCallback(callback,data){
	var func=eval(callback);
	new func(arguments[1]);
}
