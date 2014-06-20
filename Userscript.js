// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://sz.91160.com/
// @match 	   http://sz.91160.com/*
// @copyright  2012+, You
// @require    http://code.jquery.com/jquery-2.1.1.min.js
// ==/UserScript==

/*
 Copyright 2013 Logentries.
 Please view license at https://raw.github.com/logentries/le_js/master/LICENSE
*/
'use strict';(function(c,e){"function"===typeof define&&define.amd?define([c],e):"object"===typeof exports?module.exports=e(c):c.LE=e(c)})(this,function(c){function e(a){var b=(Math.random()+Math.PI).toString(36).substring(2,10),s=a.trace,e=a.page_info,f=a.token,g=a.print,p;p="undefined"===typeof XDomainRequest?a.ssl:"https:"===c.location.protocol?!0:!1;var h=[],k=!1,q=!1;if(a.catchall){var r=c.onerror;c.onerror=function(a,b,d){l({error:a,line:d,location:b}).level("ERROR").send();return r?r(a,b,d):
!1}}var n=function(){var a=c.navigator||{doNotTrack:void 0},b=c.screen||{};return{url:(c.location||{}).pathname,referrer:document.referrer,screen:{width:b.width,height:b.height},window:{width:c.innerWidth,height:c.innerHeight},browser:{name:a.appName,version:a.appVersion,cookie_enabled:a.cookieEnabled,do_not_track:a.doNotTrack},platform:a.platform}},t=function(){var a=null,a=Array.prototype.slice.call(arguments);if(0===a.length)throw Error("No arguments!");return a=1===a.length?a[0]:a},l=function(a){var c=
t.apply(this,arguments),d={event:c};"never"===e||q&&"per-entry"!==e||(q=!0,"undefined"===typeof c.screen&&"undefined"===typeof c.browser&&l(n()).level("PAGE").send());s&&(d.trace=b);return{level:function(a){if(g&&"undefined"!==typeof console&&"PAGE"!==a)try{console[a.toLowerCase()].call(console,d)}catch(b){console.log(d)}d.level=a;return{send:function(){var a=[],b=JSON.stringify(d,function(b,d){if("undefined"===typeof d)return"undefined";if("object"===typeof d&&null!==d){var c;a:{for(c=0;c<a.length;c++)if(d===
a[c])break a;c=-1}if(-1!==c)return"<?>";a.push(d)}return d});k?h.push(b):m(f,b)}}}}};this.log=l;var m=function(a,b){k=!0;var d;d="undefined"!==typeof XDomainRequest?new XDomainRequest:new XMLHttpRequest;d.constructor===XMLHttpRequest?d.onreadystatechange=function(){4===d.readyState&&(400<=d.status?(console.error("Couldn't submit events."),410===d.status&&console.warn("This version of le_js is no longer supported!")):(301===d.status&&console.warn("This version of le_js is deprecated! Consider upgrading."),
0<h.length?m(a,h.shift()):k=!1))}:d.onload=function(){0<h.length?m(a,h.shift()):k=!1};d.open("POST",(p?"https://":"http://")+"js.logentries.com/v1/logs/"+f,!0);d.constructor===XMLHttpRequest&&(d.setRequestHeader("X-Requested-With","XMLHttpRequest"),d.setRequestHeader("Content-type","text/json"));d.send(b)}}function n(a){var b,c={ssl:!0,catchall:!1,trace:!0,page_info:"never",print:!1,token:null};if("object"===typeof a)for(var g in a)c[g]=a[g];else throw Error("Invalid parameters for createLogStream()");
if(null===c.token)throw Error("Token not present.");b=new e(c);var f=function(a){if(b)return b.log.apply(this,arguments);throw Error("You must call LE.init(...) first.");};return{log:function(){f.apply(this,arguments).level("LOG").send()},warn:function(){f.apply(this,arguments).level("WARN").send()},error:function(){f.apply(this,arguments).level("ERROR").send()},info:function(){f.apply(this,arguments).level("INFO").send()}}}var b={},g=function(a){if("string"!==typeof a.name)throw Error("Name not present.");
if(b.hasOwnProperty(a.name))throw Error("Alrready exist this name for a logStream");b[a.name]=new n(a);return!0};return{init:function(a){var b={name:"default"};if("object"===typeof a)for(var c in a)b[c]=a[c];else if("string"===typeof a)b.token=a;else throw Error("Invalid parameters for init()");return g(b)},createLogStream:g,to:function(a){if(!b.hasOwnProperty(a))throw Error("Invalid name for logStream");return b[a]},destroy:function(a){"undefined"===typeof a&&(a="default");delete b[a]},log:function(){for(var a in b)b[a].log.apply(this,
arguments)},warn:function(){for(var a in b)b[a].warn.apply(this,arguments)},error:function(){for(var a in b)b[a].error.apply(this,arguments)},info:function(){for(var a in b)b[a].info.apply(this,arguments)}}});


var location = window.location;
var path = location.pathname;
var currentPageState;

LE.init('4ad91106-1bd1-44fe-b3e7-ae4c9b5dcb9b');
log('当前页面: ' +　location);

function initLogin(){
    
    var needLogin = true;
    delayInvoke(
        function(){
            var loginFlag = $("#_jy_show_usrname_");
            if (loginFlag.text() != "") {
                needLogin = false;                  
                return;
            }
            removeCurrentPageState();
            if(path == "/user/login.html"){
                $("#_username").attr("value", "dongshuiluo@gmail.com");
                $("#_loginPass").attr("value", "123456Abc");
                log('登陆页尝试登陆.');
                $("input[name='loginUser']").click();
            }
            else{
                window.location.href = "/user/login.html";
                log('跳转至登陆页面.');
            }        
        }, 5000);
}

