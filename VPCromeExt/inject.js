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
    console.log("testpost");
    $.ajax({
        url: serverUrl + "/" + path,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type : 'POST',
        success: function(responseData){
            callback(responseData);
        },
        failure: function(errMsg) {
            alert("error");
            console.log("errMsg: " + errMsg);
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
        post({url:url}, "impression", function(response){
            console.log("tracked: ");
            console.log(response);
        });
    }
    if (siteIndex){
        alert("found site");

    }
});



