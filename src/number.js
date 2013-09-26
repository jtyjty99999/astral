/**
 * @module NumberHelper
 *
 * 提供操作数组相关的方法
 */
(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('NumberHelper', function () {
	var NumberHelper = {
		 /**
    	 * 大数字相加
		 * 利用字符串逐位去相加
    	 *
    	 * @param {object Number} a
    	 * @param {object Number} b
    	 * @return {object Number}
    	 * @public
    	 */		
		bigAdd : function (a, b) {
			var m = a.split('').reverse();
			var n = b.split('').reverse();
			var ret = [];
			var s = 0;

			for (var i = 0; i < a.length || i < b.length; i++) {
				var t = (m[i] | 0) + (n[i] | 0) + s;

				ret.push(t % 10);
				s = (t / 10) | 0;
			}
			if (s) {
				ret.push(s);
			}
			return ret.reverse().join('');
		},
		 /**
    	 * 大数字相乘
		 * 利用大数字相加法,不断的迭代
    	 *
    	 * @param {object Number} a
    	 * @param {object Number} b
    	 * @return {object Number}
    	 * @public
    	 */	
		bigMutple : function (a, b) {
			var p = a.match(/\d{1,4}/g).reverse(),
			q = b.match(/\d{1,4}/g).reverse(),
			f1 = 0;
			result = "0";

			for (var i = 0; i < p.length; i++) {
				var f2 = 0;
				for (var j = 0; j < q.length; j++) {
					var t = (p[i] | 0) * (q[j] | 0);
					t += new Array(f1 + f2 + 1).join("0");
					result = arrayHelper.bigAdd(result, t);
					f2 += q[j].length;
				}
				f1 += p[i].length;
			}
			return result;

		},
		 /**
    	 * 得到区间随机数
    	 *
    	 * @param {object Number} 最大值
    	 * @param {object Number} 最小值
    	 * @return {object Number}
    	 * @public
    	 */	
		getRandom : function (Min, Max) {
			var Range = Max - Min;
			var Rand = Math.random();
			return (Min + Math.round(Rand * Range));
		},
		/**
    	 * 判断整数
    	 *
    	 * @param {object Number} 
    	 * @return {object Boolean}
    	 * @public
    	 */	
		isInteger : function (num) {
			return num % 1 == 0;
		},
		//pad(222,5)  "00222"
		/**
    	 * 字符串补0,主要用于格式化
    	 *
    	 * @param {object Number} 数字
    	 * @param {object Number} 0的个数
    	 * @return {object Number}
    	 * @public
    	 */	
		pad : function (num, n) {
			var l = ('' + num).length
			return (new Array(n > l ? (n - l + 1) : 0).join('0') + num);
		},
		/**
    	 * 以精度判断数字是否相同
    	 *
    	 * @param {object Number} 
    	 * @param {object Number} 
    	 * @param {object Number} 精度
    	 * @return {object Boolean}
    	 * @public
    	 */	
		isEqual: (number1, number2, digits){
			digits = digits == undefined? 10: digits; // 默认精度为10
			return number1.toFixed(digits) === number2.toFixed(digits);
		},
		/**
    	 * 判断符号
    	 *
    	 * @param {object Number} 
    	 * @return {object Number} 正数返回1,负数返回-1
    	 * @public
    	 */	
		sign : function (value) {
			value = Number(value);
			if (isNaN(value) || (value === 0)) {
				return value;
			}
			return (value > 0) ? 1 : -1;
		},
		/**
    	 * 转为无符号整数
    	 *
    	 * @param {object Number} 
    	 * @return {object Number} 
    	 * @public
    	 */	
		toUint32 : function (value) {
			return value >>> 0;
		},
		/**
    	 * 牛顿迭代法求平方根
    	 *
    	 * @param {object Number} 
    	 * @return {object Number} 
    	 * @public
    	 */	
		//首先随便猜一个近似值x，然后不断令x等于x和a/x的平均数，迭代个六七次后x的值就已经相当精确了
		sqrt : function (num, precision) {

			var guess = num / 2,
			i = 0;
			var res = guess;
			while (i < precision) {

					res = (num / res + res) / 2;
					i += 1
				}
				return res

		}
	};
	return NumberHelper
}
	())