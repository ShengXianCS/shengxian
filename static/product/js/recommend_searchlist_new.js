var pidArr = pidArr || [];
//��ȡ����������
var recommend_pidArr = recommend_pidArr || [];
function set_mahout_request(){
	if($("#lookandbuy").attr("data-first")  == "y"){
		$("#lookandbuy").attr("data-first", "n");
		try{//ż��mahout_request()δ���ص����ʴ˴����쳣����
			//var pidArr = searchProductIds.split(",");
			var pidArrReal = [];
			for(var i=0; i < recommend_pidArr.length; i++){
				if(i == 5) break;
				pidArrReal.push(recommend_pidArr[i]);
			}
			
			set_mahout_request_new(pidArrReal.join("@"));
		}catch(e){}
	}
}
//��ȡ����������
function set_mahout_request_new(pids){
	recommendObj.buy("",pids,0);
	//recommendObj.like("",pids,0);
	recommendObj.view("",pids,0);
	//����ϲ���滻�ɻ�ȡ�˹�����+����ϲ��+������
	loadLikeProducts();
}
//���˻���У�鼰�Ƿ���Ⱦ
function verifyRecommend_buybuy(pids,isSend){
	verifyAndExecute(recommend_buybuy,recommendObj.buybuy,show_buybuy,{"lists":recommend_buybuy},pids,isSend);
}
//���˻���У�鼰�Ƿ���Ⱦ
function verifyRecommend_buy(pids,isSend){
	verifyAndExecute(recommend_buy,recommendObj.buy,show_lookandbuy,{"lists":recommend_buy},pids,isSend);
}
//����ϲ��У�鼰�Ƿ���Ⱦ
function verifyRecommend_like(pids,isSend){
	verifyAndExecute(recommend_like,recommendObj.like,show_userlike,{"lists":recommend_like},pids,isSend);
}
//���˻�����У�鼰�Ƿ���Ⱦ
function verifyRecommend_view(pids,isSend){
	verifyAndExecute(recommend_view,recommendObj.view,show_lookandlook,{"lists":recommend_view},pids,isSend);
}

function set_mahout_request_buybuy(pid){
	try{
		recommendObj.buybuy("",pid,0);
	}catch(e){
		$("#buyThisStillBuy_before").hide();
	}
}
//buybuy
function request_buybuy(pid){
	set_mahout_request_buybuy(pid);
}
/**
 * �����ùؼ��ֵ��˻�����  ҳ����Ⱦ
 * @param {} data
 */
function show_lookandlook(data, callbackParams){
	if(!valiLoadProductsData(data)){
		return;
	}
	//��ȡ�ĵ�����������
	var result = data.result;
	//�������ڵ���Ʒ
	var content="", productid = 0, buyPrice = "", marketPrice = "", onclickStr = "", WMPrice="";
	var productid=0,productids="", reccelue="", reccelues="";
	var isSeller = "";
	for(var i=0;i<result.length && i<5;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;
		//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid = result[i].id;
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		isSeller = "";
		if(getIsSeller(result[i])){
			isSeller = "seller";
		}
		onclickStr = "redirectUrlForInfosmart('womai" + isSeller + "','"+pageStyle+"list_"+cid+"','" + pageStyle + "list_view','view','" + frontPath + "/Product-" + mid + "-" + productid +".htm', 'true', '"+reccelue+"');";
		content += "<dl><dt><a title='" + result[i].title + "' href='javascript:void(0);' onclick=\"" + onclickStr + "\"><img alt='" + result[i].title + "' src='" + picPrefix + "/" + result[i].pics.pic270[0] +"' width='100' height='100'/></a></dt>";
		content += "<dd class='title pname'><a href='javascript:void(0);' onclick=\"" + onclickStr + "\"><strong>";
		content +="</strong>"+ cutString(result[i].title,30,'��') +"</a></dd>";
		content += "<dd><span>��" + buyPrice + "</span>";
		/* ���������
		if(parseFloat(WMPrice) > parseFloat(buyPrice)){
			content += "&nbsp;<font>��" + WMPrice + "</font>";
		}*/
		content += "</dd></dl>";
		if(i == 0){
			productids = productid;
			reccelues = reccelue;
		}else{
			productids = productids + "|" +  productid;
			reccelues = reccelues + "|" + reccelue;
		}
	}
	//�����Ƽ�-�Ƽ����ݻش�
	var itemtemp = getRecDateForPageStyle();
	set_mahout_rec_rule_fn("womai", itemtemp["itemid"], itemtemp["type"], pageStyle+"list_view", "view", reccelues, productids);
	if(content){
		$("#lookandbuyOther_content").html(content);
		$("#lookandbuyOther_content dl").last().addClass("last");
		$("#lookandbuyOther_box").show();
	}
}
/**
 * �����ùؼ��ֵ������չ�����  ҳ����Ⱦ
 * @param {} data
 */
