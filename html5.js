/**
 * @module newFeature
 *
 * html5 api
 */
define(function () {
	var newFeature = {
	
	
	};
	
/* 	target.addEventListener("dragover", function(event) {
		event.preventDefault();
	}, false);
	 
	target.addEventListener("drop", function(event) {
	 
		// cancel default actions
		event.preventDefault();
	 
		var i = 0,
			files = event.dataTransfer.files,
			len = files.length;
	 
		for (; i < len; i++) {
			console.log("Filename: " + files[i].name);
			console.log("Type: " + files[i].type);
			console.log("Size: " + files[i].size + " bytes");
			readFile(files[i],'text')
		}
	 
	}, false); */
	//http://makeitsolutions.com/labs/jic/
		/**
	 * 文件读取器
	 *
	 * @param {object Buffer} 文件内容，一般从input控件中取到
	 * @param {object String} 读写方式 
	 * @return null
	 * @public
	 */
	newFeature.readFile= function (f, type,callback) {
  	var reader = new FileReader(); //实例化文件读取器
  	reader.onload = function (evt) { //开始异步读取
		callback.call(this,evt.target.result);
  	}
  	var readType = {
  		text : 'readAsText',
  		binary : 'readAsBinaryString',
  		arrayBuffer : 'readAsArrayBuffer',
  		dataUrl : 'readAsDataURL',
  	}
  	reader[readType[type]](f)
  }
  
  
  
  	 newFeature.Stylesheet = {
  	 	getStyle : function (num) {
  	 		if (typeof num == "number")
  	 			styleSheet = document.styleSheets[num];
  	 		return styleSheet
  	 	},
  	 	getRules = function (num) {
  	 		var styleSheet = this.getStyle(num);
  	 		// Use the W3C property if defined; otherwise use the IE property
  	 		return styleSheet.cssRules ? styleSheet.cssRules : styleSheet.rules;
  	 	},
  	 	getRule : function (num, rule) {
  	 		var rules = this.getRules(num);
  	 		if (!rules)
  	 			return null;
  	 		if (typeof ruleNum == "number")
  	 			return rules[ruleNum];
  	 		// Assume s is a selector
  	 		// Loop backward through the rules so that if there is more than one
  	 		// rule that matches s, we find the one with the highest precedence.
  	 		rule = rule.toLowerCase();
  	 		for (var i = rules.length - 1; i >= 0; i--) {
  	 			if (rules[i].selectorText.toLowerCase() == rule)
  	 				return rules[i];
  	 		}
  	 		return null;
  	 	},
  	 	getStyles : function (num, rule) {
  	 		var rule = this.getRule(num, rule);
  	 		if (rule && rule.style)
  	 			return rule.style;
  	 		else
  	 			return null;
  	 	},
  	 	getStyleText = function (num, rule) {
  	 		var rule = this.getRule(num, rule);
  	 		if (rule && rule.style && rule.style.cssText)
  	 			return rule.style.cssText;
  	 		else
  	 			return "";
  	 	},
  	 	//在某行添加一条css样式
  	 	insertRule : function (num, selector, styles, n) {
  	 		if (n == undefined) {
  	 			var rules = this.getRules(num);
  	 			n = rules.length;
  	 		}
  	 		var styleSheet = this.getStyle(num);
  	 		if (styleSheet.insertRule) // Try the W3C API first
  	 			styleSheet.insertRule(selector + "{" + styles + "}", n);
  	 		else if (styleSheet.addRule) // Otherwise use the IE API
  	 			styleSheet.addRule(selector, styles, n);
  	 	};

  	 	// Remove the rule from the specified position in the stylesheet.
  	 	// If s is a number, delete the rule at that position.
  	 	// If s is a string, delete the rule with that selector.
  	 	// If n is not specified, delete the last rule in the stylesheet.
  	 	Stylesheet.prototype.deleteRule = function (num, s) {
  	 		// If s is undefined, make it the index of the last rule
  	 		if (s == undefined) {
  	 			var rules = this.getRules(num);
  	 			s = rules.length - 1;
  	 		}

  	 		// If s is not a number, look for a matching rule and get its index.
  	 		if (typeof s != "number") {
  	 			s = s.toLowerCase(); // convert to lowercase
  	 			var rules = this.getRules(num);
  	 			for (var i = rules.length - 1; i >= 0; i--) {
  	 				if (rules[i].selectorText.toLowerCase() == s) {
  	 					s = i; // Remember the index of the rule to delete
  	 					break; // And stop searching
  	 				}
  	 			}

  	 			// If we didn't find a match, just give up.
  	 			if (i == -1)
  	 				return;
  	 		}
  	 		var styleSheet = this.getStyle(num);
  	 		// At this point, s will be a number.
  	 		// Try the W3C API first, then try the IE API
  	 		if (styleSheet.deleteRule)
  	 			styleSheet.deleteRule(s);
  	 		else if (styleSheet.removeRule)
  	 			styleSheet.removeRule(s);
  	 	};
	}
	
	return newFeature
});