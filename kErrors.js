/*******************************************************************************
NAME: kErrors
AUTHOR: Khan
CREATED: 3-3-16
REVISED: 3-30-16
DESC: Checks for errors before attempting to post new KSL ad, pushes any
errors to appropriate array (addressErrors or claimedErrors)
*******************************************************************************/

function kErrors() {
	// setup
	var checks = [ // checks format "error-type": logArray
		["verifyAddressError", "addressErrors"],
		["propertyService.duplicatePropertyError", "claimedErrors"]
	];

	// actions
	iPlay("kAddress"); // fills in k address form
	for (var step in checks)
	{
			// check for errors
			iimPlay('CODE:TAG POS=1 TYPE=DIV ATTR=NG-SHOW:' + checks[step][0] + '&&CLASS:"row row-pressed"');
			if (iimGetErrorText() == "OK") // no errors is a failed check
			{ 													 	 // if no errors, push ad to error array
				checks[step][1].push(ad);		 // ad object used for generating emails
			}														   // to rentler support
	}
}
