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
			//多重事件
			if (evType.indexOf(' ') !== -1) {

				var eventList = evType.split(' ');

				var i = 0,
				l = eventList.length;

				for (; i < l; i++) {

					if (typeof this._listeners[eventList[i]] === 'undefined') {

						this._listeners[eventList[i]] = [];

					}

					this._listeners[eventList[i]].push(listener);

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
		//c.trigger('a')
		//c.trigger('a',1,2,3)
		//c.trigger('a',[1,2,3])
		//c.off(abc)
		//c.trigger('abc')  //event not bind
		E.CustomEvent.prototype.trigger = function () {

			var arg = arguments,
			event = null;

			if (arg[0] && typeof arg[0] === 'string') {

				event = {
					type : arg[0],
					arg : []
				};
			}

			if (typeof event == null) {

				throw new Error("missing event")
			}

			if (this._listeners[event.type] == undefined) { //删除绑定后不应该触发东西

				throw new Error("event not bind")

			} else {

				var param = arg[1];

				if (param !== undefined) {

					if (Object.prototype.toString.call(param) !== "[object Array]") {

						var j = 1,
						ln = arg.length;

						for (; j < ln; j++) {

							event.arg.push(arg[1]);

						}
					} else {

						event.arg = param;
					}

				}

				var listeners = this._listeners[event.type],

				n = listeners.length,

				i = 0;

				for (; i < n; i++) {

					listeners[i].apply(this, event.arg || null)
				}

			}

		}
	
	
	return E
})




