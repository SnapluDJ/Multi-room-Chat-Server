var nickname = null;

function login () {
	var id = document.getElementById("nickname").value;
	if (id) {
		$('#login').hide();
		nickname = id;

	}
}

document.getElementById("loginSubmit").addEventListener("click", login, false);