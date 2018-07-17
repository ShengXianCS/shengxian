//默认地址位列第一
$(function(){
   var defalutAddressId=$("#defalutAddressId").val();
   if(defalutAddressId!=null && defalutAddressId>0){
      $("#defalutAddress").html($("#old_add_"+defalutAddressId).html());
      $("#old_add_"+defalutAddressId).remove();
   }else{
	   $("#defalutAddress").remove();
   }	   
});
/*删除收货地址*/
function addrDel(id){
	var defalutAddressId=$("#defalutAddressId").val();
	parent.comAlert("您确定要删除吗？？",{"confirm":"确认","cancel":"取消"},function(){
		jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	    jQuery.post(frontPath+"/Member/AddressDelete.do",{addressId:id},function(msg){
	       var aData = msg.split(",");
	       if(aData[0]==0){
	           $("#old_add_"+id).remove();
	           if(defalutAddressId!=null && defalutAddressId!='' && defalutAddressId==id){
	        	   $("#defalutAddress").remove();
	           }
	       }
	    });
	},function(){
		return;
	});
}
//将指定地址设置为默认地址
function updateDefaultAddress(regionid,useraddressid,username,usesddress,userphone,telephone,addressType){
	var params = new Object();
	var types = "1,2,3";
	params["types"] = types;
	params["addressid"] = useraddressid;
	params["regionid"] = regionid;
	params["name"] = username;
	params["address"] = usesddress;
	params["mobilephone"]= userphone;
	params["telephone"]= telephone;
	params["isDefaultAddress"] = "true";
	params["addressType"] = addressType;
	$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	$.post(frontPath+"/checkout/updateaddress.do",params,function(data){
		var ay = eval("(" + data + ")");
		if(ay && ay.errorCode && ay.errorCode != "" && ay.errorCode != "0"){
			showError(ay.errorCode);
		}else{
			//设置成功
			//$(".content").children(".adds").removeClass("old_add_default").addClass("old_add");
    		//$("#old_add_"+useraddressid).removeClass("old_add").addClass("old_add_default");	
			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
		    window.location.href=frontPath+"/Member/AddressList.do"
		}
	});
}
 
/*编辑弹出层*/
 function update(id){
	jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
    jQuery.post(frontPath+"/Member/UpdateAddressView.do",{addressId:id},function(msg){
	   	$("#updateDIV").empty();
	   	$("#updateDIV").append(msg);
	   	getAreaCascade($("#regionId").val(),chooseAreaResultView); 
	   	var areaCode_patrn = /^\d{3,6}$/;
		var phone_patrn = /^\d{5,10}$/;
		var extension_patrn = /^\d{1,6}$/;
		var telephone=$("#telephone").val();
		var usertels = telephone.split("-");
		if(usertels && usertels.length > 1 && usertels.length < 4){
			if(areaCode_patrn.exec(usertels[0])){
				$("#receiverTelephone_areaCode").val(usertels[0]).css("color","#000");
			}
			if(phone_patrn.exec(usertels[1])){
				$("#receiverTelephone_phone").val(usertels[1]).css("color","#000");
			}
			if(extension_patrn.exec(usertels[2])){
				$("#receiverTelephone_extension").val(usertels[2]).css("color","#000");
			}
		}else if(usertels.length == 1 && phone_patrn.exec(usertels[0])){
			$("#receiverTelephone_phone").val(usertels[0]).css("color","#000");
		}
		jqObj.val(telephone).css("color","#000");
   });
 }

/*添加弹出层*/
$(function(){
	 $(".addnew_add").click(function(){
		 jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	     jQuery.post(frontPath+"/Member/AddAddressView.do",function(msg){
	        	$("#addDIV").empty();
	        	$("#addDIV").append(msg);
	        	getAreaCascade(1602,chooseAreaResultView);
	     });
 	 });
});
 
