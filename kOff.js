/*******************************************************************************
NAME: kOff
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: Removes an ad from KSL.
*******************************************************************************/

function kOff() {
	iPlay("kSearch"); 						// run search for given address
	extract = iimGetExtract();
	wait(2);
	if (extract == ad["address"]) {	// if ad is found, turn it off
		iimPlay("CODE:TAG POS=1 TYPE=A ATTR=CLASS:rpb-container");
		iimPlay("TAG POS=1 TYPE=BUTTON FORM=NAME:* ATTR=TXT:Turn<SP>Listing<SP>Off EXTRACT=TXT");
	}
}
