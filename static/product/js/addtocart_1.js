var _articleId;
var addTypeFlag;
var clickX;
var clickY;
var tuanFlag = false;
function tuanGoToCart(tuanAtclId,tuanMid){
	tuanFlag = true;
	isGoToCart(tuanAtclId,tuanMid);
}
function isGoToCart(articleId,midd,amount){
	getClickPosition();//�õ��������λ��,Ϊ���ﳵ���Ͳ�һ�µĵ������λ����׼��
	writeCookie("canWriteCookie", "true", "0.1");
	if(readCookie("canWriteCookie")!=("true")){
		comAlert("���빺�ﳵ֮ǰ���ȿ���Cookie!");
		return;
	}
	_articleId=articleId;
	if(midd == undefined){
		midd = mid;
	}
	//���빺�ﳵ������
	var jianshu = 1;
	if(amount){
		jianshu = amount;
	}else if(jQuery("#amount").length>0){
		jianshu=jQuery("#amount").val();
	}
	//�ж���Ʒ�����Ƿ�Ϸ�
	if (jianshu <=0){
		comAlert("��������ȷ����Ʒ����");
		if(jQuery("#amount").length>0){
			jQuery("#amount").val(1);
		}
		return;
	}
	if(jianshu.length > 10){
		comAlert("�����������̫���ˣ�");
		if(jQuery("#amount").length>0){
			jQuery("#amount").val(1);
		}
		return;
	}
	//�Ƿ�����ɱ��Ʒ
	if(!!jQuery("#saleTimer").css("display")=='block' && !!jQuery("#isSaleDiv").css('display')=='none'){
		isSaleDiv();
	}else {
		closedivs();
		//�ڼӳ�֮ǰʵʱ��ȡ��������֤ by wxr
		var numparams = new Object();  
		numparams["productId"] = articleId;
		numparams["mid"] = mid;
		numparams["random"] = Math.random();
		$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
		$.post(frontPath+"/product/checkProductAmount.do",numparams,function(data){
			var productmaynum = data-jianshu;
			if(productmaynum >= 0){
                //�ж��Ƿ���best��Ӫ��Ʒ
                var returnUrl = window.location.href;
                var bestEnjoyParams = new Object();
                bestEnjoyParams["productId"] = articleId;
                bestEnjoyParams["returnUrl"] = returnUrl;
                $.post(frontPath+"/checkBestEnjoy.do",bestEnjoyParams,function(data2){
                    data2 = eval('(' + data2 + ')');
					if(data2.bestEnjoy == true && data2.isLogin == false){
                        comAlert("����ƷΪBEST��Աר��Ʒ�����½��ȷ���Ƿ��й����ʸ�Ŷ",
                            {"confirm":"֪����","cancel":"ȥ��¼","close":"false"},
                            function ok(){},
                            function cancel(){
                                var getPassportUrl = frontPath + "/loginUrl.do?tt=" + Math.random();
                                $.getJSON(getPassportUrl, function(data, status) {
                                    var passportUrl = data.passportLoginUrl;
                                    var uri = passportUrl + "?mid="+ mid +"&returnUrl=" + encodeURIComponent(returnUrl);
                                    window.location.href=uri;
                                    return;
                                });
							}
                        )
					}else{
                        //��ʼ���빺�ﳵ
                        var params = new Object();
                        params["ObjectId"] = articleId;
                        params["mid"] = midd;
                        params["jianshu"] = jianshu;
                        params["randomT"] = Math.random();
                        if(tuanFlag){
                            params["tuanFlag"] = 1;
                        }else{
                            params["tuanFlag"] = 0;
                        }
                        jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
                        jQuery.post(frontPath+"/addtocart.do",params,function(data){
                            addTypeFlag=1;
                            loadAddToCartMessage(data);
                        });
                    }
				});
				
			}else{
				comAlert("�Բ��𣬿�治�㣡");
				if(data > 0){
					jQuery("#amount").val(data);
				}else{
					jQuery("#amount").val(1);
				}
			}
		}); 
	}
	try{
		var $this = $('#_gatrack_productlist_listpic_'+articleId);
		var articleName = $this.find("img").attr("alt");
		var action = $this.attr('data-ga');
		product_add(articleId,articleName,action);
	}catch(e){}//ga����룬���ӹ��ﳵ
	try{
		//piwik�����ӳ�
		if(typeof(piwik_type) != "undefined"){
			$("#j-piwik").load("/trackingcode/tracking/addcart.do?pid="+articleId);
		}
	}catch(e){}
}
//�رռ��빺�ﳵ������
function closeGoToCartLayer2(){
	$('#addtocartcompages_box').hide();
	$('#addtocartPackage_box').hide();
	$('#addtocart_box').hide();
	$('#addToCartDiv').hide();
	$("#addtocart_box").hide();
	$('.list_buy_pop').hide();
	closeShade();
}
function isSaleDiv(){
	$("#isSaleDiv").fadeIn();
}
function closedivs(){
	if(jQuery("#isSaleDiv").length>0){
		jQuery("#isSaleDiv").fadeOut();
	}
}
//���ʲ�һ�´���
function doGoodsTypeDifferent(){
	var h=110;
  	var w=355;
  	var layer=document.getElementById("addToCartFalseDiv");
  	if(layer!=null){
    	var top = 0;
		var left = 0;
		var elWidth = 0;
		top += clickY;
		left += clickX;
		layer.style.top=top-h/4+"px";
		layer.style.left = left-w/4 + "px";
		
    }else{
    	createLayer1(h,w);
    }
  	
	if(!!addTypeFlag){
		if(addTypeFlag==1){
			CancelEmptyCompages();
			jQuery("#goodsTypeMessage").css("display","block");
		}else if(addTypeFlag==2){
			closeGoodsTypeMessage();
			jQuery("#goodsTypeMessage").css("display","block");
		}
	}else{
		jQuery("#goodsTypeMessage").css("display","block");
	}
	jQuery("#addToCartFalseDiv").css("display","block");
}
//���Ͳ�һ�´���
function doDifferentProduct(){
	var h=110;
  	var w=355;
  	var layer=document.getElementById("addToCartFalseDiv");
  	if(layer!=null){
    	var top = 0;
		var left = 0;
		var elWidth = 0;
		top += clickY;
		left += clickX;
		layer.style.top=top-h/4+"px";
		layer.style.left = left-w/4 + "px";
    }else{
    	createLayer1(h,w);
    }
	if(!!addTypeFlag){
		if(addTypeFlag==1){
			CancelEmptyCompages();
			jQuery("#differentMessage").css("display","block");
		}else if(addTypeFlag==2){
			closeGoodsTypeMessage();
			jQuery("#differentMessage").css("display","block");
		}
	}else{
		jQuery("#differentMessage").css("display","block");
	}
	jQuery("#addToCartFalseDiv").css("display","block");
}
function closeGoodsTypeMessage(va){
	hideDiv();
}

