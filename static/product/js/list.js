var selector = {};
$(function(){
	var screenWidth = screen.width;
	if (screenWidth < 1210) {
		$('body').addClass('thousand');
	} else {
		$('body').removeClass('thousand');
	}
	initLazyloadParams();
	if(1 == isSearchLIst){//����ҳĬ��չ��
		$('.packup-sidebar').hide().siblings('.unfold-sidebar').slideDown(1000);
		$('.main-r').addClass('main-r-unfold');
		$('.product-list').animate({left: '0'});
		getMainRightH();
	}
	/*
	 * screener-title ������
	 */
	$('.screener-title .other-list-sub').live('hover',function(){
		if($('.crumbs-nav').find('.other-list-cur').length==1){
			$(this).removeClass('other-list-cur');
		}else{
			$(this).addClass('other-list-cur');
		}
	});
	$('.screener-title .other-list').hover(function(){
		 $(this).addClass('other-list-cur');
	 },function(){
		 $(this).removeClass('other-list-cur');
	})
	$('.screener-title .other-list').click(function(){
		 $(this).parent().parent().find(".reset").click();
	});
	
	
	/*
	 * ɸѡ����ʽ����
	 */
	$('.screener-cont li').each(function() {
		var list_height = $(this).find('dd').height();
		$(this).find('dt').height(list_height);
		
		
    });
	if($('.screener-cont .brand .ul2 li').length <= 7){
		$('.screener-cont .brand dt').height(25);
		$('.screener-cont .brand dd').height(25);
	};
	/*
	 * չ������
	 */
	$('.packup-sidebar').click(function(){
		$(this).hide().siblings('.unfold-sidebar').slideDown();
		$('.main-r').addClass('main-r-unfold');
		$('.product-list').animate({left: '0'});
		getMainRightH();
	}) 
	
	/*
	 * �������
	 */
	$('.unfold').click(function(){
		$(this).parents('.unfold-sidebar').hide().siblings('.packup-sidebar').show();
		$('.main-r').removeClass('main-r-unfold');
		$('.product-list').animate({left: '-120px'});
		getMainRightH();
	}) 
	
	/*
	 * ��ȡmain-r �ĸ߶�
	 */
	getMainRightH();
	function getMainRightH () {
		var product_list_h = $('.product-list').outerHeight();
		var sort_h = $('.sort').outerHeight()-45;
		$('.main-r').height(product_list_h+sort_h);
	}
	 
	/*
	 * ɸѡ�� ����
	 */
	 var screener_list = $('.screener-list'),
	     screener_title = $('.screener-title'),
		 crumbs_nav = $('.append-list');
	/*
	 * ɸѡ�� ���� ��ʾ
	 */
	 getScreenerList(screener_list);
	/*
	 * ɸѡ�� ����
	 */
	 screener_list.find('span').live('click',function(){
		var value_list = $(this).siblings('dl');
		$(this).toggleClass('cur').siblings('dl').find('dd').toggleClass('show-more');
		if(value_list.find('dd').height()>=125) {
			value_list.find('dd').toggleClass('selected-scroll');
			value_list.find('dd').scrollTop(0);
		}
		if(value_list.find('dd').hasClass('show-more')) {
			$(this).find('em').html('����');
		} else {
			$(this).find('em').html('����');	
			value_list.find('dd').removeClass('selected-scroll');
		}

		value_list.find('dt').height(value_list.find('dd').height()); 
	 })
	 
	/*
	 * ɸѡ�� ��ѡ
	 */
	 screener_list.find('strong').live('click',function(){
		$(this).siblings('span').css("display","none");
		var value_list = $(this).siblings('dl');
		value_list.find('dd').addClass('selected');
		if(value_list.find('dd').find('.more')){
			value_list.find('dd').find('.ul1').removeClass('more').addClass('hidden');
			value_list.find('dd').find('.ul2').removeClass('hidden').addClass('more');
		}
		if(value_list.find('dd').height()>185) {
			value_list.find('dd').toggleClass('selected-scroll');
			value_list.find('dd').scrollTop(0);
		}

		value_list.find('dt').height(value_list.find('dd').height()+51); 
	 })
	/*
	 * ɸѡ�� ��ѡ ѡ��
	 */
	 screener_list.find('li:not(".selected li")').live('click',function(){
		var list_val = $(this).find('a').html();
		var parentCalss = $(this).parent('.ul1').length + $(this).parent('.ul2').length;
		var id = $(this).find('a')[0].id;//ɸѡ��ֵ��id
		var tit_con = $(this).parents('dl').find('dt').html();
		if(tit_con == 'Ʒ��' && parentCalss>0){//Ʒ��ɸѡ������
			var i = $(this).parents('.screener-list').index();
			var html = "<div class='selected-item' data-value="+i+">"+"<span>"+tit_con+"��"+list_val+"</span>"+"<i class='closeBrand' onclick='deleteBrand(); return false;'>"+"</i>"+"</div>";
			crumbs_nav.append(html);
			appendTex();
			screener_title.find('.reset').show();
			$(this).parents('.screener-list').hide(); // ѡ�к�����
		} else {
			var i = $(this).parents('.screener-list').index();
			var html = "<div class='selected-item' data-value="+i+">"+"<span>"+tit_con+"��"+list_val+"</span>"+"<i class='close'>"+"</i>"+"</div>";
			crumbs_nav.append(html);
			appendTex();
			screener_title.find('.reset').show();
			$(this).parents('.screener-list').hide(); // ѡ�к�����
			selector[tit_con]=id;
			solrSearchPro('ajaxrightshow');
			};
	 })
	 
	/*
	 * ɸѡ�� ɸѡ����
	 */
	  screener_title.find('.reset').click(function(){
		  $('.append-list').width('auto');
		  $('.append-txt').width('auto');
		  $('.prev,.next').hide();
		  $('.selected-item').remove();
		  selector = {};
		  $('#brand').val("-1");
		  screener_list.show();
		  $('.other').show();
		  var $this = $('.other-list-cur');
		  $this.removeClass('other-list-cur').show();
		  $('.screener-title').find('.reset').css("display","none");
		  $('.addsymbols').hide();
		  handleRecommend("-1");
		  searchPLFormSubmit();
	  })
	  
    /*
	 * ɸѡ�� ��ѡ ѡ��
	 */
	 $('.selected').find('li').live('click',function(){
		 $(this).find('a').toggleClass('on');
		 var on_len = $(this).parents('dl').find('.on').length;
		 if (on_len>5) {
			 $(this).find('a').removeClass('on');
			 alert("��ѡ�������ܴ���5��");
			 return false;
		 }
		 
		 var on_len = $(this).parents('dl').find('.on').length;//���¼������
		 // �ж�ȷ����ť�û�/ѡ�е�״̬
		if (on_len>0) {
			$(this).parents('dd').find('.no-sure').addClass('sure');
		} else {
			$(this).parents('dd').find('.no-sure').removeClass('sure');
		}
		
	 })
	 
	/* 
	 * ɸѡ�� ��ѡ ȡ��
	 */
	$('.screener-list .cancel').live('click',function(){
		getScreenerList($('.screener-list'));
		clearStyle($(this),'dd','dt');
		//ֱ������
		$(this).parent().parent().parent().parent().find('.cur').click();
	})
	
	/* 
	 * ɸѡ�� ��ѡ ȷ��
	 */
	$('.screener-list .sure').live('click',function(){
		var html = "";
		var sp = "";
		var id = "";
		var spid = "";
		var tit_con = $(this).parents('dl').find('dt').html();
		var brand = $("#brand").val();
		if(tit_con == "Ʒ��"){
			if (brand == '-1') {
				brand = ",";
			}
			var i = $(this).parents('.screener-list').index();
			$('.screener-list').find('.on').each(function(){
			  html  += sp + $(this).html() ;
			  sp = "��";
			  brand += $(this)[0].id + ",";
			});
			searchQueryListOrderByMulti(0,brand,"","");
			html = "<div class='selected-item' data-value="+i+">"+"<span>"+tit_con+"��"+html+"</span>"+"<i class='closeBrand' onclick='deleteBrand(); return false;'>"+"</i>"+"</div>"; 
			$('.append-list').append(html);
			$(this).parents('.screener-list').hide(); // ѡ�к�����
			clearStyle ($(this),'dd','dt');
			substrCrumbs ();
			appendTex();
		} else {
			var i = $(this).parents('.screener-list').index();
			$('.screener-list').find('.on').each(function(){
			  html  += sp + $(this).html() ;
			  sp = "��";
			  id  += spid + $(this)[0].id ;
			  spid = ",";
			});
			html = "<div class='selected-item' data-value="+i+">"+"<span>"+tit_con+"��"+html+"</span>"+"<i class='close'>"+"</i>"+"</div>"; 
			$('.append-list').append(html);
			$(this).parents('.screener-list').hide(); // ѡ�к�����
			clearStyle ($(this),'dd','dt');
			substrCrumbs ();
			appendTex();
			selector[tit_con]=id;
			solrSearchPro('ajaxrightshow');
		}
		screener_title.find('.reset').show();
		loadscreenerul(); //ɸѡ���ҳ�洦��  ���Ƿ���Ʒ�� ��ʱ����ȥ��
	})
	
	
	
	/*
	 * ɸѡ�� ���� ��ѡ
	 */
	 $('.other').find('strong').live('click',function(){
		var value_list = $(this).siblings('.other-item');
		value_list.addClass('selected');
		if(value_list.height()>135) {
			value_list.find('ul').addClass('scroll selected-scroll');
			value_list.scrollTop(0);
			value_list.removeAttr('style');
		}else{
			value_list.height(value_list.height()+51); 
		}
	 })
	 
	/*
	 * ɸѡ�� ���� ��ѡѡ��
	 */
	 $('.other-item').find('li:not(".selected li")').live('click',function(){
		var list_val = $(this).find('a').html();
		var id = $(this).find('a')[0].id;//ɸѡ��ֵ��id
		var len = $(this).parents('.other').find('.other-list:visible').length;
		var tit_con = $(this).parents('.other-list').find('b').html();
		var i = $(this).parents('.other').index();
		var j = $(this).parents('.other-list').index();
		var html = "<div class='selected-item' data-value="+i+" data-item="+j+">"+"<span>"+tit_con+"��"+list_val+"</span>"+"<i class='close'>"+"</i>"+"</div>";
		crumbs_nav.append(html);
		appendTex();
		screener_title.find('.reset').show();
		
		// ѡ�к�����
		if(len>1) {
			$(this).parents('.other-list').hide(); 
		} else {
			$(this).parents('.other').hide(); 
		}
		selector[tit_con]=id;
		solrSearchPro('ajaxrightshow');
	 })
	 
	/*
	 * ɸѡ�� ���� ��ѡѡ��
	 */
	$('.other .sure').live('click',function(){
		var html = "";
		var sp = "";
		var id = "";
		var spid = "";
		var tit_con = $(this).parents('.other-list').find('b').html();
		var len = $(this).parents('.other').find('.other-list:visible').length;
		var i = $(this).parents('.l-list').index();
		var j = $(this).parents('.other-list').index();
		$('.other-list').find('.on').each(function(){
		  html  += sp + $(this).html() ;
		  sp = "��";
		  id  += spid + $(this)[0].id ;
		  spid = ",";
		});
		html = "<div class='selected-item' data-value="+i+" data-item="+j+">"+"<span>"+tit_con+"��"+html+"</span>"+"<i class='close'>"+"</i>"+"</div>"; 
		crumbs_nav.append(html);
		// ѡ�к�����
		if(len>1) {
			$(this).parents('.other-list').hide(); 
		} else {
			$(this).parents('.other').hide(); 
		}
		clearStyle ($(this),'dd','dt');
		substrCrumbs ();
		appendTex();
		selector[tit_con]=id;
		solrSearchPro('ajaxrightshow');
	});
	
	
	/*
	 * ���м �ֶν�ȡ
	 */
	function substrCrumbs (){
		$('.selected-item').each(function( ) {
		   var str = $(this).find('span').html();
		   var i = str.indexOf('��');
		   var j = str.indexOf('��',(i+1));
		   if (j>1) {
			   var str1 = str.replace(str.substring(j,str.length),'...')
			   $(this).find('span').html(str1);
		   } else {
			  return; 
		   }
		});
	}
	
	/*
	 * ��ԭ����ʱ����ʽ
	 */
	function clearStyle($this,parent,uncle){
		$this.parents(parent).removeClass('selected').find('.no-sure').removeClass('sure');//���ȡ��ǰ����ʽ
		$this.parents(parent).find('a').removeClass('on');
		$this.parents(parent).scrollTop(0);
		$this.parents(parent).removeClass('selected-scroll');
		$this.parents(parent).siblings(uncle).height($this.parents(parent).height()); 
	}
	
	/*
	 * ɸѡ������
	 */
	 $('.other .other-list').live('hover',function(){
		 //����  �£�ֻ��һ��ɸѡֵ�����ض�ѡ��ť
		if($(this).find('li').length == 1){
			$(this).find('strong').hide();
		}
	 	var offLeft = $(this).offset().left,
			wWidth = $(window).width(),
			width = $('.width').width();
		    $(this).toggleClass('other-list-cur').siblings('.other-list').removeClass('other-list-cur');
		$(this).find('.other-cont').css({left:119-(offLeft - (wWidth - width)/2)});
	 })
	 
	/* 
	 * ɸѡ�� ���� ȡ��
	 */
	$('.other .cancel').live('click',function(){
		var value_list = $(this).parents('.other-item');
		value_list.removeClass('selected');
		value_list.find('a').removeClass('on');
		if(value_list.find('.scroll').length>0){
			value_list.find('ul').removeClass('selected-scroll');
			value_list.scrollTop(0);
			value_list.height(value_list.height());
		}else{
			value_list.height(value_list.height()-51);
		}
	})


	/*
	 * �ر�ѡ���ɸѡ��
	 */
	 $('.selected-item .close').live('click',function(){
		 var $this_width = $(this).parents('.selected-item').outerWidth();
		 var alWidth = $('.append-list').outerWidth();
		 var alLeft = $('.append-list').position().left;
		 var j = $(this).parent('.selected-item').attr('data-value'); // ��ȡ�����رյ�ɸѡ��������
		 var z = $(this).parent('.selected-item').attr('data-item');
		
		 var selected_len = $('.selected-item').length;
		 var l_list = $('.screener-cont').find('.l-list');
		 
		 // �ж�ɸѡ�����Ƿ�����
		 if (selected_len>1) {
			screener_title.find('.reset').show(); 
		 } else {
			screener_title.find('.reset').hide(); 
			$('.addsymbols').hide();
		 }
		 //�ر����� ɸѡ��
		 if (z!="") {
			 $('.other').find('.other-list').eq(z).show();
			  $('.other').find('.other-list').removeClass('other-list-cur');
		 } 
		 $(this).parent().remove();
		 l_list.eq(j).show();
		 l_list.eq(j).find('dt').height(l_list.eq(j).find('dd').height()); 
		 //ɸѡ�����Ҽ�ͷ  start
		 if($('.append-list').find('.selected-item').length == 0){
			 $('.prev,.next').hide();
			 $('.append-list').css({width:0,left:0});
		 }
		 $('.append-list').css({width:alWidth - $this_width});
		 var current_width = $('.width').outerWidth()- 50 - ($('.crumbs-nav').outerWidth() + $('.condition-search').outerWidth() + $('.reset').outerWidth());
		 if(alWidth - $this_width < current_width){
			 $('.prev,.next').hide();
		 }
		 if(alLeft < 0){
			 if(alLeft + $this_width < 0){
				 $('.append-list').css({left:alLeft + $this_width + 10});
			 }else{
				 $('.append-list').css({left:'0px'});
			 }
			 
		 }//ɸѡ�����Ҽ�ͷ  end
		 
		 //ɾ����ѡ�е�����
		 var key_value =$(this).siblings("span").html();
		 var key_value_index = key_value.indexOf('��');
		 var key = key_value.substring(0,key_value_index);
		 delete selector[key];
		 appendTex();
		 solrSearchPro('ajaxrightshow');
	  })
	/*
	 * ����������
	 */
	$('.host-sale .tit').find('li').click(function(){
		var index = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur');	
		$(this).parent().siblings('.con').find('ul').eq(index).show().siblings('ul').hide();
	})
	
	/*
	 * ��ͣ��Ʒ��ӱ߿�
	 */
	$(".product-list").find('li').live("mouseover",function(){
		$(this).addClass('on');	
	});
	$(".product-list").find('li').live("mouseout",function(){
		$(this).removeClass('on');	
	});
	
	/*
	 * �����ͣ��ӱ߿�
	 */
	$(".search-list").find('li').live("mouseover",function(){
		$(this).addClass('on');	
	});
	$(".search-list").find('li').live("mouseout",function(){
		$(this).removeClass('on');	
	});
	 
	/*
	 * �������׼�tab
	 */
	$('.search-box-title span').live('click',function(){
		var sIndex = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().siblings('.tab-content').hide();
		$(this).parent().siblings('.tab-content').eq(sIndex).show();
	})
	
	//�������Ŀ���
	var advlength = $(".unfold-sidebar .promotion ul li img").length;
	if(advlength <= 0){
		$(".unfold-sidebar .promotion ul").hide();
		$("#tgadvspan").hide();
	};
	
	//�������ﳵ���ض���
	$(".go-top").click(function () {
        var speed=200;//�������ٶ�
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
 	});
})
//ɸѡ��������ʾ
function getScreenerList(screener_list){
	screener_list.each(function(){
		 var count = $(this).find('li').length;
		 var screenWidth = screen.width;
		 if(count == 1){//ɸѡ����ֻ��һ�������ض�ѡ��ť
			 $(this).find('strong').hide(); 
		 }
		 if (screenWidth < 1210) {
			var licount = 5;
			if($(this).find('.ul2').length > 0){
				licount = 20;
			}
			if (count>licount) {
				$(this).find('span').show();
			} else {
				$(this).find('span').hide(); 
			}
		 } else {
			var licount = 7;
			if($(this).find('.ul2').length > 0){
				licount = 28;
			}
			if (count>licount) {
				$(this).find('span').show();
			} else {
				$(this).find('span').hide(); 
			}
		 }
	 })
	 
	 //appendTex();//���м�������Ҽ�ͷ
}