function getCurrentPageState(){
    currentPageState = localStorage.getItem("currentPageState");
    if (!currentPageState) 
    {
        log("新建pageState");
        currentPageState = new pageState();
        var storeString = JSON.stringify(currentPageState);
        localStorage.setItem("currentPageState",storeString);
    }
    
    currentPageState = localStorage.getItem("currentPageState");
    currentPageState = JSON.parse(currentPageState);
    
    return currentPageState;
}

function setCurrentPageState(state){
    var storeString = JSON.stringify(state);
    localStorage.setItem("currentPageState",storeString);
}

function removeCurrentPageState(){
    localStorage.removeItem("currentPageState");
}



function showScheduleId(){
    delayInvoke(function(){
        var orders = $("a.schedule-timetable-order");
        console.log(orders.length);
        orders.each(
            function(){
                var schidRegex = /[0-9]{7}/igm;
                var idInHref = schidRegex.exec($(this).attr("href"));
                $(this).html($(this).html().replace("预约", idInHref));
            }
        );}, 2000);
}


function getSchdule(){    
    log(currentPageState.schduleUrlPre);
    var jsonUrl = currentPageState.schduleUrlPre + currentPageState.nextDate + ".html";
    log("获取" + jsonUrl);
    $.get(jsonUrl, 
          function(result){
              if(result.sch && result.sch.am){
                  $.each(result.sch.am, function(i, item) { 
                      log(item.to_date + ":" + item.y_state_desc);
                      if(item.y_state_desc === "可预约"){
                          log("找到可预约 " + item.to_date + ", " + schedule_id);
                          currentPageState.schduleId = item.schedule_id;
                          currentPageState.nextUrl = "http://sz.91160.com/guahao/ystep1/uid-21/schid-" + item.schedule_id + ".html";
                          setCurrentPageState(currentPageState);
                          window.location = currentPageState.nextUrl;
                          return false;
                      }
                  });          
                  currentPageState.nextDate = result.next;    
              }
          }, "json");
    
    currentPageState.callIndex = currentPageState.callIndex + 1;
    if(currentPageState.callIndex <= currentPageState.callLimit)
        delayInvoke(getSchdule, 2000);
}

function delayInvoke(callback, timeout){
    window.setTimeout(callback, timeout);
}

function log(message){
    console.log(message);
    LE.log(message);
}

function pageState() {
    this.schduleId = null;
    this.nextUrl = null;
    
    this.callLimit = 2;
    this.callIndex = 1;
    //this.schduleUrlPre = "http://sz.91160.com/doc/getschmast/unit_id-21/dep_id-4384/doc_id-9187/date-";
    this.schduleUrlPre = "http://sz.91160.com/doc/getschmast/unit_id-21/dep_id-1589/doc_id-4332/date-";
    this.nextDate = "";
}

function handleReservation(path){
    if(path.indexOf("guahao/ystep1") >= 0)
        handleYStep1();
    else if(path.indexOf("guahao/ystep2") >= 0){
        if(document.referrer.indexOf("guahao/ystep1") < 0){
            removeCurrentPageState();
            window.location = "http://sz.91160.com/";
        }
 		handleYStep2();
    }
    else if()
}

function handleYStep1(){
    var isCheckedTime = false;
    $('input[name=detlid]').each(function(){
        //log($(this)[0].checked);
        if(!$(this)[0].checked && !isCheckedTime){
            $(this).attr("checked", "true");
            log("check one time.");
            isCheckedTime = true;
        }
    }); 
    
    var isCheckedPerson = false;
    $('input[name=mid]').each(function(){
        //log($(this)[0].checked);
        if(!$(this)[0].checked && !isCheckedPerson){
            $(this).attr("checked", "true");
            log("check one person.");
            isCheckedPerson = true;
        }
    }); 
    
    $('input:checkbox[name=accept]').attr("checked", "true");
    log("check accept.");
    
    currentPageState.nextUrl = "http://sz.91160.com/guahao/ystep2.html";
    setCurrentPageState(currentPageState);
    
    log("submit step1.");
    $('input:button[value=下一步]').click();
}

function handleYStep2(){
	$('input:submit[value=下一步]').click();
    currentPageState.nextUrl = "http://sz.91160.com/guahao/ystep3.html";
    setCurrentPageState(currentPageState);
}

function postStep1(){    
    $.post( "http://sz.91160.com/guahao/ystep2.html", { detlid:13189746,mid:2315307,add_cardtype:01,add_sex:0,jyyear:0,jymonth:0,jyday:0,accept:1,yctinput:0,unit_id:21,schedule_id:3182542,dep_id:688,doctor_id:1693,level_code:875,is_hot: })
  	 .done(function( data ) {
       alert( "Data Loaded: " + data );
  });
}
    
// entry point

if(!window.localStorage){
    alert('This browser does NOT support localStorage');
}

initLogin();
currentPageState = getCurrentPageState();

if(!currentPageState.schduleId || currentPageState.schduleId == ""){
    log("尝试获取schduleId");
    $.ajaxSettings.async = false;
    delayInvoke(getSchdule, 2000);
    $.ajaxSettings.async = true;
}
else
{
    log("已经获取到schduleId:" + currentPageState.schduleId);   
    if(location != currentPageState.nextUrl){
        window.location = currentPageState.nextUrl;
    }
    //handleReservation(path);
}
