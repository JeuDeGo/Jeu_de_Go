var Game = {
	data: {
		player : 'black',
		td : document.getElementsByTagName('td'),
		group : new Array(),
    groupPosition : new Array()
	},
	token : new Array(),
	constructor : {
		CreateToken : function(i, j) {
			this.i = parseInt(i);
			this.j = parseInt(j);
			this.player = Game.data.player;
			this.initialLiberty = Game.otherFunction.libertyNumber(i, j);
			this.liberty = this.initialLiberty;
			this.friendTabPosition;
			this.group = undefined;
      this.neighbour = 0;
      this.tabPosition = i + '_' + j;
      this.friendTabPosition = new Array();
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
	},
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
  if (i != 0 && Game.token[(i - 1)][j] != undefined) { // neighboor on top
    console.log('neighboor on top');
  }
  console.log(i + 1 + '_' + j);
  if (i != 19 && Game.token[(i + 1)][j] != undefined) { // neighboor on bottom
    console.log('neighboor on bottom');
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

// Loop who add click on each intersection
for (var i = 0; i < Game.data.td.length; i++) {
	var currentElement = Game.data.td[i];
	live('click', currentElement.id, function() {
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

// create a bidimensional array in Game.data.groupPosition
for (i = 0; i < 19; i++) {
  Game.data.groupPosition[i] = [];
  for (j = 0; j < 19; j++) {
    Game.data.groupPosition[i][j] = undefined;
  }
}

for (i = 0; i < 19; i++) {
  Game.token[i] = [];
  for (j = 0; j < 19; j++) {
    Game.token[i][j] = undefined;
  }
}

console.log(Game);