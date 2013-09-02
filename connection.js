/**
 * @module Connection
 *
 * 数据交互模块,处理url与ajax数据交互
 */
(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('Connection', function () {

	var C = {
		/**
		 * 发送数据(一般用于打点统计)
		 * @param {object Object} 数据对象，key-value形式
		 * @param {object String} url
		 * @return null
		 */
		sendData : function (data, path) {
			var url = C.addQueryUrlParam(data, path);
			var img = new Image();
			img.src = url;
			img = null;
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
				}
				catch(e2) {}
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
		 * 判断服务器返回的是否是xml形式,若是，获得xml文档对象，否则返回文本内容
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
		var requestTimeout = false, timeoutTimer =
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
//http://www.cnblogs.com/heyuquan/archive/2013/05/13/3076465.html
	return C
}
	())