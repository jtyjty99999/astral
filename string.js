/**
 * @module StringHelper
 *
 * 提供字符串相关的几个方法(添加注释)
 */
define(function () {
	var StringHelper = {
		trim : function (str) { 
			return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},
		ltrim : function (str) { 
			return str.replace(/(^\s*)/g, "");
		},
		rtrim : function (str) { 
			return str.replace(/(\s*$)/g, "");
			　
		},
		//此方法有危险会引发注入
		removeHtml : function (elem) {
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
		camelize : function (target) {
			return target.replace(/[-_][^-_]/g, function (match) {
				return match.charAt(1).toUpperCase();
			});
		},
		underscored : function (target) {
			return target.replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/\-/g, "_").toLowerCase();
		},
		//http://114.xixik.com/character/
		escapeHTML : function (html) {
			return String(html)
			.replace(/&(?!\w+;)/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
		};
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
		startsWith : function (source,str) {
			return source.indexOf(str) === 0;
		},
		endsWith : function (str) {
			return source.lastIndexOf(str) === source.length - str.length;
		},
	};

	
	return StringHelper
});