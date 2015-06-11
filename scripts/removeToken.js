// Function who remove a token
function removeSoloToken(token) {
  var html = document.getElementById(token.i + '_' + token.j);

  html.className = setClass(token.i, token.j);

  if (token.player == 'white' && Game.data.suicide != true) {
    Game.data.pointBlackPlayer++;
    gamePoint(Game.data.pointBlackPlayer, 'blackPlayer', 'black');
  } else if (token.player == 'black' && Game.data.suicide != true) {
    Game.data.pointWhitePlayer++;
    gamePoint(Game.data.pointWhitePlayer, 'whitePlayer', 'white');
  }

  Game.token[token.i][token.j] = undefined;
  if (token.i != 18) Game.token[parseInt(token.i) + 1][token.j].liberty++;
  if (token.i != 0) Game.token[parseInt(token.i) - 1][token.j].liberty++;
  if (token.j != 18) Game.token[token.i][parseInt(token.j) + 1].liberty++;
  if (token.j != 0) Game.token[token.i][parseInt(token.j) - 1].liberty++;
}


// Function who remove a group of tokens
function removeGroup(colorOfThisGroup) {
  var data = Game.data;
  var token = Game.token

  if (colorOfThisGroup == 'white') data.pointBlackPlayer += data.tabPositionOfGroupToRemove.length;
  else data.pointWhitePlayer += data.tabPositionOfGroupToRemove.length;

  for (i = 0; i < data.tabPositionOfGroupToRemove.length; i++) {
    var currentElement = Game.data.tabPositionOfGroupToRemove[i].split('_');
    var html = document.getElementById(currentElement[0] + '_' + currentElement[1]);

    html.className = setClass(currentElement[0], currentElement[1]);
    token[currentElement[0]][currentElement[1]] = undefined;
  }
  addLibertytoGroup();
  if (colorOfThisGroup == 'white') gamePoint(Game.data.pointBlackPlayer, 'blackPlayer', 'black'); 
  else gamePoint(Game.data.pointWhitePlayer, 'whitePlayer', 'white');
}