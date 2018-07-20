/**
 * �����������Ƽ��õ�ͨ�÷�����
 * 
 * @type 
 */

var undefined;
var itemPercents = {};	//�Ƽ����ݵĹ���ٷֱȼ��϶���

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
 * ����parse.XXX��ȡ��Ʒid����
 * @param {} list 	����������ʲ���ֵ�ɵ�������õ����ݣ���һ��ת����˴�Ϊ��Ʒid���飬�Զ���������ʽ����
 * @param {} max	���嵽ʵ�Σ�����ĳ��չλ�������Ʒid����
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
 * ���ݲ���parse.XXX��ȡ���Ƽ��ĸ�����Ʒ����Ҫ����,�������������
 * ���ݽṹ��{"id1":{"label":"v","m":"avg","scroe":"0.12"},"id2":{"label":"v","m":"avg","scroe":"0.22"}}
 * @param {} list
 * @param {} max		���嵽ʵ�Σ�����ĳ��չλ�������Ʒid����
 * @param {} listsparam	��Ҫ������Ķ���ƴ���ڱ��ζ�������һͬ����
 */
function parseLists(list, max, listsparam) {
	var lists = listsparam ? listsparam : {};
	if(list == undefined)
		return lists;
	if(max == undefined)
		max = list.length;
	var item = {};	//ÿһ�����
	for(var i=0; i<list.length && i<max; i++){
		if(list[i] && list[i].itemid){
			//������Ʒid
			item["label"] = list[i].label;
			item["m"] = list[i].m;
			item["score"] = list[i].score;
			lists[ list[i].itemid ] = item;
			item = {};//�ֶ��ÿ�
		}
	}
	return lists;
}

/**
 * ���ݲ���parse.XXX��ȡ���Ƽ��ĸ�����Ʒ�İٷֱ�����,����������洢��itemPercents��
 * itemPercents[��Ʒid]=�ٷֱ�ֵ
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
 * �ڼ���ٷֱȷ�������ñ���������ȡ����Ƽ�����Ʒ�ٷֱ�����
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
 * ���ݲ�������������Ʒ��Ϣ 
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
	
	//ƴ�Ӳ�����������
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
		if(callbackParams && callbackParams.isSpecified && callbackParams.specifiedId){//�������ϱ�Ҫ����
			if(!valiLoadProductsData(data)){
				return;
			}
			var result = data.result;
			if(result){
				//�����������������
				var params = {};
				params.cid = callbackParams.specifiedId;
				params.mid = mid;
				params.page= 1;
				params.cityid= cityid;
				//��������������Ʒ���ݣ�ֻ��ȡ��ǰ1000��, ����1000�Ĳ��迼��
				params.pageSize = 1000;
				var apiUrl = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=?";
				$.getJSON(apiUrl, function(data4Specified, callbackParams) {
					if(!valiLoadProductsData(data4Specified)){
						return;
					}
					var resultInSpecifiedColumn = [];//��������������Ʒ��������
					var result4Specified = data4Specified.result;
					var allpids = [];//ȫ����Ʒid����
					for(var j=0;j<result4Specified.length;j++){
						allpids[j]=result4Specified[j].id;
					}
					//��������
					for(var i=0; i<result.length; i++){
						if($.inArray(result[i].id,allpids) >= 0){
							resultInSpecifiedColumn.push(result[i]);
						}
					}
					//���¼���ȡ��
					callback({"result":resultInSpecifiedColumn}, callbackParams);
				});
			}
		}else{
			callback(data, callbackParams);
		}
	});
}

//У��ص�����data��Ч��
function valiLoadProductsData(data){
	if(data == undefined || data.result == undefined
		|| Object.prototype.toString.apply(data.result) != "[object Array]"
		|| data.result.length == 0)
		return false;
	return true;
}

//��¼�����Ƽ���Ϊ����ת��Ʒ����ҳ
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

//Ϊ�˼�⵱ǰҳ���ֱ�ӹ�����Ƽ�λ��Ʒ��Ϣ������ֱ�Ӽ��빺�ﳵ��Ҫ���ô˷�����
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

// ��ʽ������
function htmlTextFormat(text) {
	var temp = replaceAll(text, "\r\n", "");
	temp = replaceAll(temp, "<br>", "");
	temp = replaceAll(temp, "<p>", "");
	temp = replaceAll(temp, "</p>", "");
	temp = replaceAll(temp, "&ldquo;", "��");
	temp = replaceAll(temp, "&rdquo;", "��");
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
 * @param a �ı�����
 * @param b ��ȡ�ַ�����
 * @param c ��׺,ĬȻ""
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

// ��ʽ������
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
		fTime.getFullYear().toString(),		//��
		fnum((fTime.getMonth()+1).toString()), 	//��
		fnum(fTime.getDate().toString()),			//��
		fnum(fTime.getHours().toString()),		//ʱ
		fnum(fTime.getMinutes().toString()),		//��
		fnum(fTime.getSeconds().toString())		//��
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

//��ȡ�û�Ψһ��ʶ(����)
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

//�����Ƽ�-�Ƽ�λ���ݻش�
function set_mahout_rec_rule_fn(prdid, itemid, type, recpos, recmethod, reccelue, itemrecids){
//alert(prdid);alert(itemid);alert(type);alert(recpos);alert(recmethod);alert(reccelue);alert(itemrecids);
//	var item_recrule = {};
//	item_recrule['prdid'] = prdid;  				//��ĿID,����д���ɹ���ϵͳԤ������
//	item_recrule['itemid'] = itemid; 				//��Ʒ������ʶ
//	item_recrule['userid'] = getUniqueUserId();		//�û�Ψһ��ʶ
//	item_recrule['time'] = localDateFormat();		//��д��ʹ�÷�������ʱ�䣬���ڿͻ���ʱ���п��ܲ�׼ȷ�����������Ҫ����������
//	item_recrule['type'] = type;					//��������,���ʣ�v ���ﳵ��g ����:b
//	item_recrule['recid'] = item_recrule['itemid']; //ҳ��Ψһ��ʶ
//	item_recrule['recpos'] = recpos;         		//��ǰҳ���л�չ����Щ�Ƽ�λ��������ڶ���Ƽ�λ������Ƽ�Ϊ֮����@�ָ��������ݶ�����Ʒҳʹ��item,���ﳵʹ��cart����������ʹ��user 
//	item_recrule['recmethod'] = recmethod;      	//��recpos��Ӧ�����֮����@�ָ���������Ƕ�Ӧ�Ƽ�Ϊʹ�õ��㷨ABTtest���ã��п��ܴ���ͬһ�Ƽ�λ��ʹ�ò�ͬ�㷨��
//	item_recrule['reccelue'] = reccelue;       		//�Ƽ�λ��Ӧ���Ƽ����ԣ�������Ƽ�λ���á�@���ֿ���һ���Ƽ�λ�ڵĶ����Ƽ����ԣ��á�|���ֿ���
//	item_recrule['itemrecids'] = itemrecids;		//��ǰҳ�������Ƽ�λչʾ��ƷID������Ƽ�λ���á�@���ֿ���һ���Ƽ�λ�ڵĶ���Ƽ����á�|���ֿ���
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
 * offerIdLists ��ƷID����
 * offerIdRatioMap ��Ʒ��Ӧ�Ĺ����ʼ���
 * offerIdAlgMap ��Ʒ��Ӧ���㷨����
 */
