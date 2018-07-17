var REGISTER = {
		cellphone_numbe_regex : /^1[3456789]\d{9}$/   // �ֻ�����
};
var valiEMail_asyn = function(callback, callbackParams, email){	//�첽У������
	$.post(frontPath + "/register/judgeemail.do", {"Email":email}, function(data){
		callback(data, callbackParams);
	});
}
var valiPhone_asyn = function(callback, callbackParams, phone){	//�첽У���ֻ�
	$.post(frontPath + "/register/judgephone.do", {"Phone":phone}, function(data){
		callback(data, callbackParams);
	});
}
var valiLoginId_asyn = function(callback, callbackParams, loginId){	//�첽У���û���
	$.post(frontPath + "/register/judgeloginid.do", {"loginId":loginId}, function(data){
		callback(data, callbackParams);
	});
}

//дcookie
function writeCookie(name, value, hours){
	var expire = "";
	if(hours != null){
		expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = "; expires=" + expire.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expire;
}
//������ʾ��Ϣ
function register(){
	onloadShow("Email");
	onloadShow("loginId");
	onloadShow("password");
	onloadShow("password2");
	onloadShow("invitationCode");
	onloadShow("validateCode");
	onloadShow("getCode");
//	$("#checkInvitationCode").attr("checked",false);
}
$(function(){register();})
//������ʾ��ʾ
function publicErrorShow(obj){
	obj.siblings(".input_error").css("display", "inline");
	//obj.siblings(".input_correct").css("display", "none");
}

//��ȷ��ʾ��ʾ
function publicRightShow(obj){
	//obj.siblings(".input_correct").css("display", "inline");
	obj.siblings(".input_error").css("display", "none");
}
var emailFlag = true;//У������
var userLoginIdFlag = true;//У���û���
var invitationCodeFlag = true;//У����֤��
//��֤����***begin
$(function(){
	var EmailObj = jQuery("#Email");
	EmailObj.focus(
		function(){
			if(EmailObj.val().length > 0){
				jQuery("#EmailLabel").css("display","none");
			}
		}
	)
	EmailObj.blur(
		function(){
			var selectedEmail = $(".auto-tip li").hasClass("hoverBg");
			if(!selectedEmail){
				valiEMail(EmailObj,1,false);
			}else{
				EmailObj.parent().find(".cont_input").removeClass("cont_inputerror");
				publicRightShow(EmailObj);
			}
		})
})

var registerform = "";
function valiEMail(obj,actionFlag,isChecked){
	if (obj.val().length <= 0) {
		jQuery("#EmailLabel").css("display", "inline");
		if(isChecked){
			jQuery("#EmailMsg").html("<i></i>������ֻ�����Ϊ��");
			obj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(obj);
		}
		return false;
	}
	
	//1.�ж��ֻ�
	isMobilPhone = REGISTER.cellphone_numbe_regex.test(obj.val()); //�ֻ���ʽ��֤
	if(isMobilPhone){
		registerform = "phone";
		//$("#publicvalidateCode").hide();
		$("#sendValidataPhoneByEmail").hide();
		$("#public_mcicont_line").hide();
		$("#sendValidatePhone").show(); 
		//�ֻ���ʽ��֤ͨ��,ҳ��Ĵ���(Ψһ��,��ʾ�ֻ���֤��)
		publicRightShow(obj);
		obj.parent().find(".cont_input").removeClass("cont_inputerror");
		if(actionFlag == 1){
			valiPhone_asyn(function(data){
				if (data && data == "true") {
					jQuery("#EmailMsg").html("<i></i>�ֻ��Ѿ��󶨴��ڣ��뻻����һ��");
					obj.parent().find(".cont_input").addClass("cont_inputerror");
					publicErrorShow(obj);
					emailFlag = false;
					return false;
				} else {
					publicRightShow(obj);
					obj.parent().find(".cont_input").removeClass("cont_inputerror");
					emailFlag = true;
					return true;
				}
			},null,obj.val());
		}else{
			obj.parent().find(".cont_input").removeClass("cont_inputerror");
			return true;
		}
	}
	//2.�ж�����
	else if (isEmail(obj.val())) {
		registerform = "email";
		//$("#public_mcicont_line").show();
		//$("#publicvalidateCode").show();	
		//("#sendValidatePhone").hide();
		$("#sendValidataPhoneByEmail").show();
		$("#sendValidatePhone").show();
		if(actionFlag == 1){
			valiEMail_asyn(function(data){
				if (data && data == "true") {
					jQuery("#EmailMsg").html("<i></i>Email��ַ�Ѿ����ڣ��뻻����һ��");
					obj.parent().find(".cont_input").addClass("cont_inputerror");
					publicErrorShow(obj);
					emailFlag = false;
					return false;
				} else {
					publicRightShow(obj);
					obj.parent().find(".cont_input").removeClass("cont_inputerror");
					emailFlag = true;
					return true;
				}
			},null,obj.val());
		}else{
			obj.parent().find(".cont_input").removeClass("cont_inputerror");
			return true;
		}
	}
	else{
		registerform = "";
		$("#sendValidataPhoneByEmail").hide();
		$("#sendValidatePhone").show();
		jQuery("#EmailMsg").html("<i></i>����������ȷ��������ֻ�");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
	}

}
//��֤����***end

// add by lihongyao 20150609 �Ϻ�����ע��
// ��֤������ҵ����***begin
$(function(){
	var coopNoObj = jQuery("#coopNo");
	coopNoObj.focus(
		function(){
			if(coopNoObj.val().length > 0){
				jQuery("#coopNoLabel").css("display","none");
			}
		}
	)
	coopNoObj.blur(
		function(){
			valiCoopNo(coopNoObj,false);
		})
})
// ��֤������ҵ�����Ƿ���Ч
function valiCoopNo(coopNoObj,isChecked){ 
	if (coopNoObj.val().length <= 0) {
		jQuery("#coopNoLabel").css("display", "inline");
		if(isChecked){
			jQuery("#coopNoMsg").html("<i></i>������ҵ���Ų���Ϊ��");
			coopNoObj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(coopNoObj);
		}
		return false;
	}
	publicRightShow(coopNoObj);
	coopNoObj.parent().find(".cont_input").removeClass("cont_inputerror");
	return true;
}
//��֤�û���****begin
$(function(){
	var LoginidObj = jQuery("#loginId");
	if(LoginidObj.val() > 0){
		LoginidObj.css("display","none");
	}
	LoginidObj.focus(
		function(){
			if(LoginidObj.val().length > 0){
				jQuery("#loginIdLabel").css("display","none");
			}
		}
	)
	LoginidObj.blur(
		function(){
			//��֤�û����Ƿ���Ч
			valiLoginId(LoginidObj, 1, false);
		})
})

//��֤�û����Ƿ���Ч
function valiLoginId(LoginidObj,actionFlag,isChecked){
	if (LoginidObj.val().length <= 0) {
		jQuery("#loginIdLabel").css("display", "inline");
		if(isChecked){
			jQuery("#loginIdMsg").html("<i></i>�û�������Ϊ��");
			LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(LoginidObj);
		}
		return false;
	}
	var registerLoginid = LoginidObj.val();// �û����ı��������
	var registerLoginIdMsg = jQuery("#loginIdMsg");
	var checkflag = 0; //�ж�0ΪĬ��ֵ����ȷ����1Ϊ���ֿ�ͷ�����󣩣�2���������󣨴���
	var valLength = 0; //����
	for(var ii = 0; ii < registerLoginid.length; ii++){
  		var word=registerLoginid.substr(ii,1);
		if(ii == 0){
			if(/[\u4e00-\u9fa5]/g.test(word)){
				valLength+=2;
				checkflag = 0;
			}else if(/^[a-z_]+$/.test(word)){
  				valLength++;
				checkflag = 0;
			}else if(/^[0-9]+$/.test(word)){
				valLength++;
				checkflag = 1;
				break;
			}else{
  				checkflag = 2;
				break;
			}
		}else{
  			if(/[\u4e00-\u9fa5]/g.test(word)){
				valLength+=2;
				checkflag = 0;
			}else if(/^[a-z0-9_]+$/.test(word)){
  				valLength++;
				checkflag = 0;
			}else{
  				checkflag=2;
				break;
			}
		}
	}
	if(checkflag == 1){
		registerLoginIdMsg.html("<i></i>�û������������ֿ�ͷ");
		LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(LoginidObj);
		return false;
	}else if(checkflag == 2){
		registerLoginIdMsg.html("<i></i>�û�������СдӢ����ĸ�����֡����Ļ��»������");
		LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(LoginidObj);
		return false;
	}else{
		if(valLength<4){
	 		registerLoginIdMsg.html("<i></i>�û���̫�̣�����4-20�ַ�֮��");
	 		LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
	 		publicErrorShow(LoginidObj);
	 		return false;
 		}else if(valLength>20){
			registerLoginIdMsg.html("<i></i>�û�������������4-20�ַ�֮��");
			LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(LoginidObj);
			return false;
 		}else if(!isNaN(registerLoginid)){
   			registerLoginIdMsg.html("<i></i>ע���û�������Ϊ������");
   			LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
   			publicErrorShow(LoginidObj);
   			return false;
 		}else{
 			if(actionFlag == 1){//����ǵ�����֤
 				valiLoginId_asyn(function(data){
					if(data && data == "true"){
	  					userLoginIdFlag = false;
	    				registerLoginIdMsg.html("<i></i>�û����Ѿ����ڣ��뻻����һ��");
	    				LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
	    				publicErrorShow(LoginidObj);
	    				return false;
	  				}else{
	  					userLoginIdFlag = true;
	  					publicRightShow(LoginidObj);
	  					LoginidObj.parent().find(".cont_input").removeClass("cont_inputerror");
	    				return true;
	  				}
				},null,registerLoginid);
 			}else{
 				LoginidObj.parent().find(".cont_input").removeClass("cont_inputerror");
 				return true;
 			}
 		}
	}
}
//��֤�û���****end

//��֤�û�����***beging
$(function(){
	var passwordObj = jQuery("#password");
	if(passwordObj.val() > 0){
		passwordObj.css("display","none");
	}
	passwordObj.focus(
		function(){
			if(passwordObj.val().length > 0){
				jQuery("#passwordLabel").css("display","none");
			}
		}
	)
	passwordObj.blur(
		function(){
			valiPwd(passwordObj,false);
		})
})

function valiPwd(obj,isChecked){
	//��֤�û����Ƿ���Ч
	if (obj.val().length <= 0) {
		jQuery("#passwordLabel").css("display", "inline");
		if(isChecked){
			jQuery("#passwordMsg").html("<i></i>���벻��Ϊ��");
			obj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(obj);
		}
		return false;
	}
	var passwordMsg = jQuery("#passwordMsg");
	//obj.siblings(".input_correct").css("display","none");
	obj.siblings(".input_error").css("display", "none");
	if(obj.val()==""||obj.val().length<8||obj.val().length>16){
		passwordMsg.html("<i></i>���볤�ȱ���Ϊ8-16���ַ�");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}else if(!valiSafePwd(obj.val())){
		passwordMsg.html("<i></i>������������2����ĸ��2�����ֵ����");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}else{
		publicRightShow(obj);
		obj.parent().find(".cont_input").removeClass("cont_inputerror");
		return true;
	}
}
//��֤�����Ԫ��
function valiSafePwd(password){
	var letter = 0;
	var number = 0;
	var c;
	for(var i=0;i<password.length;i++){
		c = password.charAt(i);
		if('a'<=c && c<='z' || 'A'<=c && c<='Z'){
			letter++;
		}
		if('0'<=c && c<='9'){
			number++;
		}
	}
	return (letter>=2 && number >=2);
}


//ȷ������
$(function(){
	var password2Obj = jQuery("#password2");
	if(password2Obj.val() > 0){
		password2Obj.css("display","none");
	}
	password2Obj.focus(
		function(){
			if(password2Obj.val().length > 0){
				jQuery("#password2Label").css("display","none");
			}
		}
	)
	password2Obj.blur(
		function(){
			valiPwd2(password2Obj,false);
		})
})
//��֤������
$(function(){
	var invitationcodeobj = jQuery("#invitationCode");
	jQuery("#invitationCode").focus(function(){
			jQuery("#invitationCodeLabel").css("display","none");//������ʾ��Ϣ
		}
	)
	jQuery("#invitationCode").blur(function(){
			if(jQuery("#invitationCode").val().length <= 0){
				jQuery("#invitationCodeLabel").css("display", "inline");
			}
		})
})


function valiPwd2(obj,isChecked){
	//��֤�û������Ƿ���Ч
	if (obj.val().length <= 0) {
		jQuery("#password2Label").css("display", "inline");
		if(isChecked){
			jQuery("#password2Msg").html("<i></i>ȷ�����벻��Ϊ��");
			obj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(obj);
		}
		return false;
	}
	var password2Msg = jQuery("#password2Msg");
	var pwd=jQuery("#password");
	if(pwd.val()!=obj.val()){
		password2Msg.html("<i></i>������������벻һ�£�����������");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}else if(obj.val()==""||obj.val().length<8||obj.val().length>16){
		password2Msg.html("<i></i>���볤�ȱ���Ϊ8-16���ַ�");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}else if(!valiSafePwd(obj.val())){
		password2Msg.html("<i></i>������������2����ĸ��2�����ֵ����");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		return false;
	}else{
		publicRightShow(obj);
		obj.parent().find(".cont_input").removeClass("cont_inputerror");
		return true;
	}
}
//��֤�û�����***end

//����ֻ�������֤��begin
//modify by lihongyao 20141105 ����ͨ���л�
var channelFlag = 1; // 0-����  1-����  2-����
var sendValidatePhoneCode = function(valiCode, sendOrCall){	//�����ֻ���֤��
	var phoneOrEmail = jQuery("#Email").val();
	if(registerform == 'email'){
		phoneOrEmail = jQuery("#phone").val();
	}
	isMobilPhone = REGISTER.cellphone_numbe_regex.test(phoneOrEmail); //�ֻ���ʽ��֤
	if(!isMobilPhone){
		if(registerform == 'email'){
			jQuery("#phoneMsg").html("<i></i>����������ȷ���ֻ�����");
			jQuery("#phone").find(".cont_input").addClass("cont_inputerror");
			publicErrorShow($("#phone"));
		}else{
			jQuery("#EmailMsg").html("<i></i>����������ȷ���ֻ�����");
			jQuery("#Email").parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow($("#Email"));
		}
	}else{
		var param = {"mobile": phoneOrEmail};
		if(valiCode != null){
			param["valiCode"] = valiCode;
		}
		param["channelFlag"] = channelFlag;
		param["sendOrCall"] = sendOrCall; 
		param["from"] = registerform; 
		$.post(frontPath + "/sms/sendSms.do", param, function(resultdata){
			var result = resultdata.split('|');
			var data = result[0];
			var smsmsg = result[1];
			if(data === "wrongValiCode"){
				comAlert("������֤��������������¼�����ٴ�����", null, function(){
					$("#validBtn").click();
				});
			}else if(data=='phoneWrong'){
				comAlert("�ֻ���ʽ����ȷ");
			}else if(data=='time1Wait'){
				comAlert("����60������ִ�иò���");
			}else if(data=='alreadyValidate'){
				comAlert("���ֻ�����֤");
			}else if(data=='success'){
				if (channelFlag == 0) {
					channelFlag = 1;
				} else if(channelFlag == 1){
					channelFlag = 2;
				} else {
					channelFlag = 0;
				}
				if (!window.curr_click_target || window.curr_click_target == "SMS") {
					// ֻ�е�����Ż�ȡ��ť�󣬲����ض��Ű�ť����ʾ����ʱ�� ����������Ҫ��ʾ���Ű�ť�ĵ���ʱ��
					$("#validBtn").hide();
			        $("#tip").show();
			        count=60;
			        minutes();
			        if(smsmsg != null && smsmsg != ''){
			        	jQuery("#validatePhoneCodeMsg").html(smsmsg);
			        	jQuery("#validatePhoneCodeMsg").show();	
			        }
			        
			        setTimeout(function() {
			        	jQuery("#validatePhoneCodeMsg").fadeOut("1000");
			        }, 5000); 
				} 
				
				// ��ʾ��ʾ��Ϣ
				showTips();
				
			}else if(data=='overlimit'){
				if (channelFlag == 0) {
					channelFlag = 1;
				}else if(channelFlag == 1){
					channelFlag = 2
				} else {
					channelFlag = 0;
				}
				if(smsmsg != null && smsmsg != ''){
					jQuery("#validatePhoneCodeMsg").html(smsmsg);
					jQuery("#validatePhoneCodeMsg").show();
				}
			}else{
				if (channelFlag == 0) {
					channelFlag = 1;
				}else if(channelFlag == 1){
					channelFlag = 2
				} else {
					channelFlag = 0;
				}
				comAlert("�ṩ���ֻ�����������������æ����һ���Ӻ�����");
			}
			
		});
	}
};

var count=60;
function minutes() {
	count = count - 1;
	if (count >= 1) {
		setTimeout("minutes()", 1000);
	} else {
		// ����ʱ��ɺ�
		// 1. ���ŷ��Ͱ�ť����
		$("#validBtn").show();
		$("#validBtnDisabled").hide(); 
		$("#minutes").parent().hide();
		$("#validBtn").removeAttr("disabled");

		// 2. �������Ͱ�ť����
		$(".info_tips .sms_tip").hide();
		$(".info_tips .voice_tip1").show();
	}
	$("#minutes").html(count);
}

// ����ֻ�������֤��end

// ��֤�ֻ���֤��begin
function checkPhonevc(obj,actionFlag,isChecked){
	if(obj.val().length <= 0){
		jQuery("#validatePhoneCodeLabel").css("display","inline");
		if(isChecked){
			jQuery("#validatePhoneCodeMsg").html("<i></i>����д�ֻ���֤��");
			publicErrorShow(obj);
		}
		return false;
	}
   return true;
}
//��֤�ֻ���֤��end


//У����֤���Ƿ���ȷ
$(function(){
	var validateCodeObj = jQuery("#validateCode");
	validateCodeObj.focus(
		function(){
			jQuery("#validateCodeLabel").css("display","none");
		}
	)
	validateCodeObj.blur(
		function(){
			valiCode(validateCodeObj,1,false);
		}
	)
})
//��֤��
function valiCode(obj,actionFlag,isChecked){
	/*if(obj.val().length <= 0){
		jQuery("#validateCodeLabel").css("display","inline");
		if(isChecked){
			jQuery("#validateCodeMsg").html("����д��֤��");
			publicErrorShow(obj);
		}
		return false;
	}
	if(actionFlag == 1){
		var url = frontPath + "/member/verifyvalidatecode.do?ValidateCode=" + obj.val() + "&callback=?";
		jQuery.getJSON(url,CallbackVerifyValidateCodeReg);
	}else{
		return true;
	}*/
	return true;
}
//У����֤���Ƿ���ȷ�ص�
function CallbackVerifyValidateCodeReg(data){
	//jQuery("#validateCode").siblings(".input_correct").css("display","none");
	jQuery("#validateCode").siblings(".input_error").css("display", "none");
	switch(Number(data.msg)){
		case 0:
			publicRightShow(jQuery("#validateCode"));
			invitationCodeFlag = true;
			break;
		case 1:
			jQuery("#validateCodeMsg").html("<i></i>��֤���������������");
			publicErrorShow(jQuery("#validateCode"));
			invitationCodeFlag = false;
			break;
		default:
			invitationCodeFlag = false;
			comAlert("���緱æ~�����Ժ�����~");
			break;
	}
}

//��֤���Ķ�ͬ�����������̳Ƿ�������
function validateTermsofService(){
	if($("#checkBox").attr("checked") == true){
		$(".accepttip").hide();
		$(".showinfo").hide();
		$("#submitBtn").show();
		return true;
	}else{
		$("#submitBtn").hide();
		$(".accepttip").show();
		$(".showinfo").show();
		return false;
	}
}

//��֤������2
function validateForRegister(obj){
//	if (jQuery("#checkInvitationCode").is(":checked")){
		if(obj.val() != null && obj.val() != '' && obj.val().length<=0){
			comAlert("��������ȷ��������");
			return false;
		}
//	} 
	return true;
}

//У��ע�������
function valiRegForm(form){
	writeCookie("canWriteCookie", "true", "0.1");
	if(!emailFlag){
		comAlert("����������ֻ��Ѿ����ڻ��߷���������У���У����������,�ֻ������Ե�Ƭ��");
		return false;
	}
	if(!userLoginIdFlag){
		comAlert("�����û����Ѿ����ڻ��߷���������У���У�������û��������Ե�Ƭ��");
		return false;
	}
	if(!invitationCodeFlag) {
		comAlert("������֤�����������߷���������У���У��������֤������Ե�Ƭ��");
		return false;
	}
	if (jQuery("#coopNo").length > 0) {
		if(!valiCoopNo(jQuery("#coopNo"),true)){
			form.coopNo.blur();
			return false;
		}
	}
	if(!valiEMail(jQuery("#Email"),0,true)){
		form.Email.blur();
		return false;
	}
	if(!valiLoginId(jQuery("#loginId"),0,true)){
		form.loginId.blur();
		return false;
	}
	if(!valiPwd(jQuery("#password"),true)){
		form.password.blur();
		return false;
	}
	if(!valiPwd2(jQuery("#password2"),true)){
		form.password2.blur();
		return false;
	}
	if(registerform == 'email' && !valiPhone(jQuery("#phone"),0,true)){
		form.phone.blur();
		return false;
	}
	//�ж���֤�ĸ���֤��(��ͨ,�ֻ�)
	isMobilPhone = REGISTER.cellphone_numbe_regex.test(jQuery("#Email").val()); //�ֻ���ʽ��֤
	if(isMobilPhone){
		if(!checkPhonevc(jQuery("#getCode"),0,true)){
			form.getCode.blur();
			return false;
		}
	}else{
		if(!valiCode(jQuery("#validateCode"),0,true)){
			form.validateCode.blur();
			return false;
		}
	}
	/*if(!validateForRegister(jQuery("#invitationCode"))){
		return false;
	}*/
	if(!validateTermsofService()){
		return false;
	}
	return true;
}
//�ص������н���msg������������ʾ
function callbackRegisterCommon(data){
	var loginId = jQuery("#loginId").val();	
	//jQuery("#validateCode").siblings(".input_correct").css("display","none");
	jQuery("#validateCode").val("").siblings(".input_error").css("display", "none");
	switch(Number(data.msg)){
//		case -1:
//			comAlert("�Բ�����ˢ��ҳ������µ�¼��");
//			break;
		case 0:
			initialRegisterCode(loginId);//ע������
			break;
		case 1:
			comAlert("�û����Ѿ����ڣ��뻻����һ��");
			codeRefresh("ValiCodeForRegister");
			break;
		case 2:	
			comAlert("Email��ַ���ֻ��Ѿ����ڣ��뻻����һ��");
			codeRefresh("ValiCodeForRegister");
			break;
		case 3:
			comAlert("��Ǹ��ϵͳ��æ�����Ժ�����");
			codeRefresh("ValiCodeForRegister");
			break;
		case 4:
			comAlert("��֤���������");
			codeRefresh("ValiCodeForRegister");
			document.getElementById("validateCode").value='';
			document.getElementById("validateCode").focus();
			break;
		case 5:
			comAlert("�����ʼ�ʧ�ܣ���������ʼ���ַ�Ƿ���Ч");
			codeRefresh("ValiCodeForRegister");
			break;
		case 6:
			comAlert("��Ǹ��ϵͳ��æ�����Ժ���ע���ޣ�");
			codeRefresh("ValiCodeForRegister");
			break;
		case 7:
			comAlert("��������ȷ��������");
			codeRefresh("ValiCodeForRegister");
			break;
		case 8:
			comAlert("�˺ű����ᣬ��30���Ӻ��ٳ��Ե�¼");
			codeRefresh("ValiCodeForRegister");
			break;
		case 12:
			comAlert("��Ǹ����������cookie��������cookie����ע��");
			codeRefresh("ValiCodeForRegister");
			break;
		case 13:
			comAlert(data.strMsg);
			codeRefresh("ValiCodeForRegister");
			break;
		case 14:
			comAlert("��������ȷ���ֻ���֤��");
			codeRefresh("ValiCodeForRegister");
			break;
		case 15:
			comAlert("��Ǹ�����ֻ���֤����ʧЧ");
			codeRefresh("ValiCodeForRegister");
			break;
		case 16:
			comAlert("�˺Ŵ��ڷ��գ�����ϵ�ͷ������400-005-5678");
			codeRefresh("ValiCodeForRegister");
			break;
		default:
			comAlert("���緱æ~�����Ժ�����~");
			break;
	}
}

function valiCallbackRegisterData(data){
	isSubmiting = false;
	if(!data || !data.msg || data.msg == ""){
		comAlert("���緱æ�������Ժ�����~");
		codeRefresh('ValiCodeForRegister');
		return false;
	}
	return true;
}
/*�ύ��begin*/
var isSubmiting = false;
function submitRegisterForm(form, action, callbackFunc) {
	if(!valiRegForm(form)){
		return false;
	}
	if(isSubmiting) {
		comAlert("ע���У����Ժ󡣡���");
		return false;
	}
	isSubmiting = true;
	var params = getFormParamsJSON(form);
	var registerurl = frontPath + action;
	$.ajax({
		type:"POST",
		url:registerurl,
		async:false,
		dataType:"json",
		data:params,
		success:callbackFunc,
		error : function () {
			comAlert("���糬ʱ�����Ժ�����");
		}
	});
	return false;
}
//ע��ص�����
function callbackRegister(data){
	var callbackParams = [];
	callbackParams.push(jQuery("#loginId").val());
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){
		var url = data.returnUrl + "?uuid=" +data.uuid;
		if(data.loginAndRegisterWay || data.loginAndRegisterWay != ""){
			url = url + "&loginAndRegisterWay=" + data.loginAndRegisterWay;
		}
		
		if(data.registerActionName || data.registerActionName != ""){
			url = url + "&registerActionName=" + data.registerActionName;
		}
		url = url.replace(/&amp;/g, "&");
		setTimeout(function(){window.location=url;}, 500);
	}
}

