/**
 * 第三方智能推荐用的通用方法，
 * 
 * @type 
 */

var undefined;
var itemPercents = {};	//推荐数据的购买百分比集合对象

function parseFpgGetBuy(max,parse) {
	var result=[], tempList=[];
	for(var i=0; i<max; i++){
		tempList = parse.fpgGetBuy(i)["list"];
		if(tempList){
			for(var j=0; j<tempList.length; j++){
				result.push(tempList[j]);
			}
		}
	}
	return result;
}

function parseFpgGetView(max,parse) {
	var result=[], tempList=[];
	for(var i=0; i<max; i++){
		tempList = parse.fpgGetView(i)["list"];
		if(tempList){
			for(var j=0; j<tempList.length; j++){
				result.push(tempList[j]);
			}
		}
	}
	return result;
}

/**
 * 根据parse.XXX获取商品id集合
 * @param {} list 	经过具体访问参数值由第三方获得的数据，经一次转换后此处为商品id数组，以对象属性形式传入
 * @param {} max	具体到实参，决定某个展位最初的商品id数量
 * @return {}
 */
function parseItems(list, max) {
	var result = [];
	if(list == undefined)
		return result;
	if(max == undefined)
		max = list.length;
	for(var i=0; i<list.length && i<max; i++)
		if(list[i] && list[i].itemid){
			result.push(list[i].itemid);
		}
	return result;
}

/**
 * 根据参数parse.XXX获取该推荐的各个商品的需要数据,并将结果集返回
 * 数据结构：{"id1":{"label":"v","m":"avg","scroe":"0.12"},"id2":{"label":"v","m":"avg","scroe":"0.22"}}
 * @param {} list
 * @param {} max		具体到实参，决定某个展位最初的商品id数量
 * @param {} listsparam	需要将传入的对象拼接在本次对象结果里一同返回
 */
function parseLists(list, max, listsparam) {
	var lists = listsparam ? listsparam : {};
	if(list == undefined)
		return lists;
	if(max == undefined)
		max = list.length;
	var item = {};	//每一项对象
	for(var i=0; i<list.length && i<max; i++){
		if(list[i] && list[i].itemid){
			//存在商品id
			item["label"] = list[i].label;
			item["m"] = list[i].m;
			item["score"] = list[i].score;
			lists[ list[i].itemid ] = item;
			item = {};//手动置空
		}
	}
	return lists;
}

/**
 * 根据参数parse.XXX获取该推荐的各个商品的百分比数据,并将结果集存储在itemPercents中
 * itemPercents[商品id]=百分比值
 * @param {} list
 */
function parsePercents(list){
	if ( list == undefined )
		return;
	for(var i=0; i<list.length; i++){
		if(list[i] && list[i].itemid && list[i].score){
			itemPercents[ list[i].itemid ] = ((isNaN(list[i].score) ? 0 : list[i].score) * 100).toFixed(2);
		}
	}
}

/**
 * 在计算百分比方法后调用本方法，获取相关推荐的商品百分比数据
 * @param {} id
 * @return {Number}
 */
function getPercent(id) {
	if ( itemPercents == undefined || id == undefined || itemPercents[id] == undefined)
		return 0;
	return itemPercents[id];
}

try {
	usergroupid
} catch (e) {
	usergroupid = -1;
}
/**
 * 根据参数条件加载商品信息 
 * @param {} callback
 * @param {} callbackParams
 * @param {} ids
 * @param {} mid
 * @param {} pics
 * @param {} picType
 * @param {} prices
 * @param {} properties
 * @param {} attribute
 * @param {} sellable
 */