//获取级联地区列表
 function getAreaCascade(areaId,callbackFunc,callbackParams){
 	var params = new Object();
 	params["mid"] = 0;
 	params["type"] = 0;
 	params["areaId"] = areaId;
 	params["whereArea"] = 'receivingArea';
 	jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
 	jQuery.post(frontPath+"/Member/checkout/arealist.do",params,function(data, state){
 		var result = eval('(' + data + ')');
 		if(result && result.errorCode && result.errorCode != "" && result.errorCode != "0"){
 			showMsg(result.errorCode);
 		}else if(result != ""){
 			jQuery("#ares").empty();
 			jQuery("#ares").append(result);
 			if(typeof callbackFunc != 'undefined' && callbackFunc instanceof Function){
 				callbackFunc(data, callbackParams);
 			}
 		}else if(result == ""){
 			var params2 = new Object();
 			params2["mid"] = 0;
 			params2["type"] = 0;
 			params2["areaId"] = 1602;
 			params2["whereArea"] = 'receivingArea';
 			params2["cartids"] = $("#cartIds").val();
 			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
 			jQuery.post(frontPath+"/Member/checkout/arealist.do",params2,function(data2){
 				var result2 = eval('(' + data2 + ')');
 				jQuery("#ares").empty();
 				jQuery("#ares").append(result2);
 				if(typeof callbackFunc != 'undefined' && callbackFunc instanceof Function){
 					callbackFunc(data, callbackParams);
 				}
 			});
 		}
 	});
 }

 //错误信息显示
function showMsg(msg){
  jQuery("#showMsg").html(msg).css("visibility","visible");
  setTimeout(function(){
    jQuery("#showMsg").css("visibility","hidden");
  },10000);
}
//添加修改提交表单验证
function submitForm(){
  //check收货人
  if(!valiReceiverName()){
    return;
  }
  //check所在地
  var tempregionid = null;
  for(var i = 0; i <= 10; i++){
		tempregionid = $("#area" + i).val();
		if(typeof(tempregionid) != "undefined" && tempregionid == -1 || tempregionid == "请选择..."){
			jQuery("#showMsg").html("请选择您的所在收货人地区！");
			return;
		}
  }
  //check详细地址
  if(!valiReceiverAddress()){
	 return;
  }
  //check地址标注
  var addressType = document.getElementsByName("addressType")
  var len = addressType.length;
  var falg = false;
  for (var i=0;i<len ;i++ ){
	if(addressType[i].checked==true){
		falg = true;
		break;
	}
  }
  if(!falg){
	showMsg("请选择地址标注！");
  	return;
  }
  //check手机,固定电话
  if(!valiReceiverTelephoneOrMobie()){
	return;
  }
  jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
  jQuery("#addrForm").ajaxSubmit(addrResult);
}

function addrResult(msg){
    var aData = msg.split(",");
    if(aData[0]=="0"){
      jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
      window.location.href=frontPath+"/Member/AddressList.do"
    }
    if(aData[0]=="1"){
      showMsg("抱歉，增加地址失败，请稍后再试！");
    }
}


//选择收货地址--地区级联菜单
function chooseArea(selectid){
	var parentid = jQuery("#"+selectid).val();
	if(parentid == -1){
		return;
	}
	jQuery("#regionId").val(parentid);
	getAreaCascade(parentid, chooseAreaResultView);
}

//选择收货地址异步回传后的局部渲染
function chooseAreaResultView(data, callbackParams){
	var selectAreaAddress = getSelectAreaAddress();
	if($.trim(selectAreaAddress) != ""){
		$("#newaddressprefix").html(trimCommaArr(selectAreaAddress).join(" ")).show();
	}else{
		$("#newaddressprefix").hide();
	}
}


