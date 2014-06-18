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

var location = window.location;
var path = location.pathname;

initLogin();

function initLogin(){
    
    var needLogin = true;
    delayInvoke(
        function(){
            var loginFlag = $("#_jy_show_usrname_");
            if (loginFlag.text() != "") {
                needLogin = false;
                if(path != "/doc/show/depid-4384/docid-9187.html"){
                    window.location.href = "http://sz.91160.com/doc/show/depid-4384/docid-9187.html";
                }
                else{
                    $("._tips_btn_green").trigger("click");
                }                    
                return;
            }
            
            if(path == "/user/login.html"){
                $("#_username").attr("value", "dongshuiluo@gmail.com");
                $("#_loginPass").attr("value", "123456Abc");
                console.log('登陆页尝试登陆.');
                $("input[name='loginUser']").click();
            }
            else{
                window.location.href = "/user/login.html";
                console.log('跳转至登陆页面.');
            }        
        }, 2000);
}


function delayInvoke(callback, timeout){
    window.setTimeout(callback, timeout);
}
