/*
*��Ա�����ҵĶ���ȡ��ԭ���¼�(�˴��пӣ�����iframe�����¶������ĵĽű���д�����ҳ��)
*/
$(function(){
	/*
 * �����ͣЧ��
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