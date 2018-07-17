var ims,value;
    value = 0;
$(function (){
	function adjust(el, selection) {
		var scaleX = $(el).width() / (selection.width || 1);
		var scaleY = $(el).height() / (selection.height || 1);
		$(el+' img').css({
			width: Math.round(scaleX*$('#avatar').width() ) + 'px',
			height: Math.round(scaleY*$('#avatar').height() ) + 'px',
			marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
			marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
		});
	}
	function preview(img, selection) {
		adjust('#small-preview', selection);
	}

    ims = $('img#avatar').imgAreaSelect({
		aspectRatio: "142:228",
		minWidth: 50,
		minHeight: 80,
		//resizable: false,//不可调整选区的大小
		instance: true,
		onSelectEnd:function(img, selection) {
			$('#id_top').val(selection.y1);
			$('#id_left').val(selection.x1);
			$('#id_right').val(selection.x2);
			$('#id_bottom').val(selection.y2);
		},
		onSelectChange: preview
	});


}); 
function createImageSelection(){
	var oldWidth = $("#picture img").width();
	$('#avatar').rotate(value);
	$("#avatar").height(360);//初始化图片高度
    if ($("#avatar").width()>360){
    	$("#avatar").width(360);
        $("#avatar").css('height', 'auto')
    }
    var newWidth = $("#avatar").width();
    var multiple = oldWidth/newWidth;
    var imgw = $("#avatar").width();
    var imgh = $("#avatar").height();
	// w/h
    var needRatio = 142 / 228;
    //这里需要重新计算选区，考虑 500w 1h情况  1w 300h情况
    var ratio = imgw / imgh;
    var x1,y1,x2,y2,offw,offh,offs;
    offs = 0.9;
    if ( ratio > needRatio){
        //宽大于高
        offh = imgh;
        offw = imgh * needRatio;
    }else{
        //高大于宽
        offw = imgw;
        offh = imgw / needRatio;
    }
    offw = parseInt(offs * offw);
    offh = parseInt(offs * offh);
    x1 = parseInt((imgw-offw)/2);
    y1 = parseInt((imgh-offh)/2);
    
    x2 = x1 + offw;
    y2 = y1 + offh;
    
    ims.setSelection( x1, y1,  x2, y2, true);
	ims.setOptions(
        { 
            imageHeight: imgh,
            imageWidth: imgw,
            show: true 
        }
    );
	ims.update();
	$('#id_top').val(y1);
	$('#id_left').val(x1);
	$('#id_right').val(x2);
	$('#id_bottom').val(y2);
}
//禁用图像裁切
function closeImageSelection (){
	ims.cancelSelection();
}
function avatarrotateright(){
	value +=90;	
	$('#avatar').rotate({ animateTo:value});
	$('#avatar1').rotate({ animateTo:value});
	//$('#avatar2').rotate({ animateTo:value});
}

