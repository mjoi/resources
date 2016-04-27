/*******************************************************************************
NAME: kSetup
AUTHOR: Khan
CREATED: 3-30-16
REVISED: 3-30-16
DESC: Setup/navigation for KSL scripts.
*******************************************************************************/

function kSetup(task) {
  switch(task){
    case "new":
      kErrors();
      if (addressErrors.length != 0 || claimedErrors.length != 0) {
        cease = true;
        kEmail();
      } else {
        iPlay("kNew");
      }
      break;
    case "edit":
      iPlay("kSearch");
      if (iimGetExtract() != ad["address"]) {
        cease = true;
      } else {
        iimPlay("CODE:TAG POS=1 TYPE=A ATTR=CLASS:rpb-container");
        iimPlay("CODE:TAG POS=1 TYPE=BUTTON FORM=NAME:detailForm ATTR=TXT:Edit<SP>Listing");
      }
      break;
    case "publish":
      iimPlay("CODE:TAG POS=1 TYPE=BUTTON FORM=NAME:addForm ATTR=TXT:Save<SP>All");
      iimPlay("TAG POS=1 TYPE=BUTTON FORM=NAME:addForm ATTR=TXT:Turn<SP>Listing<SP>On");
      break;
  }
}
