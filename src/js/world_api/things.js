require("./../rur.js");
require("./../translator.js");
require("./animated_images.js");
require("./../programming_api/exceptions.js");

/** @function add_new_thing
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new "things", represented
 * by an image which we call "tile".  In what follows we use the word "tile"
 * as the generic term.
 *
 * If the name of an existing tile is specified again, it is replaced by a new one
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
 * @param {string} [tile.info] Some information to be displayed about this tile
 * when a user clicks on "World Info" and then on this tile on the world canvas.
 * It is highly recommended to include this.
 *
 *
 * @param {string} [tile.url] If a single image is used, this indicated the source.
 *                            **Either tile.url or tile.images must be specified.**
 *
 * @param {strings[]} [tile.images] If multiple images are used (for animated tiles),
 *                               this array (list) contains the various URLs.
 *                            **Either tile.url or tile.images must be specified.**
 *
 * @param {string} [tile.selection_method]  For animated tiles; choose one of
 *
 *  * `"sync"`,
 *  * `"ordered"`,
 *  * `"random"`,
 *  * `"cycle stay"` or
 *  * `"cycle remove"`.
 *
 *  If the selection method is not recognized, `"random"` will
 *  be used, and no error will be thrown.
 *
 * @param {object} [tile.goal]  If the tile can be used for an object that can be
 * picked up or put down by Reeborg, includes `tile.goal` to describe the image(s),
 * following the same pattern as above (`tile.goal.url`, `tile.goal.images`,
 * `tile.goal.selection_method`).
 *
 * @param {string} [tile.fatal] Program ends if Reeborg steps on such a tile with
 * a value that is equivalent to "true", unless a bridge offering the adequate
 * protection is present. This value is usually set to the name of the tile.
 *
 * @param {string} [tile.detectable] If `tile.fatal` and  `tile.detectable` are
 *  both equivalent to "true", Reeborg can detect this tile with
 *  `front_is_clear()` and `right_is_clear()`.
 *
 * @param {strings[]} [tile.protections] Indicates against which `fatal` tile this
 *  offer protection.  Protection is given when tiles are used as a bridge or
 *  when they are carried.
 *
 * @param {boolean} [tile.solid] If sets to `True`, prevents a pushable object
 *  from sliding onto this tile.
 *
 * @param {integer} [tile.x_offset] By default, tiles are drawn on a set grid.
 *  Specifying a value for `x_offset` result in the tile drawn off grid, by a
 *  number of pixel equal to `x_offset`.
 *
 * @param {integer} [tile.y_offset] By default, tiles are drawn on a set grid.
 *  Specifying a value for `y_offset` result in the tile drawn off grid, by a
 *  number of pixel equal to `y_offset`.
 *
 * @throws Will throw an error if `name` attribute is not specified.
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
 * World("/worlds/examples/tile2.json", "Example 2")
 */
RUR.TILES = {};

RUR.add_new_thing = function (tile) {
    "use strict";
    var i, key, keys, name;
    name = tile.name;

    if (name === undefined){
        throw new RUR.ReeborgError("RUR.add_new_thing(tile): new_tile.name attribute missing.");
    }

    if (RUR.KNOWN_TILES.indexOf(name) != -1) {
        console.warn("Warning: tile name " + name + " already exists");
    } else {
        RUR.KNOWN_TILES.push(name);
    }

    RUR.TILES[name] = tile;
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

/** @function show_all_things
 * @memberof RUR
 * @instance
 *
 * @todo  document filter by property
 * @todo include goal images
 * @todo include translated name
 * @desc This needs to be documented
 */
RUR.show_all_things = function (property) {
    var i, j, info, images, name, url;
    if (property !== undefined) {
        info = "<h3>Things with property <code>" + property + "</code></h3>";
    } else {
        info = '';
    }
    if (RUR.state.human_language != 'en') {
            info += "<table border='1'><tr><th>name</th><th>translation</th><th>image(s)</th><th>goal?</th></tr>";
        } else {
            info += "<table border='1'><tr><th>name</th><th>image(s)</th><th>goal?</th></tr>";
        }
    for (i=0; i< RUR.KNOWN_TILES.length; i++) {
        name = RUR.KNOWN_TILES[i];
        if (property !== undefined) {
            if (RUR.TILES[name][property] === undefined) {
                continue;
            }
        }
        url = RUR.TILES[name].url;
        images = RUR.TILES[name].images;
        info += "<tr><td>" +  name + "</td><td>";
        if (RUR.state.human_language != 'en') {
            info += RUR.translate(name) + "</td><td>";
        }
        if (url !== undefined) {
            info += "<img src = '" + RUR.TILES[name].url + "'></td><td>";
        } else if (images !== undefined) {
            for(j=0; j<images.length; j++) {
                info += "<img src = '" + images[j] + "'> - ";
            }
            info += "</td><td>";
        } else {
            info += "Missing image</td><td>";
        }
        if (RUR.TILES[name].goal !== undefined) {
            info += "<img src = '" + RUR.TILES[name].goal.url + "'>";
        }
        info += "</td></tr>";
    }
    info += "</table>";
    RUR._print_html_(info, true); // true will replace existing content
};

/** @function has_property
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 */
RUR.has_property = function (name, property) {
    if (RUR.TILES[name] === undefined) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj:name}));
    }
    if (RUR.TILES[name][property] === undefined) {
        return false;
    } else {
        return true;
    }
};

/** @function get_property
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 */
RUR.get_property = function (name, property) {
    if (RUR.TILES[name] === undefined) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj:name}));
    }
    return RUR.TILES[name][property];
};


/*=============================
/
/   Deprecated methods below
/
/===========================*/

/** @function add_new_object_type
 * @memberof RUR
 * @instance
 * @deprecated Use {@link RUR#add_new_thing} instead.
 */
RUR.add_new_object_type = function (name, url, url_goal) {
    RUR.add_new_thing({"name": name, "url": url, "goal": {"url": url_goal}});
};
/** @function add_object_image
 * @memberof RUR
 * @instance
 * @deprecated Use {@link RUR#add_new_thing} instead.
 */
RUR.add_object_image = RUR.add_new_object_type; // Vincent Maille's book.
