$.fn.extend({
	//�˵�hover
	showSubcontHover:function(submenu){
		$(this).hover(function(){
			$(this).addClass("cur");
			var subnum = $(this).find(submenu).find("a").size();
			if(subnum > 0){
				$(this).find(submenu).show();
			}
		},function(){
			$(this).removeClass("cur");
			$(this).find(submenu).hide();	
		});
	}

})

$(function(){
	$(".kinds").showSubcontHover(".sub_kinds");
	//��խ���л�
	var  screenwidth = screen.width;
	if(screenwidth < 1210){
		$("body").addClass("thousand");
		 
	}else{
		$("body").removeClass("thousand");
	};
	
	//  ÿ�վ���
	$('.madden li,.unified li,.calvin li').hover(function(){
		$(this).addClass('curr').siblings().removeClass('curr');
	},function(){
		$(this).removeClass('curr');
	})
	
	//�������ﳵ���ض���
	$(".go-top").click(function () {
        var speed=200;//�������ٶ�
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
 	});
	
	//�ֲ�ͼ
	var sLi = $('.switch li'),
		sLength = sLi.length,
		bIcon = $('.bIcon'),
		iLi = $('.bIcon li'),
		iWidth = iLi.outerWidth()+6,
		speed = 5000,
		curr = 0;
	bIcon.css({width:sLength * iWidth,marginLeft:-sLength * iWidth / 2});
	iLi.first().addClass('active');
	if(sLi.length > 0){
		var t = setInterval(trans,speed);
	}
	function trans(){
		curr++;
		if(curr >= sLength){
			curr = 0;
		}
		if(curr < 0 ){
			curr = sLength - 1;
		}
		$('.switch li').hide().eq(curr).show();
		iLi.removeClass('active').eq(curr).addClass('active');
	}
	iLi.hover(function(){
		var n = $(this).index();
		iLi.removeClass('active').eq(n).addClass('active');
		$('.switch li').hide().eq(n).show();
		curr = n;
	})
	$('.banner').hover(function(){
		clearInterval(t);
	},function(){
		t = setInterval(trans,speed);
	})
	
	// ������ʾ����
	var _floor = $('.floor'),
		_fBox = $('.fBox'),
		_fLi = $('.fBox li'),
		_fHeight = 33,
		_fWidth = 32,
		_fsize = $('.fBox li').length,
		fW = $(window).width(),
		width = $('.width').width();
	
	_fBox.css({height:_fHeight * _fsize - 1,marginTop: -_fsize * _fHeight / 2,left:(fW - width) / 2 - _fWidth - 10});
	_fBox.css('_left',(fW - width) / 2 - _fWidth -20);
	_fLi.each(function(){
		var lindex = $(this).index();
		var fHeight = _floor.eq(lindex).offset().top,
			firstTop = _floor.first().offset().top;
		
		$(window).scroll(function(){
			var sHeight = $(window).scrollTop();
			var fOffset_top = $('.floor').last().offset().top - ($(window).height() - (_fHeight * _fsize - 1))/2 + 65;
			if(sHeight >= firstTop){
				_fBox.show();
			}else{
				_fBox.hide();
			}
			if(sHeight >= fHeight){
				_fBox.show();
				_fLi.eq(lindex).addClass('active').siblings().removeClass('active');
			}
			if(sHeight >= fOffset_top){
				_fBox.hide();
			}
		})
		//����ƶ���ȥ��ʾЧ��
		_fLi.hover(function(){
			$(this).addClass('laddhover');
		},function(){
			$(this).removeClass('laddhover');
		})
		//������¼�
		_fLi.click(function(){
			var cIndex = $(this).index();
			var fHeight = _floor.eq(cIndex).offset().top;
			$(this).addClass('active').siblings().removeClass('active');
			$(window).scrollTop(fHeight);
		})
	})
	
})

// ����ʱ���
function timer(intDiff,pid,commendid){
	window.setInterval(function(){
		var day=0,
			hour=0,
			minute=0,
			second=0;//ʱ��Ĭ��ֵ		
		if(intDiff > 0){
			day = Math.floor(intDiff / (1000 * 60 * 60 * 24));
			hour = Math.floor(intDiff / (1000 * 60 * 60)) % 24;
			minute = Math.floor(intDiff / (1000 * 60)) % 60;
			second = Math.floor(intDiff / 1000) % 60;
		}
		if(day <= 9){day = '0' + day};
		if(hour <= 9){hour = '0' + hour};
		if(minute <= 9){minute = '0' + minute};
		if(second <= 9){second = '0' + second};
		$("#day_show"+"_"+pid+"_"+commendid).html(day);
		$("#hour_show"+"_"+pid+"_"+commendid).html('<s id="h"></s>'+hour);
		$("#minute_show"+"_"+pid+"_"+commendid).html('<s></s>'+minute);
		$("#second_show"+"_"+pid+"_"+commendid).html('<s></s>'+second);
		intDiff -= 1000;
	}, 1000);
} 

