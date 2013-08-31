$(function(){
	get("whoami", function(me){
		console.log("i am ", me);
    	$("#remote-code").html(me.id);
    });
});
