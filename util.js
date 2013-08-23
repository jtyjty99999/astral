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
/**
	 * 揉杂，合并对象
	 *
	 * @param {"[object Object]"} base 揉杂的接受者
	 * @param {"[object Object]"} supplier  提供者
	 * @param {"[object Boolean]"} bOverwrite 存在相同key时,若不覆盖原对象，取true. 默认为false,覆盖原对象
	 * @return {"[object Object]"} 揉杂结果  
	 * @public
mixin({a:111,b:222,c:333},{a:222})//{a: 222, b: 222, c: 333}
mixin({a:111,b:222,c:333},{a:222},true)//{a: 111, b: 222, c: 333}
**/
	Util.mixin = function(base, supplier, bOverwrite) {
		var base = base || {},
		key,
		bOverwrite = bOverwrite || false;
		for (key in supplier) {
			if (supplier.hasOwnProperty(key)) { //不像 for in operator, hasownproperty 不追踪prototype chain
				if (typeof(base[key]) != 'undefined' && bOverwrite) {
					continue;
				}
				base[key] = supplier[key];
			}
		}
		return base;
	}

	
	return Util
});