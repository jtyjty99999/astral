/**
 * @module Tester
 *
 * 测试工具库,提供测试用方法
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(name, [], definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('tester', function () {
	var T = {};
	T.type = {
		isBoolean : function (G) {
			return (typeof G === 'boolean');
		},
		isNumber : function (G) {
			return (typeof G === 'number' && isFinite(G));
		},
		isString : function (G) {
			return (typeof G === 'string');
		},
		isFunction : function (G) {
			var A = {};
			return (A.toString.apply(G) === A.toString.apply(Function));
		},
		isObject : function (G) {
			return (G && (typeof G === 'object' || this.isFunction(G)) || false);
		},
		isNode : function (G) {
			if (!G) {
				return false;
			}
			var sType = G.nodeType,
			bRet = true;
			if (!sType) {
				return false;
			}
			try {
				G.nodeType = Math.random();
			} catch (e) {
				return true;
			}
			bRet = (sType === G.nodeType);
			if (!bRet) {
				G.nodeType = sType;
			}
			return bRet;
		},
		isHTMLElementNode : function (G) {
			if (!this.isNode(G)) {
				return false;
			}
			return (G.innerHTML === undefined) ? false : true;
		}
	}
	
	

	//判定器,若expr为真则测试通过
	T.asserter = function (message, expr) {

		if (!expr) {
			throw new Error(message)
		}

		return true

	}

	T.printTestResult = function (text, color) {

		var p = document.createElement('p');
		p.innerHTML = text;

		p.style.color = color;

		document.body.appendChild(p);

	}

	T.runTimer = function (name, fn) {

		setTimeout(function () {

			var s = +new Date();

			fn();

			var total = +new Date() - s;

			T.printTestResult(name + '执行了:' + total + '毫秒;', 'green')

		}, 15)

	}
	
	T.execTestCase = function (caseName, cases) {

		var successCases = 0;
		var tested = 0;

		for (var testCase in cases) {
			tested++

			try {

				cases[testCase]();
				T.printTestResult(testCase+' 通过','green');

				successCases++

			} catch (e) {

				T.printTestResult(testCase + ' 未通过,断言为"' + e.message+'"', 'red');

			}

		}
		
		var resColor = successCases==tested?'green':'red';
		T.printTestResult('已经执行了'+tested+'个用例,成功'+successCases+'个',resColor)
	}

	return T
})