function getRecommend_obj(){
	var recommend_obj ={
		offerIdLists : [],
		offerIdRatioMap : new Object(),
		offerIdAlgMap : new Object()
	};
	return recommend_obj;
}
//��JSON��������
function down(x, y) {
    return (x.ratio < y.ratio) ? 1 : -1
}
//����JSON
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
//��ȫ�ֱ�����ֵ
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
 * @param {} issessionid �Ƿ�sessionid
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
 * У����Ʒ�Ƿ���򣬼�����
 * @param {} json			���ص�json��
 * @param {} objData		ģ�����
 * @param {} getObjFunction	���»�ȡ�ķ���
 * @param {} objCallback	��Ⱦ�Ļص�����
 * @param {} dataJson		����ģ�鴫����Զ���json
 * @param {} pids			���е���ƷID@�ָ�
 * @param {} isSend			�Ƿ����·�������	
 */

function verifyAndExecute(objData,getObjFunction,objCallback,dataJson,pids,isSend,modelName){
	var modelNameTemp = "";
	if(modelName){
		modelNameTemp = modelName;
	}
	if(isSend == 0 && (!objData || !objData.offerIdLists || objData.offerIdLists.length <= 0)){
		getObjFunction(modelNameTemp,pids,1);//���·�������
	}else if(objData && objData.offerIdLists && objData.offerIdLists.length > 0){
		//���ؼ۸�
		loadProducts(objCallback, dataJson,objData.offerIdLists, mid, "pic100", 0, ["buyPrice","WMPrice","marketPrice"], "title", ["self_sellerId,self_isFresh,self_sellerType"],"true");
	}
}