function show_lookandbuy(data, callbackParams){
	if(!valiLoadProductsData(data)){
		return;
	}
	//��ȡ�ĵ�����������
	var result=data.result;
	var content="", productid = 0, buyPrice = "", marketPrice = "", onclickStr = "", WMPrice="";
	var productid=0,productids="", reccelue="", reccelues="";
	var isSeller = "";
	for(var i=0;i<result.length && i<5;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;
		//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid = result[i].id;
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		isSeller = "";
		if(getIsSeller(result[i])){
			isSeller = "seller";
		}
		onclickStr = "redirectUrlForInfosmart('womai" + isSeller + "','"+pageStyle+"list_"+cid+"','" + pageStyle + "list_buy','buy','" + frontPath + "/Product-" + mid + "-" + productid +".htm', 'true', '"+reccelue+"');";
		content += "<li><dl data-gzpid='"+productid+"' data-ga='lookandbuy_content'><dt id='_gatrack_productlist_pic_"+productid+"'><a title='" + result[i].title + "' href='javascript:void(0);' onclick=\"" + onclickStr + "\"><img alt='" + result[i].title + "' src='" + picPrefix + "/" + result[i].pics.pic270[0] +"' /></a></dt>";
		content += "<dd id='_gatrack_productlist_title_"+productid+"' class='pro-name'><a href='javascript:void(0);' onclick=\"" + onclickStr + "\"><strong>";
		var percent=callbackParams.lists.offerIdRatioMap[productid];
		if(percent){
			content += percent + "%����";
		}
		content +="</strong>"+ cutString(result[i].title,30,'��') +"</a></dd>";
		content += "<dd class='price'>��<span>" + buyPrice + "</span>";
		content += "</dd></dl></li>";
		if(productids == ""){
			productids = productid;
			reccelues = reccelue;
		}else{
			productids = productids + "|" +  productid;
			reccelues = reccelues + "|" + reccelue;
		}
	}
	//�����Ƽ�-�Ƽ����ݻش�
	var itemtemp = getRecDateForPageStyle();
	set_mahout_rec_rule_fn("womai", itemtemp["itemid"], itemtemp["type"], pageStyle+"list_buy", "buy", reccelues, productids);
	if(content){
		$("#lookandbuy_content").html(content);
		$("#lookandbuy_content li").last().addClass("last");
		$("#lookandbuy_box").show();
	}
}

/**
 * �������Ʒ���˻����� ҳ����Ⱦ
 * @param {} data
 */
function show_buybuy(data, callbackParams){
	if(!valiLoadProductsData(data)){
		$("#buyThisStillBuy_before").hide();
		return;
	}
	var result=data.result;
	var content="", productid = 0, buyPrice = "", marketPrice = "", WMPrice="";
	var productid=0,productids="", reccelue="", reccelues="";
	var isSeller = "";
	for(var i=0;i<result.length && i<8;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;
		//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid=result[i].id;
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		isSeller = "";
		if(getIsSeller(result[i])){
			isSeller = "seller";
		}
		onclickStr = "redirectUrlForInfosmart('womai" + isSeller + "','"+pageStyle+"list_"+cid+"','" + pageStyle + "list_buybuy','buybuy','" + frontPath + "/Product-" + mid + "-" + productid +".htm', 'true', '"+reccelue+"');";
		content += "<dl style='width:102px;' data-gzpid='"+productid+"' data-ga='buyThisStillBuy_list'><dt id='_gatrack_productlist_pic_"+productid+"'><a title='" + result[i].title + "' href='javascript:void(0);' onclick=\"" + onclickStr + "\"><img src='" + picPrefix + "/" + result[i].pics.pic270[0] +"' width='100' height='100' alt='" + result[i].title + "'/></a></dt>";
		content += "<dd id='_gatrack_productlist_title_"+productid+"' class='title pname'><a href='javascript:void(0);' onclick=\""+onclickStr+"\">" + cutString(result[i].title,26,'��') +"</a></dd>";
		content += "<dd>��" + buyPrice + "&nbsp;";
		/* ���������
		if(parseFloat(WMPrice) > parseFloat(buyPrice)){
			content += "<span>��" + WMPrice + "</span>";
		}*/
		content += "</dd></dl>";
		if(i == 0){
			productids = productid;
			reccelues = reccelue;
		}else{
			productids = productids + "|" +  productid;
			reccelues = reccelues + "|" + reccelue;
		}
	}
	//�����Ƽ�-�Ƽ����ݻش�
	var itemtemp = getRecDateForPageStyle();
	set_mahout_rec_rule_fn("womai", itemtemp["itemid"], itemtemp["type"], pageStyle+"list_buybuy", "buybuy", reccelues, productids);
	if(content && result.length > 1){
		$("#buyThisStillBuy_list").html(content);
		$("#buyThisStillBuy_list").attr("data-first","n");
		$("#buyThisStillBuy_before").hide();
		$("#buyThisStillBuy").show();
		setBuyStillBuyEvents();
	}
}

