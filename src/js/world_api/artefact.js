/*  This file contains generic methods called by more specialized methods
    used to create worlds.

IMPORTANT: the comments begin by "/*" instead of "/**" so as not to be
processed by jsdoc and be included in the public documentation.

*/


require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");

// private helper function that
// ensures that the position is within the world boundaries
function ensure_valid_position(args) {
    "use strict";
    var position;
    if (args.x === undefined) args.x = "?";
    if (args.y === undefined) args.y = "?";
    if (!RUR.is_valid_position(args.x, args.y)) {
        position = "(" + args.x + ", " + args.y + ")";
        throw new RUR.ReeborgError(
            RUR.translate("Invalid position.").supplant({pos:position}));
    }
}

function ensure_common_required_args_present(args) {
    "use strict";
    ensure_valid_position(args);
    if (args.type === undefined) {
        throw new RUR.ReeborgError("Object type must be specified.");
    }
    if (args.name === undefined) {
        throw new RUR.ReeborgError("Object name must be specified.");
    }
    if (args.valid_names !== undefined) {
        if (args.valid_names.indexOf(args.name) === -1) {
            throw new RUR.ReeborgError("Invalid name: " + args.name);
        }
     }
}

RUR.UnitTest.ensure_common_required_args_present = ensure_common_required_args_present;


/* @function _add_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function adds a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location, potentially subject to some limitations.
 *
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} [options.number] The number of objects to add at that
 * location; it is 1 by default.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 * If it is missing, or not within the world boundaries,
 * or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 * If it is missing, or not within the world boundaries,
 * or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.single] Specifies if only one of a given kind of
 * artefact is permitted at a given location. When set to True, adding a
 * new artefact result in replacing the old one.
 *
 * @returns {integer} The number of object found at that location (could be 0).
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 * @throws Will throw an error if `single` is "true" but more than one kind
 * of artefact is found at that location.
 * @throws Will throw an error if called after a range of values has already
 * been specified for that object at that location.
 *
 *
 */
RUR._add_artefact = function (args) {
    "use strict";
    var base, coords, world = RUR.get_current_world();

    ensure_common_required_args_present(args);
    base = world;
    if (args.goal) {
        RUR.utils.ensure_key_for_obj_exists(world, "goal");
        base = world.goal;
    }
    coords = args.x + "," + args.y;

    // This should never happen if functions upstream always
    // use args.single consistently
    if (args.single && base[args.type] !== undefined &&
               base[args.type][coords] !== undefined &&
               base[args.type][coords].length > 1) {
        throw new RUR.ReeborgError(
            "Inconsistent state: single type with more than one artefact present.");
    }

    RUR.utils.ensure_key_for_obj_exists(base, args.type);
    if (args.range) {
        RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
        base[args.type][coords][args.name] = args.range;
    } else if (args.number) {
        RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
        if (base[args.type][coords][args.name] === undefined) {
            base[args.type][coords][args.name] = args.number;
        } else if (typeof RUR._get_nb_artefact(args) === "string") {
            // string values are used to represent range, as in "3-7".
            // These values should have been set in
            throw new RUR.ReeborgError("Cannot add number (integer) to range (string)");
        } else {
            base[args.type][coords][args.name] += args.number;
        }
    }
    else {
        RUR.utils.ensure_key_for_array_exists(base[args.type], coords);
        if (args.single) {
            base[args.type][coords] = [args.name];
        } else {
            base[args.type][coords].push(args.name);
        }
    }
};


/* @function _get_artefacts
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    **Important:** This is the only function named with artefacts in plural
 *    form as other deal with a single artefact at a time, whereas this one
 *    returns a container that can contain many artefacts.
 *
 *    This function returns a container (Javascript Object or Array) with the
 *    artefacts found at a location.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        kind that we are interested about.
 *
 *
 * @returns      A container (Array or Object) with the artefacts found at that
 *              location, or `null` if no container is found at that location.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 *
 */
RUR._get_artefacts = function(args) {
    "use strict";
    var coords, container, world = RUR.get_current_world();

    ensure_valid_position(args);
    if (args.type === undefined) {
        throw new RUR.ReeborgError("Object type must be specified.");
    }

    coords = args.x + "," + args.y;
    if (args.goal) {
        if (world.goal === undefined ||
            world.goal[args.type] === undefined ||
            world.goal[args.type][coords] === undefined) {
            return null;
        } else {
            container = world.goal[args.type][coords];
        }
    } else if (world[args.type] === undefined ||
               world[args.type][coords] === undefined) {
        return null;
    } else {
        container = world[args.type][coords];
    }
    // return a copy so that we cannot accidently modify the original object.
    return JSON.parse(JSON.stringify(container));
};


/* @function _get_nb_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function returns the number of a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        object that must be found.
 *
 *
 * @returns The number (integer) or range (string) of object found at that location (could be 0).
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 */
RUR._get_nb_artefact = function(args) {
    "use strict";
    var coords, container, world = RUR.get_current_world();

    ensure_common_required_args_present(args);

    coords = args.x + "," + args.y;
    if (args.goal) {
        if (world.goal === undefined ||
            world.goal[args.type] === undefined ||
            world.goal[args.type][coords] === undefined) {
            return 0;
        } else {
            container = world.goal[args.type][coords];
        }
    } else if (world[args.type] === undefined ||
               world[args.type][coords] === undefined) {
        return 0;
    } else {
        container = world[args.type][coords];
    }

    if (Object.prototype.toString.call(container) == "[object Object]") {
        if (Object.keys(container).indexOf(args.name) == -1) {
            return 0;
        } else {
            return container[args.name];
        }
    } else if (Object.prototype.toString.call(container) == "[object Array]"){
        if (container.indexOf(args.name) == -1) {
            return 0;
        } else {
            return 1;
        }
    } else { // should never happen
        throw new RUR.ReeborgError("Unknown container type; need Object or Array");
    }
};

