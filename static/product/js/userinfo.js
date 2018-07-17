
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

function getUserinfo(){
	var userinfo = $.cookie("userinfo");
	if(userinfo != null && userinfo.indexOf("|") != -1){
		var userinfoArray = userinfo.split("|");
		if(userinfoArray.length > 1){
			return userinfoArray[1];
		}
	}
	return "";
}

function getNickname(){
	var userinfo = $.cookie("userinfo");
	if(userinfo != null && userinfo.indexOf("|") != -1){
		var userinfoArray = userinfo.split("|");
		if(userinfoArray.length > 1){
			return userinfoArray[0];
		}
	}
	return "";
}

function getSessionId(){
	var userinfo = $.cookie("userinfo");
	var sessionid = "";
	if(userinfo != null && userinfo.indexOf("|") != -1){
		var userinfoArray = userinfo.split("|");
		if(userinfoArray.length > 4){
			sessionid = userinfoArray[4];
		}
	}
	return sessionid;
}
//读cookie
function readCookie(name){
	var cookieValue = "";
	var search = name + "=";
	if(document.cookie.length > 0){
		offset = document.cookie.indexOf(search);
		if (offset != -1){
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}
function getUserLevel(){
	var level = '1',vizuryCookie = readCookie("vizurylevel_cookie");
	if(vizuryCookie != null && vizuryCookie != ""){
		var values = jQuery.trim(vizuryCookie).split('|');
		level = values[0];
	}
	return level;
}

function getUserEmail(){
	 var userinfo = $.cookie("userinfo");
	 var email = "";
	 if(userinfo != null && userinfo.indexOf("|") != -1){
		 var userinfoArray = userinfo.split("|");
		 if(userinfoArray.length > 6){
		      email = userinfoArray[6];
		 }
			
	 }
	 return email;
}

function getUserId(){
	 var userinfo = $.cookie("userinfo");
	 var userid = "";
	 if(userinfo != null && userinfo.indexOf("|") != -1){
		 var userinfoArray = userinfo.split("|");
		 if(userinfoArray.length > 7){
			 userid = userinfoArray[7];
		 }
			
	 }
	 return userid;
}

function getVip(){
	 var userinfo = $.cookie("userinfo");
	 var isvip = "0";
	 if(userinfo != null && userinfo.indexOf("|") != -1){
		 var userinfoArray = userinfo.split("|");
		 if(userinfoArray.length > 8){
			 isvip = userinfoArray[8];
		 }
			
	 }
	 return isvip;
}
function getUserGroupName(){
	 var userinfo = $.cookie("userinfo");
	 var userGroupID = "";
	 if(userinfo != null && userinfo.indexOf("|") != -1){
		 var userinfoArray = userinfo.split("|");
		 if(userinfoArray.length > 3){
			 userGroupID = userinfoArray[3];
		 }
			
	 }
	 return userGroupID;
}