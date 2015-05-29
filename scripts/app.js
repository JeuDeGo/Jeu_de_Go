var Game = {
	data: {
		player : 'black',
		td : document.getElementsByTagName('td'),
    numberOfTokenInGroup : 0,
    numberOfTokenInGroupWithoutLiberty : 0
	},
	token : new Array(),
	constructor : {
		CreateToken : function(i, j) {
			this.i = parseInt(i);
			this.j = parseInt(j);
			this.player = Game.data.player;
			this.initialLiberty = Game.otherFunction.libertyNumber(i, j);
			this.liberty = this.initialLiberty;
			this.friendTabPosition = new Array();
			this.group = undefined;
      this.neighbour = 0;
      this.alreadyAddToNumberOfToken = false;
      this.checked = undefined;
      this.tabPosition = i + '_' + j;
		}
	},
	otherFunction : {
		libertyNumber : function (i, j) {
			if (i == 0 && j == 0 || i == 0 && j == 18 || i == 18 && j == 0 || i == 18 && j == 18) {

				return 2;
			} else if (i == 0 && j != 0 || i == 0 && j != 18 || i == 18 && j != 0 || i == 18 && j != 18) {

				return 3;
			} else if (j == 0 && i != 0 || j == 0 && i != 18 || j == 18 && i != 0 || j == 18 && i != 18) {

				return 3;
			} else {

				return 4;
			}
		}
	}
};

// Function who draw the Game into the DOM
function drawGame() {
	var html = document.getElementById("board");
	var draw = "";
	
	for (i = 0; i < 19; i++) {
		draw += "<tr>";
		for (j = 0; j < 19; j++) {
			draw += "<td class = "
			if ((i == 0) && (j == 0)) {
				draw += "'checkerboardCornerTopLeft'";
			} else if ((i == 0) && (j == 18)) {
				draw += "'checkerboardCornerTopRight'";
			} else if ((i == 18) && (j == 0)) {
				draw += "'checkerboardCornerBottomLeft'";
			} else if ((i == 18) && (j == 18)) {
				draw += "'checkerboardCornerBottomRight'";
			} else if (j == 0) {
				draw += "'checkerboardLeft'";
			} else if (i == 0) {
				draw += "'checkerboardTop'";
			} else if (j == 18) {
				draw += "'checkerboardRight'";
			} else if (i == 18) {
				draw += "'checkerboardBottom'";
			} else {
				draw += "'checkerboardCross'";
			}
			draw += "id='"+ i + "_" + j + "'></td>";
		}
		draw += "</tr>";
	}
	html.innerHTML = draw;
}
drawGame();

// Function who calculate who is the neighbour of the target token
function neighbourhood(i, j, tokenColor) {
  if (i != 0 && Game.token[parseInt(i) - 1][j] != undefined) { // neighboor on top
    if (tokenColor == Game.token[parseInt(i) - 1][j].player) friend(Game.token[i][j], Game.token[parseInt(i) - 1][j]);
    else ennemi(Game.token[i][j], Game.token[parseInt(i) - 1][j]);
  }
  if (i != 19 && Game.token[parseInt(i) + 1][j] != undefined) { // neighboor on bottom
    if (tokenColor == Game.token[parseInt(i) + 1][j].player) friend(Game.token[i][j], Game.token[parseInt(i) + 1][j]);
    else ennemi(Game.token[i][j], Game.token[parseInt(i) + 1][j]);
  }
  if (j != 0 && Game.token[i][parseInt(j) - 1] != undefined) { // neighboor on left
    if (tokenColor == Game.token[i][parseInt(j) - 1].player) friend(Game.token[i][j], Game.token[i][parseInt(j) - 1]);
    else ennemi(Game.token[i][j], Game.token[i][parseInt(j) - 1]);
  }
  if (j != 19 && Game.token[i][parseInt(j) + 1] != undefined) { // neighboor on right
    if (tokenColor == Game.token[i][parseInt(j) + 1].player) friend(Game.token[i][j], Game.token[i][parseInt(j) + 1]); 
    else ennemi(Game.token[i][j], Game.token[i][parseInt(j) + 1]);
  }
}

