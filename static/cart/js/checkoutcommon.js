/* 工具方法 begin */
var BASEVAR = {
	frontPath : "",
	mid : 0
}
try{
	BASE;	//若BASE变量未定义
	BASEVAR.frontPath = BASE.frontPath;
	BASEVAR.mid = BASE.mid;
}catch(e){}
var frontPath = frontPath || BASEVAR.frontPath;	//项目名
var mid = mid || BASEVAR.mid;					//分站id
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

/**
 * @param a 文本内容
 * @param b 截取字符长度
 * @param c 后缀,默然""
 */
function cutString(a,b,c){
	a = htmlTextFormat(a);
	if(!a) return "";
	if(b <= 0) return "";
	if(!c) c = "";
	var txtLen = characterLength(a);
	if(txtLen <= b) return a;
	var suffixLen = characterLength(c);
	var templen=0;
	for(var i=0;i<a.length;i++){
		if(a.charCodeAt(i)>255){
			templen+=2;
		}else{
			templen++
		}
		if(templen + suffixLen == b){
			return a.substring(0,i+1)+c;
		}else if(templen + suffixLen>b){
			return a.substring(0,i)+c;
		}
	}
	return a;
}

/* 
 * 格式化标题
 */
function htmlTextFormat(text) {
	var temp = replaceAll(text, "\r\n", "");
	temp = replaceAll(temp, "<br>", "");
	temp = replaceAll(temp, "<p>", "");
	temp = replaceAll(temp, "</p>", "");
	temp = replaceAll(temp, "&ldquo;", "“");
	temp = replaceAll(temp, "&rdquo;", "”");
	temp = replaceAll(temp, "&amp;", "&");
    return temp;
}

function replaceAll(src, oldText, newText) {
	return src.replace(new RegExp(oldText,"gm"), newText);
}

function characterLength(s) {
	var templen = 0;
	for(var i=0;i<s.length;i++){
		if(s.charCodeAt(i)>255){
			templen+=2;
		}else{
			templen++
		}
	}
	return templen;
}
/* 
 * 获取地址栏参数
 */
function getQueryStringRegExp(name){    
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");     
	if(reg.test(location.href)){ 
		var result =  unescape(RegExp.$2.replace(/\+/g, " "));
		return result == "" ? "FALSE" : result;
	}else{
		return "FALSE";
	}
}

/* 
 * 参数1正则式，参数2字串
 */
function patch(re,s){
	re = eval("/"+re+"/g");
	return re.test(s);//s.match(re);
}

/* 
 * 去掉字符串s前后逗号返回字符串
 */
function trimComma(s){
	if(s == null || s == ""){return ""}
	if(patch("^,",s)){//匹配首字符逗号 
		s = s.substring(1,s.length);
	}
	if(patch(",$",s)){//匹配末端逗号
		s = s.substring(0,s.length-1);
	}
	return s;
}

/* 
 * 获取当前事件元素
 */
function getEvent(){
	if(document.all){
		return window.event;//如果是ie
	}
	func = getEvent.caller;
	while(func != null){
		var arg0=func.arguments[0];
		if(arg0){
			if((arg0.constructor == Event||arg0.constructor == MouseEvent)
				|| (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)){
				return arg0;
			}
		}
		func = func.caller;
	}
	return null;
}
/* 工具方法 end */

/*头部登陆条 bengin*/
//带着当前地址跳转登陆页面
function login(aobj){
	//aobj.href = frontPath + "/Member/LoginForm.do?mid="+ mid +"&returnUrl=" + encodeURIComponent(window.location.href);
	var getPassportUrl = frontPath + "/loginUrl.do?tt=" + Math.random();
	$.getJSON(getPassportUrl, function(data, status) {
		var passportUrl = data.passportLoginUrl;
		var uri = passportUrl + "?mid="+ mid +"&returnUrl=" + encodeURIComponent(window.location.href);
		window.location.href=uri;
	});
}
function gotoMyAccount(id){
	var uri = jQuery("#" + id).attr("data-uri");
	var url = frontPath+"/Member/index.jsp?mid=" + mid + "&url=" + encodeURIComponent(uri) + "&t=" +Math.random();
	jQuery("#" + id).attr({href:url,target:"_blank"});
}
	

//初始化我的账户信息
function initMyAccountInfo(){
	jQuery("#myaccount").hover(function(){
			var isFirstDo = jQuery(this).attr("data-first");
			if(isFirstDo == "y"){
				var apiUrl = frontPath + "/green2012/finclude/includetopmyaccount.do?t=" + Math.random() + "&callback=" + "?";
				$.get(apiUrl, function(data){
					jQuery("#myaccount_cont").removeClass("loadding").html(data);
				});
				jQuery(this).attr("data-first","n");
			}
			jQuery(this).addClass("myaccount_curr");
			jQuery("#myaccount_cont").show();
		},function(){
			jQuery(this).removeClass("myaccount_curr");
			jQuery("#myaccount_cont").hide();
	});
}

