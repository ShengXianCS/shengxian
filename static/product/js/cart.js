$(function(){
	var $toolbar_top = $('.wm-toolbar-top'),
		$toolbar_tab = $('.wm-toolbar-tab'),
		$trigger = $('.wm-trigger'),
		$wm_toolbar = $('.wm-toolbar'),
		$toolbar_l = $('.toolbar-left'),
		$pop_layer = $('.pop-layer'),
		$p_title = $('.pop-title i'),
		indexold= -1 ;
	//����ͷ���ֶ���λ��
	function count(){
		var $wH = $(window).height();
		$toolbar_l.css({height:$wH});
		$toolbar_top.css({top:$wH*25/100});
		$('.scroll-box').css({height:$wH-112});
		$('.wm-c-box,.promotecont').css({height:$wH-40});
	}
	count();
	//����ƶ���ȥ�ı䱳��ɫ
	$toolbar_tab.hover(function(){
		$(this).addClass('cur').siblings('.wm-toolbar-tab').removeClass('cur');
	},function(){
		$(this).removeClass('cur');
	})
	//�����
	$toolbar_tab.each(function(){
		$(this).click(function(){
			$toolbar_tab.removeClass('wm-select');
			$(this).addClass('wm-select');
			try{
				if($(this).hasClass('activity')){
					ga_event(PageGroup, $(this).attr("data-ga"), $(this).attr("data-gatext"));
				}
			}catch(e){}//ΪС���ﳵ�С�7���ꡱ�������ga�����---end
		})
	})
	//��Ӧͼ�������/���л� 
	function tab(i){
		$pop_layer.animate({left:'276px'});
		$pop_layer.eq(i).animate({left:0});
	}
		//��������ʾ
	function l_show(){
		$wm_toolbar.animate({right:0});		
	}
	
	//���ǰ������ʾЧ��
	$trigger.each(function(){
		var i = $('.wm-trigger').index($(this));
		$(this).bind('click',function(){
			var cLeft  = $wm_toolbar.css("right");
			if(i == indexold){
				if(cLeft == '0px'){
					$wm_toolbar.animate({right:'-276px'});
					tab(i);
				}else{
					l_show();
					tab(i);
				}
			}else if(indexold == -1){
				l_show();
				tab(i);
			}else{
				if(cLeft == 0){
					tab();
				}else{
					l_show();
					tab(i);
				}
			}
			indexold = i;
		})
		return i;
	})
	
	//������������
	$("html, body,.pop-title em").bind('click',function(e){
		$wm_toolbar.animate({right:'-276px'});
		//e.stopPropagation();
	})
	//��ֹð��
	$wm_toolbar.bind('click',function(e){
		e.stopPropagation();
	})
	//��������仯�����¼��ؼ���߶�
	$(window).resize(function(){
		count();
	});
	
	$(".wm-toolbar div.cart").bind("click",function(){
		loadSuspendCartContent();
	});
	
})

/*��ʼ���Ҳ��������ﳵstart*/
function initSuspendCartInfo(){
	//��ȡ���ﳵ��ǰ��Ʒ��
	getSuspendCartTotalAmount();
}

//��ȡ���ﳵ��Ʒ������
function getSuspendCartTotalAmount(){
	var uri = crossDomain + frontPath + "/frontendjson/smallcartinfo.do?mid=" + mid + "&callback=?&t=" + Math.random();
	$.getJSON(uri, callbackSuspendCartAmount);
}

//�ص���������С������Ʒ����
function callbackSuspendCartAmount(data){
	if(data && data.totalAmount >= 0){
		
		//�ؼ���������
		$("#smallcart_items_amount").attr("data-count",0);
		$("#smallcart_items_amount").val(data.cartitemsAmount + "");
		$("#suspendcart_items_amount").attr("data-count",0);
		$("#suspendcart_items_amount").val(data.cartitemsAmount + "");
		$("#smallcart").attr("data-first","yes");
		$("#suspendcart").attr("data-first","yes");
		var amount = data.totalAmount;
		if(amount > 99){
			amount = "99+";
		}
		$(".smallcart_totalamount").html(amount + "");
		$(".suspendcart_totalamount").html(amount + "");
		$("#totalItemCounts").html(amount + "");
		$("#totalMustPayPrice").html(data.totalMustPayPrice.toFixed(2) + "");
	}
}

/*�����������ﳵ����*/
function loadSuspendCartContent(){
	var suspendcart_items_amount = $("#suspendcart_items_amount").val();
	if(suspendcart_items_amount == "init"){
		//�˴�������ֿ����Լ��ͣ����ʼ��ʱ�����������ȡ���ﳵ��������6��
		$("#suspendcart_cont").html("<div class='smallcart_amount0'>���緱æ�����Ժ�����~</div>");
		setTimeout(getSuspendCartTotalAmount,"500");
		return;
	}
	isShowSuspendcartScrollBar(suspendcart_items_amount);
	var isFirstDo = $("#suspendcart").attr("data-first");
	if(isFirstDo == "yes"){
		var paramsTT = new Object();
		paramsTT["randomT"] = Math.random();
		paramsTT["mid"] = mid;
		var url = frontPath + "/cityindex/finclude/includesuspendcartcont.do";
		$.get(url, paramsTT, function(data){
			$("#suspendcart_cont").html(data);
			if($("#suspendcart_cont").length > 0){
				isShowSuspendcartScrollBar(suspendcart_items_amount);
				if($(".xy_miniprice").length > 0){
					$(".xy_miniprice").each(function(){
						var xy_miniprice = parseFloat($(this).html());
						$(this).html(xy_miniprice);
					});
				}
			}
			//ʵ�����ֲ���ֱ�ͣ�����ֱ�ɣ����������������Ա���ת�����ﳵ�б��µ���Ӧҳǩ�� start
			try{
				if(sellerType == 1){//����ֱ��
					var tocarthref = $('.wm-btn-buy').find('a').attr('href');
					$('.wm-btn-buy').find('a').attr('href',tocarthref + '&curTab=2');
				}else if(sellerType == 2){//����ֱ��
					var tocarthref = $('.wm-btn-buy').find('a').attr('href');
					$('.wm-btn-buy').find('a').attr('href',tocarthref + '&curTab=6');
				}
			}catch(e){}
			//ʵ�����ֲ���ֱ�ͣ�����ֱ�ɣ����������������Ա���ת�����ﳵ�б��µ���Ӧҳǩ�� end
		
		});
		$("#suspendcart").attr("data-first","no");
	};
}

