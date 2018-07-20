/**
 * https��¼ע��ص�ͨ����
 * @param data
 */
//��ʳ��¼�ص�
function callbackChooseFoodEvt(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		//�ɹ�����ò�ͬ���¼�
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(parent.chooseFood);
	}
}
//�������ʳ��¼�ص�
function callbackWineChooseFoodEvt(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		//�ɹ�����ò�ͬ���¼�
		parent.hasUser = true;
		parent.chooseFood();
	}
}
//���۵�½ע��ص��������⴦������һ����
function callbackRemark(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//����ˢ��ͷ��������ˢ�����۷���
		getCrossDomainTopLoginInfo(updateRemarkView);
	}
}

//���۲��ֵ�½ˢ�¾ֲ�����
function updateRemarkView(){
	var userinfo = $.cookie("userinfo");	//��ȡcookie �����������by xg readCookie("userinfo")
	var nickName = "";
	if(userinfo != null && userinfo.indexOf("|") != -1){
		var userinfoArray = userinfo.split("|");
		nickName = userinfoArray[0];			//��ȡ�û���
	}
	parentcodeRefresh('vCode');						//ˢ����֤��
	
	//��Ⱦ���۵�½��Ϣ
	$("#remarkNickName",parent.document).html(nickName);	//��ʾ�û���
	$("#remarkUserName",parent.document).css("display","block");
	$("#notUser",parent.document).hide();
	$("#userName",parent.document).val(nickName);
	$("#ValidateCodeId",parent.document).val("");			//������֤��
	closePopup("tb_layer");										//�رյ�����
}
//ˢ�¸�ҳ�����֤��
function parentcodeRefresh(id) {
	$("#" + id,parent.document).attr("src",  frontPath + "/ValidateCode?dumy=" + Math.random());
	getTempCode(id);
}
function getTempCode(id){
	$.post(frontPath + "/ValidateCode?isLogin=1&dumy="+new Date().getTime(),function(data){
		$("#" + id).val(data);
	});
}
//����֪ͨ��½ע��ص��������⴦������һ����
function callbackArrivalNotice(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//����ˢ��ͷ��������ˢ�����۷���
		getCrossDomainTopLoginInfo(arrivalAgain);
	}
}
//����֪ͨ��½ע��ص��������⴦������һ����
function callbackPriceNotice(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//����ˢ��ͷ��������ˢ�����۷���
		getCrossDomainTopLoginInfo(priceAgain);
	}
}

