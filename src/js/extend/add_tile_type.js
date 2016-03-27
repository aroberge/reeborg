require("./../rur.js");
require("./../init/images_onload.js");

/** @function add_tile_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new tiles. If the name
 *    of an existing tile is specified again, it is replaced by a new one
 *    which may have completely different characteristics.
 *
 * @desc Cette fonction permet l'ajout de nouveaux tuiles.  Si le nom d'une
 *   tuile existante est spécifiée, elle est remplacée par la nouvelle qui pourrait
 *   avoir des caractéristiques complètement différentes.
 *   N.B. les noms de tuiles par défaut sont
 *   des noms anglais (par exemple "grass" plutôt que "gazon").
 *
 * @param {Object} tile A Javascript object (similar to a Python dict) that
 *                      describes the properties of the tile. <br>
 *                      _Un objet javascript (similaire à un dict en Python)
 *                      qui décrit les propriétés de la tuile._
 *
 * @param {string} tile.name  The unique name to be given to the tile. <br>
 *                            _Le nom unique donné à la tuile_
 *
 * @param {string} [tile.public_name] If various tiles are meant to represent
 *                                    the same type of tile (e.g. different shades of "grass")
 *                                    this attribute can be used to specify that single name.
 *
 * @param {string} [tile.url] If a single image is used, this indicated the source.
 *                            **Either tile.url or tile.images must be specified.**
 *
 * @param {string[]} [tile.images] If multiple images are used (for animated tiles),
 *                               this array (list) contains the various URLs.
 *                            **Either tile.url or tile.images must be specified.**
 *
 * @param {string} [tile.selection_method = "random"]  For animated tiles; choose one of
 *                           "sync", "ordered" or "random"
 *
 * @param {boolean} [tile.fatal] Program ends if Reeborg steps on such a tile set to "true".
 *
 * @param {boolean} [tile.detectable] If `tile.fatal == tile.detectable == True`, Reeborg can
 *                                    detect with `front_is_clear()` and `right_is_clear()`.
 *
 * @param {boolean} [tile.solid] If sets to "true", prevents a box from sliding onto this tile.
 *
 * @param {boolean} [tile.slippery] If sets to "true", Reeborg will keep going to next tile if
 *                                  it attempts to move on this tile.
 *
 * @example
 * // This first example shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 * // A second example shows how one can change tiles behaviour.
 * // A possible usage of this would be to have Reeborg wear crampons
 * // so that it does not slip on the ice.
 * World("/worlds/examples/tile2.json", "Example 2")
 */
RUR.TILES = {};

RUR.add_tile_type = function (new_tile) {
    "use strict";
    var i, key, keys, name, tile;
    name = new_tile.name;
    if (RUR.KNOWN_TILES.indexOf(new_tile.name) != -1) {
        console.log("Warning: tile name " + name + " already exists");
    } else {
        RUR.KNOWN_TILES.push(name);
    }
    RUR.TILES[name] = {};
    tile = RUR.TILES[name];
    // copy all properties
    keys = Object.keys(new_tile);
    for(i=0; i < keys.length; i++){
        key = keys[i];
        tile[key] = new_tile[key];
    }
    // allow multiple tiles to appear under the same name;
    // for example, we might want to visually have different types of grass tiles
    // but referring under the single name "grass" when giving information
    if (tile.public_name) {
        tile.name = tile.public_name;
    }
    if (tile.url) {
        tile.image = new Image();
        tile.image.src = tile.url;
        RUR.images_onload(tile.image);
    } else if (tile.images) {
        for (i=0; i < tile.images.length; i++){
            tile["image"+i] = new Image();
            tile["image"+i].src = tile.images[i];
            RUR.images_onload(tile["image"+i]);
        }
        if (tile.selection_method === "sync") {
            tile.choose_image = function (coords) {
                return _sync(tile, tile.images.length, coords);
            };
        } else if (tile.selection_method === "ordered") {
            tile.choose_image = function (coords) {
                return _ordered(tile, tile.images.length, coords);
            };
        } else {
            tile.choose_image = function (coords) {
                return _random(tile, tile.images.length);
            };
        }
    } else {
        alert("Fatal error: need either tile.url or a list: tile.images");
    }
};

_random = function (tile, nb) {
    // each tile is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return tile["image" + choice];
};
_ordered = function (tile, nb, coords) {
    // each tile is given a random initial value but then goes in order

    if (RUR._ORDERED_TILES[tile.name] === undefined) {
        RUR._ORDERED_TILES[tile.name] = {};
        RUR._ORDERED_TILES[tile.name][coords] = Math.floor(Math.random() * nb);
    } else if (Object.keys(RUR._ORDERED_TILES[tile.name]).indexOf(coords) === -1) {
        RUR._ORDERED_TILES[tile.name][coords] = Math.floor(Math.random() * nb);
    } else {
        RUR._ORDERED_TILES[tile.name][coords] += 1;
        RUR._ORDERED_TILES[tile.name][coords] %= nb;
    }
    return tile["image" + RUR._ORDERED_TILES[tile.name][coords]];
};
_sync = function (tile, nb, coords) {
    // every tile of this type is kept in sync
    if (RUR._SYNC_TILES[tile.name] === undefined) {
        RUR._SYNC_TILES[tile.name] = [];
        RUR._SYNC_TILES_VALUE[tile.name] = 1;
    } else if (RUR._SYNC_TILES[tile.name].indexOf(coords) !== -1) {
        // see a same tile present: we are starting a new sequence
        RUR._SYNC_TILES[tile.name] = [];
        RUR._SYNC_TILES_VALUE[tile.name] += 1;
        RUR._SYNC_TILES_VALUE[tile.name] %= nb;
    }
    RUR._SYNC_TILES[tile.name].push(coords);
    return tile["image" + RUR._SYNC_TILES_VALUE[tile.name]];
};
