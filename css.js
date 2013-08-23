/**
 * @module Css
 *
 * css api
 */
define(function () {
	var Css = {
	
	
	};
	

	
	
	/**
	 * 动态加载样式
	 *
	 * @param {object Buffer} 文件内容，一般从input控件中取到
	 * @param {object String} 读写方式 
	 * @return null
	 * @public
	 */
	 Css.dynamicInsertCss = function (cssContent) {
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
	Css.addCssRule=function(filter, cssText) {
		var styleSheet = document.styleSheets[0];
		if (styleSheet.addRule) {
			styleSheet.addRule(filter, cssText);
		} else {
			styleSheet.insertRule(filter+"{" + cssText + "}", styleSheet.cssRules.length);
		}
	}
	 
	 
	 
	 
	 CSS.Stylesheet = {
	 getStyle:function(num){
	 		if (typeof num == "number") styleSheet = document.styleSheets[num];
			return styleSheet
	 },
	 getRules = function(num) {
	 var styleSheet = this.getStyle(num);
    // Use the W3C property if defined; otherwise use the IE property
    return styleSheet.cssRules?styleSheet.cssRules:styleSheet.rules;
},
getRule : function(num,rule) {
    var rules = this.getRules(num);
    if (!rules) return null;
    if (typeof ruleNum == "number") return rules[ruleNum];
    // Assume s is a selector
    // Loop backward through the rules so that if there is more than one
    // rule that matches s, we find the one with the highest precedence.
    rule = rule.toLowerCase();
    for(var i = rules.length-1; i >= 0; i--) {
        if (rules[i].selectorText.toLowerCase() == rule) return rules[i];
    }
    return null;
},
getStyles : function(num,rule) {
    var rule = this.getRule(num,rule);
    if (rule && rule.style) return rule.style;
    else return null;
	 },
	 getStyleText = function(num,rule) {
    var rule = this.getRule(num,rule);
    if (rule && rule.style && rule.style.cssText) return rule.style.cssText;
    else return "";
},
//在某行添加一条css样式
insertRule : function(num,selector, styles, n) {
    if (n == undefined) {
        var rules = this.getRules(num);
        n = rules.length;
    }
	var styleSheet = this.getStyle(num);
    if (styleSheet.insertRule)   // Try the W3C API first
        styleSheet.insertRule(selector + "{" + styles + "}", n);
    else if (styleSheet.addRule) // Otherwise use the IE API
        styleSheet.addRule(selector, styles, n);
};

// Remove the rule from the specified position in the stylesheet.
// If s is a number, delete the rule at that position.
// If s is a string, delete the rule with that selector.
// If n is not specified, delete the last rule in the stylesheet.
Stylesheet.prototype.deleteRule = function(num,s) {
    // If s is undefined, make it the index of the last rule
    if (s == undefined) {
        var rules = this.getRules(num);
        s = rules.length-1;
    }

    // If s is not a number, look for a matching rule and get its index.
    if (typeof s != "number") {
        s = s.toLowerCase();    // convert to lowercase
        var rules = this.getRules(num);
        for(var i = rules.length-1; i >= 0; i--) {
            if (rules[i].selectorText.toLowerCase() == s) {
                s = i;  // Remember the index of the rule to delete
                break;  // And stop searching
            }
        }

        // If we didn't find a match, just give up.
        if (i == -1) return;
    }
var styleSheet = this.getStyle(num);
    // At this point, s will be a number.
    // Try the W3C API first, then try the IE API
    if (styleSheet.deleteRule) this.ss.deleteRule(s);
    else if (styleSheet.removeRule) this.ss.removeRule(s);
};

	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
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
	 Css.parseColor = function (val, op) { //接收两个参数：颜色值跟透明度
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

	
	return Css
});