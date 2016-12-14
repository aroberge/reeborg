require("./../rur.js");
require("./enhance_namespace.js");
require("./animated_images.js");
require("./../exceptions.js");
//require("./../init/images_onload.js");

/** @function new_tile_type
 * @memberof RUR.enhance
 * @instance
 * @summary This function makes it possible to add new tiles. If the name
 *    of an existing tile is specified again, it is replaced by a new one
 *    which may have completely different characteristics. 
 *
 * @param {Object} tile A Javascript object (similar to a Python dict) that
 *                      describes the properties of the tile.
 *
 * @param {string} tile.name  The name to be given to the tile; an exception
 *    will be raisd if it is missing.
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
 * @param {boolean} [tile.fatal] Program ends if Reeborg steps on such a tile set to `True`.
 *
 * @param {boolean} [tile.detectable] If `tile.fatal == tile.detectable == True`, Reeborg can
 *                                    detect with `front_is_clear()` and `right_is_clear()`.
 *
 * @param {boolean} [tile.solid] If sets to `True`, prevents a box from sliding onto this tile.
 *
 * @param {boolean} [tile.slippery] If sets to `True`, Reeborg will keep going to next tile if
 *                                  it attempts to move on this tile.
 *
 * @todo  Add "x-offset" and "y-offset" as additional properties, used for drawing
 * @todo  Add new method to retrieve the untranslated name of the tile, to help
 * world designers
 * @todo  document goal
 * @todo throw an error if no image is specified.
 *
 * @throws Will throw an error is `name` attribute is not specified.
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

RUR.enhance.new_tile_type = function (tile) {
    "use strict";
    var i, key, keys, name;
    name = tile.name;

    if (name === undefined){
        throw new RUR.ReeborgError("RUR.enhance.new_tile_type(tile): new_tile.name attribute missing.");
    }

    if (RUR.KNOWN_TILES.indexOf(name) != -1) {
        console.warn("Warning: tile name " + name + " already exists");
    } else {
        RUR.KNOWN_TILES.push(name);
    }

    RUR.TILES[name] = tile;
    // allow multiple tiles to appear under the same name;
    // for example, we might want to visually have different types of grass tiles
    // but referring under the single name "grass" when giving information
    // while keeping the different tiles distinct using their original name
    // internally.
    if (tile.public_name) {
        tile.name = tile.public_name;
    }
    create_images(tile);
    // Object goal (not required for decorative objects): either
    // a single url or a list for animated images.
    if (tile.goal) {
        create_images(tile.goal);
    }
};

function create_images(obj) {
    if (obj.url) {
        obj.image = new Image();
        obj.image.src = obj.url;
        RUR.images_onload(obj.image);
    } else if (obj.images) {
        RUR.animate_images(obj);
    } else {
        alert("Fatal error: need either tile.url or a list: tile.images");
    }
}


/** @function add_new_object_type
 * @memberof RUR
 * @instance
 *
 * @deprecated Use {@link RUR.enhance#new_tile_type} instead.
 */
RUR.add_new_object_type = function (name, url, url_goal) {
    RUR.enhance.new_tile_type({"name": name, "url": url, "goal": {"url": url_goal}});
};
/** @function add_object_image
 * @memberof RUR
 * @instance
 *
 * @deprecated Use {@link RUR.enhance#new_tile_type} instead.
 */
RUR.add_object_image = RUR.add_new_object_type; // Vincent Maille's book.
