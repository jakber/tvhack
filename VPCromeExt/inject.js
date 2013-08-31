if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };
}

var serverUrl = "http://sleepy-wave-6767.herokuapp.com/";
var url = document.URL;

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
    console.log("post: " + path);
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
}function get(path, callback){
    console.log("get: " + path);
    $.ajax({
        url: serverUrl + "/" + path,
        type : 'GET',
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

var socket = io.connect(serverUrl);

socket.on('next', function (data) {
    console.log("next");
    console.log(data);
    window.location = serverUrl + "watch";
});

$(document).ready(function() {
    var site = getSite(url);
    if (site) {
        console.log("found site: " + site);
        post({url:url}, "impression", function(response){
            console.log("tracked: ");
            console.log(response);

            get("whoami", function(me){
                console.log("me");
                console.log(me);
                socket.emit("set user", me.id);
            });

        });
    }
});
