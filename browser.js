/**
 * @module Browser
 *
 * 操作浏览器
 */
define(function () {
	var Browser = {
	/**
	 * 判断浏览器是否支持某个事件
	 * @param {object String} eventName 事件名 
	 * @return {object Boolean} 
	 */
	 //可以通过in来检测一个事件是否存在于一个元素,ff不支持
	 //将一个事件属性设置给要检测的元素.如果元素可以识别这个事件,
	 //那么这个事件会有一个事件句柄
	 //http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
		eventSupported : function (eventName) {
			var el = document.createElement("div");
			eventName = "on" + eventName;

			var isSupported = (eventName in el);
			if (!isSupported) {
				el.setAttribute(eventName, "return;");
				isSupported = typeof el[eventName] === "function";
			}
			el = null;

			return isSupported;
		};
	
	};
	/**
	 * 添加收藏夹
	 * @param {object String} title 
	 * @param {object String} url 
	 * @return {object Boolean} 
	 */
	Browser.addFavorite = function(title, url) {
		title = title || document.title;
		url = url || location.href;
		if (window.sidebar) {
			window.sidebar.addPanel(title, url, '');
		} else if (window.external) {
			window.external.addFavorite(url, title);
		} else {
			return false;
		}
		return true;
	}
	/**
	 * 设为主页
	 * @param {String} url
	 * @return {Boolean}
	 */
	Browser.setHomepage=function(url) {
		url = url || location.href;
		
		if (document.body && document.body.setHomePage) {
			document.body.style.behavior = "url(#default#homepage)";
			document.body.setHomePage(url);
			return true;
		}
		
		return false;
	}
	/**
	 *获取访问来源
	 * @return {object String}
	 */
	Browser.ref=function() {
		return document.referrer;
	}
		/**
	 *判断页面是否最小化
	 * @return {object Boolean}
	 */
	Browser.isPageMinimized = function () { //判断窗口是否最小化.
		/*

		借助 HTML5 Visibility API 判断有一个致命缺陷就是, 非前景的Tab 标签 也会被认为是不可见的.所以并不能严谨的判断是否是最小化.
		//document.hidden || document.visibilityStats == 'hidden' (HTML5 Visibility API)Firefox10+, IE10+, Chrome14+
		var list = ['mozHidden', 'msHidden', 'webkitHidden', 'oHidden'];
		for (var i = list.length ; i-- ; ){
		if(typeof document[list[i]] === 'boolean'){
		return document[list[i]];
		}
		}

		 */

		if (typeof window.screenTop === 'number') { //Opera, Safari, Chrome,IE9
			return window.screenTop < -30000; //不考虑Safari的话,其实 <0 即可判断.
		}

		/*
		此段,针对非Mac 以及 Linux下的 Firefox, 其实就是针对windows平台的FF . 其他平台outerWidth 似乎总是无变化.
		最小化后 其实outerWidth 始终是160, outerHeight始终是27 .
		虽然用鼠标拖拽方式把FF变的极限小窗状态时outerWidth 能拿到比160抵的数,但outerHeight却无法拿到比27更小的值.
		所以该方式,windows平台 可信任.
		 */
		return window.outerWidth <= 160 && window.outerHeight <= 27;

	}
	
	
	return Browser
});