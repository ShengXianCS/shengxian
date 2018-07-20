/*
 * jquery.suggest 1.1 - 2007-08-06
 * 
 * Uses code and techniques from following libraries: 1.
 * http://www.dyve.net/jquery/?autocomplete 2.
 * http://dev.jquery.com/browser/trunk/plugins/interface/iautocompleter.js
 * 
 * All the new stuff written by Peter Vulgaris (www.vulgarisoip.com) Feel free
 * to do whatever you want with this file
 * 
 */

(function($) {

	$.suggest = function(input, options) {
		var searchCont = jQuery("#searchCont");
		if (searchCont.length > 0) {
			var aArray = searchCont.find("a");
			var aArrayLen = aArray.length;
			if (aArrayLen > 0) {
				var tkVal = "";
				if (aArrayLen == 1) {
					tkVal = jQuery(aArray[0]).text();
				} else if (aArrayLen >= 2) {
					var ranIndex = Math.round(Math.random()
							* (aArrayLen - 1 - 0))
							+ 0;
					tkVal = jQuery(aArray[ranIndex]).text();
				}
				var tkw = jQuery("#topKeywords");
				if (tkw.attr('isSearch') == 'y') {
					tkw.val(tkVal).attr('data-defvalue', tkVal);
				}
			}
		}
		var $input = $(input).attr("autocomplete", "off");
		var $results = $(document.createElement("div"));

		var timeout = false; // hold timeout ID for suggestion results to
								// appear
		var prevLength = 0; // last recorded length of $input.val()
		var prevVal = ""; // last recorded val String
		var cache = []; // cache MRU list
		var cacheSize = 0; // size of cache in chars (bytes?)
		$results.addClass(options.resultsClass).appendTo($("#inputDiv"));
		$results.css("width", input.offsetWidth - 12);
		$results.css("padding-top", 2);
		resetPosition();
		$(window).load(resetPosition)// just in case user is changing size of
										// page while loading
				.resize(resetPosition);
		timeout = setTimeout(suggest, options.delay);
		
		var focusblurid = $("#topKeywords"); 
		var defval = focusblurid.val();
		var datawrite = focusblurid.attr("data-write");
		focusblurid.focus(function(){
			var $this = $(this);
			var thisval = $this.val(); 
			var keyword = $("#searchProductListKeyword").val();
			if(!keyword || keyword == ""){
				$this.val("");
			}else{
				var text = "";
				var b = keyword.indexOf('“');
				if(b >= 0){
					var e = keyword.lastIndexOf('”');
					text = keyword.slice(b+1, e);
				}else{
					text = keyword;
				}
				if(text != ""){
					$this.val(text);
				}
			}
			if(thisval == defval && datawrite != "y"){ 
				$this.attr("data-write","y").css("color","#c30000");
			}
			var sc = $("#searchCont");
			if (sc && !thisval) {
				sc.show();
			}
			if($(".ac_results table").length > 0){
				$(".ac_results").show();
			}
		});
		focusblurid.blur(function() {
			var thisval = $(this).val();
			if(thisval == ""){ 
				$(this).val(defval).css("color","#c30000");
			}else{
				var b = thisval.indexOf('“');
				if(b < 0){
					$(this).val(thisval).css("color","#c30000");;
				}
			}
			setTimeout(function() {
				$results.hide()
				var sc = $("#searchCont");
				if (sc) {
					sc.hide();
				}
			}, 300);
		});

		// help IE users if possible
		try {
			$results.bgiframe();
		} catch (e) {
		}

		// I really hate browser detection, but I don't see any other way
		if ($.browser && $.browser.mozilla)
			$input.keypress(processKey); // onkeypress repeats arrow keys in
											// Mozilla/Opera
		else
			$input.keydown(processKey); // onkeydown repeats arrow keys in
										// IE/Safari

		function resetPosition() {
			// requires jquery.dimension plugin
			var offset = $input.offset();
			$results.css({
						top : '40px',
						left : '-2px'
					});
		}

		function processKey(e) {

			// handling up/down/escape requires results to be visible
			// handling enter/tab requires that AND a result to be selected
			if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible'))
					|| (/^13$|^9$/.test(e.keyCode) && getCurrentResult())) {

				if (e.preventDefault)
					e.preventDefault();
				if (e.stopPropagation)
					e.stopPropagation();

				e.cancelBubble = true;
				e.returnValue = false;

				switch (e.keyCode) {

					case 38 : // up
						prevResult();
						break;

					case 40 : // down
						nextResult();
						break;

					case 9 : // tab
					case 13 : // return
						submitInputResult();
						break;

					case 27 : // escape
						$results.hide();
						break;

				}

			} else {
				/*
				 * if (timeout) clearTimeout(timeout); timeout =
				 * setTimeout(suggest, options.delay); prevLength =
				 * $input.val().length;
				 * 
				 */
			}

		}

		function suggest() {
			timeout = setTimeout(suggest, options.delay);

			var act = document.activeElement;
			if (act && act.id == input.id) {
				// setTimeout(function() {
				// $results.hide()
				// }, 200);

				var q = $.trim($input.val());
				if (q.length >= options.minchars && prevVal != q) {
					var sc = jQuery("#searchCont");
					if (sc) {
						jQuery(sc).hide();
					}
					prevVal = q;

					cached = checkCache(q);

					if (cached) {

						displayItems(cached['items']);

					} else {

						$.post(options.source, {
									q : q
								}, function(txt) {

									$results.hide();

									var items = parseTxt(txt, q);

									displayItems(items);
									addToCache(q, items, txt.length);

								});

					}

				} else {
					if (q.length < options.minchars) {
						prevVal = q;
						$results.hide();
						var sc = jQuery("#searchCont");
						if (sc) {
							jQuery(sc).show();
						}
					}
				}

			}

		}

		function checkCache(q) {

			for (var i = 0; i < cache.length; i++)
				if (cache[i]['q'] == q) {
					cache.unshift(cache.splice(i, 1)[0]);
					return cache[0];
				}

			return false;

		}

		function addToCache(q, items, size) {

			while (cache.length && (cacheSize + size > options.maxCacheSize)) {
				var cached = cache.pop();
				cacheSize -= cached['size'];
			}

			cache.push({
						q : q,
						size : size,
						items : items
					});

			cacheSize += size;

		}

		function displayItems(items) {
			if (!items)
				return;

			if (!items.length) {
				$results.hide();
				return;
			}
			var html = '<table style="width:100%;border-collapse:collapse;border-width:0;border-style:none;"><tbody>';
			var position = 1;
			for (var i = 0; i < items.length; i++) {
				var parts = items[i].split(",");
				if(parts.length > 1) {
					html += '<tr><td class="ac_word" title="'+ parts[0] +'" tabIndex=1>' + parts[0] + '</td></tr>';
//						+ '<td class="ac_desc">约' + parts[1] + '个结果</td></tr>';
					if(parts[1]) {
						var columnMessage = parts[1].split("-_-");
						var length = columnMessage.length;
						for (var j = 0; j < length; j++) {
							var message = columnMessage[j].split("_");
							if(j < length - 1) {
								html += '<tr>';
							} else {
								html += '<tr class="ac_item1">';
							}
							
							if(message[0].length > 12) {
								html += '<td class="ac_column" title="'+ parts[0] +'" scope="'+message[0].substring(0, 12)+'">在  <span>' + message[0].substring(0, 12) + '...</span>  分类中找</td>';
							} else if(message[0].length + message[1].length > 12) {
								html += '<td class="ac_column" title="'+ parts[0] +'" scope="'+message[1].substring(0, 11 - message[0].length)+'">在  <span>' + message[0] + ' > '+ message[1].substring(0, 11 - message[0].length) + '...</span>  分类中找</td>';
							} else {
								html += '<td class="ac_column" id="' + message[2] + '" title="'+ parts[0] +'" scope="'+message[1]+'">在  <span>' + message[0] + ' > '+ message[1] + '</span>  分类中找</td>';
							}
							html += '</tr>'; 
//							html += '<td class="ac_desc">约' + message[3] + '个结果</td></tr>'; 
						}
					}
						+ '<td >' + parts[2] + '</td></tr>';
				} else {
					position = position + 1;
					html += '<tr><td class="ac_word" title="'+ parts[0] +'" tabIndex="'+position+'">' + parts[0] + '</td></tr>';
//						+ '<td class="ac_desc">约' + parts[1] + '个结果</td></tr>';
				}
			}
			html += "</tbody></table>"

			$results.html(html).show();
			jQuery("table > tbody > tr", $results).mouseover(function() {
						var currentResult = getCurrentResult();
						if (currentResult) {
							currentResult.removeClass(options.selectClass);
						}
						$(this).addClass(options.selectClass);
					}).click(function(e) {
						e.preventDefault();
						e.stopPropagation();
						selectCurrentResult();
					});
		}

		function parseTxt(txt, q) {

			var items = [];
			var tokens = txt.split(options.delimiter);

			// parse returned data for non-empty items
			for (var i = 0; i < tokens.length; i++) {
				var token = $.trim(tokens[i]);
				if (token) {
					// token = token.replace(
					// new RegExp(q, 'ig'),
					// function(q) { return '<span class="' + options.matchClass
					// + '">' + q + '</span>' }
					// );
					items[items.length] = token;
				}
			}

			return items;
		}

		function getCurrentResult() {
			
			if (!$results.is(':visible'))
				return false;

			var $currentResult = jQuery("table > tbody > tr."
							+ options.selectClass, $results);// $results.children('tr.'
																// +
																// options.selectClass);

			if (!$currentResult.length)
				$currentResult = false;

			return $currentResult;

		}
		function submitInputResult() {
			$results.hide();
			checkTopSearchForm();

			$("#searchform").submit();
		}
		function selectCurrentResult() {

			$currentResult = getCurrentResult();

			if ($currentResult) {
//				var text = jQuery(jQuery("td", $currentResult)[0]).title();
				var text = jQuery("td", $currentResult)[0].title;
				var columnid = jQuery("td", $currentResult)[0].id;
				var position = jQuery("td", $currentResult)[0].tabIndex;
				var columntitle = jQuery("td", $currentResult)[0].scope;
				$("#oldSearchKeyword").val($input.val()); //用于piwik传值
				if(position > 0){
					$("#searchKeywordPosition").val(position)
				};
				$input.val(text);
				$results.hide();
				if(columnid) {
					jQuery('#topmainColumnId').val(columnid);
					jQuery('#topmainColumnIdtitle').val(columntitle);
				}
				
				checkTopSearchForm();
				$("#searchform").submit();
				if (options.fn != undefined && options.fn != '') {
					clearTimeout(timeout);
					eval(options.fn);
				}
				// var form=document.getElementById(options.searchForm);
				// if(form!=null&&form!=undefined){
				// clearTimeout(timeout);
				// form.submit();
				// }

				if (options.onSelect)
					options.onSelect.apply($input[0]);

			}

		}

		function nextResult() {

			$currentResult = getCurrentResult();

			if ($currentResult)
				$currentResult.removeClass(options.selectClass).next()
						.addClass(options.selectClass);
			else {
				var table = $results.children("table");
				var tbody = table.children("tbody");
				var tr = tbody.children("tr")[0];
				jQuery(tr).addClass(options.selectClass);
				// $results.children('table
				// tr:first-child').addClass(options.selectClass);
			}

		}

		function prevResult() {

			$currentResult = getCurrentResult();

			if ($currentResult)
				$currentResult.removeClass(options.selectClass).prev()
						.addClass(options.selectClass);
			else {
				var table = $results.children("table");
				var tbody = table.children("tbody");
				var tr = tbody.children("tr")[0];
				jQuery(tr).addClass(options.selectClass);
			}

		}

	}

	$.fn.suggest = function(source, options) {

		if (!source)
			return;

		options = options || {};
		options.source = source;
		options.delay = options.delay || 100;
		options.resultsClass = options.resultsClass || 'ac_results';
		options.selectClass = options.selectClass || 'ac_over';
		options.matchClass = options.matchClass || 'ac_match';
		options.minchars = options.minchars || 2;
		options.delimiter = options.delimiter || '\n';
		options.onSelect = options.onSelect || false;
		options.maxCacheSize = options.maxCacheSize || 65536;
		options.fn = options.fn || '';

		this.each(function() {
					new $.suggest(this, options);
				});

		return this;

	};

})(jQuery);
