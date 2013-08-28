/**
 * @module node
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
})('Node', function () {
	var Node = {};
	/**
	 * 获得元素的兄弟元素
	 *
	 * @param {object HTMLElement} o
	 * @return {object NodeList}
	 * @public
	 */
	Node.sibling = function (o) {
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
	Node.replaceNode = function (sourceNode, targetNode) {
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
	Node.swapNode = function (NodeFrom, NodeTo) {
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
	Node.setInnerText = function (elem, text) {
		if (typeof elem.textContent == "string") {
			elem.textContent = text
		};
		else {
			elem.innerText = text;
		}
	}
	/**
	 * 获取iframe对象
	 *
	 * @param {object String} id iframe元素id
	 * @return {object HTMLElement}
	 * @public
	 */
	Node.getIframe = function (id) {
		return document.getElementById(id).contentDocument || document.frames[id].document;
	}
	/**
	 * 设置Iframe内容
	 *
	 * @param {object String} id iframe元素id
	 * @param {object String} content
	 * @return null
	 * @public
	 */

	Node.writeIframe = function (id, content) {
		var iObj = Node.getIframe(id);
		iObj.document.designMode = 'On';
		iObj.document.contentEditable = true;
		iObj.document.open();
		iObj.document.writeln(content);
		iObj.document.close();
	}

	var insertAdjacentNode = function (target, swhere, node) {
		switch (swhere) {
		case "beforeBegin":
			target.parentNode.insertBefore(node, target);
			break;
		case "afterBegin":
			target.insertBefore(node, target.firstChild);
			break;
		case "beforeEnd":
			target.appendChild(node);
			break;
		case "afterEnd":
			target.nextSibling ? target.parentNode.insertBefore(node, target.nextSibling) :
			target.parentNode.appendChild(node);
			break;
		}
	}
	/**
	 * 插入html标签
	 *
	 * @param {object String} swhere: 指定插入html标签语句的地方，有四种值可用：
	 * 1. beforeBegin: 插入到标签开始前
	 * 2. afterBegin:插入到标签开始标记之后
	 * 3. beforeEnd:插入到标签结束标记前
	 * 4. afterEnd:插入到标签结束标记后
	 * @param {object String} html
	 * @return null
	 * @public
	 */

	Node.insertAdjacentHTML = function (target, swhere, html) {
		var r = document.createRange();
		r.setStartBefore(target); //这里用selectNode也可以
		var frag = r.createContextualFragment(html);
		insertAdjacentNode(target, swhere, frag);
	}
	Node.insertAdjacentText = function (target, swhere, txt) {
		var textNode = document.createTextNode(txt);
		insertAdjacentNode(target, swhere, textNode);
	}
	/**
	 * 判断节点是否包含另一个节点
	 *
	 * @param {object HTMLElement} a
	 * @param {object HTMLElement} b
	 * @return {object Boolean}
	 * @public
	 */
	Node.contains = function (a, b) {
		return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(arg) & 16);
	}
	/**
	 * 获取节点的嵌套深度,用于测试
	 *
	 * @param {object HTMLElement} a
	 * @return {object Object} 包含嵌套路径path及嵌套深度len
	 * @public
	 */
	//path:"BODY-->DIV-->P-->SPAN-->B",len:5
	Node.deepth = function (el) {
		var tbl = [],
		deepth = 0;
		do {
			tbl.push(el.tagName);
		} while ((el = el.parentNode) && (el !== document.documentElement));
		return {
			path : tbl.reverse().join('-->'),
			len : tbl.length
		}
	}

	Node.isName : function (elem, name) {
		// 忽略大小写
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	return node
}
	())