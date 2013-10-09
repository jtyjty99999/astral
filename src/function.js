/**
 * @module FnHelper
 *
 * 提供操作函数相关的方法
 */
(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('function', function () {
	var FnHelper = {

		bind : function (fn, context, args) {
			args = args || [];
			return function () {
				Array.prototype.push.apply(args, arguments);
				return fn.apply(context, args)
			}
		},
		/**
		 * 函数节流,通过控制函数执行频率提高性能
		 *
		 * @param {"[object Function]"} fn
		 * @return {object Number} delay
		 * @public
		 */
		throttle : function (fn, delay) {
			var timer = null;
			return function () {
				var context = this,
				args = arguments;
				clearTimeout(timer);
				timer = setTimeout(function () {
						fn.apply(context, args);
					}, delay);
			};
		},
		/**
		 * 函数反柯里化
		 *
		 * @param {"[object Function]"} fn
		 * @return {"[object Function]"} fn
		 * @public
		 */
		uncurryThis : function (f) {
			return function () {
				return f.call.apply(f, arguments)
			};
		},
		/**
		 * 函数局部套用,返回一个预充填函数后的函数
		 *eg:
		 * var sum = function(x,y){return x+y}
		 * var a = currying(sum,2,3)
		 * a() //5
		 * @param {"[object Function]"} fn
		 * @return {"[object Function]"} fn
		 * @public
		 */
		currying : function (f) {
				var a = Array.prototype.slice.call(arguments);
				a.shift();//扔掉f
				return function () {

					args = arguments.length > 0 ? a.concat(Array.prototype.slice.call(arguments)) : a;

					return f.apply(this, args)
				}
		},
		/**
		 * 连接两个函数,并覆盖原函数.执行原函数后会执行被连接的函数
		 *
		 * @param {"[object Object]"} scope 执行上下文
		 * @param {"[object String]"} fnFrom 原函数名
		 * @param {"[object Function]"} fnTo 要连接的函数
		 * @return {"[object Object]"}
		 * @public
		 */

		connect : function (scope, fnFrom, fnTo) {
			var objFn = fnFrom.split('.');
			var deepth = objFn.length;
			var scope = scope || window;
			var j = deepth,
			i = j;
			var _obj = scope,
			__obj = _obj;
			while (i > 0) {
				_obj = _obj[objFn[deepth - i]];
				i -= 1;
			}
			var t = function () {
				return function () {
					var ret = _obj.apply(this, arguments);
					fnTo.apply(this, arguments);
					return ret;
				}
			}
			while (j > 1) {
				__obj = __obj[objFn[deepth - j]];
				j -= 1;
			}
			__obj[objFn[deepth - 1]] = t();
		},
		/**
		 * 按照数组顺序依次执行函数表,注意函数运行完毕与否不影响下个函数的执行.
		 * 此方法用于降低大量javascript脚本对浏览器的压力
		 * @param {"[object Array]"} toDoList 执行上下文
		 * @param {"[object Array]"} args 执行参数
		 * @param {"[object Function]"} callback 执行完毕后的回调函数
		 * @param {"[object Number]"} delay 执行间隔
		 * @return {"[object Object]"}
		 * @public
		 */

		simpleAtQuene : function (toDoList, args, callback, delay) {
			var todo = toDoList.concat();
			var delay = delay || 25;
			setTimeout(function () {
				var task = todo.shift();
				task.apply(null, args || []);
				if (todo.length > 0) {
					setTimeout(arguments.callee, delay)
				} else {
					callback && callback()
				}
			}, 25)
		},
		/**
		 * 缓存函数的执行结果
		 *
		 * @param {"[object Function]"} fun 要被缓存的函数
		 * @return {"[object Object]"}  cache 带有缓存功能的函数
		 * @public
		 */
		memorize : function (fun) {
			var buffer = {};
			var cache = function () {
				var key = Array.prototype.join.call(arguments, '');
				if (!(key in buffer)) {
					buffer[key] = fun.apply(this, arguments);
				};
				return buffer[key];
			}
			cache.del = function (key) {
				if (!key) {
					buffer = {};
				} else if (key in buffer) {
					delete buffer[key];
				}
			}
			cache.add = function (key, value) {
				buffer[key] = value;
			}
			return cache;
		},
		/**
		 * 给函数增加计时器,执行时会自动打印执行时间
		 *
		 * @param {"[object Function]"} fun
		 * @return {"[object Function]"} fun
		 * @public
		 */
		timeTest = function (fun) {
			return function () {
				var d = +new Date();
				var apy = fun.apply(this, arguments);
				console.log(" need time:" + (+new Date() - d));
				return apy;
			}
		},
		/**
		 * 使某个函数执行n次
		 *
		 * @param {"[object Number]"} num
		 * @param {"[object Function]"} fun
		 * @return {"[object Object]"}
		 * @public
		 */
		times : function (num, fn) {
			if (fn) {
				for (var i = 0; i < num; i++) {
					fn.call(num, i);
				}
			}
		},
		
		inject : function (aOrgFunc, aBeforeExec, aAtferExec) {
			return function () {
				var Result,
				isDenied = false,
				args = [].slice.call(arguments);
				if (typeof(aBeforeExec) === 'function') {
					Result = aBeforeExec.apply(this, args);
					if (Result instanceof Arguments) //(Result.constructor === Arguments)
						args = Result.value;
					else if (isDenied = Result !== undefined)
						args.push(Result)
				}

				!isDenied && args.push(aOrgFunc.apply(this, args)); //if (!isDenied) args.push(aOrgFunc.apply(this, args));

				if (typeof(aAtferExec) === 'function')
					Result = aAtferExec.apply(this, args.concat(isDenied));
				else
					Result = undefined;

				return (Result !== undefined ? Result : args.pop());

			}
		},
			reload : function (elems, key, valOrFn, callback) {
				var length = elems.length;

				// 如果有多个属性，则迭代
				if (typeof key === "object") {
					for (var k in key) {
						FnHelper.reload(elems, k, valOrFn, callback);
					}
					return elems;
				}

				if (value !== undefined) {
					var isFn = Util.getType(valOrFn) == 'Function';

					for (var i = 0; i < length; i++) {
						callback(elems[i], key, isFn ? valOrFn.call(elems[i], i, callback(elems[i], key)) : valOrFn);
					}

					return elems;
				}

				// 读取属性
				return length ? callback(elems[0], key) : undefined;
			},
	};
	return FnHelper
})