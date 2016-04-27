/*******************************************************************************
NAME: cSetup
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: Setup/navigation for CL scripts. Used in update.js for new,
edit, or renewing ads. Used standalone to delete an ad.
*******************************************************************************/

function cSetup(task) {
  switch(task) {
    case "new":
      iPlay(cNew);
      break;
    case "edit":
      iimSet("btn", 2);
      iPlay(cChange);
      break;
    case "off":
      iimSet("btn", 1);
      iPlay(cChange);
      cease = true;
      break;
    case 'renew':
      iimSet("btn", 1);
      iPlay(cChange);
      break;
    case "publish":
      iimPlay("CODE:TAG POS=3 TYPE=BUTTON FORM=ACTION:https://post.craigslist.org* ATTR=NAME:go");
      iimPlay("CODE:WAIT SECONDS=1");
      iimPlay("CODE:TAG POS=1 TYPE=BUTTON FORM=ID:publish_top ATTR=NAME:go");
      break;
  }
}