function loadProducts(callback, callbackParams, ids, mid, pics, picType, prices, properties, attribute,sellable) {
	if(typeof ids == 'undefined') return;
	if(ids.length == 0) return;
	if(callback == undefined) return;
	if(mid == undefined || isNaN(mid)) mid = 0;
	if(pics == undefined) pics = "pic40";
	if(picType == undefined) picType = "0";
	if(sellable == undefined) sellable = "true";
	if(Object.prototype.toString.apply(ids) != "[object Array]") ids = [ids];
	if(Object.prototype.toString.apply(pics) != "[object Array]") pics = [pics];
	if(Object.prototype.toString.apply(prices) != "[object Array]" && prices != null) prices = [prices];
	if(Object.prototype.toString.apply(properties) != "[object Array]" && properties != null) properties = [properties];
	if(Object.prototype.toString.apply(attribute) != "[object Array]" && attribute != null) attribute = [attribute];
	if(null != sellable) sellable = sellable;
	if(usergroupid == -1){
		usergroupid = 100;
		var userinfo = jQuery.cookie("userinfo");
		if(userinfo != null && userinfo.indexOf("|") != -1){
			var userinfoArray = userinfo.split("|");
			usergroupid = userinfoArray[3];
		}
	}
	
	//拼接参数发送请求
	var params = {};
	params.usergroupid = usergroupid;
	params.ids = ids.join(",");
	params.mid = mid;
	params.cityid = cityid;
	params.picType = picType;
	params.sellable = sellable;
	if(null != properties && properties.length > 0)
		params.properties = properties.join(",");
	if(null != attribute && attribute.length > 0)
		params.attribute = attribute.join(",");
	if(null != pics && pics.length > 0)
		params.pics = pics.join(",");	
	if(null != prices && prices.length > 0)
		params.prices = prices.join(",");
	
	var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=?";
	$.getJSON(apiUrl, function(data, status) {
		if(callbackParams && callbackParams.isSpecified && callbackParams.specifiedId){//参数符合必要条件
			if(!valiLoadProductsData(data)){
				return;
			}
			var result = data.result;
			if(result){
				//层层过滤有数据则继续
				var params = {};
				params.cid = callbackParams.specifiedId;
				params.mid = mid;
				params.page= 1;
				params.cityid= cityid;
				//特殊分类的所有商品数据，只获取了前1000个, 多余1000的不予考虑
				params.pageSize = 1000;
				var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=?";
				$.getJSON(apiUrl, function(data4Specified, callbackParams) {
					if(!valiLoadProductsData(data4Specified)){
						return;
					}
					var resultInSpecifiedColumn = [];//属于特殊分类的商品对象数组
					var result4Specified = data4Specified.result;
					var allpids = [];//全部商品id数组
					for(var j=0;j<result4Specified.length;j++){
						allpids[j]=result4Specified[j].id;
					}
					//过滤数据
					for(var i=0; i<result.length; i++){
						if($.inArray(result[i].id,allpids) >= 0){
							resultInSpecifiedColumn.push(result[i]);
						}
					}
					//向下兼容取法
					callback({"result":resultInSpecifiedColumn}, callbackParams);
				});
			}
		}else{
			callback(data, callbackParams);
		}
	});
}

//校验回调函数data有效性
function valiLoadProductsData(data){
	if(data == undefined || data.result == undefined
		|| Object.prototype.toString.apply(data.result) != "[object Array]"
		|| data.result.length == 0)
		return false;
	return true;
}

//记录智能推荐行为并跳转商品详情页
function redirectUrlForInfosmart(projectId,sourceid,sourcepos,sourcemethod,url,newWindow,sourcecelue) {
	if(arguments.length == 6){
		sourcecelue = "-";
	}
	mahout_rec_rule_cookie(projectId,sourceid,sourcepos,sourcemethod,sourcecelue);
	setTimeout(function(){
		if(newWindow)
			window.open(url);
		else
			location.href=url ;
	},300);
}

//为了检测当前页面可直接购买的推荐位商品信息，所有直接加入购物车需要调用此方法。
function mahout_fg_rec_fn_wrapper($obj){
	try{
		var projectId = $obj.attr("data-projectid"),
			sourceid = $obj.attr("data-sourceid"),
			sourcepos = $obj.attr("data-sourcepos"),
			sourcemethod = $obj.attr("data-sourcemethod"),
			sourcerule = $obj.attr("data-sourcerule"),
			itemid = $obj.attr("data-itemid");
			mahout_fg_rec_fn(projectId,sourceid,sourcepos,sourcemethod,sourcerule,itemid);
			//mahout_fg_rec_fn(projectId,sourceid,sourcepos,sourcemethod,itemid);
		//alert(projectId+"; "+sourceid+"; "+sourcepos + ";" + sourcemethod +"; "+ sourcerule+"; "+itemid);
	}catch(e){}
}

// 格式化标题
function htmlTextFormat(text) {
	var temp = replaceAll(text, "\r\n", "");
	temp = replaceAll(temp, "<br>", "");
	temp = replaceAll(temp, "<p>", "");
	temp = replaceAll(temp, "</p>", "");
	temp = replaceAll(temp, "&ldquo;", "“");
	temp = replaceAll(temp, "&rdquo;", "”");
	temp = replaceAll(temp, "&amp;", "&");
    return temp;
}
    
function characterLength(s) {
	var templen = 0;
	for(var i=0;i<s.length;i++){
		if(s.charCodeAt(i)>255){
			templen+=2;
		}else{
			templen++
		}
	}
	return templen;
}

