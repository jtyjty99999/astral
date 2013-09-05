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


		A.min  =  function (arr) {
			//返回数组中的最小值，用于数字数组。
			return Math.min.apply(0, arr);
		}
		A.max = function (arr) {
			//返回数组中的最大值，用于数字数组。
			return Math.max.apply(0, arr);
		}
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
		A.unique  = function (arr) {
			// 对数组进行去重操作，返回一个没有重复元素的新数组。
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
		A.contains =  function (arr, item) {
			//返回-1时~返回0
			return !!~arr.indexOf(item);
		}
		A.removeAt  = function (arr, index) {
			return !!arr.splice(index, 1).length
		}
		A.remove =  function (arr, item) {
			var index = arr.indexOf(item);
			if (~index)
				return A.removeAt(arr, index);
			return false;
		}
		A.resortArray =function (arr) {
			var newArr = [];
			do {
				newArr[newArr.length] = arr.splice(parseInt(Math.random() * arr.length), 1);
			} while (arr.length);
			return newArr;
		}
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
		A.union = function (arr1, arr2) {
			return A.unique(A.merge(arr1, arr2));
		}
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
		
		addOn(wraped, ['min','max','delRepeat','unique','contains','removeAt','remove','resortArray','merge','union','countToGroup'], A)
		
		
	return A

}
	())