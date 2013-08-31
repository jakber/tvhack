if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };
}

var url = document.URL;

// impression
var test = {
    url:"test"
};

$(document).ready(function() {
    var site = getSite(url);
    if (site) {
        console.log("found site: ", site);
        post({url:url}, "impression", function(response){
            console.log("tracked: ");
            console.log(response);

            get("whoami", function(me){
                console.log("me", me);
                var socket = io.connect(serverUrl);

                socket.on('next', function (data) {
                    console.log("next");
                    console.log(data);
                    window.location = serverUrl + "watch";
                });

                socket.emit("set user", me.id);
            });

        });
    }
});
