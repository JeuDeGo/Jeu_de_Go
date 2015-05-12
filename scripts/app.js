/**
*Grille
*
**/

function creerTableau() {
	for (i = 0; i < X; i++)
	{
		tableau[i] = [];

		for (j = 0; j < Y; j++)
		{
			tableau[i][j] = 1;
		}
	}
}
