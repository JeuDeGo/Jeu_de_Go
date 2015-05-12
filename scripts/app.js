var table = new Array();
var td = document.getElementsByTagName('td');
var player = 'white';
var rules = new Array();


rules[1] = new Array();

// constructor of tokens
var Token = function(i, j, player) {
	this.i = i;
	this.j = j;
	this.player = player;
	this.neighbour;

};

// create the table
function createTab() {
	for (i = 0; i < 19; i++)
	{
		table[i] = [];

		for (j = 0; j < 19; j++)
		{
			table[i][j] = 0;
		}
	}
}

// Draw the game into the DOM
function drawGame() {
	var html = document.getElementById("board");
	var draw = "";
	
	for (i = 1; i < 20; i++)
	{
		draw += "<tr>";
		for (j = 1; j < 20; j++) {
			if ((i ==1) && (j == 1)) {
				draw += "<td class = 'checkerboardCornerTopLeft' id='"+ i + "_" + j + "'></td>";
			} else if ((i ==1) && (j == 19)) {
				draw += "<td class = 'checkerboardCornerTopRight' id='"+ i + "_" + j + "'></td>";
			} else if ((i ==19) && (j == 1)) {
				draw += "<td class = 'checkerboardCornerBottomLeft' id='"+ i + "_" + j + "'></td>";
			} else if ((i ==19) && (j == 19)) {
				draw += "<td class = 'checkerboardCornerBottomRight' id='"+ i + "_" + j + "'></td>";
			} else if (j == 1) {
				draw += "<td class = 'checkerboardLeft' id='"+ i + "_" + j + "'></td>";
			} else if (i == 1) {
				draw += "<td class = 'checkerboardTop' id='"+ i + "_" + j + "'></td>";
			} else if (j == 19) {
				draw += "<td class = 'checkerboardRight' id='"+ i + "_" + j + "'></td>";
			} else if (i == 19) {
				draw += "<td class = 'checkerboardBottom' id='"+ i + "_" + j + "'></td>";
			} else {
				draw += "<td class = 'checkerboardCross' id='"+ i + "_" + j + "'></td>";
			}
		}
		draw += "</tr>";
	}
	html.innerHTML = draw;
}

// Add click on the board 
function live(eventType, elementId, cb) {
    document.addEventListener(eventType, function (event) {
        if (event.target.id === elementId) {
            cb.call(event.target, event);
        }
    });
}

function neighbour() {
	for (k = 0; k < rules.length; k++) {
		for (l = 0; l < rules.length; l++) {
			console.log('yo');
			if (((rules[k].Token.i) + 1) == (rules[l].Token.i)) {
				console.log ('done');
			}
		}
	}
}

createTab();
drawGame();

for (var i = 0; i < td.length; i++) {

	var currentElement = td[i];

	live('click', currentElement.id, function() {
		var explode = this.id.split('_');
		if (player == 'white') {
			this.className = 'tokenWhite';
			player = 'black';
			rules[explode] = new Token(explode[0], explode[1], 'white');
		} else {
			this.className = 'tokenBlack';
			player = 'white';
			rules[explode] = new Token(explode[0], explode[1], 'black');
		}
		console.log(rules);
		neighbour();
	});
}