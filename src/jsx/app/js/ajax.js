var _ = require("lodash");

function get(url,callback) {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function del(url,callback) {
    var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                callback();
            }
        }
        xmlhttp.open("DELETE",url,true);
        xmlhttp.send();
}


function getCookie() {
    var name = "token" + "=";
    var ca = document.cookie.split(';');
    console.log("cookies "+ca)
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function doit(method, url, object,callbackok,callbackKo) {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && (xmlhttp.status==200 || xmlhttp.status==201))
        {
            console.log("AUTH- "+xmlhttp.getResponseHeader("AUTHORIZATION"))
            callbackok();
        } else if(xmlhttp.status==502 || xmlhttp.status==500 || xmlhttp.status==404 || xmlhttp.status==403 || xmlhttp.status==400) {
        	callbackKo(xmlhttp.status)
        } else {
            console.log("error in ajax request="+xmlhttp.responseText)
        }
    }
    xmlhttp.open(method,url,true);
    xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("Authorization", getCookie());
    xmlhttp.send(JSON.stringify(object));

}

function uploadFile(url,divId,callbackok,callbackKo,updateProgress) {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var formData = new FormData();
    var file = document.getElementById(divId);
      /* Add the file */
    formData.append("file", file.files[0]);
    xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                callbackok();
            } else {
                callbackKo()
            }
        }
      xmlhttp.upload.addEventListener('progress', function(e){
              updateProgress(Math.ceil(e.loaded/e.total) * 100);
      }, false);

      xmlhttp.open('POST',url,true);
      xmlhttp.send(formData);

}

function post(url, object,callbackok,callbackKo) {
    return doit("POST", url, object,callbackok,callbackKo);
}

function put(url, object,callbackok,callbackKo) {
    return doit("PUT", url, object,callbackok,callbackKo);
}

module.exports.get = get;
module.exports.del = del;
module.exports.post = post;
module.exports.uploadFile = uploadFile;
module.exports.put = put;
module.exports.cookie = getCookie;