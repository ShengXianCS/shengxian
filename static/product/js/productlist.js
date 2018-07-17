//相关分类
$(function(){
	if($("#detail_type .left_list ul li").length>12)
	{
		$("#detail_type .left_list").addClass("left_list_hidden");
		$("#detail_type").addClass("detail_left_list_spe");
		$(".left_list_more").show();
	}
	else
	{
		$(".left_list_more").hide();
	}
	$("#detail_type .left_list_hidden").hover(function(){
		$(".left_list_hidden").addClass("left_list_visible");
		$(".left_list_more").hide();
	},function(){
		$(".left_list_hidden").removeClass("left_list_visible");
		$(".left_list_more").show();
	})
})

//热卖推荐
$(function(){
	$(".list_r_first_a .list_r_son").last().addClass("no_background");
})
/*筛选器二期 begin  modify by lihongyao and muchunfeng 20140716 */  
//品牌展开收起 
//$(function(){
//	var brand_num = $(".screener_body_i_r li").length;
//	if(brand_num<=18)
//	{
//		$(".screener_body_r").hide();
//	}else{
//		$(".screener_body_i_r").addClass("screener_body_i_r_90");
//	}
//	$(".screener_body_r .show_brand").click(function(){
//		$(".screener_body_i_r").removeClass("screener_body_i_r_90");
//		$(this).hide();
//		$(this).siblings(".hide_brand").show();
//	});
//	$(".screener_body_r .hide_brand").click(function(){
//		$(".screener_body_i_r").addClass("screener_body_i_r_90");
//		$(this).hide();
//		$(this).siblings(".show_brand").show();
//	})
//})
function bransShowInit(){
//	var brand = ","; // 已经选择的品牌，eg: ",brand1,brand2,brand,"
	var brand = $("#brand").val();
	if (brand == '-1') {
		brand = ",";
	}
	var more_num = $(".screener_body_i_r_more li").length;
	var brand_num = $(".screener_body_i_r li").length;
	var classL = $(".screener_body_i_r_more .select").length;
	
//	if(brand_num <= 15)
//	{
//		$(".screener_body_r").hide();
//	} else {
//		$(".screener_body_i_r").addClass("screener_body_i_r_90");
//	}
	if(more_num > 35){
		$(".screener_body_i_r_more").css('overflow-y','scroll')
	};
	/*判断 select 的个数*/
	 if(classL > 0){
		$(" a.no-sure ").hide();
		$(" a.sure ").show();
	}else{
		$(" a.no-sure ").show();
		$(" a.sure ").hide();
	}

	/*更多 收起 多选 取消*/
	$("div.screener_body_i").delegate(".show_brand", "click", function(){
		$(this).parents(".screener_body_i").find(".screener_body_i_r").hide();
		$(this).parents(".screener_body_i").find(".screener_body_i_r_more").show();
		$(this).hide().siblings(".hide_brand").show();
		$(".brandBtn").show();
	}).delegate(".hide_brand", "click", function(){
		$(this).parents(".screener_body_i").find(".screener_body_i_r").show();
		$(this).parents(".screener_body_i").find(".screener_body_i_r_more").hide();
		$(this).hide().siblings(".show_brand").show();
		$(".brandBtn").hide();
	}).delegate(".more-btn", "click", function(){
		$(this).hide();
		$(this).parents(".screener_body_i").find(".screener_body_i_r_more").show();
		$(this).parents(".screener_body_i").find(".screener_body_i_r").hide();
		$(this).parent(".more").siblings(".brandBtn").show();
		$(this).parents(".screener_body_i").find(".show_brand").hide();	
		return false;
	}).delegate(".cancel", "click", function(){
		$(this).parents(".screener_body_i").find(".show_brand").show();	
		$(this).parents(".screener_body_i").find(".hide_brand").hide();		
		$(this).parent(".brandBtn").siblings(".screener_body_i_r_more").hide();
		$(this).parent(".brandBtn").siblings(".screener_body_i_r").show();
		$(this).parent(".brandBtn").hide();
		$(this).parents(".screener_body_i").find(".more-btn").show();
		return false;
	}).delegate("ul.screener_body_i_r_more>li>a"," click",function(){
		var brandId = $(this).attr("id");
		if ($(this).attr("class") == "select") {
			$(this).removeClass("select");
			brand = brand.replace(brandId + ",","");
		} else {
			$(this).addClass("select");
			brand += brandId + ",";
		}
		var classL = $(".screener_body_i_r_more .select").length;
		if(classL > 0){
			$(" a.no-sure ").hide();
			$(" a.sure ").show();
		}else{
			$(" a.no-sure ").show();
			$(" a.sure ").hide();
		}
	}).delegate(".brandBtn .sure"," click",function(){
		/*if (brands.length > 0) {
			alert(brands);
			brands = brands.substring(0, brands.length - 1);
			alert(brands);
		}*/
		searchQueryListOrderByMulti(0,brand,"","");
	});
}
// 品牌展开收起  多选
$(function(){
	bransShowInit();
})
/*筛选器二期 end */

