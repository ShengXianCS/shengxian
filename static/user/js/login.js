//������ʾ��Ϣ
function loginOnload(){
	onloadShow("cartLoginId");
	onloadShow("cartPassword");
	onloadShow("cartValidate");
	checkValidate(checkLogin);
	
	
	if(jQuery("#cartLoginId").val().length>0){
		jQuery("#clearAll").css("display","inline-block");
	}
	
	//alert("loaded !");
}
$(function(){loginOnload();})

//��½ҳ����ı�����֤
//�û�����֤�¼�
$(function(){
	loginValidate("cartLoginId","cartLoginIdLabel","�û���",false);//�û�����֤
	loginValidate("cartPassword","cartPasswordLabel","����",false);//������֤
})
//��������
$(function (){
	jQuery("#cartLoginId").keydown(function(){
		if($("#cartPassword").val().length > 0){
			$("#cartPasswordLabel").css("display","none");
		}
	})
})
//��֤�ǿ�
function loginValidate(title,label,name,noCheck){
	jQuery("#" + title).focus(
		function(){
			if(jQuery("#" + title).val().length > 0){
				jQuery(	"#" + label).css("display","none");
			}
			$(this).siblings(".input_error").css("display", "none");
			$(this).parent().find(".cont_input").removeClass("cont_inputerror");
			$(this).parent().find(".user_input").removeClass("user_inputerror");
			//$(this).siblings(".input_correct").css("display", "none");
		}
	)
	jQuery("#" + title).blur(
		function(){
			valiLoginInput(title, label, name,noCheck);
		}
	)
}

function valiLoginInput(titleId, labelId, name,noCheck){
	var jqObjInput = $("#" + titleId),
	jqObjLayer = $("#" + labelId);
	if(jqObjInput.val().length <= 0){
		jqObjLayer.show();
		if(noCheck){
		jqObjInput.siblings(".input_error").html(name + "����Ϊ�գ�").show();
		}
		//�Ƴ�ɾ����־
		if(titleId=="cartLoginId"){
			jQuery("#clearAll").css("display","none");
		}
		//����ǰ��½���������Ϣ�ĵ�ǰ��ʾ״̬�����ʽ 2013-10-18
		if(noCheck){
		jqObjInput.parent().find(".cont_input").addClass("cont_inputerror");
		jqObjInput.parent().find(".user_input").addClass("user_inputerror");
		}
	    
		return false;
	}else{
		//jqObjInput.siblings(".input_correct").show().siblings(".input_error").hide();
		jqObjInput.siblings(".input_error").hide();
		//Ϊ�û������ɾ����־
		if(titleId=="cartLoginId"){
			jQuery("#clearAll").css("display","inline-block")
		}
		//�Ƴ���ǰ��½���������Ϣ�ĵ�ǰ��ʾ״̬����ʽ 2013-10-18
		jqObjInput.parent().find(".cont_input").removeClass("cont_inputerror");
		jqObjInput.parent().find(".user_input").removeClass("user_inputerror");
		
		return true;
	}
}

