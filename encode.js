/**
 * @module encode
 *
 * 提供编码相关的方法
 */
define(function () {
	var encode = {};
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @public
	 */
	encode.escapeHTML = function (html) {
		return String(html)
		.replace(/&(?!\w+;)/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
	};
	return encode
});