/*�ύ��end*/

/****ע�ᵯ������ò���***begin-----------------------*/
function submitRegisterFormPopup(form, action, callbackFunc) {
	if(!valiRegForm(form)){
		return false;
	}
	if(isSubmiting) {
		comAlert("ע���У����Ժ󡣡���");
		return false;
	}
	isSubmiting = true;
	var params = getFormParamsJSON(form);
	var registerurl = frontPath + action;
	$.ajax({
		type:"POST",
		url:registerurl,
		async:false,
		dataType:"json",
		data:params,
		success:callbackFunc,
		error : function () {
			comAlert("���糬ʱ�����Ժ�����");
		}
	});
	return false;
}
//���ﳵע��ص�
function callbackCartRegister(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){
		var url = data.url.replace(/&amp;/g, "&");
		setTimeout(function(){window.parent.window.location = url;}, 500);
	}
}
//�ղ�ע��ص�
function callbackRegisterCommonPopu(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//�ɹ�;
		var url = data.url.replace(/&amp;/g, "&");
		getCrossDomainTopLoginInfo(collectPopup);//���ղ�
		window.parent.window.open(url);
	}
}

//����ע��ص�
function callbackRemarkRegister(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//�ɹ�;
		initialRegisterCode();//ע������
		var url = data.url.replace(/&amp;/g, "&");
		getCrossDomainTopLoginInfo(updateRemarkView);
		window.parent.window.open(url);
	}
}

