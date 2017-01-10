require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");
require("./../recorder/record_frame.js");
require("./../world_utils/get_world.js");
require("./artefact.js");

/*=========================================
Walls data structure

Worlds are defined such that walls are listed only to the East or to the
North of a given position. However, this is an implementation detail
which could be changed without affecting what information is
given to the user.

Also, worlds are defined so that they are rectangular with walls on
all sides. However, these walls are not included in the data structure
that lists the walls, and must be handled separately.
*/

/** @function get_walls
 * @memberof RUR
 * @instance
 * @summary This function returns a list of walls at a location from within
 * the boundaries of a normal (rectangular) world. The order they are listed,
 * if present, are `"east"`, `"north"`, `"west"`, `"south"`.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, list the goal walls found at that position
 *                      instead of regular walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 *
 * @see {@link UnitTest#test_walls} for unit tests.
 * @see {@link FuncTest#test_walls} for functional/integration tests.
 * @example
 * // Execute the following instruction (either from Python or Javascript)
 * // to load a sample program
 * 
 * World("worlds/examples/walls.json", "Wall example")
 * 
 * // Then run the program; notice how the goal set (3 walls to build)
 * // is automatically verified at the end.
 *
 */
RUR.get_walls = function(x, y, goal) {
    // var world = RUR.get_world();
    var args = {x:x, y:y, goal:goal, type:"walls"}, walls;

    walls = RUR.get_artefacts(args); // gets "east" and "north" if present
    if (walls === null) {
        walls = [];
    }
    if (RUR.is_wall("west", x, y, goal)) {
        walls.push("west");
    }
    if (RUR.is_wall("south", x, y, goal)) {
        walls.push("south");
    }
    return walls;  
};


/** @function is_wall
 * @memberof RUR
 * @instance
 * @summary This function returns `true` if a wall is found at the
 * stated position and orientation, and `false` otherwise.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, get information about goal walls
 *                      instead of regular walls.
 *
 * 
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 *
 * @see {@link UnitTest#test_walls} for unit tests.
 * @see {@link FuncTest#test_walls} for functional/integration tests.
 * @example
 * // Execute the following instruction (either from Python or Javascript)
 * // to load a sample program
 * 
 * World("worlds/examples/walls.json", "Wall example")
 * 
 * // Then run the program; notice how the goal set (3 walls to build)
 * // is automatically verified at the end.
 *
 */
RUR.is_wall = function(orientation, x, y, goal) {
    var args;
    if (["east", "north", "west", "south"].indexOf(orientation) === -1) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid orientation.").supplant({orient:orientation}));
    }
    if (is_boundary_wall(orientation, x, y)) {
        return true;
    }
    args = convert_position(orientation, x, y);
    args.goal = goal;
    args.type = "walls";
    if (RUR.get_nb_artefact(args) === 0) {
        return false;
    } else {
        return true;
    }     
};

// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
function is_boundary_wall(orientation, x, y) {
    if ( (orientation == "east"  && x === RUR.MAX_X) ||
         (orientation == "north" && y === RUR.MAX_Y) ||
         (orientation == "west"  && x === 1) ||
         (orientation == "south" && y === 1) ) {
        return true;
    }
    return false;
}


/** @function add_wall
 * @memberof RUR
 * @instance
 * @summary This function adds a wall at the stated
 * stated position and orientation if there is none already located there;
 * otherwise, it raises an exception.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 * @throws Will throw an error if there is already a wall there.
 *
 * @see {@link UnitTest#test_walls} for unit tests.
 * @see {@link FuncTest#test_walls} for functional/integration tests.
 * @example
 * // Execute the following instruction (either from Python or Javascript)
 * // to load a sample program
 * 
 * World("worlds/examples/walls.json", "Wall example")
 * 
 * // Then run the program; notice how the goal set (3 walls to build)
 * // is automatically verified at the end.
 *
 */
RUR.add_wall = function(orientation, x, y, goal) {
    "use strict";
    var args;

    if (RUR.is_wall(orientation, x, y, goal)){
        throw new RUR.ReeborgError(RUR.translate("There is already a wall here!"));
    }
    args = convert_position(orientation, x, y);
    args.goal = goal;
    args.type = "walls";
    RUR.add_artefact(args);
    RUR.record_frame("add_wall", args);
};

/** @function remove_wall
 * @memberof RUR
 * @instance
 * @summary This function removes a wall at the stated
 * stated position and orientation if there there is one already located there;
 * otherwise, it raises an exception.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 * @throws Will throw an error if there is no wall to remove.
 *
 * @see {@link UnitTest#test_walls} for unit tests.
 * @see {@link FuncTest#test_walls} for functional/integration tests.
 * @example
 * // Execute the following instruction (either from Python or Javascript)
 * // to load a sample program
 * 
 * World("worlds/examples/walls.json", "Wall example")
 * 
 * // Then run the program; notice how the goal set (3 walls to build)
 * // is automatically verified at the end.
 *
 */
RUR.remove_wall = function(orientation, x, y, goal) {
    var args;
    // the following function call will raise an exception if
    // the orientation or the position is not valid
    wall_here = RUR.is_wall(orientation, x, y, goal);
    if (!RUR.is_wall(orientation, x, y, goal)){
        throw new RUR.ReeborgError(RUR.translate("There is no wall to remove!"));
    }

    args = convert_position(orientation, x, y);
    args.goal = goal;
    args.type = "walls";
    RUR.remove_artefact(args);
    // For historical reason, worlds are always created with a "walls" attribute
    RUR.utils.ensure_key_for_obj_exists(RUR.CURRENT_WORLD, "walls");
    RUR.record_frame("remove_wall", args);  
};

function convert_position (orientation, x, y) {
    var _x, _y, _orientation;
    switch (orientation){
    case "east":
        _orientation = "east";
        _x = x;
        _y = y;
        break;
    case "north":
        _orientation = "north";
        _x = x;
        _y = y;
        break;
    case "west":
        _orientation = "east";
        _x = x-1;
        _y = y;
        break;
    case "south":
        _orientation = "north";
        _x = x;
        _y = y-1;
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in add_wall().");
    }
    return {name:_orientation, x:_x, y:_y};
}
