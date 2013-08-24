/**
 * @module array
 *
 * 提供操作数组相关的方法
 */
define(function () {
	var arrayHelper = {
		bigAdd : function (a, b) {
			var m = a.split('').reverse();
			var n = b.split('').reverse();
			var ret = [];
			var s = 0;

			for (var i = 0; i < a.length || i < b.length; i++) {
				var t = (m[i] | 0) + (n[i] | 0) + s;

				ret.push(t % 10);
				s = (t / 10) | 0;
			}
			if (s) {
				ret.push(s);
			}
			return ret.reverse().join('');
		},
		bigMutple : function (a, b) {
			var p = a.match(/\d{1,4}/g).reverse(),
			q = b.match(/\d{1,4}/g).reverse(),
			f1 = 0;
			result = "0";

			for (var i = 0; i < p.length; i++) {
				var f2 = 0;
				for (var j = 0; j < q.length; j++) {
					var t = (p[i] | 0) * (q[j] | 0);
					t += new Array(f1 + f2 + 1).join("0");
					result = arrayHelper.bigAdd(result, t);
					f2 += q[j].length;
				}
				f1 += p[i].length;
			}
			return result;

		},
		getRandom :function (Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		return (Min + Math.round(Rand * Range));
	}
	};
	return array
});