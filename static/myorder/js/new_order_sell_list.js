//20160613 add
$(function(){
	$(".l2f_3f_detail").each(function() {
		var l2f_3f_detailh = $(this).find(".detail_left").outerHeight();
		$(this).find(".jh01").css("height",l2f_3f_detailh);
		$(this).find(".jh02").css("height",l2f_3f_detailh);
		$(this).find(".jh03").css("height",l2f_3f_detailh);
		$(this).find(".detail_right").css("height",l2f_3f_detailh);
		var pop_h = $(this).find(".pop_1").outerHeight();
		$(this).find(".border_r2").css("height",pop_h-59);
		$(this).find(".border_l").css("height",pop_h);
		
		//控制包裹跟踪的高度
		if($(this).find(".list_page").length > 0){
			var pageh = $(this).find(".list_page").position().top-10;
			$(this).find(".pop_1").css("top",pageh);
		}
		//border 高度
		var poph = $(this).find(".pop_1").outerHeight()-108;
		$(this).find(".pop_borderl").css("height",poph);
	});
	//获取待付款  待收货  待评价订单数量
	setTimeout(function(){
		jQuery.post(frontPath + "/Member/AjaxMaiRemind.do"+"?t="+Math.random(),function(data){
			var sdata =  eval('(' + data + ')');
			document.getElementById("linopayordercount").innerHTML = sdata.nopayordercount;
			if(sdata.nopayordercount > 0){
				document.getElementById("linopayordercount").innerHTML = sdata.nopayordercount;
			}
			if(sdata.waitordercount > 0){
				document.getElementById("liwaitordercount").innerHTML = sdata.waitordercount;
			}
			if(sdata.finishordercount > 0){
				document.getElementById("lifinishordercount").innerHTML = sdata.finishordercount;
			}
		});
	},1000);
})

/**全局隐藏**/

/** 自定义select标签* */
$(function() {
	//为配置蒙牛订单能够完整展示定制贺卡弹层，此次判断当iframe高度小于一定高度时自动增高
	if($(".wrap_list").height() < 840){
		$(".wrap_list").css("height","840px");
	}else{
		parent.document.getElementsByTagName("iframe")[0].height = $(".wrap_list").height()+50;
	}
	$(".nt_three").click(function(e) {
		$(".nt_ul1").toggle();
		$(".nt_ul1 li").mouseover(function() {
			$(this).addClass("active").siblings().removeClass("active");
			$(this).click(function() {
				var thisText = $(this).text();
				$(".nt_three input").val(thisText);
			});
		});
		e.stopPropagation(); // maybe e.stopPropagation and return false
								// effects are the same
	});

	$(window.document).click(function() { // On the above will affect
		$(".nt_ul1").hide();
	});
});
//日历
$(function(){
	$("#beginDateInput").focus(function(e){
		$(".tsCalender").remove();
		ll.ui.datePicker(this);
		return false;
	}).click(function(){
		return false;	
	});
	
	$("#endDateInput").focus(function(e){
		$(".tsCalender").remove();
		ll.ui.datePicker(this);
		return false;
	}).click(function(){
		return false;	
	});
	
	$(window.document).click(function(){  //On the above will affect performance ,so in the following
		if($(".tsCalender").attr("ishover")!=1){
			$(".tsCalender").remove();	
		}
	});

});

