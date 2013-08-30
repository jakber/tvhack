//Jesper was here.
//export DATABASE_URL=postgresql://localhost/postgres
var express = require("express");
var pg = require('pg');
var async = require('async');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/impression', function(request, response) {
    console.log('db:' + process.env.DATABASE_URL);
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if(err)
            console.error(err);

        client.query("SELECT * from impression", function(err, result) {
            done();
            if(err) return console.error(err);
            response.send(result.rows);
        });
    });
});

app.get('/whoami', function(request, response) {
    var viewerId = request.cookies.viewer;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        getOrCreateViewer(client, viewerId, function(err, viewer) {
            console.log(viewer);
            response.send(viewer);
        });
    });
});

app.get('/watch', function(request, response) {
    console.log('db:' + process.env.DATABASE_URL);
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if(err)
            console.error(err);

        client.query("SELECT count(*) c, url from impression JOIN video ON video.id=impression.video GROUP BY url ORDER BY c DESC", function(err, result) {
            done();
            if(err) return console.error(err);
            response.redirect(result.rows[0].url);
        });
    });
});

app.post('/impression', function(request, response) {
    var url = request.body.url;
    var viewer = request.cookies.viewer;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if(err)
            console.error(err);

        async.parallel({
            viewer: function(callback) { getOrCreateViewer(client, viewer, callback) },
            video: function(callback) {
                client.query("SELECT id FROM video WHERE url=$1", [url], function(err, result) {
                    if (result.rows.length == 0) 
                        client.query("INSERT INTO video(url) VALUES($1) RETURNING id", [url], function(err, result) {
                            callback(null, result.rows[0]);
                        });
                    else
                        callback(null, result.rows[0]);
                });
            }
        }, function(err, results) {
            var query = client.query("INSERT INTO impression(viewer, video, created) VALUES($1, $2, NOW()) RETURNING id", [results.viewer.id, results.video.id], function(err, result) {
                done();
                response.cookie("viewer", results.viewer.token);
                response.send({result:"ok", id: result.rows[0].id});
            });
        });
    });
});


var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log("Listening on " + port);
});


function createViewer(client, token, callback) {
    client.query("INSERT INTO viewer(token) VALUES($1) RETURNING id,token", [createUUID()], function(err, result) {
        callback(null, result.rows[0]);
    });
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function getOrCreateViewer(client, viewer, callback) {
    if (!viewer) {
        createViewer(client, createUUID(), callback);
    } else {
        client.query("SELECT id,token FROM viewer WHERE token=$1", [viewer], function(err, result) {
            if (result.rows.length == 0) 
                createViewer(client, createUUID(), callback);
            else
                callback(null, result.rows[0]);
        });
    }
}


var sockets = {};
io.sockets.on("connection", function(socket) {
    console.log("connected");
    socket.on("set user", function(viewerId) {
        sockets[viewerId] = socket;
    })
});


app.post('/next', function(request, response) {
    var viewerId = request.body.viewerId;
    if (sockets[viewerId]) 
        sockets[viewerId].emit("next");
    response.send({result:"ok"});
});
