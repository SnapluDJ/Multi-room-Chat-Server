var io = require("socket.io");
var socket = io.lesten(8000, "1.2.3.4");
var Room = require("./room.js");
var uuid = require("node-uuid");

socket.set 