/**
 * @module Connection
 *
 * 数据交互模块
 */
define(function () {
	var Connection = {
	
	
	};
	/**
	 * 发送数据(一般用于打点统计)
	 * @param {object Object} 数据对象，key-value形式 
	 * @param {object String} url 
	 * @return null
	 */
       Connection.sendData=function (data, path) {
            var url = Connection.addQueryUrlParam(data, path);
            var img = new Image();
            img.src = url;
            img = null;
        };
			/**
	 * 给url添加参数
	 * @param {object String} url 
	 * @param {object Object} 数据对象，key-value形式 
	 * @return {object String} 
	 */
        Connection.addQueryUrlParam=function (url, data) {
            for (key in data) {
                if (url.indexOf("?") == -1) {
                    url += "?";
                } else {
                    url += "&";
                }
                url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
            }
            return url
        }
	/**
	 * json stringify的低端版
	 * @param {object Object} json数据对象，key-value形式 
	 * @return {object String} 
	 */
	Connection.o2Json = function (O) {
		//return JSON.stringify(jsonobj);

		var S = [];
		var J = "";
		if (Object.prototype.toString.apply(O) === '[object Array]') {
			for (var i = 0; i < O.length; i++)
				S.push(O2String(O[i]));
			J = '[' + S.join(',') + ']';
		} else if (Object.prototype.toString.apply(O) === '[object Date]') {
			J = "new Date(" + O.getTime() + ")";
		} else if (Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) === '[object Function]') {
			J = O.toString();
		} else if (Object.prototype.toString.apply(O) === '[object Object]') {
			for (var i in O) {
				O[i] = typeof(O[i]) == 'string' ? '"' + O[i] + '"' : (typeof(O[i]) === 'object' ? O2String(O[i]) : O[i]);
				S.push(i + ':' + O[i]);
			}
			J = '{' + S.join(',') + '}';
		}

		return J;
	};
		
		
	
	
	return Connection
});