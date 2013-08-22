##Function 1: Object.create
这是一个很重要的改动，现在我们终于可以得到一个原型链干净的对象了。以前要创建一个类
	function Cat(name) {  
		this.name   = name;                                                                                   
		this.paws   = 4;  
		this.hungry = false;  
		this.eaten  = [];  
	}  
	Cat.prototype = {  
		constructor : Cat,  
		play        : function () { this.hungry = true; return 'playing!'; },  
		  feed        : function (food) { this.eaten.push(food); this.hungry = false; },  
		speak       : function () { return 'Meow'; }  
	};  
 必须要分两步走，但是现在可以不必了
 
	var Dog = {  
		name   : 'dog',  
		paws   : 4,  
		hungry : false,  
		eaten  : null,  
		play   : function () { this.hungry = true; return 'playing!'; },  
		speak  : function () { return 'Woof!'; }  
	};  
	var dog = Object.create(Dog);  
	
 Object.create他还有第2个参数，是一个properties descriptor object ，关于这方面的详细解释，请看第2点。

另外：如果浏览器不支持Object.create，可以用这种方法代替
 
	if (typeof Object.create !== 'function') {  
		Object.create = function (o) {  
			function F() {}  
			F.prototype = o;  
			return new F();  
		};  
	}  
	
 Browser Support
   ○　Firefox 4
   ○　Internet Explorer 9
   ○　Safari 5
   ○　Chrome 5+
 
 
##Function 2: Object.defineProperty
 
如果你想为一个对象定义属性，那么就必须my_dog.age = 2; 用这种方法。但是在ECMAScript5中，提供了更好的包装方法Object.defineProperty
Parameters:
1.对象引用
2.属性名
3.修饰对象
修饰对象中的定义如下：
●　value: use this to set the value of a property. Defaults to undefined.
●　writable: use this boolean to define whether this is a read-only variable. If it’s writable, it’s true. Defaults to false.
●　configurable: use this boolean to define whether the type (value vs. method) of this property can be changed, or whether the property can be deleted. If it’s configurable, it’s true. Defaults to false.
●　enumerable: use this boolean to define whether this property is included when the properties of the object are enumerated (a for-in loop or the keys method). Defaults to false.
●　get: use this to define a custom getter method. Defaults to undefined.
●　set: use this to define a custom setter method. Defaults to undefined.
 
Sample:

	var Dog = {  
		name   : 'dog',  
		paws   : 4  
	};  
	var dog = Object.create(Dog);  
	  
	Object.defineProperty(dog, 'age', {  
		set : function (age) { this.humanYears = age * 7; },  
		get : function () { return this.humanYears / 7; },  
		enumerable : true  
	});  
	  
	dog.age = 2;  
	dog.humanYears; // 14  
	
 以上代码让age和humanYears保存了同步，如果你不想对外界暴露humanYears，可以这样使用闭包:
 

	Object.defineProperty(dog, 'age', (function () {  
		var humanYears;  
	  
		return {  
			set : function (age) { humanYears = age * 7; },  
			get : function () { return humanYears / 7; },  
			enumerable : true  
		};  
	  
	}()));  
	
 当然，也可以用在Object.create方法上面

 
	var yourDog = Object.create(Dog, {  
		age : {  
			get : function () { /* . . . */ },  
			set : function () { /* . . . */ },  
			enumerable: true  
		},  
		gender : {  
			value : 'female'  
		}  
	});  
	
 Browser Support
   ○　Firefox 4
   ○　Internet Explorer 9
   ○　Safari 5
   ○　Chrome 5+
 
 
##Function 3: Object.defineProperties
当然，如果你想像Object.create方法那样一口气给对象加入很多属性的话，你可以用Object.defineProperties方法
 

	Object.defineProperties(dog, {  
		age : {  
			get : function () { /* . . . */ },  
			set : function () { /* . . . */ },  
			enumerable: true  
		},  
		gender : {  
			value : 'female'  
		}  
	});  
	
 注意区别 Object.create和Object.defineProperties第一个参数的不同，Object.create是prototype，而Object.defineProperties是对象

Browser Support
   ○　Firefox 4
   ○　Internet Explorer 9
   ○　Safari 5
   ○　Chrome 5+
   
