//Ĭ�ϵ�ַλ�е�һ
$(function(){
   var defalutAddressId=$("#defalutAddressId").val();
   if(defalutAddressId!=null && defalutAddressId>0){
      $("#defalutAddress").html($("#old_add_"+defalutAddressId).html());
      $("#old_add_"+defalutAddressId).remove();
   }else{
	   $("#defalutAddress").remove();
   }	   
});
/*ɾ���ջ���ַ*/
function addrDel(id){
	var defalutAddressId=$("#defalutAddressId").val();
	parent.comAlert("��ȷ��Ҫɾ���𣿣�",{"confirm":"ȷ��","cancel":"ȡ��"},function(){
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
//��ָ����ַ����ΪĬ�ϵ�ַ
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
			//���óɹ�
			//$(".content").children(".adds").removeClass("old_add_default").addClass("old_add");
    		//$("#old_add_"+useraddressid).removeClass("old_add").addClass("old_add_default");	
			jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
		    window.location.href=frontPath+"/Member/AddressList.do"
		}
	});
}
 
/*�༭������*/
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

/*��ӵ�����*/
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
 
//��ȡ���������б�
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

 //������Ϣ��ʾ
function showMsg(msg){
  jQuery("#showMsg").html(msg).css("visibility","visible");
  setTimeout(function(){
    jQuery("#showMsg").css("visibility","hidden");
  },10000);
}
//����޸��ύ����֤
function submitForm(){
  //check�ջ���
  if(!valiReceiverName()){
    return;
  }
  //check���ڵ�
  var tempregionid = null;
  for(var i = 0; i <= 10; i++){
		tempregionid = $("#area" + i).val();
		if(typeof(tempregionid) != "undefined" && tempregionid == -1 || tempregionid == "��ѡ��..."){
			jQuery("#showMsg").html("��ѡ�����������ջ��˵�����");
			return;
		}
  }
  //check��ϸ��ַ
  if(!valiReceiverAddress()){
	 return;
  }
  //check��ַ��ע
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
	showMsg("��ѡ���ַ��ע��");
  	return;
  }
  //check�ֻ�,�̶��绰
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
      showMsg("��Ǹ�����ӵ�ַʧ�ܣ����Ժ����ԣ�");
    }
}


//ѡ���ջ���ַ--���������˵�
function chooseArea(selectid){
	var parentid = jQuery("#"+selectid).val();
	if(parentid == -1){
		return;
	}
	jQuery("#regionId").val(parentid);
	getAreaCascade(parentid, chooseAreaResultView);
}

//ѡ���ջ���ַ�첽�ش���ľֲ���Ⱦ
function chooseAreaResultView(data, callbackParams){
	var selectAreaAddress = getSelectAreaAddress();
	if($.trim(selectAreaAddress) != ""){
		$("#newaddressprefix").html(trimCommaArr(selectAreaAddress).join(" ")).show();
	}else{
		$("#newaddressprefix").hide();
	}
}


//ͬʱУ���ֻ��͹̶��绰����Ч��
function valiReceiverTelephoneOrMobie(){
	var telephoneAreaCode = jQuery("#receiverTelephone_areaCode").val() == jQuery("#receiverTelephone_areaCode").attr("data-value") ? "" : jQuery("#receiverTelephone_areaCode").val();
	var telephoe = jQuery("#receiverTelephone_phone").val() == jQuery("#receiverTelephone_phone").attr("data-value") ? "" : jQuery("#receiverTelephone_phone").val();
	var telephoneExtension = jQuery("#receiverTelephone_extension").val() == jQuery("#receiverTelephone_extension").attr("data-value") ? "" : jQuery("#receiverTelephone_extension").val();
	var mobiephone = jQuery("#mobilePhone").val();
	if(getReceiverTelephone()){
		if(mobiephone != ""){
			if(tempValiReceiverMobie()){
				if(telephoe != "" && telephoneAreaCode == ""){
					showMsg("������3-6λ���֣��绰������5-10λ���֣��ֻ�����0-6λ����");
				}else{
					return true;
				}
			}else{
				showMsg("����д�̶���ʽ�绰�����ֻ���");
			}
		}
	}
	if(valiReceiverMobie()){
		if(telephoe != "" || telephoneAreaCode != "" || telephoneExtension != ""){
			if(telephoe != "" && telephoneAreaCode == ""){
				showMsg("������3-6λ���֣��绰������5-10λ���֣��ֻ�����0-6λ����");
			}else if(getReceiverTelephone()){
				return true;
			}else{
				showMsg("������3-6λ���֣��绰������5-10λ���֣��ֻ�����0-6λ����");
			}
		}else if(telephoe == "" && telephoneAreaCode == "" && telephoneExtension == ""){
			return true;
		}
	}
	return false;
}
//ƴ�ӹ̶��绰
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

