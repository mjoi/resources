/*//////////////////////////////////////////////////////////////////////////////
NAME: AdBot Controller
DATE CREATED: 4/1/16
DATE MODIFIED: 6/1/16
DESCRIPTION: Using data provided by an external database containing ad data,
this script posts, updates, & deletes ads on Craigslist, Zillow, & Rentler.
Dependent on iMacros FF extension.
AUTHOR: Khan
//////////////////////////////////////////////////////////////////////////////*/


/////////////////////////////////// modular functions //////////////////////////


const XMLHttpRequest = Components.Constructor("@mozilla.org/xmlextras/xmlhttprequest;1");
// required for using AJAX in iMacros

function getPics()
{
	window.location.href = "https://ad-bot-nelsonkhan.c9users.io/ads/" + key; // goto ad page
	wait(2);
	imgTags = window.document.getElementsByTagName("img"); //gets all image tags on page
	pics = []; // stores img urls

	for (step = 0; step < imgTags.length; step++)
	{
		pics[step] = imgTags[step].src.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1]; // places image source into pics
	}

	for (step=1; step <= pics.length; step++)
	{
		macro = loadData(macros["savePics"]).code;
		iimSet("step", step);
		iimPlay("CODE:"+macro); // download each image for ad

	}

	logs += pics.length +" IMAGE(s) DOWNLOADED\n"; // log that each image has been downloaded

/*
	downloads pictures from an ad page onto the local machine
	these pictures are stored until program has completed running
	the ad is referenced by a 'key' which refers to its id on the
	ads table in the rails app database
*/
}

function iPlay(name)
{
	var iim = loadMacro(macros[name]);
	setVariables(ad);
	iimPlay("CODE:"+iim);

/*
	plays a macro contained in the 'macros' object
	set all variables relevant to the ad before playing
*/
}

function loadData(dataURL)
{
  var request = new XMLHttpRequest(); // define request object
  var url = dataURL;                  // json file location
  var data = new Array;
  request.onreadystatechange = function()
  { // listen to server
    if (request.readyState == 4 && request.status == 200)
    { // when server ready
        data = JSON.parse(request.responseText); // store data from JSON
    }
  }; // end request
  request.open("GET", url, true); // specify request details:
                                  // get data at url, async == true
  request.send();                 // send requet to server
  wait(1);                        // wait for data to load
  return data;                    // return data for storge in other methods

/*
	loads an external json file into this script.
	used to load data from rails app.
*/
}

function loadMacro(dataURL)
{
  var request = new XMLHttpRequest(); // define request object
  var url = dataURL;                  // json file location
  var data = new Array;
  request.onreadystatechange = function()
  {};
  request.open("GET", url, true); // specify request details:
                                  // get data at url, async == true
  request.send();                 // send requet to server
  wait(1);                        // wait for data to load
  return request.responseText;    // return data for storge in other methods

/*
	loads an external macro file into this script.
*/
}

function loadRecord(obj,key)
{
  function byKey(obj)
  {
  	obj.key == key ? true : false;

		// used to filter out a single record (from macros)
  }
  var record = obj.filter(byKey); // record is a series of key/val pairs
  return record[0]; // record[0] is the first key/val match

/*
	loads an external macro file into this script.
*/
}

function myRequire(url) {
    var ajax = new XMLHttpRequest();
    ajax.open( 'GET', url, false); // <-- the 'false' makes it synchronous
    ajax.onreadystatechange = function () {
        var script = ajax.response || ajax.responseText;
        if (ajax.readyState === 4) {
            switch( ajax.status) {
                case 200:
                    eval.apply(window, [script] );
                    console.log("script loaded: ", url);
                    break;
                default:
                    console.log("ERROR: script not loaded: ", url);
            }
        }
    };
    ajax.send(null);

/*
	loads and applies an external js script
*/
}

