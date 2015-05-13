/**
*Local Variables
**/
var table = new Array();
var rules = new Array();
var td = document.getElementsByTagName('td');
var player = 'white';

// constructor of Token object
var Token = function(i, j, player, tabPosition) {
	this.i = parseInt(i);
	this.j = parseInt(j);
	this.tabPosition = parseInt(tabPosition);
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
		if (isToken != 'tokenWhite' || isToken != 'tokenBlack') { // Prevent click if the cell is a token
			if (player == 'white') {
				this.className = 'tokenWhite';
				rules[rules.length] = new Token(explode[0], explode[1], 'white', rules.length);
				player = 'black';
			} else {
				this.className = 'tokenBlack';
				rules[rules.length] = new Token(explode[0], explode[1], 'black', rules.length);
				player = 'white';
			}
			neighbour();
		}
	});
}

// Function who calcuate how many neighbour each token have, and wich kind (ennemi or friend)
function neighbour() {
	for (k = 0; k < rules.length; k++) {
		rules[k].ennemi = 0;
		rules[k].friend = 0;
		for (l = 0; l < rules.length; l++) {
			if (k != l && rules[k].player != rules[l].player) { // ennemi :
				if ((rules[k].i == rules[l].i && rules[k].j == rules[l].j + 1) || // right
					(rules[k].i == rules[l].i && rules[k].j == rules[l].j - 1) || // left
					(rules[k].i == rules[l].i + 1 && rules[k].j == rules[l].j) ||	// bottom
					(rules[k].i == rules[l].i - 1 && rules[k].j == rules[l].j))	{	// top
					rules[k].ennemi++;
				}
			} else if (k != l && rules[k].player == rules[l].player) { // friend :
				if ((rules[k].i == rules[l].i && rules[k].j == rules[l].j + 1) || // right
					(rules[k].i == rules[l].i && rules[k].j == rules[l].j - 1) || // left
					(rules[k].i == rules[l].i + 1 && rules[k].j == rules[l].j) ||	// bottom
					(rules[k].i == rules[l].i - 1 && rules[k].j == rules[l].j))	{	// top
					rules[k].friend++;
				}
			}
		}
	}
	removeToken();
}

// Function who remove a token circled by 4 ennemis
function removeToken() {
	for (i = 0; i < rules.length; i++) {
		if ((rules[i].friend == 0) && (rules[i].ennemi == 4)) {
			var removeIt = document.getElementById(rules[i].i + '_' + rules[i].j);
			removeIt.className = 'checkerboardCross'; // Change class name of current element
			rules.splice(rules[i].tabPosition, 1); // Delete token in rules tab
			for (j = i; j < rules.length; j++) rules[j].tabPosition--; // actualise table position of all token
		}
	}
}