//����֪ͨע��ص�
function callbackRegisterArrivalNotice(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//�ɹ�;
		var url = data.url.replace(/&amp;/g, "&");
		getCrossDomainTopLoginInfo(arrivalAgain);
		window.parent.window.open(url);
	}
}
//����֪ͨע��ص�
function callbackRegisterPriceNotice(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//�ɹ�;
		var url = data.url.replace(/&amp;/g, "&");
		getCrossDomainTopLoginInfo(priceAgain);
		window.parent.window.open(url);
	}
}

//��ʳ��¼�ص�
function callbackRegisterEvt(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//�ɹ�;
		var url = data.url.replace(/&amp;/g, "&");
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(parent.chooseFood);
		window.parent.window.open(url);
	}
}
/****ע�ᵯ������ò���***end-----------------------*/
//���������� ��ѡ���Ƿ�ѡ��20131022
function checkChange(obj) {       
	var display =$('.ma_input').css('display');      
	if (display == "block") {    
		  $(".ma_input").hide(); 
		  $(".mcicont_btn i").hide();  
		  $("#invitationCode").val("");
		  $("#invitationCodeLabel").show();
	}else{
		  $(".ma_input").show(); 
		  $(".mcicont_btn i").show();   
	}
}

//�ж�labal״̬
function checkLabal(obj,labalobj){
	if( obj.val() != '' ){
		labalobj.hide();
	}else{
		labalobj.show();
	}
}

