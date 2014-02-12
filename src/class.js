/**
 * @module OO
 *
 * 提供操作节点相关的方法
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('OO', function () {
	var OO = {};
	//纠结啊。。
//http://aralejs.org/class/docs/competitors.html
//http://www.cnblogs.com/enein/archive/2012/12/03/2799160.html#2568934
//http://www.cnblogs.com/enein/archive/2012/08/23/2651312.html
//http://blog.jobbole.com/38614/
//http://lodash.com/docs#at

  OO.keys = function(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  };
  OO.values = function(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
  };

	return OO
}
	())
