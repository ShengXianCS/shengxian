var REGISTERANDLOGIN = {
	email_reg : /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT|info|INFO|biz|BIZ|name|NAME|pro|PRO|coop|COOP|aero|AERO|museum|MUSEUM)$/
}

//通用方法begin
try{
	crossDomain;
}catch(e){
	crossDomain = "";
}
//刷新验证码
function codeRefresh(id) {
	jQuery("#" + id).attr("src", crossDomain + frontPath + "/validation/validationCode.do?dumy=" + Math.random());
}
//刷新父页面的验证码
function parentcodeRefresh(id) {
	jQuery("#" + id,parent.document).attr("src", crossDomain + frontPath + "/validation/validationCode.do?dumy=" + Math.random());
	getTempCode(id);
}
function getTempCode(id){
	jQuery.post(crossDomain + frontPath + "/validation/validationCode.do?dumy=" + Math.random(),function(data){
		jQuery("#" + id).val(data);
	});
}
$(function(){
	//登录注册弹出框，tab切换且弹出层居中
	$(".popup_login").first().css("display","block");
	$(".mci_nav li").click(function(){
		$(this).addClass("cur").siblings("li").removeClass("cur");
		$(".popup_login").eq($(this).index()).show().siblings(".popup_login").hide();
	});
	$(".popup_login .mcibtn_aright").click(function(){
		$(".mci_nav ul").find("li").eq(0).removeClass("cur").siblings("li").addClass("cur");
		$(this).parents(".popup_login").hide().siblings(".popup_login").show();
	});
})
//加载完后如果有值就隐藏掉提示信息
function onloadShow(id){ 
	if($("#" + id).val() == undefined)return;
	if($("#" + id).val().length <= 0){
		$("#" + id + "Label").css("display","inline");
	}else{
		$("#" + id + "Label").css("display","none");
	}
}
/*邮箱正则验证*/
function isEmail(email){
	if (email.length>50){
		return false;
	}
	var re = REGISTERANDLOGIN.email_reg;
	if (email.search(re)!=-1) {
		return true;
	}
	return false;
}
//去字符串
function trim(s){
 var re = /^\s*(\S*)\s*$/;
 return s.replace(re,"$1");
}
//拼接表单参数
function getFormParams(form){
	var formElements = form.elements;
	var paramsArr = new Array();
	var param = "";
	for (var i = 0; i < formElements.length; i++) {
		param = formElements[i].name;
		if(trim(param).length > 0){
			param += "=";
			param += encodeURIComponent(encodeURIComponent(formElements[i].value));
			paramsArr.push(param);
		}
	}
	return paramsArr.join("&");
}
//拼接表单参数
function getFormParamsJSON(form){
	var formElements = form.elements;
	var param = {};
	for (var i = 0; i < formElements.length; i++) {
		if(trim(formElements[i].name).length > 0){
			param[formElements[i].name] = formElements[i].value;
		}
	}
	return param;
}
//读cookie
function readCookie(name){
	var cookieValue = "";
	var search = name + "=";
	if(document.cookie.length > 0){
		offset = document.cookie.indexOf(search);
		if (offset != -1){
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}
//写cookie
function writeCookie(name, value, hours){
	var expire = "";
	if(hours != null){
		expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = "; expires=" + expire.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expire;
}
//联合登陆
function otherlogin(frontPath, logintype,serverPath) {
	var returnUrl =  jQuery("#returnUrl").val();
	window.location.href = serverPath + "Member/OtherUserLogin.do?type=" + logintype + "&returnUrl=" + returnUrl;
}
//弹出层联合登陆
function otherloginPopup(frontPath, logintype, serverPath) {
	var returnUrl =  jQuery("#returnUrl").val()
	parent.location.href = serverPath + "Member/OtherUserLogin.do?type=" + logintype + "&returnUrl=" + returnUrl;
}
function loginResult(msg){
  var form=document.getElementById("cartLoginForm");
  var aData = msg.split(",");
  switch(aData[0]){
    case "0":
      var url=aData[1].replace(/&amp;/g, "&");
      window.location=url;
      break;
    case "1":
      alertMsg("您输入的帐号不存在，请重新输入！");
      form.loginId.focus();
      form.password.value="";
      form.validateCode.value="";
      codeRefresh();
      break;
    case "2":
	 alertMsg("您的帐号或密码输入错误，请重新输入！");
	 form.password.focus();
	 form.password.value="";
	 form.validateCode.value="";
	 codeRefresh();
     break;
    case "3":
	  alertMsg("验证码输入错误，请重新输入！");
      form.password.focus();
      form.password.value="";
      form.validateCode.value="";
      codeRefresh();
      break;
    case "8":
	  alertMsg("帐号被冻结，请30分钟后再尝试登录");
      form.reset();
      codeRefresh();
      break;
    case "9":
	  alertMsg("后台管理员禁止登录");
      form.password.value="";
      form.validateCode.value="";
      codeRefresh();
      break;
    case "10":
	  alertMsg(aData[2]);
	  form.loginId.focus();
	  form.password.value="";
	  form.validateCode.value="";
	  codeRefresh();
	  break;
    case "11":
   	  var url=aData[1];
      window.location=url;
      break;
    case "13":
   	  var url=aData[1];
      window.location=url;
      break;
  }
  return "";
}

/**登陆注册弹出层*********公用********-------------------------------------*/
//关闭登陆注册弹出层
function closePopup(id){
	var curObj = $(".check_button,.sjcheck_button",window.parent.document);
	if(curObj.attr("data-first") == "n"){
		curObj.removeAttr("style").removeAttr("title");
		curObj.attr("data-first","y");
	}
	curObj = $(".check_fullamount,.check_prepay",window.parent.document);
	if(curObj.attr("data-first") == "n"){
		curObj.removeAttr("style").removeAttr("title");
		curObj.attr("data-first","y");
	}
//	$("#" + id,parent.document).hide();
//	$("#layoutBg",parent.document).hide();
	$("#" + id,parent.document).css("display","none");
	$("#layoutBg",parent.document).css("display","none");
}

//获取登录信息，刷新头部
function getCrossDomainTopLoginInfo(callbackFunc){
	var params_L = new Object();
	params_L["random_L"] = Math.random();
	params_L["mid"] = mid;
	var apiUrl = crossDomain + frontPath + "/" + webIndex + "/finclude/includetoplogin.do?" + $.param(params_L) + "&callback=" + "?";
	
	jQuery.get(apiUrl,function(data){
		if(data){
			jQuery("#top_login_span",parent.document).html(data);
			callbackFunc();
		}
	});
}

//调用父类的收藏方法
function collectPopup(){
	var link = frontPath + "/" + webIndex + "/Favourite/AddFavLayer.do?mid=" + mid;
	jQuery.getScript(link,function(data){
		jQuery("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}
//var AddFavourite;
//20101101收藏改版回调
var intervalId = -1;
function collectPopupFavor(){
	//获取父页面的商品ID
	var pid=null;
	 if(parent.currPid){
		pid=parent.currPid;
	}else{
		alert(404);
		return;
	}
	var link = frontPath + "/" + webIndex + "/Favourite/AddFavLayer_new.do?mid=" + mid+ "&pid=" + pid;
	jQuery.getScript(link,function(data,textStatus){
		if(AddFavourite && AddFavourite.iscolse){
			parent.colseAddFavourite(3);
		}
		jQuery("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
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
	jQuery("#remarkNickName",parent.document).html(nickName);	//显示用户名
	jQuery("#remarkUserName",parent.document).css("display","block");
	jQuery("#notUser",parent.document).hide();
	jQuery("#userName",parent.document).val(nickName);
	jQuery("#ValidateCodeId",parent.document).val("");			//重置验证码
	closePopup("tb_layer");										//关闭弹出层
}

var datahtml;
//到货通知登陆成功后重新请求
function arrivalAgain(){
	var link = frontPath + "/" + webIndex + "/notice/addnotice.do?mid=" + mid;
	jQuery.getScript(link,function(data){
		if(datahtml && datahtml.addNotice){
			jQuery("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.addNotice).css("display","block");
			datahtml = null;
		}else if(datahtml && datahtml.otherLogin){
			jQuery("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.otherLogin).css("display","block");
			datahtml = null;
		}
	});
}
//降价通知登陆成功后重新请求
function priceAgain(){
	var buyPrice = $("#buyPrice",parent.document).html();
	var downPrice = buyPrice.substring(1,buyPrice.length);
	var link = frontPath + "/" + webIndex + "/notice/addprice.do?mid=" + mid + "&price=" + downPrice;
	jQuery.getScript(link,function(data){
		if(datahtml && datahtml.addPrice){
			jQuery("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.addPrice).css("display","block");
			datahtml = null;
		}else if(datahtml && datahtml.otherLogin){
			jQuery("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.otherLogin).css("display","block");
			datahtml = null;
		}
	});
}

/*获得用户级别*/
function getUserLevel(){
	var level = '0',vizuryCookie = jQuery.cookie("vizurylevel");
	if(vizuryCookie != null && vizuryCookie != ""){
		var values = jQuery.trim(vizuryCookie).split('|');
		level = values[0];
	}
	return level;
}


/*
 * 监测码各商家代码 begin
 */

//emarbox 亿码监测码
var _adwq = _adwq || [];
	_adwq.push(['_setAccount', '906ni']);
	_adwq.push(['_setDomainName', '.womai.com']);
	_adwq.push(['_trackPageview']);

function semTrackingCode(){
	(function() {var adw = document.createElement('script');
	adw.type = 'text/javascript';
	adw.async = true;
	adw.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://s') + '.emarbox.com/js/adw.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(adw, s);})();
}
function sendSemInfo(username){
	_adwq.push(['_setAction', 
		'1o58j5',
		username
	]);
}
//iclick 监测码
function XmoTag1849(){
	var random = Math.random() + "";
	var _random = random * 10000000000;
	var _opxTAG = document.createElement("script");
	_opxTAG.src = "//e03.optimix.asia/trackingdata?rnum="+random+"&opxvrsn=func&opxUid=0&opxEventID=1849&opxClientID=330&opxcounter=1";
	document.getElementsByTagName('head')[0].appendChild(_opxTAG);
}
//pingzhong 品众监测码 20140310
function pingzhong(){
	_pzt.events.push({type:'target',category:'category',action:'reg',opt_label:'reg_variable',value:1});	
	PzoomTracker.trackPageView();
}

//zampdasmartpixel 晶赞注册监测码 20310704_zhaogangqiang
function zampdasmartpixelForRegister(loginId){
	var _zp_conversion_query = [];
	_zp_conversion_query.push(["a", 75]);
	_zp_conversion_query.push(["c", "9772f47fd6d3474ed7a7961660661b77"]);
	_zp_conversion_query.push(["type", 5]);
	_zp_conversion_query.push(["info", loginId]);
	(function(){
		var zp = document.createElement('script');zp.type = 'text/javascript';zp.async = true;
		zp.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.zampda.net/conv.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(zp, s);
	})();
}
//zampdasmartpixel 晶赞登录监测码 
function zampdasmartpixelForLogin(){
	var _zpq = _zpq || [];
	_zpq.push(['_setPageID','34']);
	_zpq.push(['_setPageType', 'loginSuccessPage']);
	_zpq.push(['_setParams','']);
	_zpq.push(['_setAccount','75']);
	(function() {
	    var zp = document.createElement('script'); zp.type = 'text/javascript'; zp.async = true;
	    zp.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.zampda.net/s.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(zp, s);
	 })();
}

/**注册监测码统一管理*------------------beging-------*/
function initialRegisterCode(loginId){
	try{ga_event(PageGroup,'register','registerSuccess');}catch(e){}
	try{pingzhong();}catch(e){}
	try{
		if(loginId.length > 0){
			zampdasmartpixelForRegister(loginId);
		}
	}catch(e){}
	try{XmoTag1849();}catch(e){}
	try{
		semTrackingCode();
		if(loginId.length > 0){
			var tprm = "username=" + loginId;
			try{__ozfac2(tprm,"#mregsuc");}catch(e){}
		}
		setTimeout(function(){sendSemInfo(loginId)}, 80);
	}catch(e){}
}
/**注册监测码统一管理*------------------end-------*/

/**登录监测码统一管理*------------------beging-------*/
function initialLoginCode(loginId){
	try{zampdasmartpixelForLogin();}catch(e){}
}
/**登录监测码统一管理*------------------end-------*/