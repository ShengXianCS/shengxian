try{
	crossDomain;
}catch(e){
	crossDomain = "";
}

//加载城市
$(function(){
	if($("#siteinfo").length > 0){
		var showsite = $("#siteinfo").attr("data-showsite");
		if(showsite != 1){
			$("#siteinfo").load("/cityindex/includetopchangecity.do",function(){
				if($("#sitename").length > 0){
					judgeCity();
					setTimeout(function(){initSiteInfoDelay();},1000);
				}
			});
		}
	}
	
});
$(function(){
	$('.site-input .province').live('click',function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parent().children().find('s').hide();
		$(this).find('s').show();
		$('.abridge-city').show();
		$(".abridge-subcity").hide();
	});
	
	$('.abridge-city span').live('mouseover',function(){
		$(this).addClass('cur').siblings().removeClass('cur');
	});
	$('.abridge-city span').live('mouseout',function(){
		$(this).removeClass('cur');
	});
	// 热门城市   20160315
	$('.hot-city-name span').live('mouseover',function(){
		$(this).addClass('cur').siblings().removeClass('cur');
	});
	$('.hot-city-name span').live('mouseout',function(){
		$(this).removeClass('cur');
	});

});
function judgeCity(){
	var siteinfo = $.cookie("siteinfo");
	if(!siteinfo) $.post(frontPath+"/cityindex/site/cityinfobyreq.do");
}

function initSiteInfoDelay(){
	var siteinfo = $.cookie("siteinfo");
	if(!siteinfo){setTimeout(function(){initSiteInfoDelay();},1000);return;}//若取不到siteinfo信息就延时1s后再执行，异步返回慢的时候会发生此情况
	var isShowChangeSub = false, siteinfoArray = siteinfo.split("|"), siteinfoshort = $.cookie("siteinfotemp");
	if(siteinfoArray && siteinfoArray.length > 0){
		writeResult(siteinfoArray);
		if(siteinfoArray[1] != cityid){isShowChangeSub = true;}
	}
	if( !(typeof(sellerId) == "undefined") && !(typeof(sellerType) == "undefined") && sellerId > 0 && (sellerType == 2 || sellerType ==3)){
		isShowChangeSub = false;
	}
	if(siteinfoshort && siteinfoshort == cityid)return;
	if(isShowChangeSub){showChangeSub();}
}


/*分渲染部分begin*/
function writeResult(siteinfoArray){
	if(siteinfoArray.length >= 2){
		var defCity = siteinfoArray[2];
		$("#defCity").html(defCity);
	}
}
function changeSubConfirmCommon(currchangecityid,confirmLayerId){
	/*if(currchangecityid == cityid) {
		closeChangeSub();
		return;
	}*/
	changeCityId = currchangecityid;
	/*var uri = crossDomain + frontPath + "/frontendjson/smallcartinfo.do?mid=" + mid + "&callback=?";
	$.getJSON(uri,function(data){
		if(data && data.totalAmount > 0){
			$("#" + confirmLayerId).show();
		}else if(data){
			doChangeSub();
		}
	});*/
	doChangeSub();
}

function doChangeSub(){
	closeChangeSub();
	var returnUrl = window.location.href;
	/*try{
		frontDomain;
		returnUrl = formatchangesub(changeCityId);
	}catch(e){
		returnUrl = window.location.href;
	}*/
	//拼接参数发送请求
	var params = {};
	params.cityid = changeCityId;
	params.fromCityid = cityid;
	params.returnUrl = returnUrl;
	var uri = frontPath + "/site/changecity.do?" + $.param(params);
	window.location.href = uri;
}



function setSiteInfoShort(){
	
	var siteinfo = $.cookie("siteinfo");
	if(!siteinfo){setTimeout(function(){initSiteInfoDelay();},1000);return;}
	var siteinfoArray = $.cookie("siteinfo").split("|");
	var domainValue = ".womai.com";
	if(siteinfoArray.length > 3){domainValue = siteinfoArray[3];}
	$.cookie("siteinfotemp", cityid, {path:'/',domain:domainValue,expires:60*24});
}



//显示切换分站弹出层
var changeMid=0;
var changeCityId = 31000;
function showChangeSub(){
	if($("#layoutBg").length > 0){
		closeChangeSub();
		return;
	}
	showShade();
	
	$("#siteinfo").addClass("cur");
	$("#sitecont").show();
	$("#siteconfirm").hide();
	$(".siteinfo").css("z-index","1001");
}
//关闭
function closeChangeSub(){
	setSiteInfoShort();
	if($("#layoutBg").length > 0)
		document.body.removeChild($("#layoutBg")[0]);
	$("#siteinfo").removeClass("cur");
	$("#sitecont").hide();
	$("#siteconfirm").hide();
	$(".siteinfo").css("z-index","999");
}

//展示市区
function showSubCitys(obj,provinceid){
	$('.abridge-city span.ccur').removeClass('ccur');
	$(obj).parent("span").addClass('ccur');
	$('.site-input .province').removeClass('cur').find('s').hide();
	$('.site-input .province em').html($(obj).attr("title"));
	$('.site-input .city').show();
	$('.site-input .city').addClass('cur').find('s').show();
	$('.abridge-city').hide();
	$(".abridge-subcity").load(frontPath + "/cityindex/includetopsubcity.do?parentid=" + provinceid,function(){
		$('.site-input .city').live('click',function(){
			var province = $('.abridge-city span.cur');
			if(province && typeof province != "undefined"){
				$(this).addClass('cur').siblings().removeClass('cur');
				$(this).parent().children().find('s').hide();
				$(this).find('s').show();
				$('.abridge-city').hide();
				$(".abridge-subcity").show();
			}else{
				
			}
		});
	}).show();
}
//确认切换
function changeSubConfirm(currchangecityid){
	$("#sitecont").hide();
	changeSubConfirmCommon(currchangecityid,"siteconfirm");
}
/*分渲染部分end*/