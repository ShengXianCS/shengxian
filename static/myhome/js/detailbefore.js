
/*
 * �ƶ������������  ������PC������ҳ 
 * ��ת��Mվ����ҳ
 * */
function initRedirectUrl(){
	if(getQueryStringRegExp("redirect") == "false") return;			//�������Ӵ��˲������ߴ��߼�
	var isAndroid = navigator.userAgent.toLowerCase().indexOf('android') >= 0,
	isIphone = navigator.userAgent.toLowerCase().indexOf('iphone') >= 0,
	isIpad = navigator.userAgent.toLowerCase().indexOf('ipad') >= 0,
	isUCiphone = navigator.userAgent.toLowerCase().indexOf('ios') >= 0,
	isSymbianOS = navigator.userAgent.toLowerCase().indexOf('symbianos') >= 0,
	isReturnH5 = navigator.userAgent.toLowerCase().indexOf('returnH5') >= 0;
	var isRedirect = false;
	if(isAndroid){
		isRedirect = true;
	}else if(isIphone){
		isRedirect = true;
	}else if(isIpad){
		isRedirect = false;
	}else if(isUCiphone){
		isRedirect = true;
	}else if(isSymbianOS){
		isRedirect = true;
	}else if(isReturnH5){
		isRedirect = false;
	}
	if(isRedirect){
		var strlocation = location.toString(), returnLocation, _index = strlocation.indexOf("?"), isHasMid = strlocation.indexOf("mid");
		if(_index != -1){returnLocation = strlocation.substring(0,_index);
	 	}else{
	 		returnLocation = strlocation;
	 	}
	 	if(isHasMid != -1)returnLocation = returnLocation+"?mid=" + mid;//��ԭ��ַ�������д���mid��ƴ��mid����
	 	var curHref = window.document.location.href;
	 	var pathName = window.document.location.pathname;
	    var pos = curHref.indexOf(pathName);
	    var curPath = curHref.substring(0,pos);
	 	var url = curPath + "/zhongliang/htm/shouji/product.html?mid=" + mid + "&pid=" + pid;// + "&returnLocation=" + encodeURIComponent(returnLocation);
		window.location = url;
	}
}
initRedirectUrl();

var sgjs = sgjs || false;
var isSellabel;
//var productbuyPrice = 0;
//var productWMPrice = 0;
//yanghaishan add

$(function(){//�Ҳ��������ﳵ�Ŀ�խ��
	var screenw = screen.width;
	if(screenw < 1210){
		$('.pwarp').addClass('wthousand');
	}else{
		$('.pwarp').removeClass('wthousand');
	}
})
function setProductPrice(data){
	var buyPrice = -1,marketPrice = 0,saveMoney = 0,VIPPrice = 0,userPoints = 0,WMPriceName = "",WMPriceValue = 0;
	if(data.buyPrice && data.buyPrice.priceValue)
		buyPrice = parseFloat(data.buyPrice.priceValue);
	if(data.marketPrice && data.marketPrice.priceValue)
		marketPrice = parseFloat(data.marketPrice.priceValue);
	if(data.saveMoney && data.saveMoney.priceValue)
		saveMoney = parseFloat(data.saveMoney.priceValue);
	if(data.VIPPrice && data.VIPPrice.priceValue)
		VIPPrice = parseFloat(data.VIPPrice.priceValue);
	if(data.userPoints && data.userPoints.priceValue)
		userPoints = parseFloat(data.userPoints.priceValue);
	
	if(data.WMPrice){
		if(data.WMPrice.priceName){
			WMPriceName = data.WMPrice.priceName;
		}
		if(data.WMPrice.priceValue){
			WMPriceValue = data.WMPrice.priceValue;
		}
	}
	
	if(buyPrice > -1){
		var content = "";
		$("#zk").hide();
		if(marketPrice > 0 && buyPrice < marketPrice){
			var zk=(data.buyPrice.priceValue/data.marketPrice.priceValue);
			zk = zk * 100;
			zk = Math.ceil(zk);
			zk = (zk/10).toFixed(1);
			
			content = "<span>"+ zk + "��" +  "</span>";
			//jQuery("#marketPrice").html("��" + data.marketPrice.priceValue);
			if(zk < 10){
				$("#zk").html(content).show();
			}
		}else{
			jQuery("#marketPrice").remove();
		}
		if(data.buyPrice && sgjs == true){
			jQuery(".pro_m_tit_1").html("��&nbsp;��&nbsp;�ۣ�");
			jQuery("#buyPrice").html("��" + buyPrice.toFixed(2));
			productbuyPrice = buyPrice.toFixed(2);
		}else{
			 jQuery(".pro_m_tit_1").html(data.buyPrice.priceName + "��");
			 jQuery("#buyPrice").html("��" + buyPrice.toFixed(2));
			 productbuyPrice = buyPrice.toFixed(2);
		}
	}

	if(saveMoney > 0){
		jQuery("#saveMoney").html("��ʡ <span>��" + data.saveMoney.priceValue + "</span>&nbsp;&nbsp;&nbsp;|");
	}
	if(buyPrice > -1 && data.buyPrice.priceName != WMPriceName && parseFloat(WMPriceValue) > parseFloat(data.buyPrice.priceValue)){
		jQuery("#WMUserinfo").css("display","block");
		jQuery("#WMPrice").html("��"+WMPriceValue);
		productWMPrice = WMPriceValue;
	}else if(VIPPrice < buyPrice && VIPPrice > 0){
		jQuery("#VIPUserinfo").css("display","block");
		jQuery("#VIPPrice").html("��"+data.VIPPrice.priceValue);
		 productbuyPrice = buyPrice.toFixed(2);
	}else{
		jQuery("#VIPPrice").prev().hide();
	}
	if(userPoints > 0){
		jQuery("#userPoints").html(data.userPoints.priceValue);
		jQuery("#integralinfo").show();
	}
	if(data.specialPrice){
		specialPriceEndTime = data.specialPrice.endtime;
		specialPriceCurrentTimer();
	}
}