//同时校验手机和固定电话的有效性
function valiReceiverTelephoneOrMobie(){
	var telephoneAreaCode = jQuery("#receiverTelephone_areaCode").val() == jQuery("#receiverTelephone_areaCode").attr("data-value") ? "" : jQuery("#receiverTelephone_areaCode").val();
	var telephoe = jQuery("#receiverTelephone_phone").val() == jQuery("#receiverTelephone_phone").attr("data-value") ? "" : jQuery("#receiverTelephone_phone").val();
	var telephoneExtension = jQuery("#receiverTelephone_extension").val() == jQuery("#receiverTelephone_extension").attr("data-value") ? "" : jQuery("#receiverTelephone_extension").val();
	var mobiephone = jQuery("#mobilePhone").val();
	if(getReceiverTelephone()){
		if(mobiephone != ""){
			if(tempValiReceiverMobie()){
				if(telephoe != "" && telephoneAreaCode == ""){
					showMsg("区号是3-6位数字，电话号码是5-10位数字，分机号是0-6位数！");
				}else{
					return true;
				}
			}else{
				showMsg("请填写固定格式电话或者手机！");
			}
		}
	}
	if(valiReceiverMobie()){
		if(telephoe != "" || telephoneAreaCode != "" || telephoneExtension != ""){
			if(telephoe != "" && telephoneAreaCode == ""){
				showMsg("区号是3-6位数字，电话号码是5-10位数字，分机号是0-6位数！");
			}else if(getReceiverTelephone()){
				return true;
			}else{
				showMsg("区号是3-6位数字，电话号码是5-10位数字，分机号是0-6位数！");
			}
		}else if(telephoe == "" && telephoneAreaCode == "" && telephoneExtension == ""){
			return true;
		}
	}
	return false;
}
//拼接固定电话
function getReceiverTelephone(){
	var receiverTelephone = "";
	var isFalg = false;
	var receiverTelephoneAreaCode = jQuery("#receiverTelephone_areaCode").val() == jQuery("#receiverTelephone_areaCode").attr("data-value") ? "" : jQuery("#receiverTelephone_areaCode").val();
	var receiverTelephonePhone = jQuery("#receiverTelephone_phone").val() == jQuery("#receiverTelephone_phone").attr("data-value") ? "" : jQuery("#receiverTelephone_phone").val();
	var receiverTelephoneExtension = jQuery("#receiverTelephone_extension").val() == jQuery("#receiverTelephone_extension").attr("data-value") ? "" : jQuery("#receiverTelephone_extension").val();
	if(receiverTelephonePhoneBlur() && receiverTelephonePhone){
		if(valiReceiverTelephoneareaCodeBlur() || receiverTelephoneAreaCode == ""){
			if(receiverTelephoneAreaCode != ""){
				receiverTelephone += receiverTelephoneAreaCode + "-";
				isFalg = true;
			}
		}else{
			return false;
		}
		receiverTelephone += receiverTelephonePhone;
		if(receiverTelephoneExtensionBlur() && isFalg || receiverTelephoneExtension == ""){
			if(receiverTelephoneExtension != ""){
				receiverTelephone += "-" + receiverTelephoneExtension;
			}
		}else{
			return false;
		}
		$("#telephone").val(receiverTelephone);
		return true;
	}else{
		$("#telephone").val("");
		return false;
	}
}

//验证手机号有效性
function valiReceiverMobie(){
	var mobiephone = jQuery("#mobilePhone").val();
	if(mobiephone == "" && !tempReceiverTelephonePhoneBlur()){
		showMsg("请填写正确的固定电话或者手机！");
		return false;
	}else if(mobiephone != ""){
		//支持11位手机号码验证
		var tmp = /^1[3-9]\d{9}$/;    
		var flag=tmp.test(mobiephone);
		if(!flag){   
			showMsg("请填写正确的手机号码！");
			return false;   
		}  
	}
	showMsg("");
	return true;
}
//验证固话有效性
function valiReceiverTelephone(){
	var telephoneAreaCode = jQuery("#receiverTelephone_areaCode").val() == jQuery("#receiverTelephone_areaCode").attr("data-value") ? "" : jQuery("#receiverTelephone_areaCode").val();
	var telephoe = jQuery("#receiverTelephone_phone").val() == jQuery("#receiverTelephone_phone").attr("data-value") ? "" : jQuery("#receiverTelephone_phone").val();
	var telephoneExtension = jQuery("#receiverTelephone_extension").val() == jQuery("#receiverTelephone_extension").attr("data-value") ? "" : jQuery("#receiverTelephone_extension").val();
	if(telephoe != "" || telephoneAreaCode != "" || telephoneExtension != ""){
		showMsg("区号是3-6位数字，电话号码是5-10位数字，分机号是0-6位数！");
	}else if(telephoe == "" && telephoneAreaCode == "" && telephoneExtension == ""){
		return true;
	}
	return true;
}

//验证手机号有效性:防止死循环
function tempValiReceiverMobie(){
	var mobiephone = jQuery("#mobilePhone").val();
	if(mobiephone == ""){
		return false;
	}else if(mobiephone != ""){
		//支持11位手机号码验证
		var tmp = /^1[3-9]\d{9}$/;    
		var flag = tmp.test(mobiephone);
		if(!flag){   
			return false;   
		}  
	}
	showMsg("");
	return true;
}

