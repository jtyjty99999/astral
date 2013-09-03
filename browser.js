/**
 * @module Browser
 *
 * 操作浏览器
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('Browser', function () {
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
	Browser.addFavorite = function (title, url) {
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
	Browser.setHomepage = function (url) {
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
	Browser.ref = function () {
		return document.referrer;
	}
	/**
	 *判断页面是否最小化
	 * @return {object Boolean}
	 * thanks to franky
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

	};
	var sUserAgent = navigator.userAgent;
	/**
	 * 查询ua字符串
	 * @param {String} 字符串
	 * @return {Boolean} 
	 * @private
	 */
	function find(feature) {
		if (sUserAgent.indexOf(feature) !== -1) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 检测操作系统
	 * @return {String} 操作系统
	 */

	Browser.detectOS = function () {

		//iphone ipod ipad android
		var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
		var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
		if (isMac)
			return "Mac";
		var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
		if (isUnix)
			return "Unix";
		var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
		if (isLinux)
			return "Linux";
		if (isWin) {
			var isWin2K = find("Windows NT 5.0") || find("Windows 2000");
			if (isWin2K)
				return "Win2000";
			var isWinXP = find("Windows NT 5.1") || find("Windows XP");
			if (isWinXP)
				return "WinXP";
			var isWin2003 = find("Windows NT 5.2") || find("Windows 2003");
			if (isWin2003)
				return "Win2003";
			var isWinVista = find("Windows NT 6.0") || find("Windows Vista");
			if (isWinVista)
				return "WinVista";
			var isWin7 = find("Windows NT 6.1") || find("Windows 7");
			if (isWin7)
				return "Win7";
		}
		return "other";
	}
	/**
	 * 检测设备方向
	 * @return {String} 方向
	 */
	Browser.direction = function () {
		if (Math.abs(window.orientation === 90)) {
			return 'landscape';
		} else {
			return 'portrait';
		}
	}
	/**
	 * 检测设备类型
	 * @return {Object} 提供了一系列检测设备的方法
	 * Browser.detectDevice.isios 检测ios设备
	 * Browser.detectDevice.isiphone 检测iphone
	 * Browser.detectDevice.isipod 检测ipod
	 * Browser.detectDevice.isipad 检测ipad
	 * Browser.detectDevice.isandroid 检测安卓
	 * Browser.detectDevice.isandroidPhone 检测安卓移动设备
	 * Browser.detectDevice.isandroidTablet 检测安卓平板
	 * Browser.detectDevice.isblackberry 检测黑莓
	 * Browser.detectDevice.isblackberryPhone 检测黑莓移动设备
	 * Browser.detectDevice.isblackberryPhone 检测黑莓平板
	 * Browser.detectDevice.iswindows 检测windows设备
	 * Browser.detectDevice.iswindowsPhone 检测windows移动设备
	 * Browser.detectDevice.iswindowsTablet 检测windows平板
	 * Browser.detectDevice.ismobile 检测移动设备
	 * Browser.detectDevice.istablet 检测平板
	 * https://github.com/matthewhudson/device.js/blob/master/lib/device.js
	 */
	Browser.detectDevice = function () {
		var support = {
			isios : function () {
				return support.isiphone() || support.isipod() || support.isipad();
			},
			isiphone : function () {
				return find('iphone');
			},
			isipod = function () {
				return find('ipod');
			},
			isipad = function () {
				return find('ipad');
			},
			isandroid = function () {
				return find('android');
			},
			isandroidPhone = function () {
				return support.isandroid() && find('mobile');
			},
			isandroidTablet = function () {
				return support.android() && !find('mobile');
			},
			isblackberry = function () {
				return find('blackberry' || find('bb10' || find('rim')));
			},
			isblackberryPhone = function () {
				return support.blackberry() && !find('tablet');
			},
			isblackberryTablet = function () {
				return support.blackberry() && find('tablet');
			},
			iswindows = function () {
				return find('windows');
			},
			iswindowsPhone = function () {
				return support.windows() && find('phone');
			},
			iswindowsTablet = function () {
				return support.windows() && find('touch');
			},
			ismobile = function () {
				return support.androidPhone() || support.iphone() || support.ipod() || support.windowsPhone() || support.blackberryPhone();
			},
			istablet = function () {
				return support.ipad() || support.androidTablet() || support.blackberryTablet() || support.windowsTablet();
			},
		}
		return support
	}
	/**
	 * 检测浏览器
	 * @return {Object} 浏览器嗅探结果
	 * obj.chrome Chrome版本号
	 * obj.firefox firefox版本号
	 * obj.ie ie版本号
	 * obj.isGecko 判断是否是gecko(mozilla家的)
	 * obj.isStrict 判断是否为严格模式 http://www.cnblogs.com/fullhouse/archive/2012/01/17/2324706.html
	 * obj.isWebkit 判断是否是webkit浏览器
	 * obj.opera opera版本号
	 * obj.maxthon 傲游浏览器版本号
	 * obj.safari safari浏览器版本号
	 * obj.isSupportFixed 判断是否支持position.fixed 
	 */
	Browser.browser = function(ua){
	var res = {
            chrome : /chrome\/(\d+\.\d+)/i.test(ua) ? + RegExp.$1 : undefined,
            firefox : /firefox\/(\d+\.\d+)/i.test(ua) ? + RegExp.$1 : undefined,
            ie : /msie (\d+\.\d+)/i.test(ua) ? (document.documentMode || + RegExp.$1) : undefined,
            isGecko : /gecko/i.test(ua) && !/like gecko/i.test(ua),
            isStrict : document.compatMode === "CSS1Compat",
            isWebkit : /webkit/i.test(ua),
            opera : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(ua) ?  + (RegExp.$6 || RegExp.$2) : undefined
        };
        try {
            if (/(\d+\.\d+)/.test(window.external.max_version)) {
                res.maxthon = + RegExp.$1;//遨游
            }
        } catch (e) {}
        res.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp.$1 || RegExp.$2) : undefined;
        res.isSupportFixed = !res.ie || res.ie >= 7;
        return res;
	}
	
	
	return Browser
}
	())