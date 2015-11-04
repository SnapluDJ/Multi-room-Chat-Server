function People (nickname) {
	this.name = nickname;
	this.createRoom = ture;

}

function Room (roomName, password, owner, roomId) {
	this.name = roomName;
	this.password = password;
	this.owner = owner;
	this.id = roomId;
	var peopleList = [];
}



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



var roomList = [];
var roomId = 0;

var io = socketio.listen(app);
io.sockets.on("connection", function (socket) {

	socket.on("createRoom", function (roomName, password, owner) {
		++roomId;
		var newRoom = new Room(roomName, password, owner, roomId);
		roomList.push(newRoom.name);

		console.log("newRoom: " + roomName + " " + owner);
		io.sockets.emit("updateRoomList", roomList);
	});

	socket.on("loadRoomList", function () {
		io.sockets.emit("updateRoomList", roomList);
	});
})


