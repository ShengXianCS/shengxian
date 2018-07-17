//隐藏提示信息
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

//登陆页面的文本框验证
//用户名验证事件
$(function(){
	loginValidate("cartLoginId","cartLoginIdLabel","用户名",false);//用户名验证
	loginValidate("cartPassword","cartPasswordLabel","密码",false);//密码验证
})
//监控浏览器
$(function (){
	jQuery("#cartLoginId").keydown(function(){
		if($("#cartPassword").val().length > 0){
			$("#cartPasswordLabel").css("display","none");
		}
	})
})
//验证非空
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
		jqObjInput.siblings(".input_error").html(name + "不能为空！").show();
		}
		//移除删除标志
		if(titleId=="cartLoginId"){
			jQuery("#clearAll").css("display","none");
		}
		//给当前登陆输入错误信息的当前显示状态添加样式 2013-10-18
		if(noCheck){
		jqObjInput.parent().find(".cont_input").addClass("cont_inputerror");
		jqObjInput.parent().find(".user_input").addClass("user_inputerror");
		}
	    
		return false;
	}else{
		//jqObjInput.siblings(".input_correct").show().siblings(".input_error").hide();
		jqObjInput.siblings(".input_error").hide();
		//为用户名添加删除标志
		if(titleId=="cartLoginId"){
			jQuery("#clearAll").css("display","inline-block")
		}
		//移除当前登陆输入错误信息的当前显示状态的样式 2013-10-18
		jqObjInput.parent().find(".cont_input").removeClass("cont_inputerror");
		jqObjInput.parent().find(".user_input").removeClass("user_inputerror");
		
		return true;
	}
}

//校验验证码是否正确
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
				//$(this).siblings(".input_error").html("验证码不能为空！").css("display", "inline");
			}
			//if(loginContent.length > 0){
				//var url = crossDomain + frontPath + "/member/verifyvalidatecode.do?ValidateCode=" + loginContent + "&callback=?";
				//jQuery.getJSON(url,CallbackVerifyValidateCodeLog);
			//}
		}
	)
})
//校验验证码是否正确回调
function CallbackVerifyValidateCodeLog(data){
	switch(Number(data.msg)){
		case 0:
			jQuery("#cartValidate").siblings(".input_correct").css("display","inline");
			break;
		case 1:
			jQuery("#cartValidate").siblings(".input_error").html("验证码错误，请重新输入！").css("display","inline");
			break;
		default:
			comAlert("网络繁忙~请您稍后重试~");
			break;
	}
}
//选中记住用户名
$(function(){
	if (readCookie("rememberName").length > 0){
		jQuery("#cartLoginId").val(readCookie("rememberName"));
		jQuery("#cartLoginIdLabel").hide();
	}
})
//验证是否选中记住用户名
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
//登陆出错，隐藏所有提示
function hideAllPrompt(){
	$("#cartLoginId").siblings(".input_error").css("display", "none");
	$("#cartLoginId").siblings(".input_correct").css("display", "none");
	$("#cartPassword").siblings(".input_error").css("display", "none");
	$("#cartPassword").siblings(".input_correct").css("display", "none");
	$("#cartValidate").siblings(".input_error").css("display", "none");
	$("#cartValidate").siblings(".input_correct").css("display", "none");
}
var isLoginSubmiting = false;//是否已经正在登陆
//登陆
function submitLoginForm(form, action, callbackFunc){
	if(!valiLoginInput("cartLoginId", "cartLoginIdLabel", "用户名",true)) return false;
	if(!valiLoginInput("cartPassword", "cartPasswordLabel", "密码",true)) return false;
	
	var passWord=jQuery("#cartPassword").val();
	if(passWord==null || passWord==""){
		comAlert("密码不能为空");
		jQuery("#cartPassword").focus();
		jQuery("#cartPassword").focusin();
		return false;
	}
	if(jQuery("#mcicont_validateCode").css("display")=="block"){
		var cartValidate=jQuery("#cartValidate").val();
			if(cartValidate==null || cartValidate==""){
				//comAlert("验证码不能为空");
				jQuery("#cartValidate").siblings(".input_error").html("验证码不能为空！").css("display", "inline");
				//jQuery("#cartValidate").focus();
				return false;
			}
	}	
	if(isLoginSubmiting){
		comAlert("登陆中，请稍后。。。");
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
			comAlert("网络超时，请稍后再试");
		}
	});
	return false;
}

