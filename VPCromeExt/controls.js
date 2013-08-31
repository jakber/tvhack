var serverUrl = "http://sleepy-wave-6767.herokuapp.com";
$(function(){
	get("whoami", function(me){
		console.log("i am ", me);
    	$("#remote-code").html(me.id);

        $("#logo").click(function(){
            $.ajax({
                url: serverUrl + "/next",
                data: JSON.stringify({viewerId: me.id}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type : 'POST',
                success: function(responseData){
                    console.log("success", responseData);
                },
                failure: function(errMsg) {
                    console.log("failure", errMsg);
                }
            });
        });
    });

});
