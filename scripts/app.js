/**
*Local Variables
**/
var table = new Array();
var rules = new Array();
var td = document.getElementsByTagName('td');
var player = 'white';
var rulesOrder = 0;

// constructor of Token object
var Token = function(i, j, player) {
	this.i = parseInt(i);
	this.j = parseInt(j);
	this.player = player;
	this.ennemi = 0;
	this.friend = 0;
};

// create the table
function createTab() {
	for (i = 0; i < 19; i++) {
		table[i] = [];
		for (j = 0; j < 19; j++) {
			table[i][j] = 0;
		}
	}
}
createTab();

// Draw the game into the DOM
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

// Function Event Listerner on click
function live(eventType, elementId, callback) {
  document.addEventListener(eventType, function (event) {
      if (event.target.id === elementId) {
        callback.call(event.target, event);
      }
  });
}

// Function who calcuate how many neighbour each token have, and wich kind (ennemi / friends)
function neighbour() {
	for (k = 0; k < rules.length; k++) {
		rules[k].ennemi = 0;
		rules[k].friend = 0;
		for (l = 0; l < rules.length; l++) {
			// ennemi
			if ((k != l) && (rules[k].player != rules[l].player)) {
				if((((rules[k].i) == (rules[l].i)) && ((rules[k].j) == (rules[l].j + 1))) ||	//right
					(((rules[k].i) == (rules[l].i)) && ((rules[k].j) == (rules[l].j - 1))) ||		// left
					(((rules[k].i) == (rules[l].i + 1)) && ((rules[k].j) == (rules[l].j))) ||		// bottom
					(((rules[k].i) == (rules[l].i - 1)) && ((rules[k].j) == (rules[l].j))))			//top
					rules[k].ennemi++;
			}
			// friend
			if ((k != l) && (rules[k].player == rules[l].player)) {
				// friend on right
				if (((rules[k].i) == (rules[l].i)) && ((rules[k].j) == (rules[l].j + 1))) {
					rules[k].friend++;
				}
				// friend on left
				if (((rules[k].i) == (rules[l].i)) && ((rules[k].j) == (rules[l].j - 1))) {
					rules[k].friend++;
				}
				// friend on bottom
				if (((rules[k].i) == (rules[l].i + 1)) && ((rules[k].j) == (rules[l].j))) {
					rules[k].friend++;
				}
				// friend on top
				if (((rules[k].i) == (rules[l].i - 1)) && ((rules[k].j) == (rules[l].j))) {
					rules[k].friend++;
				}
			}
		}
	}
}

// Loop who add click on each intersection
for (var i = 0; i < td.length; i++) {
	var currentElement = td[i];
	live('click', currentElement.id, function() {
		var explode = this.id.split('_');
		if (player == 'white') {
			this.className = 'tokenWhite';
			player = 'black';
			rules[rulesOrder] = new Token(explode[0], explode[1], 'white');
		} else {
			this.className = 'tokenBlack';
			player = 'white';
			rules[rulesOrder] = new Token(explode[0], explode[1], 'black');
		}
		rulesOrder++;
		neighbour();
	});
}