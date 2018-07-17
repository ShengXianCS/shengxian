var selector = {};
$(function(){
	var screenWidth = screen.width;
	if (screenWidth < 1210) {
		$('body').addClass('thousand');
	} else {
		$('body').removeClass('thousand');
	}
	initLazyloadParams();
	if(1 == isSearchLIst){//搜索页默认展开
		$('.packup-sidebar').hide().siblings('.unfold-sidebar').slideDown(1000);
		$('.main-r').addClass('main-r-unfold');
		$('.product-list').animate({left: '0'});
		getMainRightH();
	}
	/*
	 * screener-title 下拉框
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
	 * 筛选器样式布局
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
	 * 展开侧栏
	 */
	$('.packup-sidebar').click(function(){
		$(this).hide().siblings('.unfold-sidebar').slideDown();
		$('.main-r').addClass('main-r-unfold');
		$('.product-list').animate({left: '0'});
		getMainRightH();
	}) 
	
	/*
	 * 收起侧栏
	 */
	$('.unfold').click(function(){
		$(this).parents('.unfold-sidebar').hide().siblings('.packup-sidebar').show();
		$('.main-r').removeClass('main-r-unfold');
		$('.product-list').animate({left: '-120px'});
		getMainRightH();
	}) 
	
	/*
	 * 获取main-r 的高度
	 */
	getMainRightH();
	function getMainRightH () {
		var product_list_h = $('.product-list').outerHeight();
		var sort_h = $('.sort').outerHeight()-45;
		$('.main-r').height(product_list_h+sort_h);
	}
	 
	/*
	 * 筛选器 变量
	 */
	 var screener_list = $('.screener-list'),
	     screener_title = $('.screener-title'),
		 crumbs_nav = $('.append-list');
	/*
	 * 筛选器 更多 显示
	 */
	 getScreenerList(screener_list);
	/*
	 * 筛选器 更多
	 */
	 screener_list.find('span').live('click',function(){
		var value_list = $(this).siblings('dl');
		$(this).toggleClass('cur').siblings('dl').find('dd').toggleClass('show-more');
		if(value_list.find('dd').height()>=125) {
			value_list.find('dd').toggleClass('selected-scroll');
			value_list.find('dd').scrollTop(0);
		}
		if(value_list.find('dd').hasClass('show-more')) {
			$(this).find('em').html('收起');
		} else {
			$(this).find('em').html('更多');	
			value_list.find('dd').removeClass('selected-scroll');
		}

		value_list.find('dt').height(value_list.find('dd').height()); 
	 })
	 
	/*
	 * 筛选器 多选
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
	 * 筛选器 单选 选中
	 */
	 screener_list.find('li:not(".selected li")').live('click',function(){
		var list_val = $(this).find('a').html();
		var parentCalss = $(this).parent('.ul1').length + $(this).parent('.ul2').length;
		var id = $(this).find('a')[0].id;//筛选器值的id
		var tit_con = $(this).parents('dl').find('dt').html();
		if(tit_con == '品牌' && parentCalss>0){//品牌筛选器除外
			var i = $(this).parents('.screener-list').index();
			var html = "<div class='selected-item' data-value="+i+">"+"<span>"+tit_con+"："+list_val+"</span>"+"<i class='closeBrand' onclick='deleteBrand(); return false;'>"+"</i>"+"</div>";
			crumbs_nav.append(html);
			appendTex();
			screener_title.find('.reset').show();
			$(this).parents('.screener-list').hide(); // 选中后隐藏
		} else {
			var i = $(this).parents('.screener-list').index();
			var html = "<div class='selected-item' data-value="+i+">"+"<span>"+tit_con+"："+list_val+"</span>"+"<i class='close'>"+"</i>"+"</div>";
			crumbs_nav.append(html);
			appendTex();
			screener_title.find('.reset').show();
			$(this).parents('.screener-list').hide(); // 选中后隐藏
			selector[tit_con]=id;
			solrSearchPro('ajaxrightshow');
			};
	 })
	 
	/*
	 * 筛选器 筛选重置
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
	 * 筛选器 多选 选中
	 */
	 $('.selected').find('li').live('click',function(){
		 $(this).find('a').toggleClass('on');
		 var on_len = $(this).parents('dl').find('.on').length;
		 if (on_len>5) {
			 $(this).find('a').removeClass('on');
			 alert("已选条件不能大于5个");
			 return false;
		 }
		 
		 var on_len = $(this).parents('dl').find('.on').length;//重新计算个数
		 // 判断确定按钮置灰/选中的状态
		if (on_len>0) {
			$(this).parents('dd').find('.no-sure').addClass('sure');
		} else {
			$(this).parents('dd').find('.no-sure').removeClass('sure');
		}
		
	 })
	 
	/* 
	 * 筛选器 多选 取消
	 */
	$('.screener-list .cancel').live('click',function(){
		getScreenerList($('.screener-list'));
		clearStyle($(this),'dd','dt');
		//直接收起
		$(this).parent().parent().parent().parent().find('.cur').click();
	})
	
	/* 
	 * 筛选器 多选 确定
	 */
	$('.screener-list .sure').live('click',function(){
		var html = "";
		var sp = "";
		var id = "";
		var spid = "";
		var tit_con = $(this).parents('dl').find('dt').html();
		var brand = $("#brand").val();
		if(tit_con == "品牌"){
			if (brand == '-1') {
				brand = ",";
			}
			var i = $(this).parents('.screener-list').index();
			$('.screener-list').find('.on').each(function(){
			  html  += sp + $(this).html() ;
			  sp = "、";
			  brand += $(this)[0].id + ",";
			});
			searchQueryListOrderByMulti(0,brand,"","");
			html = "<div class='selected-item' data-value="+i+">"+"<span>"+tit_con+"："+html+"</span>"+"<i class='closeBrand' onclick='deleteBrand(); return false;'>"+"</i>"+"</div>"; 
			$('.append-list').append(html);
			$(this).parents('.screener-list').hide(); // 选中后隐藏
			clearStyle ($(this),'dd','dt');
			substrCrumbs ();
			appendTex();
		} else {
			var i = $(this).parents('.screener-list').index();
			$('.screener-list').find('.on').each(function(){
			  html  += sp + $(this).html() ;
			  sp = "、";
			  id  += spid + $(this)[0].id ;
			  spid = ",";
			});
			html = "<div class='selected-item' data-value="+i+">"+"<span>"+tit_con+"："+html+"</span>"+"<i class='close'>"+"</i>"+"</div>"; 
			$('.append-list').append(html);
			$(this).parents('.screener-list').hide(); // 选中后隐藏
			clearStyle ($(this),'dd','dt');
			substrCrumbs ();
			appendTex();
			selector[tit_con]=id;
			solrSearchPro('ajaxrightshow');
		}
		screener_title.find('.reset').show();
		loadscreenerul(); //筛选后的页面处理  看是否有品牌 无时横线去除
	})
	
	
	
	/*
	 * 筛选器 其他 多选
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
	 * 筛选器 其他 单选选中
	 */
	 $('.other-item').find('li:not(".selected li")').live('click',function(){
		var list_val = $(this).find('a').html();
		var id = $(this).find('a')[0].id;//筛选器值的id
		var len = $(this).parents('.other').find('.other-list:visible').length;
		var tit_con = $(this).parents('.other-list').find('b').html();
		var i = $(this).parents('.other').index();
		var j = $(this).parents('.other-list').index();
		var html = "<div class='selected-item' data-value="+i+" data-item="+j+">"+"<span>"+tit_con+"："+list_val+"</span>"+"<i class='close'>"+"</i>"+"</div>";
		crumbs_nav.append(html);
		appendTex();
		screener_title.find('.reset').show();
		
		// 选中后隐藏
		if(len>1) {
			$(this).parents('.other-list').hide(); 
		} else {
			$(this).parents('.other').hide(); 
		}
		selector[tit_con]=id;
		solrSearchPro('ajaxrightshow');
	 })
	 
	/*
	 * 筛选器 其他 多选选中
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
		  sp = "、";
		  id  += spid + $(this)[0].id ;
		  spid = ",";
		});
		html = "<div class='selected-item' data-value="+i+" data-item="+j+">"+"<span>"+tit_con+"："+html+"</span>"+"<i class='close'>"+"</i>"+"</div>"; 
		crumbs_nav.append(html);
		// 选中后隐藏
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
	 * 面包屑 字段截取
	 */
	function substrCrumbs (){
		$('.selected-item').each(function( ) {
		   var str = $(this).find('span').html();
		   var i = str.indexOf('、');
		   var j = str.indexOf('、',(i+1));
		   if (j>1) {
			   var str1 = str.replace(str.substring(j,str.length),'...')
			   $(this).find('span').html(str1);
		   } else {
			  return; 
		   }
		});
	}
	
	/*
	 * 还原加载时的样式
	 */
	function clearStyle($this,parent,uncle){
		$this.parents(parent).removeClass('selected').find('.no-sure').removeClass('sure');//清除取消前的样式
		$this.parents(parent).find('a').removeClass('on');
		$this.parents(parent).scrollTop(0);
		$this.parents(parent).removeClass('selected-scroll');
		$this.parents(parent).siblings(uncle).height($this.parents(parent).height()); 
	}
	
	/*
	 * 筛选框其他
	 */
	 $('.other .other-list').live('hover',function(){
		 //其他  下，只有一个筛选值是隐藏多选按钮
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
	 * 筛选器 其他 取消
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
	 * 关闭选择的筛选器
	 */
	 $('.selected-item .close').live('click',function(){
		 var $this_width = $(this).parents('.selected-item').outerWidth();
		 var alWidth = $('.append-list').outerWidth();
		 var alLeft = $('.append-list').position().left;
		 var j = $(this).parent('.selected-item').attr('data-value'); // 获取关联关闭的筛选器的索引
		 var z = $(this).parent('.selected-item').attr('data-item');
		
		 var selected_len = $('.selected-item').length;
		 var l_list = $('.screener-cont').find('.l-list');
		 
		 // 判断筛选重置是否隐藏
		 if (selected_len>1) {
			screener_title.find('.reset').show(); 
		 } else {
			screener_title.find('.reset').hide(); 
			$('.addsymbols').hide();
		 }
		 //关闭其他 筛选器
		 if (z!="") {
			 $('.other').find('.other-list').eq(z).show();
			  $('.other').find('.other-list').removeClass('other-list-cur');
		 } 
		 $(this).parent().remove();
		 l_list.eq(j).show();
		 l_list.eq(j).find('dt').height(l_list.eq(j).find('dd').height()); 
		 //筛选器左右箭头  start
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
			 
		 }//筛选器左右箭头  end
		 
		 //删除已选中的条件
		 var key_value =$(this).siblings("span").html();
		 var key_value_index = key_value.indexOf('：');
		 var key = key_value.substring(0,key_value_index);
		 delete selector[key];
		 appendTex();
		 solrSearchPro('ajaxrightshow');
	  })
	/*
	 * 搜索热销榜
	 */
	$('.host-sale .tit').find('li').click(function(){
		var index = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur');	
		$(this).parent().siblings('.con').find('ul').eq(index).show().siblings('ul').hide();
	})
	
	/*
	 * 悬停商品添加边框
	 */
	$(".product-list").find('li').live("mouseover",function(){
		$(this).addClass('on');	
	});
	$(".product-list").find('li').live("mouseout",function(){
		$(this).removeClass('on');	
	});
	
	/*
	 * 相关悬停添加边框
	 */
	$(".search-list").find('li').live("mouseover",function(){
		$(this).addClass('on');	
	});
	$(".search-list").find('li').live("mouseout",function(){
		$(this).removeClass('on');	
	});
	 
	/*
	 * 单件和套件tab
	 */
	$('.search-box-title span').live('click',function(){
		var sIndex = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().siblings('.tab-content').hide();
		$(this).parent().siblings('.tab-content').eq(sIndex).show();
	})
	
	//侧栏广告的控制
	var advlength = $(".unfold-sidebar .promotion ul li img").length;
	if(advlength <= 0){
		$(".unfold-sidebar .promotion ul").hide();
		$("#tgadvspan").hide();
	};
	
	//悬浮购物车返回顶部
	$(".go-top").click(function () {
        var speed=200;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
 	});
})
//筛选器更多显示
function getScreenerList(screener_list){
	screener_list.each(function(){
		 var count = $(this).find('li').length;
		 var screenWidth = screen.width;
		 if(count == 1){//筛选条件只有一个是隐藏多选按钮
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
	 
	 //appendTex();//面包屑增加左右箭头
}

//动态追加导航条
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
	foo();//重新加载loading图片
	if($('.main-wrap').find('.main-r-unfold').length > 0){
		$('.loadinggif').css("margin-left",351);//加载图的位置
	}else{
		$('.loadinggif').css("margin-left",476);//加载图的位置
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
				//筛选器样式布局
				$('.screener-cont li').each(function() {
					var list_height = $(this).find('dd').height();
					$(this).find('dt').height(list_height);
			    });
				if($('.screener-cont .brand .ul2 li').length <= 7){
					$('.screener-cont .brand dt').height(25);
					$('.screener-cont .brand dd').height(25);
				}
				//重新计算列表页高度
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

/*筛选后的页面处理*/
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

//初始化图片lazyload参数配置
function initLazyloadParams(){
	if($("img.lazyload").length == 0) { return; }
	$("img.lazyload").lazyload({
		threshold     : 250,    /*预加载可见高度100px*/
		skip_invisible: true,/*隐藏层图片不参与*/
		failure_limit : 50	  /*页面流中从第几个img标签开始计算*/
	});
}