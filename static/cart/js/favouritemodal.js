var currMid = 0;
var currPid = 0;
var currTab = 0;
var imgPath = frontPath + "/images/loadingAnimation.gif";
var LoginLayer;
var AddFavourite;
var Result;
var CategoryList;
function addFavor(mid,pid){
	var link = frontPath + "/" + webIndex + "/Favourite/AddFavLayer.do?mid=" + mid;
	currMid = mid;
	currPid = pid;
	var layer = document.getElementById("tb_layer");
	if(!layer){
		//����������div
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
		if(LoginLayer && LoginLayer.html){
			//��ʾ��½����
			jQuery("#tb_layer").html(LoginLayer.html);
			jQuery("#tb_layer").css("display","block");
			LoginLayer = null;
			AddFavourite = null;
			return;
		}else if(AddFavourite && AddFavourite.html){
			jQuery("#tb_layer").addClass("fav_pop").html(AddFavourite.html);
			jQuery("#tb_layer").css("display","block");
			LoginLayer = null;
			AddFavourite = null;
		}
	});
}
//�ҵ��ղظİ�2014  begin-------------------------------------------------------------------------------------------------
var isUseable = false;
function addFavor_event(mid,pid){
	
	if( !isUseable ){
		isUseable = true;
		currMid = mid;
		currPid = pid;
		var link = frontPath + "/green2012/Favourite/AddFavLayer_new.do?mid=" + mid + "&pid=" + currPid+"&t="+Math.random();
		var layer = document.getElementById("tb_layer");
		if(!layer){
			//����������div
			createPopup();
		}else{
			$("#tb_layer").removeClass("fav_pop").html("");
		}
		$.getScript(link,function(data){
			isUseable = false;
			showLoginShade();
			//��ʾ��½����
			if(LoginLayer && LoginLayer.html){
				//��ʾ��½����
				$("#tb_layer").html(LoginLayer.html);
				$("#tb_layer").css("display","block");
				LoginLayer = null;
				AddFavourite = null;
				return;
			}else if(AddFavourite && AddFavourite.html){
				$("#tb_layer").addClass("fav_pop").html(AddFavourite.html);
				$("#tb_layer").css("display","block");
				if(AddFavourite && AddFavourite.iscolse){
					colseAddFavourite(3);
				}
				LoginLayer = null;
				AddFavourite = null;
			}
		});
	}else{
		comAlert("������ӣ����Ժ�...");
		return false;
	}
}

function colseAddFavourite(secondsinfo){
	var seconds = secondsinfo;
	$("#seconds").html(seconds);
	intervalId = setInterval(function(){         
		seconds--;
		$("#seconds").html(seconds);
		if(seconds < 1){
			clearTimeout(intervalId);
			closeLayer();
			return;
		}
	},1000);
	$("#showSec").show();
}

function sure_check(objid){
	//��֤�ı�������
	var inputcont = $(".favocategory").val();
	inputcont =$.trim(inputcont);  
	//��ǩ����
	if(inputcont == null || inputcont == ""){
		closeLayer();
		return;
	}
	//�滻�ָ���
	inputcont=inputcont.replace(/��/g,",")
	//�á������Ÿ����������
	var categoryList = new Array();
	categoryList = inputcont.split(",");
	if(categoryList.length>3){
		comAlert("�������3����ǩ���ԡ�,��������");
		return;
	}
	//���ִ��controller�Ĳ���
	var paramList = new Array();
	for(var i =0;i<categoryList.length;i++){
		var strTemp = $.trim(categoryList[i]);
		var reg =/^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
		//��֤������ʽ
		if(!reg.test(strTemp) || strTemp.length>10){
			comAlert("��ǩ�����֡���ĸ�ͺ�����ɣ����10���ַ���");
			return;
		}
		paramList.push(strTemp);
	}
	//������̨,��ӱ�ǩ
	
	var url = frontPath + "/green2012/Favourite/AddCategory_info.do?titleInfo=" +encodeURIComponent(encodeURIComponent(inputcont)) +"&objid="+objid;
	$.getScript(url,function(data){
		$(".add-tip").html(Result.msg);
		$(".add-tip").css("display","inline-block");
		
		colseAddFavourite(2);
	});
}

