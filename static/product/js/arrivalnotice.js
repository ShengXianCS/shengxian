var datahtml;
var arrMid = 0;
var arrPid = 0;
function addNotice(mid,pid){
	var link = frontPath + "/green2012/notice/addnotice.do?mid=" + mid + "&random=" + Math.random();
	var layer = document.getElementById("tb_layer");
	arrMid = mid;
	arrPid = pid;
	if(!layer){
		//创建弹出层div
		createPopup();
	}else{
		jQuery("#tb_layer").removeClass("fav_pop").html("");
	}
	jQuery.getScript(link,function(data){
		var layoutBg = document.getElementById("layoutBg");
		if(!layoutBg){
			showLoginShade();
		}else{
			jQuery("#layoutBg").show();
		}
		if(datahtml && datahtml.loginArrival){
			//显示登陆弹出
			jQuery("#tb_layer").html(datahtml.loginArrival);
			jQuery("#tb_layer").css("display","block");
			datahtml = null;
			return;
		}else if(datahtml && datahtml.addNotice){
			jQuery("#tb_layer").addClass("fav_pop").html(datahtml.addNotice);
			jQuery("#tb_layer").css("display","block");
			datahtml = null;
		}else if(datahtml && datahtml.otherLogin){
			jQuery("#tb_layer").addClass("fav_pop").html(datahtml.otherLogin);
			jQuery("#tb_layer").css("display","block");
			datahtml = null;
		}
	});
}

//关闭通知
function closeArrLayer(){
	jQuery("#tb_layer").html("");
    jQuery("#tb_layer").css("display","none");
    closeShade();
}

//邮箱认证跳转
function toEmailCheck(){
	closeArrLayer();
    var url = frontPath + "/Member/index.jsp?mid=" + arrMid +"&url=Email.do"
    window.open(url);                 
}

function addArrivalNotice(){
	var phoneFlag = 0;
	if(jQuery("#msm").attr("checked")){
		phoneFlag = 1;
	}
	
	//验证是否选择了通知方式
	if(jQuery("#emailName").text()=="" && phoneFlag==0){
		jQuery("#vertifyNoticWay").show();
		return;
	}
	
	var nDate = jQuery("input[name='nDate']:checked").val();
	var url = frontPath + "/green2012/notice/addarrivalnotice.do?mid=" + arrMid + "&pid=" + arrPid + "&nDate=" + nDate + "&phoneFlag=" + phoneFlag;
	var layer = document.getElementById("tb_layer");
	if(!layer){
		//创建弹出层div
		createPopup();
	}else{
		jQuery("#tb_layer").removeClass("fav_pop").html("");
	}
	jQuery.getScript(url,function(data){
		var layoutBg = document.getElementById("layoutBg");
		if(!layoutBg){
			showLoginShade();
		}else{
			jQuery("#layoutBg").show();
		}
		if(datahtml && datahtml.loginArrival){
			//显示登陆弹出
			jQuery("#tb_layer").html(datahtml.loginArrival);
			jQuery("#tb_layer").css("display","block");
			datahtml = null;
			return;
		}else if(datahtml && datahtml.success){
			jQuery("#tb_layer").addClass("fav_pop").html(datahtml.success);
			jQuery("#tb_layer").css("display","block");
			request_notice_buybuy(arrPid);
			datahtml = null;
		}else if(datahtml && datahtml.otherLogin){
			jQuery("#tb_layer").addClass("fav_pop").html(datahtml.otherLogin);
			jQuery("#tb_layer").css("display","block");
			datahtml = null;
		}
	});
}
