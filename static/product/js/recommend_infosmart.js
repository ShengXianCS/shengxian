/**
 * Copyright (C), 2010, Ӣ��˹����
 * 
 * �Ƽ�ǰ�˴���
 * 
 * ��  ʷ:
 * <����>          <ʱ��>          <�汾>       <˵��>
 * yannian       2010-02-21       1.0           ģ�嶨��--------
 */
 
 
 /**
  * ----��������Ƽ����������10��û�з����Ƽ��������ͻ�����Ϊ��ǰ�������ٹ����������Ѿ�崻�����10�����ڣ����л�������������ȥ���ʽӿ�
  * 
  * �������Ľӿ�30��û����Ӧ���򻻸��ӿڣ�����----
  * 
  * 
  */
 
window.mahout_vqhttp_hosts=["recommend.womai.com:1210"];
window.mahout_recommend_hosts=["recommend.womai.com:1107"];

(function(){
	var mahout_container_obj=null;
	var mahout_append_child=function(obj)
	{
		if(!mahout_container_obj)
		{
			var container=document.getElementById("mahout_container_layer");
			if(!container)
			{
				 container=document.createElement("div");
				 var head=document.getElementsByTagName("head")[0];
				 head.appendChild(container);
			}
			mahout_container_obj=container;
		}
	    mahout_container_obj.appendChild(obj);
	};
	
	var mahout_post={
		m_index:0,
		_parseHTML:function (str){
	    	str=new String(str);
	    	return str.replace(/&/g,"&#38;").replace(/\"/g,"&#34;").replace(/\'/g,"&#39;").replace(/</g,"&#60;").replace(/>/g,"&#62;");
	 	 },
	 	 submit:function(_$form,strName,times)
	 	 {
	 	 	times++;
	 	 	try{
		 	 	if(document.getElementById(strName)!=null){
			  		if(_$form){
			  			_$form.submit();
					}
				  }else{
				  	if(times<5)	{
						var me=this;
						setTimeout(function(){me.submit(_$form,strName,times);},100);
				  	}
				  }
			  }catch(e){}
	 	 },
		post:function(_$action,params)
		{
		  try{
			  var strName="mahout_postJs_IFRAME_"+this.m_index++;
			  this.createIframe(strName);
			  var _$form=this.createForm(strName,_$action,params);
			  this.submit(_$form,strName,0);
		  }catch(e){}
		 
		},
		createForm:function(strName,_$action,params)
		{
		  var _$form=document.createElement("FORM");
		  _$form.action=_$action;
		  _$form.method="post";
		  _$form.target=strName;
		  var strHtml="";
		  for(var p in params)
		  {
			var val=params[p];
			var list=[];;
			if (val.constructor != Array)
			{
				list=[val];
			}else{
				list=val;
			}
			for(var i=0,l=list.length;i<l;i++)
			{
				strHtml+="<input type='hidden' name='"+p+"' value='"+this._parseHTML(list[i])+"'>";
			}
		  }
		  _$form.innerHTML=strHtml;
		  mahout_append_child(_$form);;
		  return _$form
		},
		createIframe:function(strName)
		{
			 var isIE=!!document.all;
			 if(isIE)
			 {						
				 var h="<iframe id=\""+strName+"\" name=\""+strName+"\"";
				 h+=" style=\"display:none\" ></iframe>";
				 var a=document.createElement("iframe");
			     mahout_append_child(a);
			     a.outerHTML=h;
			 }else{
		 	    var a=document.createElement("IFRAME");
			    a.setAttribute("NAME",strName);
			    a.id=strName;
			    a.style.display="none";
			    mahout_append_child(a);
			 }
		}
	};


	window.mahout_parse=function()
	{
		this.topn=[];
		this.like=[];
		this.like_raw=[];
		this.like_avg=[];
		this.buy=[];
		this.buybuy=[];
		this.view=[];
		this.fpgglistview=[];
		this.fpgglistviewindex=0;
		this.fpgglistbuy=[];
		this.fpgglistbuyindex=0;
	};
	
	mahout_parse.prototype.parse=function(obj)
	{
		for(var p in obj)
		{
			if(p=="topn")
			{
				this.topn=obj[p];
			}
			
			if(p=="like")
			{
				this.like=obj[p];
			}
			
			if(p=="like_raw")
			{
				this.like_raw=obj[p];
			}
			
			if(p=="like_avg")
			{
				this.like_avg=obj[p];
			}
			
			if(p=="buy")
			{
				this.buy=obj[p];
			}
			
			if(p=="buybuy")
			{
				this.buybuy=obj[p];
			}
			
			if(p=="view")
			{
				this.view=obj[p];
			}
			
			if(p=="fpgview")
			{
				var glist=obj[p];
				for(var g in glist)
				{
					this.fpgglistview.push(obj[p][g]);
				}
			}
			
			if(p=="fpgbuy")
			{
				var glist=obj[p];
				for(var g in glist)
				{
					this.fpgglistbuy.push(obj[p][g]);
				}
			}
		}
	};
	
	mahout_parse.prototype.fpgGetBuy=function(index)
	{
		var rtn={'list':[],'index':0,'count':0,'alllist':this.fpgglistbuy};
		rtn['count']=this.fpgglistbuy.length;
		if(this.fpgglistbuy.length==0)
		{
			return rtn;
		}
		
		if(index>=0)
		{
			this.fpgglistbuyindex=index;
		}
		
//		if(this.fpgglistbuyindex>=this.fpgglistbuy.length)
//		{
//			this.fpgglistbuyindex=0;
//		}
		
		rtn['index']=this.fpgglistbuyindex;
		rtn['list']=this.fpgglistbuy[this.fpgglistbuyindex];
//		this.fpgglistbuyindex++;
		return rtn;
	
	};
	
	mahout_parse.prototype.fpgGetView=function(index)
	{
		var rtn={'list':[],'index':0,'count':0,'alllist':this.fpgglistview};
		rtn['count']=this.fpgglistview.length;
		if(this.fpgglistview.length==0)
		{
			return rtn;
		}
		
		if(index>=0)
		{
			this.fpgglistviewindex=index;
		}
		
//		if(this.fpgglistviewindex>=this.fpgglistview.length)
//		{
//			this.fpgglistviewindex=0;
//		}
		
		rtn['index']=this.fpgglistviewindex;
		rtn['list']=this.fpgglistview[this.fpgglistviewindex];
		
//		this.fpgglistviewindex++;
		return rtn;
	};
	
	
mahout_parse.prototype.parseLabel=function(list,fn,label)
	{
		var rtn={'list':[],'lableInfo':{},'total':list.length};
		var lableList={};
		var labelinfo={};
		var maxlen=0;
		for(var i in list)
		{
			var itemlabel=encodeURIComponent(fn(list[i]));
			if(typeof(lableList[itemlabel])=="undefined")
			{
				lableList[itemlabel]=[];
			}
			lableList[itemlabel].push(list[i]);
			var len=lableList[itemlabel].length;
			if(len>maxlen)
			{
				maxlen=len;
			}
		}
		for(var i=0;i<maxlen;i++)
		{
			for(var p in lableList)
			{
				var len=lableList[p].length;	
				labelinfo[p]=len;
				if(len<=i)
				{
					continue
				}
				if(p==label||p==encodeURIComponent(label)||label=="all"||label=="default")

				{
					rtn['list'].push(lableList[p][i]);
				}
			}
		}
		
		var labelinfoList=[];
		for(var p in labelinfo)
		{
			labelinfoList.push({"k":p,"v":labelinfo[p]});
		}
		
		labelinfoList.sort(function(a,b){
			return b['v']-a['v'];
		});
		
		for(var i in labelinfoList)
		{
			var obj=labelinfoList[i];
			rtn['lableInfo'][obj['k']]=obj['v'];
		}
		return rtn;
	};

	var vqhttp_index=-1;
	var recommend_index=-1;
	
	var cookieop={
	    get:function(name)
	    {
	    	var v = new RegExp("(^|; *)"+name+"=([^;]*)(;|$)","gi").exec(document.cookie);
	        return v ? decodeURIComponent(v[2]) : '';
	    },
	    set:function(name, value, opts)
	    {
	    	 var opts = opts || {};
	        var c = name + '=' + encodeURIComponent(value);
	        for (var i in opts)
	        {
				c +=  '; ' + i + '=' + opts[i];
	        }
	        document.cookie = c + ';';
	    }
	};
	var get_vqhttpd_hosts=function()
	{
		if(vqhttp_index<0)
		{
			vqhttp_index=parseInt(Math.random()*mahout_vqhttp_hosts.length);
		}
		vqhttp_index++;
		if(vqhttp_index>=mahout_vqhttp_hosts.length)
		{
			vqhttp_index=0;
		}
		return mahout_vqhttp_hosts[vqhttp_index];
	};
	
	var setDenyObj=function(obj)
	{
		var str="";
		var join="";
		for(var p in obj)
		{
			str+=join+p+":"+obj[p];
			join=",";
		}
		cookieop.set("mahout_host_deny",str,getdefaultCookieAttr());
	}
	var getMiniute=function(){
		var d=new Date();
		return parseInt(d.getTime()/60000);
	}
	
	var mahout_host_timeout={};
	
	var getDenyObj=function()
	{
		var hostdeny=cookieop.get("mahout_host_deny").split(",");
		var obj={};
		for(var i=0;i<hostdeny.length;i++)
		{
			var hosttime=hostdeny[i].split(":");
			if(hosttime.length>=2)
			{
				try{
					var savetime=parseInt(hosttime[1]);
					if(getMiniute()-savetime<10)
					{
						obj[parseInt(hosttime[0])]=savetime;
					}
				}catch(e){}
			}
		}
		
		return obj;
	}
	
	var get_recommend_hosts_index=function(fn)
	{
		var obj=getDenyObj();
		var count=mahout_recommend_hosts.length;
		for(var i=0;i<=count;i++)
		{
			if(recommend_index<0)
			{
				recommend_index=parseInt(Math.random()*count);
			}
			recommend_index++;
			if(recommend_index>=count)
			{
				recommend_index=0;
			}
			//������������˻��ߵ�ǰ���Ǵ���
			if(typeof(obj[recommend_index])!="undefined"||i>=count)
			{
				break;
			}
		}
		
		mahout_host_timeout[recommend_index]=setTimeout(function(){
			var obj=getDenyObj();
			obj[recommend_index]=getMiniute();
			setDenyObj(obj);
			if(fn)
			{
				setTimeout(fn,20000);
			}
		},10000);
		
		return recommend_index;
	};
	
	window.mahout_clear_hosts_index=function(index)
	{
		if(mahout_host_timeout[index])
		{
			try{
				clearTimeout(mahout_host_timeout[index]);
			}catch(e){};
		}
		delete mahout_host_timeout[index];
		
		var obj=getDenyObj();
		obj[recommend_index]=0;
		delete obj[recommend_index];
		setDenyObj(obj);
	}
	
	
	var parseEmptyDefault=function(str)
	{
		if(str&&str!="")
		{
			return str;
		}
		return "-";
	};
	
	var getdefault=function(obj,key,def)
	{
		if(obj&&typeof(obj[key])!='undefined' && key !='time')
		{
			return parseEmptyDefault(obj[key]);
		}
		return def;
	};
	
	var getdefaultEncode=function(obj,key,def)
	{
		var rtn=def;
		if(obj&&typeof(obj[key])!='undefined')
		{
			rtn=encodeURIComponent(parseEmptyDefault(obj[key]));
		}
		return rtn;
	};
	
	var getdefaultRemove=function(obj,key,def)
	{
		var rtn=def;
		if(obj&&typeof(obj[key])!='undefined')
		{
			rtn=encodeURIComponent(parseEmptyDefault(obj[key]));
			delete obj[key];
		}
		return rtn;
	};
	
	var getdefaultCookieAttr=function()
	{
		var expir=new Date(new Date().getTime()+3600*24*30*1000).toGMTString();
		var cookieAttr={'expires':expir,'path':'/' ,'domain':'.womai.com'};
		return cookieAttr;
	};
	
	window.mahout_rec_cookie=function(projectId,sourceid,sourcepos,sourcemethod)
	{
		var cookiekey="mahout_rec_cookie_"+projectId;
		cookieop.set(cookiekey,sourceid+"@"+sourcepos+"@"+sourcemethod,getdefaultCookieAttr());
	};
	
	var read_rec_cookie=function(projectId)
	{
		var cookiekey="mahout_rec_cookie_"+projectId;
		var cols=cookieop.get(cookiekey).split("@");
		var postData={};
		//--�Ƽ���Ʒͳ��--
		postData["sourceid"]="-";
		postData["sourcepos"]="-";
		postData["sourcemethod"]="-";
		if(cols.length>=3){
			postData["sourceid"]=cols[0];
			postData["sourcepos"]=cols[1];
			postData["sourcemethod"]=cols[2];
			postData["sourcecelue"]="-";
		}
		if(cols.length>=4){
			postData["sourcecelue"]=cols[3];
		}
		if(typeof sourcerec_infosmart == "undefined"){
			sourcerec_infosmart={"sourceid":postData["sourceid"],
								"sourcepos":postData["sourcepos"],
								"sourcemethod":postData["sourcemethod"],
								"sourcecelue":postData["sourcecelue"]};
		}
		mahout_rec_cookie(projectId,"-","-","-");
		return postData;;
	};

/*=============================================2013-12-03�������� begin=============================================*/	
	//���ӷ���д��sourcerule����
	window.mahout_rec_rule_cookie=function(projectId,sourceid,sourcepos,sourcemethod,sourcerule)
	{
		var cookiekey="mahout_rec_cookie_"+projectId;
		cookieop.set(cookiekey,sourceid+"@"+sourcepos+"@"+sourcemethod+"@"+sourcerule,getdefaultCookieAttr());
	};
	 
	//���ӷ�����ȡsourcerule����
	var read_rec_rule_cookie=function(projectId)
	{
		if(typeof sourcerec_infosmart == "undefined"){
			//ȡcookie
			var cookiekey="mahout_rec_cookie_"+projectId;
			var cols=cookieop.get(cookiekey).split("@");
			//��ȫ�ֶ���
			if(cols.length>=3){
				sourcerec_infosmart={"sourceid":cols[0],"sourcepos":cols[1],"sourcemethod":cols[2]};
				sourcerec_infosmart["sourcecelue"] = "-";
			}
			if(cols.length>=4){
				sourcerec_infosmart["sourcecelue"] = cols[3];
			}
			//����cookie
			mahout_rec_rule_cookie(projectId,"-","-","-","-");
		}
		
		//--�Ƽ���Ʒͳ��--
		var postData={};
		postData["sourceid"]=sourcerec_infosmart["sourceid"];
		postData["sourcepos"]=sourcerec_infosmart["sourcepos"];
		postData["sourcemethod"]=sourcerec_infosmart["sourcemethod"];
		postData["sourcecelue"]=sourcerec_infosmart["sourcecelue"];
		return postData;
	};
	
	//����url�������²���"&isrecrule=recrule"���û��ں�̨��־�ռ�������cf��־��ͬʱ����־�ռ�Ŀ¼������cf_rec_ruleĿ¼�����־��
	window.mahout_rec_rule_fn=function()
	{
		try{
			if(typeof(mahout_rec_rule)=='undefined')
			{
				return ;
			}
//			for(var i=0;i<mahout_rec_rule.length;i++)
//			{
//				var item=mahout_rec_rule[i];
//				if(item['prdid'] == 'womai'){
//					var itemcopy = clone(item);
//					itemcopy['prdid']= 'womaiB';
//					mahout_rec_rule.push(itemcopy);
//					break;
//				}
//			}
			 
			for(var i=0;i<mahout_rec_rule.length;i++)
			{
				var item=mahout_rec_rule[i];
				var content=[];
				content.push(encodeURIComponent(item['prdid']));
				content.push(encodeURIComponent(getdefault(item,"userid","-")));
				content.push(encodeURIComponent(getdefault(item,"itemid","-")));
				content.push(encodeURIComponent(getdefault(item,"type","v")));
				content.push(encodeURIComponent(getdefault(item,"time","-")));
				var postData={};
				 
				var cookieRecdata=read_rec_rule_cookie(item['prdid']);
				postData["sourceid"]=getdefault(item,"sourceid",cookieRecdata["sourceid"]);
				postData["sourcepos"]=getdefault(item,"sourcepos",cookieRecdata["sourcepos"]);
				postData["sourcemethod"]=getdefault(item,"sourcemethod",cookieRecdata["sourcemethod"]);
				postData["sourcecelue"]=getdefault(item,"sourcecelue",cookieRecdata["sourcecelue"]);
				postData["recid"]=getdefault(item,"recid","-");
				postData["recpos"]=getdefault(item,"recpos","-");
				postData["recmethod"]=getdefault(item,"recmethod","-");
				postData["reccelue"]=getdefault(item,"reccelue","-");
				postData["itemrecids"]=getdefault(item,"itemrecids","-"); 
				postData["cost"]=getdefault(item,"cost","0");
				postData["buycnt"]=getdefault(item,"buycnt","1");
				postData["refer"]=getdefault(item,"refer",document.referrer);
				postData["page"]=getdefault(item,"page",document.location.href);
				 
//				var strurl="http://"+get_vqhttpd_hosts()+"/cf.html?projectId="+item['prdid']+"&data="+content.join(",")+"&random="+Math.random()+"&isrecrule=recrule";
//				mahout_post.post(strurl,postData);
			}
			mahout_rec_rule=[];
		}catch(e){};
	};
/*=============================================2013-12-03�������� end=============================================*/	



/*=============================================2014-4-03�������� begin========ȱʧ��Ʒ&����Ƽ�ֱ�ӹ�����ģ��һ�η���=====================================*/	
	//���ӷ���д��sourcerule����   ��ǰӵ������Ƽ���ҳ�棨��ȱʧ��Ʒ�Ƽ�λ����ѡ������Ƽ�����Ʒ�󣬵������ʱ��Ҫ���õĺ���
	//sourceid,sourcepos,sourcemethod,sourcerule  ���ĸ��������ǵ�ҳ�����ƷID���Ƽ�λ������Ƽ������Ƽ�λ�㷨������Ƽ��㷨�����Ƽ����ԣ�����Ƽ����ԣ�
	//itemid   ��ǰ�Ƽ���Ʒ��id
	
	/*=============================================2014-09-03 ����ҳ��ȱʧ��Ʒ&����Ƽ�ֱ�ӹ���&�Լ��б�ҳ���ҵĹ��ﳵ��ֱ�Ӽ��빺�ﳵ����ģ��һ�η��ʣ��Ƽ�λ���ݻش�=====================================*/
	window.mahout_fg_rec_fn=function(projectId,sourceid,sourcepos,sourcemethod,sourcerule,itemid)
	{
		//���ӷ���д��sourcerule����
		mahout_rec_rule_cookie(projectId,sourceid,sourcepos,sourcemethod,sourcerule);
		
		//ģ��һ�η�����Ϊ
		var fg_item={};
		fg_item['prdid']=projectId;
		fg_item['itemid']=itemid;
		fg_item['userid']=getUniqueUserId();
		fg_item['time']=localDateFormat();
		fg_item['starttime']=localDateFormat();
		fg_item['sessioncookie']=$.cookie("JSESSIONID");
		fg_item['type']="v";
		fg_item['score']=1;
		fg_item['cost']=1.1;
		fg_item['buycnt']=1;
		fg_item['refer']=document.referrer;        
		fg_item['page']=document.location.href;
		
		fg_item['recid']=itemid;
		fg_item['recpos']="-";
		fg_item['recmethod']="-";
		fg_item['sourceid']=sourceid;
		fg_item['sourcepos']=sourcepos;
		fg_item['sourcemethod']=sourcemethod;

		window.mahout_rec=[];
		window.mahout_rec.push(fg_item);
		mahout_rec_fn();
	};
	
/*=============================================2014-4-03�������� end===========ȱʧ��Ʒ&����Ƽ�ֱ�ӹ�����ģ��һ�η���==================================*/	
	
	
	function clone(objectold)
	{
	    var ret=new Object();
	    for(var p in objectold)
	    {
	           ret[p]=objectold[p];
	    }
	    return ret;
	}
	
	window.mahout_rec_fn=function()
	{
		try{
			if(typeof(mahout_rec)=='undefined')
			{
				return ;
			}

	//		for(var i=0;i<mahout_rec.length;i++)
	//		{
	//			var item=mahout_rec[i];
			
	//			if(item['prdid'] == 'womai'){
	//				var itemcopy = clone(item);
	//				itemcopy['prdid']= 'womaiB';
	//				mahout_rec.push(itemcopy);
	//				break;
	//			}
	//		}

			for(var i=0;i<mahout_rec.length;i++)
			{
				var item=mahout_rec[i];
				var content=[];
				content.push(encodeURIComponent(item['prdid']));
				content.push(encodeURIComponent(getdefault(item,"userid","-")));
				content.push(encodeURIComponent(getdefault(item,"itemid","-")));
				content.push(encodeURIComponent(getdefault(item,"time","-")));
				content.push(encodeURIComponent(getdefault(item,"type","v")));//v���ʣ�b����g ���ﳵ
				content.push(encodeURIComponent(getdefault(item,"score","1")));
				var postData={};

				//--�Ƽ���Ʒͳ��--
				var cookieRecdata=read_rec_cookie(item['prdid']);
				postData["sourceid"]=getdefault(item,"sourceid",cookieRecdata["sourceid"]);
				postData["sourcepos"]=getdefault(item,"sourcepos",cookieRecdata["sourcepos"]);
				postData["sourcemethod"]=getdefault(item,"sourcemethod",cookieRecdata["sourcemethod"]);
				
				//--�Ƽ�λ�ع����ͳ��--
				postData["recid"]=getdefault(item,"recid","-"); //--ҳ���ǣ�ͨ��Ϊ��ƷID������ǹ��ﳵ���߸�������ҳ�棬���������ı�Ǽ���--
				postData["recpos"]=getdefault(item,"recpos","-");//--��ǰҳ���л�չ����Щ�Ƽ�λ��������ڶ���Ƽ�λ������Ƽ�Ϊ֮����@�ָ��������ݶ�����Ʒҳʹ��item,���ﳵʹ��basket����������ʹ��user--
				postData["recmethod"]=getdefault(item,"recmethod","-");//--��recpos��Ӧ�����֮����@�ָ���������Ƕ�Ӧ�Ƽ�Ϊʹ�õ��㷨ABTtest���ã��п��ܴ���ͬһ�Ƽ�λ��ʹ�ò�ͬ�㷨�����--
				
				postData["cost"]=getdefault(item,"cost","0");//--����ǹ������Ʒ����Ʒ�۸�Ӧ�ô��ݹ�������item��Ӧ�������ͬ�ļ۸�֮����@�ָ�--
				postData["buycnt"]=getdefault(item,"buycnt","1");//--����ǹ������Ʒ����Ʒ�۸�Ӧ�ô��ݹ�������item��Ӧ�������ͬ�ļ۸�֮����@�ָ�--
				postData["refer"]=getdefault(item,"refer",document.referrer);
				postData["page"]=getdefault(item,"page",document.location.href);
				//������
				postData["orderid"]=getdefault(item,"orderid","-");
				var strurl="http://"+get_vqhttpd_hosts()+"/cf.html?projectId="+item['prdid']+"&data="+content.join(",")+"&random="+Math.random();
				
				mahout_post.post(strurl,postData);
				
			}
			mahout_rec=[];
		
		}catch(e){};
	};
	
	
	window.mahout_dna_fn=function()
	{
		try{
			if(typeof(mahout_dna)=='undefined')
			{
				return ;
			}
	
//			for(var i=0;i<mahout_dna.length;i++)
//			{
//				var item=mahout_dna[i];
			
//				if(item['prdid'] == 'womai'){
//					var itemcopy = clone(item);
//					itemcopy['prdid']= 'womaiB';
//					mahout_dna.push(itemcopy);
//					break;
//				}
//			}
			
			for(var i=0;i<mahout_dna.length;i++)
			{
				var item=mahout_dna[i];
				var projectId=getdefaultRemove(item,"prdid","-")
				var content=[];
				content.push(getdefaultRemove(item,"itemid","-"));
				content.push(getdefaultRemove(item,"topicid","-"));
				content.push(getdefaultRemove(item,"color","-"));
				content.push(getdefaultRemove(item,"size","-"));
				content.push(getdefaultRemove(item,"titie","-"));
				content.push(getdefaultRemove(item,"label","-"));
				content.push(getdefaultRemove(item,"downtime","-"));
				content.push(getdefaultRemove(item,"uptime","-"));
				content.push(getdefaultRemove(item,"shape","-"));
				content.push(getdefaultRemove(item,"price","-"));
				content.push(getdefaultRemove(item,"usepeople","-"));
				content.push(getdefaultRemove(item,"rtnmsg","-"));
				
				var split="";
				var KVDATA="";
				for(var p in item)
				{
					KVDATA+=split+encodeURIComponent(p)+"="+getdefaultRemove(item,p,"-");
					split="&";
				}
				content.push(encodeURIComponent(KVDATA));
				content.push(getdefaultRemove(item,"datetime","-"));
				var postData={};
				postData["data"]=content.join(",");
				var strurl="http://"+get_vqhttpd_hosts()+"/dna.html?projectId="+projectId+"&random="+Math.random();

				mahout_post.post(strurl,postData);
			}
			
			mahout_dna=[];
		
		}catch(e){};
	} ;
	
	window.mahout_clear_cookie=function()
	{
		var cookiekey="mahout_user_history_vipshop";
		cookieop.set(cookiekey,"",getdefaultCookieAttr());
	};
		
	var requestParams=function(pa)
	{
		var rec_params=pa;
		if(typeof(pa)=='undefined')
		{
			if(typeof(mahout_recommend_params)=='undefined')
			{
				return null;
			}
			rec_params=mahout_recommend_params;
		}

		
		var paramsArr=rec_params.split("@");
		if(paramsArr.length<7)
		{
			return null;
		}
		
		var callback=paramsArr[0];
		var projectId=paramsArr[1];
		var rectype=paramsArr[2];
		var toReduce=paramsArr[3];
		var isUseCookie=paramsArr[4];
		var topN=paramsArr[5];
		var viewListStr=paramsArr[6];
		var recpos="";
		if(paramsArr.length==8)
		{
			recpos=paramsArr[7];
		}
		var cookiekey="mahout_user_history_"+projectId;
		
		if(isUseCookie=="1")
		{
			viewListStr+=":"+cookieop.get(cookiekey);
		}
		
		var viewList=viewListStr.split(":");
		var uniqViewListStr="";
		var joinChar="";
		var uniqObj={};
		for(var i=0;i<viewList.length&&i<10;i++)
		{
			var key=viewList[i];
			if(typeof(uniqObj[key])=="undefined"&&key!="undefined")
			{
				uniqObj[key]=1;
				uniqViewListStr+=joinChar+key;
				joinChar=":";
			}
		}

		cookieop.set(cookiekey,uniqViewListStr,getdefaultCookieAttr());
		return callback+"@"+projectId+"@"+rectype+"@"+toReduce+"@"+isUseCookie+"@"+topN+"@"+uniqViewListStr+"@"+recpos;
	};
	
	window.mahout_request=function(pa)
	{
		try{
			var strparams=requestParams(pa);
			if(strparams==null)
			{
				return ;
			}
			var isDebug="false";
			if(typeof(mahout_isdebug)!="undefined"&&mahout_isdebug==true)
			{
				isDebug="true";
			}
			var retryfn=function()
			{
				var host_index2=get_recommend_hosts_index();
				var sc2=document.createElement("script");
			    sc2.src="http://"+mahout_recommend_hosts[host_index2]+"/recommender/recommend?user="+strparams+"&hostindex="+host_index2+"&debug=true&r="+Math.random();
			    mahout_append_child(sc2);
			}
			var host_index=get_recommend_hosts_index(retryfn);
			var sc=document.createElement("script");
		    sc.src="http://"+mahout_recommend_hosts[host_index]+"/recommender/recommend?user="+strparams+"&hostindex="+host_index+"&debug=true&r="+Math.random();
		    mahout_append_child(sc);

		}catch(e){};
		
	};
	mahout_request();
	mahout_dna_fn();
	mahout_rec_fn();
})();