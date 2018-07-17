if (!LIM) var LIM = {};
var live800Icon_fn = [];
LIM.live800_IconInit = function() {
	if (live800Icon_fn && live800Icon_fn.length > 0) {
		live800Icon_fn[0]();
	}
};

(function(){
	var CONST = {
		"live800Server" : ["http://cc-online.womaiapp.com/live800"],
		"live800CssUrl" : "http://cc-online.womaiapp.com/live800/deploy/live800Button.css",
		"live800StaticIconUrl" : ["http://cc-online.womaiapp.com/live800/deploy/ico-online.png","http://cc-online.womaiapp.com/live800/deploy/ico-offline.png"],
		"live800IconUrl" : ["http://cc-online.womaiapp.com/live800/deploy/live800_icon_s.png","http://cc-online.womaiapp.com/live800/deploy/live800_icon_f.png"]
	};
	var openWinURL;
	var SERVERCOUNT = CONST["live800Server"].length;

	function bind(el, name, func) {
		if (window.attachEvent) {
			el.attachEvent("on" + name, func);
		} else {
			el.addEventListener(name, func, false);
		}
	};

	function $(name, ctx) {
		var childs = (ctx || document.body).getElementsByTagName('*'),
			length = childs.length,
			els = [];
		for (var i = 0; i < length; i++) {
			if (childs[i].className.match(new RegExp("(^|\\s)" + name + "(\\s|$)"))) {
				els.push(childs[i]);
			}
		}
		return els;
	};
	Sys = function() {;
	}
	Sys.NS = (document.layers) ? true : false;
	Sys.IE = (document.all) ? true : false;
	Sys.DOM = (document.getElementById) ? true : false;
	if (Sys.IE)
		Sys.DOM = false;
	Sys.MAC = (navigator.platform) && (navigator.platform.toUpperCase().indexOf('MAC') >= 0);
	if (Sys.NS)
		Sys.MAC = false;
	Sys.getObj = function(objId) {
		if (document.getElementById)
			return document.getElementById(objId);
		else if (document.all)
			return document.all(objId);
	};
	/**原生js实现jquery的document.ready  开始**/
	if (!LIVEDOM) var LIVEDOM = {};
	LIVEDOM.domReady = function(f) {
		with(LIVEDOM) {
			if (domReady.done) {
				return f();
			}
			if (domReady.timer) {
				domReady.ready.push(f);
			} else {
				bind(window, "load", isDOMReady);
				domReady.ready = [f];
				var h = this;
				domReady.timer = setInterval(function() {
					h.isDOMReady();
				}, 13);
			}
		}
	};
	LIVEDOM.isDOMReady = function() {
		with(LIVEDOM) {
			if (domReady.done) {
				return false;
			}
			if (document && document.getElementsByTagName && document.getElementById && document.body) {
				clearInterval(domReady.timer);
				domReady.timer = null;
				for (var i = 0; i < domReady.ready.length; i++) {
					domReady.ready[i]();
				}
				domReady.ready = null;
				domReady.done = true;
			}
		}
	};
	/**原生js实现jquery的document.ready  结束**/

	function getRandomServer(servers) {
		var count = servers.length,
			random;
		if (count == 1) {
			random = 0;
		} else {
			random = (new Date()).getTime() % count;
		}
		return servers[random];
	};

	function getProtocol() {
		var protocol = document.location.protocol;
		protocol = (protocol == "file:") ? "http:" : protocol;
		return protocol;
	};

	function getchaturl(ele, companyId, skillId) {
		var company = ele.getAttribute("lim:company");
		if (companyId) {
			company = companyId;
		}
		var page = ele.getAttribute("lim:page");
		var shopId = ele.getAttribute("lim:shopId");
		var chatUrl = CONST["live800Server"][getServer(company)] + "/chatClient/chatbox.jsp",
			params = ele
			.getAttribute("lim:params") || "_=_",
			queryString = "",
			html = "",
			el = ele;
		queryString += "companyID=" + company;
		if (ele.getAttribute("lim:page") && ele.getAttribute("lim:page") != null) {
			queryString += "&page=" + urlEncode(ele.getAttribute("lim:page"));
		}
		if (queryString.indexOf("enterurl") == -1) {
			queryString += "&enterurl=" + urlEncode(document.URL);
		}
		if (params) {
			if (skillId) {
				if (params.indexOf("skillId") != -1) {
					var pa = urlToParams(params),
						oldSk = "skillId=" + pa["skillId"],
						newSk = "skillId=" + skillId;
					params = params.replace(oldSk, newSk);
				} else {
					params = params + "&skillId=" + skillId;
				}
			} else {
				if (params.indexOf("skillId") != -1) {
					var pa = urlToParams(params),
						oldSk = "skillId=" + pa["skillId"],
						newSk = "skillId=0";
					params = params.replace(oldSk, newSk);
				}
			}
			queryString += "&" + params;
		}
		if (getProtocol() == "https:") {
			chatUrl.replace("http:", "https:");
		}
		return chatUrl + "?" + queryString;
	};

	function init(el, s, companyId, skillId) {
		var statusClass = null;
		var cursor = "pointer";
		switch (s) {
			case -1:
				statusClass = "disable";
				cursor = "default";
				break;
			case 0:
				statusClass = "offline";
				cursor = "pointer";
				break;
			case 1:
				statusClass = "online";
				cursor = "pointer";
				break;
			default:
				cursor = "default";
				statusClass = null;
		}
		var shopName = "%E5%95%86%E9%93%BA";
		var offLineTip = "%E5%BD%93%E5%89%8D%E5%95%86%E5%AE%B6%E5%AE%A2%E6%9C%8D%E6%9C%AA%E5%9C%A8%E7%BA%BF%EF%BC%8C%E6%82%A8%E5%8F%AF%E4%BB%A5%E7%BB%99%E5%95%86%E5%AE%B6%E7%95%99%E8%A8%80";
		var tip = el.getAttribute("lim:offLineTip");
		if (tip != "") {
			offLineTip = tip;
		}
		var sName = el.getAttribute("lim:shopName");
		if (sName != "") {
			shopName = sName;
		}
		var inPreferences = new Array();
		inPreferences["statusClass"] = statusClass;
		inPreferences["cursor"] = cursor;
		inPreferences["shopName"] = shopName;
		inPreferences["offLineTip"] = offLineTip;
		if (companyId) {
			inPreferences["companyId"] = companyId;
		}
		if (skillId) {
			inPreferences["skillId"] = skillId;
		}
		var iconType = "steady";
		try {
			iconType = el.getAttribute("lim:type");
		} catch (e) {
			iconType = "steady";
		}
		if (iconType == "float") {
			new FloatIcon(el, inPreferences);
		} else {
			new SteadyIcon(el, inPreferences);
		}
	};

	function SteadyIcon(el, inPreferences) {
		this.elObj = el;
		this.preferences = inPreferences;
		this.status = this.preferences["statusClass"];
		this.image = CONST["live800StaticIconUrl"][0];
		if (this.status == "offline") {
			this.image = CONST["live800StaticIconUrl"][1];
		}
		this.cursor = this.preferences["cursor"];
		this.shopName = this.preferences["shopName"];
		this.offLineTip = this.preferences["offLineTip"];
		this.companyId = this.preferences["companyId"];
		this.skillId = this.preferences["skillId"];
		this.init();
	}
	SteadyIcon.prototype.init = function() {
		this.emptyIcon();
		if (this.status == "online") {
			this.itemCreate();
			this.clickAction();
		} else if (this.status == "offline") {
			this.itemCreate();
			this.offlineTipAction();
		} else { //其他状态不做任何操作 
			;
		}
	};

	SteadyIcon.prototype.emptyIcon = function() {
		var el = this.elObj;
		el.innerHTML = "";
	};

	SteadyIcon.prototype.itemCreate = function() {
		var companyId = this.companyId;
		var el = this.elObj;
		var status = this.status;
		if (!companyId) {
			companyId = el.getAttribute("lim:company") || "";
		}
		var skillId = this.skillId;
		if (!skillId) {
			skillId = null;
		}
		var url = getchaturl(this.elObj, companyId, skillId);
		//openWinURL = url;
		var openId = "live800_" + this.elObj.getAttribute("lim:company");
		var onclickFun = "onclick='openwindow(\"" + openId + "\");'";
		if (status == "offline" && "3" != companyId) {
			//onclickFun = "onclick='return false;'";
			//this.cursor = "default";
		}
		this.elObj.innerHTML = "<a href='" + url + "' " + onclickFun + " class='" + status + "s" + "' style='display:block;background-image:url(" + this.image + ");background-repeat:no-repeat;overflow:hidden;cursor:" + this.cursor + ";border:none;' target='" + openId + "' ></a>";
	}

	SteadyIcon.prototype.clickAction = function() {
		this.elObj.title = "";
	};

	SteadyIcon.prototype.offlineTipAction = function() {
		this.elObj.title = urlDecode(this.offLineTip);
	};

	function FloatIcon(el, inPreferences) {
		this.preferences = inPreferences;
		this.locationObj = el;
		this.company = el.getAttribute("lim:company");
		this.shopName = this.preferences["shopName"];
		this.offLineTip = this.preferences["offLineTip"];
		this.inviteInnerHtml = null;
		this.changeTimerId = null;
		this.layerHtml = null;
		this.statusClass = this.preferences["statusClass"];
		this.image = CONST["live800IconUrl"][1];
		this.cursor = this.preferences["cursor"];
		this.toRight = el.getAttribute("lim:Position") == null ? "1" : el.getAttribute("lim:position");
		this.floatTop = parseInt(el.getAttribute("lim:FloatTop") == null ? "150" : el.getAttribute("lim:floatTop"));
		this.floatSide = parseInt(el.getAttribute("lim:FloatSide") == null ? "100" : el.getAttribute("lim:floatSide"));
		this.toBottom = false;
		this.init();
	};
	FloatIcon.prototype.init = function() {
		this.FloatIcon_generate();
		if (this.statusClass == "online") {
			this.clickAction();
		} else {
			this.offlineTipAction();
		}
	};
	FloatIcon.prototype.FloatIcon_generate = function() {
		var marginStr = " left:" + this.floatSide + "px;";
		if (this.toRight == "1") {
			marginStr = " right:" + this.floatSide + "px;";
		}
		this.layerHtml = "<div id=\"FloatIcon\" style=\"z-index:8888;position:absolute;visibility:visible;" + marginStr + "top:200px;height:auto;width:auto;\"><div style='position:relative;'>";
		this.inviteInnerHtml = '<a id="live800iconlink" target="_self" href="javascript:void(0)"' + ' class="' + this.statusClass + 'f' + '" style="display:block;background-image:url(' + this.image + ');background-repeat:no-repeat;overflow:hidden;cursor:default' + ';border:none;"><div class="shopTitle"><div style="width:55px;height:18px;text-align:right;overflow:hidden;" title=' + urlDecode(this.shopName) + '>' + urlDecode(this.shopName) + '您好</div>' + '<div style="width:55px;">在线客服</div></div><img name="live800icon" id="live800icon" src="' + CONST["live800Server"] + '/SurferServer?cmd=111&companyID=' + this.company + '"  border="0" style="width:125px;height:20px;visibility:hidden;"/>' + '<div class="shopDESC" title="欢迎来到' + urlDecode(this.shopName) + '，有什么可以帮您?">欢迎来到' + urlDecode(this.shopName) + '，有什么可以帮您?</div>' + '<div id="live800FloatChatDiv" class="clickPath" style="cursor:' + this.cursor + '"></div></a>';
		this.layerHtml += this.inviteInnerHtml;
		this.layerHtml += "<div class='icon:close'><div></div>";
		this.locationObj.innerHTML = this.layerHtml;
		var floatIco = this;
		this.changeTimerId = setInterval(function() {
			changeIcon(floatIco);
		}, 200);
	};

	FloatIcon.prototype.clickAction = function() {
		var clickObj = Sys.getObj("live800FloatChatDiv");
		if (clickObj) {
			clickObj.title = "";
			var interfase = new Array();
			interfase["company"] = this.company;
			interfase["page"] = this.locationObj.getAttribute("lim:page");
			interfase["shopId"] = this.locationObj.getAttribute("lim:shopId");
			interfase["productId"] = this.locationObj.getAttribute("lim:productId");
			interfase["remark"] = this.locationObj.getAttribute("lim:remark");
			interfase["params"] = this.locationObj.getAttribute("lim:params");
			var url = getFloatOpenUrl(interfase);
			var openId = "live800_" + this.company;
			clickObj.innerHTML = "<a href='" + url + "' target='" + openId + "' style='display:block;overflow:hidden;border:none;'  onclick=\"openwindow('" + openId + "');\"></a>";
		}
	};

	FloatIcon.prototype.offlineTipAction = function() {
		var tipObj = Sys.getObj("live800FloatChatDiv");
		tipObj.title = "很抱歉，" + urlDecode(this.shopName + this.offLineTip);
	};

	function getFloatOpenUrl(interfase) {
		var company = interfase["company"];
		var page = interfase["page"];
		var shopId = interfase["shopId"];
		var chatUrl = CONST["live800Server"][getServer(company)] + "/chatClient/chatbox.jsp",
			params = interfase["params"] || "_=_",
			queryString = "",
			html = "";
		queryString += "companyID=" + company;
		queryString += "&page=" + page;
		queryString += "&shopId=" + shopId;
		if (interfase["productId"] && interfase["productId"] != "") {
			queryString += "&productId=" + interfase["productId"];
		}
		if (interfase["remark"] && interfase["remark"] != "") {
			queryString += "&remark=" + urlEncode(interfase["remark"]);
		}
		if (queryString.indexOf("enterurl") == -1) {
			queryString += "&enterurl=" + urlEncode(document.URL);
		}
		queryString += "&" + params;
		if (getProtocol() == "https:") {
			chatUrl.replace("http:", "https:");
		}
		return chatUrl + "?" + queryString;
	}

	FloatIcon.prototype.changeFloatIcon = function() {
		var obj = Sys.getObj("FloatIcon");
		var live800iconlink = Sys.getObj("live800iconlink");
		var live800icon = obj.getElementsByTagName("img")[0];
		var iconHeight = live800icon.height;
		var iconWidth = live800icon.width;
		// float to bottom
		var y;
		var x;
		if (this.toBottom) {
			if (document.body)
				y = document.body.clientHeight - iconHeight - this.floatTop;
			else
				y = innerHeight - iconHeight - this.floatTop;
		} else
			y = this.floatTop;

		// float to right
		if (this.toRight == "1" && !!iconWidth) {
			if (document.body.clientWidth)
				x = document.body.clientWidth - iconWidth - this.floatSide + 16;
			else if (document.documentElement.clientWidth) {
				x = document.documentElement.clientWidth - iconWidth - this.floatSide;
			} else
				x = innerWidth - iconWidth - this.floatSide;
		} else
			x = this.floatSide;

		var obj = null;
		if (Sys.IE) {
			obj = document.all.FloatIcon.style;
		} else if (Sys.NS) {
			obj = document.layers.FloatIcon;
		} else if (Sys.DOM) {
			obj = Sys.getObj('FloatIcon').style;
		}
		if (Sys.IE) {
			scrollPosY = 0;
			scrollPosX = 0;
			eval('try {' + 'if (typeof(document.documentElement) !=	"undefined") {' + 'scrollPosY =	document.documentElement.scrollTop;' + 'scrollPosX = document.documentElement.scrollLeft;' + '}' + '} catch	(e)	{}');
			scrollPosY = Math.max(document.body.scrollTop, scrollPosY);
			scrollPosX = Math.max(document.body.scrollLeft, scrollPosX);

			obj.left = scrollPosX + x + 'px';
			obj.top = scrollPosY + y + 'px';
		} else if (Sys.NS) {
			obj.left = pageXOffset + x;
			obj.top = pageYOffset + y;
		} else if (Sys.DOM) {
			obj.left = pageXOffset + x + 'px';
			obj.top = pageYOffset + y + 'px';
		}
	};

	FloatIcon.prototype.clearTimer = function() {
		clearInterval(this.changeTimerId);
	};

	function changeIcon(floatIcon) {
		floatIcon.changeFloatIcon();
	};

	function getServer(id) {
		if (!id) {
			alert("parameters is invalidate!");
		}
		return (id % SERVERCOUNT);
	};

	function getStringValue(queryValue) {
		if (queryValue == null || "" == queryValue) {
			return "";
		}
		var queryA = queryValue.split("&");
		var length = queryA.length;
		for (var i = 0; i < length; i++) {
			var v = queryA[i];
			var temp = v.split("=");
			var name = temp[0];
			if ("skillId" == name) {
				return temp[1];
			}
		}
		return "";
	};

	function sort(all) {
		var rs = [];
		var length = all.length;
		for (var i = 0; i < SERVERCOUNT; i++) {
			rs[i] = [];
		}
		var id;
		for (var i = 0; i < length; i++) {

			try {
				id = all[i].getAttribute("lim:company");
				var params = all[i].getAttribute("lim:params");
				var sk = getStringValue(params);
				if (!sk || sk == "") {
					sk = "0";
				}
				rs[getServer(id)].push({
					id: id,
					dom: all[i],
					skillId: sk
				});
			} catch (e) {
				continue;
			}
		}
		return rs;
	};

	function urlToParams(params) {
		try {
			var cmdMap = params.split("&"),
				cmdParams = [],
				temp;
			for (var i = 0; i < cmdMap.length; i++) {
				temp = cmdMap[i].split("=");
				cmdParams[temp[0]] = temp[1];
			}
			return cmdParams;
		} catch (e) {
			E.report('请勿非法修改参数', '1206');
			return [];
		}
	};

	function urlEncode(Str) {
		if (Str == null || Str == "") {
			return "";
		}
		var newStr = "";

		function toCase(sStr) {
			return sStr.toString(16).toUpperCase();
		};
		for (var i = 0, icode, len = Str.length; i < len; i++) {
			icode = Str.charCodeAt(i);
			if (icode < 0x10) {
				newStr += "%0" + icode.toString(16).toUpperCase();
			} else if (icode < 0x80) {
				if (icode == 0x20) {
					newStr += "+";
				} else if ((icode >= 0x30 && icode <= 0x39) || (icode >= 0x41 && icode <= 0x5A) || (icode >= 0x61 && icode <= 0x7A)) {
					newStr += Str.charAt(i);
				} else {
					newStr += "%" + toCase(icode);
				}
			} else if (icode < 0x800) {
				newStr += "%" + toCase(0xC0 + (icode >> 6));
				newStr += "%" + toCase(0x80 + icode % 0x40);
			} else {
				newStr += "%" + toCase(0xE0 + (icode >> 12));
				newStr += "%" + toCase(0x80 + (icode >> 6) % 0x40);
				newStr += "%" + toCase(0x80 + icode % 0x40);
			}
		}
		return newStr;
	};

	function urlDecode(Str) {
		if (Str == null || Str == "") {
			return "";
		}
		var newStr = "";

		function toCase(sStr) {
			return sStr.toString(16).toUpperCase();
		};
		for (var i = 0, ichar, len = Str.length; i < len;) {
			if (Str.charAt(i) == "%") {
				ichar = Str.charAt(i + 1);
				if (ichar.toLowerCase() == "e") {
					newStr += String
						.fromCharCode(((parseInt("0x" + Str.substr(i + 1, 2)) - 0xE0) * 0x1000) + ((parseInt("0x" + Str.substr(i + 4, 2)) - 0x80) * 0x40) + (parseInt("0x" + Str.substr(i + 7, 2)) - 0x80));
					i += 9;
				} else if (ichar.toLowerCase() == "c" || ichar.toLowerCase() == "d") {
					newStr += String.fromCharCode(((parseInt("0x" + Str.substr(i + 1, 2)) - 0xC0) * 0x40) + parseInt("0x" + Str.substr(i + 4, 2)) - 0x80);
					i += 6;
				} else {
					newStr += String.fromCharCode(parseInt("0x" + Str.substr(i + 1, 2)));
					i += 3;
				}
			} else {
				newStr += Str.charAt(i).replace(/\+/, " ");
				i++;
			}
		}
		return newStr;
	};

	function getParams(rs) {
		if (!rs || rs.length == 0) {
			return "";
		}
		var list = [],
			length = rs.length;
		var slist = [];
		for (var i = 0; i < length; i++) {
			list.push(rs[i].id);
			slist.push(rs[i].skillId);
		}
		return "companys=" + urlEncode(list.join(";")) + "&skillIds=" + urlEncode(slist.join(";")) + "&t=" + new Date().getTime();
	};

	function appendCss() {
		var cssLink = document.createElement("link");
		cssLink.setAttribute("type", "text/css");
		cssLink.setAttribute("rel", "stylesheet");
		cssLink.setAttribute("href", CONST["live800CssUrl"]);
		document.getElementsByTagName("head")[0].appendChild(cssLink);
	};

	function live800Request(url, onload, onerror, data) {
		this.url = url;
		this.onload = onload;
		this.onerror = onerror ? onerror : this.defaultError;
		this.data = data;
		this.init(url);
	};

	live800Request.prototype = {
		init: function(url) {
			this.script = document.createElement("script");
			this.script.setAttribute("type", "text/javascript");
			this.script.setAttribute("src", url);
			document.getElementsByTagName("head")[0].appendChild(this.script);
			var request = this;
			if (this.script) {
				if (document.all) {
					var script = this.script;
					this.script.onreadystatechange = function() {
						var state = script.readyState;
						if (state == "loaded" || state == "interactive" || state == "complete") {
							request.onload.call(request);
						}
					};
				} else {
					this.script.onload = function() {
						request.onload.call(request);
					};
				}
			} else {
				request.onerror.call(this);
			}
		},
		defaultError: function() {
			alert("create script node fail!");
		}
	};

	function onInit() {
		var icons = $("live800");
		var rs = sort(icons),
			length = rs.length;
		if (length > 0) {
			appendCss();
			for (var i = 0; i < length; i++) {
				if (rs[i] && rs[i].length > 0) {
					var url = CONST["live800Server"][i] + "/mstatus.js?sid=" + i + "&" + getParams(rs[i]);
					new live800Request(url, function() {
						var users = this.data.userlist;
						var sid = this.data.sid;
						var len = 0;
						if (typeof(live800Status) != "undefined") {
							var status = live800Status ? live800Status[sid] : [];
							var skills = null;
							if (typeof(live800Skills) != "undefined") {
								skills = live800Skills ? live800Skills[sid] : [];
							}
							if (status) {
								len = status.length;
							}
							try {
								var tempSkillId = null;
								for (var j = 0; j < len; j++) {
									if (skills) {
										tempSkillId = skills[j];
									} else {
										tempSkillId = null;
									}
									init(users[j].dom, status[j], null, tempSkillId);
								}
							} catch (e) {}
						}
					}, null, {
						sid: i,
						userlist: rs[i]
					});
				}
			}
		}
	};
	
	function getOfflineMsgOpenUrl(obj) {
		var chatUrl = CONST["live800Server"][0] + "/chatClient/chatbox.jsp",
			params = obj.getAttribute("lim:params"),
			queryString = "",
			companyId = obj.getAttribute("lim:company");
			
		queryString += "companyID=" + companyId;
		queryString += "&" + params;
		if (queryString.indexOf("enterurl") == -1) {
			queryString += "&enterurl=" + urlEncode(document.URL);
		}
		if (getProtocol() == "https:") {
			chatUrl.replace("http:", "https:");
		}
		return chatUrl + "?" + queryString;
	};
		//推送离线消息
	function sendOutlineMess() { 		
		var icon = $("live800")[0],
			companyID = icon.getAttribute("lim:company"),
			params = icon.getAttribute("lim:params"),
			reqURL,httpReq;  
		openWinURL = getOfflineMsgOpenUrl(icon);
		if (companyID&&params) {		//当有info的时候
			reqURL = CONST["live800Server"] + "/chatClient/innerPages/getUserMsg.jsp?" + params + "&companyID=" + companyID + "&tm=" + new Date().getTime();			
			//请求成功之后的处理
			function completeHandle( pra , policyId){
				if(pra&&pra.length>0){	
					createMess(pra, policyId);
					window.clearInterval(offlineMsgTimer);		
				}
			}			
			var offMsgScript = document.getElementById("offMsgScript");   //请求离线信息script的id
			if ( offMsgScript ) {						//当有创建的script标签时移除该标签
				offMsgScript.remove();				
			}								
			new live800Request(reqURL, function(){
				this.script.setAttribute("id","offMsgScript");
				var messStr = window.live800OfflineMsgs;
				var policyId = "";	
				if(window.live800PId){
					policyId = window.live800PId;
				}
				completeHandle(messStr, policyId);
				var t = new Date();
			}, null, null); 
		}
	};
	
	//创建离线消息	
	function createMess(messJson, policyId) {
		var	messBox = document.createElement("div"),    //消息框大盒子
				lastButt = document.createElement("p"),     //切换按钮
				nextButt = document.createElement("p"),     //切换按钮
				fra = document.createDocumentFragment(),
				messBoxTop = document.createElement("p"),		//消息框上边的圆角
		    	messBoxBott = document.createElement("p"),		//消息框下边的圆角
		    	messCont = document.createElement("div"),			//消息框内容
		    	shopName = document.createElement("p"),     //显示店铺名
		    	shopMess = document.createElement("div"),    //显示具体的回复消息
		    	round = document.createElement("span"),    //气泡圆角
		    	topCss = document.createElement("link");   //顶层添加样式表  
		 
		 topCss.setAttribute("rel","stylesheet");
		 topCss.setAttribute("type","text/css");
		 var cssSrc = CONST["live800Server"]+"/deploy/live800Button.css";
		 topCss.setAttribute("href",cssSrc);
	
		messBox.className = "mess_box";  
		lastButt.className = "last_page have_mess";
		nextButt.className = "next_page  have_mess";
		messBoxTop.className = "mess_bg mess_box_top";
		messBoxBott.className = "mess_bg mess_box_bott";
		messCont.className = "mess_cont"; 
		shopName.className = "shop_name";
		shopMess.className = "shop_mess";
		round.className = "round";  
			
		lastButt.innerHTML = "上一条";
		nextButt.innerHTML = "下一条";
		messCont.setAttribute("data-skillID",messJson[0].skillId);		//给messCont一个skillId属性 方便使用
		shopName.innerHTML = "&ldquo;来自客服的新消息&rdquo;";		//初始化显示店铺名信息
		shopMess.innerHTML = moreString(messJson[0].msgContent);		//初始化显示消息内容
				
		function isHaveNess(){
			lastButt.className = "last_page have_mess";
			nextButt.className = "next_page  have_mess";
			if (messJson.length === 1) {
				lastButt.className = "last_page no_mess";
				nextButt.className = "next_page  no_mess";
			}
		}
		isHaveNess();	
		
		var i=0;
		bind(lastButt,"click",function(){
			if (messJson.length) {					
				isHaveNess();					
				if (i === 0) {
					i = messJson.length-1;
				} else{
					i --;
				}
				messCont.setAttribute("data-skillID",messJson[i].skillId);		
				//shopName.innerHTML = messJson[i].name+" 给您回复消息：";	
				shopMess.innerHTML =  moreString(messJson[i].msgContent);
				
			} else{
				window.top.document.body.removeChild(messBox);
			}
		});
		bind(nextButt,"click",function(){
			if (messJson.length) {					
				isHaveNess();					
				if ( (i+1) < messJson.length ) {
					i++;
				} else{
					i=0;
				}
				messCont.setAttribute("data-skillID",messJson[i].skillId);			
				shopMess.innerHTML = moreString(messJson[i].msgContent);	
			}else{
				window.top.document.body.removeChild(messBox);
			}
		});
		bind(messCont,"click",function(){
			var dataSkillId = messCont.getAttribute("data-skillID");
			if(openWinURL.indexOf("skillId")!=-1){
				openWinURL = openWinURL.replace(/skillId=\d+/gi, "skillId=" + dataSkillId);
				openWinURL = openWinURL.replace(/policyId=\d+/gi, "policyId=" + policyId);
			} else {
				openWinURL = openWinURL + "&skillId=" + dataSkillId;
			}
			if(openWinURL.indexOf("policyId")!=-1){
				openWinURL = openWinURL.replace(/policyId=\d+/gi, "policyId=" + policyId);
			} else {
				openWinURL = openWinURL + "&policyId=" + policyId;
			}
			window.open(openWinURL,"_blank","toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=778,height=534",false);					
			for (var j=0;j<messJson.length;j++) {
				if (messJson[j].skillId === dataSkillId) {
					messJson.splice(j,1);	
					j = j-1;
				}
			}
			i = 0;
			nextButt.click();	
		});
			
		function moreString(str){ //消息过长添加更多按钮，
			var len = 0;    //字节长度
			for (var j=0; j<=str.length;j++ ) {  
			  	if (str.charCodeAt(j)>127 || str.charCodeAt(j)==94) {  
			    	len += 2;  
			    } else {  
			    	len ++;  
			    }
			    if( len>=100 && j < (str.length-1)){
			    	var moreStr = str.substring(j,str.length);
					replaceStr = "<span id='show_more_str' onclick='document.getElementById(\"moreStr\").style.display = \"inline\";document.getElementById(\"show_more_str\").style.display = \"none\";event.stopPropagation();'>更多</span><span id='moreStr' style='display:none;'>"+moreStr+"</span>";
					str = str.substring(0,j)+replaceStr;
					break;
			    }
			}		
			return str;
		}
			
		messCont.appendChild(shopName);
		messCont.appendChild(shopMess);
		fra.appendChild(messBoxTop);
		fra.appendChild(messCont);
		fra.appendChild(messBoxBott);
		messBox.appendChild(fra);
		messBox.appendChild(round);
		messBox.appendChild(lastButt);	
		messBox.appendChild(nextButt);	
		window.top.document.body.appendChild(messBox);	
		window.top.document.head.appendChild(topCss);		
	};
	
	//将字符串转换为json
	function strToJson(str) { 			
		var json = eval('(' + str + ')');
		return json;
	};
		   
	var offlineMsgTimer;
	bind(window, "load", function() {
		onInit();
		live800Icon_fn.push(onInit);
		sendOutlineMess();
		offlineMsgTimer = setInterval(function(){
			sendOutlineMess();
		}, 300000);
	});
})();


function openwindow(openId, winAttr) {
	var tempWinAttr = "toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=778,height=534";
	if (winAttr) {
		tempWinAttr = winAttr;
	}
	try {
		var newWindow = window.open('', openId, tempWinAttr);
		newWindow.focus();
		newWindow.opener = window;
	} catch (e) {

	}
};