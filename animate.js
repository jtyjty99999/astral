/**
 * @module animate
 *
 * 动画库
 */
(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
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
		_self = this,
		aniType : function (type) {
			return type && typeof(type) == "string" && tween[type] ? type : "line";
		},
		exec : function (n, p, a, b, type,onUpdate) {
			_self.onUpdate = onUpdate;
			//从第一帧开始，持续20帧，移动的距离为300px，开始的位置为0
			n ? t : n = 0;
			b ? b : b = 0;
			p ? p : p = 300;
			a ? a : a = 20;
			timeLine['now'] = [];
			ticker = setInterval(function () {
					n <= a ? (function () {
						var degree = tween[A.aniType(type)](n, p, a, b);
						timeLine['now'].push({
							"n" : n,
							"degree" : degree
						});
						onUpdate.call(null,degree);
						n++;
					})()
					 : clearInterval(ticker);
				}, 25) //40帧/秒
		},
		backward : function () {
			var whole = timeLine['now'].length
				if (whole == 0) {
					return
				};
			ticker = setInterval(function () {
					var keyFrame = timeLine['now'].pop();
					(whole - keyFrame['n']) <= whole ? (function () {
						var degree = keyFrame['degree'];
						_self.onUpdate.call(null,degree);
					})()
					 : clearInterval(ticker);
				}, 25) //40帧/秒
		}
	}
	return A
	/*A.exec(0, 300, 20, 20, "line",function(degree){
	document.getElementById('mydiv').style.left = parseInt(degree) + "px";
	});*/
}
	())