//设置”我的账户“消息提醒
function setAccountMessage() {
	var count = 0;
	var msgcount = 0;
	var nopayordercount = 0;
	$.ajax({
		type:"POST",
		url:'/Member/getInstationMsgCount.do',
		async:false,
		success:function(data){
			msgcount = data;
			nopayordercount = getNoPayOrder();
		}          
	}); 
	var intmsgcount = 0;
	var intnopayordercount = 0;
	if (!isNaN(parseInt(msgcount))) {
		intmsgcount = parseInt(msgcount);
	}
	if (!isNaN(parseInt(nopayordercount))) {
		intnopayordercount = parseInt(nopayordercount);
	}
	count = intmsgcount + intnopayordercount;
	if(count == 0){
		$('#myaccount').removeClass('has-msg')
		$('#topaccountpng').removeClass("accountpng");
		$('#topaccountpng').html('');
	}else{
		$('#myaccount').addClass('has-msg')
		$('#topaccountpng').show();
		$('#topaccountpng').addClass("accountpng");
		$('#topaccountpng').html(count);
	}
}

//获得”待付款订单“消息条数
function getNoPayOrder(){
  var nopayordercount = 0;
	$.ajax({
		type:"POST",
		url:'/Member/AjaxMaiRemind.do' + '?t=' + Math.random(),
		async:false,
		success:function(data){
	    	var sdata =  eval('(' + data + ')');
			nopayordercount = sdata.nopayordercount;
		}         
	});
	return nopayordercount;
}

//加入收藏
function addFavorite(title, url){try{window.external.addfavorite(url, title);}catch(e){try{window.sidebar.addPanel(title, url, "");}catch(e){comAlert("抱歉，您的浏览器不支持此操作！请您使用菜单栏或Ctrl+D收藏本站。");}}}
/* 头部登陆条 end */
//页面dom完成加载后执行
jQuery(function(){
	initMyAccountInfo();
});


/**
 * 身份证验证模块开始
 */
/**
 * 此验证方法参照http://blog.163.com/oscarhui@126/blog/static/11962065720098244153900/
 * @param identityId
 * @returns {Boolean}
 */
function isChineseIdentityID(identityId){
	identityId = identityId.toString()
	//1.验证最后一位验证码
	if (identityId.length == 18){
		var a,b,c
		if (!isInteger(identityId.substr(0,17))) {
			return false;
		}
		a = str2int(identityId.substr(0,1))*7 + str2int(identityId.substr(1,1))*9 + str2int(identityId.substr(2,1))*10;
		a = a + str2int(identityId.substr(3,1))*5 + str2int(identityId.substr(4,1))*8 + str2int(identityId.substr(5,1))*4;
		a = a + str2int(identityId.substr(6,1))*2 + str2int(identityId.substr(7,1))*1 + str2int(identityId.substr(8,1))*6;
		a = a + str2int(identityId.substr(9,1))*3 + str2int(identityId.substr(10,1))*7 + str2int(identityId.substr(11,1))*9;
		a = a + str2int(identityId.substr(12,1))*10 + str2int(identityId.substr(13,1))*5 + str2int(identityId.substr(14,1))*8;
		a = a + str2int(identityId.substr(15,1))*4 + str2int(identityId.substr(16,1))*2;
		b = a%11;
		if (b==2){ //最后一位为校验位
			c = identityId.substr(17,1).toUpperCase(); //转为大写X
		}else{
			c = str2int(identityId.substr(17,1));
		}
		
		switch(b){
			case 0: if (c != 1) {return false;}break;
			case 1: if (c != 0) {return false;}break;
			case 2: if (c != "X") {return false;}break;
			case 3: if (c != 9) {return false;}break;
			case 4: if (c != 8) {return false;}break;
			case 5: if (c != 7) {return false;}break;
			case 6: if (c != 6) {return false;}break;
			case 7: if (c != 5) {return false;}break;
			case 8: if (c != 4) {return false;}break;
			case 9: if (c != 3) {return false;}break;
			case 10: if (c != 2){return false;}break;
		}
	}else{ //15位身份证号
		if (!isInteger(identityId)) {
			return false;
		}
	}
	
	//2.验证出生年月日
	switch(identityId.length){
		case 15:
			if (isValidDate("19"+identityId.substr(6,2),identityId.substr(8,2),identityId.substr(10,2))) {
				return true;
			}else {
				return false;
			}
		case 18:
			if (isValidDate(identityId.substr(6,4),identityId.substr(10,2),identityId.substr(12,2))) {
				return true;
			}else {
				return false;
			}
	}
	return false;

}

function str2int(str){
	//注意：此程序中不能直接使用parseInt()转换，因为08，09会被当作八进制数来转换<以0开始>
	return parseInt(parseFloat(str));
}

//验证年月日
function isValidDate(iY, iM, iD) {//此法巧妙
	var date = new Date(str2int(iY),str2int(iM) - 1,str2int(iD));//注意：Date(year,month,date)的参数取值范围：year:4位整数，month:0~11，date:1~31.
	var y = date.getFullYear();
	var m = date.getMonth() + 1;//注意：getMonth()的结果范围：0～11
	var d = date.getDate();
	if (y != iY || m != iM || d != iD){
		return false;
	}
	return true;
}

//验证是否是数字
function isInteger(str) {
	if (!/^\d+$/.test(str)){
		return false;
	}
	return true;
}