##Function 4: Object.getOwnPropertyDescriptor
用途：得到一个属性的定义
 
 
	var person = { name : 'Joe' };  
	Object.getOwnPropertyDescriptor(person, 'name'); // { configurable : true,enumerable : true, value : 'Joe&', writable : true }  
	 
	 
但是这个函数只能适用于函数自身的对象，并不能取得原型链上的属性
Browser Support
○　Firefox 4
○　Internet Explorer 9
○　Safari 5
○　Chrome 5+
 
##Function 5: Object.keys
用途：取得所有的属性名
 

	var horse = { name : 'Ed', age : 4, job : 'jumping', owner : 'Jim' };  
	var horseKeys = Object.keys(horse); // ['name', 'age', 'job', 'owner'];  
 
 
Browser Support
○　Firefox 4
○　Internet Explorer 9
○　Safari 5
○　Chrome 5+
 
 
##Function 6: Object.getOwnPropertyNames

此函数功能基本和第5点相同，但是她可以取得所有的属性名，即使那个属性是不可枚取的(属性的enumerable =false，详细请参照第2点)
Browser Support
○　Firefox 4
○　Internet Explorer 9
○　Safari 5
○　Chrome 5+
 
##Function 7: Object.preventExtensions / Object.isExtensible

这个函数能把一个对象的属性锁住，让他不能扩展。
 
 
	var product = { name : 'Foobar', rating : 3.5 };  
	Object.isExtensible(product); // true  
	Object.preventExtentions(product);  
	Object.isExtensible(product); // false  
	product.price = '$10.00'; // doesn't work  
	product.price; // undefined  
	
 但是仅仅只是不能增加属性，他的值仍然是可以改的，而且这个属性也能够被delete
Browser Support
○　Firefox 4
○　Internet Explorer 9
○　Chrome 6+
 
##Function 8: Object.seal / Object.isSealed
 
Seal一个对象意味着你无法增加删除属性，也无法把已经定义好的属性值指向一个accessor （a method or
function)，反过来也是一样
 
 
	var pet = { name : 'Browser', type : 'dog' };  
	Object.seal(pet);  
	pet.name = 'Oreo';  
	pet.age = 2; // doesn't work  
	pet.type = function () { /**/ }; // doesn't work  
	delete pet.name; // doesn't work  
	
 Browser Support
○　Firefox 4
○　Internet Explorer 9
○　Chrome 6+
 
##Function 9: Object.freeze / Object.isFrozen
freeze一个对象，意味着你不能通过任何手段修改对象内容，他变成了完全只读的
 

	var obj = { greeting : 'Hi!' };  
	Object.freeze(obj);  
	Object.isFrozen(obj); // true  
 
 
Browser Support
○　Firefox 4
○　Internet Explorer 9
○　Chrome 6+
 
##Function 10: Array.isArray
很显然，这是一个判断是否是数组的函数
 
	var names = ['Collis', 'Cyan'];  
	Array.isArray(names); // true  
	
 Browser Support
○　Firefox 4
○　Internet Explorer 9
○　Safari 5
○　Chrome 5+
○　Opera 10.5+

##Function 11: Date.prototype.toJSON

提供了从Date类型转成json的方法。

	new Date().toJSON(); // "2010-12-06T16:25:40.040Z"  
 
##Function 12: Function.prototype.bind

你会发现这个函数的功能和下面的很相似


	var arr1 = ['1', '2', '3'],  
	arr2 = ['4', '5', '6'];  
	// 等同于arr1.push(arr2);  
	Array.prototype.push.apply(arr1, arr2);  
	alert(arr1);  
	
 bind和上面的不同之处在于apply是直接执行的，而bind只是绑定函数内部的this，并且将函数返回

 
	var tooltip = { text: 'Click here to . . . ' },  
	overlay = { text: 'Please enter the number of attendees' };  
	function showText () {  
		 // really, do something more useful here  
		 alert(this.text);  
	}  
	tooltip.show = showText.bind(tooltip);  
	tooltip.show();  
	overlay.show = showText.bind(overlay);  
	overlay.show();  
	
 Browser Support
○　Firefox 4
○　Internet Explorer 9
○　Chrome 7+
 
##Function 13: Date.now()
大致这个函数就是等同于new Date().getTime() or +new Date，不是什么大的改动
 
