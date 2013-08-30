function getSite(){

	var sites = new Array( 
			/.*(youtube.com)\/([a-z0-9]+)/,  
			/.*(svtplay.se)\/video\/([a-z0-9]+)\/.*/,
			/.*(tv4play.se)\/program\/.*\?video_id=([a-z0-9]+)/
		);

	var str = "http://www.tv4play.se/program/postkodmiljon%C3%A4ren?video_id=2425795";

	for(var i in sites){	
		var regex = sites[i];
		var match = regex.exec(str);
		if(match){
			var domain = match[1];
			var name = match[2];					
			alert("match! domain = " + domain + ", id = " + name);
			return {site: match[1], contentId: match[2]};
		}				
	}
	return null;
}