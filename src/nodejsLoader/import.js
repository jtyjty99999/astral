	var fs = require('fs');

	//解析import为路径
	function getImport(line) {
		//@import   ('core.dom.get');
		var reg = /\s*@import\s*\(?\s*[\"\']?([a-z_\-\.\/]+)[\"\']?\s*\)?\s*;?/i;

		var matched = line.match(reg);

		if (matched && matched[1]) {
			return matched[1];
		}
	}

	//把路径转为真实路径
	function getImportPath(path) {
		return path.replace(/\./g, '/') + '.js'
	}

	//按照行读取文件，返回文件数组

	var ndir = require('ndir');

	var fileContent = [];

	//判断是否为真实路径

	function isRealPath(path) {
		if (path.indexOf('.js') !== -1) {
			return true
		} else {
			return false
		}
	}
	//合并文件内容
	function concatFile(filePath) {

		var path;

		if (!isRealPath(filePath)) {
			filePath = getImportPath(getImport(filePath)); //解析路径
		} else {
			path = filePath;
		}
		ndir.createLineReader(filePath)
		.on('line', function (line) {
			var content = line.toString();
			if (content.indexOf('@') !== -1) { //读到import
				concatFile(content);
			} else {
				fileContent.unshift(content);
			}

		})
		.on('end', function () {
			console.log('end');
			ep.emit('line-read-end');
			//writeFile(fileContent, path) 啥时候能调用?
		})
		.on('error', function (err) {
			console.error(err);
		});

	}
	//写文件
	function writeFile(content, path) {

		console.log(content, path)

	}

	concatFile('test.js');

	var EventProxy = require('eventproxy');

	var ep = new EventProxy();

	ep.after('line-read-end', 3, function (list) { //这里的3是我随便写的，但实际是不知道要执行多少次的
		console.log(fileContent)
	});





/*
getFileContent('@import public.subway.app',function(data){
console.log(data);

})
	*/

//读取单个文件
function getFileContent(path, callback) {

path = getImportPath(getImport(path));


	var readstream = fs.createReadStream(path);
	var buffers = [],
	size = 0;

	readstream.on('error', function (err) {
		console.log(err)
	});
	readstream.on('data', function (buffer) {
		buffers.push(buffer);
		size += buffer.length;
	});
	readstream.on('end', function () {

		var buffer = new Buffer(size),
		pos = 0;
		for (var i = 0, l = buffers.length; i < l; i++) {
			buffers[i].copy(buffer, pos);
			pos += buffers[i].length;
			
		}

		callback.call(null, buffer.toString())

	});

}