function confirmGoodsTypeMessage(va){
	hideDiv();
	var params = new Object();  
	params["mid"] = mid;
	params["randomT"] = Math.random();
	jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	jQuery.post(frontPath + "/delcart.do",params,function(data){
		if(!!addTypeFlag){
			if(addTypeFlag==1){
				isGoToCart(_articleId,mid);
			}else{
				isGoToCartCompages();
			}
		}else{
			isGoToCart(_articleId,mid);
		}
		
	});
}
function confirmEmptyCompages(va){
	hideDiv();
	var params = new Object();  
	params["mid"] = mid;
	params["randomT"] = Math.random();
	jQuery.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	jQuery.post(frontPath + "/delcart.do",params,function(data){
		isGoToCartCompages();
	});
 }

function CancelEmptyCompages(va){
	hideDiv();
}
function createLayer1(height, width) {
	var top = 0;
	var left = 0;
	top += clickY;
	left += clickX;
	var obj = document.createElement("div");
	obj.id = "addToCartFalseDiv";
	obj.style.cssText = "position:absolute;z-index:100;";
	obj.style.height = height + "px";
	obj.style.width = width + "px";
	
	obj.style.top = top - height/4 + "px";
	obj.style.left = left - width/4 + "px";
	var html="<div id='goodsTypeMessage' style='display: none; position: absolute;'>" +
			"<div class='addTC_box'>" +
			"<div class='addTC'>" +
			"<div class='top'><span>��ܰ��ʾ:���������������Ʒ���ܷ�ͬһ���ﳵ�ϡ�</span>" +
			"<i onclick='closeGoodsTypeMessage(1)'></i></div>" +
			"<div class='box'>" +
			"<div class='txt'>��Ҫ������ﳵ��ԭ��Ʒ��</span></div>" +
			"<div class='btn'><a href='javascript:;'><span onclick='confirmGoodsTypeMessage(1)' id='confirmShop'>ȷ�����</span></a>" +
			" <a href='javascript:;'>" +
			"<span onclick='closeGoodsTypeMessage(1)' id='CancelShop'>ȡ�����</span></a></div></div></div><div class='shadow1'></div><div class='shadow2'></div></div></div>" +
			"<div id='differentMessage' style='display: none; position: absolute;'>" +
			"<div class='addTC_box'>" +
			"<div class='addTC'>" +
			"<div class='top'><span>��ܰ��ʾ:ר�������������Ʒ���ܷ�ͬһ���ﳵ��~</span>" +
			"<i onclick='closeGoodsTypeMessage(2)'></i></div>" +
			"<div class='box'><div class='txt'>��Ҫ������ﳵ��ԭ��Ʒ��</span></div><div class='btn'><a href='javascript:;'><span onclick='confirmGoodsTypeMessage(2)' id='confirmShop'>ȷ�����</span></a>" +
			" <a href='javascript:;'>" +
			"<span onclick='closeGoodsTypeMessage(2)' id='CancelShop'>ȡ�����</span></a></div></div></div><div class='shadow1'></div><div class='shadow2'></div></div></div>";
	obj.innerHTML=html;
	document.body.appendChild(obj);
	
}
function hideDiv(){
	jQuery("#addToCartFalseDiv").css("display","none");
	jQuery("#goodsTypeMessage").css("display","none");
	jQuery("#differentMessage").css("display","none");
}
function getEvent1() {
	if (document.all) {
		return window.event;// �����ie
	}
	func = getEvent1.caller;
	while (func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
					|| (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func = func.caller;
	}
	return null;
}
function getClickPosition(){
	var evt=getEvent1();
	if(null!=evt){
		var el=evt.target||evt.srcElement;
		var top=0;
		var left=0;
		while(el){
			top+=el.offsetTop;
			left+=el.offsetLeft;
			el=el.offsetParent;
		}
		if(top>0){
			clickX=left;
			clickY=top;
		}
	}
}
/*2014�ղظİ�*/
/* 
 * �رձ������ֲ�
 */
function closeShade(){
	if($("#layoutBg").length > 0){$("#layoutBg").remove()}
}

