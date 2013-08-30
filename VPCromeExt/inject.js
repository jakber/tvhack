

var url = "http://sleepy-wave-6767.herokuapp.com/";

var req = new XMLHttpRequest();
req.open("GET", url, true);
req.onload = function (e) {
    var message = e.target.responseText;
    alert(message);
};
req.send(null);

alert("yo");
