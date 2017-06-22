require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_bridge
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as a bridge at that location.
 *          If a bridge was already located there, it will be replaced by
 *          this new bridge.
 *
 * @param {string} name The name of a tile. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 *
 */
RUR.add_bridge = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"bridge", single:true};
    RUR.add_artefact(args);
    RUR.record_frame("RUR.set_bridge", args);
};

/** @function remove_bridge
 * @memberof RUR
 * @instance
 * @summary This function removes a bridge at a location.
 *
 * @param {string} name
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no such named bridge to remove
 *        at that location
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_bridge = function (name, x, y) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"bridge", name:name};
    try {
        RUR.remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No bridge to remove here.");
        } else {
            throw e;
        }
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
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_bridge = function (x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"bridge"};
    tile = RUR.get_artefacts(args);
    if (tile === null) {
        return null;
    } else {
        return tile[0];
    }
};

/** @function is_bridge
 * @memberof RUR
 * @instance
 * @summary This function indicates if a named bridge is present at a given location
 *
 * @param {string} name The name of the bridge
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */


RUR.is_bridge = function (name, x, y) {
    if (RUR.get_bridge(x, y) == name) {
        return true;
    } else {
        return false;
    }
};


/** @function get_bridge_protections
 * @memberof RUR
 * @instance
 * @summary This function gets the bridge name found at given location.
 *    If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @returns {Array} An array of strings, each string being a protection
 *                 against a specific type of artefact; this could be
 *                 an empty array.
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_bridge_protections = function (x, y) {
    "use strict";
    var tile;
    tile = RUR.get_bridge(x, y);
    if (tile === null) {
        return [];
    } else if (RUR.THINGS[tile].protections !== undefined) {
        return RUR.THINGS[tile].protections;
    } else {
        return [];
    }
};
