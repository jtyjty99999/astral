/**
 * @module Tester
 *
 * 测试工具库,提供测试用方法
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('Tester', function () {
	var T = {};
		T.assert:{
		isBoolean:function(G){
			return (typeof G === 'boolean');
		},
		isNumber:function(G){
			return (typeof G === 'number' && isFinite(G));
		},
		isString:function(G){
			return (typeof G === 'string');
		},
		isFunction:function(G){
			var A = {};
			return (A.toString.apply(G) === A.toString.apply(Function));
		},
		isObject:function(G){
			return (G && (typeof G === 'object' || this.isFunction(G)) || false);
		},
		isNode:function(G){
			if(!G){return false;}
			var sType = G.nodeType,bRet = true;
			if(!sType){return false;}
			try{G.nodeType = Math.random();}catch(e){return true;}
			bRet = (sType===G.nodeType);
			if(!bRet){G.nodeType = sType;}
			return bRet;
		},
		isHTMLElementNode:function(G){
			if(!this.isNode(G)){return false;}
			return (G.innerHTML===undefined)?false:true;
		}
	}
	return T
})