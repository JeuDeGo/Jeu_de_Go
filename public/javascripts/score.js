// Function who copy into the DOM the number of points of each player
function gamePoint(playerScore, id, color) {
  var html = document.getElementById(id);
  var draw = "<div id = '" + id + "'> Score of " + color + " player : " + playerScore + "</div>";

  html.innerHTML = draw;
}