/*function submitLoginForm(form){
	if(!valiLoginInput("cartLoginId", "cartLoginIdLabel", "用户名",true)) return false;
	if(!valiLoginInput("cartPassword", "cartPasswordLabel", "密码",true)) return false;
	
	var passWord=jQuery("#cartPassword").val();
	if(passWord==null || passWord==""){
		comAlert("密码不能为空");
		jQuery("#cartPassword").focus();
		jQuery("#cartPassword").focusin();
		return false;
	}
	if(jQuery("#mcicont_validateCode").css("display")=="block"){
		var cartValidate=jQuery("#cartValidate").val();
			if(cartValidate==null || cartValidate==""){
				//comAlert("验证码不能为空");
				jQuery("#cartValidate").siblings(".input_error").html("验证码不能为空！").css("display", "inline");
				//jQuery("#cartValidate").focus();
				return false;
			}
	}	
	if(isLoginSubmiting){
		comAlert("登陆中，请稍后。。。");
		return false;
	}
	isLoginSubmiting = true;
//	valiCheckbox();
	form.submit();
}*/

function valiCallbackLoginData(data){
	isLoginSubmiting = false;
	if(!data || !data.msg || data.msg == ""){
		comAlert("网络繁忙，请您稍后重试~");
		codeRefresh('ValiCodeForLogin');
		return false;
	}
	return true;
}
//登陆回调
function callbackLogin(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//成功后不同的渲染部分
		var url = data.url.replace(/&amp;/g, "&");
		setTimeout(function() {window.location=url;}, 100);
	}
	if(data.msg == 13){
		var url=data.url;
   		window.location = frontPath + url;
	}
}
/***登陆弹出层 begin--------**/
//去结算登陆回调
function callbackCartLogin(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//成功后不同的渲染部分
		var url = data.url.replace(/&amp;/g, "&");
		setTimeout(function() {window.parent.window.location=url;}, 100);
	}
	thawUserInfo(data);
}
//收藏登陆回调
function createCollectLayer(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//成功后调用不同的事件
		getCrossDomainTopLoginInfo(collectPopup);
	}
	thawUserInfo(data);
}

//20141101收藏改版
//收藏登陆回调
function createCollectLayerFavor(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//成功后调用不同的事件
		getCrossDomainTopLoginInfo(collectPopupFavor);
	}
	thawUserInfo(data);
}

