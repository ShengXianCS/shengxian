//�����ݿ�д���Ƽ��������
function addTrackRec(mid, urlSourceId, targetPageId, actionId) {
	var params = new Object();
	params["mid"] = mid;
	params["urlSourceId"] = urlSourceId;
	params["targetPageId"] = targetPageId;
	params["actionId"] = actionId;
	jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	jQuery.post(frontPath + "/product/addUrlSourceTrackRec.do", params);
}
//����Ƽ�ģ���е���Ʒ,�첽��¼���Ƽ��������
//���ӵ���Ʒ����ҳ����cookie�м�¼����Ʒ�Ǵ��Ƽ�ģ������ӹ�����
function clickUrl(pid, mid, urlSourceId, targetPageId, actionId) {
//	addTrackRec(mid, urlSourceId, targetPageId, actionId);
//	var cookieName = "urlSource_" + mid + "_" + pid;
//	var timeHours = 30 * 24;
//	setLocalCookie(cookieName, urlSourceId, timeHours,"/");
}
//�µ�ʱ��鶩���е���Ʒ�Ƿ��Ǵ��Ƽ�ģ�����ӹ�����
function checkAddOrder(pids, mid, actionId) {
	for ( var i = 0; i < pids.length; i++) {
		checkAddTrackRec(pids[i], mid, actionId)
		var cookieName = "urlSource_" + mid + "_" + pids[i];
		var timeHours =-1;
		setLocalCookie(cookieName, "", timeHours,"/");
	}
}
//���빺�ﳵ���µ�ʱ������Ʒ�Ƿ��Ǵ��Ƽ�ģ�����ӹ�����
function checkAddTrackRec(pid, mid, actionId) {
	var cookieName = "urlSource_" + mid + "_" + pid;
	var urlSourceId = getLocalCookie(cookieName);
	if (urlSourceId != "") {
		addTrackRec(mid, urlSourceId, -1, actionId);
	}
}
//�����ϼ��빺�ﳵ�ȼ������Ʒ�Ƿ����Ƽ������ģ��ٽ���ѡ���Ƽ���Ʒ���м�¼
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
//дcookie
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
//��cookie
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