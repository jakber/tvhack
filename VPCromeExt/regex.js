function getSite(url){

	var sites = new Array( 
			/.*(youtube.com)\/.*v=([A-Za-z0-9_]+).*/,  
			/.*(svtplay.se)\/video\/([a-z0-9]+)\/.*/,
			/.*(tv4play.se)\/program\/.*\?video_id=([a-z0-9]+).*/
		);

	for(var i in sites){	
		var regex = sites[i];
		var match = regex.exec(url);
		if(match){
			var domain = match[1];
			var name = match[2];					
			alert("match! domain = " + domain + ", id = " + name);
			return {site: match[1], contentId: match[2]};
		}				
	}
	return null;
}