/**
 * @param a 文本内容
 * @param b 截取字符长度
 * @param c 后缀,默然""
 */
function cutString(a,b,c){
	a = htmlTextFormat(a);
	if(!a) return "";
	if(b <= 0) return "";
	if(!c) c = "";
	var txtLen = characterLength(a);
	if(txtLen <= b) return a;
	var suffixLen = characterLength(c);
	var templen=0;
	for(var i=0;i<a.length;i++){
		if(a.charCodeAt(i)>255){
			templen+=2;
		}else{
			templen++
		}
		if(templen + suffixLen == b){
			return a.substring(0,i+1)+c;
		}else if(templen + suffixLen>b){
			return a.substring(0,i)+c;
		}
	}
	return a;
}

function replaceAll(src, oldText, newText) {
	return src.replace(new RegExp(oldText,"gm"), newText);
}

// 格式化日期
function localDateFormat(){
	return formatDate();
}

function formatDate(formatStr, fdate){
	var fTime, fStr = 'ymdhis';

	if (!formatStr){
		formatStr= "y-m-d h:i:s";
	}
	if (fdate){
		fTime = new Date(fdate);
	}else{
		fTime = new Date();
	}
	var formatArr = [ 
		fTime.getFullYear().toString(),		//年
		fnum((fTime.getMonth()+1).toString()), 	//月
		fnum(fTime.getDate().toString()),			//日
		fnum(fTime.getHours().toString()),		//时
		fnum(fTime.getMinutes().toString()),		//分
		fnum(fTime.getSeconds().toString())		//秒
		]
	for (var i=0; i<formatArr.length; i++){
		formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
	}
	return formatStr;
}

function fnum(arg0){
	if(Number(arg0)<10){
		return "0"+arg0;
	}else{
		return arg0;
	}
}

//获取用户唯一标识(加密)
function getUniqueUserId(){
	var userinfo = $.cookie("userinfo");
	if(userinfo != null && userinfo.indexOf("|") != -1){
		var userinfoArray = userinfo.split("|");
		if(userinfoArray.length > 5 && userinfoArray[5] != ""){
			return userinfoArray[5];
		}
		return "-";
	}
}

//智能推荐-推荐位数据回传
function set_mahout_rec_rule_fn(prdid, itemid, type, recpos, recmethod, reccelue, itemrecids){
//alert(prdid);alert(itemid);alert(type);alert(recpos);alert(recmethod);alert(reccelue);alert(itemrecids);
//	var item_recrule = {};
//	item_recrule['prdid'] = prdid;  				//项目ID,必须写，由规则系统预先生成
//	item_recrule['itemid'] = itemid; 				//商品或分类标识
//	item_recrule['userid'] = getUniqueUserId();		//用户唯一标识
//	item_recrule['time'] = localDateFormat();		//不写则使用服务器端时间，由于客户端时间有可能不准确，除非特殊必要，建议留空
//	item_recrule['type'] = type;					//交易类型,访问：v 购物车：g 购买:b
//	item_recrule['recid'] = item_recrule['itemid']; //页面唯一标识
//	item_recrule['recpos'] = recpos;         		//当前页面中会展现那些推荐位，如果存在多个推荐位，多个推荐为之间用@分隔，不防暂定，商品页使用item,购物车使用cart，个人中心使用user 
//	item_recrule['recmethod'] = recmethod;      	//与recpos对应，多个之间用@分隔，用来标记对应推荐为使用的算法ABTtest所用，有可能存在同一推荐位，使用不同算法的
//	item_recrule['reccelue'] = reccelue;       		//推荐位对应的推荐策略，（多个推荐位，用‘@’分开，一个推荐位内的多种推荐策略，用‘|’分开）
//	item_recrule['itemrecids'] = itemrecids;		//当前页面所有推荐位展示商品ID（多个推荐位，用‘@’分开，一个推荐位内的多个推荐，用‘|’分开）
//	mahout_rec_rule = [];
//	mahout_rec_rule.push(item_recrule);
//	mahout_rec_rule_fn();
}

var recommend_topn = new Object();
var recommend_like = new Object();
var recommend_like_column = new Object();
var recommend_buy = new Object();
var recommend_buy_incolumn = new Object();
var recommend_buy_outcolumn = new Object();
var recommend_buybuy = new Object();
var recommend_view = new Object();
var recommend_fpgglistbuy = new Object();
var recommend_topn_notice = new Object();
var recommend_like_notice = new Object();
var recommend_buy_notice = new Object();
var recommend_buybuy_notice = new Object();

