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