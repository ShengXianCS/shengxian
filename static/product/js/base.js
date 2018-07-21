/*工具方法，其实可以提成common.js但是为了减少外部js引入数 begin*/
var undefined;
var hascityid = false; //异步请求是否已经返回城市id结果，一般用于价格接口，如果还未返回价格接口，需要重新获取
function getCityid(callback){
	if(typeof(callback) === "function"){
		if(!hascityid){
			$.post(frontPath+"/cityindex/getcityid.do",function(data){
				var result = eval('(' + data + ')');
				cityid = result.cityid;
				hascityid = true;
				callback();
			});
		}else{
			callback();
		}
	}else{
		$.post(frontPath+"/cityindex/getcityid.do",function(data){
			var result = eval('(' + data + ')');
			cityid = result.cityid;
			hascityid = true;
		});
	}
}
var screenwidth;
var isHomeSuspendCart = 0;
if(isNew != ""){
	screenwidth = screen.width;
}else{
	screenwidth = 1000;
}
//优先初始化宽窄频
function includetop(){
	if(screenwidth < 1210){
		$("body").addClass("thousand");
		$("body").addClass("festival-small");
	}else{
		$("body").removeClass("thousand");
		$("body").addClass("festival-big");
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
//格式化标题
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

//获取当前事件元素
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
//获得窗口可见高winHeight
function findDimensions(){
	var winHeight1=0,winHeight2=0,winHeight3=0,winHeight4=0;
	if(window.innerWidth){winHeight1=window.innerHeight;} 
	if(document.body){if(document.body.clientWidth){winHeight2=document.body.clientHeight;}if(document.body.scrollHeight){winHeight3=document.body.scrollHeight;}}
	if(document.documentElement&&document.documentElement.clientWidth){winHeight4=document.documentElement.clientHeight;}
	winHeight=Math.max(winHeight1,winHeight2,winHeight3,winHeight4);
	return winHeight;
};
//获取当前滚动高度
function getCurrScrollTop(){
	var currScrollTop =  document.body.scrollTop;
	if(currScrollTop == 0)
		currScrollTop = document.documentElement.scrollTop;
	return currScrollTop;
}
//获取指定id的元素top值
function getCurrElementTop(id){
	if($("#" + id).length <= 0){return 0;}
	return $("#" + id).offset().top - $(window).height();
}
//设置背景遮罩层
function showShade(){
	if($("#layoutBg").length > 0){$("#layoutBg").show();return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");e.id="layoutBg";e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;background-color:#000;z-index:1005;";
	document.body.appendChild(e);
};
//关闭背景遮罩层
function closeShade(){
	if($("#layoutBg").length > 0){$("#layoutBg").remove()}
}
//重置背景遮罩层
function resizeShade(){
	if($("#layoutBg").length > 0){
		$("#layoutBg").css("height", $(document).height());
		$("#layoutBg").css("width", $(document).width());
	}
}
//获取地址栏参数
function getQueryStringRegExp(name){    
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");     
	if(reg.test(location.href)){ 
		var result =  unescape(RegExp.$2.replace(/\+/g, " "));
		return result == "" ? "FALSE" : result;
	}else{
		return "FALSE";
	}
};
//获得指定元素指定属性,若一个参数就是取data-uri
function getAttrValueById(id,attr){
	var attrname;
	if(arguments.length == 1){attrname = "data-uri";}else{attrname = attr;}
	var tempValue = $("#" + id).attr(attrname);
	if(tempValue){return tempValue;}
	return null;
}
/*工具方法，其实可以提成common.js但是为了减少外部js引入数 end*/

//根据商品id mid usergroupid获取商品价格
var usergroupid = -1;

//获取用户组id
function getUserGroupId(){
	var result = "";
	if(usergroupid == -1){
		usergroupid = 100;
		var userinfo = $.cookie("userinfo");
		if(userinfo != null && userinfo.indexOf("|") != -1){
			var userinfoArray = userinfo.split("|");
			usergroupid = userinfoArray[3];
		}
	}
	result = usergroupid;
	return result;
}
function getPrice(id,mid,callback){
	var userGroupId = getUserGroupId();
	var url = priceServer + "/price.do?id=" + id +"&mid=" + mid +  "&cityid=" + cityid +  "&usergroupid=" + userGroupId + "&callback=?";
	$.getJSON(url,function(data){
		if(data == undefined) return;
		callback(data);
	});
}
/**
 * 批量加载商品价格
 * @param pidsArr
 */
function getPrices(pidsArr,mid,callback){
	//用户组，暂时保留
	var userGroupId = getUserGroupId();
	var params = {};
	params.ids = pidsArr.join(",");
	var prices = ["buyPrice","marketPrice","WMPrice","specialPrice"];
	params.prices = prices.join(",");
	params.defData = "n";//是否需要默认数据
	params.mid = mid;
	params.cityid = cityid;
	params.gbuy = 1;//团购价格标识
	params.usergroupid = userGroupId;
	var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=" + "?";
	$.getJSON(apiUrl, function(data, status) {
		if(data == undefined) return;
		callback(data);
	});
}
/**
 * 批量加载商品特价
 * @param pidsArr
 */
function getSpecialPrices(pidsArr,mid,callback){
	//用户组，暂时保留
	var userGroupId = getUserGroupId();
	var params = {};
	params.ids = pidsArr.join(",");
	var prices = ["buyPrice","specialPrice"];
	params.prices = prices.join(",");
	params.defData = "n";//是否需要默认数据
	params.mid = mid;
	params.cityid = cityid;
	params.gbuy = 1;//团购价格标识
	params.usergroupid = userGroupId;
	var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=" + "?";
	$.getJSON(apiUrl, function(data, status) {
		if(data == undefined) return;
		callback(data);
	});
}

//价格格式化
function getFormatPrice(price){
	price = parseFloat(price);
	if(price >= 1000){
		price = price.toFixed(0);
	}else if(price >= 100){
		price = price.toFixed(1);
	}else if(price > 0){
		price = price.toFixed(2);
	}else{
		price = "00.00";
	}
	return price;
}
//校验回调函数data有效性
function valiLoadProductsData(data){
	if(data == undefined || data.result == undefined
		|| Object.prototype.toString.apply(data.result) != "[object Array]"
		|| data.result.length == 0)
		return false;
	return true;
}
/*头部登陆条(包含实体购物券) bengin*/
//带着当前地址跳转登陆页面
function login(aobj){		
	var strlocation = location.toString();
	var returnLocation;
	var _index = strlocation.indexOf("?");
	var isHasMid = strlocation.indexOf("mid");
	var isHasId = strlocation.indexOf("id");	//关键参数
	var isHasCid = strlocation.indexOf("Cid");	//关键参数
	var isHasRuleId = strlocation.indexOf("ruleid");	//关键参数,x元y件使用
	var tempLocation = "";
	if(_index != -1){
		returnLocation = strlocation.substring(0,_index);
	}else{
		returnLocation = strlocation;
	}
	if(isHasMid != -1){
		returnLocation += "?mid=" + mid;
	}
	if(isHasId != -1){
		tempLocation = returnLocation.indexOf("?") == -1 ? "?" : "&";
		returnLocation += tempLocation + "id=" + getQueryStringRegExp("id");
	}
	if(isHasCid != -1){
		tempLocation = returnLocation.indexOf("?") == -1 ? "?" : "&";
		returnLocation += tempLocation + "Cid=" + getQueryStringRegExp("Cid");
	}
	if(isHasRuleId != -1){
		tempLocation = returnLocation.indexOf("?") == -1 ? "?" : "&";
		returnLocation += tempLocation + "ruleid=" + getQueryStringRegExp("ruleid");
	}
	/*var uri = crossDomain + frontPath + "/Member/LoginForm.do?mid="+ mid +"&returnUrl=" + encodeURIComponent(returnLocation);
	aobj.href=uri;*/
	var getPassportUrl = frontPath + "/loginUrl.do?tt=" + Math.random();
	$.getJSON(getPassportUrl, function(data, status) {
		var passportUrl = data.passportLoginUrl;
		var uri = passportUrl + "?mid="+ mid +"&returnUrl=" + encodeURIComponent(returnLocation);
		window.location.href=uri;
	});
}
//我的账户
function gotoMyAccount(id){
	var uri = getAttrValueById(id);
	var url = crossDomain + frontPath+"/Member/index.jsp?mid=" + mid + "&url=" + encodeURIComponent(uri) + "&t=" +Math.random();
	$("#" + id).attr({href:url,target:"_blank"});
}
//优惠劵激活
function gotoCouponActivation(id){
	var uri = getAttrValueById(id);
	var url = crossDomain + frontPath+"/Member/index.jsp?mid=" + mid + "&url=" + encodeURIComponent(uri) + "&t=" +Math.random();
	$("#" + id).attr({href:url});
}

/*实体购物券--begin*/
function gotoBackProductUrl(){
	var num = $("#gwqNum").val();
	if(num==null || num==""){
		comAlert("请输入你的购物券号！");
		return false;
	}else if(/[^\d]/.test(num)){
		comAlert("请输入正确的购物券号！");
		$("#gwqNum").val("");
		return false;
	}else{
		window.open(crossDomain + frontPath + "/PackBuyProduct.do?id="+num + "&mid=" + mid);
	}
}
function cls(id){
	var obj = $("#" + id)[0];
	var defvalue = obj.attributes["data-defvalue"].value;
	if(defvalue == obj.value){
		obj.value = "";
		obj.style.color = "#000";
	}
}
function res(id){
	var obj = $("#" + id)[0];
	if(obj.value == ""){
		obj.value = obj.attributes["data-defvalue"].value;
		obj.style.color = "#999";
	}
}
/*实体购物券--end*/
/*topsearch--begin*/
function checkTopSearchForm(){
	var tempObj = $("#topKeywords"),
		defaultURL = tempObj.attr("data-URL");
	if(defaultURL && tempObj.val() == tempObj.attr("data-defvalue")){
		location.href = defaultURL;
		return false;
	}else{
		var text = tempObj.val();
		var b = text.indexOf('“');
		if(b >= 0){
			var e = text.lastIndexOf('”');
			var keyword =text.slice(b+1, e);
		}else{
			var keyword = text;
		}
		if(keyword != ""){
			keyword += ",title,mer_title,mer_title_,brand,cloumnName,keyword,keywords,articleRuleTitle,activeName,ProductFeatures";
		}
		$("#thKeywords").val($.trim(keyword));
		$("#isKeyCommendClick").val('1');
	}
}
/*topsearch-end*/
//获取登录信息
function getTopLoginInfo(){
	var params_L = new Object();
	params_L["random_L"] = Math.random();
	params_L["mid"] = mid;
	var apiUrl = crossDomain + frontPath + "/cityindex/finclude/includetoplogin.do?" + $.param(params_L) + "&callback=" + "?";
	$.get(apiUrl,function(data){
		if(data){
			var datas = data.split("==|||||==");
			$("#top_login_span").html(datas[0]);
			$("#QQcaibeiLogin").html(datas[1]);
			$("#QQcaibeiLogin").show();
			if(datas[1] == null || datas[1] ==''){
				$("#QQcaibeiLogin").hide();
			}
		}
	});
}
//初始化购物券信息
var gwq_t = 0;
function initGouWuQuanInfo(){
	$("#gwq").hover(function(){
		$("#gwq_cont").show();
	},function(){
		gwq_t = setTimeout(function(){$("#gwq_cont").hide();},"100");
	});
	$("#gwq_cont").hover(function(){
			clearTimeout(gwq_t);
			$("#gwq_cont").show();
		},function(){
			$("#gwq_cont").hide();
			res("gwqNum");
			$("#gwqNum").blur(); 
	});
}
// add by lihongyao 20150414 消息提醒
function setTopIntationMessage(){
	$.post("/Member/getInstationMsgCount.do",function(data){
		var msgcount = data;
		if(msgcount == 0){
			$('#topmsgpng').removeClass("tmsgpng");
			$('#topmsgpng').html('');
		}else{
			$('#topmsgpng').show();
			$('#topmsgpng').addClass("tmsgpng");
			$('#topmsgpng').html(msgcount);
		}
	});
}
	
function setNoPayOrder(){
	$.post("/Member/AjaxMaiRemind.do"+"?t="+Math.random(),function(data){
		var sdata =  eval('(' + data + ')');
		var nopaycount = 0;
		if(sdata.nopayordercount.length > 0){
			nopaycount = sdata.nopayordercount[0];
		}
		if(nopaycount == 0){
			$('#topnopaypng').removeClass("nopaypng");
			$('#topnopaypng').html('');
		}else{
			$('#topnopaypng').show();
			$('#topnopaypng').addClass("nopaypng");
			$('#topnopaypng').html(nopaycount);
		}
	});
}

//初始化我的账户信息
function initMyAccountInfo(){
	getTopLoginInfo();
	$("#myaccount").hover(
		function(){
			var isFirstDo = $(this).attr("data-first");
			if(isFirstDo == "yes"){
				var apiUrl = crossDomain + frontPath + "/cityindex/finclude/includetopmyaccount.do?t=" + Math.random() + "&callback=" + "?";
				$.get(apiUrl, function(data){
					$("#myaccount_cont").removeClass("loadding").html(data);
				});
				$(this).attr("data-first","no");
			}
			
			$("#myaccount_cont").show();
		},function(){
			$("#myaccount_cont").hide();
		}
	);
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

function gotoCart(id){
	var $a = $("#" + id);
	$a.html("请稍候...").attr("href", $a.attr("href")+"&t=" + Math.random());
}
/*头部小购物车 begin*/
//回调函数矫正小购车商品数量
function callbackSetSmallCartAmount(data){
	if(data && data.totalAmount >= 0){
		
		//关键参数重置
		$("#smallcart_items_amount").attr("data-count",0);
		$("#smallcart_items_amount").val(data.cartitemsAmount + "");
		$("#suspendcart_items_amount").attr("data-count",0);
		$("#suspendcart_items_amount").val(data.cartitemsAmount + "");
		$("#smallcart").attr("data-first","yes");
		$("#suspendcart").attr("data-first","yes");
		var amount = data.totalAmount;
		if(amount > 99){
			amount = "99+";
		}
		$(".smallcart_totalamount").html(amount + "");
		$(".suspendcart_totalamount").html(amount + "");
		$("#totalItemCounts").html(amount + "");
		$("#totalMustPayPrice").html(data.totalMustPayPrice.toFixed(2) + "");
	}
}

//获取购物车商品总数量
function getCartTotalAmount(){
	var uri = crossDomain + frontPath + "/frontendjson/smallcartinfo.do?mid=" + mid + "&callback=?&t=" + Math.random();
	$.getJSON(uri, callbackSetSmallCartAmount);
}
//循环最多3次获取购物车商品总数量的请求。
function getCartTotalAmountForMax(){
	setTimeout(function(){
		var $items_amount_inp = $("#smallcart_items_amount");
		var count = $items_amount_inp.attr("data-count");	//循环计数器,最多循环三次获取购物车数量的请求
		if($items_amount_inp.val() == "init" && count < 3){
			getCartTotalAmount();
			getCartTotalAmountForMax();
			count++;
			$items_amount_inp.attr("data-count",count);
		}else{
			loadSmallCartContent();
		}
	},"300");
}

/**
 * 城市版小购物车
 */
function getCityCartTotalAmountForMax(){
	setTimeout(function(){
		var $items_amount_inp = $("#smallcart_items_amount");
		var count = $items_amount_inp.attr("data-count");	//循环计数器,最多循环三次获取购物车数量的请求
		if($items_amount_inp.val() == "init" && count < 3){
			getCartTotalAmount();
			getCartTotalAmountForMax();
			count++;
			$items_amount_inp.attr("data-count",count);
		}else{
			loadCitySmallCartContent();
		}
	},"300");
}

function deleteUnselItem(cartId,productid,isPresent,index){
	$("#delsmallcart" + index + "_" + cartId + "_" + productid).hide();
	var params = new Object();
	params["mid"] = mid;
	params["cartid"] = cartId;
	params["productid"] = productid;
	var url=crossDomain + frontPath + "/frontendjson/delunselcartitem.do?" + $.param(params) + "&callback=?";
	$.getJSON(url,params,callbackSetSmallCartAmount);
}
//删除头部小购物车中商品
function deleteSmallCart(cartId,productid,isPresent,index){
	//emarbox删除购物车监测码 20130903_zhaogangqiang
	try{deleteOneItem(productid);}catch(e){}
	$("#delsmallcart" + index + "_" + cartId + "_" + productid).hide();
	//$("#smallcart_cont").hide();
	var params = new Object();
	params["mid"] = mid;
	params["cartid"] = cartId;
	var url='';
	if(isPresent==1){
		params["productid"] = 0;
		params["presentid"] = productid;
		uri = crossDomain + frontPath + "/frontendjson/delpresent.do?" + $.param(params) + "&callback=?";
	}else{
		params["productid"] = productid;
		uri = crossDomain + frontPath + "/frontendjson/delcartitem.do?" + $.param(params) + "&callback=?";
	}
	$.getJSON(uri,params,callbackSetSmallCartAmount); 
}
//删除头部小购物车中X元Y件商品
function deleteSmallCartXY(cartId,ruleId){
	$("#delsmallcartxy_" + cartId + "_" + ruleId).hide();
	var params = {};
	params["mid"] = mid;
	params["cartid"] = cartId;
	params["ruleid"] = ruleId;
	uri = crossDomain + frontPath + "/delcartitemxy.do?" + $.param(params) + "&callback=?";
	$.getJSON(uri,getCartTotalAmount);
}
function isShowSmallcartScrollBar(amount){
	if(amount == 0){
		$("#smallcart_cont").html("<div class='smallcart_amount0'>购物车中还没有商品，赶紧选购吧！</div>");
		$("#smallcart_cont_wine").html("<i class='cart-arrow png'></i><div class='smallcart_amount0'>购物车中还没有商品，赶紧选购吧！</div>");
		$("#smallcart").attr("data-first","no");
	}else if(amount >=5){
		//$(".item_scroll").css("overflow-y","scroll");
		$('.cart_cont .scrollbar').hide();
	};
}
/**
 * 城市版
 */
function isShowCitySmallcartScrollBar(amount){
	if(amount == 0){
		$("#smallcart_cont").html(" <div class='free' style='display: block;'><span><img src='"+staticPrefix+"/zhongliang/city/common/images/cart-no.jpg'></span><p>购物车中还没有商品，赶紧选购吧！<a href='" + crossDomain + frontPath + "/index-" + cityid + "-0.htm" +"'>去首页看看</a></p></div>");
		$("#smallcart_cont_wine").html("<i class='cart-arrow png'></i><div class='smallcart_amount0'>购物车中还没有商品，赶紧选购吧！</div>");
		$("#smallcart").attr("data-first","no");
	}else if(amount >=5){
		//$(".item_scroll").css("overflow-y","scroll");
		$('.cart_cont .scrollbar').show();
		$(".smallcart_cont").css("overflow-y","scroll");
	};
}

function loadSmallCartContent(){
	var smallcart_items_amount = $("#smallcart_items_amount").val();
	if(smallcart_items_amount == "init"){
		//此处代码出现可能性极低，因初始化时最多可以请求获取购物车数量请求6次
		$("#smallcart_cont").html("<div class='smallcart_amount0'>网络繁忙，请稍候重试~</div>");
		setTimeout(getCartTotalAmount,"500");
		return;
	}
	isShowSmallcartScrollBar(smallcart_items_amount);
	var isFirstDo = $("#smallcart").attr("data-first");
	if(isFirstDo == "yes"){
		var paramsTT = new Object();
		paramsTT["randomT"] = Math.random();
		paramsTT["mid"] = mid;
		var url = frontPath + "/index/finclude/includetopsmallcartcontent.do";
		$.get(url, paramsTT, function(data){
			$("#smallcart_cont").html(data);
			if($("#smallcart_cont").length > 0){
				isShowSmallcartScrollBar(smallcart_items_amount);
				if($(".xy_miniprice").length > 0){
					$(".xy_miniprice").each(function(){
						var xy_miniprice = parseFloat($(this).html());
						$(this).html(xy_miniprice);
					});
				}
			}
		
		});
		$("#smallcart").attr("data-first","no");
	};
}

/**
 * 城市版小购物车
 */
function loadCitySmallCartContent(){
	var smallcart_items_amount = $("#smallcart_items_amount").val();
	if(smallcart_items_amount == "init"){
		//此处代码出现可能性极低，因初始化时最多可以请求获取购物车数量请求6次
		$("#smallcart_cont").html("<div class='smallcart_amount0'>网络繁忙，请稍候重试~</div>");
		setTimeout(getCartTotalAmount,"500");
		return;
	}
	isShowCitySmallcartScrollBar(smallcart_items_amount);
	var isFirstDo = $("#smallcart").attr("data-first");
	if(isFirstDo == "yes"){
		var paramsTT = new Object();
		paramsTT["randomT"] = Math.random();
		paramsTT["mid"] = mid;
		var url = frontPath + "/cityindex/finclude/includetopsmallcartcontent.do";
		$.get(url, paramsTT, function(data){
			$("#smallcart_cont").html(data);
			$('.cart_cont').tinyscrollbar();
			if($("#smallcart_cont").length > 0){
				isShowCitySmallcartScrollBar(smallcart_items_amount);
				if($(".xy_miniprice").length > 0){
					$(".xy_miniprice").each(function(){
						var xy_miniprice = parseFloat($(this).html());
						$(this).html(xy_miniprice);
					});
				}
			}
			//实现区分产地直送，产地直采，我买网发货单，以便跳转到购物车列表下的相应页签下 start
			try{
				if(sellerType == 1){//产地直送
					var tocarthref = $('.a-btn').find('a').attr('href');
					$('.a-btn').find('a').attr('href',tocarthref + '&curTab=2');
				}else if(sellerType == 2){//产地直采
					var tocarthref = $('.a-btn').find('a').attr('href');
					$('.a-btn').find('a').attr('href',tocarthref + '&curTab=6');
				}
			}catch(e){}
			//实现区分产地直送，产地直采，我买网发货单，以便跳转到购物车列表下的相应页签下 end
		
		});
		$("#smallcart").attr("data-first","no");
	};
}

//初始化头部小购物车
function initSmallCartInfo(){
	//获取购物车当前商品数
	getCartTotalAmount();
	$("#smallcart").live("mouseover",function(){
		//lazyloadSmallCart
		getCartTotalAmountForMax();
		$("#cartlink").addClass("cartlink_curr");
		$("#carticon").addClass("carticon_curr");
		$("#cartarrow").addClass("cartarrow_curr");
		$("#smallcart_cont").show();
		$(".main_nav_wrap").css('z-index','9');
	});
	$("#smallcart").live("mouseout",function(){
		$("#cartlink").removeClass("cartlink_curr");
		$("#carticon").removeClass("carticon_curr");
		$("#cartarrow").removeClass("cartarrow_curr");
		$("#smallcart_cont").hide();
		$(".main_nav_wrap").css('z-index','9');
	});
}
/*头部小购物车 end*/

function initCitySmallCartInfo(){
	//获取购物车当前商品数
	getCartTotalAmount();
	$("#smallcart").live("mouseenter",function(){
		loadCitySmallCartContent();	//初始化城市版小购物车
		//lazyloadSmallCart
		getCityCartTotalAmountForMax();
		$("#cartlink").addClass("cartlink_curr");
		$("#carticon").addClass("carticon_curr");
		$("#cartarrow").addClass("cartarrow_curr");
		$("#smallcart_cont").show();
	});
	$("#smallcart").live("mouseleaver",function(){
		$("#cartlink").removeClass("cartlink_curr");
		$("#carticon").removeClass("carticon_curr");
		$("#cartarrow").removeClass("cartarrow_curr");
		$("#smallcart_cont").hide();
	});
}

//cps
function initCpsParams(){
	//亿启发联盟
	var xcid = getQueryStringRegExp('xcid'), wid =  getQueryStringRegExp('wid'), fbt =  getQueryStringRegExp('fbt'), url =  getQueryStringRegExp('url');
	//成果网联盟
	var cgw_id = getQueryStringRegExp('cgw_id'), cgw_url = getQueryStringRegExp('cgw_url'), source = getQueryStringRegExp('source');
	//艾德思奇广告联盟
	var adsq_source = getQueryStringRegExp('adsq_source'), adsq_sid = getQueryStringRegExp('adsq_sid'), adsq_url = getQueryStringRegExp('adsq_url');
	//凌克特联盟
	var lkt_a_id = getQueryStringRegExp('lkt_a_id'), lkt_m_id = getQueryStringRegExp('lkt_m_id'), lkt_url = getQueryStringRegExp('lkt_url');
	//唯一广告联盟
	var wy_cid = getQueryStringRegExp('wy_cid'), wy_url = getQueryStringRegExp('wy_url');
	//多麦广告联盟
	var dm_sid = getQueryStringRegExp('dm_sid'), dm_feedback = getQueryStringRegExp('dm_feedback'), dm_to = getQueryStringRegExp('dm_to');
	//微博CPS联盟
	var wb_Adid = getQueryStringRegExp('wb_Adid'),  wb_Source = getQueryStringRegExp('wb_Source'), wb_position = getQueryStringRegExp('position'), wb_targeturl = getQueryStringRegExp('targeturl');
	//乐视
	var ls_id = getQueryStringRegExp('ls_from');
	//爱败妈妈
	var abmm_id = getQueryStringRegExp("abmm_from");
	//美食美酒 
	var msmj_id = getQueryStringRegExp("msmj_from");
	//潮流风向标CPS
	var clfxb_id = getQueryStringRegExp("clfxb_from");
	//美酒美食排队策划CPS
	var pdch_id = getQueryStringRegExp("pdch_from");
	//美食美酒最新一期的CPS
	var msmj8_id = getQueryStringRegExp("msmj8_from");
	//msmj9_from=msmj9
	var msmj9_id = getQueryStringRegExp("msmj9_from");
	
	var cps_from = getQueryStringRegExp("cps_from");
	
	//百度cps
	var baidu_id = getQueryStringRegExp("channel_id"),uid = getQueryStringRegExp("uid"),track_id = getQueryStringRegExp("track_id"),target = getQueryStringRegExp("target");
	
	var cpsValue = "", redirectUrl = "";
	
	if(xcid != "FALSE"){
		cpsValue =  xcid + "," + wid + "," + fbt + "," + url + "," + "yima";
	}else if(cgw_id != "FALSE"){
		cpsValue = cgw_id + "," + source + "," + cgw_url + "," + "cgw";
	}else if(adsq_source != "FALSE"){
		cpsValue =adsq_sid + "," + adsq_source + "," +adsq_url + "," + "adsqcps";
		redirectUrl = adsq_url;
	}else if(lkt_a_id != "FALSE"){
		cpsValue = lkt_a_id + "," + lkt_m_id + "," + lkt_url + "," + "lktcps";
		redirectUrl = lkt_url;
	}else if(wy_cid !="FALSE"){
		cpsValue = wy_cid + "," + wy_url + ",wycps";
		redirectUrl = wy_url;
	}else if(dm_sid !="FALSE"){
		cpsValue = dm_sid + "," + dm_feedback + "," + dm_to + ",dmcps"
		redirectUrl = dm_to;
	}else if(wb_Adid != "FALSE"){
		cpsValue = wb_Adid + "," + wb_Source + "," + wb_position + "," + wb_targeturl + ",wb_Adid" ;
		redirectUrl = wb_targeturl;
	}else if(ls_id != "FALSE") {
		cpsValue = ls_id + ",lscps";
	}else if(abmm_id != "FALSE"){
		cpsValue = abmm_id + ",abmmcps";
	}else if(msmj_id != "FALSE"){
		cpsValue = msmj_id + ",msmjcps";
	}else if(clfxb_id != "FALSE" ){
		cpsValue = clfxb_id + ",clfxbcps";
	} else if(pdch_id != "FALSE"){
		cpsValue = pdch_id + ",pdchcps";
	}else if(msmj8_id != "FALSE"){
		cpsValue = msmj8_id + ",msmj8cps";
	}else if(msmj9_id != "FALSE"){
		cpsValue = msmj9_id + ",msmj9cps";
	}else if(cps_from != "FALSE"){
		cpsValue = cps_from;
	}else if(baidu_id != "FALSE"){
		cpsValue = baidu_id +","+uid+","+track_id+","+target;
		redirectUrl = target;
	}
	if(cpsValue != ""){
		//获取当前时间
		var date=new Date();
		var expireDays=30;
		//将date设置为30天以后的时间
		date.setTime(date.getTime()+expireDays*24*3600*1000);
		document.cookie = "cps=" + escape(cpsValue) + ";expires="+date.toGMTString() + ";path=/;domain=.womai.com";	
	}
	if(redirectUrl != "" && redirectUrl != "FALSE"){
		window.location = redirectUrl;
	}
}

//初始化图片lazyload参数配置
function initLazyloadParams(){
	if($("img.lazyload").length == 0) { return; }
	$("img.lazyload").lazyload({
		threshold     : 250,    /*预加载可见高度100px*/
		skip_invisible: true,/*隐藏层图片不参与*/
		failure_limit : 50	  /*页面流中从第几个img标签开始计算*/
	});
}

$.fn.extend({
	//菜单hover
	showSubcontHover:function(submenu){
		$(this).hover(function(){
			$(this).addClass("cur");
			var subnum = $(this).find(submenu).find("a").size();
			if(subnum > 0){
				$(this).find(submenu).show();
			}
			if(submenu == ".sub_kinds"){//头部菜单加滚动事件
				var $this = $(this);
				if($this.find('.c_kinds').height()>419){
					$this.find('.scrollbar').show();
					$(this).tinyscrollbar();
				}
			}
		},function(){
			$(this).removeClass("cur");
			$(this).find(submenu).hide();
		});
	},

	//菜单slide
	showSubcontSlide:function(submenu){
		$(this).hover(function(){
			$(this).addClass("cur");
			$(this).find(submenu).slideDown();	
		},function(){
			$(this).removeClass("cur");
			$(this).find(submenu).slideUp();	
		});
	},

	//菜单点击
	showSubcontClick:function(cont,layer){
		$(this).click(function(){
			if($(this).hasClass("cur")){
				$(this).removeClass("cur");
				$(cont).hide();
				$(layer).hide();
			}else{
				$(this).addClass("cur");
				$(cont).show();
				$(layer).show();
			};
		});
	},
	//上一页
	goPre:function(area,fath,child,num){
		$(this).click(function(){
			var scorllwidth = $(area).find(child).eq(0).outerWidth()*num;     //移动的距离为一个li的宽度
			for( var m = 0; m < num; m++ ) {	
				$(area).find(child).eq(-1).prependTo($(area).find(fath)); 			
			}; 
			$(area).find(fath).css("margin-left", -scorllwidth);
			$(area).find(fath).stop().animate( { "margin-left": -0 }, 300 );	
		});
	},

	//下一页
	goNext:function(area,fath,child,num){
		$(this).click(function(){
			var scorllwidth = $(area).find(child).eq(0).outerWidth()*num;     //移动的距离为一个li的宽度
			$(area).find(fath).stop().animate({
				"margin-left": - scorllwidth },
				300,
				function() {
					for( var m = 0; m < num; m++ ) {
						$(area).find(child).eq(0).appendTo($(area).find(fath)); 
					};
					$(area).find(fath).css("margin-left", 0); 
				}
			);
		});
	},
	//btn hover 变色
	changeColor:function(before,after){
		$(this).hover(function(){
			$(this).animate({"opacity":after});
		},function(){
			$(this).animate({"opacity":before});
		});
	}
	
});
/*全部商品分类 begin*/
//初始化分类菜单
var categorys_t = -1,showlist_t = -1;
function initAllSortsMenu(){
	if($("#all_kinds").length < 1)return;
	
	//非首页全部分类菜单选择
	$("#all_kinds,#all_kinds .cont").hover(function(){
			clearFstMenuTimer();
			categorys_t = setTimeout(showFstMenu,300);
		},function(){
			clearFstMenuTimer();
			categorys_t = setTimeout(hideFstMenu,300);
	});
	$("#all_kinds").bind("click",showFstMenu);
	$("li.kinds").hover(function(){
		var $this = $(this);
		clearTimeout(showlist_t);
		showlist_t = setTimeout(function(){
			$this.siblings().removeClass("cur").find(".sub_kinds").hide();
			$this.addClass("cur").find(".sub_kinds").show();
		},120);
		//分类图标切换
		$this.find('b').addClass('hover');
	},function(){
		var $this = $(this);
		clearTimeout(showlist_t);
		showlist_t = setTimeout(function(){
			$this.removeClass("cur").find(".sub_kinds").hide();
		},120);
		$this.find('b').removeClass('hover');
	});

}
// //清除一级菜单延迟执行函数
// function clearFstMenuTimer(){
// 	clearTimeout(categorys_t);
// 	categorys_t = -1;
// }
// //显示一级菜单
// function showFstMenu(){
// 	$("#all_kinds .cont").slideDown(400,clearFstMenuTimer);
// 	$("#all_kinds").unbind("click").bind("click",hideFstMenu);
// }
// //隐藏一级菜单
// function hideFstMenu(){
// 	$("#all_kinds .cont").slideUp(400,clearFstMenuTimer);
// 	$("#all_kinds").unbind("click").bind("click",showFstMenu);
// }
$(function(){
	//设置样式 
	if(screenwidth < 1210){
		//底部广告位
		$('.add_b_wrap .add_bt2').show();
		$("body").addClass("thousand");
	}else{
		//底部广告位
		$('.add_b_wrap .add_bt').show();
		$("body").removeClass("thousand");
	};
	
	//主菜单 hover
	$(".site_nav").find(".mycount").showSubcontHover(".mycount_cont");
	$(".main_nav").find(".nav").children("li").showSubcontHover(".nav_cont");
	$(".kinds").showSubcontHover(".sub_kinds");
	$(".min_cart").showSubcontHover(".cart_cont");
	$(".min_cart").live("mouseover",function(){
		if($(".jscroll-h").height() == 0){
			//头部滚动条插件
			$(".item_scroll").jscroll({ W:"14px"
				,H:"17px"	
				,BgUrl:"url(images/scroll_bar.png)"
				,Bg:"-30px 0 repeat-y"
				,Bar:{Bg:{Out:"-15px 0px repeat-y",Hover:"-15px 0px repeat-y",Focus:"-15px 0px repeat-y"}
					 ,Bd:{Out:"#eee",Hover:"#eee"}}
				,Btn:{btn:true
					 ,uBg:{Out:"0 -30px",Hover:"0 0",Focus:"0 0"}
					 ,dBg:{Out:"0 -45px",Hover:"0 -15px",Focus:"0 -15px"}}
				,Fn:function(){}
			});
		};
	});
	
	//全部商品分类图标悬停来回切换
	$(".all_kinds .kinds").hover(function(){		
		$(this).find('b').addClass('hover');
	},function(){			
		$(this).find('b').removeClass('hover');
	});

	//菜单滑上，滑下
	
	$(".float_nav").find(".arrow").click(function(){
		$(document.documentElement).animate({scrollTop:0});
		$(document.body).animate({scrollTop:0});
	});
	
	//菜单滑上，滑下 为解决有背景图时将置顶按钮覆盖住问题，模拟一个透明置顶按钮事件
	$(".float_nav").find(".arrowtop").click(function(){
		$(document.documentElement).animate({scrollTop:0});
		$(document.body).animate({scrollTop:0});
	});
	
	
	/*//商家首页轮播图内容效果
	var n = 0;
	var i = 0;
	var count = $(".products").find(".prod").length;
	var t = setInterval(showAuto,3000);
	$(".products .prod:not(.products .prod:first-child)").hide();
	$(".products").find(".dot").mouseover(function() {
		if(!$(this).hasClass("cur")){
			i = $(this).index();
			if (i >= count) return;
			$(this).addClass("cur").siblings().removeClass("cur");
			$(".products .prod").filter(":visible").hide().parent().children().eq(i).stop(true,true).fadeIn(600);
		};
	});
	$(".products .rotate_pic, .products .dots,.products .left_btn,.products .right_btn").hover(
		function(){
			clearInterval(t);
		}, 
		function(){
			t = setInterval(showAuto,3000);
		}
	);
	function showAuto(){
		if(i>=count-1){
			i = 0;	
		}else{
			i++;
		}
		$(".products .prod").filter(":visible").hide().parent().children(".prod").eq(i).stop(true,true).fadeIn(600);
		$(".products").find(".dot").eq(i).addClass("cur").siblings().removeClass("cur");
	};*/
	 //轮播图下一页
	$('.products .right_btn').click(function(){
		var num = $(".rotate_pic").find(".prod").length-1;
		if(i>=num){
			i=0;
		}else{
			i++;
		}
		$(".rotate_pic").find(".prod").eq(i).show().siblings().hide();
		$(".products").find(".dot").eq(i).addClass("cur").siblings().removeClass("cur");
			})
    //轮播图上一页
	$('.products .left_btn').click(function(){
		$(".rotate_pic").find(".prod").eq(i).show().siblings().hide();
		$(".products").find(".dot").eq(i).addClass("cur").siblings().removeClass("cur");
		var num = $(".rotate_pic").find(".prod").length-1;
		if(i==0){
			i=num;
		}else{
			i--;
		}
	})
	//鼠标悬停轮播图 左右箭头出现
	$('.products').hover(function(){
		$(this).find('.left_btn,.right_btn').show();
	},function(){
		$(this).find('.left_btn,.right_btn').hide()
	});
	

	//无缝轮播
//	$(".madden-pro").find('.left_btn').goPre(".madden-pro","ul","li",5);
//	$(".madden-pro").find(".right_btn").goNext(".madden-pro","ul","li",5);
//	$(".commend-pro").find(".left_btn").goPre(".commend-pro","ul","li",1);
//	$(".commend-pro").find(".right_btn").goNext(".commend-pro","ul","li",1);
	//无缝轮播
//	$(".madden-pro").find('.left_btn').goPre(".madden-pro","ul","li",4);
//	$(".madden-pro").find(".right_btn").goNext(".madden-pro","ul","li",4);
//	$(".commend").find(".left_btn").goPre(".commend",".commend-pro","ul",1);   //20160615
//	$(".commend").find(".right_btn").goNext(".commend",".commend-pro","ul",1); //20160615
});
//购物车btn
/*function topSmallCart(){
	var scrolltop = $(document).scrollTop();
	if($(".min_cart").html() == 'undefined'){setInterval(topSmallCart, 5000);}
	var offsettop = $(".min_cart").offset().top;
	if(scrolltop > offsettop){
		$(".float_nav").children(".icon").show();
	}else{
		$(".float_nav").children(".icon").hide();
	};
}
$(window).scroll(function(){
	topSmallCart();
});*/
/*bottomRightBar begin*/
function topFixed(){
	if($("#rightbar").length == 0)return;
	getCurrScrollTop() > 300 ? document.getElementById("rightbar").style.display="block" : document.getElementById("rightbar").style.display="none";
	if(navigator.userAgent.indexOf("MSIE 6.0")>0){document.getElementById("rightbar").style.top=document.documentElement.clientHeight+document.documentElement.scrollTop-document.getElementById("rightbar").clientHeight-44+"px";document.getElementById("rightbar").style.position="absolute";}
}
// 右下角悬浮栏
function initRightBar(){
	if($("#rightbar").length == 0)return;
	$("#rightbar a.def").hover(function(){var tip = $(this).attr("data-tip");$(this).addClass("curr").html(tip);},function(){$(this).removeClass("curr").html("");});
	window.onscroll=topFixed,window.resize=topFixed,topFixed();
	initHotDeal();
}
var isShowHotDeal = true;
function initHotDeal(){
	hideAdv();
	$("#hot_deal_def").click(showAdv).hover(function(){
			t_hotDeal = setTimeout(function(){
				if(isShowHotDeal){
					showAdv();
					isShowHotDeal=false;
				}
			},250);
		});//hot_deal_def执行完hover的第一个方法后，此元素已被隐藏，所以不需要再给此元素添加鼠标移出的执行方法；zhaogangqiang_20130816注
	$("#hot_deal_cur").click(function(){closeHotDeal();isShowHotDeal = false;});
	$("#hot_deal_close").click(closeHotDeal);
}
//显示
function showAdv(){
	$("#hot_deal_layer,#hot_deal_close,#hot_deal_dovt,#hot_deal_cur").fadeIn(400);
	var hdiObj = $("#hot_deal_img"), 
	isFirst = hdiObj.attr("data-first");
	if(isFirst == "y"){
		hdiObj.find(".lazyload").attr("src",hdiObj.find(".lazyload").attr("original"));
		hdiObj.attr("data-first","n");
	}
	if(hdiObj.attr("data-firstrequest") == "y"){
		hdiObj.attr("data-firstrequest","n");
		var uri = frontPath + "/" + webIndex + "/finclude/commonadv.do",
		params = {};
		if($.cookie('userinfo')){
			params.placeId = 155260;
		}else{
			params.placeId = 155860;// 本地：155841，测试：155789，生产155860
		}
		params.t = "";//Math.r;
		$.post(uri,params,function(data){
			$("#hot_deal_img").html(data);
		});
	}
}
//关闭
function closeHotDeal(){
	$("#hot_deal_def").fadeIn(400);
	$("#hot_deal_layer,#hot_deal_close,#hot_deal_dovt,#hot_deal_cur").fadeOut(400,hideAdv);
}
//隐藏
function hideAdv(){
	$("#hot_deal_layer,#hot_deal_cur").hide();
}
/*bottomRightBar end*/
//页面dom完成加载后执行
$(function(){
	initAllSortsMenu();
	initLazyloadParams();
	initGouWuQuanInfo();
	if(isNew == ""){
		initRightBar();		//初始化右侧帮助边栏
	}
	initCpsParams();
//	initSmallCartInfo();
	initCitySmallCartInfo();	//初始化城市版小购物车
});

//创建弹出层
function createPopup(){
	var obj = document.createElement("div");
	obj.id = "tb_layer";
	obj.style.cssText = "position:fixed;z-index:10500;left:45%;top:30%;margin-left:-173px!important; margin-top:-86px!important; width:345px;" +
				"/*IE6*/_position:absolute;_top: expression(eval(document.compatMode &&" +
				"document.compatMode=='CSS1Compat') ?" +
				"documentElement.scrollTop + (document.documentElement.clientHeight-this.offsetHeight)/2 + 150 :" +
				"document.body.scrollTop + (document.body.clientHeight - this.clientHeight)/2);}";
	document.body.appendChild(obj);
}
//设置背景遮罩层----这个背景颜色相对比较高，登陆注册收藏等用到
function showLoginShade(){
	if($("#layoutBg").length > 0){$("#layoutBg").show();return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");
	e.id="layoutBg";
	e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:10000;";
	document.body.appendChild(e);
};

//数字转换为文字形式
function convertToChinese(num){
	var N = [
			    "零", "一", "二", "三", "四", "五", "六", "七", "八", "九"
			];
    var str = num.toString();
    var len = num.toString().length;
    var C_Num = [];
    for(var i = 0; i < len; i++){
        C_Num.push(N[str.charAt(i)]);
    }
    return C_Num.join('');
}
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

$(function(){
	$("#smallcarticon").hover(function(){
		$(this).addClass("smallcart_hover");
	},function(){
		$(this).removeClass("smallcart_hover");
	});
})