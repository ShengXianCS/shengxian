//��ȡ����������
function set_mahout_request(){
	//��ֱ����Ʒ����ʱ���β���ϲ������Ʒ
	//var sellerId = $(".hover_li").attr("data-sellerid");
	var type = $(".current").attr("data-type");
	if(type != 1 && type != 2)return;//Ŀǰֻ����ͨ�����ʹ��ﳵ�в���ϲ��
	try{//ż��mahout_request()δ���ص����ʴ˴����쳣����
		var curObj = $(".order_contents:visible"),
		productids_fresh = curObj.find("input[name='productids_fresh']").val(),
		productids_notfresh = curObj.find("input[name='productids_notfresh']").val(),
		itemsidtemp = "";
		switch(Number(type)){
			case 1:
				itemsidtemp = productids_notfresh;
				break;
			case 2:
				itemsidtemp = productids_fresh;	//����
				break;
			default:
				itemsidtemp = productids_notfresh;
				break;
		}
		itemsid = trimComma(itemsidtemp);
		if(!itemsid)itemsid = $.cookie("ViewHistory");
		var itemsidArr = itemsid.split(",");
		var itemsidArrReal = [];
		for(var i=0; i<itemsidArr.length; i++){
			if(i == 10) break;
			if(itemsidArr[i] != 0){
				itemsidArrReal.push(itemsidArr[i]);
			}
		}
		if(itemsid){
			//var product_request_params = "product_call_back@womai@like@0.9@0@15@" + itemsidArrReal.join(":") + "@cart_like";//:buybuy
			/*if(parseFloat(sellerId) > 0){  
				serverDomain = sellerServer;
				//���ǲ���ֱ�͹��ﳵ����ȡ200�����ݣ����ڰ��̼ҹ���
				product_request_params = "product_call_back@womaiseller@like@0.9@0@200@" + itemsidArrReal.join(":") + "@cart_like";
			}*/
			//mahout_request(product_request_params);
			set_mahout_request_new(itemsidArrReal.join("@"),type);
		}
	}catch(e){}
}
//��ȡ����������
function set_mahout_request_new(pids,isFresh){
	if(isFresh == 2){
		recommendObj.like_column("",pids,0);
	}else{
		newMahout_request(product_callback_like,"womai",1108,pids,mid,"",getUniqueUserId(),"",0,1);
	}
}
//����ϲ����ͨ��У�鼰�Ƿ���Ⱦ
function verifyRecommend_like(pids,isSend){
	var cartMid = $(".orna_cont .hover_li").attr("data-mid");
	if(isSend == 0 && (!recommend_like || !recommend_like.offerIdLists || recommend_like.offerIdLists.length <= 0)){
		recommendObj.like("",pids,1);//���·�������
	}else if(recommend_like && recommend_like.offerIdLists && recommend_like.offerIdLists.length > 0){
		//���ؼ۸�
		loadProducts(show_userlike, {"lists":recommend_like,"mid":cartMid},recommend_like.offerIdLists, cartMid, "pic150", 0, ["buyPrice","WMPrice","marketPrice"], "title", ["self_sellerId","self_isFresh","self_sellerType"],"true");
	}
}
//����ϲ�����ʳ�У�鼰�Ƿ���Ⱦ
function verifyRecommend_like_column(pids,isSend){
	var cartMid = $(".orna_cont .hover_li").attr("data-mid");
	if(isSend == 0 && (!recommend_like_column || !recommend_like_column.offerIdLists || recommend_like_column.offerIdLists.length <= 0)){
		recommendObj.like_column("",pids,1);//���·�������
	}else if(recommend_like_column && recommend_like_column.offerIdLists && recommend_like_column.offerIdLists.length > 0){
		//���ؼ۸�
		loadProducts(show_userlike, {"lists":recommend_like_column,"mid":cartMid},recommend_like_column.offerIdLists, cartMid, "pic150", 0, ["buyPrice","WMPrice","marketPrice"], "title", ["self_sellerId","self_isFresh","self_sellerType"],"true");
	}
}
function cartlikeContentinit(){	//����ϲ�����ݳ�ʼ��
	var content = "";
	content += '<div class="goods_list">';
	content += '<div class="golist_content">';
	content += '<span class="pub_span listcont_prew"></span><span class="pub_span prew_noclick"></span>';
	content += '<span class="pub_span listcont_next"></span><span class="pub_span next_noclick"></span>';
	content += '<span class="pages">1/2</span>';
	content += '<span class="blank_span bs_left"></span><span class="blank_span bs_right"></span>';
	content += '<div class="hidden_content">';
	content += '<ul class="listcon_ul"></ul>';
	var curObj = $(".order_contents:visible").find(".relationLookAndBuy");
	curObj.html(content).hide();
}

