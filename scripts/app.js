var tableau = new Array();

// Création du tableau
function createTab() {
	for (i = 0; i < 19; i++)
	{
		tableau[i] = [];

		for (j = 0; j < 19; j++)
		{
			tableau[i][j] = 0;
		}
	}
}

// Fonction qui écrit le tableau Game dans l'html
function drawGame() {
	var html = document.getElementById("board");
	var draw = "";
	
	for (i = 1; i < 20; i++)
	{
		draw += "<tr>";

		for (j = 1; j < 20; j++)
		{
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

createTab();
drawGame();
console.log(tableau);