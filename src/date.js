/**
 * @module Date
 *
 * 日期操作，一般用于日历控件。。
 */

(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('Date', function () {
	var D = {};
	
	D.formatDate = function (dateObj, formatter) {
		if (!'getDate' in dateObj)
			return

			var parser = /%([a-zA-Z])/g;

		function zeroPad(num) {
			return (+num < 10 ? "0" : "") + num
		}
		var formats = {
			d : function (obj) {
				return zeroPad(obj.getDate())
			},
			m : function (obj) {
				return zeroPad(obj.getMonth() + 1)
			},
			y : function (obj) {
				return zeroPad(obj.getYear() % 100)
			},
			Y : function (obj) {
				return obj.getFullYear()
			},

			F : '%Y-%m-%d',
			D : '%m/%d/%y'
		}

		return formatter.replace(parser, function (whole, marker) {

			var formatHandler = formats[marker];
			if (typeof formatHandler == "function") {
				return formatHandler(dateObj)
			} else if (typeof formatHandler == "string") {

				return formatData(dateObj, formatHandler)
			}

			return maker

		})

	}
        /**
         * 返回该月天数
         * @param  {Date} oDate 日期对象
         * @return {number} 
         */
        function getDaysInMonth(oDate){
				var o = new Dare(oDate.getFullYear(),oDate.getMonth()+1,0);
                return oDate.getDate();
        }
        /**
         * 计算某一天是某一年的第几天
         * @param  {Date} oDate 日期对象
         * @return {number} 
         */
        function getDayIndexOfYear(oDate){
                var o = new Date("1/1/" + oDate.getFullYear());
                return Math.ceil((oDate.getTime() - o.getTime()) / 86400000);
        }
	
	
	 //monthDay = new Date(this.Year, this.Month, 0).getDate()  当月天数
	/*
	
	  //上一月
  PreMonth: function() {
    this.PreDraw(new Date(this.Year, this.Month - 2, 1));
  },
  //下一月
  NextMonth: function() {
    this.PreDraw(new Date(this.Year, this.Month, 1));
  },
  //上一年
  PreYear: function() {
    this.PreDraw(new Date(this.Year - 1, this.Month - 1, 1));
  },
  //下一年
  NextYear: function() {
    this.PreDraw(new Date(this.Year + 1, this.Month - 1, 1));
  },
	
	*
	
	return D
})