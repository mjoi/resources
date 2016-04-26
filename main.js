/* main controller script for adBot */

// requried for using AJAX in Firefox
const XMLHttpRequest = Components.Constructor("@mozilla.org/xmlextras/xmlhttprequest;1");

/* provides ability to load js via myRequire(scriptURL) */
function myRequire(url) {
    var ajax = new XMLHttpRequest();
    ajax.open( 'GET', url, false ); // <-- the 'false' makes it synchronous
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
}
/* end myRequire script */

// load scripts via myRequire
myRequire("https://raw.githubusercontent.com/nelsonkhan/sample_app/master/wait.js"); // wait is required for loadData
wait(3);
/*myRequire(loadData.js); // loadData allows loading databases
var scripts = loadData(scriptList.json);
for (var step in scripts) {
  myRequire(scripts[step]); //loops through scripts and adds each to file
}

var macros = loadData(macroList.json); // load macros
var tasks = loadData(taskList.json); // load tasks list
var contact = loadData(userProfile.json); // load property mgr data
var ads = loadData(userAdData.json); // load ad db
var images = loadData(userImages.json) // load images
var routines = loadData(routines.json) // load routine macro combos

// misc variables
var claimedErrors = new Array; // used in kEmail.js
var addressErrors = new Array;
var cease; // used to stop routines

// perform tasks
for (var step in tasks) {
  // load current ad records / images
  var task = tasks[step];
  var key = task[0];
  var script = task[1]; // task[1] should contain a js script with params
  var ad = loadRecord(ads, key);
  var pics = loadRecord(images, key);
  // perform assigned task
  script;
}

alert("All tasks complete") // when all tasks are complete, alert the user
` */ 