function postImages(site)
{
  wait(1);
  // macros to be used for each site
  var codes =
  {
    "c":"TAG POS=1 TYPE=INPUT:FILE FORM=ACTION:* ATTR=NAME:file CONTENT={{!FOLDER_DATASOURCE}}\\{{img}}.{{ext}}",
    "k":"TAG POS=1 TYPE=INPUT:FILE FORM=NAME:detailForm ATTR=* CONTENT={{img}}", //{{!FOLDER_DATASOURCE}}\\{{img}}.{{ext}}
    "z":"TAG POS=1 TYPE=INPUT:FILE ATTR=ID:* CONTENT={{!FOLDER_DATASOURCE}}/{{img}}.{{ext}}" // on linux its / not \\
  };
  if (window.document.getElementById("classic") != null) { iimPlay("CODE: TAG POS=1 TYPE=A ATTR=ID:classic"); } // clicks classic image uploader
  wait(5);
  for (step=1; step <= pics.length; step++)
  {

    iimSet('img', step);
    iimSet('ext', pics[step-1]);
    iimPlay("CODE:" + codes[site]);
    randWait(); // random wait for stealth
    logs += step+"."+ pics[step-1];
  }

	/*
		Using a site key (c,k, or z) uploads images located in the Datasource
		folder. Uses a preetermined 'pics' variable to determine how many images
		to upload.
	*/
}

function randWait()
{

  iimSet("seconds", Math.floor((Math.random() * 6) + 2));
  iimPlay("CODE:WAIT SECONDS={{seconds}}");

	// wait random # of seconds between 2 and 6
}

function removeImages(adType)
{
	switch(adType)
	{
		case "c":
			iimPlay('CODE:TAG POS=4 TYPE=BUTTON FORM=ACTION:https://post.craigslist.org/* ATTR=NAME:go'); // clicks edit images button
			for (step = 0; step <= window.document.getElementsByTagName("img").length; step++)
			{
				iimPlay("CODE:TAG POS=1 TYPE=BUTTON FORM=ACTION:https://post.craigslist.org/* ATTR=NAME:go\nWAIT SECONDS=1");
			}
	}

	// removes images for an ad on a given site
}

function setVariables()
{
  // set for ad
	var keys = Object.keys(ad);
	for (step = 0; step < keys.length; step++)
	{
		var key = keys[step];
		if (ad[key] != null && ad[key] != undefined) { var value = ad[key]; }
		iimSet(key, value);
	}
  // set for user profile
  var keys = Object.keys(contact);
  for (step = 0; step < keys.length; step++)
  {
    var key = keys[step];
    if (contact[key] != null && contact[key] != undefined) { var value = contact[key]; }
    iimSet(key, value);
  }
  // set availability
  iimSet("availDay", new Date(ad["available"]).getUTCDate());
  iimSet("availMonth", new Date(ad["available"]).getUTCMonth());
  iimSet("availYear", new Date(ad["available"]).getUTCDate());
  //alert(contact.company);
  //iimPlay("CODE: TAG POS=1 TYPE=SELECT FORM=ID:postingForm ATTR=ID:parking CONTENT=%{{c_parking_code}}");

	/*
	 	Uses variables from ad and contact data provided via external application
		to set the same vairables for iMacros
	*/

}

function update(key)
{
  var routine = routines[key];
  eval(routine["setup"]);            // gets everything ready for data macro
    logs += routine["setup"] + ' completed\n';
  if (cease != true) {
    iPlay(routine["data"]);    // fills in form data
      logs += routine["data"] + ' completed\n';
    if (key.indexOf("Edit") > -1) { removeImages(routine["adType"]); } // if this is an edit, remove images
    postImages(routine["adType"]);
      logs += pics.length + ' IMAGE(s) POSTED\n';
    eval(routine["publish"]); // activates the ad
      logs += routine["publish"] + ' completed\n';
  }
  cease = false;             // resets cease

	/*
		performs a set of macors/scripts based on a provided routine key. routines
		contain the macros neccesary to the desired action such as posting a new
		ad, changing an ad, deleting an ad, etc.
	*/
}

function wait(seconds)
{
  iimSet("seconds", seconds);
  iimPlay("CODE:WAIT SECONDS=" + seconds);

// wait X number of seconds
}