//У����֤���Ƿ���ȷ
$(function(){
	jQuery("#cartValidate").focus(
		function(){
			jQuery("#cartValidateLabel").css("display","none");
			$(this).siblings(".input_error").css("display", "none");
			//$(this).siblings(".input_error").css("display", "none").siblings(".input_correct").css("display","none");
		}
	)
	jQuery("#cartValidate").blur(
		function(){
			var loginContent = $(this).val();
			if(loginContent.length <= 0){
				jQuery("#cartValidateLabel").css("display","inline");
				//$(this).siblings(".input_error").html("��֤�벻��Ϊ�գ�").css("display", "inline");
			}
			//if(loginContent.length > 0){
				//var url = crossDomain + frontPath + "/member/verifyvalidatecode.do?ValidateCode=" + loginContent + "&callback=?";
				//jQuery.getJSON(url,CallbackVerifyValidateCodeLog);
			//}
		}
	)
})
//У����֤���Ƿ���ȷ�ص�
function CallbackVerifyValidateCodeLog(data){
	switch(Number(data.msg)){
		case 0:
			jQuery("#cartValidate").siblings(".input_correct").css("display","inline");
			break;
		case 1:
			jQuery("#cartValidate").siblings(".input_error").html("��֤��������������룡").css("display","inline");
			break;
		default:
			comAlert("���緱æ~�����Ժ�����~");
			break;
	}
}
//ѡ�м�ס�û���
$(function(){
	if (readCookie("rememberName").length > 0){
		jQuery("#cartLoginId").val(readCookie("rememberName"));
		jQuery("#cartLoginIdLabel").hide();
	}
})
//��֤�Ƿ�ѡ�м�ס�û���
function valiCheckbox(){
//	if(jQuery("#labelusername").attr("checked") == true){
		writeCookie("rememberName",jQuery("#cartLoginId").val());
//	}
//	if(jQuery("#labelusername").attr("checked") == false){
//		var tempRememnerName = readCookie("rememberName");
//		if(jQuery("#cartLoginId").val() == tempRememnerName){
//			writeCookie("rememberName","");
//		}
//	}
}
//��½��������������ʾ
function hideAllPrompt(){
	$("#cartLoginId").siblings(".input_error").css("display", "none");
	$("#cartLoginId").siblings(".input_correct").css("display", "none");
	$("#cartPassword").siblings(".input_error").css("display", "none");
	$("#cartPassword").siblings(".input_correct").css("display", "none");
	$("#cartValidate").siblings(".input_error").css("display", "none");
	$("#cartValidate").siblings(".input_correct").css("display", "none");
}
var isLoginSubmiting = false;//�Ƿ��Ѿ����ڵ�½
//��½
function submitLoginForm(form, action, callbackFunc){
	if(!valiLoginInput("cartLoginId", "cartLoginIdLabel", "�û���",true)) return false;
	if(!valiLoginInput("cartPassword", "cartPasswordLabel", "����",true)) return false;
	
	var passWord=jQuery("#cartPassword").val();
	if(passWord==null || passWord==""){
		comAlert("���벻��Ϊ��");
		jQuery("#cartPassword").focus();
		jQuery("#cartPassword").focusin();
		return false;
	}
	if(jQuery("#mcicont_validateCode").css("display")=="block"){
		var cartValidate=jQuery("#cartValidate").val();
			if(cartValidate==null || cartValidate==""){
				//comAlert("��֤�벻��Ϊ��");
				jQuery("#cartValidate").siblings(".input_error").html("��֤�벻��Ϊ�գ�").css("display", "inline");
				//jQuery("#cartValidate").focus();
				return false;
			}
	}	
	if(isLoginSubmiting){
		comAlert("��½�У����Ժ󡣡���");
		return false;
	}
	isLoginSubmiting = true;
	valiCheckbox();
	var params = getFormParamsJSON(form);
	//params["isCheckCode"]=false;
	var loginUri = frontPath + action;
	$.ajax({
		type:"post",
		url:loginUri,
		async:false,
		dataType:"json",
		data:params,
		success:callbackFunc,
		error:function () {
			comAlert("���糬ʱ�����Ժ�����");
		}
	});
	return false;
}

/*function submitLoginForm(form){
	if(!valiLoginInput("cartLoginId", "cartLoginIdLabel", "�û���",true)) return false;
	if(!valiLoginInput("cartPassword", "cartPasswordLabel", "����",true)) return false;
	
	var passWord=jQuery("#cartPassword").val();
	if(passWord==null || passWord==""){
		comAlert("���벻��Ϊ��");
		jQuery("#cartPassword").focus();
		jQuery("#cartPassword").focusin();
		return false;
	}
	if(jQuery("#mcicont_validateCode").css("display")=="block"){
		var cartValidate=jQuery("#cartValidate").val();
			if(cartValidate==null || cartValidate==""){
				//comAlert("��֤�벻��Ϊ��");
				jQuery("#cartValidate").siblings(".input_error").html("��֤�벻��Ϊ�գ�").css("display", "inline");
				//jQuery("#cartValidate").focus();
				return false;
			}
	}	
	if(isLoginSubmiting){
		comAlert("��½�У����Ժ󡣡���");
		return false;
	}
	isLoginSubmiting = true;
//	valiCheckbox();
	form.submit();
}*/

function valiCallbackLoginData(data){
	isLoginSubmiting = false;
	if(!data || !data.msg || data.msg == ""){
		comAlert("���緱æ�������Ժ�����~");
		codeRefresh('ValiCodeForLogin');
		return false;
	}
	return true;
}
//��½�ص�
function callbackLogin(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//�ɹ���ͬ����Ⱦ����
		var url = data.url.replace(/&amp;/g, "&");
		setTimeout(function() {window.location=url;}, 100);
	}
	if(data.msg == 13){
		var url=data.url;
   		window.location = frontPath + url;
	}
}
/***��½������ begin--------**/
//ȥ�����½�ص�
function callbackCartLogin(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//�ɹ���ͬ����Ⱦ����
		var url = data.url.replace(/&amp;/g, "&");
		setTimeout(function() {window.parent.window.location=url;}, 100);
	}
	thawUserInfo(data);
}
//�ղص�½�ص�
function createCollectLayer(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//�ɹ�����ò�ͬ���¼�
		getCrossDomainTopLoginInfo(collectPopup);
	}
	thawUserInfo(data);
}

