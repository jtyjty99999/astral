/**
 * @module node
 *
 * 提供操作节点相关的方法
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('node', function () {
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
	* 去掉节点内部html的标签
	*
	* @param {object HtmlElement} elem node节点
	* @return {object String} 去掉html标签后的字符串
	* @public
	*/
	//此方法有危险会引发注入(去掉script标签后)
	Node.removeHtmlTag = function (elem) {
		elem.innerHTML.replace(/<.+?>/gim, '')
	};
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
	 * @return {object HTMLElement
	 * contentDocument  Firefox 支持，> ie8 的ie支持。可取得子窗口的 document 对象,也可以使用contentWindow.document
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
	var regExpCache = {};
	
	function getRegExpForClassName(className) {
		if (regExpCache[className])
			return regExpCache[className];

		var re = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)");
		regExpCache[className] = re;
		return re;
	}
	function trim(str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	//优化效率
	Node.hasClass = function (node, class_name) {
		var nodeClassName = node.className;
		if (nodeClassName.length === 0)
			return false;
		if (nodeClassName === class_name)
			return true;
		return getRegExpForClassName(class_name).test(nodeClassName);
	};

	Node.addClass = function (node,class_name) {
		if (!Node.hasClass(node, className))
			return node.className += (node.className ? ' ' : '') + class_name;
	};

	Node.removeClass = function (node,class_name) {
		if (Node.hasClass(node,class_name)) {
			return node.className = trim(node.className.replace(getRegExpForClassName(class_name), ' '));
		}
	};
	
	Node.toggleClass(node, class_name) {
		var bool = !Node.hasClass(node, class_name);
		var method = Node[bool ? 'addClass' : 'removeClass'];
		return method(node, class_name);
	}
	
	//节点遍历器
	function mapNode(node, type) {
		var res = [],
			cur = node[type];

		while ( cur && cur.nodeType !== 9 ){
			if ( cur.nodeType === 1 ) {
				res.push( cur );
			}
			cur = cur[type];
		}
		return res;
	};
	
	
	Node.parents = function( node ) {
		return mapNode( node, "parentNode" );
	},
	Node.nextAll = function( node ) {
		return mapNode( node, "nextSibling");
	},
	Node.prevAll =  function( node ) {
		return mapNode( node, "previousSibling");
	}
	/*
	Node.ELEMENT_NODE (1)
	Node.ATTRIBUTE_NODE (2)
	Node.TEXT_NODE (3)
	Node.CDATA_SECTION_NODE (4)
	Node.ENTITY_REFERENCE_NODE(5)
	Node.ENTITY_NODE (6)
	Node.PROCESSING_INSTRUCTION_NODE (7)
	Node.COMMENT_NODE (8)
	Node.DOCUMENT_NODE (9)
	Node.DOCUMENT_TYPE_NODE (10)
	Node.DOCUMENT_FRAGMENT_NODE (11)
	Node.NOTATION_NODE (12)*/
	//ownerDocument这个可以得到节点的根部(document)
	Node.getDocument = function(node){
        return node.nodeType == 9 ? node : node.ownerDocument || node.document;
    }
	//document.defaultView可以得到window 
	//http://msdn.microsoft.com/en-us/library/ie/ms534331%28v=vs.85%29.aspx (parentWindow for IE8)
	Node.getWindow = function(node){
        var doc = Node.getDocument(node);
        return doc.parentWindow || doc.defaultView;
    }
	/**
	 * 清理空白节点
	 * 判断节点的nodeType及nodeValue来清理空节点
	 * @param {object HTMLElement} node
	 * @public
	 */
	
	
	Node.cleanBlank = function(node) {
		var children = node.childNodes,
		blank = null;
		for (var i = 0; i < children.length; i++) {
			blank = children[i];
			if (blank.nodeType == 3 && !(blank.nodeValue.replace(/\s/g, ''))) {
				node.removeChild(blank);
			}
		}
	}
	
	/**
	 * 制造一个dom节点
	 * @param {object String} tagName
	 * @return {object HtmlElement} node
	 * @public
	 */
	
	Node.createNode = function (tagName) {

		var node;
		tagName = tagName.toUpperCase();
		if (tagName == 'TEXT') {
			node = document.createTextNode('');
		} else if (tagName == 'BUFFER') {
			node = document.createDocumentFragment();
		} else {
			node = document.createElement(tagName);
		}
		return node;
	}

		
		
	return Node
})