/* 订单状态 */
$(function(){
	$('.o-left span').each(function() {
		$(this).hover(function(){
			var $this = $(this);
			$this.addClass('hover').siblings('span').removeClass('hover');
			$('.o-right').removeClass('active');
			$this.parent('.o-left').siblings('.o-right').addClass('active');
		},function(){
			var $this = $(this);
			$this.removeClass('hover');
			$('.o-right').removeClass('active');
		});
    });
});
//处理去付款图片
$(function(){
	if($(".topaybtn input[type='button']").length > 0){
		$(".topaybtn input[type='button']").removeAttr("style");
		$(".topaybtn input[type='button']").removeClass();
		$(".topaybtn input[type='button']").addClass("paybtn forpay");
		$(".topaybtn input[type='button']").val("去付款");
	}
	if($(".topaybtn input[type='submit']").length > 0){
		$(".topaybtn input[type='submit']").removeAttr("style");
		$(".topaybtn input[type='submit']").removeClass();
		$(".topaybtn input[type='submit']").addClass("paybtn forpay");
		$(".topaybtn input[type='submit']").val("去付款");
	}
	if($(".topaybtn .topayimg img").length > 0){
		$(".topaybtn .topayimg img").replaceWith("<p class='font_white forpay'>去付款</p>");
	}
});
/** 跟踪* */
$(function() {
	$(".gz").mouseenter(function() { // Move to the "tracking", triggering events
		var $iNow = $(this);
		$iNow.closest(".list_page").find(".pop_1, .b1").show();
	});
	$(".gz").mouseleave(function() {
		var $iNow = $(this);
		var $t = $iNow.closest(".l2f_3f").find(".pop_1, .b1");
		$t.delay(100).hide(10);
		$t.mouseenter(function() {
			$t.stop(true);
			$t.show();
			$iNow.closest(".l2f_3f").find(".b2").click(function() {
				$t.hide();
			});
		});
		$iNow.closest(".l2f_3f").find(".pop_1").mouseout(function() {
			$t.hide();
		});
	});
});

/** 限制图片内容* */
$(function() {
	$(window).load(function() {
		$(".ul2").each(function(index, value) {
			
			if ($(this).find("li").length > 20) {
				$(this).height(350);
			}
			//抽奖图片的位置限制
			var pichtml = $(this).parent('.w291').siblings('.w106').html();
			var pichtmlindex=pichtml.indexOf("/member/f_year_award.jpg");
			if ($(this).find("li").length <= 4 && pichtmlindex>0) {
				$(this).height(115);
			}
			var wh = $(this).parent().siblings('.w78').find('.o-status').height();
			var vh = $(this).parent('.w291').height();
			if(wh > vh){
				$(this).closest(".ul1").children("li").each(function(){
					$(this).height(wh);
				});
			}else{
				$(this).closest(".ul1").children("li").each(function(){
					$(this).height(vh);
				});
			}
			
		});
		
	});
});

/** TAB切换* */
$(function() {
	//全部订单
	$("#tabDiv li").eq(0).click(function() {
		if($("#tag").val()==5){
			return;
		}
		queryListByCondition();
	});
	// 待付款订单
	$("#tabDiv li").eq(1).click(function() {
		if($("#tag").val()==1){
			return;
		}
		$("#tag").val(1);
		$("#ColumnId").val(1707);
		$("#orderType").val(8);
		$("#limitStates").val(1);
		$("#state").val(101);
		$("#page").val(1);
		$("#isSignfor").val(0);
		$("#aliasCode").val('');
		$("#myOrderListForm").attr('action','/Member/menumyunpaidorderlist.do'); //待付款新方法
		$("#myOrderListForm").submit();
	});
	// 待签收订单
	$("#tabDiv li").eq(2).click(function() {
		if($("#tag").val()==2){
			return;
		}
		$("#tag").val(2);
		$("#ColumnId").val(1707);
		$("#orderType").val(8);
		$("#limitStates").val(-1);
		$("#state").val(-1);
		$("#page").val(1);
		$("#isSignfor").val(1);
		$("#aliasCode").val('');
		$("#myOrderListForm").submit();
	});
	// 已完成订单
	$("#tabDiv li").eq(3).click(function() {
		if($("#tag").val()==3){
			return;
		}
		$("#tag").val(3);
		$("#ColumnId").val(1706);
		$("#orderType").val(8);
		$("#limitStates").val(1);
		$("#state").val(-1);
		$("#page").val(1);
		$("#isSignfor").val(0);
		$("#aliasCode").val('');
		$("#myOrderListForm").submit();
	});
	var mzhOrderCount=$("#mzhOrderCount").val();
	if(mzhOrderCount > 0){
		// 预付款订单
		$("#tabDiv li").eq(4).click(function() {
			if($("#tag").val()==6){
				return;
			}
			$("#tag").val(6);
			$("#ColumnId").val(-1);
			$("#orderType").val(17);
			$("#limitStates").val(1);
			$("#state").val(400);
			$("#page").val(1);
			$("#isSignfor").val(0);
			$("#aliasCode").val('');
			$("#myOrderListForm").submit();
		});
	}
});