function rCheckAlways(){
	window.oIntervalCheckAlways = setInterval(
	function(){
		if (jQuery("#coopNo").length > 0) { 
			checkLabal(jQuery("#coopNo"),jQuery("#coopNoLabel"));
		}
		checkLabal(jQuery("#Email"),jQuery("#EmailLabel"));
		checkLabal(jQuery("#loginId"),jQuery("#loginIdLabel"));
		checkLabal(jQuery("#password"),jQuery("#passwordLabel"));
		checkLabal(jQuery("#password2"),jQuery("#password2Label"));
		checkLabal(jQuery("#phone"),jQuery("#phoneLabel"));
		checkLabal(jQuery("#getCode"),jQuery("#validatePhoneCodeLabel"));
	},300
	);
}

/* ��֤�� */
$(document).ready(function(){
	var $popvalicodeBox = $("#popvalicode-box");
	$popvalicodeBox.css("left", ($(document).width() - 1000)/2);	
	
	var defaultTxt = "�������";
	
	var changeCode = function(){
		$("#valicode img").attr("src", frontPath + "/validation/complexValidationCode.do?t=" + Math.random());
	};
	
	// ˢ����֤��
	$("#valicode")
	.delegate(".close", "click", function(){
		$("#valicode").hide();
		closeComAlertShade();
	})
	.delegate(".change-code", "click", function(){
		changeCode();
	})
	.delegate("input", "focusout", function(){
		var $this = $(this);
		var val = $this.val();
		val = $.trim(val);
		if(val === defaultTxt){
			return;
		}else if(val.length === 0){
			$this.val(defaultTxt);
			return;
		}
		
	})
	.delegate("input.answer", "focusin", function(){
		var $this = $(this);
		var val = $this.val();
		val = $.trim(val);
		if(val === defaultTxt){
			$this.val("");
		}
	})
	.delegate("img", "click", function(){
		changeCode();
	})
	.delegate(".cancel", "click", function(){
		$("#valicode").hide().find("input.answer").val(defaultTxt);
		closeComAlertShade();
	})
	.delegate(".submit", "click", function(){
		var $input = $("#valicode").find("input.answer");
		var answer = $input.val();
		$input.val(defaultTxt);
		answer = $.trim(answer);
		if(answer.length === 0){
			comAlert("������ͼƬ����ʽ�Ĵ�.", null, function(){
				showComAlertShade();
				changeCode();
			});
			return;
		}
		
		if(!/^\d+$/.test(answer) || parseInt(answer, 10) > 20){
            $("#valicode .cancel").click();
			comAlert("������֤��������������¼�����ٴ�����", null, function(){
				showComAlertShade();
                $("#valicode").show();
				changeCode();
			});
			return;
		}
		
		// ���Ͷ���ʱ
		if (!window.curr_click_target || curr_click_target == "SMS") {
			sendValidatePhoneCode(answer, "send");
		} else {
		// ��������ʱ
			sendValidatePhoneCode(answer, "call");
		}
		
		$("#valicode .cancel").click();
	});
	
	// ���������֤��
	// $("#validBtn").click(function(){
	// 	if(registerform == ''){
	// 		var EmailObj = jQuery("#Email");
	// 		valiEMail(EmailObj,0,true);
	// 		return;
	// 	}
	// 	var param = {"from": registerform};
	// 	$.post(frontPath + "/sms/sendSmsCount.do", param, function(result){
	// 		if(result > 2){
	// 			// �����ʶ����ԴΪ���Ż�ȡ��ť  ���� 2015��11��20��
	// 			window.curr_click_target = "SMS";
	//
	// 			showComAlertShade();
	// 			$("#valicode").show();
	// 			changeCode();
	// 		}else{
	// 			var answer = ""
	// 			sendValidatePhoneCode(answer, "send");
	// 			$("#valicode .cancel").click();
	// 		}
	// 	});
	// });

    // ���������֤��
    $("#validBtn").click(function(){
        showComAlertShade();
        $("#valicode").show();
        changeCode();
    });
	
	// ��ȡ������֤��
	$("#sendVoiceCheckcode").click(function(e) {
		if(registerform == ''){
			var EmailObj = jQuery("#Email");
			valiEMail(EmailObj,0,true);
			return;
		}
		var param = {"form": registerform};
		$.post(frontPath + "/sms/sendSmsCount.do", param, function(result){
			if(result > 2){
				// �����ʶ����ԴΪ������ȡ��ť  ���� 2015��11��20��
				window.curr_click_target = "VOICE";
				
				showComAlertShade();
				$("#valicode").show();
				changeCode();
			}else{
				var answer = ""
				sendValidatePhoneCode(answer, "call");
				$("#valicode .cancel").click();
			}
		});	
	});
});


