/*******************************************************************************
NAME: update
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: Posts/edits/renews/deletes an ad. Takes a key to the routines db as input.
Each routine in the db contains the functions neccesary for a given task.
*******************************************************************************/

function update(key) {
  var routine = routines[key];
  routine[setup];            // gets everything ready for data macro
  while (cease != true) {
    iPlay(routine[data]);    // fills in form data
    removeImages(routine[adType]);
    postImages(pics, routine[adType]);
    iPlay(routine[publish]); // activates the ad
  }
  cease = false;             // resets cease
}
