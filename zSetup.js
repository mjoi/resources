// process for renewing/updating ads for zillow

function zSetup(method){
  var address = ad["address"];
  var active = "https://www.zillow.com/rental-manager/posts/active/";
  switch(method) {
    case "new":
      window.location.href = "https://www.zillow.com/rental-manager/listing/create/location/"
      iPlay("zNew");
      adDate = new Date();
      zDate(adDate);
      break;
    case "renew":
      window.location.href = "https://www.zillow.com/rental-manager/posts/expired/"
      zSearch(address);
      zDate();
      randWait(); // delay for stealth
      break;
    case "edit":
      window.location.href = active;
      zSearch(address);
      iimPlay("CODE:TAG POS=5 TYPE=H5 ATTR=TXT:* EXTRACT=TXT");
      iimPlay("CODE:TAG POS=1 TYPE=A ATTR=TXT:Edit");
      var adDate = iimGetExtract();
      zDate(adDate);
      randWait();
      break;
    case "off":
      window.location.href = active;
      zSearch(address);
      randWait();
      iimPlay("CODE:TAG POS=1 TYPE=BUTTON ATTR=TXT:Expire");
      cease = true; // turn on cease so controller moves to next task
      break;
  }
}