/**
 * ����ϲ�� ҳ����Ⱦ
 * @param {} data
 */
function show_userlike(data, callbackParams){
	if(!valiLoadProductsData(data)){
		$("#detail_foot").hide();
		return;
	}
	var detail_foot_listwidth=0;
	var result=data.result;
	var content="", productid = 0, buyPrice = "", marketPrice = "", onclickStr="", WMPrice="";
	var productid=0,productids="", reccelue="", reccelues="";
	var isSeller = "";
	for(var i=0;i<result.length && i<10;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;
		//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid=result[i].id;
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		isSeller = "";
		if(getIsSeller(result[i])){
			isSeller = "seller";
		}
		onclickStr = "redirectUrlForInfosmart('womai" + isSeller + "','"+pageStyle+"list_"+cid+"','" + pageStyle + "list_like','like','" + frontPath + "/Product-" + mid + "-" + productid +".htm', 'true', '"+reccelue+"');";
		content += "<li name='piwik-track-correct-product' data-gzpid='"+productid+"' data-ga='guessyoulike_content'><div class='img' id='_gatrack_guessyoulike_pic_"+productid+"'><a title='" + result[i].title + "' href='javascript:void(0);' onclick=\"" + onclickStr + "\"><img src='" + picPrefix + "/" + result[i].pics.pic270[0] +"' width='100' height='100' alt='" + result[i].title + "'/></a></div>";
		content += "<div class='title' id='_gatrack_guessyoulike_title_"+productid+"'>";
		content += "<div class='price-box'><span class='f_price'><b>��</b>" + buyPrice + "</span></div>";
		content += "<a href='javascript:void(0);' onclick=\""+onclickStr+"\">" + cutString(result[i].title,30,'��') +"</a>";
		content += "</div></li>";
		detail_foot_listwidth +=142;
		if(i == 0){
			productids = productid;
			reccelues = reccelue;
		}else{
			productids = productids + "|" +  productid;
			reccelues = reccelues + "|" + reccelue;
		}
	}
	//�����Ƽ�-�Ƽ����ݻش�
	var itemtemp = getRecDateForPageStyle();
	set_mahout_rec_rule_fn("womai", itemtemp["itemid"], itemtemp["type"], pageStyle+"list_like", "like", reccelues, productids);
	if(content && result.length > 2){
		$("#detail_foot").show();
		$("#guessyoulike_content").html(content);
		$(".detail_foot_list").css('width',detail_foot_listwidth+'px');
		$("#guessyoulike_box").show();
		$("#detail_foot").show();
		setGuessYouLikeEvents();//����ϲ��
	}
	if(result.length > 5){
		$("#huanyihuan").show();
	}
	$("#guessyoulike_content").find('li').live("mouseover",function(){
		$(this).addClass('on');	
	});
	$("#guessyoulike_content").find('li').live("mouseout",function(){
		$(this).removeClass('on');	
	});
}

//����pageStyle��ȡ����ش�����
function getRecDateForPageStyle(){
	var itemtemp = {};
	if(pageStyle == "search"){
   		 //���������б���ȡ������
   		 itemtemp['itemid'] = searchProductIds.split(",").join("@");
   		 itemtemp['type'] = "s";
   	}else if(pageStyle == "sort"){
   		itemtemp['itemid'] = pidArr.join("@");
   		itemtemp['type'] = "p";
   	}else{
   		itemtemp['itemid'] = pidArr.join("@");
   		itemtemp['type'] = "l";
   	}
   	return itemtemp;
}


