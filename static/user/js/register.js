var REGISTER = {
		cellphone_numbe_regex : /^1[3456789]\d{9}$/   // 手机号码
};
var valiEMail_asyn = function(callback, callbackParams, email){	//异步校验邮箱
	$.post(frontPath + "/register/judgeemail.do", {"Email":email}, function(data){
		callback(data, callbackParams);
	});
}
var valiPhone_asyn = function(callback, callbackParams, phone){	//异步校验手机
	$.post(frontPath + "/register/judgephone.do", {"Phone":phone}, function(data){
		callback(data, callbackParams);
	});
}
var valiLoginId_asyn = function(callback, callbackParams, loginId){	//异步校验用户名
	$.post(frontPath + "/register/judgeloginid.do", {"loginId":loginId}, function(data){
		callback(data, callbackParams);
	});
}

//写cookie
function writeCookie(name, value, hours){
	var expire = "";
	if(hours != null){
		expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = "; expires=" + expire.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expire;
}
//隐藏提示信息
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
//错误提示显示
function publicErrorShow(obj){
	obj.siblings(".input_error").css("display", "inline");
	//obj.siblings(".input_correct").css("display", "none");
}

//正确提示显示
function publicRightShow(obj){
	//obj.siblings(".input_correct").css("display", "inline");
	obj.siblings(".input_error").css("display", "none");
}
var emailFlag = true;//校验邮箱
var userLoginIdFlag = true;//校验用户名
var invitationCodeFlag = true;//校验验证码
//验证邮箱***begin
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
			jQuery("#EmailMsg").html("<i></i>邮箱或手机不能为空");
			obj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(obj);
		}
		return false;
	}
	
	//1.判断手机
	isMobilPhone = REGISTER.cellphone_numbe_regex.test(obj.val()); //手机格式验证
	if(isMobilPhone){
		registerform = "phone";
		//$("#publicvalidateCode").hide();
		$("#sendValidataPhoneByEmail").hide();
		$("#public_mcicont_line").hide();
		$("#sendValidatePhone").show(); 
		//手机格式验证通过,页面的处理(唯一性,显示手机验证码)
		publicRightShow(obj);
		obj.parent().find(".cont_input").removeClass("cont_inputerror");
		if(actionFlag == 1){
			valiPhone_asyn(function(data){
				if (data && data == "true") {
					jQuery("#EmailMsg").html("<i></i>手机已经绑定存在，请换另外一个");
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
	//2.判断邮箱
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
					jQuery("#EmailMsg").html("<i></i>Email地址已经存在，请换另外一个");
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
		jQuery("#EmailMsg").html("<i></i>请您输入正确的邮箱或手机");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
	}

}
//验证邮箱***end

// add by lihongyao 20150609 上海工会注册
// 验证合作企业工号***begin
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
// 验证合作企业工号是否有效
function valiCoopNo(coopNoObj,isChecked){ 
	if (coopNoObj.val().length <= 0) {
		jQuery("#coopNoLabel").css("display", "inline");
		if(isChecked){
			jQuery("#coopNoMsg").html("<i></i>合作企业工号不能为空");
			coopNoObj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(coopNoObj);
		}
		return false;
	}
	publicRightShow(coopNoObj);
	coopNoObj.parent().find(".cont_input").removeClass("cont_inputerror");
	return true;
}
//验证用户名****begin
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
			//验证用户名是否有效
			valiLoginId(LoginidObj, 1, false);
		})
})

