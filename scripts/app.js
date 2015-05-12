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
	this.neighbour = 0;
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
			if ((i ==1) && (j == 1)) {
				draw += "<td class = 'checkerboardCornerTopLeft'";
			} else if ((i ==1) && (j == 19)) {
				draw += "<td class = 'checkerboardCornerTopRight'";
			} else if ((i ==19) && (j == 1)) {
				draw += "<td class = 'checkerboardCornerBottomLeft'";
			} else if ((i ==19) && (j == 19)) {
				draw += "<td class = 'checkerboardCornerBottomRight'";
			} else if (j == 1) {
				draw += "<td class = 'checkerboardLeft'";
			} else if (i == 1) {
				draw += "<td class = 'checkerboardTop'";
			} else if (j == 19) {
				draw += "<td class = 'checkerboardRight'";
			} else if (i == 19) {
				draw += "<td class = 'checkerboardBottom'";
			} else {
				draw += "<td class = 'checkerboardCross'";
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

// Function who calcuate how many neighbour each token have
function neighbour() {
	for (k = 0; k < rules.length; k++) {
		rules[k].neighbour = 0;
		for (l = 0; l < rules.length; l++) {
			if ((k != l) && ((rules[k].i) == (rules[l].i)) && ((rules[k].j) == (rules[l].j + 1))) {
				console.log('token ' + rules[k].i + '_' + rules[k].j + ' got a neighbour on his right');
				rules[k].neighbour++;
			}
			if ((k != l) && ((rules[k].i) == (rules[l].i)) && ((rules[k].j) == (rules[l].j - 1))) {
				console.log('token ' + rules[k].i + '_' + rules[k].j + ' got a neighbour on his left');
				rules[k].neighbour++;
			}
			if ((k != l) && ((rules[k].i) == (rules[l].i + 1)) && ((rules[k].j) == (rules[l].j))) {
				console.log('token ' + rules[k].i + '_' + rules[k].j + ' got a neighbour on his bottom');
				rules[k].neighbour++;
			}
			if ((k != l) && ((rules[k].i) == (rules[l].i - 1)) && ((rules[k].j) == (rules[l].j))) {
				console.log('token ' + rules[k].i + '_' + rules[k].j + ' got a neighbour on his top');
				rules[k].neighbour++;
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