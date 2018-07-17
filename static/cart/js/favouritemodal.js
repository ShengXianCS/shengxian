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
		if(LoginLayer && LoginLayer.html){
			//显示登陆弹出
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
//我的收藏改版2014  begin-------------------------------------------------------------------------------------------------
var isUseable = false;
function addFavor_event(mid,pid){
	
	if( !isUseable ){
		isUseable = true;
		currMid = mid;
		currPid = pid;
		var link = frontPath + "/green2012/Favourite/AddFavLayer_new.do?mid=" + mid + "&pid=" + currPid+"&t="+Math.random();
		var layer = document.getElementById("tb_layer");
		if(!layer){
			//创建弹出层div
			createPopup();
		}else{
			$("#tb_layer").removeClass("fav_pop").html("");
		}
		$.getScript(link,function(data){
			isUseable = false;
			showLoginShade();
			//显示登陆弹出
			if(LoginLayer && LoginLayer.html){
				//显示登陆弹出
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
		comAlert("正在添加，请稍后...");
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
	//验证文本框内容
	var inputcont = $(".favocategory").val();
	inputcont =$.trim(inputcont);  
	//标签集合
	if(inputcont == null || inputcont == ""){
		closeLayer();
		return;
	}
	//替换分隔符
	inputcont=inputcont.replace(/，/g,",")
	//用“，”号隔开存放数组
	var categoryList = new Array();
	categoryList = inputcont.split(",");
	if(categoryList.length>3){
		comAlert("最多可添加3个标签，以“,”隔开。");
		return;
	}
	//存放执行controller的参数
	var paramList = new Array();
	for(var i =0;i<categoryList.length;i++){
		var strTemp = $.trim(categoryList[i]);
		var reg =/^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
		//验证正则表达式
		if(!reg.test(strTemp) || strTemp.length>10){
			comAlert("标签由数字、字母和汉字组成，最多10个字符。");
			return;
		}
		paramList.push(strTemp);
	}
	//操作后台,添加标签
	
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
//我的收藏改版2014  end-------------------------------------------------------------------------------------------------

//关闭收藏框
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
/* 只计算英文字母和汉字的标准字符长度 */
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
		jQuery("#viewMsg").html("请填写分类名称！");
		document.getElementById("viewMsg").style.marginTop ="10px";
		jQuery("#fav_title").val("");
		jQuery("#fav_title").focus();
		return false;
	}
	if(title.wordLen() > 20 || title.length > 20){
		jQuery("#viewMsg").html("分类名称不能多于10个汉字或20个英文字母，请检查输入！");
		document.getElementById("viewMsg").style.marginLeft = "-37px";
		document.getElementById("viewMsg").style.width = "170px";
		jQuery("#fav_title").html("");
		jQuery("#fav_title").focus();
		return false;
	}
	var url = frontPath + "/" + webIndex + "/Favourite/AddCategory.do?title=" + jQuery("#fav_title").val();
	jQuery.getScript(url,function(){
		jQuery("#fav_title").val("");
		jQuery("#viewMsg").html("添加成功！");
		document.getElementById("viewMsg").style.marginLeft = "0px"
		if(Result && Result.succ.indexOf("添加成功") != -1){
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
//刷新验证码
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
		return window.event;//如果是ie
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
// 购物车移入收藏
function cartAddFavor(mid,pid){
	if( !isUseable ){
		isUseable = true;
		currMid = mid;
		currPid = pid;
		var link = frontPath + "/green2012/Favourite/AddFavLayer_new.do?mid=" + mid + "&pid=" + currPid+"&t="+Math.random();
		var layer = document.getElementById("tb_layer");
		if(!layer){
			//创建弹出层div
			createPopup();
		}else{
			$("#tb_layer").removeClass("fav_pop").html("");
		}
		$.getScript(link,function(data){
			isUseable = false;
			showLoginShade();
			//显示登陆弹出
			if(LoginLayer && LoginLayer.html){
				//显示登陆弹出
				$("#tb_layer").html(LoginLayer.html);
				$("#tb_layer").css("display","block");
				LoginLayer = null;
				AddFavourite = null;
				return;
			}else if(AddFavourite && AddFavourite.html){
				comAlert("已成功将该商品添加到收藏夹");
				closeLayer();
				LoginLayer = null;
				AddFavourite = null;
			}
		});
	}else{
		comAlert("正在添加，请稍后...");
		return false;
	}
}
// 购物车选中商品全部添加收藏
function addAllFavor_event(mid,curTab){
	var index = $(".order_nav .hover_li").attr("data-index") - 1;
	if($('.ordercont_content').eq(index).find('input:checked').length == 0){
		comAlert("请选择要收藏的商品。");
		return;
	}
	comAlert("确定将购物车中选中的商品全部移动到收藏吗？",{"confirm":"确定","cancel":"取消"},
		function(){
			if( !isUseable ){
				isUseable = true;
				currMid = mid;
				currTab = curTab;
				var link = frontPath + "/green2012/Favourite/Add_cartAllFavLayer.do?mid=" + mid + "&currTab=" + currTab+"&t="+Math.random();
				var layer = document.getElementById("tb_layer");
				if(!layer){
					//创建弹出层div
					createPopup();
				}else{
					$("#tb_layer").removeClass("fav_pop").html("");
				}
				$.getScript(link,function(data){
					isUseable = false;
					showLoginShade();
					//显示登陆弹出
					if(LoginLayer && LoginLayer.html){
						//显示登陆弹出
						$("#tb_layer").html(LoginLayer.html);
						$("#tb_layer").css("display","block");
						LoginLayer = null;
						AddFavourite = null;
						return;
					}else if(AddFavourite && AddFavourite.html){
						comAlert("已成功将选中商品全部添加到收藏夹！");
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
				comAlert("正在添加，请稍后...");
				return false;
			}
		}
	);
}