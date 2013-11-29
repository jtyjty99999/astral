/**
 * @module Event
 *
 * 提供事件模块的支持
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('eventHelper', function () { 

	var E = {};

	E.CustomEvent = function () {

		this._listeners = {}
	}

	//c.on('a',function)
	//c.on('a b',function(){})

	E.CustomEvent.prototype.on = function (evType, listener) {
		//多重事件绑定
		if (evType.indexOf(' ') !== -1) {

			var eventList = evType.split(' ');

			var i = 0,
			l = eventList.length;

			for (; i < l; i++) {

				this.on(eventList[i], listener)

			}

		} else {

			if (typeof this._listeners[evType] === 'undefined') {

				this._listeners[evType] = [];
			}

			this._listeners[evType].push(listener);

		}

	}

	//c.off('a',test)
	//c.off('a')
	//c.off('all')

	E.CustomEvent.prototype.off = function (evType, whichListener) {

		if (evType.indexOf(' ') !== -1) { //多重取消事件绑定

			var eventList = evType.split(' ');

			var i = 0,
			l = eventList.length;

			for (; i < l; i++) {

				this.off(eventList[i], whichListener)

			}

		} else {

			if (whichListener !== undefined) {

				if (this._listeners[evType]instanceof Array) {

					var listeners = this._listeners[evType],

					n = listeners.length,

					i = 0;

					for (; i < n; i++) {

						if (listeners[i] == whichListener) {

							listeners.splice(i, 1);

							break;
						}
					}
				}
			} else {

				if (evType == 'all') {

					for (var key in this._listeners) {

						delete(this._listeners[key]) //c.off('all')

					}

				} else {

					delete(this._listeners[evType]); //c.off('a')

				}

			}
		}

	}
	//c.trigger('a')
	//c.trigger('a',1,2,3)
	//c.trigger('a',[1,2,3])
	//c.off(abc)
	//c.trigger('abc')

	function convertToArray(arrLike) {
		try {
			return Array.prototype.slice.call(arrLike);
		} catch (e) {
			var arr = [];
			for (var i = 0, len = arrLike.length; i < len; i++) {
				arr[i] = arrLike[i];
			}
			return arr;
		}
	}

	E.CustomEvent.prototype.trigger = function () {

		var arg = arguments,
		event = null;

		var evType = arg[0];

		if (evType && evType.indexOf(' ') !== -1) { //多重trigger

			var eventList = evType.split(' ');

			var i = 0,
			l = eventList.length;

			for (; i < l; i++) { //拼装参数

				var argsCache = convertToArray(arg);
				argsCache.shift();
				argsCache.unshift(eventList[i]); //把新的事件重新传入trigger函数
				this.trigger.apply(this, argsCache); //传入新的参数数组,包含事件与参数

			}

		} else {

			if (evType && typeof evType === 'string') {

				event = {
					type : evType,
					arg : []
				};
			}

			if (typeof event == null) {

				throw new Error("missing event")

			}

			if (this._listeners[event.type] == undefined) { //删除绑定后不应该触发东西

				return

			} else {

				var param = arg[1];

				if (param !== undefined) {

					if (Object.prototype.toString.call(param) !== "[object Array]") {//传入的参数不是数组

						var j = 1,
						ln = arg.length;

						for (; j < ln; j++) {

							event.arg.push(arg[j])

						}
					} else {

						event.arg = param;//传入数组
					}

				}

				var listeners = this._listeners[event.type],

				n = listeners.length,

				i = 0;

				for (; i < n; i++) {//循环执行事件回调

					listeners[i].apply(this, event.arg || null)
				}

			}

		}

	}
	//修正各种讨厌的不兼容,很多参考的jquery
    function fix(e) {

    	e = e || E.getEvent();
    	var originalEvent = e;

    	e.preventDefault = function () { // 在原始事件上运行
    		if (originalEvent.preventDefault) {
    			originalEvent.preventDefault();
    			originalEvent.returnValue = false;
    		}
    		　　　
    	};
    	e.stopPropagation = function () { // 在原始事件上运行
    		if (originalEvent.stopPropagation) {
    			originalEvent.stopPropagation();
    			originalEvent.cancelBubble = true;
    		}
    		　　　
    	};

    	//fix target
    	if (!e.target) {
    		e.target = e.srcElement || document;
    	}
    	//fix pageX & pageY
    	if (e.pageX == null && e.clientX != null) {
    		var html = document.documentElement;
    		var body = document.body;

    		e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || body && body.clientLeft || 0);
    		e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || body && body.clientTop || 0);
    	}
    	//注意ie里面没有which,只有keycode  http://blog.sina.com.cn/s/blog_6cbbde3f0101757m.html

    	if (!event.which && ((event.charCode || event.charCode === 0)
    			　 　　　　　　　　　 ? event.charCode : event.keyCode)) {
    		event.which = event.charCode || event.keyCode
    	};
    	//判断左右中键点击
    	if (!e.which && e.button) {
    		if (e.button & 1) {
    			e.which = 1;
    		} // Left
    		else if (e.button & 4) {
    			e.which = 2;
    		} // Middle
    		else if (e.button & 2) {
    			e.which = 3;
    		} // Right
    	}
    	//修正ctrl
    	if (!event.metaKey && event.ctrlKey) {
    		event.metaKey = event.ctrlKey;
    	}

    	//fix relatedTarget
    	if (e.relatedTarget === undefined) {
    		e.relatedTarget = e.fromElement || e.toElement;
    	}
    	return e;
    }
	
	return E
})