// Function who remove liberty and create group
function friend(tokenA, tokenB) {
  tokenA.liberty--;
  tokenB.liberty--;
  tokenA.friendTabPosition.push(tokenB.tabPosition);
  tokenB.friendTabPosition.push(tokenA.tabPosition);
  if (tokenB.group == undefined && tokenA.group == undefined) setGroupUndefined(tokenA, tokenB);
  else setGroupDefined(tokenA, tokenB);
}

// Function who create a group if the tokens aren't grouped
function setGroupUndefined(tokenA, tokenB) {
  tokenA.group = true;
  tokenB.group = true;
}

// Function who add a token to a group
function setGroupDefined(tokenA, tokenB) {
  tokenA.group = true;
}

// Function who merge Group
function mergeGroup() {

}

// Function who remove liberty or token / group of tokens
function ennemi(tokenA, tokenB) {
  tokenA.liberty--;
  tokenB.liberty--;
  if (tokenA.liberty == 0 && tokenA.group == undefined) removeSoloToken(tokenA); // NEED TO PREVENT THIS CASE
  if (tokenB.liberty == 0 && tokenB.group == undefined) removeSoloToken(tokenB);
  if (tokenB.liberty == 0 && tokenB.group == true)  {
    checkGroup(tokenB, Game.data.numberOfTokenInGroup);
    console.log(Game.data.numberOfTokenInGroup);
    console.log(Game.data.numberOfTokenInGroupWithoutLiberty);
    if (Game.data.numberOfTokenInGroup == Game.data.numberOfTokenInGroupWithoutLiberty) console.log('remove group');
  }
}

// Function who compt how many token is in the current group
function checkGroup(token, number) {
  if (token.alreadyAddToNumberOfToken == false) {
    Game.data.numberOfTokenInGroup++
    token.alreadyAddToNumberOfToken = true;
    if (token.liberty == 0) Game.data.numberOfTokenInGroupWithoutLiberty++
  }
  for (i = 0; i < token.friendTabPosition.length; i++) {
    if ((token.friendTabPosition.length - 1) == i) token.checked = true; // Need to resolve loop problem (carré de token)
    var explode = token.friendTabPosition[i].split('_');
    if (Game.token[explode[0]][explode[1]].checked != true) {
      checkGroup(Game.token[explode[0]][explode[1]], Game.data.numberOfTokenInGroup);
    }
  }
}

function removeGroup(token) { //recursive

}


// Function who remove a token
function removeSoloToken(token) {
  var currentElement = document.getElementById(token.i + '_' + token.j);
  currentElement.className = 'checkerboardCross';
  Game.token[token.i][token.j] = undefined;
}

// Function who add an EventListener on an event
function live(eventType, elementId, callback) {
  document.addEventListener(eventType, function (event) {
    if (event.target.id === elementId) {
      callback.call(event.target);
    }
  });
}

// Loop who add click on each intersection
for (var i = 0; i < Game.data.td.length; i++) {
	var currentElement = Game.data.td[i];
	live('click', currentElement.id, function() {
    Game.data.numberOfTokenInGroup = 0;
    Game.data.numberOfTokenInGroupWithoutLiberty = 0;
    for (i = 0; i < 18; i++) { // reset
      for (j = 0; j < 18; j++) {
        if (Game.token[i][j] != undefined) Game.token[i][j].checked = undefined;
        if (Game.token[i][j] != undefined) Game.token[i][j].alreadyAddToNumberOfToken = false;
      }
    }
		var explode = this.id.split('_');
		var isToken = this.className;
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

// Create a bidemensional array in Game.token
for (i = 0; i < 19; i++) {
  Game.token[i] = [];
  for (j = 0; j < 19; j++) {
    Game.token[i][j] = undefined;
  }
}

console.log(Game);