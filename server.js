// function People (nickname) {
// 	this.name = nickname;
// 	this.createRoom = ture;

// }

function Room (roomName, password, owner, roomId) {
	this.name = roomName;
	this.password = password;
	this.owner = owner;
	this.id = roomId;
	this.people = function (newPerson) {
		var peopleList = [];
		peopleList.push(newPerson);
		return peopleList;
	}
	
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
var roomArray = [];

var io = socketio.listen(app);
io.sockets.on("connection", function (socket) {

	socket.on("createRoom", function (roomName, password, owner) {
		++roomId;
		var newRoom = new Room(roomName, password, owner, roomId);
		roomArray.push(newRoom);
		roomList.push(newRoom.name);

		io.sockets.emit("updateRoomList", roomList, roomId);

		if (password != null) {
			io.sockets.emit("updatePeopleList", newRoom.people(owner), "private");
		}else{
			io.sockets.emit("updatePeopleList", newRoom.people(owner), "public");
		}
		
	});

	socket.on("loadRoomList", function () {
		io.sockets.emit("updateRoomList", roomList, roomId);
	});

	socket.on("checkPublicOrPrivate", function (roomId) {
		for (var i = 0; i < roomArray.length; i++) {
			if (roomArray[i].id == roomId) {
				if (roomArray[i].password == null) {
					io.sockets.emit("roomStatus", "public");
				}else{
					io.sockets.emit("roomStatus", "private");
				}
				break;
			}
		}
	});

	socket.on("loadPeopleList", function (nickname, roomId, roomStatus) {
		for (var i = 0; i < roomArray.length; i++) {
			if (roomArray[i].id == roomId) {
				if (roomStatus == "public") {
					io.sockets.emit("updatePeopleList", roomArray[i].people(nickname), "public");
				}else{
					io.sockets.emit("updatePeopleList", roomArray[i].people(nickname), "private");
				}
				break;
			}
		}
	});
})


