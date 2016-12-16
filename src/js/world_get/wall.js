require("./get_namespace.js");
get_world = require("./world.js").get_world;

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
 * @memberof RUR.get
 * @instance
 * @summary This function returns a list of walls at a location from within
 * the boundaries of a normal (rectangular) world.
 *
 *
 * @param {integer} x  Position: `1 <= x <= max_x`  
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary
 * @throws more to add; do this in is_wall_at()
 *
 * @todo add tests
 * @todo add example
 *
 */
RUR.get.list_walls_at_position = function(x, y, goal) {
    if (goal) {
        return list_walls_at(x, y, get_world().goal.walls);
    } else {
        return list_walls_at(x, y, get_world().walls);
    }    
};


/** @function is_wall_at
 * @memberof RUR.get
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
RUR.get.is_wall_at = function(x, y, orientation, goal) {
    orientation = orientation.toLowerCase();
    if (goal) {
        return is_wall_at(x, y, orientation, get_world().goal.walls);
    } else {
        return is_wall_at(x, y, orientation, get_world().walls);
    }      
};


// private helper function
// perform argument checks and returns
// a list of walls found at a given location
function list_walls_at (x, y, walls) {
    var result, orientations, index, orient;
    result = [];
    orientations = ["east", "north", "west", "south"];
    for (index in orientations) {
        orient = orientations(index);
        if (is_wall_at(x, y, orient, walls)) {
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
function is_wall_at(x, y, orientation, walls) {
    var coords;
    switch (orientation){
    case "east":
        coords = x + "," + y;
        if (x === RUR.COLS){
            return true;
        }
        if (__is_wall_at(coords, "east", walls)) {
            return true;
        }
        break;
    case "north":
        coords = x + "," + y;
        if (y === RUR.ROWS){
            return true;
        }
        if (RUR.__is_wall_at(coords, "north", walls)) {
            return true;
        }
        break;
    case "west":
        if (x===1){
            return true;
        } else {
            coords = (x-1) + "," + y; // do math first before building strings
            if (__is_wall_at(coords, "east", walls)) {
                return true;
            }
        }
        break;
    case "south":
        if (y===1){
            return true;
        } else {
            coords = x + "," + (y-1);  // do math first before building strings
            if (__is_wall_at(coords, "north", walls)) {
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
function __is_wall_at (coords, orientation, walls) {
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