/*
 * offerIdLists 商品ID集合
 * offerIdRatioMap 商品对应的购买率集合
 * offerIdAlgMap 商品对应的算法集合
 */
function getRecommend_obj(){
	var recommend_obj ={
		offerIdLists : [],
		offerIdRatioMap : new Object(),
		offerIdAlgMap : new Object()
	};
	return recommend_obj;
}
//对JSON进行排序
function down(x, y) {
    return (x.ratio < y.ratio) ? 1 : -1
}
//解析JSON
function parseJson_callback(json,tab){
	var recommend_objData = getRecommend_obj();
	var obj = json.data;
	if(!obj){
		return;
	}
	obj.sort(down);
	for(var i = 0; i< obj.length;i++){
		recommend_objData.offerIdLists.push(obj[i].offerId);
		if(obj[i].ratio && obj[i].ratio > 0){
			var ratioTmep = ((isNaN(obj[i].ratio) ? 0 : obj[i].ratio) * 100).toFixed(2);
			recommend_objData.offerIdRatioMap[obj[i].offerId] = ratioTmep;
		}
		recommend_objData.offerIdAlgMap[obj[i].offerId] = obj[i].alg;
	}
	setObjectData(tab,recommend_objData);
	
}
//给全局变量赋值
function setObjectData(tab,data){
	if(tab == "topn"){
		recommend_topn = data;
	}
	if(tab == "like"){
		recommend_like = data;
	}
	if(tab == "like_column"){
		recommend_like_column = data;
	}
	if(tab == "buy"){
		recommend_buy = data;
	}
	if(tab == "buyincolumn"){
		recommend_buy_incolumn = data;
	}
	if(tab == "buyoutcolumn"){
		recommend_buy_outcolumn = data;
	}
	if(tab == "buybuy"){
		recommend_buybuy = data;
	}
	if(tab == "view"){
		recommend_view = data;
	}
	if(tab == "fpgglistbuy"){
		recommend_fpgglistbuy = data;
	}
	if(tab == "topn_notice"){
		recommend_topn_notice = data;
	}
	if(tab == "like_notice"){
		recommend_like_notice = data;
	}
	if(tab == "buy_notice"){
		recommend_buy_notice = data;
	}
	if(tab == "buybuy_notice"){
		recommend_buybuy_notice = data;
	}
}

/**
 * 智能推荐发送请求
 * @param {} callback	回调
 * @param {} proid		项目应用标识
 * @param {} recid		推荐应用场景标识
 * @param {} offerid	商品标识，多个商品标识用@分割
 * @param {} mid		地址标识
 * @param {} count		推荐商品个数
 * @param {} uid		用户标识，没有默认为0
 * @param {} categoryid	品类名称
 * @param {} isSend		未请求到内容标记
 * @param {} issessionid 是否传sessionid
 */
function newMahout_request(callback,proid,recid,offerid,mid,count,uid,categoryid,isSend,issessionid){
	var params = {};
	params.proid = proid;
	params.recid = recid;
	params.site = mid;
	params.count = count;
	params.uid = uid;
	params.categoryid = categoryid;
	if(issessionid == 1){
		params.sessionid = $.cookie("JSESSIONID");
	}
	var url = "http://recommend.womai.com:1108/bRecom-womai/brecom.do?"+ $.param(params,true)+ "&offerid=" + offerid + "&callback=?";
	$.getJSON(url,function(json){
		if(json == "undefined" || json == undefined) return;
		callback(json,offerid,isSend);
	});
}
/**
 * 校验商品是否可买，及调用
 * @param {} json			返回的json串
 * @param {} objData		模块对象
 * @param {} getObjFunction	重新获取的方法
 * @param {} objCallback	渲染的回调函数
 * @param {} dataJson		各个模块传入的自定义json
 * @param {} pids			所有的商品ID@分隔
 * @param {} isSend			是否重新发送请求	
 */

function verifyAndExecute(objData,getObjFunction,objCallback,dataJson,pids,isSend,modelName){
	var modelNameTemp = "";
	if(modelName){
		modelNameTemp = modelName;
	}
	if(isSend == 0 && (!objData || !objData.offerIdLists || objData.offerIdLists.length <= 0)){
		getObjFunction(modelNameTemp,pids,1);//重新发送请求
	}else if(objData && objData.offerIdLists && objData.offerIdLists.length > 0){
		//加载价格
		loadProducts(objCallback, dataJson,objData.offerIdLists, mid, "pic100", 0, ["buyPrice","WMPrice","marketPrice"], "title", ["self_sellerId,self_isFresh,self_sellerType"],"true");
	}
}

