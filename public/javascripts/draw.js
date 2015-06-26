// Function who set a css class of a deleted token
function setClass(i, j) {
  var css;

  if (i == 0) {
    switch(j) {
      case 0:
        css = 'checkerboardCornerTopLeft';
        break;
      case 18:
        css = 'checkerboardCornerTopRight';
        break;
      default:
        css = 'checkerboardTop';
        break;
    }
  } else if (j == 0) {
    switch(i) {
      case 18:
        css = 'checkerboardCornerBottomLeft';
        break;
      default:
        css = 'checkerboardLeft';
        break;
    }
  } else if (i == 18) {
    switch(j) {
      case 18:
        css ='checkerboardCornerBottomRight';
        break;
      default:
        css = 'checkerboardBottom';
        break;
      }
  } else if (j == 18) {
      css = 'checkerboardRight';
  } else {
    css = 'checkerboardCross';
  }

  return css;
}

// Function who draw the Game into the DOM
function drawGame() {
  var html = document.getElementById("board");
  var draw = "";
  
  for (i = 0; i < 19; i++) {
    draw += "<tr>";
    for (j = 0; j < 19; j++) {
      draw += "<td class = "
      draw += setClass(i, j);
      draw += " id='"+ i + "_" + j + "'></td>";
    }
    draw += "</tr>";
  }
  html.innerHTML = draw;
}

// Function who draw again the Game object
function drawAgain() {
  var html = document.getElementById("board");
  var draw = "";
  
  for (i = 0; i < 19; i++) {
    draw += "<tr>";
    for (j = 0; j < 19; j++) {
      draw += "<td class = "
      if (Game.token[i][j] != undefined) {
        if (Game.token[i][j].player == 'white') draw += 'tokenWhite';
        else if (Game.token[i][j].player == 'black') draw += 'tokenBlack';
        else draw += setClass(i, j);
      }
      else draw += setClass(i, j);
      draw += " id='"+ i + "_" + j + "'></td>";
    }
    draw += "</tr>";
  }
  html.innerHTML = draw;
  gamePoint(Game.data.pointBlackPlayer, 'blackPlayer', 'black');
  gamePoint(Game.data.pointWhitePlayer, 'whitePlayer', 'white');
}