//验证区号：鼠标得到焦点
function valiReceiverTelephoneareaCodeFocus(){
	showMsg("");
	var areaCode = $("#receiverTelephone_areaCode");
	if(areaCode.val() == $("#receiverTelephone_areaCode").attr("data-value")){
		areaCode.val("").css("color","#999");
	}
}
//验证区号：鼠标失去焦点
function valiReceiverTelephoneareaCodeBlur(){
	var areaCode = $("#receiverTelephone_areaCode").val();
	var patrn = /^\d{3,6}$/;
	if(areaCode == $("#receiverTelephone_areaCode").attr("data-value")){
		areaCode = "";
	}
	if($.trim(areaCode) == "" || areaCode == null){
		$("#receiverTelephone_areaCode").val($("#receiverTelephone_areaCode").attr("data-value")).css("color","#C9C9C9");
		return true;
	}else if(areaCode != "" && !patrn.exec(areaCode)){
		 showMsg("请填写区号,长度是3-6位数字！");
		return false;
	}
	return true;
}
//验证电话号：鼠标得到焦点
function receiverTelephonePhoneFocus(){
	showMsg("");
	var areaCode = $("#receiverTelephone_phone");
	if(areaCode.val() == $("#receiverTelephone_phone").attr("data-value")){
		areaCode.val("").css("color","#999");
	}
}
//验证电话号：鼠标失去焦点
function receiverTelephonePhoneBlur(){
	var telephoe = $("#receiverTelephone_phone").val();
	var patrn = /^\d{5,10}$/;
	if(telephoe == $("#receiverTelephone_phone").attr("data-value")){
		telephoe = "";
	}
	if($.trim(telephoe) == ""){
		$("#receiverTelephone_phone").val($("#receiverTelephone_phone").attr("data-value")).css("color","#C9C9C9");
		if(!tempValiReceiverMobie()){
			showMsg("请填写正确的固定电话或者手机！");
			return false;
		}
	}else if(telephoe && !patrn.exec(telephoe)){
		showMsg("电话号码必须是是5-10位数字~");
		return false;
	}
	$("#receivermobilephone_msg").html("");
	return true;
}
//验证电话号：鼠标失去焦点:防止死循环
function tempReceiverTelephonePhoneBlur(){
	var telephoe = $("#receiverTelephone_phone").val();
	var patrn = /^\d{5,10}$/;
	if(telephoe == $("#receiverTelephone_phone").attr("data-value")){
		telephoe = "";
	}
	if($.trim(telephoe) == ""){
		return false;
	}else if(telephoe && !patrn.exec(telephoe)){
		return false;
	}
	$("#receivermobilephone_msg").html("");
	return true;
}
//验证分机号：鼠标得到焦点
function receiverTelephoneExtensionFocus(){
	$("#receivermobilephone_msg").html("");
	var areaCode = $("#receiverTelephone_extension");
	if(areaCode.val() == $("#receiverTelephone_extension").attr("data-value")){
		areaCode.val("").css("color","#999");
	}
}
//验证分机号：鼠标失去焦点
function receiverTelephoneExtensionBlur(){
	var patrn = /^\d{1,6}$/;
	var areaCode = $("#receiverTelephone_extension").val();
	if(areaCode == $("#receiverTelephone_extension").attr("data-value")){
		areaCode = "";
	}
	if($.trim(areaCode) == "" || areaCode == null){
		$("#receiverTelephone_extension").val($("#receiverTelephone_extension").attr("data-value")).css("color","#C9C9C9");
		return true;
	}else if(areaCode && !patrn.exec(areaCode)){
		showMsg("分机号码必须是是1-6位数字,或者您也可以不填~");
		return false;
	}
	return true;
}

//验证收货人姓名
function valiReceiverName(){
	var flag = valiCurrMsg("realName", "receivername_msg", 20, "请填写收货人姓名", "您的输入已超过10个汉字，请重新输入");
	if(!flag){
		return false;
	}
	return true;
}
//验证收货人详情地址
function valiReceiverAddress(){
	var flag = valiCurrMsg("address","receiveraddress_msg",100,"请填写详细地址","您的输入超过了最大限制，地址将无法保存");
	if(!flag){
		return false;
	}
	return true;
}
/*
 * a 文本输入标签id
 * b 提示语显示标签id
 * n 限定字符数量
 * c 为空错误提示内容
 * d 超出限定字符数时提示内容
 */
var valiCurrMsg = function(a, b, n, c, d){
	$("#" + b).show();
	var inpValue = $("#" + a).val();
	var currLen = getStringLen(inpValue);
	if(currLen == 0 && c != "" && c != null) {
		$("#" + b).html(c).css("color", "red");
		return false;
	}else if(currLen <= n){
		var msg = "目前为" + Math.ceil(currLen/2) + "个汉字，您还可以输入" + Math.floor((n - currLen)/2) + "个汉字";
		$("#" + b).html(msg).css("color", "#8cb91e");
		return true;
	}else {
		$("#" + b).html(d).css("color", "red");
		return false;
	}
}
var getStringLen = function(str){	//中文或全角字符的标准length
	return str.replace(/[^x00-xff]/g,"aa").length;
}