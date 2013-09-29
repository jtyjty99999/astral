/**
 * @module OO
 *
 * come on baby 让我选择你
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('come', function () {
	var comeOnBaby = {};
	/*lowB选择器,
	创建了一个 style 元素，获取styleSheet 属性。开始读写样式表
	addRule，创建一条 CSS 规则，我们传入 CSS 选择器和一个 "a:b","a:b" 其实可以为任意值，只要符合 CSS 值的规范即可
	循环页面中的所有元素,使用currentStyle，通过比对该对象上的 a 属性值是否为 b来确定
	专治各种ie6,7的选择器.
	*/
	function lowBselect(selector) {
    var match = [];
    var style = document.createElement('style');
    document.body.appendChild(style);

    var s = style.styleSheet;
    s.addRule(selector, 'a:b');
    var els = document.getElementsByTagName('*');
	var i = 0,l = els.length;
    for(; i < l; i++) {
        if(els[i].currentStyle.a == 'b') {
            match.push(els[i]);
        }
    }
    return match;
}


	return comeOnBaby
})