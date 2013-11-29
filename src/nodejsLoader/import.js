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

				
				
				
				var LineByLineReader = require('line-by-line');
	
				
				
				
				
				//按照行读取文件，返回文件数组

				var ndir = require('ndir');

				var fileContent = [],outName;

				//判断是否为真实路径

				function isRealPath(path) {
					if (path.indexOf('.js') !== -1) {
						return true
					} else {
						return false
					}
				}
				var seed = 1,whole = [],num=0;
				
				//合并文件内容
				function concatFile(filePath) {
					outName = outName || filePath;
					var path;

					if (!isRealPath(filePath)) {
						filePath = getImportPath(getImport(filePath)); //解析路径
					} else {
						path = filePath;
					}
					
					
					var lr = new LineByLineReader(filePath);

lr.on('error', function (err) {
    // 'err' contains error object
});

lr.on('line', function (line) {
						var content = line.toString();
						
						if (content.indexOf('@') !== -1) { //读到import
							seed+=1;
							concatFile(content);
						} else {

							fileContent.push(content);
						}
});

lr.on('end', function () {
seed-=1;
num+=1;
whole[num]=fileContent;
fileContent = [];
						if(seed==0){
						
						
						writeFile(fileContent.join('\n'), outName)
						
						
						}
});}
			
				//写文件
				function writeFile(content, path) {

					console.log(content, path)

				}

				concatFile('test.js');
				

				
				
				
				
				
				
				
				
				


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
