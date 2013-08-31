var serverUrl = "http://sleepy-wave-6767.herokuapp.com/";

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
}

function get(path, callback){
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