var datahtml;
//����֪ͨ��½�ɹ�����������
function arrivalAgain(){
	var link = frontPath + "/green2012/notice/addnotice.do?mid=" + mid;
	$.getScript(link,function(data){
		if(datahtml && datahtml.addNotice){
			$("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.addNotice).css("display","block");
			datahtml = null;
		}else if(datahtml && datahtml.otherLogin){
			$("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.otherLogin).css("display","block");
			datahtml = null;
		}
	});
}
//����֪ͨ��½�ɹ�����������
function priceAgain(){
	var buyPrice = $("#buyPrice",parent.document).html();
	var downPrice = buyPrice.substring(1,buyPrice.length);
	var link = frontPath + "/green2012/notice/addprice.do?mid=" + mid + "&price=" + downPrice;
	$.getScript(link,function(data){
		if(datahtml && datahtml.addPrice){
			$("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.addPrice).css("display","block");
			datahtml = null;
		}else if(datahtml && datahtml.otherLogin){
			$("#tb_layer",parent.document).addClass("fav_pop").html(datahtml.otherLogin).css("display","block");
			datahtml = null;
		}
	});
}

//���ﳵ��¼ע�������ָ�����ڣ��ɹ���һ���ص�����
function callbackCart(data){
	if(!valiCallbackData(data)){
		return;
	}
	closePopup('tb_layer');
	if(data.msg==0){
		//�ɹ���ͬ����Ⱦ����
		var url = data.url.replace(/&amp;/g, "&");
		setTimeout(function() {window.parent.window.location=url;}, 100);
	}
}
//20141101�ղظİ�
//�ղص�½�ص�
function createCollectLayerFavor(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//�ɹ�����ò�ͬ���¼�
		getCrossDomainTopLoginInfo(collectPopupFavor);
	}
}
//���ﳵȫ���ղص�½�ص�
function createCollectLayerAllFavor(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		if(parent.hasUser){
			parent.hasUser = true;
		}
		//�ɹ�����ò�ͬ���¼�
		getCrossDomainTopLoginInfo(collectPopupAllFavor);
	}
}
//�ղ�ע��ص�
function callbackRegisterCommonPopu(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){//�ɹ�;
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(collectPopup);//���ղ�
	}
}
//���ﳵȫ���ղ�ע��ص�
function callbackRegisterAllCommonPopu(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){//�ɹ�;
		parent.hasUser = true;
		getCrossDomainTopLoginInfo(collectAllPopup);//���ղ�
	}
}
//������ղص�½�ص�
function createWineCollectLayerFavor(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//�ɹ�����ò�ͬ���¼�
		parent.loginResultRavor();
	}
}
//��������۵�½�ص�
function createWineRemarkLayer(data){
	if(!valiCallbackData(data)){
		return;
	}
	if(data.msg==0){
		parent.hasUser = true;
		//�ɹ�����ò�ͬ���¼�
		parent.loginResult();
	}
}
//���ø�����ղط���
function collectPopup(){
	var link = frontPath + "/green2012/Favourite/AddFavLayer.do?mid=" + mid;
	$.getScript(link,function(data){
		$("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}
//���ﳵȫ���ղ�--���ø�����ղط���
function collectAllPopup(){
	var link = frontPath + "/green2012/Favourite/Add_cartAllFavLayer.do?mid=" + mid + "&currTab=" + currTab;
	$.getScript(link,function(data){
		$("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}
//var AddFavourite;
//20101101�ղظİ�ص�
var intervalId = -1;
function collectPopupFavor(){
	//��ȡ��ҳ�����ƷID
	var pid=null;
	 if(parent.currPid){
		pid = parent.currPid;
	}else{
		comAlert("404");
		return;
	}
	var link = frontPath + "/green2012/Favourite/AddFavLayer_new.do?mid=" + mid+ "&pid=" + pid;
	$.getScript(link,function(data,textStatus){
		if(AddFavourite && AddFavourite.iscolse){
			parent.colseAddFavourite(3);
		}
		$("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}

function collectPopupAllFavor(){
	//��ȡ��ҳ�����ƷID
	var currTab=null;
	 if(parent.currTab){
		currTab = parent.currTab;
	}else{
		comAlert("404");
		return;
	}
	var link = frontPath + "/green2012/Favourite/Add_cartAllFavLayer.do?mid=" + mid + "&currTab=" + currTab;
	$.getScript(link,function(data,textStatus){
		if(AddFavourite && AddFavourite.iscolse){
			parent.colseAddFavourite(3);
		}
		$("#tb_layer",parent.document).addClass("fav_pop").html(AddFavourite.html).css("display","block");
	});
}

function valiCallbackData(data){
	if(!data || !data.msg || data.msg == ""){
		comAlert("���緱æ�������Ժ�����~");
		return false;
	}
	return true;
}

//��ȡ��¼��Ϣ��ˢ��ͷ��
function getCrossDomainTopLoginInfo(callbackFunc){
	var params_L = new Object();
	params_L["random_L"] = Math.random();
	params_L["mid"] = mid;
	var apiUrl =  frontPath + "/" + webIndex + "/finclude/includetoplogin.do?" + $.param(params_L) + "&callback=" + "?";
	
	$.get(apiUrl,function(data){
		if(data){
			var datas = data.split("==|||||==");
			$("#top_login_span",parent.document).html(datas[0]);
			$("#QQcaibeiLogin",parent.document).html(datas[1]);
			callbackFunc();
		}
	});
}
//�رյ�½ע�ᵯ����
function closePopup(id){
	var curObj = $(".btn .topay",window.parent.document);
	if(curObj.attr("data-first") == "n"){
		curObj.removeAttr("style").removeAttr("title");
		curObj.attr("data-first","y");
	}
	curObj = $(".check_fullamount,.check_prepay",window.parent.document);
	if(curObj.attr("data-first") == "n"){
		curObj.removeAttr("style").removeAttr("title");
		curObj.attr("data-first","y");
	}
	$("#" + id,parent.document).css("display","none");
	$("#layoutBg",parent.document).remove();
}
//��½�󣬻ص�ָ���Ļص�����  �ų���  2015-03-23
function readyForCallback(callback,data){
	var func=eval(callback);
	new func(arguments[1]);
}