##Function 14: Object.getPrototypeOf
这个函数提供了从通过Object.create得到的对象中提取原型的方法，当然，如果这个对象是通过老的new
function的方法创造出来的，那也可以通过这个方法得到原型
 
 
	var Dog = {  
		 name : 'dog',  
		 paws : 4,  
		 hungry : false,  
		 speak : function () { return 'Woof!'; }  
	};  
	var dog = Object.create(Dog);  
	// true  
	alert(Object.getPrototypeOf(dog) === Dog);  
	// 老方法判断  
	function Cat() {}  
	// true  
	alert(Object.getPrototypeOf(new Cat()) === Cat.prototype);  
 
##Function 15: String.prototype.trim
用来去除字符串两边的空格

	var origin = " foo ";  
	document.write(origin.trim());  
 
##Function 16: Array.prototype.indexOf
这个函数用来返回查找的对象在数组中第一次出现的index
他有两个参数，第一个参数是要查找的对象，第二个参数是查找的起始位置

	var array = [2, 5, 9];  
	var index = array.indexOf(2);  
	// index is 0  
	index = array.indexOf(7);  
	// index is -1  
	var element = 5;  
	var indices = [];  
	var idx = array.indexOf(element);  
	while (idx != -1) {  
		  indices.push(idx);  
		  idx = array.indexOf(element, idx + 1);  
	}  
 当然如果浏览器没有支持indexOf，你可以用以下方法实现
 

	if (!Array.prototype.indexOf) {  
		  Array.prototype.indexOf = function(searchElement /*, fromIndex */) {  
				"use strict";  
				if (this === void 0 || this === null)  
					  throw new TypeError();  
				var t = Object(this);  
				var len = t.length >>> 0;  
				if (len === 0)  
					  return -1;  
				var n = 0;  
				if (arguments.length > 0) {  
					  n = Number(arguments[1]);  
					  if (n !== n)  
							n = 0;  
					  else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))  
							n = (n > 0 || -1) * Math.floor(Math.abs(n));  
				}  
				if (n >= len)  
					  return -1;  
				var k = n >= 0  
							? n : Math.max(len - Math.abs(n), 0);  
				for (; k < len; k++) {  
					  if (k in t && t[k] === searchElement)  
							return k;  
				}  
				return -1;  
		  };  
	}  
 
##Function 17: Array.prototype.lastIndexOf

用法和16相似，取得最后一次出现的index
如果浏览器没有实现此方法，你可以通过这种方式实现
 
 
	if (!Array.prototype.indexOf) {  
		  Array.prototype.indexOf = function(searchElement /*, fromIndex */) {  
				"use strict";  
	  
				if (this === void 0 || this === null)  
					throw new TypeError();  
	  
				var t = Object(this);  
				var len = t.length >>> 0;  
				if (len === 0)  
					return -1;  
	  
				var n = 0;  
				if (arguments.length > 0) {  
					n = Number(arguments[1]);  
					if (n !== n)  
						n = 0;  
					else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))  
						n = (n > 0 || -1) * Math.floor(Math.abs(n));  
				}  
	  
				if (n >= len)  
					return -1;  
	  
				var k = n >= 0  
						? n : Math.max(len - Math.abs(n), 0);  
	  
				for (; k < len; k++) {  
					if (k in t && t[k] === searchElement)  
					return k;  
				}  
				return -1;  
		  };  
	}  
  
##Function 18: Array.prototype.every
 
对于数组中的每一项都执行某个callback function,这个function的参数为当前数组元素，当前元素index，整个数组。当function中返回为false的时候，停止循环数组。仅当返回为true的时候继续循环
 

	function isBigEnough(element, index, array) {  
		return (element >= 10);  
	}  
	var passed = [12, 5, 8, 130, 44].every(isBigEnough);  
	// passed is false  
	passed = [12, 54, 18, 130, 44].every(isBigEnough);  
	// passed is true  
 
 当浏览器没有实现此方法时，可以用以下方式代替
 

	if (!Array.prototype.every) {  
		Array.prototype.every = function(fun /*, thisp */) {  
				"use strict";  
	  
				if (this === void 0 || this === null)  
					  throw new TypeError();  
	  
				var t = Object(this);  
				var len = t.length >>> 0;  
				if (typeof fun !== "function")  
					   throw new TypeError();  
	  
				var thisp = arguments[1];  
				for (var i = 0; i < len; i++) {  
						if (i in t && !fun.call(thisp, t[i], i, t))  
							return false;  
				}  
	  
				return true;  
		};  
	}  
 
 
 
