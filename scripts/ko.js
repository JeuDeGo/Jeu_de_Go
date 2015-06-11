function ko (tokenA, tokenB) {
	// Compare the value of tokens
	if (tokenA.tabPosition == Game.ko[0] && tokenB.tabPosition == Game.ko[1]) {
		Game.data.koState = true;
		removeSoloToken(tokenA);
		Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
		alert('You can\'t play there, it\' a KO');
		return 0;
	}

	// NEED TO ADD FUNCTIONAL INNER KO TAB FUNCTION
	// Set the informations in Game object
  if (Game.ko[0] != undefined && Game.data.koState == false) {
    Game.ko[2] = tokenB.tabPosition;
    Game.ko[3] = tokenA.tabPosition;
  } else if (Game.data.koState == false){
    Game.ko[0] = tokenB.tabPosition;
    Game.ko[1] = tokenA.tabPosition; 
  }
}