var recommendObj = {
	//加载售完推荐
	topn : function(item_name,pids,isSend){newMahout_request(product_callback_topn,"womai" + item_name,1101,pids,mid,"",0,"",isSend);},
	//加载组合套餐
	fpgbuy : function(item_name,pids,isSend){newMahout_request(product_call_back_fpgbuy,"womai" + item_name,1102,pids,mid,"",0,"",isSend);},
	//加载买了还买的数据
	buybuy : function(item_name,pids,isSend){newMahout_request(product_callback_buybuy,"womai" + item_name,1103,pids,mid,"",0,"",isSend);},
	//加载看了还买的数据
	buy : function(item_name,pids,isSend){newMahout_request(product_callback_buy,"womai" + item_name,1104,pids,mid,"",0,"",isSend);},
	//看了最终购买了-同品类下数据
	buy_incolumn : function(item_name,pids,isSend){newMahout_request(product_callback_buy_incolumn,"womai" + item_name,1105,pids,mid,"",0,"",isSend);},
	//看了最终购买了-非同品类下数据
	buy_outcolumn : function(item_name,pids,isSend){newMahout_request(product_callback_buy_outcolumn,"womai" + item_name,1106,pids,mid,"",0,"",isSend);},
	//加载看了还看了的数据
	view : function(item_name,pids,isSend){newMahout_request(product_call_back_view,"womai" + item_name,1107,pids,mid,"",0,"",isSend);},
	//加载猜你喜欢数据--全网的数据
	like : function(item_name,pids,isSend){newMahout_request(product_callback_like,"womai" + item_name,1108,getViewHistory(),mid,"",getUniqueUserId(),"",isSend,1);},
	//加载猜你喜欢数据--品类的数据
	like_column : function(item_name,pids,isSend){newMahout_request(product_callback_like_column,"womai" + item_name,1109,getViewHistory(),mid,"",getUniqueUserId(),columnName,isSend,1);}
};

//售完推荐回调函数
function product_callback_topn(json,pids,isSend){
	try{
		parseJson_callback(json,"topn");
		verifyRecommend_topn(pids,isSend);
	}catch(e){}
}
//组合套餐回调函数
function product_call_back_fpgbuy(json,pids,isSend){
	try{
		parseJson_callback(json,"fpgglistbuy");
		verifyRecommend_fpgbuy(pids,isSend);
	}catch(e){}
}
//买了还买回调函数
function product_callback_buybuy(json,pids,isSend){
	try{
		parseJson_callback(json,"buybuy");
		verifyRecommend_buybuy(pids,isSend);
	}catch(e){}
}
//看了还买回调函数
function product_callback_buy(json,pids,isSend){
	try{
		parseJson_callback(json,"buy");
		verifyRecommend_buy(pids,isSend);
	}catch(e){}
}
//看了最终购买了-同品类回调函数
function product_callback_buy_incolumn(json,pids,isSend){
	try{
		parseJson_callback(json,"buyincolumn");
		verifyRecommend_buy_incolumn(pids,isSend);
	}catch(e){}
}
//看了还买了-非当前品类回调函数
function product_callback_buy_outcolumn(json,pids,isSend){
	try{
		parseJson_callback(json,"buyoutcolumn");
		verifyRecommend_buy_outcolumn(pids,isSend);
	}catch(e){}
}

//看了还看了回调函数
function product_call_back_view(json,pids,isSend){
	try{
		parseJson_callback(json,"view");
		verifyRecommend_view(pids,isSend);
	}catch(e){}
}
//猜你喜欢回调函数--全网回调函数
function product_callback_like(json,pids,isSend){
	try{
		parseJson_callback(json,"like");
		verifyRecommend_like(pids,isSend);
	}catch(e){}
}
//加载猜你喜欢数据--品类回调函数
function product_callback_like_column(json,pids,isSend){
	try{
		parseJson_callback(json,"like_column");
		verifyRecommend_like_column(pids,isSend);
	}catch(e){}
}
//获取最近看过的历史记录，用作智能推荐
function getViewHistory(){
	var productsId = 0;
	var tempCookie = $.cookie("ViewHistory");
	if(tempCookie){
		var values = tempCookie.split(',');
		productsId = values.join("@");
	}
	return productsId;
}
//是否产地
function getIsSeller(result){
	if(!result){
		return false;
	}
	if(result.attribute.self_sellerId && result.attribute.self_sellerId["self_sellerId"] > 0 && result.attribute.self_sellerType && result.attribute.self_sellerType["self_sellerType"] == 1){
		 return true;
	}
	return false;
}