////////////////////////////// zillow functions ////////////////////////////////
function zSetup(method)
{
	var address = ad["address"];
	var active = "https://www.zillow.com/rental-manager/posts/active/";
	switch(method)
	{
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
			var adDate = new Date(iimGetExtract());
			wait(2);
		  iimPlay("CODE:TAG POS=1 TYPE=A ATTR=TXT:Edit");
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

	/*
		perform macros neccesary to begin a routine for zillow, typically
		navigation actions
	*/
}

function zOff()
{
  var address = ad["address"];
  // go to actives setup needed
  zSearch(address);
  randWait(); // delay for stealth
  iimPlay("CODE:TAG POS=1 TYPE=BUTTON ATTR=TXT:Expire");   // turns ad off

	/*
		turn off an acitive zillow ad
	*/
}

function zSearch(address)
{
  var step = 0;
  var pages = pageCount();
  var adURL = "none";
  var links;

  for (page = 1; page <= pages; page++)
  {
    wait(1);
    links = (window.document.getElementsByTagName("a"));  // get links on page
    while (step < links.length)
    {
      if(links[step].text.includes(address))
      { // search links for address
          adURL = links[step];                 // if found, store url
          break;
      }
      step++;                                  // move to next link
    }

    if (adURL != "none")
    {                     // if ad was found
      iimPlay("CODE:URL GOTO="+adURL);         // goto found ad
      break;
    }
    else
    {
      cease = true;
    }
    // when all links have been checked go to next page
    iimPlay("CODE:TAG POS=1 TYPE=A ATTR=TXT:Next");
    randWait(); // for stealth
    step = 0; // reset step counter so while loop can repeat
  }

	// find a zillow ad by its address
}


function pageCount()
{
  iimPlay("CODE:TAG POS=1 TYPE=OL ATTR=* EXTRACT=TXT");
  var pages = iimGetExtract();
  var arr = pages.match(/\d+/g);
  if (arr != null)
  {
    return Math.max(...arr);
  }
  else
  {
    return 1;
  }

	// count # of pages in zillow ads. used to search zillow ads.
}

function zDate(dateObj)
{
	if (typeof dateObj === 'undefined') { dateObj = 0; } // makes dateObj optional

	var month_available = ad["available"][5]+ad["available"][6];
	month_available = Number(month_available) - 1; // converts string to number
	var yr_available = new Date(ad["available"]).getFullYear();
	var day_available = new Date(ad["available"]).getUTCDate();
	var avail = new Date(yr_available, month_available, day_available);

  if (dateObj == 0) // dateObj will be 0 when zEdit
  { // if no date has been provided
    iimPlay("CODE:TAG POS=5 TYPE=H5 ATTR=TXT:* EXTRACT=TXT"); // extract date
    var date = new Date(iimGetExtract()); //creates new date from extraction
  }
  else
  {
    var date = dateObj; // use provided date
  }

  var clicks = monthsBetween(avail, date); // stores # of clicks needed
	// logging for testing
		logs+= "Months Between:" + clicks + "\n";
		logs+= "Date Available:" + avail + "\n";
		logs+= "Todays Date:" + date + "\n";

	// end logs
  if (dateObj == 0)
  {
    wait(2); // delay for pg load
    iimPlay("CODE:TAG POS=3 TYPE=BUTTON ATTR=TXT:Activate"); // activates ad
    wait(2);
    // clicks on date selector to begin process
    iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(5)>DIV>DIV>DIV>SECTION>DIV:nth-of-type(2)>DIV>DIV>A>SPAN" BUTTON=0');
    wait(2);
    for (step in clicks)
    { // click to correct month
      wait(1);
      iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(5)>DIV>DIV>DIV>SECTION>DIV:nth-of-type(2)>DIV>DIV>UL>LI>DIV>TABLE>THEAD>TR>TH:nth-of-type(3)>BUTTON" BUTTON=0');
    }
  }
  else // if a date has been provided
  {
    iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV>MAIN>SECTION>MAIN>SECTION>SECTION>DIV>MAIN>DIV>DIV>DIV:nth-of-type(3)>FORM>DIV:nth-of-type(3)>DIV>DIV>INPUT" BUTTON=0');
		for (i = 0; i < clicks; i++)
    { // click to correct month
      wait(1);
      iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV>MAIN>SECTION>MAIN>SECTION>SECTION>DIV>MAIN>DIV>DIV>DIV:nth-of-type(3)>FORM>DIV:nth-of-type(3)>DIV>DIV>UL>LI>DIV>TABLE>THEAD>TR>TH:nth-of-type(3)>BUTTON" BUTTON=0');
    }
  }

	// selects correct day
	var day = avail.getUTCDate(); // gets available day
	day.toString().length < 2 ? day = "0" + day : day = day;
	// adds a zero to the front of single-digit #s
	// necessary for zillow date selector
  iimSet("day", day); // sets day for iMacros
  iimPlay("CODE:TAG POS=1 TYPE=BUTTON ATTR=TXT:{{day}}");
	// selects day button in date selector

// selects a date using jQuery date selector on Zillow
}

function monthsBetween(d1, d2)
{
  var months;
  months = (d1.getFullYear() - d2.getFullYear()) * 12;
  months += d1.getMonth()+1;
  months -= d2.getMonth()+1;
  return months;

// calculate months between two dates
}

////////////////////////////////// ksl functions ///////////////////////////////
function kOff()
{
	iPlay("kSearch"); 						// run search for given address
	extract = iimGetExtract();
	wait(2);
	if (extract == ad["address"])
	{	// if ad is found, turn it off
		iimPlay("CODE:TAG POS=1 TYPE=A ATTR=CLASS:rpb-container");
		iimPlay("TAG POS=1 TYPE=BUTTON FORM=NAME:* ATTR=TXT:Turn<SP>Listing<SP>Off EXTRACT=TXT");
	}

	// turns off an active ad on rentler
}

function kSetup(task)
{
  switch(task)
  {
    case "new":
      kErrors();
      if (addressErrors.length != 0 || claimedErrors.length != 0)
      {
        cease = true;
        kEmail();
      }
      else {
        iPlay("kNew");
      }
      break;
    case "edit":
      iPlay("kSearch");
      if (iimGetExtract() != ad["address"])
      {
        cease = true;
      }
      else
      {
        iimPlay("CODE:TAG POS=1 TYPE=A ATTR=CLASS:rpb-container");
        iimPlay("CODE:TAG POS=1 TYPE=BUTTON FORM=NAME:detailForm ATTR=TXT:Edit<SP>Listing");
      }
      break;
    case "publish":
      iimPlay("CODE:TAG POS=1 TYPE=BUTTON FORM=NAME:addForm ATTR=TXT:Save<SP>All");
      iimPlay("TAG POS=1 TYPE=BUTTON FORM=NAME:addForm ATTR=TXT:Turn<SP>Listing<SP>On");
      break;
  }
	/*
		perform macros neccesary to begin a routine for rentler, typically
		navigation actions
	*/
}

function kErrors()
{
	// setup
	var checks = [ // checks format "error-type": logArray
		["verifyAddressError", "addressErrors"],
		["propertyService.duplicatePropertyError", "claimedErrors"]
	];

	// actions
	iPlay("kAddress"); // fills in k address form
	for (var step in checks)
	{
			// check for errors
			iimPlay('CODE:TAG POS=1 TYPE=DIV ATTR=NG-SHOW:' + checks[step][0] + '&&CLASS:"row row-pressed"');
			if (iimGetErrorText() == "OK") // no errors is a failed check
			{ 													 	 // if no errors, push ad to error array
				checks[step][1].push(ad);		 // ad object used for generating emails
			}														   // to rentler support
	}

	/*
		determines whether an ad will be accepted when posting a new rentler ad
		if the ad will not be accepted the reason is stored
	*/

}

function kEmail()
{
  var msg = "I was unable to add the following properties to my ads because they have already been claimed:" + "\n";

  // adds errors to msg
  for (var i in claimedErrors)
  {
    ad = claimedErrors[i];
    subMsg = ad["address"] + ", " + ad[beds] + " beds / " + ad[baths] + " baths (" + ad[propertyType] + ")";
    msg += "\n" + subMsg;
  }

  msg += "\n" + "\n" + "I am the current manager for these units. Please add them to my account as I am unable to market effectively without them. Thanks!";

  // writes and sends email to rentler support
  iimSet("msg", msg);
  iPlay("kEmail");

// generates an error email via gmail for rentler support based on kErrors
}

///////////////////////////////// craigslist functions /////////////////////////
function cSetup(task)
{
  switch(task)
  {
    case "new":
      iPlay("cNew");
      break;
    case "edit":
      ad["btn"] = 2;
      iPlay('cChange');
      break;
    case "off":
      ad["btn"] = 1;
      iPlay('cChange');
      cease = true;
      break;
    case 'renew':
      iimSet("btn", 1);
      iPlay('cChange');
      break;
    case "publish":
      iimPlay(
        "CODE:TAG POS=1 TYPE=BUTTON FORM=ACTION:https://post.craigslist.org* ATTR=CLASS:\"done bigbutton\"\n " +
        "WAIT SECONDS=1\n " +
        "TAG POS=1 TYPE=BUTTON FORM=ID:publish_top ATTR=NAME:go"
      );
      break;
  }

/*
	perform macros neccesary to begin a routine for craigslist, typically
	navigation actions
*/
}

///////////////////////////////// initialize ///////////////////////////////////
// load scripts via myRequire
var logs="LOGS:\n";
var macros = loadData("https://raw.githubusercontent.com/nelsonkhan/resources/master/macroList.txt");
// load macros -- tested working
var tasks = loadData("https://ad-bot-nelsonkhan.c9users.io/tasks.json");
// load scripts from tasks list -- tested working
var contact = loadData("https://ad-bot-nelsonkhan.c9users.io/users.json");
// load property mgr data -- object format -- tested working
var pics;
var imgTags;
var claimedErrors = new Array; // used in kEmail.js
var addressErrors = new Array;
var cease; // used to stop routines
var task; // tested working
var key; // tested working
var script; // tested working
var ad; // tested working
// load ads from db -- tested working
var ads = {};
var adsDB = loadData("https://ad-bot-nelsonkhan.c9users.io/ads.json");

// load data from ads
for (var i = 0, len = adsDB.length; i < len; i++) {
    ads[adsDB[i].id] = adsDB[i];
// create a new object within ads for each ad using ad id as key
}
// -- end load ads

// load routine macro combos
var routines = {
	"zNew":
		{
			"setup":"zSetup('new')",
			"adType":"z",
			"data":"zFill",
			"publish":"iPlay('zPublish')"
		},
	"zEdit":
		{
			"setup":"zSetup('edit')",
			"adType":"z",
			"data":"zFill",
			"publish":"iPlay('zPublish')"
		},
	"zOff":
		{
			"setup":"zSetup('off')",
			"adType":"z",
			"data":"zFill",
			"publish":"iPlay('zPublish')"
		},
	"cNew":
		{
			"setup":"cSetup('new')",
			"adType":"c",
			"data":"cFill",
			"publish":"cSetup('publish')"
		},
	"cEdit":
		{
			"setup":"cSetup('edit')",
			"adType":"c",
			"data":"cFill",
			"publish":"cSetup('publish')"
		},
	"cOff":
		{
			"setup":"cSetup('off')",
			"adType":"c",
			"data":"cFill",
			"publish":"cSetup('publish')"
		},
	"kNew":
		{
			"setup":"kSetup('new')",
			"adType":"k",
			"data":"kFill",
			"publish":"kSetup('publish')"
		},
	"kEdit":
		{
			"setup":"kSetup('edit')",
			"adType":"k",
			"data":"cFill",
			"publish":"cSetup('publish')"
		},
	"kOff":
		{
			"setup":"kSetup('off')",
			"adType":"k",
			"data":"kFill",
			"publish":"kSetup('publish')"
		}
};

////////////////////////////////////// begin ///////////////////////////////////
for (var step in tasks)
{
	task = tasks[step]; // loads current task
	key = task["ad_id"]; // stores ad_id for external database
	script = task["script"]; // stores script to run
	ad = ads[key]; // loads current ad
  logs +=
    "RUNNING:"+ script +"\n"+
    "-------------------------\n"
    "AD:"+ ad.nickname + "\n";
	// adds header to logfile
	//getPics(); // downloads pictures for current ad
	eval(script); // performs assigned script
  window.console.log(logs); // display logfile in the console
}

// cNew task working
// cEdit task working
// cOff task working
// zNew task working
// zOff appears to be working
// zEdit appears to be working
