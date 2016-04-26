/*******************************************************************************
NAME: iPlay
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: Plays a macro. Takes a name input to reference the macros db. Variables
loaded prior to playing any macro.
*******************************************************************************/

function iPlay(name) {
  setVariables(ad);
  var iim = loadData(macros[name]);
  iimPlay("CODE:"+iim);
}
