//加入购物车成功后调用
function doSuccess(){
	showShade();
	$("#addToCartDiv").show();
	$(".buy_pop").fadeIn();
	if(addTypeFlag==1){
		var paramsTT = new Object();
		paramsTT["randomT"] = Math.random();
		paramsTT["mid"] = mid;
		$("#showIncludeCart").load(frontPath + "/green2012/ProductList/loadIncludeCart.do",paramsTT);
		$('#buyThisStillBuy_before').hide();
		if(mid == 500){  //华中站目前没有智能推荐数据    故先屏蔽  20151130
			$("#buyThisStillBuy_before").hide();
		}else{
			request_buybuy(_articleId);
		}
		setBuyStillBuyEvents();
	}
	getCartTotalAmount();
	try{
		addCartItem(_articleId);
	}catch(e){}
}

function creatCartLayer(){
	showShade();
	if($("#addToCartDiv", top.document.body).length > 0){return;}
	var cartLayer = '<div class="list_buy_pop" id="addToCartDiv" style="display:none;">';
	cartLayer += '<div class="buy_pop" id="addtocart_box" style="display:none;">';
	cartLayer += '<div id="showIncludeCart"></div></div></div>';
	$(top.document.body).append(cartLayer);
};

/*function showShade(){
	if(jQuery("#layoutBg", top.document.body).length > 0){
		$("#layoutBg", top.document.body).show();
		return;
	}
	var winHeight = top.document.documentElement.scrollHeight+"px";
	var e = top.document.createElement("div");e.id="layoutBg";e.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:"+winHeight+";filter:Alpha(Opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5; background-color:#000;z-index:1000;";
	top.document.body.appendChild(e);
}*/

//获取购物车商品总数量
function getCartTotalAmount(){
	var uri = frontPath + "/frontendjson/smallcartinfo.do?mid=" + mid + "&callback=?&t=" + Math.random();
	jQuery.getJSON(uri, callbackSetSmallCartAmount);
}

//回调函数矫正小购车商品数量
function callbackSetSmallCartAmount(data){
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
	
//关闭加入购物车弹出层
function closeGoToCartLayer(){
	jQuery('#addToCartDiv').hide();
	closeShade();
}

//加入购物车弹出层中推荐商品层设置左右滑动效果
function setBuyStillBuyEvents(){
	$(".list_scroll").each(function(){
		$(this).parent().parent("#buyThisStillBuy").show();
		var dl_width = $(this).find("dl").width();
		dl_width = dl_width>0 ? (dl_width + 6) : 108;
//			$(this).parent().parent("#buyThisStillBuy").hide();
		if($(this).find("dl").length>4)
		{
			$(this).find(".list").width(dl_width*$(this).find("dl").length);
			$(this).siblings(".pop_prev_noclick").show();
			$(this).siblings(".pop_prev").hide();
			$(this).siblings(".pop_next").show();
			$(this).siblings(".pop_next_noclick").hide();
		}
		else
		{
			$(this).find(".list").width(dl_width*$(this).find("dl").length);
			$(this).siblings(".pop_prev_noclick").hide();
			$(this).siblings(".pop_prev").hide();
			$(this).siblings(".pop_next_noclick").hide();
			$(this).siblings(".pop_next").hide();
		}
	});
	$(".pop_next").each(function(){
		$(this).click(function(){
			var dl_width = ($(this).siblings(".list_scroll").find("dl").width()+6)*4;
			$(this).siblings(".list_scroll").stop().animate({scrollLeft:dl_width},500);
			$(this).siblings(".pop_next_noclick").show();
			$(this).hide();
			$(this).siblings(".pop_prev").show();
			$(this).siblings(".pop_prev_noclick").hide();
		});
		
		$(this).hover(function(){
			$(this).addClass("pop_next_h");					   
		},function(){
			$(this).removeClass("pop_next_h");
		});	
	});	
	$(".pop_prev").each(function(){
		$(this).click(function(){
			$(this).siblings(".list_scroll").stop().animate({scrollLeft:0},500);
			$(this).siblings(".pop_prev_noclick").show();
			$(this).hide();
			$(this).siblings(".pop_next").show();
			$(this).siblings(".pop_next_noclick").hide();
		});
		
		$(this).hover(function(){
			$(this).addClass("pop_prev_h");					   
		},function(){
			$(this).removeClass("pop_prev_h");
		});	
	});
}