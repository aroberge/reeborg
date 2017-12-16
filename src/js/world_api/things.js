require("./../rur.js");
require("./../translator.js");
require("./animated_images.js");
require("./../programming_api/exceptions.js");
require("./../utils/supplant.js");

/** @function add_new_thing
 * @memberof RUR
 * @instance
 * @summary This method makes it possible to add new "things", represented
 * by an image.
 *
 * If the name of an existing thing is specified with different properties,
 * it is replaced by the new one.
 *
 * **Important** Other than for testing purposes, This method should
 * only be called from the "Onload" editor so that it can start fetching
 * the required images as soon as possible, and try to ensure that the
 * images will be ready to be shown when a program is executed.
 *
 * @param {Object} thing A Javascript object (similar to a Python dict) that
 * describes the properties of the "thing".
 *
 * @param {string} thing.name  The name to be given to the "thing"; an exception
 * will be raisd if it is missing.
 *
 * @param {string} [thing.info] Some information to be displayed about this "thing"
 * when a user clicks on "World Info" and then on this thing on the world canvas.
 * It is highly recommended to include this.
 *
 * @param {string} [thing.color] A string representing a valid html color
 * (named, rgb, rgba, hsl or #-notation).
 * **Either `thing.color`, thing.url` or `thing.images` must be specified.**
 *
 * @param {string} [thing.url] If a single image is used, this indicated the source.
 *  **Either `thing.color`, `thing.url` or `thing.images` must be specified.**
 *
 * @param {strings[]} [thing.images] If multiple images are used
 * (for animated "things"), this array (list) contains the various URLs.
 *  **Either `thing.color`, `thing.url` or `thing.images` must be specified.**
 *
 * @param {string} [thing.selection_method]  For animated "things"; choose one of
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
 * @param {object} [thing.goal]  If the "things" can be used for an object that can be
 * picked up or put down by Reeborg, includes `thing.goal` to describe the image(s),
 * following the same pattern as above (`thing.goal.url`, `thing.goal.images`,
 * `thing.goal.selection_method`), except that `goal` is ignored if `color` is true.
 *
 * @param {string} [thing.fatal] Program ends if Reeborg steps on such a "thing" with
 * a value that is equivalent to "true" when used as background things or obstacles,
 * unless a bridge offering the adequate protection is present or an object
 * carried by Reeborg has the right protection defined.
 * This value is usually set to the name of the "things" so as to facilitate
 * defining objects or bridges which offer the right protection.
 * For `fatal` things, `message` should be defined as well.
 *
 * @param {string} [thing.message] The message shown when Reeborg steps on
 * a `fatal` tile.
 *
 * @param {string} [thing.detectable] If `thing.fatal` and  `thing.detectable` are
 * both equivalent to "true", Reeborg can detect this "thing" with
 * `front_is_clear()` and `right_is_clear()` if it is set as an obstacle
 * or a background thing.
 *
 * @param {strings[]} [thing.protections] Indicates against which `fatal` thing this
 * offer protection.  Protection is given when things are used as a bridge or
 * when they are carried.
 *
 * @param {boolean} [thing.solid] If sets to `True`, prevents a pushable object
 * from sliding onto this "things" when used as a background thing or as an
 * obstacle.
 *
 * @param {integer} [thing.x_offset] By default, "things" are drawn on a set grid.
 * Specifying a value for `x_offset` result in the "things" drawn off grid, by a
 * number of pixel equal to `x_offset`. This is only valid for images - not for
 * colors.
 *
 * @param {integer} [thing.y_offset] By default, "things" are drawn on a set grid.
 * Specifying a value for `y_offset` result in the "thing" drawn off grid, by a
 * number of pixel equal to `y_offset`. This is only valid for images - not for
 * colors.
 *
 * @param {object} [thing.transform] See the book
 * **Reeborg's World: a Teacher's guide** for an explanation.
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if no image is supplied (either via the `url`
 *         or the `images` attribute) and `color` does not evaluate to true.
 */

