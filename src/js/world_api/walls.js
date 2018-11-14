require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../utils/supplant.js");
require("./../recorder/record_frame.js");
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


/** @function add_wall
 * @memberof RUR
 * @instance
 * @summary This function adds a wall at the stated
 * stated position and orientation if there is none already located there;
 * otherwise, it raises an exception, except if this is done in the
 * Onload phase in which case it simply logs in an exception.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [options.goal] If `true`, get information about goal walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 * @throws Will throw an error if there is already a wall there,
 * except if this is done in the
 * Onload phase in which case it simply logs in an exception.
 *
 */
RUR.add_wall = function(orientation, x, y, options) {
    "use strict";
    var args;

    if (RUR.is_wall(orientation, x, y, options)){
        if (RUR.state.evaluating_onload) {
            console.log("Ignoring call to add a wall: ", orientation);
        } else {
            throw new RUR.ReeborgError(RUR.translate("There is already a wall here!"));
        }
    }
    args = convert_position(RUR.translate_to_english(orientation), x, y);
    if (options && options.goal) {
        args.goal = options.goal;
    }
    args.type = "walls";
    RUR._add_artefact(args);
    RUR.record_frame("add_wall", args);
};


/** @function get_walls
 * @memberof RUR
 * @instance
 * @summary This function returns a list of walls at a location from within
 * the boundaries of a normal (rectangular) world. The order in which they are
 * listed, if present, is `"east"`, `"north"`, `"west"`, `"south"`.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [options.goal] If `true`, list the goal walls found at that
 * position instead of regular walls.
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 *
 */
RUR.get_walls = function(x, y, options) {
    var walls = [];
    if (RUR._is_wall("east", x, y, options)) {
        walls.push(RUR.translate("east"));
    }
    if (RUR._is_wall("north", x, y, options)) {
        walls.push(RUR.translate("north"));
    }
    if (RUR._is_wall("west", x, y, options)) {
        walls.push(RUR.translate("west"));
    }
    if (RUR._is_wall("south", x, y, options)) {
        walls.push(RUR.translate("south"));
    }
    return walls;
};


/** @function is_wall
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a wall is found at the
 * stated position and orientation, and `false/False` otherwise.
 *
 * @param {string} orientation  One of `"east", "west", "north", "south"`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {bool} [options.goal] If `true/True`, get information about goal walls
 *                      instead of regular walls.
 *
 *
 * @throws Will throw an error if `x` or `y` is outside the world boundary.
 * @throws Will throw an error if `orientation` is not a valid choice.
 *
 */
RUR.is_wall = function(orientation, x, y, options) {
    if (["east", "north", "west", "south"].indexOf(RUR.translate_to_english(orientation)) === -1) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid orientation.").supplant({orient:orientation}));
    }
    return RUR._is_wall(RUR.translate_to_english(orientation), x, y, options);
};

/* private version; works with English arguments */
RUR._is_wall = function(orientation, x, y, options) {
    var args;
    if (["east", "north", "west", "south"].indexOf(orientation) === -1) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid orientation.").supplant({orient:orientation}));
    }
    if (is_boundary_wall(orientation, x, y)) {
        return true;
    }
    args = convert_position(orientation, x, y);
    if (options && options.goal) {
        args.goal = options.goal;
    }
    args.type = "walls";
    if (RUR._get_nb_artefact(args) === 0) {
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
 */
RUR.remove_wall = function(orientation, x, y, options) {
    var args, world=RUR.get_current_world();
    // the following function call will raise an exception if
    // the orientation or the position is not valid
    wall_here = RUR.is_wall(orientation, x, y, options);
    if (!wall_here){
        throw new RUR.ReeborgError(RUR.translate("There is no wall to remove!"));
    }

    args = convert_position(RUR.translate_to_english(orientation), x, y);
    if (options && options.goal) {
        args.goal = options.goal;
    }
    args.type = "walls";
    RUR._remove_artefact(args);
    // _remove_artefact can remove a container of a type of artefact if it
    // is empty; however, for historical reason, worlds are always created
    // with a "walls" attribute
    RUR.utils.ensure_key_for_obj_exists(world, "walls");
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