//�����Ʒ�۸���ʾ
function setProductPriceForCombiPro(data){
	//alert(JSON.stringify(data))
	var id = data.id,data = data.price;
	var buyPrice = 0, marketPrice = 0,saveMoney = 0,userPoints = 0,WMPrice = 0;
	if(data.buyPrice)buyPrice = parseFloat(data.buyPrice.priceValue);
	if(data.marketPrice && data.marketPrice.priceValue)marketPrice = parseFloat(data.marketPrice.priceValue);
	if(data.WMPrice && data.WMPrice.priceValue)WMPrice = parseFloat(data.WMPrice.priceValue);
	if(data.saveMoney && data.saveMoney.priceValue)saveMoney = parseFloat(data.saveMoney.priceValue);
	if(data.userPoints && data.userPoints.priceValue)userPoints = parseFloat(data.userPoints.priceValue);

	if(data.specialPrice){
		jQuery(".pro_m_tit_1").html("��&nbsp;��&nbsp;�ۣ�");
	}
	if(buyPrice >= 0){
		jQuery("#combiProductBuyPrice").html("��" + buyPrice.toFixed(2));
		 productbuyPrice = buyPrice.toFixed(2);
	}
	if(WMPrice > 0 && WMPrice > buyPrice){
		jQuery("#combiProductMarketPrice").html("��" + WMPrice.toFixed(2));
		productWMPrice = WMPrice.toFixed(2);
	}
    if(data.specialPrice){
		specialPriceEndTime = data.specialPrice.endtime;
		specialPriceCurrentTimer();
	}
}


//�����Ʒ�۸���ʾ����
function setProductPriceForCombiPro2(data){
	//alert(JSON.stringify(data))
	var id = data.id,data = data.price;
	var buyPrice = 0, marketPrice = 0,saveMoney = 0,userPoints = 0,WMPrice = 0 ,zk = 10;
	if(data.buyPrice)buyPrice = parseFloat(data.buyPrice.priceValue);
	//if(data.marketPrice && data.marketPrice.priceValue)marketPrice = parseFloat(data.marketPrice.priceValue);
	if(data.WMPrice && data.WMPrice.priceValue)WMPrice = parseFloat(data.WMPrice.priceValue);
	if(data.saveMoney && data.saveMoney.priceValue)saveMoney = parseFloat(data.saveMoney.priceValue);
	if(data.userPoints && data.userPoints.priceValue)userPoints = parseFloat(data.userPoints.priceValue);
	if(data.buyPrice){
		jQuery("#buyPrice").html("��" + buyPrice.toFixed(2));
		productbuyPrice = buyPrice.toFixed(2);
	}
	if(buyPrice > -1){
		var content = "";
		$("#zk").hide();
		if(WMPrice > 0 && buyPrice < WMPrice){
			zk=(data.buyPrice.priceValue/data.WMPrice.priceValue);
			zk = zk * 100;
			zk = Math.ceil(zk);
			zk = (zk/10).toFixed(1);
			
			content = "<span>"+ zk + "��" +  "</span>";
			jQuery("#marketPrice").html("��" + data.WMPrice.priceValue);
			if(zk <= 8){
				$("#zk").html(content).show();
			}
		}else{
			jQuery("#marketPrice").remove();
		}
	}
	if(zk <= 8){
		if(buyPrice != 0 && WMPrice != 0){
		var JSPrice = WMPrice - buyPrice;
		//if(saveMoney > 0){
		jQuery("#saveMoney").html("��ʡ <span>��" + JSPrice.toFixed(2));
		}
	
		if(WMPrice > 0){
			jQuery("#combiProductMarketPrice").html("��" + WMPrice.toFixed(2));
			productWMPrice = WMPrice.toFixed(2);
		}
	}
	
	
	if(userPoints > 0){
		jQuery("#userPoints").html(data.userPoints.priceValue);
	//	jQuery("#integralinfo").show();
	}
	
    if(data.specialPrice){
		specialPriceEndTime = data.specialPrice.endtime;
		specialPriceCurrentTimer();
	}
}

//һƷ���ģʽ�����Ʒ���а�۸���ʾ
function loadVarietyProductPriceForCompositor(id,mid){
	getPrice(id,mid,function(data){
		var buyPrice = 0, marketPrice = 0, content="";
		if(data.buyPrice)buyPrice = parseFloat(data.buyPrice.priceValue);
		if(data.marketPrice && data.marketPrice.priceValue)marketPrice = parseFloat(data.marketPrice.priceValue);
		if(buyPrice >= 0){
			content +="��" + buyPrice.toFixed(2);
		}
		if(marketPrice > 0){
			content +="&nbsp;<span>��" + marketPrice.toFixed(2)+"</span>";
		}
		if(content){
			$("#dd_price"+id).html(content);
		}
	});
}

