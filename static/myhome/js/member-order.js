/*
*会员中心我的订单取消原因事件(此处有坑，由于iframe，导致订单中心的脚本需写到外层页面)
*/
$(function(){
	/*
 * 鼠标悬停效果
 */
	$(".reason li:not(.reason-remind)").live("mouseover",function(){
		
		$(this).addClass("hover");
	});
	$(".reason li:not(.reason-remind)").live("mouseout",function(){
		$(this).removeClass("hover");
	});
	$(".reason li:not(.reason-remind)").live("click",function(){
		var $this = $(this);
		$this.addClass("hovers").siblings('li').removeClass('hovers');
	});
});