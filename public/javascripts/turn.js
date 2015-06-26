// Function use for pass a player turn
function turn() {
  if ((Game.data.player == 'black' && black == true) ||
  (Game.data.player == 'white' && black == false)) {
    console.log('pass');
    Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
    if (Game.data.pass == true) {
      
      // NEED TO ADD CALCUL OF TERRITORY
      territory();
      alert('end of game');
    }
    Game.data.pass = true;
    
    var socket = io.connect('http://born2hack.herokuapp.com:8000');   
    io.sockets.in(room).emit("board_send", Game);
  }
}