var serverUrl = "http://sleepy-wave-6767.herokuapp.com/";


$(function(){
	get("whoami", function(me){
    	$("#remote-code").html(me.id);
    });
});
