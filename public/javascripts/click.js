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

    Game.data.suicide = false;
    Game.data.koState = false;
    Game.data.pass = false;
    for (i = 0; i < 19; i++) { // NEED TO ADD RESET ONLY ON CONCERNED TOKENS
      for (j = 0; j < 19; j++) {
        if (Game.token[i][j] != undefined) Game.token[i][j].checked = undefined;
        if (Game.token[i][j] != undefined) Game.token[i][j].precedentToken = undefined;
      }
    }
		if (isToken != 'tokenWhite' && isToken != 'tokenBlack') { // Prevent click if the cell is a token
			if (Game.data.player == 'white' && black == false) {
				this.className = 'tokenWhite';
				Game.token[explode[0]][explode[1]] = new Game.constructor.CreateToken(explode[0], explode[1]);
        neighbourhood(explode[0], explode[1], Game.token[explode[0]][explode[1]].player);
			} else if (Game.data.player == 'black' && black == true) {
				this.className = 'tokenBlack';
        Game.token[explode[0]][explode[1]] = new Game.constructor.CreateToken(explode[0], explode[1]);
        neighbourhood(explode[0], explode[1], Game.token[explode[0]][explode[1]].player);
			}
      if ((Game.data.player == 'black' && black == true) ||
      (Game.data.player == 'white' && black == false)) { 
        Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
      }
		}
    var socket = io.connect('http://born2hack.herokuapp.com:443');

    socket.emit("board_send", Game, room);

	});
}