//验证用户名是否有效
function valiLoginId(LoginidObj,actionFlag,isChecked){
	if (LoginidObj.val().length <= 0) {
		jQuery("#loginIdLabel").css("display", "inline");
		if(isChecked){
			jQuery("#loginIdMsg").html("<i></i>用户名不能为空");
			LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(LoginidObj);
		}
		return false;
	}
	var registerLoginid = LoginidObj.val();// 用户名文本框的内容
	var registerLoginIdMsg = jQuery("#loginIdMsg");
	var checkflag = 0; //判断0为默认值（正确），1为数字开头（错误），2是其他错误（错误）
	var valLength = 0; //长度
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
		registerLoginIdMsg.html("<i></i>用户名不能以数字开头");
		LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(LoginidObj);
		return false;
	}else if(checkflag == 2){
		registerLoginIdMsg.html("<i></i>用户名是由小写英文字母、数字、中文或下划线组成");
		LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(LoginidObj);
		return false;
	}else{
		if(valLength<4){
	 		registerLoginIdMsg.html("<i></i>用户名太短，请在4-20字符之间");
	 		LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
	 		publicErrorShow(LoginidObj);
	 		return false;
 		}else if(valLength>20){
			registerLoginIdMsg.html("<i></i>用户名过长，请在4-20字符之间");
			LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(LoginidObj);
			return false;
 		}else if(!isNaN(registerLoginid)){
   			registerLoginIdMsg.html("<i></i>注册用户名不能为纯数字");
   			LoginidObj.parent().find(".cont_input").addClass("cont_inputerror");
   			publicErrorShow(LoginidObj);
   			return false;
 		}else{
 			if(actionFlag == 1){//如果是单步验证
 				valiLoginId_asyn(function(data){
					if(data && data == "true"){
	  					userLoginIdFlag = false;
	    				registerLoginIdMsg.html("<i></i>用户名已经存在，请换另外一个");
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
//验证用户名****end

//验证用户密码***beging
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
	//验证用户名是否有效
	if (obj.val().length <= 0) {
		jQuery("#passwordLabel").css("display", "inline");
		if(isChecked){
			jQuery("#passwordMsg").html("<i></i>密码不能为空");
			obj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(obj);
		}
		return false;
	}
	var passwordMsg = jQuery("#passwordMsg");
	//obj.siblings(".input_correct").css("display","none");
	obj.siblings(".input_error").css("display", "none");
	if(obj.val()==""||obj.val().length<8||obj.val().length>16){
		passwordMsg.html("<i></i>密码长度必须为8-16个字符");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}else if(!valiSafePwd(obj.val())){
		passwordMsg.html("<i></i>密码必须需包含2个字母和2个数字的组合");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}else{
		publicRightShow(obj);
		obj.parent().find(".cont_input").removeClass("cont_inputerror");
		return true;
	}
}
//验证密码的元素
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


//确认密码
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
//验证邀请码
$(function(){
	var invitationcodeobj = jQuery("#invitationCode");
	jQuery("#invitationCode").focus(function(){
			jQuery("#invitationCodeLabel").css("display","none");//隐藏提示信息
		}
	)
	jQuery("#invitationCode").blur(function(){
			if(jQuery("#invitationCode").val().length <= 0){
				jQuery("#invitationCodeLabel").css("display", "inline");
			}
		})
})


function valiPwd2(obj,isChecked){
	//验证用户密码是否有效
	if (obj.val().length <= 0) {
		jQuery("#password2Label").css("display", "inline");
		if(isChecked){
			jQuery("#password2Msg").html("<i></i>确认密码不能为空");
			obj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(obj);
		}
		return false;
	}
	var password2Msg = jQuery("#password2Msg");
	var pwd=jQuery("#password");
	if(pwd.val()!=obj.val()){
		password2Msg.html("<i></i>两次输入的密码不一致，请重新输入");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}else if(obj.val()==""||obj.val().length<8||obj.val().length>16){
		password2Msg.html("<i></i>密码长度必须为8-16个字符");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}else if(!valiSafePwd(obj.val())){
		password2Msg.html("<i></i>密码必须需包含2个字母和2个数字的组合");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		return false;
	}else{
		publicRightShow(obj);
		obj.parent().find(".cont_input").removeClass("cont_inputerror");
		return true;
	}
}
//验证用户密码***end

//点击手机发送验证码begin
//modify by lihongyao 20141105 短信通道切换
var channelFlag = 1; // 0-亿美  1-梦网  2-百悟
var sendValidatePhoneCode = function(valiCode, sendOrCall){	//发送手机验证码
	var phoneOrEmail = jQuery("#Email").val();
	if(registerform == 'email'){
		phoneOrEmail = jQuery("#phone").val();
	}
	isMobilPhone = REGISTER.cellphone_numbe_regex.test(phoneOrEmail); //手机格式验证
	if(!isMobilPhone){
		if(registerform == 'email'){
			jQuery("#phoneMsg").html("<i></i>请您输入正确的手机号码");
			jQuery("#phone").find(".cont_input").addClass("cont_inputerror");
			publicErrorShow($("#phone"));
		}else{
			jQuery("#EmailMsg").html("<i></i>请您输入正确的手机号码");
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
				comAlert("您的验证码输入错误，请重新计算后再次输入", null, function(){
					$("#validBtn").click();
				});
			}else if(data=='phoneWrong'){
				comAlert("手机格式不正确");
			}else if(data=='time1Wait'){
				comAlert("请间隔60秒钟再执行该操作");
			}else if(data=='alreadyValidate'){
				comAlert("该手机已验证");
			}else if(data=='success'){
				if (channelFlag == 0) {
					channelFlag = 1;
				} else if(channelFlag == 1){
					channelFlag = 2;
				} else {
					channelFlag = 0;
				}
				if (!window.curr_click_target || window.curr_click_target == "SMS") {
					// 只有点击短信获取按钮后，才隐藏短信按钮和显示倒计时。 语音请求不需要显示短信按钮的倒计时。
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
				
				// 显示提示信息
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
				comAlert("提供的手机号码有误或服务器繁忙，请一分钟后重试");
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
		// 倒计时完成后：
		// 1. 短信发送按钮可用
		$("#validBtn").show();
		$("#validBtnDisabled").hide(); 
		$("#minutes").parent().hide();
		$("#validBtn").removeAttr("disabled");

		// 2. 语音发送按钮可用
		$(".info_tips .sms_tip").hide();
		$(".info_tips .voice_tip1").show();
	}
	$("#minutes").html(count);
}

// 点击手机发送验证码end

// 验证手机验证码begin
function checkPhonevc(obj,actionFlag,isChecked){
	if(obj.val().length <= 0){
		jQuery("#validatePhoneCodeLabel").css("display","inline");
		if(isChecked){
			jQuery("#validatePhoneCodeMsg").html("<i></i>请填写手机验证码");
			publicErrorShow(obj);
		}
		return false;
	}
   return true;
}
//验证手机验证码end


//校验验证码是否正确
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
//验证码
function valiCode(obj,actionFlag,isChecked){
	/*if(obj.val().length <= 0){
		jQuery("#validateCodeLabel").css("display","inline");
		if(isChecked){
			jQuery("#validateCodeMsg").html("请填写验证码");
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
//校验验证码是否正确回调
function CallbackVerifyValidateCodeReg(data){
	//jQuery("#validateCode").siblings(".input_correct").css("display","none");
	jQuery("#validateCode").siblings(".input_error").css("display", "none");
	switch(Number(data.msg)){
		case 0:
			publicRightShow(jQuery("#validateCode"));
			invitationCodeFlag = true;
			break;
		case 1:
			jQuery("#validateCodeMsg").html("<i></i>验证码错误，请重新输入");
			publicErrorShow(jQuery("#validateCode"));
			invitationCodeFlag = false;
			break;
		default:
			invitationCodeFlag = false;
			comAlert("网络繁忙~请您稍后重试~");
			break;
	}
}

//验证已阅读同意中粮网上商城服务条款
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

//验证邀请码2
function validateForRegister(obj){
//	if (jQuery("#checkInvitationCode").is(":checked")){
		if(obj.val() != null && obj.val() != '' && obj.val().length<=0){
			comAlert("请输入正确的邀请码");
			return false;
		}
//	} 
	return true;
}

//校验注册表单数据
function valiRegForm(form){
	writeCookie("canWriteCookie", "true", "0.1");
	if(!emailFlag){
		comAlert("您的邮箱或手机已经存在或者服务器正在校验中，请更换邮箱,手机或者稍等片刻");
		return false;
	}
	if(!userLoginIdFlag){
		comAlert("您的用户名已经存在或者服务器正在校验中，请更换用户名或者稍等片刻");
		return false;
	}
	if(!invitationCodeFlag) {
		comAlert("您的验证码输入错误或者服务器正在校验中，请更换验证码或者稍等片刻");
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
	//判断验证哪个验证码(普通,手机)
	isMobilPhone = REGISTER.cellphone_numbe_regex.test(jQuery("#Email").val()); //手机格式验证
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
//回调函数中解析msg，给出合理提示
function callbackRegisterCommon(data){
	var loginId = jQuery("#loginId").val();	
	//jQuery("#validateCode").siblings(".input_correct").css("display","none");
	jQuery("#validateCode").val("").siblings(".input_error").css("display", "none");
	switch(Number(data.msg)){
//		case -1:
//			comAlert("对不起，请刷新页面后重新登录！");
//			break;
		case 0:
			initialRegisterCode(loginId);//注册监测码
			break;
		case 1:
			comAlert("用户名已经存在，请换另外一个");
			codeRefresh("ValiCodeForRegister");
			break;
		case 2:	
			comAlert("Email地址或手机已经存在，请换另外一个");
			codeRefresh("ValiCodeForRegister");
			break;
		case 3:
			comAlert("抱歉，系统繁忙，请稍后再试");
			codeRefresh("ValiCodeForRegister");
			break;
		case 4:
			comAlert("验证码输入错误");
			codeRefresh("ValiCodeForRegister");
			document.getElementById("validateCode").value='';
			document.getElementById("validateCode").focus();
			break;
		case 5:
			comAlert("发送邮件失败！请检查你的邮件地址是否有效");
			codeRefresh("ValiCodeForRegister");
			break;
		case 6:
			comAlert("抱歉，系统繁忙，请稍后再注册噢！");
			codeRefresh("ValiCodeForRegister");
			break;
		case 7:
			comAlert("请输入正确的邀请码");
			codeRefresh("ValiCodeForRegister");
			break;
		case 8:
			comAlert("账号被冻结，请30分钟后再尝试登录");
			codeRefresh("ValiCodeForRegister");
			break;
		case 12:
			comAlert("抱歉，您禁用了cookie，请启用cookie后再注册");
			codeRefresh("ValiCodeForRegister");
			break;
		case 13:
			comAlert(data.strMsg);
			codeRefresh("ValiCodeForRegister");
			break;
		case 14:
			comAlert("请输入正确的手机验证码");
			codeRefresh("ValiCodeForRegister");
			break;
		case 15:
			comAlert("抱歉，该手机验证码已失效");
			codeRefresh("ValiCodeForRegister");
			break;
		case 16:
			comAlert("账号存在风险，请联系客服解决：400-005-5678");
			codeRefresh("ValiCodeForRegister");
			break;
		default:
			comAlert("网络繁忙~请您稍后重试~");
			break;
	}
}

function valiCallbackRegisterData(data){
	isSubmiting = false;
	if(!data || !data.msg || data.msg == ""){
		comAlert("网络繁忙，请您稍后重试~");
		codeRefresh('ValiCodeForRegister');
		return false;
	}
	return true;
}
/*提交表单begin*/
var isSubmiting = false;
function submitRegisterForm(form, action, callbackFunc) {
	if(!valiRegForm(form)){
		return false;
	}
	if(isSubmiting) {
		comAlert("注册中，请稍后。。。");
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
			comAlert("网络超时，请稍后再试");
		}
	});
	return false;
}
//注册回调函数
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

/*提交表单end*/

/****注册弹出层调用部分***begin-----------------------*/
function submitRegisterFormPopup(form, action, callbackFunc) {
	if(!valiRegForm(form)){
		return false;
	}
	if(isSubmiting) {
		comAlert("注册中，请稍后。。。");
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
			comAlert("网络超时，请稍后再试");
		}
	});
	return false;
}
//购物车注册回调
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
//收藏注册回调
function callbackRegisterCommonPopu(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//成功;
		var url = data.url.replace(/&amp;/g, "&");
		getCrossDomainTopLoginInfo(collectPopup);//打开收藏
		window.parent.window.open(url);
	}
}

//评论注册回调
function callbackRemarkRegister(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//成功;
		initialRegisterCode();//注册监测码
		var url = data.url.replace(/&amp;/g, "&");
		getCrossDomainTopLoginInfo(updateRemarkView);
		window.parent.window.open(url);
	}
}

//到货通知注册回调
function callbackRegisterArrivalNotice(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//成功;
		var url = data.url.replace(/&amp;/g, "&");
		getCrossDomainTopLoginInfo(arrivalAgain);
		window.parent.window.open(url);
	}
}
//降价通知注册回调
function callbackRegisterPriceNotice(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//成功;
		var url = data.url.replace(/&amp;/g, "&");
		getCrossDomainTopLoginInfo(priceAgain);
		window.parent.window.open(url);
	}
}

