/**
 * @module StringHelper
 *
 * 提供字符串相关的几个方法
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('StringHelper', function () {
	var StringHelper = {
		/**
		 * 字符串去空白
		 *
		 * @param {object String} 输入字符串
		 * @return {object String} 去空白后的字符串
		 * @public
		 */
		trim : function (str) {
			return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},
		ltrim : function (str) {
			return str.replace(/(^\s*)/g, "");
		},
		rtrim : function (str) {
			return str.replace(/(\s*$)/g, "");
			　
		},
		/**
		 * 去掉节点内部html的标签
		 *
		 * @param {object HtmlElement} elem node节点
		 * @return {object String} 去掉html标签后的字符串
		 * @public
		 */
		//此方法有危险会引发注入(去掉script标签后)
		removeHtmlTag : function (elem) {
			elem.innerHTML.replace(/<.+?>/gim, '')
		},
		/**
		 * 汉字字符串截取
		 *
		 * @param {object String}汉字字符串
		 * @param {object Number}起点
		 * @param {object Number}截取个数
		 * @return {object String}
		 * @public
		 */
		chineseSubstr : function (str, begin, num) {
			var ascRegexp = /[^\x00-\xFF]/g,
			i = 0;
			while (i < begin)
				(++i && str.charAt(i - 1).match(ascRegexp) && begin--);
			i = begin;
			var end = begin + num;
			while (i < end)
				(++i && str.charAt(i - 1).match(ascRegexp) && end--);
			return str.substring(begin, end);
		},
		/**
		 * 汉字字符串求长度
		 *
		 * @param {object String}汉字字符串
		 * @return {object Number}字符串长度
		 * @public
		 */
		chineseLen : function (str) {
			var ascRegexp = /[^\x00-\xFF]/g;
			return str.replace(ascRegexp, '..').length;
		},
		/**
		 * 驼峰化,把一个下划线或者中划线分割的字符串转为驼峰字符串
		 *
		 * @param {object String}字符串
		 * @return {object String}驼峰字符串
		 * @public
		 */
		camelize : function (target) {
			return target.replace(/[-_][^-_]/g, function (match) {
				return match.charAt(1).toUpperCase();
			});
		},
		underscored : function (target) {
			return target.replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/\-/g, "_").toLowerCase();
		},
		/**
		 * 对输入的html字符串进行编码
		 *
		 * @param {object String} html 字符串
		 * @return {object String} 编码后的字符串
		 * @public
		 */
		//http://114.xixik.com/character/
		escapeHTML : function (html) {
			return String(html)
			.replace(/&(?!\w+;)/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
		};
		/**
		 * 对输入的编码后的html字符串进行解码
		 *
		 * @param {object String} html 字符串
		 * @return {object String} 解码后的字符串
		 * @public
		 */
		//fromCharCode() 可接受一个指定的 Unicode 值,然后返回一个字符串。
		unescapeHTML : function (target) {
			return target
			.replace(/&quot;/g, '"')
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&amp;/g, "&")
			.replace(/&#([\d]+);/g, function ($0, $1) {
				return String.fromCharCode(parseInt($1, 10));
			});
		},
		/**
		 * 判断字符串是否以某部分字符串开头
		 *
		 * @param {object String} source
		 * @param {object String} str
		 * @return {object Boolean}
		 * @public
		 */
		startsWith : function (source, str) {
			return source.indexOf(str) === 0;
		},
		/**
		 * 判断字符串是否以某部分字符串结尾
		 *
		 * @param {object String} source
		 * @param {object String} str
		 * @return {object Boolean}
		 * @public
		 */
		endsWith : function (source, str) {
			return source.lastIndexOf(str) === source.length - str.length;
		},
		/**
		 * 反转字符串
		 *
		 * @param {object String} str
		 * @return {object String}  str
		 * @public
		 */
		reverse : function (str) {
			return str.split('').reverse().join('');
		},
		/**
		 * 去掉字符串末尾的多个字符
		 *
		 * @param {object String} str
		 * @param {object Number} num 字符个数
		 * @return {object String}
		 * @public
		 */
		deleteLast : function (str, num) {
			var l = str.length,
			num = num || 0;
			return str.substring(0, l - num)
		},
		/**
		 * 将多余字符转为规定的省略符号
		 *
		 * @param {object String} str 
		 * @param {object Number} num 字符个数
		 * @param {object String} elli 省略符号
		 * @return {object String}
		 * @public
		 */
		ellipsis: function (str,limit,elli) {
		var _limit = limit || 10;
		var elli = elli || '...';
		var len = str.length;
		var str = "";
		if (len > limit) {
			str = this.substring(0, limit);
		}
		str += elli;
		return str;

	}
		
		
	};

	return StringHelper
}
	())