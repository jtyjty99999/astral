	/**
 * @module arrayHelper
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
})('arrayHelper', function () {

		var A = function (obj) {
		return new wraped(obj)
	}
			/**
			 * 返回数组中的最小值，用于数字数组
			 * @param  {Array}  数组
			 * @return  {Number}  返回值
			 */

		A.min  =  function (arr) {
			return Math.min.apply(0, arr);
		}
			/**
			 * 返回数组中的最大值，用于数字数组
			 * @param  {Array}  数组
			 * @return  {Number}  返回值
			 */
		A.max = function (arr) {
			//返回数组中的最大值，用于数字数组。
			return Math.max.apply(0, arr);
		}
			/**
			 * 利用哈希法对数组去重
			 * @param  {Array}  数组
			 * @return  {Array}  去重后数组
			 */
		A.delRepeat =function(arr) {
			var i = 0,
			key,
			l = arr.length,
			tp = {};
			result = [];
			for (; i < l; i += 1) {
				key = arr[i];
				!tp[key] && (result.push(key), tp[key] = true);
			}
			return result;
		}
			/**
			 * 利用遍历对数组去重
			 * @param  {Array}  数组
			 * @return  {Array}  去重后数组
			 */
		A.unique  = function (arr) {
			var ret = [],
			n = arr.length,
			i,
			j; //by abcd
			for (i = 0; i < n; i++) {
				for (j = i + 1; j < n; j++)
					if (arr[i] === arr[j])
						j = ++i;
				ret.push(arr[i]);
			}
			return ret;
		}
			/**
			 * 判断元素在数组中的位置
			 * @param  {Array}  数组
			 * @param  {Object} 元素  
			 * @return  {Boolean}    
			 */
		A.indexOf = function (arr,item){
				if (arr === void 0 || arr === null)  
					throw new TypeError();  
	  
				var t = Object(arr);  
				var len = t.length >>> 0;  
				if (len === 0)  
					return -1;  
	  
				var n = 0;  
				if (arguments.length > 0) {  
					n = Number(arguments[1]);  
					if (n !== n)  
						n = 0;  
					else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))  
						n = (n > 0 || -1) * Math.floor(Math.abs(n));  
				}  
	  
				if (n >= len)  
					return -1;  
	  
				var k = n >= 0  
						? n : Math.max(len - Math.abs(n), 0);  
	  
				for (; k < len; k++) {  
					if (k in t && t[k] === searchElement)  
					return k;  
				}  
				return -1;  
		}	 
			 
			/**
			 * 判断元素是否在数组中
			 * @param  {Array}  数组
			 * @param  {Object} 元素  
			 * @return  {Boolean}    
			 */
		A.contains =  function (arr, item) {
			//返回-1时~返回0
			return !!~A.indexOf(item);
		}
					/**
			 * 删除数组某个位置的数组项
			 * @param  {Array}  数组
			 * @param  {Number} 位置
			 * @return  {Boolean}   删除结果
			 */
		A.removeAt  = function (arr, index) {
			return !!arr.splice(index, 1).length
		}
			/**
			 * 删除数组某项
			 * @param  {Array}  数组
			 * @param  {Number} 数组项
			 * @return  {Boolean}   删除结果
			 */
		A.remove =  function (arr, item) {
			var index = A.indexOf(item);
			if (~index)
				return A.removeAt(arr, index);
			return false;
		}
			/**
			 * 对数组进行随机排列
			 * @param  {Array}  数组
			 * @return  {Array}   乱序数组
			 */
		A.resortArray =function (arr) {
			var newArr = [];
			do {
				newArr[newArr.length] = arr.splice(parseInt(Math.random() * arr.length), 1);
			} while (arr.length);
			return newArr;
		}
			/**
			 * 利用遍历合并两个数组
			 * @param  {Array}  数组
			 * @param  {Array}  数组
			 * @return  {Array}   数组
			 */
		A.merge  =  function (arr1, arr2) {
			var i = arr1.length,
			j = 0,
			n = arr2.length;
			for (; j < n; j++) {
				arr1[i++] = arr2[j];
			}
			arr1.length = i;
			return arr1;
		}
			/**
			 * 合并两个数组并去重
			 * @param  {Array}  数组
			 * @param  {Array}  数组
			 * @return  {Array}   去重后数组
			 */
		A.union = function (arr1, arr2) {
			return A.unique(A.merge(arr1, arr2));
		}
			/**
			 * 把数组按照项数拆分
			 * @param  {Array}  数组
			 * @param  {Number}  项数
			 * @return  {Array}   拆分后的新数组
			 */
		A.countToGroup = function (data, groupBy) {
			var dataStore = data.slice(0);
			var l = dataStore.length;
			var groups = Math.ceil(l / groupBy),
			grouped = [],
			i = 0;
			for (; i < groups; i++) {
				grouped.push(dataStore.splice(0, groupBy));
			}
			return grouped
		}
			/**
			 * 把数组某项移动到另一项
			 * @param  {Array}  数组
			 * @param  {Number}  起点
			 * @param  {Number}  终点
			 * @return  {Array}   新数组
			 */
		A.moveTo = function (arr, s, t) {
			if (s == t)
				return arr;
			if (s < t) {
				return arr.slice(0, s).concat(arr.slice(s + 1, t + 1), arr.slice(s, s + 1), arr.slice(t + 1, arr.length));
			} else {
				return arr.slice(0, t + 1).concat(arr.slice(s, s + 1), arr.slice(t + 1, s), arr.slice(s + 1, arr.length));
			}
		}
			/**
			 * 对数组进行平坦化处理，返回一个一维的新数组。
			 * 注意打扁的是高维数组,不能打扁别的对象
			 * @param  {Array}  数组
			 * @return  {Array}   一维数组
			 */
		A.flatten: function(target) {
            var result = [];
			var l = target.length,i = 0;
			for(;i<l;i++){
			     if (Object.prototype.toString.call(target[i])=="[object Array]") {
                    result = result.concat(A.flatten(target[i]));
                } else {
                    result.push(target[i]);
                }
			
			}

            return result;
        }

		
		function wraped(str) {
		this._s = str;
	}
	
	var arrayProto = Array.prototype

	function addOn(wrapper, fnArray, fromObj) {
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
		var addOnArrayProtoFn = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift','concat','join']

		var j = 0,
		k = addOnArrayProtoFn.length;
		for (; j < k; j++) {

			(function (i) {

				var name = addOnArrayProtoFn[i];
				var protoFn = arrayProto[addOnArrayProtoFn[i]];
				wrapper.prototype[name] = function () {
					var ret = protoFn.apply(this._s, arguments);
					return ret
				}

			})(j)

		}

	}
		
		addOn(wraped, ['min','max','delRepeat','unique','contains','removeAt','remove','resortArray','merge','union','countToGroup','moveTo'], A)
		
		
	return A

}
	())