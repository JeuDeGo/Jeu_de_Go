// Function who calculate who is the neighbour of the target token
function neighbourhood(i, j, tokenColor) {
  var token = Game.token;

  removeLiberty(i, j);
  if (i != 0 && token[parseInt(i) - 1][j] != undefined) { // neighbour on top
    if (tokenColor == token[parseInt(i) - 1][j].player) friend(token[i][j], token[parseInt(i) - 1][j]);
    else ennemi(token[i][j], token[parseInt(i) - 1][j]);
  }
  if (i != 18 && token[parseInt(i) + 1][j] != undefined) { // neighbour on bottom
    if (tokenColor == token[parseInt(i) + 1][j].player) friend(token[i][j], token[parseInt(i) + 1][j]);
    else ennemi(token[i][j], token[parseInt(i) + 1][j]);
  }
  if (j != 0 && token[i][parseInt(j) - 1] != undefined) { // neighbour on left
    if (tokenColor == token[i][parseInt(j) - 1].player) friend(token[i][j], token[i][parseInt(j) - 1]);
    else ennemi(token[i][j], token[i][parseInt(j) - 1]);
  }
  if (j != 18 && token[i][parseInt(j) + 1] != undefined) { // neighbour on right
    if (tokenColor == token[i][parseInt(j) + 1].player) friend(token[i][j], token[i][parseInt(j) + 1]); 
    else ennemi(token[i][j], token[i][parseInt(j) + 1]);
  }
  if (Game.data.koState == false) {
    removeLiberty(i, j, token[i][j]);
    suicide(token[i][j]);
  }
}


// Function who remove liberty and create group
function friend(tokenA, tokenB) {
  tokenA.friendTabPosition.push(tokenB.tabPosition);
  tokenB.friendTabPosition.push(tokenA.tabPosition);
  tokenB.group = true;
  tokenA.group = true;
}


// Function who remove liberty or token / group of tokens
function ennemi(tokenA, tokenB) {
  if (tokenB.liberty == 0 && tokenB.group == undefined) {
    ko(tokenA, tokenB);
    if (Game.data.koState == false) removeSoloToken(tokenB);
  }
  if (tokenB.liberty == 0 && tokenB.group == true)  {
    Game.data.tabPositionOfGroupToRemove = new Array();
    Game.data.tabPositionOfEnnemi = new Array();
    checkLibertyGroup(tokenB);
  }
}


// Function who push into an array wich ennemi(s) surround a tested token
function tokenWhoSurround(token, i, j) {
  var tabOfToken = Game.data.tabPositionOfEnnemi;
  var target = Game.token;

  if (i != 18 && target[parseInt(i) + 1][j].player != token.player) tabOfToken.push(target[parseInt(i) + 1][j].tabPosition);
  if (i != 0 && target[parseInt(i) - 1][j].player != token.player) tabOfToken.push(target[parseInt(i) - 1][j].tabPosition);
  if (j != 18 && target[i][parseInt(j) + 1].player != token.player) tabOfToken.push(target[i][parseInt(j) + 1].tabPosition);
  if (j != 0 && target[i][parseInt(j) - 1].player != token.player) tabOfToken.push(target[i][parseInt(j) - 1].tabPosition);
}