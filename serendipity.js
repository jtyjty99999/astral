/**
 * @author jty
 */
function allStart(){
	alert("hello world!This is jty's js lib!")
}
/*                                      Dom operation                             */

/*-------------------------- +
  selector
 +-------------------------- */
function $id(id){
	return document.getElementById(id)
}
function $tag(tag){
	return document.getElementsByTagName(tag)
}
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