/*touch tool*/
var isWP = window.navigator.msPointerEnabled;

function swipeDirection(x1, x2, y1, y2) {
	return Math.abs(x1 - x2) >=
	Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
}

function isPrimaryTouch(event) {
	if (isWP) {
		return event.pointerType == event.MSPOINTER_TYPE_TOUCH && event.isPrimary
	}
}
//http://quojs.tapquo.com/ http://code.baidu.com/
//for more use
function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
    var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1),
        scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))),
        translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)]
        ;
    return {
        rotate: rotate,
        scale: scale,
        translate: translate,
        matrix: [
            [scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]],
            [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]],
            [0, 0, 1]
        ]
    }
}


var touchEvent = isWP ? {
	start : "MSPointerDown",
	move : "MSPointerMove",
	end : "MSPointerUp"
}
 : {
	start "touchstart",
	move : "touchmove",
	end : "touchend"
}

//主要变量:
//触点
//触点元素
//点击时刻
//开始点击的位置x,y
//结束点击的位置x,y
//移动时水平移动
//移动时垂直移动
//是否双击
//上次点击的时间
//点击计时器
//按住计时器
//


//一定要记得清理上面的变量！！


var figure, elem, timer, x1, y1, x2, y2, x = 0, y = 0, isDoubleTap, last;
var touchTimer, holdTimer;
document.addEventListener(touchEvent.start, function (e) {
	clearTimeout(touchTimer)
	timer = +new Date();
	figure = e.touches[0];
	if (isPrimaryTouch(e) === false) {
		return
	}
	last = last || timer;
	var delay = timer - last;
	elem = figure.target;
	x1 = figure.pageX;
	y1 = figure.pageY;

	if (delay > 0 && delay <= 250) { //双击
		isDoubleTap = true
	}
	last = timer;
	holdTimer = setTimeout(function () {
			console.log('hold')

		}, 1000); //一秒认为hold确认


})

document.addEventListener(touchEvent.move, function (e) {
	figure = e.touches[0];
	if (isPrimaryTouch(e) === false) {
		return
	}
	clearTimeout(holdTimer)
	x2 = figure.pageX;
	y2 = figure.pageY;
	x += Math.abs(x1 - x2);
	y += Math.abs(y1 - y2);
})

document.addEventListener(touchEvent.end, function (e) {
	clearTimeout(holdTimer);
	if (isPrimaryTouch(e) === false) {
		return
	}
	if ((x2 && Math.abs(x1 - x2) > 30) ||
		(y2 && Math.abs(y1 - y2) > 30)) { //大幅度移动
		//判定滑动方向触发事件
		setTimeout(function () {
			console.log('swipe' + (swipeDirection(x1, x2, y1, y2)))
			//清理变量
		}, 0)
	} else if (last)
		if (x < 30 && y < 30) { //总距离小幅度
			setTimeout(function () {
				console.log('tap');
				if (isDoubleTap) {
					console.log('doubleTap');
					//清理变量
				} else {
					touchTimer = setTimeout(function () {
							console.log('click'); //300ms触发click事件
							//清理变量
						}, 300)
				}
			}, 0)
		} else {
			//无效点击
		}
	window.getSelection().removeAllRanges(); //清理选区
	x = y = 0
})
//清理变量
function cleanVar() {

	figure = null;
	elem = null;
	timer = null;
	x1 = null;
	y1 = null;
	x2 = null;
	y2 = null;
	x = 0;
	y = 0;
	isDoubleTap = false;
	last = null;
}
		
		
