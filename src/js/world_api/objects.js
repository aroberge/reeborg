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
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {object} [options] A Javascript object (or Python dict) containing
 * additional arguments
 * @param {boolean} [options.goal] If `true`, this will represent a goal
 * i.e. the number of object that must be put at that location.
 * @param {integer} [options.number] The number of objects to **add** at that
 * location; it is 1 by default.
 * @param {boolean} [options.replace] If `true`, the specified number
 * (default=1) will **replace** the existing number of objects at that location.
 * During the Onload phase, this is automatically set to `true`.
 * @param {integer} [options.min] Specifies the minimum of objects to be
 * put at that location; together with `options.max`, it is used to choose
 * a random number of objects to be found at that location.
 * @param {integer} [options.max] Specifies the maximum number of objects to be
 * put at that location; together with `options.min`, it is used to choose
 * a random number of objects to be found at that location.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 *
 */
RUR.add_object = function (name, x, y, options) {
    "use strict";
    var k, keys, args;

    args = {name: RUR.translate_to_english(name), x:x, y:y,
            type:"objects", valid_names: RUR.KNOWN_THINGS};
    if (options === undefined) {
        args.number = 1;
    } else {
        if (options.goal && options.goal == "all") {
            options.number = "all";
        } else if (options.min !== undefined) {
            if (options.max !== undefined && options.max > options.min) {
                options.number = options.min + "-" + options.max;
                args.replace = true;
            } else {
                options.number = options.min;
            }
        } else if (options.number === undefined) {
            options.number = 1;
        }
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
    }

    if (RUR.state.evaluating_onload) {
        args.replace = true;
    }
    if (args.replace) {
        RUR._set_nb_artefact(args);
    } else {
        RUR._add_artefact(args);
    }
    RUR.record_frame("RUR.add_object", args);
};


/** @function remove_object
 * @memberof RUR
 * @instance
 * @summary This function removes an object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {object} [options] A Javascript object (or Python dict) containing
 * additional arguments
 *
 * @param {boolean} [options.goal] If `true`, this will represent a goal
 * i.e. the number of object that must be put at that location.
 * @param {integer} [options.number] The number of objects to **add** at that
 * location; it is 1 by default.
 * @param {boolean} [options.all] If `true`, all such objects will be removed.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is no object to remove
 *        at that location
 */
RUR.remove_object = function (name, x, y, options) {
    "use strict";
    var args, k, keys, world = RUR.get_current_world();

    args= {x:x, y:y, type:"objects", name:RUR.translate_to_english(name),
           valid_names: RUR.KNOWN_THINGS};
    if (options !== undefined) {
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
    }
    try {
        RUR._remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new RUR.ReeborgError("No object to remove here.");
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
 * @summary This function returns a Javascript Object containing
 * the names of the objects found at that location.
 * When using from Python, it should be explictly converted into a `dict`
 * using `dict(RUR.get_objects(x, y))`.
 *
 * If nothing is found at that location,
 * `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @param {object} [options] A Javascript object (or Python dict) containing
 * additional arguments
 *
 * @param {boolean} [options.goal] If `true`, this will represent a goal
 * i.e. the number of object that must be put at that location.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.get_objects = function (x, y, options) {
    "use strict";
    var args, obj, obj_en, k, keys;
    args = {x:x, y:y, type:"objects"};
    if (options !== undefined && options.goal !== undefined) {
        args.goal = options.goal;
    }
    obj_en = RUR._get_artefacts(args);


    if (!obj_en) {
        return null;
    }

    obj = {};
    keys = Object.keys(obj_en);
    for (k of keys) {
        obj[RUR.translate(k)] = obj_en[k];
    }
    return obj;
};


/** @function is_object
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a named obstacle is present
 * at a given location, `false/False` otherwise
 *
 * @param {string} name The name of the obstacle
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @param {object} [options] A Javascript object (or Python dict) containing
 * additional arguments
 *
 * @param {boolean} [options.goal] If `true`, this will represent a goal
 * [i.e., the number of object that must be put at that location.]
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_object = function (name, x, y, options) {
    "use strict";
    var nb, args = {x:x, y:y, name:RUR.translate_to_english(name),
                    type:"objects", valid_names: RUR.KNOWN_THINGS};
    if (options !== undefined && options.goal !== undefined) {
        args.goal = options.goal;
    }
    nb = RUR._get_nb_artefact(args);
    if (nb === 0) {
        return false;
    } else {
        return true;
    }
};


/* The following is deprecated. Some worlds may have been created
  using it (e.g. in Vincent Maille's book) */
RUR.add_object_at_position = function(name, x, y, number) { // Vincent Maille's book
    RUR.add_object(name, x, y, {number:number});
};
