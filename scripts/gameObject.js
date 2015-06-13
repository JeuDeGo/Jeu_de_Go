var Game = {
	data: {
		player : 'black',
		td : document.getElementsByTagName('td'),
    tabPositionOfGroupToRemove : new Array(),
    tabPositionOfEnnemi : new Array(),
    pointBlackPlayer : 0,
    pointWhitePlayer : 0,
    suicide : false,
    koState : false,
    pass : false
	},
	ko : new Array(),
	token : new Array(),
	constructor : {
		CreateToken : function(i, j) {
			this.i = parseInt(i);
			this.j = parseInt(j);
			this.player = Game.data.player;
			this.liberty = libertyNumber(i, j);
			this.friendTabPosition = new Array();
			this.group = undefined;
      this.checked = undefined;
      this.precedentToken = undefined;
      this.tabPosition = i + '_' + j;
		}
	}
};

for (i = 0; i < 19; i++) {
  Game.token[i] = [];
  for (j = 0; j < 19; j++) {
    Game.token[i][j] = undefined;
  }
}

// Create the checkerboard & the array in Game.token
drawGame();
gamePoint(Game.data.pointBlackPlayer, 'blackPlayer', 'black');
gamePoint(Game.data.pointWhitePlayer, 'whitePlayer', 'white');

console.log(Game);