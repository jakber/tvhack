//Jesper was here.
var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  var sql = request.query.sql;
  
	var pg = require('pg');
	
  console.log('db:' + process.env.DATABASE_URL);

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  		if(err)
        console.error(err);

      client.query("SELECT * from jocke", function(err, result) {
    			done();
    			if(err) return console.error(err);
    			response.send('hello ' + result.rows[0].name);
  		});
	});

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

