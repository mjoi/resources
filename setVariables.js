/*******************************************************************************
NAME: setVariables
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: Sets variables for a macro using an ad loaded from the user's ad db.
Ad loading occurs in main.js
*******************************************************************************/
function setVariables() {
	var keys = Object.keys(ad)
	for (step in keys.length) {
		var key = keys[step];
		var value = ad[key];
		iimSet(key, value);
	}
}
