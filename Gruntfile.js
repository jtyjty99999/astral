module.exports = function(grunt){

    // 项目配置
	//<% %>模板字符串可以引用任意的配置属性
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				//定义一个用于插入合并输出文件之间的字符
				separator: ';'
			},
			dist: {
				src: ['src/*.js'],
				dest: 'dest/<%= pkg.name %>.js'
			}
		},
		//对于每个任务,包含option跟旗下的子任务
		//banner 文件头生成一个注释
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= concat.dist.dest %>',
                dest: 'build/<%= pkg.name %>.min.js'
            }               
        },
		jshint: {
			//定义用于检测的文件
			files: ['gruntfile.js', 'src/*.js','dest/*.js','build/*.js'],
			//配置JSHint (参考文档:http://www.jshint.com/docs)
			options: {
				//你可以在这里重写jshint的默认配置选项
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		}
    });

    // 加载插件,注意第一次要用 npm install grunt --save-dev来存储依赖
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	
	grunt.registerTask('test', ['jshint']);
    // 默认任务
	//如果运行grunt，对于concat来说将会遍历所有的目标, 并按任务指定的顺序处理每个目标
    grunt.registerTask('default', ['concat','uglify']);
}