function clickCategoryTitle(obj){
	$this = obj;
	var labelVal = $this.html();
	var temp = $this.parent().parent().parent().find("#inp-lable");
	var input_text = temp.val();
	if(labelVal != null && labelVal != ""){
		if(input_text == null || input_text ==""){
			input_text = labelVal;
		}else{
			input_text = input_text + "," + labelVal;
		}
		temp.val(input_text);
	}
}
//�ҵ��ղظİ�2014  end-------------------------------------------------------------------------------------------------

//�ر��ղؿ�
function closeLayer(){
	jQuery("#tb_layer").html("");
    jQuery("#tb_layer").css("display","none");
    clearTimeout(intervalId);
    closeShade();
}

var intervalId = -1;
function addFavOk(){
	var url = frontPath + "/" + webIndex + "/Favourite/AddFav.do?mid=" + currMid + "&pid=" + currPid + "&categoryId=" + jQuery("#categoryId").val();
	jQuery.getScript(url,function(){
		if(Result && Result.msg){
			var msg = Result.msg;
			jQuery("#formDiv").hide();
			jQuery(".fav_pop_tit").remove();
			msg = "<div class='fav_success_icon'></div>" + msg; 
			jQuery("#viewMsg").css("padding-top","18px").css("padding-left","").html(msg);
			jQuery("#favLink").css("display","block");
			var seconds = 5;
			jQuery("#seconds").html(seconds);
			intervalId = setInterval(function(){         
				seconds--;
				jQuery("#seconds").html(seconds);
				if(seconds < 1){
					clearTimeout(intervalId);
					closeLayer();
					return;
				}
			},1000);
			jQuery("#showSec").show();
		}
		Result = null;
	});
}
/* ֻ����Ӣ����ĸ�ͺ��ֵı�׼�ַ����� */
String.prototype.wordLen = function() {
	var temp = this.replace(/[A-Za-z]/g, "a").replace(/[\u4e00-\u9fa5]/g, "aa").match(/(a)/g);
	if (temp) {
		return temp.length;
	}
	return 0;
}

function addCategory(){
	var title=jQuery("#fav_title").val();
	if(jQuery.trim(title) == ""){
		jQuery("#viewMsg").html("����д�������ƣ�");
		document.getElementById("viewMsg").style.marginTop ="10px";
		jQuery("#fav_title").val("");
		jQuery("#fav_title").focus();
		return false;
	}
	if(title.wordLen() > 20 || title.length > 20){
		jQuery("#viewMsg").html("�������Ʋ��ܶ���10�����ֻ�20��Ӣ����ĸ���������룡");
		document.getElementById("viewMsg").style.marginLeft = "-37px";
		document.getElementById("viewMsg").style.width = "170px";
		jQuery("#fav_title").html("");
		jQuery("#fav_title").focus();
		return false;
	}
	var url = frontPath + "/" + webIndex + "/Favourite/AddCategory.do?title=" + jQuery("#fav_title").val();
	jQuery.getScript(url,function(){
		jQuery("#fav_title").val("");
		jQuery("#viewMsg").html("��ӳɹ���");
		document.getElementById("viewMsg").style.marginLeft = "0px"
		if(Result && Result.succ.indexOf("��ӳɹ�") != -1){
			var urll = frontPath + "/" + webIndex + "/Favourite/IncludeCategoryList.do?t=" + Math.random();;
			jQuery.getScript(urll,function(){
				if(CategoryList && CategoryList.html){
					jQuery("#cateList").html(CategoryList.html);
				}
				CategoryList = null;
			});
		}
		Result = null;
	});
	return false;
}
//ˢ����֤��
function vCodeRefresh(){
	jQuery("#ValidateCode").attr("src",frontPath + "/ValidateCode?dumy=" + Math.random());
}