//�����Ʒ�Ƿ�������������ִ�лص�����callback;������ҳ���������Զ����ǩ�첽��ȡʵʱ��ʾ����
function checkSellable(callbackParams,callback){
	$("#productScore").hide();	//�Զ����ǩ��ִ������
	var userGroupId = getUserGroupId();
	var params = {};
	params.ids = callbackParams.id;
	params.mid = callbackParams.mid;
	params.cityid = cityid;
	params.usergroupid = userGroupId;
	params.properties = "productLabels";
	params.prices = "buyPrice,marketPrice,WMPrice,VIPPrice,saveMoney,userPoints,specialPrice";
	params.defData = "n";
	params.t = Math.random();
	var url = priceServer + "/open/productlist.do?" + $.param(params) + "&callback=?";
	jQuery.getJSON(url,function(data){
		if(data && data.result[0]){
			var item = data.result[0];
			var productLabelsArr = eval(item.productLabels);
			var isHasproductLabel = false;
			var curTime = new Date().getTime();
			for(var i=0; i< productLabelsArr.length; i++){
				// modify by lihongyao 20140606 ����ֱ������ҳ����Զ����ǩ
				//if(productLabelsArr[i].lablePos == 7 && productLabelsArr[i].beginTime <= curTime && curTime <= productLabelsArr[i].endTime){
				if(productLabelsArr[i].lablePos == 7){	
					$("#productScore").find("img").attr("src",picPrefix + productLabelsArr[i].lablePath);
					$("#productScore").show();
					isHasproductLabel = true;
					break;
				}
			}
			/*if($("#productScore").css("display") == "none"){
				var ruleiconurl = "/ruleicon/lablelist.do?"+$.param(params)+"&callback=?";
				jQuery.getJSON(ruleiconurl,function(data){
					var imguri = data.imgurl;
					if(null != imguri && imguri.length > 0){
						imguri = imguri.replace(",","");
						imguri = imguri.split("_");
						if(imguri.length > 0 && imguri[1] != ""){
							//$("#productScore").find("img").attr("src",picPrefix + imguri[1]);
							//��Ʒ�ۿ�6582//Ʒ���ۿ�6583//��Ʒ��Ʒ7503//Ʒ����Ʒ7505
							//0Ϊ�̶���� 1Ϊ����
							var typeid = imguri[2];
							var imgcomment = "";
							imgcomment+="<div style='width:45px;height:49px;background:url("+ picPrefix + imguri[1]+");color:#f6f91c;font-family: Microsoft YaHei;'>";
							if(typeid==6582 && imguri[3] != "" && imguri[4] != "" && imguri[5] != ""){
								var chinese = imguri[3];
								if(chinese < 10){
									chinese = convertToChinese(imguri[3]);
								}
								imgcomment+="<span style='display:block;width:45px;padding-top:15px; text-align:center;font-size:13px;'>��"+chinese+"��</span>";
								if(imguri[5]==1){
									imgcomment+="<span style='display:block;width:45px; text-align:center;font-size:13px;margin-top:-3px;'>��"+imguri[4]+"Ԫ</span>";
								}
								if(imguri[5]==2){
									if(imguri[4]==5){
										imgcomment+="<span style='display:block;width:45px; text-align:center;font-size:13px;margin-top:-3px;'>���</span>";
									}else{
										imgcomment+="<span style='display:block;width:45px; text-align:center;font-size:13px;margin-top:-3px;'>"+imguri[4]+"��</span>";
									}
								}
							}
							if(typeid==6583 && imguri[3] != "" && imguri[4] != "" && imguri[5] != ""){
								imgcomment+="<span style='display:block;width:45px; padding-top:15px; text-align:center;font-size:13px;'>��"+imguri[3]+"</span>";
								if(imguri[5]==1){
									imgcomment+="<span style='display:block;width:45px; text-align:center;font-size:13px;margin-top:-3px;'>��"+imguri[4]+"</span>";
								}
								if(imguri[5]==2){
									imgcomment+="<span style='display:block;width:45px; text-align:center;font-size:16px;margin-top:-3px;'>��"+imguri[4]+"��</span>";
								}
							}
							if(typeid==7503){
								imgcomment+="<span style='display:block;width:45px;line-height:58px; text-align:center;font-size:23px;'>��</span>";
							}
							if(typeid==7505 && imguri[3] != ""){
								imgcomment+="<span style='display:block;width:45px;padding-top:15px; text-align:center;font-size:13px;'>��"+imguri[3]+"</span>"+"<span style='display:block;width:45px; text-align:center;font-size:16px;margin-top:-3px;'>��</span>";
							}
							imgcomment+="</div>";
							$("#productScore").html(imgcomment);
							$("#productScore").show();
							isHasproductLabel = true;
							
						}
					}
					//��û���Զ����ǩ������ʾ�����Ƿ���ʾ������ǩ
					if(!isHasproductLabel && item.price.specialPrice){
						$(".sale_icon_tr").show();
					}
				});
			}*/
			callback(item);
		}else{
			return;
		}
	});
}
var globalVar={
    getCount : 0,//�ڼ��λ�ȡ����
    getTotalCount : 5//һ����ȡ����
}
//��������Ʒ�Ƿ����
function loadSellableForCombiPro(){
	checkSellable({"id":pid,"mid":mid},function(data){
		//���������Ʒ�۸�
		if(sgjs != true){
		   setProductPriceForCombiPro(data);
		}else{
		   setProductPriceForCombiPro2(data);
		}
		
		showGiftDetailEvents(data);
		var sellerType = $("#j-seller-type").val();
		var params = {
			"id":pid,
			"mid":mid,
			"sellerType":sellerType,
			"t":Math.random()
		};
		// alert(data.sellable);
		if(data.sellable){
			isSellabel = 1;
			jQuery("#loadBuy").load(frontPath + "/" + webIndex + "/product/combiproduct/loadbuylayer.do", params,
				function(){
					setTimeout(function(){
						if($(".input_plus").length == 0){
							if(globalVar.getCount < globalVar.getTotalCount){
								globalVar.getCount++;
								setTimeout(setBuyInputEvents,3000);
							}
						}else{setBuyInputEvents();}},300);
					var GroupCardIds = jQuery("input[name='GroupCardIds']").val();
					if(GroupCardIds === 'true'){
						jQuery("#buyBtn").hide();
						jQuery("#buyDuihuan").show();
					}
				});
		}else{
			isSellabel = 0;
			jQuery("#loadBuy").load(frontPath + "/" +webIndex + "/product/combiproduct/loadnotbuylayer.do", params);
		}
	});
}
//�����ͨ��Ʒ�Ŀ���״̬
function loadSellable(id,mid){
	checkSellable({"id":id,"mid":mid},function(data){
		//������Ʒ�۸�
		setProductPrice(data.price);
		var params = {
			"id":id,
			"mid":mid,
			"t":Math.random()
		};
		if(data.sellable){
			isSellabel = 1;
			//���۳����빺�ﳵ��ť
			jQuery(".detail_tab_buy").show();
			//���ع��ﳵ��ť
			jQuery("#loadBuy").load(frontPath + "/" + webIndex + "/product/loadBuylayerforsaleable.do", params, function(){
				setTimeout(function(){
					if($(".input_plus").length == 0){
						if(globalVar.getCount < globalVar.getTotalCount){
							globalVar.getCount++;
							setTimeout(setBuyInputEvents, 3000);
						}
					}else{
						setBuyInputEvents();
					}
				},300);
			});
			
			jQuery("#loadPromotions").load(frontPath + "/" + webIndex + "/product/loadpromotionsasync.do", params, function(){
				setTimeout(function(){
					setLoadPromotionsEvents();
					PromotionsCurrentTimer();
				},300);
			});
				
			//������Ʒ�ſ��������ϴ��乺����
			loadBestCompagesCurrProPrice(data.price);
			//������Ʒ��ã��跢�͵����������Ƽ������ȡ,��Ⱦ�����recommend_product.js
			recommendObj.fpgbuy("",id,0);
		}else{
			isSellabel = 0;
			jQuery("#displayProTip").hide();
			jQuery("#loadBuy").load(frontPath + "/" +webIndex + "/product/loadBuylayerforsaleout.do", params, set_mahout_request);
		}
	});
}