RUR.add_new_thing = function (thing) {
    "use strict";
    var name;
    name = thing.name;

    if (name === undefined){
        throw new RUR.ReeborgError("RUR.add_new_thing(thing): thing.name attribute missing.");
    }

    RUR.KNOWN_THINGS.push(name);
    RUR.THINGS[name] = thing;
    if (thing.color) {
        return;
    }
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
        obj.image.onload = RUR.onload_new_image;
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
 * @summary This method shows all known "things" in a table, with the exception
 * of those defined with the `color` attribute. If a language
 * other than English is selected, the translated name appears as well; this
 * can be helpful to identify missing translations.
 * If multiple images are shown, it means that the "thing" is shown as an
 * animation in a world.
 * Missing images in the **goal** column indicate that this "thing" cannot
 * be used as an object to be picked up by Reeborg.
 *
 * @param {string} [property] If this argument is provided, only "things" for
 * which this property/attribute is defined will be shown,
 * and the value of the attribute will be shown as well.
 *
 * @example
 * RUR.show_all_things()
 * RUR.show_all_things("fatal")
 */
RUR.show_all_things = function (property) {
    var i, j, info, images, name, url, begin, end, prop_str;
    if (property !== undefined) {
        info = "<h3>Things with property <code>" + property + "</code></h3>";
        prop_str = "<th>" + property + "</th>";
    } else {
        info = '';
        prop_str = '';
    }
    begin = "<table border='1'><tr><th>name</th>";
    end = "<th>image(s)</th><th>goal?</th></tr>";
    if (RUR.state.human_language != 'en') {
            info += begin + "<th>translation</th>" + prop_str + end;
        } else {
            info += begin + prop_str + end;
        }
    for (i=0; i< RUR.KNOWN_THINGS.length; i++) {
        name = RUR.KNOWN_THINGS[i];
        if (property !== undefined) {
            if (RUR.THINGS[name][property] === undefined) {
                continue;
            }
        }
        if (RUR.THINGS[name].color) {
            continue;
        }
        url = RUR.THINGS[name].url;
        images = RUR.THINGS[name].images;
        info += "<tr><td>" +  name + "</td><td>";
        if (RUR.state.human_language != 'en') {
            info += RUR.translate(name) + "</td><td>";
        }
        if (property !== undefined) {
            info +=  RUR.THINGS[name][property] + "</td><td>";
        }
        if (url !== undefined) {
            info += "<img src = '" + RUR.THINGS[name].url + "'><br>" +
                   RUR.THINGS[name].url + "</td><td>";
        } else if (images !== undefined) {
            for(j=0; j<images.length; j++) {
                info += "<img src = '" + images[j] + "'> &nbsp; ";
            }
            for(j=0; j<images.length; j++) {
                info += "<br>" + images[j];
            }
            info += "</td><td>";
        } else {
            info += "Missing image</td><td>";
        }
        if (RUR.THINGS[name].goal !== undefined) {
            info += "<img src = '" + RUR.THINGS[name].goal.url + "'><br>" +
                    RUR.THINGS[name].goal.url;
        }
        info += "</td></tr>";
    }
    info += "</table>";
    RUR._print_html_(info, true); // true will replace existing content
    return null; // for the python repl
};

/** @function has_property
 * @memberof RUR
 * @instance
 *
 * @summary This method returns "true" if a "thing" has the stated property,
 * and "false" otherwise
 *
 * @param {string} name The name of the "thing".
 *
 * @param {string} property
 *
 * @example {@lang python}
 * # Python example
 * print(RUR.has_property("water", "fatal"))
 *
 * @example
 * // Javascript example
 * write(RUR.has_property("water", "fatal"))
 */
RUR.has_property = function (name, property) {
    name = RUR.translate_to_english(name);
    if (RUR.THINGS[name] === undefined) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj:name}));
    }
    if (RUR.THINGS[name][property] === undefined) {
        return false;
    } else {
        return true;
    }
};

/** @function get_property
 * @memberof RUR
 * @instance
 *
 * @summary This method returns the value of a given property for a "thing".
 * **Important:** the returned value will be the English default even if a
 * translation exists and might appear in other contexts, like the
 * "World Info".
 *
 * If the property is undefined, `null` will be returned (which will be
 * converted to `None` if Python is used).
 *
 * @param {string} name The name of the "thing".
 *
 * @param {string} property See the examples
 *
 *
 * @example {@lang python}
 * print(RUR.get_property("water", "info"))  # Python
 *
 * @example {@lang javascript}
 * write(RUR.get_property("water", "fatal"))  // Javascript
 */
RUR.get_property = function (name, property) {

    name = RUR.translate_to_english(name);

    if (RUR.THINGS[name] === undefined) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj:name}));
    }

    property = RUR.THINGS[name][property];
    if (property === undefined) {
        return null;
    } else {
        return property;
    }
};

// Internal function used with name already translated into English;
// we undo the translation to avoid having a warning for a missing
// translation logged in the browser console.
RUR._get_property = function (name, property) {
    return RUR.get_property(RUR.translate(name), property);
};


/*=============================
/
/   Deprecated methods below; likely used in Vincent Maille's book
/
/===========================*/

RUR.add_new_object_type = function (name, url, url_goal) {
    RUR.add_new_thing({"name": name, "url": url, "goal": {"url": url_goal}});
};
RUR.add_object_image = RUR.add_new_object_type;
