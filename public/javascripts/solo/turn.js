// Function use for pass a player turn
function turn() {
  Game.data.player = ((Game.data.player == 'white') ? 'black' : 'white');
  if (Game.data.pass == true) {
    territory();
    alert('end of game');
  }
  Game.data.pass = true;
}