$(function(){
	var $toolbar_top = $('.wm-toolbar-top'),
		$toolbar_tab = $('.wm-toolbar-tab'),
		$trigger = $('.wm-trigger'),
		$wm_toolbar = $('.wm-toolbar'),
		$toolbar_l = $('.toolbar-left'),
		$pop_layer = $('.pop-layer'),
		$p_title = $('.pop-title i'),
		indexold= -1 ;
	//计算头部局顶部位置
	function count(){
		var $wH = $(window).height();
		$toolbar_l.css({height:$wH});
		$toolbar_top.css({top:$wH*25/100});
		$('.scroll-box').css({height:$wH-112});
		$('.wm-c-box,.promotecont').css({height:$wH-40});
	}
	count();
	//鼠标移动上去改变背景色
	$toolbar_tab.hover(function(){
		$(this).addClass('cur').siblings('.wm-toolbar-tab').removeClass('cur');
	},function(){
		$(this).removeClass('cur');
	})
	//鼠标点击
	$toolbar_tab.each(function(){
		$(this).click(function(){
			$toolbar_tab.removeClass('wm-select');
			$(this).addClass('wm-select');
			try{
				if($(this).hasClass('activity')){
					ga_event(PageGroup, $(this).attr("data-ga"), $(this).attr("data-gatext"));
				}
			}catch(e){}//为小购物车中“7周年”广告增加ga检测码---end
		})
	})
	//对应图层进行显/隐切换 
	function tab(i){
		$pop_layer.animate({left:'276px'});
		$pop_layer.eq(i).animate({left:0});
	}
		//弹出框显示
	function l_show(){
		$wm_toolbar.animate({right:0});		
	}
	
	//点击前三个显示效果
	$trigger.each(function(){
		var i = $('.wm-trigger').index($(this));
		$(this).bind('click',function(){
			var cLeft  = $wm_toolbar.css("right");
			if(i == indexold){
				if(cLeft == '0px'){
					$wm_toolbar.animate({right:'-276px'});
					tab(i);
				}else{
					l_show();
					tab(i);
				}
			}else if(indexold == -1){
				l_show();
				tab(i);
			}else{
				if(cLeft == 0){
					tab();
				}else{
					l_show();
					tab(i);
				}
			}
			indexold = i;
		})
		return i;
	})
	
	//点击侧边栏隐藏
	$("html, body,.pop-title em").bind('click',function(e){
		$wm_toolbar.animate({right:'-276px'});
		//e.stopPropagation();
	})
	//阻止冒泡
	$wm_toolbar.bind('click',function(e){
		e.stopPropagation();
	})
	//当浏览器变化，重新加载计算高度
	$(window).resize(function(){
		count();
	});
	
	$(".wm-toolbar div.cart").bind("click",function(){
		loadSuspendCartContent();
	});
	
})

/*初始化右侧悬浮购物车start*/
function initSuspendCartInfo(){
	//获取购物车当前商品数
	getSuspendCartTotalAmount();
}

//获取购物车商品总数量
function getSuspendCartTotalAmount(){
	var uri = crossDomain + frontPath + "/frontendjson/smallcartinfo.do?mid=" + mid + "&callback=?&t=" + Math.random();
	$.getJSON(uri, callbackSuspendCartAmount);
}

//回调函数矫正小购车商品数量
function callbackSuspendCartAmount(data){
	if(data && data.totalAmount >= 0){
		
		//关键参数重置
		$("#smallcart_items_amount").attr("data-count",0);
		$("#smallcart_items_amount").val(data.cartitemsAmount + "");
		$("#suspendcart_items_amount").attr("data-count",0);
		$("#suspendcart_items_amount").val(data.cartitemsAmount + "");
		$("#smallcart").attr("data-first","yes");
		$("#suspendcart").attr("data-first","yes");
		var amount = data.totalAmount;
		if(amount > 99){
			amount = "99+";
		}
		$(".smallcart_totalamount").html(amount + "");
		$(".suspendcart_totalamount").html(amount + "");
		$("#totalItemCounts").html(amount + "");
		$("#totalMustPayPrice").html(data.totalMustPayPrice.toFixed(2) + "");
	}
}

/*加载悬浮购物车内容*/
function loadSuspendCartContent(){
	var suspendcart_items_amount = $("#suspendcart_items_amount").val();
	if(suspendcart_items_amount == "init"){
		//此处代码出现可能性极低，因初始化时最多可以请求获取购物车数量请求6次
		$("#suspendcart_cont").html("<div class='smallcart_amount0'>网络繁忙，请稍候重试~</div>");
		setTimeout(getSuspendCartTotalAmount,"500");
		return;
	}
	isShowSuspendcartScrollBar(suspendcart_items_amount);
	var isFirstDo = $("#suspendcart").attr("data-first");
	if(isFirstDo == "yes"){
		var paramsTT = new Object();
		paramsTT["randomT"] = Math.random();
		paramsTT["mid"] = mid;
		var url = frontPath + "/cityindex/finclude/includesuspendcartcont.do";
		$.get(url, paramsTT, function(data){
			$("#suspendcart_cont").html(data);
			if($("#suspendcart_cont").length > 0){
				isShowSuspendcartScrollBar(suspendcart_items_amount);
				if($(".xy_miniprice").length > 0){
					$(".xy_miniprice").each(function(){
						var xy_miniprice = parseFloat($(this).html());
						$(this).html(xy_miniprice);
					});
				}
			}
			//实现区分产地直送，产地直采，我买网发货单，以便跳转到购物车列表下的相应页签下 start
			try{
				if(sellerType == 1){//产地直送
					var tocarthref = $('.wm-btn-buy').find('a').attr('href');
					$('.wm-btn-buy').find('a').attr('href',tocarthref + '&curTab=2');
				}else if(sellerType == 2){//产地直送
					var tocarthref = $('.wm-btn-buy').find('a').attr('href');
					$('.wm-btn-buy').find('a').attr('href',tocarthref + '&curTab=6');
				}
			}catch(e){}
			//实现区分产地直送，产地直采，我买网发货单，以便跳转到购物车列表下的相应页签下 end
		
		});
		$("#suspendcart").attr("data-first","no");
	};
}

