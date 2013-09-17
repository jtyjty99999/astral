 var Filters = {};
        Filters.getPixels = function(img) {
          var c,ctx;
          if (img.getContext) {
            c = img;
            try { ctx = c.getContext('2d'); } catch(e) {}
          }
          if (!ctx) {
            c = this.getCanvas(img.width, img.height);
            ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0);
          }
          return ctx.getImageData(0,0,c.width,c.height);
        };

        Filters.getCanvas = function(w,h) {
          var c = document.createElement('canvas');
          c.width = w;
          c.height = h;
          return c;
        };

        Filters.filterImage = function(filter, image, var_args) {
          var args = [this.getPixels(image)];
          for (var i=2; i<arguments.length; i++) {
            args.push(arguments[i]);
          }
          return filter.apply(null, args);
        };

        Filters.grayscale = function(pixels, args) {
          var d = pixels.data;
          for (var i=0; i<d.length; i+=4) {
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];
            // CIE luminance for the RGB
            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            d[i] = d[i+1] = d[i+2] = v
          }
          return pixels;
        };

        Filters.brightness = function(pixels, adjustment) {
          var d = pixels.data;
          for (var i=0; i<d.length; i+=4) {
            d[i] += adjustment;
            d[i+1] += adjustment;
            d[i+2] += adjustment;
          }
          return pixels;
        };

        Filters.threshold = function(pixels, threshold) {
          var d = pixels.data;
          for (var i=0; i<d.length; i+=4) {
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];
            var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
            d[i] = d[i+1] = d[i+2] = v
          }
          return pixels;
        };

        Filters.tmpCanvas = document.createElement('canvas');
        Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

        Filters.createImageData = function(w,h) {
          return this.tmpCtx.createImageData(w,h);
        };

        Filters.convolute = function(pixels, weights, opaque) {
          var side = Math.round(Math.sqrt(weights.length));
          var halfSide = Math.floor(side/2);

          var src = pixels.data;
          var sw = pixels.width;
          var sh = pixels.height;

          var w = sw;
          var h = sh;
          var output = Filters.createImageData(w, h);
          var dst = output.data;

          var alphaFac = opaque ? 1 : 0;

          for (var y=0; y<h; y++) {
            for (var x=0; x<w; x++) {
              var sy = y;
              var sx = x;
              var dstOff = (y*w+x)*4;
              var r=0, g=0, b=0, a=0;
              for (var cy=0; cy<side; cy++) {
                for (var cx=0; cx<side; cx++) {
                  var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                  var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                  var srcOff = (scy*sw+scx)*4;
                  var wt = weights[cy*side+cx];
                  r += src[srcOff] * wt;
                  g += src[srcOff+1] * wt;
                  b += src[srcOff+2] * wt;
                  a += src[srcOff+3] * wt;
                }
              }
              dst[dstOff] = r;
              dst[dstOff+1] = g;
              dst[dstOff+2] = b;
              dst[dstOff+3] = a + alphaFac*(255-a);
            }
          }
          return output;
        };

        if (!window.Float32Array)
          Float32Array = Array;

        Filters.convoluteFloat32 = function(pixels, weights, opaque) {
          var side = Math.round(Math.sqrt(weights.length));
          var halfSide = Math.floor(side/2);

          var src = pixels.data;
          var sw = pixels.width;
          var sh = pixels.height;

          var w = sw;
          var h = sh;
          var output = {
            width: w, height: h, data: new Float32Array(w*h*4)
          };
          var dst = output.data;

          var alphaFac = opaque ? 1 : 0;

          for (var y=0; y<h; y++) {
            for (var x=0; x<w; x++) {
              var sy = y;
              var sx = x;
              var dstOff = (y*w+x)*4;
              var r=0, g=0, b=0, a=0;
              for (var cy=0; cy<side; cy++) {
                for (var cx=0; cx<side; cx++) {
                  var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
                  var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
                  var srcOff = (scy*sw+scx)*4;
                  var wt = weights[cy*side+cx];
                  r += src[srcOff] * wt;
                  g += src[srcOff+1] * wt;
                  b += src[srcOff+2] * wt;
                  a += src[srcOff+3] * wt;
                }
              }
              dst[dstOff] = r;
              dst[dstOff+1] = g;
              dst[dstOff+2] = b;
              dst[dstOff+3] = a + alphaFac*(255-a);
            }
          }
          return output;
        };
		
		
		