$(function() {
	$(".nt_two").click(function() {
		queryListByCondition();
	});
	$("#aliasCodeInput").focus(function() {
		if ($("#aliasCodeInput").val() == "订单编号") {
			$("#aliasCodeInput").val("");
		}
	});
	$("#aliasCodeInput").blur(function() {
		if ($("#aliasCodeInput").val() == "") {
			$("#aliasCodeInput").val("订单编号");
		}
	});
	$("#beginDateInput").focus(function() {
		if ($("#beginDateInput").val() == "起始日期") {
			$("#beginDateInput").val("");
		}
	});
	$("#beginDateInput").blur(function() {
		if ($("#beginDateInput").val() == "") {
			$("#beginDateInput").val("起始日期");
		}
	});
	$("#endDateInput").focus(function() {
		if ($("#endDateInput").val() == "结束日期") {
			$("#endDateInput").val("");
		}
	});
	$("#endDateInput").blur(function() {
		if ($("#endDateInput").val() == "") {
			$("#endDateInput").val("结束日期");
		}
	});
});

function queryListByCondition() {
	$("#tag").val(5);
	$("#isHaveSearch").val(1);
	var beginDate = $("#beginDateInput").val();
	var endDate = $("#endDateInput").val();
	$("#beginDate").val("");
	$("#endDate").val("");
	$("#aliasCode").val("");
	if (beginDate != "" && beginDate != "起始日期") {
		if(strDateTime(beginDate)){
			$("#beginDate").val(beginDate);
		}else{
			parent.comAlert("请输入正确的日期格式！");
			return;
		}
	} 
	if (endDate != "" && endDate != "结束日期") {
		if(strDateTime(endDate)){
			$("#endDate").val(endDate);
		}else{
			parent.comAlert("请输入正确的日期格式！");
			return;
		}
	}
	var aliasCode = $("#aliasCodeInput").val();
	if (aliasCode != "订单编号" && aliasCode != "") {
		$("#aliasCode").val(aliasCode);
	}
	var orderState = $("#orderStateInput").val();
	$("#orderStateValue").val(orderState);
	if (orderState == "等待付款") {
		$("#ColumnId").val(1707);
		$("#orderType").val(8);
		$("#limitStates").val(1);
		$("#state").val(101);
		$("#page").val(1);
		$("#isSignfor").val(0);
		//$("#myOrderListForm").attr('action','/Member/menumyunpaidorderlist.do'); //待付款新方法
	} else if (orderState == "等待收货") {
		$("#ColumnId").val(1707);
		$("#orderType").val(8);
		$("#limitStates").val(-1);
		$("#state").val(-1);
		$("#page").val(1);
		$("#isSignfor").val(1);
	} else if (orderState == "交易完成") {
		$("#ColumnId").val(1706);
		$("#orderType").val(8);
		$("#limitStates").val(1);
		$("#state").val(-1);
		$("#page").val(1);
		$("#isSignfor").val(0);
	} else if (orderState == "已取消") {
		$("#ColumnId").val(1708);
		$("#orderType").val(8);
		$("#limitStates").val(-1);
		$("#state").val(1);
		$("#page").val(1);
		$("#isSignfor").val(0);
	} else {
		$("#ColumnId").val(-1);
		$("#orderType").val(8);
		$("#limitStates").val(-1);
		$("#state").val(-1);
		$("#page").val(1);
		$("#isSignfor").val(0);
	}
	$("#myOrderListForm").submit();
}

