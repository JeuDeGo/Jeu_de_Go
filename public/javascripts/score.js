// Function who copy into the DOM the number of points of each player
function gamePoint(playerScore, id, color) {
  var html = document.getElementById(id);
  var draw = "<div id = '" + id + "'> Score of " + color + " player : " + playerScore + "</div>";

  html.innerHTML = draw;
}

// Function who add the score linked to the territory
function scoreTerritory() {
  for (i = 0; i < 19; i++) {
    for (j = 0; j < 19; j++) {
      if (Game.token[i][j].territory == true) {
        if (Game.token[i][j].black == true && Game.token[i][j].white == false) {
          var html = document.getElementById(Game.token[i][j].i + '_' + Game.token[i][j].j);
          Game.token[i][j] = new Game.constructor.CreateToken(i, j);
          Game.token[i][j].player = 'black';

          Game.data.pointBlackPlayer++;
          html.className = 'tokenBlack';
        }
        else if (Game.token[i][j].white == true && Game.token[i][j].black == false) {
          var html = document.getElementById(Game.token[i][j].i + '_' + Game.token[i][j].j);
          Game.token[i][j] = new Game.constructor.CreateToken(i, j);
          Game.token[i][j].player = 'white';

          Game.data.pointWhitePlayer++;
          html.className = 'tokenWhite';
        }
      }
    }
  }
  gamePoint(Game.data.pointBlackPlayer, 'blackPlayer', 'black');
  gamePoint(Game.data.pointWhitePlayer, 'whitePlayer', 'white');
}