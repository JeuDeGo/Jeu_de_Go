
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
	constructor : {
		CreateToken : function(i, j, tabPosition) {
			this.i = parseInt(i);
			this.j = parseInt(j);
			this.tabPosition = parseInt(tabPosition);
			this.player = Game.data.player;
			this.initialLiberty = Game.otherFunction.libertyNumber(i, j);
			this.liberty = this.initialLiberty;
			this.friendTabPosition;
			this.group = 0;
		},
	},
	otherFunction : {
		libertyNumber : function (i, j) {
			if ((i == 1 && j == 1) || (i == 1 && j == 19) || (i == 19 && j == 1) || (i == 19 && j == 19)) {
				return 2;
			} else if ((i == 1 && j != 1) || (i == 1 && j != 19) || (i != 19 && j == 1) || (i != 19 && j == 19)) {
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
			removeToken();
			Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
		}
	});
}

// Function who calcuate how many neighbour each token have, and wich kind (ennemi or friend)
function neighbourhood() {
	for (j = 0; j < Game.token.length; j++) Game.token[j].group = 0; // reset group
	Game.data.groupLength = 1;
	Game.data.table = [];
	for (k = 0; k < Game.token.length; k++) {
		Game.token[k].liberty = Game.token[k].initialLiberty;
		Game.token[k].group = 0;
		for (l = 0; l < Game.token.length; l++) {
			if (k != l && Game.token[k].player != Game.token[l].player) { // ennemi :
				if ((Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j + 1) || // right
					(Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j - 1) || // left
					(Game.token[k].i == Game.token[l].i + 1 && Game.token[k].j == Game.token[l].j) ||	// bottom
					(Game.token[k].i == Game.token[l].i - 1 && Game.token[k].j == Game.token[l].j))	{	// top

					// Remove liberty
					Game.token[k].liberty--;
				}
			} else if (k != l && Game.token[k].player == Game.token[l].player) { // manage group :
				if ((Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j + 1) || // right
					(Game.token[k].i == Game.token[l].i && Game.token[k].j == Game.token[l].j - 1) || // left
					(Game.token[k].i == Game.token[l].i + 1 && Game.token[k].j == Game.token[l].j) ||	// bottom
					(Game.token[k].i == Game.token[l].i - 1 && Game.token[k].j == Game.token[l].j))	{	// top

					Game.token[k].liberty--;

					// group the tokens
					if (Game.token[k].group == 0 && Game.token[l].group == 0) { // new group
						Game.token[k].group = Game.data.groupLength;
						Game.token[l].group = Game.token[k].group;
						Game.data.groupLength++;
						Game.data.table[Game.token[k].group] = new Array();
						Game.data.table[Game.token[k].group].push(Game.token[k].tabPosition);
					} else if (Game.token[k].group == 0 && Game.token[l].group != 0) {
						Game.token[k].group = Game.token[l].group;
						Game.data.table[Game.token[k].group].push(Game.token[k].tabPosition);
					} else if (Game.token[k].group != 0 && Game.token[l].group == 0) {
						Game.token[l].group = Game.token[k].group;
					} 

					/*else if (Game.token[k].group != 0 && Game.token[l] != 0) { // NEED TO ADD GROUP MERGE !!!
						Game.token[l].group = Game.token[k].group;
					} */
				}
			}
		}
	}
}

// Function who remove a token circled by 4 ennemis
function removeToken() {
	for (i = 0; i < Game.token.length; i++) {
		if (Game.token[i].group == 0 && Game.token[i].liberty == 0) { // Token without group
			var removeIt = document.getElementById(Game.token[i].i + '_' + Game.token[i].j);
			removeIt.className = 'checkerboardCross'; // NEED TO ADD CLASS IN FONCTION OF I AND J !!!
			Game.token.splice(Game.token[i].tabPosition, 1); // Delete token in Game.token tab
			for (j = 0; j < Game.token.length; j++) Game.token[j].tabPosition = j; // actualise table position of all token
		} else if ( Game.token[i].group != 0 && Game.token[i].liberty == 0) {
			var check = Game.data.table[Game.token[i].group].length;
			for (j = 0; j < Game.data.table[Game.token[i].group].length; j++) {
				if (Game.token[Game.data.table[Game.token[i].group][j]].liberty == 0) check--;
			}
			if (check == 0) {
				for (j = 0; j < Game.data.table[Game.token[i].group].length; j++) {
					var removeIt = document.getElementById(Game.token[Game.data.table[Game.token[i].group][j]].i + '_' + Game.token[Game.data.table[Game.token[i].group][j]].j);
					removeIt.className = 'checkerboardCross'; // NEED TO ADD CLASS IN FONCTION OF I AND J !!!
				}
				// NEED TO ADD REMOVING OF Game.token[k] !!!
				// NEED TO ADD REMOVING OF Game.data.table[Game.token[k].group] !!!
			}
		}
	}
}