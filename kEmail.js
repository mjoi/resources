/*******************************************************************************
NAME: kEmail
AUTHOR: Khan
CREATED: 3-3-16
REVISED: 3-30-16
DESC: Sends email to ksl support regarding properties that have been claimed.
*******************************************************************************/

function kEmail(){
  var msg = "I was unable to add the following properties to my ads because they have already been claimed:" + "\n";

  // adds errors to msg
  for (var i in claimedErrors) {
    ad = claimedErrors[i];
    subMsg = ad["address"] + ", " + ad[beds] + " beds / " + ad[baths] + " baths (" + ad[propertyType] + ")";
    msg += "\n" + subMsg;
  }

  msg += "\n" + "\n" + "I am the current manager for these units. Please add them to my account as I am unable to market effectively without them. Thanks!";

  // writes and sends email to rentler support
  iimSet("msg", msg);
  iPlay("kEmail");
}
