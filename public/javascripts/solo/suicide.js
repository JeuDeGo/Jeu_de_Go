// Function who prevent the suicide
function suicide (token) {
	console.log(token);
	if (token.group == undefined && token.liberty == 0 && Game.data.koState == false) {
		console.log('suicide');
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