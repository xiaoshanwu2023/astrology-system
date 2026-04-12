//放大至全Screen
function resizeFullScreen(){
  screenW=screen.width;
  screenH=screen.height;
  moveTo(0,0);
  resizeTo(screenW,screenH);
}

//去除字串前后的空白虚格
function trim(sString){
  return (sString==undefined || sString==null) ? "" : sString.replace(/(^[\s]*)|([\s]*$)/g, "");
}

function isInteger(str){
  return (str.toString().search(/^[0-9]+$/) == 0); //0(true) or -1(false)
}

//正整数
function isUnsignedInteger(s){
  return (s.toString().search(/^[0-9]+$/) == 0);
}

//检查空白
function checkSpace(sString){
  var aString=new Array();
  var aString=sString.match(/([\s]{1,})/g);
  return (aString==null) ? false : true ;
}


/**
* 去除多余空格函数
* trim:去除两边空格 lTrim:去除左空格 rTrim: 去除右空格
* 用法：
*     var str="  hello ";
*     str=str.trim();
*/
String.prototype.trim=function(){
  return this.replace(/(^[\s]*)|([\s]*$)/g,"");
}

String.prototype.lTrim=function(){
  return this.replace(/(^[\s]*)/g,"");
}

String.prototype.rTrim=function(){
  return this.replace(/([\s]*$)/g,"");
} 