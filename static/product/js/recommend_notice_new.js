/**
 * ����ҳ�����������Ƽ���������Ҫ����ȫ�ֵ�recommend_infosmart.js;recommend_all.js
 * @type 
 */
 
//��ȡ����������
var pid_notice = 0;
function set_mahout_notice_request(pid){
	if($("#rec_notice_list").attr("data-first")  == "y"){
		$("#rec_notice_list").attr("data-first", "n");
		try{
			set_mahout_request_notice(pid);
		}catch(e){
			$(".rec_notice_before").hide();
		//	$(".rec_notice").hide();
			$("#rec_notice").hide();
			$(".subscription_Successfully").css({"border-bottom":"solid 0px #CCCCCC"});
		}
	}
}
//��ȡ����������
function set_mahout_request_notice(pids){
	getRecommend_option("",pids,0);
}
/*
 * ����ҳ���Ƽ�����
 */
function verifyRecommend_topn_notice(pids,isSend){
	var datasource = "";
	if($("#rec_notice_before").length > 0){
		var lists = recommend_topn_notice;
		datasource = "topn";
		if(!lists || !lists.offerIdLists || lists.offerIdLists.length == 0) {
			lists = recommend_buybuy;
			datasource = "buybuy";
		}
		if(!lists || !lists.offerIdLists || lists.offerIdLists.length == 0) {
			lists = recommend_buy;
			datasource = "buy";
		}
		if(!lists || !lists.offerIdLists || lists.offerIdLists.length == 0) {
			lists = recommend_like;
			datasource = "like";
		}
		if(!lists || !lists.offerIdLists || lists.offerIdLists.length == 0) {
			$(".rec_notice_before").hide();
			$("#rec_notice").hide();
			$(".subscription_Successfully").css({"border-bottom":"solid 0px #CCCCCC"});
			return;
		}
		verifyAndExecute(lists,getRecommend_option,recommendforsaleout_notice,{"datasource":datasource,"lists":lists},pids,isSend);
	}
} 

//buybuy
function request_notice_buybuy(pid){
	set_mahout_notice_request(pid);
}

/**
 * ʹ���������Ʒ���˻����� ҳ����Ⱦ
 */
function recommendforsaleout_notice(data, callbackParams){
	if(!valiLoadProductsData(data)){
		$(".rec_notice_before").hide();
	//	$(".rec_notice").hide();
		$("#rec_notice").hide();
		$(".subscription_Successfully").css({"border-bottom":"solid 0px #CCCCCC"});
		return;
	}
	var result=data.result;
	var content="", productid=0, buyPrice="", marketPrice="", onclickStr="", WMPrice="";
	var productid=0,productids="", reccelue="", reccelues="";
	var isSeller = "";
	for(var i=0;i<result.length && i<8;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : +result[i].price.buyPrice.priceValue;
		//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid=result[i].id;
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		isSeller = "";
		if(getIsSeller(result[i])){
			isSeller = "seller";
		}
		onclickStr = "redirectUrlForInfosmart('womai" + isSeller + "',"+pid_notice+",'notice_buybuy','buybuy','" + frontPath + "/Product-" + mid + "-" + productid +".htm', 'true', '"+reccelue+"');";
		content += "<dl style='width:102px;'><dt><a title='" + result[i].title + "' href='javascript:void(0);' onclick=\"" + onclickStr + "\"><img src='" + picPrefix + "/" + result[i].pics.pic100[0] +"' width='100' height='100'/></a></dt>";
		content += "<dd class='title pname'><a href='javascript:void(0);' onclick=\"" + onclickStr + "\">" + cutString(result[i].title,26,'��') +"</a></dd>";
		content += "<dd>��" + buyPrice;
		/* ���������
		if(parseFloat(WMPrice) > parseFloat(buyPrice)){
			content += "&nbsp;<span>��" + WMPrice + "</span>";
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
	set_mahout_rec_rule_fn("womai", pid_notice, "v", "notice_buybuy", "buybuy", reccelues, productids);
	if(result.length>0){
		$("#rec_notice_list").html(content);
		$("#rec_notice_list").attr("data-first","n");
		setBuyStillBuyEvents();
	}
}

//���빺�ﳵ���������Ƽ���Ʒ���������һ���Ч��
function setBuyStillBuyEvents(){
	$(".list_scroll").each(function(){
		$(this).parent().parent(".arrival_Notice").show();
		var dl_width = $(this).find("dl").width();
		dl_width = dl_width>0 ? (dl_width + 6) : 108;
		$(this).parent().parent(".arrival_Notice").hide();
		if($(this).find("dl").length>4)
		{
			$(this).find(".list").width(dl_width*$(this).find("dl").length);
			$(this).siblings(".pop_prev_noclick").show();
			$(this).siblings(".pop_prev").hide();
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
	$(".pop_prev").each(function(){
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

/**
 * �����Ƽ���������
 * @param {} callback	�ص�
 * @param {} proid		��ĿӦ�ñ�ʶ
 * @param {} recid		�Ƽ�Ӧ�ó�����ʶ
 * @param {} offerid	��Ʒ��ʶ�������Ʒ��ʶ��@�ָ�
 * @param {} mid		��ַ��ʶ
 * @param {} count		�Ƽ���Ʒ����
 * @param {} uid		�û���ʶ��û��Ĭ��Ϊ0
 * @param {} categoryid	Ʒ������
 * @param {} isSend		δ�������ݱ��
 */
function newMahout_request_notice(callback,proid,recid,offerid,mid,count,uid,categoryid,isSend){
	var params = {};
	params.proid = proid;
	params.recid = recid;
	params.offerid = offerid;
	params.site = mid;
	params.count = count;
	params.uid = uid;
	params.categoryid = categoryid;
	var url = "http://recommend.womai.com:1108/bRecom-womai/brecom.do?"+ $.param(params) + "&callback=?";
	$.getJSON(url,function(json){
		if(json == "undefined" || json == undefined) return;
		callback(json,offerid,isSend);
	});
}


function getRecommend_option(item_name,pids,isSend){
	newMahout_request_notice(product_callback_option,item_name + "womai",1101,pids,mid,"",0,"",isSend);
}

//�����Ƽ��ص�����
function product_callback_option(json,pids,isSend){
	try{
		parseJson_callback(json,"topn_notice");
		verifyRecommend_topn_notice(pids,isSend);
	}catch(e){}	
}