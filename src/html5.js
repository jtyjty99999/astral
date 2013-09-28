/**
 * @module newFeature
 *
 * html5 api
 */
define(function () {
	var newFeature = {
	
	
	};
	//http://diveintohtml5.info/everything.html all in one的特性检测
	
	//http://diveintohtml5.info/table-of-contents.html#canvas
	//http://www.html5rocks.com/en/
	
	//拖拽 https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
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
	/* 缓存  https://developer.mozilla.org/zh-CN/docs/HTML/Using_the_application_cache
	window.applicationCache.addEventListener('updateready', function(e) {
  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    window.applicationCache.swapCache();
    if (confirm('A new version of this site is available. Load it?')) {
      window.location.reload();
    }
  }
}, false);
	
	*/
	
	//message与高级应用
	//
	//http://www.ibm.com/developerworks/cn/web/1301_jiangjj_html5message/  
	//http://www.imququ.com/post/ios-none-freeze-timer.html
	
	
	//webworker  
	//http://www.silverna.org/blog/?p=271
	//http://www.cnblogs.com/_franky/archive/2010/11/23/1885773.html
	//http://ucren.com/blog/archives/453  无外链worker
	
	//main.js:
	/*var worker = new Worker('task.js');
	worker.onmessage = function(event) { alert(event.data); };
	worker.postMessage('data');*/
	//task.js:
	/*self.onmessage = function(event) {
	  // Do some work.
	  self.postMessage("recv'd: " + event.data);
	};*/
	
	//桌面推送
	/*if (window.webkitNotifications.checkPermission() == 0) {
	  // you can pass any url as a parameter
	  window.webkitNotifications.createNotification(tweet.picture, tweet.title, 
		  tweet.text).show();
	} else {
	  window.webkitNotifications.requestPermission();//获取推送信息
	}*/
	//https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem  文件系统
	//https://developer.mozilla.org/en-US/docs/WebSockets  websocket
	
	
	//地理定位 https://developer.mozilla.org/zh-CN/docs/WebAPI/Using_geolocation
	/*
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	  console.log(position.coords.latitude, position.coords.longitude)
			
	  }, errorHandler);
	}
*/

/* classList  https://developer.mozilla.org/zh-CN/docs/DOM/element.classList
var el = document.querySelector('#main').classList;
el.add('highlight');
el.remove('shadow');
el.toggle('highlight');

*/
//https://developer.mozilla.org/zh-CN/docs/DOM/Manipulating_the_browser_history  浏览器历史记录


//form data,xmlhttprequest2
//http://99jty.com/?p=1235
//https://developer.mozilla.org/zh-CN/docs/DOM/XMLHttpRequest/FormData/Using_FormData_Objects
//https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications
//https://developer.mozilla.org/zh-CN/docs/DOM/File
//https://developer.mozilla.org/zh-CN/docs/DOM/XMLHttpRequest/Using_XMLHttpRequest

//获取媒体信息 (麦克风摄像头) https://developer.mozilla.org/zh-CN/docs/WebRTC/navigator.getUserMedia 

//创建媒体文件api
//https://developer.mozilla.org/zh-CN/docs/DOM/window.URL.createObjectURL   
//https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications


//匹配媒体查询 https://developer.mozilla.org/en-US/docs/Web/API/window.matchMedia
	
//javascript类型数组	
//http://blog.csdn.net/hfahe/article/details/7421203   

//canvas转文件 
//https://developer.mozilla.org/zh-CN/docs/DOM/HTMLCanvasElement

//performanceapi
//http://www.cnblogs.com/_franky/archive/2011/11/07/2238980.html
	return newFeature
}())