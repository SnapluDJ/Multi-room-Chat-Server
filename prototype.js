var io = require("socket.io");
var socket = io.lesten(8000, "1.2.3.4");
var Room = require("room.js");
var uuid = require("uuid");

socket.set("log level", 1);
var people = {};
var rooms = {};
var clients = [];

socket.on("connection", function (client) {
	client.on("join", function (name) {
		roomID = null;
		people[client.id] = {"name" : name, "room" : roomID};
		client.emit("update", "You have connected to the server.");
		socket.sockets.emit("update", people[client.id].name + "is online.");
		socket.sockets.emit("update-people", people);
		client.emit("roomList", {rooms: rooms});
		clients.push(client); //populate the clients array with the client object
	});

	client.on("createRoom", function (name) {
		
	})
});