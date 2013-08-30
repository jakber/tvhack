if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };
}



var serverUrl = "http://sleepy-wave-6767.herokuapp.com/";
var url = document.URL;
var siteIndex = undefined;

// impression
var test = {
    url:"test"
};

//
//var req = new XMLHttpRequest();
//req.open("GET", serverUrl, true);
//req.onload = function (e) {
//    var message = e.target.responseText;
//    alert(message);
//};
//req.send(null);


function post(data, path, callback){
    $.ajax(url, {
        url: "/" + path,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(resonceData){
            callback();
        },
        failure: function(errMsg) {
            alert(errMsg);
            callback();
        }
    });
}

//
//if(url.startsWith("http://www.svtplay.se/video/")){
//    siteIndex = 1;
//}

$(document).ready(function() {
    var site = getSite(url);
    if (site) {
        alert(site);
    }
    if (siteIndex){
        alert("found site");

    }
});



