/**
 * @module Util
 *
 * 基础工具库,提供重要的几个方法
 */
 
  (function(name, definition) {
    if(typeof define == 'function') {
        define(definition);
    } else if(typeof module != 'undefined' && module.exports) {
        module.exports = definition;
    } else {
        window[name] = definition;
    }
})('Util',function () {
	var Util = {};
	var objProto = Object.prototype,hasOwn = objProto.hasOwnProperty;
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
		return objProto.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
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
/**
	 * 遍历器
	 *
	 * @param {"[object Object]"} O 被遍历对象
	 * @param {"[object Function]"} 回调函数
	 * @return {"[object Object]"} 
	 * @public
mixin({a:111,b:222,c:333},{a:222})//{a: 222, b: 222, c: 333}
mixin({a:111,b:222,c:333},{a:222},true)//{a: 111, b: 222, c: 333}
**/	
	
	Util.each=function( O, callbackfn ) {

            var T, k = 0, kValue, len;

            if ( O == null ) {  
                throw new TypeError( 'this is null or not defined' );  
            }

            O = Object(O);
            len = O.length >>> 0;

            if( getType(callbackfn) != 'Function' ) {
                throw new TypeError( callbackfn + ' is not a function' );
            }

            if( getType(O) == 'Array' ) {
                while(k < len) {
                    if( hasOwn.call( O, k ) ) {
                        kValue = O[k];
                        if( callbackfn.call( kValue, k + 1, kValue, O ) === false ) break;
                    }
                    k ++;
                }
            } else {
                for( k in O ) {
                    if( hasOwn.call(O, k) ) {
                        kValue = O[k];
                        if( callbackfn.call( kValue, kValue, k, O ) === false ) break;
                    }
                }
            }
            return undefined;
        }

    /**
     * 判定两个对象的值是否相同
     * @param {Any} a
     * @param {Any} b
     * @return {Boolean}
     * @public
     */

    Util.isEqual=function(a, b) {
        if(a === b) {
            return true;
        } else if(a === null || b === null || typeof a === "undefined" || typeof b === "undefined" || $.type(a) !== $.type(b)) {
            return false;
        } else {
            switch($.type(a)) {
                case "String":
                case "Boolean":
                case "Number":
                case "Null":
                case "Undefined":
                    //处理简单类型的伪对象与字面值相比较的情况,如1 v new Number(1)
                    if(b instanceof a.constructor || a instanceof b.constructor) {
                        return a == b;
                    }
                    return a === b;
                case "NaN":
                    return isNaN(b);
                case "Date":
                    return +a === +b;
                case "NodeList":
                case "Arguments":
                case "Array":
                    var len = a.length;
                    if(len !== b.length) return false;
                    for(var i = 0; i < len; i++) {
                        if(!isEqual(a[i], b[i])) {
                            return false;
                        }
                    }
                    return true;
                default:
                    for(var key in b) {
                        if(!isEqual(a[key], b[key])) {
                            return false;
                        }
                    }
                    return true;
            }
        }
    }
	
	return Util
}

)
 