// 我买网和我买酒评论等级处的星星合并为1个
function addEvent(starId) {
	$("#" + starId)
			.find("a").each(function() {
						var obj = $(this);
						obj.mouseenter(function() {
							for ( var i = $(this).attr("data-id"); i > 0; i--) {
								$("#" + starId + i).find("img").attr("src",staticPath + "/zhongliang/templets/green2012/images/star1.gif");
							}
						}).mouseleave(function() {
							var a = 0;
							var level = $("#" + starId + "Level").val();
							if (level != "") {
								a = level;
								for ( var j = 1; j < Number(level) + 1; j++) {
									$("#" + starId + j).find("img").attr("src",staticPath + "/zhongliang/templets/green2012/images/star1.gif");
								}
							}
							for ( var k = 5; k > a; k--) {
								$("#" + starId + k).find("img").attr("src",staticPath + "/zhongliang/templets/green2012/images/star2.gif");
							}
						}).click(function() {
							$("#" + starId + "Level").val($(this).attr("data-id"));
							for ( var v = 5; v > $(this).attr("data-id"); v--) {
								$("#" + starId + v).find("img").attr("src",staticPath + "/zhongliang/templets/green2012/images/star2.gif");
							}
						});
					});
}

/**
 * 服务评价
 * @param orderId
 */
function addAccess(orderId,obj) {
	var speed = $("#speed" + orderId + "Level").val();
	if(speed == 0 || speed ==""){
		parent.comAlert("请您为我们的配送速度打分~");
		return false;
	}
	var service = $("#service" + orderId + "Level").val();
	if(service == 0 || service ==""){
		parent.comAlert("请您为我们的服务态度打分~");
		return false;
	}
	var pack = $("#pack" + orderId + "Level").val();
	if(pack == 0 || pack ==""){
		parent.comAlert("请您为我们的商品包装打分~");
		return false;
	}
	var advise = $("#advise"+orderId).val();
	var adviseLen=advise.len();
	if(adviseLen > 140){
		parent.comAlert("其他问题的长度不能超过70个汉字~");
		return false;
	}
	var url ="/Member/ServiceAccess.do?orderId="+orderId+"&deliverySpeed="+speed
				+"&serviceAttitude="+service+"&productPack="+pack+"&advise="+advise+"&callback=?";
	$.getJSON(url,function(data){
		if(data == undefined){
			parent.comAlert("操作不合法,服务评价提交失败！");
			closeAccess(obj);
			return;
		}
		if(data.success > 0){
			parent.comAlert("服务评价提交成功，感谢您的评价！");
			closeAccess(obj);
			$("#toAccess"+orderId).removeClass("p1").addClass("p3");
			$("#toAccess"+orderId).css("text-decoration","none");
		}else{
			parent.comAlert("操作不合法,服务评价提交失败！");
			closeAccess(obj);
		}
	});
}

//其他问题：鼠标获取焦点
function adviseFocus(obj){
	$(obj).css("color","#666");
	if ($(obj).val() == "此单购物还满意吗？不想来说说？") {
		$(obj).val("");
	}
}

function loadOrderAddToCartMessage(msg,callbackParams){
	if(msg =="successView"){
		try{addAllCartItem();}catch(e){}
		parent.location.href="/Cart/ShowCart.do";
    }else if(msg=="GoodsTypeDifferent"){
  	   //doGoodsTypeDifferent();
    	parent.comAlert("温馨提示:生鲜与非生鲜类商品不能放同一购物车呦～");
    }else if(msg=="DifferentProduct"){
    	//differentProduct();
    	parent.comAlert("温馨提示:专享礼包与其他商品不能放同一购物车呦~");
    }else if(msg=="errorMsg"){
    	//$("#addToCartError_"+_articleId).css("display","block");
    	parent.comAlert("温馨提示:网络繁忙，请刷新页面后重试！");
    }else{
    	parent.location.href="/Cart/ShowCart.do";
    }
}

