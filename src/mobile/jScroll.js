var Scroller = function (element) {
	this.element = element;
	this.startTouchY = 0;
	this.animateTo(0); //设置起点为文档最顶端
	if (~navigator.userAgent.indexOf('Mobile')) { //测试用
		element.addEventListener('touchstart', this.handleEvent.bind(this), false);
		element.addEventListener('touchmove', this.handleEvent.bind(this), false);
		element.addEventListener('touchend', this.handleEvent.bind(this), false);
	} else {
		console.log(2, element)
		element.addEventListener('mousedown', this.handleEvent.bind(this), false);
		element.addEventListener('mousemove', this.handleEvent.bind(this), false);
		element.addEventListener('mouseup', this.handleEvent.bind(this), false);
	}
}

Scroller.prototype.handleEvent = function (e) {
var _self = this;
	switch (e.type) {
	case 'touchstart':
		_self.onTouchStart(e);
		break;
	case 'touchmove':
		_self.onTouchMove(e);
		break;
	case 'touchend':
		_self.onTouchEnd(e);
		break;
			case 'mouseup':
		_self.onTouchEnd(e);
		break;
			case 'mousemove':
		_self.onTouchMove(e);
		break;
			case 'mousedown':
		_self.onTouchStart(e);
		break;
	}
}

Scroller.prototype.onTouchStart = function (e) {
	this.stopMomentum();
	this.startTime = +new Date();
	this.touching = true;
	if (e.touches) {
    this.startTouchY = e.touches[0].clientY;//触摸起点
  } else {
    this.startTouchY = e.clientY;
  }
	this.contentStartOffsetY = this.currentOffsetY;
}

Scroller.prototype.onTouchMove = function (e) {
	if(this.touching){
	
	if (e.touches) {
      var currentY = e.touches[0].clientY;//手指触摸终点
    } else {
      var currentY = e.clientY;
    }
	var deltaY = currentY - this.startTouchY; //触摸距离
	var newY = deltaY + this.contentStartOffsetY; //起点加距离为终点
	this.animateTo(newY);
	
	}

	

}

Scroller.prototype.onTouchEnd = function (e) {
	if(this.touching){
	console.log('touchEnd!!!')
	this.touching = false;
	this.doMomentum(e);
	}
}

Scroller.prototype.animateTo = function (offsetY) { //驱动元素位移
	this.currentOffsetY = offsetY;
	// 在 webkit-transforms用 translate3d 的动画会得到硬件加速,性能显著提高
	this.element.style.webkitTransform = 'translate3d(0, ' + offsetY + 'px, 0)';
}

Scroller.prototype.doMomentum = function (e) {
	// 计算移动距离. 通过 开始位置和时间的比值来实现getEndVelocity方法
	var velocity = this.getEndVelocity(e); //拿到抬起手指时的速度
	
	console.log(' v : ' + velocity)
	
	var acceleration = velocity < 0 ? 20 : -20; //加速度
	var displacement =  - (velocity * velocity) / (2 * acceleration); //惯性距离(s = vot - 0.5at2),t = vo/a
	
	
	//推导得 s = vo方/2a
	var time =  - velocity / acceleration; //运动时间
console.log(displacement,time)
	// 设置好 transition执行 transform.当然你要计算出transition的停止时间是必须的否则滚动会超出.
	this.element.style.webkitTransition = '-webkit-transform ' + time*200+
		'ms cubic-bezier(0.33, 0.66, 0.66, 1)'; //设置变换.变换transform,变换时间time

	var newY = this.currentOffsetY + displacement; //设置终点
	
	
	this.currentOffsetY = newY; //设置终点
	var _self = this;
	setTimeout(function(){
	_self.element.style.webkitTransform = 'translate3d(0, ' + newY + 'px, 0)'; //变换到终点
	
	},10)
	
};

Scroller.prototype.stopMomentum = function () {
	// 获取样式对象.
	var style = document.defaultView.getComputedStyle(this.element, null);
	// 使用所得样式值通过webkitCSSMatrix计算出当前transform值.
	var transform = new WebKitCSSMatrix(style.webkitTransform);
	// 清除transition以免作用到下一个transform.
	
	console.log('element!'+this.element,this.element.style.webkitTransition)
	this.element.style.webkitTransition = '';
	console.log('element!'+this.element,this.element.style.webkitTransition)
	// 指定transform到目标位置.
	this.animateTo(transform.m42);
}

Scroller.prototype.getEndVelocity = function (e) { //计算惯性
	this.endTime = +new Date();

	if (e.touches) {
		var clientY = e.touches[0].clientY;//终点
	} else {
		var clientY = e.clientY;
	}

	var velocity = (clientY - this.startTouchY) / (this.endTime - this.startTime)*100 // 计算速度
	
	return velocity;
};
