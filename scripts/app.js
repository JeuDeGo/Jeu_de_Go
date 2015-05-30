var Game = {
	data: {
		player : 'black',
		td : document.getElementsByTagName('td'),
    tabPositionOfGroupToRemove : new Array(),
    tabPositionOfEnnemi : new Array(),
    pointBlackPlayer : 0,
    pointWhitePlayer : 0
	},
	token : new Array(),
	constructor : {
		CreateToken : function(i, j) {
			this.i = parseInt(i);
			this.j = parseInt(j);
			this.player = Game.data.player;
			this.liberty = libertyNumber(i, j);
			this.friendTabPosition = new Array();
			this.group = undefined;
      this.checked = undefined;
      this.precedentToken = undefined;
      this.tabPosition = i + '_' + j;
		}
	}
};

// Function who calculate how many liberty a token have, without looking for his neighbourhood
function libertyNumber(i, j) {
  if ((i == 0 && j == 0) ||
    (i == 0 && j == 18) ||
    (i == 18 && j == 0) ||
    (i == 18 && j == 18)) {

   return 2;

  } else if (((i == 0 && j != 0) ||
    (i == 0 && j != 18) ||
    (i == 18 && j != 0) ||
    (i == 18 && j != 18)) ||

    ((j == 0 && i != 0) ||
    (j == 0 && i != 18) ||
    (j == 18 && i != 0) ||
    (j == 18 && i != 18))) {

     return 3;

  } else {

    return 4;

  }
}

// Function who set a css class of a deleted token
function setClass(i, j) {
  var css;

  if ((i == 0) && (j == 0)) {
    css = 'checkerboardCornerTopLeft';
  } else if ((i == 0) && (j == 18)) {
    css = 'checkerboardCornerTopRight';
  } else if ((i == 18) && (j == 0)) {
    css = 'checkerboardCornerBottomLeft';
  } else if ((i == 18) && (j == 18)) {
    css = 'checkerboardCornerBottomRight';
  } else if (j == 0) {
    css = 'checkerboardLeft';
  } else if (i == 0) {
    css = 'checkerboardTop';
  } else if (j == 18) {
    css = 'checkerboardRight';
  } else if (i == 18) {
    css = 'checkerboardBottom';
  } else {
    css = 'checkerboardCross';
  }
  return css;
}

// Function who draw the Game into the DOM
function drawGame() {
	var html = document.getElementById("board");
	var draw = "";
	
	for (i = 0; i < 19; i++) {
		draw += "<tr>";
		for (j = 0; j < 19; j++) {
			draw += "<td class = "
			draw += setClass(i, j);
			draw += " id='"+ i + "_" + j + "'></td>";
		}
		draw += "</tr>";
	}
	html.innerHTML = draw;
}

// Function who copy into the DOM the number of points of each player
function gamePoint(playerScore, id, color) {
  var score = playerScore;
  var html = document.getElementById(id);

  var draw = "<div id = '" + id + "'> Score of " + color + " player : " + score + "</div>";

  html.innerHTML = draw;
}

// Function who calculate who is the neighbour of the target token
function neighbourhood(i, j, tokenColor) {
  var token = Game.token;

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
}

// Function who remove liberty and create group
function friend(tokenA, tokenB) {
  tokenA.liberty--;
  tokenB.liberty--;
  tokenA.friendTabPosition.push(tokenB.tabPosition);
  tokenB.friendTabPosition.push(tokenA.tabPosition);
  tokenB.group = true;
  tokenA.group = true;
}

// Function who remove liberty or token / group of tokens
function ennemi(tokenA, tokenB) {
  tokenA.liberty--;
  tokenB.liberty--;
  if (tokenA.liberty == 0 && tokenA.group == undefined) removeSoloToken(tokenA); // NEED TO PREVENT THIS CASE
  if (tokenB.liberty == 0 && tokenB.group == undefined) removeSoloToken(tokenB);
  if (tokenB.liberty == 0 && tokenB.group == true)  {
    Game.data.tabPositionOfGroupToRemove = new Array();
    Game.data.tabPositionOfEnnemi = new Array();
    checkLibertyGroup(tokenB);
  }
}

