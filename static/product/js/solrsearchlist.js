/**�����б�ҳɸѡ��  ��������ʼ*/
//�ύ��
function searchPLFormSubmit(){
	var selAttr = $("#selAttr").val();
	if(selAttr == ''){
		var selVal = $("#selCol").val();
		if(selVal == ''){
			$("#mainColumnId").val('');
		}else{
			var cid = $("#Cid").val();
			if(cid == selVal){
				$("#mainColumnId").val('');
			}
		}
	}
	solrSearchPro('ajaxrightshow');
}
//ɾ����ѡƷ��  modify by lihongyao 20140716 Ʒ��ɸѡ��֧�ֶ�ѡ
function deleteBrand(){
	$("#brand").val("-1");
	$('.selected-item .closeBrand').live('click',function(){
		 var j = $(this).parent('.selected-item').attr('data-value'); // ��ȡ�����رյ�ɸѡ��������
		 var z = $(this).parent('.selected-item').attr('data-item');
		
		 var selected_len = $('.selected-item').length;
		 var l_list = $('.screener-cont').find('.l-list');
		 
		 // �ж�ɸѡ�����Ƿ�����
		 if (selected_len>1) {
			$('.screener-title').find('.reset').show(); 
		 } else {
			$('.screener-title').find('.reset').hide(); 
			$('.addsymbols').hide();
		 }
		 //�ر����� ɸѡ��
		 if (z!="") {
			 $('.other').find('.other-list').eq(z).show();
			  $('.other').find('.other-list').removeClass('other-list-cur');
		 } 
		 $(this).parent().remove();
		 l_list.eq(j).show();
		 l_list.eq(j).find('dt').height(l_list.eq(j).find('dd').height()); 
		 l_list.find('.ul1').removeClass('hidden').addClass('more');
		 l_list.find('.ul2').removeClass('more').addClass('hidden');
	})
	appendTex();
	handleRecommend("-1");
	searchPLFormSubmit();
}
//�жϵ�ǰ��������Ƿ�Ϊ0
function emptyListResult(){
	var listNum = $("#showAttrDiv").attr("listnum");
	if(listNum == '0'){
		return true;
	}else{
		return false;
	}
}
//�����ѡ������������
function addShowAttr(innerName,outerName){
	var newSelAttr = "";
	var selAttrs = $("#selAttr").val();
	if(selAttrs == ""){
		if(outerName != ''){
			selAttrs = innerName+":"+outerName;
		}
	}else if(selAttrs.indexOf(innerName+":") == -1){
		if(outerName != ''){
			selAttrs += "---"+innerName+":"+outerName;
		}
	}else if(selAttrs.indexOf("---") == -1){
		if(outerName != ''){
			selAttrs = innerName+":"+outerName;
		}else{
			selAttrs = '';
		}
		
	}else{
		var selAttAry = selAttrs.split("---");
		for(var i=0;i<selAttAry.length;i++){
			var kw = selAttAry[i];
			var attrKW = kw.split("\:");
			if(innerName == attrKW[0]){
				if(outerName != ''){
					if(newSelAttr.length > 0){
						newSelAttr += "---";
					}
					newSelAttr += innerName +":"+outerName;
				}
			}else{
				if(newSelAttr.length > 0){
					newSelAttr += "---";
				}
				newSelAttr += kw;
			}
		}
		selAttrs = newSelAttr;
	}
	$("#selAttr").val(selAttrs);
}

//�Զ�չ����ǰ��������˵�
$(function(){
	if(showParId != ''){
		$("#naviListCSub"+showParId).parent().show();
		var pid = $("#naviListCSub"+showParId).attr("parentId");
		$("#nlcii"+pid).css({"background-position":"0px 0px"});
	}
});

