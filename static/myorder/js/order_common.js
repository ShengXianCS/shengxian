
//��ȡ��������
function prepareGetlinkORlook(linkORlook,orderid,includeFlashbuy,mid){
	if(linkORlook == 1){//1�����ж��ǻ�ȡ����
		jQuery("#getCoquetryLink" + orderid).load(frontPath+"/Member/CoquetryOrderLink.do?id=" + orderid+ "&mid=" + mid + "&includeFlashbuy="+includeFlashbuy);
		jQuery("#getCoquetryLink" + orderid).show();
	}
}
function hide(orderid){
	jQuery("#getCoquetryLink" + orderid).hide();
}
//��Ʒ���빺�ﳵ
function isGoToCart(orderid,amount,mid){
  //��ǰ������Ʒ����
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
//�������빺�ﳵ
function isOrderGoToCart(orderId,mid){
	var params = new Object();  
    params["orderId"] = orderId;
    jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
    jQuery.post(frontPath+"/Member/OrderToCart.do",params,function(data){
    	loadOrderAddToCartMessage(data,{"mid":mid,"addTypeFlag":1});
	});
}
//�ж����ڸ�ʽYYYY-MM-dd
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
				//alert("payModeId=14125=��֧��");
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
	//�����б�ҳ
	var orderListTags = $("span.topayimg a")
	//��������ҳ
	var orderDetailTag = $("div.summ_2f_topay a");
	addEventToTags(orderListTags);
	addEventToTags(orderDetailTag);
});
//����ǰ ��֤����״̬
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
//Ϊȥ֧����ť�����¼�������Ѿ����¼�������
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
//���Ļ�ȫ���ַ��ı�׼length
String.prototype.len = function(){return this.replace(/[^x00-xff]/g,"aa").length;}