function loadBestCompagesCurrProPrice(data){
	//��ǰ��Ʒ�۸�
	var buyPrice = -1,marketPrice = 0,WMPrice = 0;
	if(data.buyPrice && data.buyPrice.priceValue)buyPrice = parseFloat(data.buyPrice.priceValue);
	//if(data.marketPrice && data.marketPrice.priceValue)marketPrice = parseFloat(data.marketPrice.priceValue);
	if(data.WMPrice && data.WMPrice.priceValue)WMPrice = parseFloat(data.WMPrice.priceValue);
	var content = "��" + buyPrice.toFixed(2);
	if(WMPrice > buyPrice){
		content += "&nbsp;<span>��" + WMPrice.toFixed(2) + "</span>"
	}
	$("#loadBestCompages_price").html(content);
	
	//��ϴ��������������չʾsumMarkPrice��sumPrice����bestcompages.js
	sumMarkPrice += parseFloat(WMPrice);
	sumPrice += parseFloat(buyPrice);
}

//���ع���˵��
function loadRuleInfo(id,mid){
		var params = {
			"id":id,
			"mid":mid
		};
		jQuery("#ruleInfo").load(frontPath + "/" + webIndex + "/product/loadruledesc.do", params, function(){
			setTimeout(function(){
				setLoadPromotionsEvents();
				//PromotionsCurrentTimer();
			},300);
		});
}
//�����ϸ��Ʒ����ʾ�߼�
function showGiftDetailEvents(data){
	var li_width = jQuery("#gift_pro_layer li").width() + 10;
	var pro_num = jQuery("#gift_pro_layer li").length;
	var num_1 = pro_num%2 == 0 ? pro_num : (pro_num+1);
	var param_num = pro_num < 5 ? 2 : num_1;
	var ul_width = li_width * param_num;
	var layer_width = pro_num%4 < 3 ? ul_width+300 : ul_width;
	
	if(pro_num <= 2){
		jQuery("#gift_page_ul li").hide();
	}
	jQuery("#gift_pro_layer").width(layer_width);
//	jQuery("#gift_pro_layer ul").width(ul_width);
	jQuery("#gift_pro_layer ul").width(num_1 * li_width);
	//������������Ҫ��������idΪ258255,258275,258295,258315,258335������ʾ���ҳ������ײ���ϸ���ݡ�
	var fixedPro = new Array(258255,258275,258295,258315,258335);
	for(var i=0;i<fixedPro.length;i++){
		if(pid == fixedPro[i]){
			var ProNowDate = new Date();
			var ProNowTime = ProNowDate.getTime();
			//���7��15�ս�����7��16�ջָ�ԭ�����롣
			var ProEndTime = 1373904000000;
			if(ProEndTime >= ProNowTime){
				jQuery("#gift_area").hide();
				break;
			}
		}
	}	
	if(!data.sellable){	//!data.sellable ������ʱ
		jQuery("#gift_area").css({"background":"#efefef","border":"1px solid #dcdddd"});
		jQuery(".gift_pro").css("border","1px solid #dcdddd");
		jQuery(".gift_page").addClass("gift_page_unsellable");
	}
	jQuery("#gift_page_ul li").click(function(){
		var tem_num = jQuery(this).html()-1;
		var move_width = li_width*2*tem_num;
		jQuery(".gift_pro_ul").animate({scrollLeft:move_width},600);
		jQuery("#gift_page_ul li").removeClass("select");
		jQuery(this).addClass("select");
	});
}

