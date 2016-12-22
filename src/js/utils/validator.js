
require("./../rur.js");
require("./../exceptions.js");

RUR._ensure_positive_integer = function(n, info){
    "use strict";
    if (typeof n==='number' && (n%1)===0 && n>0) {
        return;
    }
    throw new RUR.ReeborgError(info + " must be a positive integer.");
};

RUR._ensure_positive_integer_or_zero = function(n, info){
    "use strict";
    if (typeof n==='number' && (n%1)===0 && n>=0) {
        return;
    }
    throw new RUR.ReeborgError(info + " must be a positive integer or zero.");
};





/* filterInt taken from
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt

It is a stricter way than parseInt to extract integer values, and supports
Infinity as a valid integer.

See tests/unit_tests/utils/filterint.tests.js for tests illustrating sample
uses.
*/
exports.filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return undefined;
};
