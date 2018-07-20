// // 总运费
// var deliveryrule = 0;
//
// //加入购物车成功后执行的渲染方法
// function doSuccess(){
// 	try{addCartItem(_articleId);}catch(e){}	//跳转延时执行，为了检测码能够有时间执行完，参见cartAdd.jsp
// 	var cartId = $(".order_nav .hover_li").attr("data-cartid");
//  	setTimeout(function(){
//  		var uri = frontPath + "/Cart/ShowCart.do?tt=" +Math.random();
//  		if(cartId){
//  			uri	+= "&cartid=" + cartId;
//  		}
//  		location.href = uri;
//
//  	},300);
// }
// //局部刷新购物车项及可选赠品规则
// function callback_onlyRefreshCurrentCart(data,callbackParams){
// 	var dataOut = data;
// 	var curTab = $(".order_nav .hover_li").attr("data-tab");
// 	var type = $(".current").attr("data-type");
// 	var param = callbackParams;
// 	var params = {"mid":callbackParams.mid,"curTab":curTab,"type":type,"tt":Math.random()};
// 	$.post(frontPath + "/cart/loadshowcart.do", params, function(data){
// 		var cpid = c_pId;
// 		$("#loadshowcart" + curTab).html(data);
// 		addproductlimit(cpid); //添加限免
// 		initCartItemsEvents();
// 		if($("#loadshowcart" + curTab).find(".content_type").length == 0){
// 			//若当前购物车商品没有商品项，则刷新购物车。
// 			location.href = frontPath + "/Cart/ShowCart.do?tt=" +Math.random();
// 		}
// 		// 闪购订单限制
// 		if(dataOut){
// 			var flashbuyLimitMessage = dataOut.split(":");
// 			if(flashbuyLimitMessage.length === 2){
// 				var $flashbuyLimitMessage = $("#input_goods_" + param.cartId + "_" + param.indexId + "_" + param.productId);
// 				if(flashbuyLimitMessage[0] == "10"){
// 					$flashbuyLimitMessage.children("span.restr_arrow").show();
// 					$flashbuyLimitMessage.children("div.restr_popup").show().children("p").hide();
// 					$flashbuyLimitMessage.children("div.restr_popup").children("p.flashbuy-orderlimit").show().children("span").html(flashbuyLimitMessage[1]);
// 					return;
// 				}else if(flashbuyLimitMessage[0] == "11"){
// 					$flashbuyLimitMessage.children("span.restr_arrow").show();
// 					$flashbuyLimitMessage.children("div.restr_popup").show().children("p").hide();
// 					$flashbuyLimitMessage.children("div.restr_popup").children("p.flashbuy-userlimit").show().children("span").html(flashbuyLimitMessage[1]);
// 					return;
// 				}
// 			}
// 		}
// 	});
// }
//
// //商品添加限免（配送范围限制）
// function addproductlimit(cpId){
// 	if(cpId != null && cpId != ''){
// 		var cartID_pid = cpId.split("@");
// 		for(var i = 0; i<cartID_pid.length; i++){
// 			var strTemp = cartID_pid[i];
// 			var cartID_pids = strTemp.split("_");
// 			productIds = cartID_pids[1];
//     		productIdArr = productIds.split(",");
//     		for(var j = 0; j<productIdArr.length; j++){
//     			$("#sel"+ productIdArr[j]).parent().parent().addClass("limitxq");
//     		}
// 		}
// 		deliveryxqadd();
// 	}
// }
// //执行所有input的blur事件
// function doAllInputBlurEvent(cardId){
// 	$("#loadshowcart" + cardId).find("input[id^=amount]").each(function(){
// 		var blurenent = $(this).attr("onblur");
// 		$(this).unbind("blur").blur(blurenent);
// 	});
// }
//
// /**
//  * 闪购用户限购验证
//  */
// var flashbuyUserLimit = function(cartId,cartMid){//, callback
// 	var url = frontPath + "/cart/flashbuyUserLimitCheck.do";
// 	var param = {};
// 	param["mid"] = cartMid;
// 	param["cartId"] = cartId;
// 	param["tt"] = Math.random();
//
// 	var flag = false;
//
// 	var func = function(data){
// 		if(data.code == 0){
// 			/*if($.isFunction(callback)){
// 				callback();
// 			}*/
// 			flag = false;
// 			return false;
// 		}else if(data.code == 1){
// //			alert(JSON.stringify(data));
// //			var rules = data.limitRules;
// //			$.each(rules, function(key, value){
// //			});
// 			comAlert("加入商品的数量超出闪购活动的用户限购数量!");
// 			// 还原按钮状态
// 			$(".check_button, .sjcheck_button").css("cursor","pointer").attr("title","去结算中心").attr("data-first","y");
// 			flag = true;
// 			return true;
// 		}else{
// 			comAlert("系统繁忙, 请稍后再试!");
// 			// 还原按钮状态
// 			$(".check_button, .sjcheck_button").css("cursor","pointer").attr("title","去结算中心").attr("data-first","y");
// 			flag = true;
// 			return true;
// 		}
// 	};
//
// 	$.ajax({
// 		"async" : false,
// 		"url" : url,
// 		"data" : param,
// 		"dataType" : "json",
// 		"success" : func
// 	});
//
// 	return flag;
// };
//
// var needGotoMobileCertification = function(cartMid, cartId){
// 	var r = false;
// 	var data = {};
// 	data["mid"] = cartMid;
// 	data["cartId"] = cartId;
// 	data["tt"] = Math.random();
// 	var url = "/shan/needgotomobilecertification.do";
// 	$.ajax({
// 		"async" : false,
// 		"data" : data,
// 		"url" : url,
// 		"dataType" : "json",
// 		"success" : function(data){
// 			r = data;
// 		}
// 	});
// 	return r;
// };
//
// var dotopay = function(param){//去结算中心"cartIds":cartIds,"prepay":prepay,"isCoquetry":isCoquetry,"isHasBuyer":isHasBuyer
// 	if(!param && !param.cartIds) return false;
// 	returnLocation = frontPath + "/checkout/ordercard.do?";
//
// 	//执行加减按钮的blur事件
// 	doAllInputBlurEvent(param.cartIds);
// 	var cartIds = param.cartIds;
// 	setTimeout(function(){
// 		if(param.isHasBuyer){	//如已经登陆
// 			if(flag != null && flag == true){
// 				getAlertMsg();
// 				return;
// 			}
// 			var cartIdArr = cartIds.split(",");
// 			if(cartIdArr && cartIdArr.length > 0){
// 				var isLimitBuy = false;
// 				for(var i = 0; i < cartIdArr.length; i++){
// 					var cartId = cartIdArr[i];
// 					if(!cartId || cartId == ""){
// 						continue;
// 					}
// 					// 手机认证检查
// 					/*if(needGotoMobileCertification(param.mid, cartId)){
// 						comAlert("您的购物车中有闪购商品,需绑定手机后购买!",
// 								{"confirm":"去绑定手机","cancel":"取消"},
// 								function(){
// 									location = "/Member/index.jsp?mid=0&url=" + encodeURIComponent("/Member/UpdateMobile.do?mid=0") +"&tt=" +Math.random();
// 								},
// 								function(){
// 									// 还原按钮状态
// 									$(".check_button, .sjcheck_button").css("cursor","pointer").attr("title","去结算中心").attr("data-first","y");
// 								}
// 						);
// 						return;
// 					}*/
// 					// 用户限购检查
// 					/*isLimitBuy = flashbuyUserLimit(cartId,param.mid);//, function(){location.href = returnLocation;}
// 					if(isLimitBuy){
// 						break;
// 					}*/
// 					//众筹商品手机验证检查
//                     if(crowdfundingUserLimitCheck(param.mid, cartId)){
//                         comAlert("您的购物车中有众筹商品,需绑定手机后购买!",
//                             {"confirm":"去绑定手机","cancel":"取消"},
//                             function(){
//                                 location = "/Member/index.jsp?mid=0&url=" + encodeURIComponent("/Member/UpdateMobile.do?mid=0") +"&tt=" +Math.random();
//                             },
//                             function(){
//                                 // 还原按钮状态
//                                 $(".check_button, .sjcheck_button").css("cursor","pointer").attr("title","去结算中心").attr("data-first","y");
//                             }
//                         );
//                         return;
//                     }
// 				}
// 				if(!isLimitBuy){
// 					returnLocation += "cartids=" + param.cartIds +"&tt=" +Math.random();
// 					if(param && param.prepay == 1){
// 						returnLocation += "&prepay=1";
// 					}
// 					if(param && param.isCoquetry){
// 						returnLocation += "&isCoquetry=" + param.isCoquetry;
// 					}
// 					// add by lihongyao 20160728 城市版三期指定城市合并普通车和生鲜车
// 					if(param && param.curTab){
// 						returnLocation += "&curTab=" + param.curTab;
// 					}
// 					location.href = returnLocation;
// 				}
// 			}
// 		}else{	//二期会修改，增加登陆注册弹出层
// 			showLoginAndRgister(returnLocation, param);
// 		}
// 	},300);
// }
//
// //去结算
// function topay(isHasBuyer, prepay){
// 	jQuery.cookie("isSJ","2");//confinedArea用
// 	var curObj = $(".btn .topay");
// 	if(prepay){
// 		curObj = $("#"+prepay);
// 		if(prepay == '0' ){
// 			curObj = $("#j-btn-totalPrice"); // 名庄荟的按钮：全额结算
// 		}else if(prepay == '1'){
// 			curObj = $("#j-btn-preSaleTotalPrice"); // 名庄荟的按钮：预付结算
// 		}
// 	}
// 	//是否具有不支持的生鲜商品
// 	/*var sxlimitlength = $(".order_contents").find(".limit").length;
// 	if(sxlimitlength > 0){
// 		comAlert("有不支持该地区配送的、请删除或修改");
// 		return;
// 	}*/
// 	if(curObj.attr("topay") == '2'){
// 		comAlert("请选择您要结算的商品");
// 		return;
// 	}
// 	if(curObj.attr("data-first") == "y"){
// 		curObj.attr("data-first","n");
// 		curObj.css("cursor","wait").attr("title","正在为您努力跳转中，请稍候...");
// 		var curTab = $(".order_nav .hover_li").attr("data-tab");
// 		var cartIds = $("#payCartIds"+curTab).val();
// 		if(cartIds && cartIds.length > 1){
// 			cartIds = cartIds.substring(1);
// 		}
// 		var mid = $(".order_nav .hover_li").attr("data-mid");
// 		var params = {};
// 		params.cartIds = cartIds;
// 		//params.mid = mid;
// 		params.isHasBuyer = isHasBuyer;
// 		params.prepay = prepay;
// 		params.curTab = curTab; // add by lihongyao  20160728 城市版三期指定城市合并普通车和生鲜车
// 		dotopay(params);
// 	}
// }
// //撒娇结算
// function topayforsj(isHasBuyer){
// 	jQuery.cookie("isSJ","1");//confinedArea用
// 	var curObj = $(".btn,.topay");
// 	if(curObj.attr("topay") == '2'){
// 		comAlert("请选择您要结算的商品");
// 		return;
// 	}
// 	if(curObj.attr("data-first") == "y"){
// 		curObj.attr("data-first","n");
// 		curObj.css("cursor","wait").attr("title","正在为您努力跳转中，请稍候...");
// 		var curTab = $(".order_nav .hover_li").attr("data-tab");
// 		var cartIds = $("#payCartIds"+curTab).val();
// 		if(cartIds && cartIds.length > 1){
// 			cartIds = cartIds.substring(1);
// 		}
// 		var mid = $(".order_nav .hover_li").attr("data-mid");
// 		var params = {};
// 		params.cartIds = cartIds;
// 		//params.mid = mid;
// 		params.isHasBuyer = isHasBuyer;
// 		params.isCoquetry = "isCoquetry";
// 		dotopay(params);
// 	}
// }
//
//
// /** 登陆注册弹出层 begin----------------------------------------**/
// //刷新验证码
// function cartCodeRefresh(jqObj) {
// 	jqObj.attr("src", frontPath + "/ValidateCode?t=1" +"&tt=" +Math.random());
// }
// //预加载登陆注册，因为购物车内容比较多
// function loadRegisterAndLogin(params,returnUrl){
//
// 	var pa = "&cartids=" + params.cartIds +"&tt=" +Math.random();
// 	if(params && params.prepay == 1){
// 		pa += "&prepay=1";
// 	}
// 	if(params && params.isCoquetry){
// 		pa += "&isCoquetry=" + params.isCoquetry;
// 	}
// 	if(params && params.curTab) {
// 		pa += "&curTab=" + params.curTab;
// 	}
// 	if(!params.isHasBuyer){
// 		createPopup();//创建弹出层div
// 		$("#tb_layer").load(frontPath + "/Cart/Login.do?jzdisplayflag=0&returnUrl=" + returnUrl + pa);
// 	}else{
// 		return;
// 	}
// }
// //创建弹出层
// function createPopup(){
// 	var obj = document.createElement("div");
// 	obj.id = "tb_layer";
// 	obj.style.cssText = "display:none;position:fixed;z-index:10500;left:45%;top:30%;margin-left:-173px!important; margin-top:-86px!important; width:345px;" +
// 				"/*IE6*/_position:absolute;_top: expression(eval(document.compatMode &&" +
// 				"document.compatMode=='CSS1Compat') ?" +
// 				"documentElement.scrollTop + (document.documentElement.clientHeight-this.offsetHeight)/2 + 150 :" +
// 				"document.body.scrollTop + (document.body.clientHeight - this.clientHeight)/2);}";
// 	document.body.appendChild(obj);
// }
// //设置背景遮罩层----这个背景颜色相对比较高，收藏的登陆注册用到（购物车中也有收藏）
// function showLoginShade(){
// 	if(jQuery("#layoutBg").length > 0)return;
// 	var winHeight = $(document).height();
// 	var e = document.createElement("div");
// 	e.id="layoutBg";
// 	e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:10000;";
// 	document.body.appendChild(e);
// };
//
// //防止预加载出现的问题
// var globalVar={
//     getUriCount : 0,//第几次获取对象
//     getUriTotalCount : 5//一共获取几次
// }
// //显示登陆注册弹出层
// function showLoginAndRgister(returnLocation,params){
// 	showShade();//创建背景
// 	$("#layoutBg").show();//显示背景
// 	loadRegisterAndLogin(params, returnLocation);//创建弹出层
// 	$("#tb_layer").show();//显示登陆注册层
// }
// /** 登陆注册弹出层 end----------------------------------------**/
//
// //等待删除
// function waitDelete(obj){
// 	setTimeout(function(){
// 		$(obj).parent().parent().html('<p class="del_title">正在删除此商品</p><p class="del_title">请稍候...</p>');
// 	},100);
// }
// //验证数字加减号
// function valiAmountInp(obj){
// 	re = /^[1-9][0-9]{0,5}$/g;
// 	if(!re.test(obj.value)){
// 		obj.value = 1;
// 		return false;
// 	}
// 	return true;
// }
// //禁用加减按钮，避免异步请求堆积
// function disabledADDorDEC(suffix) {
// 	jQuery("#p_dec" + suffix).hide();
// 	jQuery("#p_add" + suffix).hide();
// 	jQuery("#p_dec_disabled" + suffix).show();
// 	jQuery("#p_add_disabled" + suffix).show();
// }
// //更新商品项数量
// function updateAmount(cartId, indexId, productid, mid, amount, userGroupId, sellableAmount) {
// 	var amount = jQuery("#amount" + cartId + "_" + indexId + "_" + productid).val();
// 	var oldAmount = jQuery("#oldAmount" + cartId + "_" + indexId + "_" + productid).val();
// 	if (parseInt(amount) > parseInt(sellableAmount)) {
// 		// 如果更新数量大于库存量，则回到原值
// 		comAlert("对不起，库存不足！");
// 		jQuery("#amount" + cartId + "_" + indexId + "_" + productid).val(oldAmount);
// 		amount = oldAmount;
// 	}
// 	var changeAmount = Number(amount) - Number(oldAmount);
// 	var issel = $("#sel"+productid).attr("issel");
// 	if(issel == 0){
// 		changeAmount = Number(amount);
// 	}else if (changeAmount == 0) {
// 		return;
// 	}
// 	disabledADDorDEC(cartId + "_" + indexId);
// 	var params = new Object();
// 	params["productid"] = productid;
// 	params["mid"] = mid;
// 	params["cartid"] = cartId;
// 	params["changeamount"] = changeAmount;
// 	params["tt"] = Math.random();
// 	jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 	jQuery.post(frontPath + "/updatecartitem.do", params, function(data) {
// 		if(mid == 300){
// 			mid = 0 ;
// 		}
// 		callback_onlyRefreshCurrentCart(data, {"cartId":cartId,"mid":mid, "indexId":indexId, "productId":productid });
// 		if(data != 1 && data.indexOf("10:") == -1 && data.indexOf("11:") == -1){
// 			comAlert(data);
// 		}
// 		setTimeout(function(){
// 			var shanlength = $("#sel"+productid).parent().parent().siblings(".contype1_cont3").find(".satisbg").length;
// 			if(shanlength > 0){showgroupsatisfy(mid,productid,amount);} //闪购N名优惠判断
// 		},1000);
// 	});
// }
//
// /*闪购N名优惠判断*/
// function showgroupsatisfy(mid,ids,amount){
// 	var url = frontPath + "/tuan2014/product/grouybuySatisfy.do?ids="+ids+"&mid="+mid+"&callback=?";
// 	jQuery.getJSON(url,function(data){
// 		var result = data.result;
// 		var urilist = result.split(",");
// 		for(var i=0;i<urilist.length;i++){
// 			var tempurl = urilist[i];
// 			if(null != tempurl && tempurl.length > 0){
// 				var imguri = tempurl.split("_");
// 				if(null != imguri[0] && imguri[0] == 1){
// 					var xiangoushu = parseInt(imguri[5]);
// 					var albuyamount = 0;
// 					if(imguri[7]=='false'){
// 						albuyamount = parseInt(amount) + parseInt(imguri[8]) //已经购买成功的+已放入购物车的
// 					}
// 					if(albuyamount > xiangoushu && imguri[7]=='false'){
// 						//comAlert("该商品已超出活动限购数量，超出部分将按照团购原件结算哦~");
// 						$("#satisbg_"+imguri[1]).show();
// 					}else{
// 						$("#satisbg_"+imguri[1]).hide();
// 					}
// 				}
// 			}
// 		}
// 	});
// }
// // 减少商品
// function decamount(cartId, indexId, productid, mid, userGroupId, sellableAmount) {
// 	var amount = jQuery("#amount" + cartId + "_" + indexId + "_" + productid);
// 	if (amount.val() <= 1) {
// 		return;
// 	}
// 	var oldAmount = jQuery("#oldAmount" + cartId + "_" + indexId + "_" + productid).val();
// 	if ((parseInt(amount.val()) - parseInt(oldAmount)) == 1) {
// 		amount.val(Number(amount.val()) - 1);
// 		return;
// 	}
// 	if ((parseInt(amount.val()) - 1 - parseInt(sellableAmount)) > 0) {
// 		comAlert("对不起，库存不足！");
// 		return;
// 	} else {
// 		amount.val(Number(amount.val()) - 1);
// 	}
// 	updateAmount(cartId, indexId, productid, mid, amount.val(), userGroupId, sellableAmount);
// }
// //增加商品
// function addamount(cartId, indexId, productid, mid, userGroupId, sellableAmount) {
// 	var amount = jQuery("#amount" + cartId + "_" + indexId + "_" + productid);
// 	var oldAmount = jQuery("#oldAmount" + cartId + "_" + indexId + "_" + productid).val();
// 	if ((parseInt(oldAmount) - parseInt(amount.val())) == 1) {
// 		amount.val(Number(amount.val()) + 1);
// 		return;
// 	}
// 	if ((parseInt(amount.val()) + 1 > parseInt(sellableAmount))) {
// 		comAlert("对不起，库存不足！");
// 		return;
// 	} else {
// 		amount.val(Number(amount.val()) + 1);
// 	}
// 	updateAmount(cartId, indexId, productid, mid, amount.val(), userGroupId, sellableAmount);
// }
// //减少赠品
// function decamountZPbyCart(cartId, ruleId, presentid) {
// 	var suffix = cartId + "_" + ruleId;
// 	var decamount = jQuery("#present_amount" + suffix + '_' + presentid);
// 	if (decamount.val() > 1) {
// 		decamount.val(decamount.val() - 1);
// 	}
// 	setPresentCalcInfoView(cartId, ruleId);
// }
// //增加赠品
// function addamountZPbyCart(cartId, ruleId, presentid, currAmount, isinput) {
// 	//currAmount赠品的可卖数
// 	var suffix = cartId + "_" + ruleId;
// 	if(!valiCheckBoxAdd(cartId, ruleId, "all")){
// 		return;
// 	}
// 	var presentamount = jQuery("#present_amount" + suffix + '_' + presentid);
// 	if (Number(presentamount.val()) >= currAmount) {
// 		comAlert("对不起，优惠商品仅剩" + currAmount + "件可选!");
// 		presentamount.val(Number(currAmount));
// 		return false;
// 	} else {
// 		if (isinput == 1) {
// 			presentamount.val(Number(presentamount.val()) + 1);
// 		}
// 	}
// 	setPresentCalcInfoView(cartId, ruleId);
// }
// //删除赠品
// function delPresent(cartId, indexId, productId, presentId, amount, mid, userGroupId, ruleId) {
// 	comAlert("您确定要删除吗？",{"confirm":"确认","cancel":"取消"},function(){
// 		var curObj = $(".order_nav .hover_li");
// 		var curTab = curObj.attr("data-tab");
// 		var childAmount = jQuery("#childAmount" + cartId + "_" + indexId + "_" + productId + "_" + presentId + "_" + ruleId).val();
// 		var params = {};
// 		params["mid"] = mid;
// 		params["productid"] = productId;
// 		params["presentid"] = presentId;
// 		params["cartid"] = cartId;
// 		params["ruleid"] = ruleId;
// 		params["curTab"] = curTab;
// 		params["t"] = Math.random();
// 		if (childAmount > amount) {
// 			comAlert("对不起，删除的赠品数不能大于总的赠品数！");
// 		}
// 		if (childAmount == amount) {
// 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			jQuery.post(frontPath + "/delpresent.do", params, function() {
// 						callback_onlyRefreshCurrentCart(null, {"cartId":cartId,"mid":mid}); //刷新当前购物车
// 					});
//
// 		} else {
// 			//更新赠品(仅单品赠品，订单赠品不支持根据数量删除)需另外添加如下1个必要参数
// 			params["childamount"] = childAmount;
// 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			jQuery.post(frontPath + "/updatepresenttocart.do", params, function() {
// 				callback_onlyRefreshCurrentCart(null, {"cartId":cartId,"mid":mid});	//刷新当前购物车
// 			});
// 		}
// 	});
// }
//
// //规则赠品选购商品的计算信息
// function setPresentCalcInfoView(cartId, ruleId){
// 	var suffix = cartId + "_" + ruleId;
// 	var amount, weight, price, totalAmount=0, totalWeight=0, totalPrice=0, presentIdTemp;
// 	$("#rule" + suffix + " .galc_checked").each(function(){
// 		presentIdTemp = $(this).attr("data-value");
// 		amount = $("#present_amount" + suffix + "_" + presentIdTemp).val();
// 		weight = $("#present_weight" + suffix + "_" + presentIdTemp).val();
// 		price = $("#present_price" + suffix + "_" + presentIdTemp).val();
// 		totalAmount += parseInt(amount);
// 		totalWeight += parseFloat(weight) * parseInt(amount);
// 		totalPrice += parseFloat(price) * parseInt(amount);
// 	});
// 	//根据计算结果拼接显示
// 	if(totalAmount == 0){
// 		$("#present_calcinfo" + suffix).html("");
// 		return;
// 	}
// 	var content = "";
// 	if(totalPrice == 0){//满增
// 		content = "已选<strong>" + totalAmount + "</strong>件，重<strong>" + totalWeight.toFixed(2) + "</strong>kg";
// 	}else{
// 		content = "已选<strong>" + totalAmount + "</strong>件，重<strong>" + totalWeight.toFixed(2) + "</strong>kg"
// 		+ "，需加<strong class='gwbottom_price'>￥" + totalPrice.toFixed(2) + "</strong>";
// 	}
// 	$("#present_calcinfo" + suffix).html(content);
// }
//
// //规则赠品复选框校验有效性
// function valiCheckBox(cartId, ruleId, presentId) {
// 	var suffix = cartId + "_" + ruleId,	/*后缀*/
// 	presentIds = [];/*增品项id数组*/
// 	var checkBoxObj = $("#galc_checkbox" + suffix + "_" + presentId);
// 	var remainnumber = parseInt($("#rule" + suffix).attr("remainnumber"));
// 	if(presentId != "all"){
// 		//当不是表单提交前的校验时执行
// 		if(checkBoxObj.attr("data-defamount") <= 0){
// 			comAlert("对不起，该优惠商品已售完。");
// 			return;
// 		}
// 		if(checkBoxObj.attr("data-checked") == 0){
// 			checkBoxObj.addClass("galc_checked");
// 			checkBoxObj.attr("data-checked", "1");
// 		}else{
// 			checkBoxObj.removeClass("galc_checked");
// 			checkBoxObj.attr("data-checked", "0");
// 		}
// 	}
// 	var amount, totalAmount=0, presentIdTemp;
// 	$("#rule" + suffix + " .galc_checked").each(function(){
// 		presentIdTemp = $(this).attr("data-value");
// 		amount = $("#present_amount" + suffix + "_" + presentIdTemp).val();
// 		if(presentId == "all"){
// 			//当是表单提交前校验才给input赋值
// 			presentIds.push(presentIdTemp);
// 		}
// 		totalAmount += parseInt(amount);
// 	});
// 	if(presentId == "all"){
// 		$("#present_form" + suffix + " input[name='presentids']").val(presentIds.join(","));
// 	}else{
// 		setPresentCalcInfoView(cartId, ruleId);
// 	}
//
// 	if (totalAmount == 0 && presentId == "all") {
// 		comAlert("您尚未选择优惠商品，是否返回购物车？",{"confirm":"确认","cancel":"取消"},function(){
// 			location.href = frontPath + "/Cart/ShowCart.do?cartid=" + cartId +"&tt=" +Math.random();
// 			$(".close_a").click();
// 		});
// 		return false;
// 	}else if (remainnumber < totalAmount) {
// 		if(presentId != "all"){
// 			checkBoxObj.removeClass("galc_checked");
// 			checkBoxObj.attr("data-checked", "0");
// 			setPresentCalcInfoView(cartId, ruleId);
// 		}
// 		comAlert("您在本类别下最多能选择" + remainnumber + "件优惠商品。");
// 		return false;
// 	}
// 	return true;
// }
// function valiCheckBoxAdd(cartId, ruleId, presentId) {
// 	var suffix = cartId + "_" + ruleId,	/*后缀*/
// 	presentIds = [];/*增品项id数组*/
// 	var checkBoxObj = $("#galc_checkbox" + suffix + "_" + presentId);
// 	var remainnumber = parseInt($("#rule" + suffix).attr("remainnumber"));
// 	if(presentId != "all"){
// 		//当不是表单提交前的校验时执行
// 		if(checkBoxObj.attr("data-defamount") <= 0){
// 			comAlert("对不起，该优惠商品已售完。");
// 			return;
// 		}
// 		if(checkBoxObj.attr("data-checked") == 0){
// 			checkBoxObj.addClass("galc_checked");
// 			checkBoxObj.attr("data-checked", "1");
// 		}else{
// 			checkBoxObj.removeClass("galc_checked");
// 			checkBoxObj.attr("data-checked", "0");
// 		}
// 	}
// 	var amount, totalAmount=0, presentIdTemp;
// 	$("#rule" + suffix + " .galc_checked").each(function(){
// 		presentIdTemp = $(this).attr("data-value");
// 		amount = $("#present_amount" + suffix + "_" + presentIdTemp).val();
// 		if(presentId == "all"){
// 			//当是表单提交前校验才给input赋值
// 			presentIds.push(presentIdTemp);
// 		}
// 		totalAmount += parseInt(amount);
// 	});
// 	totalAmount = totalAmount+1;
// 	if(presentId == "all"){
// 		$("#present_form" + suffix + " input[name='presentids']").val(presentIds.join(","));
// 	}else{
// 		setPresentCalcInfoView(cartId, ruleId);
// 	}
//
// 	if (totalAmount == 0 && presentId == "all") {
// 		comAlert("您尚未选择优惠商品，是否返回购物车？",{"confirm":"确认","cancel":"取消"},function(){
// 			location.href = frontPath + "/Cart/ShowCart.do?cartid=" + cartId +"&tt=" +Math.random();
// 			$(".close_a").click();
// 			return false;
// 		},function(){
// 			return false;
// 		});
// 	}else if (remainnumber < totalAmount) {
// 		if(presentId != "all"){
// 			checkBoxObj.removeClass("galc_checked");
// 			checkBoxObj.attr("data-checked", "0");
// 			setPresentCalcInfoView(cartId, ruleId);
// 		}
// 		comAlert("您在本类别下最多能选择" + remainnumber + "件优惠商品。");
// 		return false;
// 	}
// 	return true;
// }
// /*//提交规则赠品表单
// function submitPresentForm(cartId, ruleId) {
// 	var suffix = cartId + "_" + ruleId;
// 	if(!valiCheckBox(cartId, ruleId, "all")){
// 		return;
// 	}
// 	var curObj = $(".order_nav .hover_li");
// 	var curTab = curObj.attr("data-tab");
// 	$("#curTab" + suffix).val(curTab);
// 	var url = frontPath + "/addpresenttocart.do" +"?tt=" +Math.random();
// 	document.getElementById("present_form" + suffix).action = url;
// 	document.getElementById("present_form" + suffix).submit();
// 	$(".close_a").click();
// }*/
// // 新提交规则赠品表单
// var checkPresentForm = (function() {
//      var check = true;    //私有变量
//      var that = {}; //new某个类
//      //公开接口
//      that.submitForm = function(cartMid, cartId, ruleId ,presentId){
// 		if(!check){
// 			return;
// 		}
// 		check = false;
// 		var params = new Object;
// 		params["mid"] = cartMid;
// 		params["cartid"] = cartId;
// 		params["ruleid"] = ruleId;
// 		params["curTab"] = $(".order_nav .hover_li").attr("data-tab");
// 		params["presentids"] = presentId;
// 		params["present_amount" + cartId + "_" + ruleId + "_" + presentId] = 1;
// 		var url = frontPath + "/addpresenttocart.do" +"?tt=" +Math.random();
// 		$.post(url, params, function(){
// 			try{
// 				var $this = $('#sales_'+presentId);
// 				var articleName = $this.attr('title');
// 				var action = $this.attr('data-ga');
// 				product_add(presentId,articleName,action);
// 			}catch(e){}//ga检测码，增加购物车
// 			location.reload();
// 		});
// 	}
//     return that;   //返回单例
// })();
// function submitPresentForm(cartMid, cartId, ruleId ,presentId) {
// 	checkPresentForm.submitForm(cartMid, cartId, ruleId ,presentId);
// }
//
// function setCartItemsBgColor(){
// 	$(".order_contents:visible").find(".items").each(function(){
// 		if($(this).index()%2 == 1){
// 			$(this).removeClass("odd_content").addClass("even_content");
// 		}
// 	});
// }
// //20130509 新增 X元任选Y件 右侧内容竖直方向居中
// function setCartItemsRightMarign(){
// 	$(".ct6_div_right").each(function(){
// 		var ct6_left_height = $(this).siblings(".ct6_div_left").height();
// 		var ct6_right_height = $(this).height();
// 		$(this).css("margin-top",(ct6_left_height-ct6_right_height)/2);
// 	});
// }
// function setDeleteOperateEvents(){
//
// 	//修改X元Y件商品链接
// 	$(".ct6line_a_xy").click(
// 		function(){
// 			if($(this).attr("data-first") == "y"){
// 				$(this).attr("data-first","n");
// 				var ruleId = $(this).attr("data-ruleid");
// 		   		if(!ruleId)return;
// 				var params = {};
// 				params["mid"] = mid;
// 				params["ruleid"] = ruleId;
// 				params["operatetype"] = "update";
// 				location.href = frontPath + "/promotionxy.do?" + $.param(params) + "&callback=?";
// 				//等待X元Y件的修改按钮，防止重复点击
// 				$(this).html("请稍候...");
// 			}
// 		}
// 	);
// }
//
// // 已选商品(含预估运费) + 加载小结算图标按钮
// function loadtopaybtn(curTab){
// 	var strTotal = $('#j-totaltopay'+curTab).html(); // 应付金额
// 	var topaybtn = $('.btn .topay'+curTab);
// 	if(topaybtn.length > 0){
// 		var htmlbtn = topaybtn.clone(true);
// 		htmlbtn.attr("id" , htmlbtn.attr("id") + 2);
// 		if(htmlbtn.attr("class").indexOf("no") > 0){
// 			htmlbtn.attr("class" , "fr topay topay1 no");
// 		}else{
// 			htmlbtn.attr("class" , "fr topay topay1");
// 		}
// 		htmlbtn.html("");
// 		$('#j-totalwithdeliveryrule').html("<span class='fl'>已选商品(含预估运费)：<em id='j-totalwithdelivery'>" + strTotal + "</em></span></div>");
// 		$('#j-totalwithdeliveryrule').append(htmlbtn).append("<div class='clear'>");
// 	}else{
// 		$('#j-totalwithdeliveryrule').html("<span class='fl'>已选商品(含预估运费)：<em id='j-totalwithdelivery'>" + strTotal + "</em></span><div class='clear'></div>");
// 	}
// }
//
// function initCartMenuEvents(){
// 	//购物车订单导航 切换
// 	$(".order_nav").find("ul li").click(function(){
// 		//购物车订单导航切换时，只要不是跨境购的购物车列表就隐藏小提示    yuanli 2016/7/15
// 		if($(this).attr("data-index") != 7){
// 			$(".crossordertip").hide();
// 		} else {
// 			if($('.crossseller').length > 1){
// 				$(".crossordertip").show();
// 			}
// 		}
// 		$(this).addClass("hover_li").siblings().removeClass("hover_li");
// 		var index_li = $(this).attr("data-index")-1;
// 		//获取当前页签的相关购物车参数
// 		var curtab = $(this).attr("data-tab")==null ? 1 : $(this).attr("data-tab");
// 		//获取当前购物车页签对象
// 		var curObj = $(".ordercont_content").eq(index_li);
// 		if(curObj.attr("data-first") == "y"){//判断是否首次，首次加载的页签需要发请求
// 			curObj.attr("data-first","n");
// 			var uri = frontPath + "/cart/loadcartcontent.do";
// 			params={curTab:curtab,"t":Math.random()};
// 			$.post(uri, params, function(data){
// 				curObj.html(data);
// 				setTimeout(function(){
// 					initCartItemsEvents();
// 				},50);
// 			});
// 		}
// 		if( curtab != 1){
// 			$('.delivery-tip').hide();
// 			$('#j-totalwithdeliveryrule').hide();
// 		}else{
// 			$('.delivery-tip').show();
// 			$('#j-totalwithdeliveryrule').show();
// 		}
// 		/*
// 		// 修改运费以后切换导航重新计算运费
// 		if(curObj.attr("data-delivery") == "y"){
// 			curObj.attr("data-delivery","n");
// 			var totalPrice = $('#j-totaltopay'+curtab).html().replace("￥", "");
// 			loadCartDeliveryRule(totalPrice, mid);
// 		}
// 		// 已选商品(含预估运费) + 加载小结算图标按钮
// 		loadtopaybtn(curtab);
// 		*/
// 		curObj.show().siblings(".ordercont_content").hide();
// 	});
// }
//
// //初始化刷新购物车项时的相关事件
// function initCartItemsEvents(){
// 	showPhonehover(); // 手机悬浮效果
// 	initCartMenuEvents();
// 	setCartItemsBgColor();
// 	setDeleteOperateEvents();
// 	setPresentsEvents();
// 	initCombiProductLater();
// 	setCartTitleInfo();
// 	valiCartInfoIconShow();
// 	setCartItemsRightMarign();  //20130509 新增 X元任选Y件 右侧内容竖直方向居中
// 	setLookAndBuyEvents();
// 	set_mahout_request();
// }
//
// function setLookAndBuyEvents(){
// 	// 猜你喜欢 -- 最近收藏 -- 点击事件
// 	$('.golist_title ul li').live("click",function(){
// 		$(this).addClass('current').siblings().removeClass('current');
// 		var index = $(this).index();
// 		$('.golist_all').find('.golist_content').eq(index).show().siblings('.golist_content').hide();
// 		set_mahout_request();
// 	});
// }
// //初始化组合商品交互列表
// function initCombiProductLater(){
// 	$(".contype1_cont1").hover(function(){
// 		$(this).addClass("contype1_cont1_h");
// 		var h=$(this).find(".combiproductlist").height(), t=0;
// 		if(h == 0){h = 18}
// 		//if(h < 60){t = "23px"}
// 		$(this).find(".combiproductlist_totalamount").css({"line-height":h + "px"});
// 		//$(this).find(".combiproductlist").css("top",t);
// 	},function(){
// 		$(this).removeClass("contype1_cont1_h");
// 	});
// }
// //根据当前购物车页签标题设置当前结算购物车的标题信息
// function setCartTitleInfo(){
// 	var curObj = $(".order_nav .hover_li");
// 	var curTab = curObj.attr("data-tab");
// 	//更新当前购物车商品数量
// 	var totalamount = $("#loadshowcart" + curTab +"carttitle_totalamount_val").val();
// 	if(parseFloat(totalamount) >= 0){
// 		curObj.find(".carttitle_totalamount").html(totalamount);
// 	}
// }
// //当未配置促销信息时，不现实小图标
// function valiCartInfoIconShow(){
// 	if($.trim($(".oal_content").html()) == ""){
// 		$(".oal_img").hide();
// 	}
// }
//
// //手机优惠悬停效果
// function showPhonehover(){
// 	$('.j-phone').hover(function(){
// 		$(this).find('.phone-hover').show();
// 	},function(){
// 		$(this).find('.phone-hover').hide();
// 	});
// 	//加入购物车显示
// 	$('.pro-img li').hover(function(){
// 		$(this).addClass('hover');
// 	},function(){
// 		$(this).removeClass('hover');
// 	});
// 	deliveryadd();
// }
// //设置赠品、加价购 弹出层事件
// function setPresentsEvents(){
// 	/*//赠品、加价购 弹出框
// 	$(".gift_a").click(
// 		function(){
// 			$(".giveaway_popup").hide();
// 			$(".giveaway_popup").parent().removeClass("rellayer");
// 			var curObj = $(this).siblings(".giveaway_popup"),
// 			num = curObj.find(".galist_content").length;
// 			if(num > 4){
// 				curObj.addClass("giveaway_popup_h");
// 			}
// 			//ie6兼容性问题
// 			$(this).parent().addClass("rellayer");
// 			curObj.show();
// 		}
// 	);
//
// 	//赠品、加价购 弹出框，关闭按钮
// 	$(".close_a").click(
// 		function(){
// 			$(this).parents(".giveaway_popup").hide();
// 		}
// 	);*/
//
// 	//凑单免邮规则切换
// 	/*$('.ordercont_content_cw').each(function(){
// 		var mian = $(this).find('.mian'); // 免邮是否存在
// 		if (mian.is(':visible')){ // 如果免邮
// 			var li = $(this).find('.sales-promotion .tit li'); // 凑单免邮标题
// 			li.eq(0).hide();
// 			li.parent().siblings('.cont').eq(0).hide(); // 凑单免邮内容
// 			if(li.length == 1){ //如果只有一个免邮规则
// 				$(this).find('.sales-promotion').hide();
// 			}
// 			else{
// 				li.eq(1).addClass('cur').parent().siblings('.cont').eq(1).css('display','block'); // 展示第二个规则标题及内容
// 			}
// 		}
// 	});*/
//
// 	// 猜你喜欢、最近收藏点击切换
// 	$('.golist_title ul li').click(function(){
// 		$(this).addClass('current').siblings().removeClass('current');
// 		var index = $(this).index();
// 		$('.golist_all').find('.golist_content').eq(index).show().siblings('.golist_content').hide();
// 	});
// }
// //促销商品规则
// function initTitRule(cartid){
// 	var saleRuleProduct = $('.j-total' + cartid).find('.tit li'); // 规则标题
// 	if(saleRuleProduct.length > 0){
// 		$('.j-total' + cartid).show();
//
// 		saleRuleProduct.hover(function(){
// 		 	$(this).addClass('cur');
// 		},function(){
// 			var i = $(this).index();
// 			var display = $(this).parent().siblings('.cont').eq(i).css('display');
// 			if('block' != display){
// 				$(this).removeClass('cur');
// 			}
// 		});
//
// 		saleRuleProduct.click(function(){
// 			var i = $(this).index() - 1;
// 			var $this = $(this).parent().siblings('.cont').eq(i);
// 			var display = $this.css('display');
// 			if('block' != display){
// 			 	$(this).addClass('curtit').siblings().removeClass('curtit').removeClass('cur');
// 			 	$this.css('display','block').siblings('.cont').hide();
// 			}else{
// 			 	$(this).removeClass('cur');
// 			 	$(this).removeClass('curtit');
// 			 	$this.css('display','none').hide();
// 			}
// 			var len = $this.find('.pro-img li').length;
// 			var icondiv = $this.find('.pro-icon');
// 			icondiv.html('<li class="fl cur"></li>');
// 			while(len > 8) {
// 				icondiv.html('<li class="fl"></li>');
// 				len = len - 8 ;
// 			}
// 			if (len <= 8) {
// 				icondiv.hide();
// 			}
// 		});
//
// 		//加入购物车显示
// 		$('.pro-img li').hover(function(){
// 			$(this).addClass('hover');
// 		},function(){
// 			$(this).removeClass('hover');
// 		});
//
// 		//如果促销商品少于8个 轮播小图标隐藏
// 		$('.j-total'+cartid+' .cont').each(function(){
// 			var len = $(this).find('.pro-img').find('li').length;
// 			var index = $(this).index() - 2 ;
// 			var icondiv = $(this).find('.pro-icon');
// 			icondiv.html('<li class="fl cur"></li>');
// 			if (len <= 8) {
// 				icondiv.hide();
// 			}else{
// 				icondiv.html('<li class="fl cur"></li>');
// 				while(len > 8) {
// 					icondiv.append('<li class="fl"></li>');
// 					len = len - 8 ;
// 				}
// 			}
// 		});
//
// 		//促销商品轮播
// 		$('.pro-icon li').hover(function(){
// 			var index = $(this).index();
// 			//获取当前页数开始的索引
// 			var startNum = index*8;
// 			//获取当前页数结束的索引
// 			var endNum = (index+1)*8;
// 			//图标显示
// 			$(this).addClass('cur').siblings().removeClass('cur');
// 			$(this).parent().siblings('ul').find('li').hide();
// 			$(this).parent().siblings('ul').find('li').slice(startNum,endNum).show();
// 		});
// 	}
// }
//
// // 初始化规则事件
// function setRelationFree(cartid){
// 	var saleRuleProduct = $('.j-total' + cartid).find('.tit li'); // 规则标题
// 	saleRuleProduct.hover(function(){
// 	 	$(this).addClass('cur');
// 	},function(){
// 		 var i = $(this).index();
// 		 var display = $(this).parent().siblings('.cont').eq(i).css('display');
// 		 if('block' != display){
// 		 	$(this).removeClass('cur');
// 		 }
// 	});
//
// 	saleRuleProduct.click(function(){
// 		 var i = $(this).index() - 1;
// 		 var $this = $(this).parent().siblings('.cont').eq(i);
// 		 var display = $this.css('display');
// 		 if('block' != display){
// 		 	$(this).addClass('curtit').siblings().removeClass('curtit').removeClass('cur');
// 		 	$this.css('display','block').siblings('.cont').hide();
// 		 	var len = $this.find('.pro-img li').length;
// 			var icondiv = $this.find('.pro-icon');
// 			if (len <= 8) {
// 				icondiv.hide();
// 			}else{
// 				 icondiv.html('<li class="fl cur"></li>');
// 				 while(len > 8) {
// 					icondiv.append('<li class="fl"></li>');
// 					len = len - 8 ;
// 				 }
// 			}
// 			//促销商品轮播
// 			$('.pro-icon li').hover(function(){
// 				var index = $(this).index();
// 				//获取当前页数开始的索引
// 				var startNum = index*8;
// 				//获取当前页数结束的索引
// 				var endNum = (index+1)*8;
// 				//图标显示
// 				$(this).addClass('cur').siblings().removeClass('cur');
// 				$(this).parent().siblings('ul').find('li').hide();
// 				$(this).parent().siblings('ul').find('li').slice(startNum,endNum).show();
// 			});
// 		 }else{
// 		 	$(this).removeClass('cur');
// 		 	$(this).removeClass('curtit');
// 		 	$this.css('display','none').hide();
// 		 }
// 	});
// 	//加入购物车显示
// 	$('.pro-img li').hover(function(){
// 		$(this).addClass('hover');
// 	},function(){
// 		$(this).removeClass('hover');
// 	});
//
// 	//初始化如果促销商品少于8个 轮播小图标隐藏
// 	$('.j-total'+cartid+' .cont').each(function(){
// 		var len = $(this).find('.pro-img').find('li').length;
// 		var index = $(this).index() - 2 ;
// 		var icondiv = $(this).find('.pro-icon').eq(index);
// 		icondiv.html('<li class="fl cur"></li>');
// 		if (len <= 8) {
// 			icondiv.hide();
// 		 }else{
// 			 icondiv.html('<li class="fl cur"></li>');
// 			 while(len > 8) {
// 				icondiv.append('<li class="fl"></li>');
// 				len = len - 8 ;
// 			 }
// 		 }
// 	});
//
// 	//促销商品轮播
// 	$('.pro-icon li').hover(function(){
// 		var index = $(this).index();
// 		//获取当前页数开始的索引
// 		var startNum = index*8;
// 		//获取当前页数结束的索引
// 		var endNum = (index+1)*8;
// 		//图标显示
// 		$(this).addClass('cur').siblings().removeClass('cur');
// 		$(this).parent().siblings('ul').find('li').hide();
// 		$(this).parent().siblings('ul').find('li').slice(startNum,endNum).show();
// 	});
// }
// //底部凑单、猜你喜欢商品事件设置
// /*
// function setRelationProdsEvents(className){
// 	var curObj =  $(".order_contents:visible").find("." + className);
// 	//凑单商品、猜你喜欢 右侧收起按钮
//     curObj.find(".up_a").click(
// 	   function () {
// 	   		$(this).hide();
// 			$(this).parent().find(".down_a").show();
// 			$(this).parent().find(".up_img").addClass("down_img");
// 			$(this).parents(".goods_list").find(".golist_content").hide();
// 	   }
// 	);
//
// 	//凑单商品、猜你喜欢 右侧展开按钮
//     curObj.find(".down_a").click(
// 	   function () {
// 	   		$(this).hide();
// 			$(this).parent().find(".up_a").show();
// 			$(this).parent().find(".up_img").removeClass("down_img");
// 			$(this).parents(".goods_list").find(".golist_content").show();
// 	   }
// 	);
//
// 	//凑单商品、猜你喜欢 默认状态
// 	var num_li = curObj.find(".listcon_ul li").length;
// 	var length_ul = curObj.find(".listcon_ul li").width()*num_li;
// 	if(num_li>5){
// 		curObj.find(".listcon_ul").width(length_ul);
// 		curObj.find(".listcont_prew").hide();
// 		curObj.find(".prew_noclick").show();
// 		curObj.find(".listcont_next").show();
// 		curObj.find(".next_noclick").hide();
// 		curObj.find(".golist_content .pages").html("1/2");
// 	}else {
// 		curObj.find(".listcon_ul").find("li").last().addClass("last_li");
// 		curObj.find(".listcon_ul").width(length_ul);
// 		curObj.find(".listcont_prew").hide();
// 		curObj.find(".prew_noclick").show();
// 		curObj.find(".listcont_next").hide();
// 		curObj.find(".next_noclick").show();
// 		curObj.find(".golist_content .pages").html("1/1");
// 	}
//
// 	//凑单商品、猜你喜欢 左滑动
// 	curObj.find(".listcont_prew").click(function(){
// 		$(this).siblings(".hidden_content").animate({scrollLeft:0},500);
// 		$(this).siblings(".prew_noclick").show();
// 		$(this).hide();
// 		$(this).siblings(".listcont_next").show();
// 		$(this).siblings(".next_noclick").hide();
// 		curObj.find(".golist_content .pages").html("1/2");
// 	});
//
// 	curObj.find(".listcont_prew").hover(function(){
// 		$(this).addClass("prew_hover");
// 	},function(){
// 		$(this).removeClass("prew_hover");
// 	});
//
// 	//凑单商品、猜你喜欢 右滑动
// 	curObj.find(".listcont_next").click(function(){
// 		var foot_width = ($(this).siblings(".hidden_content").find(".listcon_ul li").width())*5;
// 		$(this).siblings(".hidden_content").animate({scrollLeft:foot_width},500);
// 		$(this).siblings(".next_noclick").show();
// 		$(this).hide();
// 		$(this).siblings(".listcont_prew").show();
// 		$(this).siblings(".prew_noclick").hide();
// 		curObj.find(".golist_content .pages").html("2/2");
// 	});
//
// 	curObj.find(".listcont_next").hover(function(){
// 		$(this).addClass("next_hover");
// 	},function(){
// 		$(this).removeClass("next_hover");
// 	});
// }
// */
// // 展示凑单商品 目前只有普通、生鲜车
// function showRelationFree(cartid){
// 	// 如果凑单免邮有商品，展示凑单免邮
// 	var showcurTab = $('.j-relationFree' + cartid); // 查找凑单免邮的标题
// 	showcurTab.addClass('curtit').show();  // 展示，并且标红
// 	var saleRuleProduct = $('.sales-promotion .j-total' + cartid + '.tit li'); // 查找对应的规则内容
// 	saleRuleProduct.eq(0).siblings().removeClass('cur'); // 凑单免邮标红，其他规则标题去除标红
// 	saleRuleProduct.find('.cont').eq(0).css('display','block').siblings('.cont').hide();// 查找凑单免邮对应的内容显示，并且隐藏其他内容
// 	// 标题show
// 	$('.j-total' + cartid).show();
// }
// // 隐藏凑单商品及规则
// function hideRelationFree(cartid){
// 	var showcurTab = $('.tit .j-relationFree' + cartid); // 查找凑单免邮的标题
// 	var lis = showcurTab.parent().find('li'); // 规则的标题
// 	if(lis.length <= 1){
// 		showcurTab.parents('.sales-promotion').hide(); // 只有凑单免邮一个规则，全部都隐藏
// 	}else{
// 		showcurTab.hide();  // 只隐藏凑单商品
// 		var saleRuleProduct = showcurTab.parent().parent().find('.cont'); // 查找对应的规则内容
// 		saleRuleProduct.eq(saleRuleProduct.length - 1).hide();// 查找凑单免邮对应的内容显示，并且隐藏其他内容
// 		showcurTab.parents('.sales-promotion').show();
// 		firstBuyRule.showFirstBuyRule(cartid);
// 		/*
// 		lis.eq(1).addClass('cur'); // 隐藏凑单免邮内容后，展示别的规则
// 		saleRuleProduct.eq(1).show();
// 		*/
// 	}
// }
// // 获取凑单商品ids
// function initRelationFree(cartid){
// 	var relationFree = $('#j-relationFreeConfig' + cartid);
// 	var mid = relationFree.attr("data-mid");
// 	var sellerId = relationFree.attr("data-sellerid");
// 	var type = relationFree.attr("data-type");
// 	if(parseFloat(sellerId) > 0)return;
// 	if(parseFloat(sellerId) > 0){
// 		serverDomain = sellerServer;
// 	}
// 	var params = {};
// 	params.param = "freeshipping";
// 	params.isType = type;
// 	params.mid = mid;
// 	params.t = Math.random();
// 	$.post(frontPath + "/cart/relationfree.do",params,function(data){
// 		var ids = trimComma(data);
// 		if(ids){
// 			loadProducts(show_relationFree, {"mid" : mid , "cartid" : cartid}, ids, mid, "pic150", 0, ["buyPrice","marketPrice"], "title", [],"true");
// 		}else{
// 			// 没有凑单免邮 初始化规则标题
// 			setRelationFree(cartid);
// 			// 删除凑单免邮标题 以及 内容div
// 			$('.j-relationFree' + cartid).remove();
// 			$('#j-relationFree' + cartid).remove();
// 			// 隐藏凑单免邮内容后，展示别的规则
// 			$('.j-total' + cartid).show();
// 			var saleRuleProduct = $(".j-total" + cartid).find('li'); // 规则标题
// 			saleRuleProduct.eq(0).addClass('cur');
// 			saleRuleProduct.parent().siblings('.cont').eq(0).show();
// 		}
// 	});
// }
// // 凑单商品
// function show_relationFree(data,callbackParams){
// 	if(!valiLoadProductsData(data)){
// 		return;
// 	}
// 	var mid = callbackParams.mid;
// 	var cartid = callbackParams.cartid;
// 	var result = data.result;
// 	var content="", productid=0, picPath="", productUrl="", onclickStr="", buyPrice="", marketPrice="", serverDomain="";
// 	content += '<div class="tip">凑单免邮</div>';
// 	content += '<ul class="pro-img">';
// 	for(var i=0;i<result.length && i<16;i++){
// 		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;//我买价
// 		marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;//市场价
// 		productid = result[i].id;//商品ID
// 		picPath = result[i].pics.pic150[0];
// 		picPath = picPrefix + (picPath == null ? 'notfound150.gif' : picPath);
// 		productUrl = serverDomain + frontPath + "/Product-" + mid + "-" + productid + ".htm";
// 		content += '<li class="fl">';
// 		content += '<dt class="fl"><a href=' + productUrl + ' target="_blank" title=' + result[i].title + ' id="_gatrack_productlist_listpic_'+productid+'" data-ga="sales-promotion" data-gzpid="'+productid+'"><img src=' + picPath + ' alt='+result[i].title+' /></a></dt>';
// 		content += '<dd class="fl">';
// 		content += '<div class="name"><a href=' + productUrl + ' id="_gatrack_productlist_listtitle-'+productid+'">' + result[i].title + '</a></div>';
// 		content += '<div><strong>￥' + buyPrice + '</strong>';
// 		/* 屏蔽我买价
// 		if(parseFloat(marketPrice) > 0){
// 			content += '<span>￥' + marketPrice + '</span></div>';
// 		}*/
// 		content += '</dd><div class="clear"></div>';
// 		content += '<div class="btn"><a id="free_'+productid+'" href="javascript:isGoToCart(' + productid + ',' + mid + ');isGoToCartWait(\'free_'+productid+'\');">放入购物车</a></div>';
// 		content += '</li>';
// 		if((i + 1)%4 == 0){
// 			content += '<div class="clear"></div>';
// 		}
// 	}
// 	content += '<div class="clear"></div>';
// 	content += '</ul>';
// 	content += '<ul class="pro-icon"><li class="fl cur"></li>';
// 	// 默认有一个小绿点
// 	for(var i = 8 ; i < result.length ; ){
// 		content += '<li class="fl"></li>';
// 		i = i + 8 ;
// 	}
// 	content += '</ul>';
// 	if(content){
// 		// 凑单内容
// 		var curObj = $("#j-relationFree" + cartid);
// 		curObj.html(content);
// 		// 凑单内容 + 标题
// 		// $(".j-relationFree" + cartid).show();
// 		setRelationFree(cartid);
// 	}
// }
// //凑单商品、猜你喜欢的加入等待提示
// function isGoToCartWait(id){
// 	$("#" + id).html("<span>请稍候...</span>");
// 	setTimeout(function(){
// 		$("#" + id).attr("href","javascript:;");
// 	},100);
// }
// //扩大单选按钮选择范围
// function expandRdoRange(rdoId){
// 	var $rdoId = $("#" + rdoId);
// 	if($rdoId.attr("disabled") == false){
// 		$rdoId.attr("checked",true);
// 	}
// }
//
// //勾选或者取消勾选单个购物车项
// function selectCartItem(cartId){
//
// }
// //勾选或者取消勾选所有购物车项
// function selectAllCartItem(id,mid){
// 	var selFlag = $("#"+id).attr("checked");
// 	var cartids = $("#"+id).attr("cartids");
//     jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 	var params = new Object();
// 	params["selFlag"] = selFlag;
// 	params["cartIds"] = cartids;
// 	jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 		if(mid == 300){
// 			mid = 0 ;
// 		}
// 		callback_onlyRefreshCurrentCart(data,{"mid":mid});
// 		if(data != 1 && data.indexOf("10:") == -1 && data.indexOf("11:") == -1){
// 			comAlert(data);
// 		}
// 	});
// }
// //删除已经勾选的商品
// function delSelectedCartItem(obj){
// 	comAlert("您确定要删除吗？",{"confirm":"确定","cancel":"取消"},function(){
// 		var productid = $(obj).attr("data-productid");
// 		if(!productid)return;
// 		var cartId = $(obj).attr("data-cartid");
// 		if(cartId == undefined){
// 			cartId = $(obj).attr("data-id");
// 		}
// 		var mid = $(obj).attr("data-mid");
// 		var curObj = $(".order_nav .hover_li");
// 		var curTab = curObj.attr("data-tab");
//
// 		//判断该商品是否为售罄删除  1：售罄；0：未售罄
// 		var issellout = $(obj).attr("data-issellout");
// 		if(issellout == undefined){
// 			issellout = 0;
// 		}
// 		var params ={"mid":mid,"cartid":cartId,"productid":productid,"isSellOut":issellout,"curTab":curTab,"t":Math.random()};
// 		//emarbox 监测码，删除购物车；20130902_zhaogangqiang
// 		try{deleteOneItem(productid);}catch(e){}
// 		try{product_delete(productid);}catch(e){}//ga检测码，删除购物车
// 		var issel = 1;
// 	    issel = $("#sel"+productid).attr("issel");
// 		if(issel == 0){
// 			setTimeout(function(){
// 	   			$.post(frontPath + "/delunselcartitem.do",params,function(data, status){
// 	   				callback_onlyRefreshCurrentCart(data, {"cartId":cartId,"mid":mid});
// 	   			});},50);
// 		}else{
// 			setTimeout(function(){
// 	   			$.post(frontPath + "/delcartitem.do",params,function(data, status){
// 	   				callback_onlyRefreshCurrentCart(data, {"cartId":cartId,"mid":mid});
// 	   			});},50);
// 		}
// 	});
// }
// //删除已经勾选的XY商品
// function delSelectedXYCartItem(obj){
// 	comAlert("您确定要删除吗？",{"confirm":"确定","cancel":"取消"},function(){
//    		var ruleId = $(obj).attr("data-ruleid");
//    		if(!ruleId)return;
// 		var cartId = $(obj).attr("data-cartid");
// 		var mid = $(obj).attr("data-mid");
//    		var params ={"mid":mid,"cartid":cartId,"ruleid":ruleId,"t":Math.random()};
//    		// 删除X元Y件controller返回信息与js处理不符，暂时不传回调data
//    		$.post(frontPath + "/delcartitemxy.do",params,function(data, status){callback_onlyRefreshCurrentCart("", {"cartId":cartId,"mid":mid})});
// 	});
// }
// //删除已经勾选的购物车
// function delSelectedCart(mid,tab){
// 	var params = new Object();
// 	params["tt"] = Math.random();
// 	var cartids = $("#delSelCartItems"+tab).attr("cartids");
// 	var todel = $("#delSelCartItems"+tab).attr("todel");
// 	if(todel == '2'){
// 		comAlert("请选择您要删除的商品");
// 		return;
// 	}else{
// 		comAlert("您确定要删除吗？",{"confirm":"确定","cancel":"取消"},function(){
// 			params["cartIds"] = cartids;
// 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			jQuery.post(frontPath + "/delSelectCartItem.do", params, function(data) {
// 				callback_onlyRefreshCurrentCart(data, {"mid":mid});
// 				if(data != 1 && data.indexOf("10:") == -1 && data.indexOf("11:") == -1){
// 					comAlert(data);
// 				}
// 			});
// 		});
// 	}
// 	return false;
// }
// function deleteAllSelHide(){
// 	$('.delete_all').siblings('.del_all_popup,.top_img').hide();
// 	return false;
// }
//
// function initpreference() {
// 	$('.preference').hover(function() {
// 		var $this = $(this);
// 		$(this).find('span').show();
// 	}, function() {
// 		$(this).find('span').hide();
// 	})
// }
// function initsevendays() {
// 	$('.sevendays').hover(function() {
// 		$(this).find('span').show();
// 	}, function() {
// 		$(this).find('span').hide();
// 	})
// }
//
// $(function (){
// 	if(flag != null && flag == true){
// 		comAlert("每日鲜商品与生鲜预售商品不能在同一购物车下单，请选择需要保留的商品。",{"confirm":"确定"});
// 	}
// });
//
// function confinedArea(){
// 	if (c_pId && c_pId.length > 0) {
// 		var isHasBuyer = $('#isHasBuyer').val();
// 		addproductlimit(c_pId); //添加限免
// 		comAlert("您购买的部分商品无法配送到选定地址，请重新选择地区或删除商品！",{"confirm":"重新选择地区","cancel":"删除商品"},
// 			function(){
// 				var isHasBuyer = $('#isHasBuyer').val();
// 				var curtabName = $("#curtabName").val();
// 				var value = jQuery.cookie("isSJ");//是否撒娇结算
// 				if(value == 1){//如果是1表示是撒娇购物
// 					topayforsj(isHasBuyer,curtabName);
// 				}else if(value == 2){//如果是2表示是普通购物
// 					topay(isHasBuyer,curtabName);
// 				}
// 			},
// 			function(){
// 			var params = new Object();
// 			params["tt"] = Math.random();
// 			params["ids"] = c_pId;
// 			$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			$.post(frontPath + "/cancelSelectCartItem.do", params, function(data) {
// 				callback_onlyRefreshCurrentCart(data, {"mid" : mid});
// 				if (data != 1 && data.indexOf("10:") == -1 && data.indexOf("11:") == -1) {
// 					comAlert(data);
// 				}
// 				c_pId = "";
// 			});
// 		});
// 	}
// }
//
// //取消选择每日鲜或者生鲜预售     仅供每日鲜使用
// function selectEveryDayFreshCartItem(cartId,productids,userGroupId){
// 	var params = new Object();
// 	params["productids"] = productids;
// 	params["mid"] = mid;
// 	params["cartid"] = cartId;
// 	params["userGroupId"] = userGroupId;
// 	jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 	jQuery.post(frontPath + "/selectCartItem.do", params, function(data) {
// 		callback_onlyRefreshCurrentCart(data, {"mid":mid});
// 		if(data != 1 && data.indexOf("10:") == -1 && data.indexOf("11:") == -1){
// 			comAlert(data);
// 		}
// 	});
// }
//
// function getAlertMsg(){
// 	comAlert("每日鲜商品与生鲜预售商品不能在同一购物车下单，请选择需要保留的商品。",{"confirm":"保留每日鲜","cancel":"保留生鲜预售"},
// 		function(){
// 			selectEveryDayFreshCartItem(cartId, ifBuySalePids,userGroupId);
// 		},
// 		function(){
// 			selectEveryDayFreshCartItem(cartId, everyDayFreshPids,userGroupId);
// 	});
// 	$('#alertmsg_close10000').hide();
// }
//
// // 配送提示 20150324
// function loadArealist(mid,cartid1,cartid2,cartid3){
// 	// 判断几个购物车
// 	var cartids;
// 	if(typeof(cartid2) == "undefined"){ // 单车
// 		cartids = cartid1 + "" ;
// 	}else if(typeof(cartid3) == "undefined"){ // 多车
// 		cartids = cartid1 + "," + cartid2 ;
// 	}else{  // 多车
// 		cartids = cartid1 + "," + cartid2 + "," + cartid3 ;
// 	}
// 	var params = {
// 		"cartids" : cartids,
// 		"mid" : mid,
// 		"t" : Math.random()
// 	};
// 	$('#loadRegion').load(frontPath + "/green2014/product/productexpectedtime.do", params,function(data){
// 		setArealist(mid);
// 		// modify by lihongyao 20170224我买网预计送达时间优化-实现地址联动
// 		var returnRegionId = $('#returnRegionId').val();
// 		if (returnRegionId) {
// 			setCity(returnRegionId, false);
// 		}
// 	});
// }
// // 选择配送区域
// function setArealist(mid){
// 	var cartids = $(".order_nav .hover_li").attr("data-cartids");
// 	$('.addr_select').live('click',function(){
// 		var $this = $(this);
// 		$this.find('.text').addClass('text-click');
// 		$this.find('.content').show();
// 		//选中配送区域
// 		$('.delivery-tip .mc').delegate('li','click',function(){
// 			var $mcThis = $(this);
// 			var mcIndex = ($mcThis.parents('.mc').index())-1; //mc索引是从第2个开始的 所以要减去1
// 			var productid = $('#productid').val();
// 			var mid = $('#mid').val();
// 			//省份
// 			if(mcIndex==1){
// 				$('#dfsecond').html("请选择");
// 				$('#dfthird').parent('li').hide();
// 				var regionid = $(this).attr('data-regionId');
// 				var url = "/green2014/product/getExpectedTime.do?method=thirdstep";
// 				var params = new Object();
// 				params["parentId"] = regionid;
// 				params["cartids"] = cartids;
// 				params["mid"] = mid;
// 				$(this).parents('.content').show();
// 				$.post(url,params,function(data){
// 					var obj = eval('(' + data + ')');
// 					$("#secondstep").html(obj.reslut.areaHtml);
// 				});
// 				$('#option1').val($mcThis.html());
// 				$('#dffirst').html($mcThis.html());
// 				$('#option2').val("");
// 				$('#option3').val("");
// 			}
// 			//城市
// 			if(mcIndex==2){
// 				$('#dfthird').parent('li').show();
// 				var id = $mcThis.attr('data-regionId');
// 				var url = "/green2014/product/getExpectedTime.do?method=thirdstep&date="+new Date();
// 				var params = new Object();
// 				params["parentId"] = id;
// 				params["cartids"] = cartids;
// 				params["mid"] = mid;
// 				$.post(url,params,function(data){
// 					var obj = eval('(' + data + ')');
// 					if(obj.reslut.flag == 1){//就两级
// 						$('#dfthird').parent('li').hide();
// 						$('#thirdstep').hide();
// 						$('#secondstep').css('display','block');
// 						if(obj.reslut.flag == 0){
// 							 $("#thirdstep").html("");
// 							 return;
// 						}
// 						$('.content .mt').find('li').eq(2).hide();
// 						$('.content .mt').find('li').eq(1).addClass('current');
// 						//获取配送地址
// 						$('.region-text').html($('#option1').val()+$('#option2').val()+$('#option3').val());
// 						$this.find('.text').removeClass('text-click');
// 						$this.find('.content').hide();
// 						// 把字段存到cookie中,无生命周期的cookie随着浏览器的关闭即消失
// //						$.cookie('deliveryRuleText' + mid, $this.find('.region-text').html());
// //						$.cookie('deliveryRuleRegionId' + mid, obj.reslut.returnRegionId);
// 						// 获取运费金额
// //						getCartDeliveryRule(id);
// 						setCity(id, true);
// 						return;
// 					}else{
// 						$this.find('.content').show();
// 						$("#thirdstep").html(obj.reslut.areaHtml);
// 						$('#dfthird').parent('li').show();
// 						$('#dfthird').html("请选择");
// 					}
// 			    });
// 				$('#option2').val($mcThis.html());
// 				$('#dfsecond').html($mcThis.html());
// 				var thirdRegion = $mcThis.parents('.mc').siblings('.mt').find('li').eq(2);
// 				thirdRegion.find('i').width(thirdRegion.outerWidth());
// 				$('#option3').val("");
// 			}
// 			//区/县
// 			if(mcIndex==3){
// 				$('#expectedTime').html("");
// 				var id = $mcThis.attr('data-regionId');
// 				var url = "/green2014/product/getExpectedTime.do?method=thirdstep&date="+new Date();
// 				var params = new Object();
// 				params["parentId"] = id;
// 				params["cartids"] = cartids;
// 				params["mid"] = mid;
// 				params["changeCity"] = true;
// 				$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 				$.post(url,params,function(data){
// 					 var obj = eval('(' + data + ')');
// 					 if(obj.reslut.flag == 0){
// 						comAlert("配送地区错误");
// 						return;
// 					 }else{
// 						$('#option3').val($mcThis.html());
// 						$('#dfthird').html($mcThis.html());
// 						var thirdBorder = $mcThis.parents('.mc').siblings('.mt').find('li').eq(2);
// 						thirdBorder.find('i').width(thirdBorder.outerWidth());
// 						$this.find('.text').removeClass('text-click');
// 						$this.find('.content').hide();
// 						// 获取配送地址
// 						$('.region-text').html($('#option1').val()+$('#option2').val()+$('#option3').val());
// 						// 把字段存到cookie中,无生命周期的cookie随着浏览器的关闭即消失
// //						$.cookie('deliveryRuleText' + mid, $this.find('.region-text').html());
// //						$.cookie('deliveryRuleRegionId' + mid, obj.reslut.returnRegionId);
// 						// 获取运费金额
// //						getCartDeliveryRule(regionId);
// 						/**
// 						 * add by lihongyao 20160720 城市版三期指定城市合并生鲜和普通车，购物车页左上角切换地区时重新设置cityid重新加车
// 						 * 1、20170224我买网预计送达时间优化-实现地址联动 cookie不区分分站
// 						 */
// 						setCity(id, true);
// 					 }
// 				});
// 			}
// 			var currentRegion = $mcThis.parents('.mc').siblings('.mt').find('li').eq(mcIndex);
// 			//获取地区背景线的宽度
// 			currentRegion.find('i').width(currentRegion.outerWidth());
// 			//选中地区后 下一个地区显示
// 			currentRegion.addClass('current').show().siblings().removeClass('current');
// 			currentRegion.parents('.mt').siblings('.mc').eq(mcIndex).show().siblings('.mc').hide();
// 			return false;
// 		});
//
// 		//切换可配送地区
// 		$('.delivery-tip .mt').find('li').click(function(){
// 			var mtIndex = $(this).index();
// 			$(this).find('i').width($(this).outerWidth());
// 			$(this).addClass('current').siblings().removeClass('current');
// 			$(this).parents('.mt').siblings('.mc').eq(mtIndex).show().siblings('.mc').hide();
//
// 		});
//
// 		//关闭按钮
// 		$this.find('.close').click(function(){
// 			$this.find('.text').removeClass('text-click');
// 			$this.find('.content').hide();
// 			return false;
// 		});
// 	});
//
// 	/*$('.addr_select').live('mouseout',function(){
// 		var $this = $(this);
// 		$this.find('.text').removeClass('text-click');
// 		$this.find('.content').hide();
// 	});*/
// }
//
// //设置cityid
// function setCity(regionId, isLoadRule) {
// 	$.post(frontPath + "/cart/setcity.do", {"regionId" : regionId} , function(data){
// 		var result = eval('(' + data + ')');
// 		if (result.isReFresh) {
// 			var uri = frontPath + "/Cart/ShowCart.do?t=" + Math.random();
// 			window.location.href = uri;
// 		} else {
// 			if (isLoadRule) {
// 				// 获取运费金额
// 				getCartDeliveryRule(regionId);
// 			}
// 		}
// 	});
// }
//
// // 购物车加载配送地区运费
// function loadCartDeliveryRule(totalPrice, mid){
// 	// 取当前页签的所有购物车
// 	var cartids = $(".hover_li").attr("data-cartids");
// 	var url = "/Cart/cartdeliveryrule.do" ;
// 	var params = new Object();
// 	params["cartids"] = cartids;
// 	params["mid"] = mid;
// 	$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 	$.post(url , params , function(data){
// 		if(data.indexOf("errorCode") == -1){
// 			var totaldelivery = 0; // 总运费
// 			var cartdeliverys = data.split(','); // 拆分返回值所有cart的运费
// 			var nosupportCarts = new Array();
// 			for(var i = 0 ;i < cartdeliverys.length ; i++){
// 				var cartdelivery = cartdeliverys[i];
// 				var cartiddelivery = cartdelivery.split('=');
// 				var cartid = cartiddelivery[0] ; // cartid
// 				var delivery = cartiddelivery[1] ; // 运费
// 				var carttype = cartiddelivery[2] ; // carttype
// 				if("nosupport" == delivery){
// 					var nosupportcontent = "<i class='png fl'></i><span class='png fl'>该地区不支持配送</span><div class='clear'></div>";
// 					$('#j-mian' + cartid).removeClass('mian').addClass('cou-m').html(nosupportcontent);
// 					//$('#j-mian' + cartid).parent().parent().find(".content_type_zp").addClass("limit");
// 					nosupportCarts.push('all'+cartid);
// 				}else if(delivery > 0){ // 运费>0不免邮 ，显示凑单规则
// 					// 有运费的提示信息
// 					var strdelivery = Number(Number(delivery) / 100).toFixed(2);
// 					var content = "<i class='png fl'></i><a href='#anchor-relationFree"+cartid+"'><span class='png fl'>凑单</span></a><div class='clear'></div>";
// 					$('#j-mian' + cartid).removeClass('mian').addClass('cou-m').html(content);
// 					if(carttype <= 2){
// 						showRelationFree(cartid); //展示凑单
// 					}else{
// 						hideRelationFree(cartid); //隐藏凑单
// 					}
// 				}else{ // 免邮
// 					$('#j-mian' + cartid).removeClass('cou-m').addClass('mian').html("");
// 					hideRelationFree(cartid); //隐藏凑单
// 				}
// 				if("nosupport" != delivery){
// 					totaldelivery = Number(Number(totaldelivery) + Number(delivery / 100)).toFixed(2); // 总运费相加
// 				}
// 			}
// 			var curTab = $(".order_nav .hover_li").attr("data-tab");
// 			var strTotaldelivery = (Number(totaldelivery)).toFixed(2);
// 			$('#j-totaldeliveryrule'+curTab).html("￥" + strTotaldelivery); // 预估运费
// 			var strTotal = Number(Number(totaldelivery) + Number(totalPrice)).toFixed(2);
// 			$('#j-totaltopay'+curTab).html("￥" + strTotal); // 应付金额
// 			// 已选商品(含预估运费) + 加载小结算图标按钮
// 			loadtopaybtn(curTab);
// 			if(nosupportCarts.length > 0){
// 				for(var i = 0 ;i < nosupportCarts.length ; i++){
// 					cancelAllCartItem(nosupportCarts[i] , mid);
// 				}
// 			}
// 		}
// 	});
// }
//
// // 点击配送区域，修改运费
// function getCartDeliveryRule(parentId){
// 	var cartids = $(".order_nav .hover_li").attr("data-cartids");
// 	// 获取当前购物车订单导航外的所有导航
// 	$(".order_nav ul li").each(function(){
// 		if(!$(this).hasClass("hover_li")){
// 			var index_li = $(this).attr("data-index")-1;
// 			//获取当前购物车外购物车页签对象
// 			var curObj = $(".ordercont_content").eq(index_li);
// 			curObj.attr("data-delivery","y");
// 		};
// 	});
// 	var url = "/Cart/cartdeliveryrule.do" ;
// 	var params = new Object();
// 	params["cartids"] = cartids;
// 	params["mid"] = mid;
// 	params["regionid"] = parentId;
// 	$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 	$.post(url , params , function(data){
// 		if(data.indexOf("errorCode") == -1){
// 			var totaldelivery = 0; // 总运费
// 			var cartdeliverys = data.split(','); // 拆分返回值所有cart的运费
// 			var nosupportCarts = new Array();
// 			for(var i = 0 ;i < cartdeliverys.length ; i++){
// 				var cartdelivery = cartdeliverys[i];
// 				var cartiddelivery = cartdelivery.split('=');
// 				var cartid = cartiddelivery[0] ; // cartid
// 				var delivery = cartiddelivery[1] ; // 运费
// 				var carttype = cartiddelivery[2] ; // carttype
// 				if("nosupport" == delivery){
// 					var nosupportcontent = "<i class='png fl'></i><span class='png fl'>该地区不支持配送</span><div class='clear'></div>";
// 					$('#j-mian' + cartid).removeClass('mian').addClass('cou-m').html(nosupportcontent);
// 					//$('#j-mian' + cartid).parent().parent().find(".content_type_zp").addClass("limit");
// 					// 不支付配送的地区
// 					nosupportCarts.push('all'+cartid);
// 				}else if(delivery > 0){ // 运费>0不免邮 ，显示凑单规则
// 					// 有运费的提示信息
// 					var strdelivery = Number(Number(delivery) / 100).toFixed(2);
// 					var content = "<i class='png fl'></i><a href='#anchor-relationFree"+cartid+"'><span class='png fl'>凑单</span></a><div class='clear'></div>";
// 					$('#j-mian' + cartid).removeClass('mian').addClass('cou-m').html(content);
// 					if(carttype <= 2){
// 						showRelationFree(cartid); //展示凑单
// 					}else{
// 						hideRelationFree(cartid); //隐藏凑单
// 					}
// 				}else{ // 免邮
// 					$('#j-mian' + cartid).removeClass('cou-m').addClass('mian').html("");
// 					hideRelationFree(cartid); //隐藏凑单
// 				}
// 				if("nosupport" != delivery){
// 					totaldelivery = Number(Number(totaldelivery) + Number(delivery / 100)).toFixed(2); // 总运费相加
// 				}
// 			}
// 			var curTab = $(".order_nav .hover_li").attr("data-tab");
// 			var totaldeliveryrule = $('#j-totaldeliveryrule'+curTab);// 预估运费
// 			var strTotaldelivery = Number(Number(totaldelivery)).toFixed(2); // 新的预估运费
// 			var oldtotaldeliveryrule = totaldeliveryrule.text().replace("￥", ""); // 旧的预估运费
// 			totaldeliveryrule.html("￥" + strTotaldelivery);
// 			// 新运费与旧运费做差值 ，加上旧的应付金额，为新的应付金额
// 			var totaltopay = $('#j-totaltopay'+curTab);
// 			var oldtotaltopay = totaltopay.text().replace("￥", ""); // 旧的应付金额
// 			var strTotal = Number(Number(strTotaldelivery) - Number(oldtotaldeliveryrule) + Number(oldtotaltopay)).toFixed(2);
// 			totaltopay.html("￥" + strTotal); // 新的应付金额
// 			$('#j-totalwithdelivery').html("￥" + strTotal); // 已选商品(含预估运费)
// 			// 不支付配送的地区
// 			if(nosupportCarts.length > 0){
// 				for(var i = 0 ;i < nosupportCarts.length ; i++){
// 					cancelAllCartItem(nosupportCarts[i] , mid);
// 				}
// 			}
// 		}
// 	});
// }
//
// // 取消勾选所有购物车项
// function cancelAllCartItem(id,mid){
// 	var cartids = $("#"+id).attr("cartids");
//     jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 	var params = new Object();
// 	params["selFlag"] = "false";
// 	params["cartIds"] = cartids;
// 	jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 		// 取消当前购物车的所有勾选
// 		var miandiv = $('#j-mian'+cartids);
// 		var cartdiv = miandiv.parents('.ordercont_content_cw div').parent();
// 		cartdiv.find(':checkbox').each(function(){
// 			$(this).attr('checked',false);
// 		});
// 		// 全选取消勾选
// 		$('.checkall').attr('checked',false);
// 		// 重量合计0kg 金额合计￥0.00
// 		miandiv.parent().find('.total').html('<span>重量合计0kg</span><span>金额合计￥0.00</span>');
// 		// 隐藏规则
// 		cartdiv.find('.j-total'+cartids).hide();
// 		if(data != 1 && data.indexOf("10:") == -1 && data.indexOf("11:") == -1){
// 			comAlert(data);
// 		}
// 	});
// }
//
// // 订单类型导航区鼠标悬浮效果
// function orderNavHover(){
// 	var lenLi = $('.order_nav').find('li').length;
// 	$('.order_nav').find('li').each(function(){
// 		if (lenLi > 4) {
// 			var charLi = $(this).find('strong').html();
// 			var stringLi = charLi.replace(charLi.substring(3),'...');
// 			$(this).find('strong').html(stringLi);
// 			//鼠标悬停收货单 提示显示
// 			$(this).hover(function(){
// 				$(this).addClass('order-li');
// 			},function(){
// 				$(this).removeClass('order-li');
// 			})
// 		}
// 	});
// }
//
// // 跨境购订单合计鼠标悬浮效果
// function orderContHover(){
// 	$('.ordercont-title-cw .total').hover(function() {
// 		$(this).find('.crosshover').find('span').show();
// 	}, function() {
// 		$('.crosshover').find('span').hide();
// 	});
// }
//
// // 名庄荟结算样式
// function loadMZHBtn(){
// 	var totalpaydiv = $('#j-btn-totalPrice');
// 	var totalpaydiv2 = $('#j-btn-totalPrice2');
// 	var preSaleTotalpaydiv = $('#j-btn-preSaleTotalPrice');
// 	var preSaleTotalpaydiv2 = $('#j-btn-preSaleTotalPrice2');
// 	preSaleTotalpaydiv.hide();
// 	totalpaydiv.show();
// 	$('#j-radio-totalPrice').click(function(){
// 		preSaleTotalpaydiv.hide();
// 		preSaleTotalpaydiv2.hide();
// 		totalpaydiv.show();
// 		totalpaydiv2.show();
// 	});
// 	$('#j-radio-preSaleTotalPrice').click(function(){
// 		totalpaydiv.hide();
// 		totalpaydiv2.hide();
// 		preSaleTotalpaydiv.show();
// 		preSaleTotalpaydiv2.show();
// 	});
// }
// // 购物车局部刷新同步标题商品数量
// function synchronousNavAmount(amount){
// 	$('.order_nav .hover_li').find('em').each(function(){
// 		$(this).html(amount);
// 	});
// }
//
//
// // 跨境购进入购物车
// function initCrossCart(){
// 	var nav = $(".order_nav .hover_li");
// 	var cartids = nav.attr("data-cartids");
// 	var mid = nav.attr("data-mid");
// 	if(typeof(cartids) != "undefined" && typeof(mid) != "undefined" && cartids.indexOf(',') != -1){
// 		var index = nav.attr("data-index")-1;
// 		//获取当前购物车页签对象
// 		var curObj = $(".ordercont_content").eq(index);
// 		if(curObj.attr("data-cross-first") != "n"){
// 			// 获取所有车id（除了第一个购物车）
// 			var cartidlist = cartids.substr(2, cartids.length - 1);
// 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			var params = new Object();
// 			params["selFlag"] = "false";
// 			params["cartIds"] = cartidlist;
// 			// unchecked 所有车
// 			jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 				//获取当前页签的相关购物车参数
// 				var curtab = nav.attr("data-tab")==null ? 1 : nav.attr("data-tab");
// 				//判断是否首次，首次加载的页签需要发请求
// 				if(curObj.attr("data-cross-first") != "n"){
// 					curObj.attr("data-cross-first","n");
// 					var uri = frontPath + "/cart/loadcartcontent.do";
// 					params={curTab:curtab,"t":Math.random()};
// 					//局部刷新购物车
// 					$.post(uri, params, function(data){
// 						curObj.html(data);
// 						setTimeout(function(){
// 							initCartItemsEvents();
// 						},50);
// 					});
// 				}
// 			});
// 		}
// 	}
// }
//
// // 跨境购购物车全选
// function selectCrossAllCartItem(id,mid){
// 	var cartid = $("#"+id).attr("cartids");
// 	var cartids = $(".order_nav .hover_li").attr("data-cartids");
// 	// 只有一个商家
// 	if(cartid === cartids){
// 		selectAllCartItem(id,mid);
// 		return;
// 	}else{
// 		// 多个商家
// 		var allcartids = cartids.split(',');
// 		var allcartid = '';
// 		for(var i = 0 ; i < allcartids.length ; i++ ){
// 			if(cartid != allcartids[i]){
// 				allcartid = allcartid + allcartids[i] + ',';
// 			}
// 		}
// 		// 去除最后一个逗号
// 		var unselectcartids = allcartid.substr(0, allcartid.length - 1);
// 		jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 		var params = new Object();
// 		params["selFlag"] = "false";
// 		params["cartIds"] = unselectcartids;
// 		// 取消所有 unselectcartids
// 		jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 			var selFlag = $("#"+id).attr("checked");
// 			params = new Object();
// 			params["selFlag"] = selFlag;
// 			params["cartIds"] = cartid;
// 			// 选择或取消 当前选中的购物车
// 			jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 				var nav = $(".order_nav .hover_li");
// 				var index = nav.attr("data-index") - 1;
// 				//获取当前页签的相关购物车参数
// 				var curtab = nav.attr("data-tab")==null ? 1 : nav.attr("data-tab");
// 				//获取当前购物车页签对象
// 				var curObj = $(".ordercont_content").eq(index);
// 				var uri = frontPath + "/cart/loadcartcontent.do";
// 				params = {curTab:curtab,"t":Math.random()};
// 				//局部刷新购物车
// 				$.post(uri, params, function(data){
// 					curObj.html(data);
// 					setTimeout(function(){
// 						initCartItemsEvents();
// 					},50);
// 				});
// 			});
// 		});
// 	}
// }
// // 跨境购购物车单选
// function selectCrossCartItem(cartId, indexId, productid, mid, userGroupId,amount,sellAbleAmount){
// 	var cartids = $(".order_nav .hover_li").attr("data-cartids");
// 	// 只有一个商家
// 	if(cartId === cartids){
// 		selectCartItem(cartId, indexId, productid, mid, userGroupId,amount,sellAbleAmount);
// 		return;
// 	}else{
// 		// 多个商家
// 		var allcartids = cartids.split(',');
// 		var allcartid = '';
// 		for(var i = 0 ; i < allcartids.length ; i++ ){
// 			if(cartId != allcartids[i]){
// 				allcartid = allcartid + allcartids[i] + ',';
// 			}
// 		}
// 		// 去除最后一个逗号
// 		var unselectcartids = allcartid.substr(0, allcartid.length - 1);
// 		jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 		var params = new Object();
// 		params["selFlag"] = "false";
// 		params["cartIds"] = unselectcartids;
// 		// 取消所有 unselectcartids
// 		jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 			var selFlag = $("#sel"+productid).attr("checked");
// 			var params = new Object();
// 			params["productid"] = productid;
// 			params["mid"] = mid;
// 			params["cartid"] = cartId;
// 			params["userGroupId"] = userGroupId;
// 			params["selFlag"] = selFlag;
// 			params["amount"] = amount;
// 			params["tt"] = Math.random();
// 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			jQuery.post(frontPath + "/selectCartItem.do", params, function(data) {
// 				var nav = $(".order_nav .hover_li");
// 				var index = nav.attr("data-index") - 1;
// 				//获取当前页签的相关购物车参数
// 				var curtab = nav.attr("data-tab")==null ? 1 : nav.attr("data-tab");
// 				//获取当前购物车页签对象
// 				var curObj = $(".ordercont_content").eq(index);
// 				var uri = frontPath + "/cart/loadcartcontent.do";
// 				params = {curTab:curtab,"t":Math.random()};
// 				//局部刷新购物车
// 				$.post(uri, params, function(data){
// 					curObj.html(data);
// 					setTimeout(function(){
// 						initCartItemsEvents();
// 					},50);
// 				});
// 			});
// 		});
// 	}
// }
//
// // 如果免邮展示第一个加价购
// (function ($) {
//     firstBuyRule = function () {
//     	this.map = {};
//     };
//     $.extend(
//     	firstBuyRule.prototype, {
// 			setFirstBuyRule: function (cartid, index) {
// 				this.map[cartid] = index;
// 			},
// 			showFirstBuyRule: function (cartid) {
// 				var index = this.map[cartid];
// 				var saleRuleProduct = $(".j-relationFree" + cartid).parents('ul').find('li'); // 规则标题
// 				saleRuleProduct.eq(index).addClass('cur');
// 				saleRuleProduct.parent().siblings('.cont').eq(index).show();
// 			}
// 		}
//     );
// })(jQuery);
// var firstBuyRule = new firstBuyRule();
//
// function deliveryadd(){
// 	$(".limit").append("<div class='limit-mask'></div>");
// 	$(".limit").find(".img_a").find("img").after("<span class='limit-pic'></span>");
// 	$(".limit").find("input[type='checkbox']").after("<span class='limit-icon'>售罄</span>");
// }
// function deliveryxqadd(){
// 	//限区
// 	$(".limitxq").append("<div class='limit-mask'></div>");
// 	$(".limitxq").find(".img_a").find("img").after("<span class='limit-pic'></span>");
// 	$(".limitxq").find("input[type='checkbox']").after("<span class='limit-icon'>限区</span>");
// }
// function deliveryclear(){
// 	//还原样式
// 	$(".limit").find(".limit-icon").remove();
// 	$(".limit").find(".limit-pic").remove();
// 	$(".limit").find(".limit-mask").remove();
// 	$(".limit").removeClass("limit");
// }
// /*获取不可配送 渲染样式rong*/
// $(function(){
// 	var bpsproductIds = jQuery.cookie("bpsproductIds");
// 	if(bpsproductIds){
// 		var pidList = new Array();
// 		pidList = bpsproductIds.split(",");
// 		if(pidList.length > 0){
// 			for(var i =0;i<pidList.length;i++){
// 				var pid = $.trim(pidList[i]);
// 				$("#sel"+ pid).parent().parent().addClass("limit");
// 			}
// 		}
// 		jQuery.cookie("bpsproductIds","");
// 	}
// });
//
// var crowdfundingUserLimitCheck = function(cartMid, cartId){
//     var r = false;
//     var data = {};
//     data["mid"] = cartMid;
//     data["cartId"] = cartId;
//     data["tt"] = Math.random();
//     var url = "/cart/crowdfundingUserLimitCheck.do";
//     $.ajax({
//         "async" : false,
//         "data" : data,
//         "url" : url,
//         "dataType" : "json",
//         "success" : function(data){
//             r = data;
//         }
//     });
//     return r;
// };

