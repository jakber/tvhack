

var yourId;

$(document).ready(function() {

    console.log("page loaded");

    // this is the id of the submit button
    $("#connect").click(function() {

        yourId = $("#connectCode").val();
        console.log("your id: " + yourId);
        if (yourId){
            $("#login").hide();
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