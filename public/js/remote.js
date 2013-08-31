
var serverUrl = "http://sleepy-wave-6767.herokuapp.com";
var yourId;

$(document).ready(function() {


    $("#next-button").click(function(){
        $.ajax({
                url: serverUrl + "/next",
                data: JSON.stringify({viewerId: yourId}),
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
    });

    console.log("page loaded");

    // this is the id of the submit button
    $("#connect").click(function() {

        yourId = $("#connectCode").val();
        console.log("your id: " + yourId);
        if (yourId){
            $("#login").hide();
            $("#remote").show();
        }
        // not Submitting anything now
//        console.log("connect remote");
////        var url = "path/to/your/script.php";
//        $.ajax({
//            type: "POST",
//            url: "/connect/",
//            data: $("#connectForm").serialize(),
//            success: function(data)
//            {
//                alert(data);
//            }
//        });

        return false; // avoid to execute the actual submit of the form.
    });
});