//商品列表特效
$(function(){
	$(".product_item").each(function(){
		if(($(this).index()+1)%4==0)
		{
			$(this).addClass("product_item_nobg");
		}
		$(this).hover(function(){
			$(this).addClass("product_item_hover");			   
		},function(){
			$(this).removeClass("product_item_hover");
		})
	})
})
//设置allcolumns的值
function setAllColVal(){
	var brandId = $("#brand").val();
	handleRecommend(brandId);
}
//筛选器属性赋值
function searchQueryListByAttr(showAttrName,showAttrValue){
	$("#"+showAttrName).val(showAttrValue);
	setAllColVal();
	$("#productListForm").submit();
}
//已筛选属性点击事件
function delectSelAttr(attrName){
	$("#"+attrName).val("");
	if("brand"==attrName){
		$("#brand").val("0");
	}
	setAllColVal();
	$("#productListForm").submit();
}
//筛选重置
function delectAllSelAttr(){
    $(".screener_body_i_yx").find("span[class='screener_input_text']").each(function(){
    	var selAttrName = $(this).attr("innername");
    	$("#"+selAttrName).val("");
    	if("brand" == selAttrName){
    		$("#brand").val("0");
    	}
    });
    setAllColVal();
    $("#productListForm").submit();
}
//列表页结果(批量请求价格服务)
function LoadProductPrice(itemPrice,saleIcon){
	if(usergroupid == -1){
		usergroupid = 100;
		var userinfo = jQuery.cookie("userinfo");
		if(userinfo != null && userinfo.indexOf("|") != -1){
			var userinfoArray = userinfo.split("|");
			usergroupid = userinfoArray[3];
		}
	}
	var params = {};
	params.ids = pidArr.join(",");
	var prices = ["buyPrice","WMPrice","marketPrice","specialPrice"];
	params.prices = prices.join(",");
	params.defData = "n";//是否需要默认数据
	params.mid = mid;
	params.cityid = cityid;
	params.usergroupid = usergroupid;
	var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=" + "?";
	$.getJSON(apiUrl, function(data, status) {
		if(!valiLoadProductsData(data)){
			return;
		}
		var pid = "";
		var result = data.result;
		var buyDiv = "",soldOutDiv = "",buysDiv = "",soldsOutDiv = "", apacketDiv = "", apacketsDiv = "";
		var buyPrice = "", marketPrice = "",specialPrice = "",itemPriceDiv = "", WMPrice="";
		for(var i = 0;i < result.length;i++){
			itemPriceDiv = "暂无价格";
			pid = result[i].id;
			buyDiv = $("#item_buy_" + pid);
			soldOutDiv = $("#item_soldout_" + pid);
			buysDiv = $("#items_buy_" + pid);
			soldsOutDiv = $("#items_soldout_" + pid);
			apacketDiv = $("#item_apacketmial_" + pid);
			apacketsDiv = $("#items_apacketmial_" + pid);
			
			buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;
			marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;
			WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
			specialPrice = result[i].price.specialPrice == undefined ? "" :"￥" + result[i].price.specialPrice.priceValue;
			if(specialPrice != ""){
				$("#" + saleIcon + pid).show();
				$("#" + saleIcon + "s_" + pid).show();
			}
			if(buyPrice != ""){
				itemPriceDiv = "<b>￥</b>" + buyPrice;
				/* 屏蔽我买价
				if(parseFloat(WMPrice) > parseFloat(buyPrice)){
					itemPriceDiv += "<span>￥" + WMPrice + "</span>";
				}*/
			}
			
			$("#" + itemPrice + pid).html(itemPriceDiv);
			$("#" + itemPrice + "s_" + pid).html(itemPriceDiv);
			
			//判断商品是否是一件包邮商品
			var isAPacketMail = $("#j-packetmail_" + pid).val();
			if(result[i].sellable == true){
				if(isAPacketMail == "true"){
					apacketDiv.show();
					apacketsDiv.show();
				}else{
					buyDiv.show();
					buysDiv.show();
				}
			}else{
				soldOutDiv.show();
				soldsOutDiv.show();
				//单品的
				$("#isGift_" + pid).removeClass("product_item_icon_1").addClass("product_item_icon_3");
				$("#isSales_" + pid).removeClass("product_item_icon_2").addClass("product_item_icon_3");
				//组合的
				$("#isGifts_" + pid).removeClass("product_item_icon_1").addClass("product_item_icon_3");
				$("#isSaless_" + pid).removeClass("product_item_icon_2").addClass("product_item_icon_3");
			}
		}
	});
}
//检查商品可售状态
function LoadSellableForProductList(buyDivId,soldOutDivId,id,isGift,isSales){
	var buyDiv = jQuery("#" + buyDivId + "" + id);
	var soldOutDiv = jQuery("#" + soldOutDivId + "" + id);
	var url = priceServer + "/sellable.do?id=" + id +"&mid=" + mid + "&cityid=" + cityid + "&callback=?";
	jQuery.getJSON(url,
		function(data){
			if(data != null && data != ""){
				if(data.sellable){
					//单品的
					if(isGift){jQuery("#isGift_" + id).show();}
					if(isSales){jQuery("#isSales_" + id).show();}
					//组合的
					if(isGift){jQuery("#isGifts_" + id).show();}
					if(isSales){jQuery("#isSaless_" + id).show();}
					buyDiv.show();
				}else{
					if(isGift){jQuery("#isNotGift_" + id).show();}
					if(isSales){jQuery("#isNotSales_" + id).show();}
					soldOutDiv.show();
				}
			}
		});
}
//置顶商品处理
function handleRecommend(brand){
	if (typeof(brand) != "undefined") {
		if(typeof(brand) != "number"){
			if (brand != -1) {
				brand = brand.replace(",0", "");
			}
		}
		if(brand != -1 && brand.length > 2) { // 不包括“其他0”和“不限-1”
			brand = brand.substring(1,brand.length - 1);
			$("#allcolums").attr("name","allcolums").val($("#Cid").val() + "," + brand);
		} else {
			$("#allcolums").attr("name","");
		}
	} else {
		$("#allcolums").attr("name","");
	}
}
//分页查询
function queryListByPage(page){
	$("#page").val(page);
	handleRecommend($("#brand").val());
	$("#productListForm").submit();
}
//排序查询
function queryListOrderBy(id,brand,brandName){
	$("#brandName").val(brandName);
	$("#brandName").show();
	handleRecommend(brand);
	$("#brand").val(brand);
	if(id != 0){
		var obj = $("#" + id);
		var orderBy = obj.attr("data-orderby");
		if("select" == obj.parent().attr("class")){
			$("#orderBy").val("");
		}else{
			$("#orderBy").val(orderBy);
		}
	}
	$("#productListForm").submit();
}
//异步加载浏览记录-------该方法加入鼠标滚动事件当中
function setViewHistoryShow(){
	var paramsTT = new Object();
	paramsTT["randomT"] = Math.random();
	paramsTT["mid"] = mid;
	if($("#viewHistory").attr("data-first") == 'y'){
		$("#viewHistory").attr("data-first","n");
	  	$("#viewHistory").load(frontPath + "/" + webIndex + "/ProductList/viewHistory.do",paramsTT);
	}
}
//清除浏览记录
function clearHistory() {
	jQuery.cookie("ViewHistory","",{path:'/'});
	var temp = "<div class='left_title_2'>最近看过的商品<div class='empty_list' onclick=\"clearHistory();\"><a href='javascript:;'>清空</a></div></div><div class='noproduct'>您暂时没有浏览过的任何商品</div>"
	$("#viewHistory").html(temp);
}
//显示分类热卖商品
$(function stor_hotRecommond(){
	jQuery("#relationWeekHotSellDiv").hide();
	var ids = jQuery("#idTimes").val();
	if(ids != ''){
		loadProducts(show_HotRecommond, null,ids, mid, "pic100", 0, ["buyPrice","marketPrice"], "title", [],"true");
		jQuery("#hotRecommendDiv").show();
	}
})
//热卖商品显示价格
function show_HotRecommond(data){
	if(!valiLoadProductsData(data)){
		return;
	}
	var result=data.result;
	var content="", productid = 0, buyPrice = "", marketPrice = "";
	for(var i=0;i<result.length && i<3;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : "￥"+result[i].price.buyPrice.priceValue;//我买价
		marketPrice = result[i].price.marketPrice == undefined ? "" :"￥"+ result[i].price.marketPrice.priceValue;//市场价
		productid=result[i].id;//商品ID
		content += "<div class='list_r_son'>"
		content += "	<div class='list_r_son_1'>"
		content += "		<a href='" + frontPath + "/Product-" + mid + "-" + productid + ".htm' title='" + result[i].title + "' target='_blank'>"
		content += "			<img src='" + picPrefix + "/" + result[i].pics.pic100[0] + "' width='100' height='100'/>"
		content += "		</a>"
		content += "	</div>"
		content += "	<div class='list_r_son_r'>"
		content += "		<div class='list_r_son_tit'><a href='" + frontPath + "/Product-" + mid + "-" + productid + ".htm' title='" + result[i].title + "' target='_blank'>" + cutString(result[i].title,30,'…') + "</a></div>"
		content += "		<div class='list_r_son_price'>" + buyPrice + "</div>"
		content += "		<div class='list_r_son_btn'><div class='buybtn' onclick='topIsGoToCart(" + productid + "," + mid + ");'>我要买</div></div>"
		content += "	</div>"
		content += "</div>"
	}
	if(content){
		$(".list_r_first_a").html(content);
	}
}
//猜你喜欢
function setGuessYouLikeEvents(){
	$(".detail_foot_list_scroll").each(function(){
		var foot_width = $(this).find("dl").width()+40;
		if($(this).find("dl").length>5)
		{
			$(this).find(".detail_foot_list").width(foot_width*$(this).find("dl").length);
			$(this).siblings(".detail_foot_prev_noclick").show();
			$(this).siblings(".detail_foot_prev").hide();
		}
		else
		{
			$(this).find(".detail_foot_list").width(foot_width*$(this).find("dl").length);
			$(this).siblings(".detail_foot_prev_noclick").hide();
			$(this).siblings(".detail_foot_prev").hide();
			$(this).siblings(".detail_foot_next_noclick").hide();
			$(this).siblings(".detail_foot_next").hide();
		}
	});
	$(".detail_foot_next").each(function(){
		$(this).click(function(){
			var foot_width = ($(this).siblings(".detail_foot_list_scroll").find("dl").width()+40)*4;
			$(this).siblings(".detail_foot_list_scroll").animate({scrollLeft:foot_width},500);
			$(this).siblings(".detail_foot_next_noclick").show();
			$(this).hide();
			$(this).siblings(".detail_foot_prev").show();
			$(this).siblings(".detail_foot_prev_noclick").hide();
		});
		$(this).hover(function(){
			$(this).addClass("detail_foot_next_h");					   
		},function(){
			$(this).removeClass("detail_foot_next_h");
		});
	});	
	$(".detail_foot_prev").each(function(){
		$(this).click(function(){
			$(this).siblings(".detail_foot_list_scroll").animate({scrollLeft:0},500);
			$(this).siblings(".detail_foot_prev_noclick").show();
			$(this).hide();
			$(this).siblings(".detail_foot_next").show();
			$(this).siblings(".detail_foot_next_noclick").hide();
		});
		$(this).hover(function(){
			$(this).addClass("detail_foot_prev_h");   
		},function(){
			$(this).removeClass("detail_foot_prev_h");
		});
	});
}
//设置左侧广告图片lazyload/
function setLeftAdvImgLazyLoad(){
	if($("#leftAdvDiv").length == 0) return;
	if(getCurrScrollTop() > getCurrElementTop("leftAdvDiv")){
		if($("#leftAdvDiv").attr("data-first")  == "y"){
			$("#leftAdvDiv").attr("data-first", "n");
			$(".left_ad").find(".lazyload").each(function(){
				$(this).attr("src",$(this).attr("original"));
			});
		}
	}
}
//热卖推荐加入购物车
function topIsGoToCart(id,mid){
	$(".siteinfo:first").css("z-index","1000");
	isGoToCart(id,mid);
	showShade();
	$("#addToCartDiv").show();
	$(".buy_pop").fadeIn();
}
//刷新当前页面(无筛选条件)
function refreshWithOutParams(){
	var url = frontPath + "/" + webIndex + "/ProductList.do?mid=" + mid + "&Cid=" + $("#Cid").val();
	window.location = url;
}
/**
 * 加入购物车成功后执行的事件，列表页
 */
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
//加入购物车弹出层中推荐商品层设置左右滑动效果
function setBuyStillBuyEvents(){
	$(".buy_pop_b .list_scroll").each(function(){
		$(this).parent().parent(".buy_pop").show();
		var dl_width = $(this).find("dl").width();
		dl_width = dl_width>0 ? (dl_width + 6) : 108;
		$(this).parent().parent(".buy_pop").hide();
		if($(this).find("dl").length>4)
		{
			$(this).find(".list").width(dl_width*$(this).find("dl").length);
			$(this).siblings(".pop_prev_noclick").show();
			$(this).siblings(".pop_prev").hide();
			$(this).siblings(".pop_next_noclick").hide();
			$(this).siblings(".pop_next").show();
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
	$(".buy_pop_b .pop_next").each(function(){
		$(this).click(function(){
			var dl_width = ($(this).siblings(".list_scroll").find("dl").width()+6)*4;
			$(this).siblings(".list_scroll").animate({scrollLeft:dl_width},500);
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
	$(".buy_pop_b .pop_prev").each(function(){
		$(this).click(function(){
			$(this).siblings(".list_scroll").animate({scrollLeft:0},500);
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
//初始化事件
$(function (){
	//设置详情页的滚动条事件！！！！！
	function setScrollEnvent(){
		topFixed();	//base.js中右下角悬浮窗
		setViewHistoryShow();
		setLeftAdvImgLazyLoad();
	}
	//注册滚动条事件
	window.onscroll=setScrollEnvent,window.resize=setScrollEnvent,setScrollEnvent();
});

//列表页和品牌页公用一个  显示热销榜
$(function relationWeekHotSell(){
	var ids = jQuery("#relationWeekHotSellIds").val();
	if(ids){
		loadProducts(show_brandHotSell, null,ids, mid, "pic60", 0, ["buyPrice","WMPrice","marketPrice"], "title", [],"true");
		jQuery("#relationWeekHotSellDiv").show();
	}
})
//列表页和品牌页公用一个  热销榜显示价格
function show_brandHotSell(data){
	if(!valiLoadProductsData(data)){
		return;
	}
	var result=data.result;
	var content="", productid = 0, buyPrice = "", marketPrice = "", sourceid = "", WMPrice="";
	content += "<h3>" + columnName + "搜索热销榜</h3>"
	content += "<div id='relationWeekHotSell' data-first='y' class='con'>"
	content += "<ul style='display: block;'>"
	for(var i=0;i<result.length && i<6;i++){
		var forthird=""
		sourceid = urlSourceIds[0] == null ? '1089' : urlSourceIds[0];
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;//我买价
		//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;//市场价
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid=result[i].id;//商品ID
		picPath = result[i].pics.pic60[0];
		picPath = picPath == null ? 'notfound60.gif' : picPath;
		content += "<li"
		if(i == 0){
			content += " class='first'"
		}else if(i == 1){
			content += " class='second'"
		}else if(i == 2){
			content += " class='third'"
		}else if(i == 3){
		}else if(i == 4){
			content += " class='none'"
		}
		if(i < 3){
			forthird = "<i></i>"
		}
		content += ">"
		content += "	<dl class='clearfix' data-gzpid='"+productid+"' data-ga='relationWeekHotSellDiv'>"
		content += "		<dt class='fl' id='_gatrack_productlist_pic_"+productid+"'><a href='" + frontPath + "/Product-" + mid + "-" + productid + ".htm' title='" + result[i].title + "' target='_blank' onclick='clickUrl(" + productid + "," + mid + "," + sourceid + "," + targetPageId + "," + actionId + ")'>"
		content += "			<img class='lazyload' src='" + picPrefix + picPath + "' original='" + picPrefix + picPath + "' alt='" + result[i].title + "'></img>"
		content += "		</a>" + forthird + "</dt>"
		content += "		<dd class='fl' id='_gatrack_productlist_title_"+productid+"'>"
		content += "			<div class='name'>"
		content += "				<a href='" + frontPath + "/Product-" + mid + "-" + productid + ".htm' title='" + result[i].title + "' target='_blank' onclick='clickUrl(" + productid + "," + mid + "," + sourceid + "," + targetPageId + "," + actionId + ")'>" + cutString(result[i].title,42,'…') + "</a>"
		content += "			</div>"
		content += "			<div class='price'>￥<span>" + buyPrice + "</span></div>";
		content += "		</dd>"
		content += "	</dl>"
		content += "</li>"
	}
	content += "	</ul>"
	content += "</div>"
	if(content){
		$("#relationWeekHotSellDiv").html(content);
	}
}
//品牌页连接跳转
function openNewWindow(cid){
	var url = window.location.href;
	var index = url.indexOf(".htm");
	var brandIds = $("#brandIds").val();
	var brandUrls = $("#brandUrls").val();
	if(url.length > (index + 4) || brandIds.indexOf(cid) == -1){
		return;
	}
	var brandIdsArray = brandIds.split(",");
	var brandUrlsArray= brandUrls.split(",");
	var brandIndex = 0;
	for(var i=0;i<brandIdsArray.length;i++){
		if(cid == brandIdsArray[i]){
			brandIndex = i;
		}
	}
	url = brandUrlsArray[brandIndex];
	window.location = url;
}
/**
 * 	动态添加几件标签
 * */
function addAmount(amount,pId,proamount){
	var pila_now = "";
	if(amount == undefined || amount == ""){
		amount = 1;
		pila_now = "active";
	}
	//if(amount == getAmount()){
		//$("#proamount_" + proamount).find(".piline_a").removeClass("pila_now");
		//pila_now = "pila_now";
		//showAmount(pId);
	//}
	
	var contents="<span class='"+pila_now+"'>"+amount+"件<i></i></span>";
	//var contents="<a id='pamount_" + pId + "' href='javascript:void(0);' class='piline_a " + pila_now + "'>" + amount + "件</a>";
	jQuery("#proamount_" + proamount).append(contents);
}

function getAmount(){
	var keyword = jQuery("#searchProductListKeyword").val();
	if(keyword == undefined || keyword == ""){
		keyword = '0';
	}
	var amountTemp = '';
	var amountWordTemp = '';
	if (amountWordTemp  = keyword.match(/.*?([\d]+)[^\d]*$/)){
		amountTemp = amountWordTemp[1];
	}
	return amountTemp;
}

function showAmount(tempPid){
	var am = jQuery("#proamount_" + tempPid);
	jQuery("#" + tempPid + "_item").siblings(".proitem_list").hide();
	jQuery("#" + tempPid + "_item").show();
}
function proamountEvent(){
	//判断商品的数量，为一行的最后一个商品去除背景
	$(".product_item").each(function(){
		if(($(this).index()+1)%4==0)
		{
			$(this).find(".proitem_spe").hide();
		}
	});	
	
	//鼠标悬浮在商品的数量和商品上时，商品边框颜色变化及父类去除背景
	$(".proitem_line,.proitem_list").hover(
		function(){
			$(this).siblings(".proitem_spe").hide();
			$(this).parent().addClass("proitem_list_hover");					   
		},function(){
			$(this).siblings(".proitem_spe").show();
			$(this).parent().removeClass("proitem_list_hover");
	});
	
	//商品数量和内容的切换
	$(".piline_a").click(function(){
		$(".product_item_img").find(".lazyload").each(function(){
			$(this).attr("src",$(this).attr("original"));
		});
		$(this).addClass("pila_now").siblings(".piline_a").removeClass("pila_now");
		var tempPid = $(this).attr("id");
		$(this).parents(".product_item").find(".proitem_list").eq($(this).index()).show().siblings(".proitem_list").hide();
		jQuery("#" + tempPid + "_item").show();
	});

}
$(function(){
	
	//判断商品的数量，为一行的最后一个商品去除背景
	$(".product_item").each(function(){
		if(($(this).index()+1)%4==0)
		{
			$(this).find(".proitem_spe").hide();
		}
	});	
	
	//鼠标悬浮在商品的数量和商品上时，商品边框颜色变化及父类去除背景
	$(".proitem_line,.proitem_list").hover(
		function(){
			$(this).siblings(".proitem_spe").hide();
			$(this).parent().addClass("proitem_list_hover");					   
		},function(){
			$(this).siblings(".proitem_spe").show();
			$(this).parent().removeClass("proitem_list_hover");
	});
	
	//商品数量和内容的切换
	$(".piline_a").click(function(){
		$(".product_item_img").find(".lazyload").each(function(){
			$(this).attr("src",$(this).attr("original"));
		});
		$(this).addClass("pila_now").siblings(".piline_a").removeClass("pila_now");
		var tempPid = $(this).attr("id");
		$(this).parents(".product_item").find(".proitem_list").eq($(this).index()).show().siblings(".proitem_list").hide();
		jQuery("#" + tempPid + "_item").show();
	});
	loadProductLabel();
})

//关闭加入购物车弹出层
function closeGoToCartLayer(){
	jQuery('#addToCartDiv').hide();
	closeShade();
}

//加载配置规则标签显示
function loadProductLabel(){
	var ids = "";
	$("li[id^='product_item_']").each(function(){
		var productId = $(this).attr("data-productid");
		if(productId != null && productId!= 'undefined' && productId > 0){
			ids+=productId + ",";
		}
    });	
	$("div[class^='tab-content']").each(function(){
		var productId = $(this).attr("data-gzpid");
		if(productId != null && productId!= 'undefined' && productId > 0){
			ids+=productId + ",";
		}
    });	
	
	var ruleiconurl = "/ruleicon/lablelist.do?ids="+ids+"&mid="+mid+"&callback=?";
	jQuery.getJSON(ruleiconurl,function(data){
		var imguri = data.imgurl;
		urilist = imguri.split(",");
		for(var i=0;i<urilist.length;i++){
			var tempurl = urilist[i];
			if(null != tempurl && tempurl.length > 0){
				var imguri = tempurl.split("_");
				if(imguri[0] != null && imguri[0] != 'undefined' && imguri[0] != ''){
				 
				    if($("#product_item_"+imguri).find(".productScore").attr("id") == 'ruleicon'){
				    	var url = $("#product_item_"+imguri).find(".productScore").find("img").attr("src");
						if(imguri[1] != null && imguri[2] != null){
							url = picPrefix + imguri[1];
							//单品折扣6582//品类折扣6583//单品赠品7503//品类赠品7505
							//0为固定金额 1为比例
							if(imguri[2]!=null){
								var typeid = imguri[2];
								var imgcomment = "";
								imgcomment+="<div style='width: auto; height: 24px; padding: 0px 5px; background:url("+ url +");color:#fff;font-family: Microsoft YaHei;'>";
								if(typeid==7602 && imguri[3] != "" && imguri[4] != ""){
									imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>"+imguri[3]+"元"+imguri[4]+"件</span>";
								}
								if(typeid==576608 && imguri[3] != "" && imguri[4] != ""){
									imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>满"+imguri[3]+"免"+imguri[4]+"</span>";
								}
								if(typeid==6582 && imguri[3] != "" && imguri[4] != "" && imguri[5] != ""){
									var chinese = imguri[3];
									if(chinese < 10){
										chinese = convertToChinese(imguri[3]);
									}
									if(imguri[5]==1){
										imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>第"+chinese+"件减"+imguri[4]+"元</span>";
									}
									if(imguri[5]==2){
										if(imguri[4]==5){
											imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>第"+chinese+"件半价</span>";
										}else{
											imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>第"+chinese+"件"+imguri[4]+"折</span>";
										}
									}
								}
								if(typeid==6583 && imguri[3] != "" && imguri[4] != "" && imguri[5] != ""){
									if(imguri[5]==1){
										imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>满"+imguri[3]+"减"+imguri[4]+"</span>";
									}
									if(imguri[5]==2){
										imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>满"+imguri[3]+"打"+imguri[4]+"折</span>";
									}
								}
								if(typeid==7503){
									imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>赠</span>";
								}
								if(typeid==7505 && imguri[3] != ""){
									imgcomment+="<span style='text-align:center;font: 14px/24px 微软雅黑;'>满"+imguri[3]+"赠</span>";
								}
								imgcomment+="</div>";
								//判断是不是混合商品（多件）
								var thelength = $("#"+imguri[0]+"_item").length;
								if(thelength == 1){
									$("#"+imguri[0]+"_item").find(".productScore").html(imgcomment);
								}else{
									var pthelength = $("#product_item_"+imguri[0]).find(".productScore").length;
									if(pthelength ==1 ){ //单件
										$("#product_item_"+imguri[0]).find(".productScore").html(imgcomment);
										$("#product_item_"+imguri[0]).find(".productScore").show();
									}
								}
							}
						}else{
							if(imguri[1] != null && imguri[1] != ''){
								url = picPrefix + imguri[1];
								var imgcomment = "";
								imgcomment+="<img src='"+ url +"'/>";
								$("#product_item_"+imguri[0]).find(".productScore").html(imgcomment);
								$("#product_item_"+imguri[0]).find(".productScore").show();
							}
						}
				    }
					
				
				}
			}
		}
	});
}

//跨境购一件包邮商品
function packetMailToCart(pid,mid){
	var uri = frontPath + "/cart/packetmailtocart.do?id="+pid+"&mid="+mid+"&amount="+1;
	window.location.href = uri;
}