//��Ʒ�������Ƽ�ͬ��λ��Ʒ
function setNobuyEvents(){
	 $(".pro_nobuy .nobuy_pro").each(function(){
		var dl_width = $(this).find("dl").width()+6;
		if($(this).find("dl").length>2){
			$(this).find(".list").width(dl_width*$(this).find("dl").length);
			$("#nobuy_top_secondpage").click(function(){
				var tt=	dl_width*2;
				$("#nobuy_pro_dl").animate({scrollLeft:tt},500);
				$("#nobuy_top_secondpage").attr("class","select");
				$("#nobuy_top_firstpage").attr("class","");

			});
			$("#nobuy_top_firstpage").click(function(){
				$("#nobuy_pro_dl").animate({scrollLeft:0},500);
				$("#nobuy_top_firstpage").attr("class","select");
				$("#nobuy_top_secondpage").attr("class","");

			});
		}
		else{
			$(this).find(".list").width(dl_width*$(this).find("dl").length);
		}
	 });
}
//��֤���ּӼ���
function valiAmountInp(obj){
	re = /^[1-9][0-9]{0,5}$/g;
	if(!re.test(obj.value)){
		obj.value = 1;
		return false;
	}
	//��Ʒ�п�����ʱ������������
	var sellAmount = $("#amount").val();
	var params = new Object();  
	params["productId"] = pid;
	params["mid"] = mid;
	params["random"] = Math.random();
	$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	$.post(frontPath+"/product/checkProductAmount.do",params,function(data){
		var inputnum = $("#amount").val();
		if(parseInt(inputnum) > parseInt(data)){
			comAlert("�Բ��𣬿�治�㣡");
			$("#amount").val($("#allamount").val());
			return false;
		}
		return true;
	}); 
}
function loadAllAmount(){
	//��Ʒ�п�����ʱ������������
	var sellAmount = $("#amount").val();
	var params = new Object();  
	params["sellAmount"] = sellAmount;
	params["productId"] = pid;
	params["mid"] = mid;
	params["random"] = Math.random();
	$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
	$.post(frontPath+"/product/checkProductAmount.do",params,function(data){
		$("#allamount").val(data);
	}); 
}
//��ֹԤ���س��ֵ�����
//�����Ӽ���
function setBuyInputEvents(){
	loadAllAmount();
	$(".input_plus").click(function(){
		//��Ʒ�п�����ʱ������������
		var sellAmount = $("#amount").val();
		var params = new Object();  
		params["productId"] = pid;
		params["mid"] = mid;
		params["random"] = Math.random();
		$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
		$.post(frontPath+"/product/checkProductAmount.do",params,function(data){
			var inputnum = $(".proinput").val();
			if(parseInt(inputnum)+1 > parseInt(data)){
				comAlert("�Բ��𣬿�治�㣡");
				$(".proinput").val(inputnum);
				return ;
			}
			inputnum++;
			$(".proinput").val(inputnum);
		}); 
	});
	$(".input_minus").click(function(){
		var inputnum = $(".proinput").val();
		inputnum--;
		if(inputnum<=0)
		{inputnum=1;}
		$(".proinput").val(inputnum);
	});
	$(".input_plus").hover(function(){
		$(".input_plus").addClass("input_plus_h");					   
	},function(){
		$(".input_plus").removeClass("input_plus_h");
	})	
	$(".input_minus").hover(function(){
		$(".input_minus").addClass("input_minus_h");					   
	},function(){
		$(".input_minus").removeClass("input_minus_h");
	});	
}
//����ϲ��
function setGuessYouLikeEvents(){
	$(".detail_foot_list_scroll").each(function(){
		var foot_width = $(this).find("dl").width()+40;
		if($(this).find("dl").length>5)
		{
			$(this).find(".detail_foot_list").width(foot_width*$(this).find("dl").length);
			$(this).siblings(".detail_foot_prev_noclick").show();
			$(this).siblings(".detail_foot_prev").hide();
		}
		else
		{
			$(this).find(".detail_foot_list").width(foot_width*$(this).find("dl").length);
			$(this).siblings(".detail_foot_prev_noclick").hide();
			$(this).siblings(".detail_foot_prev").hide();
			$(this).siblings(".detail_foot_next_noclick").hide();
			$(this).siblings(".detail_foot_next").hide();
		}
	});
	$(".detail_foot_next").each(function(){
		$(this).click(function(){
			var foot_width = ($(this).siblings(".detail_foot_list_scroll").find("dl").width()+40)*4;
			$(this).siblings(".detail_foot_list_scroll").animate({scrollLeft:foot_width},500);
			$(this).siblings(".detail_foot_next_noclick").show();
			$(this).hide();
			$(this).siblings(".detail_foot_prev").show();
			$(this).siblings(".detail_foot_prev_noclick").hide();
		});
		
		$(this).hover(function(){
			$(this).addClass("detail_foot_next_h");					   
		},function(){
			$(this).removeClass("detail_foot_next_h");
		});
	});	
	$(".detail_foot_prev").each(function(){
		$(this).click(function(){
			$(this).siblings(".detail_foot_list_scroll").animate({scrollLeft:0},500);
			$(this).siblings(".detail_foot_prev_noclick").show();
			$(this).hide();
			$(this).siblings(".detail_foot_next").show();
			$(this).siblings(".detail_foot_next_noclick").hide();
		});
		
		$(this).hover(function(){
			$(this).addClass("detail_foot_prev_h");					   
		},function(){
			$(this).removeClass("detail_foot_prev_h");
		});	
	});	   
}

