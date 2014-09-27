/**
 * @module Connection
 *
 * 数据交互模块,处理url与ajax数据交互
 */
(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('connection', function () {
	var Doc = document;
	var head = DOC.head || DOC.getElementsByTagName("head")[0]; //HEAD元素
	var W3C = document.dispatchEvent;

	var C = {
	
		/**
		 * 生成随机唯一UUID
		 * @return {object String}
		 */
		//eg:"8b649aac-2850-466b-9d37-68880fee772c"
	
		createUUID : function () {
			// http://www.ietf.org/rfc/rfc4122.txt
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "-";

			var uuid = s.join("");
			return uuid;
		},
		/**
		 * 通过url加载Css
		 * @param {object String} url
		 */
		loadCSS : function (url) {
			//通过link节点加载模块需要的CSS文件
			var id = 'C' + C.createUUID();
			if (!DOC.getElementById(id)) {
				var node = DOC.createElement("link");
				node.rel = "stylesheet";
				node.href = url;
				node.id = id;
				head.insertBefore(node, head.firstChild);
			}
		},
		/**
		 * 通过url加载Js
		 * @param {object String} url
		 *	@param {object Function} onError : 加载js失败后触发的函数
		 *	@param {object Function} onSuccess : 加载js成功后触发的函数
		 *	@param {object Function} onPending: 开始加载js时触发的函数
		 */
		loadJS : function (url, options) {
			var option = {
				onPending : options.onPending ||
				function () {},
				onError : options.onError ||
				function () {},
				onSuccess : options.onSuccess ||
				function () {}
			};
			//通过script节点加载目标模块
			var node = DOC.createElement("script");
			node[W3C ? "onload" : "onreadystatechange"] = function () {
				if (W3C || /loaded|complete/i.test(node.readyState)) {
					option.onSuccess.call(this, node.src);
				}
			}
			node.onerror = function () {
				option.onError.call(this, node.src);
			}

			node.src = url;
			head.insertBefore(node, head.firstChild);
			option.onPending.call(this, node.src);
		},
		/**
		 * 发送数据(一般用于打点统计)
		 * @param {object Object} 数据对象，key-value形式
		 * @param {object String} url
		 * @return null
		 */
		sendData : function (data, path) {

			var url = C.addQueryUrlParam(data, path);
			var img = new Image();
			var uuid = 'CimgData' + C.createUUID();
			// 这里一定要挂在window下
			// 在IE中，如果没挂在window下，这个img变量又正好被GC的话，img的请求会abort
			// 导致服务器收不到日志(来自tangram)
			window[key] = img;
			img.src = url;

			img.onload = img.onerror = img.onabort = function () {
				// 如果这个img很不幸正好加载了一个存在的资源，又是个gif动画
				// 则在gif动画播放过程中，img会多次触发onload
				// 因此一定要清空(来自tangram)
				img.onload = img.onerror = img.onabort = null;
				window[key] = null;
				// 防止闭包循环引用造成内存泄漏
				img = null;
			};

		},
		/**
		 * 给url添加参数
		 * @param {object String} url
		 * @param {object Object} 数据对象，key-value形式
		 * @return {object String}
		 */
		addQueryUrlParam : function (url, data) {
			for (key in data) {
				if (url.indexOf("?") == -1) {
					url += "?";
				} else {
					url += "&";
				}
				url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
			}
			return url
		},
		/**
		 * json stringify的低端版
		 * @param {object Object} json数据对象，key-value形式
		 * @return {object String}
		 */
		o2Json : function (O) {
			//return JSON.stringify(jsonobj);

			var S = [];
			var J = "";
			if (Object.prototype.toString.apply(O) === '[object Array]') {
				for (var i = 0; i < O.length; i++)
					S.push(o2Json(O[i]));
				J = '[' + S.join(',') + ']';
			} else if (Object.prototype.toString.apply(O) === '[object Date]') {
				J = "new Date(" + O.getTime() + ")";
			} else if (Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) === '[object Function]') {
				J = O.toString();
			} else if (Object.prototype.toString.apply(O) === '[object Object]') {
				for (var i in O) {
					O[i] = typeof(O[i]) == 'string' ? '"' + O[i] + '"' : (typeof(O[i]) === 'object' ? o2Json(O[i]) : O[i]);
					S.push(i + ':' + O[i]);
				}
				J = '{' + S.join(',') + '}';
			}

			return J;
		},
		/**
		 * 获取url的参数
		 * @param {object String} url,默认为当前地址
		 * @return {object Object} url参数对象
		 */
		getUrlArgs : function (url) {
			var str = url ? url.split('?')[1] : location.search.substring(1);
			var args = {};
			var items = str.split("&");
			var item,
			i = 0,
			l = items.length
				for (; i < l; i++) {
					item = items[i].split("=");

					try {
						args[decodeURIComponent(item[0])] = decodeURIComponent(items[1]);
					} catch (e) {
						args[decodeURIComponent(item[0])] = items[1];
					}
				}
				return args;
		},
		/**
		 * 获取当前url中某个参数的值
		 * @param {object String} 需要获取的参数名
		 * @param {object String} URL,默认为当前url
		 * @return {object String} url值
		 */
		getUrlParam : function (name, url) {
			var reg = new RegExp("(?:^|&)" + name + "=([^&]*)(&|$)");
			var qs = url ? url.split('?')[1] : window.location.search.substr(1);
			var r = qs.match(reg);
			if (r != null) {
				try {
					res = decodeURIComponent(r[1]);
				} catch (e) {
					res = r[1];
				}
				return res
			}
			return null;
		},
		/**
		 * 字典排序再散列,对传入的参数对象进行字典排序后拼接为字符串,用于加密
		 * @param {object Object} 参数对象
		 * @return {object String} 字典排序后拼接的字符串
		 */
		dictAndMd5ize : function (obj) {
			var array = new Array();

			//字典排序

			for (var key in obj) {
				array.push(key);
			}
			array.sort();

			var paramArray = new Array();

			//拼接字符串

			for (var index in array) {
				var key = array[index];
				paramArray.push(key + obj[key]);
			}

			var md5Source = paramArray.join("");
			return md5Source
		},
		/**
		 * url参数字符串转对象,类似nodejs的queryString.parse
		 * @param {object String} 参数字符串
		 * @return {object Object} 对象
		 */
		parse : function (str) {
			var r = {};
			if (str.charAt(0) == '?') {
				str = str.substr(1)
			};
			var params = str.split("&");
			var item,
			i = 0,
			l = params.length
				for (; i < l; i++) {
					item = params[i].split("=");
					key = decodeURIComponent(item[0]);
					try {
						r[key] = decodeURIComponent(item[1]);
					} catch (e) {
						r[key] = item[1];
					}

				}
				return r;
		},
		/**
		 * url参数对象转字符串,类似nodejs的queryString.stringify
		 * @param {object Object} 参数对象
		 * @return {object String} 参数字符串
		 */
		stringify : function (obj) {

			var s = '';
			for (var index in obj) {
				s += '&';
				s += encodeURIComponent(index) + "=" + encodeURIComponent(obj[index]);
			}
			return s.replace(/%20/g, '+').substring(1);
		},
		/**
		 * 将JSON字符串解析为对象
		 * @param {object String} JSON字符串
		 * @return {object Object} JSON对象
		 * 注意这里没有处理json数据中存在function的问题.eg:
		var json={
			name:'json',
			getName:function(){
			return this.name;
			}
		}
		 *
		JSON.stringify(json, function(key, val) {
			if (typeof val === 'function') {
				return val + '';
			}
				return val;
		});
		经过这么转换后会把function转为字符串.但使用parseJSON进行转换后,function会变成纯字符串而不是function对象
		JSON.parse(s,function(k,v){
			if(v.indexOf&&v.indexOf('function')>-1){
				return eval("(function(){return "+v+" })()")
			}
			return v;
		});
		 * 这样处理后即可. http://www.cnblogs.com/rubylouvre/articles/2792380.html
		 */
		parseJSON : function (data) {
			var res = '';
			if (typeof data !== "string" || !data) {
				return null;
			}

			if (window.JSON && window.JSON.parse) {
				return window.JSON.parse(data);
			}
			try {
				res = (new Function("return" + data))()
			} catch (e) {
				throw new Error('parse error')
				return
			}
			return res;

		},

		/**
		 * 将XML字符串解析为对象
		 * @param {object String} XML字符串
		 * @return {object Object} XML对象
		 * 下面代码可以用来载入一个xml文件。
		 * if (typeof document.implementation.createDocument != "undefined") {
			docObj = document.implementation.createDocument("", "", null);
			}
			else if (window.ActiveXObject) {
			docObj = new ActiveXObject("Microsoft.XMLDOM");
			}
			
			docObj.load("books.xml");
		 */
		parseXML : function (data, xml) {
			var tmp;
			if (window.DOMParser) {
				tmp = new DOMParser();
				xml = tmp.parseFromString(data, "text/xml");
			} else {
				xml = new ActiveXObject("Microsoft.XMLDOM");
				xml.async = "false";
				xml.loadXML(data);
			}

			tmp = xml.documentElement;

			if (!tmp || !tmp.nodeName || tmp.nodeName === "parsererror") {
				throw new Error('Invalid XML')
			}

			return xml;
		},

	};
	/**
	 * YUI2的创建xhr对象的封装
	 * @return {object XmlHttpRequest} XHR对象
	 * @private
	 */
	function createXHR() {
		var msxml_progid = [
			'MSXML2.XMLHTTP.6.0',
			'MSXML3.XMLHTTP',
			'Microsoft.XMLHTTP', //不支持readyState 3
			'MSXML2.XMLHTTP.3.0' //不支持readyState 3
		]
		var req;
		try {
			req = new XMLHttpRequest()
		} catch (e) {
			for (var i = 0, len = msxml_progid.length; i < len; ++i) {
				try {
					req = new ActiveXObject(msxml_progid[i]);
					break
				} catch (e2) {}
			}
		}
		finally {
			return req
		}
	}
	/**
	 *	全局eval
	 * @return {object Object}
	 * @private
	 */
	function globalEval(data) {
		if (data && /\S/.test(data)) {
			(window.execScript || function (data) {
				window['eval'].call(window, data);
			})(data);
		}
	}
	/**
	 *	判断加载是否成功
	 * @param {object XmlHttpRequest}
	 * @return {object Boolean}
	 *  如果得不到服务器状态，且我们正在请求本地文件，认为成功
	 *  return !r.status && location.protocol == "file:" ||
	 *   所有200到300间的状态表示为成功
	 *  (r.status >= 200 && r.status < 300) ||
	 *   文档未修改也算成功
	 *  r.status == 304 ||
	 *   Safari 在文档未修改时返回空状态
	 * navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined";
	 * @private
	 */

	function httpSuccess(r) {
		try {
			return !r.status && location.protocl == 'file:' || (r.status >= 200 && r.status < 300) || r.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof r.status == 'undefined';
		} catch (e) {}
		return false;
	};
	/**
	 *	处理ajax的返回数据
	 * @param {object XmlHttpRequest}
	 * @param {object String}
	 * @return {object String}
	 * 判断服务器返回的是否是xml形式,若是,获得xml文档对象，否则返回文本内容
	 * @private
	 */
	function httpData(r, type) {
		var ct = r.getResponseHeader('content-type');
		var data = !type && ct && ct.indexOf('xml') >= 0;
		data = type == 'xml' || data ? r.responseXML : r.responseText;
		return data;
	}
	//ajax部分
	C.ajaxCache = {};
	/**
	 *	Ajax请求
	 * @param {object Object}
	@param {object String} type : ajax请求方式，默认为POST,
	@param {object String} url : ajax请求地址 ,默认为空
	@param {object Number} timeout 超时时间，默认为 5000,
	@param {object Boolean} reSend : 是否开启失败重试,默认为false,
	@param {object Number} reSendCount : 失败重试次数，默认为1,
	@param {object Boolean} cache : 是否缓存此请求的数据 默认为 false,
	@param {object Function} onBeforeSend ajax请求开始前触发的函数
	@param {object Function} onComplete ajax请求结束后触发的函数
	@param {object Function} onError : ajax请求失败后触发的函数
	@param {object Function} onSuccess : ajax请求成功后触发的函数
	@param {object Function} onTimeout: ajax请求超时后触发的函数
	@param {object String} data : ajax数据
	 */
	C.ajax = function (options) {

		var paramStore = {
			type : options.type || 'POST',
			url : options.url || '',
			//设置超时
			timeout : options.timeout || 5000,
			//失败重试
			reSend : options.reSend || false,
			reSendCount : options.reSendCount || 1,
			//利用本地存储存储某个url拿到的数据
			cache : options.cache || false,

			onComplete : options.onComplete ||
			function () {},
			onError : options.onError ||
			function () {},
			onSuccess : options.onSuccess ||
			function () {},
			onTimeout : options.onTimeout ||
			function () {},
			onBeforeSend : options.onTimeout ||
			function () {},
			data : options.data || ''
		};
		//缓存
		if (paramStore.cache && C.ajaxCache[paramStore.url]) {
			paramStore.onSuccess(C.ajaxCache[paramStore.url]);
			return;
		}
		//失败重试
		paramStore.reSend && C.ajaxCache[paramStore.url]['reSendCount'] !== undefined && C.ajaxCache[paramStore.url]['reSendCount'] = paramStore.reSendCount;

		var xml = createXHR();
		xml.open(paramStore.type, paramStore.url, true);
		var timeoutLength = paramStore.timeout;
		//超时处理
		var requestTimeout = false,
		timeoutTimer =
			setTimeout(function () {
				requestTimeout = true;
				paramStore.onTimeout();
				xml = null;
			},
				timeoutLength);
		xml.onreadystatechange = function () {
			if (xml.readyState == 4 && !requestDone) {
				clearTimeout(timeoutTimer);
				if (httpSuccess(xml)) {
					var data = httpData(xml, paramStore.type);
					paramStore.onSuccess(data);
					paramStore.cache && C.ajaxCache[paramStore.url] = data;
				} else if (paramStore.reSend && C.ajaxCache[paramStore.url]['reSendCount'] !== 0) {
					setTimeout(function () {
						C.ajaxCache[paramStore.url]['reSendCount'] -= 1;
						C.ajax(paramStore);
						console.log('剩余' + C.ajaxCache[paramStore.url]['reSendCount'] + '次执行');
					}, 1000)

				} else {
					paramStore.onError();
				}

				paramStore.onComplete();
				xml = null;
			}
		};
		paramStore.onBeforeSend();
		xml.send();

	}
	
	
	C.fastImgReady = (function () {
		var list = [], intervalId = null,
		// 用来执行队列
		tick = function () {
			var i = 0;
			for (; i < list.length; i++) {
				list[i].end ? list.splice(i--, 1) : list[i]();
			};
			!list.length && stop();
		},
		// 停止所有定时器队列
		stop = function () {
			clearInterval(intervalId);
			intervalId = null;
		};
		return function (url, ready, load, error) {
			var onready, width, height, newWidth, newHeight, img = new Image();
			img.src = url;
	
			// 如果图片被缓存，则直接返回缓存数据
			if (img.complete) {
				ready.call(img);
				load && load.call(img);
				return;
			};
			
			width = img.width;
			height = img.height;
			
			// 加载错误后的事件
			img.onerror = function () {
				error && error.call(img);
				onready.end = true;
				img = img.onload = img.onerror = null;
			};
			
			// 图片尺寸就绪
			onready = function () {
				newWidth = img.width;
				newHeight = img.height;
				if (newWidth !== width || newHeight !== height ||
					// 如果图片已经在其他地方加载可使用面积检测
					newWidth * newHeight > 1024
				) {
					ready.call(img);
					onready.end = true;
				};
			};
			onready();
			
			// 完全加载完毕的事件
			img.onload = function () {
				// onload在定时器时间差范围内可能比onready快
				// 这里进行检查并保证onready优先执行
				!onready.end && onready();
			
				load && load.call(img);
				
				// IE gif动画会循环执行onload，置空onload即可
				img = img.onload = img.onerror = null;
			};
	
			// 加入队列中定期执行
			if (!onready.end) {
				list.push(onready);
				// 无论何时只允许出现一个定时器，减少浏览器性能损耗
				if (intervalId === null) intervalId = setInterval(tick, 40);
			};
		};
	})();
	//http://www.cnblogs.com/heyuquan/archive/2013/05/13/3076465.html
	return C
})
