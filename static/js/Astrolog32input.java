
function loadPage(sID_Form){
  var oInputForm=document.getElementById(sID_Form);
  var sMessage="",sTest="123";

  oInputForm.PlaceName.value=oInputForm.PlaceName.value.replace(/^\s+|\s+$/gi,"");  //trim字串
  oInputForm.PlaceName.value=oInputForm.PlaceName.value.replace(/\s{2,}/gi," ");  //将字串中的连续空白转换成一个空白
   
  var oCheckInput=new CheckInput(sID_Form);
  oCheckInput.Initial();
  sMessage=oCheckInput.getMessage();

  if(sMessage.length>0) {
	alert(sMessage);
	return false;
  }

  if(checkDate(sID_Form)==true){
    oInputForm.target='_self';
    oInputForm.method='get';
    oInputForm.action='./StarParameters.php';
    oInputForm.submit();
  }  
}


function resetPage(sID_Form){
  var oInputForm=document.getElementById(sID_Form);
  
  var iYear=1980;
  var iMonth=1;
  var iDay;
  var aMonthDays=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31); //每月天数阵列 
  
  if((iYear%4==0&&iYear%100!=0) || iYear%400==0){
    aMonthDays[2]=29;			// 闰年:2月为29天
  }
  
  var oDay=oInputForm.Day;
  oDay.length=aMonthDays[iMonth]+1;

  for(i=28;i<=31;i++){
	oDay.options[i]=new Option(i,i);
    oDefaultSelected=oDay.options[i].defaultSelected;
    oSelected=oDay.options[i].selected;
    oDay.options[i]=new Option(i,i,oDefaultSelected,oSelected);
  }
}


function changePlace2(sID_Form){
  var oInputForm=document.getElementById(sID_Form);

  var sPlace2=oInputForm.Place2[oInputForm.Place2.selectedIndex].value;

  if(sPlace2==''){
    oInputForm.LongitudeDegree.value='';
    oInputForm.LongitudeMinute.value='';
    oInputForm.EastWest.value='';

    oInputForm.LatitudeDegree.value='';
    oInputForm.LatitudeMinute.value='';
    oInputForm.SouthNorth.value='';

    oInputForm.PlaceName.value='';
  }
  else{
    var sSplit=oInputForm.Place2[oInputForm.Place2.selectedIndex].value;
    var aSplit=sSplit.split(',');


    //经度
    var aLongitude=aSplit[0].match(/^(\d+):(\d+)([EW]{1})$/);
	
    oInputForm.LongitudeDegree.value=aLongitude[1];
    oInputForm.LongitudeMinute.value=aLongitude[2];
    oInputForm.EastWest.value=aLongitude[3];
	
    if(oInputForm.EastWest.value=='E'){
      oInputForm.EastWest[1].selected=true;  //东经
	}
    else{
      oInputForm.EastWest[2].selected=true;  //西经
    }


    //纬度
    var aLatitude=aSplit[1].match(/^(\d+):(\d+)([SN]{1})$/);
    oInputForm.LatitudeDegree.value=aLatitude[1];
    oInputForm.LatitudeMinute.value=aLatitude[2];
    oInputForm.SouthNorth.value=aLatitude[3];
	
    if(oInputForm.SouthNorth.value=='N'){
      oInputForm.SouthNorth[1].selected=true;  //北纬
	}
    else{
      oInputForm.SouthNorth[2].selected=true;  //南纬
	}

    if(oInputForm.Place1[oInputForm.Place1.selectedIndex].text==oInputForm.Place2[oInputForm.Place2.selectedIndex].text){
      oInputForm.PlaceName.value=oInputForm.Place2[oInputForm.Place2.selectedIndex].text;
    }
    else{
      oInputForm.PlaceName.value=oInputForm.Place1[oInputForm.Place1.selectedIndex].text+'-'+oInputForm.Place2[oInputForm.Place2.selectedIndex].text;
    }
  }
}


function CheckInput(sID_Form){
  this.oInputForm=document.getElementById(sID_Form);
  this.sMessage="";
  
  this.Initial=function(){
    this.checkEastWest();
    this.checkSouthNorth();
	this.checkLongitudeDegree();
	this.checkLongitudeMinute();
	this.checkLatitudeDegree();
	this.checkLatitudeMinute();
	
	if(this.sMessage.length>0) this.sMessage+="请重新输入。谢谢！" 
  }
  
  this.getMessage=function(){
    return this.sMessage;
  }
     
  this.checkLongitudeDegree=function(){
    var sKind="经度的度";
    var sValue=this.oInputForm.LongitudeDegree.value;
    this.sMessage+=this.checkLength(sKind,sValue);
    this.sMessage+=this.checkRange(sKind,sValue,0,180);
  }
  
  this.checkLongitudeMinute=function(){
    var sKind="经度的分";
    var sValue=this.oInputForm.LongitudeMinute.value;
    this.sMessage+=this.checkLength(sKind,sValue);
    this.sMessage+=this.checkRange(sKind,sValue,0,60);
  }

  this.checkLatitudeDegree=function(){
    var sKind="纬度的度";
    var sValue=this.oInputForm.LatitudeDegree.value;
    this.sMessage+=this.checkLength(sKind,sValue);
    this.sMessage+=this.checkRange(sKind,sValue,0,90);
  }

  this.checkLatitudeMinute=function(){
    var sKind="纬度的分";
    var sValue=this.oInputForm.LatitudeMinute.value;
    this.sMessage+=this.checkLength(sKind,sValue);
    this.sMessage+=this.checkRange(sKind,sValue,0,60);
  }
  
  this.checkEastWest=function(){
    var sKind="经度";
    var sValue=this.oInputForm.EastWest.value;
	
    if(sValue.length==0){
      this.sMessage+=sKind + ": 请选择东经或西经。"+"\r\n";
    }
  }
  
  this.checkSouthNorth=function(){
    var sKind="纬度";
    var sValue=this.oInputForm.SouthNorth.value;

    if(sValue.length==0){
      this.sMessage+=sKind + ": 请选择南纬或北纬。"+"\r\n";
    }
  }

  this.checkRange=function(sKind,sValue,iStart,iEnd){
	var sResult="";  
    var iValue=parseInt(sValue,10);
	
	if(sValue.length==0) return sResult;
    if( this.isInteger_Positive(sValue)==false || (iValue<iStart || iValue>iEnd) ){
      sResult=sKind + ": 其范围介于"+iStart+"及"+iEnd+"之间。"+"\r\n";
    }
    return sResult;
  }
  
  this.checkLength=function(sKind,sValue){
	var sResult="";  
    if(sValue.length==0){
      sResult=sKind + ": 其值不得为空白。"+"\r\n";
    }
    return sResult;
  }
  
  this.isInteger_Positive=function(sValue){
    var sPattern = /^[\+]{0,1}[0-9]{1,}$/;
    var bMatch=sPattern.test( this.trim(sValue) );
    return bMatch;
  }
  
  this.isInteger_Positive2=function(sValue){
	var bResult =  ( this.trim(sValue).search(/^[\+]{0,1}[0-9]{1,}$/)==0 ) ? true : false; 
    return bResult;
  }
  
  //去除字串前后的空白虚格
  this.trim=function(sString){
    return sString.replace(/(^[\s]*)|([\s]*$)/g, "");
  }
}