// Function who remove a token
function removeSoloToken(token) {
  var html = document.getElementById(token.i + '_' + token.j);

  html.className = setClass(token.i, token.j);

  if (token.player == 'white') {
    Game.data.pointBlackPlayer++;
    gamePoint(Game.data.pointBlackPlayer, 'blackPlayer', 'black');
  } else {
    Game.data.pointWhitePlayer++;
    gamePoint(Game.data.pointWhitePlayer, 'whitePlayer', 'white');
  }

  Game.token[token.i][token.j] = undefined;
  if (token.i != 18) Game.token[parseInt(token.i) + 1][token.j].liberty++;
  if (token.i != 0) Game.token[parseInt(token.i) - 1][token.j].liberty++;
  if (token.j != 18) Game.token[token.i][parseInt(token.j) + 1].liberty++;
  if (token.j != 0) Game.token[token.i][parseInt(token.j) - 1].liberty++;

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

// Function who push into an array wich ennemi(s) surround a tested token
function tokenWhoSurround(token, i, j) {
  var tabOfToken = Game.data.tabPositionOfEnnemi;
  var target = Game.token;

  if (i != 18 && target[parseInt(i) + 1][j].player != token.player) tabOfToken.push(target[parseInt(i) + 1][j].tabPosition);
  if (i != 0 && target[parseInt(i) - 1][j].player != token.player) tabOfToken.push(target[parseInt(i) - 1][j].tabPosition);
  if (j != 18 && target[i][parseInt(j) + 1].player != token.player) tabOfToken.push(target[i][parseInt(j) + 1].tabPosition);
  if (j != 0 && target[i][parseInt(j) - 1].player != token.player) tabOfToken.push(target[i][parseInt(j) - 1].tabPosition);
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
  addLibertytoEnnemi();
  if (colorOfThisGroup == 'white') gamePoint(Game.data.pointBlackPlayer, 'blackPlayer', 'black'); 
  else gamePoint(Game.data.pointWhitePlayer, 'whitePlayer', 'white');
}

// Function who add liberty to token who surround a deleted group
function addLibertytoEnnemi() {
  for (i = 0; i < Game.data.tabPositionOfEnnemi.length; i++) {
    var currentElement = Game.data.tabPositionOfEnnemi[i].split('_');

    Game.token[currentElement[0]][currentElement[1]].liberty++;
  }
}

// Function who add an EventListener on an event
function live(eventType, elementId, callback) {
  document.addEventListener(eventType, function (event) {
    if (event.target.id === elementId) {
      callback.call(event.target);
    }
  });
}

// Create the checkerboard & the array in Game.token
drawGame();
gamePoint(Game.data.pointBlackPlayer, 'blackPlayer', 'black');
gamePoint(Game.data.pointWhitePlayer, 'whitePlayer', 'white');

for (i = 0; i < 19; i++) {
  Game.token[i] = [];
  for (j = 0; j < 19; j++) {
    Game.token[i][j] = undefined;
  }
}

// Loop who add click on each intersection
for (var i = 0; i < Game.data.td.length; i++) {
	var currentElement = Game.data.td[i];

	live('click', currentElement.id, function() {
    var explode = this.id.split('_');
    var isToken = this.className;

    for (i = 0; i < 19; i++) { // NEED TO ADD RESET ONLY ON CONCERNED TOKENS
      for (j = 0; j < 19; j++) {
        if (Game.token[i][j] != undefined) Game.token[i][j].checked = undefined;
        if (Game.token[i][j] != undefined) Game.token[i][j].precedentToken = undefined;
      }
    }
		if (isToken != 'tokenWhite' && isToken != 'tokenBlack') { // Prevent click if the cell is a token
			if (Game.data.player == 'white') {
				this.className = 'tokenWhite';
				Game.token[explode[0]][explode[1]] = new Game.constructor.CreateToken(explode[0], explode[1]);
        neighbourhood(explode[0], explode[1], Game.token[explode[0]][explode[1]].player);
			} else {
				this.className = 'tokenBlack';
        Game.token[explode[0]][explode[1]] = new Game.constructor.CreateToken(explode[0], explode[1]);
        neighbourhood(explode[0], explode[1], Game.token[explode[0]][explode[1]].player);
			}
      Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
		}
	});
}

console.log(Game);