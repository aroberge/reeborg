require("./../rur.js");
require("./../utils/key_exist.js");
require("./../recorder/record_frame.js");
var get_world = require("./../world_get/world.js").get_world;

/** @function set_tile_at_position
 * @memberof RUR
 * @instance
 * @summary This function sets a given tile type at a location.
 *
 * @param {string} tile The name of a tile **or** a colour recognized by HTML.
 *    No check is performed to ensure that the value given is valid.
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `x` or `y` is not a positive integer.
 *
 * @todo add test - at least for throws if others are present.
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.set_tile_at_position = function (tile, x, y) {
    "use strict";
    var world = get_world();
    my_name = "RUR.set_tile_at_position(tile, x, y): ";
    RUR._ensure_key_exists(world, "tiles");
    RUR._ensure_positive_integer(x, my_name+"x");
    RUR._ensure_positive_integer(y, my_name+"y");
    world.tiles[x + "," + y] = tile;
    RUR.record_frame("debug", "set_tile_at_position");
};
