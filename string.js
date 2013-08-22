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
	
	return StringHelper
});