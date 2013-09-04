/**
 * @module Css
 *
 * css api
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('Css', function () {
	function () {
		var C = {};

		/**
		 * 动态加载样式
		 *
		 * @param {object Buffer} 文件内容，一般从input控件中取到
		 * @param {object String} 读写方式
		 * @return null
		 * @public
		 */
		C.dynamicInsertCss = function (cssContent) {
			var style = document.createElement("style");
			(document.getElementsByTagName("head")[0] || document.body).appendChild(style);
			if (style.styleSheet) { //for ie
				style.styleSheet.cssText = cssContent;
			} else { //for w3c
				style.appendChild(document.createTextNode(cssContent));
			}
		}
		/**
		 * 利用样式规则覆盖样式，通常用于很难修改的css样式，比如伪类
		 *
		 * @param {object String} 选择器
		 * @param {object String} css内容
		 * @return null
		 * @public
		 */
		C.addCssRule = function (filter, cssText) {
			var styleSheet = document.styleSheets[0];
			if (styleSheet.addRule) {
				styleSheet.addRule(filter, cssText);
			} else {
				styleSheet.insertRule(filter + "{" + cssText + "}", styleSheet.cssRules.length);
			}
		}

		/**这个函数主要是把rgb颜色转为hex颜色**/
		function toHex(r, g, b) {
			Pr = r.toString(16).length == 1 ? (0 + r.toString(16)) : r.toString(16)
				Pg = g.toString(16).length == 1 ? (0 + g.toString(16)) : g.toString(16)
				Pb = b.toString(16).length == 1 ? (0 + b.toString(16)) : b.toString(16)
				return Pr + Pg + Pb
		}
		/**
		 * 转换颜色
		 *
		 * @param {object String} 色值
		 * @param {object Float Number} 透明度
		 * @return {object Object}
		 * @public

		 *console.log(parseColor('#ffffff',1))
		 *console.log(parseColor('#fff',0.5))
		 *console.log(parseColor('#000000',0.3))
		 *console.log(parseColor('rgb(122,34,214)',0.2))
		 */
		C.parseColor = function (val, op) { //接收两个参数：颜色值跟透明度
			var r,
			g,
			b,
			op = op || 1,
			hex,
			filter; //我们利用var 多个变量名逗号的方式定义多个变量
			// 默认rgb
			if (/r/.test(val)) { //抽出rgb
				var arr = val.match(/\d+/g);
				r = parseInt(arr[0]);
				g = parseInt(arr[1]);
				b = parseInt(arr[2]);
				op = op;
				hex = '#' + toHex(r, g, b); //转到hex方法，拿到hex颜色。
				filter = '#' + Math.floor(op * 255).toString(16) + toHex(r, g, b);
			}
			// 进制转换
			else if (/#/.test(val)) {
				hex = val
					var len = val.length;
				// #ffffff
				if (len === 7) { //输入的是七位#ffffff 那么利用slice方法，每两位分组。去掉前面的#
					r = parseInt(val.slice(1, 3), 16);
					g = parseInt(val.slice(3, 5), 16);
					b = parseInt(val.slice(5), 16);
					op = op;
					filter = '#' + Math.floor(op * 255).toString(16) + toHex(r, g, b);

				}
				// #fff
				else if (len === 4) { //输入的是四位#fff 那么利用charAt方法，每一位分组，补全成两位，去掉前面的#
					r = parseInt(val.charAt(1) + val.charAt(1), 16);
					g = parseInt(val.charAt(2) + val.charAt(2), 16);
					b = parseInt(val.charAt(3) + val.charAt(3), 16);
					op = op;
					filter = '#' + Math.floor(op * 255).toString(16) + toHex(r, g, b);

				}

			} else { //容错
				alert('颜色格式不正确,请重新输入');

			}
			return { //这里我们的结果返回了一个对象。可以利用对象+属性名即可取到
				'r' : r,
				'g' : g,
				'b' : b,
				'op' : op,
				'hex' : hex,
				'filter' : filter
			}
		};
		
	C.setOpacity = function setOpacity(elem, opacity) {
		elem.filters ? elem.style.filter = 'alpha(opacity=' + opacity + ')' : elem.style.opacity = opacity / 100;
	}
	C.fadeIn = function(elem, speed, opacity) {
		speed = speed || 20;
		opacity = opacity || 100;
		elem.style.display = 'block';
		C.setOpacity(elem, 0);
		var val = 0;
		(function () {
			C.setOpacity(elem, val);
			val += 5;
			if (val <= opacity) {
				setTimeout(arguments.callee, speed)
			}
		})();
	}

	C.fadeOut(elem, speed, opacity) {
		speed = speed || 20;
		opacity = opacity || 0;
		var val = 100;
		(function () {
			$.setOpacity(elem, val);
			val -= 5;
			if (val >= opacity) {
				setTimeout(arguments.callee, speed);
			} else if (val < 0) {
				elem.style.display = 'none';
			}
		})();
	}
	//#000000到#ffffff转为十进制后随机再转成十六进制
	C.getRandomColor = function () {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

		return C
	}())