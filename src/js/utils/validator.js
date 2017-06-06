
require("./../rur.js");
require("./../programming_api/exceptions.js");

_is_integer = function(n) {
    return typeof n==='number' && (n%1)===0;
};

_is_non_negative_integer = function (n) {
    return typeof n==='number' && (n%1)===0 && n>=0;
};

_is_positive_integer = function (n) {
    return typeof n==='number' && (n%1)===0 && n>=1;
};

RUR.is_integer = _is_integer;
RUR.is_non_negative_integer = _is_non_negative_integer;
RUR.is_positive_integer = _is_positive_integer;

RUR.is_valid_position = function(x, y) {
    return (_is_positive_integer(x) && _is_positive_integer(y) &&
           x <= RUR.CURRENT_WORLD.cols && y <= RUR.CURRENT_WORLD.rows);
};


/* filterInt taken from
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt

It is a stricter way than parseInt to extract integer values, and supports
Infinity as a valid integer.

See tests/unit_tests/utils/filterint.tests.js for tests illustrating sample
uses.
*/
RUR.utils.filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)){
    return Number(value);
  }
  return undefined;
};
