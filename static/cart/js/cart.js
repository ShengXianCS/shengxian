// // ���˷�
// var deliveryrule = 0;
//
// //���빺�ﳵ�ɹ���ִ�е���Ⱦ����
// function doSuccess(){
// 	try{addCartItem(_articleId);}catch(e){}	//��ת��ʱִ�У�Ϊ�˼�����ܹ���ʱ��ִ���꣬�μ�cartAdd.jsp
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
// //�ֲ�ˢ�¹��ﳵ���ѡ��Ʒ����
// function callback_onlyRefreshCurrentCart(data,callbackParams){
// 	var dataOut = data;
// 	var curTab = $(".order_nav .hover_li").attr("data-tab");
// 	var type = $(".current").attr("data-type");
// 	var param = callbackParams;
// 	var params = {"mid":callbackParams.mid,"curTab":curTab,"type":type,"tt":Math.random()};
// 	$.post(frontPath + "/cart/loadshowcart.do", params, function(data){
// 		var cpid = c_pId;
// 		$("#loadshowcart" + curTab).html(data);
// 		addproductlimit(cpid); //�������
// 		initCartItemsEvents();
// 		if($("#loadshowcart" + curTab).find(".content_type").length == 0){
// 			//����ǰ���ﳵ��Ʒû����Ʒ���ˢ�¹��ﳵ��
// 			location.href = frontPath + "/Cart/ShowCart.do?tt=" +Math.random();
// 		}
// 		// ������������
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
// //��Ʒ������⣨���ͷ�Χ���ƣ�
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
// //ִ������input��blur�¼�
// function doAllInputBlurEvent(cardId){
// 	$("#loadshowcart" + cardId).find("input[id^=amount]").each(function(){
// 		var blurenent = $(this).attr("onblur");
// 		$(this).unbind("blur").blur(blurenent);
// 	});
// }
//
// /**
//  * �����û��޹���֤
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
// 			comAlert("������Ʒ������������������û��޹�����!");
// 			// ��ԭ��ť״̬
// 			$(".check_button, .sjcheck_button").css("cursor","pointer").attr("title","ȥ��������").attr("data-first","y");
// 			flag = true;
// 			return true;
// 		}else{
// 			comAlert("ϵͳ��æ, ���Ժ�����!");
// 			// ��ԭ��ť״̬
// 			$(".check_button, .sjcheck_button").css("cursor","pointer").attr("title","ȥ��������").attr("data-first","y");
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
// var dotopay = function(param){//ȥ��������"cartIds":cartIds,"prepay":prepay,"isCoquetry":isCoquetry,"isHasBuyer":isHasBuyer
// 	if(!param && !param.cartIds) return false;
// 	returnLocation = frontPath + "/checkout/ordercard.do?";
//
// 	//ִ�мӼ���ť��blur�¼�
// 	doAllInputBlurEvent(param.cartIds);
// 	var cartIds = param.cartIds;
// 	setTimeout(function(){
// 		if(param.isHasBuyer){	//���Ѿ���½
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
// 					// �ֻ���֤���
// 					/*if(needGotoMobileCertification(param.mid, cartId)){
// 						comAlert("���Ĺ��ﳵ����������Ʒ,����ֻ�����!",
// 								{"confirm":"ȥ���ֻ�","cancel":"ȡ��"},
// 								function(){
// 									location = "/Member/index.jsp?mid=0&url=" + encodeURIComponent("/Member/UpdateMobile.do?mid=0") +"&tt=" +Math.random();
// 								},
// 								function(){
// 									// ��ԭ��ť״̬
// 									$(".check_button, .sjcheck_button").css("cursor","pointer").attr("title","ȥ��������").attr("data-first","y");
// 								}
// 						);
// 						return;
// 					}*/
// 					// �û��޹����
// 					/*isLimitBuy = flashbuyUserLimit(cartId,param.mid);//, function(){location.href = returnLocation;}
// 					if(isLimitBuy){
// 						break;
// 					}*/
// 					//�ڳ���Ʒ�ֻ���֤���
//                     if(crowdfundingUserLimitCheck(param.mid, cartId)){
//                         comAlert("���Ĺ��ﳵ�����ڳ���Ʒ,����ֻ�����!",
//                             {"confirm":"ȥ���ֻ�","cancel":"ȡ��"},
//                             function(){
//                                 location = "/Member/index.jsp?mid=0&url=" + encodeURIComponent("/Member/UpdateMobile.do?mid=0") +"&tt=" +Math.random();
//                             },
//                             function(){
//                                 // ��ԭ��ť״̬
//                                 $(".check_button, .sjcheck_button").css("cursor","pointer").attr("title","ȥ��������").attr("data-first","y");
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
// 					// add by lihongyao 20160728 ���а�����ָ�����кϲ���ͨ�������ʳ�
// 					if(param && param.curTab){
// 						returnLocation += "&curTab=" + param.curTab;
// 					}
// 					location.href = returnLocation;
// 				}
// 			}
// 		}else{	//���ڻ��޸ģ����ӵ�½ע�ᵯ����
// 			showLoginAndRgister(returnLocation, param);
// 		}
// 	},300);
// }
//
// //ȥ����
// function topay(isHasBuyer, prepay){
// 	jQuery.cookie("isSJ","2");//confinedArea��
// 	var curObj = $(".btn .topay");
// 	if(prepay){
// 		curObj = $("#"+prepay);
// 		if(prepay == '0' ){
// 			curObj = $("#j-btn-totalPrice"); // ��ׯ���İ�ť��ȫ�����
// 		}else if(prepay == '1'){
// 			curObj = $("#j-btn-preSaleTotalPrice"); // ��ׯ���İ�ť��Ԥ������
// 		}
// 	}
// 	//�Ƿ���в�֧�ֵ�������Ʒ
// 	/*var sxlimitlength = $(".order_contents").find(".limit").length;
// 	if(sxlimitlength > 0){
// 		comAlert("�в�֧�ָõ������͵ġ���ɾ�����޸�");
// 		return;
// 	}*/
// 	if(curObj.attr("topay") == '2'){
// 		comAlert("��ѡ����Ҫ�������Ʒ");
// 		return;
// 	}
// 	if(curObj.attr("data-first") == "y"){
// 		curObj.attr("data-first","n");
// 		curObj.css("cursor","wait").attr("title","����Ϊ��Ŭ����ת�У����Ժ�...");
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
// 		params.curTab = curTab; // add by lihongyao  20160728 ���а�����ָ�����кϲ���ͨ�������ʳ�
// 		dotopay(params);
// 	}
// }
// //��������
// function topayforsj(isHasBuyer){
// 	jQuery.cookie("isSJ","1");//confinedArea��
// 	var curObj = $(".btn,.topay");
// 	if(curObj.attr("topay") == '2'){
// 		comAlert("��ѡ����Ҫ�������Ʒ");
// 		return;
// 	}
// 	if(curObj.attr("data-first") == "y"){
// 		curObj.attr("data-first","n");
// 		curObj.css("cursor","wait").attr("title","����Ϊ��Ŭ����ת�У����Ժ�...");
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
// /** ��½ע�ᵯ���� begin----------------------------------------**/
// //ˢ����֤��
// function cartCodeRefresh(jqObj) {
// 	jqObj.attr("src", frontPath + "/ValidateCode?t=1" +"&tt=" +Math.random());
// }
// //Ԥ���ص�½ע�ᣬ��Ϊ���ﳵ���ݱȽ϶�
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
// 		createPopup();//����������div
// 		$("#tb_layer").load(frontPath + "/Cart/Login.do?jzdisplayflag=0&returnUrl=" + returnUrl + pa);
// 	}else{
// 		return;
// 	}
// }
// //����������
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
// //���ñ������ֲ�----���������ɫ��ԱȽϸߣ��ղصĵ�½ע���õ������ﳵ��Ҳ���ղأ�
// function showLoginShade(){
// 	if(jQuery("#layoutBg").length > 0)return;
// 	var winHeight = $(document).height();
// 	var e = document.createElement("div");
// 	e.id="layoutBg";
// 	e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+"px;filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:10000;";
// 	document.body.appendChild(e);
// };
//
// //��ֹԤ���س��ֵ�����
// var globalVar={
//     getUriCount : 0,//�ڼ��λ�ȡ����
//     getUriTotalCount : 5//һ����ȡ����
// }
// //��ʾ��½ע�ᵯ����
// function showLoginAndRgister(returnLocation,params){
// 	showShade();//��������
// 	$("#layoutBg").show();//��ʾ����
// 	loadRegisterAndLogin(params, returnLocation);//����������
// 	$("#tb_layer").show();//��ʾ��½ע���
// }
// /** ��½ע�ᵯ���� end----------------------------------------**/
//
// //�ȴ�ɾ��
// function waitDelete(obj){
// 	setTimeout(function(){
// 		$(obj).parent().parent().html('<p class="del_title">����ɾ������Ʒ</p><p class="del_title">���Ժ�...</p>');
// 	},100);
// }
// //��֤���ּӼ���
// function valiAmountInp(obj){
// 	re = /^[1-9][0-9]{0,5}$/g;
// 	if(!re.test(obj.value)){
// 		obj.value = 1;
// 		return false;
// 	}
// 	return true;
// }
// //���üӼ���ť�������첽����ѻ�
// function disabledADDorDEC(suffix) {
// 	jQuery("#p_dec" + suffix).hide();
// 	jQuery("#p_add" + suffix).hide();
// 	jQuery("#p_dec_disabled" + suffix).show();
// 	jQuery("#p_add_disabled" + suffix).show();
// }
// //������Ʒ������
// function updateAmount(cartId, indexId, productid, mid, amount, userGroupId, sellableAmount) {
// 	var amount = jQuery("#amount" + cartId + "_" + indexId + "_" + productid).val();
// 	var oldAmount = jQuery("#oldAmount" + cartId + "_" + indexId + "_" + productid).val();
// 	if (parseInt(amount) > parseInt(sellableAmount)) {
// 		// ��������������ڿ��������ص�ԭֵ
// 		comAlert("�Բ��𣬿�治�㣡");
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
// 			if(shanlength > 0){showgroupsatisfy(mid,productid,amount);} //����N���Ż��ж�
// 		},1000);
// 	});
// }
//
// /*����N���Ż��ж�*/
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
// 						albuyamount = parseInt(amount) + parseInt(imguri[8]) //�Ѿ�����ɹ���+�ѷ��빺�ﳵ��
// 					}
// 					if(albuyamount > xiangoushu && imguri[7]=='false'){
// 						//comAlert("����Ʒ�ѳ�����޹��������������ֽ������Ź�ԭ������Ŷ~");
// 						$("#satisbg_"+imguri[1]).show();
// 					}else{
// 						$("#satisbg_"+imguri[1]).hide();
// 					}
// 				}
// 			}
// 		}
// 	});
// }
// // ������Ʒ
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
// 		comAlert("�Բ��𣬿�治�㣡");
// 		return;
// 	} else {
// 		amount.val(Number(amount.val()) - 1);
// 	}
// 	updateAmount(cartId, indexId, productid, mid, amount.val(), userGroupId, sellableAmount);
// }
// //������Ʒ
// function addamount(cartId, indexId, productid, mid, userGroupId, sellableAmount) {
// 	var amount = jQuery("#amount" + cartId + "_" + indexId + "_" + productid);
// 	var oldAmount = jQuery("#oldAmount" + cartId + "_" + indexId + "_" + productid).val();
// 	if ((parseInt(oldAmount) - parseInt(amount.val())) == 1) {
// 		amount.val(Number(amount.val()) + 1);
// 		return;
// 	}
// 	if ((parseInt(amount.val()) + 1 > parseInt(sellableAmount))) {
// 		comAlert("�Բ��𣬿�治�㣡");
// 		return;
// 	} else {
// 		amount.val(Number(amount.val()) + 1);
// 	}
// 	updateAmount(cartId, indexId, productid, mid, amount.val(), userGroupId, sellableAmount);
// }
// //������Ʒ
// function decamountZPbyCart(cartId, ruleId, presentid) {
// 	var suffix = cartId + "_" + ruleId;
// 	var decamount = jQuery("#present_amount" + suffix + '_' + presentid);
// 	if (decamount.val() > 1) {
// 		decamount.val(decamount.val() - 1);
// 	}
// 	setPresentCalcInfoView(cartId, ruleId);
// }
// //������Ʒ
// function addamountZPbyCart(cartId, ruleId, presentid, currAmount, isinput) {
// 	//currAmount��Ʒ�Ŀ�����
// 	var suffix = cartId + "_" + ruleId;
// 	if(!valiCheckBoxAdd(cartId, ruleId, "all")){
// 		return;
// 	}
// 	var presentamount = jQuery("#present_amount" + suffix + '_' + presentid);
// 	if (Number(presentamount.val()) >= currAmount) {
// 		comAlert("�Բ����Ż���Ʒ��ʣ" + currAmount + "����ѡ!");
// 		presentamount.val(Number(currAmount));
// 		return false;
// 	} else {
// 		if (isinput == 1) {
// 			presentamount.val(Number(presentamount.val()) + 1);
// 		}
// 	}
// 	setPresentCalcInfoView(cartId, ruleId);
// }
// //ɾ����Ʒ
// function delPresent(cartId, indexId, productId, presentId, amount, mid, userGroupId, ruleId) {
// 	comAlert("��ȷ��Ҫɾ����",{"confirm":"ȷ��","cancel":"ȡ��"},function(){
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
// 			comAlert("�Բ���ɾ������Ʒ�����ܴ����ܵ���Ʒ����");
// 		}
// 		if (childAmount == amount) {
// 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			jQuery.post(frontPath + "/delpresent.do", params, function() {
// 						callback_onlyRefreshCurrentCart(null, {"cartId":cartId,"mid":mid}); //ˢ�µ�ǰ���ﳵ
// 					});
//
// 		} else {
// 			//������Ʒ(����Ʒ��Ʒ��������Ʒ��֧�ָ�������ɾ��)�������������1����Ҫ����
// 			params["childamount"] = childAmount;
// 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			jQuery.post(frontPath + "/updatepresenttocart.do", params, function() {
// 				callback_onlyRefreshCurrentCart(null, {"cartId":cartId,"mid":mid});	//ˢ�µ�ǰ���ﳵ
// 			});
// 		}
// 	});
// }
//
// //������Ʒѡ����Ʒ�ļ�����Ϣ
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
// 	//���ݼ�����ƴ����ʾ
// 	if(totalAmount == 0){
// 		$("#present_calcinfo" + suffix).html("");
// 		return;
// 	}
// 	var content = "";
// 	if(totalPrice == 0){//����
// 		content = "��ѡ<strong>" + totalAmount + "</strong>������<strong>" + totalWeight.toFixed(2) + "</strong>kg";
// 	}else{
// 		content = "��ѡ<strong>" + totalAmount + "</strong>������<strong>" + totalWeight.toFixed(2) + "</strong>kg"
// 		+ "�����<strong class='gwbottom_price'>��" + totalPrice.toFixed(2) + "</strong>";
// 	}
// 	$("#present_calcinfo" + suffix).html(content);
// }
//
// //������Ʒ��ѡ��У����Ч��
// function valiCheckBox(cartId, ruleId, presentId) {
// 	var suffix = cartId + "_" + ruleId,	/*��׺*/
// 	presentIds = [];/*��Ʒ��id����*/
// 	var checkBoxObj = $("#galc_checkbox" + suffix + "_" + presentId);
// 	var remainnumber = parseInt($("#rule" + suffix).attr("remainnumber"));
// 	if(presentId != "all"){
// 		//�����Ǳ��ύǰ��У��ʱִ��
// 		if(checkBoxObj.attr("data-defamount") <= 0){
// 			comAlert("�Բ��𣬸��Ż���Ʒ�����ꡣ");
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
// 			//���Ǳ��ύǰУ��Ÿ�input��ֵ
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
// 		comAlert("����δѡ���Ż���Ʒ���Ƿ񷵻ع��ﳵ��",{"confirm":"ȷ��","cancel":"ȡ��"},function(){
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
// 		comAlert("���ڱ�����������ѡ��" + remainnumber + "���Ż���Ʒ��");
// 		return false;
// 	}
// 	return true;
// }
// function valiCheckBoxAdd(cartId, ruleId, presentId) {
// 	var suffix = cartId + "_" + ruleId,	/*��׺*/
// 	presentIds = [];/*��Ʒ��id����*/
// 	var checkBoxObj = $("#galc_checkbox" + suffix + "_" + presentId);
// 	var remainnumber = parseInt($("#rule" + suffix).attr("remainnumber"));
// 	if(presentId != "all"){
// 		//�����Ǳ��ύǰ��У��ʱִ��
// 		if(checkBoxObj.attr("data-defamount") <= 0){
// 			comAlert("�Բ��𣬸��Ż���Ʒ�����ꡣ");
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
// 			//���Ǳ��ύǰУ��Ÿ�input��ֵ
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
// 		comAlert("����δѡ���Ż���Ʒ���Ƿ񷵻ع��ﳵ��",{"confirm":"ȷ��","cancel":"ȡ��"},function(){
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
// 		comAlert("���ڱ�����������ѡ��" + remainnumber + "���Ż���Ʒ��");
// 		return false;
// 	}
// 	return true;
// }
// /*//�ύ������Ʒ��
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
// // ���ύ������Ʒ��
// var checkPresentForm = (function() {
//      var check = true;    //˽�б���
//      var that = {}; //newĳ����
//      //�����ӿ�
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
// 			}catch(e){}//ga����룬���ӹ��ﳵ
// 			location.reload();
// 		});
// 	}
//     return that;   //���ص���
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
// //20130509 ���� XԪ��ѡY�� �Ҳ�������ֱ�������
// function setCartItemsRightMarign(){
// 	$(".ct6_div_right").each(function(){
// 		var ct6_left_height = $(this).siblings(".ct6_div_left").height();
// 		var ct6_right_height = $(this).height();
// 		$(this).css("margin-top",(ct6_left_height-ct6_right_height)/2);
// 	});
// }
// function setDeleteOperateEvents(){
//
// 	//�޸�XԪY����Ʒ����
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
// 				//�ȴ�XԪY�����޸İ�ť����ֹ�ظ����
// 				$(this).html("���Ժ�...");
// 			}
// 		}
// 	);
// }
//
// // ��ѡ��Ʒ(��Ԥ���˷�) + ����С����ͼ�갴ť
// function loadtopaybtn(curTab){
// 	var strTotal = $('#j-totaltopay'+curTab).html(); // Ӧ�����
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
// 		$('#j-totalwithdeliveryrule').html("<span class='fl'>��ѡ��Ʒ(��Ԥ���˷�)��<em id='j-totalwithdelivery'>" + strTotal + "</em></span></div>");
// 		$('#j-totalwithdeliveryrule').append(htmlbtn).append("<div class='clear'>");
// 	}else{
// 		$('#j-totalwithdeliveryrule').html("<span class='fl'>��ѡ��Ʒ(��Ԥ���˷�)��<em id='j-totalwithdelivery'>" + strTotal + "</em></span><div class='clear'></div>");
// 	}
// }
//
// function initCartMenuEvents(){
// 	//���ﳵ�������� �л�
// 	$(".order_nav").find("ul li").click(function(){
// 		//���ﳵ���������л�ʱ��ֻҪ���ǿ羳���Ĺ��ﳵ�б������С��ʾ    yuanli 2016/7/15
// 		if($(this).attr("data-index") != 7){
// 			$(".crossordertip").hide();
// 		} else {
// 			if($('.crossseller').length > 1){
// 				$(".crossordertip").show();
// 			}
// 		}
// 		$(this).addClass("hover_li").siblings().removeClass("hover_li");
// 		var index_li = $(this).attr("data-index")-1;
// 		//��ȡ��ǰҳǩ����ع��ﳵ����
// 		var curtab = $(this).attr("data-tab")==null ? 1 : $(this).attr("data-tab");
// 		//��ȡ��ǰ���ﳵҳǩ����
// 		var curObj = $(".ordercont_content").eq(index_li);
// 		if(curObj.attr("data-first") == "y"){//�ж��Ƿ��״Σ��״μ��ص�ҳǩ��Ҫ������
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
// 		// �޸��˷��Ժ��л��������¼����˷�
// 		if(curObj.attr("data-delivery") == "y"){
// 			curObj.attr("data-delivery","n");
// 			var totalPrice = $('#j-totaltopay'+curtab).html().replace("��", "");
// 			loadCartDeliveryRule(totalPrice, mid);
// 		}
// 		// ��ѡ��Ʒ(��Ԥ���˷�) + ����С����ͼ�갴ť
// 		loadtopaybtn(curtab);
// 		*/
// 		curObj.show().siblings(".ordercont_content").hide();
// 	});
// }
//
// //��ʼ��ˢ�¹��ﳵ��ʱ������¼�
// function initCartItemsEvents(){
// 	showPhonehover(); // �ֻ�����Ч��
// 	initCartMenuEvents();
// 	setCartItemsBgColor();
// 	setDeleteOperateEvents();
// 	setPresentsEvents();
// 	initCombiProductLater();
// 	setCartTitleInfo();
// 	valiCartInfoIconShow();
// 	setCartItemsRightMarign();  //20130509 ���� XԪ��ѡY�� �Ҳ�������ֱ�������
// 	setLookAndBuyEvents();
// 	set_mahout_request();
// }
//
// function setLookAndBuyEvents(){
// 	// ����ϲ�� -- ����ղ� -- ����¼�
// 	$('.golist_title ul li').live("click",function(){
// 		$(this).addClass('current').siblings().removeClass('current');
// 		var index = $(this).index();
// 		$('.golist_all').find('.golist_content').eq(index).show().siblings('.golist_content').hide();
// 		set_mahout_request();
// 	});
// }
// //��ʼ�������Ʒ�����б�
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
// //���ݵ�ǰ���ﳵҳǩ�������õ�ǰ���㹺�ﳵ�ı�����Ϣ
// function setCartTitleInfo(){
// 	var curObj = $(".order_nav .hover_li");
// 	var curTab = curObj.attr("data-tab");
// 	//���µ�ǰ���ﳵ��Ʒ����
// 	var totalamount = $("#loadshowcart" + curTab +"carttitle_totalamount_val").val();
// 	if(parseFloat(totalamount) >= 0){
// 		curObj.find(".carttitle_totalamount").html(totalamount);
// 	}
// }
// //��δ���ô�����Ϣʱ������ʵСͼ��
// function valiCartInfoIconShow(){
// 	if($.trim($(".oal_content").html()) == ""){
// 		$(".oal_img").hide();
// 	}
// }
//
// //�ֻ��Ż���ͣЧ��
// function showPhonehover(){
// 	$('.j-phone').hover(function(){
// 		$(this).find('.phone-hover').show();
// 	},function(){
// 		$(this).find('.phone-hover').hide();
// 	});
// 	//���빺�ﳵ��ʾ
// 	$('.pro-img li').hover(function(){
// 		$(this).addClass('hover');
// 	},function(){
// 		$(this).removeClass('hover');
// 	});
// 	deliveryadd();
// }
// //������Ʒ���Ӽ۹� �������¼�
// function setPresentsEvents(){
// 	/*//��Ʒ���Ӽ۹� ������
// 	$(".gift_a").click(
// 		function(){
// 			$(".giveaway_popup").hide();
// 			$(".giveaway_popup").parent().removeClass("rellayer");
// 			var curObj = $(this).siblings(".giveaway_popup"),
// 			num = curObj.find(".galist_content").length;
// 			if(num > 4){
// 				curObj.addClass("giveaway_popup_h");
// 			}
// 			//ie6����������
// 			$(this).parent().addClass("rellayer");
// 			curObj.show();
// 		}
// 	);
//
// 	//��Ʒ���Ӽ۹� �����򣬹رհ�ť
// 	$(".close_a").click(
// 		function(){
// 			$(this).parents(".giveaway_popup").hide();
// 		}
// 	);*/
//
// 	//�յ����ʹ����л�
// 	/*$('.ordercont_content_cw').each(function(){
// 		var mian = $(this).find('.mian'); // �����Ƿ����
// 		if (mian.is(':visible')){ // �������
// 			var li = $(this).find('.sales-promotion .tit li'); // �յ����ʱ���
// 			li.eq(0).hide();
// 			li.parent().siblings('.cont').eq(0).hide(); // �յ���������
// 			if(li.length == 1){ //���ֻ��һ�����ʹ���
// 				$(this).find('.sales-promotion').hide();
// 			}
// 			else{
// 				li.eq(1).addClass('cur').parent().siblings('.cont').eq(1).css('display','block'); // չʾ�ڶ���������⼰����
// 			}
// 		}
// 	});*/
//
// 	// ����ϲ��������ղص���л�
// 	$('.golist_title ul li').click(function(){
// 		$(this).addClass('current').siblings().removeClass('current');
// 		var index = $(this).index();
// 		$('.golist_all').find('.golist_content').eq(index).show().siblings('.golist_content').hide();
// 	});
// }
// //������Ʒ����
// function initTitRule(cartid){
// 	var saleRuleProduct = $('.j-total' + cartid).find('.tit li'); // �������
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
// 		//���빺�ﳵ��ʾ
// 		$('.pro-img li').hover(function(){
// 			$(this).addClass('hover');
// 		},function(){
// 			$(this).removeClass('hover');
// 		});
//
// 		//���������Ʒ����8�� �ֲ�Сͼ������
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
// 		//������Ʒ�ֲ�
// 		$('.pro-icon li').hover(function(){
// 			var index = $(this).index();
// 			//��ȡ��ǰҳ����ʼ������
// 			var startNum = index*8;
// 			//��ȡ��ǰҳ������������
// 			var endNum = (index+1)*8;
// 			//ͼ����ʾ
// 			$(this).addClass('cur').siblings().removeClass('cur');
// 			$(this).parent().siblings('ul').find('li').hide();
// 			$(this).parent().siblings('ul').find('li').slice(startNum,endNum).show();
// 		});
// 	}
// }
//
// // ��ʼ�������¼�
// function setRelationFree(cartid){
// 	var saleRuleProduct = $('.j-total' + cartid).find('.tit li'); // �������
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
// 			//������Ʒ�ֲ�
// 			$('.pro-icon li').hover(function(){
// 				var index = $(this).index();
// 				//��ȡ��ǰҳ����ʼ������
// 				var startNum = index*8;
// 				//��ȡ��ǰҳ������������
// 				var endNum = (index+1)*8;
// 				//ͼ����ʾ
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
// 	//���빺�ﳵ��ʾ
// 	$('.pro-img li').hover(function(){
// 		$(this).addClass('hover');
// 	},function(){
// 		$(this).removeClass('hover');
// 	});
//
// 	//��ʼ�����������Ʒ����8�� �ֲ�Сͼ������
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
// 	//������Ʒ�ֲ�
// 	$('.pro-icon li').hover(function(){
// 		var index = $(this).index();
// 		//��ȡ��ǰҳ����ʼ������
// 		var startNum = index*8;
// 		//��ȡ��ǰҳ������������
// 		var endNum = (index+1)*8;
// 		//ͼ����ʾ
// 		$(this).addClass('cur').siblings().removeClass('cur');
// 		$(this).parent().siblings('ul').find('li').hide();
// 		$(this).parent().siblings('ul').find('li').slice(startNum,endNum).show();
// 	});
// }
// //�ײ��յ�������ϲ����Ʒ�¼�����
// /*
// function setRelationProdsEvents(className){
// 	var curObj =  $(".order_contents:visible").find("." + className);
// 	//�յ���Ʒ������ϲ�� �Ҳ�����ť
//     curObj.find(".up_a").click(
// 	   function () {
// 	   		$(this).hide();
// 			$(this).parent().find(".down_a").show();
// 			$(this).parent().find(".up_img").addClass("down_img");
// 			$(this).parents(".goods_list").find(".golist_content").hide();
// 	   }
// 	);
//
// 	//�յ���Ʒ������ϲ�� �Ҳ�չ����ť
//     curObj.find(".down_a").click(
// 	   function () {
// 	   		$(this).hide();
// 			$(this).parent().find(".up_a").show();
// 			$(this).parent().find(".up_img").removeClass("down_img");
// 			$(this).parents(".goods_list").find(".golist_content").show();
// 	   }
// 	);
//
// 	//�յ���Ʒ������ϲ�� Ĭ��״̬
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
// 	//�յ���Ʒ������ϲ�� �󻬶�
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
// 	//�յ���Ʒ������ϲ�� �һ���
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
// // չʾ�յ���Ʒ Ŀǰֻ����ͨ�����ʳ�
// function showRelationFree(cartid){
// 	// ����յ���������Ʒ��չʾ�յ�����
// 	var showcurTab = $('.j-relationFree' + cartid); // ���Ҵյ����ʵı���
// 	showcurTab.addClass('curtit').show();  // չʾ�����ұ��
// 	var saleRuleProduct = $('.sales-promotion .j-total' + cartid + '.tit li'); // ���Ҷ�Ӧ�Ĺ�������
// 	saleRuleProduct.eq(0).siblings().removeClass('cur'); // �յ����ʱ�죬�����������ȥ�����
// 	saleRuleProduct.find('.cont').eq(0).css('display','block').siblings('.cont').hide();// ���Ҵյ����ʶ�Ӧ��������ʾ������������������
// 	// ����show
// 	$('.j-total' + cartid).show();
// }
// // ���شյ���Ʒ������
// function hideRelationFree(cartid){
// 	var showcurTab = $('.tit .j-relationFree' + cartid); // ���Ҵյ����ʵı���
// 	var lis = showcurTab.parent().find('li'); // ����ı���
// 	if(lis.length <= 1){
// 		showcurTab.parents('.sales-promotion').hide(); // ֻ�дյ�����һ������ȫ��������
// 	}else{
// 		showcurTab.hide();  // ֻ���شյ���Ʒ
// 		var saleRuleProduct = showcurTab.parent().parent().find('.cont'); // ���Ҷ�Ӧ�Ĺ�������
// 		saleRuleProduct.eq(saleRuleProduct.length - 1).hide();// ���Ҵյ����ʶ�Ӧ��������ʾ������������������
// 		showcurTab.parents('.sales-promotion').show();
// 		firstBuyRule.showFirstBuyRule(cartid);
// 		/*
// 		lis.eq(1).addClass('cur'); // ���شյ��������ݺ�չʾ��Ĺ���
// 		saleRuleProduct.eq(1).show();
// 		*/
// 	}
// }
// // ��ȡ�յ���Ʒids
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
// 			// û�дյ����� ��ʼ���������
// 			setRelationFree(cartid);
// 			// ɾ���յ����ʱ��� �Լ� ����div
// 			$('.j-relationFree' + cartid).remove();
// 			$('#j-relationFree' + cartid).remove();
// 			// ���شյ��������ݺ�չʾ��Ĺ���
// 			$('.j-total' + cartid).show();
// 			var saleRuleProduct = $(".j-total" + cartid).find('li'); // �������
// 			saleRuleProduct.eq(0).addClass('cur');
// 			saleRuleProduct.parent().siblings('.cont').eq(0).show();
// 		}
// 	});
// }
// // �յ���Ʒ
// function show_relationFree(data,callbackParams){
// 	if(!valiLoadProductsData(data)){
// 		return;
// 	}
// 	var mid = callbackParams.mid;
// 	var cartid = callbackParams.cartid;
// 	var result = data.result;
// 	var content="", productid=0, picPath="", productUrl="", onclickStr="", buyPrice="", marketPrice="", serverDomain="";
// 	content += '<div class="tip">�յ�����</div>';
// 	content += '<ul class="pro-img">';
// 	for(var i=0;i<result.length && i<16;i++){
// 		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;//�����
// 		marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;//�г���
// 		productid = result[i].id;//��ƷID
// 		picPath = result[i].pics.pic150[0];
// 		picPath = picPrefix + (picPath == null ? 'notfound150.gif' : picPath);
// 		productUrl = serverDomain + frontPath + "/Product-" + mid + "-" + productid + ".htm";
// 		content += '<li class="fl">';
// 		content += '<dt class="fl"><a href=' + productUrl + ' target="_blank" title=' + result[i].title + ' id="_gatrack_productlist_listpic_'+productid+'" data-ga="sales-promotion" data-gzpid="'+productid+'"><img src=' + picPath + ' alt='+result[i].title+' /></a></dt>';
// 		content += '<dd class="fl">';
// 		content += '<div class="name"><a href=' + productUrl + ' id="_gatrack_productlist_listtitle-'+productid+'">' + result[i].title + '</a></div>';
// 		content += '<div><strong>��' + buyPrice + '</strong>';
// 		/* ���������
// 		if(parseFloat(marketPrice) > 0){
// 			content += '<span>��' + marketPrice + '</span></div>';
// 		}*/
// 		content += '</dd><div class="clear"></div>';
// 		content += '<div class="btn"><a id="free_'+productid+'" href="javascript:isGoToCart(' + productid + ',' + mid + ');isGoToCartWait(\'free_'+productid+'\');">���빺�ﳵ</a></div>';
// 		content += '</li>';
// 		if((i + 1)%4 == 0){
// 			content += '<div class="clear"></div>';
// 		}
// 	}
// 	content += '<div class="clear"></div>';
// 	content += '</ul>';
// 	content += '<ul class="pro-icon"><li class="fl cur"></li>';
// 	// Ĭ����һ��С�̵�
// 	for(var i = 8 ; i < result.length ; ){
// 		content += '<li class="fl"></li>';
// 		i = i + 8 ;
// 	}
// 	content += '</ul>';
// 	if(content){
// 		// �յ�����
// 		var curObj = $("#j-relationFree" + cartid);
// 		curObj.html(content);
// 		// �յ����� + ����
// 		// $(".j-relationFree" + cartid).show();
// 		setRelationFree(cartid);
// 	}
// }
// //�յ���Ʒ������ϲ���ļ���ȴ���ʾ
// function isGoToCartWait(id){
// 	$("#" + id).html("<span>���Ժ�...</span>");
// 	setTimeout(function(){
// 		$("#" + id).attr("href","javascript:;");
// 	},100);
// }
// //����ѡ��ťѡ��Χ
// function expandRdoRange(rdoId){
// 	var $rdoId = $("#" + rdoId);
// 	if($rdoId.attr("disabled") == false){
// 		$rdoId.attr("checked",true);
// 	}
// }
//
// //��ѡ����ȡ����ѡ�������ﳵ��
// function selectCartItem(cartId){
//
// }
// //��ѡ����ȡ����ѡ���й��ﳵ��
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
// //ɾ���Ѿ���ѡ����Ʒ
// function delSelectedCartItem(obj){
// 	comAlert("��ȷ��Ҫɾ����",{"confirm":"ȷ��","cancel":"ȡ��"},function(){
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
// 		//�жϸ���Ʒ�Ƿ�Ϊ����ɾ��  1��������0��δ����
// 		var issellout = $(obj).attr("data-issellout");
// 		if(issellout == undefined){
// 			issellout = 0;
// 		}
// 		var params ={"mid":mid,"cartid":cartId,"productid":productid,"isSellOut":issellout,"curTab":curTab,"t":Math.random()};
// 		//emarbox ����룬ɾ�����ﳵ��20130902_zhaogangqiang
// 		try{deleteOneItem(productid);}catch(e){}
// 		try{product_delete(productid);}catch(e){}//ga����룬ɾ�����ﳵ
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
// //ɾ���Ѿ���ѡ��XY��Ʒ
// function delSelectedXYCartItem(obj){
// 	comAlert("��ȷ��Ҫɾ����",{"confirm":"ȷ��","cancel":"ȡ��"},function(){
//    		var ruleId = $(obj).attr("data-ruleid");
//    		if(!ruleId)return;
// 		var cartId = $(obj).attr("data-cartid");
// 		var mid = $(obj).attr("data-mid");
//    		var params ={"mid":mid,"cartid":cartId,"ruleid":ruleId,"t":Math.random()};
//    		// ɾ��XԪY��controller������Ϣ��js����������ʱ�����ص�data
//    		$.post(frontPath + "/delcartitemxy.do",params,function(data, status){callback_onlyRefreshCurrentCart("", {"cartId":cartId,"mid":mid})});
// 	});
// }
// //ɾ���Ѿ���ѡ�Ĺ��ﳵ
// function delSelectedCart(mid,tab){
// 	var params = new Object();
// 	params["tt"] = Math.random();
// 	var cartids = $("#delSelCartItems"+tab).attr("cartids");
// 	var todel = $("#delSelCartItems"+tab).attr("todel");
// 	if(todel == '2'){
// 		comAlert("��ѡ����Ҫɾ������Ʒ");
// 		return;
// 	}else{
// 		comAlert("��ȷ��Ҫɾ����",{"confirm":"ȷ��","cancel":"ȡ��"},function(){
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
// 		comAlert("ÿ������Ʒ������Ԥ����Ʒ������ͬһ���ﳵ�µ�����ѡ����Ҫ��������Ʒ��",{"confirm":"ȷ��"});
// 	}
// });
//
// function confinedArea(){
// 	if (c_pId && c_pId.length > 0) {
// 		var isHasBuyer = $('#isHasBuyer').val();
// 		addproductlimit(c_pId); //�������
// 		comAlert("������Ĳ�����Ʒ�޷����͵�ѡ����ַ��������ѡ�������ɾ����Ʒ��",{"confirm":"����ѡ�����","cancel":"ɾ����Ʒ"},
// 			function(){
// 				var isHasBuyer = $('#isHasBuyer').val();
// 				var curtabName = $("#curtabName").val();
// 				var value = jQuery.cookie("isSJ");//�Ƿ���������
// 				if(value == 1){//�����1��ʾ����������
// 					topayforsj(isHasBuyer,curtabName);
// 				}else if(value == 2){//�����2��ʾ����ͨ����
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
// //ȡ��ѡ��ÿ���ʻ�������Ԥ��     ����ÿ����ʹ��
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
// 	comAlert("ÿ������Ʒ������Ԥ����Ʒ������ͬһ���ﳵ�µ�����ѡ����Ҫ��������Ʒ��",{"confirm":"����ÿ����","cancel":"��������Ԥ��"},
// 		function(){
// 			selectEveryDayFreshCartItem(cartId, ifBuySalePids,userGroupId);
// 		},
// 		function(){
// 			selectEveryDayFreshCartItem(cartId, everyDayFreshPids,userGroupId);
// 	});
// 	$('#alertmsg_close10000').hide();
// }
//
// // ������ʾ 20150324
// function loadArealist(mid,cartid1,cartid2,cartid3){
// 	// �жϼ������ﳵ
// 	var cartids;
// 	if(typeof(cartid2) == "undefined"){ // ����
// 		cartids = cartid1 + "" ;
// 	}else if(typeof(cartid3) == "undefined"){ // �೵
// 		cartids = cartid1 + "," + cartid2 ;
// 	}else{  // �೵
// 		cartids = cartid1 + "," + cartid2 + "," + cartid3 ;
// 	}
// 	var params = {
// 		"cartids" : cartids,
// 		"mid" : mid,
// 		"t" : Math.random()
// 	};
// 	$('#loadRegion').load(frontPath + "/green2014/product/productexpectedtime.do", params,function(data){
// 		setArealist(mid);
// 		// modify by lihongyao 20170224������Ԥ���ʹ�ʱ���Ż�-ʵ�ֵ�ַ����
// 		var returnRegionId = $('#returnRegionId').val();
// 		if (returnRegionId) {
// 			setCity(returnRegionId, false);
// 		}
// 	});
// }
// // ѡ����������
// function setArealist(mid){
// 	var cartids = $(".order_nav .hover_li").attr("data-cartids");
// 	$('.addr_select').live('click',function(){
// 		var $this = $(this);
// 		$this.find('.text').addClass('text-click');
// 		$this.find('.content').show();
// 		//ѡ����������
// 		$('.delivery-tip .mc').delegate('li','click',function(){
// 			var $mcThis = $(this);
// 			var mcIndex = ($mcThis.parents('.mc').index())-1; //mc�����Ǵӵ�2����ʼ�� ����Ҫ��ȥ1
// 			var productid = $('#productid').val();
// 			var mid = $('#mid').val();
// 			//ʡ��
// 			if(mcIndex==1){
// 				$('#dfsecond').html("��ѡ��");
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
// 			//����
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
// 					if(obj.reslut.flag == 1){//������
// 						$('#dfthird').parent('li').hide();
// 						$('#thirdstep').hide();
// 						$('#secondstep').css('display','block');
// 						if(obj.reslut.flag == 0){
// 							 $("#thirdstep").html("");
// 							 return;
// 						}
// 						$('.content .mt').find('li').eq(2).hide();
// 						$('.content .mt').find('li').eq(1).addClass('current');
// 						//��ȡ���͵�ַ
// 						$('.region-text').html($('#option1').val()+$('#option2').val()+$('#option3').val());
// 						$this.find('.text').removeClass('text-click');
// 						$this.find('.content').hide();
// 						// ���ֶδ浽cookie��,���������ڵ�cookie����������Ĺرռ���ʧ
// //						$.cookie('deliveryRuleText' + mid, $this.find('.region-text').html());
// //						$.cookie('deliveryRuleRegionId' + mid, obj.reslut.returnRegionId);
// 						// ��ȡ�˷ѽ��
// //						getCartDeliveryRule(id);
// 						setCity(id, true);
// 						return;
// 					}else{
// 						$this.find('.content').show();
// 						$("#thirdstep").html(obj.reslut.areaHtml);
// 						$('#dfthird').parent('li').show();
// 						$('#dfthird').html("��ѡ��");
// 					}
// 			    });
// 				$('#option2').val($mcThis.html());
// 				$('#dfsecond').html($mcThis.html());
// 				var thirdRegion = $mcThis.parents('.mc').siblings('.mt').find('li').eq(2);
// 				thirdRegion.find('i').width(thirdRegion.outerWidth());
// 				$('#option3').val("");
// 			}
// 			//��/��
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
// 						comAlert("���͵�������");
// 						return;
// 					 }else{
// 						$('#option3').val($mcThis.html());
// 						$('#dfthird').html($mcThis.html());
// 						var thirdBorder = $mcThis.parents('.mc').siblings('.mt').find('li').eq(2);
// 						thirdBorder.find('i').width(thirdBorder.outerWidth());
// 						$this.find('.text').removeClass('text-click');
// 						$this.find('.content').hide();
// 						// ��ȡ���͵�ַ
// 						$('.region-text').html($('#option1').val()+$('#option2').val()+$('#option3').val());
// 						// ���ֶδ浽cookie��,���������ڵ�cookie����������Ĺرռ���ʧ
// //						$.cookie('deliveryRuleText' + mid, $this.find('.region-text').html());
// //						$.cookie('deliveryRuleRegionId' + mid, obj.reslut.returnRegionId);
// 						// ��ȡ�˷ѽ��
// //						getCartDeliveryRule(regionId);
// 						/**
// 						 * add by lihongyao 20160720 ���а�����ָ�����кϲ����ʺ���ͨ�������ﳵҳ���Ͻ��л�����ʱ��������cityid���¼ӳ�
// 						 * 1��20170224������Ԥ���ʹ�ʱ���Ż�-ʵ�ֵ�ַ���� cookie�����ַ�վ
// 						 */
// 						setCity(id, true);
// 					 }
// 				});
// 			}
// 			var currentRegion = $mcThis.parents('.mc').siblings('.mt').find('li').eq(mcIndex);
// 			//��ȡ���������ߵĿ��
// 			currentRegion.find('i').width(currentRegion.outerWidth());
// 			//ѡ�е����� ��һ��������ʾ
// 			currentRegion.addClass('current').show().siblings().removeClass('current');
// 			currentRegion.parents('.mt').siblings('.mc').eq(mcIndex).show().siblings('.mc').hide();
// 			return false;
// 		});
//
// 		//�л������͵���
// 		$('.delivery-tip .mt').find('li').click(function(){
// 			var mtIndex = $(this).index();
// 			$(this).find('i').width($(this).outerWidth());
// 			$(this).addClass('current').siblings().removeClass('current');
// 			$(this).parents('.mt').siblings('.mc').eq(mtIndex).show().siblings('.mc').hide();
//
// 		});
//
// 		//�رհ�ť
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
// //����cityid
// function setCity(regionId, isLoadRule) {
// 	$.post(frontPath + "/cart/setcity.do", {"regionId" : regionId} , function(data){
// 		var result = eval('(' + data + ')');
// 		if (result.isReFresh) {
// 			var uri = frontPath + "/Cart/ShowCart.do?t=" + Math.random();
// 			window.location.href = uri;
// 		} else {
// 			if (isLoadRule) {
// 				// ��ȡ�˷ѽ��
// 				getCartDeliveryRule(regionId);
// 			}
// 		}
// 	});
// }
//
// // ���ﳵ�������͵����˷�
// function loadCartDeliveryRule(totalPrice, mid){
// 	// ȡ��ǰҳǩ�����й��ﳵ
// 	var cartids = $(".hover_li").attr("data-cartids");
// 	var url = "/Cart/cartdeliveryrule.do" ;
// 	var params = new Object();
// 	params["cartids"] = cartids;
// 	params["mid"] = mid;
// 	$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 	$.post(url , params , function(data){
// 		if(data.indexOf("errorCode") == -1){
// 			var totaldelivery = 0; // ���˷�
// 			var cartdeliverys = data.split(','); // ��ַ���ֵ����cart���˷�
// 			var nosupportCarts = new Array();
// 			for(var i = 0 ;i < cartdeliverys.length ; i++){
// 				var cartdelivery = cartdeliverys[i];
// 				var cartiddelivery = cartdelivery.split('=');
// 				var cartid = cartiddelivery[0] ; // cartid
// 				var delivery = cartiddelivery[1] ; // �˷�
// 				var carttype = cartiddelivery[2] ; // carttype
// 				if("nosupport" == delivery){
// 					var nosupportcontent = "<i class='png fl'></i><span class='png fl'>�õ�����֧������</span><div class='clear'></div>";
// 					$('#j-mian' + cartid).removeClass('mian').addClass('cou-m').html(nosupportcontent);
// 					//$('#j-mian' + cartid).parent().parent().find(".content_type_zp").addClass("limit");
// 					nosupportCarts.push('all'+cartid);
// 				}else if(delivery > 0){ // �˷�>0������ ����ʾ�յ�����
// 					// ���˷ѵ���ʾ��Ϣ
// 					var strdelivery = Number(Number(delivery) / 100).toFixed(2);
// 					var content = "<i class='png fl'></i><a href='#anchor-relationFree"+cartid+"'><span class='png fl'>�յ�</span></a><div class='clear'></div>";
// 					$('#j-mian' + cartid).removeClass('mian').addClass('cou-m').html(content);
// 					if(carttype <= 2){
// 						showRelationFree(cartid); //չʾ�յ�
// 					}else{
// 						hideRelationFree(cartid); //���شյ�
// 					}
// 				}else{ // ����
// 					$('#j-mian' + cartid).removeClass('cou-m').addClass('mian').html("");
// 					hideRelationFree(cartid); //���شյ�
// 				}
// 				if("nosupport" != delivery){
// 					totaldelivery = Number(Number(totaldelivery) + Number(delivery / 100)).toFixed(2); // ���˷����
// 				}
// 			}
// 			var curTab = $(".order_nav .hover_li").attr("data-tab");
// 			var strTotaldelivery = (Number(totaldelivery)).toFixed(2);
// 			$('#j-totaldeliveryrule'+curTab).html("��" + strTotaldelivery); // Ԥ���˷�
// 			var strTotal = Number(Number(totaldelivery) + Number(totalPrice)).toFixed(2);
// 			$('#j-totaltopay'+curTab).html("��" + strTotal); // Ӧ�����
// 			// ��ѡ��Ʒ(��Ԥ���˷�) + ����С����ͼ�갴ť
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
// // ������������޸��˷�
// function getCartDeliveryRule(parentId){
// 	var cartids = $(".order_nav .hover_li").attr("data-cartids");
// 	// ��ȡ��ǰ���ﳵ��������������е���
// 	$(".order_nav ul li").each(function(){
// 		if(!$(this).hasClass("hover_li")){
// 			var index_li = $(this).attr("data-index")-1;
// 			//��ȡ��ǰ���ﳵ�⹺�ﳵҳǩ����
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
// 			var totaldelivery = 0; // ���˷�
// 			var cartdeliverys = data.split(','); // ��ַ���ֵ����cart���˷�
// 			var nosupportCarts = new Array();
// 			for(var i = 0 ;i < cartdeliverys.length ; i++){
// 				var cartdelivery = cartdeliverys[i];
// 				var cartiddelivery = cartdelivery.split('=');
// 				var cartid = cartiddelivery[0] ; // cartid
// 				var delivery = cartiddelivery[1] ; // �˷�
// 				var carttype = cartiddelivery[2] ; // carttype
// 				if("nosupport" == delivery){
// 					var nosupportcontent = "<i class='png fl'></i><span class='png fl'>�õ�����֧������</span><div class='clear'></div>";
// 					$('#j-mian' + cartid).removeClass('mian').addClass('cou-m').html(nosupportcontent);
// 					//$('#j-mian' + cartid).parent().parent().find(".content_type_zp").addClass("limit");
// 					// ��֧�����͵ĵ���
// 					nosupportCarts.push('all'+cartid);
// 				}else if(delivery > 0){ // �˷�>0������ ����ʾ�յ�����
// 					// ���˷ѵ���ʾ��Ϣ
// 					var strdelivery = Number(Number(delivery) / 100).toFixed(2);
// 					var content = "<i class='png fl'></i><a href='#anchor-relationFree"+cartid+"'><span class='png fl'>�յ�</span></a><div class='clear'></div>";
// 					$('#j-mian' + cartid).removeClass('mian').addClass('cou-m').html(content);
// 					if(carttype <= 2){
// 						showRelationFree(cartid); //չʾ�յ�
// 					}else{
// 						hideRelationFree(cartid); //���شյ�
// 					}
// 				}else{ // ����
// 					$('#j-mian' + cartid).removeClass('cou-m').addClass('mian').html("");
// 					hideRelationFree(cartid); //���شյ�
// 				}
// 				if("nosupport" != delivery){
// 					totaldelivery = Number(Number(totaldelivery) + Number(delivery / 100)).toFixed(2); // ���˷����
// 				}
// 			}
// 			var curTab = $(".order_nav .hover_li").attr("data-tab");
// 			var totaldeliveryrule = $('#j-totaldeliveryrule'+curTab);// Ԥ���˷�
// 			var strTotaldelivery = Number(Number(totaldelivery)).toFixed(2); // �µ�Ԥ���˷�
// 			var oldtotaldeliveryrule = totaldeliveryrule.text().replace("��", ""); // �ɵ�Ԥ���˷�
// 			totaldeliveryrule.html("��" + strTotaldelivery);
// 			// ���˷�����˷�����ֵ �����Ͼɵ�Ӧ����Ϊ�µ�Ӧ�����
// 			var totaltopay = $('#j-totaltopay'+curTab);
// 			var oldtotaltopay = totaltopay.text().replace("��", ""); // �ɵ�Ӧ�����
// 			var strTotal = Number(Number(strTotaldelivery) - Number(oldtotaldeliveryrule) + Number(oldtotaltopay)).toFixed(2);
// 			totaltopay.html("��" + strTotal); // �µ�Ӧ�����
// 			$('#j-totalwithdelivery').html("��" + strTotal); // ��ѡ��Ʒ(��Ԥ���˷�)
// 			// ��֧�����͵ĵ���
// 			if(nosupportCarts.length > 0){
// 				for(var i = 0 ;i < nosupportCarts.length ; i++){
// 					cancelAllCartItem(nosupportCarts[i] , mid);
// 				}
// 			}
// 		}
// 	});
// }
//
// // ȡ����ѡ���й��ﳵ��
// function cancelAllCartItem(id,mid){
// 	var cartids = $("#"+id).attr("cartids");
//     jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 	var params = new Object();
// 	params["selFlag"] = "false";
// 	params["cartIds"] = cartids;
// 	jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 		// ȡ����ǰ���ﳵ�����й�ѡ
// 		var miandiv = $('#j-mian'+cartids);
// 		var cartdiv = miandiv.parents('.ordercont_content_cw div').parent();
// 		cartdiv.find(':checkbox').each(function(){
// 			$(this).attr('checked',false);
// 		});
// 		// ȫѡȡ����ѡ
// 		$('.checkall').attr('checked',false);
// 		// �����ϼ�0kg ���ϼƣ�0.00
// 		miandiv.parent().find('.total').html('<span>�����ϼ�0kg</span><span>���ϼƣ�0.00</span>');
// 		// ���ع���
// 		cartdiv.find('.j-total'+cartids).hide();
// 		if(data != 1 && data.indexOf("10:") == -1 && data.indexOf("11:") == -1){
// 			comAlert(data);
// 		}
// 	});
// }
//
// // �������͵������������Ч��
// function orderNavHover(){
// 	var lenLi = $('.order_nav').find('li').length;
// 	$('.order_nav').find('li').each(function(){
// 		if (lenLi > 4) {
// 			var charLi = $(this).find('strong').html();
// 			var stringLi = charLi.replace(charLi.substring(3),'...');
// 			$(this).find('strong').html(stringLi);
// 			//�����ͣ�ջ��� ��ʾ��ʾ
// 			$(this).hover(function(){
// 				$(this).addClass('order-li');
// 			},function(){
// 				$(this).removeClass('order-li');
// 			})
// 		}
// 	});
// }
//
// // �羳�������ϼ��������Ч��
// function orderContHover(){
// 	$('.ordercont-title-cw .total').hover(function() {
// 		$(this).find('.crosshover').find('span').show();
// 	}, function() {
// 		$('.crosshover').find('span').hide();
// 	});
// }
//
// // ��ׯ��������ʽ
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
// // ���ﳵ�ֲ�ˢ��ͬ��������Ʒ����
// function synchronousNavAmount(amount){
// 	$('.order_nav .hover_li').find('em').each(function(){
// 		$(this).html(amount);
// 	});
// }
//
//
// // �羳�����빺�ﳵ
// function initCrossCart(){
// 	var nav = $(".order_nav .hover_li");
// 	var cartids = nav.attr("data-cartids");
// 	var mid = nav.attr("data-mid");
// 	if(typeof(cartids) != "undefined" && typeof(mid) != "undefined" && cartids.indexOf(',') != -1){
// 		var index = nav.attr("data-index")-1;
// 		//��ȡ��ǰ���ﳵҳǩ����
// 		var curObj = $(".ordercont_content").eq(index);
// 		if(curObj.attr("data-cross-first") != "n"){
// 			// ��ȡ���г�id�����˵�һ�����ﳵ��
// 			var cartidlist = cartids.substr(2, cartids.length - 1);
// 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 			var params = new Object();
// 			params["selFlag"] = "false";
// 			params["cartIds"] = cartidlist;
// 			// unchecked ���г�
// 			jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 				//��ȡ��ǰҳǩ����ع��ﳵ����
// 				var curtab = nav.attr("data-tab")==null ? 1 : nav.attr("data-tab");
// 				//�ж��Ƿ��״Σ��״μ��ص�ҳǩ��Ҫ������
// 				if(curObj.attr("data-cross-first") != "n"){
// 					curObj.attr("data-cross-first","n");
// 					var uri = frontPath + "/cart/loadcartcontent.do";
// 					params={curTab:curtab,"t":Math.random()};
// 					//�ֲ�ˢ�¹��ﳵ
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
// // �羳�����ﳵȫѡ
// function selectCrossAllCartItem(id,mid){
// 	var cartid = $("#"+id).attr("cartids");
// 	var cartids = $(".order_nav .hover_li").attr("data-cartids");
// 	// ֻ��һ���̼�
// 	if(cartid === cartids){
// 		selectAllCartItem(id,mid);
// 		return;
// 	}else{
// 		// ����̼�
// 		var allcartids = cartids.split(',');
// 		var allcartid = '';
// 		for(var i = 0 ; i < allcartids.length ; i++ ){
// 			if(cartid != allcartids[i]){
// 				allcartid = allcartid + allcartids[i] + ',';
// 			}
// 		}
// 		// ȥ�����һ������
// 		var unselectcartids = allcartid.substr(0, allcartid.length - 1);
// 		jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 		var params = new Object();
// 		params["selFlag"] = "false";
// 		params["cartIds"] = unselectcartids;
// 		// ȡ������ unselectcartids
// 		jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 			var selFlag = $("#"+id).attr("checked");
// 			params = new Object();
// 			params["selFlag"] = selFlag;
// 			params["cartIds"] = cartid;
// 			// ѡ���ȡ�� ��ǰѡ�еĹ��ﳵ
// 			jQuery.post(frontPath + "/selectAllCartItem.do", params, function(data) {
// 				var nav = $(".order_nav .hover_li");
// 				var index = nav.attr("data-index") - 1;
// 				//��ȡ��ǰҳǩ����ع��ﳵ����
// 				var curtab = nav.attr("data-tab")==null ? 1 : nav.attr("data-tab");
// 				//��ȡ��ǰ���ﳵҳǩ����
// 				var curObj = $(".ordercont_content").eq(index);
// 				var uri = frontPath + "/cart/loadcartcontent.do";
// 				params = {curTab:curtab,"t":Math.random()};
// 				//�ֲ�ˢ�¹��ﳵ
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
// // �羳�����ﳵ��ѡ
// function selectCrossCartItem(cartId, indexId, productid, mid, userGroupId,amount,sellAbleAmount){
// 	var cartids = $(".order_nav .hover_li").attr("data-cartids");
// 	// ֻ��һ���̼�
// 	if(cartId === cartids){
// 		selectCartItem(cartId, indexId, productid, mid, userGroupId,amount,sellAbleAmount);
// 		return;
// 	}else{
// 		// ����̼�
// 		var allcartids = cartids.split(',');
// 		var allcartid = '';
// 		for(var i = 0 ; i < allcartids.length ; i++ ){
// 			if(cartId != allcartids[i]){
// 				allcartid = allcartid + allcartids[i] + ',';
// 			}
// 		}
// 		// ȥ�����һ������
// 		var unselectcartids = allcartid.substr(0, allcartid.length - 1);
// 		jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
// 		var params = new Object();
// 		params["selFlag"] = "false";
// 		params["cartIds"] = unselectcartids;
// 		// ȡ������ unselectcartids
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
// 				//��ȡ��ǰҳǩ����ع��ﳵ����
// 				var curtab = nav.attr("data-tab")==null ? 1 : nav.attr("data-tab");
// 				//��ȡ��ǰ���ﳵҳǩ����
// 				var curObj = $(".ordercont_content").eq(index);
// 				var uri = frontPath + "/cart/loadcartcontent.do";
// 				params = {curTab:curtab,"t":Math.random()};
// 				//�ֲ�ˢ�¹��ﳵ
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
// // �������չʾ��һ���Ӽ۹�
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
// 				var saleRuleProduct = $(".j-relationFree" + cartid).parents('ul').find('li'); // �������
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
// 	$(".limit").find("input[type='checkbox']").after("<span class='limit-icon'>����</span>");
// }
// function deliveryxqadd(){
// 	//����
// 	$(".limitxq").append("<div class='limit-mask'></div>");
// 	$(".limitxq").find(".img_a").find("img").after("<span class='limit-pic'></span>");
// 	$(".limitxq").find("input[type='checkbox']").after("<span class='limit-icon'>����</span>");
// }
// function deliveryclear(){
// 	//��ԭ��ʽ
// 	$(".limit").find(".limit-icon").remove();
// 	$(".limit").find(".limit-pic").remove();
// 	$(".limit").find(".limit-mask").remove();
// 	$(".limit").removeClass("limit");
// }
// /*��ȡ�������� ��Ⱦ��ʽrong*/
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

