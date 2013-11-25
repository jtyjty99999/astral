/*touch tool*/
 function swipeDirection(x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >=
                    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
        }
		
 //isWP = window.navigator.msPointerEnabled

        function isPrimaryTouch(event) {
            if (isWP) {
                return event.pointerType == event.MSPOINTER_TYPE_TOUCH && event.isPrimary
            }
        }
//http://quojs.tapquo.com/ http://code.baidu.com/		
		
		
		