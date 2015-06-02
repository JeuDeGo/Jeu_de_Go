// Function who prevent the suicide
function suicide (token) {
	if (token.group == undefined && token.liberty == 0) {
		alert('You can\'t play there, it\' a suicide');
	}
}