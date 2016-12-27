/*  This file contains generic methods called by more specialized methods
    used to create worlds. */

require("./../rur.js");
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


/* Generic method to add artefacts. Verifies that all required conditions
 * are satisfied. 
 **/

RUR.utils.add_artefact = function (args) {
    var coords, world = get_world();
    ensure_valid_position(args);
    if (args.valid_names !== undefined) {
        if (args.valid_names.indexOf(args.name) === -1) {
            throw new Error("Invalid name");
        }
    }
    RUR.utils.ensure_key_exists(world, args.type);
    coords = args.x + "," + args.y;
    RUR.utils.ensure_key_exists(world[args.type], coords);
    world[args.type][coords][args.name] = 1;
};

RUR.utils.is_artefact = function(args) {
    var coords, keys, world = get_world();
    ensure_valid_position(args);
    if (args.valid_names !== undefined) {
        if (args.valid_names.indexOf(args.name) === -1) {
            throw new Error("Invalid name");
        }
    }
    coords = args.x + "," + args.y;
    if (args.goal) {
        if (world.goal === undefined || 
            world.goal[args.type] === undefined ||
            world.goal[args.type][coords] === undefined ||
            Object.keys(world.goal[args.type][coords]).indexOf(args.name) == -1) {
            return false;
        } else {
            return world.goal[args.type][coords][args.name];
        }
    } else {
        if (world[args.type] === undefined ||
            world[args.type][coords] === undefined ||
            Object.keys(world[args.type][coords]).indexOf(args.name) == -1) {
            return false;
        } else {
            return world[args.type][coords][args.name];
        }
    }    
};
