/**
 * @module StringHelper
 *
 * 提供字符串相关的几个方法(添加注释)
 */
define(function () {
	var StringHelper = {};

	StringHelper.trim =function(str) { //high efficiency
		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	StringHelper.ltrim =function(str) { //remove left space
		return str.replace(/(^\s*)/g, "");
	}
	StringHelper.rtrim =function(str) { //remove right space
		return str.replace(/(\s*$)/g, "");
		　
	}
	StringHelper.removeHtml =function(elem) {
		elem.innerHTML.replace(/<.+?>/gim, '')
	}
	/**
	 * 汉字字符串截取
	 *
	 * @param {object String}汉字字符串
	 * @param {object Number}起点
	 * @param {object Number}截取个数
	 * @return {object String}
	 * @public
	 */	
	 StringHelper.chineseSubstr = function (str,begin, num) {
	 	var ascRegexp = /[^\x00-\xFF]/g,
	 	i = 0;
	 	while (i < begin)
	 		(++i && str.charAt(i - 1).match(ascRegexp) && begin--);
	 	i = begin;
	 	var end = begin + num;
	 	while (i < end)
	 		(++i && str.charAt(i - 1).match(ascRegexp) && end--);
	 	return str.substring(begin, end);
	 };
	/**
	 * 汉字字符串求长度
	 *
	 * @param {object String}汉字字符串
	 * @return {object Number}字符串长度
	 * @public
	 */	
	 StringHelper.chineseLen = function (str) {
	 	var ascRegexp = /[^\x00-\xFF]/g;
	 	return str.replace(ascRegexp, '..').length;
	 };
	
	return StringHelper
});