##Function 19: Array.prototype.some
大致意思和every有些相似，当数组中有一个元素符合要求，就会返回true。所以callback中，一旦返回true，就不再循环，返回false则继续循环。
 

	function isBigEnough(element, index, array) {  
	  return (element >= 10);  
	}  
	var passed = [2, 5, 8, 1, 4].some(isBigEnough);  
	// passed is false  
	passed = [12, 5, 8, 1, 4].some(isBigEnough);  
	// passed is true  
 
 
 
当浏览器不支持的时候，你可以用以下代码代替
 
 
	if (!Array.prototype.some) {  
		Array.prototype.some = function(fun /*, thisp */) {  
				"use strict";  
	  
				if (this === void 0 || this === null)  
						throw new TypeError();  
	  
				var t = Object(this);  
				var len = t.length >>> 0;  
				if (typeof fun !== "function")  
						throw new TypeError();  
	  
				var thisp = arguments[1];  
				for (var i = 0; i < len; i++) {  
				if (i in t && fun.call(thisp, t[i], i, t))  
					return true;  
				}  
	  
				return false;  
		};  
	}  
 
 
 
##Function 20: Array.prototype.forEach
 
此函数对数组的所有元素循环执行一个callback function
 
 
		   function printElt(element, index, array) {  
		print("[" + index + "] is " + element); // assumes print is already defined  
	}  
	[2, 5, 9].forEach(printElt);  
	// Prints:  
	// [0] is 2  
	// [1] is 5  
	// [2] is 9  
 
 当浏览器没有实现的时候，你可以通过如下方法代替
 
 
 
	if (!Array.prototype.forEach) {  
		Array.prototype.forEach = function(fun /*, thisp */) {  
				"use strict";  
	  
				if (this === void 0 || this === null)  
						throw new TypeError();  
	  
				var t = Object(this);  
				var len = t.length >>> 0;  
				if (typeof fun !== "function")  
						throw new TypeError();  
	  
				var thisp = arguments[1];  
				for (var i = 0; i < len; i++) {  
				if (i in t)  
					fun.call(thisp, t[i], i, t);  
				}  
		};  
	}  
 
 
##Function 21: Array.prototype.map

循环数组每个元素，用于执行callback，之后返回循环结果作为一个新数组，而原数组不变.
Sample1:
 
	function makePseudoPlural(single) {  
		return single.replace(/o/g, "e");  
	}  
	  
	var singles = ["foot", "goose", "moose"];  
	var plurals = singles.map(makePseudoPlural);  
	// plurals is ["feet", "geese", "meese"]  
	// singles is unchanged<span style="white-space: normal;"> </span>  
 
Sample2
 
 
	var numbers = [1, 4, 9];  
	var roots = numbers.map(Math.sqrt);  
	// roots is now [1, 2, 3]  
	// numbers is still [1, 4, 9]  
	
如果浏览器没有实现，则可以用如下方法代替
 
	if (!Array.prototype.map) {  
		Array.prototype.map = function(fun /*, thisp */) {  
				"use strict";  
	  
				if (this === void 0 || this === null)  
					  throw new TypeError();  
	  
				var t = Object(this);  
				var len = t.length >>> 0;  
				if (typeof fun !== "function")  
					  throw new TypeError();  
	  
				var res = new Array(len);  
				var thisp = arguments[1];  
			for (var i = 0; i < len; i++) {  
					   if (i in t)  
							 res[i] = fun.call(thisp, t[i], i, t);  
			}  
	  
			return res;  
	};  
	 
 
 
##Function 22: Array.prototype.filter
 
从数组中筛选出符合callback条件的元素，如果callback中返回true，则此元素会被加入到新数组中
 
	function isBigEnough(element, index, array) {  
		return (element >= 10);  
	}  
	// 12, 130, 44  
	var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);  
 
 如果浏览器没有实现，则可以用如下方式代替:
 
	if (!Array.prototype.filter) {  
		Array.prototype.filter = function(fun /*, thisp */) {  
			"use strict";  
	  
				if (this === void 0 || this === null)  
						throw new TypeError();  
	  
				var t = Object(this);  
				var len = t.length >>> 0;  
				if (typeof fun !== "function")  
						throw new TypeError();  
	  
				var res = [];  
				var thisp = arguments[1];  
				for (var i = 0; i < len; i++) {  
						if (i in t) {  
						var val = t[i]; // in case fun mutates this  
						if (fun.call(thisp, val, i, t))  
							res.push(val);  
					}  
			}  
			return res;  
		};  
	}  
 
 
