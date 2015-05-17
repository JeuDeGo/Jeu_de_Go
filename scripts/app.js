/**
*Local Variables
**/
var table = new Array();
var td = document.getElementsByTagName('td');
var player = 'black';

/**
*constructor of Token object
**/

var Rules = function() {
	this.token = new Array();
	this.group = new Array();
};
var White = function(i, j, tabPosition) {
	this.i = parseInt(i);
	this.j = parseInt(j);
	this.tabPosition = parseInt(tabPosition);
	this.player = 'white';
	this.ennemi = 0;
	this.friend = 0;
	this.friendTabPosition = new Array();
	this.surrounded = false;
};
var Black = function(i, j, tabPosition) {
	this.i = parseInt(i);
	this.j = parseInt(j);
	this.tabPosition = parseInt(tabPosition);
	this.player = 'black';
	this.ennemi = 0;
	this.friend = 0;
	this.friendTabPosition = new Array();
	this.surrounded = false;
};

// Function who create the table
function createTab() {
	for (i = 0; i < 19; i++) {
		table[i] = [];
		for (j = 0; j < 19; j++) {
			table[i][j] = 0;
		}
	}
}
createTab();
var game = new Rules();

// Function who draw the game into the DOM
function drawGame() {
	var html = document.getElementById("board");
	var draw = "";
	
	for (i = 1; i < 20; i++) {
		draw += "<tr>";
		for (j = 1; j < 20; j++) {
			draw += "<td class = "
			if ((i ==1) && (j == 1)) {
				draw += "'checkerboardCornerTopLeft'";
			} else if ((i ==1) && (j == 19)) {
				draw += "'checkerboardCornerTopRight'";
			} else if ((i ==19) && (j == 1)) {
				draw += "'checkerboardCornerBottomLeft'";
			} else if ((i ==19) && (j == 19)) {
				draw += "'checkerboardCornerBottomRight'";
			} else if (j == 1) {
				draw += "'checkerboardLeft'";
			} else if (i == 1) {
				draw += "'checkerboardTop'";
			} else if (j == 19) {
				draw += "'checkerboardRight'";
			} else if (i == 19) {
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

// Function who add an EventListener on an event
function live(eventType, elementId, callback) {
  document.addEventListener(eventType, function (event) {
      if (event.target.id === elementId) {
        callback.call(event.target);
      }
  });
}

// Loop who add click on each intersection
for (var i = 0; i < td.length; i++) {
	var currentElement = td[i];
	live('click', currentElement.id, function() {
		var explode = this.id.split('_');
		var isToken = this.className;
		if (isToken != 'tokenWhite' && isToken != 'tokenBlack') { // Prevent click if the cell is a token
			if (player == 'white') {
				this.className = 'tokenWhite';
				game.token[game.token.length] = new White(explode[0], explode[1], game.token.length);
				player = 'black';
			} else {
				this.className = 'tokenBlack';
				game.token[game.token.length] = new Black(explode[0], explode[1], game.token.length);
				player = 'white';
			}
			neighbour();
		}
	});
}

// Function who calcuate how many neighbour each token have, and wich kind (ennemi or friend)
function neighbour() {
	for (k = 0; k < game.token.length; k++) {
		game.token[k].ennemi = 0;
		game.token[k].friend = 0;
		game.token[k].friendTabPosition = [];
		for (l = 0; l < game.token.length; l++) {
			if (k != l && game.token[k].player != game.token[l].player) { // ennemi :
				if ((game.token[k].i == game.token[l].i && game.token[k].j == game.token[l].j + 1) || // right
					(game.token[k].i == game.token[l].i && game.token[k].j == game.token[l].j - 1) || // left
					(game.token[k].i == game.token[l].i + 1 && game.token[k].j == game.token[l].j) ||	// bottom
					(game.token[k].i == game.token[l].i - 1 && game.token[k].j == game.token[l].j))	{	// top
					game.token[k].ennemi++;
				}
			} else if (k != l && game.token[k].player == game.token[l].player) { // friend :
				if ((game.token[k].i == game.token[l].i && game.token[k].j == game.token[l].j + 1) || // right
					(game.token[k].i == game.token[l].i && game.token[k].j == game.token[l].j - 1) || // left
					(game.token[k].i == game.token[l].i + 1 && game.token[k].j == game.token[l].j) ||	// bottom
					(game.token[k].i == game.token[l].i - 1 && game.token[k].j == game.token[l].j))	{	// top
					game.token[k].friend++;
					game.token[k].friendTabPosition.push(game.token[l].tabPosition);
				}
			}
		}
		if (game.token[k].ennemi != 0 && (game.token[k].ennemi + game.token[k].friend == 4)) game.token[k].surrounded = true;
	}
	removeToken();
}

// Function who remove a token circled by 4 ennemis
function removeToken() {
	for (i = 0; i < game.token.length; i++) {
		if ((game.token[i].friend == 0) && (game.token[i].ennemi == 4)) {
			var removeIt = document.getElementById(game.token[i].i + '_' + game.token[i].j);
			removeIt.className = 'checkerboardCross'; // Change class name of current element
			game.token.splice(game.token[i].tabPosition, 1); // Delete token in game.token tab
			for (j = 0; j < game.token.length; j++) game.token[j].tabPosition = j; // actualise table position of all token
		}
	}
}