/* @function _remove_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function removes a specified (named) artefact of a
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location. For artefacts that can have more than 1 instance
 *    at a given location, it can either remove a single instance or all
 *    of them.
 *
 *    If no artefact of that kind is left at that location, that location is
 *    pruned (removed). If nothing is left for that kind, it is removed.
 *    If nothing is left but an empty goal, the goal object is removed
 *    as well.
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {string} args.type  The type of the object to be found; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal-type
 *                        object that must be found.
 *
 * @param {string} [args.number] Used for objects that can be manipulated by
 * Reeborg (so that more than one can be found at a given location),
 * this will result in `number` named
 * artefact removed from that location; the default value of 1 does not
 * need to be specified.  If a larger number of artefact are requested to
 * be removed than are present, an error will be raised.
 *
 * @param {string} [args.all] If `true/True`, and `args.number` is not specified,
 * all instances of the named artefact
 * will be removed; otherwise, their number will simply be reduced by 1..
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 * @throws Will throw an error if no such artefact is found at that location.
 * @throws Will throw an error if there are not enough artefact to remove.
 *
 */
RUR._remove_artefact = function (args) {
    "use strict";
    var base, container, coords, index, number, world = RUR.get_current_world();

    // Calling _get_nb_artefact will do all the required validation of basic arguments
    if (RUR._get_nb_artefact(args) === 0) {
        throw new RUR.ReeborgError("No artefact to remove");
    }

    if (args.number != undefined && args.number > RUR._get_nb_artefact(args)) {
        throw new RUR.ReeborgError("Not enough artefacts here to remove.")
    }

    base = world;
    if (args.goal) {
        base = world.goal;
    }
    coords = args.x + "," + args.y;
    container = base[args.type][coords];
    if (args.number) {
        number = args.number;
    } else if (args.all) {
        number = container[args.name];
    } else {
        number = 1;
    }

    if (Object.prototype.toString.call(container) == "[object Object]") {
        container[args.name] -= number;
        if (container[args.name] === 0) {
            delete container[args.name];
        }
        if (Object.keys(container).length === 0) { // nothing left at that location
            delete base[args.type][coords];
        } else {
            return;
        }
    } else if (Object.prototype.toString.call(container) == "[object Array]"){
        index = container.indexOf(args.name);
        container.splice(index, 1);
        if (container.length === 0){ // nothing left at that location
            delete base[args.type][coords];
        } else {
            return;
        }
    } else { // should never happen
        throw new RUR.ReeborgError("Unknown container type; need Object or Array");
    }

    // remove any empty remaining JS object, up to world.
    if (Object.keys(base[args.type]).length === 0) {
        delete base[args.type];
        if (args.goal) {
            if (Object.keys(world.goal).length === 0){
                delete world.goal;
            }
        }
    }
};

/* @function _set_nb_artefact
 * @memberof RUR
 * @instance
 * @summary **This function is intended for private use by developers.**
 *
 *    This function sets a specified number of a named artefact of a
 *    specified type (e.g. object, goal object) at a given location.
 *
 *
 * @param {Object} args A Javascript object (similar to a Python dict) that
 *                      holds the relevant attribute.
 *
 * @param {string} args.name  The name of the object to be added; an error
 *    will be thrown if it is missing.
 *
 * @param {integer|string} args.number  The number of artefacts to be set; an error
 * will be thrown if it is missing. If it is zero, any artefact already present
 * will be removed. String arguments are accepted so that `"all"` for
 * "objects as goals" and `"min-max"` for range of objects can be set.
 *
 * @param {string} args.type  The type of the object to be added; an error
 *    will be thrown if it is missing.
 *
 * @param {integer} args.x The `x` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {integer} args.y The `y` coordinate where the object should be found.
 *                        If it is missing, or not within the world boundaries,
 *                        or is not an integer, an error will be thrown.
 *
 * @param {boolean} [args.goal] If specified, indicates that it is a goal that
 *                        must be set.
 *
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if `number` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 */
RUR._set_nb_artefact = function (args) {
    "use strict";
    var base, coords, world = RUR.get_current_world();

    ensure_common_required_args_present(args);
    if (args.number === undefined) {
        throw new RUR.ReeborgError("Number of objects must be specified.");
    }

    coords = args.x + "," + args.y;
    base = world;
    if (args.goal) {
        RUR.utils.ensure_key_for_obj_exists(world, "goal");
        base = world.goal;
    }

    // While it may not be as efficient, the logic
    // is easier if we proceed as though we need to add
    // artefact, and then remove and cleanup if the number
    // of artefact is zero
    RUR.utils.ensure_key_for_obj_exists(base, args.type);
    RUR.utils.ensure_key_for_obj_exists(base[args.type], coords);
    base[args.type][coords][args.name] = args.number;
    if (args.number === 0) {
        delete base[args.type][coords][args.name];
        // remove any empty remaining JS object, up to world.
        if (Object.keys(base[args.type]).length === 0) {
            delete base[args.type];
            if (args.goal) {
                if (Object.keys(world.goal).length === 0){
                    delete world.goal;
                }
            }
        }
    }
};