/**
 * ��ʾ����ϲ��ģ��ҳ��������Ⱦ
 * @param {} data
 */
function show_userlike(data, callbackParams){
	var cartMid = callbackParams.mid;
	if(!valiLoadProductsData(data)){
		return;
	}
	var count = 0;
	var sellerId = $(".hover_li").attr("data-sellerid");
	var type = $(".hover_li").attr("data-type");
	var isFresh = "false";
	if(type == 2){
		isFresh = "true";
	}
	var result = data.result;
	var content="", picPath="", productUrl="", onclickStr="", buyPrice="",WMPrice="", marketPrice="", serverDomain="", self_sellerId="", self_isFresh="", self_sellerType="";
	var productid=0,productids="", reccelue="", reccelues="";
	content += '<div class="goods_list">';
	content += '<div class="golist_content">';
	content += '<span class="pub_span listcont_prew"></span><span class="pub_span prew_noclick"></span>';
	content += '<span class="pub_span listcont_next"></span><span class="pub_span next_noclick"></span>';
	content += '<span class="pages">1/2</span>';
	content += '<span class="blank_span bs_left"></span><span class="blank_span bs_right"></span>';
	content += '<div class="hidden_content">';
	content += '<ul class="listcon_ul">';
	for(var i=0;i<result.length && i<10;i++){
		self_sellerId = result[i].attribute.self_sellerId.self_sellerId == undefined ? "0" : result[i].attribute.self_sellerId.self_sellerId;
		self_isFresh = result[i].attribute.self_isFresh.self_isFresh == undefined ? "false" : result[i].attribute.self_isFresh.self_isFresh;
		self_sellerType = result[i].attribute.self_sellerType.self_sellerType == undefined ? "0" : result[i].attribute.self_sellerType.self_sellerType;
		if(sellerId){
			if(sellerId != self_sellerId && self_sellerType && self_sellerType == 1) {
				continue;	//�����̼�
			}
			if(isFresh != self_isFresh) {
				continue;	//�����Ƿ�����,���뵱ǰ���ﳵ���������ʱ��ƴ����Ʒ��
			}
		}
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;//�����
		marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;//�г���
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid = result[i].id;//��ƷID
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		picPath = result[i].pics.pic150[0];
		picPath = picPrefix + (picPath == null ? 'notfound150.gif' : picPath);
		productUrl = serverDomain + frontPath + "/Product-" + cartMid + "-" + productid + ".htm";
		onclickStr = "redirectUrlForInfosmart('womai','cart','cart_like','like','" + productUrl +"', 'true', '"+reccelue+"')";
		content += '<li>';
		content += '<div class="product_content">';
		content += '<a href="javascript:' + onclickStr + ';" class="pocon_a" id="_gatrack_productlist_listpic_'+productid+'" data-ga="tocart_relationLookAndBuy"><img src="' + picPath + '" alt='+result[i].title+'/></a>';
		content += '<a href="javascript:' + onclickStr + ';" class="pocon_title" title="' + result[i].title + '">' + cutString(result[i].title,38,'��') + '</a>';
		content += '<p class="pocon_price">��' + buyPrice;
		/* ���������
		if(parseFloat(WMPrice) > parseFloat(buyPrice)){
			content += '<span>��' + WMPrice + '</span>';
		}*/
		content += '</p><p class="pocon_button"><a id="lookandbuy_'+productid
				+'" data-itemid="'+productid+'"  data-sourcerule="'+reccelue
				+'" data-sourcemethod="like" data-sourcepos="cart_like" data-sourceid="cart" data-projectid="womai"  onclick="mahout_fg_rec_fn_wrapper($(this));isGoToCart(' + productid + ',' + cartMid + ');isGoToCartWait(\'lookandbuy_'+productid+'\');" class="pcb_a"><span>���빺�ﳵ</span></a></p>';
		content += '</div>';
		content += '</li>';
	
		count ++;
		if(i == 0){
			productids = productid;
			reccelues = reccelue;
		}else{
			productids = productids + "|" +  productid;
			reccelues = reccelues + "|" + reccelue;
		}
	}
	//�����Ƽ�-�Ƽ����ݻش�
	set_mahout_rec_rule_fn("womai", "cart", "g", "cart_like", "like", reccelues, productids);
	content += '</ul>';
	if(count > 0){
		var curObj = $(".order_contents:visible").find(".relationLookAndBuy");
		curObj.html(content);//curObj.show().find(".listcon_ul").append(content);
		setRelationProdsEvents("relationLookAndBuy");
	}
}

