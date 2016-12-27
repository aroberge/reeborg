require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");
require("./../recorder/record_frame.js");
get_world = require("./../world_utils/get_world.js").get_world;

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

function ensure_valid_position(x, y) {
    // ensures that the position is within the world boundaries
    var position = "(" + x + ", " + y + ")";
    if (!RUR.utils.is_valid_position(x, y)) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid position.").supplant({pos:position}));
    }
}

function ensure_valid_orientation(arg){
    var orientation = arg.toLowerCase();
    if (["east", "north", "west", "south"].indexOf(orientation) === -1) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid orientation.").supplant({orient:arg}));
    }
}


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
    var world = get_world();
    ensure_valid_position(x, y);
    if (goal) {
        if (world.goal === undefined || world.goal.walls === undefined) {
            return [];
        }
        return _list_walls_at(x, y, world.goal.walls);
    } else {
        return _list_walls_at(x, y, world.walls);
    }    
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
    var world = get_world();
    ensure_valid_orientation(orientation);
    ensure_valid_position(x, y);
    // convert to lower case only after running the above validity test.
    orientation = orientation.toLowerCase();
    if (goal) {
        if (world.goal === undefined || world.goal.walls === undefined) {
            return false;
        }
        return _is_wall_at(orientation, x, y, world.goal.walls);
    } else {
        return _is_wall_at(orientation, x, y, world.walls);
    }      
};


// private helper function
// perform argument checks and returns
// a list of walls found at a given location
function _list_walls_at (x, y, walls) {
    var result, orientations, index, orient;
    result = [];
    orientations = ["east", "north", "west", "south"];
    for (index in orientations) {
        orient = orientations[index];
        if (_is_wall_at(orient, x, y, walls)) {
            result.push(orient);
        }
    }
    return result;
}


// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
function _is_wall_at(orientation, x, y, walls) {
    var coords;
    switch (orientation){
    case "east":
        coords = x + "," + y;
        if (x === RUR.MAX_X){
            return true;
        }
        if (__is_wall(coords, "east", walls)) {
            return true;
        }
        break;
    case "north":
        coords = x + "," + y;
        if (y === RUR.MAX_Y){
            return true;
        }
        if (__is_wall(coords, "north", walls)) {
            return true;
        }
        break;
    case "west":
        if (x===1){
            return true;
        } else {
            coords = (x-1) + "," + y; // do math first before building strings
            if (__is_wall(coords, "east", walls)) {
                return true;
            }
        }
        break;
    case "south":
        if (y===1){
            return true;
        } else {
            coords = x + "," + (y-1);  // do math first before building strings
            if (__is_wall(coords, "north", walls)) {
                return true;
            }
        }
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in is_wall_at().");
    }
    return false;
}

// private helper function
// returns true if a wall of a specified orientation is found at a
// given coordinate
function __is_wall (coords, orientation, walls) {
    if (walls === undefined) {
        return false;
    }
    if (walls[coords] !== undefined){
        if (walls[coords].indexOf(orientation) !== -1) {
            return true;
        }
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
    var world = get_world(), wall_here;
    // the following function call will raise an exception if
    // the orientation or the position is not valid
    wall_here = RUR.is_wall(orientation, x, y, goal);
    if (wall_here){
        throw new RUR.ReeborgError(RUR.translate("There is already a wall here!"));
    }
    orientation = orientation.toLowerCase();
    if (goal) {
        RUR.utils.ensure_key_exists(world, "goal");
        RUR.utils.ensure_key_exists(world.goal, "walls");
        _add_wall(orientation, x, y, world.goal.walls);
    } else {
        RUR.utils.ensure_key_exists(world, "walls");
        _add_wall(orientation, x, y, world.walls);
    }   
    RUR.record_frame("debug", "add_wall");   
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
    var wall_here;
    // the following function call will raise an exception if
    // the orientation or the position is not valid
    wall_here = RUR.is_wall(orientation, x, y, goal);
    if (!wall_here){
        throw new RUR.ReeborgError(RUR.translate("There is no wall to remove!"));
    }
    orientation = orientation.toLowerCase();
    _remove_wall(orientation, x, y, goal);   
    RUR.record_frame("debug", "remove_wall");   
};


// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
function _add_wall(orientation, x, y, walls) {
    var coords;
    switch (orientation){
    case "east":
        coords = x + "," + y;
        __add_wall(coords, "east", walls);
        break;
    case "north":
        coords = x + "," + y;
        __add_wall(coords, "north", walls);
        break;
    case "west":
        coords = (x-1) + "," + y; // do math first before building strings
        __add_wall(coords, "east", walls);
        break;
    case "south":
        coords = x + "," + (y-1);  // do math first before building strings
        __add_wall(coords, "north", walls);
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in add_wall().");
    }
}

function __add_wall(coords, orientation, walls) {
    if (walls[coords] === undefined) {
        walls[coords] = [orientation];
    } else {
        walls[coords].push(orientation);
    }
}

// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
function _remove_wall(orientation, x, y, goal) {
    var coords;
    switch (orientation){
    case "east":
        coords = x + "," + y;
        __remove_wall(coords, "east", goal);
        break;
    case "north":
        coords = x + "," + y;
        __remove_wall(coords, "north", goal);
        break;
    case "west":
        coords = (x-1) + "," + y; // do math first before building strings
        __remove_wall(coords, "east", goal);
        break;
    case "south":
        coords = x + "," + (y-1);  // do math first before building strings
        __remove_wall(coords, "north", goal);
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in add_wall().");
    }
}

function __remove_wall(coords, orientation, goal) {
    var index, world = get_world();
    if (goal) {
        index = world.goal.walls[coords].indexOf(orientation);
        world.goal.walls[coords].splice(index, 1);
        if (world.goal.walls[coords].length === 0){
            delete world.goal.walls[coords];
            if (Object.keys(world.goal.walls).length === 0) {
                delete world.goal.walls;
            }
        }
    } else {
        index = world.walls[coords].indexOf(orientation);
        world.walls[coords].splice(index, 1);
        if (world.walls[coords].length === 0){
            delete world.walls[coords];
        }
    }
}
