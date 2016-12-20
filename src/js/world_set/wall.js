require("./set_namespace.js");
require("./../recorder/record_frame.js");
require("./../world_get/wall.js");
require("./../utils/key_exist.js");
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

/** @function add_wall_at
 * @memberof RUR.set
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
RUR.set.add_wall_at = function(x, y, orientation, goal) {
    var world = get_world();
    if (RUR.get.is_wall_at(x, y, orientation, goal)){
        throw new RUR.ReeborgError("There is already such a wall there.");
    }
    orientation = orientation.toLowerCase();
    if (goal) {
        RUR._ensure_key_exists(world, goal);
        RUR._ensure_key_exists(world.goal, "walls");
        add_wall_at(x, y, orientation, world.goal.walls);
    } else {
        RUR._ensure_key_exists(world, "walls");
        add_wall_at(x, y, orientation, world.walls);
    }   
    RUR.record_frame();   
};

/** @function remove_wall_from
 * @memberof RUR.set
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
RUR.set.remove_wall_from = function(x, y, orientation, goal) {
    var world = get_world();
    if (!RUR.get.is_wall_at(x, y, orientation, goal)){
        throw new RUR.ReeborgError("There is no wall to remove.");
    }
    orientation = orientation.toLowerCase();
    remove_wall_from(x, y, orientation, goal);      
};


// private helper function
// perform argument checks and returns
// true if a wall of a specified orientation is found at a given
// location and false otherwise
// TODO: add check for valid values here
function add_wall_at(x, y, orientation, walls) {
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
        throw new RUR.ReeborgError("Should not happen: unhandled case in add_wall_at().");
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
function remove_wall_from(x, y, orientation, goal) {
    var coords;
    switch (orientation){
    case "east":
        coords = x + "," + y;
        __remove_wall_from(coords, "east", goal);
        break;
    case "north":
        coords = x + "," + y;
        __remove_wall_from(coords, "north", goal);
        break;
    case "west":
        coords = (x-1) + "," + y; // do math first before building strings
        __remove_wall_from(coords, "east", goal);
        break;
    case "south":
        coords = x + "," + (y-1);  // do math first before building strings
        __remove_wall_from(coords, "north", goal);
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in add_wall_at().");
    }
}


function __remove_wall_from(coords, orientation, goal) {
    var index, world=get_world();

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