require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./../utils/artefact.js");
require("./../world_utils/get_world.js");

// TODO: implement fill_background

/** @function add_background_tile
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_background_tile = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"tiles", single:true};
    RUR.utils.add_artefact(args);
    RUR.record_frame("RUR.add_background_tile", args);
};


/** @function remove_background_tile
 * @memberof RUR
 * @instance
 * @summary This function removes a background tile at a location.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 *        
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_background_tile = function (name, x, y) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"tiles", name:name};
    try {
        RUR.utils.remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No tile to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_background_tile", args);
};


/** @function get_background_tile
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 * @returns {string} The name of the tile found at that location or `null/None`.
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

RUR.get_background_tile = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"tiles"};
    tiles = RUR.utils.get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles[0];
    }
};

RUR.is_background_tile = function (name, x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"tiles"};
    tile = RUR.get_background_tile(x, y);
    if (tile === null) {
        return false;
    } else if (tile == name){
        return true;
    } else {
        return false;
    }
};


