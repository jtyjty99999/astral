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
	
	return newFeature
});