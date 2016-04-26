/*******************************************************************************
NAME: postImages
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: Posts images to an ad. Takes an array of images: arr (provided by
main.js/update.js) and a site key. Site is used to determine which macro to use
from the codes object below.
*******************************************************************************/

function postImages(arr, site) {
  // macros to be used for each site
  var codes = {
    cl:"TAG POS=1 TYPE=INPUT:FILE FORM=ACTION:* ATTR=NAME:file CONTENT={{img}}",
    k:"TAG POS=1 TYPE=INPUT:FILE FORM=NAME:detailForm ATTR=* CONTENT={{img}}",
    z:"TAG POS=1 TYPE=INPUT:FILE ATTR=ID:* CONTENT={{img}}"
  };

  var locations = arr[Object.keys(arr)[0]]; // get image locations from arr

  for (var step in locations) {
    iimSet('img', locations[step]);
    iimPlay("CODE:" + codes[site]);
    randWait(); // random wait for stealth
  }
}
