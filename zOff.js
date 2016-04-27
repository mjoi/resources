// process for turning ads off for zillow
// searches active ads for a given address,then turns the ad off
function zOff(){
  var address = ad["address"];
  // go to actives setup needed
  zSearch(address);
  randWait(); // delay for stealth
  iimPlay("CODE:TAG POS=1 TYPE=BUTTON ATTR=TXT:Expire");   // turns ad off
}
