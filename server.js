var http = require("http"),
	socketio = require("socket.io"),
	fs = require("fs");

var app = http.createServer(function (req, resp) {
	fs.readFile("index.html", function (err, data) {
		if (err) return resp.writeHead(500);
		resp.writeHead(200);
		resp.end(data);
	});
});
app.listen(3456);

var io = socketio.listen(app);

var roomList = [];