function getSuspendCartTotalAmountForMax(){
	setTimeout(function(){
		var $items_amount_inp = $("#suspendcart_items_amount");
		var count = $items_amount_inp.attr("data-count");	//循环计数器,最多循环三次获取购物车数量的请求
		if($items_amount_inp.val() == "init" && count < 3){
			getCartTotalAmount();
			getSuspendCartTotalAmountForMax();
			count++;
			$items_amount_inp.attr("data-count",count);
		}else{
			loadSuspendCartContent();
		}
	},"300");
}

function isShowSuspendcartScrollBar(amount){
	if(amount == 0){
		$("#suspendcart_cont").html("<div class='nothing'><dl><dt><img src='/zhongliang/city/common/images/no-cart.jpg'/></dt><dd><p>购物车空空的，赶快去挑选心仪的商品吧~</p><p><a href='"+crossDomain + frontPath + "/index-"+cityid+"-0.htm'>去首页看看</a></p></dd></dl></div>");
		$("#suspendcart").attr("data-first","no");
	}else if(amount >=5){
		//$(".item_scroll").css("overflow-y","scroll");
		$('.cart_cont .scrollbar').hide();
	};
}

//删除头部小购物车中X元Y件商品
function deleteSuspendCartXY(cartId,ruleId){
	$("#delsuspendcartxy_" + cartId + "_" + ruleId).hide();
	var params = {};
	params["mid"] = mid;
	params["cartid"] = cartId;
	params["ruleid"] = ruleId;
	uri = crossDomain + frontPath + "/delcartitemxy.do?" + $.param(params) + "&callback=?";
	$.getJSON(uri,getSuspendCartTotalAmount);
}

//删除头部小购物车中商品
function deleteSuspendCart(cartId,productid,isPresent,index){
	//emarbox删除购物车监测码 20130903_zhaogangqiang
	try{deleteOneItem(productid);}catch(e){}
	$("#delsuspendcart" + index + "_" + cartId + "_" + productid).hide();
	var params = new Object();
	params["mid"] = mid;
	params["cartid"] = cartId;
	var url='';
	if(isPresent==1){
		params["productid"] = 0;
		params["presentid"] = productid;
		uri = crossDomain + frontPath + "/frontendjson/delpresent.do?" + $.param(params) + "&callback=?";
	}else{
		params["productid"] = productid;
		uri = crossDomain + frontPath + "/frontendjson/delcartitem.do?" + $.param(params) + "&callback=?";
	}
	$.getJSON(uri,params,callbackSuspendCartAmount); 
	try{product_delete(productid);}catch(e){}//ga检测码，删除购物车
}

function deleteSusUnselItem(cartId,productid,isPresent,index){
	$("#delsuspendcart" + index + "_" + cartId + "_" + productid).hide();
	var params = new Object();
	params["mid"] = mid;
	params["cartid"] = cartId;
	params["productid"] = productid;
	var url=crossDomain + frontPath + "/frontendjson/delunselcartitem.do?" + $.param(params) + "&callback=?";
	$.getJSON(url,params,callbackSuspendCartAmount);
}

/*初始化我的收藏 start*/
function initSuspendFavorite(){
	$("#loadfavorlist").html("<span class='loadfavor'>正在加载，请稍候...</span>");
	var url = crossDomain + frontPath + "/cityindex/indexinclude/suspendfavorlist.do?" + "isSuspendCart=1&t=" + Math.random();
	$("#loadfavorlist").load(url,function(data){
		//我的收藏
		$('.wm-c-box li').hover(function(){
			$(this).addClass('cur');
		},function(){
			$(this).removeClass('cur');
		})
	});
}
/*初始化我的收藏 end*/

/*初始化右侧悬浮购物车end*/
$(function(){
//	initSuspendCartInfo();	//初始化城市版首页右侧悬浮购物车
	$("#suspendcollect").bind("click",function(){
		initSuspendFavorite();	//初始化我的收藏
	});
})

$(function(){
	try{
		if(sellerType == 2){//产地直采
			var tocarthref = $('#cartlink').attr('href');
			$('#cartlink').attr('href',tocarthref + '&curTab=6');
		}
	}catch(e){}
})