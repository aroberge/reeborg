require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./../utils/artefact.js");
require("./../world_utils/get_world.js");

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
    RUR.utils.add_artefact(args);
    RUR.record_frame("RUR.set_bridge", args);
};


/** @function remove_bridge
 * @memberof RUR
 * @instance
 * @summary This function removes a bridge at a location.
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no bridge to remove
 *        at that location
 *        
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_bridge = function (x, y) {
    "use strict";
    var name, args;
    name = RUR.get_background_tile(x, y);
    if (name === null) {
        throw new ReeborgError("No bridge to remove here.");
    }
    args= {x:x, y:y, type:"bridge", name:name};
    RUR.utils.remove_artefact(args);
    RUR.record_frame("RUR.remove_bridge", args);
};


/** @function get_bridge
 * @memberof RUR
 * @instance
 * @summary This function gets the bridge name found at given location. 
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
    tile = RUR.utils.get_artefacts(args);
    if (tile === null) {
        return null;
    } else {
        return RUR.TILES[tile[0]];
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
    var tile, args = {x:x, y:y, type:"bridge"};
    tile = RUR.utils.get_artefacts(args);
    if (tile === null) {
        return [];
    } else if (RUR.TILES[tile[0]].protection !== undefined) {
        return RUR.TILES[tile[0]].protection;
    } else {
        return [];
    }
};
