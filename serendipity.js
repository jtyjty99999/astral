/**
作者：jty
时间：2012年1月1日
网址：http://chaosgeeker.com
电子邮箱：jtyjty99999@126.com
 */
(
	function ($, win, doc, undefined) {
	if (!window.jty) {
		window['jty'] = {}
	}
	var $ = {};
	/*                                      Dom operation                             */
	
	/*-------------------------- +
	if not ie
	+-------------------------- */
	function notie() {
		if ( - [1, ]) {
			alert('这货不是ie')
		}
	}
	/*-------------------------- +
	Browser navigation from QWARP
	+-------------------------- */
	$.Browser = (function () {
		var na = window.navigator,
		ua = na.userAgent.toLowerCase(),
		browserTester = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos)[ \/os]*([\d_.]+)/ig,
		Browser = {
			platform : na.platform
		};
		ua.replace(browserTester, function (a, b, c) {
			var bLower = b.toLowerCase();
			if (!Browser[bLower]) {
				Browser[bLower] = c;
			}
		});
		if (Browser.opera) { //Opera9.8后版本号位置变化
			ua.replace(/opera.*version\/([\d.]+)/, function (a, b) {
				Browser.opera = b;
			});
		}
		if (Browser.msie) {
			Browser.ie = Browser.msie;
			var v = parseInt(Browser.msie, 10);
			Browser['ie' + v] = true;
		}
		return Browser;
	}
		());
	//Dom加载完成事件
	$.ready = function (loadEvent) {
		var init = function () {
			if (arguments.callee.done)
				return;
			arguments.callee.done = true;
			loadEvent.apply(document, arguments);
		}
		
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', init, false);
		}
		
		if (/WebKit/i.test(navigator.userAgent)) {
			var _timer = setInterval(function () {
					if (/loaded|complete/.test(document.readyState)) {
						clearInterval(_timer);
						init();
					}
				}, 10)
		}
		/*@if(@_win32)*/
		document.write('<script id=__ie_onload defer src=javascript:void(0)><\/script>');
		var script = document.getElementById('__ie_onload');
		script.onreadystatechange = function () {
			if (this.readyState == 'complete') {
				init();
			}
		}
		/*@end @*/
		return true;
	}
	/*-------------------------- +
	/* selector 
	+-------------------------- */
	$.get = {
		byId : function (id) {
			return typeof id == "string" ? document.getElementById(id) : id
		},
		byClass : function (sClass, oParent) {
			var aClass = [];
			var reClass = new RegExp("(^| )" + sClass + "( |$)");
			var aElem = this.byTagName("*", oParent);
			for (var i = 0; i < aElem.length; i++)
				reClass.test(aElem[i].className) && aClass.push(aElem[i]);
			return aClass
		},
		byTagName : function (elem, obj) {
			return (obj || document).getElementsByTagName(elem)
		}
	};
	/*-------------------------- +
	IE prototype node operation compatible
	+-------------------------- */
