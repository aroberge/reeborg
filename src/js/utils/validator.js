
require("./../rur.js");

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


/** @function is_valid_position
 * @memberof RUR
 * @instance
 * @summary This function indicates if the position is within the world's boundaries.
 *
 * @param {integer} x  Position
 * @param {integer} y  Position
 *
 * @returns {bool} `true/True` if the position is within the world's boundaries,
 * `false/False` otherwise.
 *
 **/

RUR.is_valid_position = function(x, y) {
    var world = RUR.get_current_world();
    return (_is_positive_integer(x) && _is_positive_integer(y) &&
           x <= world.cols && y <= world.rows);
};


/* filterInt taken from
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt

It is a stricter way than parseInt to extract integer values, and supports
the string "infinite" as a valid integer. We do not use the Javascript
object Infinity as it cannot be serialized using JSON.

See tests/unit_tests/utils/filterint.tests.js for tests illustrating sample
uses.
*/
RUR.utils.filterInt = function (value) {
  if (value == "infinite") {
    return value;
  }
  if(/^(\-|\+)?([0-9]+)$/.test(value)){
    return Number(value);
  }
  return undefined;
};
