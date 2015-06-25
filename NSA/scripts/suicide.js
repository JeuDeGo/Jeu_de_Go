// Function who prevent the suicide
function suicide (token) {
	if (token.group == undefined && token.liberty == 0 && Game.data.koState == false) {
		Game.data.suicide = true;
		removeSoloToken(token);
		alert('You can\'t play there, it\' a suicide');
		Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
	} else if (token.group == true && token.liberty == 0) {
		checkLibertyGroup(token);
		if (Game.data.suicide == true) {
			removeSoloToken(token);
			alert('You can\'t play there, it\' a suicide');
			Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
		}
	}
}