//��̬׷�ӵ�����
function appendTex(){
	var listItem = $('.append-list .selected-item'),
		aList = $('.append-list'),
		current_width = $('.width').outerWidth()- 50 - ($('.crumbs-nav').outerWidth() + $('.condition-search').outerWidth() + $('.reset').outerWidth()),
		m = 0;
	listItem.each(function(index){
		index <= listItem.length - 1;
		var mWidth = listItem.eq(index).outerWidth() + 10;
		m += mWidth;
	})
	if(listItem.length > 0 && m < current_width){
		$('.addsymbols').show();
	}else {
		$('.addsymbols').hide();
	}
	if(m==0){
		aList.width(m);
	} else if(m>= current_width){
		aList.width(m + 10);
		$('.next').show();
		$('.append-txt').width(current_width);
	}else{
		aList.removeAttr('style');
		$('.next').hide();
		$('.prev').hide();
		$('.append-txt').width('auto');
	}
	$('.next').bind('click',function(){
		if(current_width - aList.width() < 0){
			aList.css({left: current_width - aList.width()});
		} else {
			aList.css({left: '0px'});
		}
		
		$(this).hide();
		$('.prev').show();
	})
	$('.prev').bind('click',function(){
		
		aList.css({left: 0});
		$(this).hide();
		$('.next').show();
	})
}