//20141101�ղظİ�
//�ղص�½�ص�
function createCollectLayerFavor(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//�ɹ�����ò�ͬ���¼�
		getCrossDomainTopLoginInfo(collectPopupFavor);
	}
	thawUserInfo(data);
}

//���۵�½�ص�
function callbackRemarkLogin(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//����ˢ��ͷ��������ˢ�����۷���
		getCrossDomainTopLoginInfo(updateRemarkView);
	}
	thawUserInfo(data);
}
//����֪ͨ��½�ص�
function callbackArrivalNotice(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//����ˢ��ͷ��������ˢ�����۷���
		getCrossDomainTopLoginInfo(arrivalAgain);
	}
	thawUserInfo(data);
}
//����֪ͨ��½�ص�
function callbackPriceNotice(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//����ˢ��ͷ��������ˢ�����۷���
		getCrossDomainTopLoginInfo(priceAgain);
	}
	thawUserInfo(data);
}
//��ʳ��¼�ص�
function callbackLoginEvt(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//�ɹ�����ò�ͬ���¼�
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(parent.chooseFood);
	}
	thawUserInfo(data);
}
//�������Σ�û�ͳһ�򿪸�ҳ��
function thawUserInfo(data){
	if(data.msg == 13){
		var url=data.url;
   		parent.window.location = crossDomain + frontPath + url;
	}
}
/***��½������ end--------**/
function callbackLoginCommon(data){	
	if(!valiCallbackLoginData(data)){
		$("#cartPassword").focusin();
		return;
	}
	switch(Number(data.msg)){
//		case -1:
//			comAlert("�Բ�����ˢ��ҳ������µ�¼��");
//			break;
		case 0:
			//��ģ���½�ɹ�����õĹ���ͳһ����
			if(data.discuzli != ""){
				if(jQuery("#discuzli").length <= 0){
					jQuery("<span id='discuzli1' style='display:none'></span>").appendTo("body");
				}
				jQuery("#discuzli").html(decodeURI(data.discuzli));
			}
			initialLoginCode();	//��¼�����
			$("#cartPassword").focusin();
			break;
		case 1:
			checkValidate(data.checkLogin);
			comAlert("�Բ�����������˺Ų����ڣ����������룡");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartLoginId").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartLoginId").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			$("#cartLoginId").focusin();
			break;
		case 2:
			checkValidate(data.checkLogin);
			comAlert("�Բ��������˺Ż���������������������룡�����������5�κ󽫶����˺ţ�");
			codeRefresh('ValiCodeForLogin');
			//document.getElementById("cartLoginId").value='';
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartPassword").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 3:
			checkValidate(data.checkLogin);
			comAlert("�Բ������������֤��������������룡");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartValidate").value='';
			document.getElementById("cartValidate").focus();
			jQuery("#cartValidateLabel").css("display","inline");
			$("#cartPassword").focusin();
			break;
		case 7:
			checkValidate(data.checkLogin);
			comAlert("��֤�벻��Ϊ�գ����������룡");
			codeRefresh('ValiCodeForLogin');
			jQuery("#cartValidateLabel").css("display","inline");
			$("#cartPassword").focusin();
			break;
		case 8:
			checkValidate(data.checkLogin);
			comAlert("����������������˻�����ʱ���ᡣ�������һ�������30���Ӻ�ϵͳ�Զ��ⶳ�������µ�¼��");
			codeRefresh('ValiCodeForLogin');
			$("#cartPassword").focusin();
			break;
		case 18:
			checkValidate(data.checkLogin);
			comAlert("�����˺��Ѷ��ᣬ����ϵ�ͷ���Ա�ⶳ�������µ�¼��");
			codeRefresh('ValiCodeForLogin');
			$("#cartPassword").focusin();
			break;
		case 13:
       		//�������13�ͷֱ���д���
			//var url=data.url;
       		//parent.window.location = frontPath + url;
			$("#cartPassword").focusin();
			break;
		case 14:
			checkValidate(data.checkLogin);
			comAlert("���û���Ϊ��������ƽ̨���û�����������������ֱ�ӵ�½��");
			codeRefresh('ValiCodeForLogin');
			//document.getElementById("cartLoginId").value='';
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartPassword").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 15:
			checkValidate(data.checkLogin);
			comAlert("�Բ������������ҵ���Ų����ڣ�");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartCoopNo").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 16:
			checkValidate(data.checkLogin);
			comAlert("�Բ������������ҵ�����Ѿ��������˻���");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartCoopNo").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 17:
			checkValidate(data.checkLogin);
			comAlert("�Բ�����������˺��Ѱ�������ҵ���ţ�");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartCoopNo").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 20:
			checkValidate(data.checkLogin);
			comAlert("��ʹ��������û�����¼�����ֻ�δ��֤��¼���뾡����ֻ�������֤��");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartPassword").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 21:
			checkValidate(data.checkLogin);
			comAlert("�˺Ŵ��ڷ��գ�����ϵ�ͷ������400-005-5678");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartPassword").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		default:
			comAlert("���緱æ~�����Ժ�����~");
		    $("#cartPassword").focusin();
			break;
	}
}
//��½begin
function clearAll(){
	jQuery("#cartLoginId").val("");
	jQuery("#cartPassword").val("");
	//�Ƴ�ɾ����־
	jQuery("#clearAll").css("display","none");
	jQuery("#cartLoginIdLabel").css("display","inline");
	jQuery("#cartPasswordLabel").css("display","inline");
}