function getSuspendCartTotalAmountForMax(){
	setTimeout(function(){
		var $items_amount_inp = $("#suspendcart_items_amount");
		var count = $items_amount_inp.attr("data-count");	//ѭ��������,���ѭ�����λ�ȡ���ﳵ����������
		if($items_amount_inp.val() == "init" && count < 3){
			getCartTotalAmount();
			getSuspendCartTotalAmountForMax();
			count++;
			$items_amount_inp.attr("data-count",count);
		}else{
			loadSuspendCartContent();
		}
	},"300");
}

function isShowSuspendcartScrollBar(amount){
	if(amount == 0){
		$("#suspendcart_cont").html("<div class='nothing'><dl><dt><img src='/zhongliang/city/common/images/no-cart.jpg'/></dt><dd><p>���ﳵ�տյģ��Ͽ�ȥ��ѡ���ǵ���Ʒ��~</p><p><a href='"+crossDomain + frontPath + "/index-"+cityid+"-0.htm'>ȥ��ҳ����</a></p></dd></dl></div>");
		$("#suspendcart").attr("data-first","no");
	}else if(amount >=5){
		//$(".item_scroll").css("overflow-y","scroll");
		$('.cart_cont .scrollbar').hide();
	};
}

//ɾ��ͷ��С���ﳵ��XԪY����Ʒ
function deleteSuspendCartXY(cartId,ruleId){
	$("#delsuspendcartxy_" + cartId + "_" + ruleId).hide();
	var params = {};
	params["mid"] = mid;
	params["cartid"] = cartId;
	params["ruleid"] = ruleId;
	uri = crossDomain + frontPath + "/delcartitemxy.do?" + $.param(params) + "&callback=?";
	$.getJSON(uri,getSuspendCartTotalAmount);
}

//ɾ��ͷ��С���ﳵ����Ʒ
function deleteSuspendCart(cartId,productid,isPresent,index){
	//emarboxɾ�����ﳵ����� 20130903_zhaogangqiang
	try{deleteOneItem(productid);}catch(e){}
	$("#delsuspendcart" + index + "_" + cartId + "_" + productid).hide();
	var params = new Object();
	params["mid"] = mid;
	params["cartid"] = cartId;
	var url='';
	if(isPresent==1){
		params["productid"] = 0;
		params["presentid"] = productid;
		uri = crossDomain + frontPath + "/frontendjson/delpresent.do?" + $.param(params) + "&callback=?";
	}else{
		params["productid"] = productid;
		uri = crossDomain + frontPath + "/frontendjson/delcartitem.do?" + $.param(params) + "&callback=?";
	}
	$.getJSON(uri,params,callbackSuspendCartAmount); 
	try{product_delete(productid);}catch(e){}//ga����룬ɾ�����ﳵ
}

function deleteSusUnselItem(cartId,productid,isPresent,index){
	$("#delsuspendcart" + index + "_" + cartId + "_" + productid).hide();
	var params = new Object();
	params["mid"] = mid;
	params["cartid"] = cartId;
	params["productid"] = productid;
	var url=crossDomain + frontPath + "/frontendjson/delunselcartitem.do?" + $.param(params) + "&callback=?";
	$.getJSON(url,params,callbackSuspendCartAmount);
}

/*��ʼ���ҵ��ղ� start*/
function initSuspendFavorite(){
	$("#loadfavorlist").html("<span class='loadfavor'>���ڼ��أ����Ժ�...</span>");
	var url = crossDomain + frontPath + "/cityindex/indexinclude/suspendfavorlist.do?" + "isSuspendCart=1&t=" + Math.random();
	$("#loadfavorlist").load(url,function(data){
		//�ҵ��ղ�
		$('.wm-c-box li').hover(function(){
			$(this).addClass('cur');
		},function(){
			$(this).removeClass('cur');
		})
	});
}
/*��ʼ���ҵ��ղ� end*/

/*��ʼ���Ҳ��������ﳵend*/
$(function(){
//	initSuspendCartInfo();	//��ʼ�����а���ҳ�Ҳ��������ﳵ
	$("#suspendcollect").bind("click",function(){
		initSuspendFavorite();	//��ʼ���ҵ��ղ�
	});
})

$(function(){
	try{
		if(sellerType == 2){//����ֱ��
			var tocarthref = $('#cartlink').attr('href');
			$('#cartlink').attr('href',tocarthref + '&curTab=6');
		}
	}catch(e){}
})