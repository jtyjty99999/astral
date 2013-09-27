/**
 * @module Router
 *
 * location hash驱动的路由器
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('Router', function () {
	var Router = {};
	//存储时,只以hash值跟router名称作为存储线索,匹配则进行操作,不匹配则pia飞
	var routerPackage = [],
	routerNames = {},
	flag = 0;

	var queryStringReg = /\?([^#]*)?$/; //?abcdef  查询字符串
	var hashStart = /^[^#]*#/; //aaaaaaaa#hash   hash值前的数据
	var queryParam = /:([^\/]+)/g//#/test/:hello  用hello可以拿到#/test/abc  的abc ,也可以触发跳转


		//增加哈希请求,用户输入一个类似www.baidu.com/123#hello?jsdk
		//拿到的哈希值为hello
		//用户也可以使用自定义的router名字
		//用户同样可以给router传参数.
		//www.baidu.com/get#/test/a
		//当hash切换为 www.baidu.com/get#/test/bbbb 也触发
		Router.on = function (name, path, handler) {
		if (arguments.length === 2) {
			handler = path;
			path = name;
		}

		var str = '' + Router.handleRegisterPath(path);
		// Store route info
		routerNames[name] = ++flag;
		routerPackage[flag] = {
			name : name,
			hasher : str,
			handler : handler,
			flag : flag
		};
		console.log(routerPackage)
	};
	Router.handleRegisterPath(path) {

		return path

	}

	Router.handleRoutePath(path) {
		console.log('beforeParsing' + path)
		path = path.replace(queryStringReg, '').replace(hashStart, '');
		console.log('afterParsing' + path)
		return {
			path : path,
			param : 222
		}

	}
	Router.routeName = function (name) {
		var flag = routerNames[name];
		Router.run(routerPackage[flag]);
	}

	Router.run = function (router) {
		router[handler].call(null, parsed.param);
	}

	Router.routePath = function (path) {
		var parsed = Router.handleRoutePath(path);
		console.log(parsed)
		var l = routerPackage.length,
		i = 0;
		for (; i < l; i++) {
			if (routerPackage[i][hasher] == parsed.path) {
				routerPackage[i][handler].call(null, parsed.param)
				break
			}

		}

	}

	function monitor(e) {
		Router.routePath(e.newURL);
	}

	var prevUrl,
	nextUrl;

	Router.init = function () {

		if (!('onhashchange' in window)) {
			prevUrl = window.location.href;
			setInterval(function () {
				nextUrl = window.location.href;
				if (prevUrl === nextUrl)
					return;

				//hashchange事件触发后,返回的事件对象中包含newURL跟oldURL两个属性
				Router.routePath.call(window, {
					type : 'hashchange',
					newURL : nextUrl,
					oldURL : prevUrl
				});
				prevUrl = nextUrl;
			}, 200);
		} else if (window.addEventListener) {
			window.addEventListener('hashchange', monitor, false);
		} else if (window.attachEvent) {
			window.attachEvent('onhashchange', monitor);
		}

	}

	return Router
}
	())