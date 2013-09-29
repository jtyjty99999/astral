    /**
     * @module StringHelper
     *
     * 提供字符串相关的几个方法
     */

    (function (name, definition) {
    	if (typeof define == 'function') {
    		define(name,[],definition);
    	} else if (typeof module != 'undefined' && module.exports) {
    		module.exports = definition;
    	} else {
    		window[name] = definition;
    	}
    })('StringHelper', function () {

    	var S = function (str) {
    		return new wraped(str);
    	}
    	/**
    	 * 随机字串生成，生成一个随机数的36进制表示方法
    	 * @param {object Number} 位数
    	 * @return {String} 生成的n位字符串
    	 * 36^n -1,根据这个最大值生成一个随机数,之后转为36进制n位字符串(包含0-9a-z)
    	 * @public
    	 */
    	S.random36 = function (n) {
    		return Math.floor(Math.random() * Math.pow(36, n)).toString(36);
    	};
    	/**
    	 * 字符串去空白
    	 *
    	 * @param {object String} 输入字符串
    	 * @return {object String} 去空白后的字符串
    	 * @public
    	 */
    	S.trim = function (str) {
    		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    	};
    	S.ltrim = function (str) {
    		return str.replace(/(^\s*)/g, "");
    	};
    	S.rtrim = function (str) {
    		return str.replace(/(\s*$)/g, "");
    		　
    	};

    	/**
    	 * 汉字字符串截取
    	 *
    	 * @param {object String}汉字字符串
    	 * @param {object Number}起点
    	 * @param {object Number}截取个数
    	 * @return {object String}
    	 * @public
    	 */
    	S.chineseSubstr = function (str, begin, num) {
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
    	S.chineseLen = function (str) {
    		var ascRegexp = /[^\x00-\xFF]/g;
    		return str.replace(ascRegexp, '..').length;
    	};
    	/**
    	 * 驼峰化,把一个下划线或者中划线分割的字符串转为驼峰字符串
    	 *
    	 * @param {object String}字符串
    	 * @return {object String}驼峰字符串
    	 * @public
    	 */
    	S.camelize = function (target) {
    		return target.replace(/[-_][^-_]/g, function (match) {
    			return match.charAt(1).toUpperCase();
    		});
    	};
    	S.underscored = function (target) {
    		return target.replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/\-/g, "_").toLowerCase();
    	};
    	/**
    	 * 对输入的html字符串进行编码
    	 *
    	 * @param {object String} html 字符串
    	 * @return {object String} 编码后的字符串
    	 * @public
    	 */
    	//http://114.xixik.com/character/
    	S.escapeHTML = function (html) {
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
    	S.unescapeHTML = function (target) {
    		return target
    		.replace(/&quot;/g, '"')
    		.replace(/&lt;/g, "<")
    		.replace(/&gt;/g, ">")
    		.replace(/&amp;/g, "&")
    		.replace(/&#([\d]+);/g, function ($0, $1) {
    			return String.fromCharCode(parseInt($1, 10));
    		});
    	};

    	/**
    	 * 判断字符串是否以某部分字符串开头
    	 *
    	 * @param {object String} source
    	 * @param {object String} str
    	 * @return {object Boolean}
    	 * @public
    	 */
    	S.startsWith = function (source, str) {
    		return source.indexOf(str) === 0;
    	};
    	/**
    	 * 判断字符串是否以某部分字符串结尾
    	 *
    	 * @param {object String} source
    	 * @param {object String} str
    	 * @return {object Boolean}
    	 * @public
    	 */
    	S.endsWith = function (source, str) {
    		return source.lastIndexOf(str) === source.length - str.length;
    	}
    	/**
    	 * 反转字符串
    	 *
    	 * @param {object String} str
    	 * @return {object String}  str
    	 * @public
    	 */
    	S.reverse = function (str) {
    		return str.split('').reverse().join('');
    	}
    	/**
    	 * 去掉字符串末尾的多个字符
    	 *
    	 * @param {object String} str
    	 * @param {object Number} num 字符个数
    	 * @return {object String}
    	 * @public
    	 */
    	S.deleteLast = function (str, num) {
    		var l = str.length,
    		num = num || 0;
    		return str.substring(0, l - num)
    	}
    	/**
    	 * 将多余字符转为规定的省略符号
    	 *
    	 * @param {object String} str
    	 * @param {object Number} num 字符个数
    	 * @param {object String} elli 省略符号
    	 * @return {object String}
    	 * @public
    	 */
    	S.ellipsis = function (str, limit, elli) {
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

    	var ESCAPE_MAP = {
    		'"' : '\\"',
    		"\\" : "\\\\",
    		"/" : "\\/",
    		"\b" : "\\b",
    		"\f" : "\\f",
    		"\n" : "\\n",
    		"\r" : "\\r",
    		"\t" : "\\t",
    		"\x0B" : "\\u000b"
    	},
    	//字符串中非中文字符串
    	STR_REG = /\uffff/.test("\uffff") ? (/[\\\"\x00-\x1f\x7f-\uffff]/g) : (/[\\\"\x00-\x1f\x7f-\xff]/g);
    	/**
    	 * 转义字符串中的特殊字符
    	 *
    	 * @param {object String} str
    	 * @return {object String}
    	 * @public
    	 */
    	//https://github.com/acelan86/sinaads/blob/master/src/sinaadToolkit.js  formalString
    	S.formalString = function (source) {
    		var ret = [];
    		ret.push(source.replace(STR_REG, function (str) {
    				//如果在ESCAPE_MAP中，直接替换
    				if (str in ESCAPE_MAP) {
    					return ESCAPE_MAP[str];
    				}
    				//转成对应的unicode码
    				var alphaCode = str.charCodeAt(0),
    				unicodePerfix = "\\u";
    				//需要增加几位0来补位
    				16 > alphaCode ? unicodePerfix += "000" : 256 > alphaCode ? unicodePerfix += "00" : 4096 > alphaCode && (unicodePerfix += "0");

    				//保存转移过的值到ESCAPE_MAP提高效率，同时返回
    				ESCAPE_MAP[str] = unicodePerfix + alphaCode.toString(16);

    				return ESCAPE_MAP[str];
    			}));
    		return '"' + ret.join('') + '"';
    	}
    	/**
    	 * 全角字符转半角
    	 *
    	 * @param {object String} str
    	 * @return {object String}
    	 * @public
    	 */		
		//全角空格为12288，半角空格为32
		//其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
		S.toHalfAngle = function (s) {
			return s.replace(/[\uff01-\uff5e]/g, function (a) {
				return String.fromCharCode(a.charCodeAt(0) - 65248);
			}).replace(/\u3000/g, " ");
		}

    	function wraped(str) {
    		this._s = str;
    	}

    	function addOn(wrapper, fnArray, fromObj, proto) {
    		wrapper.prototype = new proto;
			wrapper.prototype.toString = function () {
				return this._s
			}
    		var i = 0,
    		l = fnArray.length;

    		for (; i < l; i++) {

    			(function (j) {

    				var name = fnArray[j];
    				var fn = fromObj[name];
    				wrapper.prototype[name] = function () {
    					var arg = Array.prototype.slice.call(arguments, 0);
    					arg.unshift(this._s);
    					return fn.apply(fromObj, arg);
    				}

    			}
    				(i))

    		}
    	}
    	addOn(wraped, ['ltrim', 'rtrim', 'trim', 'reverse', 'deleteLast', 'chineseSubstr', 'chineseLen', 'camelize', 'underscored', 'escapeHTML', 'unescapeHTML', 'startsWith', 'ellipsis', 'formalString', 'endsWith','toHalfAngle'], S, String);

    	return S

    })