//JavaScript Document
$(function(){
	
	//���˵� ��һ������Ϊ��
	$(".navListCItem").eq(0).css({"background":"none"});
	
	//�����ʾ�Ӳ˵�����ͼ��
	$(".navListCItemIco").click(function(){
		
		var i=$(".navListCItemIco").index(this);
		
		if($(".navListCSubItem").eq(i).is(":visible")){
			$(this).css({"background-position":"0 -23px"});
			$(".navListCSubItem").eq(i).hide();
		}else{
			$(this).css({"background-position":"0 0"});
			$(".navListCSubItem").eq(i).show();
		};
		
	});
});
//ɸѡ�����Ը�ֵ
function searchQueryListByAttr(showAttrName,showAttrValue){
	showAttrValue = $.trim(showAttrValue);
	showAttrName = $.trim(showAttrName);
	$("#"+showAttrName).val(showAttrValue);
	addShowAttr(showAttrName,showAttrValue);
	handleRecommend($("#brand").val());
	searchPLFormSubmit();
}
//��ɸѡ���Ե���¼�
function delectSelAttr(attrName){
	$("#"+attrName).val("");
	var selAttrs = $("#selAttr").val();
	if(selAttrs != ''){
		if(selAttrs.indexOf("---") == -1){
			selAttrs = "";
		}else{
			var selAttAry = selAttrs.split("---");
			var newSelAttr = "";
			for(var i=0;i<selAttAry.length;i++){
				var kw = selAttAry[i];
				var attrKW = kw.split("\:");
				if(attrName != attrKW[0]){
					if(newSelAttr.length > 0){
						newSelAttr += "---";
					}
					newSelAttr += kw;
				}
			}
			selAttrs = newSelAttr;
		}
		$("#selAttr").val(selAttrs);
	}
	handleRecommend($("#brand").val());
	searchPLFormSubmit();
}
//ɸѡ����
function delectAllSelAttr(){
    $(".screener_body_i_yx").find("span[class='screener_input_text']").each(function(){
    	var selAttrName = $(this).attr("innername");
    	$("#"+selAttrName).val("");
    	if(selAttrName == 'brand'){
    		$("#brand").val("-1");
    	}
    });
    handleRecommend($("#brand").val());
    $("#selAttr").val("");
    searchPLFormSubmit();
}
//��ҳ��ѯ
function searchQueryListByPage(page){
	$("#page").val(page);
	handleRecommend($("#brand").val());
	searchPLFormSubmit();
}
//��ȡ������
function getFormJson(formid) {
	var o = {};
	var a = $("#"+formid).serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}
