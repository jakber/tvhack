function getSite(url){
	var sites = [
		{
			url: /.*(youtube.com)\/.*v=([A-Za-z0-9_]+).*/,
			title: '#eow-title'
		},
		{
			url: /.*(svtplay.se)\/video\/([a-z0-9]+)\/.*/,
			title: 'h2.playHeadingXL'
		},
		{
			url: /.*(tv4play.se)\/program\/.*\?video_id=([a-z0-9]+).*/,
			title: '#video-info h1'
		}
	];

	for(var i=0; i < sites.length; i++) {
		var regex = sites[i].url;
		var match = regex.exec(url);
		if(match){
			var domain = match[1];
			var name = match[2];					
			var title = $(sites[i].title).text().trim();
			return {site: match[1], contentId: match[2], "title": title};
		}				
	}
	return null;
}