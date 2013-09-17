var Scroller = function (element,topLimit,bottomLimit,backTime) {
	this.element = element;
	this.startTouchY = 0;
	this.topLimit = topLimit || 0;
	this.bottomLimit = bottomLimit || 500;
	this.backTime = backTime || 500;
	this.animateTo(0); //设置起点为0
	if (~navigator.userAgent.indexOf('Mobile')) { //测试用
		element.addEventListener('touchstart', this.handleEvent.bind(this), false);
		element.addEventListener('touchmove', this.handleEvent.bind(this), false);
		element.addEventListener('touchend', this.handleEvent.bind(this), false);
	} else {
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
//	console.log(this.currentOffsetY)
	// 在 webkit-transforms用 translate3d 的动画会得到硬件加速,性能显著提高
	this.element.style.webkitTransform = 'translate3d(0, ' + offsetY + 'px, 0)';
}


Scroller.prototype.backToTop = function () { //返回最顶部·
this.moveTo(this.topLimit,this.backTime)
}


Scroller.prototype.backTobottom = function () { //返回最底部
this.moveTo(-this.bottomLimit,this.backTime)
}

Scroller.prototype.moveTo = function(offsetY,time) {
  this.contentOffsetY = offsetY;

  this.element.style.webkitTransition = '-webkit-transform ' + time +// 设置好 transition执行 transform.
      'ms cubic-bezier(0.33, 0.66, 0.66, 1)';
  this.element.style.webkitTransform = 'translate3d(0, ' + offsetY + 'px, 0)';
};


Scroller.prototype.doMomentum = function (e) {

//console.log(this.currentOffsetY,this.topLimit,this.bottomLimit)
	if(this.currentOffsetY >this.topLimit){
	this.backToTop();
	return
	}else if(Math.abs(this.currentOffsetY) >this.bottomLimit){
	this.backTobottom();
	return 
	}



	// 计算移动距离. 通过 开始位置和时间的比值来实现getEndVelocity方法
	var velocity = this.getEndVelocity(e); //拿到抬起手指时的速度
	
	//console.log(' v : ' + velocity)
	
	var acceleration = velocity < 0 ? 20 : -20; //加速度
	var displacement =  - (velocity * velocity) / (2 * acceleration); //惯性距离(s = vot - 0.5at2),t = vo/a
	
	
	//推导得 s = vo方/2a
	var time =  - velocity / acceleration; //运动时间

	var newY = this.currentOffsetY + displacement; //设置终点
	
	this.moveTo(newY,time*200)
	
};

Scroller.prototype.stopMomentum = function () {
	// 获取样式对象.
	var style = document.defaultView.getComputedStyle(this.element, null);
	// 使用所得样式值通过webkitCSSMatrix计算出当前transform值.
	var transform = new WebKitCSSMatrix(style.webkitTransform);
	// 清除transition以免作用到下一个transform.
	
	//console.log('element!'+this.element,this.element.style.webkitTransition)
	this.element.style.webkitTransition = '';
//	console.log('element!'+this.element,this.element.style.webkitTransition)
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