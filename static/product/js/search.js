$.fn.extend({
	goNext:function(area,fath,child,num){
		$(this).click(function(){
			var scorllwidth = $(area).find(child).eq(0).outerWidth()*num;     //移动的距离为一个li的宽度
			$(area).find(fath).stop().animate({
				"margin-left": - scorllwidth },
				0,
				function() {
					for( var m = 0; m < num; m++ ) {
						$(area).find(child).eq(0).appendTo($(area).find(fath)); 
					};
					$(area).find(fath).css("margin-left", 0); 
				}
			);
		});
	}
})

$(function(){
	//单件和套件tab
	$('.search-box-title span').click(function(){
		var sIndex = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().siblings('.tab-content').hide();
		$(this).parent().siblings('.tab-content').eq(sIndex).show();
	})
	//无缝隙滚动
	$(".guess-like").find(".change").goNext(".like-scroll","ul","li",5);
	$(".hot-activity").find(".change").goNext(".activity-box","ul","li",5);
})
