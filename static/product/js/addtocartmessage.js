function loadAddToCartMessage(msg){
	if(msg.indexOf("successView")!=-1){
		if(msg.length>11){
			var errorMsg=msg.substring(11);
			comAlert(errorMsg);
		}
  		doSuccess();
  	}else if(msg=="GoodsTypeDifferent"){
	  	doGoodsTypeDifferent();
  	}else if(msg=="DifferentProduct"){
		doDifferentProduct();
  	}else if(msg.indexOf("presentView")!=-1){
  		location = msg.substring(11);
  	}else if(msg.indexOf("errorMsg:")!=-1 && msg.substring(9)!="null"){
	    var m =	msg.substring(9);
	    comAlert(m);
  	}else if(msg.indexOf("outAmount:")!=-1){
		var m = msg.substring(10);
		//var alertMsg = "销售库存不足！";
		comAlert("销售库存不足！");
		var obj=jQuery("#amount");
		if(!isNaN(m)){
			obj.val(m);
		}
      	obj.focus();
  	}else if(msg.indexOf("turnUrl:") != -1){
  		var m = msg.substring(8);
  		location.href = m;
  	}
}

/**
 *	调用此方法需要实现doSuccess()和alertMsg()两个方法的渲染
 *
 */
function loadAddToCartMessage2(msg,callbackParams){
	if(msg.indexOf("successView")!=-1){
		if(msg.length>11){
			var errorMsg=msg.substring(11);
		}
  		doSuccess(callbackParams);
  	}else{
  		callbackParams.msg = msg;
  		doFailure(callbackParams);
  	}
}