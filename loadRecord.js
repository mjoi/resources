/*******************************************************************************
NAME: loadData
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: loads a record from an object by key
*******************************************************************************/

function loadRecord(obj,key) {
  function byKey(obj) { // used to filter out a single record
    if (obj.key == key) {
      return true;
    } else {
      return false;
    }
  }
  var record = obj.filter(byKey); // record is a series of key/val pairs
  return record[0]; // record[0] is the first key/val match
}
