//获取第三方数据
var pidArr = pidArr || [];
function set_mahout_request(){
	if($("#guessyoulike_box").attr("data-first")  == "y"){
		$("#guessyoulike_box").attr("data-first", "n");
		try{
			var pidArrReal = [];
			for(var i=0; i<pidArr.length; i++){
				if(i == 10) break;
				pidArrReal.push(pidArr[i]);
			}
			set_mahout_request_new(pidArrReal.join("@"));
		}catch(e){}
	}
}
//获取第三方数据
function set_mahout_request_new(pids){
	recommendObj.like_column("",pids,0);
}
//猜你喜欢校验及是否渲染
function verifyRecommend_like_column(pids,isSend){
	verifyAndExecute(recommend_like_column,recommendObj.like_column,show_userlike,{"lists":recommend_like_column},pids,isSend);
}
/**
 * 猜你喜欢  页面渲染
 * @param {} data
 */
function show_userlike(data, callbackParams){
	if(!valiLoadProductsData(data)){
		$("#detail_foot").hide();
		return;
	}
	var detail_foot_listwidth=0;
	var result=data.result;
	var content="", productid = 0, buyPrice = "", marketPrice = "", WMPrice="";
	var productid=0,productids="", reccelue="", reccelues="";
	for(var i=0;i<result.length && i<10;i++){
		buyPrice = result[i].price.buyPrice == undefined ? "" : result[i].price.buyPrice.priceValue;
		//marketPrice = result[i].price.marketPrice == undefined ? "" :" result[i].price.marketPrice.priceValue;
		WMPrice = result[i].price.WMPrice == undefined ? "" : result[i].price.WMPrice.priceValue;
		productid=result[i].id;
		reccelue = callbackParams.lists.offerIdAlgMap[productid];
		onclickStr = "redirectUrlForInfosmart('womai','"+pageStyle+"list_"+cid+"','"+pageStyle+"list_like','like','" + frontPath + "/Product-" + mid + "-" + productid +".htm', 'true', '"+reccelue+"');";
		content += "<dl><dt><a title='" + result[i].title + "' href='javascript:void(0);' onclick=\"" + onclickStr + "\"><img src='" + picPrefix + "/" + result[i].pics.pic100[0] +"' width='100' height='100'/></a></dt>";
		content += "<dd class='title pname'><a href='javascript:void(0);' onclick=\"" + onclickStr + "\">" + cutString(result[i].title,30,'…') +"</a></dd>";
		content += "<dd>￥" + buyPrice + "&nbsp;";
		/* 屏蔽我买价
		if(parseFloat(WMPrice) > parseFloat(buyPrice)){
			content += "<span>￥" + WMPrice + "</span>" ;
		}*/
		content += "</dd></dl>";
		detail_foot_listwidth +=142;
		if(i == 0){
			productids = productid;
			reccelues = reccelue;
		}else{
			productids = productids + "|" +  productid;
			reccelues = reccelues + "|" + reccelue;
		}
	}
	//智能推荐-推荐数据回传
	set_mahout_rec_rule_fn("womai", pageStyle+"list_"+cid, "v", pageStyle+"list_like", "like", reccelues, productids);
	if(content && result.length > 2){
		$("#detail_foot").show();
		$("#guessyoulike_content").html(content);
		$(".detail_foot_list").css('width',detail_foot_listwidth+'px');
		$("#guessyoulike_box").show();
		$("#detail_foot").show();
		setGuessYouLikeEvents();
	}
}
$(function(){
	setTimeout(set_mahout_request,1000);
});