function showTips() {
	// ���Ͷ���ʱ
	if (!window.curr_click_target || curr_click_target == "SMS") {
		// �����ȡ����ʱ����ʾ��Ϣ��ʾ��
		 $(".info_tips .sms_tip").show();
		 $(".info_tips .voice_tip1, .info_tips .voice_tip2").hide();
	} else {
	// ��������ʱ
		// 2. ���ض��Ű�ť
		 $("#validBtn").hide();
         $("#validBtnDisabled").show();
         
		// 3. ����������ʾ
		$(".info_tips .voice_tip1, .info_tips .sms_tip").hide(); // ���ض����ѷ���...���޷���ȡ����... 
		$(".info_tips .voice_tip2").show(); // ��ʾ�绰������...�͵���ʱ
		
		var second = 60;
		$(".info_tips .voice_tip2_timeout").html(second + "�������²���");
		var voice_int = setInterval(function() {
			// ��ԭ��Ϣ��ʾ
			$(".info_tips .voice_tip2_timeout").html(--second + "�������²���");
			
			if (second == 0) {
				// �ָ��ı���ʾ
				$(".info_tips .voice_tip1").show();
				$(".info_tips .voice_tip2").hide();
				$(".info_tips .voice_tip2_timeout").html("");
				
				// �ָ����Ű�ť��ʾ
				$("#validBtn").show(); 
				$("#validBtnDisabled").hide();
				$("#minutes").parent().hide();
				$("#validBtn").removeAttr("disabled");
				
				// ��ֹ��ʱ��
				window.clearInterval(voice_int);
			}
		}, 1000);
	}
}


