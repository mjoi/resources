/*******************************************************************************
NAME: loadData
AUTHOR: Khan
CREATED: 3-15-16
REVISED: 3-30-16
DESC: Used to find how many months are between two dates in zDate.js
This is difference in month names, not months as in 30 days.
D1 must be larger of the two dates
*******************************************************************************/

function monthsBetween(d1, d2) {
    var months;
    months = (d1.getFullYear() - d2.getFullYear()) * 12;
    months += d1.getMonth()+1;
    months -= d2.getMonth()+1;
    return months;
}