//��֤�ֻ�����Ч��
function valiReceiverMobie(){
	var mobiephone = jQuery("#mobilePhone").val();
	if(mobiephone == "" && !tempReceiverTelephonePhoneBlur()){
		showMsg("����д��ȷ�Ĺ̶��绰�����ֻ���");
		return false;
	}else if(mobiephone != ""){
		//֧��11λ�ֻ�������֤
		var tmp = /^1[3-9]\d{9}$/;    
		var flag=tmp.test(mobiephone);
		if(!flag){   
			showMsg("����д��ȷ���ֻ����룡");
			return false;   
		}  
	}
	showMsg("");
	return true;
}
//��֤�̻���Ч��
function valiReceiverTelephone(){
	var telephoneAreaCode = jQuery("#receiverTelephone_areaCode").val() == jQuery("#receiverTelephone_areaCode").attr("data-value") ? "" : jQuery("#receiverTelephone_areaCode").val();
	var telephoe = jQuery("#receiverTelephone_phone").val() == jQuery("#receiverTelephone_phone").attr("data-value") ? "" : jQuery("#receiverTelephone_phone").val();
	var telephoneExtension = jQuery("#receiverTelephone_extension").val() == jQuery("#receiverTelephone_extension").attr("data-value") ? "" : jQuery("#receiverTelephone_extension").val();
	if(telephoe != "" || telephoneAreaCode != "" || telephoneExtension != ""){
		showMsg("������3-6λ���֣��绰������5-10λ���֣��ֻ�����0-6λ����");
	}else if(telephoe == "" && telephoneAreaCode == "" && telephoneExtension == ""){
		return true;
	}
	return true;
}

//��֤�ֻ�����Ч��:��ֹ��ѭ��
function tempValiReceiverMobie(){
	var mobiephone = jQuery("#mobilePhone").val();
	if(mobiephone == ""){
		return false;
	}else if(mobiephone != ""){
		//֧��11λ�ֻ�������֤
		var tmp = /^1[3-9]\d{9}$/;    
		var flag = tmp.test(mobiephone);
		if(!flag){   
			return false;   
		}  
	}
	showMsg("");
	return true;
}

//��֤���ţ����õ�����
function valiReceiverTelephoneareaCodeFocus(){
	showMsg("");
	var areaCode = $("#receiverTelephone_areaCode");
	if(areaCode.val() == $("#receiverTelephone_areaCode").attr("data-value")){
		areaCode.val("").css("color","#999");
	}
}
//��֤���ţ����ʧȥ����
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
		 showMsg("����д����,������3-6λ���֣�");
		return false;
	}
	return true;
}
//��֤�绰�ţ����õ�����
function receiverTelephonePhoneFocus(){
	showMsg("");
	var areaCode = $("#receiverTelephone_phone");
	if(areaCode.val() == $("#receiverTelephone_phone").attr("data-value")){
		areaCode.val("").css("color","#999");
	}
}
//��֤�绰�ţ����ʧȥ����
function receiverTelephonePhoneBlur(){
	var telephoe = $("#receiverTelephone_phone").val();
	var patrn = /^\d{5,10}$/;
	if(telephoe == $("#receiverTelephone_phone").attr("data-value")){
		telephoe = "";
	}
	if($.trim(telephoe) == ""){
		$("#receiverTelephone_phone").val($("#receiverTelephone_phone").attr("data-value")).css("color","#C9C9C9");
		if(!tempValiReceiverMobie()){
			showMsg("����д��ȷ�Ĺ̶��绰�����ֻ���");
			return false;
		}
	}else if(telephoe && !patrn.exec(telephoe)){
		showMsg("�绰�����������5-10λ����~");
		return false;
	}
	$("#receivermobilephone_msg").html("");
	return true;
}
//��֤�绰�ţ����ʧȥ����:��ֹ��ѭ��
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
//��֤�ֻ��ţ����õ�����
function receiverTelephoneExtensionFocus(){
	$("#receivermobilephone_msg").html("");
	var areaCode = $("#receiverTelephone_extension");
	if(areaCode.val() == $("#receiverTelephone_extension").attr("data-value")){
		areaCode.val("").css("color","#999");
	}
}
//��֤�ֻ��ţ����ʧȥ����
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
		showMsg("�ֻ������������1-6λ����,������Ҳ���Բ���~");
		return false;
	}
	return true;
}

//��֤�ջ�������
function valiReceiverName(){
	var flag = valiCurrMsg("realName", "receivername_msg", 20, "����д�ջ�������", "���������ѳ���10�����֣�����������");
	if(!flag){
		return false;
	}
	return true;
}
//��֤�ջ��������ַ
function valiReceiverAddress(){
	var flag = valiCurrMsg("address","receiveraddress_msg",100,"����д��ϸ��ַ","�������볬����������ƣ���ַ���޷�����");
	if(!flag){
		return false;
	}
	return true;
}
/*
 * a �ı������ǩid
 * b ��ʾ����ʾ��ǩid
 * n �޶��ַ�����
 * c Ϊ�մ�����ʾ����
 * d �����޶��ַ���ʱ��ʾ����
 */
var valiCurrMsg = function(a, b, n, c, d){
	$("#" + b).show();
	var inpValue = $("#" + a).val();
	var currLen = getStringLen(inpValue);
	if(currLen == 0 && c != "" && c != null) {
		$("#" + b).html(c).css("color", "red");
		return false;
	}else if(currLen <= n){
		var msg = "ĿǰΪ" + Math.ceil(currLen/2) + "�����֣�������������" + Math.floor((n - currLen)/2) + "������";
		$("#" + b).html(msg).css("color", "#8cb91e");
		return true;
	}else {
		$("#" + b).html(d).css("color", "red");
		return false;
	}
}
var getStringLen = function(str){	//���Ļ�ȫ���ַ��ı�׼length
	return str.replace(/[^x00-xff]/g,"aa").length;
}