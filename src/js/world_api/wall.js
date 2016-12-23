require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../recorder/record_frame.js");
get_world = require("./../world_get/world.js").get_world;

/*=========================================
walls data structure

Worlds are defined such that walls are listed only to the East or to the
North of a given position. However, this is an implementation detail
which could be changed without affecting what information is
given to the user.

Also, worlds are defined so that they are rectangular with walls on
all sides. However, these walls are not included in the data structure
that lists the walls, and must be handled separately.
*/

/** @function list_walls_at_position
 * @memberof RUR
 * @instance
 * @summary This function returns a list of walls at a location from within
 * the boundaries of a normal (rectangular) world.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, list the goal walls found at that position.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary
 * @throws more to add; do this in is_wall_at()
 *
 * @todo add tests
 * @todo add example
 *
 */
RUR.list_walls_at_position = function(x, y, goal) {
    var world = get_world();
    if (goal) {
        if (world.goal === undefined || world.goal.walls === undefined) {
            return [];
        }
        return _list_walls_at(x, y, world.goal.walls);
    } else {
        return _list_walls_at(x, y, world.walls);
    }    
};


/** @function is_wall_at
 * @memberof RUR
 * @instance
 * @summary This function returns `true` if a wall is found at the
 * stated position and orientation, and `false` otherwise.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is not a positive integer.
 * @throws more to add; do this in is_wall_at()
 *
 * @todo add tests
 * @todo add example
 *
 */
RUR.is_wall_at = function(x, y, orientation, goal) {
    var world = get_world();
    orientation = orientation.toLowerCase();
    if (goal) {
        if (world.goal === undefined || world.goal.walls === undefined) {
            return false;
        }
        return _is_wall_at(x, y, orientation, world.goal.walls);
    } else {
        return _is_wall_at(x, y, orientation, world.walls);
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
        if (_is_wall_at(x, y, orient, walls)) {
            result.push(orient);
        }
    }
    return result;
}


// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
// TODO: add check for valid values here
function _is_wall_at(x, y, orientation, walls) {
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
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is not a positive integer.
 * @throws more to add; do this in is_wall_at()
 *
 * @todo add tests
 * @todo add example
 *
 */
RUR.add_wall = function(x, y, orientation, goal) {
    var world = get_world();
    if (RUR.is_wall_at(x, y, orientation, goal)){
        throw new RUR.ReeborgError(RUR.translate("There is already a wall here!"));
    }
    orientation = orientation.toLowerCase();
    if (goal) {
        RUR.utils.ensure_key_exists(world, "goal");
        RUR.utils.ensure_key_exists(world.goal, "walls");
        _add_wall(x, y, orientation, world.goal.walls);
    } else {
        RUR.utils.ensure_key_exists(world, "walls");
        _add_wall(x, y, orientation, world.walls);
    }   
    RUR.record_frame();   
};

/** @function remove_wall
 * @memberof RUR
 * @instance
 * @summary This function removes a wall at the stated
 * stated position and orientation if there there is one already located there;
 * otherwise, it raises an exception.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is not a positive integer.
 * @throws more to add; do this in is_wall_at()
 *
 * @todo add tests
 * @todo add example
 *
 */
RUR.remove_wall = function(x, y, orientation, goal) {
    if (!RUR.is_wall_at(x, y, orientation, goal)){
        throw new RUR.ReeborgError(RUR.translate("There is no wall to remove!"));
    }
    orientation = orientation.toLowerCase();
    _remove_wall(x, y, orientation, goal);   
    RUR.record_frame();   
};


// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
// TODO: add check for valid values here
function _add_wall(x, y, orientation, walls) {
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
// TODO: add check for valid values here
function _remove_wall(x, y, orientation, goal) {
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
