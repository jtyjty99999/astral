/**
 * @module node
 *
 * 提供操作节点相关的方法
 */
define(function () {
	var Node = {};
	/**
	 * 获得元素的兄弟元素
	 *
	 * @param {object HTMLElement} o
	 * @return {object NodeList}
	 * @public
	 */
	Node.sibling=function(o){
		var a = []; 
		var p = o.previousSibling;
		while (p) { 
			if (p.nodeType === 1) {
				a.push(p);
			}
			p = p.previousSibling
		}
		a.reverse() 
		var n = o.nextSibling; 
		while (n) {
			if (n.nodeType === 1) {
				a.push(n);
			}
			n = n.nextSibling;
		}
		return a 
	}
	/**
	 * 替换元素节点
	 *
	 * @param {object HTMLElement} sourceNode 原始节点
	 * @param {object HTMLElement} targetNode 替换后节点
	 * @return null
	 * @public
	 */
	Node.replaceNode = function (sourceNode,targetNode) {
		sourceNode.parentNode.replaceChild(targetNode, sourceNode);
	}
	/**
	 * 交换元素节点
	 *
	 * @param {object HTMLElement} NodeFrom
	 * @param {object HTMLElement} NodeTo
	 * @return null
	 * @public
	 */
	Node.swapNode = function (NodeFrom,NodeTo) {
		var nextSibling = NodeFrom.nextSibling;
		var parentNode = NodeFrom.parentNode;
		node.parentNode.replaceChild(NodeFrom, NodeTo);
		parentNode.insertBefore(NodeTo, nextSibling);
	}
	/**
	 * 删除元素节点
	 *
	 * @param {object HTMLElement} _element
	 * @return null
	 * @public
	 */
	Node.rmnode = function removeElement(_element) {
		var parentElement = _element.parentNode;
		if (parentElement) {
			parentElement.removeChild(_element);
		}
	}
	
	
	/**
	 * 获取节点内文本
	 *
	 * @param {object HTMLElement} elem
	 * @return {object String}
	 * @public
	 */
	Node.getInnerText = function (elem) {
		return (typeof elem.textContent == "string") ? elem.textContent : elem.innerText;
	}
	/**
	 * 设置节点内文本
	 *
	 * @param {object HTMLElement} elem
	 * @param {object String} text
	 * @return {object HTMLElement} 设置完毕后的节点
	 * @public
	 */
	Node.setInnerText = function(elem, text) {
		if (typeof elem.textContent == "string") {
			elem.textContent = text
		};
		else {
			elem.innerText = text;
		}
	}
	return node
});