/**
 * @author Administrator
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