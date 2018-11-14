require("./../rur.js");
require("./../recorder/record_frame.js");


RUR.add_robot = function (robot) {
    var world = RUR.get_current_world();
    if (world.robots === undefined){
        world.robots = [];
    }
    if (robot === undefined) {
        robot = RUR.robot.create_robot();
    }
    world.robots.push(robot);
    RUR.record_frame("RUR.add_robot", robot.__id);
};


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
    var r, robot, world=RUR.get_current_world();

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

 /** @function get_robot_body_by_id
 *
 * @memberof RUR
 * @instance
 * @summary **IMPORTANT** This function should only be used for the advanced
 * frame insertion technique.
 *
 * This function indicates returns a robot "body" specified by
 * its id, if a robot with such an id exists.  (The `id` is
 * like a serial number: it is a number unique for each robot created).
 * No error checking is performed on the argument.  If some exception is raised,
 * it is simply logged in the browser's console.
 *
 * **Important:** This function cannot be used directly in a Python program
 * to yield something sensible. (If you want, you can convert the result
 * to a Python dict() -- provided it is not None, of course.)
 * From Python, use instead `get_robot_by_id()` (without the RUR prefix),
 * or `robot_spécifique` in French,
 * which returns a true Python UsedRobot instance.
 *
 * @param {integer} id
 *
 * @returns {object} the body of the robot as a Javascript object, `null` if
 *         a robot with this id cannot be found.
 *
 **/

RUR.get_robot_body_by_id = function (id) {
    "use strict";
    var r, robot_body, world=RUR.get_current_world();

    if (world.robots === undefined || world.robots.length === 0) {
        return null;
    }

    try {
        for (r=0; r<world.robots.length; r++) {
            robot_body = world.robots[r];
            if (robot_body.__id == id){
                return robot_body;
            }
        }
    } catch(e) {
        console.warn("error in RUR.get_robot_body_by_id ", e);
    }
    return null;
 };

 /** @function get_robot_by_id
 *
 * @memberof RUR
 * @instance
 * @summary **IMPORTANT** This function should only be used for the advanced
 * frame insertion technique.
 * This function indicates returns a Javascript UsedRobot instance
 * specified by its id, if a robot with such an id exists.  (The `id` is
 * like a serial number: it is a number unique for each robot created).
 * No error checking is performed on the argument.
 * If some exception is raised, it is simply logged in the browser's console.
 *
 * **Important:** This function cannot be used directly in a Python program
 * to yield something sensible.
 * From Python, use instead `get_robot_by_id()` (without the RUR prefix),
 * or `robot_spécifique` in French,
 * which returns a true Python UsedRobot instance.
 *
 * @param {integer} id
 *
 * @returns {object} A Javascript UsedRobot instance corresponding to the
 * robot with the specified id, or `null` if a robot with this id cannot be found.
 *
 **/

RUR.get_robot_by_id = function (id) {
    "use strict";
    var body, robot;
    body = RUR.get_robot_body_by_id(id);
    if (body === null) {
        return null;
    } else {
        robot = Object.create(RUR.UsedRobot.prototype);
        robot.body = body;
        return robot;
    }
 };

 /** @function get_robot_location
 *
 * @memberof RUR
 * @instance
 * @desc **IMPORTANT** This function should only be used for the advanced
 * frame insertion technique; in normal programs, used `position_here()`.
 * Use `import reeborg_en` followed by `help(reeborg_en.position_here())`
 * for details about the return values which are different from those of
 * `RUR.get_robot_location()`.
 *
 * This function returns the location of a robot (position **and** orientation).
 *
 * @param {object} robot_body A robot body object, having the proper attribute
 *    for position (x, y coordinates) and orientation.  Note that you should
 *    pass in a robot body object obtained from some other function,
 *    such as `RUR.get_robot_body_by_id()`, since
 *    the internal names for the various attributes are subject to change.
 *
 * @returns {object} An object of the form
 *      `{x:x_value, y:y_value, orientation:orientation_value} where
 *      `x_value` and `y_value` are integers and
 *      `orientation_value` is one of `"east"`, `"west"`, `"north"`, `"south"`.
 *
 **/

