require("./../rur.js");
require("./../translator.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_bridge
 * @memberof RUR
 * @instance
 * @summary This function sets a named "thing" as a bridge at that location.
 * There can be only one bridge at a given location.
 *
 * @param {string} name The name of a bridge.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is already a bridge at that location,
 * unless this is done from code in the Onload editor in which case the
 * new bridge replaces the old one and a message is written to the browser's
 * console.
 *
 */
RUR.add_bridge = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"bridge", single:true, valid_names: RUR.KNOWN_THINGS};
    if (RUR.get_bridge(x, y)) {
        if (RUR.state.evaluating_onload) {
            console.log(name + " is replacing " + RUR.translate(RUR.get_bridge(x, y)) + " as a bridge.");
        } else {
            throw new RUR.ReeborgError(RUR.translate("There is already a bridge here."));
        }
    }
    RUR._add_artefact(args);
    RUR.record_frame("RUR.set_bridge", args);
};

/** @function remove_bridge
 * @memberof RUR
 * @instance
 * @summary This function removes a bridge at a location.
 *
 * @param {string} name The name of a the "thing" used as a bridge.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no such named bridge to remove
 *        at that location
 */
RUR.remove_bridge = function (name, x, y) {
    "use strict";
    var args, english_name;
    english_name = RUR.translate_to_english(name);
    args= {x:x, y:y, type:"bridge", name:english_name, valid_names: RUR.KNOWN_THINGS};
    if (RUR.get_bridge(x, y) == name) {
        RUR._remove_artefact(args);
    } else {
        throw new RUR.ReeborgError("No bridge named <code>" + name + "</code> to remove here.");
    }
    RUR.record_frame("RUR.remove_bridge", args);
};


/** @function get_bridge
 * @memberof RUR
 * @instance
 * @summary This function gets the name of the bridge name found at given location.
 *    If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.get_bridge = function (x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"bridge"};
    tile = RUR._get_artefacts(args);
    if (tile === null) {
        return null;
    } else {
        return RUR.translate(tile[0]);
    }
};

/** @function is_bridge
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a named bridge is present
 * at a given location, `false/False` otherwise
 *
 * @param {string} name The name of the bridge
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_bridge = function (name, x, y) {
    return RUR.get_bridge(x, y) == name;
};


/** @function get_bridge_protections
 * @memberof RUR
 * @instance
 * @summary This function returns an array of "protections" given by a bridge at
 * that location. If no bridge is found, or if a bridge is found but offer no
 * protection, an empty array is returned.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @returns {Array} An array of strings, each string being a protection
 * against a specific type of fatality; this could be an empty array.
 *
 */

RUR.get_bridge_protections = function (x, y) {
    "use strict";
    var tile;
    tile = RUR.get_bridge(x, y);
    if (tile === null) {
        return [];
    } else {
        tile = RUR.translate_to_english(tile);
    }
    if (RUR.THINGS[tile].protections !== undefined) {
        return RUR.THINGS[tile].protections;
    } else {
        return [];
    }
};