##Function 23: Array.prototype.reduce
 
这个函数有两个参数，第一个为callback function，第二个为初始值。
Callback function的格式为:

	.reduce(function(previousValue, currentValue, index, array){ // ...})
 
 
如果没有设置初始值， previousValue从第一个元素开始， currentValue从第二个元素开始循环。 总共循环Array.prototype.length – 1次。如果设置了初始值，previousValue从初始值开始，currentValue从第一个元素开始循环。 总共循环Array.prototype.length次。 最后返回最后一次callback function调用的结果. Sample:


	var total = [0, 1, 2, 3].reduce(function(a, b){ return a + b; });  
	// total == 6  
	  
	var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {  
		return a.concat(b);  
	});  
	// flattened is [0, 1, 2, 3, 4, 5]  
 
 

	if (!Array.prototype.reduce) {  
		Array.prototype.reduce = function(fun /*, initialValue */) {  
				"use strict";  
	  
				if (this === void 0 || this === null)  
					   throw new TypeError();  
	  
			var t = Object(this);  
				var len = t.length >>> 0;  
				if (typeof fun !== "function")  
					   throw new TypeError();  
	  
				// no value to return if no initial value and an empty array  
				if (len == 0 && arguments.length == 1)  
					   throw new TypeError();  
	  
				var k = 0;  
				var accumulator;  
				if (arguments.length >= 2) {  
					   accumulator = arguments[1];  
				} else {  
					   do {  
						if (k in t) {  
							accumulator = t[k++];  
							break;  
						}  
	  
						// if array contains no values, no initial value to return  
							if (++k >= len)  
							throw new TypeError();  
						} while (true);  
				}  
	  
				while (k < len) {  
						if (k in t)  
						accumulator = fun.call(undefined, accumulator, t[k], k, t);  
						k++;  
				}  
	  
				return accumulator;  
		};  
	}  
	 
 
 
##Function 24: Array.prototype.reduceRight
 
这个函数有两个参数，第一个为callback function，第二个为初始值。
 
Callback function的格式为:

	.reduce(function(previousValue, currentValue, index, array){ // ... })
 
 
如果没有设置初始值， previousValue从最后一个元素开始， currentValue从倒数第二个元素开始循环。 总共循环Array.prototype.length – 1次。 如果设置了初始值，previousValue从初始值开始，currentValue从最后一个元素开始循环。 总共循环Array.prototype.length次。 最后返回最后一次callback function调用的结果.
Sample：


	var total = [0, 1, 2, 3].reduceRight(function(a, b) { return a + b; });  
	//total == 6  
	  
	var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {  
		return a.concat(b);  
	}, []);  
	// flattened is [4, 5, 2, 3, 0, 1]  
	
 如果浏览器没有实现，则可以用如下代码代替

 
	if (!Array.prototype.reduceRight) {  
		Array.prototype.reduceRight = function(callbackfn /*, initialValue */) {  
				"use strict";  
	  
				if (this === void 0 || this === null)  
						throw new TypeError();  
	  
				var t = Object(this);  
				var len = t.length >>> 0;  
				if (typeof callbackfn !== "function")  
						throw new TypeError();  
	  
				// no value to return if no initial value, empty array  
				if (len === 0 && arguments.length === 1)  
						throw new TypeError();  
	  
				var k = len - 1;  
				var accumulator;  
				if (arguments.length >= 2) {  
						accumulator = arguments[1];  
				} else {  
						do {  
							if (k in this) {  
							accumulator = this[k--];  
							break;  
						}  
	  
						// if array contains no values, no initial value to return  
							if (--k < 0)  
									throw new TypeError();  
						 } while (true);  
				}  
	  
				while (k >= 0) {  
						  if (k in t)  
						accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);  
						  k--;  
				}  
	  
			return accumulator;  
		};  
	}  