//���빺�ﳵ���������Ƽ���Ʒ���������һ���Ч��
function setBuyStillBuyEvents(){
	$(".buy_pop_b .list_scroll").each(function(){
		$(this).parent().parent(".buy_pop").show();
		var dl_width = $(this).find("dl").width();
		dl_width = dl_width>0 ? (dl_width + 6) : 108;
		$(this).parent().parent(".buy_pop").hide();
		if($(this).find("dl").length>4)
		{
			$(this).find(".list").width(dl_width*$(this).find("dl").length);
			$(this).siblings(".pop_prev_noclick").show();
			$(this).siblings(".pop_prev").hide();
		}
		else
		{
			$(this).find(".list").width(dl_width*$(this).find("dl").length);
			$(this).siblings(".pop_prev_noclick").hide();
			$(this).siblings(".pop_prev").hide();
			$(this).siblings(".pop_next_noclick").hide();
			$(this).siblings(".pop_next").hide();
		}
	});
	$(".buy_pop_b .pop_next").each(function(){
		$(this).click(function(){
			var dl_width = ($(this).siblings(".list_scroll").find("dl").width()+6)*4;
			$(this).siblings(".list_scroll").animate({scrollLeft:dl_width},500);
			$(this).siblings(".pop_next_noclick").show();
			$(this).hide();
			$(this).siblings(".pop_prev").show();
			$(this).siblings(".pop_prev_noclick").hide();
		});
		
		$(this).hover(function(){
			$(this).addClass("pop_next_h");					   
		},function(){
			$(this).removeClass("pop_next_h");
		});	
	});	
	$(".buy_pop_b .pop_prev").each(function(){
		$(this).click(function(){
			$(this).siblings(".list_scroll").animate({scrollLeft:0},500);
			$(this).siblings(".pop_prev_noclick").show();
			$(this).hide();
			$(this).siblings(".pop_next").show();
			$(this).siblings(".pop_next_noclick").hide();
		});
		
		$(this).hover(function(){
			$(this).addClass("pop_prev_h");					   
		},function(){
			$(this).removeClass("pop_prev_h");
		});	
	});
}
//������Ϣ�����¼�Ч��
function setLoadPromotionsEvents(){
	$(".promo_tab .promo_font").each(function(){
		if($(this).find("ul").height()>60)
		{
			$(this).find(".more_btn").show();
			$(this).find("ul").addClass("more_hidden");
		}
		else
		{
			$(this).find(".more_btn").hide();
		}
	});
	
	$(".promo_tab .promo_img").each(function(){
		if($(this).find(".promo_item").height()>60)
		{
			$(this).find(".more_btn").show();
			$(this).find(".promo_item").addClass("more_hidden");
		}
		else
		{
			$(this).find(".more_btn").hide();
		}
	});
	
	$(".promo_tab_list").hide();
	$(".promo_tab .promo_tab_list").eq(0).show();
	
	$(".pro_promotion .promo_tit ul li").each(function(){
		$(this).hover(function(){
			$(".pro_promotion .promo_tit ul li").removeClass("select");
			$(this).addClass("select");
			$(this).parent().parent().siblings(".promo_tab").find(".promo_tab_list").hide();
			$(this).parent().parent().siblings(".promo_tab").find(".promo_tab_list").eq($(this).index()).show();
		});	
	});
	
	$(".list_product").each(function(){
		var ishasClass = 0;
		$(this).hover(function(){
			$(this).css({"z-index":"20","position":"relative"});
			$(this).find(".icon").css({"z-index":"20","position":"relative"});
			$(this).find(".product").css("z-index","20");		
			$(this).find(".icon").addClass("icon_h");
			$(this).find(".product").show();
			$(this).find("img").attr("src",$(this).find("img").attr("original"));
			if($(this).parent().parent(".promo_item").hasClass("more_hidden"))
			{
				ishasClass = 1;
				$(this).parent().parent(".promo_item").removeClass("more_hidden");	
			}
			
		},function(){
			$(this).css({"z-index":"0","position":"static"});
			$(this).find(".icon").css({"z-index":"0","position":"static"});
			$(this).find(".product").css("z-index","0");	
			$(this).find(".icon").removeClass("icon_h");
			$(this).find(".product").hide();
			if(ishasClass==1)
			{
				$(this).parent().parent(".promo_item").addClass("more_hidden");	
				ishasClass = 0;
			}
		});
	});
/*
	$(".promo_tab .promo_tab_list .promo_more").each(function(){
		$(this).click(function(){
			$(this).parent().siblings("ul").removeClass("more_hidden");
			$(this).parent().siblings(".promo_item").removeClass("more_hidden");
			$(this).hide();
			$(this).siblings(".promo_more_b").show();
		});												  
	});
	
	$(".promo_tab .promo_tab_list .promo_more_b").each(function(){
		$(this).click(function(){
			$(this).parent().siblings("ul").addClass("more_hidden");
			$(this).parent().siblings(".promo_item").addClass("more_hidden");
			$(this).hide();
			$(this).siblings(".promo_more").show();
		});												  
	});
	*/
	/*����*/
	$(".promo_tab_list").each(function(){
		$(this).hover(function(){
			$(this).find("ul").removeClass("more_hidden");	
			$(this).find(".promo_item").removeClass("more_hidden");
			$(this).find(".promo_more").hide();
			$(this).find(".promo_more_b").show();
		},function(){
			$(this).find("ul").addClass("more_hidden");	
			$(this).find(".promo_item").addClass("more_hidden");
			$(this).find(".promo_more").show();
			$(this).find(".promo_more_b").hide();
		});						   
	});
	/*����*/
}

