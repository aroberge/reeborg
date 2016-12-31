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
 * @returns {object} the body of the robot as a Javascript object, null otherwise.
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