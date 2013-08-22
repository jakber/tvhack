var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello Jocke!');
	var pg = require('pg');
	var sql = request.sql;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  		client.query(sql, function(err, result) {
    			done();
    			if(err) return console.error(err);
    			console.log(result.rows);
  		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

