// Global function who calculate the size of each territory
function territory() {
  // Create territory object
  for (i = 0; i < 19; i++) {
    for (j = 0; j < 19; j++) {
      if (Game.token[i][j] == undefined) Game.token[i][j] = new Game.constructor.CreateTerritory(i, j);
    }
  }
  linkTerritory();
  colorTerritory();
  scoreTerritory();
}

// Function who link the territory object between them
function linkTerritory() {
  var token = Game.token;

  for (i = 0; i < 19; i++) {
    for (j = 0; j < 19; j++) {
      var friend = token[i][j].friendTabPosition;

      if (token[i][j].territory == true) {
        if (i != 0 && token[i - 1][j].territory == true) friend.push(token[i - 1][j].tabPosition);
        if (i != 18 && token[i + 1][j].territory == true) friend.push(token[i + 1][j].tabPosition);
        if (j != 0 && token[i][j - 1].territory == true) friend.push(token[i][j - 1].tabPosition);
        if (j != 18 && token[i][j + 1].territory == true) friend.push(token[i][j + 1].tabPosition);
      }
    }
  }
}

// Function who set the color of each territory
function colorTerritory() {
  var token = Game.token;

  for (i = 0; i < 19; i++) {
    for (j = 0; j < 19; j++) {
      var color = token[i][j].color;

      if (token[i][j].territory == true) {
        if (i != 0 && token[i - 1][j].player != undefined) {
          setColor(token[i][j], token[i - 1][j].player);
          resetChecked();
        }
        if (i != 18 && token[i + 1][j].player != undefined) {
          setColor(token[i][j], token[i + 1][j].player);
          resetChecked();
        }
        if (j != 0 && token[i][j - 1].player != undefined) {
          setColor(token[i][j], token[i][j - 1].player);
          resetChecked();
        }
        if (j != 18 && token[i][j + 1].player != undefined) {
          setColor(token[i][j], token[i][j + 1].player);
          resetChecked();
        }
      }
    }
  }
}

// Function who set the color of the territory object
function setColor(territory, color, precedentTerritory) {
  if (color == 'black') territory.black = true;
  else if (color == 'white') territory.white = true;

  if (territory.precedentTerritory == undefined) territory.precedentTerritory = precedentTerritory;

  for (c = 0; c < territory.friendTabPosition.length; c++) {
    var current = territory.friendTabPosition[c].split('_');
    if (color == 'black') {
      if (Game.token[current[0]][current[1]].black != true) {

        return setColor(Game.token[current[0]][current[1]], color, territory);
      }
    } else if (color == 'white') {
      if (Game.token[current[0]][current[1]].white != true) {

        return setColor(Game.token[current[0]][current[1]], color, territory);
      }
    }
  }
  if (territory.precedentTerritory != undefined) {
    var precedent = territory.precedentTerritory.tabPosition.split('_');

    return setColor(Game.token[precedent[0]][precedent[1]], color);
  } else {

    return 0;
  }
}

// Function who reset the checked statut of each territory
function resetChecked() {
  for (a = 0; a < 19; a++) {
    for (b = 0; b < 19; b++) {
      Game.token[a][b].precedentTerritory = undefined;
    }
  }
}