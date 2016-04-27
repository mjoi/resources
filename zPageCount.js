// counts pages in Zillow Actives/Expireds -- used in zillowSearch.js
function pageCount() {
  iimPlay("CODE:TAG POS=1 TYPE=OL ATTR=* EXTRACT=TXT");
  var pages = iimGetExtract();
  var arr = pages.match(/\d+/g);
  if (arr != null) {
    return Math.max(...arr);
  } else {
    return 1;
  }
}