var recommendObj = {
	//���������Ƽ�
	topn : function(item_name,pids,isSend){newMahout_request(product_callback_topn,"womai" + item_name,1101,pids,mid,"",0,"",isSend);},
	//��������ײ�
	fpgbuy : function(item_name,pids,isSend){newMahout_request(product_call_back_fpgbuy,"womai" + item_name,1102,pids,mid,"",0,"",isSend);},
	//�������˻��������
	buybuy : function(item_name,pids,isSend){newMahout_request(product_callback_buybuy,"womai" + item_name,1103,pids,mid,"",0,"",isSend);},
	//���ؿ��˻��������
	buy : function(item_name,pids,isSend){newMahout_request(product_callback_buy,"womai" + item_name,1104,pids,mid,"",0,"",isSend);},
	//�������չ�����-ͬƷ��������
	buy_incolumn : function(item_name,pids,isSend){newMahout_request(product_callback_buy_incolumn,"womai" + item_name,1105,pids,mid,"",0,"",isSend);},
	//�������չ�����-��ͬƷ��������
	buy_outcolumn : function(item_name,pids,isSend){newMahout_request(product_callback_buy_outcolumn,"womai" + item_name,1106,pids,mid,"",0,"",isSend);},
	//���ؿ��˻����˵�����
	view : function(item_name,pids,isSend){newMahout_request(product_call_back_view,"womai" + item_name,1107,pids,mid,"",0,"",isSend);},
	//���ز���ϲ������--ȫ��������
	like : function(item_name,pids,isSend){newMahout_request(product_callback_like,"womai" + item_name,1108,getViewHistory(),mid,"",getUniqueUserId(),"",isSend,1);},
	//���ز���ϲ������--Ʒ�������
	like_column : function(item_name,pids,isSend){newMahout_request(product_callback_like_column,"womai" + item_name,1109,getViewHistory(),mid,"",getUniqueUserId(),columnName,isSend,1);}
};

//�����Ƽ��ص�����
function product_callback_topn(json,pids,isSend){
	try{
		parseJson_callback(json,"topn");
		verifyRecommend_topn(pids,isSend);
	}catch(e){}
}
//����ײͻص�����
function product_call_back_fpgbuy(json,pids,isSend){
	try{
		parseJson_callback(json,"fpgglistbuy");
		verifyRecommend_fpgbuy(pids,isSend);
	}catch(e){}
}
//���˻���ص�����
function product_callback_buybuy(json,pids,isSend){
	try{
		parseJson_callback(json,"buybuy");
		verifyRecommend_buybuy(pids,isSend);
	}catch(e){}
}
//���˻���ص�����
function product_callback_buy(json,pids,isSend){
	try{
		parseJson_callback(json,"buy");
		verifyRecommend_buy(pids,isSend);
	}catch(e){}
}
//�������չ�����-ͬƷ��ص�����
function product_callback_buy_incolumn(json,pids,isSend){
	try{
		parseJson_callback(json,"buyincolumn");
		verifyRecommend_buy_incolumn(pids,isSend);
	}catch(e){}
}
//���˻�����-�ǵ�ǰƷ��ص�����
function product_callback_buy_outcolumn(json,pids,isSend){
	try{
		parseJson_callback(json,"buyoutcolumn");
		verifyRecommend_buy_outcolumn(pids,isSend);
	}catch(e){}
}

//���˻����˻ص�����
function product_call_back_view(json,pids,isSend){
	try{
		parseJson_callback(json,"view");
		verifyRecommend_view(pids,isSend);
	}catch(e){}
}
//����ϲ���ص�����--ȫ���ص�����
function product_callback_like(json,pids,isSend){
	try{
		parseJson_callback(json,"like");
		verifyRecommend_like(pids,isSend);
	}catch(e){}
}
//���ز���ϲ������--Ʒ��ص�����
function product_callback_like_column(json,pids,isSend){
	try{
		parseJson_callback(json,"like_column");
		verifyRecommend_like_column(pids,isSend);
	}catch(e){}
}
//��ȡ�����������ʷ��¼�����������Ƽ�
function getViewHistory(){
	var productsId = 0;
	var tempCookie = $.cookie("ViewHistory");
	if(tempCookie){
		var values = tempCookie.split(',');
		productsId = values.join("@");
	}
	return productsId;
}
//�Ƿ����
function getIsSeller(result){
	if(!result){
		return false;
	}
	if(result.attribute.self_sellerId && result.attribute.self_sellerId["self_sellerId"] > 0 && result.attribute.self_sellerType && result.attribute.self_sellerType["self_sellerType"] == 1){
		 return true;
	}
	return false;
}
