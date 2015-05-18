
/**
*Constructor
**/
var Game = {
	data: {
		player : 'black',
		td : document.getElementsByTagName('td'),
		table : new Array(),
		groupLength : 1
	},
	token : new Array(),
	group : new Array(),
	constructor : {
		CreateTab : function() {
			for (i = 0; i < 19; i++) {
				Game.data.table[i] = [];
				for (j = 0; j < 19; j++) {
					Game.data.table[i][j] = 0;
				}
			}
		},
		CreateToken : function(i, j, tabPosition) {
			this.i = parseInt(i);
			this.j = parseInt(j);
			this.tabPosition = parseInt(tabPosition);
			this.player = Game.data.player;
			this.ennemi = 0;
			this.friendTabPosition = new Array();
			this.group = 0;
		},
	}
};

// Creation of Game.table
Game.constructor.CreateTab();

// Function who draw the Game into the DOM
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
for (var i = 0; i < Game.data.td.length; i++) {
	var currentElement = Game.data.td[i];
	live('click', currentElement.id, function() {
		var explode = this.id.split('_');
		var isToken = this.className;
		if (isToken != 'tokenWhite' && isToken != 'tokenBlack') { // Prevent click if the cell is a token
			if (Game.data.player == 'white') {
				this.className = 'tokenWhite';
				Game.token[Game.token.length] = new Game.constructor.CreateToken(explode[0], explode[1], Game.token.length);
			} else {
				this.className = 'tokenBlack';
				Game.token[Game.token.length] = new Game.constructor.CreateToken(explode[0], explode[1], Game.token.length);
			}
			neighbourhood();
			Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
		}
	});
}

// Function who calcuate how many neighbour each token have, and wich kind (ennemi or friend)
function neighbourhood() {
	for (k = 0; k < Game.token.length; k++) {
		Game.token[k].ennemi = 0;
		Game.token[k].friendTabPosition = [];
		for (l = 0; l < Game.token.length; l++) {
			if (k != l && Game.token[k].player != Game.token[l].player) { // ennemi :
				if ((Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j + 1) || // right
					(Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j - 1) || // left
					(Game.token[k].i == Game.token[l].i + 1 && Game.token[k].j == Game.token[l].j) ||	// bottom
					(Game.token[k].i == Game.token[l].i - 1 && Game.token[k].j == Game.token[l].j))	{	// top
					// Add ennemi
					Game.token[k].ennemi++;
				}
			} else if (k != l && Game.token[k].player == Game.token[l].player) { // New Group :
				if ((Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j + 1) || // right
					(Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j - 1) || // left
					(Game.token[k].i == Game.token[l].i + 1 && Game.token[k].j == Game.token[l].j) ||	// bottom
					(Game.token[k].i == Game.token[l].i - 1 && Game.token[k].j == Game.token[l].j))	{	// top
					// Create new Group
					if (Game.token[k].group != 0 && Game.token[k].group == 0) { // Add token[k].group to token[l].group
						Game.token[l].group == Game.token[k].group;
					} else if (Game.token[k].group == 0 && Game.token[l].group != 0) {
						Game.token[k].group == Game.token[l].group;
					} else if (Game.token[k].group == 0 && Game.token[l].group == 0) {
						Game.token[k].group = Game.data.groupLength;
						Game.token[l].group = Game.token[k].group;
						Game.data.groupLength++;
					}
					/* Game.token[k].group = new Game.constructor.CreateGroup();
					// Replace data into this group
					Game.group[(Game.group.length) - 1].token.push(Game.token[k]);
					Game.group[(Game.group.length) - 1].token.push(Game.token[l]);
					//Delete token
					Game.token.splice(Game.token[l].tabPosition, 1);
					Game.token.splice(Game.token[k].tabPosition, 1);
					// actualise table position of all token

					for (j = 0; j < Game.token.length; j++) Game.token[j].tabPosition = j; */
				}
			}
		}
	}
	removeToken();
}

// Function who remove a token circled by 4 ennemis
function removeToken() {
	for (i = 0; i < Game.token.length; i++) {
		if (Game.token[i].ennemi == 4) {
			var removeIt = document.getElementById(Game.token[i].i + '_' + Game.token[i].j);
			removeIt.className = 'checkerboardCross'; // Change class name of current element
			Game.token.splice(Game.token[i].tabPosition, 1); // Delete token in Game.token tab
			for (j = 0; j < Game.token.length; j++) Game.token[j].tabPosition = j; // actualise table position of all token
		}
	}
}