require("./../rur.js");
require("./../utils/key_exist.js");
require("./../recorder/record_frame.js");

/** @function set_tile_at_position
 * @memberof RUR
 * @instance
 * @summary This function sets a given tile type at a location.
 *
 * @desc Cette fonction spécifie le type de tuile à un endroit.
 *
 * @param {string} tile The name of a tile **or** a colour recognized by HTML.
 *                      Note that rgba format for the colour has an unexpected result
 *                      since the tiles are redrawn each time so that semi-transparent
 *                      tiles will get progressively darker at each step. <br>
 *                      _Le nom d'une tuile **ou** celui d'une couleur reconnue par HTML._
 *
 * @param {integer} x  Position of the tile. <br>  _Position de la tuile_
 *
 * @param {integer} y  Position of the tile. <br>  _Position de la tuile_
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
    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    RUR.CURRENT_WORLD.tiles[x + "," + y] = tile;
    RUR.record_frame("debug", "set_tile_at_position");
};