//������Ϣ����ʱ���ܲ���
var pidArr = pidArr || [];
var endTimeArr = endTimeArr || [];
var curTime = curTime || new Date().getTime();
function PromotionsCurrentTimer(){
	var id, time, d, h, m, s, timerObj;
	for(var i=0;i<pidArr.length;i++){
		timerObj = $("#" + pidArr[i]);
		if(endTimeArr[i] > 0){
            time = endTimeArr[i] - curTime;
            d = Math.floor(time/(1000*60*60*24));
            if(d >= 10){
            	timerObj.hide();
            	continue;
            }
			h = Math.floor(time/(1000*60*60)%24);
		    m = Math.floor(time/(1000*60))%60;
		    s = Math.floor(time/1000)%60;
		    timerObj.html("��ʣ" + d + "��" + h+ "ʱ" + m + "��" + s + "�����");
		    endTimeArr[i] -= 1000;
		}else{
			timerObj.hide();
		}
	}
	setTimeout(PromotionsCurrentTimer, 1000);
}

//�ؼ�<48Сʱ��ʼ����ʱ
function specialPriceCurrentTimer(){
	$.get("/servertime.do", function(data){
		var timerObj = $("#specialPriceTimer");
		var time = specialPriceEndTime - parseInt(data, 10);
		if(time > 0){
			var timeCounter = function(){
				var d = Math.floor(time/(1000*60*60*24));
				var h = Math.floor(time/(1000*60*60)%24 + 24*d);
				var h1 = Math.floor(time/(1000*60*60)%24);
				if(h > 48 && sgjs != true){
					timerObj.hide();
					return;
				}
				var m = Math.floor(time/(1000*60))%60;
				var s = Math.floor(time/1000)%60;
				if(sgjs == true){
					timerObj.html("<div class='item_1_timer'>��ʣ<span>" + formatTime(d) + "</span>��<span>" + formatTime(h1) + "</span>Сʱ<span>" + formatTime(m) + "</span>��<span>" + formatTime(s) + "</span>��</div><s></s>").show();
				}else{
					timerObj.html("<div class='item_1_timer'>��ʣ<span>" + formatTime(h) + "</span>Сʱ<span>" + formatTime(m) + "</span>��<span>" + formatTime(s) + "</span>��</div><s></s>").show();
				}
				time -= 1000;
				setTimeout(timeCounter, 1000);
			};
			timeCounter();
		}else{
			timerObj.hide();
		}
	});
}
//��ʽ��ʱ��
function formatTime(s){
	if(s!= undefined && s.toString() != undefined && s.toString().length == 1)
		return "0" + s;
	return s;
}
//������Ʒtitle�߶�
function resetProTitleHeight(){
	var $title = $(".pro_tit_top");
	if($title.height() > 56){
		$title.addClass("pro_tit_top_h");
	}
}

//�رռ��빺�ﳵ������
function closeGoToCartLayer(){
	jQuery('#addToCartDiv').hide();
	closeShade();
}

/**��ά�����*/
$(function(){
	var erweima = $(".relativeerweima");
	erweima.hover(function(){
		 $(".erweima").show(); 
		},function(){
		 $(".erweima").hide();
		}
	);
	function getErweima(){
		var valTemp = $("#div_div").html();
		if(valTemp){
			var erweimaText = "http://m.womai.com/" + mid + "p" + pid + ".shtml"
			$('#div_div').qrcode({
				text: utf16to8(erweimaText),
				height: 134,
				width: 134,
				src: frontPath + '/zhongliang/templets/green2012/images/detail/erweimalogo.png'
			});
		}
	}
	getErweima();
})

function utf16to8(str) { //ת�� 
	var out, i, len, c; 
	out = ""; 
	len = str.length; 
	for (i = 0; i < len; i++) { 
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) { 
			out += str.charAt(i);
		} else if (c > 0x07FF) { 
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F)); 
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F)); 
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F)); 
		} else { 
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F)); 
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F)); 
		}
	}
	return out; 
}

