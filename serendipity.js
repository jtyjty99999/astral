/**
 * @author jty
 */
function allStart(){
	alert("hello world!This is jty's js lib!")
}
/*                                      Dom operation                             */

/*-------------------------- +
  if not ie
 +-------------------------- */
function notie(){
	if(-[1,]){
		alert('这货不是ie')	
	}
} 
 
/*-------------------------- +
  selector
 +-------------------------- */
function $id(id){
	return document.getElementById(id)
}
function $tag(tag){
	return document.getElementsByTagName(tag)
}
var get = {
	byId: function(id) {
		return document.getElementById(id)
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
/*-------------------------- +
 /delete current element node
 +-------------------------- */
function removeElement(_element)
{
    var parentElement=_element.parentNode;
    if(parentElement){
        parentElement.removeChild(_element);
    }
}
/*-------------------------- +
  GetIframe
 +-------------------------- */
function getIFrameDOM(id){
	return document.getElementById(id).contentDocument || document.frames[id].document;
}

/*                                               validator and transform                          */

/*-------------------------- +
  remove space
 +-------------------------- */
function trim(str){ //remove both sides space
	return str.replace(/(^\s*)|(\s*$)/g, "");
	}
function ltrim(str){ //remove lefr space
	return str.replace(/(^\s*)/g,"");
　　}
function rtrim(str){ //remove right space
　　return str.replace(/(\s*$)/g,"");
　　}
　　
/*-------------------------- +
  check all checked
 +-------------------------- */
function checkall(obj,name) {
     var boxs = document.getElementsByName(name);
     for(var i=0;i<boxs.length;i++){
             boxs[i].checked = obj.checked;
     }
 }
/*-------------------------- +
  to html
 +-------------------------- */
function HtmlDecode(str) {
var t = document.createElement("div");
t.innerHTML = str;
return t.innerText || t.textContent
}
//var d =  '&lt;script&gt;alert("sssssssssssss")&lt;/script&gt;'
//HtmlDecode(d) // "<script>alert("sssssssssssss")</script>"

/*                                                AJAX                     */

/*-------------------------- +
  load xml doc
 +-------------------------- */
function loadXMLDoc(dname)
{
try //Internet Explorer
  {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  }
catch(e)
  {
  try //Firefox, Mozilla, Opera, etc.
    {
    xmlDoc=document.implementation.createDocument("","",null);
    }
  catch(e) {alert(e.message)}
  }
try 
  {
  xmlDoc.async=false;
  xmlDoc.load(dname);
  return(xmlDoc);
  }
catch(e) {alert(e.message)}
return(null);
}



/*                                         Event                                  */

/*-------------------------- +
  event binding, deleting
 +-------------------------- */
var EventUtil = {
	addHandler: function (oElement, sEvent, fnHandler) {
		oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : (oElement["_" + sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function () {oElement["_" + sEvent + fnHandler]()}, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
	},
	removeHandler: function (oElement, sEvent, fnHandler) {
		oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, oElement[sEvent + fnHandler])
	},
	addLoadHandler: function (fnHandler) {
		this.addHandler(window, "load", fnHandler)
	}
}; 

function buttonEnter(){
	document.onkeydown = function(e){
	e = e || window.event;
	if(e.keyCode === 13)
	alert("you press enter!")
	};
	
/*-------------------------- +
  Ctrl+Enter
 +-------------------------- */

document.onkeydown=function(e){ 
	e = e || window.event;
	if(event.ctrlKey==true   &&   event.keyCode==13) 
        alert( "Ctrl+Enter "); 
}
	
/*                                                        UI                                          */

/**
get css attribute (from sanshuiqing)
 */ 
function getCss(elem, css){
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[css];
	}else if (elem.currentStyle) {
		return elem.currentStyle[css];
	}else {
		return elem.style[css];
	}
}

/**
has css attribute (from Mr.Think)
 */ 
 
function hasClass(element, className){
	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	return element.className.match(reg);
}
/**
remove css attribute (from Mr.Think)
 */ 
function removeClass(element, className){
	if (hasClass(element, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		element.className = element.className.replace(reg, ' ');
	}
}




/**
setOpacity
 */ 
 
function setOpacity(elem,opacity){
	elem.filters ? elem.style.filter = 'alpha(opacity=' + opacity + ')':elem.style.opacity = opacity / 100;}
/**
set opacity fadeIn fadeOut effect @Mr.Think
 */ 	
	//底层共用
    var iBase = {
        Id: function(name){
            return document.getElementById(name);
        },
		//设置元素透明度,透明度值按IE规则计,即0~100
        SetOpacity: function(ev, v){
            ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
        }
    }
	//淡入效果(含淡入到指定透明度)
	function fadeIn(elem, speed, opacity){
		/*
		 * 参数说明
		 * elem==>需要淡入的元素
		 * speed==>淡入速度,正整数(可选)
		 * opacity==>淡入到指定的透明度,0~100(可选)
		 */
	    speed = speed || 20;
	    opacity = opacity || 100;
		//显示元素,并将元素值为0透明度(不可见)
	    elem.style.display = 'block';
	    iBase.SetOpacity(elem, 0);
		//初始化透明度变化值为0
	    var val = 0;
		//循环将透明值以5递增,即淡入效果
	    (function(){
	        iBase.SetOpacity(elem, val);
	        val += 5;
	        if (val <= opacity) {
	            setTimeout(arguments.callee, speed)
	        }
	    })();
	}
	
	//淡出效果(含淡出到指定透明度)
	function fadeOut(elem, speed, opacity){
		/*
		 * 参数说明
		 * elem==>需要淡入的元素
		 * speed==>淡入速度,正整数(可选)
		 * opacity==>淡入到指定的透明度,0~100(可选)
		 */
	    speed = speed || 20;
	    opacity = opacity || 0;
	    //初始化透明度变化值为0
	    var val = 100;
		//循环将透明值以5递减,即淡出效果
	    (function(){
	        iBase.SetOpacity(elem, val);
	        val -= 5;
	        if (val >= opacity) {
	            setTimeout(arguments.callee, speed);
	        }else if (val < 0) {
				//元素透明度为0后隐藏元素
	            elem.style.display = 'none';
	        }
	    })();

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


/**one by one type in **/
function typein(time,string1,objectid){
    var textarea = document.getElementById(objectid)
    var i = 1;
    var time,string1;
    var trans = string1.toString()
    var xunhuan = setInterval(change, time);
    function change(){
    textarea.value=trans.slice(0,i);  //这里使用value
    i = i+1;
    if(i==trans.length){
    clearInterval(xunhuan)};
    }
    }

/*-------------------------- +
limit max length of a string and change extra to ...
 +-------------------------- */

function ellipsis (limit){
var _limit=limit || 10;
var len=this.length;
var str="";
if(len>limit){
str=this.substring(0,limit);
}
str+="...";
return str;

} 

/*-------------------------- +
join in 2 strings more effiency
 +-------------------------- */
 
function joint(string1,string2){
var temp=[],i=0;
var string1, string2 
     temp[i++]= string1;     temp[i++]=string2 
     var text=temp.join("");
return text
}
/*-------------------------- +
exchange
 +-------------------------- */
function change(a,b){
	a= [b, b=a][0]
	
}
/*-------------------------- +
get a random number from a range
 +-------------------------- */
 function GetRandomNum(Min,Max)
{   
var Range = Max - Min;   
var Rand = Math.random();   
return(Min + Math.round(Rand * Range));   
}   
 
/*-------------------------- +
  get the number of a field(type/id)
 +-------------------------- */
function getUrlPara(paraName){ 
var sUrl  =  location.href;
var sReg  =  "(?:\\?|&){1}"+paraName+"=([^&]*)"
var re=new RegExp(sReg,"gi");
re.exec(sUrl);
return RegExp.$1;
} 
function getUrlParam(name){//Another way upstair
	var   reg   =   new   RegExp("(^|&)"+   name   +"=([^&]*)(&|$)");
	var   r   =   window.location.search.substr(1).match(reg);
	if   (r!=null)
	return   unescape(r[2]);
	return   null;      
     }     
//getUrlParam("type") //operation

// 元素ID， 商品结束时间 endtime, 当前时间 btime
function time(elem,endtime,btime) {
	this.elem=elem;
	this.endtime=new Date(endtime).getTime();
	this.getId=document.getElementById(this.elem);
	this.btime=new Date(btime).getTime();
	this.reg=/\s+/g;
}
time.prototype.SetTime=function(){
	var _this=this;
	setInterval(function(){
		_this.DownTime();
	},1000)
}
time.prototype.DownTime= function() {
	var leave=parseInt((this.endtime-this.btime)/1000);
	this.btime+=1000;
	var timeBoole=true;
	var day,hour,mints,second;
	if(leave<=0) {
		timeBoole=false;
	}
	if(timeBoole==true) {
		day=parseInt(leave/3600/24)+"天";
		hour=parseInt((leave/3600)%24)+"小时 ";
		mints=parseInt((leave/60)%60)+"分 ";
		second=parseInt(leave%60)+"秒 ";
	} else {
		day=0+"天";
		hour=0+"小时 ";
		mints=0+"分 ";
		second=0+"秒 ";
	}
	TiemText=day+hour+mints+second;
	this.getId.innerHTML=TiemText.replace(this.reg, "");
}