// ���ﳵ--����ϲ��--���
function setcart_mahout_request(){
	try{
		//ż��mahout_request()δ���ص����ʴ˴����쳣����
		var curObj = $(".order_contents:visible"); // ��ȡ�ɼ��Ĺ��ﳵ����Ԫ��
		var productids_fresh = curObj.find("input[name='productids_fresh']").val(); //��ȡ������Ʒids
		var productids_notfresh = curObj.find("input[name='productids_notfresh']").val(); //��ȡ��ͨ��Ʒids
		var itemsidtemp = "";
		// ƴ����Ʒids
		itemsidtemp = productids_notfresh;
		itemsidtemp = itemsidtemp + productids_fresh;
		itemsid = trimComma(itemsidtemp);
		if(!itemsid)itemsid = $.cookie("ViewHistory");
		var itemsidArr = itemsid.split(",");
		var itemsidArrReal = []; //��Ʒids����
		for(var i=0; i<itemsidArr.length; i++){
			if(i == 10) break;
			if(itemsidArr[i] != 0){
				itemsidArrReal.push(itemsidArr[i]);
			}
		}
		if(itemsid){
			//$('.goods_list').show();
			set_mahout_request_cart(itemsidArrReal.join("@"));
		}
	}catch(e){}
}
// ���ﳵ--����ϲ��--���͵�����
function set_mahout_request_cart(pids){
	newMahout_request(product_callback_like_cart,"womai",1108,pids,mid,"",getUniqueUserId(),"",0,1);
}
// ���ﳵ--����ϲ��--�ص�����
function product_callback_like_cart(json,pids,isSend){
	try{
		parseJson_callback(json,"like");
		verifyRecommend_like_cart(pids,isSend);
	}catch(e){}
}
// ���ﳵ--����ϲ��--У�鼰�Ƿ���Ⱦ
function verifyRecommend_like_cart(pids,isSend){
	var cartMid = $(".order_nav .hover_li").attr("data-mid");
	if(isSend == 0 && (!recommend_like || !recommend_like.offerIdLists || recommend_like.offerIdLists.length <= 0)){
		//set_mahout_request_cart(pids);//���·�������
	}else if(recommend_like && recommend_like.offerIdLists && recommend_like.offerIdLists.length > 0){
		//���ؼ۸�
		loadProducts(show_userlike_cart, {"lists":recommend_like,"mid":cartMid},recommend_like.offerIdLists, cartMid, "pic150", 0, ["buyPrice","WMPrice","marketPrice"], "title", ["self_sellerId","self_isFresh","self_sellerType"],"true");
	}
}
// ���ﳵ--����ϲ��--��Ⱦ
function show_userlike_cart(data, callbackParams){
	var cartMid = callbackParams.mid;
	if(!valiLoadProductsData(data)){
		return;
	}
	var count = 0;
	var sellerId = $(".hover_li").attr("data-sellerid");
	var type = $(".hover_li").attr("data-type");
	var isFresh = "false";
	if(type == 2){
		isFresh = "true";
	}
	var result = data.result;
	var content="", picPath="", productUrl="", onclickStr="", buyPrice="",WMPrice="", marketPrice="", serverDomain="", self_sellerId="", self_isFresh="", self_sellerType="";
	var productid=0,productids="", reccelue="", reccelues="";
	content += '<div class="golist_content">';
	content += '<div class="hidden_content">';
	content += '<ul class="listcon_ul">';
	for(var i=0;i<result.length && i<5;i++){
		self_sellerId = result[i].attribute.self_sellerId.self_sellerId == undefined ? "0" : result[i].attribute.self_sellerId.self_sellerId;
		self_isFresh = result[i].attribute.self_isFresh.self_isFresh == undefined ? "false" : result[i].attribute.self_isFresh.self_isFresh;
		self_sellerType = result[i].attribute.self_sellerType.self_sellerType == undefined ? "0" : result[i].attribute.self_sellerType.self_sellerType;
		if(sellerId){
			if(sellerId != self_sellerId && self_sellerType && self_sellerType == 1) {
				continue;	//�����̼�
			}
			if(isFresh != self_isFresh) {
				continue;	//�����Ƿ�����,���뵱ǰ���ﳵ���������ʱ��ƴ����Ʒ��
			}
		}
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;//�����
		marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;//�г���
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid = result[i].id;//��ƷID
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		picPath = result[i].pics.pic150[0];
		picPath = picPrefix + (picPath == null ? 'notfound150.gif' : picPath);
		productUrl = serverDomain + frontPath + "/Product-" + cartMid + "-" + productid + ".htm";
		onclickStr = "redirectUrlForInfosmart('womai','cart','cart_like','like','" + productUrl +"', 'true', '"+reccelue+"')";
		content += '<li>';
		content += '<div class="product_content">';
		content += '<a href="javascript:' + onclickStr + ';" class="pocon_a" id="_gatrack_productlist_listpic_'+productid+'" data-ga="recommendlike" data-gzpid="'+productid+'"><img src="' + picPath + '" alt='+result[i].title+'/></a>';
		content += '<a href="javascript:' + onclickStr + ';" class="pocon_title" title="' + result[i].title + '" id="_gatrack_productlist_listtitle-'+productid+'">' + cutString(result[i].title,38,'��') + '</a>';
		content += '<p class="pocon_price">��' + buyPrice;
		/* ���������
		if(parseFloat(WMPrice) > parseFloat(buyPrice)){
			content += '<span>��' + WMPrice + '</span>';
		}*/
		content += '</p><p class="pocon_button"><a id="lookandbuy_'+productid
				+'" data-itemid="'+productid+'"  data-sourcerule="'+reccelue
				+'" data-sourcemethod="like" data-sourcepos="cart_like" data-sourceid="cart" data-projectid="womai"  onclick="mahout_fg_rec_fn_wrapper($(this));isGoToCart(' + productid + ',' + cartMid + ');isGoToCartWait(\'lookandbuy_'+productid+'\');" class="pcb_a"><span>���빺�ﳵ</span></a></p>';
		content += '</div>';
		content += '</li>';
		count ++;
		if(i == 0){
			productids = productid;
			reccelues = reccelue;
		}else{
			productids = productids + "|" +  productid;
			reccelues = reccelues + "|" + reccelue;
		}
	}
	//�����Ƽ�-�Ƽ����ݻش�
	set_mahout_rec_rule_fn("womai", "cart", "g", "cart_like", "like", reccelues, productids);
	content += '</ul></div></div>';
	if(count > 2){
		$('.recommendlike').addClass('current').show();	 // չʾ����ϲ��
		$('.goods_list').show(); // չʾ��߿�
		$('.lastfavor').removeClass('current');
		var curObj = $(".order_contents:visible").find(".golist_all");
		curObj.html(content);  //curObj.show().find(".listcon_ul").append(content);
		setRelationProdsEvents_cart('golist_all');
		// ���ﳵ--����ղ�--����
		set_lastfavor();
	}
}

