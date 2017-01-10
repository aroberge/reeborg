require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");
require("./../world_utils/get_world.js");

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
        keys = Object.keys(options);
        for (k of keys) {
            args[k] = options[k];
        }
        if (keys.indexOf("number") === -1) {
            args["number"] = 1;
        }
    }
    RUR.add_artefact(args);
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
    var args;
    args= {x:x, y:y, type:"objects", name:name};
    if (options !== undefined && options.goal !== undefined) {
        args.goal = options.goal;
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
    RUR.utils.ensure_key_for_obj_exists(RUR.CURRENT_WORLD, "objects");
    RUR.record_frame("RUR.remove_object", args);
};


/** @function get_object
 * @memberof RUR
 * @instance
 * @summary This function gets the object name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the object.
 * @param {integer} y  Position of the object.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @todo make sure it returns the correct info
 * @example
 * // shows how to set various objects;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/object1.json", "Example 1")
 *
 */

RUR.get_object = function (x, y) {
    "use strict";
    var object, args = {x:x, y:y, type:"objects"};
    object = RUR.get_artefacts(args);
    if (object === null) {
        return null;
    } else {
        return RUR.TILES[object[0]];
    }
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