//����ע����֤�ֻ�
$(function(){
	var PhoneObj = jQuery("#phone");
	PhoneObj.focus(
		function(){
			if(PhoneObj.val().length > 0){
				jQuery("#phoneLabel").css("display","none");
			}
		}
	)
	PhoneObj.blur(
		function(){
			valiPhone(PhoneObj, 1, false);
		}
	)
})
function valiPhone(obj,actionFlag,isChecked){
	if (obj.val().length <= 0) {
		if(isChecked){
			jQuery("#phoneLabel").css("display", "inline");
			jQuery("#phoneMsg").html("<i></i>�������ֻ���");
			obj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(obj);
		}
		return false;
	}
	isMobilPhone = REGISTER.cellphone_numbe_regex.test(obj.val()); //�ֻ���ʽ��֤
	if(isMobilPhone){
		if(actionFlag == 1){//����ǵ�����֤
			//�ֻ���ʽ��֤ͨ��,ҳ��Ĵ���(Ψһ��,��ʾ�ֻ���֤��)
			publicRightShow(obj);
			obj.parent().find(".cont_input").removeClass("cont_inputerror");
			valiPhone_asyn(function(data){
				if (data && data == "true") {
					jQuery("#phoneMsg").html("<i></i>���ֻ������Ѱ�����������ֱ��ʹ�õ�¼");
					obj.parent().find(".cont_input").addClass("cont_inputerror");
					publicErrorShow(obj);
					return false;
				} else {
					publicRightShow(obj);
					obj.parent().find(".cont_input").removeClass("cont_inputerror");
					return true;
				}
			},null,obj.val());
		}else{
			obj.parent().find(".cont_input").removeClass("cont_inputerror");
			return true;
		}
	}else{
		jQuery("#phoneMsg").html("<i></i>��������ȷ���ֻ�����");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}
}