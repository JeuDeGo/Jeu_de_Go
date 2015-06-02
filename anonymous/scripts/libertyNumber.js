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


// Function who remove liberty
function removeLiberty(i, j, origin) {
  var token = Game.token;

  if (origin != undefined) origin.liberty = libertyNumber(origin.i, origin.j);
  if (i != 0 && token[parseInt(i) - 1][j] != undefined) { // neighbour on top
    if (origin != undefined) token[i][j].liberty--;
    else token[parseInt(i) - 1][j].liberty--;
  }
  if (i != 18 && token[parseInt(i) + 1][j] != undefined) { // neighbour on bottom
    if (origin != undefined) token[i][j].liberty--;
    else token[parseInt(i) + 1][j].liberty--;
  }
  if (j != 0 && token[i][parseInt(j) - 1] != undefined) { // neighbour on left
    if (origin != undefined) token[i][j].liberty--;
    else token[i][parseInt(j) - 1].liberty--;
  }
  if (j != 18 && token[i][parseInt(j) + 1] != undefined) { // neighbour on right
    if (origin != undefined) token[i][j].liberty--;
    else token[i][parseInt(j) + 1].liberty--;
  }
}

// Function who add liberty 

// Function who add liberty to a group of token who surround a deleted group
function addLibertytoGroup() {
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