require("./../rur.js");
require("./../translator.js");
require("./animated_images.js");
require("./../programming_api/exceptions.js");

/** @function add_new_thing
 * @memberof RUR
 * @instance
 * @summary This method makes it possible to add new `thing`s, represented
 * by an image which we call `thing`.
 *
 * If the name of an existing thing is specified again, it is replaced by a new
 * one which may have completely different characteristics.
 *
 *    **Important** Other than for testing purposes, This method should
 *    only be called from the "Onload" editor so that it can start fetching
 *    the required images as soon as possible, and try to ensure that the
 *    images will be ready to be shown when a program is executed.
 *
 * @param {Object} thing A Javascript object (similar to a Python dict) that
 * describes the properties of the `thing`.
 *
 * @param {string} thing.name  The name to be given to the `thing`; an exception
 * will be raisd if it is missing.
 *
 * @param {string} [thing.info] Some information to be displayed about this `thing`
 * when a user clicks on "World Info" and then on this thing on the world canvas.
 * It is highly recommended to include this.
 *
 * @param {string} [thing.url] If a single image is used, this indicated the source.
 *  **Either `thing.url` or `thing.images` must be specified.**
 *
 * @param {strings[]} [thing.images] If multiple images are used
 * (for animated `thing`s), this array (list) contains the various URLs.
 *  **Either `thing.url` or `thing.images` must be specified.**
 *
 * @param {string} [thing.selection_method]  For animated `thing`s; choose one of
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
 * @param {object} [thing.goal]  If the `thing`s can be used for an object that can be
 * picked up or put down by Reeborg, includes `thing.goal` to describe the image(s),
 * following the same pattern as above (`thing.goal.url`, `thing.goal.images`,
 * `thing.goal.selection_method`).
 *
 * @param {string} [thing.fatal] Program ends if Reeborg steps on such a `thing`s with
 * a value that is equivalent to "true" when used as background things or obstacles,
 * unless a bridge offering the adequate protection is present or an object
 * carried by Reeborg has the right protection defined.
 * This value is usually set to the name of the `thing`s so as to facilitate
 * defining objects or bridges which offer the right protection.
 *
 * @param {string} [thing.detectable] If `thing.fatal` and  `thing.detectable` are
 * both equivalent to "true", Reeborg can detect this `thing` with
 * `front_is_clear()` and `right_is_clear()` if it is set as an obstacle
 * or a background thing.
 *
 * @param {strings[]} [thing.protections] Indicates against which `fatal` thing this
 * offer protection.  Protection is given when things are used as a bridge or
 * when they are carried.
 *
 * @param {boolean} [thing.solid] If sets to `True`, prevents a pushable object
 * from sliding onto this `thing`s when used as a background thing or as an
 * obstacle.
 *
 * @param {integer} [thing.x_offset] By default, `thing`s are drawn on a set grid.
 * Specifying a value for `x_offset` result in the `thing`s drawn off grid, by a
 * number of pixel equal to `x_offset`.
 *
 * @param {integer} [thing.y_offset] By default, `thing`s are drawn on a set grid.
 * Specifying a value for `y_offset` result in the `thing` drawn off grid, by a
 * number of pixel equal to `y_offset`.
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if no images is supplied (either via the `url`
 *         or the `images` attribute.)
 *
 * @example
 * // This first example shows how to set various `thing`s;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/thing1.json", "Example 1")
 *
 * // A second example shows how one can change `thing`s behaviour.
 * World("/worlds/examples/thing2.json", "Example 2")
 */
RUR.TILES = {};

RUR.add_new_thing = function (thing) {
    "use strict";
    var i, key, keys, name;
    name = thing.name;

    if (name === undefined){
        throw new RUR.ReeborgError("RUR.add_new_thing(thing): thing.name attribute missing.");
    }

    if (RUR.KNOWN_TILES.indexOf(name) != -1) {
        console.warn("Warning: thing name " + name + " already exists");
    } else {
        RUR.KNOWN_TILES.push(name);
    }

    RUR.TILES[name] = thing;
    create_images(thing);
    // Object goal (not required for decorative objects): either
    // a single url or a list for animated images.
    if (thing.goal) {
        create_images(thing.goal);
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
        throw new RUR.ReeborgError("Fatal error: need either thing.url or a list [thing.images]");
    }
}

/** @function show_all_things
 * @memberof RUR
 * @instance
 *
 * @summary This method shows all known `thing`s in a table. If a language
 * other than English is selected, the translated name appears as well; this
 * can be helpful to identify missing translations.
 * If multiple images are shown, it means that the `thing` is shown as an
 * animation.
 * Missing images in the **goal** column indicate that this `thing` cannot
 * be used as an object to be picked up by Reeborg.
 *
 * @param {string} [property] If this argument is provided, only `thing`s for
 * which this property is defined will be shown.
 *
 * @example
 * RUR.show_all_things("fatal")
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
 * @summary This method returns "true" if a `thing` has the stated property,
 * and "false" otherwise
 *
 * @param {string} name The name of the `thing`.
 *
 * @param {string} property
 *
 * @example
 * "Use Python for this example"
 * print(RUR.has_property("water", "fatal"))
 *
 * @example
 * "Use Javascript for this example"
 * write(RUR.has_property("water", "fatal"))
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
 * @summary This method returns the value of a given property.
 * **Important:** the value shown will be the English default even if a
 * translation exists and might appear in other contexts, like the
 * "World Info".
 *
 * @param {string} name The name of the `thing`.
 *
 * @param {string} property
 *
 * @example
 * "Use Python for this example"
 * print(RUR.get_property("water", "info"))
 *
 * @example
 * "Use Javascript for this example"
 * write(RUR.get_property("water", "fatal"))
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
