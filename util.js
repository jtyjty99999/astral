/**
 * @module Util
 *
 * 基础工具库,提供重要的几个方法
 */
define(function () {
	var Util = {};
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
	 * getType(5); // => "Number"
	 * getType({}); // => "Object"
	 * getType(/foo/); // => "RegExp"
	 * getType(''); // => "String"
	 * getType(true); // => "Boolean"
	 * getType([]); // => "Array"
	 * getType(undefined); // => "Window"
	 * getType(Element); // => "Constructor"
	 *
	 */
	Util.getType =function(object) {
		return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
	};
	
	
	return Util
});