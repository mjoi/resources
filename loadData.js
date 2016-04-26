/*******************************************************************************
NAME: loadData
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: loads data from a given JSON file specified by its URL via AJAX
source: http://stackoverflow.com/a/20518446/1730179
AJAX Tutorial: http://www.w3schools.com/ajax/default.asp
*******************************************************************************/

function loadData(dataURL) {
  var request = new XMLHttpRequest(); // define request object
  var url = dataURL;                  // json file location
  var data = new Array;
  request.onreadystatechange = function() { // listen to server
    if (request.readyState == 4 && request.status == 200) { // when server ready
        data = JSON.parse(request.responseText); // store data from JSON
        }
      }; // end request
  request.open("GET", url, true); // specify request details:
                                  // get data at url, async == true
  request.send();                 // send requet to server
  wait(3);                        // wait for data to load
  return data;                    // return data for storge in other methods
}