/*����ҳ��ƥ��ķ���ɸѡ ajax�첽ɸѡ*/
function searchQueryListByMainColumnId(id){
	$('.crumbs-nav').find('.searchsubcolumn').html($('#'+id+'_column').html() + '<i></i>');
	$("#mainColumnId").val(id);
	$("#showAttrDiv").find("input").each(function(){
		$(this).val("");
	});
	$("#selAttr").val("");
	$("#Cid").val("606");
	$("#selCol").val(id);
	$("#brand").val("-1");
	handleRecommend($("#brand").val());
	solrSearchPro('ajaxrightshow');
	//addClassToColumn(id);
	//$("#searchProductListForm").submit();
}
function addClassToColumn(id){
	$(".navListC").find("ul li").each(function(index){
		$(this).find(".selectCol").each(function(index){
			$(this).removeClass("selectCol");
		});
	});
	$("#navsub"+id).addClass("selectCol");
	var pid = $("#naviListCSub"+id).attr("parentId");
	$("#"+pid+"_column").addClass("selectCol");
}
function addClassToPColumn(id){
	$(".navListC").find("ul li").each(function(index){
		$(this).find(".selectCol").each(function(index){
			$(this).removeClass("selectCol");
		});
	});
	$("#"+id+"_column").addClass("selectCol");
}
function pageAjaxReq(url){
	var $width = $('.product-list').css('left');
	$.ajax({
		url: url,
		type: 'post',
		data: {"ajaxprolist":"1"},
		success: function(data){
		    $("#ajaxrightshow").html(data);
		    $("#ajaxscreening").html($("#ajaxscreeningForCopy").html());
			$("#ajaxscreeningForCopy").html("");
			//ɸѡ����ʽ����
			$('.screener-cont li').each(function() {
				var list_height = $(this).find('dd').height();
				$(this).find('dt').height(list_height);
		    });
		    $('.product-list').css({left: $width});
		    //���¼����б�ҳ�ĸ߶� start
		    var product_list_h = $('.product-list').outerHeight();
			var sort_h = $('.sort').outerHeight()-45;
			$('.main-r').height(product_list_h+sort_h);
			//���¼����б�ҳ�ĸ߶� end
		    loadProImage();
		    proamountEvent();
		    initLazyloadParams();
		    loadProductLabel();
	    }
	});
	var site_navTop = $('.site_nav').offset().top;
	var main_ltop = $('.main-l').offset().top;
	var listTop = site_navTop + main_ltop;
	$("html,body").animate({scrollTop:listTop},300);
}
/*function solrSearchPro(flag){
	var dataPara = getFormJson("searchProductListForm");
	dataPara[flag] = '1';
	var splfrom = $("#searchProductListForm");
	$.ajax({
		url: splfrom.attr('action'),
		type: 'post',
		data: dataPara,
		success: function(data){
			if(flag == 'ajaxrightshow'){
				$("#ajaxrightshow").html(data);
				bransShowInit();
			}else if(flag == 'ajaxprolist'){
				$("#showResult").html(data);
			}
			loadProImage();
			proamountEvent();
			if($('.unfold-sidebar').is(':hidden')) {
				$('.product-list').css({left: '-120px'});
			} else {
				$('.product-list').css({left: '0'});
			}
	    }
	});
}*/
function loadProImage(){
	var prolist = $(".product_list");
	prolist.find(".lazyload").each(function(index){
		var ori = $(this).attr("original");
		$(this).attr("src",ori);
	});
}
function setPid(id){
	addClassToPColumn(id);
	$("#showAttrDiv").find("input").each(function(){
		$(this).val("");
	});
	$("#selAttr").val("");
	
	if(id == '-2'){
		$("#Cid").val(606);
		$("#mainColumnId").val("0");
	}else{
		$("#Cid").val(606);
		var subs = $("#"+id+"_column").attr("subs");
		$("#mainColumnId").val(subs);
	}
	
	$("#selCol").val(id);
	$("#brand").val("-1");
	handleRecommend($("#brand").val());
	
	$('.crumbs-nav').find('.searchsubcolumn').html('����' + '<i></i>');
	var classa = $('#' + id + '_column').text();
	var data = $('#' + id + '_sub').html();
	$('.searchcolumn').html(classa + '<i></i>');
	$('.crumbs-nav').find('.other-list-sub').remove();
	$('.crumbs-nav').find('.other-list-sub-i').remove();
	$('.crumbs-nav').append('<div class="other-list other-list-sub fl clearfix">' + data + '</div><i class="other-list-sub-i">&gt;</i>');
	solrSearchPro('ajaxrightshow');
}
//�����ѯ
function searchQueryListOrderBy(id,brand,brandName,brandOuterName){
	$("#brandName").val(brandName);
	$("#brandName").show();
	handleRecommend(brand);
	$("#brand").val(brand);
	if(id != 0){
		var obj = $("#" + id);
		var orderBy = obj.attr("data-orderby");
		if("sort-price price-hover" == obj.attr("class")){
			$("#orderBy").val("");
		}else{
			$("#orderBy").val(orderBy);
		}
	}
	searchPLFormSubmit();
}

