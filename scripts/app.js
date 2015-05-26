var Game = {
	data: {
		player : 'black',
		td : document.getElementsByTagName('td'),
		group : new Array(),
    groupPosition : new Array()
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
			this.group = undefined;
      this.neighbour = 0;
      this.friendTabPosition = new Array();
		}
	},
	otherFunction : {
		libertyNumber : function (i, j) {
			if (i == 1 && j == 1 || i == 1 && j == 19 || i == 19 && j == 1 || i == 19 && j == 19) {

				return 2;
			} else if (i == 1 && j != 1 || i == 1 && j != 19 || i == 19 && j != 1 || i == 19 && j != 19) {

				return 3;
			} else if (j == 1 && i != 1 || j == 1 && i != 19 || j == 19 && i != 1 || j == 19 && i != 19) {

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

// Function who calcuate how many neighbour each token have, and wich kind (ennemi or friend)
function neighbourhood() {
  for (j = 0; j < Game.token.length; j++) Game.token[j].group = undefined; // reset group
  Game.data.group = [];

  for (k = 0; k < Game.token.length; k++) {
    var A = Game.token[k];

    A.liberty = A.initialLiberty;
    A.friendTabPosition = [];

    for (l = 0; l < Game.token.length; l++) {
      var B = Game.token[l];

      if ((k != l && A.player !== B.player) && 
      ((A.i == B.i && A.j == B.j + 1) || // right
      (A.i == B.i && A.j == B.j - 1) || // left
      (A.i == B.i + 1 && A.j == B.j) || // bottom
      (A.i == B.i - 1 && A.j == B.j)))  { // top
        A.liberty--; // Remove liberty
      } else if ((k != l && A.player == B.player) &&  // manage group :
      ((A.i == B.i && A.j == B.j + 1) || // right
      (A.i == B.i && A.j == B.j - 1) || // left
      (A.i == B.i + 1 && A.j == B.j) || // bottom
      (A.i == B.i - 1 && A.j == B.j)))  { // top
        A.liberty--; // Remove liberty
        group(A, B);
        A.friendTabPosition.push(B.tabPosition);
        B.friendTabPosition.push(A.tabPosition);
      }
    }
  }
}

function group(A, B) {
  if (A.group == undefined && B.group == undefined) {
  console.log('group'), // create new group
    A.group = Game.data.group.length;
    B.group = A.group;
    Game.data.group[A.group] = new Array();
    Game.data.group[A.group].push(A.tabPosition);
  } else if (A.group != undefined && B.group != undefined && A.group != B.group) { // merge group A with group B
    mergeGroup(A.group, B.group);
  } else if (A.group != undefined && B.group != undefined && A.group == B.group) {
    Game.data.group[A.group].push(A.tabPosition);
  } else if (A.group == undefined && B.group != undefined) { // add group to A.group
    A.group = B.group;
    Game.data.group[A.group].push(A.tabPosition);
  } else if (A.group != undefined && B.group == undefined) { // add group to B.group
    B.group = A.group;
  }
}

function mergeGroup(A, B) {
  if (A < B) {
    for (m = 0; m < Game.data.group[B].length; m++) {
      Game.data.group[A].push(Game.data.group[B][m]);
      //Game.token[Game.data.group[B][m]].group = A;
      for (j = Game.data.group[B]; j < Game.data.group.length; j++) Game.data.group[j].tabPosition = j;
    }
    // Game.data.group.splice(B, 1);
    Game.data.group[B] = 0;
  } else {
    for (m = 0; m < Game.data.group[A].length; m++) {
      Game.data.group[B].push(Game.data.group[A][m]);
      //Game.token[Game.data.group[B][m]].group = A;
    }
  }
}

// Function who remove a token circled by 4 ennemis
function removeToken() {
  for (i = 0; i < Game.token.length; i++) {
    if (Game.token[i].group == undefined && Game.token[i].liberty == 0) { // Token without group
      var removeIt = document.getElementById(Game.token[i].i + '_' + Game.token[i].j);
      removeIt.className = 'checkerboardCross'; // NEED TO ADD CLASS IN FONCTION OF I AND J
      Game.token.splice(Game.token[i].tabPosition, 1); // Delete token in Game.token tab

      for (j = 0; j < Game.token.length; j++) Game.token[j].tabPosition = j; // actualise group position of all token
    } else if ( Game.token[i].group != undefined && Game.token[i].liberty == 0) {
      var check = Game.data.group[Game.token[i].group].length;

      for (j = 0; j < Game.data.group[Game.token[i].group].length; j++) {
        if (Game.token[Game.data.group[Game.token[i].group][j]].liberty == 0) check--;
      }

      if (check == 0) {
        for (j = 0; j < Game.data.group[Game.token[i].group].length; j++) {
          var removeIt = document.getElementById(Game.token[Game.data.group[Game.token[i].group][j]].i + '_' + Game.token[Game.data.group[Game.token[i].group][j]].j);
          removeIt.className = 'checkerboardCross'; // NEED TO ADD CLASS IN FONCTION OF I AND J
        }
        // NEED TO ADD REMOVING OF Game.token[k] !!!
        // NEED TO ADD REMOVING OF Game.data.group[Game.token[k].group] !!!
      }
    }
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
				Game.token.push(new Game.constructor.CreateToken(explode[0], explode[1], Game.token.length));
			} else {
				this.className = 'tokenBlack';
				Game.token.push(new Game.constructor.CreateToken(explode[0], explode[1], Game.token.length));
			}
      Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
			neighbourhood();
			removeToken();
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

console.log(Game);