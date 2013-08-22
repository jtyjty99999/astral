/**
 * @module Position
 *
 * 提供各种尺寸的操作方法(需要添加注释和兼容来源)
 */
define(function () {
	//tester http://jsbin.com/uluq/1
	var Position = {}, doc = document, body = doc.body, html = doc.documentElement;
	var pageXjudge = window.pageXOffset;
	var pageYjudge = window.pageYOffset;
	var clientTop = html.clientTop || body.clientTop || 0,
	clientLeft = html.clientLeft || body.clientLeft || 0;

	Position.getScroll = function () {
		var x = (pageXjudge !== undefined) ? pageXjudge : (html || body.parentNode || body).scrollLeft;
		var y = (pageYjudge !== undefined) ? pageYjudge : (html || body.parentNode || body).scrollTop;
		return {
			'x' : x,
			'y' : y
		}
	}

	Position.getCoords = function (el) {
		var box = el.getBoundingClientRect();
		top = box.top + Position.getScroll.x - clientTop,
		left = box.left + osition.getScroll.y - clientLeft
			return {
			'top' : top,
			'left' : left
		};
	}
	Position.getMousePosition = function (e) {
		return {
			x : e.clientX + Position.getScroll.x,
			y : e.clientY + Position.getScroll.y
		}
	}
	Position.getWholeHeight = function () {
		return body.scrollHeight || html.scrollHeight
	}
	Position.windowHeight = function () {
		return self.innerHeight || html && html.clientHeight || body.clientHeight
	}
	return Position
});