//���ﳵ--����ϲ��--�����ͣЧ��
function setRelationProdsEvents_cart(className){
	var curObj =  $(".order_contents:visible").find("." + className);
	curObj.find(".listcon_ul li").hover(function() {
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
}

// ���ﳵ--����ղ�--����
function set_lastfavor(){
	var current = $(".hover_li");
	var curTab = current.attr("data-tab")==null ? 1 : current.attr("data-tab");
	var params = {};
	params.mid = mid;
	params.t = Math.random();
	$.post(frontPath + "/cart/lastFavor.do",params,function(data){
		if(data){
			var ids = trimComma(data);
			loadProducts(show_lastfavor_cart, {"mid" : mid , "ids" : ids , "curTab" : curTab}, ids , mid, "pic150", 0, ["buyPrice","WMPrice","marketPrice"], "title", ["self_sellerId","self_isFresh","self_sellerType"],"true");
		}else{
			/*
			// ����û�û�е�¼������û���ղأ���ʾ��ҳ��
			var content="";
			content += '<div class="golist_content">';
			content += '<div class="hidden_content">';
			content += '<ul class="listcon_ul">';
			content += '</ul></div></div>';
			var curObj = $(".order_contents:visible").find(".golist_all");
			curObj.append(content);
			// ��ʾ����ղأ���������
			$('.golist_all').find('.golist_content').eq(0).show().siblings('.golist_content').hide();
			*/
		}
	});
}
// ���ﳵ--����ղ�--��Ⱦ
function show_lastfavor_cart(data, callbackParams){
	var cartMid = callbackParams.mid;
	var curTab = callbackParams.curTab;
	if(typeof(curTab) == "undefined"){
		curTab = 1;
	}
	if(!valiLoadProductsData(data)){
		/*
		// ����û�û�е�¼������û���ղأ���ʾ��ҳ��
		var content = "";
		content += '<div class="golist_content">';
		content += '<div class="hidden_content">';
		content += '<ul class="listcon_ul">';
		content += '</ul></div></div>';
		var curObj = $('#loadshowcart' + curTab).find(".golist_all");
		curObj.append(content);
		$('#loadshowcart' + curTab).find('.golist_content').eq(0).show().siblings('.golist_content').hide();
		*/
		return;
	}
	var count = 0;
	var result = data.result;
	var content="", picPath="", productUrl="", onclickStr="", buyPrice="",WMPrice="", marketPrice="", serverDomain="", self_sellerId="", self_isFresh="", self_sellerType="";
	var productid=0,productids="", reccelue="", reccelues="";
	content += '<div class="golist_content">';
	content += '<div class="hidden_content">';
	content += '<ul class="listcon_ul">';
	for(var i=0;i<result.length && i<5;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;//�����
		marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;//�г���
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid = result[i].id;//��ƷID
		reccelue = callbackParams.ids[productid];
		picPath = result[i].pics.pic150[0];
		picPath = picPrefix + (picPath == null ? 'notfound150.gif' : picPath);
		productUrl = serverDomain + frontPath + "/Product-" + cartMid + "-" + productid + ".htm";
		onclickStr = "redirectUrlForInfosmart('womai','cart','cart_like','like','" + productUrl +"', 'true', '"+reccelue+"')";
		content += '<li>';
		content += '<div class="product_content">';
		content += '<a href="javascript:' + onclickStr + ';" class="pocon_a" id="_gatrack_productlist_listpic_'+productid+'" data-ga="lastfavor" data-gzpid="'+productid+'"><img src="' + picPath + '" alt='+result[i].title+'/></a>';
		content += '<a href="javascript:' + onclickStr + ';" class="pocon_title" title="' + result[i].title + '" id="_gatrack_productlist_listtitle-'+productid+'">' + cutString(result[i].title,38,'��') + '</a>';
		content += '<p class="pocon_price">��' + buyPrice;
		/* ���������
		if(parseFloat(WMPrice) > parseFloat(buyPrice)){
			content += '<span>��' + WMPrice + '</span>';
		}*/
		content += '</p><p class="pocon_button"><a id="lookandbuy_'+productid
				+'" data-itemid="'+productid+'"  data-sourcerule="'+reccelue
				+'" data-sourcemethod="like" data-sourcepos="cart_like" data-sourceid="cart" data-projectid="womai"  onclick="mahout_fg_rec_fn_wrapper($(this));isGoToCart(' + productid + ',' + cartMid + ');isGoToCartWait(\'lookandbuy_'+productid+'\');" class="pcb_a"><span>���빺�ﳵ</span></a></p>';
		content += '</div>';
		content += '</li>';
		count ++;
		if(i == 0){
			productids = productid;
			reccelues = reccelue;
		}else{
			productids = productids + "|" +  productid;
			reccelues = reccelues + "|" + reccelue;
		}
	}
	content += '</ul></div></div>';
	if(count > 0){
		$('.lastfavor').show();	 // չʾ����ղ�
		$('.goods_list').show(); // չʾ����ղ� ��߿�
		var curObj = $('#loadshowcart' + curTab).find(".golist_all");
		curObj.append(content);
		setRelationProdsEvents_cart('golist_all');
		$('#loadshowcart' + curTab).find('.golist_content').eq(0).show().siblings('.golist_content').hide();
	}
}