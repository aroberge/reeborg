require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_object
 * @memberof RUR
 * @instance
 * @summary This function adds one or more of a given object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position of the object.
 * @param {integer} y  Position of the object.
 * @param {object} options  Need to include: `goal`, `number`, `replace`,
 * `min`, `max`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @example
 * // shows how to set various objects;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/object1.json", "Example 1")
 *
 */
RUR.add_object = function (name, x, y, options) {
    "use strict";
    var k, keys, args = {name: name, x:x, y:y, type:"objects"};
    if (options === undefined) {
        args.number = 1;
    } else {
        if (options.goal && options.goal == "all") {
            options.number = "all";
        } else if (options.min !== undefined) {
            if (options.max !== undefined && options.max > options.min) {
                options.number = options.min + "-" + options.max;
            } else {
                options.number = options.min;
            }
        } else if (options.number === undefined) {
            options.number = 1
        }
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
    }
    if (args.replace) {
        RUR.set_nb_artefact(args);
    } else {
        RUR.add_artefact(args);
    }
    RUR.record_frame("RUR.add_object", args);
};


/** @function remove_object
 * @memberof RUR
 * @instance
 * @summary This function removes an object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position of the object.
 * @param {integer} y  Position of the object.
 * @param {object} options  Need to include: `goal`, `number`, `all`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background object to remove
 *        at that location
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_object = function (name, x, y, options) {
    "use strict";
    var args, k, keys, world = RUR.get_current_world();
    args= {x:x, y:y, type:"objects", name:name};
    if (options !== undefined) {
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
    }
    try {
        RUR.remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No object to remove here.");
        } else {
            throw e;
        }
    }
    // For historical reason, worlds are always created with an "objects" attribute
    RUR.utils.ensure_key_for_obj_exists(world, "objects");
    RUR.record_frame("RUR.remove_object", args);
};


/** @function get_objects
 * @memberof RUR
 * @instance
 * @summary This function returns a Javascript Object/Python dict containing
 * the names of the objects found at that location.
 * If nothing is found at that location,
 * `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position on the grid.
 * @param {integer} y  Position on the grid.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @todo make sure it returns the correct info
 *
 */

RUR.get_objects = function (x, y) {
    "use strict";
    return RUR.get_artefacts({x:x, y:y, type:"objects"});
};

RUR.is_object = function (name, x, y, options) {
    "use strict";
    var nb, args = {x:x, y:y, name:name, type:"objects"};
    if (options !== undefined && options.goal !== undefined) {
        args.goal = options.goal;
    }
    nb = RUR.get_nb_artefact(args);
    if (nb === 0) {
        return false;
    } else {
        return true;
    }
};


/** @function add_object_at_position
 * @memberof RUR
 * @instance
 *
 * @deprecated Use {@link RUR#add_object} instead.
 */
RUR.add_object_at_position = function(name, x, y, number) { // Vincent Maille's book
    RUR.add_object(name, x, y, {number:number});
}


/** @function add_goal_object_at_position
 * @memberof RUR
 * @instance
 *
 * @deprecated Use {@link RUR#add_object} instead.
 */