$(function(){
	get("whoami", function(me){
		console.log("i am ", me);
    	$("#remote-code").html(me.id);

        $("#logo").click(function(){
           post({viewerId:me.id},"next",function(){});
        });
    });

});
