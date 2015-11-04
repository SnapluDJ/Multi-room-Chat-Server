function people (nickname) {
	this.name = nickname;
	this.createRoom = ture;

}

function room (roomName, password, owner) {
	this.name = roomName;
	this.password = password;
	this.owner = owner;
	var peopleList = [];
}