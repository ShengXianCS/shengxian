//��ȡ����������
function set_mahout_request(){
	try{//ż��mahout_request()δ���ص����ʴ˴����쳣����
		var itemsid = jQuery.cookie("ViewHistory");
		if(itemsid){
			var itemsidArr = itemsid.split(",");
			var itemsidArrReal = [];
			for(var i=0; i<itemsidArr.length; i++){
				if(i == 10) break;
				if(itemsidArr[i] != 0){
					itemsidArrReal.push(itemsidArr[i]);
				}
			}
			set_mahout_request_new(itemsidArrReal.join("@"));
		}
	}catch(e){}
}
//��ȡ����������
function set_mahout_request_new(pids){
	recommendObj.like("",pids,0);
}
//����ϲ��У�鼰�Ƿ���Ⱦ
function verifyRecommend_like(json,pids,isSend){
	if(isSend == 0 && (!recommend_like || !recommend_like.offerIdLists || recommend_like.offerIdLists.length <= 0)){
		recommendObj.like("",pids,1);//���·�������
	}else if(recommend_like && recommend_like.offerIdLists && recommend_like.offerIdLists.length > 0){
		//���ؼ۸�
		loadProducts(show_userlike, {"lists":recommend_like},recommend_like.offerIdLists, mid, "pic150", 0, ["buyPrice","WMPrice","marketPrice"], "title", [],"true");
	}
}
/**
 * ����ϲ�� ҳ����Ⱦ
 * @param {} data
*/
function show_userlike(data, callbackParams){
	if(!valiLoadProductsData(data)){
		return;
	}
	var detail_foot_listwidth=0;
	var result = data.result;
	var content="", picPath="", productUrl="", onclickStr="", buyPrice="", marketPrice="", WMPrice=""
	var productid=0,productids="", reccelue="", reccelues="";
	var isSeller = "";
	for(var i=0;i<result.length && i<10;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;//�����
		//marketPrice = result[i].price.marketPrice == undefined ? "" : result[i].price.marketPrice.priceValue;//�г���
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid = result[i].id;//��ƷID
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		picPath = result[i].pics.pic150[0];
		picPath = picPrefix + (picPath == null ? 'notfound150.gif' : picPath);
		productUrl = frontPath + "/Product-" + mid + "-" + productid + ".htm";
		isSeller = "";
		if(getIsSeller(result[i])){
			isSeller = "seller";
		}
		onclickStr = "redirectUrlForInfosmart('womai" + isSeller + "','member','member_like','like','" + productUrl +"', 'true', '"+reccelue+"')";
		content += "<dl><dt><a title='" + result[i].title + "' href='javascript:void(0);' onclick=\"" + onclickStr + "\"><img src='" + picPath +"' width='100' height='100'/></a></dt>";
		content += "<dd class='title pname'><a href='javascript:void(0);' onclick=\"" + onclickStr + "\">" + cutString(result[i].title,30,'��') +"</a></dd>";
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
	set_mahout_rec_rule_fn("womai", "member", "v", "member_like", "like", reccelues, productids);
	if(content){
		var detail_foot_adv_obj = $("#detail_foot").find(".lazyload");
		detail_foot_adv_obj.attr("src",detail_foot_adv_obj.attr("original"));
		$(".detail_foot").css('margin-top','10px');
		$("#detail_foot").show();
		$("#guessyoulike_content").html(content);
		$(".detail_foot_list").css('width',detail_foot_listwidth+'px');
		$("#guessyoulike_box").show();
		setGuessYouLikeEvents();
	}
}