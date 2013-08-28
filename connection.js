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
		parseXML : function (data, xml, tmp) {

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
				earch(e2) {}
			}
		}
		finally {
			return req
		}
	}

	function globalEval(data) {
		if (data && /\S/.test(data)) {
			(window.execScript || function (data) {
				window['eval'].call(window, data);
			})(data);
		}
	}
	/*判断加载是否成功*/
	function httpSuccess(r) {
		try {
			return !r.status && location.protocl == 'file:' || (r.status >= 200 && r.status < 300) || r.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof r.status == 'undefined';
		} catch (e) {}
		return false;
	};
	/*判断加载文件类型*/
	function httpData(r, type) {
		var ct = r.getResponseHeader('content-type');
		var data = !type && ct && ct.indexOf('xml') >= 0;
		data = type == 'xml' || data ? r.responseXML : r.responseText;
		return data;
	}
	//ajax部分
	C.ajaxCache = {};

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
		var requestDone = false;
		setTimeout(function () {
			requestDone = true;
		},
			timeoutLength);
		xml.onreadystatechange = function () {
			if (xml.readyState == 4 && !requestDone) {
				if (httpSuccess(xml)) {
					var data = httpData(xml, paramStore.type);
					paramStore.onSuccess(data);
					paramStore.cache && C.ajaxCache[paramStore.url] = data;
				} else if (paramStore.reSend && C.ajaxCache[paramStore.url]['reSendCount'] !== 0) {
					setTimeout(function () {
						C.ajax(paramStore);
						C.ajaxCache[paramStore.url]['reSendCount'] -= 1;
						console.log('剩余' + C.ajaxCache[paramStore.url]['reSendCount'] + '次执行');
					}, 1000)

				} else {
					paramStore.onError();
				}

				paramStore.onComplete();
				xml = null;
			}
		};
		xml.send();

	}

	return C
}
	())