// add by lihongyao 20140716 Ʒ��ɸѡ��֧�ֶ�ѡ
function searchQueryListOrderByMulti(id,brands,brandName,brandOuterName){
	$("#brandName").val(brandName);
	$("#brandName").show();
	handleRecommend(brands);
	$("#brand").val(brands);
	if(id != 0){
		var obj = $("#" + id);
		var orderBy = obj.attr("data-orderby");
		if("select" == obj.parent().attr("class")){
			$("#orderBy").val("");
		}else{
			$("#orderBy").val(orderBy);
		}
	}
	searchPLFormSubmit();
}
//�����ѯ
function queryListOrderByPrice(id,brand){
	var obj = $("#" + id);
	var orderBy = obj.attr("data-orderby");
	$("#orderBy").val(orderBy);
	handleRecommend(brand);
	searchPLFormSubmit();
}
//����������
function queryListBySpecialOrSellable(sid,brand){
	var value = $("#" + sid).val();
	if(value != 1){
		$("#" + sid).val("1");
	}else{
		$("#" + sid).val("");
	}
	if (typeof(brand) != "undefined") {
		if (brand != -1) {
			brand = brand.replace(",0", "");
		}
		if(brand != -1 && brand.length > 2) { // ������������0���͡�����-1��
			brand = brand.substring(1,brand.length - 1);
			$("#allcolums").attr("name","allcolums").val($("#Cid").val() + "," + brand);
		} else {
			$("#allcolums").attr("name","noneColums");
		}
	} else {
		$("#allcolums").attr("name","noneColums");
	}
	searchPLFormSubmit();
	try{//1111��������
		if(sid == 'activity'){
			double_tenth();
		}
	}catch(e){}
}
//��Ӫ������ֱ����Ʒɸѡ
function queryListBySeller(sellerId,brand){
	//˫�� ��ͬ��ȡ�� by rong
	if($("#sellerId").val() != "" && $("#isFlgCross").val() !=1 && $("#sellerId").val() == sellerId){
		$("#sellerId").val("");
	}else{
		$("#sellerId").val(sellerId);
	}
	$("#isFlgCross").val("");
	if (typeof(brand) != "undefined") {
		if (brand != -1) {
			brand = brand.replace(",0", "");
		}
		if(brand != -1 && brand.length > 2) { // ������������0���͡�����-1��
			brand = brand.substring(1,brand.length - 1);
			$("#allcolums").attr("name","allcolums").val($("#Cid").val() + "," + brand);
		} else {
			$("#allcolums").attr("name","noneColums");
		}
	} else {
		$("#allcolums").attr("name","noneColums");
	}
	searchPLFormSubmit();
}
//�羳��
function queryListByFlgCross(sellerId,brand){
	//˫�� ��ͬ��ȡ�� by rong
	if($("#isFlgCross").val() == 1){
		$("#isFlgCross").val("");
		$("#sellerId").val("");
	}else{
		$("#isFlgCross").val(1);
		$("#sellerId").val(sellerId);
	}
	if (typeof(brand) != "undefined") {
		if (brand != -1) {
			brand = brand.replace(",0", "");
		}
		if(brand != -1 && brand.length > 2) { // ������������0���͡�����-1��
			brand = brand.substring(1,brand.length - 1);
			$("#allcolums").attr("name","allcolums").val($("#Cid").val() + "," + brand);
		} else {
			$("#allcolums").attr("name","noneColums");
		}
	} else {
		$("#allcolums").attr("name","noneColums");
	}
	searchPLFormSubmit();
}
/**������*/
function searchCheckTopSearchForm(){
	var keyword = jQuery("#searchProductListKeywords").val();
	var key = ",title,mer_title,mer_title_,brand,cloumnName,keyword,keywords,articleRuleTitle,activeName,ProductFeatures";
	if(keyword != "" && keyword.indexOf(key) == -1){
		keyword += key;
	}
	jQuery("#searchProductListKeywords").val(jQuery.trim(keyword));
}
/**�����б�ҳɸѡ��  ����������*/
/**�����б�ҳ�ײ���������ʼ*/
function checkSearchListForm(){
	var keyword = jQuery("#searchListKeywordsText").val();
	var key = ",title,mer_title,mer_title_,brand,cloumnName,keyword,keywords,articleRuleTitle,activeName,ProductFeatures";
	if(keyword != "" && keyword.indexOf(key) == -1){
		keyword += key;
	}
	jQuery("#searchListKeywords").val(jQuery.trim(keyword));
}
/**�����б�ҳ�ײ�����������*/

//���ҳ(��������۸����)
function LoadSearchListProductPrice(itemPrice,saleIcon,stCount){
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
	var prices = ["buyPrice","marketPrice","WMPrice","specialPrice"];
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
		var buyDiv = "",soldOutDiv = "";
		var buyPrice = "", marketPrice = "",specialPrice = "",itemPriceDiv = "", WMPrice = "";
		for(var i = 0;i < result.length;i++){
			pid = result[i].id;
			buyDiv = $("#" + stCount + "item_buy_" + pid);
			soldOutDiv = $("#" + stCount + "item_soldout_" + pid);
			buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;
			WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
			specialPrice = result[i].price.specialPrice == undefined ? "" :"��" + result[i].price.specialPrice.priceValue;
			if(specialPrice != ""){
				$("#" + saleIcon + "_" + pid).show();
			}
			if(buyPrice != ""){
				itemPriceDiv = "��" + buyPrice + "&nbsp;&nbsp;";
			}
			
			$("#" + itemPrice + "_" + pid).html(itemPriceDiv);
			if(result[i].sellable == true){
				buyDiv.show();
			}else{
				soldOutDiv.show();
				$("#isGift_" + pid).removeClass("product_item_icon_1").addClass("product_item_icon_3");
				$("#isSales_" + pid).removeClass("product_item_icon_2").addClass("product_item_icon_3");
			}
		}
	});
}



//�������ҳ��Ч
$(function(){
	$(".sr2cont_list").each(function(){
		$(this).hover(function(){
			$(this).addClass("product_item_hover2");			   
		},function(){
			$(this).removeClass("product_item_hover2");
		})
	})
})


/**
 * �������ҳ
 * δ������������ҳ��
 * ������ʾĳ���ؼ��֡�
 */
