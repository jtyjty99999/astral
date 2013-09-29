/**
 * @module animate
 *
 * 动画库
 * http://www.mozily.net/2013/05/28/Tween.js_and_counterintuitive_design/
 * 以我自己的方式实现的动画库，最大的优点是完全解耦dom与动画，只提供动画需要的参数值
 */
(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('animate', function () {
	/*此api不稳定，暂时不使用
	var clock = (function () {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
	window.setTimeout(callback, 1000 / 60);
	}
	})()*/

	var tween = {
		line : function (n, p, a, b) {
			return n / a * p + b;
		}
	};

	var ticker,
	timeLine = {};

	var A = {
		aniType : function (type) {
			return type && typeof(type) == "string" && tween[type] ? type : "line";
		},
		config : {
			n : 0,
			b : 0,
			p : 300,
			a : 20,
			type : 'line',
			onUpdate : function () {},
			onEnd : function () {},
			onStart : function () {}
		},
		//n, p, a, b, type,onUpdate,onEnd,onStart
		setConfig : function (arg, val) {
			if (typeof arg == 'object') {
				for (var key in arg) {
					A['config'][key] = arg[key];
				}
			} else if (typeof arg == 'string') {
					A['config'][arg] = val;
			} else {
				return
			}
		},
		exec : function () {
			//从第一帧开始，持续20帧，移动的距离为300px，开始的位置为0
			n = A.config.n;
			p = A.config.p;
			a = A.config.a;
			b = A.config.b;
			type = A.config.type;
			onUpdate = A.config.onUpdate;
			onEnd = A.config.onEnd;
			onStart = A.config.onStart;
			timeLine['now'] = [];
			onStart();
			ticker = setInterval(function () {
					n <= a ? (function () {
						var degree = tween[A.aniType(type)](n, p, a, b);
						timeLine['now'].push({
							"n" : n,
							"degree" : degree
						});
						onUpdate.call(null, degree);
						n++;
					})()
					 : (clearInterval(ticker), onEnd.call(null));
				}, 25) //40帧/秒
		},
		backward : function () {
			onUpdate = A.config.onUpdate;
			onStart = A.config.onStart;
			onEnd = A.config.onEnd;
			var whole = timeLine['now'].length
				if (whole == 0) {
					return
				};
			onStart();
			ticker = setInterval(function () {
					var keyFrame = timeLine['now'].pop();
					(whole - keyFrame['n']) < whole ? (function () {
						var degree = keyFrame['degree'];
						onUpdate.call(null, degree);
					})()
					 : (clearInterval(ticker), onEnd.call(null));
				}, 25) //40帧/秒
		},
		yoyo:function(){
		var s = A.config.onEnd;
		A.setConfig('onEnd',A.backward);
		A.exec();
		A.setConfig('onEnd',s);
		}
	}
	return A
})