/*	Node.prototype.replaceNode = function (Node) { // 替换指定节点
		this.parentNode.replaceChild(Node, this);
	}
	Node.prototype.removeNode = function (removeChildren) { // 删除指定节点
		if (removeChildren)
			return this.parentNode.removeChild(this);
		else {
			var range = document.createRange();
			range.selectNodeContents(this);
			return this.parentNode.replaceChild(range.extractContents(), this);
		}
	}
	Node.prototype.swapNode = function (Node) { // 交换节点
		var nextSibling = this.nextSibling;
		var parentNode = this.parentNode;
		node.parentNode.replaceChild(this, Node);
		parentNode.insertBefore(node, nextSibling);
	}
	}  
*/
	/*-------------------------- +
	/delete current element node
	+-------------------------- */
	$.rmnode = function removeElement(_element) {
		var parentElement = _element.parentNode;
		if (parentElement) {
			parentElement.removeChild(_element);
		}
	}
	/*-------------------------- +
	Find slibling Nodes
	+-------------------------- */
	function slibling() {
		var a = []; //定义一个数组，用来存o的兄弟元素
		var p = o.previousSibling;
		while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
			if (p.nodeType === 1) {
				a.push(p);
			}
			p = p.previousSibling //最后把上一个节点赋给p
		}
		a.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了
		var n = o.nextSibling; //再取o的弟弟
		while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
			if (n.nodeType === 1) {
				a.push(n);
			}
			n = n.nextSibling;
		}
		return a //最后按从老大到老小的顺序，把这一组元素返回
	}
	
	/*-------------------------- +
	strong funtion "isArray"
	+-------------------------- */
	function isArray(arr) {
		return Object.prototype.toString.call(arr) === "[object Array]";
	}
	/**
	 * Returns internal [[Class]] property of an object
	 *
	 * Ecma-262, 15.2.4.2
	 * Object.prototype.toString( )
	 *
	 * When the toString method is called, the following steps are taken:
	 * 1. Get the [[Class]] property of this object.
	 * 2. Compute a string value by concatenating the three strings "[object ", Result (1), and "]".
	 * 3. Return Result (2).
	 *
	 * __getClass(5); // => "Number"
	 * __getClass({}); // => "Object"
	 * __getClass(/foo/); // => "RegExp"
	 * __getClass(''); // => "String"
	 * __getClass(true); // => "Boolean"
	 * __getClass([]); // => "Array"
	 * __getClass(undefined); // => "Window"
	 * __getClass(Element); // => "Constructor"
	 *
	 */
	function __getClass(object) {
		return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
	};
	/*-------------------------- +
	concat 2 array and remove duplication
	+-------------------------- */	
	function concatAnd(arr1, arr2) {
		for (var i = 0; i < arr1.length; i++) {
			for (var j = 0; j < arr2.length; j++) {
				if (arr1[i] === arr2[j]) {
					arr1.splice(i, 1);
				}
			}
		}
		//alert(arr1.length)
		for (var i = 0; i < arr2.length; i++) {
			arr1.push(arr2[i]);
		}
		return arr1;
	}	
	/*-------------------------- +
	GetIframe
	+-------------------------- */
	$.getIframe = function getIFrameDOM(id) {
		return document.getElementById(id).contentDocument || document.frames[id].document;
	}
	
	/*                                              useful function                         */
	
	/*-------------------------- +
	remove space
	+-------------------------- */
	function trim = function () { //high efficiency
		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}}
	function ltrim(str) { //remove lefr space
		return str.replace(/(^\s*)/g, "");
	}
	function rtrim(str) { //remove right space
		return str.replace(/(\s*$)/g, "");
		　
	}
	/*-------------------------- +
	getTime
	+-------------------------- */
	function getDateTime() {
		var now = new Date();
		var year = now.getYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
	}
	/*-------------------------- +
	check all checked
	+-------------------------- */
	function checkall(obj, name) {
		var boxs = document.getElementsByName(name);
		for (var i = 0; i < boxs.length; i++) {
			boxs[i].checked = obj.checked;
		}
	}
	/*-------------------------- +
	convert html to txt without html tags
	+-------------------------- */
	function noHtml(elem) {
		elem.innerHTML.replace(/<.+?>/gim, '')
	}
	/*-------------------------- +
	InnerText Compatible spelled
	+-------------------------- */	
	function getInnerText(elem) {
		return (typeof elem.textContent == "string") ? elem.textContent : elem.innerText;
	}
	function setInnerText(elem, text) {
		if (typeof elem.textContent == "string") {
			elem.textContent = text
		};
		else {
			elem.innerText = text;
		}
	}
	
	/*-------------------------- +
	to html
	+-------------------------- */
	function HtmlDecode(str) {
		var t = document.createElement("div");
		t.innerHTML = str;
		return t.innerText || t.textContent
	}
	//var d =  '&lt;script&gt;alert("sssssssssssss")&lt;/script&gt;'
	//HtmlDecode(d) // ["<script>alert("sssssssssssss")</sc>"
	
	/*                                                AJAX                     */
	
	/*-------------------------- +
	changeinnerHTML Ajax package
	+-------------------------- */	
	
	function Ajax(url, obj) {
		var request = null;
		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			request = new ActiveXObject("Microsoft.XMLHttp");
		}
		if (request) {
			request.open("POST", url, true);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			request.setRequestHeader("If-Modified-Since", "0");
			request.onreadystatechange = function () {
				if (request.readyState == 4 && request.status == 200) {
					obj.innerHTML = request.responseText;
				} else {
					obj.innerHTML = "Loading....";
				}
			}
			request.send(null);
		}
	}
	
	/*-------------------------- +
	load xml doc
	+-------------------------- */
	function loadXMLDoc(dname) {
		try //Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		} catch (e) {
			try //Firefox, Mozilla, Opera, etc.
			{
				xmlDoc = document.implementation.createDocument("", "", null);
			} catch (e) {
				alert(e.message)
			}
		}
		try {
			xmlDoc.async = false;
			xmlDoc.load(dname);
			return (xmlDoc);
		} catch (e) {
			alert(e.message)
		}
		return (null);
	}
	
	/*                                         Event                                  */
	
	$.eop = {
		addHandler : function (oElement, sEvent, fnHandler) {
			oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : (oElement["_" + sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function () {
				oElement["_" + sEvent + fnHandler]()
			}, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
		},
		removeHandler : function (oElement, sEvent, fnHandler) {
			oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, oElement[sEvent + fnHandler])
		},
		addLoadHandler : function (fnHandler) {
			this.addHandler(window, "load", fnHandler)
		},
		getEvent : function (event) {
			return event ? event : window.event;
		},
		getTarget : function (event) {
			return event.target || event.srcElement;
		}
	};
		
	/*-------------------------- +
	stop event capture or bubble
	eg:   Dom :document.body.addEventListener('click', function(event){event.stopPropagation();}, true);

	+-------------------------- */
	function someHandle(event) {
		event = event || window.event;
		if (event.stopPropagation)
			event.stopPropagation();
		else
			event.cancelBubble = true;
	}
	/*-------------------------- +
	cancel the default handle when event ended
	eg:input element prevent type in after the "keydown"  event
	+-------------------------- */
	function someHandle(event) {
		event = event || window.event;
		if (event.preventDefault)
			event.preventDefault();
		else
			event.returnValue = false;
	}

	/*-------------------------- +
	press event function model
	+-------------------------- */
	function buttonEnter() {
		document.onkeydown = function (e) {
			e = e || window.event;
			if (e.keyCode === 13)
				alert("you press enter!")
		};
	}
	/*-------------------------- +
	Ctrl+Enter
	+-------------------------- */
	
	document.onkeydown = function (e) {
		e = e || window.event;
		if (event.ctrlKey == true && event.keyCode == 13)
			alert("Ctrl+Enter ");
	}
	
	/*                                                        UI                                          */
	
	/*-------------------------- +
	mouseWheel
	wheelDelta==>ie 
	+-------------------------- */
	
	function getWheelValue(e) {
		e = e || window.event;
		return (e.wheelDelta ? e.wheelDelta / 120 :  - (e.detail % 3 == 0 ? e.detail : e.detail / 3)); //取得滚轮坐标
	}
	/* 		
	addHandler(elem, "mousewheel", function);
	addHandler(elem, "DOMMouseScroll", function); */ 
		
	/**
	get css attribute (from sanshuiqing)
	 */
	function getCss(elem, css) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(elem, null)[css];
		} else if (elem.currentStyle) {
			return elem.currentStyle[css];
		} else {
			return elem.style[css];
		}
	}
	/**
	get css attribute (simple)
	 */
	function getStyle(obj, attr) {
		return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr])
	}
	/**
	get css attribute (from Ferris)
	 */
	$.css = function css(obj, attr, value) {
		switch (arguments.length) {
		case 2:
			if (typeof arguments[1] == "object") { //二个参数, 如果第二个参数是对象, 批量设置属性
				for (var i in attr)
					obj.style[i] = attr[i]
			} else { //二个参数, 如果第二个参数是字符串, 读取属性值
				return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
			}
			break;
		case 3:
			//三个参数, 单一设置属性
			obj.style[attr] = value;
			break;
		default:
			alert("参数错误！")
		}
	}
	/**
	preloadImage 图片预加载
	 */	
	function preloadImage() {
		if (document.images) {
			var arr = new Array();
			var asgus = preloadImage.arguments;
			for (var i = 0; i < asgus.length; i++) {
				var image = new Image();
				image.src = asgus[i];
				arr[i] = image;
			}
		}
	}
	/**
	插入样式 
	 */	
	function includeStyleElement(styles, styleId) {
		if (document.getElementById(styleId)) {
			return
		}
		var style = document.createElement("style");
		style.id = styleId;
		//这里最好给ie设置下面的属性
		/*if (isIE()) {
		style.type = "text/css";
		style.media = "screen"
		}*/
		(document.getElementsByTagName("head")[0] || document.body).appendChild(style);
		if (style.styleSheet) { //for ie
			style.styleSheet.cssText = styles;
		} else { //for w3c
			style.appendChild(document.createTextNode(styles));
		}
	}
	/*   eg:
	var styles = "#div{background-color: #FF3300; color:#FFFFFF }";
	includeStyleElement(styles,"newstyle");  */
	
	/**
	has css attribute (from Mr.Think)
	 */
	$.hasClass = function (element, className) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		return element.className.match(reg);
	}
	/**
	add css attribute
	 */	
	$.addClass = function (ele, cls) {
		if (!this.hasClass(ele, cls))
			ele.className += " " + cls;
	}

	/**
	remove css attribute (from Mr.Think)
	 */
	$.removeClass = function (element, className) {
		if (hasClass(element, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			element.className = element.className.replace(reg, ' ');
		}
	}
	/**
	setOpacity
	 */
	
	$.setOpacity = function setOpacity(elem, opacity) {
		elem.filters ? elem.style.filter = 'alpha(opacity=' + opacity + ')' : elem.style.opacity = opacity / 100;
	}
	/**
	set opacity fadeIn fadeOut effect @Mr.Think
	 */
	//淡入效果(含淡入到指定透明度)
	function fadeIn(elem, speed, opacity) {
		/*
		 * 参数说明
		 * elem==>需要淡入的元素
		 * speed==>淡入速度,正整数(可选)
		 * opacity==>淡入到指定的透明度,0~100(可选)
		 */
		speed = speed || 20;
		opacity = opacity || 100;
		//显示元素,并将元素值为0透明度(不可见)
		elem.style.display = 'block';
		$.setOpacity(elem, 0);
		//初始化透明度变化值为0
		var val = 0;
		//循环将透明值以5递增,即淡入效果
		(function () {
			$.setOpacity(elem, val);
			val += 5;
			if (val <= opacity) {
				setTimeout(arguments.callee, speed)
			}
		})();
	}
	
	//淡出效果(含淡出到指定透明度)
	function fadeOut(elem, speed, opacity) {
		/*
		 * 参数说明
		 * elem==>需要淡入的元素
		 * speed==>淡入速度,正整数(可选)
		 * opacity==>淡入到指定的透明度,0~100(可选)
		 */
		speed = speed || 20;
		opacity = opacity || 0;
		//初始化透明度变化值为0
		var val = 100;
		//循环将透明值以5递减,即淡出效果
		(function () {
			$.setOpacity(elem, val);
			val -= 5;
			if (val >= opacity) {
				setTimeout(arguments.callee, speed);
			} else if (val < 0) {
				//元素透明度为0后隐藏元素
				elem.style.display = 'none';
			}
		})();
	}
	/**
	get an element the absolute position of the window
	 */
	
	function getPos(obj) {
		var left = 0;
		var top = 0;
		while (obj.offsetParent) {
			left += obj.offsetLeft;
			top += obj.offsetTop;
			
			obj = obj.offsetParent;
		}
		return {
			x : left,
			y : top
		};
	}
	
	/**
	more accurate get a position
	*/
	function getCoords(el) {
	 	var box = el.getBoundingClientRect(),
	 	doc = el.ownerDocument,
	 	body = doc.body,
	 	html = doc.documentElement,
	 	clientTop = html.clientTop || body.clientTop || 0,
	 	clientLeft = html.clientLeft || body.clientLeft || 0,
	 	top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop,
	 	left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft
	 		return {
	 		'top' : top,
	 		'left' : left
	 	};
	 };
	/**
	get mouse position
	 */
	function getMousePosition(e) {
		var scrollx,
		scrolly;
		if (typeof(window.pageXOffset) == 'number') {
			scrollx = window.pageXOffset;
			scrolly = window.pageYOffset;
		} else {
			scrollx = document.documentElement.scrollLeft;
			scrolly = document.documentElement.scrollTop;
		}
		return {
			x : e.clientX + scrollx,
			y : e.clientY + scrolly
		}
	}
	/**
	compatibility type of height
	 */
	$.UI = {
		wholeHeight : function () {
			return document.body.scrollHeight || document.documentElement.scrollHeight
		},
		windowHeight : function () {
			var a = document.documentElement;
			return self.innerHeight || a && a.clientHeight || document.body.clientHeight
		},
		scrollY : function (a) {
			var b = document.documentElement;
			if (a) {
				var c = a.parentNode,
				e = a.scrollTop || 0;
				if (a == b)
					e = UI.scrollY();
				return c ? e + UI.scrollY(c) : e
			}
			return self.pageYOffset || b && b.scrollTop || document.body.scrollTop
		}
	};
	$.dragInit = function (oDrag, handle) {
		var disX = dixY = 0;
		handle = handle || oDrag;
		handle.style.cursor = "move";
		handle.onmousedown = function (event) {
			var event = event || window.event;
			disX = event.clientX - oDrag.offsetLeft;
			disY = event.clientY - oDrag.offsetTop;
			
			document.onmousemove = function (event) {
				var event = event || window.event;
				var iL = event.clientX - disX;
				var iT = event.clientY - disY;
				var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
				var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
				
				iL <= 0 && (iL = 0);
				iT <= 0 && (iT = 0);
				iL >= maxL && (iL = maxL);
				iT >= maxT && (iT = maxT);
				
				oDrag.style.left = iL + "px";
				oDrag.style.top = iT + "px";
				
				return false
			};
			
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouseup = null;
				this.releaseCapture && this.releaseCapture()
			};
			this.setCapture && this.setCapture();
			return false
		};
	}
	/**                  Useful function collection                                */	

	/* add favourite*/
	function addCookie() {
		if (document.all) {
			window.external.addFavorite('www.baidu.com', '百度');
		} else if (window.sidebar) {
			window.sidebar.addPanel('百度', 'www.baidu.com', "");
		}
	}
	/* set to homepage */
	function setHomepage() {
		if (document.all) {
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage('www.baidu.com');
		} else if (window.sidebar) {
			if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				} catch (e) {}
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', 'www.baidu.com');
		}
	}
	/**
	crashCheck 
	*/
	
	function crashCheck(elem1, elem2) {
		x1 = elem1.offsetLeft;
		y1 = elem1.offsetTop;
		x2 = elem2.offsetLeft;
		y2 = elem2.offsetTop;
		w1 = elem1.offsetWidth;
		h1 = elem1.offsetHeight;
		w2 = elem2.offsetWidth;
		h2 = elem2.offsetHeight;
		return ((x1 - x2 <= 0) && (x2 - x1 < w1) && (y1 - y2 <= 0) && (y2 - y1 < h1) || (x1 - x2 <= 0) && (x2 - x1 < w1) && (y1 - y2 > 0) && (y1 - y2 < h2) || (x1 - x2 > 0) && (x1 - x2 < w2) && (y1 - y2 <= 0) && (y2 - y1 < h1) || (x1 - x2 > 0) && (x1 - x2 < w2) && (y1 - y2 > 0) && (y1 - y2 < h2));
	}
	/**
	one by one type in 
	*/
	function typein(time, string1, objectid) {
		var textarea = document.getElementById(objectid)
		var i = 1;
		var time,string1;
		var trans = string1.toString()
			var xunhuan = setInterval(change, time);
		function change() {
			textarea.value = trans.slice(0, i); //这里使用value
			i = i + 1;
			if (i == trans.length) {
				clearInterval(xunhuan)
			};
		}
	}
	/*-------------------------- +
	get selectTXT
	+-------------------------- */
	function getSelectTxt() {
		var selectTxt;
		if (window.getSelection) {
			//标准浏览器支持的方法
			selectTxt = window.getSelection();
		} else if (document.selection) {
			//IE浏览器支持的方法
			selectTxt = document.selection.createRange().text;
		}
		return selectTxt;
		}  
	/*-------------------------- +
	limit max length of a string and change extra to ...
	+-------------------------- */
	
	function ellipsis(limit) {
		var _limit = limit || 10;
		var len = this.length;
		var str = "";
		if (len > limit) {
			str = this.substring(0, limit);
		}
		str += "...";
		return str;
		
	}
	
	/*-------------------------- +
	join in 2 strings more effiency
	+-------------------------- */
	
	function joint(string1, string2) {
		var temp = [],
		i = 0;
		var string1,string2
		temp[i++] = string1;
		temp[i++] = string2;
		var text = temp.join("");
		return text
	}
	/*-------------------------- +
	exchange
	+-------------------------- */
	function change(a, b) {
		a = [b, b = a][0]
		
	}
	
	/*-------------------------- +
	get a random Array from an Array
	+-------------------------- */
	
	function resortArray(arr) {
		var newArr = [];
		do {
			newArr[newArr.length] = arr.splice(parseInt(Math.random() * arr.length), 1);
		} while (arr.length);
		return newArr;
	}
	/*-------------------------- +
	bubble sort
	+-------------------------- */
	
	function bubbleSort(ary) {
		var i,
		j,
		temp,
		len = ary.length;
		
		for (var i = 1; i < len; i++) {
			for (j = len - 1; j >= i; j--) {
				temp = ary[j];
				if (temp < ary[j - 1]) {
					ary[j] = ary[j - 1];
					ary[j - 1] = temp;
				}
			}
		}
		return ary;
	}
	
	/*-------------------------- +
	get a random number from a range
	+-------------------------- */
	function GetRandomNum(Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		return (Min + Math.round(Rand * Range));
	}
	
	/*-------------------------- +
	get the number of a field(type/id)
	+-------------------------- */
	function getUrlPara(paraName) {
		var sUrl = location.href;
		var sReg = "(?:\\?|&){1}" + paraName + "=([^&]*)"
			var re = new RegExp(sReg, "gi");
		re.exec(sUrl);
		return RegExp.$1;
	}
	function getUrlParam(name) { //Another way upstair
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}
	//getUrlParam("type") //operation
	/*-------------------------- +
	Validator
	+-------------------------- */
	
	//判断是否为空
	$.check = {
		isNull : function (str) {
			if (str == "")
				return true;
			var regu = "^[ ]+$";
			var re = new RegExp(regu);
			return re.test(str);
		},
		//验证时间格式 例如：2007-03-08 12:01:09
		strDateTime : function (str) {
			var reg = /^(\d{4})(-)(\d{2})\2(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
			//var reg = /^([0-9]{4})\-(1[0-2]|0[1-9])\-(3[0-1]|[1-2][0-9]|0[1-9])\ (2[0-3]|[0-1][0-9])\:([0-5][0-9])\:([0-5][0-9])$/;
			var r = str.match(reg);
			if (r == null){
				return false;
				}
			var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
			return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
		},
		/*检测字母数字下划线*/
		check_info : function (info) {
			var reg = /^[a-zA-Z0-9_]+$/;
			if (info.length < 3 || info.length > 16){
				return false;}
			return reg.test(info);
			},
		//验证是否ip
		isIP : function (ip) {
			var reg = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.(25[0-4]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[1-9])$/;
			var re = new RegExp(reg);
			return re.test(ip);
		},
		//返回传入参数对应的8位二进制值
		_checkIput_formatIP : function (ip) {
			return (ip + 256).toString(2).substring(1); //格式化输出(补零)
		},
		//检查子网掩码
		check_mask : function (maskvalue) {
			/*有效性校验*/
			var reg = /^(\d{1,3})(\.\d{1,3}){3}$/;
			flag = reg.test(maskvalue);
			if (!flag)
				return false;
			/*检查域值*/
			var IPArray = maskvalue.split(".");
			var ip1 = parseInt(IPArray[0]);
			var ip2 = parseInt(IPArray[1]);
			var ip3 = parseInt(IPArray[2]);
			var ip4 = parseInt(IPArray[3]);
			if (ip1 < 0 || ip1 > 255 || ip2 < 0 || ip2 > 255 || ip3 < 0 || ip3 > 255 || ip4 < 0 || ip4 > 255)
				/*每个域值范围0-255*/
				return false;
			/* 检查二进制值是否合法 */
			//拼接二进制字符串
			var ip_binary = _checkIput_formatIP(ip1) + _checkIput_formatIP(ip2) + _checkIput_formatIP(ip3) + _checkIput_formatIP(ip4);
			if (-1 != ip_binary.indexOf("01"))
				return false;
			return true;
		},
		//检查端口
		check_port : function (portvalue) {
			var reg = /^\d{1,5}$/;
			if (!reg.test(portvalue))
				return false;
			if (portvalue < 1 || portvalue > 65535) {
				//alert("端口范围1~65535");
				return false;
			} else
				return true;
		},
		//检测手机号码
		checkphone : function (str) {
			var reg = /^1\d{10}$/;
			if (!(reg.test(str))) {
				alert("请输入正确的手机号码！");
				return false;
			}
			return true;
		},
		/*检测mail*/
		check_mail : function (mail) {
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
			return reg.test(mail);
		},
		//验证数字
		isNumber : function (s) {
			var regu = "^[0-9]+$";
			var re = new RegExp(regu);
			if (s.search(re) != -1)
				return true;
			else
				return false;
		},
		//验证session是否超时
		check_session : function () {
			var key = false;
			$.ajax({
				url : "/engine/judgesession",
				type : "get",
				async : false,
				cache : false,
				success : function (msg) {
					if (1 == msg)
						key = true;
				}
			});
			return key;
		},
		//验证MAC地址
		check_mac : function (str) {
			var pattern = /^([0-9A-Fa-f]{2})\:([0-9A-Fa-f]{2})\:([0-9A-Fa-f]{2})\:([0-9A-Fa-f]{2})\:([0-9A-Fa-f]{2})\:([0-9A-Fa-f]{2})$/;
			return pattern.test(str);
		},
		//验证密码
		check_password : function (str) {
			//var reg = /(?:(?:[^\u4e00-\u9fa5\d\w]+\d+[\w\W]+[^\u4e00-\u9fa5]*)|(?:[^\u4e00-\u9fa5\d\w]+[\w\W]+\d+[^\u4e00-\u9fa5]*)|(?:\d+[^\u4e00-\u9fa5\d\w]+[\w\W]+[^\u4e00-\u9fa5]*)|(?:\d+[\w\W]+[^\u4e00-\u9fa5\d\w]+[^\u4e00-\u9fa5]*)|(?:[\w\W]+\d+[^\u4e00-\u9fa5\d\w]+[^\u4e00-\u9fa5]*){10,}|(?:[\w\W]+[^\u4e00-\u9fa5\d\w]+\d+[^\u4e00-\u9fa5]*))/;
			var reg = /^(([a-zA-Z]+)([0-9]+)([a-zA-Z0-9]*[~!@#$%\^&*()_+|{}:"<>?`\-=\\\[\];',.\/]+[a-zA-Z0-9]*))|(([a-zA-Z]+)([a-zA-Z0-9]*[~!@#$%\^&*()_+|{}:"<>?`\-=\\\[\];',.\/]+[a-zA-Z0-9]*)([0-9]+))|(([0-9]+)([a-zA-Z]+)([a-zA-Z0-9]*[~!@#$%\^&*()_+|{}:"<>?`\-=\\\[\];',.\/]+[a-zA-Z0-9]*))|(([0-9]+)([a-zA-Z0-9]*[~!@#$%\^&*()_+|{}:"<>?`\-=\\\[\];',.\/]+[a-zA-Z0-9]*)([a-zA-Z]+))|(([a-zA-Z0-9]*[~!@#$%\^&*()_+|{}:"<>?`\-=\\\[\];',.\/]+[a-zA-Z0-9]*)([a-zA-Z]+)([0-9]+))|(([a-zA-Z0-9]*[~!@#$%\^&*()_+|{}:"<>?`\-=\\\[\];',.\/]+[a-zA-Z0-9]*)([0-9]+)([a-zA-Z]+))$/;
			if (str.length < 6 || str.length > 16) {
				alert("密码长度不符合要求");
				return false;
			} else {
				if (!reg.test(str)) {
					alert("输入的密码太简单，要求至少包含1个数字、1个字母和1个特殊字符");
					return false;
				} else
					return true;
			}
		},
	}
	window.jty = $;
}
)(window.jty, window, document);
/* fix IE6 PNG problem */
function correctPNG() {
	for (var i = 0; i < document.images.length; i++) {
		var img = document.images[i]
			var imgName = img.src.toUpperCase()
			if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
				var imgID = (img.id) ? "id='" + img.id + "' " : ""
				var imgClass = (img.className) ? "class='" + img.className + "' " : ""
				var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
				var imgStyle = "display:inline-block;" + img.style.cssText
					if (img.align == "left")
						imgStyle = "float:left;" + imgStyle
							if (img.align == "right")
								imgStyle = "float:right;" + imgStyle
									if (img.parentElement.href)
										imgStyle = "cursor:hand;" + imgStyle
											var strNewHTML = "<span " + imgID + imgClass + imgTitle
											 + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
											 + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
											 + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
											img.outerHTML = strNewHTML
											i = i - 1
			}
	}
}
window.attachEvent("onload", correctPNG);

if (navigator.platform == "Win32" && navigator.appName == "Microsoft Internet Explorer" && window.attachEvent) {
	window.attachEvent("onload", alphaBackgrounds);
}

function alphaBackgrounds() {
	var rslt = navigator.appVersion.match(/MSIE (d+.d+)/, '');
	var itsAllGood = (rslt != null && Number(rslt[1]) >= 5.5);
	for (i = 0; i < document.all.length; i++) {
		var bg = document.all[i].currentStyle.backgroundImage;
		if (itsAllGood && bg) {
			if (bg.match(/.png/i) != null) {
				var mypng = bg.substring(5, bg.length - 2);
				document.all[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + mypng + "', sizingMethod='scale')";
				document.all[i].style.backgroundImage = "url('')";
			}
		}
	}
}

alphaBackgrounds();

/*
		// 元素ID， 商品结束时间 endtime, 当前时间 btime
		function time(elem, endtime, btime) {
			this.elem = elem;
			this.endtime = new Date(endtime).getTime();
			this.getId = document.getElementById(this.elem);
			this.btime = new Date(btime).getTime();
			this.reg = /\s+/g;
		}
		time.prototype.SetTime = function () {
			var _this = this;
			setInterval(function () {
				_this.DownTime();
			}, 1000)
		}
		time.prototype.DownTime = function () {
			var leave = parseInt((this.endtime - this.btime) / 1000);
			this.btime += 1000;
			var timeBoole = true;
			var day,
			hour,
			mints,
			second;
			if (leave <= 0) {
				timeBoole = false;
			}
			if (timeBoole == true) {
				day = parseInt(leave / 3600 / 24) + "天";
				hour = parseInt((leave / 3600) % 24) + "小时 ";
				mints = parseInt((leave / 60) % 60) + "分 ";
				second = parseInt(leave % 60) + "秒 ";
			} else {
				day = 0 + "天";
				hour = 0 + "小时 ";
				mints = 0 + "分 ";
				second = 0 + "秒 ";
			}
			TiemText = day + hour + mints + second;
			this.getId.innerHTML = TiemText.replace(this.reg, "");
		}
		*/