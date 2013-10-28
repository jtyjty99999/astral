describe("event", function () {
	var eve,
	multiEve,
	argEve;
	/*
	var a = new E.CustomEvent;

	a.on('hello world',function(){console.log('hello world'+arguments.length)})

	a.trigger('hello')
	a.trigger('world',[1,2])
	a.trigger('world',1,2)

	a.off('hello')
	a.trigger('hello')

	a.off('all')
	a.trigger('world')

	a.on('c d',function(a,b){console.log(a)})
	a.trigger('c d',4)

	 */

	beforeEach(function () {
		var customEvent = eventHelper().CustomEvent;
		eve = new customEvent;
	});

	it("绑定事件后可以触发事件", function () {
		var marker = 0;
		eve.on('hello', function () {
			marker += 1
		})
		eve.trigger('hello');

		expect(marker).toEqual(1);
	});

	it("解除绑定事件后不能触发事件", function () {
		var marker = 0;
		eve.on('hello', function () {
			marker += 1
		})
		eve.off('hello');
		eve.trigger('hello');

		expect(marker).toEqual(0);
	});

	describe("测试绑定多重事件", function () {
		beforeEach(function () {
			var multiCustomEvent = eventHelper().CustomEvent;
			multiEve = new multiCustomEvent;
		});

		it("绑定多个事件后可以触发单个事件", function () {
			var marker = 1;
			multiEve.on('hello world', function () {
				marker += 1
			})

			multiEve.trigger('hello');
			expect(marker).toEqual(2);
		});
		it("绑定多个事件后,trigger可以同时触发多个事件", function () {
			var marker = 1;
			multiEve.on('hello world', function () {
				marker += 1
			})

			multiEve.trigger('hello world');
			expect(marker).toEqual(3);
		});

		it("绑定多个事件后，解除绑定后，每个事件都不能触发", function () {
			var marker = 1;
			multiEve.on('hello world', function () {
				marker += 1
			})

			multiEve.off('hello');
			multiEve.off('world');
			multiEve.trigger('hello');
			multiEve.trigger('world');
			expect(marker).toEqual(1);
		});
		it("可以同时解除绑定多个事件", function () {
			var marker = 1;
			multiEve.on('hello world', function () {
				marker += 1
			})

			multiEve.off('hello world');
			multiEve.trigger('hello world');
			expect(marker).toEqual(1);
		});
		it("可以利用all语法糖同时解除绑定多个事件", function () {
			var marker = 1;
			multiEve.on('hello world', function () {
				marker += 1
			})

			multiEve.off('all');
			multiEve.trigger('hello world');
			expect(marker).toEqual(1);
		});
	});

	describe("测试绑定事件时传参数", function () {
		beforeEach(function () {
			var argCustomEvent = eventHelper().CustomEvent;
			argEve = new argCustomEvent;
		});

		it("可以以逗号分隔的形式传参数", function () {
			var marker = 1;
			argEve.on('hello world', function () {
				marker += arguments[0];
				marker += arguments[1]
			});

			argEve.trigger('world', 1, 2);
			expect(marker).toEqual(4);
		});
		it("可以以数组的形式传参数", function () {

			var marker = 1;
			argEve.on('hello world', function () {
				marker += arguments[0];
				marker += arguments[1]
			});

			argEve.trigger('world', [1, 2]);
			expect(marker).toEqual(4);
		});

	});

	/*
	// demonstrates use of spies to intercept and test method calls
	it("tells the current song if the user has made it a favorite", function() {
	spyOn(song, 'persistFavoriteStatus');

	player.play(song);
	player.makeFavorite();

	expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
	});

	//demonstrates use of expected exceptions
	describe("#resume", function() {
	it("should throw an exception if song is already playing", function() {
	player.play(song);

	expect(function() {
	player.resume();
	}).toThrow("song is already playing");
	});
	});
	 */
});