function doSuccess(callbackParams){
	var newTab = callbackParams.newTab;
	try{addCartItem();}catch(e){}
	if(callbackParams.addTypeFlag == 1){
		var paramsTT = new Object();
		paramsTT["randomT"] = Math.random();
		paramsTT["mid"] = callbackParams.mid;
		parent.$("#showIncludeCart").load("/green2012/ProductList/loadIncludeCart.do",paramsTT);
	}
	var url="/Cart/ShowCart.do";
	newTab.location.href=url;
}
//加入购物车失败
function doFailure(callbackParams){
	var msg=callbackParams.msg;
	var m = msg.substring(9);
	parent.comAlert(m);
}

//闪购订单支付20mins倒计时，每日鲜订单支付30mis倒计时
function countTimer(){
	$("em[id^='publicTimer_']").each(function(){
		var id = $(this).attr("id");
		var  h, m ,s,timerDiv,content,beginDate = null,endDate = null,nowDate,timeMillions,beginDis;
		timerDiv = $("#" + id);
		try{
			beginDate = new Date(timerDiv.attr("data-begintime").replace(/-/gm,"/"));
			
			endDate = beginDate;
			endDate.setMinutes(endDate.getMinutes()+60);
		}catch(e){}
		nowDate = new Date();
		timeMillions = endDate - nowDate;
		beginDis = beginDate - nowDate;
	    m = Math.floor(timeMillions/60000);
	    s = Math.floor(Math.round(timeMillions%60000)/1000);
		content =    m + "分" + s + "秒";
		if(m <= 0 && s <= 0){
			$(this).parent(".list_time").hide();
		}
	    timerDiv.html(content);
	});
	$("em[id^='shanTimer_']").each(function(){
		var id = $(this).attr("id");
		var  h, m ,s,timerDiv,content,beginDate = null,endDate = null,nowDate,timeMillions,beginDis;
		timerDiv = $("#" + id);
		try{
			beginDate = new Date(timerDiv.attr("data-begintime").replace(/-/gm,"/"));
			
			endDate = beginDate;
			endDate.setMinutes(endDate.getMinutes()+20);
		}catch(e){}
		nowDate = new Date();
		timeMillions = endDate - nowDate;
		beginDis = beginDate - nowDate;
	    m = Math.floor(timeMillions/60000);
	    s = Math.floor(Math.round(timeMillions%60000)/1000);
		content =    m + "分" + s + "秒";
		if(m <= 0 && s <= 0){
			$(this).parent(".list_time").hide();
		}
	    timerDiv.html(content);
	});
	$("em[id^='freshTimer_']").each(function(){
		var id = $(this).attr("id");
		var  h, m ,s,timerDiv,content,beginDate = null,endDate = null,nowDate,timeMillions,beginDis;
		timerDiv = $("#" + id);
		try{
			beginDate = new Date(timerDiv.attr("data-begintime").replace(/-/gm,"/"));
			
			endDate = beginDate;
			endDate.setMinutes(endDate.getMinutes()+30);
		}catch(e){}
		nowDate = new Date();
		timeMillions = endDate - nowDate;
		beginDis = beginDate - nowDate;
	    m = Math.floor(timeMillions/60000);
	    s = Math.floor(Math.round(timeMillions%60000)/1000);
		content =    m + "分" + s + "秒";
		if(m <= 0 && s <= 0){
			$(this).parent(".list_time").hide();
		}
	    timerDiv.html(content);
	});
}

function toOrderDetail(orderId){
	jQuery.post(frontPath + "/Member/FindOrder.do?id=" + orderId,function(data){
		if(data == 1){
			var url = frontPath + "/Member/ParentOrderDetail.do?id=" + orderId ;
			window.location.href = url;
		}else if(data==0){
			parent.comAlert("登录已超时");
		}else{
			parent.comAlert("您的订单正在处理中，请稍后查看订单详情！");
		}
	});
}

$(function(){
	setInterval("countTimer()",100);
});