function changeMsg(obj){
	if(obj.value.length >= 0 || obj.value != ""){
		jQuery("#viewMsg").css("color","").html();
	}
}

function getEvent(){
	if(document.all){
		return window.event;//�����ie
	}
	func = getEvent.caller;
	while(func != null){
		var arg0 = func.arguments[0];
		if(arg0){
		if((arg0.constructor == Event || arg0.constructor == MouseEvent)
			||(typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)){
			return arg0;
		}
	}
	func = func.caller;
	}
	return null;
}
// ���ﳵ�����ղ�
function cartAddFavor(mid,pid){
	if( !isUseable ){
		isUseable = true;
		currMid = mid;
		currPid = pid;
		var link = frontPath + "/green2012/Favourite/AddFavLayer_new.do?mid=" + mid + "&pid=" + currPid+"&t="+Math.random();
		var layer = document.getElementById("tb_layer");
		if(!layer){
			//����������div
			createPopup();
		}else{
			$("#tb_layer").removeClass("fav_pop").html("");
		}
		$.getScript(link,function(data){
			isUseable = false;
			showLoginShade();
			//��ʾ��½����
			if(LoginLayer && LoginLayer.html){
				//��ʾ��½����
				$("#tb_layer").html(LoginLayer.html);
				$("#tb_layer").css("display","block");
				LoginLayer = null;
				AddFavourite = null;
				return;
			}else if(AddFavourite && AddFavourite.html){
				comAlert("�ѳɹ�������Ʒ��ӵ��ղؼ�");
				closeLayer();
				LoginLayer = null;
				AddFavourite = null;
			}
		});
	}else{
		comAlert("������ӣ����Ժ�...");
		return false;
	}
}
// ���ﳵѡ����Ʒȫ������ղ�
function addAllFavor_event(mid,curTab){
	var index = $(".order_nav .hover_li").attr("data-index") - 1;
	if($('.ordercont_content').eq(index).find('input:checked').length == 0){
		comAlert("��ѡ��Ҫ�ղص���Ʒ��");
		return;
	}
	comAlert("ȷ�������ﳵ��ѡ�е���Ʒȫ���ƶ����ղ���",{"confirm":"ȷ��","cancel":"ȡ��"},
		function(){
			if( !isUseable ){
				isUseable = true;
				currMid = mid;
				currTab = curTab;
				var link = frontPath + "/green2012/Favourite/Add_cartAllFavLayer.do?mid=" + mid + "&currTab=" + currTab+"&t="+Math.random();
				var layer = document.getElementById("tb_layer");
				if(!layer){
					//����������div
					createPopup();
				}else{
					$("#tb_layer").removeClass("fav_pop").html("");
				}
				$.getScript(link,function(data){
					isUseable = false;
					showLoginShade();
					//��ʾ��½����
					if(LoginLayer && LoginLayer.html){
						//��ʾ��½����
						$("#tb_layer").html(LoginLayer.html);
						$("#tb_layer").css("display","block");
						LoginLayer = null;
						AddFavourite = null;
						return;
					}else if(AddFavourite && AddFavourite.html){
						comAlert("�ѳɹ���ѡ����Ʒȫ����ӵ��ղؼУ�");
						closeLayer();
						/*$("#tb_layer").addClass("fav_pop").html(AddFavourite.html);
						$("#tb_layer").css("display","block");
						if(AddFavourite && AddFavourite.iscolse){
							colseAddFavourite(3);
						}*/
						LoginLayer = null;
						AddFavourite = null;
					}
				});
			}else{
				comAlert("������ӣ����Ժ�...");
				return false;
			}
		}
	);
}