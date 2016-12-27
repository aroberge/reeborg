require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
var get_world = require("./../world_utils/get_world.js").get_world;

/** @function set_background_tile
 * @memberof RUR
 * @instance
 * @summary This function sets a given tile type at a location.
 *
 * @param {string} tile The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour.
 *
 *    If `tile` evaluates to "false" (like `null` in Javascript, or `None`
 *    in Python, or an empty string in both languages), any existing tile
 *    at that location will be removed, but no error is going to be raised
 *    if no tile is present at that location.
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.set_background_tile = function (tile, x, y) {
    "use strict";
    var world = get_world(), coords;
    if (!RUR.utils.is_valid_position(x, y)) {
        throw new ReeborgError(RUR.translate("Invalid position."));
    }
    coords = x + "," + y;
    if (!tile) {
        remove_background_tile(coords, world);
    }
    RUR.utils.ensure_key_exists(world, "tiles");
    world.tiles[coords] = tile;
    RUR.record_frame("debug", "set_background_tile");
};

function remove_background_tile (coords, world) {
    if (world.tiles === undefined || world.tiles[coords] === undefined) {
        return;
    } else {
        delete world.tiles[coords];
        if (Object.keys(world.tiles).length === 0){
            delete world.tiles;
        }
    }

}

/** @function get_background_tile
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_background_tile = function (x, y) {
    "use strict";
    var world = get_world(), coords;
    if (!RUR.utils.is_valid_position(x, y)) {
        throw new ReeborgError(RUR.translate("Invalid position."));
    }
    coords = x + "," + y;

    if (world.tiles === undefined || world.tiles[coords] === undefined) {
        return null;
    } else {
        return world.tiles[coords];
    }
};
