/*******************************************************************************
NAME: zSearch
AUTHOR: Khan
CREATED: 3-3-16
REVISED: 3-30-16
DESC: Workaround to input date using jQuery selector on zillow rental mgr.
Optionally takes a date as a param for use in edit routine.

  1. Parses date found on ad to be renewed or used provided date
  2. Compares it with the desired availability date
  3. Generate the clicks needed on the next month arrow for correct month
  4. Clicks the arrow X times and clicks on correct date
*******************************************************************************/

function zDate(dateObj = 0) {
  var avail = new Date(ad["dateAvailable"]);
  if (dateObj = 0) { // if no date has been provided
    iimPlay("CODE:TAG POS=5 TYPE=H5 ATTR=TXT:* EXTRACT=TXT"); // extract date
    var date = new Date(iimGetExtract()); //creates new date from extraction
  } else {
    var date = new Date(dateObj); // use provided date
  }

  var clicks = monthsBetween(avail, date); // stores # of clicks needed

  if (dateObj = 0) {
    wait(2); // delay for pg load
    iimPlay("CODE:TAG POS=3 TYPE=BUTTON ATTR=TXT:Activate"); // activates ad
    wait(2);
    // clicks on date selector to begin process
    iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(5)>DIV>DIV>DIV>SECTION>DIV:nth-of-type(2)>DIV>DIV>A>SPAN" BUTTON=0');
    wait(2);
    for (step in clicks) { // click to correct month
      wait(1);
      iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(5)>DIV>DIV>DIV>SECTION>DIV:nth-of-type(2)>DIV>DIV>UL>LI>DIV>TABLE>THEAD>TR>TH:nth-of-type(3)>BUTTON" BUTTON=0');
    }
  } else {
    iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV>MAIN>SECTION>MAIN>SECTION>SECTION>DIV>MAIN>DIV>DIV>DIV:nth-of-type(3)>FORM>DIV:nth-of-type(3)>DIV>DIV>INPUT" BUTTON=0');
    for (step in clicks) { // click to correct month
      wait(1);
      iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV>MAIN>SECTION>MAIN>SECTION>SECTION>DIV>MAIN>DIV>DIV>DIV:nth-of-type(3)>FORM>DIV:nth-of-type(3)>DIV>DIV>UL>LI>DIV>TABLE>THEAD>TR>TH:nth-of-type(3)>BUTTON" BUTTON=0');
    }
  }

  iimSet("day", avail.getDay());
  iimPlay("CODE:TAG POS=1 TYPE=BUTTON ATTR=TXT:{{day}}"); // selects correct day
}