//弹出层的样式浏览器兼容解决
$(function(){
	var zIndex = 99;
	$('.div_popup').each(function(){
		$(this).find('.w106').css('z-index',zIndex);
		$(this).css('z-index',zIndex);
		zIndex--;	
	});
});


//用户自主取消订单
function orderCancel(orderId,orderAliasId,cancelFlag){
	$('#j-cancel-orderid').val(orderId);
	$('#j-cancel-orderaliasid').val(orderAliasId);
	$('#j-cancel-flag').val(cancelFlag);
	parent.comBigAlert($('#j-reasonlist').html(),{"title":"订单取消申请","confirm":"确定","cancel":"取消"},docancel,null,null,isCancel);
}
function isCancel(){
	$(parent.document).find('.reason-remind').hide();
	if($('li.hovers',$(parent.document)).length <= 0){
		$(parent.document).find('.reason-remind').show();
		return false;
	}else{
		return true;
	}
}
// add by lihongyao  跨境购前台增加用户确认收货
function userTake(orderId) {
	parent.comAlert("您确定确认收货吗？",{"confirm":"确定","cancel":"取消"},function(){
		var params = new Object();
		params["orderId"] = orderId;
		$.post(frontPath + "/Member/userTake.do",params,function(data){
			var result = eval('(' + data + ')');
			parent.comAlert(result.msg);
			document.location = frontPath + "/Member/menumyorderlist.do?ColumnId=1707&orderType=8&tag=2&isSignfor=1";;
		});
	});
}
function docancel(){
	var reasonId = $('li.hovers',$(parent.document)).attr('data-reason-id');
	var orderId = $('#j-cancel-orderid').val();
	var orderAliasId = $('#j-cancel-orderaliasid').val();
	var cancelFlag = $('#j-cancel-flag').val();
	var params = new Object();
	params["orderId"] = orderId;
	params["aliasCode"] = orderAliasId;
	params["cancelFlag"] = cancelFlag;
	params["reasonId"] = reasonId;
    $.post( frontPath + "/Member/OrderCancel.do",params,function(data){
    	var aData = data.split(","),uri = "";
	    if(aData[0] == "1"){
		    parent.comAlert(aData[1]);
		    if(cancelFlag == 0){
		    	uri =  frontPath + "/Member/menumyorderlist.do?ColumnId=1707&orderType=8&tag=2&isSignfor=1";
		    }else{
		    	uri = frontPath + "/Member/menumyorderlist.do?ColumnId=1707&orderType=8&limitPayModeId=1&state=101&tag=1&limitStates=1";
		    }
			document.location = uri;
	    }else{
			setTimeout(function () {
				if(cancelFlag == 0){
			    	uri =  frontPath + "/Member/menumyorderlist.do?ColumnId=1707&orderType=8&tag=2&isSignfor=1";
			    }else{
			    	uri = frontPath + "/Member/menumyorderlist.do?ColumnId=1707&orderType=8&limitPayModeId=1&state=101&tag=1&limitStates=1";
			    }
				if(aData[1]){
					parent.comAlert(aData[1]);
				}else{
					parent.comAlert("系统繁忙，请稍后再试!");
				}
	   		 	document.location = uri;
			},2500);
	    }
    });
}


function addordermessagetc(orderId){
	$("#addiframe").show();
	var w_doc = $(window).width();
	var h_doc = $(window).height();
    var w_popup = $(".mengniu-popup").width();
	var left_w = (w_doc-w_popup)/2;
	var w_popup = $(".mengniu-popup").width();
	$(".mengniu-popup").css("left",left_w);
	$('.mask').width(w_doc);
	$('.mask').height(h_doc);
	$('.mask,.mengniu-popup').show();
	$(".custom-editor").show();
	$('.preview').hide();
	$("#theorderId").val(orderId);
}

function showordermessage(imageurl){
	$("#ordermessageimage").attr("src",imageurl);
	$(".mengniu-popup-imagepath").show();
}
