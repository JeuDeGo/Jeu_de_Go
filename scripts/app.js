
/**
*Constructor
**/
var Game = {
	player : 'black',
	td : document.getElementsByTagName('td'),
	token : new Array(),
	group : new Array(),
	table : new Array(),
	CreateTab : function() {
		for (i = 0; i < 19; i++) {
			Game.table[i] = [];
			for (j = 0; j < 19; j++) {
				Game.table[i][j] = 0;
			}
		}
	},
	CreateToken : function(i, j, tabPosition) {
		this.i = parseInt(i);
		this.j = parseInt(j);
		this.tabPosition = parseInt(tabPosition);
		this.player = Game.player;
		this.ennemi = 0;
		this.friend = 0;
		this.friendTabPosition = new Array();
		this.surrounded = false;
	},
	CreateGroup : function(x, y) {
		this.tokenTabPosition = [x, y]; 
		this.player = Game.player;
		this.surrounded = false;
	}
};

// Creation of Game.table
Game.CreateTab();

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
for (var i = 0; i < Game.td.length; i++) {
	var currentElement = Game.td[i];
	live('click', currentElement.id, function() {
		var explode = this.id.split('_');
		var isToken = this.className;
		if (isToken != 'tokenWhite' && isToken != 'tokenBlack') { // Prevent click if the cell is a token
			if (Game.player == 'white') {
				this.className = 'tokenWhite';
				Game.token[Game.token.length] = new Game.CreateToken(explode[0], explode[1], Game.token.length);
			} else {
				this.className = 'tokenBlack';
				Game.token[Game.token.length] = new Game.CreateToken(explode[0], explode[1], Game.token.length);
			}
			neighbour();
			Game.player = ((Game.player == 'white') ? 'black' : 'white');
		}
	});
}

// Function who calcuate how many neighbour each token have, and wich kind (ennemi or friend)
function neighbour() {
	for (k = 0; k < Game.token.length; k++) {
		Game.token[k].ennemi = 0;
		Game.token[k].friend = 0;
		Game.token[k].friendTabPosition = [];
		for (l = 0; l < Game.token.length; l++) {
			if (k != l && Game.token[k].player != Game.token[l].player) { // ennemi :
				if ((Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j + 1) || // right
					(Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j - 1) || // left
					(Game.token[k].i == Game.token[l].i + 1 && Game.token[k].j == Game.token[l].j) ||	// bottom
					(Game.token[k].i == Game.token[l].i - 1 && Game.token[k].j == Game.token[l].j))	{	// top
					Game.token[k].ennemi++;
				}
			} else if (k != l && Game.token[k].player == Game.token[l].player) { // friend :
				if ((Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j + 1) || // right
					(Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j - 1) || // left
					(Game.token[k].i == Game.token[l].i + 1 && Game.token[k].j == Game.token[l].j) ||	// bottom
					(Game.token[k].i == Game.token[l].i - 1 && Game.token[k].j == Game.token[l].j))	{	// top
					Game.token[k].friend++;
					Game.token[k].friendTabPosition.push(Game.token[l].tabPosition);
					Game.group[Game.group.length] = new Game.CreateGroup(Game.token[k].tabPosition, Game.token[l].tabPosition);
				}
			}
		}
		if (Game.token[k].ennemi != 0 && (Game.token[k].ennemi + Game.token[k].friend == 4)) Game.token[k].surrounded = true;
	}
	removeToken();
}

// Function who remove a token circled by 4 ennemis
function removeToken() {
	for (i = 0; i < Game.token.length; i++) {
		if ((Game.token[i].friend == 0) && (Game.token[i].ennemi == 4)) {
			var removeIt = document.getElementById(Game.token[i].i + '_' + Game.token[i].j);
			removeIt.className = 'checkerboardCross'; // Change class name of current element
			Game.token.splice(Game.token[i].tabPosition, 1); // Delete token in Game.token tab
			for (j = 0; j < Game.token.length; j++) Game.token[j].tabPosition = j; // actualise table position of all token
		}
	}
}