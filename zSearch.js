/*******************************************************************************
NAME: zSearch
AUTHOR: Khan
CREATED: 3-3-16
REVISED: 3-30-16
DESC: Searches zillow for a given address.
*******************************************************************************/

function zSearch(address) {
  var step = 0;
  var pages = zPageCount();
  var adURL = "none";
  var links;

  for (page = 1; page <= pages; page++){
    wait(1);
    links = (window.document.getElementsByTagName("a"));  // get links on page
    while (step < links.length) {
      if(links[step].text.includes(address)) { // search links for address
          adURL = links[step];                 // if found, store url
          break;
      }
      step++;                                  // move to next link
    }

    if (adURL != "none") {                     // if ad was found
      iimPlay("CODE:URL GOTO="+adURL);         // goto found ad
      break;
    } else {
      cease = true;
    }
    // when all links have been checked go to next page
    iimPlay("CODE:TAG POS=1 TYPE=A ATTR=TXT:Next");
    randWait(); // for stealth
    step = 0; // reset step counter so while loop can repeat
  }
}