//������ʾ 20150324
function loadDeliveryRegions(productid,mid){
	var params = {
			"productid":productid,
			"mid":mid,
			"t":Math.random()
		};
	$("#loadRegion").load("/green2014/product/productexpectedtime.do", params,function(){
		
	});
}
$(function(){
	$('.addr_select').live('mouseover',function(){
		var $this = $(this);
		$this.find('.text').addClass('text-click');
		$this.find('.content').show();
		$('#loadBuy').hide();
		//ѡ����������
		$('.delivery-tip .mc').delegate('li','click',function(){
			var $mcThis = $(this);
			var mcIndex = ($mcThis.parents('.mc').index())-1;//mc�����Ǵӵ�2����ʼ�� ����Ҫ��ȥ1
			
			var productid = $('#productid').val();
			var mid = $('#mid').val();
			//ʡ��
			if(mcIndex==1){
				$('#dfsecond').html("��ѡ��");
				$('#dfthird').parent('li').hide();
				//$('#dfthird').siblings('s').hide();
				var regionid = $(this).attr('data-regionId');
				var url = "/green2014/product/getExpectedTime.do?method=thirdstep";
				//$('#expectedTime').html("");
				var params = new Object();
				params["parentId"] = regionid;
				params["productid"] = productid;
				params["mid"] = mid;
				$(this).parents('.content').show();
				$.post(url,params,function(data){
					var obj = eval('(' + data + ')');
					$("#secondstep").html(obj.reslut.areaHtml);
				});
			
				$('#option1').val($mcThis.html());
				$('#dffirst').html($mcThis.html());
				$('#option2').val("");
				$('#option3').val("");
			}
			//����
			if(mcIndex==2){
				$('#dfthird').parent('li').show();
				var id = $mcThis.attr('data-regionId');
				var url = "/green2014/product/getExpectedTime.do?method=thirdstep&date="+new Date();
				var params = new Object();
				params["parentId"] = id;
				params["productid"] = productid;
				params["mid"] = mid;
				//$('#expectedTime').html("");
				$.post(url,params,function(data){
					var obj = eval('(' + data + ')');
					if(obj.reslut.flag == 1){//������
						$('#dfthird').parent('li').hide();
						$('#thirdstep').hide();
						$('#secondstep').css('display','block');
						 if(obj.reslut.flag == 0){
							 $("#thirdstep").html("");
							 return;
						 }else{
							 var msg = obj.reslut.msg;
							 if(msg != ""){
								 $('#expectedTime').html(obj.reslut.msgcutoffTime+"ǰ����µ���Ԥ��"+obj.reslut.msg+" �ʹ�");
								 $('#address-tip').html('<div class="pro_m_tit_3">����</div><div class="item_17 fl">���������������ṩ�ۺ����</div>');
							 }else{
								 $('#expectedTime').html("");
								 $('#address-tip').html("");
							 }
						 }
						 $('.content .mt').find('li').eq(2).hide();
						 $('.content .mt').find('li').eq(1).addClass('current');
						 //$('#secondstep').css('display','block');
						//��ȡ���͵�ַ
						 $('.region-text').html($('#option1').val()+$('#option2').val()+$('#option3').val());
						 $this.find('.content').hide();
						 return;
					}else{
						$this.find('.content').show();
						//$('#expectedTime').html("");
						$("#thirdstep").html(obj.reslut.areaHtml);
						$('#dfthird').parent('li').show();
						$('#dfthird').html("��ѡ��");
					}
			    });
				$('#option2').val($mcThis.html());
				$('#dfsecond').html($mcThis.html());
				var thirdRegion = $mcThis.parents('.mc').siblings('.mt').find('li').eq(2);
				thirdRegion.find('i').width(thirdRegion.outerWidth());
				$('#option3').val("");
			}
			//��/��
			if(mcIndex==3){
				$('#expectedTime').html("");
				var id = $mcThis.attr('data-regionId');
				var url = "/green2014/product/getExpectedTime.do?method=thirdstep&date="+new Date();
				var params = new Object();
				params["parentId"] = id;
				params["productid"] = productid;
				params["mid"] = mid;
				$.ajaxSettings['contentType'] = "application/x-www-form-urlencoded; charset=utf-8";
				$.post(url,params,function(data){
					 var obj = eval('(' + data + ')');  
					 if(obj.reslut.flag == 0){
						 alert(obj.reslut.msg);
						 return;
					 }else{
						 var msg = obj.reslut.msg;
						 if(msg != ""){
							 $('#expectedTime').html(obj.reslut.msgcutoffTime+"ǰ����µ���Ԥ��"+obj.reslut.msg+" �ʹ�");
							 $('#address-tip').html('<div class="pro_m_tit_3">����</div><div class="item_17 fl">���������������ṩ�ۺ����</div>');
						 }else{
							 $('#expectedTime').html("");
							 $('#address-tip').html("");
						 }
						 
						 //��ѡ������͵���������cookie�� modify by lihongyao 20170307 Ԥ���ʹ�ʱ���Ż�������js�д�����̨�д���
//						 var returnRegionKey = obj.reslut.returnRegionKey;
//						 var returnRegionId = obj.reslut.returnRegionId;
//						 document.cookie = returnRegionKey+"="+returnRegionId;
						 $('#option3').val($mcThis.html());
							$('#dfthird').html($mcThis.html());
							var thirdBorder = $mcThis.parents('.mc').siblings('.mt').find('li').eq(2);
							thirdBorder.find('i').width(thirdBorder.outerWidth());
							$this.find('.content').hide();
							//��ȡ���͵�ַ
							$('.region-text').html($('#option1').val()+$('#option2').val()+$('#option3').val());
					 }
				});
			}
			var currentRegion = $mcThis.parents('.mc').siblings('.mt').find('li').eq(mcIndex);
			//��ȡ���������ߵĿ��
			currentRegion.find('i').width(currentRegion.outerWidth());
			//ѡ�е����� ��һ��������ʾ
			currentRegion.addClass('current').show().siblings().removeClass('current');
			currentRegion.parents('.mt').siblings('.mc').eq(mcIndex).show().siblings('.mc').hide();
			return false;
		});

		//�л������͵���
		$('.delivery-tip .mt').find('li').click(function(){
			var mtIndex = $(this).index();
			$(this).find('i').width($(this).outerWidth());
			$(this).addClass('current').siblings().removeClass('current');
			$(this).parents('.mt').siblings('.mc').eq(mtIndex).show().siblings('.mc').hide();
			
		});
		
		//�رհ�ť
		$this.find('.close').click(function(){
			$this.find('.text').removeClass('text-click');
			$this.find('.content').hide();
		});
	});
	$('.addr_select').live('mouseout',function(){
		var $this = $(this)
		$this.find('.text').removeClass('text-click');
		$this.find('.content').hide();
		$('#loadBuy').show();
	});
})
