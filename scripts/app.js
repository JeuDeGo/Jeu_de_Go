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
			if ((i == 1) || (j == 1)) {
				draw += "<td class = 'checkerboard' id='"+ i + "_" + j + "'></td>";
			} else {
			draw += "<td class = 'checkerboard' id='"+ i + "_" + j + "'></td>";
			}
		}
		draw += "</tr>";
	}
	html.innerHTML = draw;
}

createTab();
drawGame();
console.log(tableau);