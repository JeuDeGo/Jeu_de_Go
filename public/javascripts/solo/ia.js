//Function who play against the player
function ia() {
  Game.data.suicide = false;
  Game.data.koState = false;
  Game.data.pass = false;
  for (i = 0; i < 19; i++) { // NEED TO ADD RESET ONLY ON CONCERNED TOKENS
    for (j = 0; j < 19; j++) {
      if (Game.token[i][j] != undefined) Game.token[i][j].checked = undefined;
      if (Game.token[i][j] != undefined) Game.token[i][j].precedentToken = undefined;
    }
  }
  var iaI = Math.floor(Math.random() * 18);
  var iaJ = Math.floor(Math.random() * 18);
  var html = document.getElementById(iaI + '_' + iaJ);
  if (Game.token[iaI][iaJ] == undefined) {
    if (Game.data.player == 'white') {
      html.className = 'tokenWhite';
      Game.token[iaI][iaJ] = new Game.constructor.CreateToken(iaI, iaJ);
      neighbourhood(iaI, iaJ, Game.token[iaI][iaJ].player);
    } else {
      html.className = 'tokenBlack';
      Game.token[iaI][iaJ] = new Game.constructor.CreateToken(iaI, iaJ);
      neighbourhood(iaI, iaJ, Game.token[iaI][iaJ].player);
    }
    Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
  }
  else ia();
}