function foo(){
	var picpath = frontPath + "/zhongliang/city/productList/images/loading.gif?tt=" + new Date().getTime();
	$('.product-list').find('ul').empty();
	var img = $('<img class="loadinggif" src="'+picpath+'"/>');
	$('.product-list').find('ul').append(img);
}

function solrSearchPro(flag){
	foo();//���¼���loadingͼƬ
	if($('.main-wrap').find('.main-r-unfold').length > 0){
		$('.loadinggif').css("margin-left",351);//����ͼ��λ��
	}else{
		$('.loadinggif').css("margin-left",476);//����ͼ��λ��
	}
	var dataPara = getFormJson("searchProductListForm");
	dataPara[flag] = '1';
	var last=JSON.stringify(selector);
	dataPara['erpFilter'] = last;
	var splfrom = $("#searchProductListForm");
	$.ajax({
		url: splfrom.attr('action'),
		type: 'post',
		data: dataPara,
		success: function(data){
			if(flag == 'ajaxrightshow'){
				$("#ajaxrightshow").html(data);
				$("#ajaxscreening").html($("#ajaxscreeningForCopy").html());
				$("#ajaxscreeningForCopy").html("");
				//ɸѡ����ʽ����
				$('.screener-cont li').each(function() {
					var list_height = $(this).find('dd').height();
					$(this).find('dt').height(list_height);
			    });
				if($('.screener-cont .brand .ul2 li').length <= 7){
					$('.screener-cont .brand dt').height(25);
					$('.screener-cont .brand dd').height(25);
				}
				//���¼����б�ҳ�߶�
				var product_list_h = $('.product-list').outerHeight();
				var sort_h = $('.sort').outerHeight()-45;
				$('.main-r').height(product_list_h+sort_h);
				
				bransShowInit();
				getScreenerList($('.screener-list'));
			}else if(flag == 'ajaxprolist'){
				$("#showResult").html(data);
			}
			loadProImage();
			proamountEvent();
			initLazyloadParams();
			loadProductLabel();
			if($('.unfold-sidebar').is(':hidden')) {
				$('.product-list').css({left: '-120px'});
			} else {
				$('.product-list').css({left: '0'});
			}
			loadscreenerul();
	    }
	});
}

/*ɸѡ���ҳ�洦��*/
function loadscreenerul(){
	var size = $(".screener-cont .l-list :visible").length;
	if(size <= 0){
		$(".screener-cont").hide();
	}
}
function searchQueryListByPrice(){
	$('#BeginPrice').val($('.beginprice').val());
	$('#EndPrice').val($('.endprice').val());
	solrSearchPro('ajaxrightshow');
}

//��ʼ��ͼƬlazyload��������
function initLazyloadParams(){
	if($("img.lazyload").length == 0) { return; }
	$("img.lazyload").lazyload({
		threshold     : 250,    /*Ԥ���ؿɼ��߶�100px*/
		skip_invisible: true,/*���ز�ͼƬ������*/
		failure_limit : 50	  /*ҳ�����дӵڼ���img��ǩ��ʼ����*/
	});
}