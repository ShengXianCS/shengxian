/*���߷�������ʵ�������common.js����Ϊ�˼����ⲿjs������ begin*/
var undefined;
var hascityid = false; //�첽�����Ƿ��Ѿ����س���id�����һ�����ڼ۸�ӿڣ������δ���ؼ۸�ӿڣ���Ҫ���»�ȡ
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
//���ȳ�ʼ����խƵ
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
 * @param a �ı�����
 * @param b ��ȡ�ַ�����
 * @param c ��׺,ĬȻ""
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
//��ʽ������
function htmlTextFormat(text) {
	var temp = replaceAll(text, "\r\n", "");
	temp = replaceAll(temp, "<br>", "");
	temp = replaceAll(temp, "<p>", "");
	temp = replaceAll(temp, "</p>", "");
	temp = replaceAll(temp, "&ldquo;", "��");
	temp = replaceAll(temp, "&rdquo;", "��");
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

//��ȡ��ǰ�¼�Ԫ��
function getEvent(){
	if(document.all){
		return window.event;//�����ie
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
//��ô��ڿɼ���winHeight
function findDimensions(){
	var winHeight1=0,winHeight2=0,winHeight3=0,winHeight4=0;
	if(window.innerWidth){winHeight1=window.innerHeight;} 
	if(document.body){if(document.body.clientWidth){winHeight2=document.body.clientHeight;}if(document.body.scrollHeight){winHeight3=document.body.scrollHeight;}}
	if(document.documentElement&&document.documentElement.clientWidth){winHeight4=document.documentElement.clientHeight;}
	winHeight=Math.max(winHeight1,winHeight2,winHeight3,winHeight4);
	return winHeight;
};
//��ȡ��ǰ�����߶�
function getCurrScrollTop(){
	var currScrollTop =  document.body.scrollTop;
	if(currScrollTop == 0)
		currScrollTop = document.documentElement.scrollTop;
	return currScrollTop;
}
//��ȡָ��id��Ԫ��topֵ
function getCurrElementTop(id){
	if($("#" + id).length <= 0){return 0;}
	return $("#" + id).offset().top - $(window).height();
}
//���ñ������ֲ�
function showShade(){
	if($("#layoutBg").length > 0){$("#layoutBg").show();return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");e.id="layoutBg";e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;background-color:#000;z-index:1005;";
	document.body.appendChild(e);
};
//�رձ������ֲ�
function closeShade(){
	if($("#layoutBg").length > 0){$("#layoutBg").remove()}
}
//���ñ������ֲ�
function resizeShade(){
	if($("#layoutBg").length > 0){
		$("#layoutBg").css("height", $(document).height());
		$("#layoutBg").css("width", $(document).width());
	}
}
//��ȡ��ַ������
function getQueryStringRegExp(name){    
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");     
	if(reg.test(location.href)){ 
		var result =  unescape(RegExp.$2.replace(/\+/g, " "));
		return result == "" ? "FALSE" : result;
	}else{
		return "FALSE";
	}
};
//���ָ��Ԫ��ָ������,��һ����������ȡdata-uri
function getAttrValueById(id,attr){
	var attrname;
	if(arguments.length == 1){attrname = "data-uri";}else{attrname = attr;}
	var tempValue = $("#" + id).attr(attrname);
	if(tempValue){return tempValue;}
	return null;
}
/*���߷�������ʵ�������common.js����Ϊ�˼����ⲿjs������ end*/

//������Ʒid mid usergroupid��ȡ��Ʒ�۸�
var usergroupid = -1;

//��ȡ�û���id
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
 * ����������Ʒ�۸�
 * @param pidsArr
 */
function getPrices(pidsArr,mid,callback){
	//�û��飬��ʱ����
	var userGroupId = getUserGroupId();
	var params = {};
	params.ids = pidsArr.join(",");
	var prices = ["buyPrice","marketPrice","WMPrice","specialPrice"];
	params.prices = prices.join(",");
	params.defData = "n";//�Ƿ���ҪĬ������
	params.mid = mid;
	params.cityid = cityid;
	params.gbuy = 1;//�Ź��۸��ʶ
	params.usergroupid = userGroupId;
	var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=" + "?";
	$.getJSON(apiUrl, function(data, status) {
		if(data == undefined) return;
		callback(data);
	});
}
/**
 * ����������Ʒ�ؼ�
 * @param pidsArr
 */
function getSpecialPrices(pidsArr,mid,callback){
	//�û��飬��ʱ����
	var userGroupId = getUserGroupId();
	var params = {};
	params.ids = pidsArr.join(",");
	var prices = ["buyPrice","specialPrice"];
	params.prices = prices.join(",");
	params.defData = "n";//�Ƿ���ҪĬ������
	params.mid = mid;
	params.cityid = cityid;
	params.gbuy = 1;//�Ź��۸��ʶ
	params.usergroupid = userGroupId;
	var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=" + "?";
	$.getJSON(apiUrl, function(data, status) {
		if(data == undefined) return;
		callback(data);
	});
}

//�۸��ʽ��
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
//У��ص�����data��Ч��
function valiLoadProductsData(data){
	if(data == undefined || data.result == undefined
		|| Object.prototype.toString.apply(data.result) != "[object Array]"
		|| data.result.length == 0)
		return false;
	return true;
}
/*ͷ����½��(����ʵ�幺��ȯ) bengin*/
//���ŵ�ǰ��ַ��ת��½ҳ��
function login(aobj){		
	var strlocation = location.toString();
	var returnLocation;
	var _index = strlocation.indexOf("?");
	var isHasMid = strlocation.indexOf("mid");
	var isHasId = strlocation.indexOf("id");	//�ؼ�����
	var isHasCid = strlocation.indexOf("Cid");	//�ؼ�����
	var isHasRuleId = strlocation.indexOf("ruleid");	//�ؼ�����,xԪy��ʹ��
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
//�ҵ��˻�
function gotoMyAccount(id){
	var uri = getAttrValueById(id);
	var url = crossDomain + frontPath+"/Member/index.jsp?mid=" + mid + "&url=" + encodeURIComponent(uri) + "&t=" +Math.random();
	$("#" + id).attr({href:url,target:"_blank"});
}
//�Ż݄�����
function gotoCouponActivation(id){
	var uri = getAttrValueById(id);
	var url = crossDomain + frontPath+"/Member/index.jsp?mid=" + mid + "&url=" + encodeURIComponent(uri) + "&t=" +Math.random();
	$("#" + id).attr({href:url});
}

/*ʵ�幺��ȯ--begin*/
function gotoBackProductUrl(){
	var num = $("#gwqNum").val();
	if(num==null || num==""){
		comAlert("��������Ĺ���ȯ�ţ�");
		return false;
	}else if(/[^\d]/.test(num)){
		comAlert("��������ȷ�Ĺ���ȯ�ţ�");
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
/*ʵ�幺��ȯ--end*/
/*topsearch--begin*/
function checkTopSearchForm(){
	var tempObj = $("#topKeywords"),
		defaultURL = tempObj.attr("data-URL");
	if(defaultURL && tempObj.val() == tempObj.attr("data-defvalue")){
		location.href = defaultURL;
		return false;
	}else{
		var text = tempObj.val();
		var b = text.indexOf('��');
		if(b >= 0){
			var e = text.lastIndexOf('��');
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
//��ȡ��¼��Ϣ
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
//��ʼ������ȯ��Ϣ
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
// add by lihongyao 20150414 ��Ϣ����
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

//��ʼ���ҵ��˻���Ϣ
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

//���á��ҵ��˻�����Ϣ����
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

//��á������������Ϣ����
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


//�����ղ�
function addFavorite(title, url){try{window.external.addfavorite(url, title);}catch(e){try{window.sidebar.addPanel(title, url, "");}catch(e){comAlert("��Ǹ�������������֧�ִ˲���������ʹ�ò˵�����Ctrl+D�ղر�վ��");}}}

function gotoCart(id){
	var $a = $("#" + id);
	$a.html("���Ժ�...").attr("href", $a.attr("href")+"&t=" + Math.random());
}
/*ͷ��С���ﳵ begin*/
//�ص���������С������Ʒ����
function callbackSetSmallCartAmount(data){
	if(data && data.totalAmount >= 0){
		
		//�ؼ���������
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

//��ȡ���ﳵ��Ʒ������
function getCartTotalAmount(){
	var uri = crossDomain + frontPath + "/frontendjson/smallcartinfo.do?mid=" + mid + "&callback=?&t=" + Math.random();
	$.getJSON(uri, callbackSetSmallCartAmount);
}
//ѭ�����3�λ�ȡ���ﳵ��Ʒ������������
function getCartTotalAmountForMax(){
	setTimeout(function(){
		var $items_amount_inp = $("#smallcart_items_amount");
		var count = $items_amount_inp.attr("data-count");	//ѭ��������,���ѭ�����λ�ȡ���ﳵ����������
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
 * ���а�С���ﳵ
 */
function getCityCartTotalAmountForMax(){
	setTimeout(function(){
		var $items_amount_inp = $("#smallcart_items_amount");
		var count = $items_amount_inp.attr("data-count");	//ѭ��������,���ѭ�����λ�ȡ���ﳵ����������
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
//ɾ��ͷ��С���ﳵ����Ʒ
function deleteSmallCart(cartId,productid,isPresent,index){
	//emarboxɾ�����ﳵ����� 20130903_zhaogangqiang
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
//ɾ��ͷ��С���ﳵ��XԪY����Ʒ
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
		$("#smallcart_cont").html("<div class='smallcart_amount0'>���ﳵ�л�û����Ʒ���Ͻ�ѡ���ɣ�</div>");
		$("#smallcart_cont_wine").html("<i class='cart-arrow png'></i><div class='smallcart_amount0'>���ﳵ�л�û����Ʒ���Ͻ�ѡ���ɣ�</div>");
		$("#smallcart").attr("data-first","no");
	}else if(amount >=5){
		//$(".item_scroll").css("overflow-y","scroll");
		$('.cart_cont .scrollbar').hide();
	};
}
/**
 * ���а�
 */
function isShowCitySmallcartScrollBar(amount){
	if(amount == 0){
		$("#smallcart_cont").html(" <div class='free' style='display: block;'><span><img src='"+staticPrefix+"/zhongliang/city/common/images/cart-no.jpg'></span><p>���ﳵ�л�û����Ʒ���Ͻ�ѡ���ɣ�<a href='" + crossDomain + frontPath + "/index-" + cityid + "-0.htm" +"'>ȥ��ҳ����</a></p></div>");
		$("#smallcart_cont_wine").html("<i class='cart-arrow png'></i><div class='smallcart_amount0'>���ﳵ�л�û����Ʒ���Ͻ�ѡ���ɣ�</div>");
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
		//�˴�������ֿ����Լ��ͣ����ʼ��ʱ�����������ȡ���ﳵ��������6��
		$("#smallcart_cont").html("<div class='smallcart_amount0'>���緱æ�����Ժ�����~</div>");
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
 * ���а�С���ﳵ
 */
function loadCitySmallCartContent(){
	var smallcart_items_amount = $("#smallcart_items_amount").val();
	if(smallcart_items_amount == "init"){
		//�˴�������ֿ����Լ��ͣ����ʼ��ʱ�����������ȡ���ﳵ��������6��
		$("#smallcart_cont").html("<div class='smallcart_amount0'>���緱æ�����Ժ�����~</div>");
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
			//ʵ�����ֲ���ֱ�ͣ�����ֱ�ɣ����������������Ա���ת�����ﳵ�б��µ���Ӧҳǩ�� start
			try{
				if(sellerType == 1){//����ֱ��
					var tocarthref = $('.a-btn').find('a').attr('href');
					$('.a-btn').find('a').attr('href',tocarthref + '&curTab=2');
				}else if(sellerType == 2){//����ֱ��
					var tocarthref = $('.a-btn').find('a').attr('href');
					$('.a-btn').find('a').attr('href',tocarthref + '&curTab=6');
				}
			}catch(e){}
			//ʵ�����ֲ���ֱ�ͣ�����ֱ�ɣ����������������Ա���ת�����ﳵ�б��µ���Ӧҳǩ�� end
		
		});
		$("#smallcart").attr("data-first","no");
	};
}

//��ʼ��ͷ��С���ﳵ
function initSmallCartInfo(){
	//��ȡ���ﳵ��ǰ��Ʒ��
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
/*ͷ��С���ﳵ end*/

function initCitySmallCartInfo(){
	//��ȡ���ﳵ��ǰ��Ʒ��
	getCartTotalAmount();
	$("#smallcart").live("mouseenter",function(){
		loadCitySmallCartContent();	//��ʼ�����а�С���ﳵ
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
	//����������
	var xcid = getQueryStringRegExp('xcid'), wid =  getQueryStringRegExp('wid'), fbt =  getQueryStringRegExp('fbt'), url =  getQueryStringRegExp('url');
	//�ɹ�������
	var cgw_id = getQueryStringRegExp('cgw_id'), cgw_url = getQueryStringRegExp('cgw_url'), source = getQueryStringRegExp('source');
	//����˼��������
	var adsq_source = getQueryStringRegExp('adsq_source'), adsq_sid = getQueryStringRegExp('adsq_sid'), adsq_url = getQueryStringRegExp('adsq_url');
	//���������
	var lkt_a_id = getQueryStringRegExp('lkt_a_id'), lkt_m_id = getQueryStringRegExp('lkt_m_id'), lkt_url = getQueryStringRegExp('lkt_url');
	//Ψһ�������
	var wy_cid = getQueryStringRegExp('wy_cid'), wy_url = getQueryStringRegExp('wy_url');
	//����������
	var dm_sid = getQueryStringRegExp('dm_sid'), dm_feedback = getQueryStringRegExp('dm_feedback'), dm_to = getQueryStringRegExp('dm_to');
	//΢��CPS����
	var wb_Adid = getQueryStringRegExp('wb_Adid'),  wb_Source = getQueryStringRegExp('wb_Source'), wb_position = getQueryStringRegExp('position'), wb_targeturl = getQueryStringRegExp('targeturl');
	//����
	var ls_id = getQueryStringRegExp('ls_from');
	//��������
	var abmm_id = getQueryStringRegExp("abmm_from");
	//��ʳ���� 
	var msmj_id = getQueryStringRegExp("msmj_from");
	//���������CPS
	var clfxb_id = getQueryStringRegExp("clfxb_from");
	//������ʳ�ŶӲ߻�CPS
	var pdch_id = getQueryStringRegExp("pdch_from");
	//��ʳ��������һ�ڵ�CPS
	var msmj8_id = getQueryStringRegExp("msmj8_from");
	//msmj9_from=msmj9
	var msmj9_id = getQueryStringRegExp("msmj9_from");
	
	var cps_from = getQueryStringRegExp("cps_from");
	
	//�ٶ�cps
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
		//��ȡ��ǰʱ��
		var date=new Date();
		var expireDays=30;
		//��date����Ϊ30���Ժ��ʱ��
		date.setTime(date.getTime()+expireDays*24*3600*1000);
		document.cookie = "cps=" + escape(cpsValue) + ";expires="+date.toGMTString() + ";path=/;domain=.womai.com";	
	}
	if(redirectUrl != "" && redirectUrl != "FALSE"){
		window.location = redirectUrl;
	}
}

//��ʼ��ͼƬlazyload��������
function initLazyloadParams(){
	if($("img.lazyload").length == 0) { return; }
	$("img.lazyload").lazyload({
		threshold     : 250,    /*Ԥ���ؿɼ��߶�100px*/
		skip_invisible: true,/*���ز�ͼƬ������*/
		failure_limit : 50	  /*ҳ�����дӵڼ���img��ǩ��ʼ����*/
	});
}

$.fn.extend({
	//�˵�hover
	showSubcontHover:function(submenu){
		$(this).hover(function(){
			$(this).addClass("cur");
			var subnum = $(this).find(submenu).find("a").size();
			if(subnum > 0){
				$(this).find(submenu).show();
			}
			if(submenu == ".sub_kinds"){//ͷ���˵��ӹ����¼�
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

	//�˵�slide
	showSubcontSlide:function(submenu){
		$(this).hover(function(){
			$(this).addClass("cur");
			$(this).find(submenu).slideDown();	
		},function(){
			$(this).removeClass("cur");
			$(this).find(submenu).slideUp();	
		});
	},

	//�˵����
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
	//��һҳ
	goPre:function(area,fath,child,num){
		$(this).click(function(){
			var scorllwidth = $(area).find(child).eq(0).outerWidth()*num;     //�ƶ��ľ���Ϊһ��li�Ŀ��
			for( var m = 0; m < num; m++ ) {	
				$(area).find(child).eq(-1).prependTo($(area).find(fath)); 			
			}; 
			$(area).find(fath).css("margin-left", -scorllwidth);
			$(area).find(fath).stop().animate( { "margin-left": -0 }, 300 );	
		});
	},

	//��һҳ
	goNext:function(area,fath,child,num){
		$(this).click(function(){
			var scorllwidth = $(area).find(child).eq(0).outerWidth()*num;     //�ƶ��ľ���Ϊһ��li�Ŀ��
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
	//btn hover ��ɫ
	changeColor:function(before,after){
		$(this).hover(function(){
			$(this).animate({"opacity":after});
		},function(){
			$(this).animate({"opacity":before});
		});
	}
	
});
/*ȫ����Ʒ���� begin*/
//��ʼ������˵�
var categorys_t = -1,showlist_t = -1;
function initAllSortsMenu(){
	if($("#all_kinds").length < 1)return;
	
	//����ҳȫ������˵�ѡ��
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
		//����ͼ���л�
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
// //���һ���˵��ӳ�ִ�к���
// function clearFstMenuTimer(){
// 	clearTimeout(categorys_t);
// 	categorys_t = -1;
// }
// //��ʾһ���˵�
// function showFstMenu(){
// 	$("#all_kinds .cont").slideDown(400,clearFstMenuTimer);
// 	$("#all_kinds").unbind("click").bind("click",hideFstMenu);
// }
// //����һ���˵�
// function hideFstMenu(){
// 	$("#all_kinds .cont").slideUp(400,clearFstMenuTimer);
// 	$("#all_kinds").unbind("click").bind("click",showFstMenu);
// }
$(function(){
	//������ʽ 
	if(screenwidth < 1210){
		//�ײ����λ
		$('.add_b_wrap .add_bt2').show();
		$("body").addClass("thousand");
	}else{
		//�ײ����λ
		$('.add_b_wrap .add_bt').show();
		$("body").removeClass("thousand");
	};
	
	//���˵� hover
	$(".site_nav").find(".mycount").showSubcontHover(".mycount_cont");
	$(".main_nav").find(".nav").children("li").showSubcontHover(".nav_cont");
	$(".kinds").showSubcontHover(".sub_kinds");
	$(".min_cart").showSubcontHover(".cart_cont");
	$(".min_cart").live("mouseover",function(){
		if($(".jscroll-h").height() == 0){
			//ͷ�����������
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
	
	//ȫ����Ʒ����ͼ����ͣ�����л�
	$(".all_kinds .kinds").hover(function(){		
		$(this).find('b').addClass('hover');
	},function(){			
		$(this).find('b').removeClass('hover');
	});

	//�˵����ϣ�����
	
	$(".float_nav").find(".arrow").click(function(){
		$(document.documentElement).animate({scrollTop:0});
		$(document.body).animate({scrollTop:0});
	});
	
	//�˵����ϣ����� Ϊ����б���ͼʱ���ö���ť����ס���⣬ģ��һ��͸���ö���ť�¼�
	$(".float_nav").find(".arrowtop").click(function(){
		$(document.documentElement).animate({scrollTop:0});
		$(document.body).animate({scrollTop:0});
	});
	
	
	/*//�̼���ҳ�ֲ�ͼ����Ч��
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
	 //�ֲ�ͼ��һҳ
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
    //�ֲ�ͼ��һҳ
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
	//�����ͣ�ֲ�ͼ ���Ҽ�ͷ����
	$('.products').hover(function(){
		$(this).find('.left_btn,.right_btn').show();
	},function(){
		$(this).find('.left_btn,.right_btn').hide()
	});
	

	//�޷��ֲ�
//	$(".madden-pro").find('.left_btn').goPre(".madden-pro","ul","li",5);
//	$(".madden-pro").find(".right_btn").goNext(".madden-pro","ul","li",5);
//	$(".commend-pro").find(".left_btn").goPre(".commend-pro","ul","li",1);
//	$(".commend-pro").find(".right_btn").goNext(".commend-pro","ul","li",1);
	//�޷��ֲ�
//	$(".madden-pro").find('.left_btn').goPre(".madden-pro","ul","li",4);
//	$(".madden-pro").find(".right_btn").goNext(".madden-pro","ul","li",4);
//	$(".commend").find(".left_btn").goPre(".commend",".commend-pro","ul",1);   //20160615
//	$(".commend").find(".right_btn").goNext(".commend",".commend-pro","ul",1); //20160615
});
//���ﳵbtn
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
// ���½�������
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
		});//hot_deal_defִ����hover�ĵ�һ�������󣬴�Ԫ���ѱ����أ����Բ���Ҫ�ٸ���Ԫ���������Ƴ���ִ�з�����zhaogangqiang_20130816ע
	$("#hot_deal_cur").click(function(){closeHotDeal();isShowHotDeal = false;});
	$("#hot_deal_close").click(closeHotDeal);
}
//��ʾ
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
			params.placeId = 155860;// ���أ�155841�����ԣ�155789������155860
		}
		params.t = "";//Math.r;
		$.post(uri,params,function(data){
			$("#hot_deal_img").html(data);
		});
	}
}
//�ر�
function closeHotDeal(){
	$("#hot_deal_def").fadeIn(400);
	$("#hot_deal_layer,#hot_deal_close,#hot_deal_dovt,#hot_deal_cur").fadeOut(400,hideAdv);
}
//����
function hideAdv(){
	$("#hot_deal_layer,#hot_deal_cur").hide();
}
/*bottomRightBar end*/
//ҳ��dom��ɼ��غ�ִ��
$(function(){
	initAllSortsMenu();
	initLazyloadParams();
	initGouWuQuanInfo();
	if(isNew == ""){
		initRightBar();		//��ʼ���Ҳ��������
	}
	initCpsParams();
//	initSmallCartInfo();
	initCitySmallCartInfo();	//��ʼ�����а�С���ﳵ
});

//����������
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
//���ñ������ֲ�----���������ɫ��ԱȽϸߣ���½ע���ղص��õ�
function showLoginShade(){
	if($("#layoutBg").length > 0){$("#layoutBg").show();return;}
	var winHeight = $(document).height();//findDimensions();
	var e = document.createElement("div");
	e.id="layoutBg";
	e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:10000;";
	document.body.appendChild(e);
};

//����ת��Ϊ������ʽ
function convertToChinese(num){
	var N = [
			    "��", "һ", "��", "��", "��", "��", "��", "��", "��", "��"
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
 * ���֤��֤ģ�鿪ʼ
 */
/**
 * ����֤��������http://blog.163.com/oscarhui@126/blog/static/11962065720098244153900/
 * @param identityId
 * @returns {Boolean}
 */
function isChineseIdentityID(identityId){
	identityId = identityId.toString()
	//1.��֤���һλ��֤��
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
		if (b==2){ //���һλΪУ��λ
			c = identityId.substr(17,1).toUpperCase(); //תΪ��дX
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
	}else{ //15λ���֤��
		if (!isInteger(identityId)) {
			return false;
		}
	}
	
	//2.��֤����������
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
	//ע�⣺�˳����в���ֱ��ʹ��parseInt()ת������Ϊ08��09�ᱻ�����˽�������ת��<��0��ʼ>
	return parseInt(parseFloat(str));
}

//��֤������
function isValidDate(iY, iM, iD) {//�˷�����
	var date = new Date(str2int(iY),str2int(iM) - 1,str2int(iD));//ע�⣺Date(year,month,date)�Ĳ���ȡֵ��Χ��year:4λ������month:0~11��date:1~31.
	var y = date.getFullYear();
	var m = date.getMonth() + 1;//ע�⣺getMonth()�Ľ����Χ��0��11
	var d = date.getDate();
	if (y != iY || m != iM || d != iD){
		return false;
	}
	return true;
}

//��֤�Ƿ�������
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