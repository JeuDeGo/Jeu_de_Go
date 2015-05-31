// Function who calculate how many liberty a token have, without looking for his neighbourhood
function libertyNumber(i, j) {
  if ((i == 0 && j == 0) || (i == 0 && j == 18) ||
    (i == 18 && j == 0) || (i == 18 && j == 18)) {

   return 2;

  } else if (((i == 0 && j != 0) || (i == 0 && j != 18) ||
    (i == 18 && j != 0) || (i == 18 && j != 18)) ||
    ((j == 0 && i != 0) || (j == 0 && i != 18) ||
    (j == 18 && i != 0) || (j == 18 && i != 18))) {

     return 3;

  } else {

    return 4;

  }
}

// Function who add liberty to token who surround a deleted group
function addLibertytoEnnemi() {
  for (i = 0; i < Game.data.tabPositionOfEnnemi.length; i++) {
    var currentElement = Game.data.tabPositionOfEnnemi[i].split('_');

    Game.token[currentElement[0]][currentElement[1]].liberty++;
  }
}

// Function who calculate if the group doesn't have any liberty left
function checkLibertyGroup(token, precedentToken) {
  if (token.liberty != 0) {

    return 0;
  }
  if (token.checked != true) {
    token.checked = true;
    Game.data.tabPositionOfGroupToRemove.push(token.tabPosition);
    tokenWhoSurround(token, token.i, token.j);
  }
  if (token.precedentToken == undefined) token.precedentToken = precedentToken;
  for (i = 0; i < token.friendTabPosition.length; i++) {
    var explode = token.friendTabPosition[i].split('_');
    if (Game.token[explode[0]][explode[1]].checked != true) {

      return checkLibertyGroup(Game.token[explode[0]][explode[1]], token.tabPosition);
    }
  }
  if (token.precedentToken != undefined) {
    explode = token.precedentToken.split('_');
    checkLibertyGroup(Game.token[explode[0]][explode[1]]);
  } else {

    return removeGroup(token.player);
  }
}