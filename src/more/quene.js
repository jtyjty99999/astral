 /*队列执行器*/
 /*可以方便的以队列的形式管理要顺序执行的代码*/
 /*jquery callback的简单实现*/

 
 var extend = function (destination, source) {
 	for (var property in source) {
 		destination[property] = source[property];
 	}
 	return destination;
 }
 var quene = function (options) {
 	this.list = [];
 	this.isExeced = false;
 	this.options = {
 		callback : function () {
 			alert('done!')
 		},
 		once : false,
 		stopAtFalse : true,
 		unique : true
 	};
 	extend(this.options, options || {})
 	this.isUnique = function (fn) {
 		var fName = getName(fn);
 		var l = this.list.length,
 		i = 0;
 		for (; i < l; i++) {
 			if (getName(this.list[i]) === fName) {
 				return false
 			}
 		}
 		return true
 	}
 	function getName(fn) {
 		return fn.name || fn.toString().match(/function\s*([^(]*)\(/)[1]
 	}
 };
 quene.prototype.add = function () {
 	var arg = arguments;
 	var l = arg.length,
 	i = 0;
 	if (this.options.unique) { //这个属性我提到外面去了
 		for (; i < l; i++) {
 			this.isUnique(arg[i]) && this.list.push(arg[i]);
 		}
 	} else {
 		for (; i < l; i++) {
 			this.list.push(arg[i]);
 		}
 	}
 }
 quene.prototype.exec = function () {
 	if (this.options.once && this.isExeced)
 		return;
 	while (this.list.length !== 0) {
 		if (this.options.stopAtFalse) {
 			if (this.list[0] && this.list[0].call(this) !== false) {
 				this.list.shift()
 			} else {
 				this.isExeced = true;
 				break
 			};
 		} else {
 			this.list[0] && (this.list[0].call(this), this.list.shift());
 		}
 	}
 	this.options.callback.call(this);
 	this.isExeced = true;
 }
 var a = new quene({
 		callback : callB,
 		once : true
 	});
 function callB() {
 	alert('ok!!!!')
 }
 function a1() {
 	console.log(111)
 }
 function a2() {
 	console.log(222)
 	return false
 }
 function a3() {
 	console.log(333)
 }
 a.add(a1, a2, a3)
 //a.exec()
 var b = new quene({
 		callback : callB,
 		stopAtFalse : false
 	});
 b.add(a1, a2, a3)
 b.exec()