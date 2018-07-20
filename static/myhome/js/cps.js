
//��ȡ��ַ������
function getQueryStringRegExp(name){    
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");     
	if(reg.test(location.href)){ 
		var result =  unescape(RegExp.$2.replace(/\+/g, " "));
		return result == "" ? "FALSE" : result;
	}else{
		return "FALSE";
	}
};

//cps
function initCpsParams(){
	//����������
	var xcid = getQueryStringRegExp('xcid'), wid =  getQueryStringRegExp('wid'), fbt =  getQueryStringRegExp('fbt'), url =  getQueryStringRegExp('url');
	//�ɹ�������
	var cgw_id = getQueryStringRegExp('cgw_id'), cgw_url = getQueryStringRegExp('cgw_url'), source = getQueryStringRegExp('source');
	//����˼��������
	var adsq_source = getQueryStringRegExp('adsq_source'), adsq_sid = getQueryStringRegExp('adsq_sid'), adsq_url = getQueryStringRegExp('adsq_url');
	//���������
	var lkt_a_id = getQueryStringRegExp('lkt_a_id'), lkt_m_id = getQueryStringRegExp('lkt_m_id'), lkt_url = getQueryStringRegExp('lkt_url');
	//Ψһ�������
	var wy_cid = getQueryStringRegExp('wy_cid'), wy_url = getQueryStringRegExp('wy_url');
	//����������
	var dm_sid = getQueryStringRegExp('dm_sid'), dm_feedback = getQueryStringRegExp('dm_feedback'), dm_to = getQueryStringRegExp('dm_to');
	//΢��CPS����
	var wb_Adid = getQueryStringRegExp('wb_Adid'),  wb_Source = getQueryStringRegExp('wb_Source'), wb_position = getQueryStringRegExp('position'), wb_targeturl = getQueryStringRegExp('targeturl');
	//����
	var ls_id = getQueryStringRegExp('ls_from');
	//��������
	var abmm_id = getQueryStringRegExp("abmm_from");
	//��ʳ���� 
	var msmj_id = getQueryStringRegExp("msmj_from");
	//���������CPS
	var clfxb_id = getQueryStringRegExp("clfxb_from");
	//������ʳ�ŶӲ߻�CPS
	var pdch_id = getQueryStringRegExp("pdch_from");
	//��ʳ��������һ�ڵ�CPS
	var msmj8_id = getQueryStringRegExp("msmj8_from");
	//msmj9_from=msmj9
	var msmj9_id = getQueryStringRegExp("msmj9_from");
	
	var cps_from = getQueryStringRegExp("cps_from");
	
	//�ٶ�cps
	var baidu_id = getQueryStringRegExp("channel_id"),uid = getQueryStringRegExp("uid"),track_id = getQueryStringRegExp("track_id"),target = getQueryStringRegExp("target");
	
	var cpsValue = "", redirectUrl = "";
	
	if(xcid != "FALSE"){
		cpsValue =  xcid + "," + wid + "," + fbt + "," + url + "," + "yima";
	}else if(cgw_id != "FALSE"){
		cpsValue = cgw_id + "," + source + "," + cgw_url + "," + "cgw";
	}else if(adsq_source != "FALSE"){
		cpsValue =adsq_sid + "," + adsq_source + "," +adsq_url + "," + "adsqcps";
		redirectUrl = adsq_url;
	}else if(lkt_a_id != "FALSE"){
		cpsValue = lkt_a_id + "," + lkt_m_id + "," + lkt_url + "," + "lktcps";
		redirectUrl = lkt_url;
	}else if(wy_cid !="FALSE"){
		cpsValue = wy_cid + "," + wy_url + ",wycps";
		redirectUrl = wy_url;
	}else if(dm_sid !="FALSE"){
		cpsValue = dm_sid + "," + dm_feedback + "," + dm_to + ",dmcps"
		redirectUrl = dm_to;
	}else if(wb_Adid != "FALSE"){
		cpsValue = wb_Adid + "," + wb_Source + "," + wb_position + "," + wb_targeturl +��",wb_Adid" ;
		redirectUrl = wb_targeturl;
	}else if(ls_id != "FALSE") {
		cpsValue = ls_id + ",lscps";
	}else if(abmm_id != "FALSE"){
		cpsValue = abmm_id + ",abmmcps";
	}else if(msmj_id != "FALSE"){
		cpsValue = msmj_id + ",msmjcps";
	}else if(clfxb_id != "FALSE" ){
		cpsValue = clfxb_id + ",clfxbcps";
	} else if(pdch_id != "FALSE"){
		cpsValue = pdch_id + ",pdchcps";
	}else if(msmj8_id != "FALSE"){
		cpsValue = msmj8_id + ",msmj8cps";
	}else if(msmj9_id != "FALSE"){
		cpsValue = msmj9_id + ",msmj9cps";
	}else if(cps_from != "FALSE"){
		cpsValue = cps_from;
	}else if(baidu_id != "FALSE"){
		cpsValue = baidu_id +","+uid+","+track_id+","+target;
		redirectUrl = target;
	}
	if(cpsValue != ""){
		//��ȡ��ǰʱ��
		var date=new Date();
		var expireDays=30;
		//��date����Ϊ30���Ժ��ʱ��
		date.setTime(date.getTime()+expireDays*24*3600*1000);
		document.cookie = "cps=" + escape(cpsValue) + ";expires="+date.toGMTString() + ";path=/;domain=.womai.com";	
	}
	if(redirectUrl != "" && redirectUrl != "FALSE"){
		window.location = redirectUrl;
	}
}
//ҳ��dom��ɼ��غ�ִ��
$(function(){
	initCpsParams();
});