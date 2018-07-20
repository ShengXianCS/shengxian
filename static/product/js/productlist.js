//��ط���
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

//�����Ƽ�
$(function(){
	$(".list_r_first_a .list_r_son").last().addClass("no_background");
})
/*ɸѡ������ begin  modify by lihongyao and muchunfeng 20140716 */  
//Ʒ��չ������ 
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
//	var brand = ","; // �Ѿ�ѡ���Ʒ�ƣ�eg: ",brand1,brand2,brand,"
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
	/*�ж� select �ĸ���*/
	 if(classL > 0){
		$(" a.no-sure ").hide();
		$(" a.sure ").show();
	}else{
		$(" a.no-sure ").show();
		$(" a.sure ").hide();
	}

	/*���� ���� ��ѡ ȡ��*/
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
// Ʒ��չ������  ��ѡ
$(function(){
	bransShowInit();
})
/*ɸѡ������ end */

//��Ʒ�б���Ч
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
//����allcolumns��ֵ
function setAllColVal(){
	var brandId = $("#brand").val();
	handleRecommend(brandId);
}
//ɸѡ�����Ը�ֵ
function searchQueryListByAttr(showAttrName,showAttrValue){
	$("#"+showAttrName).val(showAttrValue);
	setAllColVal();
	$("#productListForm").submit();
}
//��ɸѡ���Ե���¼�
function delectSelAttr(attrName){
	$("#"+attrName).val("");
	if("brand"==attrName){
		$("#brand").val("0");
	}
	setAllColVal();
	$("#productListForm").submit();
}
//ɸѡ����
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
//�б�ҳ���(��������۸����)
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
	params.defData = "n";//�Ƿ���ҪĬ������
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
			itemPriceDiv = "���޼۸�";
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
			specialPrice = result[i].price.specialPrice == undefined ? "" :"��" + result[i].price.specialPrice.priceValue;
			if(specialPrice != ""){
				$("#" + saleIcon + pid).show();
				$("#" + saleIcon + "s_" + pid).show();
			}
			if(buyPrice != ""){
				itemPriceDiv = "<b>￥</b>" + buyPrice;
				/* ���������
				if(parseFloat(WMPrice) > parseFloat(buyPrice)){
					itemPriceDiv += "<span>��" + WMPrice + "</span>";
				}*/
			}
			
			$("#" + itemPrice + pid).html(itemPriceDiv);
			$("#" + itemPrice + "s_" + pid).html(itemPriceDiv);
			
			//�ж���Ʒ�Ƿ���һ��������Ʒ
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
				//��Ʒ��
				$("#isGift_" + pid).removeClass("product_item_icon_1").addClass("product_item_icon_3");
				$("#isSales_" + pid).removeClass("product_item_icon_2").addClass("product_item_icon_3");
				//��ϵ�
				$("#isGifts_" + pid).removeClass("product_item_icon_1").addClass("product_item_icon_3");
				$("#isSaless_" + pid).removeClass("product_item_icon_2").addClass("product_item_icon_3");
			}
		}
	});
}
//�����Ʒ����״̬
function LoadSellableForProductList(buyDivId,soldOutDivId,id,isGift,isSales){
	var buyDiv = jQuery("#" + buyDivId + "" + id);
	var soldOutDiv = jQuery("#" + soldOutDivId + "" + id);
	var url = priceServer + "/sellable.do?id=" + id +"&mid=" + mid + "&cityid=" + cityid + "&callback=?";
	jQuery.getJSON(url,
		function(data){
			if(data != null && data != ""){
				if(data.sellable){
					//��Ʒ��
					if(isGift){jQuery("#isGift_" + id).show();}
					if(isSales){jQuery("#isSales_" + id).show();}
					//��ϵ�
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
//�ö���Ʒ����
function handleRecommend(brand){
	if (typeof(brand) != "undefined") {
		if(typeof(brand) != "number"){
			if (brand != -1) {
				brand = brand.replace(",0", "");
			}
		}
		if(brand != -1 && brand.length > 2) { // ������������0���͡�����-1��
			brand = brand.substring(1,brand.length - 1);
			$("#allcolums").attr("name","allcolums").val($("#Cid").val() + "," + brand);
		} else {
			$("#allcolums").attr("name","");
		}
	} else {
		$("#allcolums").attr("name","");
	}
}
//��ҳ��ѯ
function queryListByPage(page){
	$("#page").val(page);
	handleRecommend($("#brand").val());
	$("#productListForm").submit();
}
//�����ѯ
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
//�첽���������¼-------�÷��������������¼�����
function setViewHistoryShow(){
	var paramsTT = new Object();
	paramsTT["randomT"] = Math.random();
	paramsTT["mid"] = mid;
	if($("#viewHistory").attr("data-first") == 'y'){
		$("#viewHistory").attr("data-first","n");
	  	$("#viewHistory").load(frontPath + "/" + webIndex + "/ProductList/viewHistory.do",paramsTT);
	}
}
//��������¼
function clearHistory() {
	jQuery.cookie("ViewHistory","",{path:'/'});
	var temp = "<div class='left_title_2'>�����������Ʒ<div class='empty_list' onclick=\"clearHistory();\"><a href='javascript:;'>���</a></div></div><div class='noproduct'>����ʱû����������κ���Ʒ</div>"
	$("#viewHistory").html(temp);
}
//��ʾ����������Ʒ
$(function stor_hotRecommond(){
	jQuery("#relationWeekHotSellDiv").hide();
	var ids = jQuery("#idTimes").val();
	if(ids != ''){
		loadProducts(show_HotRecommond, null,ids, mid, "pic100", 0, ["buyPrice","marketPrice"], "title", [],"true");
		jQuery("#hotRecommendDiv").show();
	}
})
//������Ʒ��ʾ�۸�
function show_HotRecommond(data){
	if(!valiLoadProductsData(data)){
		return;
	}
	var result=data.result;
	var content="", productid = 0, buyPrice = "", marketPrice = "";
	for(var i=0;i<result.length && i<3;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : "��"+result[i].price.buyPrice.priceValue;//�����
		marketPrice = result[i].price.marketPrice == undefined ? "" :"��"+ result[i].price.marketPrice.priceValue;//�г���
		productid=result[i].id;//��ƷID
		content += "<div class='list_r_son'>"
		content += "	<div class='list_r_son_1'>"
		content += "		<a href='" + frontPath + "/Product-" + mid + "-" + productid + ".htm' title='" + result[i].title + "' target='_blank'>"
		content += "			<img src='" + picPrefix + "/" + result[i].pics.pic100[0] + "' width='100' height='100'/>"
		content += "		</a>"
		content += "	</div>"
		content += "	<div class='list_r_son_r'>"
		content += "		<div class='list_r_son_tit'><a href='" + frontPath + "/Product-" + mid + "-" + productid + ".htm' title='" + result[i].title + "' target='_blank'>" + cutString(result[i].title,30,'��') + "</a></div>"
		content += "		<div class='list_r_son_price'>" + buyPrice + "</div>"
		content += "		<div class='list_r_son_btn'><div class='buybtn' onclick='topIsGoToCart(" + productid + "," + mid + ");'>��Ҫ��</div></div>"
		content += "	</div>"
		content += "</div>"
	}
	if(content){
		$(".list_r_first_a").html(content);
	}
}
//����ϲ��
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
//���������ͼƬlazyload/
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
//�����Ƽ����빺�ﳵ
function topIsGoToCart(id,mid){
	$(".siteinfo:first").css("z-index","1000");
	isGoToCart(id,mid);
	showShade();
	$("#addToCartDiv").show();
	$(".buy_pop").fadeIn();
}
//ˢ�µ�ǰҳ��(��ɸѡ����)
function refreshWithOutParams(){
	var url = frontPath + "/" + webIndex + "/ProductList.do?mid=" + mid + "&Cid=" + $("#Cid").val();
	window.location = url;
}
/**
 * ���빺�ﳵ�ɹ���ִ�е��¼����б�ҳ
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
		if(mid == 500){  //����վĿǰû�������Ƽ�����    ��������  20151130
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
//���빺�ﳵ���������Ƽ���Ʒ���������һ���Ч��
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
//��ʼ���¼�
$(function (){
	//��������ҳ�Ĺ������¼�����������
	function setScrollEnvent(){
		topFixed();	//base.js�����½�������
		setViewHistoryShow();
		setLeftAdvImgLazyLoad();
	}
	//ע��������¼�
	window.onscroll=setScrollEnvent,window.resize=setScrollEnvent,setScrollEnvent();
});

//�б�ҳ��Ʒ��ҳ����һ��  ��ʾ������
$(function relationWeekHotSell(){
	var ids = jQuery("#relationWeekHotSellIds").val();
	if(ids){
		loadProducts(show_brandHotSell, null,ids, mid, "pic60", 0, ["buyPrice","WMPrice","marketPrice"], "title", [],"true");
		jQuery("#relationWeekHotSellDiv").show();
	}
})
//�б�ҳ��Ʒ��ҳ����һ��  ��������ʾ�۸�
function show_brandHotSell(data){
	if(!valiLoadProductsData(data)){
		return;
	}
	var result=data.result;
	var content="", productid = 0, buyPrice = "", marketPrice = "", sourceid = "", WMPrice="";
	content += "<h3>" + columnName + "����������</h3>"
	content += "<div id='relationWeekHotSell' data-first='y' class='con'>"
	content += "<ul style='display: block;'>"
	for(var i=0;i<result.length && i<6;i++){
		var forthird=""
		sourceid = urlSourceIds[0] == null ? '1089' : urlSourceIds[0];
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;//�����
		//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;//�г���
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid=result[i].id;//��ƷID
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
		content += "				<a href='" + frontPath + "/Product-" + mid + "-" + productid + ".htm' title='" + result[i].title + "' target='_blank' onclick='clickUrl(" + productid + "," + mid + "," + sourceid + "," + targetPageId + "," + actionId + ")'>" + cutString(result[i].title,42,'��') + "</a>"
		content += "			</div>"
		content += "			<div class='price'>��<span>" + buyPrice + "</span></div>";
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
//Ʒ��ҳ������ת
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
 * 	��̬��Ӽ�����ǩ
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
	
	var contents="<span class='"+pila_now+"'>"+amount+"��<i></i></span>";
	//var contents="<a id='pamount_" + pId + "' href='javascript:void(0);' class='piline_a " + pila_now + "'>" + amount + "��</a>";
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
	//�ж���Ʒ��������Ϊһ�е����һ����Ʒȥ������
	$(".product_item").each(function(){
		if(($(this).index()+1)%4==0)
		{
			$(this).find(".proitem_spe").hide();
		}
	});	
	
	//�����������Ʒ����������Ʒ��ʱ����Ʒ�߿���ɫ�仯������ȥ������
	$(".proitem_line,.proitem_list").hover(
		function(){
			$(this).siblings(".proitem_spe").hide();
			$(this).parent().addClass("proitem_list_hover");					   
		},function(){
			$(this).siblings(".proitem_spe").show();
			$(this).parent().removeClass("proitem_list_hover");
	});
	
	//��Ʒ���������ݵ��л�
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
	
	//�ж���Ʒ��������Ϊһ�е����һ����Ʒȥ������
	$(".product_item").each(function(){
		if(($(this).index()+1)%4==0)
		{
			$(this).find(".proitem_spe").hide();
		}
	});	
	
	//�����������Ʒ����������Ʒ��ʱ����Ʒ�߿���ɫ�仯������ȥ������
	$(".proitem_line,.proitem_list").hover(
		function(){
			$(this).siblings(".proitem_spe").hide();
			$(this).parent().addClass("proitem_list_hover");					   
		},function(){
			$(this).siblings(".proitem_spe").show();
			$(this).parent().removeClass("proitem_list_hover");
	});
	
	//��Ʒ���������ݵ��л�
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

//�رռ��빺�ﳵ������
function closeGoToCartLayer(){
	jQuery('#addToCartDiv').hide();
	closeShade();
}

//�������ù����ǩ��ʾ
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
							//��Ʒ�ۿ�6582//Ʒ���ۿ�6583//��Ʒ��Ʒ7503//Ʒ����Ʒ7505
							//0Ϊ�̶���� 1Ϊ����
							if(imguri[2]!=null){
								var typeid = imguri[2];
								var imgcomment = "";
								imgcomment+="<div style='width: auto; height: 24px; padding: 0px 5px; background:url("+ url +");color:#fff;font-family: Microsoft YaHei;'>";
								if(typeid==7602 && imguri[3] != "" && imguri[4] != ""){
									imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>"+imguri[3]+"Ԫ"+imguri[4]+"��</span>";
								}
								if(typeid==576608 && imguri[3] != "" && imguri[4] != ""){
									imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>��"+imguri[3]+"��"+imguri[4]+"</span>";
								}
								if(typeid==6582 && imguri[3] != "" && imguri[4] != "" && imguri[5] != ""){
									var chinese = imguri[3];
									if(chinese < 10){
										chinese = convertToChinese(imguri[3]);
									}
									if(imguri[5]==1){
										imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>��"+chinese+"����"+imguri[4]+"Ԫ</span>";
									}
									if(imguri[5]==2){
										if(imguri[4]==5){
											imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>��"+chinese+"�����</span>";
										}else{
											imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>��"+chinese+"��"+imguri[4]+"��</span>";
										}
									}
								}
								if(typeid==6583 && imguri[3] != "" && imguri[4] != "" && imguri[5] != ""){
									if(imguri[5]==1){
										imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>��"+imguri[3]+"��"+imguri[4]+"</span>";
									}
									if(imguri[5]==2){
										imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>��"+imguri[3]+"��"+imguri[4]+"��</span>";
									}
								}
								if(typeid==7503){
									imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>��</span>";
								}
								if(typeid==7505 && imguri[3] != ""){
									imgcomment+="<span style='text-align:center;font: 14px/24px ΢���ź�;'>��"+imguri[3]+"��</span>";
								}
								imgcomment+="</div>";
								//�ж��ǲ��ǻ����Ʒ�������
								var thelength = $("#"+imguri[0]+"_item").length;
								if(thelength == 1){
									$("#"+imguri[0]+"_item").find(".productScore").html(imgcomment);
								}else{
									var pthelength = $("#product_item_"+imguri[0]).find(".productScore").length;
									if(pthelength ==1 ){ //����
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

//�羳��һ��������Ʒ
function packetMailToCart(pid,mid){
	var uri = frontPath + "/cart/packetmailtocart.do?id="+pid+"&mid="+mid+"&amount="+1;
	window.location.href = uri;
}