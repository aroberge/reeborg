require("./../rur.js");
require("./../world_utils/get_world.js");


/** @function is_robot
 * @memberof RUR
 * @instance
 * @summary This function indicates if at least one robot is found at
 *   the specified location, false otherwise. No error checking
 *   is performed on the arguments.  If some exception is raised,
 *   it is simply logged in the browser's console.
 *
 * @param {integer} x  Position 
 * @param {integer} y  Position 
 *
 * @returns {bool} True if a robot is found at that position, false otherwise.
 *   
 **/
 
 RUR.is_robot = function (x, y) {
    "use strict";
    var r, robot, world=RUR.get_world();

    if (world.robots === undefined || world.robots.length === 0) {
        return false;
    }

    try {
        for (r=0; r<world.robots.length; r++) {
            robot = world.robots[r];
            if (robot.x == x && robot.y == y){
                return true;
            }
        }
    } catch(e) {
        console.warn("error in RUR.is_robot ", e);
    }
    return false;
 };

 /** @function get_robot_by_id
 *
 * @memberof RUR
 * @instance
 * @summary This function indicates returns a robot "body" specified by
 *          its id, if a robot with such an id exists.  (The `id` is
 *          like a serial number: it is a number unique for each robot
 *          created). No error checking
 *   is performed on the argument.  If some exception is raised,
 *   it is simply logged in the browser's console.
 *
 *    **Important** This function cannot be used directly in a Python program
 *    to yield something sensible. (If you want, you can convert the result 
 *    to a Python dict() -- provided it is not None, of course.)
 *    From Python, use instead `get_robot_by_id()` (without the RUR prefix)
 *    which returns a full UsedRobot object (and not simply its body).
 *
 * @param {integer} id  
 *
 * @returns {object} the body of the robot as a Javascript object, null if
 *         a robot with this id cannot be found.
 *   
 **/
 
RUR.get_robot_by_id = function (id) {
    "use strict";
    var r, robot, world=RUR.get_world();

    if (world.robots === undefined || world.robots.length === 0) {
        return null;
    }

    try {
        for (r=0; r<world.robots.length; r++) {
            robot = world.robots[r];
            if (robot.__id == id){
                return robot;
            }
        }
    } catch(e) {
        console.warn("error in RUR.is_robot ", e);
    }
    return null;
 };

 /** @function get_robot_position
 *
 * @memberof RUR
 * @instance
 * @summary This function returns the location of a robot.  
 *
 * @param {object} robot A robot (body) object, having the proper attribute
 *    for position (x, y coordinates) and orientation.  Note that you should
 *    pass in a robot (body) object obtained from some other function,
 *    such as `RUR.get_robot_by_id()`, since
 *    the internal names for the various attributes is subject to change.
 *
 * @returns {object} An object of the form 
 *      `{x:x_value, y:y_value, orientation:orientation_value} where
 *      `x_value` and `y_value` are integers and 
 *      `orientation_value` is one of `"east"`, `"west"`, `"north"`, `"south"`.
 *   
 **/

RUR.get_robot_position = function (robot) {
    "use strict";
    var x, y, orientation;
    if (!robot || robot.x === undefined || robot.y === undefined ||
        robot._orientation === undefined) {
        throw new Error("robot body needed as argument for RUR.get_location().");
    }
    
    switch (robot._orientation){
    case RUR.EAST:
        orientation = "east";
        break;
    case RUR.NORTH:
        orientation = "north";
        break;
    case RUR.WEST:
        orientation = "west";
        break;
    case RUR.SOUTH:
        orientation = "south";
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.get_location().");
    }
    return {x:robot.x, y:robot.y, orientation:orientation};
};

    
 /** @function get_position_in_front
 *
 * @memberof RUR
 * @instance
 * @summary This function returns the location of a robot.  
 *
 * @param {object} robot A robot (body) object, having the proper attribute
 *    for position (x, y coordinates) and orientation.  Note that you should
 *    pass in a robot (body) object obtained from some other function
 *    such as `RUR.get_robot_by_id()`, since
 *    the internal names for the various attributes is subject to change.
 *
 * @returns {object} An object of the form 
 *      `{x:x_value, y:y_value} where `x_value` and `y_value` are integers.
 *   
 **/

RUR.get_position_in_front = function (robot) {
    "use strict";
    var x, y;
    if (!robot || robot.x === undefined || robot.y === undefined) {
        throw new Error("robot body needed as argument for RUR.get_location_in_front().");
    }
    switch (robot._orientation){
    case RUR.EAST:
        x = robot.x + 1;
        y = robot.y;
        break;
    case RUR.NORTH:
        y = robot.y + 1;
        x = robot.x;
        break;
    case RUR.WEST:
        x = robot.x - 1;
        y = robot.y;
        break;
    case RUR.SOUTH:
        y = robot.y - 1;
        x = robot.x;
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.get_location_in_front().");
    }
    return {x:x, y:y};
};

 /** @function add_final_position
 *
 * @memberof RUR
 * @instance
 * @summary This function adds a final position as a goal for the default robot.
 *          It is possible to call this function multiple times, with different
 *          `x, y` positions; doing so will result in a final position chosen
 *          randomly (among the choices recorded) each time a program is run.
 *
 * @param {string} name The name of the object/image we wish to use to
 *                      represent the final position of the robot. Only one
 *                      image can be used for a given world, even if many possible
 *                      choices exist for the final position: each time this
 *                      function is called, the `name` argument replaces any
 *                      such argument that was previously recorded.
 *
 * @param {integer} x  The position on the grid  
 * @param {integer} y
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the final position is already included
 **/


RUR.add_final_position = function (name, x, y) {
    "use strict";
    var goal, pos, world=RUR.get_world();

    RUR.utils.ensure_key_for_obj_exists(world, "goal");
    goal = world.goal;
    RUR.utils.ensure_key_for_obj_exists(goal, "position");
    RUR.utils.ensure_key_for_array_exists(goal, "possible_final_positions");

    for(var i=0; i<goal.possible_final_positions.length; i++) {
        pos = goal.possible_final_positions[i];
        if(pos[0]==x && pos[1]==y){
            throw new ReeborgError("This final position is already included!");
        } 
    }

    goal.position.x = x;
    goal.position.y = y;
    goal.position.image = name;
    goal.possible_final_positions.push([x, y]);
    RUR.record_frame("add_final_position", {name:name, x:x, y:y});
};

 /** @function add_initial_position
 *
 * @memberof RUR
 * @instance
 * @summary This function adds an initial (starting) position as a possibility for the default robot.
 *          It is possible to call this function multiple times, with different
 *          `x, y` positions; doing so will result in a initial position chosen
 *          randomly (among the choices recorded) each time a program is run.
 *
 * @param {integer} x  The position on the grid  
 * @param {integer} y
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the final position is already included
 **/

RUR.add_initial_position = function (x, y) {
    "use strict";
    var robot, pos, world=RUR.get_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new ReeborgError("This world has no robot; cannot set initial position.");
    }

    robot = world.robots[0];
    if (!robot.possible_initial_positions){
        robot.possible_initial_positions = [[robot.x, robot.y]];
    }

    for(var i=0; i<robot.possible_initial_positions.length; i++) {
        pos = robot.possible_initial_positions[i];
        if(pos[0]==x && pos[1]==y){
            throw new ReeborgError("This initial position is already included!");
        } 
    }

    robot.possible_initial_positions.push([x, y]);
    RUR.record_frame("add_initial_position", {x:x, y:y});
};