//评论登陆回调
function callbackRemarkLogin(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//调用刷新头部，传入刷新评论方法
		getCrossDomainTopLoginInfo(updateRemarkView);
	}
	thawUserInfo(data);
}
//到货通知登陆回调
function callbackArrivalNotice(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//调用刷新头部，传入刷新评论方法
		getCrossDomainTopLoginInfo(arrivalAgain);
	}
	thawUserInfo(data);
}
//降价通知登陆回调
function callbackPriceNotice(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//调用刷新头部，传入刷新评论方法
		getCrossDomainTopLoginInfo(priceAgain);
	}
	thawUserInfo(data);
}
//挑食登录回调
function callbackLoginEvt(data){
	if(!valiCallbackLoginData(data)){
		return;
	}
	callbackLoginCommon(data);
	if(data.msg==0){
		//成功后调用不同的事件
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(parent.chooseFood);
	}
	thawUserInfo(data);
}
//弹出层高危用户统一打开父页面
function thawUserInfo(data){
	if(data.msg == 13){
		var url=data.url;
   		parent.window.location = crossDomain + frontPath + url;
	}
}
/***登陆弹出层 end--------**/
function callbackLoginCommon(data){	
	if(!valiCallbackLoginData(data)){
		$("#cartPassword").focusin();
		return;
	}
	switch(Number(data.msg)){
//		case -1:
//			comAlert("对不起，请刷新页面后重新登录！");
//			break;
		case 0:
			//各模块登陆成功后调用的公用统一方法
			if(data.discuzli != ""){
				if(jQuery("#discuzli").length <= 0){
					jQuery("<span id='discuzli1' style='display:none'></span>").appendTo("body");
				}
				jQuery("#discuzli").html(decodeURI(data.discuzli));
			}
			initialLoginCode();	//登录监测码
			$("#cartPassword").focusin();
			break;
		case 1:
			checkValidate(data.checkLogin);
			comAlert("对不起，您输入的账号不存在，请重新输入！");
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
			comAlert("对不起，您的账号或密码输入错误，请重新输入！密码输入错误5次后将冻结账号！");
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
			comAlert("对不起，您输入的验证码错误，请重新输入！");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartValidate").value='';
			document.getElementById("cartValidate").focus();
			jQuery("#cartValidateLabel").css("display","inline");
			$("#cartPassword").focusin();
			break;
		case 7:
			checkValidate(data.checkLogin);
			comAlert("验证码不能为空，请重新输入！");
			codeRefresh('ValiCodeForLogin');
			jQuery("#cartValidateLabel").css("display","inline");
			$("#cartPassword").focusin();
			break;
		case 8:
			checkValidate(data.checkLogin);
			comAlert("因多次密码输入错误，账户被临时冻结。您可以找回密码或等30分钟后系统自动解冻，再重新登录。");
			codeRefresh('ValiCodeForLogin');
			$("#cartPassword").focusin();
			break;
		case 18:
			checkValidate(data.checkLogin);
			comAlert("您的账号已冻结，请联系客服人员解冻后，再重新登录。");
			codeRefresh('ValiCodeForLogin');
			$("#cartPassword").focusin();
			break;
		case 13:
       		//如果等于13就分别进行处理
			//var url=data.url;
       		//parent.window.location = frontPath + url;
			$("#cartPassword").focusin();
			break;
		case 14:
			checkValidate(data.checkLogin);
			comAlert("此用户名为其他合作平台的用户名，不能在我买网直接登陆！");
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
			comAlert("对不起，您输入的企业工号不存在！");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartCoopNo").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 16:
			checkValidate(data.checkLogin);
			comAlert("对不起，您输入的企业工号已经绑定其他账户！");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartCoopNo").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 17:
			checkValidate(data.checkLogin);
			comAlert("对不起，您输入的账号已绑定其他企业工号！");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartCoopNo").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 20:
			checkValidate(data.checkLogin);
			comAlert("请使用邮箱或用户名登录，若手机未认证登录后请尽快对手机进行认证。");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartPassword").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		case 21:
			checkValidate(data.checkLogin);
			comAlert("账号存在风险，请联系客服解决：400-005-5678");
			codeRefresh('ValiCodeForLogin');
			document.getElementById("cartPassword").value='';
			document.getElementById("cartValidate").value='';
			document.getElementById("cartPassword").focus();
			hideAllPrompt();
			$("#cartPassword").focusin();
			break;
		default:
			comAlert("网络繁忙~请您稍后重试~");
		    $("#cartPassword").focusin();
			break;
	}
}
//登陆begin
function clearAll(){
	jQuery("#cartLoginId").val("");
	jQuery("#cartPassword").val("");
	//移除删除标志
	jQuery("#clearAll").css("display","none");
	jQuery("#cartLoginIdLabel").css("display","inline");
	jQuery("#cartPasswordLabel").css("display","inline");
}

//labal 显示判断
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
	//强制清除检测
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

//判断是否显示验证码
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
				if(data === "0"){// 不需验证码
					$("#mcicont_validateCode").hide();
					$("#changeCode").hide();
				}else{// 需验证码
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
	
	// 阻止 浏览器 自动填充 用户名和密码
	setTimeout(function(){
		$("#cartLoginId").val($("#cartLoginId").attr("defaultValue"));
		//alert($loginIdInput.attr("defaultValue"));
		$("#cartPassword").val("");
	},100);
});