function SearchHighlight(idVal,keyword){
	var pucl = jQuery("#" + idVal);
	if("" == keyword) return;
	var temp=pucl.html();
	var htmlReg = new RegExp("\<.*?\>","i"); 
	var arrA = new Array(); 
	//�滻HTML��ǩ 
	for(var i=0;true;i++){
		var m=htmlReg.exec(temp); 
		if(m){
			arrA[i]=m;
		}else{
			break;
		}
		temp=temp.replace(m,"{[("+i+")]}");
	}
	
	words = unescape(keyword.replace(/\+/g,' ')).split(/\s+/);
	//�滻�ؼ��� 
	for (w=0;w<words.length;w++){
		var r = new RegExp("("+words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&")+")","ig");
		temp = temp.replace(r,"<span style='color:#FF6633;'>$1</span>");
	}
	//�ָ�HTML��ǩ 
	for(var i=0;i<arrA.length;i++){
		temp=temp.replace("{[("+i+")]}",arrA[i]);
	}
	pucl.html(temp);
}

//�ײ���������¼�
function clsSearch(id){
	var $this = $("#" + id);
	var keyword = $("#searchProductListKeyword").val();
	if(!keyword || keyword == ""){
		$this.val("");
	}else{
		var text = "";
		var b = keyword.indexOf('��');
		if(b >= 0){
			var e = keyword.lastIndexOf('��');
			text = keyword.slice(b+1, e);
		}else{
			text = keyword;
		}
		if(text != ""){
			$this.val(text);
		}
	}
}
/**ʧȥ����*/
function resSearch(id){
	var obj = jQuery("#" + id)[0];
	if(obj.value == ""){
		obj.value = obj.attributes["data-defvalue"].value;
		obj.style.color = "#999";
	}
	jQuery("#" + id).attr("data-defvalue", jQuery("#" + id).val()); 
}

/**
 * 	��̬��Ӽ�����ǩ
 * */
function emptyaddAmount(amount,pId,proamount,stcount){
	var pila_now = "";
	if(amount == undefined || amount == ""){
		amount = 1;
		//pila_now = "pila_now";
		pila_now = "active";
	}
	if(amount == getAmount()){
		$("#" + stcount + "proamount_" + proamount).find(".piline_a2").removeClass("pila_now");
		pila_now = "pila_now";
		cShowAmount(pId);
	}
	var contents="<span class='"+pila_now+"'>"+amount+"��<i></i></span>";
	//var contents="<a id='pamount_" + pId + "' href='javascript:void(0);' class='piline_a2 " + pila_now + "'>" + amount + "��</a>";
	jQuery("#" + stcount + "proamount_" + proamount).append(contents);
}

//���ҳ��ʾ��Ʒ
function cShowAmount(tempPid){
	var am = jQuery("#proamount_" + tempPid);
	jQuery("#" + tempPid + "_item").siblings(".product_item2").hide();
	jQuery("#" + tempPid + "_item").show();
}

$(function(){
	//�����������Ʒ����������Ʒ��ʱ����Ʒ�߿���ɫ�仯������ȥ������
	$(".proitem_line2,.product_item2").hover(
		function(){
			$(this).siblings(".proitem_spe").hide();
			$(this).parent().addClass("proitem_list_hover");		   
		},function(){
			$(this).siblings(".proitem_spe").show();
			$(this).parent().removeClass("proitem_list_hover");
	});
	//��Ʒ���������ݵ��л�
	$(".piline_a2").click(function(){
		$(this).addClass("pila_now").siblings(".piline_a2").removeClass("pila_now");
		var tempPid = $(this).attr("id");
		$(this).parents(".sr2cont_list").find(".product_item2").eq($(this).index()).show().siblings(".product_item2").hide();
		jQuery("#" + tempPid + "_item").show();
	});
})
/*����ҳͷ������*/
function checkSearchPLForm(){
	$('#searchlistform').submit();
}
/*�б�ҳͷ������*/
function checkProductListForm(){
	$("#searchProductListKeywords").val($('#searchProductListValue').val());
	var keyword = jQuery("#searchProductListKeywords").val();
	var key = ",title,mer_title,mer_title_,brand,cloumnName,keyword,keywords,articleRuleTitle,activeName,ProductFeatures";
	if(keyword != "" && keyword.indexOf(key) == -1){
		keyword += key;
	}
	searchPLFormSubmit();
}