RUR.get_robot_location = function (robot_body) {
    "use strict";
    var orientation;
    if (!robot_body || robot_body.x === undefined || robot_body.y === undefined ||
        robot_body._orientation === undefined) {
        throw new Error("robot body needed as argument for RUR.get_location().");
    }

    switch (robot_body._orientation){
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
    case RUR.RANDOM_ORIENTATION:
        throw new RUR.ReeborgError(RUR.translate("I am too dizzy!"));
    default:
        throw new Error("Should not happen: unhandled case in RUR.get_location().");
    }
    return {x:robot_body.x, y:robot_body.y, orientation:orientation};
};


 /** @function get_position_in_front
 *
 * @memberof RUR
 * @instance
 * @desc **IMPORTANT** This function should only be used for the advanced
 * frame insertion technique; in normal programs, used `position_in_front()`.
 * Use `import reeborg_en` followed by `help(reeborg_en.position_in_front())`
 * for details about the return values which are different from those of
 * `RUR.get_position_in_front()`.
 *
 * @param {object} robot_body A robot body object, having the proper attribute
 *    for position (x, y coordinates) and orientation.  Note that you should
 *    pass in a robot body object obtained from some other function
 *    such as `RUR.get_robot_body_by_id()`, since
 *    the internal names for the various attributes are subject to change.
 *
 * @returns {object} An object of the form
 *      `{x:x_value, y:y_value} where `x_value` and `y_value` are integers and
 * represent the position in front of the robot. If the position is not
 * within the world boundaries, the object `{x:0, y:0}` is returned.
 *
 **/

RUR.get_position_in_front = function (robot_body) {
    "use strict";
    var x, y;
    if (!robot_body || robot_body.x === undefined || robot_body.y === undefined) {
        throw new Error("robot body needed as argument for RUR.get_position_in_front().");
    }
    switch (robot_body._orientation){
    case RUR.EAST:
        x = robot_body.x + 1;
        y = robot_body.y;
        break;
    case RUR.NORTH:
        y = robot_body.y + 1;
        x = robot_body.x;
        break;
    case RUR.WEST:
        x = robot_body.x - 1;
        y = robot_body.y;
        break;
    case RUR.SOUTH:
        y = robot_body.y - 1;
        x = robot_body.x;
        break;
    case RUR.RANDOM_ORIENTATION:
        throw new RUR.ReeborgError(RUR.translate("I am too dizzy!"));
    default:
        throw new Error("Missing _orientation attribute for robot_body in RUR.get_position_in_front().");
    }
    if (RUR.is_valid_position(x, y)) {
        return {x:x, y:y};
    } else {
        return {x:0, y:0};
    }

};

 /** @function add_final_position
 *
 * @memberof RUR
 * @instance
 * @summary This function adds a final position as a goal for the default robot.
 * It is possible to call this function multiple times, with different
 * `x, y` positions; doing so will result in a final position chosen
 * randomly (among the choices recorded) each time a program is run.
 *
 * If `x, y` had previously been set as a goal final position
 * no change is being made and a message is logged in the browser's console.
 *
 * @param {string} name The name of the object/image we wish to use to
 *  represent the final position of the robot. Only one
 *  image can be used for a given world, even if many possible
 *  choices exist for the final position: each time this
 *  function is called, the `name` argument replaces any
 *  such argument that was previously recorded.
 *
 * @param {integer} x  The position on the grid
 * @param {integer} y  The position on the grid
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the final position is not valid [not implemented yet]
 * @throws will throw an error if the name is not recognized [not implemented yet]
 **/


