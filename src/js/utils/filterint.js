/* filterInt adapted from
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt
*/

exports.filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return undefined;
};
