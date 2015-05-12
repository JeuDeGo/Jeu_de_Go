var tableau = new Array();

/**
*Grille
*
**/

function creerTableau() {
	for (i = 0; i < 19; i++)
	{
		tableau[i] = [];

		for (j = 0; j < 19; j++)
		{
			tableau[i][j] = 1;
		}
	}
}

creerTableau();
console.log(tableau);