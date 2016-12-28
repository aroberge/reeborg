/*  This file contains generic methods called by more specialized methods
    used to create worlds. */

require("./../rur.js");
require("./utils_namespace.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./key_exist.js");
require("./validator.js");
require("./supplant.js");
get_world = require("./../world_utils/get_world.js").get_world;


// private helper function
function ensure_valid_position(args) {
    // ensures that the position is within the world boundaries
    var position;
    if (args.x !== undefined && args.y !== undefined) {
        if (!RUR.utils.is_valid_position(args.x, args.y)) {
            position = "(" + args.x + ", " + args.y + ")";
            throw new RUR.ReeborgError(
                RUR.translate("Invalid position.").supplant({pos:position}));
        }
    } else {
        if (args.x === undefined) args.x = "?";
        if (args.y === undefined) args.y = "?";
        position = "(" + args.x + ", " + args.y + ")";
        throw new RUR.ReeborgError(
            RUR.translate("Invalid position.").supplant({pos:position}));
    }
}

function ensure_require_args_present(args) {
    ensure_valid_position(args);
    if (args.type === undefined) {
        throw new Error("Object type must be specified.");
    }
    if (args.name === undefined) {
        throw new Error("Object name must be specified.");
    }
    if (args.valid_names !== undefined) {
        if (args.valid_names.indexOf(args.name) === -1) {
            throw new Error("Invalid name");
        }
    }
}

// for testing purpose
if (RUR.UnitTest === undefined) {
    RUR.UnitTest = {};
}
RUR.UnitTest.ensure_require_args_present = ensure_require_args_present;

/** @function add_artefact
 * @memberof RUR.utils
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
 *
 * @param {string} [args.valid_names] A list containing the name of the 
 *                        acceptable objects. If this argument is specified, 
 *                        `args.name` must be found in that list, otherwise an
 *                        error will be thrown.
 *
 * @param {integer} [args.max_nb] Specifies if a maximum number of object of a
 *                        given name/type is permitted at a given location.
 *                        Only one of `args.max_nb` and `replace` must be
 *                        specified.
 *
 * @param  [args.replace] If it evaluates to "true", it specifies that any
 *                        existing object at that location must be replaced
 *                        by the new one. This can only be used if there is
 *                        at most one artefact of that type at that location.
 *                        (For example: a North wall).
 *                        Only one of `args.max_nb` and `replace` must be
 *                        specified.
 * 
 * @returns {integer} The number of object found at that location (could be 0).
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 * @throws Will throw an error if both `replace` and `max_nb` are specified.
 * @throws Will throw an error if `replace` is "true" but more than one kind
 * of artefact is found at that location.
 * @throws Will thrown an error if attempting to add more object than max_nb
 *
 * @see {@link UnitTest#test_artefacts} for unit tests.
 *  
 */

RUR.utils.add_artefact = function (args) {
    var coords, world = get_world();

    ensure_require_args_present(args);
    if (args.replace !== undefined && args.max_nb !== undefined) {
        throw new Error("'replace' and 'max_nb' are incompatible arguments.");
    }

    coords = args.x + "," + args.y;

    if (args.replace && world[args.type] !== undefined &&
        world[args.type][coords] !== undefined && 
        Object.keys(world[args.type][coords]).length > 1) {
        throw new Error("Cannot replace: more than one artefact present.");
    }

    if (args.max_nb !== undefined) {
        if(!RUR.utils.is_integer(args.max_nb) || args.max_nb <1){
            throw new Error("'max_nb' must be an integer greater than 0");
        }
    }

    RUR.utils.ensure_key_exists(world, args.type);
    RUR.utils.ensure_key_exists(world[args.type], coords);

    if (args.replace) {
        world[args.type][coords]= {};
        world[args.type][coords][args.name] = 1;
        return;
    }

    if (world[args.type][coords][args.name] === undefined) {
        world[args.type][coords][args.name] = 1;
    } else if (args.max_nb !== undefined) {
        if (world[args.type][coords][args.name] == args.max_nb) {
            throw new Error("Cannot add more artefact of this kind.");
        }
        world[args.type][coords][args.name] += 1;
    } else {
        world[args.type][coords][args.name] += 1;
    }
};




/** @function get_nb_artefact
 * @memberof RUR.utils
 * @instance
 * @summary **This function is intended for private use by developers.**
 * 
 *    This function returns the number of a specified (named) artefact of a 
 *    specified type (e.g. object, background tile, wall, etc.) at
 *    a given location.
 *    
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
 *
* @param {string} [args.valid_names] A list containing the name of the 
 *                        acceptable objects. If this argument is specified, 
 *                        `args.name` must be found in that list, otherwise an
 *                        error will be thrown.
 *
 * @returns {integer} The number of object found at that location (could be 0).
 * @throws Will throw an error if `name` attribute is not specified.
 * @throws Will throw an error if `type` attribute is not specified.
 * @throws Will throw an error if a valid position is not specified.
 *
 * @see {@link UnitTest#test_artefacts} for unit tests.
 *  
 */


RUR.utils.get_nb_artefact = function(args) {
    var coords, keys, world = get_world();

    ensure_require_args_present(args);

    coords = args.x + "," + args.y;
    if (args.goal) {
        if (world.goal === undefined || 
            world.goal[args.type] === undefined ||
            world.goal[args.type][coords] === undefined ||
            Object.keys(world.goal[args.type][coords]).indexOf(args.name) == -1) {
            return 0;
        } else {
            return world.goal[args.type][coords][args.name];
        }
    } else {
        if (world[args.type] === undefined ||
            world[args.type][coords] === undefined ||
            Object.keys(world[args.type][coords]).indexOf(args.name) == -1) {
            return 0;
        } else {
            return world[args.type][coords][args.name];
        }
    }    
};
