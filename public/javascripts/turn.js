// Function use for pass a player turn
function turn() {
  if ((Game.data.player == 'black' && black == true) ||
  (Game.data.player == 'white' && black == false)) {
    console.log('pass');
    Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
    if (Game.data.pass == true) {
      
      // NEED TO ADD CALCUL OF TERRITORY
      territory();
      if (Game.data.pointBlackPlayer > Game.data.pointWhitePlayer) {
        alert('Black player win this game');
      } else if (Game.data.pointBlackPlayer < Game.data.pointWhitePlayer) {
        alert('White player win this game');
      } else {
        alert('Draw!');
      }
    }
    Game.data.pass = true;
    
    var socket = io.connect();   
    socket.emit("board_send", Game, room);
  }
}
