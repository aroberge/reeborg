require("./get_namespace.js");
require("./../rur.js");
require("./../utils/ensure_integers.js");

exports.in_world = in_world = function (x, y) {
    RUR._ensure_positive_integer(x, "x");
    RUR._ensure_positive_integer(y, "y");
    if (x >= 1 && y >=1 && x <= RUR.MAX_X && y <= RUR.MAX_Y) {
        return true;
    }
    return false;
};

/** @function in_world
 * @memberof RUR.get
 * @instance
 * @summary 
 *
 */
RUR.in_world = in_world;