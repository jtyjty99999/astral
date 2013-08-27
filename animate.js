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
	/*此api不稳定，暂时不使用*/
	var clock = (function () {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	})()

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

		exec : function (elem, n, p, a, b, type) {
			//从第一帧开始，持续20帧，移动的距离为300px，开始的位置为0
			n ? t : n = 0;
			b ? b : b = 0;
			p ? p : p = 300;
			a ? a : a = 20;
			timeLine[elem] = [];
			ticker = setInterval(function () {
					n <= a ? (function () {
						var degree = tween[A.aniType(type)](n, p, a, b);
						timeLine[elem].push({
							"n" : n,
							"degree" : degree
						});
						document.getElementById(elem).style.left = parseInt(degree) + "px";
						n++;
					})()
					 : clearInterval(ticker);
				}, 25) //40帧/秒
		},
		backward : function (elem) {
			var whole = timeLine[elem].length
				if (whole == 0) {
					return
				};
			ticker = setInterval(function () {
					var keyFrame = timeLine[elem].pop();
					(whole - keyFrame['n']) <= whole ? (function () {
						var degree = keyFrame['degree'];
						document.getElementById(elem).style.left = parseInt(degree) + "px";
					})()
					 : clearInterval(ticker);
				}, 25) //40帧/秒
		}
	}
	return A
	//A.exec("mydiv", 0, 300, 20, 20, "line");
}
	())