RUR.add_final_position = function (name, x, y) {
    "use strict";
    var goal, pos, world=RUR.get_current_world();

    RUR.utils.ensure_key_for_obj_exists(world, "goal");
    goal = world.goal;
    RUR.utils.ensure_key_for_obj_exists(goal, "position");
    RUR.utils.ensure_key_for_array_exists(goal, "possible_final_positions");

    for(var i=0; i<goal.possible_final_positions.length; i++) {
        pos = goal.possible_final_positions[i];
        if(pos[0]==x && pos[1]==y){
            console.log(x, y, ": this final position is already included!");
            return;
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
 * @summary This function adds an initial (starting) position as a possibility
 * for the default robot. It is possible to call this function multiple times,
 * with different `x, y` positions; doing so will result in a initial position
 * chosen randomly (among the choices recorded) each time a program is run.
 *
 * If `x, y` had previously been set as an initial position
 * no change is being made and a message is logged in the browser's console.
 *
 * @param {integer} x  The position on the grid
 * @param {integer} y  The position on the grid
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the the world does not contain a robot
 * @throws Will throw an error if the initial position is not valid [not implemented yet]
 **/

RUR.add_initial_position = function (x, y) {
    "use strict";
    var robot, pos, world=RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("This world has no robot; cannot set initial position.");
    }

    robot = world.robots[0];
    if (!robot.possible_initial_positions){
        robot.possible_initial_positions = [[robot.x, robot.y]];
    }

    for(var i=0; i<robot.possible_initial_positions.length; i++) {
        pos = robot.possible_initial_positions[i];
        if(pos[0]==x && pos[1]==y){
            console.log(x, y, ": this initial position is already included!");
            return;
        }
    }
    // in case we want to replace an existing initial position by adding
    // a new one, and then calling RUR.remove_initial_position,
    // we set the current initial position to the new one we just added.
    // This has no visible effect if more than one initial position is possible.
    robot._prev_x = robot.x = x;
    robot._prev_y = robot.y = y;

    robot.possible_initial_positions.push([x, y]);
    RUR.record_frame("add_initial_position", {x:x, y:y});
};


 /** @function remove_initial_position
 *
 * @memberof RUR
 * @instance
 * @summary This function removes an initial (starting) position as a possibility
 * for the default robot. It is possible to call this function multiple times,
 * with different `x, y` positions. However, if there is only one remaining
 * initial position, such calls will be ignored to ensure that there is
 * always a robot present.
 *
 * If `x, y` is not an initial position
 * no change is being made and a message is logged in the browser's console.
 *
 * @param {integer} x  The position on the grid
 * @param {integer} y  The position on the grid
 *
 * @todo: put in argument verification code and note which error can be thrown
 * @throws Will throw an error if the the world does not contain a robot
 * @throws Will throw an error if the initial position is not valid [not implemented yet]
 **/

RUR.remove_initial_position = function (x, y) {
    "use strict";
    var robot, pos, new_positions, world=RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("This world has no robot; cannot remove initial position.");
    }  

    robot = world.robots[0];
    if (!robot.possible_initial_positions){
        robot.possible_initial_positions = [[robot.x, robot.y]];
        return;
    }

    if (robot.possible_initial_positions.length == 1) {
        return;
    }

    new_positions = [];
    for(var i=0; i<robot.possible_initial_positions.length; i++) {
        pos = robot.possible_initial_positions[i];
        if(pos[0]==x && pos[1]==y){
            continue;
        } else {
            new_positions.push(pos);
        }
    }

    robot.possible_initial_positions = new_positions;
    RUR.record_frame("remove_initial_position", {x:x, y:y});
};



// TODO: try to set it in the middle of a program to have Reeborg being "dizzy".
 /** @function set_random_orientation
 *
 * @memberof RUR
 * @instance
 * @summary This function sets the initial (starting) orientation so that it
 * will be chosen randomly.
 *
 * @param {object} [robot_body]  Optional robot body object
 *
 * @throws Will throw an error if it is called without an argument and
 * the world does not contain a robot.
 **/

RUR.set_random_orientation = function (robot_body) {
    "use strict";
    var world=RUR.get_current_world();
    if (robot_body === undefined) {
        if (world.robots === undefined || world.robots.length < 1) {
            throw new RUR.ReeborgError("This world has no robot; cannot set random orientation.");
        }
        robot_body = world.robots[0];
    } else if (robot_body.__id === undefined) {
        throw new RUR.ReeborgError("Invalid robot_body argument in RUR.set_random_orientation.");
    }

    robot_body._orientation = RUR.RANDOM_ORIENTATION;
    robot_body._prev_orientation = RUR.RANDOM_ORIENTATION;

    RUR.record_frame("set_random_orientation", robot_body.__id);
};