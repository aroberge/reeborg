require("./../rur.js");
require("./animated_images.js");
require("./../programming_api/exceptions.js");

/** @function add_new_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new tiles. If the name
 *    of an existing tile is specified again, it is replaced by a new one
 *    which may have completely different characteristics. 
 *
 *    **Important** Other than for testing purposes, this function should
 *    only be called from the "Onload" editor so that it can start fetching
 *    the required images as soon as possible, and try to ensure that the
 *    images will be ready to be shown when a program is executed.
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
 *                           "sync", "ordered", "random", "cycle stay", "cycle remove".
 *                           If the selection method is not recognized, "random" will
 *                           be used, and no error will be thrown.
 *
 * @param {object} [tile.goal]  If the tile can be used for an object that can be
 *                            picked up or put down by Reeborg, includes `tile.goal`
 *                            to describe the image(s), following the same pattern
 *                            as above (`tile.goal.url`, `tile.goal.images`, 
 *                            `tile.goal.selection_method`).
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
 *
 * @throws Will throw an error is `name` attribute is not specified.
 * @throws Will throw an error if no images is supplied (either via the `url`
 *         or the `images` attribute.)
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

RUR.add_new_type = function (tile) {
    "use strict";
    var i, key, keys, name;
    name = tile.name;

    if (name === undefined){
        throw new RUR.ReeborgError("RUR.add_new_type(tile): new_tile.name attribute missing.");
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
        throw new RUR.ReeborgError("Fatal error: need either tile.url or a list: tile.images");
    }
}

/** @function show_existing_types
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 */
RUR.show_existing_types = function () {
    var i, j, info, images, name;
    info = "<table border='1'><tr><th>name</th><th>image(s)</th></tr>";
    for (i=0; i< RUR.KNOWN_TILES.length; i++) {
        name = RUR.KNOWN_TILES[i];
        url = RUR.TILES[name].url;
        images = RUR.TILES[name].images;
        info += "<tr><td>" +  name + "</td><td>";
        if (url !== undefined) {
            info += "<img src = '" + RUR.TILES[name].url + "'>";
        } else if (images !== undefined) {
            for(j=0; j<images.length; j++) {
                info += "<img src = '" + images[j] + "'> - ";
            }
        } else {
            info += "Missing image";
        } 
        info += "</td></tr>";
    }
    info += "</table>";
    RUR._print_html_(info);
};

/*=============================
/
/   Deprecated methods below
/
/===========================*/

/** @function add_new_object_type
 * @memberof RUR
 * @instance
 * @deprecated Use {@link RUR#add_new_type} instead.
 */
RUR.add_new_object_type = function (name, url, url_goal) {
    RUR.add_new_type({"name": name, "url": url, "goal": {"url": url_goal}});
};
/** @function add_object_image
 * @memberof RUR
 * @instance
 * @deprecated Use {@link RUR#add_new_type} instead.
 */
RUR.add_object_image = RUR.add_new_object_type; // Vincent Maille's book.