//挑食登录回调
function callbackRegisterEvt(data){
	if(!valiCallbackRegisterData(data)){
		return;
	}
	callbackRegisterCommon(data);
	if(data.msg==0){//成功;
		var url = data.url.replace(/&amp;/g, "&");
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(parent.chooseFood);
		window.parent.window.open(url);
	}
}
/****注册弹出层调用部分***end-----------------------*/
//我有邀请码 复选框是否选中20131022
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

//判断labal状态
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

/* 验证码 */
$(document).ready(function(){
	var $popvalicodeBox = $("#popvalicode-box");
	$popvalicodeBox.css("left", ($(document).width() - 1000)/2);	
	
	var defaultTxt = "请输入答案";
	
	var changeCode = function(){
		$("#valicode img").attr("src", frontPath + "/validation/complexValidationCode.do?t=" + Math.random());
	};
	
	// 刷新验证码
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
			comAlert("请输入图片中算式的答案.", null, function(){
				showComAlertShade();
				changeCode();
			});
			return;
		}
		
		if(!/^\d+$/.test(answer) || parseInt(answer, 10) > 20){
            $("#valicode .cancel").click();
			comAlert("您的验证码输入错误，请重新计算后再次输入", null, function(){
				showComAlertShade();
                $("#valicode").show();
				changeCode();
			});
			return;
		}
		
		// 发送短信时
		if (!window.curr_click_target || curr_click_target == "SMS") {
			sendValidatePhoneCode(answer, "send");
		} else {
		// 发送语音时
			sendValidatePhoneCode(answer, "call");
		}
		
		$("#valicode .cancel").click();
	});
	
	// 点击发送验证码
	// $("#validBtn").click(function(){
	// 	if(registerform == ''){
	// 		var EmailObj = jQuery("#Email");
	// 		valiEMail(EmailObj,0,true);
	// 		return;
	// 	}
	// 	var param = {"from": registerform};
	// 	$.post(frontPath + "/sms/sendSmsCount.do", param, function(result){
	// 		if(result > 2){
	// 			// 点击标识：来源为短信获取按钮  刘俊 2015年11月20日
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

    // 点击发送验证码
    $("#validBtn").click(function(){
        showComAlertShade();
        $("#valicode").show();
        changeCode();
    });
	
	// 获取语音验证码
	$("#sendVoiceCheckcode").click(function(e) {
		if(registerform == ''){
			var EmailObj = jQuery("#Email");
			valiEMail(EmailObj,0,true);
			return;
		}
		var param = {"form": registerform};
		$.post(frontPath + "/sms/sendSmsCount.do", param, function(result){
			if(result > 2){
				// 点击标识：来源为语音获取按钮  刘俊 2015年11月20日
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
	// 发送短信时
	if (!window.curr_click_target || curr_click_target == "SMS") {
		// 点击获取短信时将显示信息提示框
		 $(".info_tips .sms_tip").show();
		 $(".info_tips .voice_tip1, .info_tips .voice_tip2").hide();
	} else {
	// 发送语音时
		// 2. 隐藏短信按钮
		 $("#validBtn").hide();
         $("#validBtnDisabled").show();
         
		// 3. 更改语音提示
		$(".info_tips .voice_tip1, .info_tips .sms_tip").hide(); // 隐藏短信已发送...和无法收取短信... 
		$(".info_tips .voice_tip2").show(); // 显示电话呼入中...和倒计时
		
		var second = 60;
		$(".info_tips .voice_tip2_timeout").html(second + "秒后可重新拨打");
		var voice_int = setInterval(function() {
			// 还原信息提示
			$(".info_tips .voice_tip2_timeout").html(--second + "秒后可重新拨打");
			
			if (second == 0) {
				// 恢复文本显示
				$(".info_tips .voice_tip1").show();
				$(".info_tips .voice_tip2").hide();
				$(".info_tips .voice_tip2_timeout").html("");
				
				// 恢复短信按钮显示
				$("#validBtn").show(); 
				$("#validBtnDisabled").hide();
				$("#minutes").parent().hide();
				$("#validBtn").removeAttr("disabled");
				
				// 终止定时器
				window.clearInterval(voice_int);
			}
		}, 1000);
	}
}


//邮箱注册验证手机
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
			jQuery("#phoneMsg").html("<i></i>请输入手机号");
			obj.parent().find(".cont_input").addClass("cont_inputerror");
			publicErrorShow(obj);
		}
		return false;
	}
	isMobilPhone = REGISTER.cellphone_numbe_regex.test(obj.val()); //手机格式验证
	if(isMobilPhone){
		if(actionFlag == 1){//如果是单步验证
			//手机格式验证通过,页面的处理(唯一性,显示手机验证码)
			publicRightShow(obj);
			obj.parent().find(".cont_input").removeClass("cont_inputerror");
			valiPhone_asyn(function(data){
				if (data && data == "true") {
					jQuery("#phoneMsg").html("<i></i>该手机号码已绑定我买网，可直接使用登录");
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
		jQuery("#phoneMsg").html("<i></i>请输入正确的手机号码");
		obj.parent().find(".cont_input").addClass("cont_inputerror");
		publicErrorShow(obj);
		return false;
	}
}