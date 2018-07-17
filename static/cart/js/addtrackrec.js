//向数据库写入推荐监测数据
function addTrackRec(mid, urlSourceId, targetPageId, actionId) {
	var params = new Object();
	params["mid"] = mid;
	params["urlSourceId"] = urlSourceId;
	params["targetPageId"] = targetPageId;
	params["actionId"] = actionId;
	jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	jQuery.post(frontPath + "/product/addUrlSourceTrackRec.do", params);
}
//点击推荐模块中的商品,异步记录该推荐监测数据
//连接到商品详情页并在cookie中记录该商品是从推荐模块儿链接过来的
function clickUrl(pid, mid, urlSourceId, targetPageId, actionId) {
//	addTrackRec(mid, urlSourceId, targetPageId, actionId);
//	var cookieName = "urlSource_" + mid + "_" + pid;
//	var timeHours = 30 * 24;
//	setLocalCookie(cookieName, urlSourceId, timeHours,"/");
}
//下单时检查订单中的商品是否是从推荐模块连接过来的
function checkAddOrder(pids, mid, actionId) {
	for ( var i = 0; i < pids.length; i++) {
		checkAddTrackRec(pids[i], mid, actionId)
		var cookieName = "urlSource_" + mid + "_" + pids[i];
		var timeHours =-1;
		setLocalCookie(cookieName, "", timeHours,"/");
	}
}
//加入购物车或下单时检查该商品是否是从推荐模块连接过来的
function checkAddTrackRec(pid, mid, actionId) {
	var cookieName = "urlSource_" + mid + "_" + pid;
	var urlSourceId = getLocalCookie(cookieName);
	if (urlSourceId != "") {
		addTrackRec(mid, urlSourceId, -1, actionId);
	}
}
//最佳组合加入购物车先检查主商品是否是推荐过来的，再将勾选的推荐商品进行记录
function checkBestCompages(pid,mid,actionId){
	checkAddTrackRec(pid,mid,actionId);
	var pids=[];
	jQuery("[name='ckbestcompages']:checked").each(function(){pids.push(jQuery(this).val());});
//	for(var i=0;i<pids.length;i++){
//		var urlSourceId=jQuery("#urlSource_"+pids[i]).val();
//		var timeHours = 30 * 24;
//		if(urlSourceId!=null){
//			addTrackRec(mid, urlSourceId, 3, actionId);
//			var cookieName = "urlSource_" + mid + "_" + pids[i];
//			setLocalCookie(cookieName, urlSourceId, timeHours,"/");
//		}
//	}
}
//写cookie
function setLocalCookie(name, value, hours,cookiePath) {
	var expire = "";
	if (hours != null) {
		expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = "; expires=" + expire.toGMTString();
	}
	var path="";
	if(cookiePath!=null){
		path="; path="+cookiePath;
	}
	document.cookie = name + "=" + escape(value) + expire+path;
}
//读cookie
function getLocalCookie(name) {
	var cookieValue = "";
	var search = name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}