//labal ��ʾ�ж�
var checkingPw = false;
function fCheckPw(timer){
	if(checkingPw){
		return;
	}
	checkingPw = true;
	window.oIntervalCheckPw = setInterval(
		function(){
			$cartPassword = $("#cartPassword");
			$cartPasswordLabel = $("#cartPasswordLabel");
			if( $cartPassword.val() != "" ){
				$cartPasswordLabel.hide();
				checkingPw = false;
				clearInterval(window.oIntervalCheckPw);
			}else{
				$cartPasswordLabel.show();
			}
		},50
	);
	//ǿ��������
	setTimeout(function(){
		checkingPw = false;
		clearInterval(window.oIntervalCheckPw);
	},Number(timer));
};

function fCheckAlways(){
	window.oIntervalCheckAlways = setInterval(
		function(){
			if ($("#cartCoopNo").length > 0) {
				$cartCoopNo = $("#cartCoopNo");
				$cartCoopNoLabel = $("#cartCoopNoLabel");
				if( $cartCoopNo.val() != '' ){
					$cartCoopNoLabel.hide();
				}else{
					$cartCoopNoLabel.show();
				}
			}
			
			$cartLoginId = $("#cartLoginId");
			$cartLoginIdLabel = $("#cartLoginIdLabel");
			if( $cartLoginId.val() != '' ){
				$cartLoginIdLabel.hide();
				jQuery("#clearAll").css("display","inline-block");
			}else{
				$cartLoginIdLabel.show();
				jQuery("#clearAll").css("display","none");
			}
			fCheckPw(200);
		},300
	);
}

//�ж��Ƿ���ʾ��֤��
function checkValidate(checkLogin){
//	if(checkLogin>=2){
		//jQuery("#mcicont_validateCode").css("display","block");
	//	jQuery("#changeCode").css("display","block");
//	}else{
//		jQuery("#mcicont_validateCode").css("display","none");
//		jQuery("#changeCode").css("display","none");
//	}
}

$(document).ready(function(){
	var loginErrorInfoCheck = function(){
		if ($("#cartCoopNo").length > 0) {
			$("#login_submit_btn_real").show();
			$("#login_submit_btn_fake").hide();
		} else {
			$("#login_submit_btn_real").hide();
			$("#login_submit_btn_fake").show();
		}
		var loginId = $("#cartLoginId").val();
		if(loginId.length === 0){
			return;
		}
		var url = frontPath + "/login/loginerorrinfocheck.do?t=" + Math.random();
		var params = {};
		params["loginId"] = loginId;
		
		$.ajax({
			//"async": false,
			"type":"post",
			"url": url,
			"data": params,
			"success": function(data){
				if(data === "0"){// ������֤��
					$("#mcicont_validateCode").hide();
					$("#changeCode").hide();
				}else{// ����֤��
					$("#mcicont_validateCode").show();
					$("#changeCode").show();
				}
				$("#login_submit_btn_real").show();
				$("#login_submit_btn_fake").hide();
			}
		});
	};
	
	$("#cartLoginId").focusout(loginErrorInfoCheck);
	$("#cartPassword").focusin(loginErrorInfoCheck);
	
	// ��ֹ ����� �Զ���� �û���������
	setTimeout(function(){
		$("#cartLoginId").val($("#cartLoginId").attr("defaultValue"));
		//alert($loginIdInput.attr("defaultValue"));
		$("#cartPassword").val("");
	},100);
});