//���ص�Ʒ����۸�
function loadCommendPrices(pidsArr,commendArr,mid,isShowDJS){
	var commend_buyPrice = "commend_buyPrice";
	getPrices(pidsArr,mid,function(data){
		if(!valiLoadProductsData(data)){
			return;
		}
		var result = data.result;
		for(var i = 0;i < result.length;i++){
			var buyPrice = 0,
			marketPrice = 0, WMPrice = "";
			var id = result[i].id;
			var commendid = commendArr[i];
			if(result[i].price.buyPrice && result[i].price.buyPrice.priceValue && result[i].price.buyPrice.priceValue != 0 && result[i].price.buyPrice.priceValue != ""){
				buyPrice = parseFloat(result[i].price.buyPrice.priceValue);
				buyPrice = buyPrice.toFixed(2);
				$("#"+commend_buyPrice+"_"+id+"_"+commendid).html(buyPrice);
			}else{
				$("#"+commend_buyPrice+"_"+id+"_"+commendid).html("���޼۸�");
			}
			if(!result[i].sellable){
				$("#commend_addCart" + "_" + id + "_" + commendid).removeAttr("onclick");
				$("#commend_addCart" + "_" + id + "_" + commendid).addClass("sellout");
				$("#commend_addCart" + "_" + id + "_" + commendid).html("������");
				$("#bannerhot_" + id).hide();
				$("#time-item"+"_"+id+"_"+commendid).hide();
			}else{
				$("#bannerhot_" + id).show();
			}
			if(isShowDJS){
				//���õ���ʱ
				if(result[i].price && result[i].price.specialPrice && result[i].price.specialPrice.priceValue != 0 && result[i].price.specialPrice.priceValue != ""){
					//��ȡ��Ʒ�Ŀ�ʼʱ��ͽ���ʱ��
					var beginTime = result[i].price.specialPrice.begintime;
					var endTime = result[i].price.specialPrice.endtime;
					var currentTime = new Date();
					var timeMillions = endTime - currentTime;
					var dayinfo = Math.floor(timeMillions / (1000 * 60 * 60 * 24));
					if(timeMillions > 0 && dayinfo < 4){
						timer(timeMillions,id,commendid);
					}else{
						$("#time-item"+"_"+id+"_"+commendid).hide();
					}				
				}else{
					$("#time-item"+"_"+id+"_"+commendid).hide();
				}
			}
		}
	});
}

//�������ù����ǩ��ʾ
function loadProductLabel(pidsArr,commendArr,mid){
	var ids = "";
	for(var i = 0; i < pidsArr.length; i++ ){
		ids += pidsArr[i] + ",";
	}
	var ruleiconurl = "/ruleicon/lablelist.do?ids="+ids+"&mid="+mid+"&callback=?";
    $.getJSON(ruleiconurl,function(data){
			var imguri = data.imgurl;
			urilist = imguri.split(",");
			for(var i=0;i<urilist.length;i++){
				var tempurl = urilist[i];
				if(null != tempurl && tempurl.length > 0){
					var imguri = tempurl.split("_");
					if(imguri[0] != null && imguri[0] != 'undefined' && imguri[0] != ''){
						if(imguri[1] != null && imguri[2] != null){
							url = picPrefix + imguri[1];
							//��Ʒ�ۿ�6582//Ʒ���ۿ�6583//��Ʒ��Ʒ7503//Ʒ����Ʒ7505
							//0Ϊ�̶���� 1Ϊ����
							if(imguri[2]!=null){
								var typeid = imguri[2];
								var imgcomment = "";
								imgcomment+="<div class='ruletitle'>";
								/*if(typeid==576608 && imguri[3] != "" && imguri[4] != ""){
									imgcomment+="<span>��"+imguri[3]+"��"+imguri[4]+"</span>";
								}*/
								if(typeid==6582 && imguri[3] != "" && imguri[4] != "" && imguri[5] != ""){
									var chinese = imguri[3];
									if(chinese < 10){
										chinese = convertToChinese(imguri[3]);
									}
									imgcomment+="<span>��"+chinese+"��</span>";
									if(imguri[5]==1){
										imgcomment+="<span>��"+imguri[4]+"Ԫ</span>";
									}
									if(imguri[5]==2){
										if(imguri[4]==5){
											imgcomment+="<span>���</span>";
										}else{
											imgcomment+="<span>"+imguri[4]+"��</span>";
										}
									}
								}
								if(typeid==6583 && imguri[3] != "" && imguri[4] != "" && imguri[5] != ""){
									imgcomment+="<span>��"+imguri[3]+"</span>";
									if(imguri[5]==1){
										imgcomment+="<span>��"+imguri[4]+"</span>";
									}
									if(imguri[5]==2){
										imgcomment+="<span>��"+imguri[4]+"��</span>";
									}
								}
								if(typeid==7503){
									imgcomment+="<span>��</span>";
								}
								if(typeid==7505 && imguri[3] != ""){
									imgcomment+="<span>��"+imguri[3]+"</span>"+"<span>��</span>";
								}
								imgcomment+="</div>";
								if(imgcomment != ""){
									$("#ruletitle_"+imguri[0]).html(imgcomment);
								}
							}
						}
					}
				}
			}
	});
}