var blendType = {
	darken : function (a, b) {
		return a < b ? a : b
	},
	exclude : function (a, b) {
		return a + b - 2 * a * b / 255
	},
	sub : function (a, b) {
		return Math.abs(a - b)
	},
	hardMix : function (a, b) {
		return (b < 128 ?
			(b == 0 ? 2 * b : Math.max(0, (255 - ((255 - a) << 8) / (2 * b))))
			 :
			((2 * (b - 128)) == 255 ? (2 * (b - 128)) : Math.min(255, ((a << 8) / (255 - (2 * (b - 128)))))))
		 < 128 ?
		0 : 255;
	},
	pinLight : function (a, b) {
		return Math.max(0, Math.max(2 * b - 255, Math.min(b, 2 * a)))
	},
	linearLight : function (a, b) {
		return Math.min(255, Math.max(0, (b[i] + 2 * a[i]) - 1))
	},
	light : function (a, b) {
		return b < 128 ?
		(b == 0 ? 2 * b : Math.max(0, (255 - ((255 - a) << 8) / (2 * b))))
		 :
		((2 * (b - 128)) == 255 ? (2 * (b - 128)) : Math.min(255, ((a << 8) / (255 - (2 * (b - 128))))))
	},
	hardLight : function (a, b) {
		return (a < 128) ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255)
	},
	subduedLight : function (a, b) {
		return b < 128 ?
		(2 * ((a >> 1) + 64)) * (b / 255)
		 :
		(255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255))
	},
	subduedLight : function (a, b) {
		return (b < 128) ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255)
	},
	LinearDodge : function (a, b) {
		return Math.min(255, (a + b))
	},
	colorDodge : function (a, b) {
		return (b == 255) ? b : Math.min(255, ((a << 8) / (255 - b)))
	},
	ColorFilter : function (a, b) {
		return 255 - (((255 - a) * (255 - b)) >> 8)
	},
	lighten : function (a, b) {
		return (b > a) ? b : a
	},
	LinearBurn : function (a, b) {
		return (a + b < 255) ? 0 : (a + b - 255)
	},
	colorBurn : function (a, b) {
		return b == 0 ? b : Math.max(0, Math.max(0, (255 - ((255 - a) << 8) / b)))
	},
	multiply : function (a, b) {
		return a * b / 255
	}
}
//传入2个canvas,type
function blend (cv1, cv2,type) {
    var c2d1 = cv1.getContext('2d');
    var c2d2 = cv2.getContext('2d');
    var imgData1 = c2d1.getImageData(0, 0, cv1.width, cv1.height);
    var data1 = imgData1.data;
    var data2 = c2d2.getImageData(0, 0, cv2.width, cv2.height).data;
 
    //计算函数，传入2个RGB对象进行计算
    var fn = function (a, b) {
        var r = {};
        for (var i in a) {
            r[i] =  blendType[type](a[i],b[i])//变暗效果公式
        }
        return r;
    }
 
    //遍历像素点
    for (var i = 0, len = data1.length; i < len; i += 4) {
 
        //计算新的RGB
        var newRGB = fn(
            {r: data1[i], g: data1[i + 1], b: data1[i + 2]},
            {r: data2[i], g: data2[i + 1], b: data2[i + 2]}
        );
 
        //覆盖掉data1
        data1[i] = newRGB.r;
        data1[i + 1] = newRGB.g;
        data1[i + 2] = newRGB.b;
    }
 
    //将新的像素数据写入canvas
    c2d1.putImageData(imgData1, 0, 0);
 
    //返回生成的图像url
    return cv1.toDataURL('image/png');
}		
		
		
//http://www.cssha.com/javascript-image-blending-algorithm