//����ϲ���滻�ɻ�ȡ�˹�����+����ϲ��+������
function loadLikeProducts(){
	var param = {};
	param.proid = "womai";
	param.recid = 1120;
	param.site = mid;
	param.count = "";
	param.uid = 0;
	param.categoryid = "";
	param.sessionid = $.cookie("JSESSIONID");
	var offerid = "";
	var url = "http://recommend.womai.com:1108/bRecom-womai/brecom.do?"+ $.param(param,true)+ "&offerid=" + offerid + "&callback=?";
	$.getJSON(url,function(json){
		if(json == "undefined" || json == undefined) return;
		var obj = json.data;
		if(!obj){
			return;
		}
		obj.sort(down);
		var pidArrReal = [];
		for(var i = 0; i< obj.length;i++){
			pidArrReal.push(obj[i].offerId);
		}
		
		//ȥ������Ʒ
		var params = {};
		params.ids = pidArrReal.join(",");
		var prices = ["buyPrice","WMPrice","marketPrice","specialPrice"];
		params.prices = prices.join(",");
		params.defData = "n";//�Ƿ���ҪĬ������
		params.mid = mid;
		params.cityid = cityid;
		params.pics = "pic270";
		params.sellable = true;
		params.properties = "title";
		params.usergroupid = usergroupid;
		var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=" + "?";
		$.getJSON(apiUrl, function(data, status) {
			var detail_foot_listwidth=0;
			var result=data.result;
			var content="", productid = 0, buyPrice = "", marketPrice = "", onclickStr="", WMPrice="";
			var productid=0,productids="", reccelue="", reccelues="";
			var isSeller = "";
			for(var i=0;i<result.length && i<10;i++){
				buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;
				//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;
				WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
				productid=result[i].id;
				reccelue = "";
				isSeller = "";
				if(getIsSeller(result[i])){
					isSeller = "seller";
				}
				onclickStr = "redirectUrlForInfosmart('womai" + isSeller + "','"+pageStyle+"list_"+cid+"','" + pageStyle + "list_like','like','" + frontPath + "/Product-" + mid + "-" + productid +".htm', 'true', '"+reccelue+"');";
				content += "<li name='piwik-track-correct-product' data-gzpid='"+productid+"' data-ga='guessyoulike_content'><div class='img' id='_gatrack_guessyoulike_pic_"+productid+"'><a title='" + result[i].title + "' href='javascript:void(0);' onclick=\"" + onclickStr + "\"><img src='" + picPrefix + "/" + result[i].pics.pic270[0] +"' width='100' height='100' alt='" + result[i].title + "'/></a></div>";
				content += "<div class='title' id='_gatrack_guessyoulike_title_"+productid+"'>";
				content += "<div class='price-box'><span class='f_price'><b>��</b>" + buyPrice + "</span></div>";
				content += "<a href='javascript:void(0);' onclick=\""+onclickStr+"\">" + cutString(result[i].title,30,'��') +"</a>";
				content += "</div></li>";
				detail_foot_listwidth +=142;
				if(i == 0){
					productids = productid;
					reccelues = reccelue;
				}else{
					productids = productids + "|" +  productid;
					reccelues = reccelues + "|" + reccelue;
				}
			}
			//�����Ƽ�-�Ƽ����ݻش�
			var itemtemp = getRecDateForPageStyle();
			set_mahout_rec_rule_fn("womai", itemtemp["itemid"], itemtemp["type"], pageStyle+"list_like", "like", reccelues, productids);
			if(content && result.length > 2){
				$("#detail_foot").show();
				$("#guessyoulike_content").html(content);
				$(".detail_foot_list").css('width',detail_foot_listwidth+'px');
				$("#guessyoulike_box").show();
				$("#detail_foot").show();
				setGuessYouLikeEvents();//����ϲ��
			}
			if(result.length > 5){
				$("#huanyihuan").show();
			}
			$("#guessyoulike_content").find('li').live("mouseover",function(){
				$(this).addClass('on');	
			});
			$("#guessyoulike_content").find('li').live("mouseout",function(){
				$(this).removeClass('on');	
			});
		});	
		
	});
}