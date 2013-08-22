/**
 * @module FnHelper
 *
 * 提供操作函数相关的方法
 */
define(function () {
	var FnHelper = {
	
	
	/**
	 * 函数节流,通过控制函数执行频率提高性能
	 *
	 * @param {"[object Function]"} fn
	 * @return {object Number} delay
	 * @public
	 */
	  throttle:function (fn, delay) {
            var timer = null;
            return function () {
                var context = this, args = arguments;
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
    uncurryThis:function (f) {
        return function () {
            return f.call.apply(f, arguments)
        };
    },
	/**
	 * 函数柯里化
	 *
	 * @param {"[object Function]"} fn
	 * @return {"[object Function]"} fn
	 * @public
	 */
    curryThis:function (f) {
        return function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(this);
            return f.apply(null, a);
        };
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

    connect:function (scope, fnFrom, fnTo) {
        var objFn = fnFrom.split('.');
        var deepth = objFn.length;
        var scope = scope || window;
        var j = deepth, i = j;
        var _obj = scope, __obj = _obj;
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

	simpleAtQuene:function (toDoList, args, callback,delay) {
        var todo = toDoList.concat();
        var delay = delay||25;
        setTimeout(function () {
            var task = todo.shift();
            task.apply(null, args || []);
            //console.log('todo = '+todo.length)
            if (todo.length > 0) {
                setTimeout(arguments.callee, delay)
            } else {
                callback&&callback()
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
    memorize:function (fun){
        var buffer = {};
        var cache = function(){
            var key = Array.prototype.join.call(arguments, '');
            if(!(key in buffer)){ buffer[key] = fun.apply(this, arguments); };
            return buffer[key];
        }
        cache.del = function(key){
            if(!key){
                buffer = {};
            }else if(key in buffer){
                delete buffer[key];
            }
        }
        cache.add = function(key, value){
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
	timeTest  = function(fun) {
        return function() {
            var d = +new Date();console.log(d);
            var apy = fun.apply(this,arguments);console.log(+new Date() - d);
            console.log(" need time:"+(+new Date() - d));
            return apy;
       }
	 }
	};
	return FnHelper
});