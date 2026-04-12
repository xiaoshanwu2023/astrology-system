function checkDate(sID_Form){
  var oInputForm=document.getElementById(sID_Form);
 
  var iYear=oInputForm.Year.value;
  var iMonth=oInputForm.Month.options[oInputForm.Month.selectedIndex].value;
  var iDay=oInputForm.Day.options[oInputForm.Day.selectedIndex].value;
  var aMonthDays=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31); //每月天数阵列 
   
  if(((iYear%4==0)&&(iYear%100!=0)) || (iYear%400==0)){
    aMonthDays[2]=29;			// 闰年:2月为29天
  }

  if( iDay > aMonthDays[iMonth] || (iYear=="" || iMonth=="" || iDay=="") ){
    alert('您所输入的日期有误，请重新输入。谢谢！');
    return false;
  }
  else if(isUnsignedInteger(iYear)==false){
    alert('年份应为正整数!');
    return false;
  }
  else{
    return true;
  }      
}


function changeMonth(sID_Form){
  var oInputForm=document.getElementById(sID_Form);
  
  var iYear=oInputForm.Year.value;
  var iMonth=oInputForm.Month.options[oInputForm.Month.selectedIndex].value;
  var iDay=oInputForm.Day.options[oInputForm.Day.selectedIndex].value;
  var aMonthDays=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31); //每月天数阵列 
  
  if((iYear%4==0&&iYear%100!=0) || iYear%400==0){
    aMonthDays[2]=29;			// 闰年:2月为29天
  }
  
  var oDay=oInputForm.Day;
  var iSelectedIndex=oDay.selectedIndex;
  var i,iDay_LastMonth,iDay_ThisMonth,oDefault,oSelected;
  
  iDay_LastMonth=oDay.length-1;
  iDay_ThisMonth=aMonthDays[iMonth];
  oDay.length=aMonthDays[iMonth]+1;

  if(iDay_LastMonth < iDay_ThisMonth){
    for(i=iDay_LastMonth+1;i<=iDay_ThisMonth;i++){
      //new Option(text,value,defaultSelected,selected)
	  oDay.options[i]=new Option(i,i);
	  
	  if(i==iSelectedIndex){
        oDefaultSelected=oDay.options[i].defaultSelected;
        oSelected=oDay.options[i].selected;
        oDay.options[i]=new Option(i,i,oDefaultSelected,oSelected);
	  }

    }
  }
}


function runSpecificTime(sID_Form){
  var oInputForm=document.getElementById(sID_Form);

  if(checkDate(sID_Form)==true){
    oInputForm.NowFlag.value=0;
    oInputForm.target="_self";
    oInputForm.method="get";
    oInputForm.submit();  
  }
}


function runAnyTime(sID_Form,iSeconds){
  var oInputForm=document.getElementById(sID_Form);

  if(checkDate(sID_Form)==true){

    var sFromDate=oInputForm.Year.value+"/"
               +oInputForm.Month.value+"/"
               +oInputForm.Day.value+" "
               +oInputForm.Hour.value+":"
               +oInputForm.Minute.value+":"
               +oInputForm.Second.value;

    var oFromDate=new Date(sFromDate);
    var oToDate=new Date();

    oToDate.setTime(oFromDate.getTime() + 1000 * iSeconds); //setTime()以10E-3秒为单位
    oInputForm.Year.value=oToDate.getFullYear();
    oInputForm.Month.value=oToDate.getMonth()+1;
    oInputForm.Day.value=oToDate.getDate();
    oInputForm.Hour.value=oToDate.getHours();
    oInputForm.Minute.value=oToDate.getMinutes();
    oInputForm.Second.value=oToDate.getSeconds();

    oInputForm.NowFlag.value=0;
    oInputForm.target="_self";
    oInputForm.method="get";
    oInputForm.submit();  
  }
}


function runNow(sID_Form){
  var oInputForm=document.getElementById(sID_Form);

  if(checkDate(sID_Form)==true){
    oInputForm.NowFlag.value=1;
    oInputForm.target="_self";
    oInputForm.method="get";
    oInputForm.submit(); 
  }	
}


function runNextMonth(sID_Form,iMonth){
  var oInputForm=document.getElementById(sID_Form);

  if(checkDate(sID_Form)==true){

    var sFromDate= oInputForm.Year.value+"/"
               +oInputForm.Month.value+"/"
               +oInputForm.Day.value+" "
               +oInputForm.Hour.value+":"
               +oInputForm.Minute.value+":"
               +oInputForm.Second.value;


    var oFromDate=new Date(sFromDate);

    if( (oFromDate.getMonth()+1) + iMonth >12 ){ //下个月为1月
      oInputForm.Year.value=oFromDate.getFullYear()+1;
      oInputForm.Month.value=1;
    }
    else if( (oFromDate.getMonth()+1) + iMonth < 1 ){ //上个月为12月
      oInputForm.Year.value=oFromDate.getFullYear()-1;
      oInputForm.Month.value=12;
    }
    else{
      oInputForm.Year.value=oFromDate.getFullYear();
      oInputForm.Month.value=(oFromDate.getMonth()+1)+iMonth;
    }

    oInputForm.Day.value=oFromDate.getDate();
    oInputForm.Hour.value=oFromDate.getHours();
    oInputForm.Minute.value=oFromDate.getMinutes();
    oInputForm.Second.value=oFromDate.getSeconds();
    
    oInputForm.NowFlag.value=0;
    oInputForm.target="_self";
    oInputForm.method="get";
    oInputForm.submit();  
  }
}


function runNextYear(sID_Form,iYear){
  var oInputForm=document.getElementById(sID_Form);

  if(checkDate(sID_Form)==true){

    var sFromDate= oInputForm.Year.value+"/"
               +oInputForm.Month.value+"/"
               +oInputForm.Day.value+" "
               +oInputForm.Hour.value+":"
               +oInputForm.Minute.value+":"
               +oInputForm.Second.value;

    var oFromDate=new Date(sFromDate);
    oInputForm.Year.value=oFromDate.getFullYear()+iYear;
    oInputForm.Month.value=(oFromDate.getMonth()+1);
    oInputForm.Day.value=oFromDate.getDate();
    oInputForm.Hour.value=oFromDate.getHours();
    oInputForm.Minute.value=oFromDate.getMinutes();
    oInputForm.Second.value=oFromDate.getSeconds();
    
    oInputForm.NowFlag.value=0;
    oInputForm.target="_self";
    oInputForm.method="get";
    oInputForm.submit();  
  }
}