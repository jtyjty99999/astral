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
	/delete current element node
	+-------------------------- */
	$.rmnode = function removeElement(_element) {
		var parentElement = _element.parentNode;
		if (parentElement) {
			parentElement.removeChild(_element);
		}
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
	function trim(str) { //remove both sides space
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
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
	
	/*-------------------------- +
	event binding, deleting
	+-------------------------- */
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
		}
	};
	
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
	function hasClass(element, className) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		return element.className.match(reg);
	}
	/**
	add css attribute
	 */	
	function addClass(ele, cls) {
		if (!this.hasClass(ele, cls))
			ele.className += " " + cls;
	}

	/**
	remove css attribute (from Mr.Think)
	 */
	function removeClass(element, className) {
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
	//底层共用
	var iBase = {
		Id : function (name) {
			return document.getElementById(name);
		},
		//设置元素透明度,透明度值按IE规则计,即0~100
		SetOpacity : function (ev, v) {
			ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
		}
	}
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
		iBase.SetOpacity(elem, 0);
		//初始化透明度变化值为0
		var val = 0;
		//循环将透明值以5递增,即淡入效果
		(function () {
			iBase.SetOpacity(elem, val);
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
			iBase.SetOpacity(elem, val);
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
	var getCoords = function (el) {
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
		var string1,
		string2
		temp[i++] = string1;
		temp[i++] = string2
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

	window.jty = $;
}
)(window.jty, window, document);