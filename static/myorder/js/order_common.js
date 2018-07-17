
//获取撒娇链接
function prepareGetlinkORlook(linkORlook,orderid,includeFlashbuy,mid){
	if(linkORlook == 1){//1用来判断是获取链接
		jQuery("#getCoquetryLink" + orderid).load(frontPath+"/Member/CoquetryOrderLink.do?id=" + orderid+ "&mid=" + mid + "&includeFlashbuy="+includeFlashbuy);
		jQuery("#getCoquetryLink" + orderid).show();
	}
}
function hide(orderid){
	jQuery("#getCoquetryLink" + orderid).hide();
}
//商品加入购物车
function isGoToCart(orderid,amount,mid){
  //当前购买商品数量
    var newTab=window.open('about:blank');
	var params = new Object();  
    params["ObjectId"] = orderid;
    params["mid"] = mid;
    params["jianshu"] = amount;
    params["isRedirectCart"] = "isRedirectCart";
    params["randomT"] = Math.random();
    jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
    jQuery.post(frontPath+"/addtocart.do",params,function(data){
		loadAddToCartMessage2(data, {"newTab":newTab,"orderId":orderid,"addTypeFlag":1,"mid":mid});
 		});
}
//订单加入购物车
function isOrderGoToCart(orderId,mid){
	var params = new Object();  
    params["orderId"] = orderId;
    jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
    jQuery.post(frontPath+"/Member/OrderToCart.do",params,function(data){
    	loadOrderAddToCartMessage(data,{"mid":mid,"addTypeFlag":1});
	});
}
//判断日期格式YYYY-MM-dd
function strDateTime(str)
{
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if(r==null)return false; 
	var d= new Date(r[1], r[3]-1, r[4]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}
function judgeBank(currBank,obj,defaultbank,id){
	var orderId = $(obj).parent().attr("orderid");
	var isPass = checkOrderStateBefPay(orderId);
	//obj.href=document.getElementById("AlipayBankURL").value;
	obj.href = $(obj).children('#AlipayBankURL').val();
	return isPass;
}
$(function(){
	$("#payOrderForm").submit(function(){
		var orderId = $("#payOrderForm").parent().attr("orderid");
		/*var parentAliasId = $("#payOrderForm").parent().attr("parentaliasid");
		var payModeId = $("#payOrderForm").parent().attr("paymodeid");*/
		var isPass = checkOrderStateBefPay(orderId);
		/*if(isPass){
			if(payModeId == "14125"){
				//alert("payModeId=14125=翼支付");
				var orderseq = $("#ORDERREQTRANSEQ"+orderId).val();
				$.ajax({
					  type: "post",
					  url: frontPath+"/paymode/savebestpayseq.do",
					  data: {parentAliasId:parentAliasId,ORDERREQTRANSEQ:orderseq},
					  success: function (result){
						 isPass = result.isPass;
					  },
					  dataType: "json",
					  async: false
				 });
			}
		}*/
		return isPass;
	});
	//订单列表页
	var orderListTags = $("span.topayimg a")
	//订单详情页
	var orderDetailTag = $("div.summ_2f_topay a");
	addEventToTags(orderListTags);
	addEventToTags(orderDetailTag);
});
//付款前 验证订单状态
function checkOrderStateBefPay(orderId){
	var isPass = false;
	$.ajax({
	  type: "get",
	  url: frontPath+"/Member/checkOrderStateBefPay.do",
	  data: {orderId:orderId},
	  success: function (result){
			isPass = result.isPass;
			var errorMsg = result.errorMsg;
			if(!isPass){
				parent.comAlert(errorMsg);
			}
	  },
	  dataType: "json",
	  async: false
	});
	return isPass;
}
//为去支付按钮增加事件，如果已经绑定事件则不增加
function addEventToTags(objs){
	for(var i = 0;i<objs.length;i++){
		var obj = objs.get(i);
		if(obj.onclick == null){
			obj.onclick = function(){
				var orderId = $(this).parent().attr("orderid");
				var isPass = checkOrderStateBefPay(orderId);
				return isPass;
			};
		}
	}
}

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
//中文或全角字符的标准length
String.prototype.len = function(){return this.replace(/[^x00-xff]/g,"aa").length;}