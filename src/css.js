/**
 * @module Css
 *
 * css api
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('css', function () {
	function () {
		var C = {};

		/**
		 * 动态加载样式
		 *
		 * @param {object String} 插入的样式信息
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
		
	var likeie = 'filters' in document.createElement('div');	

	
	C.setOpacity = function setOpacity(elem, opacity) {
		likeie ? elem.style.filter = 'alpha(opacity=' + opacity + ')' : elem.style.opacity = opacity / 100;
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

	C.fadeOut= function(elem, speed, opacity) {
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
	//获取滚动条宽度，用于计算
	c.getScrollbarWidth=function() {
		var oP = document.createElement('p'),
			styles = {
				width: '100px',
				height: '100px',
				overflowY: 'scroll'
			}, i, scrollbarWidth;
		for (i in styles) oP.style[i] = styles[i];
		document.body.appendChild(oP);
		scrollbarWidth = oP.offsetWidth - oP.clientWidth;
		oP.remove();
		return scrollbarWidth;
	}
	
	//#000000到#ffffff转为十进制后随机再转成十六进制
	C.getRandomColor = function () {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}
		/**
		 * 黄褪效果,用于颜色渐变
		 *
		 * @param {object Function} 当颜色变化时的回调函数
		 * @param {object Float Number} 开始颜色
		 * @param {object Float Number} 结束颜色
		 * @param {object Float Number} 持续时间
		 * @return {object Object}
		 * @public
		 */	
	C.YFTfade = function(onchange, startcolour, endcolour, time_elapsed) {
        var interval = 40;
        var steps = time_elapsed / interval;
        var red_change = (startcolour[0] - endcolour[0]) / steps;
        var green_change = (startcolour[1] - endcolour[1]) / steps;
        var blue_change = (startcolour[2] - endcolour[2]) / steps;
        var currentcolour = startcolour;
        var stepcount = 0;
        var timer = setInterval(function(){
			onchange('rgb(' + currentcolour.toString() + ')');
            currentcolour[0] = parseInt(currentcolour[0] - red_change);
            currentcolour[1] = parseInt(currentcolour[1] - green_change);
            currentcolour[2] = parseInt(currentcolour[2] - blue_change);
            stepcount += 1;
            if (stepcount >= steps) {
               onchange('rgb(' + endcolour.toString() + ')');
                clearInterval(timer);
            }
        }, interval);
    }
	
	
	/**
	 * 设置元素样式
	 * 通过判断div元素的filters属性来判断是否是ie浏览器，使用alpha设置滤镜，使用styleFloat设置浮动。
	 * @param {Element} node
	 * @param {String} property
	 * @param {String} val
	 */
	
	C.setCss = function(node, property, val){
		if (likeie) {
			switch (property) {
				case "opacity":
					node.style.filter = "alpha(opacity=" + (val * 100) + ")";
					if (!node.currentStyle || !node.currentStyle.hasLayout) {
						node.style.zoom = 1;
					}//让滤镜生效元素必需是有布局的，這在 IE 中为 layout，利用hasLayout 这个属性来判断，当 hasLayout 为 true 時，filter 的效果才能生效。
					break;
				case "float":
					property = "styleFloat";
				default:
					node.style[property] = val;
			}
		}
		else {
			if (property == "float") {//标准浏览器
				property = "cssFloat";
			}
			node.style[property] = val;
		}
	}

	/*解析css声明的工具类*/
	function cssFormat(c){
	  //块级定义
	  var cssBlockDefitionReg = /[^{]*\s*{([^}]*)}\s*/g;
	  var cssBlockDefition;
	 
	  //样式定义
	  var styleDefition;
	  var styleDefitionReg = /([^:\{\}\s]+)\s*:\s*([^;]+);/g;
	  var styleClaration;
	 
	  //拿到块级定义
	  while(cssBlockDefition = cssBlockDefitionReg.exec(c)){
	    //拿到样式定义
	    styleDefition = cssBlockDefition[1];
	 
	    console.log("样式定义块是: " + cssBlockDefition[0]);
	 
	    while(styleClaration = styleDefitionReg.exec(styleDefition)){
	      console.log("属性是： " + styleClaration[1]);
	      console.log("值是： " + styleClaration[2]);
	    }
	 
	    console.log("\n\n");
	  }
	}
	//var css = "body{color: red; font-size: 12px;} .banner{ width: 12px; height: 16px; background: url(img/banner.png);}";

	//cssFormat(css);
	
	
	/**
	 * 获取元素样式
	 *
	 * @param {Element} node
	 * @param {String} property
	 */
	C.getCss =function(node,property){
	
	if (likeie) {
			switch (property) {
				// 透明度
				case "opacity":
					var val = 100;
					try {
						val = node.filters['DXImageTransform.Microsoft.Alpha'].opacity;
					}
					catch (e) {
						try {
							val = node.filters('alpha').opacity;
						} 
						catch (e) {
						}
					}
					return val / 100;
				// 浮动
				case "float":
					property = "styleFloat";
				default:
					var value = node.currentStyle ? node.currentStyle[property] : null;
					return (node.style[property] || value);
			}
		}
		else {
			// 浮动
			if (property == "float") {
				property = "cssFloat";
			}
			// 获取集合
			try {
				var computed = document.defaultView.getComputedStyle(node, "");
			} 
			catch (e) {}
			return node.style[property] || computed ? computed[property] : null;
		}
	}
		return C
	})
