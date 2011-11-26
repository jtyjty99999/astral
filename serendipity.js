/**
 * @author Administrator
 */
 
/**
get an element the absolute position of the window 
 */ 
function getPos(obj)
		{
			var left = 0;
			var top = 0;

			while(obj.offsetParent)
			{
				left+=obj.offsetLeft;
				top+=obj.offsetTop;

				obj=obj.offsetParent;
			}
			return {x:left,y:top};
		}
		
/**
compatibility type of height
 */ 
var UI = {  
    wholeHeight: function() {  
        return document.body.scrollHeight || document.documentElement.scrollHeight  
    },  
    windowHeight: function () {  
        var a = document.documentElement;  
        return self.innerHeight || a && a.clientHeight || document.body.clientHeight  
    },  
    scrollY: function (a) {  
        var b = document.documentElement;  
        if (a) {  
            var c = a.parentNode,  
                e = a.scrollTop || 0;  
            if (a == b) e = UI.scrollY();  
            return c ? e + UI.scrollY(c) : e  
        }  
        return self.pageYOffset || b && b.scrollTop || document.body.scrollTop  
    }  
};  